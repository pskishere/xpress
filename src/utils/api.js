import axios from 'axios';

const API_KEY = '0d28e0b381cf4be18257ea7b7ee312e0';
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

export const fetchNews = async (category = 'general') => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apiKey: API_KEY,
        country: 'cn', // Fetch news for China
        category,
        language: 'zh', // Chinese language
      },
    });
    return response.data.articles || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};
