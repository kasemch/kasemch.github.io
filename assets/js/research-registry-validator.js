(() => {
  'use strict';

  const makeResult = () => ({ ok: true, errors: [], warnings: [] });
  const add = (bucket, code, message, context = {}) => bucket.push({ code, message, context });

  const uniqueIndex = (items = [], key = 'id', errors, label = 'record') => {
    const map = new Map();
    items.forEach((item, index) => {
      const value = item?.[key];
      if (!value) {
        add(errors, 'missing-id', `${label} is missing ${key}.`, { index });
        return;
      }
      if (map.has(value)) add(errors, 'duplicate-id', `Duplicate ${label} ${key}: ${value}.`, { value });
      else map.set(value, item);
    });
    return map;
  };

  const validate = (registry, matrix) => {
    const out = makeResult();
    const projects = Array.isArray(registry?.projects) ? registry.projects : [];
    const rows = Array.isArray(matrix?.rows) ? matrix.rows : [];

    if (!projects.length) add(out.errors, 'no-projects', 'Research registry contains no projects.');
    if (!Array.isArray(matrix?.rows)) add(out.errors, 'matrix-missing', 'Research evidence matrix rows are unavailable.');

    const projectById = uniqueIndex(projects, 'id', out.errors, 'project');
    uniqueIndex(rows, 'id', out.errors, 'matrix row');

    const matrixProjectIds = new Map();
    projects.forEach((project) => {
      const matrixProjectId = project.matrixProjectId || project.id;
      if (matrixProjectIds.has(matrixProjectId)) {
        add(out.errors, 'duplicate-matrix-project-id', `Multiple projects use matrixProjectId ${matrixProjectId}.`, { projectId: project.id });
      } else matrixProjectIds.set(matrixProjectId, project.id);

      uniqueIndex(project.milestones || [], 'id', out.errors, `milestone in ${project.id}`);
      uniqueIndex(project.publicOutputs || [], 'id', out.errors, `output in ${project.id}`);
      uniqueIndex(project.publicationBindings || [], 'id', out.errors, `publication in ${project.id}`);

      if (project.visibility === 'public-summary' && !project.lastVerified) {
        add(out.errors, 'missing-last-verified', `Public project ${project.id} is missing lastVerified.`, { projectId: project.id });
      }
    });

    rows.forEach((row) => {
      const canonicalProjectId = matrixProjectIds.get(row.projectId);
      const project = canonicalProjectId ? projectById.get(canonicalProjectId) : null;
      if (!project) {
        add(out.errors, 'orphan-project', `Matrix row ${row.id || '(unnamed)'} references unknown projectId ${row.projectId}.`, { rowId: row.id, projectId: row.projectId });
        return;
      }

      const milestoneById = new Map((project.milestones || []).map((item) => [item.id, item]));
      const outputById = new Map((project.publicOutputs || []).map((item) => [item.id, item]));
      const publicationById = new Map((project.publicationBindings || []).map((item) => [item.id, item]));

      if (!row.milestoneId || !milestoneById.has(row.milestoneId)) {
        add(out.errors, 'orphan-milestone', `Matrix row ${row.id} references unknown milestoneId ${row.milestoneId}.`, { rowId: row.id, projectId: project.id });
      }

      if (row.outputId) {
        const output = outputById.get(row.outputId);
        if (!output) add(out.errors, 'orphan-output', `Matrix row ${row.id} references unknown outputId ${row.outputId}.`, { rowId: row.id, projectId: project.id });
        else if (output.milestoneId && output.milestoneId !== row.milestoneId) {
          add(out.errors, 'output-milestone-mismatch', `Output ${row.outputId} belongs to ${output.milestoneId}, not ${row.milestoneId}.`, { rowId: row.id, projectId: project.id });
        }
      }

      if (row.publicationId && !publicationById.has(row.publicationId)) {
        add(out.errors, 'orphan-publication', `Matrix row ${row.id} references unknown publicationId ${row.publicationId}.`, { rowId: row.id, projectId: project.id });
      }

      if (!row.relationshipStatus) add(out.errors, 'missing-relationship-status', `Matrix row ${row.id} is missing relationshipStatus.`, { rowId: row.id });
      if (!row.evidenceStatus) add(out.errors, 'missing-evidence-status', `Matrix row ${row.id} is missing evidenceStatus.`, { rowId: row.id });
    });

    projects.forEach((project) => {
      const matrixProjectId = project.matrixProjectId || project.id;
      const projectRows = rows.filter((row) => row.projectId === matrixProjectId);
      if (project.visibility === 'public-summary' && !projectRows.length) {
        add(out.errors, 'public-project-without-matrix', `Public project ${project.id} has no evidence-matrix rows.`, { projectId: project.id });
      }
      const verifiedPublicationRows = projectRows.filter((row) => row.publicationId && String(row.relationshipStatus).startsWith('verified'));
      if (project.publicationLinked && !verifiedPublicationRows.length) {
        add(out.errors, 'publication-flag-mismatch', `Project ${project.id} is marked publicationLinked but has no verified publication relationship.`, { projectId: project.id });
      }
      if (!project.publicationLinked && verifiedPublicationRows.length) {
        add(out.warnings, 'publication-flag-stale', `Project ${project.id} has verified publication relationships but publicationLinked is false.`, { projectId: project.id });
      }
    });

    out.ok = out.errors.length === 0;
    return out;
  };

  window.ResearchRegistryValidator = Object.freeze({ validate });
})();
