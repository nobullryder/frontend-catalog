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
masonry-grid-with-scroll-animation.tsx
import React from 'react';
import { cn } from '@/lib/utils'; // Assuming you have a utility for class names.

/**
 * @typedef MasonryCardData
 * @property {string} id - A unique identifier for the card.
 * @property {string} src - The URL for the image to be displayed.
 * @property {string} alt - The alternative text for the image.
 * @property {string} content - A short text content for the card.
 * @property {string} linkHref - The URL for the link.
 * @property {string} linkText - The text for the link.
 */
export interface MasonryCardData {
  id: string;
  src: string;
  alt: string;
  content: string;
  linkHref: string;
  linkText: string;
}

/**
 * @interface MasonryGridProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 * @property {MasonryCardData[]} items - An array of data objects to render as cards.
 */
export interface MasonryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MasonryCardData[];
}

/**
 * A component to inject the necessary CSS for the MasonryGrid animations.
 * This avoids the need for a separate CSS file.
 * @returns {JSX.Element} A style tag with the required CSS.
 */
const MasonryGridCSS = () => (
  <style>{`
    @keyframes slide-in {
      from {
        opacity: 0;
        transform: scale(0.85) rotate(calc(var(--side, 1) * (5deg * var(--amp, 1))));
      }
      to {
        opacity: 1;
        transform: scale(1) rotate(0deg);
      }
    }

    .masonry-card-wrapper {
      /* Set transform origin based on column position */
      &:nth-of-type(2n + 1) { transform-origin: 25vw 100%; }
      &:nth-of-type(2n) { transform-origin: -25vw 100%; }

      @media (min-width: 768px) {
        &:nth-of-type(4n + 1) { transform-origin: 50vw 100%; }
        &:nth-of-type(4n + 2) { transform-origin: 25vw 100%; }
        &:nth-of-type(4n + 3) { transform-origin: -25vw 100%; }
        &:nth-of-type(4n) { transform-origin: -50vw 100%; }
      }

      @media (min-width: 1024px) {
        &:nth-of-type(6n + 1) { transform-origin: 75vw 100%; }
        &:nth-of-type(6n + 2) { transform-origin: 50vw 100%; }
        &:nth-of-type(6n + 3) { transform-origin: 25vw 100%; }
        &:nth-of-type(6n + 4) { transform-origin: -25vw 100%; }
        &:nth-of-type(6n + 5) { transform-origin: -50vw 100%; }
        &:nth-of-type(6n) { transform-origin: -75vw 100%; }
      }

      /* Animation powered by CSS Scroll-Driven Animations */
      @media (prefers-reduced-motion: no-preference) {
        animation: slide-in linear both;
        animation-timeline: view();
        animation-range: entry 0% cover 15%;
      }
    }
  `}</style>
);

/**
 * A single card component within the masonry grid.
 * @param {object} props - The component props.
 * @param {MasonryCardData} props.item - The data for the card.
 * @param {string} [props.className] - Additional class names.
 * @returns {JSX.Element} The rendered card element.
 */
const MasonryCard = ({
  item,
  className,
  ...props
}: { item: MasonryCardData } & React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('grid gap-2', className)} {...props}>
    <article className="bg-card border rounded-lg shadow-md p-3 space-y-2">
      <img
        src={item.src}
        alt={item.alt}
        height={500}
        width={500}
        className="bg-muted rounded-md aspect-square object-cover w-full"
      />
      <p className="text-sm text-muted-foreground leading-tight line-clamp-2">
        {item.content}
      </p>
      <a
        href={item.linkHref}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-primary hover:underline"
      >
        {item.linkText}
      </a>
    </article>
  </div>
);

/**
 * A responsive masonry grid that animates items into view on scroll.
 * @param {MasonryGridProps} props - The component props.
 * @returns {JSX.Element} The rendered masonry grid.
 */
