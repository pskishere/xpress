import React, { useState, useCallback, useEffect, useRef } from 'react';
import Header from '../components/Header';
import FeaturedNews from '../components/FeaturedNews';
import CategoryNews from '../components/CategoryNews';
import SEO from '../components/SEO';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useNews from '../hooks/useNews';
import { useTranslation } from 'react-i18next';
import { getNewsFromSupabase } from '../utils/api';

const Index = () => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const { news, loading, error, hasMore, fetchNews, searchNews, changeCategory } = useNews('general');
  const [isSticky, setIsSticky] = useState(false);
  const categoryTabsRef = useRef(null);

  const categories = [
    'general', 'business', 'technology', 'entertainment', 'sports', 
    'science', 'health', 'politics'
  ];

  useEffect(() => {
    const fetchFeaturedArticle = async () => {
      const generalNews = await getNewsFromSupabase('general', 1, 1, i18n.language);
      if (generalNews && generalNews.length > 0) {
        setFeaturedArticle(generalNews[0]);
      }
    };
    fetchFeaturedArticle();
  }, [i18n.language]);

  useEffect(() => {
    const handleScroll = () => {
      if (categoryTabsRef.current) {
        const headerHeight = 64; // Adjust this value based on your header's actual height
        const tabsPosition = categoryTabsRef.current.getBoundingClientRect().top;
        setIsSticky(tabsPosition <= headerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setIsSearchMode(!!query.trim());
    if (query.trim()) {
      searchNews(query);
    } else {
      fetchNews(true);
    }
  }, [searchNews, fetchNews]);

  const handleCategoryChange = useCallback((category) => {
    changeCategory(category);
    setIsSearchMode(false);
    setSearchQuery('');
  }, [changeCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO
        title={t('index.featuredNews')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        image="/og-image.svg"
        url="https://mikumon.one/"
      />
      <Header onSearch={handleSearch} />
      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8">
        {isSearchMode && (
          <h2 className="text-2xl font-bold mb-6 text-gray-800">{t('index.searchResults')} "{searchQuery}"</h2>
        )}
        {featuredArticle && !isSearchMode && (
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-pink-500 pb-2 inline-block">{t('index.featuredNews')}</h2>
            <FeaturedNews {...featuredArticle} />
          </div>
        )}
        {!isSearchMode && (
          <div ref={categoryTabsRef} className={`transition-all duration-300 ${isSticky ? 'sticky top-16 z-10 bg-gray-50 py-4 shadow-md' : ''}`}>
            <Tabs defaultValue="general" className="mb-8" onValueChange={handleCategoryChange}>
              <div className="overflow-x-auto pb-2 mb-4 category-tabs-container">
                <TabsList className="bg-white shadow-sm rounded-full inline-flex whitespace-nowrap">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category} 
                      className="px-4 py-2 text-sm tab-trigger"
                    >
                      {t(`index.categories.${category}`)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              {categories.map((category) => (
                <TabsContent key={category} value={category}>
                  <CategoryNews 
                    news={news} 
                    loading={loading} 
                    error={error} 
                    hasMore={hasMore} 
                    fetchNews={fetchNews} 
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}
        {isSearchMode && (
          <CategoryNews news={news} loading={loading} error={error} hasMore={hasMore} fetchNews={fetchNews} />
        )}
      </main>
      <style jsx global>{`
        .tab-trigger[data-state="active"] {
          background-color: #F472B6;
          color: white;
          font-weight: bold;
        }
        .tab-trigger[data-state="active"]:first-child {
          border-top-left-radius: 9999px;
          border-bottom-left-radius: 9999px;
        }
        .tab-trigger[data-state="active"]:last-child {
          border-top-right-radius: 9999px;
          border-bottom-right-radius: 9999px;
        }
        .category-tabs-container {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .category-tabs-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Index;
