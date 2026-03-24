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
pricing-cart-duo.tsx
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

type Tone = 'indigo' | 'blue' | 'emerald' | 'zinc';
type Variant = 'outline' | 'elevated' | 'soft';

export type PricingFeature = {
  label: React.ReactNode;
  included?: boolean; // default true
};

export type PricingCardOneProps = {
  icon?: React.ReactNode; // big top icon
  name: string; // plan name
  subtitle?: string; // "the starter choice"
  price: number | string; // 5 | "$5"
  currency?: string; // "$" (used when price is number)
  periodLabel?: string; // "/month"
  recommended?: boolean;
  recommendedLabel?: string;

  features: PricingFeature[];

  /** CTA button/link. If omitted, no button is shown. */
  cta?: AnchorOrButton & { label?: string; 'aria-label'?: string };

  /** Visuals */
  tone?: Tone;
  variant?: Variant;
  className?: string;

  /** Slot style overrides */
  badgeClassName?: string;
  iconClassName?: string;
  nameClassName?: string;
  subtitleClassName?: string;
  priceClassName?: string;
  periodClassName?: string;
  featureListClassName?: string;
  featureItemClassName?: string;
  ctaClassName?: string;
};

const toneMap: Record<
  Tone,
  {
    accent: string; // text color for icon/price
    ring: string; // ring color for included bullet
    bulletOkBg: string; // bg for ✓
    bulletOkFg: string;
    bulletNoBg: string; // bg for ✕
    bulletNoFg: string;
    primaryBtn: string; // filled button
    primaryBtnHover: string;
    outlineBtn: string; // outline button text/ring
  }
> = {
  indigo: {
    accent: 'text-indigo-600',
    ring: 'ring-indigo-200 dark:ring-indigo-900/50',
    bulletOkBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    bulletOkFg: 'text-indigo-600 dark:text-indigo-400',
    bulletNoBg: 'bg-amber-50 dark:bg-amber-950/40',
    bulletNoFg: 'text-amber-500',
    primaryBtn: 'bg-indigo-600 text-white',
    primaryBtnHover: 'hover:bg-indigo-700',
    outlineBtn:
      'text-indigo-600 ring-1 ring-inset ring-indigo-200 dark:ring-indigo-900/50',
  },
  blue: {
    accent: 'text-blue-600',
    ring: 'ring-blue-200 dark:ring-blue-900/50',
    bulletOkBg: 'bg-blue-50 dark:bg-blue-950/40',
    bulletOkFg: 'text-blue-600 dark:text-blue-400',
    bulletNoBg: 'bg-amber-50 dark:bg-amber-950/40',
    bulletNoFg: 'text-amber-500',
    primaryBtn: 'bg-blue-600 text-white',
    primaryBtnHover: 'hover:bg-blue-700',
    outlineBtn:
      'text-blue-600 ring-1 ring-inset ring-blue-200 dark:ring-blue-900/50',
  },
  emerald: {
    accent: 'text-emerald-600',
    ring: 'ring-emerald-200 dark:ring-emerald-900/50',
    bulletOkBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    bulletOkFg: 'text-emerald-600 dark:text-emerald-400',
    bulletNoBg: 'bg-amber-50 dark:bg-amber-950/40',
    bulletNoFg: 'text-amber-500',
    primaryBtn: 'bg-emerald-600 text-white',
    primaryBtnHover: 'hover:bg-emerald-700',
    outlineBtn:
      'text-emerald-600 ring-1 ring-inset ring-emerald-200 dark:ring-emerald-900/50',
  },
  zinc: {
    accent: 'text-zinc-900 dark:text-zinc-50',
    ring: 'ring-zinc-200 dark:ring-zinc-800',
    bulletOkBg: 'bg-zinc-100 dark:bg-zinc-800/60',
    bulletOkFg: 'text-zinc-700 dark:text-zinc-300',
    bulletNoBg: 'bg-amber-50 dark:bg-amber-950/40',
    bulletNoFg: 'text-amber-500',
    primaryBtn: 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900',
    primaryBtnHover: 'hover:bg-black/80 dark:hover:bg-white',
    outlineBtn:
      'text-zinc-700 ring-1 ring-inset ring-zinc-200 dark:text-zinc-300 dark:ring-zinc-800',
  },
};

