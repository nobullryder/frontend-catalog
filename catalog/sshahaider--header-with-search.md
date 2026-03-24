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
header-with-search.tsx
import React from 'react';
import { Grid2x2PlusIcon, MenuIcon, SearchIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CommandItem, SearchModal } from '@/components/ui/search-modal';

export function Header() {
	const [open, setOpen] = React.useState(false);

	const links = [
		{
			label: 'Features',
			href: '#',
		},
		{
			label: 'Pricing',
			href: '#',
		},
		{
			label: 'About',
			href: '#',
		},
	];

	return (
		<header
			className={cn(
				// TODO: replace this top-1/4 to top-0
				'sticky top-1/4 z-50 w-full border-b backdrop-blur-lg',
				'bg-background/95 supports-[backdrop-filter]:bg-background/80',
			)}
		>
			<nav className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-4">
				<div className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 duration-100">
					<Grid2x2PlusIcon className="size-6" />
					<p className="font-mono text-lg font-bold">Asme</p>
				</div>
				<div className="flex items-center gap-2">
					<div className="hidden items-center gap-1 lg:flex">
						{links.map((link) => (
							<a
								className={buttonVariants({ variant: 'ghost' })}
								href={link.href}
							>
								{link.label}
							</a>
						))}
						{/* <Button variant="outline">Sign In</Button>
					<Button>Get Started</Button> */}
					</div>
					<SearchModal data={blogs}>
						<Button
							variant="outline"
							className="relative size-9 cursor-pointer p-0 md:border xl:h-9 xl:w-60 xl:justify-between xl:px-3 xl:py-2"
						>
							<span className="hidden xl:inline-flex">Search...</span>
							<span className="sr-only">Search</span>
							<SearchIcon className="size-4" />
						</Button>
					</SearchModal>
					<Sheet open={open} onOpenChange={setOpen}>
						<Button
							size="icon"
							variant="outline"
							onClick={() => setOpen(!open)}
							className="lg:hidden"
						>
							<MenuIcon className="size-4" />
						</Button>
						<SheetContent
							className="bg-background/95 supports-[backdrop-filter]:bg-background/80 gap-0 backdrop-blur-lg"
							showClose={false}
							side="left"
						>
							<div className="grid gap-y-2 overflow-y-auto px-4 pt-12 pb-5">
								{links.map((link) => (
									<a
										className={buttonVariants({
											variant: 'ghost',
											className: 'justify-start',
										})}
										href={link.href}
									>
										{link.label}
									</a>
								))}
							</div>
							<SheetFooter>
								<Button variant="outline">Sign In</Button>
								<Button>Get Started</Button>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</header>
	);
}

const blogs: CommandItem[] = [
	{
		id: 'blog-1',
		title: 'The Future of Web Dev',
		description: 'A quick look at upcoming web technologies.',
		category: 'Web Dev',
	},
	{
		id: 'blog-2',
		title: 'Minimalist Design Tips',
		description: 'Learn how less can often be more in UI design.',
		category: 'Design',
	},
	{
		id: 'blog-3',
		title: 'Boosting Page Speed',
		description: 'Simple tricks to make your site load faster.',
		category: 'Performance',
	},
	{
		id: 'blog-4',
		title: 'Intro to TypeScript',
		description: 'Why TypeScript makes JavaScript safer and clearer.',
		category: 'Programming',
	},
	{
		id: 'blog-5',
		title: 'Dark Mode Design',
		description: 'Best practices for building a dark theme UI.',
		category: 'Design',
	},
	{
		id: 'blog-6',
		title: 'Understanding APIs',
		description: 'Breaking down REST and GraphQL for beginners.',
		category: 'Backend',
	},
	{
		id: 'blog-7',
		title: 'CSS Grid Basics',
		description: 'A quick guide to building layouts with CSS Grid.',
		category: 'Frontend',
	},
	{
		id: 'blog-8',
		title: 'React State Management',
		description: 'Exploring useState, Redux, and other options.',
		category: 'Frontend',
	},
	{
		id: 'blog-9',
		title: 'SEO in 2025',
		description: 'Trends and tips to rank higher on Google.',
		category: 'SEO',
	},
	{
		id: 'blog-10',
		title: 'Debugging Like a Pro',
		description: 'Tools and techniques to fix bugs faster.',
		category: 'Programming',
	},
];


code.demo.1758859218029.tsx
import { Header } from "@/components/ui/header-with-search";
import { cn } from '@/lib/utils';

