-- Saved comparisons
create table if not exists saved_comparisons (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text,
  question_text text not null,
  topic_id text,
  topic_name text,
  selected_books jsonb not null default '[]'::jsonb,
  synthesis text,
  passages jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_saved_comparisons_user_id on saved_comparisons(user_id);
create index if not exists idx_saved_comparisons_created_at on saved_comparisons(created_at desc);

-- Notes table (server-side)
create table if not exists user_notes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  verse_id text not null,
  book_id text not null,
  book_title text not null,
  religion text not null,
  chapter_id text not null,
  verse_number int not null,
  text text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, verse_id)
);

create index if not exists idx_user_notes_user_id on user_notes(user_id);

-- Newsletter subscribers
create table if not exists newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Enable row-level security
alter table saved_comparisons enable row level security;
alter table user_notes enable row level security;

-- RLS policies
create policy "Users can manage their own comparisons"
  on saved_comparisons for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can manage their own notes"
  on user_notes for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
