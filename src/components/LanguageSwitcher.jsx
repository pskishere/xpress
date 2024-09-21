import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  };

  const currentLanguage = i18n.language === 'en' ? 'English' : '中文';
  const nextLanguage = i18n.language === 'en' ? '中文' : 'English';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={toggleLanguage}
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-pink-500 transition-colors duration-300"
          >
            <Globe className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('languageSwitcher.current', { language: currentLanguage })}</p>
          <p>{t('languageSwitcher.switchTo', { language: nextLanguage })}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LanguageSwitcher;
