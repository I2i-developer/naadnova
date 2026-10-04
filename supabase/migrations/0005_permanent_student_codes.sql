-- Permanent academy identity assigned before a student enrolls in any course.
create sequence if not exists public.student_code_sequence start with 1001;

alter table public.profiles add column if not exists student_code text;

create or replace function public.assign_student_code()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'UPDATE' then
    new.student_code := old.student_code;
  elsif nullif(trim(new.student_code), '') is null then
    new.student_code := format(
      'NNA-STU-%s-%s',
      to_char(coalesce(new.created_at, now()), 'YY'),
      lpad(nextval('public.student_code_sequence')::text, 5, '0')
    );
  end if;

  return new;
end;
$$;

update public.profiles
set student_code = format(
  'NNA-STU-%s-%s',
  to_char(created_at, 'YY'),
  lpad(nextval('public.student_code_sequence')::text, 5, '0')
)
where nullif(trim(student_code), '') is null;

alter table public.profiles alter column student_code set default '';
alter table public.profiles alter column student_code set not null;

drop trigger if exists set_student_code on public.profiles;
create trigger set_student_code
  before insert or update of student_code on public.profiles
  for each row execute procedure public.assign_student_code();

create unique index if not exists profiles_student_code_key
  on public.profiles (student_code);
