import React from 'react';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FeaturedNews = ({ title, description, image, url }) => {
  return (
    <Card className="overflow-hidden bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 h-64 md:h-auto">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <CardTitle className="text-2xl sm:text-3xl mb-4">{title}</CardTitle>
          <CardDescription className="text-gray-300 mb-6 text-sm sm:text-base">{description}</CardDescription>
          <Button variant="outline" className="self-start" asChild>
            <a href={url} target="_blank" rel="noopener noreferrer">阅读全文</a>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FeaturedNews;
