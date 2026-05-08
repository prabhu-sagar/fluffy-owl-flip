import { createClient } from '@supabase/supabase-js';

// These should be provided in your environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// We initialize the client with placeholders if keys are missing to prevent the app from crashing.
// Actual database operations will only work once the real keys are provided.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);