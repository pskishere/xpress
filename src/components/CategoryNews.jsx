import React, { useEffect, useRef, useCallback } from 'react';
import NewsCard from './NewsCard';
import { useTranslation } from 'react-i18next';
import { Loader2 } from "lucide-react";

const CategoryNews = ({ news, loading, error, hasMore, fetchNews, isDomainAccess }) => {
  const { t } = useTranslation();
  const observer = useRef();
  const lastNewsElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchNews();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, fetchNews]);

  if (error) return <p className="text-center text-red-500">{t('errors.fetchingNews')}: {error}</p>;
  if (news.length === 0 && !loading) return <p className="text-center text-gray-500">{t('messages.noNewsAvailable')}</p>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item, index) => (
          <div key={item.id} ref={index === news.length - 1 ? lastNewsElementRef : null}>
            <NewsCard {...item} />
          </div>
        ))}
      </div>
      {loading && (
        <div className="flex justify-center items-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-pink-500" />
          <span className="ml-2 text-gray-600">{t('messages.loadingMore')}</span>
        </div>
      )}
    </div>
  );
};

export default CategoryNews;
