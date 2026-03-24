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
dynamic-square.tsx
import Link from "next/link";

export const Component = ({
  title,
  tag,
  description,
  buttonText,
  buttonHref,
}: Readonly<{
  title: string;
  tag: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}>) => {
  return (
    <>
      <style>
        {`
        @keyframes tiles {
          0%, 40%, 80% {
            opacity: 0;
          }
          20%, 60% {
            opacity: 1;
          }
        }
      `}
      </style>
      <div className="relative flex w-80 flex-col gap-8 overflow-hidden rounded-xl border border-neutral-400/20 px-8 py-4 shadow-sm dark:shadow-black">
        <DecorativeTilesBackground />
        <div className="z-20">
          <div className="">
            <h3 className="inline text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              {title}
            </h3>
            <p className="ml-2 inline rounded-sm border border-neutral-900 px-0.5 align-top text-xs font-medium uppercase tracking-tight dark:border-neutral-400">
              {tag}
            </p>
          </div>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
        </div>
        <Link
          className="z-20 inline-flex h-12 w-full items-center justify-center rounded-lg border border-neutral-500/15 bg-neutral-200/20 font-medium text-neutral-600 backdrop-blur-md transition-colors hover:border-neutral-500/30 hover:bg-neutral-200/50 dark:bg-neutral-500/20 dark:text-neutral-300 dark:hover:bg-neutral-500/40"
          href={buttonHref}
        >
          {buttonText}
        </Link>
      </div>
    </>
  );
};

const DecorativeTilesBackground = () => {
  const rows = 20;
  const columns = 22;
  const animationDuration = 14;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 flex select-none flex-wrap"
    >
      {Array.from({ length: rows }).map((_, rowIndex) => {
        return (
          <div
            className="flex h-[16px] w-full border-b border-dashed border-neutral-500/20"
            key={`line-${rowIndex}`}
          >
            {Array.from({ length: columns }).map((_, colIndex) => {
              const delay = Math.random() * animationDuration;

              return (
                <div
                  className="relative h-[16px] w-[15px] border-r border-dashed border-neutral-500/20"
                  key={`tile-${colIndex}`}
                >
                  <div
                    className=" inset-0 h-[16px] w-[15px] bg-fuchsia-600/10 dark:bg-fuchsia-400/15"
                    style={{
                      opacity: 0,
                      animationName: "tiles",
                      animationIterationCount: "infinite",
                      animationTimingFunction: "ease",
                      animationDelay: `${delay}s`,
                      animationDuration: `${animationDuration}s`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

code.demo.1750540230417.tsx
import { Component } from "@/components/ui/dynamic-square";

const Demo = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-black">
      <Component
        buttonHref="#"
        buttonText="Join Now"
        description="Eldoraui version 2.0 is here."
        tag="2.0"
        title="Eldoraui"
      />
    </div>
  );
};

export default Demo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/dynamic-square.tsx
import Link from "next/link";

export const Component = ({
  title,
  tag,
  description,
  buttonText,
  buttonHref,
}: Readonly<{
  title: string;
  tag: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}>) => {
  return (
    <>
      <style>
        {`
        @keyframes tiles {
          0%, 40%, 80% {
            opacity: 0;
          }
          20%, 60% {
            opacity: 1;
          }
        }
      `}
      </style>
      <div className="relative flex w-80 flex-col gap-8 overflow-hidden rounded-xl border border-neutral-400/20 px-8 py-4 shadow-sm dark:shadow-black">
        <DecorativeTilesBackground />
        <div className="z-20">
          <div className="">
            <h3 className="inline text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              {title}
            </h3>
            <p className="ml-2 inline rounded-sm border border-neutral-900 px-0.5 align-top text-xs font-medium uppercase tracking-tight dark:border-neutral-400">
              {tag}
            </p>
          </div>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
        </div>
        <Link
          className="z-20 inline-flex h-12 w-full items-center justify-center rounded-lg border border-neutral-500/15 bg-neutral-200/20 font-medium text-neutral-600 backdrop-blur-md transition-colors hover:border-neutral-500/30 hover:bg-neutral-200/50 dark:bg-neutral-500/20 dark:text-neutral-300 dark:hover:bg-neutral-500/40"
          href={buttonHref}
        >
          {buttonText}
        </Link>
      </div>
    </>
  );
};

const DecorativeTilesBackground = () => {
  const rows = 20;
  const columns = 22;
  const animationDuration = 14;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 flex select-none flex-wrap"
    >
      {Array.from({ length: rows }).map((_, rowIndex) => {
        return (
          <div
            className="flex h-[16px] w-full border-b border-dashed border-neutral-500/20"
            key={`line-${rowIndex}`}
          >
            {Array.from({ length: columns }).map((_, colIndex) => {
              const delay = Math.random() * animationDuration;

              return (
                <div
                  className="relative h-[16px] w-[15px] border-r border-dashed border-neutral-500/20"
                  key={`tile-${colIndex}`}
                >
                  <div
                    className=" inset-0 h-[16px] w-[15px] bg-fuchsia-600/10 dark:bg-fuchsia-400/15"
                    style={{
                      opacity: 0,
                      animationName: "tiles",
                      animationIterationCount: "infinite",
                      animationTimingFunction: "ease",
                      animationDelay: `${delay}s`,
                      animationDuration: `${animationDuration}s`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
```

Install NPM dependencies:
```bash
next
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
