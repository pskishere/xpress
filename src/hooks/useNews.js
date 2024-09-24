import { useState, useEffect, useCallback, useRef } from 'react';
import { getNewsFromSupabase, searchNews as searchNewsApi } from '../utils/api';

const useNews = (initialCategory = 'general') => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(initialCategory);
  const timeoutRef = useRef(null);

  const fetchNews = useCallback(async (reset = false) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        const currentPage = reset ? 1 : page;
        const articles = await getNewsFromSupabase(category, currentPage, 10);
        setNews(prevNews => reset ? articles : [...prevNews, ...articles]);
        setHasMore(articles.length === 10);
        setPage(currentPage + 1);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, [category, page]);

  useEffect(() => {
    fetchNews(true);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [category]);

  const searchNews = useCallback(async (query) => {
    try {
      setLoading(true);
      const articles = await searchNewsApi(query);
      setNews(articles);
      setHasMore(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const changeCategory = useCallback((newCategory) => {
    setCategory(newCategory);
    setPage(1);
    setNews([]);
    setHasMore(true);
  }, []);

  return { 
    news, 
    loading, 
    error, 
    hasMore, 
    fetchNews, 
    searchNews, 
    changeCategory 
  };
};

export default useNews;
