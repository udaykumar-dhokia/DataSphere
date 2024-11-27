import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://eqhsbfhpoodefdpthcxi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxaHNiZmhwb29kZWZkcHRoY3hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0MjQ5NTIsImV4cCI6MjA0ODAwMDk1Mn0.5Jfl-8RNHO8ULVL8tcHB2Vby9nOlkS8_AKjJW5vYLPY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
