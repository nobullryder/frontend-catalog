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
search-modal.tsx
import React from 'react';
import {
	Modal,
	ModalContent,
	ModalTitle,
	ModalTrigger,
} from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';

import { LucideIcon, SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CommandItem = {
	id: string;
	title: string;
	description: string;
	category: string;
	icon?: LucideIcon;
	shortcut?: string;
};

type SearchModalProps = {
	children: React.ReactNode;
	data: CommandItem[];
};


export function SearchModal({ children, data }: SearchModalProps) {
	const [open, setOpen] = React.useState(false);
	const [query, setQuery] = React.useState('');

	React.useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<Modal open={open} onOpenChange={setOpen}>
			<ModalTrigger asChild>{children}</ModalTrigger>
			<ModalContent className="p-1">
				<ModalTitle className="sr-only">Search</ModalTitle>
				<Command className="bg-background md:bg-card rounded-md md:border">
					<CommandInput
						className={cn(
							'placeholder:text-muted-foreground flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
						)}
						placeholder="Search..."
						value={query}
						onValueChange={setQuery}
					/>
					<CommandList className="max-h-[380px] min-h-[380px] px-2 md:px-0">
						<CommandEmpty className="flex min-h-[280px] flex-col items-center justify-center">
							<SearchIcon className="text-muted-foreground mb-2 size-6" />
							<p className="text-muted-foreground mb-1 text-xs">
								No commands found for "{query}"
							</p>
							<Button onClick={() => setQuery('')} variant="ghost">
								Clear search
							</Button>
						</CommandEmpty>
						<CommandGroup>
							{data.map((item, i) => {
								return (
									<CommandItem
										key={i}
										className="flex cursor-pointer items-center gap-3"
										value={item.title}
										onSelect={() => setOpen(false)}
									>
										{item.icon && <item.icon className="size-5" />}
										<div className="flex flex-col">
											<p className="max-w-[250px] truncate text-sm font-medium">
												{item.title}
											</p>
											<p className="text-muted-foreground text-xs">
												{item.description}
											</p>
										</div>
										<p className="text-muted-foreground ml-auto text-xs">
											{item.category}
										</p>
									</CommandItem>
								);
							})}
						</CommandGroup>
					</CommandList>
				</Command>
			</ModalContent>
		</Modal>
	);
}

code.demo.1758821839137.tsx
import { SearchModal, CommandItem } from "@/components/ui/search-modal";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	SearchIcon,
	Moon,
	Home,
	Settings,
	User,
	Mail,
	Bell,
	Copy,
	Share2,
	RefreshCw,
	Trash2,
	Clock,
	Bookmark,
	HelpCircle,
	FileText,
	Zap,
	Palette,
	Globe,
	Lock,
	Volume2,
	Smartphone,
	Printer,
	Camera,
	Maximize,
	Info,
	GitBranch,
	Twitter,
	Play,
	Terminal,
} from 'lucide-react';


export default function DemoOne() {
  return (
		<div className="relative flex min-h-screen w-full items-center justify-center px-4">
			<SearchModal data={data}>
				<Button
					variant="outline"
					className="relative h-9 w-60 justify-between px-3 py-2"
				>
					<span className="inline-flex">Search...</span>
					<span className="sr-only">Search</span>
					<SearchIcon className="size-4" />
				</Button>
			</SearchModal>

			{/* Center Shade */}
			<div
				aria-hidden="true"
				className={cn(
					'pointer-events-none absolute -top-10 left-1/2 -z-10 size-full -translate-x-1/2 rounded-full',
					'bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]',
					'blur-[30px]',
				)}
			/>
		</div>
	);
}


