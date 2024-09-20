import axios from 'axios';

const API_KEY = 'pub_3298642e3f7e1a1f3a3c0e7b6d6f3a5c6b9b7'; // New API key for NewsData.io
const BASE_URL = 'https://newsdata.io/api/1/news';

export const fetchNews = async (category = 'top') => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        country: 'cn', // Fetch news for China
        category,
        language: 'zh', // Chinese language
      },
    });
    return response.data.results || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};
