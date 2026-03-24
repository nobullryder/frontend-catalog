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
interactive-changelog-with-dialog.tsx
"use client";

import { Copy, ExternalLink, GitPullRequest, Maximize2 } from "lucide-react";
import { MeshGradient, Dithering } from "@paper-design/shaders-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const releases = [
  {
    title: "v3.0.0: Major UI Refresh & New Integrations",
    date: "May 15, 2025",
    image: "https://placehold.co/1200x700/141414/ffffff/png?text=UI+Refresh+%26+Integrations",
    excerpt:
      "This major release introduces a redesigned interface for a more intuitive experience, plus integrations with leading third-party platforms.",
    contributors: [
      "https://placehold.co/96x96/ff8844/fff?text=A5",
      "https://placehold.co/96x96/3399ff/fff?text=B6",
      "https://placehold.co/96x96/33cc99/fff?text=C1",
      "https://placehold.co/96x96/cc00ff/fff?text=D2",
    ],
    content: (
      <div className="prose dark:prose-invert">
        <h3>Refreshed User Interface</h3>
        <p>
          A lighter, faster UI with improved accessibility and responsiveness.
        </p>
        <ul>
          <li>New typography and icon system</li>
          <li>Reorganized navigation and controls</li>
          <li>Configurable dashboard panels</li>
        </ul>
        <h4>Enhanced Integrations</h4>
        <p>
          Seamless connections for Slack, Drive, and Trello to boost workflow
          efficiency.
        </p>
      </div>
    ),
  },
  {
    title: "v2.9.5: Performance Boost & API Enhancements",
    date: "April 02, 2025",
    image: "https://placehold.co/1200x700/0f0f0f/ffffff/png?text=Performance+%26+API",
    excerpt:
      "This release brings a performance overhaul and introduces new API endpoints for advanced analytics and automation.",
    contributors: [
      "https://placehold.co/96x96/ff5566/fff?text=E3",
      "https://placehold.co/96x96/33cc99/fff?text=F4",
      "https://placehold.co/96x96/ffaa33/fff?text=G5",
      "https://placehold.co/96x96/6699ff/fff?text=H6",
      "https://placehold.co/96x96/9900ff/fff?text=I7",
    ],
    content: (
      <div className="prose dark:prose-invert">
        <h3>Performance Overhaul</h3>
        <ul>
          <li>Reduced load time by 35%</li>
          <li>Improved caching and query batching</li>
          <li>Faster image preloading</li>
        </ul>
        <h4>API Enhancements</h4>
        <ul>
          <li>New analytics endpoints</li>
          <li>Improved role-based permissions</li>
          <li>Expanded webhooks for automation</li>
        </ul>
      </div>
    ),
  },
];

