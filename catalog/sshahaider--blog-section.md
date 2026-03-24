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
blog-section.tsx
import React from 'react';
import { LazyImage } from './lazy-image';

const blogs = [
	{
		title: 'Design Systems That Scale',
		slug: '#',
		description:
			'Learn how to build and maintain scalable design systems that empower teams to move faster while staying consistent.',
		image: 'https://picsum.photos/seed/1/640/360',
		createdAt: '2025-08-25',
		author: 'Ava Mitchell',
		readTime: '7 min read',
	},
	{
		title: 'The Psychology of Color in UI',
		slug: '#',
		description:
			'Explore how different colors influence user perception, emotion, and conversion in digital product design.',
		image: 'https://picsum.photos/seed/2/640/360',
		createdAt: '2025-07-14',
		author: 'Liam Carter',
		readTime: '5 min read',
	},
	{
		title: 'Microinteractions That Delight',
		slug: '#',
		description:
			'Discover how subtle animations and interactions can enhance usability and bring joy to your users.',
		image: 'https://picsum.photos/seed/3/640/360',
		createdAt: '2025-06-30',
		author: 'Sophia Kim',
		readTime: '6 min read',
	},
	{
		title: 'Accessibility Beyond Compliance',
		slug: '#',
		description:
			'Practical steps to make your UI accessible, not just legally compliant, but genuinely inclusive for everyone.',
		image: 'https://picsum.photos/seed/4/640/360',
		createdAt: '2025-06-18',
		author: 'Ethan Rodriguez',
		readTime: '8 min read',
	},
	{
		title: 'Dark Mode Done Right',
		slug: '#',
		description:
			'Tips and tricks to design beautiful and functional dark mode experiences that users will love.',
		image: 'https://picsum.photos/seed/5/640/360',
		createdAt: '2025-05-20',
		author: 'Maya Chen',
		readTime: '4 min read',
	},
	{
		title: 'Typography That Speaks',
		slug: '#',
		description:
			'How to select and pair typefaces that enhance readability, hierarchy, and brand personality.',
		image: 'https://picsum.photos/seed/6/640/360',
		createdAt: '2025-05-02',
		author: 'Noah Patel',
		readTime: '9 min read',
	},
	{
		title: 'The Future of UI Animation',
		slug: '#',
		description:
			'From motion guidelines to advanced prototyping—discover where UI animation is headed in 2025.',
		image: 'https://picsum.photos/seed/7/640/360',
		createdAt: '2025-04-15',
		author: 'Chloe Ramirez',
		readTime: '10 min read',
	},
	{
		title: 'Minimalism vs Maximalism in Design',
		slug: '#',
		description:
			'A deep dive into two opposing design philosophies and how to decide which fits your product.',
		image: 'https://picsum.photos/seed/8/640/360',
		createdAt: '2025-04-01',
		author: 'Benjamin Scott',
		readTime: '6 min read',
	},
	{
		title: 'Designing for Mobile-First',
		slug: '#',
		description:
			'Best practices for mobile-first design, from layout decisions to performance optimization.',
		image: 'https://picsum.photos/seed/9/640/360',
		createdAt: '2025-03-22',
		author: 'Isabella White',
		readTime: '7 min read',
	},
	{
		title: 'Figma Hacks for Power Users',
		slug: '#',
		description:
			'Hidden features, shortcuts, and workflows in Figma that can dramatically speed up your design process.',
		image: 'https://picsum.photos/seed/10/640/360',
		createdAt: '2025-03-09',
		author: 'James Walker',
		readTime: '5 min read',
	},
	{
		title: 'Designing With AI Tools',
		slug: '#',
		description:
			'A practical look at how AI tools are shaping UI/UX workflows—from ideation to final delivery.',
		image: 'https://picsum.photos/seed/11/640/360',
		createdAt: '2025-02-28',
		author: 'Olivia Brooks',
		readTime: '8 min read',
	},
	{
		title: 'The Art of Prototyping',
		slug: '#',
		description:
			'How to create prototypes that effectively communicate your ideas and speed up stakeholder feedback.',
		image: 'https://picsum.photos/seed/12/640/360',
		createdAt: '2025-02-14',
		author: 'Daniel Green',
		readTime: '6 min read',
	},
];

