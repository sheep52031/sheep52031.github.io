
import { getDictionary } from '@/lib/i18n';
import { isLocale } from '@/lib/i18n-config';
import { getResumeData, type ExperienceEntry, type EducationEntry } from '@/lib/resume-data';
import MarkdownDisplay from '@/components/resume/markdown-display';
import ContactInfoCard from '@/components/resume/contact-info-card'; // New component

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
      <MarkdownDisplay content={descriptionMarkdown} className="text-sm" />
    )}
  </div>
);

export default async function ResumePage({ params }: { params: { lang: string } }) {
  const lang = isLocale(params.lang) ? params.lang : 'en';
  const dictionary = await getDictionary(lang);
  const resumeData = getResumeData(lang);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-8">
      {/* Left Column (Main Content) */}
      <div className="lg:col-span-2 space-y-10">
        <header className="pt-2">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary">
            {resumeData.name}
          </h1>
          <p className="mt-1 text-xl sm:text-2xl text-muted-foreground">
            {resumeData.jobTitle}
          </p>
          {resumeData.summary.markdown && (
            <div className="mt-4 text-base text-foreground leading-relaxed">
              {/* Using MarkdownDisplay for the summary in case it has simple formatting like bold/italics */}
              <MarkdownDisplay content={resumeData.summary.markdown} />
            </div>
          )}
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

      {/* Right Column (Sidebar) */}
      <aside className="lg:col-span-1 space-y-6 lg:pt-2">
        <ContactInfoCard contactDetails={resumeData.contactDetails} dictionary={dictionary.resume} />
      </aside>
    </div>
  );
}
