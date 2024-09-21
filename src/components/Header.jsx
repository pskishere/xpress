import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      navigate('/');
    }
  };

  return (
    <header className="bg-white text-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-pink-500 flex items-center transition-transform duration-300 hover:scale-105">
            <img src="/favicon.ico" alt="Xpress Logo" className="w-8 h-8 mr-2" />
            <span className="hidden sm:inline">Xpress</span>
          </Link>
          <form onSubmit={handleSearch} className="flex-grow max-w-md mx-4">
            <div className="relative">
              <Input
                type="search"
                placeholder={t('header.search')}
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 w-full focus:ring-2 focus:ring-pink-300 transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="ghost" size="icon" className="absolute left-0 top-0 h-full px-3 text-gray-400 hover:text-pink-500 transition-colors duration-300">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
