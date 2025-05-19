"use client";

import { cn } from '@/lib/utils';
import Link from 'next/link';

interface SkillCategory {
  title: string;
  skills: string[];
  hashtags?: string[];
  link?: string;
}

interface SkillsGridProps {
  categories: SkillCategory[];
  className?: string;
}

export default function SkillsGrid({ categories, className }: SkillsGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", className)}>
      {categories.map((category, index) => (
        <div key={index} className="space-y-4">
          <h3 className="text-lg font-semibold border-b-2 border-primary/30 pb-1 text-primary">
            {category.title}
          </h3>
          <ul className="space-y-2">
            {category.skills.map((skill, skillIndex) => (
              <li key={skillIndex} className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
          {/* 已移除標籤顯示區塊 */}
          {category.link && (
            <div className="pt-1">
              <Link 
                href={category.link} 
                className="text-sm text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {category.link.includes('Python') ? '免費測你的Python程度' : category.link}
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
