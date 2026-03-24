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
animated-profile-card.tsx
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { useRef } from 'react';

export interface SocialLink {
  id: string;
  url: string;
  icon: React.ReactNode;
  label: string;
}

export interface ProfileCardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** The full name of the individual. */
  name: string;
  /** The location, such as city and state. */
  location: string;
  /** A short biography or description. */
  bio: string;
  /** The source URL for the avatar image. */
  avatarSrc: string;
  /** Fallback text to display in the avatar (usually initials). */
  avatarFallback: string;
  /**
   * The color variant of the card content. Use 'on-accent' for text
   * that needs to be readable on a background matching the accent color.
   * @default 'default'
   */
  variant?: 'default' | 'on-accent';
  /** An array of social media links to display in the footer. */
  socials?: SocialLink[];
  /**
   * Controls the visibility of the avatar. If `false`, the avatar will be
   * invisible but still occupy space to prevent layout shifts.
   * @default true
   */
  showAvatar?: boolean;
  /** Optional inline styles for the main title element. */
  titleStyle?: React.CSSProperties;
  /** Optional inline styles for the root Card element. */
  cardStyle?: React.CSSProperties;
  /** Custom Tailwind classes for the location description text. */
  descriptionClassName?: string;
  /** Custom Tailwind classes for the main biography paragraph. */
  bioClassName?: string;
  /** Custom Tailwind classes for the footer container. */
  footerClassName?: string;
}

/**
 * A presentational component that displays the content of a user profile card.
 * It is designed to be composed within other components, such as an animation container.
 */
export const ProfileCardContent = React.forwardRef<
  HTMLDivElement,
  ProfileCardContentProps
>(
  (
    {
      className,
      name,
      location,
      bio,
      avatarSrc,
      avatarFallback,
      variant = 'default',
      socials = [],
      showAvatar = true,
      titleStyle,
      cardStyle,
      descriptionClassName,
      bioClassName,
      footerClassName,
      ...props
    },
    ref
  ) => {
    const isOnAccent = variant === 'on-accent';

    return (
      <Card
        ref={ref}
        className={cn(
          'w-full h-full p-8 flex flex-col rounded-3xl border-0',
          isOnAccent
            ? 'text-[var(--on-accent-foreground)]'
            : 'bg-card text-card-foreground',
          className
        )}
        style={cardStyle}
        {...props}
      >
        <CardHeader className='p-0'>
          <div className={cn('flex-shrink-0', !showAvatar && 'invisible')}>
            <Avatar
              className='h-16 w-16 ring-2 ring-offset-4 ring-offset-card'
              style={
                {
                  '--tw-ring-color': 'var(--accent-color)',
                } as React.CSSProperties
              }
            >
              <AvatarImage src={avatarSrc} />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
          </div>
          <CardDescription
            className={cn(
              'pt-6 text-left',
              !isOnAccent && 'text-muted-foreground',
              descriptionClassName
            )}
            style={
              isOnAccent ? { color: 'var(--on-accent-muted-foreground)' } : {}
            }
          >
            {location}
          </CardDescription>
          <CardTitle
            className={cn('text-3xl text-left', className)}
            style={{
              ...(isOnAccent ? { color: 'var(--on-accent-foreground)' } : {}),
              ...titleStyle,
            }}
          >
            {name}
          </CardTitle>
        </CardHeader>

        <CardContent className='p-0 flex-grow mt-6'>
          <p
            className={cn(
              'text-base leading-relaxed text-left',
              !isOnAccent && 'text-foreground/80',
              bioClassName
            )}
            style={isOnAccent ? { opacity: 0.9 } : {}}
          >
            {bio}
          </p>
        </CardContent>

        {socials.length > 0 && (
          <CardFooter className={cn('p-0 mt-6', footerClassName)}>
            <div
              className={cn(
                'flex items-center gap-4',
                !isOnAccent && 'text-muted-foreground'
              )}
              style={
                isOnAccent ? { color: 'var(--on-accent-muted-foreground)' } : {}
              }
            >
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  aria-label={social.label}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cn(
                    'transition-opacity',
                    isOnAccent ? 'hover:opacity-75' : 'hover:text-foreground'
                  )}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
    );
  }
);
ProfileCardContent.displayName = 'ProfileCardContent';

export interface AnimatedProfileCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** The React node to display as the base layer of the card. */
  baseCard: React.ReactNode;
  /** The React node to display as the overlay layer, revealed on hover. */
  overlayCard: React.ReactNode;
  /**
   * The accent color used for the border and avatar ring.
   * Accepts any valid CSS color value.
   */
  accentColor?: string;
  /**
   * The color for primary text when on the accent background.
   * @default '#ffffff'
   */
  onAccentForegroundColor?: string;
  /**
   * The color for secondary/muted text when on the accent background.
   * @default 'rgba(255, 255, 255, 0.8)'
   */
  onAccentMutedForegroundColor?: string;
}

