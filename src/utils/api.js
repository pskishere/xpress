import axios from 'axios';

const API_KEY = '0d28e0b381cf4be18257ea7b7ee312e0'; // Replace with your actual NewsAPI key
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNews = async (category = 'general') => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        country: 'cn', // Fetch news for China
        category,
        apiKey: API_KEY,
      },
    });
    return response.data.articles || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};
