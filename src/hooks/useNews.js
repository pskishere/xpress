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
        let articles;

        // Check if the site is being accessed via a domain name
        const isDomainAccess = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

        if (isDomainAccess) {
          // If accessed via domain, fetch news directly from Supabase
          articles = await getNewsFromSupabase(category);
        } else {
          // If accessed locally, fetch and update news as before
          await fetchNews(category); // This will update Supabase
          articles = await getNewsFromSupabase(category);
        }

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
