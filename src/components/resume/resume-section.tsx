import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ResumeSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export default function ResumeSection({ id, title, children, className }: ResumeSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`mb-12 scroll-mt-20 ${className}`}>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
        <CardHeader className="bg-secondary/50 p-6">
          <CardTitle id={`${id}-title`} className="text-2xl sm:text-3xl font-bold text-primary">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-base leading-relaxed">
          {children}
        </CardContent>
      </Card>
    </section>
  );
}
