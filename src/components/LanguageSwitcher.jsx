import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-gray-500" />
      <Button
        variant={i18n.language === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => changeLanguage('en')}
        className="text-xs font-semibold"
      >
        EN
      </Button>
      <Button
        variant={i18n.language === 'zh' ? 'default' : 'outline'}
        size="sm"
        onClick={() => changeLanguage('zh')}
        className="text-xs font-semibold"
      >
        中文
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
