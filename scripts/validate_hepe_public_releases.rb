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
  end

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
end

unless errors.empty?
  warn 'HEPE public release consistency validation: FAIL'
  errors.each { |error| warn "- #{error}" }
  exit 1
end

puts "HEPE public release consistency validation: PASS (#{releases.length} release#{releases.length == 1 ? '' : 's'})"
