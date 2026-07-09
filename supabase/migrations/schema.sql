-- B.A Connect Organization — Supabase schema
-- Run this in the Supabase SQL editor of your NEW project (SQL Editor > New query)

-- ============================================================
-- 1. SITE CONTENT (admin-editable text blocks)
-- ============================================================
create table if not exists site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

alter table site_content enable row level security;

create policy "Public can read site content"
  on site_content for select
  using (true);

create policy "Authenticated admins can write site content"
  on site_content for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- 2. NEWSLETTER SUBSCRIBERS
-- ============================================================
create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);

alter table newsletter_subscribers enable row level security;

create policy "Anyone can subscribe"
  on newsletter_subscribers for insert
  with check (true);

create policy "Only admins can read subscribers"
  on newsletter_subscribers for select
  using (auth.role() = 'authenticated');

create policy "Only admins can delete subscribers"
  on newsletter_subscribers for delete
  using (auth.role() = 'authenticated');

-- ============================================================
-- 3. FEEDBACK & SUGGESTIONS WALL
-- ============================================================
create table if not exists feedback (
  id uuid primary key default gen_random_uuid(),
  name text default 'Anonymous',
  message text not null,
  approved boolean default false,
  created_at timestamptz default now()
);

alter table feedback enable row level security;

create policy "Anyone can submit feedback"
  on feedback for insert
  with check (true);

create policy "Anyone can read approved feedback"
  on feedback for select
  using (approved = true);

create policy "Admins can read all feedback"
  on feedback for select
  using (auth.role() = 'authenticated');

create policy "Admins can update feedback"
  on feedback for update
  using (auth.role() = 'authenticated');

create policy "Admins can delete feedback"
  on feedback for delete
  using (auth.role() = 'authenticated');

-- ============================================================
-- 4. DEPARTMENT PROJECTS & EVENTS
-- ============================================================
create table if not exists department_projects (
  id uuid primary key default gen_random_uuid(),
  department text not null,
  title text not null,
  description text,
  event_date text,
  venue text,
  social_link text,
  photos text[] default '{}',
  created_at timestamptz default now()
);

alter table department_projects enable row level security;

create policy "Public can read department projects"
  on department_projects for select
  using (true);

create policy "Admins can manage department projects"
  on department_projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- 5. PUSH NOTIFICATIONS
-- ============================================================
create table if not exists push_subscriptions (
  endpoint text primary key,
  subscription jsonb not null,
  created_at timestamptz default now()
);

alter table push_subscriptions enable row level security;

create policy "Anyone can subscribe to push"
  on push_subscriptions for insert
  with check (true);

create policy "Anyone can update their own push subscription"
  on push_subscriptions for update
  using (true);

create policy "Only admins read push subscriptions"
  on push_subscriptions for select
  using (auth.role() = 'authenticated');

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  type text,
  sent_to int default 0,
  created_at timestamptz default now()
);

alter table notifications enable row level security;

create policy "Admins can read notifications"
  on notifications for select
  using (auth.role() = 'authenticated');

create policy "Admins can insert notifications"
  on notifications for insert
  with check (auth.role() = 'authenticated');

-- ============================================================
-- 6. STORAGE BUCKETS for media (photos, videos, articles)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('photos', 'photos', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('videos', 'videos', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('articles', 'articles', true)
on conflict (id) do nothing;

create policy "Public can view media"
  on storage.objects for select
  using (bucket_id in ('photos', 'videos', 'articles'));

create policy "Admins can upload media"
  on storage.objects for insert
  with check (
    bucket_id in ('photos', 'videos', 'articles')
    and auth.role() = 'authenticated'
  );

create policy "Admins can delete media"
  on storage.objects for delete
  using (
    bucket_id in ('photos', 'videos', 'articles')
    and auth.role() = 'authenticated'
  );

-- ============================================================
-- 8. ORGANIZATION EVENTS & PROGRAMS (shown via the header Events button)
-- ============================================================
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date text,
  location text,
  created_at timestamptz default now()
);

alter table events enable row level security;

create policy "Public can read events"
  on events for select
  using (true);

create policy "Admins can manage events"
  on events for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- 9. BRIDGE AI KNOWLEDGE BASE (from B.A Connect's training manuals)
-- ============================================================
create table if not exists bridge_ai_knowledge (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  source_title text,
  section text,
  content text not null,
  search_vector tsvector generated always as (to_tsvector('english', coalesce(section,'') || ' ' || content)) stored,
  created_at timestamptz default now()
);

create index if not exists bridge_ai_knowledge_search_idx on bridge_ai_knowledge using gin (search_vector);
create index if not exists bridge_ai_knowledge_category_idx on bridge_ai_knowledge (category);

alter table bridge_ai_knowledge enable row level security;

create policy "Public can read knowledge base"
  on bridge_ai_knowledge for select
  using (true);

create policy "Admins can manage knowledge base"
  on bridge_ai_knowledge for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- 7. SEED: create your first admin account
-- ============================================================
-- Admin accounts are created through Supabase Auth, not this table.
-- After running this schema, go to Authentication > Users in your
-- Supabase dashboard and click "Add user" to create each admin's
-- email + password. They will then be able to sign in at /admin.
