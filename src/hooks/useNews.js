import { useState, useEffect } from 'react';
import { getNewsFromSupabase, searchNews } from '../utils/api';

const useNews = (category) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const articles = await getNewsFromSupabase(category);
        setNews(articles);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  const searchNewsArticles = async (query) => {
    try {
      setLoading(true);
      const articles = await searchNews(query);
      setNews(articles);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { news, loading, error, searchNews: searchNewsArticles };
};

export default useNews;
