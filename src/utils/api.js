import { supabase } from './supabaseClient';

export const getNewsFromSupabase = async (category = 'general') => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('category', category)
      .order('publishedat', { ascending: false });

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
      .ilike('title', `%${query}%`)
      .order('publishedat', { ascending: false });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error searching news:', error.message);
    return [];
  }
};
