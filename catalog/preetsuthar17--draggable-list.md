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
draggable-list.tsx
"use client";
 
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
 
const cn = (...args: any[]) => {
  return twMerge(clsx(args));
};
 
export interface DraggableItemProps {
  id: string;
  content: React.JSX.Element;
}
 
export interface DraggableListProps {
  items: DraggableItemProps[];
  onChange?: (items: DraggableItemProps[]) => void;
  className?: string;
}
 
export const DraggableList: React.FC<DraggableListProps> = ({
  items: initialItems,
  onChange,
  className,
}) => {
  const [items, setItems] = useState(initialItems);
  const [draggedItem, setDraggedItem] = useState<DraggableItemProps | null>(
    null
  );
  const [dragOverItemId, setDragOverItemId] = useState<string | number | null>(
    null
  );
 
  const handleDragStart = (item: DraggableItemProps) => {
    setDraggedItem(item);
  };
 
  const handleDragOver = (e: React.DragEvent, itemId: string | number) => {
    e.preventDefault();
    setDragOverItemId(itemId);
  };
 
  const handleDragEnd = () => {
    if (!draggedItem || !dragOverItemId) {
      setDraggedItem(null);
      setDragOverItemId(null);
      return;
    }
 
    const newItems = [...items];
    const draggedIndex = items.findIndex((item) => item.id === draggedItem.id);
    const dropIndex = items.findIndex((item) => item.id === dragOverItemId);
 
    newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);
 
    setItems(newItems);
    onChange?.(newItems);
    setDraggedItem(null);
    setDragOverItemId(null);
  };
 
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            draggable
            onDragStart={() => handleDragStart(item)}
            onDragOver={(e) => handleDragOver(e, item.id)}
            onDragEnd={handleDragEnd}
            className={cn(
              "cursor-grab rounded-lg border bg-secondary/50 border-primary/10 p-4 shadow-xs transition-colors",
              dragOverItemId === item.id &&
                "border-2 border-orange bg-secondary/40",
              draggedItem?.id === item.id &&
                "border-2 border-gray-400 opacity-50"
            )}
          >
            {item.content}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
 
export const DraggableItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="text-gray-400">≡</div>
      {children}
    </div>
  );
};

code.demo.tsx
import { DraggableList,DraggableItem } from "@/components/ui/draggable-list"
import { useState } from "react";

const Demo = () => {
  const [items, setItems] = useState([
    { id: "1", content: <DraggableItem>First Item</DraggableItem> },
    { id: "2", content: <DraggableItem>Second Item</DraggableItem> },
    { id: "3", content: <DraggableItem>Third Item</DraggableItem> },
  ]);
 
  const handleReorder = (newItems: DraggableItemProps[]) => {
    setItems(newItems);
    // Do something with the new order
  };
 
  return (
    <DraggableList
      items={items}
      onChange={handleReorder}
      className="max-w-sm w-full"
    />
  );
}

export {Demo}
```

Copy-paste these files for dependencies:
```tsx
/components/ui/draggable-list.tsx
"use client";
 
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
 
const cn = (...args: any[]) => {
  return twMerge(clsx(args));
};
 
export interface DraggableItemProps {
  id: string;
  content: React.JSX.Element;
}
 
export interface DraggableListProps {
  items: DraggableItemProps[];
  onChange?: (items: DraggableItemProps[]) => void;
  className?: string;
}
 
export const DraggableList: React.FC<DraggableListProps> = ({
  items: initialItems,
  onChange,
  className,
}) => {
  const [items, setItems] = useState(initialItems);
  const [draggedItem, setDraggedItem] = useState<DraggableItemProps | null>(
    null
  );
  const [dragOverItemId, setDragOverItemId] = useState<string | number | null>(
    null
  );
 
  const handleDragStart = (item: DraggableItemProps) => {
    setDraggedItem(item);
  };
 
  const handleDragOver = (e: React.DragEvent, itemId: string | number) => {
    e.preventDefault();
    setDragOverItemId(itemId);
  };
 
  const handleDragEnd = () => {
    if (!draggedItem || !dragOverItemId) {
      setDraggedItem(null);
      setDragOverItemId(null);
      return;
    }
 
    const newItems = [...items];
    const draggedIndex = items.findIndex((item) => item.id === draggedItem.id);
    const dropIndex = items.findIndex((item) => item.id === dragOverItemId);
 
    newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);
 
    setItems(newItems);
    onChange?.(newItems);
    setDraggedItem(null);
    setDragOverItemId(null);
  };
 
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            draggable
            onDragStart={() => handleDragStart(item)}
            onDragOver={(e) => handleDragOver(e, item.id)}
            onDragEnd={handleDragEnd}
            className={cn(
              "cursor-grab rounded-lg border bg-secondary/50 border-primary/10 p-4 shadow-xs transition-colors",
              dragOverItemId === item.id &&
                "border-2 border-orange bg-secondary/40",
              draggedItem?.id === item.id &&
                "border-2 border-gray-400 opacity-50"
            )}
          >
            {item.content}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
 
export const DraggableItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="text-gray-400">≡</div>
      {children}
    </div>
  );
};
```

Install NPM dependencies:
```bash
clsx, motion, tailwind-merge
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
