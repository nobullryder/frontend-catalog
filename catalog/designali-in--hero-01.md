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
hero-01.tsx
"use client";

import { GradientWave } from "@/components/ui/gradient-wave";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection01() {
  return (
    <div className="h-screen w-full flex items-center justify-center relative">
      {/* GradientWave behind the text */}
      <GradientWave
        colors={["#ffffff", "#fb7185", '#e879f9', "#a3e635", "#ffffff"]}
        shadowPower={4}
        darkenTop={false} 
        noiseFrequency={[0.0001, 0.0002]}
        deform={{ incline: 0.2, noiseAmp: 100, noiseFlow: 2 }}
      />
      <div className="flex flex-col text-center">
        <img
          src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/brand/ai-logo.png"
          alt="Your Image"
          height={50}
          width={50}
          className="h-30 z-40 w-full object-contain"
        />
        <h2 className="font-extrabold pt-10 text-black mix-blend-overlay tracking-tighter text-7xl md:text-7xl lg:text-9xl">
          Design <br /> without Limits
        </h2>
        <div className="space-y-6 z-10 pt-20 flex justify-center items-center flex-col text-center px-6">
          <p className="text-black w-full  max-w-lg font-light text-sm md:text-xl">
            I create digital experiences that connect and inspire. I build apps,
            websites, brands, and products end-to-end.
          </p>
          <div className="flex gap-3 mt-6 flex-wrap justify-center">
            <Link target="_blank" href="https://cal.com/aliimam-in/30min">
              <Button className="h-12 md:h-14 rounded-full cursor-pointer px-8 md:px-10">
                Book an Intro Call
              </Button>
            </Link>
            <Button
              variant={"secondary"}
              className="h-12 md:h-14 cursor-pointer rounded-full px-8 md:px-10"
            >
              Get Started Explore
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


code.demo.1760022303685.tsx
import { HeroSection01 } from "@/components/ui/hero-01";

export default function DemoOne() {
  return <HeroSection01 />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/hero-01.tsx
"use client";

import { GradientWave } from "@/components/ui/gradient-wave";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection01() {
  return (
    <div className="h-screen w-full flex items-center justify-center relative">
      {/* GradientWave behind the text */}
      <GradientWave
        colors={["#ffffff", "#fb7185", '#e879f9', "#a3e635", "#ffffff"]}
        shadowPower={4}
        darkenTop={false} 
        noiseFrequency={[0.0001, 0.0002]}
        deform={{ incline: 0.2, noiseAmp: 100, noiseFlow: 2 }}
      />
      <div className="flex flex-col text-center">
        <img
          src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/brand/ai-logo.png"
          alt="Your Image"
          height={50}
          width={50}
          className="h-30 z-40 w-full object-contain"
        />
        <h2 className="font-extrabold pt-10 text-black mix-blend-overlay tracking-tighter text-7xl md:text-7xl lg:text-9xl">
          Design <br /> without Limits
        </h2>
        <div className="space-y-6 z-10 pt-20 flex justify-center items-center flex-col text-center px-6">
          <p className="text-black w-full  max-w-lg font-light text-sm md:text-xl">
            I create digital experiences that connect and inspire. I build apps,
            websites, brands, and products end-to-end.
          </p>
          <div className="flex gap-3 mt-6 flex-wrap justify-center">
            <Link target="_blank" href="https://cal.com/aliimam-in/30min">
              <Button className="h-12 md:h-14 rounded-full cursor-pointer px-8 md:px-10">
                Book an Intro Call
              </Button>
            </Link>
            <Button
              variant={"secondary"}
              className="h-12 md:h-14 cursor-pointer rounded-full px-8 md:px-10"
            >
              Get Started Explore
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
