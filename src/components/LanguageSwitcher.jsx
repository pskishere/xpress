
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { changeLanguage } from '../i18n/i18n';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    changeLanguage(newLang);
  };

  const currentLanguage = i18n.language === 'en' ? 'EN' : '中文';

  return (
    <Button
      onClick={toggleLanguage}
      variant="ghost"
      size="sm"
      className="text-gray-600 hover:text-pink-500 transition-colors duration-300 flex items-center"
    >
      <Globe className="h-4 w-4 mr-2" />
      <span className="text-sm font-medium">{currentLanguage}</span>
    </Button>
  );
};

export default LanguageSwitcher;
