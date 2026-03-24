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
dark-grid.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Camera, Plug, Braces, Image as ImageIcon, Search as SearchIcon } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  {
    title: "Reasoning",
    icon: Brain,
    desc:
      "Understand the universe: solve humanity's most difficult scientific problems with deep thought.",
  },
  {
    title: "Vision",
    icon: Camera,
    desc:
      "See the world through vision, interpreting images and visuals with sharp, insightful understanding.",
  },
  {
    title: "Tool calling",
    icon: Plug,
    desc:
      "Harness external power with tool calling, seamlessly integrating third‑party functions.",
  },
  {
    title: "Structured outputs",
    icon: Braces,
    desc:
      "Organize chaos with structured outputs, delivering clean, predictable responses.",
  },
  {
    title: "Image generation",
    icon: ImageIcon,
    desc:
      "Bring your ideas to life with image generation, creating visuals that are as unique as you are.",
  },
  {
    title: "Search",
    icon: SearchIcon,
    badge: "New",
    desc:
      "Tap into the now with real‑time search, pulling fresh, relevant data from the web and X instantly.",
  },
];

export default function Demo() {
  return (
    <div className="min-h-[60vh] w-full bg-black text-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-xs tracking-widest text-zinc-500">[ CAPABILITIES ]</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Models that fit your needs
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ title, icon: Icon, desc, badge }, i) => (
            <Card
              key={title}
              className="group relative overflow-visible border-zinc-800 bg-gradient-to-b from-zinc-950/60 to-zinc-950/30 p-0 transition-colors duration-300 hover:border-zinc-700"
            >
              {/* subtle gradient on hover */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
              </div>

              {/* faint inner glow that appears on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 to-white/0 group-hover:from-white/[0.03] group-hover:to-white/[0.06] transition-colors" />

              {/* white corner squares on hover - now outside the card and square shaped */}
              <div className="pointer-events-none absolute inset-0 hidden group-hover:block">
                <div className="absolute -left-2 -top-2 h-3 w-3 bg-white" />
                <div className="absolute -right-2 -top-2 h-3 w-3 bg-white" />
                <div className="absolute -left-2 -bottom-2 h-3 w-3 bg-white" />
                <div className="absolute -right-2 -bottom-2 h-3 w-3 bg-white" />
              </div>

              <CardHeader className="relative z-10 flex flex-row items-start gap-3 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900/70 text-zinc-200">
                  <Icon className="h-5 w-5 text-zinc-200" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg font-medium text-zinc-100">{title}</CardTitle>
                    {badge && (
                      <span className="rounded-full border border-zinc-600 px-2 py-0.5 text-[10px] leading-none text-zinc-300">
                        {badge}
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative z-10 px-6 pb-6 text-sm text-zinc-400">
                {desc}
              </CardContent>

              {/* focus ring accent on hover */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-white/0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}


code.demo.1760138599724.tsx
import Demo from "@/components/ui/dark-grid";

export default function DemoOne() {
  return <Demo />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/dark-grid.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Camera, Plug, Braces, Image as ImageIcon, Search as SearchIcon } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  {
    title: "Reasoning",
    icon: Brain,
    desc:
      "Understand the universe: solve humanity's most difficult scientific problems with deep thought.",
  },
  {
    title: "Vision",
    icon: Camera,
    desc:
      "See the world through vision, interpreting images and visuals with sharp, insightful understanding.",
  },
  {
    title: "Tool calling",
    icon: Plug,
    desc:
      "Harness external power with tool calling, seamlessly integrating third‑party functions.",
  },
  {
    title: "Structured outputs",
    icon: Braces,
    desc:
      "Organize chaos with structured outputs, delivering clean, predictable responses.",
  },
  {
    title: "Image generation",
    icon: ImageIcon,
    desc:
      "Bring your ideas to life with image generation, creating visuals that are as unique as you are.",
  },
  {
    title: "Search",
    icon: SearchIcon,
    badge: "New",
    desc:
      "Tap into the now with real‑time search, pulling fresh, relevant data from the web and X instantly.",
  },
];

export default function Demo() {
  return (
    <div className="min-h-[60vh] w-full bg-black text-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-xs tracking-widest text-zinc-500">[ CAPABILITIES ]</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Models that fit your needs
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ title, icon: Icon, desc, badge }, i) => (
            <Card
              key={title}
              className="group relative overflow-visible border-zinc-800 bg-gradient-to-b from-zinc-950/60 to-zinc-950/30 p-0 transition-colors duration-300 hover:border-zinc-700"
            >
              {/* subtle gradient on hover */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
              </div>

              {/* faint inner glow that appears on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 to-white/0 group-hover:from-white/[0.03] group-hover:to-white/[0.06] transition-colors" />

              {/* white corner squares on hover - now outside the card and square shaped */}
              <div className="pointer-events-none absolute inset-0 hidden group-hover:block">
                <div className="absolute -left-2 -top-2 h-3 w-3 bg-white" />
                <div className="absolute -right-2 -top-2 h-3 w-3 bg-white" />
                <div className="absolute -left-2 -bottom-2 h-3 w-3 bg-white" />
                <div className="absolute -right-2 -bottom-2 h-3 w-3 bg-white" />
              </div>

              <CardHeader className="relative z-10 flex flex-row items-start gap-3 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900/70 text-zinc-200">
                  <Icon className="h-5 w-5 text-zinc-200" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg font-medium text-zinc-100">{title}</CardTitle>
                    {badge && (
                      <span className="rounded-full border border-zinc-600 px-2 py-0.5 text-[10px] leading-none text-zinc-300">
                        {badge}
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative z-10 px-6 pb-6 text-sm text-zinc-400">
                {desc}
              </CardContent>

              {/* focus ring accent on hover */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-white/0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

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
