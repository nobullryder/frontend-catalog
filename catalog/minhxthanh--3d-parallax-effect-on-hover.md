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
3d-parallax-effect-on-hover.tsx
import React from "react";

const images = [
  {
    src: "https://picsum.photos/id/65/300/300",
    alt: "the back of a random person",
    f: 0.1,
    r: "10px",
  },
  {
    src: "https://assets.codepen.io/1480814/pexels-pixabay-62655.jpg",
    alt: "an eagle",
    f: 0.12,
    r: "5px",
  },
  {
    src: "https://picsum.photos/id/755/300/300",
    alt: "a cup of tea",
    f: 0.08,
    r: "20px",
  },
];

export default function ParallaxImages() {
  return (
    <div className="min-h-screen grid grid-flow-col place-content-center gap-8 bg-dark p-8">
      {images.map((img, idx) => (
        <div key={idx} className="overflow-hidden">
          <img
            src={img.src}
            alt={img.alt}
            className="parallax-img"
            style={{ "--f": img.f, "--r": img.r }}
          />
        </div>
      ))}
    </div>
  );
}

code.demo.1747578697988.tsx
import ParallaxImages from "@/components/ui/3d-parallax-effect-on-hover";

const DemoOne = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <ParallaxImages />
    </div>
  );
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/3d-parallax-effect-on-hover.tsx
import React from "react";

const images = [
  {
    src: "https://picsum.photos/id/65/300/300",
    alt: "the back of a random person",
    f: 0.1,
    r: "10px",
  },
  {
    src: "https://assets.codepen.io/1480814/pexels-pixabay-62655.jpg",
    alt: "an eagle",
    f: 0.12,
    r: "5px",
  },
  {
    src: "https://picsum.photos/id/755/300/300",
    alt: "a cup of tea",
    f: 0.08,
    r: "20px",
  },
];

export default function ParallaxImages() {
  return (
    <div className="min-h-screen grid grid-flow-col place-content-center gap-8 bg-dark p-8">
      {images.map((img, idx) => (
        <div key={idx} className="overflow-hidden">
          <img
            src={img.src}
            alt={img.alt}
            className="parallax-img"
            style={{ "--f": img.f, "--r": img.r }}
          />
        </div>
      ))}
    </div>
  );
}
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
