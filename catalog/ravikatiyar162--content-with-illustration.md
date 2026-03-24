You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
content-with-illustration.tsx
import React from 'react';
import { cn } from '@/lib/utils'; // Assuming shadcn's utility function

/**
 * Props for the ContentWithIllustration component.
 * @param title - The main heading text.
 * @param highlightedText - The portion of the title to be visually highlighted.
 * @param paragraphs - An array of strings, each representing a paragraph of content.
 * @param imageSrc - URL for the main illustration.
 * @param imageAlt - Alt text for the main illustration.
 * @param iconSrc - URL for the small, animated icon.
 * @param iconAlt - Alt text for the animated icon.
 * @param className - Optional additional CSS classes.
 */
interface ContentWithIllustrationProps {
  title: string;
  highlightedText: string;
  paragraphs: string[];
  imageSrc: string;
  imageAlt?: string;
  iconSrc: string;
  iconAlt?: string;
  className?: string;
}

/**
 * A responsive component that displays text content alongside an illustration,
 * featuring a hand-drawn highlight effect on the title and an animated icon.
 */
export const ContentWithIllustration: React.FC<ContentWithIllustrationProps> = ({
  title,
  highlightedText,
  paragraphs,
  imageSrc,
  imageAlt = 'Illustration',
  iconSrc,
  iconAlt = 'Decorative Icon',
  className,
}) => {
  // Split the title to isolate the part to be highlighted
  const titleParts = title.split(new RegExp(`(${highlightedText})`, 'gi'));

  return (
    <section
      className={cn(
        'w-full max-w-6xl mx-auto px-4 py-12 md:py-20 font-sans',
        className
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left Column: Text Content */}
        <div className="flex flex-col gap-6 text-left">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {titleParts.map((part, index) =>
              part.toLowerCase() === highlightedText.toLowerCase() ? (
                <span key={index} className="relative inline-block whitespace-nowrap">
                  {/* The hand-drawn circle SVG */}
                  <svg
                    aria-hidden="true"
                    className="absolute top-1/2 left-1/2 w-[115%] h-[160%] -translate-x-1/2 -translate-y-1/2 text-primary/80 dark:text-primary/60 pointer-events-none"
                    viewBox="0 0 200 60"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10,30 C20,5, 180,5, 190,30 C180,55, 20,55, 10,30 Z"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {part}
                </span>
              ) : (
                part
              )
            )}
          </h2>
          <div className="flex flex-col gap-4 text-base md:text-lg text-muted-foreground">
            {paragraphs.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        </div>

        {/* Right Column: Illustration */}
        <div className="relative flex justify-center items-center h-full">
          <img
            src={iconSrc}
            alt={iconAlt}
            className="absolute top-0 right-0 md:right-10 w-16 h-16 animate-subtle-spin"
            aria-hidden="true"
          />
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full max-w-sm h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

code.demo.1759559526916.tsx
import { ContentWithIllustration } from '@/components/ui/content-with-illustration'; // Adjust path as needed

export default function ContentWithIllustrationDemo() {
  const content = {
    title: 'At Eternal, it is always Day 1',
    highlightedText: 'always Day 1',
    paragraphs: [
      'Every day, just like today, has the potential to redefine the rest of our lives as an organization.',
      "Eternal started as Zomato, on 26th January 2008 (Deepinder's 25th birthday), when one weekend, he went around town, collected all takeaway menus he could find, and put them up on a website, mostly in the spirit of service to his friends, and other people around him.",
      'At the time, he had no intention of it turning into a business. He did not think there was any money to be made out of this.',
      'Eternal is a result of tackling challenges day by day. Progress happened incrementally, and sometimes in leaps. That\'s how we got here. And that\'s how we move forward - one day at a time. One step after another.',
    ],
    // Using public domain SVGs for demonstration
    imageSrc: 'https://b.zmtcdn.com/data/o2_assets/014994354a98f17fdaad8f12c791653d1743675055.png',
    iconSrc: 'https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-o53JuZpiN3JOy3N3lXQMLmskV0OslK.png&w=320&q=75',
  };

  return (
    <div className="w-full bg-background">
      <ContentWithIllustration
        title={content.title}
        highlightedText={content.highlightedText}
        paragraphs={content.paragraphs}
        imageSrc={content.imageSrc}
        imageAlt="Illustration of a person with a backpack looking towards the sun"
        iconSrc={content.iconSrc}
        iconAlt="Animated sun doodle"
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/content-with-illustration.tsx
import React from 'react';
import { cn } from '@/lib/utils'; // Assuming shadcn's utility function

/**
 * Props for the ContentWithIllustration component.
 * @param title - The main heading text.
 * @param highlightedText - The portion of the title to be visually highlighted.
 * @param paragraphs - An array of strings, each representing a paragraph of content.
 * @param imageSrc - URL for the main illustration.
 * @param imageAlt - Alt text for the main illustration.
 * @param iconSrc - URL for the small, animated icon.
 * @param iconAlt - Alt text for the animated icon.
 * @param className - Optional additional CSS classes.
 */
interface ContentWithIllustrationProps {
  title: string;
  highlightedText: string;
  paragraphs: string[];
  imageSrc: string;
  imageAlt?: string;
  iconSrc: string;
  iconAlt?: string;
  className?: string;
}

/**
 * A responsive component that displays text content alongside an illustration,
 * featuring a hand-drawn highlight effect on the title and an animated icon.
 */
export const ContentWithIllustration: React.FC<ContentWithIllustrationProps> = ({
  title,
  highlightedText,
  paragraphs,
  imageSrc,
  imageAlt = 'Illustration',
  iconSrc,
  iconAlt = 'Decorative Icon',
  className,
}) => {
  // Split the title to isolate the part to be highlighted
  const titleParts = title.split(new RegExp(`(${highlightedText})`, 'gi'));

  return (
    <section
      className={cn(
        'w-full max-w-6xl mx-auto px-4 py-12 md:py-20 font-sans',
        className
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left Column: Text Content */}
        <div className="flex flex-col gap-6 text-left">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {titleParts.map((part, index) =>
              part.toLowerCase() === highlightedText.toLowerCase() ? (
                <span key={index} className="relative inline-block whitespace-nowrap">
                  {/* The hand-drawn circle SVG */}
                  <svg
                    aria-hidden="true"
                    className="absolute top-1/2 left-1/2 w-[115%] h-[160%] -translate-x-1/2 -translate-y-1/2 text-primary/80 dark:text-primary/60 pointer-events-none"
                    viewBox="0 0 200 60"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10,30 C20,5, 180,5, 190,30 C180,55, 20,55, 10,30 Z"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {part}
                </span>
              ) : (
                part
              )
            )}
          </h2>
          <div className="flex flex-col gap-4 text-base md:text-lg text-muted-foreground">
            {paragraphs.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        </div>

        {/* Right Column: Illustration */}
        <div className="relative flex justify-center items-center h-full">
          <img
            src={iconSrc}
            alt={iconAlt}
            className="absolute top-0 right-0 md:right-10 w-16 h-16 animate-subtle-spin"
            aria-hidden="true"
          />
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full max-w-sm h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};
```

Implementation Guidelines
1. Analyze the component structure and identify all required dependencies
2. Review the component's argumens and state
3. Identify any required context providers or hooks and install them
4. Questions to Ask
- What data/props will be passed to this component?
- Are there any specific state management requirements?
- Are there any required assets (images, icons, etc.)?
- What is the expected responsive behavior?
- What is the best place to use this component in the app?

Steps to integrate
0. Copy paste all the code above in the correct directories
1. Install external dependencies
2. Fill image assets with Unsplash stock images you know exist
3. Use lucide-react icons for svgs or logos if component requires them

Remember: Do not change the component's code unless it's required to integrate or the user asks you to.
IMPORTANT: Create all mentioned files in full, without abbreviations. Do not use placeholders like "insert the rest of the code here" – output every line of code exactly as it is, so it can be copied and pasted directly into the project.
