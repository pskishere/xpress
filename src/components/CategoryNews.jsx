import React from 'react';
import NewsCard from './NewsCard';
import useNews from '../hooks/useNews';

const CategoryNews = ({ category, searchQuery }) => {
  const { news, loading, error, searchNews } = useNews(category);

  React.useEffect(() => {
    if (searchQuery) {
      searchNews(searchQuery);
    }
  }, [searchQuery, category, searchNews]);

  if (loading) return <p className="text-center text-gray-500">加载新闻中...</p>;
  if (error) return <p className="text-center text-red-500">错误: {error}</p>;
  if (news.length === 0) return <p className="text-center text-gray-500">该分类下暂无可用新闻。</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item, index) => (
        <NewsCard key={index} {...item} />
      ))}
    </div>
  );
};

export default CategoryNews;
