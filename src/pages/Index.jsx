import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FeaturedNews from '../components/FeaturedNews';
import CategoryNews from '../components/CategoryNews';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useNews from '../hooks/useNews';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { news: allNews, loading: allLoading, searchNews } = useNews('general');
  const [filteredNews, setFilteredNews] = useState([]);
  const [isDomainAccess, setIsDomainAccess] = useState(false);

  useEffect(() => {
    setFilteredNews(allNews);
    setIsDomainAccess(window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1');
  }, [allNews]);

  const featuredArticle = filteredNews[0] || null;

  const handleSearch = (query) => {
    setSearchQuery(query);
    searchNews(query);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onSearch={handleSearch} />
      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8">
        {searchQuery && (
          <h2 className="text-2xl font-bold mb-6 text-gray-800">搜索结果: "{searchQuery}"</h2>
        )}
        {featuredArticle && !searchQuery && (
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-pink-500 pb-2 inline-block">头条新闻</h2>
            <FeaturedNews
              title={featuredArticle.title}
              description={featuredArticle.description}
              urltoimage={featuredArticle.urltoimage}
              url={featuredArticle.url}
            />
          </div>
        )}
        <Tabs defaultValue="general" className="mb-8">
          <TabsList className="bg-white shadow-sm rounded-full mb-6 flex flex-wrap justify-start">
            <TabsTrigger value="general" className="rounded-full">综合</TabsTrigger>
            <TabsTrigger value="business" className="rounded-full">商业</TabsTrigger>
            <TabsTrigger value="technology" className="rounded-full">科技</TabsTrigger>
            <TabsTrigger value="entertainment" className="rounded-full">娱乐</TabsTrigger>
            <TabsTrigger value="sports" className="rounded-full">体育</TabsTrigger>
            <TabsTrigger value="science" className="rounded-full">科学</TabsTrigger>
            <TabsTrigger value="health" className="rounded-full">健康</TabsTrigger>
          </TabsList>
          <TabsContent value="general"><CategoryNews category="general" searchQuery={searchQuery} isDomainAccess={isDomainAccess} /></TabsContent>
          <TabsContent value="business"><CategoryNews category="business" searchQuery={searchQuery} isDomainAccess={isDomainAccess} /></TabsContent>
          <TabsContent value="technology"><CategoryNews category="technology" searchQuery={searchQuery} isDomainAccess={isDomainAccess} /></TabsContent>
          <TabsContent value="entertainment"><CategoryNews category="entertainment" searchQuery={searchQuery} isDomainAccess={isDomainAccess} /></TabsContent>
          <TabsContent value="sports"><CategoryNews category="sports" searchQuery={searchQuery} isDomainAccess={isDomainAccess} /></TabsContent>
          <TabsContent value="science"><CategoryNews category="science" searchQuery={searchQuery} isDomainAccess={isDomainAccess} /></TabsContent>
          <TabsContent value="health"><CategoryNews category="health" searchQuery={searchQuery} isDomainAccess={isDomainAccess} /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
