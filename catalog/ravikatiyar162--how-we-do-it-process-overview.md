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
how-we-do-it-process-overview.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

// Interface for individual process card props
interface ProcessCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
}

// Reusable Process Card Component
const ProcessCard: React.FC<ProcessCardProps> = ({ icon: Icon, title, description, className }) => (
  <div className={cn("group relative w-full rounded-lg border bg-card p-6 transition-all cursor-pointer duration-300 hover:border-primary/60 hover:shadow-lg ", className)}>
    {/* Decorative Line - Visible on larger screens */}
    <div className="absolute -left-[1px] top-1/2 hidden h-1/2 w-px -translate-y-1/2 bg-border transition-colors group-hover:bg-primary/60 md:block" />
    <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-border transition-colors group-hover:bg-primary/60 md:hidden" />


    {/* Icon Container */}
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg duration-300 border bg-background text-primary shadow-sm transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
      <Icon className="h-6 w-6" />
    </div>

    {/* Content */}
    <div className="flex flex-col">
      <h3 className="mb-1 text-lg font-semibold text-card-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

// Interface for the main section props
interface ProcessSectionProps {
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  items: ProcessCardProps[];
}

// Main Process Section Component
export const ProcessSection: React.FC<ProcessSectionProps> = ({
  subtitle,
  title,
  description,
  buttonText,
  items,
}) => {
  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="container mx-auto grid grid-cols-1 gap-12 px-4 md:grid-cols-3 md:gap-8 lg:gap-16">
        {/* Left Content */}
        <div className="flex flex-col items-start justify-center text-center md:col-span-1 md:text-left">
          <span className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            {subtitle}
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>
          <p className="mb-6 text-base text-muted-foreground">
            {description}
          </p>
          <Button size="lg" className="hover:scale-110 duration-300 transition-all cursor-pointer">
            {buttonText}
            <ArrowUpRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Right Content - Grid of Process Cards */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:col-span-2">
          {items.map((item, index) => (
            <ProcessCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

code.demo.1753531055786.tsx
import React from 'react';
import { ProcessSection } from '@/components/ui/how-we-do-it-process-overview';
import { BrainCircuit, Target, PenTool, Code, ShieldCheck, Megaphone } from 'lucide-react';

// Demo component to showcase the ProcessSection
const ProcessSectionDemo = () => {
  const processItems = [
    {
      icon: BrainCircuit,
      title: 'Brainstorming',
      description: 'Ideas & Concepts',
    },
    {
      icon: Target,
      title: 'Market Strategy',
      description: 'Overall Planning',
    },
    {
      icon: PenTool,
      title: 'Product Design',
      description: 'UI/UX & Prototyping',
    },
    {
      icon: Code,
      title: 'Development',
      description: 'Full-Stack Engineering',
    },
    {
      icon: ShieldCheck,
      title: 'Testing & QA',
      description: 'Quality Assurance',
    },
    {
      icon: Megaphone,
      title: 'Release & Marketing',
      description: 'Launch Campaign',
    },
  ];

  return (
    <div className="w-full">
      <ProcessSection
        subtitle="Our Model"
        title="How We Do It"
        description="We work on a typical matrix of time, effort, and money, following Agile methodologies to deliver exceptional results."
        buttonText="Learn More"
        items={processItems}
      />
    </div>
  );
};

export default ProcessSectionDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/how-we-do-it-process-overview.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

// Interface for individual process card props
interface ProcessCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
}

// Reusable Process Card Component
const ProcessCard: React.FC<ProcessCardProps> = ({ icon: Icon, title, description, className }) => (
  <div className={cn("group relative w-full rounded-lg border bg-card p-6 transition-all cursor-pointer duration-300 hover:border-primary/60 hover:shadow-lg ", className)}>
    {/* Decorative Line - Visible on larger screens */}
    <div className="absolute -left-[1px] top-1/2 hidden h-1/2 w-px -translate-y-1/2 bg-border transition-colors group-hover:bg-primary/60 md:block" />
    <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-border transition-colors group-hover:bg-primary/60 md:hidden" />


    {/* Icon Container */}
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg duration-300 border bg-background text-primary shadow-sm transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
      <Icon className="h-6 w-6" />
    </div>

    {/* Content */}
    <div className="flex flex-col">
      <h3 className="mb-1 text-lg font-semibold text-card-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

// Interface for the main section props
interface ProcessSectionProps {
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  items: ProcessCardProps[];
}

// Main Process Section Component
export const ProcessSection: React.FC<ProcessSectionProps> = ({
  subtitle,
  title,
  description,
  buttonText,
  items,
}) => {
  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="container mx-auto grid grid-cols-1 gap-12 px-4 md:grid-cols-3 md:gap-8 lg:gap-16">
        {/* Left Content */}
        <div className="flex flex-col items-start justify-center text-center md:col-span-1 md:text-left">
          <span className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            {subtitle}
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>
          <p className="mb-6 text-base text-muted-foreground">
            {description}
          </p>
          <Button size="lg" className="hover:scale-110 duration-300 transition-all cursor-pointer">
            {buttonText}
            <ArrowUpRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Right Content - Grid of Process Cards */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:col-span-2">
          {items.map((item, index) => (
            <ProcessCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};
```

Install NPM dependencies:
```bash
lucide-react
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
