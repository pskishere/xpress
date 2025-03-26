import axios from 'axios';

// Ollama API配置
const OLLAMA_API_URL = 'http://localhost:11434/v1/chat/completions';
const MODEL = 'llama2-chinese';

// 测试用例
const testCases = [
  "Hello world, this is a test.",
  "Artificial intelligence is transforming the way we live and work.",
  "Breaking news: Scientists discover new species in the deep ocean."
];

// 简单翻译函数
async function translateText(text) {
  try {
    const response = await axios.post(OLLAMA_API_URL, {
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: '你是一个专业的翻译助手。请将用户提供的英文文本翻译成简体中文。只输出翻译结果，不要包含任何思考过程或额外解释。保持翻译的准确性和流畅性。'
        },
        {
          role: 'user',
          content: `请翻译以下文本：\n"${text}"\n\n只输出翻译结果，不包含任何其他内容。`
        }
      ],
      temperature: 0.1,
      frequency_penalty: 0, 
      presence_penalty: 0
    });

    // 提取并清理翻译结果
    let translation = response.data.choices[0].message.content.trim();
    
    // 移除可能的引号、think标签和多余空格
    translation = translation.replace(/<think>[\s\S]*?<\/think>/g, '');
    translation = translation.replace(/^['"]|['"]$/g, '');
    translation = translation.replace(/^\s*|\s*$/g, '');
    
    return translation;
  } catch (error) {
    console.error('翻译错误:', error.response?.data?.error?.message || error.message);
    return '翻译失败';
  }
}

// 运行测试
async function runTests() {
  console.log(`\n===== 使用 ${MODEL} 的翻译测试 =====\n`);
  
  for (const [index, text] of testCases.entries()) {
    console.log(`测试 ${index + 1}:`);
    console.log(`原文: ${text}`);
    const translation = await translateText(text);
    console.log(`译文: ${translation}\n`);
  }
}

runTests(); 