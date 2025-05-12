import { getDictionary, isLocale, Locale } from '@/lib/i18n';
import { getResumeData } from '@/lib/resume-data';
import ResumeSection from '@/components/resume/resume-section';
import MarkdownDisplay from '@/components/resume/markdown-display';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default async function ResumePage({ params }: { params: { lang: string } }) {
  const lang = isLocale(params.lang) ? params.lang : 'en';
  const dictionary = await getDictionary(lang);
  const resumeData = getResumeData(lang);

  return (
    <div className="space-y-12">
      <header className="text-center py-8 bg-card rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-6">
          <Avatar className="w-32 h-32 mb-4 border-4 border-primary shadow-lg">
            <AvatarImage src="https://picsum.photos/200/200" alt={resumeData.name} data-ai-hint="professional portrait" />
            <AvatarFallback className="text-4xl">
              {resumeData.name.substring(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            {resumeData.name}
          </h1>
          <p className="mt-2 text-xl sm:text-2xl text-muted-foreground">
            {resumeData.jobTitle}
          </p>
        </div>
      </header>

      <ResumeSection id="summary" title={dictionary.resume.summaryTitle}>
        <MarkdownDisplay content={resumeData.summary.markdown} />
      </ResumeSection>

      <ResumeSection id="experience" title={dictionary.resume.experienceTitle}>
        <MarkdownDisplay content={resumeData.experience.markdown} />
      </ResumeSection>

      <ResumeSection id="education" title={dictionary.resume.educationTitle}>
        <MarkdownDisplay content={resumeData.education.markdown} />
      </ResumeSection>

      <ResumeSection id="skills" title={dictionary.resume.skillsTitle}>
        <MarkdownDisplay content={resumeData.skills.markdown} />
      </ResumeSection>

      <ResumeSection id="projects" title={dictionary.resume.projectsTitle}>
        <MarkdownDisplay content={resumeData.projects.markdown} />
      </ResumeSection>

      <ResumeSection id="contact" title={dictionary.resume.contactTitle}>
        <MarkdownDisplay content={resumeData.contact.markdown} />
      </ResumeSection>
    </div>
  );
}
