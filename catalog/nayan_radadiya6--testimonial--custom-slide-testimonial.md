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
testimonial.tsx
'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TestimonialData = {
  id?: React.Key;
  avatar?: string; // img url
  name?: string;
  role?: string;
  quote?: string;
  accent?: string; // e.g. '#3b82f6' or 'rgb(...)'
  // Supply your own node instead of quote card (gets active state + index)
  render?: (ctx: { active: boolean; index: number }) => React.ReactNode;
};

export type TestimonialCarouselProps = {
  items: TestimonialData[];

  /** visual variant for default renderer */
  variant?: 'card' | 'minimal';
  /** looping & autoplay */
  loop?: boolean;
  autoplay?: boolean;
  autoplayMs?: number;

  /** controls */
  showArrows?: boolean;
  showDots?: boolean;
  allowKeyboard?: boolean;

  /** callbacks */
  initialIndex?: number;
  onIndexChange?: (index: number) => void;

  /** slot-style class overrides */
  className?: string; // wrapper
  contentClassName?: string; // inner panel
  cardClassName?: string;
  avatarClassName?: string;
  nameClassName?: string;
  roleClassName?: string;
  quoteClassName?: string;

  /** aria */
  ariaLabel?: string;
};

export function TestimonialCarousel({
  items,
  variant = 'card',
  loop = true,
  autoplay = false,
  autoplayMs = 5000,
  showArrows = true,
  showDots = true,
  allowKeyboard = true,
  initialIndex = 0,
  onIndexChange,
  className,
  contentClassName,
  cardClassName,
  avatarClassName,
  nameClassName,
  roleClassName,
  quoteClassName,
  ariaLabel = 'Testimonials',
}: TestimonialCarouselProps) {
  const count = items.length;
  const [index, setIndex] = React.useState(
    Math.min(Math.max(initialIndex, 0), Math.max(count - 1, 0))
  );
  const active = ((i: number) => ((i % count) + count) % count)(index); // safe modulo

  const go = React.useCallback(
    (delta: number) => {
      setIndex((i) => {
        const next = i + delta;
        if (!loop) {
          const clamped = Math.min(Math.max(next, 0), count - 1);
          onIndexChange?.(clamped);
          return clamped;
        }
        const wrapped = ((next % count) + count) % count;
        onIndexChange?.(wrapped);
        return wrapped;
      });
    },
    [count, loop, onIndexChange]
  );

  // autoplay
  React.useEffect(() => {
    if (!autoplay || count <= 1) return;
    const id = setInterval(() => go(1), autoplayMs);
    return () => clearInterval(id);
  }, [autoplay, autoplayMs, count, go]);

  // keyboard
  React.useEffect(() => {
    if (!allowKeyboard) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [allowKeyboard, go]);

  return (
    <section
      aria-roledescription='carousel'
      aria-label={ariaLabel}
      className={cn(
        'relative w-full overflow-hidden rounded-2xl bg-white/60 p-6 shadow-sm ring-1 ring-zinc-200 backdrop-blur dark:bg-zinc-900/40 dark:ring-zinc-800',
        className
      )}
    >
      {/* arrows */}
      {showArrows && count > 1 && (
        <>
          <button
            type='button'
            onClick={() => go(-1)}
            aria-label='Previous testimonial'
            className='absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-zinc-500 ring-1 ring-zinc-200 transition hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-800'
          >
            <ChevronLeft className='h-5 w-5' />
          </button>
          <button
            type='button'
            onClick={() => go(1)}
            aria-label='Next testimonial'
            className='absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-zinc-500 ring-1 ring-zinc-200 transition hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-800'
          >
            <ChevronRight className='h-5 w-5' />
          </button>
        </>
      )}

      {/* slide */}
      <div className={cn('relative mx-auto max-w-3xl', contentClassName)}>
        <AnimatePresence mode='popLayout' initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className='grid place-items-center'
            role='group'
            aria-roledescription='slide'
            aria-label={`${active + 1} of ${count}`}
          >
            {/* custom renderer? */}
            {typeof items[active]?.render === 'function' ? (
              items[active].render!({ active: true, index: active })
            ) : (
              <DefaultCard
                item={items[active]}
                variant={variant}
                className={cardClassName}
                avatarClassName={avatarClassName}
                nameClassName={nameClassName}
                roleClassName={roleClassName}
                quoteClassName={quoteClassName}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* dots */}
      {showDots && count > 1 && (
        <div className='mt-6 flex items-center justify-center gap-2'>
          {items.map((_, i) => {
            const is = i === active;
            return (
              <button
                key={i}
                type='button'
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  'h-2.5 w-2.5 rounded-full ring-1 ring-zinc-300 transition dark:ring-zinc-700',
                  is
                    ? 'bg-zinc-900 dark:bg-zinc-100'
                    : 'bg-zinc-300/70 dark:bg-zinc-700/70'
                )}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

/* ---------- default card renderer ---------- */

function DefaultCard({
  item,
  variant,
  className,
  avatarClassName,
  nameClassName,
  roleClassName,
  quoteClassName,
}: {
  item: TestimonialData;
  variant: 'card' | 'minimal';
  className?: string;
  avatarClassName?: string;
  nameClassName?: string;
  roleClassName?: string;
  quoteClassName?: string;
}) {
  const accent = item.accent ?? '#3b82f6'; // tailwind blue-500
  const ring = { boxShadow: `0 0 0 3px ${accent}22` };

  return (
    <article
      className={cn(
        'grid place-items-center text-center',
        variant === 'card' && 'px-4 py-3',
        className
      )}
    >
      {/* avatar */}
      {(item.avatar || item.name) && (
        <div className='relative mb-3'>
          {item.avatar ? (
            <img
              src={item.avatar}
              alt={item.name ?? 'avatar'}
              className={cn(
                'h-16 w-16 rounded-full object-cover ring-2 ring-white dark:ring-zinc-900',
                avatarClassName
              )}
              style={ring}
              loading='lazy'
            />
          ) : (
            <div
              className={cn(
                'grid h-16 w-16 place-items-center rounded-full bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
                avatarClassName
              )}
              style={ring}
            >
              <span className='text-lg font-semibold'>
                {item.name?.[0] ?? '?'}
              </span>
            </div>
          )}
          {/* decorative quote badge */}
          <span
            className='absolute -left-2 -top-2 grid h-7 w-7 place-items-center rounded-full text-white shadow-sm'
            style={{ backgroundColor: accent }}
            aria-hidden
          >
            &quot;
          </span>
        </div>
      )}

      {/* name / role */}
      {item.name && (
        <h3
          className={cn('text-xl font-semibold tracking-tight', nameClassName)}
        >
          {item.name}
        </h3>
      )}
      {item.role && (
        <p
          className={cn(
            'mb-3 text-xs font-semibold uppercase tracking-wider text-[color:var(--role-color,#4f46e5)]',
            roleClassName
          )}
          style={{ ['--role-color' as any]: accent }}
        >
          {item.role}
        </p>
      )}

      {/* quote */}
      {item.quote && (
        <p
          className={cn(
            'text-balance max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-300',
            quoteClassName
          )}
        >
          {item.quote}
        </p>
      )}
    </article>
  );
}


code.demo.1756507308457.tsx
'use client';
import {
  TestimonialCarousel,
  TestimonialData,
} from '@/components/ui/testimonial';

const items: TestimonialData[] = [
  {
    render: () => (
      <div className='grid place-items-center gap-3'>
        <div className='rounded-full bg-indigo-600/10 px-3 py-1 text-xs font-semibold text-indigo-600'>
          Case Study
        </div>
        <blockquote className='max-w-xl text-center text-base leading-7 text-zinc-700 dark:text-zinc-300'>
          “This slide is fully custom. You can render forms, CTA buttons,
          anything.”
        </blockquote>
        <button className='mt-2 rounded-full border border-indigo-500 px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 dark:hover:bg-zinc-800'>
          Read story
        </button>
      </div>
    ),
  },
  // … mix in normal items too
  {
    avatar: 'https://i.pravatar.cc/160?img=18',
    name: 'Jai Patel',
    role: 'Engineer',
    quote: 'API surface is tiny, but you can override everything.',
    accent: '#22c55e',
  },
];

export default function TestimonialCustom() {
  return (
    <div className='mx-auto max-w-5xl p-6'>
      <TestimonialCarousel
        items={items}
        variant='minimal'
        showDots
        showArrows
        loop
      />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/testimonial.tsx
'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TestimonialData = {
  id?: React.Key;
  avatar?: string; // img url
  name?: string;
  role?: string;
  quote?: string;
  accent?: string; // e.g. '#3b82f6' or 'rgb(...)'
  // Supply your own node instead of quote card (gets active state + index)
  render?: (ctx: { active: boolean; index: number }) => React.ReactNode;
};

export type TestimonialCarouselProps = {
  items: TestimonialData[];

  /** visual variant for default renderer */
  variant?: 'card' | 'minimal';
  /** looping & autoplay */
  loop?: boolean;
  autoplay?: boolean;
  autoplayMs?: number;

  /** controls */
  showArrows?: boolean;
  showDots?: boolean;
  allowKeyboard?: boolean;

  /** callbacks */
  initialIndex?: number;
  onIndexChange?: (index: number) => void;

  /** slot-style class overrides */
  className?: string; // wrapper
  contentClassName?: string; // inner panel
  cardClassName?: string;
  avatarClassName?: string;
  nameClassName?: string;
  roleClassName?: string;
  quoteClassName?: string;

  /** aria */
  ariaLabel?: string;
};

export function TestimonialCarousel({
  items,
  variant = 'card',
  loop = true,
  autoplay = false,
  autoplayMs = 5000,
  showArrows = true,
  showDots = true,
  allowKeyboard = true,
  initialIndex = 0,
  onIndexChange,
  className,
  contentClassName,
  cardClassName,
  avatarClassName,
  nameClassName,
  roleClassName,
  quoteClassName,
  ariaLabel = 'Testimonials',
}: TestimonialCarouselProps) {
  const count = items.length;
  const [index, setIndex] = React.useState(
    Math.min(Math.max(initialIndex, 0), Math.max(count - 1, 0))
  );
  const active = ((i: number) => ((i % count) + count) % count)(index); // safe modulo

  const go = React.useCallback(
    (delta: number) => {
      setIndex((i) => {
        const next = i + delta;
        if (!loop) {
          const clamped = Math.min(Math.max(next, 0), count - 1);
          onIndexChange?.(clamped);
          return clamped;
        }
        const wrapped = ((next % count) + count) % count;
        onIndexChange?.(wrapped);
        return wrapped;
      });
    },
    [count, loop, onIndexChange]
  );

  // autoplay
  React.useEffect(() => {
    if (!autoplay || count <= 1) return;
    const id = setInterval(() => go(1), autoplayMs);
    return () => clearInterval(id);
  }, [autoplay, autoplayMs, count, go]);

  // keyboard
  React.useEffect(() => {
    if (!allowKeyboard) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [allowKeyboard, go]);

  return (
    <section
      aria-roledescription='carousel'
      aria-label={ariaLabel}
      className={cn(
        'relative w-full overflow-hidden rounded-2xl bg-white/60 p-6 shadow-sm ring-1 ring-zinc-200 backdrop-blur dark:bg-zinc-900/40 dark:ring-zinc-800',
        className
      )}
    >
      {/* arrows */}
      {showArrows && count > 1 && (
        <>
          <button
            type='button'
            onClick={() => go(-1)}
            aria-label='Previous testimonial'
            className='absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-zinc-500 ring-1 ring-zinc-200 transition hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-800'
          >
            <ChevronLeft className='h-5 w-5' />
          </button>
          <button
            type='button'
            onClick={() => go(1)}
            aria-label='Next testimonial'
            className='absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-zinc-500 ring-1 ring-zinc-200 transition hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-800'
          >
            <ChevronRight className='h-5 w-5' />
          </button>
        </>
      )}

      {/* slide */}
      <div className={cn('relative mx-auto max-w-3xl', contentClassName)}>
        <AnimatePresence mode='popLayout' initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className='grid place-items-center'
            role='group'
            aria-roledescription='slide'
            aria-label={`${active + 1} of ${count}`}
          >
            {/* custom renderer? */}
            {typeof items[active]?.render === 'function' ? (
              items[active].render!({ active: true, index: active })
            ) : (
              <DefaultCard
                item={items[active]}
                variant={variant}
                className={cardClassName}
                avatarClassName={avatarClassName}
                nameClassName={nameClassName}
                roleClassName={roleClassName}
                quoteClassName={quoteClassName}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* dots */}
      {showDots && count > 1 && (
        <div className='mt-6 flex items-center justify-center gap-2'>
          {items.map((_, i) => {
            const is = i === active;
            return (
              <button
                key={i}
                type='button'
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  'h-2.5 w-2.5 rounded-full ring-1 ring-zinc-300 transition dark:ring-zinc-700',
                  is
                    ? 'bg-zinc-900 dark:bg-zinc-100'
                    : 'bg-zinc-300/70 dark:bg-zinc-700/70'
                )}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

/* ---------- default card renderer ---------- */

function DefaultCard({
  item,
  variant,
  className,
  avatarClassName,
  nameClassName,
  roleClassName,
  quoteClassName,
}: {
  item: TestimonialData;
  variant: 'card' | 'minimal';
  className?: string;
  avatarClassName?: string;
  nameClassName?: string;
  roleClassName?: string;
  quoteClassName?: string;
}) {
  const accent = item.accent ?? '#3b82f6'; // tailwind blue-500
  const ring = { boxShadow: `0 0 0 3px ${accent}22` };

  return (
    <article
      className={cn(
        'grid place-items-center text-center',
        variant === 'card' && 'px-4 py-3',
        className
      )}
    >
      {/* avatar */}
      {(item.avatar || item.name) && (
        <div className='relative mb-3'>
          {item.avatar ? (
            <img
              src={item.avatar}
              alt={item.name ?? 'avatar'}
              className={cn(
                'h-16 w-16 rounded-full object-cover ring-2 ring-white dark:ring-zinc-900',
                avatarClassName
              )}
              style={ring}
              loading='lazy'
            />
          ) : (
            <div
              className={cn(
                'grid h-16 w-16 place-items-center rounded-full bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
                avatarClassName
              )}
              style={ring}
            >
              <span className='text-lg font-semibold'>
                {item.name?.[0] ?? '?'}
              </span>
            </div>
          )}
          {/* decorative quote badge */}
          <span
            className='absolute -left-2 -top-2 grid h-7 w-7 place-items-center rounded-full text-white shadow-sm'
            style={{ backgroundColor: accent }}
            aria-hidden
          >
            &quot;
          </span>
        </div>
      )}

      {/* name / role */}
      {item.name && (
        <h3
          className={cn('text-xl font-semibold tracking-tight', nameClassName)}
        >
          {item.name}
        </h3>
      )}
      {item.role && (
        <p
          className={cn(
            'mb-3 text-xs font-semibold uppercase tracking-wider text-[color:var(--role-color,#4f46e5)]',
            roleClassName
          )}
          style={{ ['--role-color' as any]: accent }}
        >
          {item.role}
        </p>
      )}

      {/* quote */}
      {item.quote && (
        <p
          className={cn(
            'text-balance max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-300',
            quoteClassName
          )}
        >
          {item.quote}
        </p>
      )}
    </article>
  );
}

```

Install NPM dependencies:
```bash
motion, lucide-react
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
