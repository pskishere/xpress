
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';

const Modal = ({ isOpen, onClose, title, description, imageUrl, source, publishedAt, url }) => {
  const { t, i18n } = useTranslation();

  // Safely handle description - check if it's an object or string
  const displayDescription = i18n.language === 'zh' 
    ? (typeof description === 'object' && description !== null && description.description_zh 
        ? description.description_zh 
        : description)
    : description;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden mx-4 sm:mx-auto rounded-lg max-h-[90vh] flex flex-col">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-bold text-gray-800 mb-2 pr-8">{title}</DialogTitle>
        </DialogHeader>
        <div className="p-6 pt-0 flex-grow overflow-y-auto">
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
        <div className="p-6 pt-0 border-t border-gray-200">
          <Button asChild className="w-full bg-pink-500 hover:bg-pink-600 text-white">
            <a href={url} target="_blank" rel="noopener noreferrer">
              {t('buttons.readFullArticle')}
            </a>
          </Button>
        </div>
      </DialogContent>
      <style jsx global>{`
        .DialogOverlay {
          background-color: rgba(0, 0, 0, 0.2) !important;
        }
      `}</style>
    </Dialog>
  );
};

export default Modal;
