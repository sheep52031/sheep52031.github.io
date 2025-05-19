import type { Locale } from './i18n-config';
import { parseAutobiography } from './markdown-content-loader';

/**
 * 自傳數據結構定義
 */
export interface AutobiographyData {
  title: string;
  markdown: string;
  meta: any;
}

/**
 * 獲取自傳數據
 */
export function getAutobiographyData(locale: Locale = 'zh'): AutobiographyData {
  const { markdown, meta } = parseAutobiography(locale);
  
  // 根據語言返回相應的標題和內容
  if (locale === 'en') {
    return {
      title: meta.title || 'Autobiography',
      markdown,
      meta
    };
  }
  
  return {
    title: meta.title || '自傳',
    markdown,
    meta
  };
}
