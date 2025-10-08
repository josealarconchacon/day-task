import { createClient } from "@supabase/supabase-js";

// supabase project URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// validate environment variables
if (
  !supabaseUrl ||
  supabaseUrl === import.meta.env.VITE_SUPABASE_URL ||
  supabaseUrl.includes(import.meta.env.VITE_SUPABASE_PROJECT_ID)
) {
  console.error("VITE_SUPABASE_URL is not set or is using placeholder value");
  console.error("Please set VITE_SUPABASE_URL in your .env file");
}

if (
  !supabaseAnonKey ||
  supabaseAnonKey === import.meta.env.VITE_SUPABASE_ANON_KEY ||
  supabaseAnonKey === import.meta.env.VITE_SUPABASE_ANON_KEY
) {
  console.error(
    "VITE_SUPABASE_ANON_KEY is not set or is using placeholder value"
  );
  console.error("Please set VITE_SUPABASE_ANON_KEY in your .env file");
}

// only create client if we have valid environment variables
export const supabase =
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes("your-project-id") &&
  !supabaseAnonKey.includes("your-anon-key")
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
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
