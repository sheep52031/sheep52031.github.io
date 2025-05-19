import { NextRequest, NextResponse } from 'next/server';
import { readMarkdownFile } from '@/lib/markdown-utils';

// 將 API 路由標記為靜態生成，以便在静態導出時正確處理
export const dynamic = 'force-static';

/**
 * API 路由處理 Markdown 檔案的讀取
 * GET /api/markdown?file=filename
 */
export async function GET(request: NextRequest) {
  try {
    // 從 URL 參數中獲取檔案名稱
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('file');
    
    // 如果沒有提供檔案名稱，返回錯誤
    if (!fileName) {
      return NextResponse.json(
        { error: '檔案名稱是必須的' },
        { status: 400 }
      );
    }
    
    // 讀取 Markdown 檔案內容
    const content = await readMarkdownFile(fileName, 'content/projects');
    
    // 返回 Markdown 內容
    return NextResponse.json({ content });
  } catch (error) {
    console.error('讀取 Markdown 檔案時發生錯誤:', error);
    return NextResponse.json(
      { error: '無法讀取 Markdown 檔案', message: (error as Error).message },
      { status: 500 }
    );
  }
}