const MasonryGrid = React.forwardRef<HTMLDivElement, MasonryGridProps>(
  ({ items, className, ...props }, ref) => {
    return (
      <>
        <MasonryGridCSS />
        <div
          ref={ref}
          className={cn(
            'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 p-4',
            className,
          )}
          {...props}
        >
          {items.map((item, index) => (
            <MasonryCard
              key={item.id}
              item={item}
              className="masonry-card-wrapper"
              style={
                {
                  '--side': index % 2 === 0 ? 1 : -1,
                  '--amp': Math.ceil((index % 8) / 2),
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </>
    );
  },
);

MasonryGrid.displayName = 'MasonryGrid';

export { MasonryGrid, MasonryCard };

code.demo.1758368293975.tsx
import { MasonryGrid, type MasonryCardData } from '@/components/ui/masonry-grid-with-scroll-animation';

// Sample data for the demo
const demoItems: MasonryCardData[] = [
  {
    id: '1',
    src: 'https://assets.codepen.io/2585/Roboto.svg',
    alt: 'Hand-drawn vector of a robot',
    content: 'Sort of short and tiny amount of content here.',
    linkHref: '#',
    linkText: 'Cool art',
  },
  {
    id: '2',
    src: 'https://assets.codepen.io/2585/Entertainment.svg',
    alt: 'Hand-drawn vector of entertainment items',
    content:
      'The words in this example are tolerable, passable and fair, but do draw out a bit.',
    linkHref: '#',
    linkText: 'By Pablo Stanley',
  },
  {
    id: '3',
    src: 'https://assets.codepen.io/2585/Mechanical+Love.svg',
    alt: 'Hand-drawn vector of mechanical love',
    content: "I'm brief comparatively.",
    linkHref: '#',
    linkText: 'Find more',
  },
  {
    id: '4',
    src: 'https://assets.codepen.io/2585/Waiting.svg',
    alt: 'Hand-drawn vector of a person waiting',
    content: 'Sometimes the message is just right.',
    linkHref: '#',
    linkText: 'Share good art',
  },
  // Duplicate items to create a larger grid for scrolling
  ...Array.from({ length: 170 }, (_, i) => ({
    ...[
      {
        id: `5-${i}`,
        src: 'https://assets.codepen.io/2585/Waiting.svg',
        alt: 'Hand-drawn vector of a person waiting',
        content: 'Sometimes the message is just right.',
        linkHref: '#',
        linkText: 'Share good art',
      },
      {
        id: `6-${i}`,
        src: 'https://assets.codepen.io/2585/Entertainment.svg',
        alt: 'Hand-drawn vector of entertainment items',
        content:
          'The words in this example are tolerable, passable and fair, but do draw out a bit.',
        linkHref: '#',
        linkText: 'By Pablo Stanley',
      },
      {
        id: `7-${i}`,
        src: 'https://assets.codepen.io/2585/Mechanical+Love.svg',
        alt: 'Hand-drawn vector of mechanical love',
        content: "I'm brief comparatively.",
        linkHref: '#',
        linkText: 'Find more',
      },
      {
        id: `8-${i}`,
        src: 'https://assets.codepen.io/2585/Roboto.svg',
        alt: 'Hand-drawn vector of a robot',
        content: 'Sort of short and tiny amount of content here.',
        linkHref: '#',
        linkText: 'Cool art',
      },
    ][i % 4],
    id: `${i + 5}`, // Ensure unique IDs
  })),
];

/**
 * A demo component to showcase the MasonryGrid.
 * @returns {JSX.Element} The rendered demo.
 */
export default function MasonryGridDemo() {
  return (
    <div className="bg-background min-h-[200vh] py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight">Animated Masonry Grid</h1>
        <p className="text-muted-foreground mt-2">Scroll down to see the items animate into view.</p>
      </div>
      <MasonryGrid items={demoItems} />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/masonry-grid-with-scroll-animation.tsx
import React from 'react';
import { cn } from '@/lib/utils'; // Assuming you have a utility for class names.

/**
 * @typedef MasonryCardData
 * @property {string} id - A unique identifier for the card.
 * @property {string} src - The URL for the image to be displayed.
 * @property {string} alt - The alternative text for the image.
 * @property {string} content - A short text content for the card.
 * @property {string} linkHref - The URL for the link.
 * @property {string} linkText - The text for the link.
 */
export interface MasonryCardData {
  id: string;
  src: string;
  alt: string;
  content: string;
  linkHref: string;
  linkText: string;
}

/**
 * @interface MasonryGridProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 * @property {MasonryCardData[]} items - An array of data objects to render as cards.
 */
export interface MasonryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MasonryCardData[];
}

/**
 * A component to inject the necessary CSS for the MasonryGrid animations.
 * This avoids the need for a separate CSS file.
 * @returns {JSX.Element} A style tag with the required CSS.
 */
const MasonryGridCSS = () => (
  <style>{`
    @keyframes slide-in {
      from {
        opacity: 0;
        transform: scale(0.85) rotate(calc(var(--side, 1) * (5deg * var(--amp, 1))));
      }
      to {
        opacity: 1;
        transform: scale(1) rotate(0deg);
      }
    }

    .masonry-card-wrapper {
      /* Set transform origin based on column position */
      &:nth-of-type(2n + 1) { transform-origin: 25vw 100%; }
      &:nth-of-type(2n) { transform-origin: -25vw 100%; }

      @media (min-width: 768px) {
        &:nth-of-type(4n + 1) { transform-origin: 50vw 100%; }
        &:nth-of-type(4n + 2) { transform-origin: 25vw 100%; }
        &:nth-of-type(4n + 3) { transform-origin: -25vw 100%; }
        &:nth-of-type(4n) { transform-origin: -50vw 100%; }
      }

      @media (min-width: 1024px) {
        &:nth-of-type(6n + 1) { transform-origin: 75vw 100%; }
        &:nth-of-type(6n + 2) { transform-origin: 50vw 100%; }
        &:nth-of-type(6n + 3) { transform-origin: 25vw 100%; }
        &:nth-of-type(6n + 4) { transform-origin: -25vw 100%; }
        &:nth-of-type(6n + 5) { transform-origin: -50vw 100%; }
        &:nth-of-type(6n) { transform-origin: -75vw 100%; }
      }

      /* Animation powered by CSS Scroll-Driven Animations */
      @media (prefers-reduced-motion: no-preference) {
        animation: slide-in linear both;
        animation-timeline: view();
        animation-range: entry 0% cover 15%;
      }
    }
  `}</style>
);

/**
 * A single card component within the masonry grid.
 * @param {object} props - The component props.
 * @param {MasonryCardData} props.item - The data for the card.
 * @param {string} [props.className] - Additional class names.
 * @returns {JSX.Element} The rendered card element.
 */
const MasonryCard = ({
  item,
  className,
  ...props
}: { item: MasonryCardData } & React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('grid gap-2', className)} {...props}>
    <article className="bg-card border rounded-lg shadow-md p-3 space-y-2">
      <img
        src={item.src}
        alt={item.alt}
        height={500}
        width={500}
        className="bg-muted rounded-md aspect-square object-cover w-full"
      />
      <p className="text-sm text-muted-foreground leading-tight line-clamp-2">
        {item.content}
      </p>
      <a
        href={item.linkHref}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-primary hover:underline"
      >
        {item.linkText}
      </a>
    </article>
  </div>
);

/**
 * A responsive masonry grid that animates items into view on scroll.
 * @param {MasonryGridProps} props - The component props.
 * @returns {JSX.Element} The rendered masonry grid.
 */
const MasonryGrid = React.forwardRef<HTMLDivElement, MasonryGridProps>(
  ({ items, className, ...props }, ref) => {
    return (
      <>
        <MasonryGridCSS />
        <div
          ref={ref}
          className={cn(
            'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 p-4',
            className,
          )}
          {...props}
        >
          {items.map((item, index) => (
            <MasonryCard
              key={item.id}
              item={item}
              className="masonry-card-wrapper"
              style={
                {
                  '--side': index % 2 === 0 ? 1 : -1,
                  '--amp': Math.ceil((index % 8) / 2),
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </>
    );
  },
);

MasonryGrid.displayName = 'MasonryGrid';

export { MasonryGrid, MasonryCard };
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
