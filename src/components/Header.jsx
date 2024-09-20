import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, Bell, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white text-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-pink-500 flex items-center">
            <img src="/favicon.ico" alt="BiliNews Logo" className="w-8 h-8 mr-2" />
            <span className="hidden sm:inline">BiliNews</span>
          </Link>
          <nav className={`absolute top-full left-0 w-full bg-white shadow-md md:shadow-none md:static md:w-auto md:bg-transparent ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 p-4 md:p-0">
              <li><Link to="/" className="block hover:text-pink-500 transition-colors" onClick={toggleMenu}>首页</Link></li>
              <li><Link to="/technology" className="block hover:text-pink-500 transition-colors" onClick={toggleMenu}>科技</Link></li>
              <li><Link to="/politics" className="block hover:text-pink-500 transition-colors" onClick={toggleMenu}>政治</Link></li>
              <li><Link to="/economy" className="block hover:text-pink-500 transition-colors" onClick={toggleMenu}>经济</Link></li>
              <li><Link to="/culture" className="block hover:text-pink-500 transition-colors" onClick={toggleMenu}>文化</Link></li>
            </ul>
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
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-pink-500 md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
