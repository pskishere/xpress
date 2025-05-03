
import axios from 'axios';
import { API_KEY, categories } from './config.js';

export const fetchNewsForCategory = async (category) => {
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
      return response.data.articles
        .filter(article => 
          article && article.title && article.description && 
          article.source && !article.title.toLowerCase().includes('removed')
        )
        .map(article => ({
          ...article,
          // Ensure publishedat is in a proper format - fix the 'unknownDate' issue
          publishedat: article.publishedAt ? new Date(article.publishedAt).toISOString() : null,
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

export const fetchAllCategoriesNews = async () => {
  const allNewsPromises = categories.map(category => fetchNewsForCategory(category));
  const results = await Promise.allSettled(allNewsPromises);
  
  return results.reduce((articles, result, index) => {
    if (result.status === 'fulfilled') {
      return [...articles, ...result.value];
    }
    console.error(`Failed to fetch ${categories[index]} news`);
    return articles;
  }, []);
};
