import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

// Use a singleton pattern to ensure the client is created only once.
let supabase: SupabaseClient<Database> | null = null;

export const getSupabase = (): SupabaseClient<Database> => {
  if (supabase) {
    return supabase;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase URL or Anon Key is missing from environment variables."
    );
  }

  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
  return supabase;
};
