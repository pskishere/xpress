import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">关于我们</h3>
            <p className="text-sm">我们致力于提供最新、最准确的新闻报道，让您随时了解世界动态。</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">联系方式</h3>
            <p className="text-sm">邮箱：info@newssite.com</p>
            <p className="text-sm">电话：+1 (555) 123-4567</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">关注我们</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300">Facebook</a>
              <a href="#" className="text-white hover:text-gray-300">Twitter</a>
              <a href="#" className="text-white hover:text-gray-300">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2024 新闻网站. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;