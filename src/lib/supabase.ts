import { createClient } from '@supabase/supabase-js';

// Using the provided Supabase URL as the default fallback
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qoosqzgkrdoplmancosl.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Initialize the client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);