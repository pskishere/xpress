import { useState, useEffect } from 'react';
import { fetchNews, searchNews as apiSearchNews } from '../utils/api';

const useNews = (category) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        const articles = await fetchNews(category);
        const validArticles = articles.filter(article => 
          article && article.title && article.description && article.source && !article.title.toLowerCase().includes('removed')
        );
        setNews(validArticles);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getNews();
  }, [category]);

  const searchNews = async (query) => {
    try {
      setLoading(true);
      const articles = await apiSearchNews(query);
      const validArticles = articles.filter(article => 
        article && article.title && article.description && article.source && !article.title.toLowerCase().includes('removed')
      );
      setNews(validArticles);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { news, loading, error, searchNews };
};

export default useNews;
