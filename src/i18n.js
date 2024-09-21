import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "home": "Home",
          "technology": "Technology",
          "politics": "Politics",
          "economy": "Economy",
          "culture": "Culture",
          "search": "Search news...",
          "featured_news": "Featured News",
          "general": "General",
          "business": "Business",
          "entertainment": "Entertainment",
          "sports": "Sports",
          "science": "Science",
          "health": "Health",
          "search_results": "Search Results",
          "about_us": "About Us",
          "join_us": "Join Us",
          "contact": "Contact",
          "news_categories": "News Categories",
          "partner_links": "Partner Links",
          "follow_us": "Follow Us",
          "all_rights_reserved": "All rights reserved.",
        }
      },
      zh: {
        translation: {
          "home": "首页",
          "technology": "科技",
          "politics": "政治",
          "economy": "经济",
          "culture": "文化",
          "search": "搜索新闻...",
          "featured_news": "头条新闻",
          "general": "综合",
          "business": "商业",
          "entertainment": "娱乐",
          "sports": "体育",
          "science": "科学",
          "health": "健康",
          "search_results": "搜索结果",
          "about_us": "关于我们",
          "join_us": "加入我们",
          "contact": "联系方式",
          "news_categories": "新闻类别",
          "partner_links": "友情链接",
          "follow_us": "关注我们",
          "all_rights_reserved": "保留所有权利。",
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;