export default function DemoOne() {
	return (
		<div className="relative min-h-screen w-full">
			<Header />

			<div
				aria-hidden="true"
				className={cn(
					'absolute inset-0 -z-10 size-full',
					'bg-[radial-gradient(color-mix(in_oklab,--theme(--color-foreground/.5)30%,transparent)_2px,transparent_2px)]',
					'bg-[size:12px_12px]',
				)}
			/>
		</div>
	);
  }

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/header-with-search.tsx
import React from 'react';
import { Grid2x2PlusIcon, MenuIcon, SearchIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CommandItem, SearchModal } from '@/components/ui/search-modal';

export function Header() {
	const [open, setOpen] = React.useState(false);

	const links = [
		{
			label: 'Features',
			href: '#',
		},
		{
			label: 'Pricing',
			href: '#',
		},
		{
			label: 'About',
			href: '#',
		},
	];

	return (
		<header
			className={cn(
				// TODO: replace this top-1/4 to top-0
				'sticky top-1/4 z-50 w-full border-b backdrop-blur-lg',
				'bg-background/95 supports-[backdrop-filter]:bg-background/80',
			)}
		>
			<nav className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-4">
				<div className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 duration-100">
					<Grid2x2PlusIcon className="size-6" />
					<p className="font-mono text-lg font-bold">Asme</p>
				</div>
				<div className="flex items-center gap-2">
					<div className="hidden items-center gap-1 lg:flex">
						{links.map((link) => (
							<a
								className={buttonVariants({ variant: 'ghost' })}
								href={link.href}
							>
								{link.label}
							</a>
						))}
						{/* <Button variant="outline">Sign In</Button>
					<Button>Get Started</Button> */}
					</div>
					<SearchModal data={blogs}>
						<Button
							variant="outline"
							className="relative size-9 cursor-pointer p-0 md:border xl:h-9 xl:w-60 xl:justify-between xl:px-3 xl:py-2"
						>
							<span className="hidden xl:inline-flex">Search...</span>
							<span className="sr-only">Search</span>
							<SearchIcon className="size-4" />
						</Button>
					</SearchModal>
					<Sheet open={open} onOpenChange={setOpen}>
						<Button
							size="icon"
							variant="outline"
							onClick={() => setOpen(!open)}
							className="lg:hidden"
						>
							<MenuIcon className="size-4" />
						</Button>
						<SheetContent
							className="bg-background/95 supports-[backdrop-filter]:bg-background/80 gap-0 backdrop-blur-lg"
							showClose={false}
							side="left"
						>
							<div className="grid gap-y-2 overflow-y-auto px-4 pt-12 pb-5">
								{links.map((link) => (
									<a
										className={buttonVariants({
											variant: 'ghost',
											className: 'justify-start',
										})}
										href={link.href}
									>
										{link.label}
									</a>
								))}
							</div>
							<SheetFooter>
								<Button variant="outline">Sign In</Button>
								<Button>Get Started</Button>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</header>
	);
}

const blogs: CommandItem[] = [
	{
		id: 'blog-1',
		title: 'The Future of Web Dev',
		description: 'A quick look at upcoming web technologies.',
		category: 'Web Dev',
	},
	{
		id: 'blog-2',
		title: 'Minimalist Design Tips',
		description: 'Learn how less can often be more in UI design.',
		category: 'Design',
	},
	{
		id: 'blog-3',
		title: 'Boosting Page Speed',
		description: 'Simple tricks to make your site load faster.',
		category: 'Performance',
	},
	{
		id: 'blog-4',
		title: 'Intro to TypeScript',
		description: 'Why TypeScript makes JavaScript safer and clearer.',
		category: 'Programming',
	},
	{
		id: 'blog-5',
		title: 'Dark Mode Design',
		description: 'Best practices for building a dark theme UI.',
		category: 'Design',
	},
	{
		id: 'blog-6',
		title: 'Understanding APIs',
		description: 'Breaking down REST and GraphQL for beginners.',
		category: 'Backend',
	},
	{
		id: 'blog-7',
		title: 'CSS Grid Basics',
		description: 'A quick guide to building layouts with CSS Grid.',
		category: 'Frontend',
	},
	{
		id: 'blog-8',
		title: 'React State Management',
		description: 'Exploring useState, Redux, and other options.',
		category: 'Frontend',
	},
	{
		id: 'blog-9',
		title: 'SEO in 2025',
		description: 'Trends and tips to rank higher on Google.',
		category: 'SEO',
	},
	{
		id: 'blog-10',
		title: 'Debugging Like a Pro',
		description: 'Tools and techniques to fix bugs faster.',
		category: 'Programming',
	},
];

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
