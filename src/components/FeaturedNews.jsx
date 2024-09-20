import React from 'react';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FeaturedNews = ({ title, description, image }) => {
  return (
    <Card className="overflow-hidden bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <CardTitle className="text-3xl mb-4">{title}</CardTitle>
          <CardDescription className="text-gray-300 mb-6">{description}</CardDescription>
          <Button variant="outline" className="self-start">阅读全文</Button>
        </div>
      </div>
    </Card>
  );
};

export default FeaturedNews;