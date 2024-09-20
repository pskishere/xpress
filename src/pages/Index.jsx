import React from 'react';
import Header from '../components/Header';
import NewsCard from '../components/NewsCard';
import Footer from '../components/Footer';
import FeaturedNews from '../components/FeaturedNews';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useNews from '../hooks/useNews';

const Index = () => {
  const { news: allNews, loading: allLoading } = useNews('general');
  const { news: techNews, loading: techLoading } = useNews('technology');
  const { news: politicsNews, loading: politicsLoading } = useNews('politics');
  const { news: businessNews, loading: businessLoading } = useNews('business');
  const { news: entertainmentNews, loading: entertainmentLoading } = useNews('entertainment');

  const renderNews = (newsItems, loading) => {
    if (loading) return <p className="text-center text-gray-500">Loading news...</p>;
    if (newsItems.length === 0) return <p className="text-center text-gray-500">No news available at the moment.</p>;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsItems.map((item, index) => (
          <NewsCard key={index} {...item} />
        ))}
      </div>
    );
  };

  const featuredArticle = allNews[0] || null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {featuredArticle && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Featured News</h2>
            <FeaturedNews
              title={featuredArticle.title}
              description={featuredArticle.description}
              image={featuredArticle.urlToImage || "/placeholder.svg"}
            />
          </div>
        )}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-white shadow-sm rounded-full mb-6">
            <TabsTrigger value="all" className="rounded-full">全部</TabsTrigger>
            <TabsTrigger value="tech" className="rounded-full">科技</TabsTrigger>
            <TabsTrigger value="politics" className="rounded-full">政治</TabsTrigger>
            <TabsTrigger value="business" className="rounded-full">经济</TabsTrigger>
            <TabsTrigger value="entertainment" className="rounded-full">娱乐</TabsTrigger>
          </TabsList>
          <TabsContent value="all">{renderNews(allNews, allLoading)}</TabsContent>
          <TabsContent value="tech">{renderNews(techNews, techLoading)}</TabsContent>
          <TabsContent value="politics">{renderNews(politicsNews, politicsLoading)}</TabsContent>
          <TabsContent value="business">{renderNews(businessNews, businessLoading)}</TabsContent>
          <TabsContent value="entertainment">{renderNews(entertainmentNews, entertainmentLoading)}</TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