/**
 * A container component that creates a circular reveal animation on hover.
 * It composes two child components, a `baseCard` and an `overlayCard`,
 * to create the effect.
 */
export const AnimatedProfileCard = React.forwardRef<
  HTMLDivElement,
  AnimatedProfileCardProps
>(
  (
    {
      className,
      accentColor = 'var(--primary)',
      onAccentForegroundColor = '#ffffff',
      onAccentMutedForegroundColor = 'rgba(255, 255, 255, 0.8)',
      baseCard,
      overlayCard,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const { resolvedTheme } = useTheme();
    const overlayThemeClass = resolvedTheme === 'dark' ? 'light' : 'dark';

    const setContainerRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref]
    );

    const initialClipPath = 'circle(40px at 64px 64px)';
    const hoverClipPath = 'circle(150% at 64px 64px)';

    useGSAP(
      () => {
        gsap.set(overlayRef.current, { clipPath: initialClipPath });
      },
      { scope: containerRef }
    );
    const handleMouseEnter = () => {
      gsap.killTweensOf(overlayRef.current);
      gsap.to(overlayRef.current, {
        clipPath: hoverClipPath,
        duration: 0.7,
        ease: 'expo.inOut',
      });
    };
    const handleMouseLeave = () => {
      gsap.killTweensOf(overlayRef.current);
      gsap.to(overlayRef.current, {
        clipPath: initialClipPath,
        duration: 1.2,
        ease: 'expo.out(1, 1)',
      });
    };

    return (
      <div
        ref={setContainerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={
          {
            '--accent-color': accentColor,
            '--on-accent-foreground': onAccentForegroundColor,
            '--on-accent-muted-foreground': onAccentMutedForegroundColor,
            borderColor: 'var(--accent-color)',
          } as React.CSSProperties
        }
        className={cn(
          'relative h-fit w-[350px] overflow-hidden rounded-3xl border-2',
          className
        )}
        {...props}
      >
        <div className='h-full w-full'>{baseCard}</div>
        <div
          ref={overlayRef}
          className={cn('absolute inset-0 h-full w-full', overlayThemeClass)}
        >
          {overlayCard}
        </div>
      </div>
    );
  }
);
AnimatedProfileCard.displayName = 'AnimatedProfileCard';

code.demo.1767719758884.tsx
'use client';

import * as React from 'react';
import {
AnimatedProfileCard,
ProfileCardContent,
SocialLink,
} from '@/components/ui/animated-profile-card';

// --- Helper Data & Icons ---
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);
const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" {...props}><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>
);

const cardData = {
avatarSrc:
  'https://avatars.githubusercontent.com/u/55579930?s=400&u=0ad69486f37341c371c5f7a98c163f84d9667ab4&v=4',
avatarFallback: 'SK',
name: 'Satish Kumar',
location: 'Bengaluru, India',
bio: 'Design Engineer, Building UI components for developers. Building MVPs for clients. Building some more for myself.',
socials: [
  { id: 'github', url: 'https://github.com/satishkumarsajjan', label: 'GitHub', icon: <GithubIcon className="h-5 w-5" /> },
  { id: 'twitter', label: 'X (Twitter)', url: 'https://x.com/iamsatish4564', icon: <TwitterIcon className="h-4 w-4" /> },
] as SocialLink[],
};

