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
        pageSize: 100, // Request up to 100 articles
      },
    });

    if (response.status === 200 && response.data.status === 'ok') {
      console.log('API Response:', response.data);
      return response.data.articles || [];
    } else {
      console.error('API Error:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching news:', error.response ? error.response.data : error.message);
    return [];
  }
};
