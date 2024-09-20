import React from 'react';
import NewsCard from './NewsCard';
import useNews from '../hooks/useNews';

const SearchResults = () => {
  const { news, loading, error } = useNews();

  if (loading) return <p className="text-center text-gray-500">搜索中...</p>;
  if (error) return <p className="text-center text-red-500">错误: {error}</p>;
  if (news.length === 0) return <p className="text-center text-gray-500">没有找到相关新闻。</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">搜索结果</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item, index) => (
          <NewsCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;