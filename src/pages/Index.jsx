import React, { useState } from 'react';
import Header from '../components/Header';
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
              <TabsContent value="general"><CategoryNews category="general" /></TabsContent>
              <TabsContent value="business"><CategoryNews category="business" /></TabsContent>
              <TabsContent value="technology"><CategoryNews category="technology" /></TabsContent>
              <TabsContent value="entertainment"><CategoryNews category="entertainment" /></TabsContent>
              <TabsContent value="sports"><CategoryNews category="sports" /></TabsContent>
              <TabsContent value="science"><CategoryNews category="science" /></TabsContent>
              <TabsContent value="health"><CategoryNews category="health" /></TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
