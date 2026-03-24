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
audiobook-card.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a 'cn' utility from shadcn

// TSDoc for props documentation
export interface AudiobookCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The URL for the book cover image. */
  imageUrl: string;
  /** The main title of the audiobook. */
  title: string;
  /** The author's name. */
  author: string;
  /** The category or genre of the book. */
  category: string;
  /** The publication year. */
  year: number;
  /** The total number of pages or chapters. */
  totalPages: number;
  /** The number of pages or chapters already read. */
  pagesRead: number;
  /** A React node for the icon, e.g., from lucide-react. */
  icon: React.ReactNode;
}

const AudiobookCard = React.forwardRef<HTMLDivElement, AudiobookCardProps>(
  (
    {
      className,
      imageUrl,
      title,
      author,
      category,
      year,
      totalPages,
      pagesRead,
      icon,
      ...props
    },
    ref
  ) => {
    // Calculate progress percentage, ensuring no division by zero
    const progressPercentage = totalPages > 0 ? (pagesRead / totalPages) * 100 : 0;
    const pagesLeft = totalPages - pagesRead;

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full max-w-sm overflow-hidden rounded-2xl p-5 text-card-foreground shadow-lg",
          "bg-gradient-to-br from-[hsl(var(--muted)/0.4)] to-[hsl(var(--card)/0.8)] backdrop-blur-sm",
          "border border-white/10",
          className
        )}
        {...props}
      >
        {/* Main content layout */}
        <div className="flex flex-col gap-4">
          {/* Header with Icon and Image */}
          <div className="flex items-start justify-between">
            <div className="rounded-lg bg-black/20 p-2 text-white/80">
              {icon}
            </div>
            <img
              src={imageUrl}
              alt={title}
              width={96}
              height={96}
              className="h-24 w-24 rounded-lg object-cover shadow-2xl"
            />
          </div>

          {/* Book Details */}
          <div className="flex flex-col items-start">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-sm text-muted-foreground">
              {author} &bull; {category} &bull; {year}
            </p>
          </div>

          {/* Progress Bar Section */}
          <div className="flex flex-col gap-2">
            <div
              className="h-4 w-full rounded-full"
              // The segmented effect is created using a repeating gradient as a background
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, hsl(var(--muted-foreground)/0.3), hsl(var(--muted-foreground)/0.3) 1px, transparent 1px, transparent 11.5%)",
                backgroundSize: "100% 100%",
              }}
            >
              <motion.div
                className="h-full rounded-full bg-primary"
                // Animate the width based on progress
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} // Smooth ease-out cubic bezier
                role="progressbar"
                aria-valuenow={progressPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${title} reading progress`}
              />
            </div>
            <p className="self-end text-xs font-medium text-muted-foreground">
              {pagesLeft} left
            </p>
          </div>
        </div>
      </div>
    );
  }
);

AudiobookCard.displayName = "AudiobookCard";

export { AudiobookCard };

code.demo.1758519497227.tsx
import * as React from "react";
import { BookOpen } from "lucide-react";
import { AudiobookCard } from "@/components/ui/audiobook-card"; // Adjust path as needed
import { Slider } from "@/components/ui/slider"; // Assuming you have a shadcn Slider component
import { Label } from "@/components/ui/label"; // Assuming you have a shadcn Label component

export default function AudiobookCardDemo() {
  const totalPages = 840;
  const [pagesRead, setPagesRead] = React.useState(220);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-background p-4">
      {/* The component itself */}
      <AudiobookCard
        imageUrl="https://cdn.dribbble.com/userupload/35223132/file/original-ef853765fc767c6f1d0648662220c2a3.jpg?resize=1024x1280&vertical=center" // Using the actual Dune Messiah cover
        title="Dune Messiah"
        author="Frank Herbert"
        category="Science Fiction"
        year={1969}
        totalPages={totalPages}
        pagesRead={pagesRead}
        icon={<BookOpen className="h-5 w-5" />}
      />
      
      {/* Controls to demonstrate interactivity */}
      <div className="w-full max-w-sm rounded-lg border bg-card p-4">
        <Label htmlFor="progress-slider" className="mb-2 block text-center text-sm font-medium">
          Control Reading Progress
        </Label>
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono">{pagesRead}</span>
          <Slider
            id="progress-slider"
            min={0}
            max={totalPages}
            step={10}
            value={[pagesRead]}
            onValueChange={(value) => setPagesRead(value[0])}
            aria-label="Adjust pages read"
          />
           <span className="text-xs font-mono">{totalPages}</span>
        </div>
      </div>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/audiobook-card.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a 'cn' utility from shadcn

// TSDoc for props documentation
export interface AudiobookCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The URL for the book cover image. */
  imageUrl: string;
  /** The main title of the audiobook. */
  title: string;
  /** The author's name. */
  author: string;
  /** The category or genre of the book. */
  category: string;
  /** The publication year. */
  year: number;
  /** The total number of pages or chapters. */
  totalPages: number;
  /** The number of pages or chapters already read. */
  pagesRead: number;
  /** A React node for the icon, e.g., from lucide-react. */
  icon: React.ReactNode;
}

const AudiobookCard = React.forwardRef<HTMLDivElement, AudiobookCardProps>(
  (
    {
      className,
      imageUrl,
      title,
      author,
      category,
      year,
      totalPages,
      pagesRead,
      icon,
      ...props
    },
    ref
  ) => {
    // Calculate progress percentage, ensuring no division by zero
    const progressPercentage = totalPages > 0 ? (pagesRead / totalPages) * 100 : 0;
    const pagesLeft = totalPages - pagesRead;

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full max-w-sm overflow-hidden rounded-2xl p-5 text-card-foreground shadow-lg",
          "bg-gradient-to-br from-[hsl(var(--muted)/0.4)] to-[hsl(var(--card)/0.8)] backdrop-blur-sm",
          "border border-white/10",
          className
        )}
        {...props}
      >
        {/* Main content layout */}
        <div className="flex flex-col gap-4">
          {/* Header with Icon and Image */}
          <div className="flex items-start justify-between">
            <div className="rounded-lg bg-black/20 p-2 text-white/80">
              {icon}
            </div>
            <img
              src={imageUrl}
              alt={title}
              width={96}
              height={96}
              className="h-24 w-24 rounded-lg object-cover shadow-2xl"
            />
          </div>

          {/* Book Details */}
          <div className="flex flex-col items-start">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-sm text-muted-foreground">
              {author} &bull; {category} &bull; {year}
            </p>
          </div>

          {/* Progress Bar Section */}
          <div className="flex flex-col gap-2">
            <div
              className="h-4 w-full rounded-full"
              // The segmented effect is created using a repeating gradient as a background
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, hsl(var(--muted-foreground)/0.3), hsl(var(--muted-foreground)/0.3) 1px, transparent 1px, transparent 11.5%)",
                backgroundSize: "100% 100%",
              }}
            >
              <motion.div
                className="h-full rounded-full bg-primary"
                // Animate the width based on progress
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} // Smooth ease-out cubic bezier
                role="progressbar"
                aria-valuenow={progressPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${title} reading progress`}
              />
            </div>
            <p className="self-end text-xs font-medium text-muted-foreground">
              {pagesLeft} left
            </p>
          </div>
        </div>
      </div>
    );
  }
);

AudiobookCard.displayName = "AudiobookCard";

export { AudiobookCard };
```

Install NPM dependencies:
```bash
framer-motion
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