export function BlogSection() {
	return (
		<div className="mx-auto w-full max-w-5xl grow">
			<div
				aria-hidden
				className="absolute inset-0 isolate contain-strict -z-10 opacity-60"
			>
				<div className="-rotate-45 bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 rounded-full" />
				<div className="-rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] rounded-full" />
				<div className="-rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 -translate-y-87.5 rounded-full" />
			</div>
			<div className="space-y-1 px-4 py-8">
				<h1 className="font-mono text-4xl font-bold tracking-wide">
					Blog Section
				</h1>
				<p className="text-muted-foreground text-base">
					Discover the latest trends and insights in the world of design and
					technology.
				</p>
			</div>
			<div className="absolute inset-x-0 h-px w-full border-b border-dashed" />
			<div className="grid p-4 md:grid-cols-2 lg:grid-cols-3 z-10">
				{blogs.map((blog) => (
					<a
						href={blog.slug}
						key={blog.title}
						className="group hover:bg-accent/60 active:bg-accent flex flex-col gap-2 rounded-lg p-2 duration-75"
					>
						<LazyImage
							src={blog.image}
							fallback="https://placehold.co/640x360?text=fallback-image"
							inView={true}
							alt={blog.title}
							ratio={16 / 9}
							className="transition-all duration-500 group-hover:scale-105"
						/>
						<div className="space-y-2 px-2 pb-2">
							<div className="text-muted-foreground flex items-center gap-2 text-[11px] sm:text-xs">
								<p>by {blog.author}</p>
								<div className="bg-muted-foreground size-1 rounded-full" />
								<p>{blog.createdAt}</p>
								<div className="bg-muted-foreground size-1 rounded-full" />
								<p>{blog.readTime}</p>
							</div>
							<h2 className="line-clamp-2 text-lg leading-5 font-semibold tracking-tight">
								{blog.title}
							</h2>
							<p className="text-muted-foreground line-clamp-3 text-sm">
								{blog.description}
							</p>
						</div>
					</a>
				))}
			</div>
		</div>
	);
}


code.demo.1757315017002.tsx
import { BlogSection } from "@/components/ui/blog-section";

