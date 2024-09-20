import axios from 'axios';

const API_KEY = '0d28e0b381cf4be18257ea7b7ee312e0';

export const fetchNews = async (category = 'general') => {
  try {
    const response = await axios.get('/api/top-headlines', {
      params: {
        apiKey: API_KEY,
        country: 'us',
        category,
        pageSize: 100,
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

export const searchNews = async (query) => {
  try {
    const response = await axios.get('/api/everything', {
      params: {
        apiKey: API_KEY,
        q: query,
        pageSize: 100,
      },
    });

    if (response.status === 200 && response.data.status === 'ok') {
      console.log('Search API Response:', response.data);
      return response.data.articles || [];
    } else {
      console.error('Search API Error:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error searching news:', error.response ? error.response.data : error.message);
    return [];
  }
};
