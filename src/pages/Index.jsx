import React from 'react';
import Header from '../components/Header';
import NewsCard from '../components/NewsCard';
import Footer from '../components/Footer';

const Index = () => {
  const newsItems = [
    { id: 1, title: "突破性技术革新", description: "新一代AI芯片问世，性能提升50%", image: "/placeholder.svg" },
    { id: 2, title: "全球气候峰会", description: "各国领导人齐聚一堂，共商应对气候变化大计", image: "/placeholder.svg" },
    { id: 3, title: "太空探索新里程", description: "人类首次在火星表面发现液态水", image: "/placeholder.svg" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">今日头条</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <NewsCard key={item.id} {...item} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
