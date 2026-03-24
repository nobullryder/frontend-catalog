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
roadmap-card.tsx
"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface RoadmapItem {
  quarter: string;
  title: string;
  description: string;
  status?: "done" | "in-progress" | "upcoming";
}

export interface RoadmapCardProps {
  title?: string;
  description?: string;
  items: RoadmapItem[];
}

export function RoadmapCard({
  title = "Product Roadmap",
  description = "Upcoming features and releases",
  items,
}: RoadmapCardProps) {
  return (
    <Card className="w-full max-w-4xl shadow-xl hover:shadow-lg transiton-all duration-300">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription >{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 right-0 top-4 h-px bg-border" />

          <div className="flex justify-between">
          {items.map((item, index) => (
              <motion.div
                key={index}
                className="relative pt-8 text-center w-1/4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
              >
                {/* Timeline Dot */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`absolute left-1/2 top-2 -translate-x-1/2 h-4 w-4 rounded-full flex items-center justify-center ${
                    item.status === "done" || item.status === "in-progress"
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-background" />
                </motion.div>

                {/* Quarter */}
                <Badge
                  variant={
                    item.status === "done" || item.status === "in-progress"
                      ? "default"
                      : "outline"
                  }
                  className="mb-1 text-[11px]"
                >
                  {item.quarter}
                </Badge>

                {/* Title + Description */}
                <h4 className="text-sm font-medium">{item.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


code.demo.1755529414756.tsx
import { RoadmapCard } from "@/components/ui/roadmap-card";

export default function DemoOne() {
  return <div>  <RoadmapCard
        items={[
          {
            quarter: "Q1 2023",
            title: "Core Platform",
            description: "Basic functionality and user management",
            status: "done",
          },
          {
            quarter: "Q2 2023",
            title: "Analytics",
            description: "Reporting and data visualization",
            status: "in-progress",
          },
          {
            quarter: "Q3 2023",
            title: "Integrations",
            description: "Third-party app connections",
            status: "upcoming",
          },
          {
            quarter: "Q4 2023",
            title: "AI Features",
            description: "Smart automation and predictions",
            status: "upcoming",
          },
        ]}
      />
    </div>;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/roadmap-card.tsx
"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface RoadmapItem {
  quarter: string;
  title: string;
  description: string;
  status?: "done" | "in-progress" | "upcoming";
}

export interface RoadmapCardProps {
  title?: string;
  description?: string;
  items: RoadmapItem[];
}

export function RoadmapCard({
  title = "Product Roadmap",
  description = "Upcoming features and releases",
  items,
}: RoadmapCardProps) {
  return (
    <Card className="w-full max-w-4xl shadow-xl hover:shadow-lg transiton-all duration-300">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription >{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 right-0 top-4 h-px bg-border" />

          <div className="flex justify-between">
          {items.map((item, index) => (
              <motion.div
                key={index}
                className="relative pt-8 text-center w-1/4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
              >
                {/* Timeline Dot */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`absolute left-1/2 top-2 -translate-x-1/2 h-4 w-4 rounded-full flex items-center justify-center ${
                    item.status === "done" || item.status === "in-progress"
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-background" />
                </motion.div>

                {/* Quarter */}
                <Badge
                  variant={
                    item.status === "done" || item.status === "in-progress"
                      ? "default"
                      : "outline"
                  }
                  className="mb-1 text-[11px]"
                >
                  {item.quarter}
                </Badge>

                {/* Title + Description */}
                <h4 className="text-sm font-medium">{item.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
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
