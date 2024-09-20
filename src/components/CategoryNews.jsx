import React from 'react';
import NewsCard from './NewsCard';
import useNews from '../hooks/useNews';

const CategoryNews = ({ category }) => {
  const { news, loading, error } = useNews(category);

  if (loading) return <p className="text-center text-gray-500">Loading news...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (news.length === 0) return <p className="text-center text-gray-500">No news available for this category.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item, index) => (
        <NewsCard key={index} {...item} />
      ))}
    </div>
  );
};

export default CategoryNews;