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
bento.tsx

"use client";
import { clsx } from "clsx";
import { motion } from "framer-motion";

export default function FUIBentoGridDark() {
     return (
          <div className="pt-32 container mx-auto bg-[#] min-w-screen flex flex-col p-10 bg-gray-950/10">
            <h1 className="font-geistMono tracking-tight text-3xl md:text-5xl">
              Sales
            </h1>
            <p className="max-w-3xl text-2xl/8 font-medium tracking-tight mt-2 bg-gradient-to-br from-black/90 to-black/80 bg-clip-text text-transparent 
            from-black to-gray-400/20
            dark:from-white dark:to-white/40">
              Know more about your customers than they do.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
              <BentoCard
                eyebrow="Insight"
                title="Get perfect clarity"
                description="PerkAI uses social engineering to build a detailed financial picture of your leads. Know their budget, compensation package, social security number, and more."
                graphic={
                  <div className="absolute inset-0 bg-[url(https://framerusercontent.com/images/ghyfFEStl6BNusZl0ZQd5r7JpM.png)] object-fill" />
                }
                className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
              />
              <BentoCard
                eyebrow="Analysis"
                title="Undercut your competitors"
                description="With our advanced data mining, you’ll know which companies your leads are talking to and exactly how much they’re being charged."
                graphic={
                  <div className="absolute inset-0 bg-[url(https://framerusercontent.com/images/7CJtT0Pu3w1vNADktNltoMFC9J4.png)] object-fill" />
                }
                className="lg:col-span-3 lg:rounded-tr-4xl"
              />
              <BentoCard
                eyebrow="Speed"
                title="Built for power users"
                description="It’s never been faster to cold email your entire contact list using our streamlined keyboard shortcuts."
                graphic={
                  <div className="absolute  inset-0 -top-20 -left-60 bg-[url(https://framerusercontent.com/images/gR21e8Wh6l3pU6CciDrqt8wjHM.png)] object-scale-down  bg-black" />
                }
                className="lg:col-span-2 lg:rounded-bl-4xl"
              />
              <BentoCard
                eyebrow="Source"
                title="Get the furthest reach"
                description="Bypass those inconvenient privacy laws to source leads from the most unexpected places."
                graphic={
                  <div className="absolute inset-0 bg-[url(https://framerusercontent.com/images/PTO3RQ3S65zfZRFEGZGpiOom6aQ.png)] object-contain" />
                }
                className="lg:col-span-2"
              />
              <BentoCard
                eyebrow="Limitless"
                title="Sell globally"
                description="PerkAI helps you sell in locations currently under international embargo."
                graphic={
                  <div className="absolute inset-0 -top-44 -left-60 bg-[url(https://framerusercontent.com/images/h496iPSwtSnGZwpJyErl6cLWdtE.png)] object-contain" />
                }
                className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
              />
            </div>
          </div>
        );
      }
  export function BentoCard({
     dark = false,
     className = "",
     eyebrow,
     title,
     description,
     graphic,
     fade = [],
   }: {
      dark?: boolean;
      className?: string;
      eyebrow: React.ReactNode;
      title: React.ReactNode;
      description: React.ReactNode;
      graphic?: React.ReactNode;
      fade?: ("top" | "bottom")[];
    }) {
        return (
          <motion.div
            initial="idle"
            whileHover="active"
            variants={{ idle: {}, active: {} }}
            data-dark={dark ? "true" : undefined}
            className={clsx(
              className,
              "group relative flex flex-col overflow-hidden rounded-lg ",
              "bg-black dark:bg-transparent transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] bg-black   shadow-sm ring-1 ring-white/10",
              "data-[dark]:bg-gray-800 data-[dark]:ring-white/15"
            )}
          >
            <div className="relative h-[29rem] shrink-0 ">
              {graphic}
              {fade.includes("top") && (
                <div className="absolute inset-0 bg-gradient-to-b from-white to-50% group-data-[dark]:from-gray-800 group-data-[dark]:from-[-25%] opacity-25" />
              )}
              {fade.includes("bottom") && (
                <div className="absolute inset-0 bg-gradient-to-t from-white to-50% group-data-[dark]:from-gray-800 group-data-[dark]:from-[-25%] opacity-25 " />
              )}
            </div>
            <div className="relative p-10  z-20 isolate mt-[-110px] h-[14rem] backdrop-blur-xl text-white ">
              <h1>{eyebrow}</h1>
              <p className="mt-1 text-2xl/8 font-medium tracking-tight dark:text-gray-100 text-gray-150 group-data-[dark]:text-white">
                {title}
              </p>
              <p className="mt-2 max-w-[600px] text-sm/6 text-gray-100 dark:text-gray-300 group-data-[dark]:text-gray-400">
                {description}
              </p>
            </div>
          </motion.div>
        );
      }
      

code.demo.1756550917692.tsx
import FUIBentoGridDark from "@/components/ui/bento";

