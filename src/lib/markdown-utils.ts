// 注意：這個檔案中的函數只能在伺服器端使用
// 客戶端應通過 API 路由來讀取資料
import matter from 'gray-matter';

/**
 * 讀取 Markdown 檔案內容 - 只能在伺服器端使用
 * @param fileName 檔案名稱，不需要包含 .md 副檔名
 * @param directory 可選的目錄路徑，預設為 'content/projects'
 * @returns Markdown 內容字串
 */
export async function readMarkdownFile(fileName: string, directory: string = 'content/projects'): Promise<string> {
  // 動態導入 fs 和 path，只會在伺服器端執行
  const fs = await import('fs/promises');
  const path = await import('path');
  
  try {
    // 取得檔案的絕對路徑
    const filePath = path.default.join(process.cwd(), directory, `${fileName}.md`);
    
    // 讀取檔案內容
    const fileContent = await fs.default.readFile(filePath, 'utf8');
    
    // 將內容格式化為正確的 Markdown 格式
    return formatMarkdownContent(fileContent);
  } catch (error) {
    console.error(`Error reading markdown file ${fileName}.md:`, error);
    return '# 內容載入失敗\n\n無法讀取 Markdown 檔案內容。';
  }
}

/**
 * 解析 Markdown 檔案，提取 frontmatter 和內容
 * @param fileName 檔案名稱，不需要包含 .md 副檔名
 * @param directory 可選的目錄路徑，預設為 'content/projects'
 * @returns frontmatter 和內容
 */
export async function parseMarkdownProject(fileName: string, directory: string = 'content/projects'): Promise<{ frontmatter: any; content: string }> {
  try {
    const markdownContent = await readMarkdownFile(fileName, directory);
    const { data, content } = matter(markdownContent);
    
    return {
      frontmatter: data,
      content: content
    };
  } catch (error) {
    console.error(`Error parsing markdown project ${fileName}.md:`, error);
    throw error;
  }
}

/**
 * 讀取目錄中的所有 Markdown 檔案並解析
 * @param directory 目錄路徑，預設為 'content/projects'
 * @param lang 語言，預設為 'zh'
 * @returns 所有專案的數據
 */
export async function getAllProjects(directory: string = 'content/projects', lang: string = 'zh'): Promise<any[]> {
  try {
    // 動態導入 fs/promises 和 path 模組
    const fs = await import('fs/promises');
    const path = await import('path');
    
    // 構建目錄路徑
    const dirPath = path.join(process.cwd(), directory);
    
    // 讀取目錄中的所有檔案
    const files = await fs.readdir(dirPath);
    
    // 根據語言選擇要篩選的檔案
    let markdownFiles;
    if (lang === 'en') {
      // 如果是英文版，優先選擇英文版檔案（_en.md）
      markdownFiles = files.filter(file => 
        file.endsWith('_en.md') && 
        file !== 'project_template_en.md'
      );
      
      // 如果某些專案沒有英文版，則使用中文版作為備用
      const baseFiles = files.filter(file => 
        file.endsWith('.md') && 
        !file.endsWith('_en.md') && 
        file !== 'project_template.md'
      );
      
      // 取得已有英文版的基本檔案名稱（不含_en後綴和.md副檔名）
      const existingEnFiles = markdownFiles.map(file => 
        file.replace('_en.md', '')
      );
      
      // 找出沒有對應英文版的中文檔案
      const missingEnFiles = baseFiles.filter(file => 
        !existingEnFiles.includes(file.replace('.md', ''))
      );
      
      // 合併檔案列表
      markdownFiles = [...markdownFiles, ...missingEnFiles];
    } else {
      // 如果是中文版，只選擇非英文版檔案（不以_en.md結尾）
      markdownFiles = files.filter(file => 
        file.endsWith('.md') && 
        !file.endsWith('_en.md') && 
        file !== 'project_template.md'
      );
    }
    
    // 解析每個 Markdown 檔案
    const projects = await Promise.all(
      markdownFiles.map(async (file, index) => {
        // 處理不同語言版本的檔案名稱
        const fileName = file.replace('.md', '');
        const { frontmatter } = await parseMarkdownProject(fileName, directory);
        
        // 添加 id 和 markdownFile 屬性
        return {
          ...frontmatter,
          id: index + 1, // 使用檔案索引作為 ID
          markdownFile: fileName
        };
      })
    );
    
    return projects;
  } catch (error) {
    console.error('Error reading projects directory:', error);
    return [];
  }
}

/**
 * 格式化 Markdown 內容，確保正確的段落和換行
 * @param content 原始 Markdown 內容
 * @returns 格式化後的 Markdown 內容
 */
function formatMarkdownContent(content: string): string {
  // 移除多餘的空行
  let formatted = content.replace(/\n{3,}/g, '\n\n');
  
  // 確保標題前有空行
  formatted = formatted.replace(/(^|\n)(#{1,6}\s)/g, '$1\n$2');
  
  // 確保段落之間有適當的空行
  formatted = formatted.replace(/(\S)\n(\S)/g, '$1\n\n$2');
  
  // 移除開頭和結尾的空行
  formatted = formatted.trim();
  
  return formatted;
}
