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
testimonial-1.tsx
"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";

export default function Testimonial1() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  interface StatItem {
    percentage: string;
    logo: string;
    label: string;
    isIncrease: boolean;
  }

  const stats: StatItem[] = [
    {
      percentage: "80%",
      label: "manual payment tasks",
      isIncrease: false,
      logo: "/customer/netflix.png",
    },
    {
      percentage: "30%",
      label: "international fees",
      isIncrease: false,
      logo: "/customer/vercel.png",
    },
    {
      percentage: "25%",
      label: "payment reconciliation",
      isIncrease: false,
      logo: "/customer/amazon.png",
    },
    {
      percentage: "$100K",
      label: "saved per year",
      isIncrease: true,
      logo: "/customer/alibaba.png",
    },
  ];
  return (
    <div className="bg-gray-50 min-h-screen w-full grid place-content-center py-16 px-4 md:px-8 lg:px-16 relative">
      <div className="max-w-6xl mx-auto">
        {/* Community Badge */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#f1efec] text-black px-4 py-1 rounded-full text-xs uppercase tracking-wider font-medium">
            Our Community
          </div>
        </div>

        {/* Main Heading with Images */}
        <div className="text-center max-w-screen-xl mx-auto relative text-neutral-900">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold  leading-tight">
            We make it easy for <br className="sm:hidden" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="inline-block mx-2 align-middle relative">
                    <div className="relative overflow-hidden sm:w-16 w-12 h-12 origin-center transition-all duration-300 md:hover:w-36 hover:-24 rounded-full border-2 border-white">
                      <img
                        src={`https://pro-section.ui-layouts.com/people/aam1.png`}
                        alt="Person smiling"
                        className="object-cover w-full h-full"
                        style={{ objectPosition: "center" }}
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs bg-white text-black p-4 rounded-lg shadow-lg border-none"
                >
                  <p className="mb-2 text-sm">
                    "It's great to have a good sense of where my money is going
                    and be able to adjust as necessary. I love the
                    transparency."
                  </p>
                  <p className="font-medium text-sm">John Doe</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            companies and
          </h1>

          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold  leading-tight">
            and their
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="inline-block mx-2 align-middle">
                    <div className="relative overflow-hidden sm:w-16 w-14 h-14 origin-center transition-all duration-300 lg:hover:w-36 md:hover:w-24 hover:-20 rounded-full border-2 border-white">
                      <img
                        src={`https://pro-section.ui-layouts.com/people/aam3.jpg`}
                        alt="Employee"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs bg-white text-black p-4 rounded-lg shadow-lg border-none"
                >
                  <p className="mb-2 text-sm">
                    "It's great to have a good sense of where my money is going
                    and be able to adjust as necessary. I love the
                    transparency."
                  </p>
                  <p className="font-medium text-sm">John Doe</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            employees to contribute and
          </h1>
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-[#333333] leading-tight">
            manage compensation
          </h1>
        </div>
        <div className="sm:flex grid grid-cols-2 gap-8 bg-neutral-100 mt-8 w-full mx-auto px-8 py-6 border rounded-md border-neutral-200">
          {stats.map((stat, index) => (
            <div
              key={stat?.label}
              className="flex-1 flex gap-4 pl-10 relative  "
            >
              {index !== 0 && (
                <div className="w-0.5 h-9 border border-dashed border-neutral-200 absolute left-0" />
              )}
              <div className=" w-full h-full group">
                <img
                  src={`https://pro-section.ui-layouts.com/${stat?.logo}`}
                  alt="doordash"
                  className="w-[85%] h-10  object-contain grayscale mx-auto translate-y-0 group-hover:-translate-y-12 opacity-100 group-hover:opacity-0 transition-all duration-300 ease-out"
                />
                <div className="absolute left-0 top-8 opacity-0 flex flex-col items-center justify-center w-full group-hover:-top-3.5 group-hover:opacity-100 transition-all duration-300 ease-out">
                  <div className="flex items-center justify-center gap-2 relative">
                    {stat.isIncrease ? (
                      <ArrowUp className="md:w-6 md:h-6 w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDown className="md:w-6 md:h-6 w-4 h-4 text-gray-800" />
                    )}
                    <span className="md:text-4xl text-2xl font-semibold text-gray-800">
                      {stat.percentage}
                    </span>
                  </div>
                  <p className="text-gray-800 md:text-sm text-xs text-center capitalize">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


code.demo.1756305160380.tsx

import Testimonial1 from "@/components/ui/testimonial-1";


export default function DemoOne() {
  return <Testimonial1 />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/testimonial-1.tsx
"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";

export default function Testimonial1() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  interface StatItem {
    percentage: string;
    logo: string;
    label: string;
    isIncrease: boolean;
  }

  const stats: StatItem[] = [
    {
      percentage: "80%",
      label: "manual payment tasks",
      isIncrease: false,
      logo: "/customer/netflix.png",
    },
    {
      percentage: "30%",
      label: "international fees",
      isIncrease: false,
      logo: "/customer/vercel.png",
    },
    {
      percentage: "25%",
      label: "payment reconciliation",
      isIncrease: false,
      logo: "/customer/amazon.png",
    },
    {
      percentage: "$100K",
      label: "saved per year",
      isIncrease: true,
      logo: "/customer/alibaba.png",
    },
  ];
  return (
    <div className="bg-gray-50 min-h-screen w-full grid place-content-center py-16 px-4 md:px-8 lg:px-16 relative">
      <div className="max-w-6xl mx-auto">
        {/* Community Badge */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#f1efec] text-black px-4 py-1 rounded-full text-xs uppercase tracking-wider font-medium">
            Our Community
          </div>
        </div>

        {/* Main Heading with Images */}
        <div className="text-center max-w-screen-xl mx-auto relative text-neutral-900">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold  leading-tight">
            We make it easy for <br className="sm:hidden" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="inline-block mx-2 align-middle relative">
                    <div className="relative overflow-hidden sm:w-16 w-12 h-12 origin-center transition-all duration-300 md:hover:w-36 hover:-24 rounded-full border-2 border-white">
                      <img
                        src={`https://pro-section.ui-layouts.com/people/aam1.png`}
                        alt="Person smiling"
                        className="object-cover w-full h-full"
                        style={{ objectPosition: "center" }}
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs bg-white text-black p-4 rounded-lg shadow-lg border-none"
                >
                  <p className="mb-2 text-sm">
                    "It's great to have a good sense of where my money is going
                    and be able to adjust as necessary. I love the
                    transparency."
                  </p>
                  <p className="font-medium text-sm">John Doe</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            companies and
          </h1>

          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold  leading-tight">
            and their
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="inline-block mx-2 align-middle">
                    <div className="relative overflow-hidden sm:w-16 w-14 h-14 origin-center transition-all duration-300 lg:hover:w-36 md:hover:w-24 hover:-20 rounded-full border-2 border-white">
                      <img
                        src={`https://pro-section.ui-layouts.com/people/aam3.jpg`}
                        alt="Employee"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs bg-white text-black p-4 rounded-lg shadow-lg border-none"
                >
                  <p className="mb-2 text-sm">
                    "It's great to have a good sense of where my money is going
                    and be able to adjust as necessary. I love the
                    transparency."
                  </p>
                  <p className="font-medium text-sm">John Doe</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            employees to contribute and
          </h1>
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-[#333333] leading-tight">
            manage compensation
          </h1>
        </div>
        <div className="sm:flex grid grid-cols-2 gap-8 bg-neutral-100 mt-8 w-full mx-auto px-8 py-6 border rounded-md border-neutral-200">
          {stats.map((stat, index) => (
            <div
              key={stat?.label}
              className="flex-1 flex gap-4 pl-10 relative  "
            >
              {index !== 0 && (
                <div className="w-0.5 h-9 border border-dashed border-neutral-200 absolute left-0" />
              )}
              <div className=" w-full h-full group">
                <img
                  src={`https://pro-section.ui-layouts.com/${stat?.logo}`}
                  alt="doordash"
                  className="w-[85%] h-10  object-contain grayscale mx-auto translate-y-0 group-hover:-translate-y-12 opacity-100 group-hover:opacity-0 transition-all duration-300 ease-out"
                />
                <div className="absolute left-0 top-8 opacity-0 flex flex-col items-center justify-center w-full group-hover:-top-3.5 group-hover:opacity-100 transition-all duration-300 ease-out">
                  <div className="flex items-center justify-center gap-2 relative">
                    {stat.isIncrease ? (
                      <ArrowUp className="md:w-6 md:h-6 w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDown className="md:w-6 md:h-6 w-4 h-4 text-gray-800" />
                    )}
                    <span className="md:text-4xl text-2xl font-semibold text-gray-800">
                      {stat.percentage}
                    </span>
                  </div>
                  <p className="text-gray-800 md:text-sm text-xs text-center capitalize">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

```

Install NPM dependencies:
```bash
@radix-ui/react-tooltip, lucide-react
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
