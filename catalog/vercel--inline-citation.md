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
inline-citation.tsx
'use client';

import * as React from 'react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@/components/ui/hover-card';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';



type InlineCitationCarouselContextProps = {
  api: CarouselApi | undefined;
};

const InlineCitationCarouselContext =
  React.createContext<InlineCitationCarouselContextProps | null>(null);

// Наш собственный хук для доступа к API карусели
function useInlineCitationCarousel() {
  const context = React.useContext(InlineCitationCarouselContext);
  if (!context) {
    throw new Error(
      'useInlineCitationCarousel must be used within a <InlineCitationCarousel />',
    );
  }
  return context;
}



export type InlineCitationProps = ComponentProps<'span'>;
export const InlineCitation = ({ className, ...props }: InlineCitationProps) => (
    <span className={cn('inline items-center gap-1 group', className)} {...props} />
);

export type InlineCitationTextProps = ComponentProps<'span'>;
export const InlineCitationText = ({ className, ...props }: InlineCitationTextProps) => (
    <span className={cn('group-hover:bg-accent transition-colors', className)} {...props} />
);

export type InlineCitationCardProps = ComponentProps<typeof HoverCard>;
export const InlineCitationCard = (props: InlineCitationCardProps) => (
    <HoverCard openDelay={0} closeDelay={0} {...props} />
);

export type InlineCitationCardTriggerProps = ComponentProps<'button'> & { sources: string[]; };
export const InlineCitationCardTrigger = ({ sources, className, ...props }: InlineCitationCardTriggerProps) => (
    <HoverCardTrigger asChild>
        <Badge variant="secondary" className={cn('ml-1 rounded-full', className)} {...props}>
            {sources.length ? (<>{new URL(sources[0]).hostname} {sources.length > 1 && `+${sources.length - 1}`}</>) : ('unknown')}
        </Badge>
    </HoverCardTrigger>
);

export type InlineCitationCardBodyProps = ComponentProps<'div'>;
export const InlineCitationCardBody = ({ className, ...props }: InlineCitationCardBodyProps) => (
    <HoverCardContent className={cn('w-80 p-0 relative', className)} {...props} />
);

export type InlineCitationCarouselProps = ComponentProps<typeof Carousel>;

export const InlineCitationCarousel = ({ className, ...props }: InlineCitationCarouselProps) => {

  const [api, setApi] = React.useState<CarouselApi>();

  return (

    <InlineCitationCarouselContext.Provider value={{ api }}>
      <Carousel setApi={setApi} className={cn('w-full', className)} {...props} />
    </InlineCitationCarouselContext.Provider>
  );
};


export type InlineCitationCarouselContentProps = ComponentProps<'div'>;
export const InlineCitationCarouselContent = (props: InlineCitationCarouselContentProps) => <CarouselContent {...props} />;

export type InlineCitationCarouselItemProps = ComponentProps<'div'>;
export const InlineCitationCarouselItem = ({ className, ...props }: InlineCitationCarouselItemProps) => (
    <CarouselItem className={cn('w-full space-y-2 p-4', className)} {...props} />
);

export type InlineCitationCarouselHeaderProps = ComponentProps<'div'>;
export const InlineCitationCarouselHeader = ({ className, ...props }: InlineCitationCarouselHeaderProps) => (
  <div
    className={cn('flex items-center justify-between p-2 gap-2 bg-secondary rounded-t-md', className)}
    {...props}
  />
);


export type InlineCitationCarouselIndexProps = ComponentProps<'div'>;
export const InlineCitationCarouselIndex = ({ children, className, ...props }: InlineCitationCarouselIndexProps) => {
  const { api } = useInlineCitationCarousel();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  return (
    <div className={cn('flex items-center flex-1 justify-end px-3 py-1 text-xs text-muted-foreground', className)} {...props}>
      {children ?? `${current}/${count}`}
    </div>
  );
};


export type InlineCitationCarouselPrevProps = ComponentProps<'button'>;
export const InlineCitationCarouselPrev = ({ className, ...props }: InlineCitationCarouselPrevProps) => {
  const { api } = useInlineCitationCarousel();
  const handleClick = React.useCallback(() => api?.scrollPrev(), [api]);

  return (
    <button type="button" className={cn('shrink-0', className)} onClick={handleClick} aria-label="Previous" {...props}>
      <ArrowLeftIcon className="size-4 text-muted-foreground" />
    </button>
  );
};


export type InlineCitationCarouselNextProps = ComponentProps<'button'>;
export const InlineCitationCarouselNext = ({ className, ...props }: InlineCitationCarouselNextProps) => {
  const { api } = useInlineCitationCarousel();
  const handleClick = React.useCallback(() => api?.scrollNext(), [api]);

  return (
    <button type="button" className={cn('shrink-0', className)} onClick={handleClick} aria-label="Next" {...props}>
      <ArrowRightIcon className="size-4 text-muted-foreground" />
    </button>
  );
};


