(() => {
  const root = document.querySelector('[data-upload-center]');
  if (!root) return;

  const input = root.querySelector('[data-upload-file]');
  const preview = root.querySelector('[data-upload-preview]');
  const out = {
    name: root.querySelector('[data-meta-name]'),
    type: root.querySelector('[data-meta-type]'),
    size: root.querySelector('[data-meta-size]'),
    category: root.querySelector('[data-meta-category]'),
    code: root.querySelector('[data-meta-code]'),
    confidence: root.querySelector('[data-meta-confidence]'),
    reason: root.querySelector('[data-meta-reason]')
  };

  const rules = [
    { category: 'Teaching', test: /\b(HED|PED|EDU|RHE)\d{4}\b/i, confidence: 95, reason: 'Recognized course code in filename.' },
    { category: 'Research', test: /\b(MOVE24|RESEARCH|PROPOSAL|ETHICS|IRB)\b/i, confidence: 90, reason: 'Research/project keyword detected.' },
    { category: 'Publications', test: /\b(PUBLICATION|MANUSCRIPT|ARTICLE|JOURNAL|PAPER)\b/i, confidence: 85, reason: 'Publication/manuscript keyword detected.' },
    { category: 'Curriculum', test: /\b(PLO|CLO|CURRICULUM|MAPPING|TQF|MKO|มคอ)\b/i, confidence: 88, reason: 'Curriculum or learning-outcome keyword detected.' },
    { category: 'Quality Assurance', test: /\b(AUN[-_ ]?QA|SAR|QA|QUALITY)\b/i, confidence: 88, reason: 'Quality-assurance keyword detected.' },
    { category: 'Academic Service', test: /\b(SERVICE|COMMUNITY|WORKSHOP|OUTREACH)\b/i, confidence: 80, reason: 'Academic-service/community keyword detected.' }
  ];

  const formatBytes = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const classify = (file) => {
    const source = file.name.toUpperCase();
    const hit = rules.find((rule) => rule.test.test(source));
    const code = file.name.match(/\b(?:HED|PED|EDU|RHE)\d{4}\b/i)?.[0]?.toUpperCase() || '—';
    return hit
      ? { category: hit.category, confidence: hit.confidence, reason: hit.reason, code }
      : { category: 'Other', confidence: 40, reason: 'No high-confidence filename rule matched. Human review is required.', code };
  };

  input?.addEventListener('change', () => {
    const file = input.files?.[0];
    if (!file) {
      preview.hidden = true;
      return;
    }

    const result = classify(file);
    out.name.textContent = file.name;
    out.type.textContent = file.type || 'Unknown / browser not reported';
    out.size.textContent = formatBytes(file.size);
    out.category.textContent = result.category;
    out.code.textContent = result.code;
    out.confidence.textContent = `${result.confidence}%`;
    out.reason.textContent = result.reason;
    preview.hidden = false;
  });
})();
