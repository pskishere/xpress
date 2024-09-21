import { supabase } from './supabaseClient';

export const getNewsFromSupabase = async (category = 'general', page = 1, pageSize = 10) => {
  try {
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('category', category)
      .order('publishedat', { ascending: false })
      .range(start, end);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching news from Supabase:', error.message);
    return [];
  }
};

export const searchNews = async (query) => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .or(`title.ilike.%${query}%, description.ilike.%${query}%, title_zh.ilike.%${query}%, description_zh.ilike.%${query}%`)
      .order('publishedat', { ascending: false });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error searching news:', error.message);
    return [];
  }
};
