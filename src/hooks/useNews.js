import { useState, useEffect, useCallback } from 'react';
import { getNewsFromSupabase, searchNews as searchNewsApi } from '../utils/api';
import { useTranslation } from 'react-i18next';

const useNews = (initialCategory = 'general') => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(initialCategory);
  const { i18n } = useTranslation();

  const fetchNews = useCallback(async (reset = false) => {
    try {
      setLoading(true);
      const currentPage = reset ? 1 : page;
      const articles = await getNewsFromSupabase(category, currentPage, 10, i18n.language);
      setNews(prevNews => reset ? articles : [...prevNews, ...articles]);
      setHasMore(articles.length === 10);
      setPage(currentPage + 1);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category, page, i18n.language]);

  useEffect(() => {
    fetchNews(true);
  }, [category, i18n.language]);

  const searchNews = async (query) => {
    try {
      setLoading(true);
      const articles = await searchNewsApi(query, i18n.language);
      setNews(articles);
      setHasMore(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const changeCategory = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
    setNews([]);
    setHasMore(true);
  };

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
