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
input-with-tags.tsx

"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Tag {
text: string;
onRemove: () => void;
}

const Tag = ({ text, onRemove }: Tag) => {
return (
  <motion.span
    initial={{ opacity: 0, scale: 0.8, y: -10, filter: "blur(10px)" }}
    animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
    exit={{ opacity: 0, scale: 0.8, y: -10, filter: "blur(10px)" }}
    transition={{
      duration: 0.4,
      ease: "circInOut",
      type: "spring",
    }}
    className="bg-[#11111198] px-2 py-1 rounded-xl text-sm flex items-center gap-1 shadow-[0_0_10px_rgba(0,0,0,0.2)] backdrop-blur-sm text-white"
  >
    {text}
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Button
        onClick={onRemove}
        className="bg-transparent text-xs h-fit flex items-center rounded-full justify-center text-white p-1 hover:bg-[#11111136]"
      >
        <X className="w-4 h-4" />
      </Button>
    </motion.div>
  </motion.span>
);
};

interface InputWithTagsProps {
placeholder?: string;
className?: string;
limit?: number;
}

const InputWithTags = ({
placeholder,
className,
limit = 10,
}: InputWithTagsProps) => {
const [tags, setTags] = useState<string[]>([]);
const [inputValue, setInputValue] = useState("");

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter" && inputValue.trim()) {
    e.preventDefault();
    if (!limit || tags.length < limit) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  }
};

const removeTag = (indexToRemove: number) => {
  setTags(tags.filter((_, index) => index !== indexToRemove));
};

return (
  <div className={cn("flex flex-col gap-2 max-w-xl w-full", className)}>
    <motion.div
      initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
    >
      <motion.input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "Type something and press Enter..."}
        whileHover={{ scale: 1.01, backgroundColor: "#111111d1" }}
        whileTap={{ scale: 0.99, backgroundColor: "#11111198" }}
        className="w-full px-4 py-2 bg-[#11111198] shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none rounded-xl backdrop-blur-sm text-white disabled:opacity-50 disabled:cursor-not-allowed outline-none ring-0"
        disabled={limit ? tags.length >= limit : false}
      />
    </motion.div>
    <div className="flex flex-wrap gap-2">
      <AnimatePresence>
        {tags.map((tag, index) => (
          <Tag key={index} text={tag} onRemove={() => removeTag(index)} />
        ))}
      </AnimatePresence>
    </div>
  </div>
);
};

export { InputWithTags };




code.demo.tsx
import { InputWithTags } from "@/components/ui/input-with-tags"

const InputWithTagsDemo = () => {
    return <InputWithTags/>
}

export { InputWithTagsDemo }
```

Copy-paste these files for dependencies:
```tsx
/components/ui/input-with-tags.tsx

"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Tag {
text: string;
onRemove: () => void;
}

const Tag = ({ text, onRemove }: Tag) => {
return (
  <motion.span
    initial={{ opacity: 0, scale: 0.8, y: -10, filter: "blur(10px)" }}
    animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
    exit={{ opacity: 0, scale: 0.8, y: -10, filter: "blur(10px)" }}
    transition={{
      duration: 0.4,
      ease: "circInOut",
      type: "spring",
    }}
    className="bg-[#11111198] px-2 py-1 rounded-xl text-sm flex items-center gap-1 shadow-[0_0_10px_rgba(0,0,0,0.2)] backdrop-blur-sm text-white"
  >
    {text}
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Button
        onClick={onRemove}
        className="bg-transparent text-xs h-fit flex items-center rounded-full justify-center text-white p-1 hover:bg-[#11111136]"
      >
        <X className="w-4 h-4" />
      </Button>
    </motion.div>
  </motion.span>
);
};

interface InputWithTagsProps {
placeholder?: string;
className?: string;
limit?: number;
}

const InputWithTags = ({
placeholder,
className,
limit = 10,
}: InputWithTagsProps) => {
const [tags, setTags] = useState<string[]>([]);
const [inputValue, setInputValue] = useState("");

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter" && inputValue.trim()) {
    e.preventDefault();
    if (!limit || tags.length < limit) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  }
};

const removeTag = (indexToRemove: number) => {
  setTags(tags.filter((_, index) => index !== indexToRemove));
};

return (
  <div className={cn("flex flex-col gap-2 max-w-xl w-full", className)}>
    <motion.div
      initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
    >
      <motion.input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "Type something and press Enter..."}
        whileHover={{ scale: 1.01, backgroundColor: "#111111d1" }}
        whileTap={{ scale: 0.99, backgroundColor: "#11111198" }}
        className="w-full px-4 py-2 bg-[#11111198] shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none rounded-xl backdrop-blur-sm text-white disabled:opacity-50 disabled:cursor-not-allowed outline-none ring-0"
        disabled={limit ? tags.length >= limit : false}
      />
    </motion.div>
    <div className="flex flex-wrap gap-2">
      <AnimatePresence>
        {tags.map((tag, index) => (
          <Tag key={index} text={tag} onRemove={() => removeTag(index)} />
        ))}
      </AnimatePresence>
    </div>
  </div>
);
};

export { InputWithTags };



```

Install NPM dependencies:
```bash
lucide-react, framer-motion
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
