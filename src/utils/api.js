import { supabase } from './supabaseClient';

export const getNewsFromSupabase = async (category = 'general', page = 1, pageSize = 10, language = 'en') => {
  try {
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    let query = supabase
      .from('news')
      .select('*')
      .eq('category', category)
      .order('publishedat', { ascending: false })
      .range(start, end);

    if (language === 'zh') {
      query = query.not('title_zh', 'is', null);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching news from Supabase:', error.message);
    return [];
  }
};

export const searchNews = async (query, language = 'en') => {
  try {
    let searchQuery = supabase
      .from('news')
      .select('*')
      .or(`title.ilike.%${query}%, description.ilike.%${query}%`)
      .order('publishedat', { ascending: false });

    if (language === 'zh') {
      searchQuery = searchQuery.or(`title_zh.ilike.%${query}%, description_zh.ilike.%${query}%`);
    }

    const { data, error } = await searchQuery;

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error searching news:', error.message);
    return [];
  }
};
