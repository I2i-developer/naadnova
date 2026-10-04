-- Naadnova learning dashboard, enrollment workflow, and private course media.
-- Apply after 0001_initial_schema.sql in the Supabase SQL editor or CLI.

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles alter column role set default 'user';
update public.profiles set role = 'user' where role is null or role = 'visitor';
alter table public.profiles add constraint profiles_role_check check (role in ('user', 'admin'));
alter table public.profiles add column if not exists phone text;

alter table public.courses add column if not exists division text;
alter table public.courses add column if not exists duration text;
alter table public.courses add column if not exists thumbnail_url text;
alter table public.courses add column if not exists status text not null default 'draft';
alter table public.courses drop constraint if exists courses_status_check;
alter table public.courses add constraint courses_status_check check (status in ('draft', 'published', 'archived'));

create table if not exists public.course_enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  status text not null default 'payment_pending' check (status in ('pending', 'payment_pending', 'approved', 'rejected')),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid', 'pending_confirmation', 'paid')),
  admin_notes text,
  created_at timestamptz not null default now(),
  approved_at timestamptz,
  unique (user_id, course_id)
);

create table if not exists public.course_registration_details (
  id uuid primary key default gen_random_uuid(),
  enrollment_id uuid not null unique references public.course_enrollments(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  student_name text not null,
  phone text not null,
  age integer check (age between 4 and 100),
  preferred_batch text,
  learning_mode text not null check (learning_mode in ('online', 'offline')),
  experience_level text,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists public.course_chapters (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  description text,
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.course_videos (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references public.course_chapters(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  description text,
  video_url text,
  storage_path text,
  order_index integer not null default 0,
  duration text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  check (video_url is not null or storage_path is not null)
);

create table if not exists public.user_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  device_label text,
  is_active boolean not null default true,
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  revoked_at timestamptz
);

create index if not exists enrollments_user_idx on public.course_enrollments (user_id, status);
create index if not exists enrollments_course_idx on public.course_enrollments (course_id, status);
create index if not exists registrations_enrollment_idx on public.course_registration_details (enrollment_id);
create index if not exists chapters_course_order_idx on public.course_chapters (course_id, order_index);
create index if not exists videos_chapter_order_idx on public.course_videos (chapter_id, order_index);
create index if not exists sessions_user_active_idx on public.user_sessions (user_id, is_active);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, phone, role)
  values (
    new.id,
    nullif(new.raw_user_meta_data ->> 'full_name', ''),
    new.email,
    nullif(new.raw_user_meta_data ->> 'phone', ''),
    'user'
  )
  on conflict (id) do update set
    full_name = excluded.full_name,
    email = excluded.email,
    phone = excluded.phone,
    updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert or update of email, raw_user_meta_data on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.has_approved_course_access(requested_course_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_admin() or exists (
    select 1
    from public.course_enrollments
    where user_id = auth.uid()
      and course_id = requested_course_id
      and status = 'approved'
      and payment_status = 'paid'
  );
$$;

alter table public.course_enrollments enable row level security;
alter table public.course_registration_details enable row level security;
alter table public.course_chapters enable row level security;
alter table public.course_videos enable row level security;
alter table public.user_sessions enable row level security;

create policy "Users read own profile" on public.profiles for select using (id = auth.uid());
create policy "Users update own profile" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid() and role = 'user');

create policy "Users read own enrollments" on public.course_enrollments for select using (user_id = auth.uid());
create policy "Users create own enrollments" on public.course_enrollments for insert with check (
  user_id = auth.uid() and status in ('pending', 'payment_pending') and payment_status in ('unpaid', 'pending_confirmation')
);
create policy "Admins manage enrollments" on public.course_enrollments for all using (public.is_admin()) with check (public.is_admin());

create policy "Users read own registrations" on public.course_registration_details for select using (user_id = auth.uid());
create policy "Users create own registrations" on public.course_registration_details for insert with check (user_id = auth.uid());
create policy "Admins manage registrations" on public.course_registration_details for all using (public.is_admin()) with check (public.is_admin());

create policy "Approved students read chapters" on public.course_chapters for select using (public.has_approved_course_access(course_id));
create policy "Admins manage chapters" on public.course_chapters for all using (public.is_admin()) with check (public.is_admin());
create policy "Approved students read published videos" on public.course_videos for select using (
  is_published = true and public.has_approved_course_access(course_id)
);
create policy "Admins manage videos" on public.course_videos for all using (public.is_admin()) with check (public.is_admin());

create policy "Users manage own sessions" on public.user_sessions for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "Admins read sessions" on public.user_sessions for select using (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('course-videos', 'course-videos', false, 1073741824, array['video/mp4', 'video/webm'])
on conflict (id) do update set public = false;

create policy "Admins manage private course videos" on storage.objects
for all using (bucket_id = 'course-videos' and public.is_admin())
with check (bucket_id = 'course-videos' and public.is_admin());

insert into public.courses (
  title, division, slug, short_description, description, instrument, duration,
  mode, status, is_published, is_featured, sort_order
)
values
  ('Guitar Studies', 'Instrumental Division', 'guitar-studies', '3 to 6-month certified paths in acoustic and lead playing.', 'Build confident rhythm, chord fluency, lead technique, and performance-ready repertoire.', 'Guitar', '3 to 6 months', 'both', 'published', true, true, 1),
  ('Piano & Theory Studies', 'Keyboard Division', 'piano-theory-studies', 'Step-by-step training in Western notation and key coordination.', 'Develop reading, theory, two-hand coordination, and expressive keyboard performance.', 'Piano / Keyboard', '3 to 6 months', 'both', 'published', true, true, 2),
  ('Voice & Performance Training', 'Vocal Division', 'voice-performance-training', 'Professional coaching focusing on vocal health, Alankars, and genre phrasing.', 'Train breath, pitch, vocal health, Alankars, phrasing, and stage confidence.', 'Vocals', '3 to 6 months', 'both', 'published', true, true, 3)
on conflict (slug) do update set
  title = excluded.title,
  division = excluded.division,
  short_description = excluded.short_description,
  description = excluded.description,
  instrument = excluded.instrument,
  duration = excluded.duration,
  mode = excluded.mode,
  status = excluded.status,
  is_published = excluded.is_published,
  sort_order = excluded.sort_order,
  updated_at = now();

-- Promote the first admin manually after signup:
-- update public.profiles set role = 'admin' where email = 'owner@example.com';
