import dotenv from 'dotenv';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

const API_KEY = '0d28e0b381cf4be18257ea7b7ee312e0';
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
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a translator. Translate the following English text to Chinese."
        },
        {
          role: "user",
          content: text
        }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content.trim();
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
          category: article.category
        },
        { onConflict: 'url', ignoreDuplicates: true }
      );

    if (error) {
      console.error('Error inserting news to Supabase:', error);
    } else if (data && data.length > 0) {
      // If the article was inserted (not ignored as duplicate), translate and update
      const title_zh = await translateText(article.title);
      const description_zh = await translateText(article.description);

      const { error: updateError } = await supabase
        .from('news')
        .update({ title_zh, description_zh })
        .eq('url', article.url);

      if (updateError) {
        console.error('Error updating translations:', updateError);
      } else {
        console.log(`Translated and updated article: ${article.title}`);
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
};

// Run the sync function
syncAllNews();