export default function PricingCardOne({
  icon,
  name,
  subtitle = 'the starter choice',
  price,
  currency = '$',
  periodLabel = '/month',
  recommended = false,
  recommendedLabel = 'Recommended',
  features,
  cta,
  tone = 'blue',
  variant = 'outline',
  className,
  badgeClassName,
  iconClassName,
  nameClassName,
  subtitleClassName,
  priceClassName,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  periodClassName,
  featureListClassName,
  featureItemClassName,
  ctaClassName,
}: PricingCardOneProps) {
  const t = toneMap[tone];

  const shell =
    variant === 'elevated'
      ? 'bg-white dark:bg-zinc-950 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800'
      : variant === 'soft'
        ? 'bg-white/70 dark:bg-zinc-900/60 ring-1 ring-zinc-200 dark:ring-zinc-800'
        : 'bg-white dark:bg-zinc-950 ring-1 ring-zinc-200 dark:ring-zinc-800';

  const priceText =
    typeof price === 'number' ? (
      <>
        <span className='text-5xl font-bold leading-none'>
          {currency}
          {price}
        </span>
        <span className='ml-1 text-zinc-500 dark:text-zinc-400'>
          {periodLabel}
        </span>
      </>
    ) : (
      <>
        <span className='text-5xl font-bold leading-none'>{price}</span>
        <span className='ml-1 text-zinc-500 dark:text-zinc-400'>
          {periodLabel}
        </span>
      </>
    );

  return (
    <section
      aria-label={`${name} plan`}
      className={cn('relative rounded-2xl p-6', shell, className)}
    >
      {/* Recommended badge */}
      {recommended && (
        <span
          className={cn(
            'absolute right-4 top-4 inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-sm',
            badgeClassName
          )}
        >
          {recommendedLabel}
        </span>
      )}

      {/* Icon */}
      {icon && (
        <div
          className={cn('mb-3 text-5xl', t.accent, iconClassName)}
          aria-hidden
        >
          {icon}
        </div>
      )}

      {/* Heading */}
      <h3
        className={cn(
          'text-xl font-semibold text-zinc-900 dark:text-zinc-50',
          nameClassName
        )}
      >
        {name}
      </h3>
      {subtitle && (
        <p
          className={cn(
            'text-sm text-zinc-500 dark:text-zinc-400',
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}

      {/* Price */}
      <div className={cn('mt-4', t.accent, priceClassName)}>{priceText}</div>

      {/* Features */}
      <ul className={cn('mt-6 space-y-3', featureListClassName)}>
        {features.map((f, i) => {
          const ok = f.included !== false;
          return (
            <li
              key={i}
              className={cn(
                'flex items-start gap-3 text-sm',
                featureItemClassName
              )}
            >
              <span
                className={cn(
                  'mt-0.5 inline-grid h-5 w-5 place-items-center rounded-full ring-1',
                  ok
                    ? `${t.bulletOkBg} ${t.ring}`
                    : `${t.bulletNoBg} ring-amber-200 dark:ring-amber-900/40`
                )}
                aria-hidden
              >
                {ok ? (
                  <svg
                    viewBox='0 0 20 20'
                    className={cn('h-3.5 w-3.5', t.bulletOkFg)}
                    fill='currentColor'
                  >
                    <path d='M16.7 6.3a1 1 0 0 0-1.4-1.4L8 12.2 4.7 8.9a1 1 0 1 0-1.4 1.4L7.3 14a1 1 0 0 0 1.4 0l8-8Z' />
                  </svg>
                ) : (
                  <svg
                    viewBox='0 0 20 20'
                    className={cn('h-3.5 w-3.5', t.bulletNoFg)}
                    fill='currentColor'
                  >
                    <path d='M6.2 5 5 6.2 8.8 10 5 13.8 6.2 15 10 11.2 13.8 15 15 13.8 11.2 10 15 6.2 13.8 5 10 8.8z' />
                  </svg>
                )}
              </span>
              <span className='text-zinc-700 dark:text-zinc-300'>
                {f.label}
              </span>
            </li>
          );
        })}
      </ul>

      {/* CTA */}
      {cta && (
        <>
          {cta.href ? (
            <a
              href={cta.href}
              aria-label={cta['aria-label'] ?? `Choose ${name}`}
              className={cn(
                'mt-7 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition',
                recommended
                  ? `${t.primaryBtn} ${t.primaryBtnHover}`
                  : `${t.outlineBtn} hover:bg-black/5 dark:hover:bg-white/5`,
                ctaClassName
              )}
              {...(cta as any)}
            >
              {cta.label ?? 'Choose Plan'}
            </a>
          ) : (
            <button
              type='button'
              aria-label={cta['aria-label'] ?? `Choose ${name}`}
              onClick={(cta as any).onClick}
              className={cn(
                'mt-7 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition',
                recommended
                  ? `${t.primaryBtn} ${t.primaryBtnHover}`
                  : `${t.outlineBtn} hover:bg-black/5 dark:hover:bg-white/5`,
                ctaClassName
              )}
            >
              {cta.label ?? 'Choose Plan'}
            </button>
          )}
        </>
      )}
    </section>
  );
}


code.demo.1756507381884.tsx
import PricingCardOne from '@/components/ui/pricing-cart-duo';
import { Car, Plane } from 'lucide-react';

export default function Pc1Basic() {
  return (
    <div className='grid gap-8 sm:grid-cols-2'>
      <PricingCardOne
        icon={<Car />}
        name='Basic'
        subtitle='the starter choise'
        price={5}
        periodLabel='/month'
        tone='blue'
        features={[
          { label: 'Lorem ipsum' },
          { label: 'Lorem set' },
          { label: 'Lorem ipsum dolor.' },
          {
            label: 'Lorem ipsum dolor sit amet, consectetur.',
            included: false,
          },
          { label: 'Only lorem', included: false },
          { label: 'Lorem ipsum dolor.', included: false },
          { label: 'Lorem ipsum.', included: false },
        ]}
        cta={{ href: '#', label: 'Choose Plan' }}
        variant='outline'
      />

      <PricingCardOne
        icon={<Plane />}
        name='Pro'
        subtitle='the starter choise'
        price={15}
        periodLabel='/month'
        recommended
        tone='blue'
        features={[
          { label: 'Lorem ipsum' },
          { label: 'Lorem set' },
          { label: 'Lorem ipsum dolor.' },
          { label: 'Lorem ipsum dolor sit amet, consectetur.' },
          { label: 'Only lorem' },
          { label: 'Lorem ipsum dolor.', included: false },
          { label: 'Lorem ipsum.', included: false },
        ]}
        cta={{ href: '#', label: 'Choose Plan' }}
        variant='outline'
      />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/pricing-cart-duo.tsx
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

type Tone = 'indigo' | 'blue' | 'emerald' | 'zinc';
type Variant = 'outline' | 'elevated' | 'soft';

export type PricingFeature = {
  label: React.ReactNode;
  included?: boolean; // default true
};

export type PricingCardOneProps = {
  icon?: React.ReactNode; // big top icon
  name: string; // plan name
  subtitle?: string; // "the starter choice"
  price: number | string; // 5 | "$5"
  currency?: string; // "$" (used when price is number)
  periodLabel?: string; // "/month"
  recommended?: boolean;
  recommendedLabel?: string;

  features: PricingFeature[];

  /** CTA button/link. If omitted, no button is shown. */
  cta?: AnchorOrButton & { label?: string; 'aria-label'?: string };

  /** Visuals */
  tone?: Tone;
  variant?: Variant;
  className?: string;

  /** Slot style overrides */
  badgeClassName?: string;
  iconClassName?: string;
  nameClassName?: string;
  subtitleClassName?: string;
  priceClassName?: string;
  periodClassName?: string;
  featureListClassName?: string;
  featureItemClassName?: string;
  ctaClassName?: string;
};

const toneMap: Record<
  Tone,
  {
    accent: string; // text color for icon/price
    ring: string; // ring color for included bullet
    bulletOkBg: string; // bg for ✓
    bulletOkFg: string;
    bulletNoBg: string; // bg for ✕
    bulletNoFg: string;
    primaryBtn: string; // filled button
    primaryBtnHover: string;
    outlineBtn: string; // outline button text/ring
  }
> = {
  indigo: {
    accent: 'text-indigo-600',
    ring: 'ring-indigo-200 dark:ring-indigo-900/50',
    bulletOkBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    bulletOkFg: 'text-indigo-600 dark:text-indigo-400',
    bulletNoBg: 'bg-amber-50 dark:bg-amber-950/40',
    bulletNoFg: 'text-amber-500',
    primaryBtn: 'bg-indigo-600 text-white',
    primaryBtnHover: 'hover:bg-indigo-700',
    outlineBtn:
      'text-indigo-600 ring-1 ring-inset ring-indigo-200 dark:ring-indigo-900/50',
  },
  blue: {
    accent: 'text-blue-600',
    ring: 'ring-blue-200 dark:ring-blue-900/50',
    bulletOkBg: 'bg-blue-50 dark:bg-blue-950/40',
    bulletOkFg: 'text-blue-600 dark:text-blue-400',
    bulletNoBg: 'bg-amber-50 dark:bg-amber-950/40',
    bulletNoFg: 'text-amber-500',
    primaryBtn: 'bg-blue-600 text-white',
    primaryBtnHover: 'hover:bg-blue-700',
    outlineBtn:
      'text-blue-600 ring-1 ring-inset ring-blue-200 dark:ring-blue-900/50',
  },
  emerald: {
    accent: 'text-emerald-600',
    ring: 'ring-emerald-200 dark:ring-emerald-900/50',
    bulletOkBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    bulletOkFg: 'text-emerald-600 dark:text-emerald-400',
    bulletNoBg: 'bg-amber-50 dark:bg-amber-950/40',
    bulletNoFg: 'text-amber-500',
    primaryBtn: 'bg-emerald-600 text-white',
    primaryBtnHover: 'hover:bg-emerald-700',
    outlineBtn:
      'text-emerald-600 ring-1 ring-inset ring-emerald-200 dark:ring-emerald-900/50',
  },
  zinc: {
    accent: 'text-zinc-900 dark:text-zinc-50',
    ring: 'ring-zinc-200 dark:ring-zinc-800',
    bulletOkBg: 'bg-zinc-100 dark:bg-zinc-800/60',
    bulletOkFg: 'text-zinc-700 dark:text-zinc-300',
    bulletNoBg: 'bg-amber-50 dark:bg-amber-950/40',
    bulletNoFg: 'text-amber-500',
    primaryBtn: 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900',
    primaryBtnHover: 'hover:bg-black/80 dark:hover:bg-white',
    outlineBtn:
      'text-zinc-700 ring-1 ring-inset ring-zinc-200 dark:text-zinc-300 dark:ring-zinc-800',
  },
};

export default function PricingCardOne({
  icon,
  name,
  subtitle = 'the starter choice',
  price,
  currency = '$',
  periodLabel = '/month',
  recommended = false,
  recommendedLabel = 'Recommended',
  features,
  cta,
  tone = 'blue',
  variant = 'outline',
  className,
  badgeClassName,
  iconClassName,
  nameClassName,
  subtitleClassName,
  priceClassName,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  periodClassName,
  featureListClassName,
  featureItemClassName,
  ctaClassName,
}: PricingCardOneProps) {
  const t = toneMap[tone];

  const shell =
    variant === 'elevated'
      ? 'bg-white dark:bg-zinc-950 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800'
      : variant === 'soft'
        ? 'bg-white/70 dark:bg-zinc-900/60 ring-1 ring-zinc-200 dark:ring-zinc-800'
        : 'bg-white dark:bg-zinc-950 ring-1 ring-zinc-200 dark:ring-zinc-800';

  const priceText =
    typeof price === 'number' ? (
      <>
        <span className='text-5xl font-bold leading-none'>
          {currency}
          {price}
        </span>
        <span className='ml-1 text-zinc-500 dark:text-zinc-400'>
          {periodLabel}
        </span>
      </>
    ) : (
      <>
        <span className='text-5xl font-bold leading-none'>{price}</span>
        <span className='ml-1 text-zinc-500 dark:text-zinc-400'>
          {periodLabel}
        </span>
      </>
    );

  return (
    <section
      aria-label={`${name} plan`}
      className={cn('relative rounded-2xl p-6', shell, className)}
    >
      {/* Recommended badge */}
      {recommended && (
        <span
          className={cn(
            'absolute right-4 top-4 inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-sm',
            badgeClassName
          )}
        >
          {recommendedLabel}
        </span>
      )}

      {/* Icon */}
      {icon && (
        <div
          className={cn('mb-3 text-5xl', t.accent, iconClassName)}
          aria-hidden
        >
          {icon}
        </div>
      )}

      {/* Heading */}
      <h3
        className={cn(
          'text-xl font-semibold text-zinc-900 dark:text-zinc-50',
          nameClassName
        )}
      >
        {name}
      </h3>
      {subtitle && (
        <p
          className={cn(
            'text-sm text-zinc-500 dark:text-zinc-400',
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}

      {/* Price */}
      <div className={cn('mt-4', t.accent, priceClassName)}>{priceText}</div>

      {/* Features */}
      <ul className={cn('mt-6 space-y-3', featureListClassName)}>
        {features.map((f, i) => {
          const ok = f.included !== false;
          return (
            <li
              key={i}
              className={cn(
                'flex items-start gap-3 text-sm',
                featureItemClassName
              )}
            >
              <span
                className={cn(
                  'mt-0.5 inline-grid h-5 w-5 place-items-center rounded-full ring-1',
                  ok
                    ? `${t.bulletOkBg} ${t.ring}`
                    : `${t.bulletNoBg} ring-amber-200 dark:ring-amber-900/40`
                )}
                aria-hidden
              >
                {ok ? (
                  <svg
                    viewBox='0 0 20 20'
                    className={cn('h-3.5 w-3.5', t.bulletOkFg)}
                    fill='currentColor'
                  >
                    <path d='M16.7 6.3a1 1 0 0 0-1.4-1.4L8 12.2 4.7 8.9a1 1 0 1 0-1.4 1.4L7.3 14a1 1 0 0 0 1.4 0l8-8Z' />
                  </svg>
                ) : (
                  <svg
                    viewBox='0 0 20 20'
                    className={cn('h-3.5 w-3.5', t.bulletNoFg)}
                    fill='currentColor'
                  >
                    <path d='M6.2 5 5 6.2 8.8 10 5 13.8 6.2 15 10 11.2 13.8 15 15 13.8 11.2 10 15 6.2 13.8 5 10 8.8z' />
                  </svg>
                )}
              </span>
              <span className='text-zinc-700 dark:text-zinc-300'>
                {f.label}
              </span>
            </li>
          );
        })}
      </ul>

      {/* CTA */}
      {cta && (
        <>
          {cta.href ? (
            <a
              href={cta.href}
              aria-label={cta['aria-label'] ?? `Choose ${name}`}
              className={cn(
                'mt-7 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition',
                recommended
                  ? `${t.primaryBtn} ${t.primaryBtnHover}`
                  : `${t.outlineBtn} hover:bg-black/5 dark:hover:bg-white/5`,
                ctaClassName
              )}
              {...(cta as any)}
            >
              {cta.label ?? 'Choose Plan'}
            </a>
          ) : (
            <button
              type='button'
              aria-label={cta['aria-label'] ?? `Choose ${name}`}
              onClick={(cta as any).onClick}
              className={cn(
                'mt-7 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition',
                recommended
                  ? `${t.primaryBtn} ${t.primaryBtnHover}`
                  : `${t.outlineBtn} hover:bg-black/5 dark:hover:bg-white/5`,
                ctaClassName
              )}
            >
              {cta.label ?? 'Choose Plan'}
            </button>
          )}
        </>
      )}
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
