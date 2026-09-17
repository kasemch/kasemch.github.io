---
permalink: /hepe-public-releases/
title: "HEPE Public Releases"
description: "Public-safe registry of HEPE project-controlled academic document releases with release lineage and integrity metadata."
author_profile: false
classes: wide
---

{% assign hepe_releases = site.data.hepe_public_releases.releases %}
{% assign release_count = hepe_releases | size %}

<section style="max-width:980px;margin:0 auto;padding:1rem 0 3rem;" aria-labelledby="hepe-release-title">
  <p style="font-size:.82rem;letter-spacing:.08em;text-transform:uppercase;color:#667085;">HEPE · Public Release Discovery</p>
  <h1 id="hepe-release-title">HEPE Public Releases</h1>
  <p>This page provides a public-safe discovery layer for academic documents that have completed the HEPE controlled release workflow. Internal audit trails, actor identifiers, reviewer metadata, session identifiers and restricted evidence are not exposed here.</p>

  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:.8rem;margin:1.25rem 0;" aria-label="Release registry summary">
    <div style="padding:1rem 1.1rem;border:1px solid #e5e7eb;border-radius:14px;background:#f8fafc;">
      <span style="display:block;color:#667085;font-size:.8rem;">Registered releases</span>
      <strong style="display:block;margin-top:.2rem;font-size:1.45rem;">{{ release_count }}</strong>
    </div>
    <div style="padding:1rem 1.1rem;border:1px solid #e5e7eb;border-radius:14px;background:#f8fafc;">
      <span style="display:block;color:#667085;font-size:.8rem;">Registry scope</span>
      <strong style="display:block;margin-top:.2rem;">HEPE Project-Controlled</strong>
    </div>
    <div style="padding:1rem 1.1rem;border:1px solid #e5e7eb;border-radius:14px;background:#f8fafc;">
      <span style="display:block;color:#667085;font-size:.8rem;">Publication boundary</span>
      <strong style="display:block;margin-top:.2rem;">Public-safe metadata only</strong>
    </div>
  </div>

  {% for release in hepe_releases %}
  {% assign is_current = false %}
  {% if release.successor_release_code == nil or release.successor_release_code == empty %}{% assign is_current = true %}{% endif %}
  <article style="margin-top:1.5rem;padding:1.5rem;border:1px solid #e5e7eb;border-radius:16px;background:#fff;" aria-labelledby="release-{{ forloop.index }}-title">
    <div style="display:flex;flex-wrap:wrap;gap:.6rem;align-items:center;margin-bottom:.8rem;">
      <strong>{{ release.release_code }}</strong>
      <span style="padding:.3rem .65rem;border-radius:999px;background:#e8f7ee;color:#166534;font-weight:700;font-size:.82rem;">{{ release.release_status | replace: '_', ' ' }}</span>
      {% if is_current %}
      <span style="padding:.3rem .65rem;border-radius:999px;background:#eef2ff;color:#3730a3;font-weight:700;font-size:.82rem;">CURRENT LINEAGE HEAD</span>
      {% else %}
      <span style="padding:.3rem .65rem;border-radius:999px;background:#f3f4f6;color:#4b5563;font-weight:700;font-size:.82rem;">HAS SUCCESSOR</span>
      {% endif %}
    </div>

    <h2 id="release-{{ forloop.index }}-title" style="margin:.4rem 0;">{{ release.course_code }} — {{ release.course_title_th }}</h2>
    <p>รายละเอียดของกระบวนวิชา ({{ release.document_type }}) · {{ release.programme_title_th }} · ภาคเรียนที่ {{ release.term_code }} ปีการศึกษา {{ release.academic_year }}</p>

    <dl style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:.8rem;margin:1.2rem 0;">
      <div><dt style="color:#667085;font-size:.82rem;">Document Type</dt><dd style="margin:.2rem 0 0;font-weight:650;">{{ release.document_type }}</dd></div>
      <div><dt style="color:#667085;font-size:.82rem;">Academic Period</dt><dd style="margin:.2rem 0 0;font-weight:650;">{{ release.academic_year }}/{{ release.term_code }}</dd></div>
      <div><dt style="color:#667085;font-size:.82rem;">Release Scope</dt><dd style="margin:.2rem 0 0;font-weight:650;">{{ release.release_scope | replace: '_', ' ' }}</dd></div>
      <div><dt style="color:#667085;font-size:.82rem;">Source Provenance</dt><dd style="margin:.2rem 0 0;font-weight:650;">{{ release.source_provenance }}</dd></div>
      <div><dt style="color:#667085;font-size:.82rem;">Template Scope</dt><dd style="margin:.2rem 0 0;font-weight:650;">{{ release.template_scope }}</dd></div>
      <div><dt style="color:#667085;font-size:.82rem;">Lineage State</dt><dd style="margin:.2rem 0 0;font-weight:650;">{{ release.lineage_status }}</dd></div>
      <div><dt style="color:#667085;font-size:.82rem;">Published</dt><dd style="margin:.2rem 0 0;font-weight:650;">{{ release.published_on }}</dd></div>
      <div><dt style="color:#667085;font-size:.82rem;">Institutional Official Claim</dt><dd style="margin:.2rem 0 0;font-weight:650;">{% if release.institutional_official_claim %}Yes{% else %}No{% endif %}</dd></div>
    </dl>

    <section style="margin:1.2rem 0;padding:1rem 1.1rem;border-left:4px solid #d0d5dd;background:#f8fafc;" aria-label="Release lineage relationship">
      <strong style="display:block;margin-bottom:.45rem;">Release lineage</strong>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:.55rem;">
        <div><span style="color:#667085;font-size:.82rem;">Predecessor</span><div>{% if release.predecessor_release_code %}<code>{{ release.predecessor_release_code }}</code>{% else %}None — first registered release{% endif %}</div></div>
        <div><span style="color:#667085;font-size:.82rem;">Successor</span><div>{% if release.successor_release_code %}<code>{{ release.successor_release_code }}</code>{% else %}None registered{% endif %}</div></div>
      </div>
    </section>

    <p><strong>Bundle SHA-256</strong><br><code style="overflow-wrap:anywhere;">{{ release.bundle_sha256 }}</code></p>
    <p style="display:flex;flex-wrap:wrap;gap:.8rem;">
      <a href="{{ release.release_path | relative_url }}">Open Public Release Registry →</a>
      <a href="{{ release.manifest_path | relative_url }}">Release Manifest →</a>
      <a href="{{ release.lineage_path | relative_url }}">Release Lineage →</a>
    </p>
  </article>
  {% endfor %}

  <aside style="margin-top:1.5rem;padding:1rem 1.2rem;border-radius:14px;background:#f8fafc;color:#475467;line-height:1.65;">
    <strong>Authority boundary.</strong> Releases listed here are controlled within the HEPE project. This public registry does not claim that a template or publication is an official institutional document of Ramkhamhaeng University unless separate institutional evidence is added in a later governed release.
  </aside>
</section>
