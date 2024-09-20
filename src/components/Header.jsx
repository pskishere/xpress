import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, Bell, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white text-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-pink-500 flex items-center">
            <img src="/favicon.ico" alt="BiliNews Logo" className="w-8 h-8 mr-2" />
            <span className="hidden sm:inline">BiliNews</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-pink-500 transition-colors">首页</Link>
            <Link to="/technology" className="hover:text-pink-500 transition-colors">科技</Link>
            <Link to="/politics" className="hover:text-pink-500 transition-colors">政治</Link>
            <Link to="/economy" className="hover:text-pink-500 transition-colors">经济</Link>
            <Link to="/culture" className="hover:text-pink-500 transition-colors">文化</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Input
                type="search"
                placeholder="搜索新闻..."
                className="pl-8 pr-4 py-1 rounded-full bg-gray-100 w-64"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-pink-500 hidden sm:inline-flex">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-pink-500 hidden sm:inline-flex">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-pink-500 md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
