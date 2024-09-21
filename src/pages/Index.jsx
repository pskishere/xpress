import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FeaturedNews from '../components/FeaturedNews';
import CategoryNews from '../components/CategoryNews';
import SEO from '../components/SEO';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useNews from '../hooks/useNews';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { news: allNews, loading: allLoading, searchNews } = useNews('general');
  const [filteredNews, setFilteredNews] = useState([]);
  const [isDomainAccess, setIsDomainAccess] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setFilteredNews(allNews);
    setIsDomainAccess(window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1');
  }, [allNews]);

  const featuredArticle = filteredNews[0] || null;

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      searchNews(query);
    } else {
      // If the search query is empty, reset to show all news
      setFilteredNews(allNews);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO
        title={t('index.featuredNews')}
        description="Xpress提供最新、最全面的新闻资讯，涵盖科技、政治、经济、文化等多个领域。"
        keywords="新闻,资讯,科技,政治,经济,文化"
        image="/og-image.svg"
        url="https://xpress.com"
      />
      <Header onSearch={handleSearch} />
      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8">
        {searchQuery && (
          <h2 className="text-2xl font-bold mb-6 text-gray-800">{t('index.searchResults')} "{searchQuery}"</h2>
        )}
        {featuredArticle && !searchQuery && (
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-pink-500 pb-2 inline-block">{t('index.featuredNews')}</h2>
            <FeaturedNews
              title={featuredArticle.title}
              description={featuredArticle.description}
              urltoimage={featuredArticle.urltoimage}
              url={featuredArticle.url}
            />
          </div>
        )}
        <Tabs defaultValue="general" className="mb-8">
          <div className="overflow-x-auto pb-2 mb-4">
            <TabsList className="bg-white shadow-sm rounded-full inline-flex whitespace-nowrap">
              <TabsTrigger value="general" className="px-4 py-2 text-sm tab-trigger">{t('index.categories.general')}</TabsTrigger>
              <TabsTrigger value="business" className="px-4 py-2 text-sm tab-trigger">{t('index.categories.business')}</TabsTrigger>
              <TabsTrigger value="technology" className="px-4 py-2 text-sm tab-trigger">{t('index.categories.technology')}</TabsTrigger>
              <TabsTrigger value="entertainment" className="px-4 py-2 text-sm tab-trigger">{t('index.categories.entertainment')}</TabsTrigger>
              <TabsTrigger value="sports" className="px-4 py-2 text-sm tab-trigger">{t('index.categories.sports')}</TabsTrigger>
              <TabsTrigger value="science" className="px-4 py-2 text-sm tab-trigger">{t('index.categories.science')}</TabsTrigger>
              <TabsTrigger value="health" className="px-4 py-2 text-sm tab-trigger">{t('index.categories.health')}</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="general"><CategoryNews category="general" searchQuery={searchQuery} isDomainAccess={isDomainAccess} /></TabsContent>
          <TabsContent value="business"><CategoryNews category="business" searchQuery={searchQuery} isDomainAccess={isDomainAccess} /></TabsContent>
          <TabsContent value="technology"><CategoryNews category="technology" searchQuery={searchQuery} isDomainAccess={isDomainAccess} /></TabsContent>
          <TabsContent value="entertainment"><CategoryNews category="entertainment" searchQuery={searchQuery} isDomainAccess={isDomainAccess} /></TabsContent>
          <TabsContent value="sports"><CategoryNews category="sports" searchQuery={searchQuery} isDomainAccess={isDomainAccess} /></TabsContent>
          <TabsContent value="science"><CategoryNews category="science" searchQuery={searchQuery} isDomainAccess={isDomainAccess} /></TabsContent>
          <TabsContent value="health"><CategoryNews category="health" searchQuery={searchQuery} isDomainAccess={isDomainAccess} /></TabsContent>
        </Tabs>
      </main>
      <style jsx global>{`
        .tab-trigger[data-state="active"] {
          background-color: #F472B6;
          color: white;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Index;
