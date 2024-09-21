import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';

const NewsCard = ({ title, description, urltoimage, source, publishedat, url }) => {
  const [imageError, setImageError] = useState(false);
  const { t } = useTranslation();
  
  const formatDate = (dateString) => {
    if (!dateString) return '未知日期';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? '未知日期' : date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleShare = async () => {
    const shareData = {
      title: title || '无标题',
      text: description || '无描述',
      url: url || window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success(t('toasts.shareSuccess'));
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success(t('toasts.linkCopied'));
      }
    } catch (error) {
      console.error("分享失败:", error);
    }
  };

  const imageSrc = imageError || !urltoimage ? "/placeholder.svg" : urltoimage;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-white h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageSrc}
          alt={title || '新闻图片'}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={handleImageError}
        />
      </div>
      <CardHeader className="p-4 flex-grow">
        <div className="flex flex-wrap justify-between items-center mb-2">
          <span className="text-sm font-medium text-pink-500 mb-1 sm:mb-0">{source || '未知来源'}</span>
          <span className="text-xs text-gray-500">{formatDate(publishedat)}</span>
        </div>
        <CardTitle className="text-base sm:text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
            {title || '无标题'}
          </a>
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 line-clamp-3">{description || '暂无描述'}</CardDescription>
      </CardHeader>
      <CardFooter className="p-4 flex justify-end items-center border-t border-gray-100">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-500 hover:text-pink-500 transition-colors"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4 mr-2" />
          <span>{t('buttons.share')}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
