import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageSquare, Share2 } from "lucide-react";

const NewsCard = ({ title, description, urlToImage, source, publishedAt, url }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('zh-CN', options);
  };

  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg bg-white h-full flex flex-col">
      <img src={urlToImage || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
      <CardHeader className="p-4 flex-grow">
        <div className="flex flex-wrap justify-between items-center mb-2">
          <span className="text-sm font-medium text-pink-500 mb-1 sm:mb-0">{source?.name || 'Unknown Source'}</span>
          <span className="text-xs text-gray-500">{publishedAt ? formatDate(publishedAt) : 'Unknown Date'}</span>
        </div>
        <CardTitle className="text-base sm:text-lg font-bold text-gray-800 mb-2">
          <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
            {title || 'No Title'}
          </a>
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">{description || 'No description available'}</CardDescription>
      </CardHeader>
      <CardFooter className="p-4 flex justify-between items-center border-t border-gray-100">
        <div className="flex space-x-2 sm:space-x-4">
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-pink-500">
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">点赞</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-pink-500">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">评论</span>
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-pink-500">
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">分享</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