export type InlineCitationSourceProps = ComponentProps<'div'> & { title?: string; url?: string; description?: string; };
export const InlineCitationSource = ({ title, url, description, className, children, ...props }: InlineCitationSourceProps) => (
  <div className={cn('space-y-1', className)} {...props}>
    {title && <h4 className="text-sm font-medium leading-tight truncate">{title}</h4>}
    {url && <p className="text-xs text-muted-foreground break-all truncate">{url}</p>}
    {description && <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{description}</p>}
    {children}
  </div>
);

export type InlineCitationQuoteProps = ComponentProps<'blockquote'>;
export const InlineCitationQuote = ({ children, className, ...props }: InlineCitationQuoteProps) => (
  <blockquote className={cn('border-l-2 border-muted pl-3 text-sm italic text-muted-foreground', className)} {...props}>
    {children}
  </blockquote>
);

code.demo.1755159246632.tsx
'use client';

import * as React from 'react';
import {
  InlineCitation,
  InlineCitationCard,
  InlineCitationCardTrigger,
  InlineCitationCardBody,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselItem,
  InlineCitationCarouselPrev,
  InlineCitationCarouselNext,
  InlineCitationCarouselIndex,
  InlineCitationSource,
  InlineCitationQuote,
  InlineCitationCarouselHeader, 
} from '@/components/ui/inline-citation';

