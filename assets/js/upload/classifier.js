(() => {
  const root = document.querySelector('[data-upload-center]');
  if (!root) return;

  const input = root.querySelector('[data-upload-file]');
  const preview = root.querySelector('[data-upload-preview]');
  const categorySelect = root.querySelector('[data-review-category]');
  const fields = {
    name: root.querySelector('[data-meta-name]'),
    type: root.querySelector('[data-meta-type]'),
    size: root.querySelector('[data-meta-size]'),
    category: root.querySelector('[data-meta-category]'),
    folder: root.querySelector('[data-meta-folder]'),
    course: root.querySelector('[data-meta-course]'),
    project: root.querySelector('[data-meta-project]'),
    documentType: root.querySelector('[data-meta-document-type]'),
    academicYear: root.querySelector('[data-meta-academic-year]'),
    confidence: root.querySelector('[data-meta-confidence]'),
    source: root.querySelector('[data-meta-source]'),
    review: root.querySelector('[data-meta-review]'),
    reason: root.querySelector('[data-meta-reason]')
  };

  const allowedExtensions = new Set(['pdf', 'docx', 'xlsx', 'pptx', 'txt', 'csv']);
  const maxBytes = 25 * 1024 * 1024;
  const rules = [
    { category: 'Teaching', test: /\b(?:HED|PED|RHE|EDU)\d{4}\b/i, confidence: 95, reason: 'Recognized course code in filename.' },
    { category: 'Research', test: /\b(?:MOVE24|RESEARCH|PROPOSAL|ETHICS|IRB)\b/i, confidence: 90, reason: 'Research or project keyword detected.' },
    { category: 'Publications', test: /\b(?:PUBLICATION|ARTICLE|MANUSCRIPT|JOURNAL|PAPER)\b/i, confidence: 86, reason: 'Publication keyword detected.' },
    { category: 'Curriculum & Quality', test: /\b(?:AUN[-_ ]?QA|SAR|PLO|CLO|CURRICULUM|MAPPING|TQF|MKO|QA|QUALITY|มคอ)\b/i, confidence: 88, reason: 'Curriculum or quality keyword detected.' },
    { category: 'Academic Service', test: /\b(?:COMMUNITY|SERVICE|EXTENSION|OUTREACH|WORKSHOP)\b/i, confidence: 82, reason: 'Academic-service keyword detected.' },
    { category: 'Projects', test: /\b(?:PROJECT|PILOT|PROTOTYPE)\b/i, confidence: 75, reason: 'Project keyword detected.' }
  ];

  const folderLabel = (category, confidence) => {
    if (confidence < 70) return '00 Inbox';
    return ({
      Teaching: '01 Teaching',
      Research: '02 Research',
      Publications: '03 Publications',
      'Curriculum & Quality': '04 Curriculum & Quality',
      'Academic Service': '05 Academic Service',
      Projects: '06 Projects'
    })[category] || '00 Inbox';
  };

  const formatBytes = (bytes) => bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  const extension = (name) => String(name).split('.').pop().toLowerCase();
  const detectCourse = (name) => name.match(/\b(?:HED|PED|RHE|EDU)\d{4}\b/i)?.[0]?.toUpperCase() || '—';
  const detectProject = (name) => name.match(/\bMOVE24\b/i)?.[0]?.toUpperCase() || '—';
  const detectYear = (name) => name.match(/\b25\d{2}\b/)?.[0] || '—';
  const documentType = (ext) => ({ pdf: 'PDF', docx: 'Word document', xlsx: 'Spreadsheet', pptx: 'Presentation', txt: 'Text', csv: 'CSV dataset' })[ext] || 'Unknown';

  const classify = (file) => {
    const ext = extension(file.name);
    if (!allowedExtensions.has(ext)) throw new Error('Unsupported file type. Allowed: PDF, DOCX, XLSX, PPTX, TXT, CSV.');
    if (file.size <= 0) throw new Error('The selected file is empty.');
    if (file.size > maxBytes) throw new Error('The selected file exceeds the 25 MB controlled-upload limit.');
    const hit = rules.find((rule) => rule.test.test(file.name));
    const category = hit?.category || 'Other';
    const confidence = hit?.confidence || 40;
    return {
      file,
      name: file.name,
      mimeType: file.type || 'application/octet-stream',
      size: file.size,
      extension: ext,
      category,
      suggestedCategory: category,
      suggestedFolder: folderLabel(category, confidence),
      courseCode: detectCourse(file.name),
      projectCode: detectProject(file.name),
      documentType: documentType(ext),
      academicYear: detectYear(file.name),
      tags: [detectCourse(file.name), detectProject(file.name)].filter((v) => v !== '—'),
      confidence,
      classificationSource: 'RULE',
      reviewStatus: 'REVIEW_REQUIRED',
      reason: hit?.reason || 'No high-confidence filename rule matched. Route to 00 Inbox unless the user reviews and changes the category.'
    };
  };

  const render = (result) => {
    fields.name.textContent = result.name;
    fields.type.textContent = result.documentType;
    fields.size.textContent = formatBytes(result.size);
    fields.category.textContent = result.category;
    fields.folder.textContent = result.suggestedFolder;
    fields.course.textContent = result.courseCode;
    fields.project.textContent = result.projectCode;
    fields.documentType.textContent = result.documentType;
    fields.academicYear.textContent = result.academicYear;
    fields.confidence.textContent = `${result.confidence}%`;
    fields.source.textContent = result.classificationSource;
    fields.review.textContent = result.reviewStatus;
    fields.reason.textContent = result.reason;
    if (categorySelect) categorySelect.value = result.category;
    preview.hidden = false;
  };

  const publish = (result) => window.dispatchEvent(new CustomEvent('kasem:upload-classified', { detail: result }));
  let current = null;

  input?.addEventListener('change', () => {
    preview.hidden = true;
    const file = input.files?.[0];
    if (!file) return;
    try {
      current = classify(file);
      render(current);
      publish(current);
    } catch (error) {
      current = null;
      preview.hidden = false;
      fields.reason.textContent = error.message;
      window.dispatchEvent(new CustomEvent('kasem:upload-invalid', { detail: { message: error.message } }));
    }
  });

  categorySelect?.addEventListener('change', () => {
    if (!current) return;
    current = {
      ...current,
      category: categorySelect.value,
      suggestedFolder: folderLabel(categorySelect.value, 100),
      classificationSource: current.suggestedCategory === categorySelect.value ? 'RULE' : 'RULE+USER',
      reviewStatus: 'HUMAN_REVIEWED'
    };
    render(current);
    publish(current);
  });
})();
