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
    <header className="bg-white text-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-pink-500 flex items-center">
            <img src="/favicon.ico" alt="BiliNews Logo" className="w-8 h-8 mr-2" />
            <span className="hidden sm:inline">BiliNews</span>
          </Link>
          <form onSubmit={handleSearch} className="relative flex-grow max-w-md mx-4">
            <Input
              type="search"
              placeholder="搜索新闻..."
              className="pl-8 pr-4 py-1 rounded-full bg-gray-100 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" variant="ghost" size="icon" className="absolute right-1 top-1/2 transform -translate-y-1/2">
              <Search className="h-4 w-4 text-gray-400" />
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
