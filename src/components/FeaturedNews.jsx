import React from 'react';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FeaturedNews = ({ title, description, image, url }) => {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl rounded-lg transform transition-all duration-300 hover:scale-105">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 h-64 md:h-auto relative">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 opacity-0 hover:opacity-100 flex items-center justify-center">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900" asChild>
              <a href={url} target="_blank" rel="noopener noreferrer">阅读全文</a>
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <CardTitle className="text-2xl sm:text-3xl mb-4 font-bold">{title}</CardTitle>
          <CardDescription className="text-gray-300 mb-6 text-sm sm:text-base line-clamp-3">{description}</CardDescription>
        </div>
      </div>
    </Card>
  );
};

export default FeaturedNews;
