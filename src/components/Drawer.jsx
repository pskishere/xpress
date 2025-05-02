
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const Drawer = ({ isOpen, onClose, title, description, content, content_zh, imageUrl, source, publishedAt, url }) => {
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 640px)');

  // Safely handle description - check if it's an object or string
  const displayDescription = i18n.language === 'zh' 
    ? (typeof description === 'object' && description !== null && description.description_zh 
        ? description.description_zh 
        : description)
    : description;
    
  // Display content with language preference
  const displayContent = i18n.language === 'zh' 
    ? (content_zh || content) 
    : content;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side={isMobile ? "bottom" : "right"}
        className={`
          ${isMobile ? 'h-[73vh] rounded-t-[10px]' : 'h-screen w-full sm:max-w-md md:max-w-lg lg:max-w-xl'}
          overflow-hidden flex flex-col
        `}
      >
        <SheetHeader className="flex-shrink-0 border-b pb-2 mb-1">
          <SheetTitle className="text-xl font-bold text-gray-800 pr-8 whitespace-normal">{title}</SheetTitle>
        </SheetHeader>
        <div className="flex-grow overflow-y-auto px-3 sm:px-3">
          <div className="aspect-video overflow-hidden rounded-lg mb-3 border border-gray-200">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          </div>
          <div className="mb-3">
            <p className="text-base text-gray-600 leading-relaxed">{displayDescription}</p>
          </div>
          {displayContent && (
            <div className="mb-4 border-t border-gray-100 pt-3">
              <div className="prose max-w-none text-gray-800">
                {displayContent.split('\n').map((paragraph, index) => (
                  paragraph ? <p key={index} className="mb-3 text-base leading-relaxed">{paragraph}</p> : <br key={index} />
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-between items-center text-sm mb-3">
            <span className="font-medium" style={{ color: '#E91E63' }}>{source}</span>
            <span className="text-gray-500">{publishedAt}</span>
          </div>
        </div>
        <div className="flex-shrink-0 pt-2 border-t border-gray-200 px-3 sm:px-2 pb-3">
          <Button asChild className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition duration-300">
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
