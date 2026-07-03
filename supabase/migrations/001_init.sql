-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Search history
create table if not exists search_history (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  query text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_search_history_user_id on search_history(user_id);
create index if not exists idx_search_history_created_at on search_history(created_at desc);

-- Bookmarks / saved passages
create table if not exists saved_passages (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  book_id text not null,
  book_title text not null,
  religion text not null,
  chapter_id text not null,
  verse_id text not null,
  reference text not null,
  text text not null,
  created_at timestamptz not null default now(),
  unique(user_id, verse_id)
);

create index if not exists idx_saved_passages_user_id on saved_passages(user_id);

-- Reading history (per-verse last visited)
create table if not exists reading_history (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  book_slug text not null,
  book_title text not null,
  religion text not null,
  chapter_num int not null,
  last_visited_at timestamptz not null default now(),
  unique(user_id, book_slug, chapter_num)
);

create index if not exists idx_reading_history_user_id on reading_history(user_id);

-- Enable row-level security
alter table search_history enable row level security;
alter table saved_passages enable row level security;
alter table reading_history enable row level security;

-- RLS policies: users can only see their own data
create policy "Users can manage their own search history"
  on search_history for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can manage their own saved passages"
  on saved_passages for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can manage their own reading history"
  on reading_history for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
