import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const NewsCard = ({ title, description, title_zh, description_zh, urltoimage, source, publishedat, url }) => {
  const [imageError, setImageError] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const { t, i18n } = useTranslation();
  
  const formatDate = (dateString) => {
    if (!dateString) return t('unknownDate');
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? t('unknownDate') : date.toLocaleDateString(i18n.language, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleShare = async () => {
    const shareData = {
      title: i18n.language === 'zh' ? title_zh || title : title,
      text: i18n.language === 'zh' ? description_zh || description : description,
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
      console.error(t('errors.shareFailed'), error);
    }
  };

  const imageSrc = imageError || !urltoimage ? "/placeholder.svg" : urltoimage;
  const displayTitle = i18n.language === 'zh' ? (title_zh || title) : title;
  const displayDescription = i18n.language === 'zh' ? (description_zh || description) : description;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onTapStart={() => setIsPressed(true)}
      onTap={() => setIsPressed(false)}
      onTapCancel={() => setIsPressed(false)}
    >
      <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg bg-white h-full flex flex-col ${isPressed ? 'scale-105 shadow-xl' : ''}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imageSrc}
            alt={displayTitle || t('newsImage')}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={handleImageError}
          />
        </div>
        <CardHeader className="p-4 flex-grow">
          <div className="flex flex-wrap justify-between items-center mb-2">
            <span className="text-sm font-medium text-pink-500 mb-1 sm:mb-0">{source || t('unknownSource')}</span>
            <span className="text-xs text-gray-500">{formatDate(publishedat)}</span>
          </div>
          <CardTitle className="text-base sm:text-lg font-bold text-gray-800 mb-2 line-clamp-2">
            <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
              {displayTitle || t('noTitle')}
            </a>
          </CardTitle>
          <CardDescription className={`text-sm text-gray-600 ${isPressed ? '' : 'line-clamp-3'}`}>
            {displayDescription || t('noDescription')}
          </CardDescription>
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
    </motion.div>
  );
};

export default NewsCard;
