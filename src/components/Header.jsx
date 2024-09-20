import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white">
      <nav className="container mx-auto px-4 py-6">
        <ul className="flex justify-center space-x-8">
          <li><Link to="/" className="hover:text-gray-300 transition-colors">首页</Link></li>
          <li><Link to="/technology" className="hover:text-gray-300 transition-colors">科技</Link></li>
          <li><Link to="/politics" className="hover:text-gray-300 transition-colors">政治</Link></li>
          <li><Link to="/economy" className="hover:text-gray-300 transition-colors">经济</Link></li>
          <li><Link to="/culture" className="hover:text-gray-300 transition-colors">文化</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;