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
grid-card.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import { GridPattern } from '@/components/ui/grid-pattern';

export function GridCard({
	className,
	children,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn(
				'group bg-background relative isolate z-0 flex h-full flex-col justify-between overflow-hidden rounded-sm border px-5 py-4 transition-colors duration-75',
				className,
			)}
			{...props}
		>
			<div className="absolute inset-0">
				<div className="absolute -inset-[25%] -skew-y-12 [mask-image:linear-gradient(225deg,black,transparent)]">
					<GridPattern
						width={30}
						height={30}
						x={0}
						y={0}
						squares={getRandomPattern(5)}
						className="fill-border/50 stroke-border absolute inset-0 size-full translate-y-2 transition-transform duration-150 ease-out group-hover:translate-y-0"
					/>
				</div>
				<div
					className={cn(
						'absolute -inset-[10%] opacity-0 blur-[50px] transition-opacity duration-150 group-hover:opacity-10',
						'bg-[conic-gradient(#F35066_0deg,#F35066_117deg,#9071F9_180deg,#5182FC_240deg,#F35066_360deg)]',
					)}
				/>
			</div>
			{children}
		</div>
	);
}

function getRandomPattern(length?: number): [x: number, y: number][] {
	length = length ?? 5;
	return Array.from({ length }, () => [
		Math.floor(Math.random() * 4) + 7, // random x between 7 and 10
		Math.floor(Math.random() * 6) + 1, // random y between 1 and 6
	]);
}


code.demo.1758377223967.tsx
import { GridCard } from "@/components/ui/grid-card";
import { Grid2x2Check } from 'lucide-react';

export default function DemoOne() {
 	return (
		<div className="relative flex min-h-screen w-full items-center justify-center">
			<GridCard className="size-72">
				<Grid2x2Check className="text-foreground/80 relative size-8" />
				<div className="relative">
					<span className="text-foreground/80 text-lg font-medium">
						Grid Card
					</span>
					<p className="text-muted-foreground text-sm">
						Have you ever wondered how to create a grid card with a hover effect?
					</p>
				</div>
			</GridCard>
		</div>
	);
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/grid-card.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import { GridPattern } from '@/components/ui/grid-pattern';

export function GridCard({
	className,
	children,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn(
				'group bg-background relative isolate z-0 flex h-full flex-col justify-between overflow-hidden rounded-sm border px-5 py-4 transition-colors duration-75',
				className,
			)}
			{...props}
		>
			<div className="absolute inset-0">
				<div className="absolute -inset-[25%] -skew-y-12 [mask-image:linear-gradient(225deg,black,transparent)]">
					<GridPattern
						width={30}
						height={30}
						x={0}
						y={0}
						squares={getRandomPattern(5)}
						className="fill-border/50 stroke-border absolute inset-0 size-full translate-y-2 transition-transform duration-150 ease-out group-hover:translate-y-0"
					/>
				</div>
				<div
					className={cn(
						'absolute -inset-[10%] opacity-0 blur-[50px] transition-opacity duration-150 group-hover:opacity-10',
						'bg-[conic-gradient(#F35066_0deg,#F35066_117deg,#9071F9_180deg,#5182FC_240deg,#F35066_360deg)]',
					)}
				/>
			</div>
			{children}
		</div>
	);
}

function getRandomPattern(length?: number): [x: number, y: number][] {
	length = length ?? 5;
	return Array.from({ length }, () => [
		Math.floor(Math.random() * 4) + 7, // random x between 7 and 10
		Math.floor(Math.random() * 6) + 1, // random y between 1 and 6
	]);
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
