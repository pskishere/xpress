// Import all the relevant exports from other files in the supabase directory
import { supabase } from './supabase.js';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth.jsx';
import { useNews, useAllNews, useAddNews, useUpdateNews, useDeleteNews } from './hooks/useNews.js';

// Export all the imported functions and objects
export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  useNews,
  useAllNews,
  useAddNews,
  useUpdateNews,
  useDeleteNews,
};
