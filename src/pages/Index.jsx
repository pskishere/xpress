import React from 'react';
import Header from '../components/Header';
import NewsCard from '../components/NewsCard';
import FeaturedNews from '../components/FeaturedNews';
import Footer from '../components/Footer';

const Index = () => {
  const featuredNews = {
    title: "人工智能革命：改变世界的新纪元",
    description: "随着AI技术的飞速发展，我们正站在一个新时代的门槛。本文深入探讨AI如何重塑各个行业，以及我们应该如何应对这场变革。",
    image: "/placeholder.svg"
  };

  const newsItems = [
    { id: 1, title: "突破性技术革新", description: "新一代AI芯片问世，性能提升50%", image: "/placeholder.svg", category: "科技" },
    { id: 2, title: "全球气候峰会", description: "各国领导人齐聚一堂，共商应对气候变化大计", image: "/placeholder.svg", category: "政治" },
    { id: 3, title: "太空探索新里程", description: "人类首次在火星表面发现液态水", image: "/placeholder.svg", category: "科学" },
    { id: 4, title: "全球经济展望", description: "IMF发布最新报告，预测来年经济增长趋势", image: "/placeholder.svg", category: "经济" },
    { id: 5, title: "文化遗产保护", description: "联合国启动新项目，致力于保护濒危文化遗产", image: "/placeholder.svg", category: "文化" },
    { id: 6, title: "医疗突破", description: "新型癌症治疗方法问世，成功率大幅提高", image: "/placeholder.svg", category: "健康" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12">
          <FeaturedNews {...featuredNews} />
        </section>
        <h2 className="text-3xl font-bold mb-6">最新新闻</h2>
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
