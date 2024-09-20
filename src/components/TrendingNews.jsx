import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const TrendingNews = ({ trendingArticles }) => {
  return (
    <Card className="bg-white shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-pink-500" />
          热门新闻
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {trendingArticles.map((article, index) => (
            <li key={index} className="border-b border-gray-200 pb-2 last:border-b-0 last:pb-0">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-800 hover:text-pink-500 transition-colors"
              >
                {article.title}
              </a>
              <p className="text-xs text-gray-500 mt-1">{article.source.name}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TrendingNews;