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
download-animation.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const DownloadButton = ({ onDownload }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadClick = () => {
    if (isDownloading) return;

    setIsDownloading(true);
    onDownload?.();

    // Simulate download
    setTimeout(() => {
      setIsDownloading(false);
    }, 3500);
  };

  return (
    <div className="flex justify-center items-center w-full">
      <motion.button
        onClick={handleDownloadClick}
        className={`relative flex items-center border-2 rounded-full overflow-hidden transition-all
          ${isDownloading ? 'cursor-wait border-blue-500' : 'cursor-pointer border-blue-500'}`}
        animate={{
          width: isDownloading ? 56 : 160,
          borderRadius: isDownloading ? '9999px' : '9999px' // Keeps full rounding
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{ minWidth: isDownloading ? '56px' : '160px', height: 56 }}
      >
        {/* Spinner animation inside circle */}
        <AnimatePresence>
          {isDownloading && (
            <motion.div
              className="absolute inset-0 w-2 h-2 bg-white rounded-full m-auto z-20"
              initial={{ opacity: 1 }}
              animate={{
                rotate: 360,
                x: [0, 27, 0, -27, 0],
                y: [0, -27, 0, 27, 0]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 3,
                ease: 'easeInOut',
                times: [0, 0.25, 0.5, 0.75, 1]
              }}
            />
          )}
        </AnimatePresence>

        {/* Circular button with icon */}
        <motion.div
          className="h-14 w-14 rounded-full bg-blue-500 flex justify-center items-center relative shadow-lg z-10"
          animate={isDownloading ? {
            rotate: 180,
            scale: [0.95, 1, 0.95],
          } : {}}
          transition={{
            duration: isDownloading ? 1 : 0.4,
            times: isDownloading ? [0, 0.7, 1] : undefined
          }}
        >
          {/* Progress fill */}
          <motion.div
            className="absolute top-0 left-0 w-full bg-blue-800 rounded-full"
            initial={{ height: '0%' }}
            animate={isDownloading ? { height: '100%' } : { height: '0%' }}
            transition={{ duration: 3, ease: 'easeInOut' }}
            style={{ zIndex: 1 }}
          />

          {/* Download icon */}
          <motion.svg
            className="w-6 h-6 text-white z-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={{ opacity: 1 }}
            animate={{ opacity: isDownloading ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 19V5m0 14-4-4m4 4 4-4"
            />
          </motion.svg>

          {/* Loading block */}
          <motion.div
            className="w-4 h-4 rounded-full bg-white absolute z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: isDownloading ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>

        {/* Download label */}
        <AnimatePresence>
          {!isDownloading && (
            <motion.span
              className="ml-3 text-white text-base select-none z-10"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              Download
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};


code.demo.1759512248783.tsx
import { DownloadButton } from "@/components/ui/download-animation";

export default function DemoOne() {
  return <DownloadButton />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/download-animation.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const DownloadButton = ({ onDownload }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadClick = () => {
    if (isDownloading) return;

    setIsDownloading(true);
    onDownload?.();

    // Simulate download
    setTimeout(() => {
      setIsDownloading(false);
    }, 3500);
  };

  return (
    <div className="flex justify-center items-center w-full">
      <motion.button
        onClick={handleDownloadClick}
        className={`relative flex items-center border-2 rounded-full overflow-hidden transition-all
          ${isDownloading ? 'cursor-wait border-blue-500' : 'cursor-pointer border-blue-500'}`}
        animate={{
          width: isDownloading ? 56 : 160,
          borderRadius: isDownloading ? '9999px' : '9999px' // Keeps full rounding
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{ minWidth: isDownloading ? '56px' : '160px', height: 56 }}
      >
        {/* Spinner animation inside circle */}
        <AnimatePresence>
          {isDownloading && (
            <motion.div
              className="absolute inset-0 w-2 h-2 bg-white rounded-full m-auto z-20"
              initial={{ opacity: 1 }}
              animate={{
                rotate: 360,
                x: [0, 27, 0, -27, 0],
                y: [0, -27, 0, 27, 0]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 3,
                ease: 'easeInOut',
                times: [0, 0.25, 0.5, 0.75, 1]
              }}
            />
          )}
        </AnimatePresence>

        {/* Circular button with icon */}
        <motion.div
          className="h-14 w-14 rounded-full bg-blue-500 flex justify-center items-center relative shadow-lg z-10"
          animate={isDownloading ? {
            rotate: 180,
            scale: [0.95, 1, 0.95],
          } : {}}
          transition={{
            duration: isDownloading ? 1 : 0.4,
            times: isDownloading ? [0, 0.7, 1] : undefined
          }}
        >
          {/* Progress fill */}
          <motion.div
            className="absolute top-0 left-0 w-full bg-blue-800 rounded-full"
            initial={{ height: '0%' }}
            animate={isDownloading ? { height: '100%' } : { height: '0%' }}
            transition={{ duration: 3, ease: 'easeInOut' }}
            style={{ zIndex: 1 }}
          />

          {/* Download icon */}
          <motion.svg
            className="w-6 h-6 text-white z-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={{ opacity: 1 }}
            animate={{ opacity: isDownloading ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 19V5m0 14-4-4m4 4 4-4"
            />
          </motion.svg>

          {/* Loading block */}
          <motion.div
            className="w-4 h-4 rounded-full bg-white absolute z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: isDownloading ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>

        {/* Download label */}
        <AnimatePresence>
          {!isDownloading && (
            <motion.span
              className="ml-3 text-white text-base select-none z-10"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              Download
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

```

Install NPM dependencies:
```bash
framer-motion
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
