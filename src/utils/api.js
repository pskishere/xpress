import axios from 'axios';
import { supabase } from './supabaseClient';

const API_KEY = '0d28e0b381cf4be18257ea7b7ee312e0';

const insertNewsToSupabase = async (articles) => {
  for (const article of articles) {
    const { data, error } = await supabase
      .from('news')
      .upsert({
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        source: article.source.name,
        category: article.category
      }, {
        onConflict: 'url'
      });

    if (error) console.error('Error inserting news:', error);
  }
};

export const fetchNews = async (category = 'general') => {
  try {
    const response = await axios.get('/api/top-headlines', {
      params: {
        apiKey: API_KEY,
        country: 'us',
        category,
        pageSize: 100,
      },
    });

    if (response.status === 200 && response.data.status === 'ok') {
      const articles = response.data.articles.filter(article => 
        article && article.title && article.description && article.source && !article.title.toLowerCase().includes('removed')
      );
      
      articles.forEach(article => article.category = category);
      await insertNewsToSupabase(articles);

      return articles;
    } else {
      console.error('API Error:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching news:', error.response ? error.response.data : error.message);
    return [];
  }
};

export const searchNews = async (query) => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .ilike('title', `%${query}%`)
      .order('publishedAt', { ascending: false });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error searching news:', error.message);
    return [];
  }
};

export const getNewsFromSupabase = async (category = 'general') => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('category', category)
      .order('publishedAt', { ascending: false });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching news from Supabase:', error.message);
    return [];
  }
};