export default function DemoInlineCitation() {
  const sources = [
    {
      title: 'OpenAI',
      url: 'https://openai.com',
      description: 'OpenAI is an AI research and deployment company. Our mission is to ensure that artificial general intelligence benefits all of humanity.',
    },
    {
      title: 'React',
      url: 'https://react.dev',
      description: 'A JavaScript library for building user interfaces, enabling developers to create large web applications that can change data without reloading the page.',
    },
    {
      title: 'Tailwind CSS',
      url: 'https://tailwindcss.com',
      description: 'A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.',
    },
    {
      title: 'Next.js',
      url: 'https://nextjs.org',
      description: 'The React Framework for Production. Next.js gives you the best developer experience with all the features you need for production.',
    },
    {
      title: 'Vercel',
      url: 'https://vercel.com',
      description: 'Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.',
    },
  ];

  return (
    <div className="p-8 space-y-4">
      <p>
        Here is an inline citation example{' '}
        <InlineCitation>
          <InlineCitationCard>
            <InlineCitationCardTrigger sources={sources.map(s => s.url)} />
            <InlineCitationCardBody>
              <InlineCitationCarousel>
                <div className="absolute top-0 left-0 right-0 z-10">
                  <InlineCitationCarouselHeader>
                    <InlineCitationCarouselPrev />
                    <InlineCitationCarouselIndex />
                    <InlineCitationCarouselNext />
                  </InlineCitationCarouselHeader>
                </div>
                <InlineCitationCarouselContent className="pt-12">
                  {sources.map((source, idx) => (
                    <InlineCitationCarouselItem key={idx}>
                      <InlineCitationSource
                        title={source.title}
                        url={source.url}
                        description={source.description}
                      />
                      <InlineCitationQuote>
                        Example quote from {source.title}.
                      </InlineCitationQuote>
                    </InlineCitationCarouselItem>
                  ))}
                </InlineCitationCarouselContent>
              </InlineCitationCarousel>
            </InlineCitationCardBody>
          </InlineCitationCard>
        </InlineCitation>
        . You can hover to view more sources.
      </p>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/inline-citation.tsx
'use client';

import * as React from 'react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@/components/ui/hover-card';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';



type InlineCitationCarouselContextProps = {
  api: CarouselApi | undefined;
};

const InlineCitationCarouselContext =
  React.createContext<InlineCitationCarouselContextProps | null>(null);

// Наш собственный хук для доступа к API карусели
function useInlineCitationCarousel() {
  const context = React.useContext(InlineCitationCarouselContext);
  if (!context) {
    throw new Error(
      'useInlineCitationCarousel must be used within a <InlineCitationCarousel />',
    );
  }
  return context;
}



export type InlineCitationProps = ComponentProps<'span'>;
export const InlineCitation = ({ className, ...props }: InlineCitationProps) => (
    <span className={cn('inline items-center gap-1 group', className)} {...props} />
);

export type InlineCitationTextProps = ComponentProps<'span'>;
export const InlineCitationText = ({ className, ...props }: InlineCitationTextProps) => (
    <span className={cn('group-hover:bg-accent transition-colors', className)} {...props} />
);

export type InlineCitationCardProps = ComponentProps<typeof HoverCard>;
export const InlineCitationCard = (props: InlineCitationCardProps) => (
    <HoverCard openDelay={0} closeDelay={0} {...props} />
);

export type InlineCitationCardTriggerProps = ComponentProps<'button'> & { sources: string[]; };
export const InlineCitationCardTrigger = ({ sources, className, ...props }: InlineCitationCardTriggerProps) => (
    <HoverCardTrigger asChild>
        <Badge variant="secondary" className={cn('ml-1 rounded-full', className)} {...props}>
            {sources.length ? (<>{new URL(sources[0]).hostname} {sources.length > 1 && `+${sources.length - 1}`}</>) : ('unknown')}
        </Badge>
    </HoverCardTrigger>
);

export type InlineCitationCardBodyProps = ComponentProps<'div'>;
export const InlineCitationCardBody = ({ className, ...props }: InlineCitationCardBodyProps) => (
    <HoverCardContent className={cn('w-80 p-0 relative', className)} {...props} />
);

export type InlineCitationCarouselProps = ComponentProps<typeof Carousel>;

export const InlineCitationCarousel = ({ className, ...props }: InlineCitationCarouselProps) => {

  const [api, setApi] = React.useState<CarouselApi>();

  return (

    <InlineCitationCarouselContext.Provider value={{ api }}>
      <Carousel setApi={setApi} className={cn('w-full', className)} {...props} />
    </InlineCitationCarouselContext.Provider>
  );
};


export type InlineCitationCarouselContentProps = ComponentProps<'div'>;
export const InlineCitationCarouselContent = (props: InlineCitationCarouselContentProps) => <CarouselContent {...props} />;

export type InlineCitationCarouselItemProps = ComponentProps<'div'>;
export const InlineCitationCarouselItem = ({ className, ...props }: InlineCitationCarouselItemProps) => (
    <CarouselItem className={cn('w-full space-y-2 p-4', className)} {...props} />
);

export type InlineCitationCarouselHeaderProps = ComponentProps<'div'>;
export const InlineCitationCarouselHeader = ({ className, ...props }: InlineCitationCarouselHeaderProps) => (
  <div
    className={cn('flex items-center justify-between p-2 gap-2 bg-secondary rounded-t-md', className)}
    {...props}
  />
);


export type InlineCitationCarouselIndexProps = ComponentProps<'div'>;
export const InlineCitationCarouselIndex = ({ children, className, ...props }: InlineCitationCarouselIndexProps) => {
  const { api } = useInlineCitationCarousel();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  return (
    <div className={cn('flex items-center flex-1 justify-end px-3 py-1 text-xs text-muted-foreground', className)} {...props}>
      {children ?? `${current}/${count}`}
    </div>
  );
};


export type InlineCitationCarouselPrevProps = ComponentProps<'button'>;
export const InlineCitationCarouselPrev = ({ className, ...props }: InlineCitationCarouselPrevProps) => {
  const { api } = useInlineCitationCarousel();
  const handleClick = React.useCallback(() => api?.scrollPrev(), [api]);

  return (
    <button type="button" className={cn('shrink-0', className)} onClick={handleClick} aria-label="Previous" {...props}>
      <ArrowLeftIcon className="size-4 text-muted-foreground" />
    </button>
  );
};


export type InlineCitationCarouselNextProps = ComponentProps<'button'>;
export const InlineCitationCarouselNext = ({ className, ...props }: InlineCitationCarouselNextProps) => {
  const { api } = useInlineCitationCarousel();
  const handleClick = React.useCallback(() => api?.scrollNext(), [api]);

  return (
    <button type="button" className={cn('shrink-0', className)} onClick={handleClick} aria-label="Next" {...props}>
      <ArrowRightIcon className="size-4 text-muted-foreground" />
    </button>
  );
};


export type InlineCitationSourceProps = ComponentProps<'div'> & { title?: string; url?: string; description?: string; };
export const InlineCitationSource = ({ title, url, description, className, children, ...props }: InlineCitationSourceProps) => (
  <div className={cn('space-y-1', className)} {...props}>
    {title && <h4 className="text-sm font-medium leading-tight truncate">{title}</h4>}
    {url && <p className="text-xs text-muted-foreground break-all truncate">{url}</p>}
    {description && <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{description}</p>}
    {children}
  </div>
);

export type InlineCitationQuoteProps = ComponentProps<'blockquote'>;
export const InlineCitationQuote = ({ children, className, ...props }: InlineCitationQuoteProps) => (
  <blockquote className={cn('border-l-2 border-muted pl-3 text-sm italic text-muted-foreground', className)} {...props}>
    {children}
  </blockquote>
);
```

Install NPM dependencies:
```bash
lucide-react
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
