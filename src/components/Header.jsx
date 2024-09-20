import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold flex items-center transition-transform hover:scale-105">
            <img src="/favicon.ico" alt="BiliNews Logo" className="w-10 h-10 mr-2" />
            <span className="hidden sm:inline text-3xl">BiliNews</span>
          </Link>
          <form onSubmit={handleSearch} className="flex-grow max-w-md mx-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="搜索新闻..."
                className="pl-10 pr-4 py-2 rounded-full bg-white bg-opacity-20 text-white placeholder-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="ghost" size="icon" className="absolute left-0 top-0 h-full px-3 text-white hover:text-pink-200">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