export default function DemoOne() {
  return <FUIBentoGridDark />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/bento.tsx

"use client";
import { clsx } from "clsx";
import { motion } from "framer-motion";

export default function FUIBentoGridDark() {
     return (
          <div className="pt-32 container mx-auto bg-[#] min-w-screen flex flex-col p-10 bg-gray-950/10">
            <h1 className="font-geistMono tracking-tight text-3xl md:text-5xl">
              Sales
            </h1>
            <p className="max-w-3xl text-2xl/8 font-medium tracking-tight mt-2 bg-gradient-to-br from-black/90 to-black/80 bg-clip-text text-transparent 
            from-black to-gray-400/20
            dark:from-white dark:to-white/40">
              Know more about your customers than they do.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
              <BentoCard
                eyebrow="Insight"
                title="Get perfect clarity"
                description="PerkAI uses social engineering to build a detailed financial picture of your leads. Know their budget, compensation package, social security number, and more."
                graphic={
                  <div className="absolute inset-0 bg-[url(https://framerusercontent.com/images/ghyfFEStl6BNusZl0ZQd5r7JpM.png)] object-fill" />
                }
                className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
              />
              <BentoCard
                eyebrow="Analysis"
                title="Undercut your competitors"
                description="With our advanced data mining, you’ll know which companies your leads are talking to and exactly how much they’re being charged."
                graphic={
                  <div className="absolute inset-0 bg-[url(https://framerusercontent.com/images/7CJtT0Pu3w1vNADktNltoMFC9J4.png)] object-fill" />
                }
                className="lg:col-span-3 lg:rounded-tr-4xl"
              />
              <BentoCard
                eyebrow="Speed"
                title="Built for power users"
                description="It’s never been faster to cold email your entire contact list using our streamlined keyboard shortcuts."
                graphic={
                  <div className="absolute  inset-0 -top-20 -left-60 bg-[url(https://framerusercontent.com/images/gR21e8Wh6l3pU6CciDrqt8wjHM.png)] object-scale-down  bg-black" />
                }
                className="lg:col-span-2 lg:rounded-bl-4xl"
              />
              <BentoCard
                eyebrow="Source"
                title="Get the furthest reach"
                description="Bypass those inconvenient privacy laws to source leads from the most unexpected places."
                graphic={
                  <div className="absolute inset-0 bg-[url(https://framerusercontent.com/images/PTO3RQ3S65zfZRFEGZGpiOom6aQ.png)] object-contain" />
                }
                className="lg:col-span-2"
              />
              <BentoCard
                eyebrow="Limitless"
                title="Sell globally"
                description="PerkAI helps you sell in locations currently under international embargo."
                graphic={
                  <div className="absolute inset-0 -top-44 -left-60 bg-[url(https://framerusercontent.com/images/h496iPSwtSnGZwpJyErl6cLWdtE.png)] object-contain" />
                }
                className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
              />
            </div>
          </div>
        );
      }
  export function BentoCard({
     dark = false,
     className = "",
     eyebrow,
     title,
     description,
     graphic,
     fade = [],
   }: {
      dark?: boolean;
      className?: string;
      eyebrow: React.ReactNode;
      title: React.ReactNode;
      description: React.ReactNode;
      graphic?: React.ReactNode;
      fade?: ("top" | "bottom")[];
    }) {
        return (
          <motion.div
            initial="idle"
            whileHover="active"
            variants={{ idle: {}, active: {} }}
            data-dark={dark ? "true" : undefined}
            className={clsx(
              className,
              "group relative flex flex-col overflow-hidden rounded-lg ",
              "bg-black dark:bg-transparent transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] bg-black   shadow-sm ring-1 ring-white/10",
              "data-[dark]:bg-gray-800 data-[dark]:ring-white/15"
            )}
          >
            <div className="relative h-[29rem] shrink-0 ">
              {graphic}
              {fade.includes("top") && (
                <div className="absolute inset-0 bg-gradient-to-b from-white to-50% group-data-[dark]:from-gray-800 group-data-[dark]:from-[-25%] opacity-25" />
              )}
              {fade.includes("bottom") && (
                <div className="absolute inset-0 bg-gradient-to-t from-white to-50% group-data-[dark]:from-gray-800 group-data-[dark]:from-[-25%] opacity-25 " />
              )}
            </div>
            <div className="relative p-10  z-20 isolate mt-[-110px] h-[14rem] backdrop-blur-xl text-white ">
              <h1>{eyebrow}</h1>
              <p className="mt-1 text-2xl/8 font-medium tracking-tight dark:text-gray-100 text-gray-150 group-data-[dark]:text-white">
                {title}
              </p>
              <p className="mt-2 max-w-[600px] text-sm/6 text-gray-100 dark:text-gray-300 group-data-[dark]:text-gray-400">
                {description}
              </p>
            </div>
          </motion.div>
        );
      }
      
```

Install NPM dependencies:
```bash
clsx, framer-motion
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
