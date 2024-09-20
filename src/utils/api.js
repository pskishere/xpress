import axios from 'axios';

const API_KEY = 'pub_30271b6b9e3a23a3b9b4c5c6d5c3d7d2c4c9d'; // Replace with your actual NewsData.io API key
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
    throw error; // Propagate the error to be handled by the component
  }
};