export const Component = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* shader header full-width */}
      <div className="relative w-full overflow-hidden">
        <MeshGradient
          colors={["#5b00ff", "#00ffa3", "#ff9a00", "#ea00ff"]}
          swirl={0.55}
          distortion={0.85}
          speed={0.1}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        <Dithering
          colors={["#ffffff", "#f2f2f2", "#eaeaea"]}
          intensity={0.18}
          shape="simplex"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/30" />

        <div className="relative container mx-auto px-4 py-12 text-left">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-white/80">
              <GitPullRequest className="size-4" />
              <p>Changelog</p>
            </div>
            <h1 className="text-4xl font-semibold text-white leading-snug">
              Latest Enhancements
              <br /> & Platform News
            </h1>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="grid justify-center container mx-auto px-4  border-x border-border">
        {releases.map((item, idx) => (
          <Dialog key={idx}>
            <div className="relative flex flex-col lg:flex-row w-full py-16 gap-6 lg:gap-0">
              <div className="lg:sticky top-2 h-fit">
                <time className="text-muted-foreground w-36 text-sm font-medium lg:absolute">
                  {item.date}
                </time>
              </div>

              <div className="flex max-w-prose flex-col gap-4 lg:mx-auto">
                <h3 className="text-3xl font-medium lg:pt-10 lg:text-3xl">{item.title}</h3>
                <DialogTrigger asChild>
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="border-border max-h-96 w-full rounded-lg border object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 rounded-lg" />
                  </div>
                </DialogTrigger>
                <p className="text-muted-foreground text-sm font-medium">
                  {item.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center -space-x-2">
                      {item.contributors.slice(0, 3).map((src, id) => (
                        <img
                          key={id}
                          src={src}
                          alt="Contributor"
                          className="border-border size-6 rounded-full border"
                        />
                      ))}
                    </div>
                    {item.contributors.length > 3 && (
                      <span className="text-muted-foreground text-sm font-medium">
                        +{item.contributors.length - 3} contributors
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Maximize2 className="size-4" />
                            </Button>
                          </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Show full release</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Copy className="size-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy link</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <ExternalLink className="size-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Open in new tab</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>

              <div className="bg-border absolute bottom-0 left-0 right-0 h-px w-[200vw] -translate-x-1/2" />
            </div>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-prose">
              <DialogHeader>
                <DialogTitle className="text-left">{item.title}</DialogTitle>
                <DialogDescription className="text-left">
                  {item.excerpt}
                </DialogDescription>
              </DialogHeader>
              <img
                src={item.image}
                alt={item.title}
                className="border-border max-h-96 w-full rounded-lg border object-cover"
              />
              {item.content}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
};


code.demo.1761023765889.tsx
import { Component } from "@/components/ui/interactive-changelog-with-dialog";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/interactive-changelog-with-dialog.tsx
"use client";

import { Copy, ExternalLink, GitPullRequest, Maximize2 } from "lucide-react";
import { MeshGradient, Dithering } from "@paper-design/shaders-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const releases = [
  {
    title: "v3.0.0: Major UI Refresh & New Integrations",
    date: "May 15, 2025",
    image: "https://placehold.co/1200x700/141414/ffffff/png?text=UI+Refresh+%26+Integrations",
    excerpt:
      "This major release introduces a redesigned interface for a more intuitive experience, plus integrations with leading third-party platforms.",
    contributors: [
      "https://placehold.co/96x96/ff8844/fff?text=A5",
      "https://placehold.co/96x96/3399ff/fff?text=B6",
      "https://placehold.co/96x96/33cc99/fff?text=C1",
      "https://placehold.co/96x96/cc00ff/fff?text=D2",
    ],
    content: (
      <div className="prose dark:prose-invert">
        <h3>Refreshed User Interface</h3>
        <p>
          A lighter, faster UI with improved accessibility and responsiveness.
        </p>
        <ul>
          <li>New typography and icon system</li>
          <li>Reorganized navigation and controls</li>
          <li>Configurable dashboard panels</li>
        </ul>
        <h4>Enhanced Integrations</h4>
        <p>
          Seamless connections for Slack, Drive, and Trello to boost workflow
          efficiency.
        </p>
      </div>
    ),
  },
  {
    title: "v2.9.5: Performance Boost & API Enhancements",
    date: "April 02, 2025",
    image: "https://placehold.co/1200x700/0f0f0f/ffffff/png?text=Performance+%26+API",
    excerpt:
      "This release brings a performance overhaul and introduces new API endpoints for advanced analytics and automation.",
    contributors: [
      "https://placehold.co/96x96/ff5566/fff?text=E3",
      "https://placehold.co/96x96/33cc99/fff?text=F4",
      "https://placehold.co/96x96/ffaa33/fff?text=G5",
      "https://placehold.co/96x96/6699ff/fff?text=H6",
      "https://placehold.co/96x96/9900ff/fff?text=I7",
    ],
    content: (
      <div className="prose dark:prose-invert">
        <h3>Performance Overhaul</h3>
        <ul>
          <li>Reduced load time by 35%</li>
          <li>Improved caching and query batching</li>
          <li>Faster image preloading</li>
        </ul>
        <h4>API Enhancements</h4>
        <ul>
          <li>New analytics endpoints</li>
          <li>Improved role-based permissions</li>
          <li>Expanded webhooks for automation</li>
        </ul>
      </div>
    ),
  },
];

export const Component = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* shader header full-width */}
      <div className="relative w-full overflow-hidden">
        <MeshGradient
          colors={["#5b00ff", "#00ffa3", "#ff9a00", "#ea00ff"]}
          swirl={0.55}
          distortion={0.85}
          speed={0.1}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        <Dithering
          colors={["#ffffff", "#f2f2f2", "#eaeaea"]}
          intensity={0.18}
          shape="simplex"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/30" />

        <div className="relative container mx-auto px-4 py-12 text-left">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-white/80">
              <GitPullRequest className="size-4" />
              <p>Changelog</p>
            </div>
            <h1 className="text-4xl font-semibold text-white leading-snug">
              Latest Enhancements
              <br /> & Platform News
            </h1>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="grid justify-center container mx-auto px-4  border-x border-border">
        {releases.map((item, idx) => (
          <Dialog key={idx}>
            <div className="relative flex flex-col lg:flex-row w-full py-16 gap-6 lg:gap-0">
              <div className="lg:sticky top-2 h-fit">
                <time className="text-muted-foreground w-36 text-sm font-medium lg:absolute">
                  {item.date}
                </time>
              </div>

              <div className="flex max-w-prose flex-col gap-4 lg:mx-auto">
                <h3 className="text-3xl font-medium lg:pt-10 lg:text-3xl">{item.title}</h3>
                <DialogTrigger asChild>
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="border-border max-h-96 w-full rounded-lg border object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 rounded-lg" />
                  </div>
                </DialogTrigger>
                <p className="text-muted-foreground text-sm font-medium">
                  {item.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center -space-x-2">
                      {item.contributors.slice(0, 3).map((src, id) => (
                        <img
                          key={id}
                          src={src}
                          alt="Contributor"
                          className="border-border size-6 rounded-full border"
                        />
                      ))}
                    </div>
                    {item.contributors.length > 3 && (
                      <span className="text-muted-foreground text-sm font-medium">
                        +{item.contributors.length - 3} contributors
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Maximize2 className="size-4" />
                            </Button>
                          </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Show full release</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Copy className="size-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy link</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <ExternalLink className="size-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Open in new tab</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>

              <div className="bg-border absolute bottom-0 left-0 right-0 h-px w-[200vw] -translate-x-1/2" />
            </div>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-prose">
              <DialogHeader>
                <DialogTitle className="text-left">{item.title}</DialogTitle>
                <DialogDescription className="text-left">
                  {item.excerpt}
                </DialogDescription>
              </DialogHeader>
              <img
                src={item.image}
                alt={item.title}
                className="border-border max-h-96 w-full rounded-lg border object-cover"
              />
              {item.content}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
};

```

Install NPM dependencies:
```bash
lucide-react, @paper-design/shaders-react
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
