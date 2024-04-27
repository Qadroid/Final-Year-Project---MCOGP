import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xgfolshypzzeetoaekhq.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY as string;

if (!supabaseKey) {
  throw new Error('SUPABASE_KEY is not defined');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
