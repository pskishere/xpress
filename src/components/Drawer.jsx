import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const Drawer = ({ isOpen, onClose, title, description, imageUrl, source, publishedAt, url }) => {
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 640px)');

  const displayDescription = i18n.language === 'zh' ? (description.description_zh || description) : description;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side={isMobile ? "bottom" : "right"} 
        className={`
          ${isMobile ? 'h-[60vh] rounded-t-[10px]' : 'h-screen w-full sm:max-w-md md:max-w-lg lg:max-w-xl'}
          overflow-hidden flex flex-col
        `}
      >
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="text-xl font-bold text-gray-800 mb-2 pr-8">{title}</SheetTitle>
        </SheetHeader>
        <div className="flex-grow overflow-y-auto px-4">
          <div className="aspect-video overflow-hidden rounded-lg mb-4">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          </div>
          <div className="mb-4">
            <p className="text-base text-gray-600">{displayDescription}</p>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
            <span>{source}</span>
            <span>{publishedAt}</span>
          </div>
        </div>
        <div className="flex-shrink-0 pt-4 border-t border-gray-200 px-4 pb-4">
          <Button asChild className="w-full bg-pink-500 hover:bg-pink-600 text-white">
            <a href={url} target="_blank" rel="noopener noreferrer">
              {t('buttons.readFullArticle')}
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;
