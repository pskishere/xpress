
import axios from 'axios';
import { OLLAMA_API_URL } from './config.js';

// Generate system prompt for translation
const generateSystemPrompt = (from, to) => {
  return `你是一个专业的翻译助手。请将用户提供的${from}文本翻译成${to}。只输出翻译结果，不要包含任何思考过程或额外解释。保持翻译的准确性和流畅性。`;
};

// Generate user prompt for translation
const generatePrompt = (text) => {
  return `请翻译以下文本：\n"${text}"\n\n只输出翻译结果，不包含任何其他内容。`;
};

export const translateText = async (text) => {
  // If text is empty or undefined, return empty string
  if (!text) {
    console.warn('Empty text provided for translation');
    return '';
  }
  
  // Truncate text if too long
  const maxLength = 1000;
  const truncatedText = text.length > maxLength 
    ? text.substring(0, maxLength) + '...' 
    : text;
  
  // Maximum retry attempts
  const maxRetries = 3;
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      console.log(`Translating text (${truncatedText.length} chars) with Ollama chat API...`);
      
      // Use Ollama v1 chat API for translation
      const response = await axios.post(OLLAMA_API_URL, {
        model: 'llama2-chinese', // Use llama2-chinese model for translation
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

      // Extract translation result
      let translation = response.data.choices[0].message.content.trim();
      
      // Clean up translation result
      translation = translation.replace(/<think>[\s\S]*?<\/think>/g, '');
      translation = translation.replace(/^['"]|['"]$/g, '');
      translation = translation.replace(/^\s*|\s*$/g, '');
      
      // Verify translation result is not empty
      if (!translation) {
        throw new Error('Empty translation result');
      }
      
      console.log('Translation completed successfully');
      return translation;
    } catch (error) {
      retries++;
      const errorMessage = error.response?.data?.error?.message || error.message || String(error);
      console.error(`Translation error (attempt ${retries}/${maxRetries}):`, errorMessage);
      
      // Check if Ollama service is unavailable
      if (error.code === 'ECONNREFUSED' || error.code === 'ECONNRESET') {
        console.error('Cannot connect to Ollama service. Make sure it is running at', OLLAMA_API_URL);
      }
      
      if (retries >= maxRetries) {
        console.error(`Failed to translate after ${maxRetries} attempts:`, truncatedText);
        return truncatedText; // Return original text to maintain data integrity
      }
      
      // Wait before retrying (exponential backoff)
      const delay = 1000 * Math.pow(2, retries - 1);
      console.log(`Retrying in ${delay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // Ensure function always returns a value
  return truncatedText;
};
