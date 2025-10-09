import { createClient } from "@supabase/supabase-js";

// supabase project URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// validate environment variables
const hasValidUrl =
  supabaseUrl &&
  supabaseUrl !== "undefined" &&
  !supabaseUrl.includes("your-project-id");
const hasValidKey =
  supabaseAnonKey &&
  supabaseAnonKey !== "undefined" &&
  !supabaseAnonKey.includes("your-anon-key");

if (!hasValidUrl || !hasValidKey) {
  console.warn("⚠️ Supabase is not configured. Running in offline mode.");
  console.info(
    "To enable database sync, add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file"
  );
}

// only create  if there is a valid env variables
export const supabase =
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes("your-project-id") &&
  !supabaseAnonKey.includes("your-anon-key")
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
        },
        realtime: {
          params: {
            eventsPerSecond: 10,
          },
        },
      })
    : null;

// database table name
export const TASKS_TABLE = "tasks";
