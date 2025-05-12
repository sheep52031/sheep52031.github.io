# **App Name**: BilingualResume

## Core Features:

- Bilingual Support: Enable users to switch the UI between English and Chinese, storing their preference in local storage. Translation support covers all UI elements, labels and text contents. When using locale is switched, use React Context and Providers to pass current locale.
- Responsive Layout: Card-based layout for content sections, making use of shadcn/ui for UI components. Implement responsive navigation bar with links to different resume sections and current page location.
- Markdown Content Display: Support displaying content, specially resume information, using Markdown format. Implement styling of Markdown content to be consistent with overall theme.
- Download PDF: User can trigger a download to get a PDF copy of the current resume in the current language.

## Style Guidelines:

- Primary color: White for a clean background.
- Accent: Sky Blue (#87CEEB) for highlights and interactive elements.
- Clean and readable sans-serif fonts for both English and Chinese.
- Card-based layout for sections to organize content clearly.
- Subtle animations for page transitions and hover effects.