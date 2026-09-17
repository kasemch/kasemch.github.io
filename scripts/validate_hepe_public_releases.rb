#!/usr/bin/env ruby
# frozen_string_literal: true

require 'json'
require 'yaml'
require 'pathname'

ROOT = Pathname.new(__dir__).join('..').expand_path
DATA_FILE = ROOT.join('_data/hepe_public_releases.yml')

abort "Missing canonical registry: #{DATA_FILE}" unless DATA_FILE.file?

registry = YAML.safe_load(DATA_FILE.read, permitted_classes: [], aliases: false)
releases = registry.fetch('releases')
abort 'Canonical registry must contain a releases array.' unless releases.is_a?(Array)

errors = []
seen_codes = {}
release_by_code = {}

schema_version = registry['schema_version']
errors << "Unsupported schema_version: #{schema_version.inspect}" unless [1, 2].include?(schema_version)
errors << 'Registry public_safe_only must remain true.' unless registry['public_safe_only'] == true

normalize_path = lambda do |site_path|
  value = site_path.to_s
  if value.empty? || value.match?(%r{\Ahttps?://}i)
    errors << "Invalid local public path: #{value.inspect}"
    next nil
  end
  ROOT.join(value.sub(%r{\A/}, ''))
end

check_equal = lambda do |release_code, source_name, field, expected, actual|
  return if expected == actual

  errors << "#{release_code}: #{source_name}.#{field} mismatch; expected #{expected.inspect}, got #{actual.inspect}"
end

# First pass: validate identifiers and build an index used by lineage checks.
releases.each do |release|
  code = release['release_code'].to_s
  if code.empty?
    errors << 'Release entry missing release_code.'
    next
  end

  if seen_codes[code]
    errors << "Duplicate release_code: #{code}"
  else
    seen_codes[code] = true
    release_by_code[code] = release
  end
end

# Second pass: validate public artifacts and canonical metadata fidelity.
releases.each do |release|
  code = release['release_code'].to_s
  next if code.empty?

  unless release['public_safe'] == true
    errors << "#{code}: canonical release entry must have public_safe: true"
  end

  manifest_file = normalize_path.call(release['manifest_path'])
  lineage_file = normalize_path.call(release['lineage_path'])
  next unless manifest_file && lineage_file

  unless manifest_file.file?
    errors << "#{code}: manifest not found at #{manifest_file.relative_path_from(ROOT)}"
    next
  end
  unless lineage_file.file?
    errors << "#{code}: lineage not found at #{lineage_file.relative_path_from(ROOT)}"
    next
  end

  begin
    manifest = JSON.parse(manifest_file.read)
  rescue JSON::ParserError => e
    errors << "#{code}: invalid manifest JSON: #{e.message}"
    next
  end

  begin
    lineage = JSON.parse(lineage_file.read)
  rescue JSON::ParserError => e
    errors << "#{code}: invalid lineage JSON: #{e.message}"
    next
  end

  {
    'public_release_code' => 'release_code',
    'release_status' => 'release_status',
    'release_scope' => 'release_scope',
    'document_type' => 'document_type',
    'course_code' => 'course_code',
    'course_title_th' => 'course_title_th',
    'programme_title_th' => 'programme_title_th',
    'academic_year' => 'academic_year',
    'term_code' => 'term_code',
    'source_provenance' => 'source_provenance',
    'template_scope' => 'template_scope',
    'institutional_official_claim' => 'institutional_official_claim',
    'canonical_credit_pattern' => 'canonical_credit_pattern',
    'bundle_sha256' => 'bundle_sha256',
    'published_on' => 'published_on'
  }.each do |manifest_key, release_key|
    check_equal.call(code, 'manifest', manifest_key, release[release_key], manifest[manifest_key])
  end

  check_equal.call(code, 'manifest', 'public_safe', true, manifest['public_safe'])

  {
    'public_release_code' => 'release_code',
    'lineage_status' => 'lineage_status',
    'predecessor_release_code' => 'predecessor_release_code',
    'successor_release_code' => 'successor_release_code',
    'document_type' => 'document_type',
    'course_code' => 'course_code',
    'academic_year' => 'academic_year',
    'term_code' => 'term_code',
    'bundle_sha256' => 'bundle_sha256',
    'mutation_policy' => 'mutation_policy'
  }.each do |lineage_key, release_key|
    check_equal.call(code, 'lineage', lineage_key, release[release_key], lineage[lineage_key])
  end

  check_equal.call(code, 'lineage', 'public_safe', true, lineage['public_safe'])

  if release['institutional_official_claim'] != false
    errors << "#{code}: institutional_official_claim must remain false unless a separately governed authority change is made"
  end

  # Schema v2 public-rendering metadata: optional for backward compatibility,
  # but when present it must agree with governed lineage facts.
  revision = release['revision_number']
  if !revision.nil? && (!revision.is_a?(Integer) || revision < 1)
    errors << "#{code}: revision_number must be a positive integer when present"
  end

  display_label = release['display_label']
  if revision && display_label && display_label != "R#{revision}"
    errors << "#{code}: display_label #{display_label.inspect} must agree with revision_number #{revision}"
  end

  if release.key?('current_release')
    expected_current = release['successor_release_code'].nil?
    check_equal.call(code, 'canonical', 'current_release', expected_current, release['current_release'])
  end

  if release.key?('superseded')
    expected_superseded = !release['successor_release_code'].nil?
    check_equal.call(code, 'canonical', 'superseded', expected_superseded, release['superseded'])
  end

  if release.key?('superseded_by')
    check_equal.call(code, 'canonical', 'superseded_by', release['successor_release_code'], release['superseded_by'])
  end

  family = release['release_family']
  errors << "#{code}: release_family cannot be blank when present" if !family.nil? && family.to_s.strip.empty?

  language = release['language']
  errors << "#{code}: language must be a short public language tag when present" if !language.nil? && !language.to_s.match?(/\A[a-z]{2,3}(?:-[A-Za-z0-9]+)*\z/)

  display_order = release['display_order']
  if !display_order.nil? && (!display_order.is_a?(Integer) || display_order < 0)
    errors << "#{code}: display_order must be a non-negative integer when present"
  end

  if release['detail_route']
    expected_route = "/hepe-public-releases/#{code}/"
    check_equal.call(code, 'canonical', 'detail_route', expected_route, release['detail_route'])
    detail_file = ROOT.join("_pages/hepe-release-#{code}.md")
    errors << "#{code}: detail route stub missing at #{detail_file.relative_path_from(ROOT)}" unless detail_file.file?
  end
end

# Third pass: reciprocal lineage integrity across the canonical registry.
releases.each do |release|
  code = release['release_code'].to_s
  next if code.empty?

  predecessor = release['predecessor_release_code']
  successor = release['successor_release_code']

  if predecessor == code
    errors << "#{code}: predecessor_release_code cannot reference itself"
  end
  if successor == code
    errors << "#{code}: successor_release_code cannot reference itself"
  end

  if predecessor
    referenced = release_by_code[predecessor]
    if referenced.nil?
      errors << "#{code}: predecessor_release_code references missing release #{predecessor}"
    elsif referenced['successor_release_code'] != code
      errors << "#{code}: predecessor #{predecessor} must reciprocally declare successor_release_code #{code}"
    end
  end

  if successor
    referenced = release_by_code[successor]
    if referenced.nil?
      errors << "#{code}: successor_release_code references missing release #{successor}"
    elsif referenced['predecessor_release_code'] != code
      errors << "#{code}: successor #{successor} must reciprocally declare predecessor_release_code #{code}"
    end
  end
end

# A release can be the predecessor of at most one successor in the linear R1→R2→R3 model.
predecessor_claims = Hash.new { |hash, key| hash[key] = [] }
releases.each do |release|
  predecessor = release['predecessor_release_code']
  predecessor_claims[predecessor] << release['release_code'] if predecessor
end
predecessor_claims.each do |predecessor, children|
  next if children.length <= 1

  errors << "#{predecessor}: multiple releases claim the same predecessor: #{children.join(', ')}"
end

# Detect cycles by walking successor pointers from every release.
release_by_code.each_key do |start_code|
  visited = {}
  current = start_code

  while current
    if visited[current]
      cycle = visited.keys.drop_while { |code| code != current } + [current]
      errors << "Lineage cycle detected: #{cycle.join(' -> ')}"
      break
    end

    visited[current] = true
    node = release_by_code[current]
    break unless node

    current = node['successor_release_code']
  end
end

unless errors.empty?
  warn 'HEPE public release consistency validation: FAIL'
  errors.uniq.each { |error| warn "- #{error}" }
  exit 1
end

puts "HEPE public release consistency validation: PASS (#{releases.length} release#{releases.length == 1 ? '' : 's'}; schema v#{schema_version}; reciprocal lineage valid)"
