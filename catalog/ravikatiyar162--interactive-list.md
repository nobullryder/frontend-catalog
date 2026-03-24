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
interactive-list.tsx
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

/**
 * @typedef InteractiveListItemProps
 * @property {string | number} id - A unique identifier for the item.
 * @property {React.ReactNode} icon - The icon to display for the item.
 * @property {string} title - The main title text.
 * @property {string} description - The secondary description text.
 */
export interface InteractiveListItemProps {
  id: string | number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

/**
 * @typedef InteractiveListTagProps
 * @property {string | number} id - A unique identifier for the tag.
 * @property {string} label - The text content of the tag.
 * @property {string} color - The background color for the tag (CSS hsl variable).
 */
export interface InteractiveListTagProps {
  id: string | number;
  label: string;
  color: string;
}

/**
 * @typedef InteractiveListProps
 * @property {string} title - The title for the list section (e.g., "Recent").
 * @property {string} actionText - Text for the clear/action button.
 * @property {() => void} onActionClick - Callback for the clear/action button.
 * @property {InteractiveListItemProps[]} items - Array of list items to display.
 * @property {(id: string | number) => void} onRemoveItem - Callback fired when an item's remove button is clicked.
 * @property {InteractiveListTagProps[]} [tags] - Optional array of tags to display below the list.
 * @property {(id: string | number) => void} [onRemoveTag] - Callback fired when a tag's remove button is clicked.
 * @property {string} [className] - Optional additional class names for the container.
 */
export interface InteractiveListProps {
  title: string;
  actionText: string;
  onActionClick: () => void;
  items: InteractiveListItemProps[];
  onRemoveItem: (id: string | number) => void;
  tags?: InteractiveListTagProps[];
  onRemoveTag?: (id: string | number) => void;
  className?: string;
}

const animationVariants = {
  initial: { opacity: 0, y: -20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, x: 20, scale: 0.95 },
  transition: { duration: 0.2, ease: 'easeOut' },
};

export function InteractiveList({
  title,
  actionText,
  onActionClick,
  items,
  onRemoveItem,
  tags = [],
  onRemoveTag,
  className,
}: InteractiveListProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <Button
          variant="link"
          className="h-auto p-0 text-sm text-primary"
          onClick={onActionClick}
          aria-label={actionText}
        >
          {actionText}
        </Button>
      </div>

      {/* List Items */}
      <div className="relative flex flex-col gap-1">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={animationVariants.initial}
              animate={animationVariants.animate}
              exit={animationVariants.exit}
              transition={animationVariants.transition}
              className="group relative flex items-center gap-4 p-2 rounded-lg hover:bg-accent"
              role="listitem"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                {item.icon}
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium text-card-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
                onClick={() => onRemoveItem(item.id)}
                aria-label={`Remove ${item.title}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Tags Section */}
      {tags.length > 0 && onRemoveTag && (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
          <AnimatePresence>
            {tags.map((tag) => (
              <motion.div
                key={tag.id}
                layout
                initial={animationVariants.initial}
                animate={animationVariants.animate}
                exit={animationVariants.exit}
                transition={animationVariants.transition}
                className="flex items-center gap-1.5 pl-3 pr-1.5 py-1 text-xs font-medium rounded-full"
                style={{
                  backgroundColor: `hsl(${tag.color})`,
                  color: 'hsl(var(--primary-foreground))',
                }}
              >
                {tag.label}
                <button
                  onClick={() => onRemoveTag(tag.id)}
                  className="flex items-center justify-center h-4 w-4 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
                  aria-label={`Remove tag ${tag.label}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

code.demo.1758205658138.tsx
import * as React from 'react';
import { Book, Settings, LayoutGrid, Search } from 'lucide-react';
import { InteractiveList } from '@/components/ui/interactive-list';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// --- Initial data for the demo ---
const initialItems = [
  {
    id: 1,
    icon: <LayoutGrid className="h-5 w-5" />,
    title: 'Browse & Discover',
    description: 'Search features, filters, bookmarks.',
  },
  {
    id: 2,
    icon: <Book className="h-5 w-5" />,
    title: 'Guided Tour & Tutorial',
    description: 'Account setup, onboarding, registration.',
  },
  {
    id: 3,
    icon: <Settings className="h-5 w-5" />,
    title: 'Settings & Preferences',
    description: 'Profiles, settings, dark-mode switch.',
  },
];

const initialTags = [
  { id: 'cat', label: 'Categories', color: 'var(--orange-9)' }, // Using a placeholder for brand colors
  { id: 'dia', label: 'Dialog', color: 'var(--sand-9)' },
  { id: 'gla', label: 'Glass', color: 'var(--violet-9)' },
];

// Assuming you have these colors in your globals.css
// :root {
//   --orange-9: 24 9.8% 30%; /* Example dark theme color */
//   --sand-9: 38 6.9% 48.2%;
//   --violet-9: 262.1 83.3% 57.8%;
// }

export default function InteractiveListDemo() {
  const [items, setItems] = React.useState(initialItems);
  const [tags, setTags] = React.useState(initialTags);

  const handleRemoveItem = (id: string | number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleRemoveTag = (id: string | number) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
  };

  const handleClearAll = () => {
    setItems([]);
  };

  return (
    <div className="flex min-h-[450px] w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardHeader className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="UI Elements, Flows..."
              className="w-full rounded-lg pl-9"
              aria-label="Search"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <InteractiveList
            title="Recent"
            actionText="Clear all"
            onActionClick={handleClearAll}
            items={items}
            onRemoveItem={handleRemoveItem}
            tags={tags}
            onRemoveTag={handleRemoveTag}
          />
        </CardContent>
      </Card>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/interactive-list.tsx
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

/**
 * @typedef InteractiveListItemProps
 * @property {string | number} id - A unique identifier for the item.
 * @property {React.ReactNode} icon - The icon to display for the item.
 * @property {string} title - The main title text.
 * @property {string} description - The secondary description text.
 */
export interface InteractiveListItemProps {
  id: string | number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

/**
 * @typedef InteractiveListTagProps
 * @property {string | number} id - A unique identifier for the tag.
 * @property {string} label - The text content of the tag.
 * @property {string} color - The background color for the tag (CSS hsl variable).
 */
export interface InteractiveListTagProps {
  id: string | number;
  label: string;
  color: string;
}

/**
 * @typedef InteractiveListProps
 * @property {string} title - The title for the list section (e.g., "Recent").
 * @property {string} actionText - Text for the clear/action button.
 * @property {() => void} onActionClick - Callback for the clear/action button.
 * @property {InteractiveListItemProps[]} items - Array of list items to display.
 * @property {(id: string | number) => void} onRemoveItem - Callback fired when an item's remove button is clicked.
 * @property {InteractiveListTagProps[]} [tags] - Optional array of tags to display below the list.
 * @property {(id: string | number) => void} [onRemoveTag] - Callback fired when a tag's remove button is clicked.
 * @property {string} [className] - Optional additional class names for the container.
 */
export interface InteractiveListProps {
  title: string;
  actionText: string;
  onActionClick: () => void;
  items: InteractiveListItemProps[];
  onRemoveItem: (id: string | number) => void;
  tags?: InteractiveListTagProps[];
  onRemoveTag?: (id: string | number) => void;
  className?: string;
}

const animationVariants = {
  initial: { opacity: 0, y: -20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, x: 20, scale: 0.95 },
  transition: { duration: 0.2, ease: 'easeOut' },
};

export function InteractiveList({
  title,
  actionText,
  onActionClick,
  items,
  onRemoveItem,
  tags = [],
  onRemoveTag,
  className,
}: InteractiveListProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <Button
          variant="link"
          className="h-auto p-0 text-sm text-primary"
          onClick={onActionClick}
          aria-label={actionText}
        >
          {actionText}
        </Button>
      </div>

      {/* List Items */}
      <div className="relative flex flex-col gap-1">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={animationVariants.initial}
              animate={animationVariants.animate}
              exit={animationVariants.exit}
              transition={animationVariants.transition}
              className="group relative flex items-center gap-4 p-2 rounded-lg hover:bg-accent"
              role="listitem"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                {item.icon}
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium text-card-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
                onClick={() => onRemoveItem(item.id)}
                aria-label={`Remove ${item.title}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Tags Section */}
      {tags.length > 0 && onRemoveTag && (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
          <AnimatePresence>
            {tags.map((tag) => (
              <motion.div
                key={tag.id}
                layout
                initial={animationVariants.initial}
                animate={animationVariants.animate}
                exit={animationVariants.exit}
                transition={animationVariants.transition}
                className="flex items-center gap-1.5 pl-3 pr-1.5 py-1 text-xs font-medium rounded-full"
                style={{
                  backgroundColor: `hsl(${tag.color})`,
                  color: 'hsl(var(--primary-foreground))',
                }}
              >
                {tag.label}
                <button
                  onClick={() => onRemoveTag(tag.id)}
                  className="flex items-center justify-center h-4 w-4 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
                  aria-label={`Remove tag ${tag.label}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
```

Install NPM dependencies:
```bash
framer-motion, lucide-react
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