const data: CommandItem[] = [
	// Navigation commands
	{
		id: 'nav-home',
		title: 'Go to Home',
		description: 'Navigate to the home page',
		category: 'Navigation',
		icon: Home,
	},
	{
		id: 'nav-about',
		title: 'Go to About',
		description: 'Learn more about us',
		category: 'Navigation',
		icon: Info,
	},
	{
		id: 'nav-settings',
		title: 'Go to Settings',
		description: 'Configure your preferences',
		category: 'Navigation',
		icon: Settings,
	},
	{
		id: 'nav-profile',
		title: 'Go to Profile',
		description: 'View and edit your profile',
		category: 'Navigation',
		icon: User,
	},
	{
		id: 'nav-messages',
		title: 'Go to Messages',
		description: 'Check your messages and notifications',
		category: 'Navigation',
		icon: Mail,
	},

	// System commands
	{
		id: 'theme-toggle',
		title: 'Toggle Theme',
		description: 'Switch between light, dark, and system themes',
		category: 'System',
		icon: Moon,
	},
	{
		id: 'toggle-notifications',
		title: 'Toggle Notifications',
		description: 'Enable or disable notifications',
		category: 'System',
		icon: Bell,
	},
	{
		id: 'toggle-fullscreen',
		title: 'Toggle Fullscreen',
		description: 'Enter or exit fullscreen mode',
		category: 'System',
		icon: Maximize,
	},

	{
		id: 'copy-url',
		title: 'Copy Current URL',
		description: 'Copy the current page URL to clipboard',
		category: 'Utility',
		icon: Copy,
	},
	{
		id: 'share-page',
		title: 'Share This Page',
		description: 'Share the current page with others',
		category: 'Utility',
		icon: Share2,
	},
	{
		id: 'print-page',
		title: 'Print Page',
		description: 'Print the current page',
		category: 'Utility',
		icon: Printer,
	},
	{
		id: 'take-screenshot',
		title: 'Take Screenshot',
		description: 'Capture the current page',
		category: 'Utility',
		icon: Camera,
	},

	// Application commands
	{
		id: 'refresh-page',
		title: 'Refresh Page',
		description: 'Reload the current page',
		category: 'Application',
		icon: RefreshCw,
	},
	{
		id: 'clear-cache',
		title: 'Clear Cache',
		description: 'Clear browser cache and storage',
		category: 'Application',
		icon: Trash2,
	},
	{
		id: 'view-history',
		title: 'View History',
		description: 'See your browsing history',
		category: 'Application',
		icon: Clock,
	},
	{
		id: 'bookmark-page',
		title: 'Bookmark Page',
		description: 'Add current page to bookmarks',
		category: 'Application',
		icon: Bookmark,
	},

	// AI and Help commands
	{
		id: 'ask-ai',
		title: 'Ask AI Assistant',
		description: 'Get help from the AI assistant',
		category: 'Tools',
		icon: Zap,
	},
	{
		id: 'help-center',
		title: 'Help Center',
		description: 'Visit the help center for assistance',
		category: 'Tools',
		icon: HelpCircle,
	},
	{
		id: 'keyboard-shortcuts',
		title: 'Keyboard Shortcuts',
		description: 'View all keyboard shortcuts',
		category: 'Tools',
		icon: FileText,
	},

	// Social commands
	{
		id: 'social-twitter',
		title: 'Open Twitter',
		description: 'Visit our Twitter page',
		category: 'Social',
		icon: Twitter,
	},
	{
		id: 'social-github',
		title: 'Open GitHub',
		description: 'Visit our GitHub repository',
		category: 'Social',
		icon: GitBranch,
	},
	{
		id: 'media-play',
		title: 'Play/Pause Media',
		description: 'Control media playback',
		category: 'Media',
		icon: Play,
	},
	{
		id: 'media-mute',
		title: 'Mute/Unmute',
		description: 'Toggle audio mute',
		category: 'Media',
		icon: Volume2,
	},

	// Development commands
	{
		id: 'dev-console',
		title: 'Open Console',
		description: 'Open browser developer console',
		category: 'Development',
		icon: Terminal,
	},
	{
		id: 'dev-responsive',
		title: 'Responsive Design Mode',
		description: 'Test responsive layouts',
		category: 'Development',
		icon: Smartphone,
	},

	// Settings commands
	{
		id: 'settings-appearance',
		title: 'Appearance Settings',
		description: 'Customize the application appearance',
		category: 'Settings',
		icon: Palette,
	},
	{
		id: 'settings-privacy',
		title: 'Privacy Settings',
		description: 'Manage your privacy preferences',
		category: 'Settings',
		icon: Lock,
	},
	{
		id: 'settings-language',
		title: 'Language Settings',
		description: 'Change the application language',
		category: 'Settings',
		icon: Globe,
	},
];

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/search-modal.tsx
import React from 'react';
import {
	Modal,
	ModalContent,
	ModalTitle,
	ModalTrigger,
} from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';

import { LucideIcon, SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CommandItem = {
	id: string;
	title: string;
	description: string;
	category: string;
	icon?: LucideIcon;
	shortcut?: string;
};

type SearchModalProps = {
	children: React.ReactNode;
	data: CommandItem[];
};


export function SearchModal({ children, data }: SearchModalProps) {
	const [open, setOpen] = React.useState(false);
	const [query, setQuery] = React.useState('');

	React.useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<Modal open={open} onOpenChange={setOpen}>
			<ModalTrigger asChild>{children}</ModalTrigger>
			<ModalContent className="p-1">
				<ModalTitle className="sr-only">Search</ModalTitle>
				<Command className="bg-background md:bg-card rounded-md md:border">
					<CommandInput
						className={cn(
							'placeholder:text-muted-foreground flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
						)}
						placeholder="Search..."
						value={query}
						onValueChange={setQuery}
					/>
					<CommandList className="max-h-[380px] min-h-[380px] px-2 md:px-0">
						<CommandEmpty className="flex min-h-[280px] flex-col items-center justify-center">
							<SearchIcon className="text-muted-foreground mb-2 size-6" />
							<p className="text-muted-foreground mb-1 text-xs">
								No commands found for "{query}"
							</p>
							<Button onClick={() => setQuery('')} variant="ghost">
								Clear search
							</Button>
						</CommandEmpty>
						<CommandGroup>
							{data.map((item, i) => {
								return (
									<CommandItem
										key={i}
										className="flex cursor-pointer items-center gap-3"
										value={item.title}
										onSelect={() => setOpen(false)}
									>
										{item.icon && <item.icon className="size-5" />}
										<div className="flex flex-col">
											<p className="max-w-[250px] truncate text-sm font-medium">
												{item.title}
											</p>
											<p className="text-muted-foreground text-xs">
												{item.description}
											</p>
										</div>
										<p className="text-muted-foreground ml-auto text-xs">
											{item.category}
										</p>
									</CommandItem>
								);
							})}
						</CommandGroup>
					</CommandList>
				</Command>
			</ModalContent>
		</Modal>
	);
}
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
