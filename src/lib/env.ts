const fallbackSiteUrl = "http://localhost:3000";

function resolveSiteUrl() {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();

  if (!rawUrl) {
    return fallbackSiteUrl;
  }

  const urlWithProtocol = rawUrl.startsWith("http://") || rawUrl.startsWith("https://")
    ? rawUrl
    : `https://${rawUrl}`;

  try {
    return new URL(urlWithProtocol).origin;
  } catch {
    return fallbackSiteUrl;
  }
}

export const env = {
  siteUrl: resolveSiteUrl(),
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.trim(),
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim(),
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
};

export function hasPublicSupabaseEnv() {
  return Boolean(env.supabaseUrl && env.supabaseAnonKey);
}
