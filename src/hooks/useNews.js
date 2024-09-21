import { useState, useEffect } from 'react';
import { fetchNews, searchNews, getNewsFromSupabase } from '../utils/api';

const useNews = (category) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        await fetchNews(category); // This will update Supabase
        const articles = await getNewsFromSupabase(category);
        setNews(articles);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getNews();
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
