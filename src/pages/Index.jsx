import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FeaturedNews from '../components/FeaturedNews';
import CategoryNews from '../components/CategoryNews';
import SEO from '../components/SEO';
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

  const pageTitle = searchQuery ? `搜索结果: ${searchQuery}` : '最新新闻资讯';
  const pageDescription = searchQuery
    ? `查看与"${searchQuery}"相关的最新新闻和报道。`
    : 'MCNews提供最新的新闻资讯，涵盖科技、政治、经济、文化等多个领域。及时、准确、全面的新闻报道，让您掌握世界脉搏。';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords="新闻,资讯,头条,科技,政治,经济,文化"
        image={featuredArticle?.urltoimage}
        url="https://mcnews.com"
      />
      <Header onSearch={handleSearch} />
      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8">
        {searchQuery && (
          <h1 className="text-2xl font-bold mb-6 text-gray-800">搜索结果: "{searchQuery}"</h1>
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
