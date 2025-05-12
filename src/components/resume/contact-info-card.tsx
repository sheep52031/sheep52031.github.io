
"use client";

import type { ContactDetails } from '@/lib/resume-data';
import type { Dictionary } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language'; // To get current locale for PDF download

interface ContactInfoCardProps {
  contactDetails: ContactDetails;
  dictionary: Dictionary['resume']; // Pass only the resume part of the dictionary
}

export default function ContactInfoCard({ contactDetails, dictionary }: ContactInfoCardProps) {
  const { locale } = useLanguage();

  const handleDownloadPdf = () => {
    // Placeholder for PDF download functionality
    alert(dictionary.contactTitle + ' PDF download functionality is a placeholder. Resume content would be captured and converted to PDF for locale: ' + locale);
    // In a real app, you might trigger a server action or client-side PDF generation library
  };

  const contactItems = [
    { label: dictionary.contactEmail, value: contactDetails.email, href: `mailto:${contactDetails.email}`, icon: <Mail className="h-4 w-4 text-primary" /> },
    { label: dictionary.contactPhone, value: contactDetails.phone, href: `tel:${contactDetails.phone}`, icon: <Phone className="h-4 w-4 text-primary" /> },
    { label: dictionary.contactLocation, value: contactDetails.location, icon: <MapPin className="h-4 w-4 text-primary" /> },
    { label: dictionary.contactLinkedIn, value: contactDetails.linkedinHandle, href: contactDetails.linkedin, icon: <Linkedin className="h-4 w-4 text-primary" /> },
    { label: dictionary.contactGitHub, value: contactDetails.githubHandle, href: contactDetails.github, icon: <Github className="h-4 w-4 text-primary" /> },
  ];

  if (contactDetails.portfolio) {
    contactItems.push({ label: dictionary.contactPortfolio, value: contactDetails.portfolio.replace(/^https?:\/\//, ''), href: contactDetails.portfolio, icon: <ExternalLink className="h-4 w-4 text-primary" /> });
  }
  

  return (
    <Card className="shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-secondary/30 p-4">
        <CardTitle className="text-xl font-semibold text-primary">
          {dictionary.contactTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {contactItems.map((item, index) => (
          item.value && (
            <div key={index} className="flex items-start space-x-3">
              <span className="flex-shrink-0 pt-1">{item.icon}</span>
              <div>
                <span className="block text-sm font-medium text-foreground">{item.label}</span>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors break-all"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="block text-sm text-muted-foreground break-all">{item.value}</span>
                )}
              </div>
            </div>
          )
        ))}
        <Button
          onClick={handleDownloadPdf}
          variant="outline"
          className="w-full mt-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Download className="h-4 w-4 mr-2" />
          {useLanguage().dictionary.header.downloadPdf}
        </Button>
      </CardContent>
    </Card>
  );
}
