import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY

if (!supabaseUrl) {
  throw new Error('VITE_SUPABASE_PROJECT_URL is not defined in the environment variables')
}

if (!supabaseKey) {
  throw new Error('VITE_SUPABASE_API_KEY is not defined in the environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Create the news table if it doesn't exist
export const createNewsTable = async () => {
  const { error } = await supabase.rpc('create_news_table');
  if (error) console.error('Error creating news table:', error);
};
