# Information Architecture + Wireframe v1.0

Status: DRAFT FOR IMPLEMENTATION

## A. Global Information Architecture

### Primary public navigation
1. Home
2. About
3. Teaching
4. Research
5. Publications
6. Curriculum & Quality
7. Innovation & Projects
8. Academic Service
9. CV

### Utility navigation
- Search
- Academic Calendar
- Workspace (private entry)

## B. Home Page Content Order

1. Hero / Academic Identity
2. Academic Focus / Expertise
3. Featured Work
4. Compact Academic Calendar
5. Selected Teaching / Research / Projects
6. Latest Publications / Updates
7. Academic Service
8. Contact / Footer

The calendar is supporting information, not the visual focal point.

## C. Home Wireframe — Desktop

```text
+----------------------------------------------------------+
| HEADER: Logo | Public Nav | Search | Workspace           |
+----------------------------------------------------------+
| HERO                                                     |
| Name / Academic Role / Focus                Profile      |
| Intro + primary actions                     Image        |
+----------------------------------------------------------+
| ACADEMIC FOCUS                                           |
| Health & PE | Curriculum | Research | AI | Service       |
+----------------------------------------------------------+
| FEATURED WORK                                            |
| [Teaching]        [Research]        [Innovation]         |
+----------------------------------------------------------+
| COMPACT ACADEMIC CALENDAR                                |
| +----------------------+--------------------------------+ |
| | Mini month           | Upcoming                       | |
| | dates + event dots   | 3-4 public/selected events    | |
| |                      | View calendar ->              | |
| +----------------------+--------------------------------+ |
+----------------------------------------------------------+
| SELECTED WORK / PUBLICATIONS / ACADEMIC SERVICE          |
+----------------------------------------------------------+
| FOOTER                                                   |
+----------------------------------------------------------+
```

### Calendar desktop constraints
- Width: contained within normal page content width.
- Two-column card: mini month + upcoming list.
- Maximum 3–4 events visible.
- No full Google Calendar grid on Home.
- Muted visual treatment relative to Hero and Featured Work.

## D. Home Wireframe — Mobile

```text
+------------------------------+
| HEADER + MENU                |
+------------------------------+
| PROFILE IMAGE                |
| NAME / ROLE / INTRO          |
+------------------------------+
| ACADEMIC FOCUS               |
+------------------------------+
| FEATURED WORK                |
+------------------------------+
| CALENDAR                     |
| Today                        |
| Next 3 events                |
| View calendar ->             |
+------------------------------+
| PUBLICATIONS / SERVICE       |
+------------------------------+
```

On narrow screens the month grid is collapsed; only Today + upcoming events remain.

## E. Workspace Information Architecture

### Workspace dashboard
- Today
- Quick Add
- Upcoming
- Recent Documents
- Recent Activity
- Search

### Quick Add
- Upload Document
- Add Calendar Event
- Add Academic Note

### Upload Center
1. Drop/select file
2. Validate file
3. Extract metadata
4. Suggest classification
5. Review/edit metadata
6. Confirm destination
7. Save

### Calendar Workspace
- Upcoming
- By category
- Add event
- Edit/remove via authorized integration
- Public/private visibility control

### Document Inbox
- Newly uploaded
- Needs review
- Classified
- Recently updated

## F. Workspace Wireframe — Desktop

```text
+----------------------------------------------------------+
| WORKSPACE HEADER | Search | Account                     |
+----------------------------------------------------------+
| TODAY                     | QUICK ADD                   |
| Date / next event         | Upload | Event | Note      |
+---------------------------+------------------------------+
| UPCOMING                  | RECENT DOCUMENTS            |
| Event list                | Document list               |
| Calendar categories       | Classification status       |
+---------------------------+------------------------------+
| RECENT ACTIVITY / SEARCH RESULTS                         |
+----------------------------------------------------------+
```

## G. UX Rules

1. Public website must remain calm, academic, and portfolio-first.
2. Workspace controls must not dominate the public header.
3. Quick Add should open a lightweight modal/panel rather than occupy permanent page space.
4. Calendar uses progressive disclosure: summary on Home, detail on dedicated page/workspace.
5. Private data never renders in public HTML at build time.
6. Write actions require explicit authentication/authorization.
7. Mobile prioritizes upcoming events over month-grid visualization.

## H. Proposed Jekyll/File Mapping

```text
_pages/
  home.md                  # public Home
  academic-calendar.md     # public calendar summary
  academic-service.md      # public service page
  workspace.md             # private workspace shell

_data/
  navigation.yml           # primary public navigation
  academic_categories.yml  # shared categories/taxonomy

_includes/
  academic-calendar.html   # compact calendar component
  quick-add.html           # workspace utility component

assets/css/
  academic-home.css
  academic-calendar.css
  academic-workspace.css

assets/js/
  academic-calendar.js
  workspace.js
  upload-classifier.js
```

All asset references must use repository-safe relative/base-path-aware references supported by the existing Jekyll template.

## I. First Implementation Gate

Phase 1 implementation is approved to proceed when these are true:
- existing Jekyll structure remains intact;
- Home layout can be extended without breaking current collections;
- calendar component uses mock/public data only initially;
- workspace shell contains no secrets and no write-capable credentials;
- responsive behavior is defined for desktop/tablet/mobile.
