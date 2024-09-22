import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';

const Modal = ({ isOpen, onClose, title, description, imageUrl, source, publishedAt, url }) => {
  const { t, i18n } = useTranslation();

  const displayDescription = i18n.language === 'zh' ? (description.description_zh || description) : description;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden max-h-[90vh] flex flex-col">
        <DialogHeader className="p-4 sm:p-6 shrink-0">
          <DialogTitle className="text-lg sm:text-xl font-bold text-gray-800 pr-8">{title}</DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto px-4 sm:px-6 pb-4">
          <div className="aspect-video mb-4 overflow-hidden rounded-lg">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          </div>
          <p className="text-sm sm:text-base text-gray-600 mb-4">{displayDescription}</p>
          <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500 mb-4">
            <span>{source}</span>
            <span>{publishedAt}</span>
          </div>
        </div>
        <div className="p-4 sm:p-6 border-t border-gray-200 shrink-0">
          <Button asChild className="w-full bg-pink-500 hover:bg-pink-600 text-white">
            <a href={url} target="_blank" rel="noopener noreferrer">
              {t('buttons.readFullArticle')}
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
