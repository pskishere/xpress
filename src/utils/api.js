import axios from 'axios';

const API_KEY = '7f2e0e1e4fbd37d1cad1c8e7d9b9c3a2'; // 这是一个示例API密钥，您需要在Gnews注册获取自己的密钥
const BASE_URL = 'https://gnews.io/api/v4/top-headlines';

export const fetchNews = async (category = 'general') => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        token: API_KEY,
        lang: 'zh', // 中文新闻
        country: 'cn', // 中国新闻
        topic: category,
        max: 10, // 每次请求10条新闻
      },
    });

    if (response.data && response.data.articles && response.data.articles.length > 0) {
      console.log('Fetched articles:', response.data.articles);
      return response.data.articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.image,
        publishedAt: article.publishedAt,
        source: { name: article.source.name }
      }));
    } else {
      console.error('API response does not contain articles:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    if (error.response) {
      console.error('Error response from API:', error.response.data);
      console.error('Error status:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    return [];
  }
};
