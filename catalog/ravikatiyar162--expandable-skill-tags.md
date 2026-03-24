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
expandable-skill-tags.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Interface for component props for type-safety and clarity
interface ExpandableSkillTagsProps {
  /** The main title for the skills section. */
  title: string;
  /** An array of strings representing the skills to be displayed. */
  skills: string[];
  /** The number of skills to show before expanding. Defaults to 10. */
  initialCount?: number;
  /** Optional additional class names for custom styling. */
  className?: string;
}

/**
 * A component to display a list of skills with an expandable section.
 * Uses shadcn/ui's Badge and Button, with framer-motion for animations.
 */
export const ExpandableSkillTags = ({
  title,
  skills,
  initialCount = 10,
  className,
}: ExpandableSkillTagsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Memoize the visible and hidden skills to prevent recalculation on every render
  const visibleSkills = React.useMemo(() => skills.slice(0, initialCount), [skills, initialCount]);
  const hiddenSkills = React.useMemo(() => skills.slice(initialCount), [skills, initialCount]);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className={cn("w-full", className)}>
      <h3 className="mb-4 text-lg font-semibold text-foreground">{title}</h3>
      <motion.div
        className="flex flex-wrap gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Always visible skills */}
        {visibleSkills.map((skill, index) => (
          <motion.div key={`visible-${index}`} variants={itemVariants}>
            <Badge variant="secondary">{skill}</Badge>
          </motion.div>
        ))}

        {/* Conditionally rendered extra skills with animation */}
        <AnimatePresence>
          {isExpanded &&
            hiddenSkills.map((skill, index) => (
              <motion.div
                key={`hidden-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Badge variant="secondary">{skill}</Badge>
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>

      {/* Toggle Button */}
      {skills.length > initialCount && (
        <Button
          variant="link"
          className="mt-3 px-0 text-sm"
          onClick={toggleExpansion}
          aria-expanded={isExpanded}
        >
          {isExpanded ? "View less skills" : "View all skills"}
        </Button>
      )}
    </section>
  );
};

code.demo.1760509300064.tsx
import { ExpandableSkillTags } from "@/components/ui/expandable-skill-tags";

// Sample data for the demo
const allSkills = [
  "Data Security", "Workforce Development", "Organizational Strategy",
  "Prompt Engineering", "Productivity Software", "Critical Thinking",
  "Generative AI", "LLM Application", "Large Language Modeling",
  "Prompt Patterns", "Process Optimization", "Human Computer Interaction",
  "Innovation", "AI Product Strategy", "Emerging Technologies",
  "Analysis", "Sociology",
];

const coreSkills = [
  "React", "TypeScript", "Next.js", "Tailwind CSS",
  "Node.js", "Prisma", "UI/UX Design",
];

/**
 * A demo page to showcase the ExpandableSkillTags component.
 */
export default function SkillTagsDemo() {
  return (
    <div className="w-full max-w-2xl space-y-8 rounded-lg bg-background p-8">
      {/* First example with a large number of skills */}
      <ExpandableSkillTags
        title="Skills you'll gain"
        skills={allSkills}
        initialCount={10} // It will show 10 skills initially
      />
      
      {/* Second example with fewer skills where the button won't appear */}
      <ExpandableSkillTags
        title="Core Development Skills"
        skills={coreSkills}
        initialCount={10} // More than the total skills, so no toggle is needed
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/expandable-skill-tags.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Interface for component props for type-safety and clarity
interface ExpandableSkillTagsProps {
  /** The main title for the skills section. */
  title: string;
  /** An array of strings representing the skills to be displayed. */
  skills: string[];
  /** The number of skills to show before expanding. Defaults to 10. */
  initialCount?: number;
  /** Optional additional class names for custom styling. */
  className?: string;
}

/**
 * A component to display a list of skills with an expandable section.
 * Uses shadcn/ui's Badge and Button, with framer-motion for animations.
 */
export const ExpandableSkillTags = ({
  title,
  skills,
  initialCount = 10,
  className,
}: ExpandableSkillTagsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Memoize the visible and hidden skills to prevent recalculation on every render
  const visibleSkills = React.useMemo(() => skills.slice(0, initialCount), [skills, initialCount]);
  const hiddenSkills = React.useMemo(() => skills.slice(initialCount), [skills, initialCount]);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className={cn("w-full", className)}>
      <h3 className="mb-4 text-lg font-semibold text-foreground">{title}</h3>
      <motion.div
        className="flex flex-wrap gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Always visible skills */}
        {visibleSkills.map((skill, index) => (
          <motion.div key={`visible-${index}`} variants={itemVariants}>
            <Badge variant="secondary">{skill}</Badge>
          </motion.div>
        ))}

        {/* Conditionally rendered extra skills with animation */}
        <AnimatePresence>
          {isExpanded &&
            hiddenSkills.map((skill, index) => (
              <motion.div
                key={`hidden-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Badge variant="secondary">{skill}</Badge>
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>

      {/* Toggle Button */}
      {skills.length > initialCount && (
        <Button
          variant="link"
          className="mt-3 px-0 text-sm"
          onClick={toggleExpansion}
          aria-expanded={isExpanded}
        >
          {isExpanded ? "View less skills" : "View all skills"}
        </Button>
      )}
    </section>
  );
};
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
