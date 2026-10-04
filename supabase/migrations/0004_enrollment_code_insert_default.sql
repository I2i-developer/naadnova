-- Make trigger-generated learner codes optional in generated insert types.

alter table public.course_enrollments
  alter column enrollment_code set default '';

create or replace function public.assign_enrollment_code()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  selected_course_code text;
begin
  if nullif(trim(new.enrollment_code), '') is null then
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
