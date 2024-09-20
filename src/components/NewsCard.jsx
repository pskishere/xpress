import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NewsCard = ({ title, description, image, category }) => {
  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-blue-600">{category}</span>
          <span className="text-sm text-gray-500">2小时前</span>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">阅读更多</Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
