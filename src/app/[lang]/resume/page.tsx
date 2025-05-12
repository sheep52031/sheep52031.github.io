
import { getDictionary } from '@/lib/i18n';
import { isLocale, type Locale } from '@/lib/i18n-config';
import { getResumeData } from '@/lib/resume-data';
import MarkdownDisplay from '@/components/resume/markdown-display';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react';
import DownloadPdfButton from '@/components/resume/download-pdf-button';

// Helper component for styling Experience and Education entries
const EntryItem = ({ 
  title, 
  subtitle, 
  descriptionMarkdown 
}: { 
  title: string; 
  subtitle: string; 
  descriptionMarkdown: string | undefined;
}) => (
  <div className="relative pl-8 py-3 group">
    {/* Dot */}
    <div className="absolute left-[1px] top-[1.125rem] w-3 h-3 bg-primary rounded-full transform -translate-y-1/2 border-2 border-background"></div>
    {/* Vertical line: extended slightly above the dot and connects to the next one if not last */}
    <div className="absolute left-[6px] top-0 bottom-0 w-px bg-primary/50 
                    group-first:top-[1.125rem] group-last:bottom-auto group-last:h-[calc(1.125rem)]"></div>
    
    <h3 className="font-semibold text-lg text-foreground leading-tight">{title}</h3>
    <p className="text-sm text-muted-foreground mb-1">{subtitle}</p>
    {descriptionMarkdown && (
      <div className="text-sm">
        <MarkdownDisplay content={descriptionMarkdown} />
      </div>
    )}
  </div>
);

export default async function ResumePage({ params }: { params: { lang: string } }) {
  const lang = isLocale(params.lang) ? params.lang : 'en';
  const dictionary = await getDictionary(lang);
  const resumeData = getResumeData(lang);
  
  return (
    <div className="grid grid-cols-1 gap-y-8">
      {/* Main Content Column */}
      <div className="space-y-10">
        <header className="grid grid-cols-1 md:grid-cols-3 gap-x-8 pt-2 pb-6 border-b border-border">
          {/* Main content area (Name, Title, Summary) */}
          <div className="md:col-span-2 space-y-4">
            {/* Name and Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
                {resumeData.name}
              </h1>
              <p className="mt-1 text-lg sm:text-xl text-muted-foreground">
                {resumeData.jobTitle}
              </p>
            </div>

            {/* Summary Section - moved here */}
            {resumeData.summary.markdown && (
              <div className="text-foreground/90 leading-relaxed">
                <MarkdownDisplay content={resumeData.summary.markdown} />
              </div>
            )}
          </div>

          {/* Contact Information Area */}
          <div className="md:col-span-1 mt-6 md:mt-0">
            <div className="p-4 border rounded-lg shadow-md bg-card">
              <h2 className="text-lg font-semibold text-primary mb-3">
                {dictionary.resume.contactTitle}
              </h2>
              {resumeData.contactDetails.email && (
                <div className="flex items-center mt-1.5">
                  <Mail className="h-3.5 w-3.5 mr-1.5 text-muted-foreground flex-shrink-0" />
                  <a href={`mailto:${resumeData.contactDetails.email}`} className="hover:text-primary break-all text-xs">
                    {resumeData.contactDetails.email}
                  </a>
                </div>
              )}
              {resumeData.contactDetails.phone && (
                <div className="flex items-center mt-1.5">
                  <Phone className="h-3.5 w-3.5 mr-1.5 text-muted-foreground flex-shrink-0" />
                  <a href={`tel:${resumeData.contactDetails.phone}`} className="hover:text-primary text-xs">
                    {resumeData.contactDetails.phone}
                  </a>
                </div>
              )}
              {resumeData.contactDetails.location && (
                <div className="flex items-center mt-1.5">
                  <MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs">{resumeData.contactDetails.location}</span>
                </div>
              )}
              {resumeData.contactDetails.linkedin && (
                <div className="flex items-center mt-1.5">
                  <Linkedin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground flex-shrink-0" />
                  <a href={resumeData.contactDetails.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary truncate text-xs">
                    {resumeData.contactDetails.linkedinHandle || resumeData.contactDetails.linkedin.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              {resumeData.contactDetails.github && (
                <div className="flex items-center mt-1.5">
                  <Github className="h-3.5 w-3.5 mr-1.5 text-muted-foreground flex-shrink-0" />
                  <a href={resumeData.contactDetails.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary truncate text-xs">
                    {resumeData.contactDetails.githubHandle || resumeData.contactDetails.github.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              {resumeData.contactDetails.portfolio && (
                <div className="flex items-center mt-1.5">
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5 text-muted-foreground flex-shrink-0" />
                  <a href={resumeData.contactDetails.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-primary truncate text-xs">
                    {resumeData.contactDetails.portfolio.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              <div className="mt-4">
                <DownloadPdfButton dictionary={dictionary} lang={lang as Locale} buttonClassName="w-full" />
              </div>
            </div>
          </div>
        </header>

        {/* Work Experience Section */}
        {resumeData.experience.entries.length > 0 && (
          <section id="experience">
            <h2 className="text-2xl font-bold text-primary mb-4 pb-1 border-b-2 border-primary/30">
              {dictionary.resume.experienceTitle}
            </h2>
            <div className="space-y-2">
              {resumeData.experience.entries.map((entry, index) => (
                <EntryItem
                  key={index}
                  title={entry.role}
                  subtitle={`${entry.company} | ${entry.period}`}
                  descriptionMarkdown={entry.descriptionMarkdown}
                />
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {resumeData.education.entries.length > 0 && (
          <section id="education">
            <h2 className="text-2xl font-bold text-primary mb-4 pb-1 border-b-2 border-primary/30">
              {dictionary.resume.educationTitle}
            </h2>
            <div className="space-y-2">
              {resumeData.education.entries.map((entry, index) => (
                <EntryItem
                  key={index}
                  title={entry.degree}
                  subtitle={`${entry.institution} | ${entry.period}`}
                  descriptionMarkdown={entry.descriptionMarkdown}
                />
              ))}
            </div>
          </section>
        )}
        
        {/* Skills Section */}
        {resumeData.skills.markdown && (
          <section id="skills">
            <h2 className="text-2xl font-bold text-primary mb-4 pb-1 border-b-2 border-primary/30">
              {dictionary.resume.skillsTitle}
            </h2>
            <MarkdownDisplay content={resumeData.skills.markdown} />
          </section>
        )}

        {/* Projects Section */}
        {resumeData.projects.markdown && (
          <section id="projects">
            <h2 className="text-2xl font-bold text-primary mb-4 pb-1 border-b-2 border-primary/30">
              {dictionary.resume.projectsTitle}
            </h2>
            <MarkdownDisplay content={resumeData.projects.markdown} />
          </section>
        )}
      </div>
    </div>
  );
}

