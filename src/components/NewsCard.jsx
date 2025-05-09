
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Info } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';
import Drawer from './Drawer';
import { Link } from 'react-router-dom';

const NewsCard = ({ id, title, description, title_zh, description_zh, content, content_zh, urltoimage, source, publishedat, url }) => {
  const [imageError, setImageError] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { t, i18n } = useTranslation();
  
  const formatDate = (dateString) => {
    if (!dateString) return t('unknownDate');
    
    try {
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return t('unknownDate');
      }
      
      return date.toLocaleDateString(i18n.language, { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error, dateString);
      return t('unknownDate');
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/news/${id}`;
    const shareData = {
      title: i18n.language === 'zh' ? (title_zh || title) : title,
      text: i18n.language === 'zh' ? (description_zh || description) : description,
      url: shareUrl,
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
      console.error(t('errors.shareFailed'), error);
    }
  };

  const imageSrc = imageError || !urltoimage ? "/placeholder.svg" : urltoimage;
  const displayTitle = i18n.language === 'zh' ? (title_zh || title) : title;
  const displayDescription = i18n.language === 'zh' ? (description_zh || description) : description;

  return (
    <>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-white h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <Link to={`/news/${id}`}>
            <img 
              src={imageSrc}
              alt={displayTitle || t('newsImage')}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              onError={handleImageError}
            />
          </Link>
        </div>
        <CardHeader className="p-4 flex-grow">
          <div className="flex flex-wrap justify-between items-center mb-2">
            <span className="text-sm font-medium text-pink-500 mb-1 sm:mb-0">{source || t('unknownSource')}</span>
            <span className="text-xs text-gray-500">{formatDate(publishedat)}</span>
          </div>
          <CardTitle className="text-base sm:text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-pink-500 transition-colors">
            <Link to={`/news/${id}`}>
              {displayTitle || t('noTitle')}
            </Link>
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 line-clamp-3">{displayDescription || t('noDescription')}</CardDescription>
        </CardHeader>
        <CardFooter className="p-4 flex justify-between items-center border-t border-gray-100">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500 hover:text-pink-500 transition-colors"
            onClick={() => setIsDrawerOpen(true)}
          >
            <Info className="h-4 w-4 mr-2" />
            <span>{t('buttons.details')}</span>
          </Button>
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
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={displayTitle}
        description={displayDescription}
        content={content}
        content_zh={content_zh}
        imageUrl={imageSrc}
        source={source}
        publishedAt={formatDate(publishedat)}
        url={url}
      />
    </>
  );
};

export default NewsCard;
