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
brand-scoller.tsx
"use client";
 
import { BsAmazon, BsGoogle, BsSpotify, BsYoutube } from "react-icons/bs";
 
export const BrandScroller = () => {
  return (
    <>
       <div className="group flex overflow-hidden py-2 [--gap:2rem] [gap:var(--gap))] flex-row max-w-full [--duration:40s] [mask-image:linear-gradient(to_right,_rgba(0,_0,_0,_0),rgba(0,_0,_0,_1)_10%,rgba(0,_0,_0,_1)_90%,rgba(0,_0,_0,_0))]">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row"
              key={i}
            >
              <div className="flex items-center w-28 gap-3">
                <BsSpotify size={24} />
                <p className="text-lg font-semibold opacity-80">Spotify</p>
              </div>
              <div className="flex items-center w-28 gap-3">
                <BsYoutube size={24} />
                <p className="text-lg font-semibold opacity-80">YouTube</p>
              </div>
              <div className="flex items-center w-28 gap-3">
                <BsAmazon size={24} />
                <p className="text-lg font-semibold opacity-80">Amazon</p>
              </div>

              <div className="flex items-center w-28 gap-3">
                <BsGoogle size={24} />
                <p className="text-lg font-semibold opacity-80">Google</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
 
export const BrandScrollerReverse = () => {
  return (
    <>
       <div className="group flex overflow-hidden py-2 [--gap:2rem] [gap:var(--gap))] flex-row max-w-full [--duration:40s] [mask-image:linear-gradient(to_right,_rgba(0,_0,_0,_0),rgba(0,_0,_0,_1)_10%,rgba(0,_0,_0,_1)_90%,rgba(0,_0,_0,_0))]">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee-reverse flex-row"
              key={i}
            >
              <div className="flex items-center w-28 gap-3">
                <BsSpotify size={24} />
                <p className="text-lg font-semibold opacity-80">Spotify</p>
              </div>
              <div className="flex items-center w-28 gap-3">
                <BsYoutube size={24} />
                <p className="text-lg font-semibold opacity-80">YouTube</p>
              </div>
              <div className="flex items-center w-28 gap-3">
                <BsAmazon size={24} />
                <p className="text-lg font-semibold opacity-80">Amazon</p>
              </div>

              <div className="flex items-center w-28 gap-3">
                <BsGoogle size={24} />
                <p className="text-lg font-semibold opacity-80">Google</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

code.demo.1746801937674.tsx
"use client";

import { BrandScroller,BrandScrollerReverse } from "@/components/ui/brand-scoller";


const DemoOne = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-screen">
    <BrandScroller/>
    <BrandScrollerReverse/>
    </div>
  );
};

export default { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
/components/ui/brand-scoller.tsx
"use client";
 
import { BsAmazon, BsGoogle, BsSpotify, BsYoutube } from "react-icons/bs";
 
export const BrandScroller = () => {
  return (
    <>
       <div className="group flex overflow-hidden py-2 [--gap:2rem] [gap:var(--gap))] flex-row max-w-full [--duration:40s] [mask-image:linear-gradient(to_right,_rgba(0,_0,_0,_0),rgba(0,_0,_0,_1)_10%,rgba(0,_0,_0,_1)_90%,rgba(0,_0,_0,_0))]">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row"
              key={i}
            >
              <div className="flex items-center w-28 gap-3">
                <BsSpotify size={24} />
                <p className="text-lg font-semibold opacity-80">Spotify</p>
              </div>
              <div className="flex items-center w-28 gap-3">
                <BsYoutube size={24} />
                <p className="text-lg font-semibold opacity-80">YouTube</p>
              </div>
              <div className="flex items-center w-28 gap-3">
                <BsAmazon size={24} />
                <p className="text-lg font-semibold opacity-80">Amazon</p>
              </div>

              <div className="flex items-center w-28 gap-3">
                <BsGoogle size={24} />
                <p className="text-lg font-semibold opacity-80">Google</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
 
export const BrandScrollerReverse = () => {
  return (
    <>
       <div className="group flex overflow-hidden py-2 [--gap:2rem] [gap:var(--gap))] flex-row max-w-full [--duration:40s] [mask-image:linear-gradient(to_right,_rgba(0,_0,_0,_0),rgba(0,_0,_0,_1)_10%,rgba(0,_0,_0,_1)_90%,rgba(0,_0,_0,_0))]">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee-reverse flex-row"
              key={i}
            >
              <div className="flex items-center w-28 gap-3">
                <BsSpotify size={24} />
                <p className="text-lg font-semibold opacity-80">Spotify</p>
              </div>
              <div className="flex items-center w-28 gap-3">
                <BsYoutube size={24} />
                <p className="text-lg font-semibold opacity-80">YouTube</p>
              </div>
              <div className="flex items-center w-28 gap-3">
                <BsAmazon size={24} />
                <p className="text-lg font-semibold opacity-80">Amazon</p>
              </div>

              <div className="flex items-center w-28 gap-3">
                <BsGoogle size={24} />
                <p className="text-lg font-semibold opacity-80">Google</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
```

Install NPM dependencies:
```bash
react-icons
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
