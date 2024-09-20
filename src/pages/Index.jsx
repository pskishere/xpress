import React from 'react';
import Header from '../components/Header';
import NewsCard from '../components/NewsCard';
import Footer from '../components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useNews from '../hooks/useNews';

const Index = () => {
  const { news: allNews, loading: allLoading, error: allError } = useNews('top');
  const { news: techNews, loading: techLoading, error: techError } = useNews('technology');
  const { news: politicsNews, loading: politicsLoading, error: politicsError } = useNews('politics');
  const { news: businessNews, loading: businessLoading, error: businessError } = useNews('business');
  const { news: entertainmentNews, loading: entertainmentLoading, error: entertainmentError } = useNews('entertainment');

  const renderNews = (newsItems, loading, error) => {
    if (loading) return <p>加载新闻中...</p>;
    if (error) return <p>加载新闻时出错: {error}</p>;
    if (newsItems.length === 0) return <p>没有找到相关新闻</p>;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsItems.map((item, index) => (
          <NewsCard key={index} {...item} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-white shadow-sm rounded-full">
            <TabsTrigger value="all" className="rounded-full">全部</TabsTrigger>
            <TabsTrigger value="tech" className="rounded-full">科技</TabsTrigger>
            <TabsTrigger value="politics" className="rounded-full">政治</TabsTrigger>
            <TabsTrigger value="business" className="rounded-full">经济</TabsTrigger>
            <TabsTrigger value="entertainment" className="rounded-full">娱乐</TabsTrigger>
          </TabsList>
          <TabsContent value="all">{renderNews(allNews, allLoading, allError)}</TabsContent>
          <TabsContent value="tech">{renderNews(techNews, techLoading, techError)}</TabsContent>
          <TabsContent value="politics">{renderNews(politicsNews, politicsLoading, politicsError)}</TabsContent>
          <TabsContent value="business">{renderNews(businessNews, businessLoading, businessError)}</TabsContent>
          <TabsContent value="entertainment">{renderNews(entertainmentNews, entertainmentLoading, entertainmentError)}</TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
