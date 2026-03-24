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
grain-gradient-hero-section.tsx
"use client";

import { GrainGradient, grainGradientPresets } from '@paper-design/shaders-react';
import { Button } from '@/components/ui/button';

interface GrainHeroSectionProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  onCtaClick: () => void;
}

export default function GrainHeroSection({
  title,
  subtitle,
  ctaLabel,
  onCtaClick,
}: GrainHeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GrainGradient
        {...grainGradientPresets[0]}
        style={{ position: "fixed", inset: 0, zIndex: -10 }}
      />
      
      <div className="text-center px-6 sm:px-8 max-w-4xl mx-auto">
        <h1 
          role="heading" 
          className="text-4xl sm:text-6xl font-bold text-white mb-6"
        >
          {title}
        </h1>
        
        <p className="max-w-2xl text-lg sm:text-xl text-gray-200 mx-auto mb-8">
          {subtitle}
        </p>
        
        <Button 
          onClick={onCtaClick}
          size="lg"
          className="text-lg px-8 py-3 bg-white text-black hover:bg-gray-100"
        >
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}

code.demo.1755565281814.tsx
"use client";

import GrainHeroSection from '@/components/ui/grain-gradient-hero-section';

export default function GrainHeroSectionDemo() {
  return (
    <GrainHeroSection
      title="Design Beyond Limits"
      subtitle="Create stunning, high-performance backgrounds effortlessly with Paper Shaders. Experience the power of grain gradients in modern web design."
      ctaLabel="Get Started"
    />
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/grain-gradient-hero-section.tsx
"use client";

import { GrainGradient, grainGradientPresets } from '@paper-design/shaders-react';
import { Button } from '@/components/ui/button';

interface GrainHeroSectionProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  onCtaClick: () => void;
}

export default function GrainHeroSection({
  title,
  subtitle,
  ctaLabel,
  onCtaClick,
}: GrainHeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GrainGradient
        {...grainGradientPresets[0]}
        style={{ position: "fixed", inset: 0, zIndex: -10 }}
      />
      
      <div className="text-center px-6 sm:px-8 max-w-4xl mx-auto">
        <h1 
          role="heading" 
          className="text-4xl sm:text-6xl font-bold text-white mb-6"
        >
          {title}
        </h1>
        
        <p className="max-w-2xl text-lg sm:text-xl text-gray-200 mx-auto mb-8">
          {subtitle}
        </p>
        
        <Button 
          onClick={onCtaClick}
          size="lg"
          className="text-lg px-8 py-3 bg-white text-black hover:bg-gray-100"
        >
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}
```

Install NPM dependencies:
```bash
@paper-design/shaders-react
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
