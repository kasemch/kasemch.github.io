#!/usr/bin/env ruby
# frozen_string_literal: true

require 'open3'

BASELINES = {
  'hepe-public/index.html' => '0cc36e32e3af19c3915592e194f1cc1ccb837b88',
  'hepe-public/release.json' => '5b7450468be9f5c94b76bcc2fd1350863c9d7b5e',
  'hepe-public/lineage.json' => 'd2850515ea6f1c79b557f5037c9a7bd0bcdcc30b',
  'hepe-public/r2/index.html' => '7f0c22528e1362d90a2731f41fdff45c68554f0b',
  'hepe-public/r2/release.json' => 'de28d2629807cee592a2b60e7b54eeb9c717f278',
  'hepe-public/r2/lineage.json' => '3f8185929e7c87e6e9a97453600a4d475f3cb4de'
}.freeze

errors = []

BASELINES.each do |path, expected_blob|
  unless File.file?(path)
    errors << "#{path}: immutable release artifact is missing"
    next
  end

  actual_blob, status = Open3.capture2('git', 'hash-object', path)
  actual_blob = actual_blob.strip
  unless status.success?
    errors << "#{path}: unable to compute Git blob hash"
    next
  end

  errors << "#{path}: immutable blob changed; expected #{expected_blob}, got #{actual_blob}" unless actual_blob == expected_blob
end

base_sha = ENV['HEPE_BASE_SHA'].to_s.strip
head_sha = ENV['HEPE_HEAD_SHA'].to_s.strip

if !base_sha.empty? && !head_sha.empty? && base_sha !~ /\A0+\z/
  changed, status = Open3.capture2('git', 'diff', '--name-only', base_sha, head_sha, '--', *BASELINES.keys)
  if status.success?
    changed_paths = changed.lines.map(&:strip).reject(&:empty?)
    unless changed_paths.empty?
      errors << "immutable release paths changed in this revision: #{changed_paths.join(', ')}"
    end
  else
    errors << 'unable to inspect immutable release path changes'
  end
end

unless errors.empty?
  warn 'HEPE release immutability validation: FAIL'
  errors.each { |error| warn "- #{error}" }
  exit 1
end

puts "HEPE release immutability validation: PASS (#{BASELINES.length} frozen artifacts)"
