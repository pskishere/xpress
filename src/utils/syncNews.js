import dotenv from 'dotenv';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const API_KEY = '0d28e0b381cf4be18257ea7b7ee312e0';
const GOOGLE_TRANSLATE_API_KEY = 'AIzaSyDCeqpTloTHqFs0K2XgipHpLKUPt0rKSUo';
const categories = ['general', 'business', 'technology', 'entertainment', 'sports', 'science', 'health'];

const supabaseUrl = process.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = process.env.VITE_SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or API key is missing in the environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

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

const translateText = async (text) => {
  try {
    const response = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`, {
      q: text,
      target: 'zh-CN',
      format: 'text'
    });



    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return null;
  }
};

const insertNewsToSupabase = async (articles) => {
  for (const article of articles) {
    const title_zh = await translateText(article.title);
    console.log('title_zh', title_zh);
    const description_zh = await translateText(article.description);
    const { data, error } = await supabase
      .from('news')
      .upsert(
        {
          title: article.title,
          description: article.description,
          url: article.url,
          urltoimage: article.urlToImage,
          publishedat: article.publishedAt,
          source: article.source.name,
          category: article.category,
          title_zh:title_zh, 
          description_zh: description_zh
        },
        { onConflict: 'url' }
      );

    if (error) {
      console.error('Error inserting news to Supabase:', error);
    } else {
    }
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
