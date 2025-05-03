
import { supabase } from './supabaseClient.js';
import { translateText } from './translation.js';

export const insertNewsToSupabase = async (articles) => {
  for (const article of articles) {
    try {
      console.log(`Translating article: "${article.title.substring(0, 50)}..."`);
      
      // Get translations for title and description
      const title_zh = await translateText(article.title);
      const description_zh = await translateText(article.description);

      // Insert news and translations
      const { data, error } = await supabase
        .from('news')
        .upsert(
          {
            title: article.title,
            description: article.description,
            url: article.url,
            urltoimage: article.urlToImage,
            publishedat: article.publishedat, // Using the fixed date format
            source: article.source.name,
            category: article.category,
            title_zh: title_zh,
            description_zh: description_zh,
          },
          { onConflict: 'url' }
        );

      if (error) {
        console.error('Error inserting news to Supabase:', error);
      } else {
        console.log(`Successfully inserted and translated article: "${article.title.substring(0, 50)}..."`);
      }
    } catch (error) {
      console.error('Error processing article:', error);
      // Continue processing next article
      continue;
    }
  }
};

export const translateAndUpdateNews = async () => {
  // Only process articles with missing translations
  const { data: untranslatedNews, error } = await supabase
    .from('news')
    .select('id, title, description')
    .is('title_zh', null)
    .is('description_zh', null);

  if (error) {
    console.error('Error fetching untranslated news:', error);
    return;
  }

  if (untranslatedNews.length > 0) {
    console.log(`Found ${untranslatedNews.length} articles that need translation...`);
    
    for (const article of untranslatedNews) {
      try {
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
      } catch (error) {
        console.error(`Error translating article ID ${article.id}:`, error);
        continue;
      }
    }
  } else {
    console.log('No untranslated articles found.');
  }
};
