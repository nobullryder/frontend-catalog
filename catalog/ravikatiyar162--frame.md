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
frame.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn

// Define the props for the component
interface AnimatedBlobImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** The source URL of the image. */
  src: string;
  /** The alternative text for the image, for accessibility. */
  alt: string;
  /** Optional class names for custom styling. */
  className?: string;
}

/**
 * A component that displays an image within a subtly animating blob shape.
 * It uses CSS clip-path and embedded animations for a self-contained effect.
 */
const AnimatedBlobImage = React.forwardRef<
  HTMLImageElement,
  AnimatedBlobImageProps
>(({ src, alt, className, ...props }, ref) => {
  // CSS for animations is embedded here to make the component self-contained.
  const animationStyles = `
    @keyframes blob-path-animation {
      0% {
        d: path("M0.81,0.56 C0.84,0.73 0.69,0.88 0.52,0.92 C0.35,0.96 0.17,0.85 0.09,0.68 C0.01,0.51 0.07,0.3 0.23,0.19 C0.39,0.08 0.61,0.11 0.72,0.26 C0.8,0.37 0.78,0.47 0.81,0.56 Z");
      }
      25% {
        d: path("M0.88,0.56 C0.93,0.69 0.8,0.86 0.63,0.9 C0.46,0.94 0.25,0.88 0.16,0.74 C0.07,0.6 0.11,0.41 0.25,0.3 C0.39,0.19 0.61,0.21 0.73,0.33 C0.82,0.42 0.85,0.48 0.88,0.56 Z");
      }
      50% {
        d: path("M0.84,0.62 C0.88,0.73 0.75,0.88 0.58,0.91 C0.41,0.94 0.24,0.86 0.15,0.72 C0.06,0.58 0.12,0.38 0.27,0.27 C0.42,0.16 0.62,0.2 0.73,0.33 C0.81,0.43 0.81,0.53 0.84,0.62 Z");
      }
      75% {
        d: path("M0.8,0.66 C0.84,0.78 0.7,0.91 0.54,0.92 C0.38,0.93 0.21,0.84 0.13,0.7 C0.05,0.56 0.13,0.37 0.28,0.26 C0.43,0.15 0.62,0.2 0.71,0.33 C0.78,0.43 0.77,0.57 0.8,0.66 Z");
      }
      100% {
        d: path("M0.81,0.56 C0.84,0.73 0.69,0.88 0.52,0.92 C0.35,0.96 0.17,0.85 0.09,0.68 C0.01,0.51 0.07,0.3 0.23,0.19 C0.39,0.08 0.61,0.11 0.72,0.26 C0.8,0.37 0.78,0.47 0.81,0.56 Z");
      }
    }

    @keyframes blob-spin-animation {
      0% { transform: rotate(0deg); }
      50% { transform: rotate(5deg); }
      100% { transform: rotate(0deg); }
    }

    .animate-blob-path-component {
      animation: blob-path-animation 15s ease-in-out infinite;
    }

    .animate-blob-spin-component {
      animation: blob-spin-animation 20s ease-in-out infinite;
    }
  `;

  return (
    <>
      <style>{animationStyles}</style>
      <div
        className={cn(
          "relative w-full max-w-sm aspect-square", // Responsive container with a square aspect ratio
          "animate-blob-spin-component", // Apply the animation from the <style> tag
          className
        )}
      >
        <img
          ref={ref}
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover" // Ensure image covers the container
          style={{
            // The clip-path creates the blob shape.
            clipPath: "url(#blob-shape-component)",
          }}
          {...props}
        />
        {/* Define the SVG clip-path. It's hidden but used by the `clipPath` style above. */}
        <svg className="absolute w-0 h-0">
          <defs>
            <clipPath id="blob-shape-component" clipPathUnits="objectBoundingBox">
              <path
                d="M0.81,0.56 C0.84,0.73 0.69,0.88 0.52,0.92 C0.35,0.96 0.17,0.85 0.09,0.68 C0.01,0.51 0.07,0.3 0.23,0.19 C0.39,0.08 0.61,0.11 0.72,0.26 C0.8,0.37 0.78,0.47 0.81,0.56 Z"
                className="animate-blob-path-component" // Apply animation to the path data
              ></path>
            </clipPath>
          </defs>
        </svg>
      </div>
    </>
  );
});

AnimatedBlobImage.displayName = "AnimatedBlobImage";

export { AnimatedBlobImage };

code.demo.1757417840415.tsx
import { AnimatedBlobImage } from "@/components/ui/frame";

