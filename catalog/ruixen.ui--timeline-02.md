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
timeline-02.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

type Timeline_02 = {
  date: string;
  title: string;
  content: string;
};

const timelineData: Timeline_02[] = [
  {
    date: "2018",
    title: "Ruixen Founded",
    content:
      "Ruixen began as a small innovation lab focused on AI-driven automation solutions, aiming to bridge the gap between research and real-world applications.",
  },
  {
    date: "2020",
    title: "First Major Product Launch",
    content:
      "Ruixen released its flagship AI platform, empowering businesses to automate complex workflows with minimal setup. This launch marked its transition from an R&D hub to a commercial leader.",
  },
  {
    date: "2023",
    title: "Global Expansion",
    content:
      "Ruixen expanded to multiple countries, partnering with leading enterprises and tech firms. Its solutions became known for reliability, scalability, and adaptability.",
  },
  {
    date: "2025",
    title: "Ruixen AI Cloud",
    content:
      "The company launched Ruixen AI Cloud, offering a unified ecosystem for AI training, deployment, and monitoring, setting new industry benchmarks for performance.",
  },
];

export default function Timeline_02() {
  return (
    <section className="bg-background py-24">
      <div className="container">
        <h1 className="text-foreground mb-16 text-center text-4xl font-bold tracking-tight sm:text-5xl">
          The Journey of Ruixen
        </h1>

        <div className="relative mx-auto max-w-3xl">
          {/* Subtle vertical line */}

          {timelineData.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative mb-12 pl-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-2 top-5 h-3 w-3 rounded-full bg-cyan-500 ring-4 ring-background" />

              {/* Content */}
              <h4 className="text-lg font-normal text-foreground">
                {entry.title}
              </h4>
              <p className="mb-2 text-sm text-muted-foreground">{entry.date}</p>
              <Card className="border bg-card shadow-sm hover:shadow-md transition">
                <CardContent className="px-5 py-4">
                  <p className="leading-relaxed text-muted-foreground">
                    {entry.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

code.demo.1755319968753.tsx
import Timeline_02 from "@/components/ui/timeline-02";

export default function DemoOne() {
  return <Timeline_02 />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/timeline-02.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

type Timeline_02 = {
  date: string;
  title: string;
  content: string;
};

const timelineData: Timeline_02[] = [
  {
    date: "2018",
    title: "Ruixen Founded",
    content:
      "Ruixen began as a small innovation lab focused on AI-driven automation solutions, aiming to bridge the gap between research and real-world applications.",
  },
  {
    date: "2020",
    title: "First Major Product Launch",
    content:
      "Ruixen released its flagship AI platform, empowering businesses to automate complex workflows with minimal setup. This launch marked its transition from an R&D hub to a commercial leader.",
  },
  {
    date: "2023",
    title: "Global Expansion",
    content:
      "Ruixen expanded to multiple countries, partnering with leading enterprises and tech firms. Its solutions became known for reliability, scalability, and adaptability.",
  },
  {
    date: "2025",
    title: "Ruixen AI Cloud",
    content:
      "The company launched Ruixen AI Cloud, offering a unified ecosystem for AI training, deployment, and monitoring, setting new industry benchmarks for performance.",
  },
];

export default function Timeline_02() {
  return (
    <section className="bg-background py-24">
      <div className="container">
        <h1 className="text-foreground mb-16 text-center text-4xl font-bold tracking-tight sm:text-5xl">
          The Journey of Ruixen
        </h1>

        <div className="relative mx-auto max-w-3xl">
          {/* Subtle vertical line */}

          {timelineData.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative mb-12 pl-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-2 top-5 h-3 w-3 rounded-full bg-cyan-500 ring-4 ring-background" />

              {/* Content */}
              <h4 className="text-lg font-normal text-foreground">
                {entry.title}
              </h4>
              <p className="mb-2 text-sm text-muted-foreground">{entry.date}</p>
              <Card className="border bg-card shadow-sm hover:shadow-md transition">
                <CardContent className="px-5 py-4">
                  <p className="leading-relaxed text-muted-foreground">
                    {entry.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
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
