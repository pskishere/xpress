import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-gray-100 text-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">NewsStream</Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-600 transition-colors">首页</Link>
            <Link to="/technology" className="hover:text-gray-600 transition-colors">科技</Link>
            <Link to="/politics" className="hover:text-gray-600 transition-colors">政治</Link>
            <Link to="/economy" className="hover:text-gray-600 transition-colors">经济</Link>
            <Link to="/culture" className="hover:text-gray-600 transition-colors">文化</Link>
          </nav>
          <div className="flex items-center">
            {isSearchOpen ? (
              <div className="flex items-center">
                <Input
                  type="search"
                  placeholder="搜索新闻..."
                  className="mr-2"
                />
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
