
import React from 'react';
import NewsCard from './NewsCard';
import useNews from '../hooks/useNews';
import { useTranslation } from 'react-i18next';

const SearchResults = () => {
  const { news, loading, error } = useNews();
  const { t } = useTranslation();

  if (loading) return <p className="text-center text-gray-500">{t('loading')}</p>;
  if (error) return <p className="text-center text-red-500">{t('errors.general', { error })}</p>;
  if (news.length === 0) return <p className="text-center text-gray-500">{t('search.noResults')}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{t('search.results')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item, index) => (
          <NewsCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
