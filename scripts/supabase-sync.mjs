import { spawn } from "node:child_process";
import { mkdir, rename, writeFile } from "node:fs/promises";
import { watch } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const migrationsDirectory = path.join(root, "supabase", "migrations");
const generatedTypesPath = path.join(root, "src", "types", "database.ts");
const temporaryTypesPath = `${generatedTypesPath}.tmp`;
const executable = process.execPath;
const cliPath = path.join(root, "node_modules", "supabase", "dist", "supabase.js");

function run(args, capture = false) {
  return new Promise((resolve, reject) => {
    const child = spawn(executable, [cliPath, ...args], {
      cwd: root,
      env: process.env,
      shell: false,
      stdio: capture ? ["ignore", "pipe", "inherit"] : "inherit"
    });
    let output = "";
    if (capture) child.stdout.on("data", (chunk) => { output += chunk.toString(); });
    child.on("error", reject);
    child.on("exit", (code) => code === 0 ? resolve(output) : reject(new Error(`supabase ${args.join(" ")} exited with code ${code}`)));
  });
}

async function generateTypes() {
  console.log("\n[supabase] Refreshing TypeScript database types...");
  const output = await run(["gen", "types", "typescript", "--linked", "--schema", "public"], true);
  if (!output.trim().startsWith("export type")) throw new Error("Supabase returned an unexpected type definition response.");
  await mkdir(path.dirname(generatedTypesPath), { recursive: true });
  await writeFile(temporaryTypesPath, output, "utf8");
  await rename(temporaryTypesPath, generatedTypesPath);
  console.log("[supabase] Types updated at src/types/database.ts");
}

async function pushMigrations() {
  console.log("\n[supabase] Checking pending migrations...");
  await run(["db", "push", "--linked", "--dry-run"]);
  console.log("[supabase] Applying pending migrations...");
  await run(["db", "push", "--linked", "--yes"]);
  await generateTypes();
  console.log("[supabase] Remote database and local types are in sync.\n");
}

async function watchMigrations() {
  console.log(`[supabase] Watching ${migrationsDirectory}`);
  console.log("[supabase] Save a migration to run a checked remote sync. Press Ctrl+C to stop.\n");

  let timer;
  let running = false;
  let queued = false;

  async function sync() {
    if (running) {
      queued = true;
      return;
    }
    running = true;
    try {
      await pushMigrations();
    } catch (error) {
      console.error("[supabase] Sync failed. No further migration was applied after the error.");
      console.error(error instanceof Error ? error.message : error);
    } finally {
      running = false;
      if (queued) {
        queued = false;
        await sync();
      }
    }
  }

  watch(migrationsDirectory, { persistent: true }, (_event, filename) => {
    if (!filename?.endsWith(".sql")) return;
    clearTimeout(timer);
    timer = setTimeout(sync, 1800);
  });
}

const mode = process.argv[2];
if (mode === "types") await generateTypes();
else if (mode === "push") await pushMigrations();
else if (mode === "watch") await watchMigrations();
else throw new Error("Use one of: types, push, watch");
