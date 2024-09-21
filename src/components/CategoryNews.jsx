import React, { useEffect, useRef, useCallback } from 'react';
import NewsCard from './NewsCard';
import { useTranslation } from 'react-i18next';

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

  useEffect(() => {
    // This effect is now empty as we're handling the initial fetch in the Index component
  }, []);

  if (error) return <p className="text-center text-red-500">{t('errors.fetchingNews')}: {error}</p>;
  if (news.length === 0 && !loading) return <p className="text-center text-gray-500">{t('messages.noNewsAvailable')}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item, index) => (
        <div key={item.id} ref={index === news.length - 1 ? lastNewsElementRef : null}>
          <NewsCard {...item} />
        </div>
      ))}
      {loading && <p className="col-span-full text-center text-gray-500">{t('messages.loadingMore')}</p>}
    </div>
  );
};

export default CategoryNews;
