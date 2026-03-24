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
lazy-image.tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface LazyImageProps {
	alt: string;
	src: string;
	className?: string;
	AspectRatioClassName?: string;
	/** URL of the fallback image. default: undefined */
	fallback?: string;
	/** The ratio of the image. */
	ratio: number;
	/** Whether the image should only load when it is in view. default: false */
	inView?: boolean;
}

export function LazyImage({
	alt,
	src,
	ratio,
	fallback,
	inView = false,
	className,
	AspectRatioClassName,
}: LazyImageProps) {
	const ref = React.useRef<HTMLDivElement | null>(null);
	const imgRef = React.useRef<HTMLImageElement | null>(null);
	const isInView = useInView(ref, { once: true });

	const [imgSrc, setImgSrc] = React.useState<string | undefined>(
		inView ? undefined : src,
	);
	const [isLoading, setIsLoading] = React.useState(true);

	const handleError = () => {
		if (fallback) {
			setImgSrc(fallback);
		}
		setIsLoading(false);
	};

	const handleLoad = () => {
		setIsLoading(false);
	};

	// Load image only when inView
	React.useEffect(() => {
		if (inView && isInView && !imgSrc) {
			setImgSrc(src);
		}
	}, [inView, isInView, src, imgSrc]);

	// Handle cached images instantly
	React.useEffect(() => {
		if (imgRef.current && imgRef.current.complete) {
			handleLoad();
		}
	}, [imgSrc]);

	return (
		<AspectRatio
			ref={ref}
			ratio={ratio}
			className={cn(
				'relative size-full overflow-hidden rounded-lg border',
				AspectRatioClassName,
			)}
		>
			{/* Skeleton / fallback */}
			<div
				className={cn(
					'bg-accent/30 absolute inset-0 animate-pulse rounded-lg transition-opacity will-change-[opacity]',
					{ 'opacity-0': !isLoading },
				)}
			/>

			{imgSrc && (
				<img
					ref={imgRef}
					alt={alt}
					src={imgSrc}
					className={cn(
						'size-full rounded-lg object-cover opacity-0 transition-opacity duration-2000 will-change-[opacity]',
						{
							'opacity-100': !isLoading,
						},
						className,
					)}
					onLoad={handleLoad}
					onError={handleError}
					loading="lazy"
					decoding="async"
					fetchPriority={inView ? 'high' : 'low'}
				/>
			)}
		</AspectRatio>
	);
}


code.demo.1757314889496.tsx
'use client';
import React from 'react';
import { LazyImage } from '@/components/ui/lazy-image';
import { Button } from '@/components/ui/button';

export default function Demo() {
	const [instance, setInstance] = React.useState(0);
	return (
		<LazyImageDemo
			key={instance}
			onReload={() => setInstance((prev) => prev + 1)}
		/>
	);
}

function LazyImageDemo({ onReload }: { onReload: () => void }) {
	const [seed] = React.useState(() => Math.floor(Math.random() * 1000));

	const imageUrl = `https://picsum.photos/seed/${seed}/1280/720`;

	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 p-4">
			<Button onClick={onReload}>Load Image</Button>
			<div className="mx-auto w-full max-w-4xl">
				<LazyImage
					alt="Random"
					src={imageUrl}
					ratio={16 / 9}
					fallback="https://placehold.co/1280x720?text=fallback-image"
				/>
			</div>
		</div>
	);
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/lazy-image.tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface LazyImageProps {
	alt: string;
	src: string;
	className?: string;
	AspectRatioClassName?: string;
	/** URL of the fallback image. default: undefined */
	fallback?: string;
	/** The ratio of the image. */
	ratio: number;
	/** Whether the image should only load when it is in view. default: false */
	inView?: boolean;
}

export function LazyImage({
	alt,
	src,
	ratio,
	fallback,
	inView = false,
	className,
	AspectRatioClassName,
}: LazyImageProps) {
	const ref = React.useRef<HTMLDivElement | null>(null);
	const imgRef = React.useRef<HTMLImageElement | null>(null);
	const isInView = useInView(ref, { once: true });

	const [imgSrc, setImgSrc] = React.useState<string | undefined>(
		inView ? undefined : src,
	);
	const [isLoading, setIsLoading] = React.useState(true);

	const handleError = () => {
		if (fallback) {
			setImgSrc(fallback);
		}
		setIsLoading(false);
	};

	const handleLoad = () => {
		setIsLoading(false);
	};

	// Load image only when inView
	React.useEffect(() => {
		if (inView && isInView && !imgSrc) {
			setImgSrc(src);
		}
	}, [inView, isInView, src, imgSrc]);

	// Handle cached images instantly
	React.useEffect(() => {
		if (imgRef.current && imgRef.current.complete) {
			handleLoad();
		}
	}, [imgSrc]);

	return (
		<AspectRatio
			ref={ref}
			ratio={ratio}
			className={cn(
				'relative size-full overflow-hidden rounded-lg border',
				AspectRatioClassName,
			)}
		>
			{/* Skeleton / fallback */}
			<div
				className={cn(
					'bg-accent/30 absolute inset-0 animate-pulse rounded-lg transition-opacity will-change-[opacity]',
					{ 'opacity-0': !isLoading },
				)}
			/>

			{imgSrc && (
				<img
					ref={imgRef}
					alt={alt}
					src={imgSrc}
					className={cn(
						'size-full rounded-lg object-cover opacity-0 transition-opacity duration-2000 will-change-[opacity]',
						{
							'opacity-100': !isLoading,
						},
						className,
					)}
					onLoad={handleLoad}
					onError={handleError}
					loading="lazy"
					decoding="async"
					fetchPriority={inView ? 'high' : 'low'}
				/>
			)}
		</AspectRatio>
	);
}

```

Install NPM dependencies:
```bash
framer-motion
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
