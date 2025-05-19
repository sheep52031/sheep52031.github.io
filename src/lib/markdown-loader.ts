import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * 讀取 Markdown 文件並返回內容
 */
export function readMarkdownFile(filePath: string): string {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return fileContents;
  } catch (error) {
    console.error(`Error reading markdown file: ${filePath}`, error);
    return '';
  }
}

/**
 * 解析 Markdown 文件，提取 frontmatter 和內容
 */
export function parseMarkdownFile(filePath: string) {
  const fileContents = readMarkdownFile(filePath);
  if (!fileContents) return { data: {}, content: '' };
  
  const { data, content } = matter(fileContents);
  return { data, content };
}

/**
 * 從 Markdown 文件讀取工作經歷
 */
export function getWorkExperience(filePath: string = 'content/work_experiment.md'): string {
  const { content } = parseMarkdownFile(filePath);
  return content;
}

/**
 * 從 Markdown 文件讀取專案經驗
 */
export function getProjects(filePath: string = 'content/projects_experience.md'): string {
  const { content } = parseMarkdownFile(filePath);
  return content;
}

/**
 * 從 Markdown 文件讀取技能專長
 */
export function getSkills(filePath: string = 'content/skills.md'): string {
  const { content } = parseMarkdownFile(filePath);
  return content;
}
