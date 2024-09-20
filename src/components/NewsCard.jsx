import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageSquare, Share2 } from "lucide-react";

const NewsCard = ({ title, description, urlToImage, source, publishedAt }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('zh-CN', options);
  };

  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg bg-white">
      <img src={urlToImage || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
      <CardHeader className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-pink-500">{source.name}</span>
          <span className="text-sm text-gray-500">{formatDate(publishedAt)}</span>
        </div>
        <CardTitle className="text-lg font-bold text-gray-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t border-gray-100">
        <div className="flex space-x-4">
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-pink-500">
            <ThumbsUp className="h-4 w-4 mr-1" />
            点赞
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-pink-500">
            <MessageSquare className="h-4 w-4 mr-1" />
            评论
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-pink-500">
          <Share2 className="h-4 w-4" />
          分享
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
