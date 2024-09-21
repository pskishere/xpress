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

  const currentLanguage = i18n.language === 'en' ? 'EN' : '中文';
  const nextLanguage = i18n.language === 'en' ? '中文' : 'EN';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={toggleLanguage}
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-pink-500 transition-colors duration-300 flex items-center"
          >
            <Globe className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">{currentLanguage}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('languageSwitcher.current', { language: t(`languageSwitcher.${i18n.language}`) })}</p>
          <p>{t('languageSwitcher.switchTo', { language: t(`languageSwitcher.${i18n.language === 'en' ? 'zh' : 'en'}`) })}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LanguageSwitcher;
