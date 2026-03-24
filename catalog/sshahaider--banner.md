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
banner.tsx
'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Button } from './button';

const bannerVariants = cva(
	'relative overflow-hidden rounded-md border shadow-lg text-sm',
	{
		variants: {
			variant: {
				default: 'bg-muted/40 border-muted/80',
				success:
					'bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-800 dark:text-green-100',
				warning:
					'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-100',
				info: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100',
				premium:
					'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-purple-900 dark:from-purple-900/20 dark:to-pink-900/20 dark:border-purple-800 dark:text-purple-100',
				gradient:
					'bg-slate-50 border-slate-200 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100',
			},
			size: {
				default: 'py-1.5 px-2.5',
				sm: 'text-xs py-1 px-2',
				lg: 'text-lg py-4 px-6',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

type BannerProps = React.ComponentProps<'div'> &
	VariantProps<typeof bannerVariants> & {
		// Content
		title: string;
		description?: string;

		// Icons and visuals
		icon?: React.ReactNode;
		showShade?: boolean;

		// Actions
		show?: boolean;
		onHide?: () => void;
		action?: React.ReactNode;
		closable?: boolean;

		// Behavior
		autoHide?: number; // milliseconds
	};

export function Banner({
	variant = 'default',
	size = 'default',
	title,
	description,
	icon,
	showShade = false,
	show,
	onHide,
	action,
	closable = false,
	className,
	autoHide,
	...props
}: BannerProps) {
	React.useEffect(() => {
		if (autoHide) {
			const timer = setTimeout(() => {
				onHide?.();
			}, autoHide);
			return () => clearTimeout(timer);
		}
	}, [autoHide, onHide]);

	if (!show) return null;

	return (
		<div
			className={cn(bannerVariants({ variant, size }), className)}
			role={variant === 'warning' || variant === 'default' ? 'alert' : 'status'}
			{...props}
		>
			{/* Shimmer effect */}
			{showShade && (
				<div className="absolute inset-0 -z-10 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
			)}

			<div className="flex items-center justify-between gap-4">
				<div className="flex min-w-0 flex-1 items-center gap-3">
					{icon && <div className="flex-shrink-0">{icon}</div>}

					<div className="min-w-0 flex-1">
						<div className="flex flex-wrap items-center">
							<p className="truncate font-semibold">{title}</p>
						</div>
						{description && <p className="text-xs opacity-80">{description}</p>}
					</div>
				</div>

				<div className="flex flex-shrink-0 items-center gap-2">
					{action && action}

					{closable && (
						<Button onClick={onHide} size="icon" variant="ghost">
							<X />
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}


code.demo.1755973959131.tsx
import React from 'react';
import { Banner } from "@/components/ui/banner";
import { cn } from '@/lib/utils';
import { ArrowRightIcon, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DefaultDemo() {
	const [show, setShow] = React.useState(true);

	return (
		<div className="relative flex h-full min-h-screen w-full items-center justify-center">
			{/* Radial spotlight */}
			<div
				aria-hidden="true"
				className={cn(
					'pointer-events-none absolute -top-1/3 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
					'bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]',
					'blur-[30px]',
				)}
			/>
			<Banner
				show={show}
				onHide={() => setShow(false)}
				variant="default"
				title="AI Dashboard is here!"
				description="Experience the future of analytics"
				showShade={true}
				closable={true}
				icon={<Rocket />}
				action={
					<Button
						onClick={() => setShow(false)}
						className="inline-flex items-center gap-1 rounded-md bg-black/10 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20"
						variant="ghost"
					>
						Try now
						<ArrowRightIcon className="h-3 w-3" />
					</Button>
				}
			/>
		</div>
	);
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/banner.tsx
'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Button } from './button';

const bannerVariants = cva(
	'relative overflow-hidden rounded-md border shadow-lg text-sm',
	{
		variants: {
			variant: {
				default: 'bg-muted/40 border-muted/80',
				success:
					'bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-800 dark:text-green-100',
				warning:
					'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-100',
				info: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100',
				premium:
					'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-purple-900 dark:from-purple-900/20 dark:to-pink-900/20 dark:border-purple-800 dark:text-purple-100',
				gradient:
					'bg-slate-50 border-slate-200 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100',
			},
			size: {
				default: 'py-1.5 px-2.5',
				sm: 'text-xs py-1 px-2',
				lg: 'text-lg py-4 px-6',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

type BannerProps = React.ComponentProps<'div'> &
	VariantProps<typeof bannerVariants> & {
		// Content
		title: string;
		description?: string;

		// Icons and visuals
		icon?: React.ReactNode;
		showShade?: boolean;

		// Actions
		show?: boolean;
		onHide?: () => void;
		action?: React.ReactNode;
		closable?: boolean;

		// Behavior
		autoHide?: number; // milliseconds
	};

export function Banner({
	variant = 'default',
	size = 'default',
	title,
	description,
	icon,
	showShade = false,
	show,
	onHide,
	action,
	closable = false,
	className,
	autoHide,
	...props
}: BannerProps) {
	React.useEffect(() => {
		if (autoHide) {
			const timer = setTimeout(() => {
				onHide?.();
			}, autoHide);
			return () => clearTimeout(timer);
		}
	}, [autoHide, onHide]);

	if (!show) return null;

	return (
		<div
			className={cn(bannerVariants({ variant, size }), className)}
			role={variant === 'warning' || variant === 'default' ? 'alert' : 'status'}
			{...props}
		>
			{/* Shimmer effect */}
			{showShade && (
				<div className="absolute inset-0 -z-10 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
			)}

			<div className="flex items-center justify-between gap-4">
				<div className="flex min-w-0 flex-1 items-center gap-3">
					{icon && <div className="flex-shrink-0">{icon}</div>}

					<div className="min-w-0 flex-1">
						<div className="flex flex-wrap items-center">
							<p className="truncate font-semibold">{title}</p>
						</div>
						{description && <p className="text-xs opacity-80">{description}</p>}
					</div>
				</div>

				<div className="flex flex-shrink-0 items-center gap-2">
					{action && action}

					{closable && (
						<Button onClick={onHide} size="icon" variant="ghost">
							<X />
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}

```

Install NPM dependencies:
```bash
lucide-react, class-variance-authority
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
