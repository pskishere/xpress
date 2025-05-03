
import dotenv from 'dotenv';
import { categories } from './news/config.js';
import { fetchNewsForCategory } from './news/fetchNews.js';
import { insertNewsToSupabase, translateAndUpdateNews } from './news/databaseOperations.js';

dotenv.config();

const syncAllNews = async () => {
  console.log('Starting news synchronization...');
  for (const category of categories) {
    console.log(`Fetching ${category} news...`);
    const articles = await fetchNewsForCategory(category);
    console.log(`Processing ${articles.length} ${category} articles (fetching + translating)...`);
    await insertNewsToSupabase(articles);
  }
  console.log('News synchronization and translation completed.');

  // Check and process untranslated articles
  console.log('Checking for any untranslated articles...');
  await translateAndUpdateNews();
  console.log('All processes completed.');
};

// Run the sync function
syncAllNews();
