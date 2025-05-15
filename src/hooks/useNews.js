import { useState, useEffect, useCallback, useRef } from 'react';
import { getNewsFromSupabase, searchNews as searchNewsApi } from '../utils/api';
import { useTranslation } from 'react-i18next';

// Cached news state that persists between component unmounts
const globalNewsState = {
  news: {},
  pages: {},
  hasMore: {},
  category: 'business'
};

const useNews = (initialCategory = 'business') => {
  const [news, setNews] = useState(() => 
    globalNewsState.news[initialCategory] || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(() => 
    globalNewsState.hasMore[initialCategory] !== undefined ? 
    globalNewsState.hasMore[initialCategory] : true);
  const [page, setPage] = useState(() => 
    globalNewsState.pages[initialCategory] || 1);
  const [category, setCategory] = useState(initialCategory);
  const { i18n } = useTranslation();
  const timeoutRef = useRef(null);

  // Update global state when local state changes
  useEffect(() => {
    globalNewsState.news[category] = news;
    globalNewsState.pages[category] = page;
    globalNewsState.hasMore[category] = hasMore;
    globalNewsState.category = category;
  }, [news, page, hasMore, category]);

  const fetchNews = useCallback(async (reset = false) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
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
    }, 300);
  }, [category, page, i18n.language]);

  useEffect(() => {
    // Only fetch if we don't have cached data or we're changing categories
    if (!globalNewsState.news[category] || globalNewsState.news[category].length === 0) {
      fetchNews(true);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [category, i18n.language]);

  const searchNews = useCallback(async (query) => {
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
  }, [i18n.language]);

  const changeCategory = useCallback((newCategory) => {
    // If we have news for this category already, use that
    if (globalNewsState.news[newCategory] && globalNewsState.news[newCategory].length > 0) {
      setCategory(newCategory);
      setNews(globalNewsState.news[newCategory]);
      setPage(globalNewsState.pages[newCategory]);
      setHasMore(globalNewsState.hasMore[newCategory]);
    } else {
      // Otherwise fetch new data
      setCategory(newCategory);
      setPage(1);
      setNews([]);
      setHasMore(true);
    }
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