export default function AnimatedProfileCardSlateDemo() {
return (
  <div className="flex min-h-[500px] w-full items-center justify-center bg-background p-4">
    <AnimatedProfileCard
      accentColor="#475569"
      baseCard={
        <ProfileCardContent {...cardData} variant="default" showAvatar={false} />
      }
      overlayCard={
        <ProfileCardContent
          {...cardData}
          variant="on-accent"
          showAvatar={true}
          cardStyle={{ backgroundColor: 'var(--accent-color)' }}
        />
      }
    />
  </div>
);
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-profile-card.tsx
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { useRef } from 'react';

export interface SocialLink {
  id: string;
  url: string;
  icon: React.ReactNode;
  label: string;
}

export interface ProfileCardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** The full name of the individual. */
  name: string;
  /** The location, such as city and state. */
  location: string;
  /** A short biography or description. */
  bio: string;
  /** The source URL for the avatar image. */
  avatarSrc: string;
  /** Fallback text to display in the avatar (usually initials). */
  avatarFallback: string;
  /**
   * The color variant of the card content. Use 'on-accent' for text
   * that needs to be readable on a background matching the accent color.
   * @default 'default'
   */
  variant?: 'default' | 'on-accent';
  /** An array of social media links to display in the footer. */
  socials?: SocialLink[];
  /**
   * Controls the visibility of the avatar. If `false`, the avatar will be
   * invisible but still occupy space to prevent layout shifts.
   * @default true
   */
  showAvatar?: boolean;
  /** Optional inline styles for the main title element. */
  titleStyle?: React.CSSProperties;
  /** Optional inline styles for the root Card element. */
  cardStyle?: React.CSSProperties;
  /** Custom Tailwind classes for the location description text. */
  descriptionClassName?: string;
  /** Custom Tailwind classes for the main biography paragraph. */
  bioClassName?: string;
  /** Custom Tailwind classes for the footer container. */
  footerClassName?: string;
}

/**
 * A presentational component that displays the content of a user profile card.
 * It is designed to be composed within other components, such as an animation container.
 */
export const ProfileCardContent = React.forwardRef<
  HTMLDivElement,
  ProfileCardContentProps
