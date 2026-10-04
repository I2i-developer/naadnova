# Supabase development workflow

The project is configured for Supabase project `vlrpykoddokthdahxton`.

## First-time setup

Open the VS Code command palette and run **Tasks: Run Task**, then run:

1. `Supabase: Login`
2. `Supabase: Link project`
3. `Supabase: Sync migrations now`

The login step is intentionally completed in your own VS Code terminal. Supabase stores the CLI login outside this repository; no access token is committed to Git.

## Automatic migration sync

Run the VS Code task `Supabase: Watch migrations and sync` while developing. It watches `supabase/migrations/*.sql`. After a migration file finishes saving, it:

1. runs a remote migration dry-run;
2. applies pending migrations to the linked Supabase project;
3. regenerates `src/types/database.ts` from the live schema.

Stop the watcher with `Ctrl+C` in its dedicated terminal.

## Making database changes

Create each change as a new migration:

```powershell
npm run db:new -- add_student_progress
```

Edit the generated SQL file under `supabase/migrations`, then either save it while the watcher is active or run:

```powershell
npm run db:sync
```

Do not edit an already-applied migration. Add a new migration for every subsequent schema change so local and remote migration histories remain consistent.
