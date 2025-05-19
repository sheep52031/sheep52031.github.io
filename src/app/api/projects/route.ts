import { getAllProjects } from '@/lib/markdown-utils';

// 將 API 路由標記為靜態生成，以便在静態導出時正確處理
export const dynamic = 'force-static';

export async function GET() {
  try {
    const projects = await getAllProjects();
    return Response.json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return Response.json({ projects: [] }, { status: 500 });
  }
}
