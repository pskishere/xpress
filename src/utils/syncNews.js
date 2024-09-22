import dotenv from 'dotenv';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const API_KEY = '0d28e0b381cf4be18257ea7b7ee312e0';
const GOOGLE_TRANSLATE_API_KEY = 'AIzaSyDCeqpTloTHqFs0K2XgipHpLKUPt0rKSUo';
const categories = [
  'general', 'business', 'technology', 'entertainment', 'sports', 'science', 'health',
  'politics', 'economy', 'culture', 'world', 'education', 'environment'
];

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
        category: mapCategoryToNewsAPI(category),
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

const mapCategoryToNewsAPI = (category) => {
  const mapping = {
    'general': 'general',
    'business': 'business',
    'technology': 'technology',
    'entertainment': 'entertainment',
    'sports': 'sports',
    'science': 'science',
    'health': 'health',
    'politics': 'politics',
    'economy': 'business',
    'culture': 'entertainment',
    'world': 'general',
    'education': 'science',
    'environment': 'science'
  };
  return mapping[category] || 'general';
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
        },
        { onConflict: 'url' }
      );

    if (error) {
      console.error('Error inserting news to Supabase:', error);
    }
  }
};

const translateAndUpdateNews = async () => {
  const { data: untranslatedNews, error } = await supabase
    .from('news')
    .select('id, title, description')
    .is('title_zh', null)
    .is('description_zh', null);

  if (error) {
    console.error('Error fetching untranslated news:', error);
    return;
  }

  for (const article of untranslatedNews) {
    const title_zh = await translateText(article.title);
    const description_zh = await translateText(article.description);

    if (title_zh && description_zh) {
      const { error: updateError } = await supabase
        .from('news')
        .update({ title_zh, description_zh })
        .eq('id', article.id);

      if (updateError) {
        console.error('Error updating translations:', updateError);
      } else {
        console.log(`Translated and updated article ID: ${article.id}`);
      }
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

  console.log('Starting translation for untranslated articles...');
  await translateAndUpdateNews();
  console.log('Translation process completed.');
};

// Run the sync function
syncAllNews();
