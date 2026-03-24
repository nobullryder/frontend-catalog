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
magic-tree.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles, Star, Folder, File } from "lucide-react";

// -------- MagicNode Types --------
export type MagicNode = {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: MagicNode[];
  sparkle?: boolean;
};

export type MagicTreeProps = {
  data?: MagicNode[];
  onSelect?: (node: MagicNode) => void;
};

// -------- Default Data --------
const defaultMagicData: MagicNode[] = [
  {
    id: "1",
    name: "Magical Folder",
    type: "folder",
    sparkle: true,
    children: [
      { id: "1-1", name: "Shiny File.txt", type: "file", sparkle: true },
      { id: "1-2", name: "Hidden Gems", type: "folder", children: [{ id: "1-2-1", name: "Gem.js", type: "file", sparkle: true }] },
    ],
  },
  { id: "2", name: "Plain File.md", type: "file" },
];

export default function MagicTree({ data = defaultMagicData, onSelect }: MagicTreeProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderNodes = (nodes: MagicNode[], level = 0) => {
    return nodes.map((n) => (
      <div key={n.id} className="relative group">
        <motion.div
          className={cn(
            "flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer select-none",
            selected === n.id ? "bg-gray-100 dark:bg-gray-700 text-black dark:text-white" : "hover:bg-muted"
          )}
          style={{ paddingLeft: level * 16 + 8 }}
          onClick={() => {
            if (n.type === "folder") toggle(n.id);
            setSelected(n.id);
            onSelect?.(n);
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Icon for selected node */}
          {selected === n.id ? <Star size={16} className="text-yellow-400" /> : n.type === "folder" ? <Folder size={16} /> : <File size={14} />}
          <span className="flex-1 truncate">{n.name}</span>
        </motion.div>

        <AnimatePresence>
          {n.children && n.children.length > 0 && expanded[n.id] && (
            <motion.div
              role="group"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="pl-4 border-l border-purple-300"
            >
              {renderNodes(n.children, level + 1)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ));
  };

  return <div className="space-y-1">{renderNodes(data)}</div>;
}


code.demo.1757436146956.tsx
"use client";

import MagicTree from "@/components/ui/magic-tree";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";


// -------- Demo Data with More Stuff --------
const demoMagicData: MagicNode[] = [
  {
    id: "1",
    name: "Magical Folder",
    type: "folder",
    sparkle: true,
    children: [
      { id: "1-1", name: "Shiny File.txt", type: "file", sparkle: true },
      {
        id: "1-2",
        name: "Hidden Gems",
        type: "folder",
        children: [
          { id: "1-2-1", name: "Gem.js", type: "file", sparkle: true },
          { id: "1-2-2", name: "Magic.json", type: "file" },
        ],
      },
    ],
  },
  { id: "2", name: "Plain File.md", type: "file" },
  {
    id: "3",
    name: "Enchanted Scripts",
    type: "folder",
    children: [
      { id: "3-1", name: "spell.ts", type: "file", sparkle: true },
      { id: "3-2", name: "potion.py", type: "file" },
      {
        id: "3-3",
        name: "Artifacts",
        type: "folder",
        sparkle: true,
        children: [
          { id: "3-3-1", name: "wand.js", type: "file", sparkle: true },
          { id: "3-3-2", name: "cloak.css", type: "file" },
        ],
      },
    ],
  },
];


// -------- Demo Component --------
export default function MagicTreeDemo() {
  return (
    <Card className= "max-w-2xl mx-auto mt-6 border shadow-lg" >
    <CardHeader>
    <CardTitle>✨ Magic Tree Enhanced Demo ✨</CardTitle>
      < /CardHeader>
      < CardContent >
      <MagicTree data={ demoMagicData } onSelect = {(node) => console.log("Selected Node:", node)
} />
  < Separator className = "my-3" />
    <p className="text-sm text-muted-foreground" > This enhanced demo contains multiple layers, sparkles, and nested folders to showcase the unique interactive magic tree component.< /p>
      < /CardContent>
      < /Card>
);
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/magic-tree.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles, Star, Folder, File } from "lucide-react";

// -------- MagicNode Types --------
export type MagicNode = {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: MagicNode[];
  sparkle?: boolean;
};

export type MagicTreeProps = {
  data?: MagicNode[];
  onSelect?: (node: MagicNode) => void;
};

// -------- Default Data --------
const defaultMagicData: MagicNode[] = [
  {
    id: "1",
    name: "Magical Folder",
    type: "folder",
    sparkle: true,
    children: [
      { id: "1-1", name: "Shiny File.txt", type: "file", sparkle: true },
      { id: "1-2", name: "Hidden Gems", type: "folder", children: [{ id: "1-2-1", name: "Gem.js", type: "file", sparkle: true }] },
    ],
  },
  { id: "2", name: "Plain File.md", type: "file" },
];

export default function MagicTree({ data = defaultMagicData, onSelect }: MagicTreeProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderNodes = (nodes: MagicNode[], level = 0) => {
    return nodes.map((n) => (
      <div key={n.id} className="relative group">
        <motion.div
          className={cn(
            "flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer select-none",
            selected === n.id ? "bg-gray-100 dark:bg-gray-700 text-black dark:text-white" : "hover:bg-muted"
          )}
          style={{ paddingLeft: level * 16 + 8 }}
          onClick={() => {
            if (n.type === "folder") toggle(n.id);
            setSelected(n.id);
            onSelect?.(n);
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Icon for selected node */}
          {selected === n.id ? <Star size={16} className="text-yellow-400" /> : n.type === "folder" ? <Folder size={16} /> : <File size={14} />}
          <span className="flex-1 truncate">{n.name}</span>
        </motion.div>

        <AnimatePresence>
          {n.children && n.children.length > 0 && expanded[n.id] && (
            <motion.div
              role="group"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="pl-4 border-l border-purple-300"
            >
              {renderNodes(n.children, level + 1)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ));
  };

  return <div className="space-y-1">{renderNodes(data)}</div>;
}

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
