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
aero-hero-1.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-4 p-4 rounded-lg")}>
      <h1 className="text-2xl font-bold mb-2">Component Example</h1>
      <h2 className="text-xl font-semibold">{count}</h2>
      <div className="flex gap-2">
        <button onClick={() => setCount((prev) => prev - 1)}>-</button>
        <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      </div>
    </div>
  );
};


code.demo.1772825419229.tsx
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/demos/ui/avatar";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/demos/ui/marquee";


export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden pt-0 text-black dark:bg-white">
      <div className="relative z-10 mx-auto h-full w-full max-w-full">
        <div className="grid grid-cols-1 md:h-screen md:grid-cols-12">
          <div className="h-64 w-full md:col-span-6 md:h-full">
            <Image
              alt=""
              className="h-full w-full overflow-hidden object-cover object-center"
              height={1080}
              src="https://images.cnippet.dev/image/upload/v1770400411/img_14001.jpg"
              width={1920}
            />
          </div>

          <div className="flex w-full items-center justify-between px-6 pt-8 pb-10 text-left md:col-span-6 md:pt-20 md:pr-6 md:pb-0 md:pl-10">
            <div className="w-full max-w-3xl space-y-6">
              <h1 className="font-kanturmuy font-normal text-4xl tracking-tighter md:text-6xl lg:text-7xl">
                Sustainable Solutions for a Better Future
              </h1>

              <p className="max-w-2xl font-light text-base md:text-lg lg:text-xl">
                Empowering businesses and communities to thrive in a low-carbon
                world through tailored clean energy solutions.
              </p>
              <div className="mt-auto space-y-7">
                <div className="mt-8 flex flex-wrap items-center gap-3 lg:mt-auto">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <Avatar
                        className="size-12 border-2 border-white transition-all duration-300 hover:grayscale-0"
                        key={i}
                      >
                        <AvatarImage
                          src={`https://images.cnippet.dev/image/upload/v1770400411/a${i}.jpg`}
                        />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div className="flex flex-col font-normal text-sm">
                    <span className="text-base sm:text-lg">15,000+</span>
                    {/* <Icons.starPolygon className="size-4 text-blue-600" /> */}
                    <span className="">Teams Connected</span>
                  </div>
                </div>
                <div className="flex w-fit gap-6">
                  <Button className="group not-disabled:inset-shadow-none mx-auto flex cursor-pointer items-center justify-center gap-0 rounded-full border-none bg-transparent px-0 py-5 font-normal shadow-none hover:bg-transparent [:hover,[data-pressed]]:bg-transparent">
                    <span className="rounded-full bg-[#e1fcad] px-6 py-3 text-black duration-500 ease-in-out group-hover:bg-[#122023] group-hover:text-[#e1fcad] group-hover:transition-colors">
                      Start a Project
                    </span>
                    <div className="relative flex h-fit cursor-pointer items-center overflow-hidden rounded-full bg-[#e1fcad] p-5 text-black duration-500 ease-in-out group-hover:bg-[#122023] group-hover:text-[#e1fcad] group-hover:transition-colors">
                      <ArrowUpRight className="absolute h-5 w-5 -translate-x-1/2 transition-all duration-500 ease-in-out group-hover:translate-x-10" />
                      <ArrowUpRight className="absolute h-5 w-5 -translate-x-10 transition-all duration-500 ease-in-out group-hover:-translate-x-1/2" />
                    </div>
                  </Button>
                </div>
              </div>
              <div className="relative -mx-4 mt-8 sm:-mx-6 lg:-mx-8">
                <div className="absolute left-0 z-40 h-full w-20 bg-linear-to-r from-white" />
                <div className="absolute right-0 z-40 h-full w-20 bg-linear-to-l from-white" />

                <Marquee className="[--duration:25s]" pauseOnHover repeat={2}>
                  {Array.from({ length: 5 }).map((_, index) => {
                    const k = `cmp_sno_${index}`;

                    return (
                      <div
                        className="flex items-center justify-center px-3 md:px-5"
                        key={k}
                      >
                        <Image
                          alt="Logo"
                          className="h-5 w-auto md:h-8"
                          height={24}
                          src={`https://images.cnippet.dev/image/upload/v1770400411/logoipsum-${index+1}.png`}
                          width={100}
                        />
                      </div>
                    );
                  })}
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/aero-hero-1.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-4 p-4 rounded-lg")}>
      <h1 className="text-2xl font-bold mb-2">Component Example</h1>
      <h2 className="text-xl font-semibold">{count}</h2>
      <div className="flex gap-2">
        <button onClick={() => setCount((prev) => prev - 1)}>-</button>
        <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      </div>
    </div>
  );
};

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
