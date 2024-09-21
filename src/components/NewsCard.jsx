import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const NewsCard = ({ title, description, urlToImage, source, publishedAt, url }) => {
  const [imageError, setImageError] = useState(false);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('zh-CN', options);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: url,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(url).then(() => {
        toast.success("链接已复制到剪贴板");
      });
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-white h-full flex flex-col">
      <img 
        src={imageError ? "/placeholder.svg" : (urlToImage || "/placeholder.svg")} 
        alt={title} 
        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        onError={handleImageError}
      />
      <CardHeader className="p-4 flex-grow">
        <div className="flex flex-wrap justify-between items-center mb-2">
          <span className="text-sm font-medium text-pink-500 mb-1 sm:mb-0">{source?.name || 'Unknown Source'}</span>
          <span className="text-xs text-gray-500">{publishedAt ? formatDate(publishedAt) : 'Unknown Date'}</span>
        </div>
        <CardTitle className="text-base sm:text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {title || 'No Title'}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 line-clamp-3">{description || 'No description available'}</CardDescription>
      </CardHeader>
      <CardFooter className="p-4 flex justify-between items-center border-t border-gray-100">
        <Button variant="outline" size="sm" className="text-gray-700 hover:text-pink-500 hover:border-pink-500" asChild>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            阅读全文
          </a>
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-pink-500" onClick={handleShare}>
          <Share2 className="h-4 w-4 mr-2" />
          <span>分享</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
