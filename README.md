# BilingualResume

This is a Next.js application for a bilingual (English/Chinese) resume, scaffolded with Firebase Studio.

## Core Features

-   **Bilingual Support**: Switch UI and content between English and Chinese. Language preference is stored in local storage.
-   **Responsive Layout**: Uses a card-based layout with shadcn/ui components for a professional look on all devices.
-   **Markdown Content**: Resume sections are displayed using Markdown for easy editing and rich formatting.
-   **PDF Download (Placeholder)**: A button to (eventually) download the resume as a PDF in the current language.

## Tech Stack

-   Next.js (App Router)
-   React
-   TypeScript
-   Tailwind CSS
-   shadcn/ui components
-   `react-markdown` for Markdown rendering

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will be available at `http://localhost:9002` (or your configured port).

## Project Structure

-   `src/app/[lang]/page.tsx`: Main page component displaying the resume.
-   `src/app/[lang]/layout.tsx`: Layout for language-specific pages.
-   `src/contexts/language-context.tsx`: Manages language state and translations.
-   `src/dictionaries/`: Contains JSON files for English (`en.json`) and Chinese (`zh.json`) translations.
-   `src/lib/resume-data.ts`: Holds the resume content in Markdown format for both languages.
-   `src/components/`: Contains reusable UI components.
    -   `layout/header.tsx`: Responsive navigation header.
    -   `resume/resume-section.tsx`: Card component for resume sections.
    -   `resume/markdown-display.tsx`: Renders Markdown content.
    -   `language-switcher.tsx`: UI for changing language.
-   `src/middleware.ts`: Handles language-based routing and redirection.

## Customization

-   **Resume Content**: Edit the Markdown content in `src/lib/resume-data.ts`.
-   **Translations**: Update UI text translations in `src/dictionaries/en.json` and `src/dictionaries/zh.json`.
-   **Styling**: Modify Tailwind CSS classes in components or update theme variables in `src/app/globals.css`.
