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
timeline-rail.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type AnchorOrButton =
  | ({
      href: string;
      onClick?: never;
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({
      href?: undefined;
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
    } & React.ButtonHTMLAttributes<HTMLButtonElement>);

export type TimelineItem = {
  /** Main small label shown near the dot (e.g., “headset”) */
  label?: string;
  /** Secondary label shown under the rail (e.g., “1910”) */
  caption?: string;
  /** Is this item emphasized (darker dot/rail before it) */
  active?: boolean;
} & AnchorOrButton;

export type TimelineRailProps = {
  /** Items in left→right order */
  items: TimelineItem[];

  /** Size density (dot size + vertical offsets) */
  size?: 'sm' | 'md';

  /** Visually emphasize the rail up to the last `active` item */
  emphasizeActiveTrail?: boolean;

  /** Angle for the top labels (deg). use 0 for straight text. */
  labelAngle?: number;

  /** Layout spacing between dots (Tailwind gap classes allowed). */
  gapClassName?: string;

  /** Visual customization */
  lineColorClass?: string; // rail color
  lineThickness?: number; // pixels
  dotClass?: string; // dot color/class
  dotActiveClass?: string; // active dot color/class

  /** Slots for precise control */
  className?: string; // root
  railClassName?: string; // the line element
  itemClassName?: string; // <li>
  labelClassName?: string; // top tiny label
  captionClassName?: string; // bottom caption

  /** Optional renderers to fully control content */
  renderLabel?: (item: TimelineItem, index: number) => React.ReactNode;
  renderCaption?: (item: TimelineItem, index: number) => React.ReactNode;
};

/** SRP: purely visual timeline rail. No data fetching or state kept here. */
export default function TimelineRail({
  items,
  size = 'md',
  emphasizeActiveTrail = true,
  labelAngle = 45,
  gapClassName = 'gap-14',
  lineColorClass = 'bg-zinc-300 dark:bg-zinc-700',
  lineThickness = 6,
  dotClass = 'bg-zinc-400 dark:bg-zinc-600',
  dotActiveClass = 'bg-zinc-900 dark:bg-zinc-100',
  className,
  railClassName,
  itemClassName,
  labelClassName,
  captionClassName,
  renderLabel,
  renderCaption,
}: TimelineRailProps) {
  // compute last active index (for emphasized rail)
  const lastActive = React.useMemo(() => {
    let idx = -1;
    items.forEach((it, i) => {
      if (it.active) idx = i;
    });
    return idx;
  }, [items]);

  const dotSize = size === 'sm' ? 14 : 18;
  const topOffset = size === 'sm' ? -22 : -26; // label y
  const captionOffset = size === 'sm' ? 18 : 22; // caption y

  return (
    <section aria-label='timeline' className={cn('relative w-full', className)}>
      {/* Rail */}
      <div
        aria-hidden
        className={cn('absolute left-0 right-0', railClassName)}
        style={{
          top: 0,
          height: lineThickness,
          transform: `translateY(${captionOffset * -1}px)`,
        }}
      >
        <div className={cn('h-full rounded-full', lineColorClass)} />

        {/* Emphasized segment up to last active */}
        {emphasizeActiveTrail && lastActive >= 0 && (
          <div
            className='absolute left-0 top-0 h-full rounded-full bg-zinc-900 dark:bg-zinc-100'
            style={{
              width: `${items.length > 1 ? (lastActive / (items.length - 1)) * 100 : 0}%`,
            }}
          />
        )}
      </div>

      {/* Dots row */}
      <ol
        className={cn(
          'relative flex items-center',
          gapClassName,
          // push the whole row down so captions can sit below the rail
          `pt-${Math.max(captionOffset / 4, 4)}`
        )}
        style={{ marginTop: captionOffset }} // create space for labels and captions
        role='list'
      >
        {items.map((item, i) => {
          const isActive = !!item.active;
          return (
            <li
              key={i}
              className={cn(
                'relative flex flex-col items-center',
                itemClassName
              )}
            >
              {/* diagonal label above */}
              {item.label && (
                <span
                  className={cn(
                    'absolute -top-3 -translate-y-full select-none text-[11px] text-zinc-500 dark:text-zinc-400',
                    labelClassName
                  )}
                  style={{
                    transform: `translateY(${topOffset}px) rotate(${-Math.abs(labelAngle)}deg)`,
                    transformOrigin: 'bottom center',
                  }}
                  aria-hidden
                >
                  {renderLabel ? renderLabel(item, i) : item.label}
                </span>
              )}

              {/* dot */}
              {item.href ? (
                <a
                  href={item.href}
                  className={cn(
                    'relative rounded-full ring-2 ring-black/5 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600',
                    isActive ? dotActiveClass : dotClass
                  )}
                  style={{ width: dotSize, height: dotSize }}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={item.label ?? item.caption ?? `Step ${i + 1}`}
                  title={item.label ?? item.caption}
                />
              ) : (
                <button
                  type='button'
                  onClick={item.onClick}
                  className={cn(
                    'relative rounded-full ring-2 ring-black/5 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600',
                    isActive ? dotActiveClass : dotClass
                  )}
                  style={{ width: dotSize, height: dotSize }}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={item.label ?? item.caption ?? `Step ${i + 1}`}
                  title={item.label ?? item.caption}
                />
              )}

              {/* caption below */}
              {item.caption && (
                <span
                  className={cn(
                    'absolute select-none text-xs text-zinc-600 dark:text-zinc-300',
                    captionClassName
                  )}
                  style={{ transform: `translateY(${captionOffset}px)` }}
                  aria-hidden
                >
                  {renderCaption ? renderCaption(item, i) : item.caption}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}


code.demo.1756507139926.tsx
'use client';
import { Rocket } from 'lucide-react';
import TimelineRail, { TimelineItem } from '@/components/ui/timeline-rail';

const steps: TimelineItem[] = [
  { label: 'Design', caption: 'Week 1', active: true, href: '#' },
  { label: 'Dev', caption: 'Week 2', active: true, href: '#' },
  { label: 'Test', caption: 'Week 3', href: '#' },
  { label: 'Launch', caption: 'Week 4', href: '#' },
];

export default function TrCustom() {
  return (
    <div className='max-w-4xl'>
      <TimelineRail
        items={steps}
        lineThickness={8}
        lineColorClass='bg-emerald-200 dark:bg-emerald-900/50'
        dotClass='bg-emerald-300 dark:bg-emerald-800'
        dotActiveClass='bg-emerald-600 dark:bg-emerald-400'
        renderLabel={(item, i) => (
          <span className='flex items-center gap-1'>
            {i === steps.length - 1 && <Rocket className='h-3 w-3' />}
            {item.label}
          </span>
        )}
        renderCaption={(item) => <time>{item.caption}</time>}
      />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/timeline-rail.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type AnchorOrButton =
  | ({
      href: string;
      onClick?: never;
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({
      href?: undefined;
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
    } & React.ButtonHTMLAttributes<HTMLButtonElement>);

export type TimelineItem = {
  /** Main small label shown near the dot (e.g., “headset”) */
  label?: string;
  /** Secondary label shown under the rail (e.g., “1910”) */
  caption?: string;
  /** Is this item emphasized (darker dot/rail before it) */
  active?: boolean;
} & AnchorOrButton;

export type TimelineRailProps = {
  /** Items in left→right order */
  items: TimelineItem[];

  /** Size density (dot size + vertical offsets) */
  size?: 'sm' | 'md';

  /** Visually emphasize the rail up to the last `active` item */
  emphasizeActiveTrail?: boolean;

  /** Angle for the top labels (deg). use 0 for straight text. */
  labelAngle?: number;

  /** Layout spacing between dots (Tailwind gap classes allowed). */
  gapClassName?: string;

  /** Visual customization */
  lineColorClass?: string; // rail color
  lineThickness?: number; // pixels
  dotClass?: string; // dot color/class
  dotActiveClass?: string; // active dot color/class

  /** Slots for precise control */
  className?: string; // root
  railClassName?: string; // the line element
  itemClassName?: string; // <li>
  labelClassName?: string; // top tiny label
  captionClassName?: string; // bottom caption

  /** Optional renderers to fully control content */
  renderLabel?: (item: TimelineItem, index: number) => React.ReactNode;
  renderCaption?: (item: TimelineItem, index: number) => React.ReactNode;
};

/** SRP: purely visual timeline rail. No data fetching or state kept here. */
export default function TimelineRail({
  items,
  size = 'md',
  emphasizeActiveTrail = true,
  labelAngle = 45,
  gapClassName = 'gap-14',
  lineColorClass = 'bg-zinc-300 dark:bg-zinc-700',
  lineThickness = 6,
  dotClass = 'bg-zinc-400 dark:bg-zinc-600',
  dotActiveClass = 'bg-zinc-900 dark:bg-zinc-100',
  className,
  railClassName,
  itemClassName,
  labelClassName,
  captionClassName,
  renderLabel,
  renderCaption,
}: TimelineRailProps) {
  // compute last active index (for emphasized rail)
  const lastActive = React.useMemo(() => {
    let idx = -1;
    items.forEach((it, i) => {
      if (it.active) idx = i;
    });
    return idx;
  }, [items]);

  const dotSize = size === 'sm' ? 14 : 18;
  const topOffset = size === 'sm' ? -22 : -26; // label y
  const captionOffset = size === 'sm' ? 18 : 22; // caption y

  return (
    <section aria-label='timeline' className={cn('relative w-full', className)}>
      {/* Rail */}
      <div
        aria-hidden
        className={cn('absolute left-0 right-0', railClassName)}
        style={{
          top: 0,
          height: lineThickness,
          transform: `translateY(${captionOffset * -1}px)`,
        }}
      >
        <div className={cn('h-full rounded-full', lineColorClass)} />

        {/* Emphasized segment up to last active */}
        {emphasizeActiveTrail && lastActive >= 0 && (
          <div
            className='absolute left-0 top-0 h-full rounded-full bg-zinc-900 dark:bg-zinc-100'
            style={{
              width: `${items.length > 1 ? (lastActive / (items.length - 1)) * 100 : 0}%`,
            }}
          />
        )}
      </div>

      {/* Dots row */}
      <ol
        className={cn(
          'relative flex items-center',
          gapClassName,
          // push the whole row down so captions can sit below the rail
          `pt-${Math.max(captionOffset / 4, 4)}`
        )}
        style={{ marginTop: captionOffset }} // create space for labels and captions
        role='list'
      >
        {items.map((item, i) => {
          const isActive = !!item.active;
          return (
            <li
              key={i}
              className={cn(
                'relative flex flex-col items-center',
                itemClassName
              )}
            >
              {/* diagonal label above */}
              {item.label && (
                <span
                  className={cn(
                    'absolute -top-3 -translate-y-full select-none text-[11px] text-zinc-500 dark:text-zinc-400',
                    labelClassName
                  )}
                  style={{
                    transform: `translateY(${topOffset}px) rotate(${-Math.abs(labelAngle)}deg)`,
                    transformOrigin: 'bottom center',
                  }}
                  aria-hidden
                >
                  {renderLabel ? renderLabel(item, i) : item.label}
                </span>
              )}

              {/* dot */}
              {item.href ? (
                <a
                  href={item.href}
                  className={cn(
                    'relative rounded-full ring-2 ring-black/5 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600',
                    isActive ? dotActiveClass : dotClass
                  )}
                  style={{ width: dotSize, height: dotSize }}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={item.label ?? item.caption ?? `Step ${i + 1}`}
                  title={item.label ?? item.caption}
                />
              ) : (
                <button
                  type='button'
                  onClick={item.onClick}
                  className={cn(
                    'relative rounded-full ring-2 ring-black/5 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600',
                    isActive ? dotActiveClass : dotClass
                  )}
                  style={{ width: dotSize, height: dotSize }}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={item.label ?? item.caption ?? `Step ${i + 1}`}
                  title={item.label ?? item.caption}
                />
              )}

              {/* caption below */}
              {item.caption && (
                <span
                  className={cn(
                    'absolute select-none text-xs text-zinc-600 dark:text-zinc-300',
                    captionClassName
                  )}
                  style={{ transform: `translateY(${captionOffset}px)` }}
                  aria-hidden
                >
                  {renderCaption ? renderCaption(item, i) : item.caption}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </section>
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
