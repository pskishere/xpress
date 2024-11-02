import { supabase } from './supabase';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth';
import { 
    useNews,
    useAllNews,
    useAddNews,
    useUpdateNews,
    useDeleteNews
} from './hooks/useNews';

export {
    supabase,
    SupabaseAuthProvider,
    useSupabaseAuth,
    SupabaseAuthUI,
    useNews,
    useAllNews,
    useAddNews,
    useUpdateNews,
    useDeleteNews
};