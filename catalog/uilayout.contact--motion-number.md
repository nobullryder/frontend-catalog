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
motion-number.tsx
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


code.demo.1749987136925.tsx
'use client';
import NumberFlow from '@number-flow/react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import React, { useState } from 'react';

const UpvoteDownvote: React.FC = () => {
  const [votes, setVotes] = useState(14); // Initial votes
  const [activeVote, setActiveVote] = useState<'up' | 'down' | null>(null); // Track active arrow

  const handleVote = (state: 'up' | 'down') => {
    if (state === 'up') {
      setVotes(votes + 1);
      setActiveVote(state);
    } else {
      setVotes(votes - 1);
      setActiveVote(state);
    }
  };

  return (
    <div
      className={`flex flex-col items-center gap-2 p-4   border rounded-xl shadow-lg w-fit mx-auto ${
        activeVote === 'up'
          ? 'dark:bg-green-950 bg-green-300 border-green-600 text-white'
          : activeVote === 'down'
            ? 'dark:bg-red-950 bg-red-300 border-red-600 text-white'
            : ' bg-primary-foreground text-primary'
      }`}
    >
      <div className='  text-lg font-medium'>
        <NumberFlow value={votes} format={{ notation: 'compact' }} /> Upvotes
      </div>

      <div className='flex items-center gap-4'>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => handleVote('up')}
          className={`p-2 rounded-full text-white ${
            activeVote === 'up' ? 'bg-green-500 ' : ' bg-black '
          } transition-colors`}
        >
          <ArrowUp size={24} />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => handleVote('down')}
          className={`p-2 rounded-full text-white ${
            activeVote === 'down' ? 'bg-red-500 ' : ' bg-black '
          } transition-colors`}
        >
          <ArrowDown size={24} />
        </motion.button>
      </div>
    </div>
  );
};

export default UpvoteDownvote;

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/motion-number.tsx
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
