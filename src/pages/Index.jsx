import React, { useState } from 'react';
import Header from '../components/Header';
import FeaturedNews from '../components/FeaturedNews';
import CategoryNews from '../components/CategoryNews';
import SearchResults from '../components/SearchResults';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useNews from '../hooks/useNews';

const Index = () => {
  const [isSearching, setIsSearching] = useState(false);
  const { news: allNews, loading: allLoading } = useNews('general');

  const featuredArticle = allNews[0] || null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-200">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12">
        {isSearching ? (
          <SearchResults />
        ) : (
          <>
            {featuredArticle && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-pink-500 pb-2 inline-block">头条新闻</h2>
                <FeaturedNews
                  title={featuredArticle.title}
                  description={featuredArticle.description}
                  image={featuredArticle.urlToImage || "/placeholder.svg"}
                  url={featuredArticle.url}
                />
              </div>
            )}
            <Tabs defaultValue="general" className="mb-8">
              <TabsList className="bg-white shadow-md rounded-full mb-8 flex flex-wrap justify-start p-1">
                <TabsTrigger value="general" className="rounded-full px-4 py-2 text-sm font-medium transition-colors">综合</TabsTrigger>
                <TabsTrigger value="business" className="rounded-full px-4 py-2 text-sm font-medium transition-colors">商业</TabsTrigger>
                <TabsTrigger value="technology" className="rounded-full px-4 py-2 text-sm font-medium transition-colors">科技</TabsTrigger>
                <TabsTrigger value="entertainment" className="rounded-full px-4 py-2 text-sm font-medium transition-colors">娱乐</TabsTrigger>
                <TabsTrigger value="sports" className="rounded-full px-4 py-2 text-sm font-medium transition-colors">体育</TabsTrigger>
                <TabsTrigger value="science" className="rounded-full px-4 py-2 text-sm font-medium transition-colors">科学</TabsTrigger>
                <TabsTrigger value="health" className="rounded-full px-4 py-2 text-sm font-medium transition-colors">健康</TabsTrigger>
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
