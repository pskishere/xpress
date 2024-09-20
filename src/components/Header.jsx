import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, Bell } from "lucide-react";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white text-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-pink-500">BiliNews</Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-pink-500 transition-colors">首页</Link>
            <Link to="/technology" className="hover:text-pink-500 transition-colors">科技</Link>
            <Link to="/politics" className="hover:text-pink-500 transition-colors">政治</Link>
            <Link to="/economy" className="hover:text-pink-500 transition-colors">经济</Link>
            <Link to="/culture" className="hover:text-pink-500 transition-colors">文化</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="搜索新闻..."
                className="pl-8 pr-4 py-1 rounded-full bg-gray-100"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-pink-500">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-pink-500">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
