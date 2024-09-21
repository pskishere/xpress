import axios from 'axios';
import { supabase } from './supabaseClient';

const API_KEY = '0d28e0b381cf4be18257ea7b7ee312e0';
const categories = ['general', 'business', 'technology', 'entertainment', 'sports', 'science', 'health'];

const fetchNewsForCategory = async (category) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        apiKey: API_KEY,
        country: 'us',
        category,
        pageSize: 100,
      },
    });

    if (response.status === 200 && response.data.status === 'ok') {
      return response.data.articles.filter(article => 
        article && article.title && article.description && article.source && !article.title.toLowerCase().includes('removed')
      ).map(article => ({
        ...article,
        category,
      }));
    } else {
      console.error(`API Error for ${category}:`, response.data);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching ${category} news:`, error.response ? error.response.data : error.message);
    return [];
  }
};

const insertNewsToSupabase = async (articles) => {
  const { data, error } = await supabase
    .from('news')
    .upsert(
      articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        urltoimage: article.urlToImage,
        publishedat: article.publishedAt,
        source: article.source.name,
        category: article.category
      })),
      { onConflict: 'url' }
    );

  if (error) {
    console.error('Error inserting news to Supabase:', error);
  } else {
    console.log(`Successfully inserted/updated ${data.length} articles.`);
  }
};

const syncAllNews = async () => {
  console.log('Starting news synchronization...');
  for (const category of categories) {
    console.log(`Fetching ${category} news...`);
    const articles = await fetchNewsForCategory(category);
    console.log(`Inserting ${articles.length} ${category} articles to Supabase...`);
    await insertNewsToSupabase(articles);
  }
  console.log('News synchronization completed.');
};

// Run the sync function
syncAllNews();