
import { getDictionary } from '@/lib/i18n';
import { isLocale, type Locale } from '@/lib/i18n-config';
import { getResumeData } from '@/lib/resume-data';
import MarkdownDisplay from '@/components/resume/markdown-display';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react';
import DownloadPdfButton from '@/components/resume/download-pdf-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
        <header className="flex flex-col sm:flex-row justify-between items-start pt-2 pb-6 border-b border-border">
          {/* Left: Name and Title */}
          <div className="flex-grow mb-4 sm:mb-0">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
              {resumeData.name}
            </h1>
            <p className="mt-1 text-lg sm:text-xl text-muted-foreground">
              {resumeData.jobTitle}
            </p>
          </div>

          {/* Right: Contact Card */}
          <div className="sm:ml-auto mt-4 sm:mt-0 w-full sm:w-auto sm:max-w-xs md:max-w-sm">
            <Card className="shadow-md">
              <CardHeader className="p-4">
                <CardTitle className="text-lg font-semibold text-primary">
                  {dictionary.resume.contactTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2 text-xs sm:text-sm">
                {resumeData.contactDetails.email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                    <a href={`mailto:${resumeData.contactDetails.email}`} className="hover:text-primary break-all">
                      {resumeData.contactDetails.email}
                    </a>
                  </div>
                )}
                {resumeData.contactDetails.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                    <a href={`tel:${resumeData.contactDetails.phone}`} className="hover:text-primary">
                      {resumeData.contactDetails.phone}
                    </a>
                  </div>
                )}
                {resumeData.contactDetails.location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                    <span>{resumeData.contactDetails.location}</span>
                  </div>
                )}
                {resumeData.contactDetails.linkedin && (
                  <div className="flex items-center">
                    <Linkedin className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                    <a href={resumeData.contactDetails.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary truncate">
                      {/* Display handle or full URL based on preference, handle is shorter */}
                      {resumeData.contactDetails.linkedinHandle || resumeData.contactDetails.linkedin.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
                {resumeData.contactDetails.github && (
                  <div className="flex items-center">
                    <Github className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                    <a href={resumeData.contactDetails.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary truncate">
                      {resumeData.contactDetails.githubHandle || resumeData.contactDetails.github.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
                {resumeData.contactDetails.portfolio && (
                  <div className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                    <a href={resumeData.contactDetails.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-primary truncate">
                      {resumeData.contactDetails.portfolio.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
                <div className="pt-2">
                  <DownloadPdfButton dictionary={dictionary} lang={lang as Locale} buttonClassName="w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </header>

        {/* Summary Section */}
        {resumeData.summary.markdown && (
          <section id="summary" className="mt-6">
            <div className="text-foreground/90 leading-relaxed">
                <MarkdownDisplay content={resumeData.summary.markdown} />
            </div>
          </section>
        )}

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
