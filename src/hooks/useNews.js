import { useState, useEffect } from 'react';
import { fetchNews } from '../utils/api';

const useNews = (category) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        const articles = await fetchNews(category);
        // Filter out any articles with missing required properties
        const validArticles = articles.filter(article => 
          article && article.title && article.description && article.source
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

  return { news, loading, error };
};

export default useNews;