export default function DemoOne() {
  return <BlogSection />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/blog-section.tsx
import React from 'react';
import { LazyImage } from './lazy-image';

const blogs = [
	{
		title: 'Design Systems That Scale',
		slug: '#',
		description:
			'Learn how to build and maintain scalable design systems that empower teams to move faster while staying consistent.',
		image: 'https://picsum.photos/seed/1/640/360',
		createdAt: '2025-08-25',
		author: 'Ava Mitchell',
		readTime: '7 min read',
	},
	{
		title: 'The Psychology of Color in UI',
		slug: '#',
		description:
			'Explore how different colors influence user perception, emotion, and conversion in digital product design.',
		image: 'https://picsum.photos/seed/2/640/360',
		createdAt: '2025-07-14',
		author: 'Liam Carter',
		readTime: '5 min read',
	},
	{
		title: 'Microinteractions That Delight',
		slug: '#',
		description:
			'Discover how subtle animations and interactions can enhance usability and bring joy to your users.',
		image: 'https://picsum.photos/seed/3/640/360',
		createdAt: '2025-06-30',
		author: 'Sophia Kim',
		readTime: '6 min read',
	},
	{
		title: 'Accessibility Beyond Compliance',
		slug: '#',
		description:
			'Practical steps to make your UI accessible, not just legally compliant, but genuinely inclusive for everyone.',
		image: 'https://picsum.photos/seed/4/640/360',
		createdAt: '2025-06-18',
		author: 'Ethan Rodriguez',
		readTime: '8 min read',
	},
	{
		title: 'Dark Mode Done Right',
		slug: '#',
		description:
			'Tips and tricks to design beautiful and functional dark mode experiences that users will love.',
		image: 'https://picsum.photos/seed/5/640/360',
		createdAt: '2025-05-20',
		author: 'Maya Chen',
		readTime: '4 min read',
	},
	{
		title: 'Typography That Speaks',
		slug: '#',
		description:
			'How to select and pair typefaces that enhance readability, hierarchy, and brand personality.',
		image: 'https://picsum.photos/seed/6/640/360',
		createdAt: '2025-05-02',
		author: 'Noah Patel',
		readTime: '9 min read',
	},
	{
		title: 'The Future of UI Animation',
		slug: '#',
		description:
			'From motion guidelines to advanced prototyping—discover where UI animation is headed in 2025.',
		image: 'https://picsum.photos/seed/7/640/360',
		createdAt: '2025-04-15',
		author: 'Chloe Ramirez',
		readTime: '10 min read',
	},
	{
		title: 'Minimalism vs Maximalism in Design',
		slug: '#',
		description:
			'A deep dive into two opposing design philosophies and how to decide which fits your product.',
		image: 'https://picsum.photos/seed/8/640/360',
		createdAt: '2025-04-01',
		author: 'Benjamin Scott',
		readTime: '6 min read',
	},
	{
		title: 'Designing for Mobile-First',
		slug: '#',
		description:
			'Best practices for mobile-first design, from layout decisions to performance optimization.',
		image: 'https://picsum.photos/seed/9/640/360',
		createdAt: '2025-03-22',
		author: 'Isabella White',
		readTime: '7 min read',
	},
	{
		title: 'Figma Hacks for Power Users',
		slug: '#',
		description:
			'Hidden features, shortcuts, and workflows in Figma that can dramatically speed up your design process.',
		image: 'https://picsum.photos/seed/10/640/360',
		createdAt: '2025-03-09',
		author: 'James Walker',
		readTime: '5 min read',
	},
	{
		title: 'Designing With AI Tools',
		slug: '#',
		description:
			'A practical look at how AI tools are shaping UI/UX workflows—from ideation to final delivery.',
		image: 'https://picsum.photos/seed/11/640/360',
		createdAt: '2025-02-28',
		author: 'Olivia Brooks',
		readTime: '8 min read',
	},
	{
		title: 'The Art of Prototyping',
		slug: '#',
		description:
			'How to create prototypes that effectively communicate your ideas and speed up stakeholder feedback.',
		image: 'https://picsum.photos/seed/12/640/360',
		createdAt: '2025-02-14',
		author: 'Daniel Green',
		readTime: '6 min read',
	},
];

export function BlogSection() {
	return (
		<div className="mx-auto w-full max-w-5xl grow">
			<div
				aria-hidden
				className="absolute inset-0 isolate contain-strict -z-10 opacity-60"
			>
				<div className="-rotate-45 bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 rounded-full" />
				<div className="-rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] rounded-full" />
				<div className="-rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 -translate-y-87.5 rounded-full" />
			</div>
			<div className="space-y-1 px-4 py-8">
				<h1 className="font-mono text-4xl font-bold tracking-wide">
					Blog Section
				</h1>
				<p className="text-muted-foreground text-base">
					Discover the latest trends and insights in the world of design and
					technology.
				</p>
			</div>
			<div className="absolute inset-x-0 h-px w-full border-b border-dashed" />
			<div className="grid p-4 md:grid-cols-2 lg:grid-cols-3 z-10">
				{blogs.map((blog) => (
					<a
						href={blog.slug}
						key={blog.title}
						className="group hover:bg-accent/60 active:bg-accent flex flex-col gap-2 rounded-lg p-2 duration-75"
					>
						<LazyImage
							src={blog.image}
							fallback="https://placehold.co/640x360?text=fallback-image"
							inView={true}
							alt={blog.title}
							ratio={16 / 9}
							className="transition-all duration-500 group-hover:scale-105"
						/>
						<div className="space-y-2 px-2 pb-2">
							<div className="text-muted-foreground flex items-center gap-2 text-[11px] sm:text-xs">
								<p>by {blog.author}</p>
								<div className="bg-muted-foreground size-1 rounded-full" />
								<p>{blog.createdAt}</p>
								<div className="bg-muted-foreground size-1 rounded-full" />
								<p>{blog.readTime}</p>
							</div>
							<h2 className="line-clamp-2 text-lg leading-5 font-semibold tracking-tight">
								{blog.title}
							</h2>
							<p className="text-muted-foreground line-clamp-3 text-sm">
								{blog.description}
							</p>
						</div>
					</a>
				))}
			</div>
		</div>
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
