import { randomBytes } from "node:crypto";
import { readFile } from "node:fs/promises";

import { createClient } from "@supabase/supabase-js";

function parseEnv(source) {
  return Object.fromEntries(source.split(/\r?\n/).flatMap((line) => {
    const match = line.match(/^\s*([^#][^=]*)=(.*)\s*$/);
    if (!match) return [];
    return [[match[1].trim(), match[2].trim().replace(/^(['"])(.*)\1$/, "$2")]];
  }));
}

const env = parseEnv(await readFile(".env.local", "utf8"));
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in .env.local.");
}

const email = (process.argv[2] || "admin@naadnovaacademy.com").trim().toLowerCase();
const password = process.argv[3] || `Naadnova!${randomBytes(12).toString("base64url")}`;
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const { data: usersPage, error: listError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
if (listError) throw listError;

let user = usersPage.users.find((candidate) => candidate.email?.toLowerCase() === email);
if (user) {
  const { data, error } = await supabase.auth.admin.updateUserById(user.id, {
    password,
    email_confirm: true,
    user_metadata: { ...user.user_metadata, full_name: "Naadnova Administrator" }
  });
  if (error) throw error;
  user = data.user;
} else {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: "Naadnova Administrator" }
  });
  if (error) throw error;
  user = data.user;
}

const { error: profileError } = await supabase.from("profiles").upsert({
  id: user.id,
  full_name: "Naadnova Administrator",
  email,
  role: "admin",
  updated_at: new Date().toISOString()
}, { onConflict: "id" });
if (profileError) throw profileError;

const { data: profile, error: verificationError } = await supabase
  .from("profiles")
  .select("id, email, role")
  .eq("id", user.id)
  .single();
if (verificationError || profile?.role !== "admin") {
  throw verificationError ?? new Error("Admin role verification failed.");
}

console.log(JSON.stringify({ email, password, userId: user.id, role: profile.role }, null, 2));
