import { useState, useEffect, useCallback } from 'react';
import { getNewsFromSupabase, searchNews } from '../utils/api';

const useNews = (category) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchNews = useCallback(async (reset = false) => {
    try {
      setLoading(true);
      const currentPage = reset ? 1 : page;
      const articles = await getNewsFromSupabase(category, currentPage);
      setNews(prevNews => reset ? articles : [...prevNews, ...articles]);
      setHasMore(articles.length === 10); // Assuming we fetch 10 items per page
      setPage(currentPage + 1);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [category, page]);

  useEffect(() => {
    fetchNews(true);
  }, [category]);

  const searchNewsArticles = async (query) => {
    try {
      setLoading(true);
      const articles = await searchNews(query);
      setNews(articles);
      setHasMore(false);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { news, loading, error, hasMore, fetchNews, searchNews: searchNewsArticles };
};

export default useNews;
