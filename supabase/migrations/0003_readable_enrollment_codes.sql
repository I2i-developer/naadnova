-- Human-readable, course-aware learner identifiers.

alter table public.courses add column if not exists course_code text;

update public.courses set course_code = 'GTR' where slug = 'guitar-studies';
update public.courses set course_code = 'KEY' where slug = 'piano-theory-studies';
update public.courses set course_code = 'VOC' where slug = 'voice-performance-training';

update public.courses
set course_code = upper(substr(regexp_replace(slug, '[^a-zA-Z0-9]', '', 'g'), 1, 3))
where course_code is null;

alter table public.courses alter column course_code set not null;
alter table public.courses drop constraint if exists courses_course_code_format_check;
alter table public.courses add constraint courses_course_code_format_check
  check (course_code ~ '^[A-Z0-9]{2,6}$');

create sequence if not exists public.learner_code_sequence start 1001;

alter table public.course_enrollments add column if not exists enrollment_code text;

create or replace function public.assign_enrollment_code()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  selected_course_code text;
begin
  if new.enrollment_code is null then
    select course_code into selected_course_code
    from public.courses
    where id = new.course_id;

    new.enrollment_code := format(
      'NNA-%s-%s-%s',
      coalesce(selected_course_code, 'GEN'),
      to_char(coalesce(new.created_at, now()), 'YY'),
      lpad(nextval('public.learner_code_sequence')::text, 5, '0')
    );
  end if;
  return new;
end;
$$;

drop trigger if exists set_enrollment_code on public.course_enrollments;
create trigger set_enrollment_code
  before insert on public.course_enrollments
  for each row execute procedure public.assign_enrollment_code();

update public.course_enrollments enrollment
set enrollment_code = format(
  'NNA-%s-%s-%s',
  coalesce(course.course_code, 'GEN'),
  to_char(enrollment.created_at, 'YY'),
  lpad(nextval('public.learner_code_sequence')::text, 5, '0')
)
from public.courses course
where course.id = enrollment.course_id
  and enrollment.enrollment_code is null;

alter table public.course_enrollments alter column enrollment_code set not null;
create unique index if not exists course_enrollments_code_idx
  on public.course_enrollments (enrollment_code);
