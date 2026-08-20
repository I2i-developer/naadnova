create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  role text not null default 'visitor' check (role in ('visitor', 'admin')),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  short_description text,
  description text,
  instrument text not null,
  age_group text,
  level text,
  class_duration text,
  frequency text,
  mode text check (mode in ('online', 'offline', 'both')),
  featured_image text,
  price numeric,
  is_featured boolean not null default false,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.course_curriculum (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  description text,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  type text not null default 'general' check (type in ('trial', 'contact', 'general')),
  instrument text,
  age_group text,
  experience_level text,
  learning_mode text check (learning_mode in ('online', 'offline', 'either')),
  preferred_date date,
  preferred_time text,
  message text,
  source text,
  status text not null default 'new' check (status in ('new', 'contacted', 'trial_scheduled', 'converted', 'not_interested', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  relationship text,
  instrument text,
  testimonial text not null,
  rating integer check (rating between 1 and 5),
  image_url text,
  is_featured boolean not null default false,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.student_showcase (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  instrument text,
  title text not null,
  description text,
  thumbnail_url text,
  video_url text,
  achievement text,
  is_featured boolean not null default false,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text not null,
  category text,
  alt_text text,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  featured_image text,
  category text,
  author_id uuid references public.profiles(id) on delete set null,
  seo_title text,
  seo_description text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists courses_published_sort_idx on public.courses (is_published, sort_order);
create index if not exists course_curriculum_course_position_idx on public.course_curriculum (course_id, position);
create index if not exists enquiries_status_created_idx on public.enquiries (status, created_at desc);
create index if not exists testimonials_featured_idx on public.testimonials (is_published, is_featured, sort_order);
create index if not exists student_showcase_featured_idx on public.student_showcase (is_published, is_featured, sort_order);
create index if not exists gallery_category_idx on public.gallery (is_published, category, sort_order);
create index if not exists faqs_category_idx on public.faqs (is_published, category, sort_order);
create index if not exists blog_posts_status_published_idx on public.blog_posts (status, published_at desc);

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.course_curriculum enable row level security;
alter table public.enquiries enable row level security;
alter table public.testimonials enable row level security;
alter table public.student_showcase enable row level security;
alter table public.gallery enable row level security;
alter table public.faqs enable row level security;
alter table public.blog_posts enable row level security;
alter table public.site_settings enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
    and role = 'admin'
  );
$$;

create policy "Published courses are readable" on public.courses for select using (is_published = true);
create policy "Published curriculum is readable" on public.course_curriculum for select using (
  exists (select 1 from public.courses where courses.id = course_curriculum.course_id and courses.is_published = true)
);
create policy "Public can create enquiries" on public.enquiries for insert with check (true);
create policy "Published testimonials are readable" on public.testimonials for select using (is_published = true);
create policy "Published showcase is readable" on public.student_showcase for select using (is_published = true);
create policy "Published gallery is readable" on public.gallery for select using (is_published = true);
create policy "Published faqs are readable" on public.faqs for select using (is_published = true);
create policy "Published blog posts are readable" on public.blog_posts for select using (status = 'published');

create policy "Admins manage profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage courses" on public.courses for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage curriculum" on public.course_curriculum for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage enquiries" on public.enquiries for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage testimonials" on public.testimonials for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage showcase" on public.student_showcase for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage gallery" on public.gallery for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage faqs" on public.faqs for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage blog posts" on public.blog_posts for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage site settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());
