-- PLANNING ARTIFACT ONLY. Do not apply to unrelated Supabase projects.
-- Target dedicated schema: academic_hub

create schema if not exists academic_hub;

create table if not exists academic_hub.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  filename text not null,
  mime_type text,
  file_size bigint,
  category text not null,
  subcategory text,
  course_code text,
  project_code text,
  document_type text,
  academic_year text,
  tags text[] not null default '{}',
  storage_provider text not null default 'google_drive',
  storage_file_id text not null,
  storage_parent_id text,
  storage_web_url text,
  classification_source text not null default 'rule',
  classification_confidence integer check (classification_confidence between 0 and 100),
  visibility text not null default 'private' check (visibility in ('private','public')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists documents_storage_file_id_uidx
  on academic_hub.documents (storage_provider, storage_file_id);

create index if not exists documents_category_idx
  on academic_hub.documents (category);

create index if not exists documents_course_code_idx
  on academic_hub.documents (course_code)
  where course_code is not null;

alter table academic_hub.documents enable row level security;

-- RLS policies intentionally omitted until the dedicated Supabase project's
-- authentication model and owner identity are explicitly selected and verified.
