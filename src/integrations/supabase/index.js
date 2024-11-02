import { supabase } from './supabase.js';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth.jsx';
import { 
    useNews,
    useNewsByCategory,
    useSearchNews,
    useAddNews,
    useUpdateNews,
    useDeleteNews
} from './hooks/useNews.js';

export {
    supabase,
    SupabaseAuthProvider,
    useSupabaseAuth,
    SupabaseAuthUI,
    useNews,
    useNewsByCategory,
    useSearchNews,
    useAddNews,
    useUpdateNews,
    useDeleteNews
};