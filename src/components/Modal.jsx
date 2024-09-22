import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useTranslation } from 'react-i18next';

const Modal = ({ isOpen, onClose, title, description, imageUrl, source, publishedAt, url }) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-lg font-bold text-gray-800 mb-2">{title}</DialogTitle>
          <Button
            className="absolute right-4 top-4 rounded-full w-8 h-8 p-0 bg-white/80 hover:bg-white/90 transition-colors"
            onClick={onClose}
          >
            <X className="h-4 w-4 text-gray-600" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        <div className="p-6 pt-0">
          <div className="aspect-video overflow-hidden rounded-lg mb-4">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          </div>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
            <span>{source}</span>
            <span>{publishedAt}</span>
          </div>
          <Button asChild className="w-full">
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
