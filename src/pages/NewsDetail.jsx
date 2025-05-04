
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from "sonner";
import { ArrowLeft, Share2, Facebook, Twitter, Linkedin, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Header from '../components/Header';
import SEO from '../components/SEO';
import { supabase } from '../utils/supabaseClient';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        if (!data) {
          setError('Article not found');
          return;
        }
        
        setArticle(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return t('unknownDate');
    
    try {
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return t('unknownDate');
      }
      
      return date.toLocaleDateString(i18n.language, { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error, dateString);
      return t('unknownDate');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(t('toasts.linkCopied'));
  };

  const shareUrl = window.location.href;
  const displayTitle = i18n.language === 'zh' ? (article?.title_zh || article?.title) : article?.title;
  const displayDescription = i18n.language === 'zh' ? (article?.description_zh || article?.description) : article?.description;
  const displayContent = i18n.language === 'zh' ? (article?.content_zh || article?.content) : article?.content;

  // Handle fallback image
  const handleImageError = (e) => {
    e.target.src = "/placeholder.svg";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center h-[70vh]">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 flex flex-col justify-center items-center h-[70vh]">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('errors.articleNotFound')}</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={handleGoBack} className="bg-pink-500 hover:bg-pink-600">
            {t('buttons.goBack')}
          </Button>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 flex flex-col justify-center items-center h-[70vh]">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('errors.articleNotFound')}</h2>
          <Button onClick={handleGoBack} className="bg-pink-500 hover:bg-pink-600">
            {t('buttons.goBack')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={displayTitle}
        description={displayDescription}
        keywords={article.category}
        image={article.urltoimage || "/placeholder.svg"}
        url={window.location.href}
      />
      <Header />
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleGoBack}
            className="m-4 text-pink-500 hover:bg-pink-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('buttons.goBack')}
          </Button>

          <div className="p-4 sm:p-6">
            <div className="flex flex-wrap justify-between items-center mb-4">
              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium mb-2 mr-2">
                {t(`index.categories.${article.category}`)}
              </span>
              <span className="text-sm text-gray-500">{formatDate(article.publishedat)}</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              {displayTitle}
            </h1>

            <div className="aspect-video w-full overflow-hidden rounded-lg mb-6">
              <img 
                src={article.urltoimage || "/placeholder.svg"} 
                alt={displayTitle} 
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-600">
                {t('source')}: <span className="font-medium text-pink-600">{article.source}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    {t('buttons.share')}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => window.open(`https://facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank')}>
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}`, '_blank')}>
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`, '_blank')}>
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    {t('buttons.copyLink')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mb-6">
              <p className="text-lg leading-relaxed text-gray-700 mb-4">
                {displayDescription}
              </p>
              <Separator className="my-6" />
              {displayContent && (
                <div className="prose max-w-none">
                  {displayContent.split('\n').map((paragraph, index) => (
                    paragraph ? (
                      <p key={index} className="mb-4 text-base sm:text-lg leading-relaxed text-gray-700">
                        {paragraph}
                      </p>
                    ) : <br key={index} />
                  ))}
                </div>
              )}
            </div>

            {article.url && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <Button asChild className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    {t('buttons.readFullArticle')}
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewsDetail;
