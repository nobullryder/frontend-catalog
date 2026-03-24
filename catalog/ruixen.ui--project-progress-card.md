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
project-progress-card.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Calendar, User, CheckCircle2, CircleDot } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Milestone = {
  title: string;
  description: string;
  completed?: boolean;
};

export type ProjectProgressCardProps = {
  title: string;
  projectManager: string;
  dueDate: string;
  milestones: Milestone[];
  onNextStep?: () => void;
};

export const ProjectProgressCard: React.FC<ProjectProgressCardProps> = ({
  title,
  projectManager,
  dueDate,
  milestones,
  onNextStep,
}) => {
  const variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  };

  return (
    <Card
      as={motion.div}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, scale: 0.97 },
        visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.05 } },
      }}
      className="w-full max-w-lg rounded-2xl border shadow-lg shadow-primary/10"
    >
      {/* --- Header --- */}
      <CardHeader className="p-6">
        <motion.div
          variants={variants}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        >
          <div>
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground">
              Project overview & milestones
            </p>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground whitespace-nowrap">
            <Calendar className="h-4 w-4" />
            <span>{dueDate}</span>
          </div>
        </motion.div>
      </CardHeader>

      {/* --- Content --- */}
      <CardContent className="px-6 pb-6 space-y-6">
        <motion.div variants={variants} className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Managed by {projectManager}
          </span>
        </motion.div>

        <Separator className="my-4" />

        {/* --- Vertical Milestone Timeline --- */}
        <div className="relative">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              variants={variants}
              className="relative flex items-start gap-3 pb-6 last:pb-0"
            >
              {/* Icon */}
              <div className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-background ring-2 ring-muted">
                {m.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <CircleDot className="h-4 w-4 text-blue-500" />
                )}
              </div>

              {/* Text */}
              <div className="flex flex-col">
                <p className="text-sm font-medium text-foreground">{m.title}</p>
                <p className="text-xs text-muted-foreground">{m.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>

      {/* --- Footer --- */}
      <motion.div variants={variants} className="bg-muted/40 p-6">
        <Button onClick={onNextStep} size="lg" className="w-full">
          Next Step
        </Button>
      </motion.div>
    </Card>
  );
};


code.demo.1760098910791.tsx
"use client";

import React from "react";
import { ProjectProgressCard } from "@/components/ui/project-progress-card";

const ProjectProgressCardDemo = () => {
  const milestones = [
    {
      icon: "",
      title: "Wireframe Design",
      description: "Initial sketches and design structure completed.",
      completed: true,
    },
    {
      icon: "",
      title: "Frontend Development",
      description: "Integrating layouts and responsive components.",
      completed: true,
    },
    {
      icon: "",
      title: "Backend Setup",
      description: "Database and API routes configuration in progress.",
      completed: false,
    },
    {
      icon: "",
      title: "Final QA & Launch",
      description: "Testing, debugging, and deployment preparation.",
      completed: false,
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <ProjectProgressCard
        title="Ruvy Project Development"
        projectManager="Srinath G"
        dueDate="25 Oct 2025"
        milestones={milestones}
        onNextStep={() => alert("Next step clicked!")}
      />
    </div>
  );
};

export default ProjectProgressCardDemo;

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/project-progress-card.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Calendar, User, CheckCircle2, CircleDot } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Milestone = {
  title: string;
  description: string;
  completed?: boolean;
};

export type ProjectProgressCardProps = {
  title: string;
  projectManager: string;
  dueDate: string;
  milestones: Milestone[];
  onNextStep?: () => void;
};

export const ProjectProgressCard: React.FC<ProjectProgressCardProps> = ({
  title,
  projectManager,
  dueDate,
  milestones,
  onNextStep,
}) => {
  const variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  };

  return (
    <Card
      as={motion.div}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, scale: 0.97 },
        visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.05 } },
      }}
      className="w-full max-w-lg rounded-2xl border shadow-lg shadow-primary/10"
    >
      {/* --- Header --- */}
      <CardHeader className="p-6">
        <motion.div
          variants={variants}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        >
          <div>
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground">
              Project overview & milestones
            </p>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground whitespace-nowrap">
            <Calendar className="h-4 w-4" />
            <span>{dueDate}</span>
          </div>
        </motion.div>
      </CardHeader>

      {/* --- Content --- */}
      <CardContent className="px-6 pb-6 space-y-6">
        <motion.div variants={variants} className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Managed by {projectManager}
          </span>
        </motion.div>

        <Separator className="my-4" />

        {/* --- Vertical Milestone Timeline --- */}
        <div className="relative">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              variants={variants}
              className="relative flex items-start gap-3 pb-6 last:pb-0"
            >
              {/* Icon */}
              <div className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-background ring-2 ring-muted">
                {m.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <CircleDot className="h-4 w-4 text-blue-500" />
                )}
              </div>

              {/* Text */}
              <div className="flex flex-col">
                <p className="text-sm font-medium text-foreground">{m.title}</p>
                <p className="text-xs text-muted-foreground">{m.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>

      {/* --- Footer --- */}
      <motion.div variants={variants} className="bg-muted/40 p-6">
        <Button onClick={onNextStep} size="lg" className="w-full">
          Next Step
        </Button>
      </motion.div>
    </Card>
  );
};

```

Install NPM dependencies:
```bash
lucide-react, framer-motion
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
