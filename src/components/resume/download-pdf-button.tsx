"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Eye, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Locale } from '@/lib/i18n-config';
import type { Dictionary } from '@/lib/i18n';

// HTML2PDF 選項類型定義
interface Html2PdfOptions {
  margin: number | [number, number, number, number];
  filename: string;
  image: {
    type: string;
    quality: number;
  };
  html2canvas: {
    scale: number;
    useCORS: boolean;
    logging: boolean;
  };
  jsPDF: {
    unit: string;
    format: string;
    orientation: 'portrait' | 'landscape';
    compress: boolean;
    hotfixes?: string[];
  };
}

// 按鈕組件屬性類型定義
interface DownloadPdfButtonProps {
  dictionary: Dictionary;
  lang: Locale;
  buttonClassName?: string;
}

// PDF下載按鈕組件
export default function DownloadPdfButton({ dictionary, lang, buttonClassName }: DownloadPdfButtonProps): JSX.Element {
  // 狀態管理
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPageBreaks, setShowPageBreaks] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const isEnglish = lang === 'en';

  // 預覽PDF分頁位置函數
  const handlePreviewPageBreaks = (): void => {
    const element = document.getElementById('resume-content');
    if (!element) {
      alert('找不到履歷內容區塊，請確認主體區塊有 id="resume-content"');
      return;
    }

    // 切換分頁預覽狀態
    setShowPageBreaks(!showPageBreaks);
    
    if (!showPageBreaks) {
      // 添加分頁預覽樣式
      const previewStyles = document.createElement('style');
      previewStyles.id = 'pdf-page-break-preview';
      previewStyles.textContent = `
        /* 虛擬 A4 頁面大小和預覽 */
        #resume-content {
          max-width: 210mm;
          margin: 0 auto;
          padding: 15mm;
          background-color: white;
        }
        
        /* 顯示分頁標記 */
        #resume-content .page-break-preview {
          display: block;
          width: 100%;
          border-top: 1px dashed #ff5555;
          border-bottom: 1px dashed #ff5555;
          margin: 10px 0;
          padding: 4px 0;
          text-align: center;
          color: #ff5555;
          background-color: rgba(255, 85, 85, 0.05);
          font-weight: bold;
          font-family: monospace;
          font-size: 10px;
          position: relative;
          z-index: 1000;
        }
      `;
      document.head.appendChild(previewStyles);
      
      // 計算並插入分頁標記
      const pageHeight = 297 - 40; // A4高度(mm)減去上下邊距
      const contentHeight = element.scrollHeight;
      const pixelsPerMM = contentHeight / pageHeight;
      
      // 移除舊的分頁標記
      const oldMarkers = document.querySelectorAll('.page-break-preview');
      oldMarkers.forEach(marker => marker.remove());
      
      // 根據A4頁面高度計算預計分頁位置
      const pageBreakPositions = [];
      let pageCount = Math.ceil(contentHeight / (pageHeight * pixelsPerMM));
      
      for (let i = 1; i < pageCount; i++) {
        const breakPosition = i * pageHeight * pixelsPerMM;
        pageBreakPositions.push(breakPosition);
      }
      
      // 插入分頁標記
      pageBreakPositions.forEach((position, index) => {
        // 創建用於檢測位置的元素
        const detector = document.createElement('div');
        detector.style.position = 'absolute';
        detector.style.top = `${position}px`;
        detector.style.width = '1px';
        detector.style.height = '1px';
        element.appendChild(detector);
        
        // 找到最接近的元素並在其之前插入分頁標記
        const closestElement = document.elementFromPoint(
          detector.getBoundingClientRect().left,
          detector.getBoundingClientRect().top
        );
        
        if (closestElement && closestElement !== detector) {
          const marker = document.createElement('div');
          marker.className = 'page-break-preview';
          marker.textContent = `--- 第 ${index + 1} 頁結束 / 第 ${index + 2} 頁開始 ---`;
          
          try {
            closestElement.parentNode?.insertBefore(marker, closestElement);
          } catch (e) {
            console.warn('無法在此位置插入分頁標記:', e);
          }
        }
        
        // 移除檢測元素
        detector.remove();
      });
    } else {
      // 移除預覽樣式和標記
      const previewStyles = document.getElementById('pdf-page-break-preview');
      if (previewStyles) previewStyles.remove();
      
      const markers = document.querySelectorAll('.page-break-preview');
      markers.forEach(marker => marker.remove());
    }
  };

  // 生成並下載PDF文件
  const handleDownloadClick = async (): Promise<void> => {
    const element = document.getElementById('resume-content');
    if (!element) {
      alert('找不到履歷內容區塊，請確認主體區塊有 id="resume-content"');
      return;
    }
    
    // 1. 動態載入 pdf-styles.css，插入 <style> 於 resume-content
    let pdfStyleTag: HTMLStyleElement | null = null;
    try {
      let pdfCss = await fetch('/pdf-styles.css').then(res => res.text());
      // 將所有 #pdf-template 換成 #resume-content
      pdfCss = pdfCss.replace(/#pdf-template/g, '#resume-content');
      // 在最前方加入全局字型與顏色強制規則
      const globalFontCss = `\n#resume-content, #resume-content * { font-family: 'Arial', 'Helvetica Neue', Helvetica, sans-serif !important; color: #222 !important; }\n`;
      pdfStyleTag = document.createElement('style');
      pdfStyleTag.id = 'pdf-style-inject';
      pdfStyleTag.textContent = globalFontCss + pdfCss;
      element.prepend(pdfStyleTag);
    } catch (e) {
      console.warn('PDF 專用樣式載入失敗:', e);
    }

    // 對英文版中的技能區塊進行特殊處理，確保正確顯示和整齊排列
    if (isEnglish) {
      // 找到技能部分
      const skillsSectionElement = element.querySelector('#technical-skills');
      if (skillsSectionElement) {
        // 為技能區塊添加特別樣式
        (skillsSectionElement as HTMLElement).style.display = 'block';
        (skillsSectionElement as HTMLElement).style.width = '100%';
        (skillsSectionElement as HTMLElement).style.pageBreakInside = 'avoid';
        (skillsSectionElement as HTMLElement).style.breakInside = 'avoid';
        (skillsSectionElement as HTMLElement).style.pageBreakBefore = 'always';
        (skillsSectionElement as HTMLElement).style.breakBefore = 'page';
        
        // 為技能區塊的直接子元素設置樣式
        const skillsContainer = skillsSectionElement.querySelector(':scope > div');
        if (skillsContainer) {
          (skillsContainer as HTMLElement).style.display = 'flex';
          (skillsContainer as HTMLElement).style.flexWrap = 'wrap';
          (skillsContainer as HTMLElement).style.justifyContent = 'space-between';
          (skillsContainer as HTMLElement).style.width = '100%';
        }
        
        // 找到所有技能類別
        const skillCategories = skillsSectionElement.querySelectorAll(':scope > div > div');
        
        // 為每個技能類別設置樣式
        skillCategories.forEach(category => {
          const categoryElement = category as HTMLElement;
          categoryElement.style.display = 'inline-block';
          categoryElement.style.verticalAlign = 'top';
          categoryElement.style.width = '22%';
          categoryElement.style.minWidth = '150px';
          categoryElement.style.marginRight = '0.5em';
          categoryElement.style.marginBottom = '1em';
          categoryElement.style.breakInside = 'avoid';
          categoryElement.style.pageBreakInside = 'avoid';
          
          // 確保標題不被切斷
          const title = categoryElement.querySelector('h3');
          if (title) {
            (title as HTMLElement).style.whiteSpace = 'normal';
            (title as HTMLElement).style.wordBreak = 'break-word';
            (title as HTMLElement).style.marginBottom = '0.5em';
          }
          
          // 確保列表不被分割
          const lists = categoryElement.querySelectorAll('ul, ol');
          lists.forEach(list => {
            const listElement = list as HTMLElement;
            listElement.style.breakInside = 'avoid';
            listElement.style.pageBreakInside = 'avoid';
            listElement.style.marginLeft = '0';
            listElement.style.paddingLeft = '1em';
            listElement.style.marginBottom = '0.5em';
            
            // 確保列表項不被斷行
            const items = listElement.querySelectorAll('li');
            items.forEach(item => {
              const itemElement = item as HTMLElement;
              itemElement.style.breakInside = 'avoid';
              itemElement.style.pageBreakInside = 'avoid';
              itemElement.style.whiteSpace = 'normal';
              itemElement.style.wordBreak = 'break-word';
              itemElement.style.marginBottom = '3px';
              itemElement.style.display = 'block';
            });
          });
        });
      }
      
      // 確保所有段落不被切斷
      const paragraphs = element.querySelectorAll('p');
      paragraphs.forEach(p => {
        const pElement = p as HTMLElement;
        pElement.style.breakInside = 'avoid';
        pElement.style.pageBreakInside = 'avoid';
        pElement.style.whiteSpace = 'normal';
        pElement.style.wordBreak = 'break-word';
      });
    }

    // 在生成PDF前對技能區塊進行表格化處理，針對中英文版本分別優化
    const skillsSection = element.querySelector('#technical-skills');
    if (skillsSection) {
      // 找到技能容器
      const skillsContainer = skillsSection.querySelector(':scope > div');
      if (skillsContainer) {
        // 備份原始內容
        const originalContent = skillsContainer.innerHTML;
        
        // 獲取所有技能類別
        const skillCategories = Array.from(skillsContainer.querySelectorAll(':scope > div'));
        
        // 根據語言版本決定布局策略
        if (isEnglish) {
          // 英文版使用 4 列布局
          createSkillsTable(skillsContainer, skillCategories, 4);
        } else {
          // 中文版使用 4 列布局，但有不同的樣式調整
          createSkillsTable(skillsContainer, skillCategories, 4, true);
        }
        
        // 在表格後添加一個隱藏的原始內容備份
        const backup = document.createElement('div');
        backup.style.display = 'none';
        backup.id = 'skills-original-backup';
        backup.innerHTML = originalContent;
        skillsContainer.appendChild(backup);
      }
    }
    
    // 創建技能表格的輔助函數
    function createSkillsTable(container: Element, categories: Element[], colsPerRow: number, isChinese = false) {
      // 創建表格結構
      const table = document.createElement('table');
      table.className = 'skills-table';
      table.style.width = '100%';
      table.style.borderCollapse = 'separate';
      table.style.borderSpacing = '10px';
      table.style.tableLayout = 'fixed';
      
      // 設置列寬度
      const colWidth = 100 / colsPerRow;
      for (let i = 0; i < colsPerRow; i++) {
        const col = document.createElement('col');
        col.style.width = `${colWidth}%`;
        table.appendChild(col);
      }
      
      // 按行分組技能類別
      for (let i = 0; i < categories.length; i += colsPerRow) {
        const tr = document.createElement('tr');
        
        // 添加每一列
        for (let j = 0; j < colsPerRow && i + j < categories.length; j++) {
          const td = document.createElement('td');
          td.style.verticalAlign = 'top';
          td.style.padding = '5px';
          
          // 複製原始類別元素
          const category = categories[i + j].cloneNode(true) as HTMLElement;
          
          // 應用樣式到標題
          const title = category.querySelector('h3');
          if (title) {
            (title as HTMLElement).style.marginBottom = '0.5em';
            (title as HTMLElement).style.whiteSpace = 'normal';
            (title as HTMLElement).style.wordBreak = 'break-word';
            (title as HTMLElement).style.fontSize = isChinese ? '1em' : '1em';
            (title as HTMLElement).style.fontWeight = 'bold';
          }
          
          // 應用樣式到列表
          const lists = category.querySelectorAll('ul, ol');
          lists.forEach(list => {
            (list as HTMLElement).style.marginLeft = '0';
            (list as HTMLElement).style.paddingLeft = '1em';
            (list as HTMLElement).style.breakInside = 'avoid';
            (list as HTMLElement).style.pageBreakInside = 'avoid';
            (list as HTMLElement).style.marginBottom = '0.5em';
          });
          
          // 應用樣式到列表項
          const listItems = category.querySelectorAll('li');
          listItems.forEach(item => {
            (item as HTMLElement).style.whiteSpace = 'normal';
            (item as HTMLElement).style.wordBreak = 'break-word';
            (item as HTMLElement).style.breakInside = 'avoid';
            (item as HTMLElement).style.pageBreakInside = 'avoid';
            (item as HTMLElement).style.display = 'block';
            (item as HTMLElement).style.marginBottom = '3px';
            
            // 中文版特別調整
            if (isChinese) {
              (item as HTMLElement).style.fontSize = '0.95em';
            }
          });
          
          td.appendChild(category);
          tr.appendChild(td);
        }
        
        // 填充空列
        for (let j = categories.length - i; j < colsPerRow; j++) {
          const td = document.createElement('td');
          tr.appendChild(td);
        }
        
        table.appendChild(tr);
      }
      
      // 替換原始內容
      container.innerHTML = '';
      container.appendChild(table);
    }
    
    // 在生成PDF前添加臨時樣式，確保更好的分頁效果
    const tempStyles = document.createElement('style');
    tempStyles.id = 'pdf-temp-styles';
    
    // 為英文與中文版本適配不同的排版規則
    tempStyles.textContent = `
      /* 為 PDF 生成添加的臨時樣式 */
      @media print {
        /* 全局防止內容被切割的規則 */
        h1, h2, h3, h4, h5, h6 { 
          page-break-after: avoid !important; 
          break-after: avoid !important;
          page-break-inside: avoid !important; 
          break-inside: avoid !important;
          orphans: 4; 
          widows: 4;
          margin-bottom: 0.7em;
        }
        
        /* 確保標題下至少有3行文字跟著標題一起，避免標題在頁尾 */
        h1::after, h2::after, h3::after { 
          content: ""; 
          display: block; 
          height: 1.2em;
          page-break-after: avoid;
          break-after: avoid;
        }
        
        /* 避免段落被分割到不同頁面 - 英文版需要更嚴格的控制 */
        p { 
          page-break-inside: avoid !important; 
          break-inside: avoid !important;
          orphans: ${isEnglish ? 6 : 4}; 
          widows: ${isEnglish ? 6 : 4};
          margin-bottom: 0.5em;
          white-space: normal !important;
          word-wrap: break-word !important;
        }
        
        /* 確保段落中的文字不被切斷 */
        p a, p span, a, span {
          white-space: normal !important;
          word-wrap: break-word !important;
          word-break: normal !important;
          display: inline !important;
        }
        
        /* 強制工作經歷項作為一個整體 */
        .work-experience-entry, .education-entry, .project-entry { 
          page-break-inside: avoid !important; 
          break-inside: avoid !important;
          display: block !important;
          margin-bottom: ${isEnglish ? '1.5em' : '15px'};
          position: relative;
          max-width: 100%;
          width: 100%;
        }

        /* 工作經歷標題與內容不分離 */
        .work-experience-title, .job-title, .company-name {
          page-break-after: avoid !important;
          break-after: avoid !important;
          margin-bottom: 0.3em;
        }

        /* 確保工作經歷的 bulletpoint 列表不被分割 */
        .work-experience-entry ul, .work-experience-entry ol {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          page-break-before: avoid !important;
          break-before: avoid !important;
          margin: 0 !important;
          padding-left: 1.5em !important;
          margin-top: 0.2em !important; /* 減少標題和列表之間的間距 */
        }

        /* 確保工作經歷的列表項不被分割 */
        .work-experience-entry li {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          display: list-item !important;
          margin-bottom: ${isEnglish ? '0.2em' : '0.3em'} !important; /* 英文版減少列表項間距 */
          line-height: ${isEnglish ? '1.3' : '1.5'} !important; /* 英文版減少行高 */
        }

        /* 英文版特別規則 */
        ${isEnglish ? `
        /* 工作經歷區塊作為整體 */
        #experience .relative.pl-8.py-3.group {
          display: block !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        
        #professional-summary, #experience {
          break-before: avoid;
          page-break-before: avoid;
          margin-top: 0;
        }
        
        #education, #projects, #skills {
          break-before: page;
          page-break-before: always;
          margin-top: 0.5em;
          padding-top: 0.5em;
        }
        
        .work-experience-entry {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          display: block !important;
          margin-bottom: 0.8em; /* 減少工作經歷項之間的間距 */
          padding-bottom: 0; /* 移除底部內邊距 */
        }
        
        /* 英文版特別調整標題和日期的間距 */
        .work-experience-entry h3, .work-experience-entry h4 {
          margin-bottom: 0.1em !important;
          line-height: 1.3 !important;
        }
        
        /* 英文版調整公司名稱和日期的間距 */
        .work-experience-entry p {
          margin-top: 0 !important;
          margin-bottom: 0.2em !important;
          line-height: 1.3 !important;
        }
        
        /* 確保 Markdown 內容區塊不被分頁 */
        .work-experience-entry .text-sm {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        
        /* 確保列表不被分頁 */
        .work-experience-entry .text-sm ul,
        .work-experience-entry .text-sm ol {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          margin-top: 0.2em !important;
          margin-bottom: 0 !important;
          padding-left: 1.5em !important;
        }
        
        /* 確保列表項不被分頁 */
        .work-experience-entry .text-sm li {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          margin-bottom: 0.2em !important;
          line-height: 1.3 !important;
        }` : `
        /* 中文版特別規則 */
        #experience .relative.pl-8.py-3.group {
          display: block !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          margin-bottom: 1em;
        }
        
        /* 確保 Markdown 內容區塊不被分頁 */
        .work-experience-entry .text-sm {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        
        /* 確保列表不被分頁 */
        .work-experience-entry .text-sm ul,
        .work-experience-entry .text-sm ol {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          margin-top: 0.2em !important;
          margin-bottom: 0 !important;
          padding-left: 1.5em !important;
        }
        
        /* 確保列表項不被分頁 */
        .work-experience-entry .text-sm li {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          margin-bottom: 0.3em !important;
          line-height: 1.5 !important;
        }
        `}
        
        /* 確保技能部分排版正確 */
        #technical-skills, .skills-section {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
          width: 100%;
          display: block;
          break-before: page !important; /* 確保技能部分在新頁面開始 */
          page-break-before: always !important;
          padding-top: 1em;
        }
        
        /* 技能表格樣式 */
        .skills-table {
          width: 100% !important;
          border-collapse: separate !important;
          border-spacing: 10px !important;
        }
        
        .skills-table td {
          vertical-align: top !important;
          width: 25% !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        
        /* 技能列表中的項目保持在一起 */
        .skills-section li,
        #technical-skills li {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          display: block;
          margin-bottom: 0.2em;
          white-space: normal !important;
          word-wrap: break-word !important;
        }
        
        /* 確保列表不被分割 */
        #technical-skills ul, 
        #technical-skills ol {
          margin: 0 !important;
          padding-left: 1em !important;
          break-inside: avoid !important;
          page-break-inside: avoid !important;
          margin-bottom: 0.5em !important;
        }
        
        li { 
          page-break-inside: avoid !important; 
          break-inside: avoid !important;
        }
        
        /* 確保聯繫信息不被分割 */
        .contact-info {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
      }
    `;
    
    document.head.appendChild(tempStyles);
    
    // 臨時調整元素樣式以適應PDF生成
    element.style.maxWidth = '210mm';
    element.style.margin = '0 auto';
    element.style.padding = '15mm';

    // 在生成PDF前，重構工作經歷項的DOM結構，確保標題和內容不被分頁分開
    const experienceSection = element.querySelector('#experience');
    if (experienceSection) {
      console.log('找到工作經歷部分');
      // 備份原始DOM結構，以便PDF生成後還原
      const originalExperienceHTML = experienceSection.innerHTML;
      
      // 找到所有工作經歷項 - 特別適配 EntryItem 組件的結構
      const workEntries = experienceSection.querySelectorAll('.space-y-2 > .relative.pl-8.py-3.group');
      console.log(`找到 ${workEntries.length} 個工作經歷項`);
      
      // 不重構 DOM，而是直接將分頁樣式應用到現有元素
      workEntries.forEach((entry, index) => {
        // 添加類名以便應用樣式
        (entry as HTMLElement).classList.add('work-experience-entry');
        
        // 設置關鍵樣式確保不分頁
        (entry as HTMLElement).style.display = 'block';
        (entry as HTMLElement).style.pageBreakInside = 'avoid !important';
        (entry as HTMLElement).style.breakInside = 'avoid !important';
        (entry as HTMLElement).style.marginBottom = isEnglish ? '1em' : '1.2em';
        (entry as HTMLElement).style.position = 'relative';
        
        // 找到標題元素（職稱）
        const title = entry.querySelector('h3');
        if (title) {
          (title as HTMLElement).style.marginBottom = '0.1em';
          (title as HTMLElement).style.lineHeight = '1.3';
          (title as HTMLElement).style.pageBreakAfter = 'avoid !important';
          (title as HTMLElement).style.breakAfter = 'avoid !important';
        }
        
        // 找到公司和日期信息
        const companyInfo = entry.querySelector('p');
        if (companyInfo) {
          (companyInfo as HTMLElement).style.marginTop = '0';
          (companyInfo as HTMLElement).style.marginBottom = '0.2em';
          (companyInfo as HTMLElement).style.lineHeight = '1.3';
          (companyInfo as HTMLElement).style.pageBreakAfter = 'avoid !important';
          (companyInfo as HTMLElement).style.breakAfter = 'avoid !important';
        }
        
        // 找到 Markdown 內容區塊（包含列表）
        const markdownContent = entry.querySelector('.text-sm');
        if (markdownContent) {
          console.log(`找到第 ${index+1} 個工作經歷項的 Markdown 內容`);
          (markdownContent as HTMLElement).style.pageBreakInside = 'avoid !important';
          (markdownContent as HTMLElement).style.breakInside = 'avoid !important';
          
          // 調整內容區塊中的列表樣式
          const lists = markdownContent.querySelectorAll('ul, ol');
          lists.forEach(list => {
            (list as HTMLElement).style.marginTop = '0.2em';
            (list as HTMLElement).style.marginBottom = '0';
            (list as HTMLElement).style.paddingLeft = '1.5em';
            (list as HTMLElement).style.pageBreakInside = 'avoid !important';
            (list as HTMLElement).style.breakInside = 'avoid !important';
            
            // 調整列表項樣式
            const items = list.querySelectorAll('li');
            console.log(`找到 ${items.length} 個列表項`);
            items.forEach(item => {
              (item as HTMLElement).style.marginBottom = isEnglish ? '0.2em' : '0.3em';
              (item as HTMLElement).style.lineHeight = isEnglish ? '1.3' : '1.5';
              (item as HTMLElement).style.pageBreakInside = 'avoid !important';
              (item as HTMLElement).style.breakInside = 'avoid !important';
            });
          });
        } else {
          console.log(`第 ${index+1} 個工作經歷項沒有找到 Markdown 內容`);
        }
      });
      
      // 備份原始內容
      const originalContentBackup = document.createElement('div');
      originalContentBackup.style.display = 'none';
      originalContentBackup.id = 'experience-original-backup';
      originalContentBackup.innerHTML = originalExperienceHTML;
      experienceSection.appendChild(originalContentBackup);
    } else {
      console.log('沒有找到工作經歷部分');
    }

    // 設置處理中狀態
    setIsProcessing(true);
    
    try {
      // 生成PDF - 使用正確的html2pdf導入方式
      const html2pdf = (await import('html2pdf.js')).default;
      
      // 設定選項 - 為英文版調整邊距
      const opt: Html2PdfOptions = {
        margin: isEnglish ? [10, 10, 10, 10] : 10, // 英文版可以調整四邊邊距
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait' as 'portrait', 
          compress: true,
          hotfixes: ['px_scaling']
        }
      };
      
      // 使用原始元素生成PDF
      await html2pdf().from(element).set(opt).save();
      
      // PDF 生成結束後，移除剛剛插入的 <style>（確保不影響網頁正常樣式）
      if (pdfStyleTag && pdfStyleTag.parentNode) {
        pdfStyleTag.parentNode.removeChild(pdfStyleTag);
      }
      
      // 移除臨時樣式並還原原始DOM
      const tempStyle = document.getElementById('pdf-temp-styles');
      if (tempStyle) tempStyle.remove();
      
      // 還原元素的原始樣式
      element.style.maxWidth = '';
      element.style.margin = '';
      element.style.padding = '';
      
      // 還原工作經歷部分的原始DOM結構
      const experienceSection = element.querySelector('#experience');
      if (experienceSection) {
        const originalBackup = document.getElementById('experience-original-backup');
        if (originalBackup) {
          experienceSection.innerHTML = originalBackup.innerHTML;
        }
      }
      
      // 移除預覽標記如果存在
      const markers = document.querySelectorAll('.page-break-preview');
      markers.forEach(marker => marker.remove());
      
      // 重設處理中狀態
      setIsProcessing(false);
      
      // 提示用戶PDF生成成功
      console.log('PDF生成成功');
      
      // 顯示成功提示框
      setShowSuccess(true);
      
      // 2 秒後自動關閉成功提示框
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (error: unknown) {
      console.error('PDF 產生錯誤:', error);
      alert('無法產生 PDF，請查看控制台了解詳情');
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 relative">
      {/* 成功提示框 */}
      {showSuccess && (
        <div className="absolute -top-10 left-0 right-0 bg-green-100 text-green-800 text-xs px-2 py-1 rounded flex items-center justify-center">
          <CheckCircle className="h-3 w-3 mr-1" />
          PDF 生成成功!
        </div>
      )}
      
      {/* 預覽分頁按鈕 */}
      <Button
        onClick={handlePreviewPageBreaks}
        variant="outline"
        size="sm"
        disabled={isProcessing}
        className={cn(
          "text-xs px-3 py-1.5 border-primary/60",
          showPageBreaks 
            ? "bg-primary/10 text-primary" 
            : "text-primary hover:bg-primary/10"
        )}
      >
        <Eye className="h-3.5 w-3.5 mr-1.5" />
        {showPageBreaks ? "隱藏分頁" : "預覽分頁"}
      </Button>

      {/* 下載 PDF 按鈕 */}
      <Button
        onClick={handleDownloadClick}
        variant="outline"
        size="sm"
        disabled={isProcessing}
        className={cn(
          // Base styles for the button
          "text-xs px-3 py-1.5 border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground",
          // Apply custom classes, e.g., for width
          buttonClassName
        )}
      >
        {isProcessing ? (
          <>
            <div className="h-3.5 w-3.5 mr-1.5 animate-spin rounded-full border-2 border-primary border-r-transparent" />
            處理中...
          </>
        ) : (
          <>
            <Download className="h-3.5 w-3.5 mr-1.5" />
            {dictionary.header.downloadPdf}
          </>
        )}
      </Button>
    </div>
  );
}