>(
  (
    {
      className,
      name,
      location,
      bio,
      avatarSrc,
      avatarFallback,
      variant = 'default',
      socials = [],
      showAvatar = true,
      titleStyle,
      cardStyle,
      descriptionClassName,
      bioClassName,
      footerClassName,
      ...props
    },
    ref
  ) => {
    const isOnAccent = variant === 'on-accent';

    return (
      <Card
        ref={ref}
        className={cn(
          'w-full h-full p-8 flex flex-col rounded-3xl border-0',
          isOnAccent
            ? 'text-[var(--on-accent-foreground)]'
            : 'bg-card text-card-foreground',
          className
        )}
        style={cardStyle}
        {...props}
      >
        <CardHeader className='p-0'>
          <div className={cn('flex-shrink-0', !showAvatar && 'invisible')}>
            <Avatar
              className='h-16 w-16 ring-2 ring-offset-4 ring-offset-card'
              style={
                {
                  '--tw-ring-color': 'var(--accent-color)',
                } as React.CSSProperties
              }
            >
              <AvatarImage src={avatarSrc} />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
          </div>
          <CardDescription
            className={cn(
              'pt-6 text-left',
              !isOnAccent && 'text-muted-foreground',
              descriptionClassName
            )}
            style={
              isOnAccent ? { color: 'var(--on-accent-muted-foreground)' } : {}
            }
          >
            {location}
          </CardDescription>
          <CardTitle
            className={cn('text-3xl text-left', className)}
            style={{
              ...(isOnAccent ? { color: 'var(--on-accent-foreground)' } : {}),
              ...titleStyle,
            }}
          >
            {name}
          </CardTitle>
        </CardHeader>

        <CardContent className='p-0 flex-grow mt-6'>
          <p
            className={cn(
              'text-base leading-relaxed text-left',
              !isOnAccent && 'text-foreground/80',
              bioClassName
            )}
            style={isOnAccent ? { opacity: 0.9 } : {}}
          >
            {bio}
          </p>
        </CardContent>

        {socials.length > 0 && (
          <CardFooter className={cn('p-0 mt-6', footerClassName)}>
            <div
              className={cn(
                'flex items-center gap-4',
                !isOnAccent && 'text-muted-foreground'
              )}
              style={
                isOnAccent ? { color: 'var(--on-accent-muted-foreground)' } : {}
              }
            >
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  aria-label={social.label}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cn(
                    'transition-opacity',
                    isOnAccent ? 'hover:opacity-75' : 'hover:text-foreground'
                  )}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
    );
  }
);
ProfileCardContent.displayName = 'ProfileCardContent';

export interface AnimatedProfileCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** The React node to display as the base layer of the card. */
  baseCard: React.ReactNode;
  /** The React node to display as the overlay layer, revealed on hover. */
  overlayCard: React.ReactNode;
  /**
   * The accent color used for the border and avatar ring.
   * Accepts any valid CSS color value.
   */
  accentColor?: string;
  /**
   * The color for primary text when on the accent background.
   * @default '#ffffff'
   */
  onAccentForegroundColor?: string;
  /**
   * The color for secondary/muted text when on the accent background.
   * @default 'rgba(255, 255, 255, 0.8)'
   */
  onAccentMutedForegroundColor?: string;
}

/**
 * A container component that creates a circular reveal animation on hover.
 * It composes two child components, a `baseCard` and an `overlayCard`,
 * to create the effect.
 */
export const AnimatedProfileCard = React.forwardRef<
  HTMLDivElement,
  AnimatedProfileCardProps
>(
  (
    {
      className,
      accentColor = 'var(--primary)',
      onAccentForegroundColor = '#ffffff',
      onAccentMutedForegroundColor = 'rgba(255, 255, 255, 0.8)',
      baseCard,
      overlayCard,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const { resolvedTheme } = useTheme();
    const overlayThemeClass = resolvedTheme === 'dark' ? 'light' : 'dark';

    const setContainerRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref]
    );

    const initialClipPath = 'circle(40px at 64px 64px)';
    const hoverClipPath = 'circle(150% at 64px 64px)';

    useGSAP(
      () => {
        gsap.set(overlayRef.current, { clipPath: initialClipPath });
      },
      { scope: containerRef }
    );
    const handleMouseEnter = () => {
      gsap.killTweensOf(overlayRef.current);
      gsap.to(overlayRef.current, {
        clipPath: hoverClipPath,
        duration: 0.7,
        ease: 'expo.inOut',
      });
    };
    const handleMouseLeave = () => {
      gsap.killTweensOf(overlayRef.current);
      gsap.to(overlayRef.current, {
        clipPath: initialClipPath,
        duration: 1.2,
        ease: 'expo.out(1, 1)',
      });
    };

    return (
      <div
        ref={setContainerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={
          {
            '--accent-color': accentColor,
            '--on-accent-foreground': onAccentForegroundColor,
            '--on-accent-muted-foreground': onAccentMutedForegroundColor,
            borderColor: 'var(--accent-color)',
          } as React.CSSProperties
        }
        className={cn(
          'relative h-fit w-[350px] overflow-hidden rounded-3xl border-2',
          className
        )}
        {...props}
      >
        <div className='h-full w-full'>{baseCard}</div>
        <div
          ref={overlayRef}
          className={cn('absolute inset-0 h-full w-full', overlayThemeClass)}
        >
          {overlayCard}
        </div>
      </div>
    );
  }
);
AnimatedProfileCard.displayName = 'AnimatedProfileCard';
```

Install NPM dependencies:
```bash
@gsap/react, gsap, next-themes
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
