import fs from 'fs';
import path from 'path';
import { Locale } from './i18n-config';

/**
 * 從 Markdown 文件讀取內容
 * 這個函數在伺服器端運行，用於在構建時讀取 Markdown 文件
 */
export function getMarkdownContent(filePath: string): string {
  try {
    // 使用絕對路徑讀取檔案
    const fullPath = path.join(process.cwd(), filePath);
    if (fs.existsSync(fullPath)) {
      return fs.readFileSync(fullPath, 'utf8');
    }
    console.warn(`文件不存在: ${fullPath}`);
    return '';
  } catch (error) {
    console.error(`讀取 Markdown 文件時出錯: ${filePath}`, error);
    return '';
  }
}

/**
 * 根據語言從 Markdown 文件讀取內容
 * 如果指定語言的文件不存在，則返回默認語言的內容
 */
export function getLocalizedMarkdownContent(basePath: string, locale: Locale = 'zh'): string {
  // 嘗試讀取指定語言的文件
  if (locale === 'en') {
    const enContent = getMarkdownContent(`${basePath}_en.md`);
    if (enContent) return enContent;
  }
  
  // 如果指定語言的文件不存在或內容為空，則返回默認語言的內容
  return getMarkdownContent(`${basePath}.md`);
}

/**
 * 從 Markdown 文件讀取個人簡介
 */
export function getSummary(locale: Locale = 'zh'): string {
  return getLocalizedMarkdownContent('content/summary', locale);
}

/**
 * 解析個人簡介內容，移除 frontmatter
 */
export function parseSummary(locale: Locale = 'zh'): { markdown: string; meta: any } {
  const content = getSummary(locale);
  if (!content) return { markdown: '', meta: {} };
  
  // 使用 gray-matter 解析 frontmatter
  try {
    const matter = require('gray-matter');
    const { data, content: markdownContent } = matter(content);
    
    return {
      markdown: markdownContent.trim(),
      meta: data
    };
  } catch (error) {
    console.error('解析個人簡介 frontmatter 失敗:', error);
    // 如果解析失敗，返回原始內容
    return { markdown: content, meta: {} };
  }
}

/**
 * 從 Markdown 文件讀取工作經歷
 */
export function getWorkExperience(locale: Locale = 'zh'): string {
  return getLocalizedMarkdownContent('content/work_experiment', locale);
}

/**
 * 從 Markdown 文件解析工作經歷條目
 */
export function parseWorkExperienceEntries(locale: Locale = 'zh'): any[] {
  const content = getWorkExperience(locale);
  if (!content) return [];
  
  // 解析 frontmatter 格式的工作經歷
  const entries = [];
  const sections = content.split('---\n');
  
  // 跳過第一個空的區塊（如果有的話）
  let startIndex = sections[0].trim() === '' ? 1 : 0;
  
  // 處理每個區塊 - 注意每個工作經歷由兩個部分組成：frontmatter和內容
  for (let i = startIndex; i < sections.length; i += 2) {
    const section = sections[i].trim();
    if (!section) continue;
    
    // 確保是 frontmatter 區塊
    if (section.startsWith('#')) {
      const lines = section.split('\n');
      const frontmatterData: any = {};
      const contentSection = i + 1 < sections.length ? sections[i + 1] : '';
      const contentLines = contentSection.split('\n');
      let descriptionLines: string[] = [];
      
      // 解析 frontmatter 數據
      for (let j = 0; j < lines.length; j++) {
        const line = lines[j].trim();
        if (line === '') continue;
        
        if (line.startsWith('#')) {
          // 公司名稱
          frontmatterData.company = line.substring(1).trim();
        } else if (line.includes(':')) {
          const [key, value] = line.split(':', 2);
          const cleanValue = value.trim().replace(/^"(.*)"$/, '$1'); // 移除引號
          frontmatterData[key.trim()] = cleanValue;
        }
      }
      
      // 只收集有效的描述行
      for (const line of contentLines) {
        const trimmedLine = line.trim();
        // 跳過標題行、「工作經歷」標題、空行等
        if (trimmedLine.startsWith('#') || 
            trimmedLine.includes('工作經歷') || 
            trimmedLine.includes('Work Experience') || 
            trimmedLine === '') {
          continue;
        }
        
        // 只保留列表項目（以 * 或 - 開頭）
        if (trimmedLine.startsWith('*') || trimmedLine.startsWith('-')) {
          descriptionLines.push(trimmedLine);
        }
      }
      
      // 根據語言選擇正確的欄位
      const entry = {
        company: locale === 'en' ? 
          (frontmatterData.company || frontmatterData.companyZh || '') : 
          (frontmatterData.companyZh || frontmatterData.company || ''),
        role: locale === 'en' ? 
          (frontmatterData.position || frontmatterData.positionZh || '') : 
          (frontmatterData.positionZh || frontmatterData.position || ''),
        location: frontmatterData.location || '',
        period: frontmatterData.period || '',
        descriptionMarkdown: descriptionLines.join('\n')
      };
      
      entries.push(entry);
    }
  }
  
  return entries;
}

/**
 * 從 Markdown 文件獲取專案內容
 */
export function getProjects(locale: Locale = 'zh'): string {
  return getLocalizedMarkdownContent('content/projects_experience', locale);
}

/**
 * 從 Markdown 文件獲取技能內容
 */
export function getSkills(locale: Locale = 'zh'): string {
  return getLocalizedMarkdownContent('content/skills', locale);
}

/**
 * 從 Markdown 文件獲取自傳內容
 */
export function getAutobiography(locale: Locale = 'zh'): string {
  return getLocalizedMarkdownContent('content/autobiography', locale);
}

/**
 * 解析自傳內容，移除 frontmatter
 */
export function parseAutobiography(locale: Locale = 'zh'): { markdown: string; meta: any } {
  const content = getAutobiography(locale);
  if (!content) return { markdown: '', meta: {} };
  
  // 使用 gray-matter 解析 frontmatter
  try {
    const matter = require('gray-matter');
    const { data, content: markdownContent } = matter(content);
    
    return {
      markdown: markdownContent.trim(),
      meta: data
    };
  } catch (error) {
    console.error('解析自傳 frontmatter 失敗:', error);
    // 如果解析失敗，返回原始內容
    return { markdown: content, meta: {} };
  }
}
