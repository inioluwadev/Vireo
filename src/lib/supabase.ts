import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabase: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL' && supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY') {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
    console.warn(
      "\n[VIREO SETUP] Supabase environment variables are missing or are still placeholders." +
      "\nPlease update your .env file to enable database features.\n"
    );
}

export { supabase };
