import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeaturedNews from '../components/FeaturedNews';
import CategoryNews from '../components/CategoryNews';
import SearchResults from '../components/SearchResults';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import useNews from '../hooks/useNews';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { news: allNews, loading: allLoading, searchNews } = useNews('general');

  const featuredArticle = allNews[0] || null;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      await searchNews(searchQuery);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-8 sm:mb-12 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-10 sm:py-16 px-6 sm:px-8 rounded-lg shadow-lg">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">欢迎来到 BiliNews</h1>
          <p className="text-lg sm:text-xl mb-6">您的一站式新闻资讯平台，随时掌握全球热点</p>
          <form onSubmit={handleSearch} className="flex max-w-md mx-auto">
            <Input
              type="search"
              placeholder="搜索新闻..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow bg-white text-gray-800"
            />
            <Button type="submit" className="ml-2 bg-pink-600 hover:bg-pink-700">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
        {isSearching ? (
          <SearchResults />
        ) : (
          <>
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
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
