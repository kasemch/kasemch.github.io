# Academic Website + Command Center — System Architecture v1.0

Status: APPROVED BASELINE
Branch: `feature/academic-command-center-v1`

## 1. Purpose

Extend the existing Jekyll/Academic Pages website into a two-layer system:

1. Public Academic Website — portfolio, teaching, research, publications, curriculum/quality, innovation/projects, service, CV.
2. Personal Academic Workspace — quick add, compact calendar, upload center, document inbox, recent activity, search.

The public website remains static and publishable through GitHub Pages. Any capability that writes data must use an external authorized service/API.

## 2. Source-of-Truth Boundaries

| Domain | Source of Truth |
|---|---|
| Public website content | GitHub repository / Jekyll collections |
| Calendar | Google Calendar |
| Document binaries | Google Drive or Supabase Storage |
| Document metadata / search index | Supabase |
| Classification result | Metadata record with rule/AI provenance |

## 3. Architecture Layers

### Presentation Layer
- GitHub Pages
- Jekyll / Academic Pages
- Responsive HTML/CSS/JavaScript

### Interaction Layer
- Quick Add
- Upload Center
- Add Event
- Search / Filter
- Document Inbox

### Integration Layer
- Google Calendar API / calendar links
- Google Drive API or Supabase Storage
- Supabase metadata/search
- Optional AI classification endpoint

### Data Layer
- Calendar events
- Document binaries
- Metadata records
- Classification rules/results

## 4. Public vs Private Boundary

### Public
- Home
- About
- Teaching
- Research
- Publications
- Curriculum & Quality
- Innovation & Projects
- Academic Service
- CV
- Public academic events only

### Private Workspace
- Authentication required before any write operation
- Quick Add
- Upload Center
- Calendar management
- Document Inbox
- Recent Activity
- Unified Search

No write-capable credential or private token may be embedded in client-side JavaScript committed to this public repository.

## 5. Upload Workflow

`Upload -> Validate -> Extract Metadata -> Rule Classification -> AI Fallback if Needed -> User Review -> Save Binary -> Save Metadata`

Primary categories:
- Teaching
- Research
- Publications
- Curriculum
- Quality Assurance
- Academic Service
- Other

Classification must record:
- classification source (`rule`, `ai`, `manual`)
- confidence score when available
- user confirmation/correction

## 6. Calendar Workflow

`Website -> Add Event -> Authorized Google Calendar Action -> Google Calendar -> Read/Display Upcoming Events`

Calendar categories:
- Teaching
- Research
- Meeting
- Academic Service
- Deadline
- Personal

Only explicitly public events may be rendered on the public website.

## 7. Document Metadata Minimum Schema

- id
- title
- filename
- category
- subcategory
- course_code
- project_code
- document_type
- academic_year
- tags
- storage_provider
- storage_path
- visibility
- classification_source
- classification_confidence
- created_at
- updated_at

## 8. GitHub/Jekyll Integration Decision

The existing repository is already based on Academic Pages/Jekyll. Therefore:
- Keep `_pages`, `_data`, `_publications`, `_includes`, `_layouts`, and `_config.yml`.
- Do not replace the site with a standalone `/index.html` implementation.
- Home remains `_pages/home.md` with `permalink: /`.
- Navigation remains `_data/navigation.yml`.
- New UI assets should be added modularly under `assets/css/` and `assets/js/`.
- Workspace pages should be introduced as Jekyll pages first, then progressively enhanced with client-side JavaScript.

## 9. Development Phases

### Phase 1 — Information Architecture + UI shell
- Home IA refinement
- Compact Academic Calendar
- Quick Add entry point
- Workspace shell
- Responsive behavior

### Phase 2 — Calendar integration
- Add Event flow
- Google Calendar authorization boundary
- Upcoming event rendering
- Public/private filtering

### Phase 3 — Document workspace
- Upload Center
- Metadata form
- Document Inbox
- Storage adapter

### Phase 4 — Smart classification
- Rule classifier
- Confidence handling
- AI fallback
- User correction loop

### Phase 5 — Academic Knowledge Hub
- Unified search
- Course/project/document/event relationships
- Cross-domain retrieval

## 10. Frozen Decisions

1. GitHub Pages/Jekyll remains the public frontend.
2. Google Calendar is the calendar source of truth.
3. Google Drive or Supabase Storage stores document binaries.
4. Supabase stores metadata/search records.
5. Classification uses rule-first + optional AI fallback.
6. Public and private/workspace functions remain clearly separated.
7. Quick Add is the primary entry point for Upload File, Add Event, and Add Note.
