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
expandable-search-bar.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

import { cn } from '@/lib/utils';

export type ExpandableSearchBarProps = {
  expandDirection?: 'left' | 'right';
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  defaultOpen?: boolean;
  width?: number;
};

const COLLAPSED_SIZE = 40;

export default function ExpandableSearchBar(props: ExpandableSearchBarProps) {
  const {
    expandDirection = 'right',
    placeholder = 'Search...',
    onSearch,
    className = '',
    defaultOpen = false,
    width = 280,
  } = props;

  const [open, setOpen] = useState(defaultOpen);
  const [value, setValue] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const inputPadding = expandDirection === 'right' ? 'pl-11' : 'pl-10';
  const placeholderLeft = expandDirection === 'right' ? 'left-11' : 'left-10';

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (
        !containerRef.current?.contains(e.target as Node) &&
        open &&
        value === ''
      ) {
        setOpen(false);
        setValue('');
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open, value]);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(id);
    } else {
      setValue('');
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
  };

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (
        !containerRef.current?.contains(e.target as Node) &&
        open &&
        value === ''
      ) {
        setOpen(false);
        setValue('');
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open, value]);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(id);
    } else {
      setValue('');
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
        setValue('');
      }

      if (e.key === 'Enter' && open && value.trim()) {
        onSearch?.(value);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, value, onSearch]);

  return (
    <div
      ref={containerRef}
      className={cn('relative inline-block', className)}
      style={{ width: COLLAPSED_SIZE, height: COLLAPSED_SIZE }}
    >
      {/* Icon button (always visible, overlays left of bar) */}
      <button
        type='button'
        aria-label={open ? 'Close search' : 'Open search'}
        onClick={() => setOpen((s) => !s)}
        className={cn(
          'absolute inset-0 z-20 grid place-items-center rounded-full border',
          'bg-secondary text-foreground/80 hover:text-foreground transition-colors',
          'dark:bg-secondary dark:text-foreground/80 dark:hover:text-foreground'
        )}
      >
        {open ? <X className='size-4' /> : <Search className='size-4' />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.form
            key='form'
            onSubmit={handleSubmit}
            className={cn(
              'absolute top-0 h-10 rounded-full border bg-background text-foreground shadow-sm overflow-hidden flex items-center',
              expandDirection === 'left' ? 'right-0' : 'left-0'
            )}
            initial={{ width: COLLAPSED_SIZE, opacity: 0.98 }}
            animate={{ width: width, opacity: 1 }}
            exit={{
              width: COLLAPSED_SIZE,
              opacity: 0,
              transition: { type: 'spring', stiffness: 260, damping: 26 },
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            {/* Absolutely positioned left search icon */}
            <span className='absolute left-3 z-10 text-muted-foreground'>
              <Search className='size-4' />
            </span>

            <div className='relative flex-1 min-w-0 flex items-center'>
              <input
                ref={inputRef}
                type='text'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className={cn(
                  'w-full bg-transparent text-sm outline-none placeholder-transparent whitespace-nowrap overflow-x-auto',
                  inputPadding
                )}
              />

              <AnimatePresence>
                {open && !value && (
                  <motion.span
                    key='ph'
                    className={cn(
                      'pointer-events-none absolute top-1/2 -translate-y-1/2 w-full truncate text-muted-foreground/80 text-sm select-none text-left',
                      placeholderLeft
                    )}
                    initial={{ opacity: 1, x: 0 }}
                    animate={{ opacity: 0.9, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {placeholder}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence initial={false}>
              {open && (
                <motion.button
                  key='go'
                  type='submit'
                  className='h-10 w-10 grid place-items-center text-muted-foreground hover:text-foreground'
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  aria-label='Search'
                >
                  <Search className='size-4' />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}


code.demo.1758525431053.tsx
import ExpandableSearchBar from "@/components/ui/expandable-search-bar";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-16">
      {/* Expand right */}
      <div className="w-full max-w-xs sm:max-w-md flex flex-col items-center">
        <ExpandableSearchBar
          expandDirection="right"
          width={250}
          placeholder="Search right..."
          onSearch={q => console.log("search right", q)}
          className="w-full"
        />
      </div>

      {/* Expand left */}
      <div className="w-full max-w-xs sm:max-w-md flex flex-col items-center">
        <div className="w-full flex justify-end">
          <ExpandableSearchBar
            expandDirection="left"
            width={250}
            placeholder="Search left..."
            onSearch={q => console.log("search left", q)}
            className="w-full"
          />
        </div>
      </div>
    </main>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/expandable-search-bar.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

import { cn } from '@/lib/utils';

export type ExpandableSearchBarProps = {
  expandDirection?: 'left' | 'right';
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  defaultOpen?: boolean;
  width?: number;
};

const COLLAPSED_SIZE = 40;

export default function ExpandableSearchBar(props: ExpandableSearchBarProps) {
  const {
    expandDirection = 'right',
    placeholder = 'Search...',
    onSearch,
    className = '',
    defaultOpen = false,
    width = 280,
  } = props;

  const [open, setOpen] = useState(defaultOpen);
  const [value, setValue] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const inputPadding = expandDirection === 'right' ? 'pl-11' : 'pl-10';
  const placeholderLeft = expandDirection === 'right' ? 'left-11' : 'left-10';

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (
        !containerRef.current?.contains(e.target as Node) &&
        open &&
        value === ''
      ) {
        setOpen(false);
        setValue('');
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open, value]);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(id);
    } else {
      setValue('');
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
  };

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (
        !containerRef.current?.contains(e.target as Node) &&
        open &&
        value === ''
      ) {
        setOpen(false);
        setValue('');
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open, value]);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(id);
    } else {
      setValue('');
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
        setValue('');
      }

      if (e.key === 'Enter' && open && value.trim()) {
        onSearch?.(value);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, value, onSearch]);

  return (
    <div
      ref={containerRef}
      className={cn('relative inline-block', className)}
      style={{ width: COLLAPSED_SIZE, height: COLLAPSED_SIZE }}
    >
      {/* Icon button (always visible, overlays left of bar) */}
      <button
        type='button'
        aria-label={open ? 'Close search' : 'Open search'}
        onClick={() => setOpen((s) => !s)}
        className={cn(
          'absolute inset-0 z-20 grid place-items-center rounded-full border',
          'bg-secondary text-foreground/80 hover:text-foreground transition-colors',
          'dark:bg-secondary dark:text-foreground/80 dark:hover:text-foreground'
        )}
      >
        {open ? <X className='size-4' /> : <Search className='size-4' />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.form
            key='form'
            onSubmit={handleSubmit}
            className={cn(
              'absolute top-0 h-10 rounded-full border bg-background text-foreground shadow-sm overflow-hidden flex items-center',
              expandDirection === 'left' ? 'right-0' : 'left-0'
            )}
            initial={{ width: COLLAPSED_SIZE, opacity: 0.98 }}
            animate={{ width: width, opacity: 1 }}
            exit={{
              width: COLLAPSED_SIZE,
              opacity: 0,
              transition: { type: 'spring', stiffness: 260, damping: 26 },
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            {/* Absolutely positioned left search icon */}
            <span className='absolute left-3 z-10 text-muted-foreground'>
              <Search className='size-4' />
            </span>

            <div className='relative flex-1 min-w-0 flex items-center'>
              <input
                ref={inputRef}
                type='text'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className={cn(
                  'w-full bg-transparent text-sm outline-none placeholder-transparent whitespace-nowrap overflow-x-auto',
                  inputPadding
                )}
              />

              <AnimatePresence>
                {open && !value && (
                  <motion.span
                    key='ph'
                    className={cn(
                      'pointer-events-none absolute top-1/2 -translate-y-1/2 w-full truncate text-muted-foreground/80 text-sm select-none text-left',
                      placeholderLeft
                    )}
                    initial={{ opacity: 1, x: 0 }}
                    animate={{ opacity: 0.9, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {placeholder}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence initial={false}>
              {open && (
                <motion.button
                  key='go'
                  type='submit'
                  className='h-10 w-10 grid place-items-center text-muted-foreground hover:text-foreground'
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  aria-label='Search'
                >
                  <Search className='size-4' />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
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
