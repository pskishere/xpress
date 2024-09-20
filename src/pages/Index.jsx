import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeaturedNews from '../components/FeaturedNews';
import TrendingNews from '../components/TrendingNews';
import CategoryNews from '../components/CategoryNews';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useNews from '../hooks/useNews';

const Index = () => {
  const { news: allNews, loading: allLoading } = useNews('general');

  const featuredArticle = allNews[0] || null;
  const trendingArticles = allNews.slice(1, 6) || [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-8 sm:mb-12 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-10 sm:py-16 px-6 sm:px-8 rounded-lg shadow-lg">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">欢迎来到 BiliNews</h1>
          <p className="text-lg sm:text-xl">您的一站式新闻资讯平台，随时掌握全球热点</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/4">
            {featuredArticle && (
              <div className="mb-8 sm:mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">头条新闻</h2>
                <FeaturedNews
                  title={featuredArticle.title}
                  description={featuredArticle.description}
                  image={featuredArticle.urlToImage || "/placeholder.svg"}
                  url={featuredArticle.url}
                />
              </div>
            )}
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="bg-white shadow-sm rounded-full mb-6 flex flex-wrap justify-start">
                <TabsTrigger value="all" className="rounded-full">全部</TabsTrigger>
                <TabsTrigger value="tech" className="rounded-full">科技</TabsTrigger>
                <TabsTrigger value="politics" className="rounded-full">政治</TabsTrigger>
                <TabsTrigger value="business" className="rounded-full">经济</TabsTrigger>
                <TabsTrigger value="entertainment" className="rounded-full">娱乐</TabsTrigger>
              </TabsList>
              <TabsContent value="all"><CategoryNews category="general" /></TabsContent>
              <TabsContent value="tech"><CategoryNews category="technology" /></TabsContent>
              <TabsContent value="politics"><CategoryNews category="politics" /></TabsContent>
              <TabsContent value="business"><CategoryNews category="business" /></TabsContent>
              <TabsContent value="entertainment"><CategoryNews category="entertainment" /></TabsContent>
            </Tabs>
          </div>
          <div className="w-full lg:w-1/4">
            <TrendingNews trendingArticles={trendingArticles} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
