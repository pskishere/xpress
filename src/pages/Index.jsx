import React from 'react';
import Header from '../components/Header';
import NewsCard from '../components/NewsCard';
import Footer from '../components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const newsItems = [
    { id: 1, title: "AI芯片革命：性能提升50%", description: "最新一代AI芯片问世，计算能力大幅提升，为AI应用带来新可能。", image: "/placeholder.svg", category: "科技", views: "10万", likes: 5200, comments: 328 },
    { id: 2, title: "全球气候峰会：各国承诺减排", description: "世界各国领导人齐聚一堂，就应对气候变化达成新共识。", image: "/placeholder.svg", category: "政治", views: "8.5万", likes: 4100, comments: 562 },
    { id: 3, title: "火星发现液态水：太空探索新篇章", description: "NASA宣布在火星表面首次发现液态水，为寻找外星生命带来希望。", image: "/placeholder.svg", category: "科学", views: "12万", likes: 7800, comments: 1024 },
    { id: 4, title: "全球经济展望：IMF预测增长放缓", description: "国际货币基金组织发布最新报告，预测来年全球经济增速将有所放缓。", image: "/placeholder.svg", category: "经济", views: "6.8万", likes: 3200, comments: 475 },
    { id: 5, title: "濒危文化遗产保护计划启动", description: "联合国教科文组织启动新项目，致力于保护全球濒危文化遗产。", image: "/placeholder.svg", category: "文化", views: "5.2万", likes: 2900, comments: 310 },
    { id: 6, title: "突破性癌症治疗方法问世", description: "新型免疫疗法在临床试验中取得重大突破，为癌症患者带来新希望。", image: "/placeholder.svg", category: "健康", views: "9.6万", likes: 6100, comments: 842 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-white shadow-sm rounded-full">
            <TabsTrigger value="all" className="rounded-full">全部</TabsTrigger>
            <TabsTrigger value="tech" className="rounded-full">科技</TabsTrigger>
            <TabsTrigger value="politics" className="rounded-full">政治</TabsTrigger>
            <TabsTrigger value="economy" className="rounded-full">经济</TabsTrigger>
            <TabsTrigger value="culture" className="rounded-full">文化</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.map((item) => (
                <NewsCard key={item.id} {...item} />
              ))}
            </div>
          </TabsContent>
          {/* Add similar TabsContent for other categories */}
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
