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
        pageSize: 100, // Request more articles
      },
    });

    if (response.data.status === 'ok' && response.data.articles.length > 0) {
      console.log('Fetched articles:', response.data.articles);
      return response.data.articles;
    } else {
      console.error('API response does not contain articles:', response.data);
      return [];
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response from API:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }
    console.error('Error config:', error.config);
    return [];
  }
};
