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
          ${isMobile ? 'h-[80vh] rounded-t-[10px] px-2 py-3' : 'h-screen w-full sm:max-w-md md:max-w-lg lg:max-w-xl px-4 py-6'}
          overflow-hidden flex flex-col
        `}
      >
        <SheetHeader className="flex-shrink-0 border-b pb-2 mb-2">
          <SheetTitle className="text-lg sm:text-xl font-bold text-gray-800 pr-6 whitespace-normal">{title}</SheetTitle>
        </SheetHeader>
        <div className="flex-grow overflow-y-auto px-2 sm:px-4">
          <div className="aspect-video overflow-hidden rounded-lg mb-3 border border-gray-200">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          </div>
          <div className="mb-3">
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{displayDescription}</p>
          </div>
          <div className="flex justify-between items-center text-xs sm:text-sm mb-3">
            <span className="font-medium" style={{ color: '#E91E63' }}>{source}</span>
            <span className="text-gray-500">{publishedAt}</span>
          </div>
        </div>
        <div className="flex-shrink-0 pt-2 border-t border-gray-200 px-2 sm:px-4 pb-2 sm:pb-3">
          <Button asChild className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-1 sm:py-2 rounded-lg transition duration-300">
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
