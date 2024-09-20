import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from './Header';
import Footer from './Footer';

const NewsDetail = () => {
  const { id } = useParams();
  // In a real application, you would fetch the article details using this id
  // For now, we'll use placeholder data
  const article = {
    title: "Detailed Article Title",
    content: "This is where the full article content would go. In a real application, this would be fetched from an API or database using the article id.",
    author: "John Doe",
    publishedAt: "2024-03-15",
    urlToImage: "/placeholder.svg"
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="overflow-hidden">
          <img src={article.urlToImage} alt={article.title} className="w-full h-64 object-cover" />
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{article.title}</CardTitle>
            <p className="text-sm text-gray-500">By {article.author} | {new Date(article.publishedAt).toLocaleDateString()}</p>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{article.content}</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default NewsDetail;