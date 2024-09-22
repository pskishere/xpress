import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from 'react-i18next';

const FeaturedNews = ({ title, description, title_zh, description_zh, urltoimage, url }) => {
  const [imageError, setImageError] = useState(false);
  const { t, i18n } = useTranslation();

  const handleImageError = () => {
    setImageError(true);
  };

  const displayTitle = i18n.language === 'zh' ? (title_zh || title) : title;
  const displayDescription = i18n.language === 'zh' ? (description_zh || description) : description;

  return (
    <Card className="overflow-hidden bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 h-64 md:h-auto">
          <img 
            src={imageError ? "/placeholder.svg" : (urltoimage || "/placeholder.svg")} 
            alt={displayTitle || t('featuredNewsImage')}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <CardTitle className="text-2xl sm:text-3xl mb-4">{displayTitle || t('noTitle')}</CardTitle>
            <CardDescription className="text-gray-300 mb-6 text-sm sm:text-base">{displayDescription || t('noDescription')}</CardDescription>
          </div>
          <Button 
            variant="outline" 
            className="self-start mt-4 bg-pink-500 text-white border-pink-500 hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all duration-300"
            asChild
          >
            <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center">
              {t('buttons.readMore')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FeaturedNews;
