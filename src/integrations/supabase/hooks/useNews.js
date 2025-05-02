
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

export const useNews = (id) => useQuery({
    queryKey: ['news', id],
    queryFn: () => fromSupabase(supabase.from('news').select('*').eq('id', id).single()),
});

export const useAllNews = () => useQuery({
    queryKey: ['news'],
    queryFn: () => fromSupabase(supabase.from('news').select('*')),
});

export const useNewsByCategory = (category, page = 1, pageSize = 10, language = 'en') => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;
    
    return useQuery({
        queryKey: ['news', 'category', category, page, pageSize, language],
        queryFn: () => {
            let query = supabase
                .from('news')
                .select('*')
                .eq('category', category)
                .order('publishedat', { ascending: false })
                .range(start, end);

            if (language === 'zh') {
                query = query.not('title_zh', 'is', null);
            }

            return fromSupabase(query);
        },
    });
};

export const useSearchNews = (searchQuery, language = 'en') => {
    return useQuery({
        queryKey: ['news', 'search', searchQuery, language],
        queryFn: () => {
            if (!searchQuery.trim()) return [];
            
            let query = supabase
                .from('news')
                .select('*')
                .order('publishedat', { ascending: false });

            if (language === 'zh') {
                query = query.or(`title_zh.ilike.%${searchQuery}%, description_zh.ilike.%${searchQuery}%, content_zh.ilike.%${searchQuery}%`);
            } else {
                query = query.or(`title.ilike.%${searchQuery}%, description.ilike.%${searchQuery}%, content.ilike.%${searchQuery}%`);
            }

            return fromSupabase(query);
        },
        enabled: !!searchQuery.trim(),
    });
};

export const useAddNews = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newNews) => fromSupabase(supabase.from('news').insert([newNews])),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
        },
    });
};

export const useUpdateNews = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('news').update(updateData).eq('id', id)),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['news', variables.id] });
            queryClient.invalidateQueries({ queryKey: ['news'] });
        },
    });
};

export const useDeleteNews = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('news').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
        },
    });
};
