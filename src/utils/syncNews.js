import dotenv from 'dotenv';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const API_KEY = '0d28e0b381cf4be18257ea7b7ee312e0';
const categories = [
  'general', 'business', 'technology', 'entertainment', 'sports', 
  'science', 'health', 'politics'
];

const supabaseUrl = process.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = process.env.VITE_SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or API key is missing in the environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// 将OpenRouter API配置改为Ollama API配置
const OLLAMA_API_URL = 'http://localhost:11434/v1/chat/completions';

const fetchNewsForCategory = async (category) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        apiKey: API_KEY,
        country: 'us',
        category,
        pageSize: 100,
      },
    });

    if (response.status === 200 && response.data.status === 'ok') {
      return response.data.articles.filter(article => 
        article && article.title && article.description && article.source && !article.title.toLowerCase().includes('removed')
      ).map(article => ({
        ...article,
        category,
      }));
    } else {
      console.error(`API Error for ${category}:`, response.data);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching ${category} news:`, error.response ? error.response.data : error.message);
    return [];
  }
};

// 生成系统提示
const generateSystemPrompt = (from, to) => {
  return `你是一个专业的翻译助手。请将用户提供的${from}文本翻译成${to}。只输出翻译结果，不要包含任何思考过程或额外解释。保持翻译的准确性和流畅性。`;
};

// 生成用户提示
const generatePrompt = (text) => {
  return `请翻译以下文本：\n"${text}"\n\n只输出翻译结果，不包含任何其他内容。`;
};

const translateText = async (text) => {
  // 如果文本为空或undefined，直接返回空字符串
  if (!text) {
    console.warn('Empty text provided for translation');
    return '';
  }
  
  // 文本太长时截断（防止过长内容）
  const maxLength = 1000;
  const truncatedText = text.length > maxLength 
    ? text.substring(0, maxLength) + '...' 
    : text;
  
  // 最大重试次数
  const maxRetries = 3;
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      console.log(`Translating text (${truncatedText.length} chars) with Ollama chat API...`);
      
      // 使用Ollama v1 chat API进行翻译
      const response = await axios.post(OLLAMA_API_URL, {
        model: 'llama2-chinese', // 使用llama2-chinese模型进行翻译
        messages: [
          {
            role: 'system',
            content: generateSystemPrompt('英文', '简体中文')
          },
          {
            role: 'user',
            content: generatePrompt(truncatedText)
          }
        ],
        temperature: 0.1,
        frequency_penalty: 0, 
        presence_penalty: 0,
        stream: false
      });

      // 从响应中提取翻译结果
      let translation = response.data.choices[0].message.content.trim();
      
      // 清理翻译结果
      translation = translation.replace(/<think>[\s\S]*?<\/think>/g, '');
      translation = translation.replace(/^['"]|['"]$/g, '');
      translation = translation.replace(/^\s*|\s*$/g, '');
      
      // 验证翻译结果不为空
      if (!translation) {
        throw new Error('Empty translation result');
      }
      
      console.log('Translation completed successfully');
      return translation;
    } catch (error) {
      retries++;
      const errorMessage = error.response?.data?.error?.message || error.message || String(error);
      console.error(`Translation error (attempt ${retries}/${maxRetries}):`, errorMessage);
      
      // 检查是否是Ollama服务不可用的错误
      if (error.code === 'ECONNREFUSED' || error.code === 'ECONNRESET') {
        console.error('Cannot connect to Ollama service. Make sure it is running at', OLLAMA_API_URL);
      }
      
      if (retries >= maxRetries) {
        console.error(`Failed to translate after ${maxRetries} attempts:`, truncatedText);
        return truncatedText; // 返回原文，而不是null，以保持数据完整性
      }
      
      // 重试前等待（指数退避）
      const delay = 1000 * Math.pow(2, retries - 1);
      console.log(`Retrying in ${delay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // 确保函数总是有返回值（尽管这一行通常不会执行到）
  return truncatedText;
};

const insertNewsToSupabase = async (articles) => {
  for (const article of articles) {
    try {
      console.log(`Translating article: "${article.title.substring(0, 50)}..."`);
      
      // 获取标题和描述的翻译
      const title_zh = await translateText(article.title);
      const description_zh = await translateText(article.description);

      // 插入新闻和翻译
      const { data, error } = await supabase
        .from('news')
        .upsert(
          {
            title: article.title,
            description: article.description,
            url: article.url,
            urltoimage: article.urlToImage,
            publishedat: article.publishedAt,
            source: article.source.name,
            category: article.category,
            title_zh: title_zh,
            description_zh: description_zh,
          },
          { onConflict: 'url' }
        );

      if (error) {
        console.error('Error inserting news to Supabase:', error);
      } else {
        console.log(`Successfully inserted and translated article: "${article.title.substring(0, 50)}..."`);
      }
    } catch (error) {
      console.error('Error processing article:', error);
      // 继续处理下一篇文章
      continue;
    }
  }
};

const translateAndUpdateNews = async () => {
  // 仅处理特殊情况：之前插入但未能成功翻译的文章
  const { data: untranslatedNews, error } = await supabase
    .from('news')
    .select('id, title, description')
    .is('title_zh', null)
    .is('description_zh', null);

  if (error) {
    console.error('Error fetching untranslated news:', error);
    return;
  }

  if (untranslatedNews.length > 0) {
    console.log(`Found ${untranslatedNews.length} articles that need translation...`);
    
    for (const article of untranslatedNews) {
      try {
        const title_zh = await translateText(article.title);
        const description_zh = await translateText(article.description);

        if (title_zh && description_zh) {
          const { error: updateError } = await supabase
            .from('news')
            .update({ title_zh, description_zh })
            .eq('id', article.id);

          if (updateError) {
            console.error('Error updating translations:', updateError);
          } else {
            console.log(`Translated and updated article ID: ${article.id}`);
          }
        }
      } catch (error) {
        console.error(`Error translating article ID ${article.id}:`, error);
        continue;
      }
    }
  } else {
    console.log('No untranslated articles found.');
  }
};

const syncAllNews = async () => {
  console.log('Starting news synchronization...');
  for (const category of categories) {
    console.log(`Fetching ${category} news...`);
    const articles = await fetchNewsForCategory(category);
    console.log(`Processing ${articles.length} ${category} articles (fetching + translating)...`);
    await insertNewsToSupabase(articles);
  }
  console.log('News synchronization and translation completed.');

  // 检查并处理未翻译的文章
  console.log('Checking for any untranslated articles...');
  await translateAndUpdateNews();
  console.log('All processes completed.');
};

// Run the sync function
syncAllNews();
