import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### news

| name           | type                    | format                  | required |
|----------------|-------------------------|-------------------------|----------|
| id             | uuid                    | string                  | true     |
| title          | text                    | string                  | true     |
| description    | text                    | string                  | false    |
| title_zh       | text                    | string                  | false    |
| description_zh | text                    | string                  | false    |
| url            | text                    | string                  | true     |
| urltoimage     | text                    | string                  | false    |
| publishedat    | timestamp with time zone| string                  | false    |
| source         | text                    | string                  | false    |
| category       | text                    | string                  | false    |
| created_at     | timestamp with time zone| string                  | false    |
| updated_at     | timestamp with time zone| string                  | false    |

Note: 
- The 'id' field is a Primary Key with a default value of extensions.uuid_generate_v4().
- 'created_at' and 'updated_at' have default values of CURRENT_TIMESTAMP.
*/

export const useNews = (id) => useQuery({
    queryKey: ['news', id],
    queryFn: () => fromSupabase(supabase.from('news').select('*').eq('id', id).single()),
});

export const useNewsByCategory = (category, page = 1, pageSize = 10) => useQuery({
    queryKey: ['news', 'category', category, page],
    queryFn: () => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize - 1;
        let query = supabase
            .from('news')
            .select('*')
            .order('publishedat', { ascending: false })
            .range(start, end);
        
        if (category !== 'general') {
            query = query.eq('category', category);
        }
        
        return fromSupabase(query);
    },
});

export const useSearchNews = (searchQuery) => useQuery({
    queryKey: ['news', 'search', searchQuery],
    queryFn: () => fromSupabase(
        supabase
            .from('news')
            .select('*')
            .or(`title.ilike.%${searchQuery}%, description.ilike.%${searchQuery}%`)
            .order('publishedat', { ascending: false })
    ),
    enabled: !!searchQuery,
});

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
        mutationFn: ({ id, ...updateData }) => fromSupabase(
            supabase.from('news').update(updateData).eq('id', id)
        ),
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