export default function AnimatedBlobImageDemo() {
  return (
    <div className="flex w-full h-[500px] items-center justify-center bg-background p-4">
      <AnimatedBlobImage
        src="https://images.unsplash.com/photo-1640450013037-b0aba6ad5bf4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fDgwfGVufDB8fDB8fHww"
        alt="Woman in a red and white striped swimsuit on a beach"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md"
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/frame.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn

// Define the props for the component
interface AnimatedBlobImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** The source URL of the image. */
  src: string;
  /** The alternative text for the image, for accessibility. */
  alt: string;
  /** Optional class names for custom styling. */
  className?: string;
}

/**
 * A component that displays an image within a subtly animating blob shape.
 * It uses CSS clip-path and embedded animations for a self-contained effect.
 */
const AnimatedBlobImage = React.forwardRef<
  HTMLImageElement,
  AnimatedBlobImageProps
>(({ src, alt, className, ...props }, ref) => {
  // CSS for animations is embedded here to make the component self-contained.
  const animationStyles = `
    @keyframes blob-path-animation {
      0% {
        d: path("M0.81,0.56 C0.84,0.73 0.69,0.88 0.52,0.92 C0.35,0.96 0.17,0.85 0.09,0.68 C0.01,0.51 0.07,0.3 0.23,0.19 C0.39,0.08 0.61,0.11 0.72,0.26 C0.8,0.37 0.78,0.47 0.81,0.56 Z");
      }
      25% {
        d: path("M0.88,0.56 C0.93,0.69 0.8,0.86 0.63,0.9 C0.46,0.94 0.25,0.88 0.16,0.74 C0.07,0.6 0.11,0.41 0.25,0.3 C0.39,0.19 0.61,0.21 0.73,0.33 C0.82,0.42 0.85,0.48 0.88,0.56 Z");
      }
      50% {
        d: path("M0.84,0.62 C0.88,0.73 0.75,0.88 0.58,0.91 C0.41,0.94 0.24,0.86 0.15,0.72 C0.06,0.58 0.12,0.38 0.27,0.27 C0.42,0.16 0.62,0.2 0.73,0.33 C0.81,0.43 0.81,0.53 0.84,0.62 Z");
      }
      75% {
        d: path("M0.8,0.66 C0.84,0.78 0.7,0.91 0.54,0.92 C0.38,0.93 0.21,0.84 0.13,0.7 C0.05,0.56 0.13,0.37 0.28,0.26 C0.43,0.15 0.62,0.2 0.71,0.33 C0.78,0.43 0.77,0.57 0.8,0.66 Z");
      }
      100% {
        d: path("M0.81,0.56 C0.84,0.73 0.69,0.88 0.52,0.92 C0.35,0.96 0.17,0.85 0.09,0.68 C0.01,0.51 0.07,0.3 0.23,0.19 C0.39,0.08 0.61,0.11 0.72,0.26 C0.8,0.37 0.78,0.47 0.81,0.56 Z");
      }
    }

    @keyframes blob-spin-animation {
      0% { transform: rotate(0deg); }
      50% { transform: rotate(5deg); }
      100% { transform: rotate(0deg); }
    }

    .animate-blob-path-component {
      animation: blob-path-animation 15s ease-in-out infinite;
    }

    .animate-blob-spin-component {
      animation: blob-spin-animation 20s ease-in-out infinite;
    }
  `;

  return (
    <>
      <style>{animationStyles}</style>
      <div
        className={cn(
          "relative w-full max-w-sm aspect-square", // Responsive container with a square aspect ratio
          "animate-blob-spin-component", // Apply the animation from the <style> tag
          className
        )}
      >
        <img
          ref={ref}
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover" // Ensure image covers the container
          style={{
            // The clip-path creates the blob shape.
            clipPath: "url(#blob-shape-component)",
          }}
          {...props}
        />
        {/* Define the SVG clip-path. It's hidden but used by the `clipPath` style above. */}
        <svg className="absolute w-0 h-0">
          <defs>
            <clipPath id="blob-shape-component" clipPathUnits="objectBoundingBox">
              <path
                d="M0.81,0.56 C0.84,0.73 0.69,0.88 0.52,0.92 C0.35,0.96 0.17,0.85 0.09,0.68 C0.01,0.51 0.07,0.3 0.23,0.19 C0.39,0.08 0.61,0.11 0.72,0.26 C0.8,0.37 0.78,0.47 0.81,0.56 Z"
                className="animate-blob-path-component" // Apply animation to the path data
              ></path>
            </clipPath>
          </defs>
        </svg>
      </div>
    </>
  );
});

AnimatedBlobImage.displayName = "AnimatedBlobImage";

export { AnimatedBlobImage };
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
