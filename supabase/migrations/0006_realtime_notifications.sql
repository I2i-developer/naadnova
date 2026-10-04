-- Role-aware dashboard notifications delivered through Supabase Realtime.

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in (
    'account',
    'enrollment',
    'payment',
    'access',
    'lesson',
    'new_student',
    'new_enrollment'
  )),
  title text not null,
  message text not null,
  href text,
  metadata jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists notifications_user_created_idx
  on public.notifications (user_id, created_at desc);
create index if not exists notifications_user_unread_idx
  on public.notifications (user_id, created_at desc)
  where read_at is null;

alter table public.notifications enable row level security;
alter table public.notifications replica identity full;

create policy "Users read own notifications"
  on public.notifications for select
  using (user_id = auth.uid());

create policy "Users mark own notifications read"
  on public.notifications for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

revoke insert, delete on table public.notifications from anon, authenticated;
grant select on table public.notifications to authenticated;
grant update (read_at) on table public.notifications to authenticated;

do $$
begin
  alter publication supabase_realtime add table public.notifications;
exception
  when duplicate_object then null;
end;
$$;

create or replace function public.notify_enrollment_created()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  course_title text;
  course_slug text;
  learner_name text;
  learner_code text;
begin
  select title, slug into course_title, course_slug
  from public.courses where id = new.course_id;

  select coalesce(full_name, email, 'A student'), student_code
  into learner_name, learner_code
  from public.profiles where id = new.user_id;

  if new.status = 'approved' and new.payment_status = 'paid' then
    insert into public.notifications (user_id, type, title, message, href, metadata)
    values (
      new.user_id,
      'access',
      'Course access unlocked',
      format('You can now begin %s.', coalesce(course_title, 'your course')),
      '/dashboard/courses/' || course_slug,
      jsonb_build_object('course_id', new.course_id, 'enrollment_id', new.id)
    );
  else
    insert into public.notifications (user_id, type, title, message, href, metadata)
    values (
      new.user_id,
      'enrollment',
      'Registration received',
      format('Your registration for %s is awaiting payment confirmation.', coalesce(course_title, 'your course')),
      '/dashboard',
      jsonb_build_object('course_id', new.course_id, 'enrollment_id', new.id)
    );
  end if;

  if new.status <> 'approved' then
    insert into public.notifications (user_id, type, title, message, href, metadata)
    select
      id,
      'new_enrollment',
      'New course registration',
      format('%s (%s) requested %s.', learner_name, coalesce(learner_code, 'ID pending'), coalesce(course_title, 'a course')),
      '/admin/enrollments',
      jsonb_build_object('course_id', new.course_id, 'enrollment_id', new.id, 'student_id', new.user_id)
    from public.profiles
    where role = 'admin';
  end if;

  return new;
end;
$$;

drop trigger if exists notify_on_enrollment_created on public.course_enrollments;
create trigger notify_on_enrollment_created
  after insert on public.course_enrollments
  for each row execute procedure public.notify_enrollment_created();

create or replace function public.notify_enrollment_changed()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  course_title text;
  course_slug text;
begin
  select title, slug into course_title, course_slug
  from public.courses where id = new.course_id;

  if new.payment_status = 'paid' and old.payment_status is distinct from new.payment_status then
    insert into public.notifications (user_id, type, title, message, href, metadata)
    values (
      new.user_id,
      'payment',
      'Payment confirmed',
      format('Your payment for %s has been confirmed.', coalesce(course_title, 'your course')),
      '/dashboard',
      jsonb_build_object('course_id', new.course_id, 'enrollment_id', new.id)
    );
  end if;

  if new.status = 'approved' and old.status is distinct from new.status then
    insert into public.notifications (user_id, type, title, message, href, metadata)
    values (
      new.user_id,
      'access',
      'Course access unlocked',
      format('You can now begin %s.', coalesce(course_title, 'your course')),
      '/dashboard/courses/' || course_slug,
      jsonb_build_object('course_id', new.course_id, 'enrollment_id', new.id)
    );
  elsif new.status = 'rejected' and old.status is distinct from new.status then
    insert into public.notifications (user_id, type, title, message, href, metadata)
    values (
      new.user_id,
      'enrollment',
      'Registration needs attention',
      format('Please contact the academy about your %s registration.', coalesce(course_title, 'course')),
      '/dashboard',
      jsonb_build_object('course_id', new.course_id, 'enrollment_id', new.id)
    );
  end if;

  return new;
end;
$$;

drop trigger if exists notify_on_enrollment_changed on public.course_enrollments;
create trigger notify_on_enrollment_changed
  after update of status, payment_status on public.course_enrollments
  for each row execute procedure public.notify_enrollment_changed();

create or replace function public.notify_new_lesson()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  course_title text;
  course_slug text;
begin
  if new.is_published and (tg_op = 'INSERT' or old.is_published is distinct from new.is_published) then
    select title, slug into course_title, course_slug
    from public.courses where id = new.course_id;

    insert into public.notifications (user_id, type, title, message, href, metadata)
    select
      enrollment.user_id,
      'lesson',
      'New lesson available',
      format('%s was added to %s.', new.title, coalesce(course_title, 'your course')),
      '/dashboard/courses/' || course_slug,
      jsonb_build_object('course_id', new.course_id, 'video_id', new.id, 'chapter_id', new.chapter_id)
    from public.course_enrollments enrollment
    where enrollment.course_id = new.course_id
      and enrollment.status = 'approved'
      and enrollment.payment_status = 'paid';
  end if;

  return new;
end;
$$;

drop trigger if exists notify_on_lesson_published on public.course_videos;
create trigger notify_on_lesson_published
  after insert or update of is_published on public.course_videos
  for each row execute procedure public.notify_new_lesson();

create or replace function public.notify_new_student()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role = 'user' then
    insert into public.notifications (user_id, type, title, message, href, metadata)
    select
      id,
      'new_student',
      'New student joined',
      format('%s created a Naadnova account.', coalesce(new.full_name, new.email, 'A new student')),
      '/admin/users',
      jsonb_build_object('student_id', new.id, 'student_code', new.student_code)
    from public.profiles
    where role = 'admin';
  end if;

  return new;
end;
$$;

drop trigger if exists notify_on_new_student on public.profiles;
create trigger notify_on_new_student
  after insert on public.profiles
  for each row execute procedure public.notify_new_student();

