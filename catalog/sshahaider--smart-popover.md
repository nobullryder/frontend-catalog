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
smart-popover.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-media-query';
import {
	Popover,
	PopoverHeader,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	PopoverFooter,
	PopoverTitle,
	PopoverDescription,
	PopoverClose
} from '@/components/ui/popover';
import {
	Drawer,
	DrawerTrigger,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
	DrawerFooter,
	DrawerBody,
	DrawerClose
} from '@/components/ui/drawer';

const SmartPopoverContext = React.createContext<{ isMobile: boolean } | null>(
	null,
);

function useSmartPopoverContext() {
	const context = React.useContext(SmartPopoverContext);
	if (!context) {
		throw new Error(
			'SmartPopoverTrigger or SmartPopoverContent must be used within <SmartPopover>',
		);
	}
	return context;
}

type SmartPopoverProps = {
	children: React.ReactNode;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	defaultOpen?: boolean;
	popoverProps?: React.ComponentProps<typeof Popover>;
	drawerProps?: React.ComponentProps<typeof Drawer>;
};

function SmartPopover({
	children,
	open,
	onOpenChange,
	defaultOpen,
	popoverProps,
	drawerProps,
}: SmartPopoverProps) {
	const isMobile = useIsMobile();
	const Component = isMobile ? Drawer : Popover;
	const props = isMobile ? drawerProps : popoverProps;

	return (
		<SmartPopoverContext.Provider value={{ isMobile }}>
			<Component
				open={open ?? defaultOpen}
				onOpenChange={onOpenChange}
				{...props}
			>
				{children}
			</Component>
		</SmartPopoverContext.Provider>
	);
}

function SmartPopoverTrigger({
	children,
	drawerProps,
	popoverProps,
}: {
	children: React.ReactNode;
	asChild?: boolean;
	drawerProps?: React.ComponentProps<typeof DrawerTrigger>;
	popoverProps?: React.ComponentProps<typeof PopoverTrigger>;
}) {
	const { isMobile } = useSmartPopoverContext();
	const Trigger = isMobile ? DrawerTrigger : PopoverTrigger;
	const props = isMobile ? drawerProps : popoverProps;

	return (
		<Trigger asChild {...props}>
			{children}
		</Trigger>
	);
}

function SmartPopoverContent({
	children,
	drawerProps,
	className,
	popoverProps,
}: {
	children: React.ReactNode;
	className?: React.ComponentProps<'div'>['className'];
	popoverProps?: React.ComponentProps<typeof PopoverContent>;
	drawerProps?: React.ComponentProps<typeof DrawerContent>;
}) {
	const { isMobile } = useSmartPopoverContext();
	const Content = isMobile ? DrawerContent : PopoverContent;
	const props = isMobile ? drawerProps : popoverProps;

	return (
		<Content className={cn(!isMobile && 'p-0', className)} {...props}>
			{children}
		</Content>
	);
}

function SmartPopoverHeader(props: React.ComponentProps<'div'>) {
	const { isMobile } = useSmartPopoverContext();
	const Header = isMobile ? DrawerHeader : PopoverHeader;

	return <Header {...props} />;
}

function SmartPopoverTitle(props: React.ComponentProps<'p'>) {
	const { isMobile } = useSmartPopoverContext();
	const Title = isMobile ? DrawerTitle : PopoverTitle;
	return <Title {...props} />;
}

function SmartPopoverDescription(props: React.ComponentProps<'p'>) {
	const { isMobile } = useSmartPopoverContext();
	const Description = isMobile ? DrawerDescription : PopoverDescription;
	return <Description {...props} />;
}

function SmartPopoverFooter(props: React.ComponentProps<'div'>) {
	const { isMobile } = useSmartPopoverContext();
	const Footer = isMobile ? DrawerFooter : PopoverFooter;
	return <Footer {...props} />;
}

function SmartPopoverBody(props: React.ComponentProps<'div'>) {
	const { isMobile } = useSmartPopoverContext();
	const Body = isMobile ? DrawerBody : PopoverBody;
	return <Body {...props} />;
}

function SmartPopoverClose(props: React.ComponentProps<typeof DrawerClose>) {
	const { isMobile } = useSmartPopoverContext();
	const Close = isMobile ? DrawerClose : PopoverClose;
	return <Close {...props} />;
}

export {
	SmartPopover,
	SmartPopoverTrigger,
	SmartPopoverContent,
	SmartPopoverHeader,
	SmartPopoverBody,
	SmartPopoverTitle,
	SmartPopoverDescription,
	SmartPopoverFooter,
	SmartPopoverClose,
};


code.demo.1753818428320.tsx
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-media-query';
import {
	SmartPopover,
	SmartPopoverBody,
	SmartPopoverContent,
	SmartPopoverDescription,
	SmartPopoverFooter,
	SmartPopoverHeader,
	SmartPopoverTitle,
	SmartPopoverTrigger,
} from '@/components/ui/smart-popover';
import { User, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function Preview() {
	const [open, setOpen] = React.useState(false);

	return (
		<SmartPopover open={open} onOpenChange={setOpen}>
			<SmartPopoverTrigger asChild>
				<Button variant="outline">Open Popover</Button>
			</SmartPopoverTrigger>
			<SmartPopoverContent className='md:w-62'>
				<SmartPopoverHeader>
					<div className="flex items-center space-x-3">
						<Avatar className="h-10 w-10">
							<AvatarImage src="https://avatar.vercel.sh/128" />
							<AvatarFallback>JD</AvatarFallback>
						</Avatar>
						<div>
							<SmartPopoverTitle>John Doe</SmartPopoverTitle>
							<SmartPopoverDescription className='text-xs'>john.doe@example.com</SmartPopoverDescription>
						</div>
					</div>
				</SmartPopoverHeader>
				<SmartPopoverBody className="space-y-1 px-2 py-4 md:py-2">
					<Button variant="ghost" className="w-full justify-start" size="sm">
						<User className="mr-2 h-4 w-4" />
						View Profile
					</Button>
					<Button variant="ghost" className="w-full justify-start" size="sm">
						<Settings className="mr-2 h-4 w-4" />
						Settings
					</Button>
				</SmartPopoverBody>
				<SmartPopoverFooter>
					<Button variant="outline" className="w-full bg-transparent" size="sm">
						Sign Out
					</Button>
				</SmartPopoverFooter>
			</SmartPopoverContent>
		</SmartPopover>
	);
}

export default function Default() {
	return (
		<div className="flex min-h-screen flex-col items-center space-y-12 py-24">
			<DeviceIndicator />
			<div className="space-y-3 text-center">
				<h1 className="text-6xl font-extrabold tracking-tight">
					Responsive Popover
				</h1>
				<p className="text-xl font-medium">
					This popover automatically adapts to your device:
				</p>
				<div className="flex justify-center gap-8 text-sm">
					<div className="flex items-center gap-2 rounded-md border p-1">
						<div className="h-3 w-3 rounded-full bg-blue-500" />
						<span className="flex items-center gap-2">
							<strong className="font-semibold">Desktop:</strong>{' '}
							<code>
								<pre>{`<Popover />`}</pre>
							</code>
						</span>
					</div>
					<div className="flex items-center gap-2 rounded-md border p-1">
						<div className="h-3 w-3 rounded-full bg-green-500" />
						<span className="flex items-center gap-2">
							<strong className="font-semibold">Mobile:</strong>{' '}
							<code>
								<pre>{`<Drawer />`}</pre>
							</code>
						</span>
					</div>
				</div>
			</div>

			<Preview />
			<p className="text-muted-foreground text-sm">
				*Try resizing your browser window or opening this on different devices!
			</p>
		</div>
	);
}

function DeviceIndicator() {
	const isMobile = useIsMobile();

	return (
		<div className="fixed top-4 left-4 z-50">
			<div
				className={`bg-muted rounded-full border px-3 py-2 text-sm font-medium`}
			>
				<div className="flex items-center gap-2">
					<div
						className={`h-2 w-2 rounded-full ${isMobile ? 'bg-green-500' : 'bg-blue-500'}`}
					/>
					{isMobile ? 'Mobile' : 'Desktop'}
				</div>
			</div>
		</div>
	);
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/smart-popover.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-media-query';
import {
	Popover,
	PopoverHeader,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	PopoverFooter,
	PopoverTitle,
	PopoverDescription,
	PopoverClose
} from '@/components/ui/popover';
import {
	Drawer,
	DrawerTrigger,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
	DrawerFooter,
	DrawerBody,
	DrawerClose
} from '@/components/ui/drawer';

const SmartPopoverContext = React.createContext<{ isMobile: boolean } | null>(
	null,
);

function useSmartPopoverContext() {
	const context = React.useContext(SmartPopoverContext);
	if (!context) {
		throw new Error(
			'SmartPopoverTrigger or SmartPopoverContent must be used within <SmartPopover>',
		);
	}
	return context;
}

type SmartPopoverProps = {
	children: React.ReactNode;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	defaultOpen?: boolean;
	popoverProps?: React.ComponentProps<typeof Popover>;
	drawerProps?: React.ComponentProps<typeof Drawer>;
};

function SmartPopover({
	children,
	open,
	onOpenChange,
	defaultOpen,
	popoverProps,
	drawerProps,
}: SmartPopoverProps) {
	const isMobile = useIsMobile();
	const Component = isMobile ? Drawer : Popover;
	const props = isMobile ? drawerProps : popoverProps;

	return (
		<SmartPopoverContext.Provider value={{ isMobile }}>
			<Component
				open={open ?? defaultOpen}
				onOpenChange={onOpenChange}
				{...props}
			>
				{children}
			</Component>
		</SmartPopoverContext.Provider>
	);
}

function SmartPopoverTrigger({
	children,
	drawerProps,
	popoverProps,
}: {
	children: React.ReactNode;
	asChild?: boolean;
	drawerProps?: React.ComponentProps<typeof DrawerTrigger>;
	popoverProps?: React.ComponentProps<typeof PopoverTrigger>;
}) {
	const { isMobile } = useSmartPopoverContext();
	const Trigger = isMobile ? DrawerTrigger : PopoverTrigger;
	const props = isMobile ? drawerProps : popoverProps;

	return (
		<Trigger asChild {...props}>
			{children}
		</Trigger>
	);
}

function SmartPopoverContent({
	children,
	drawerProps,
	className,
	popoverProps,
}: {
	children: React.ReactNode;
	className?: React.ComponentProps<'div'>['className'];
	popoverProps?: React.ComponentProps<typeof PopoverContent>;
	drawerProps?: React.ComponentProps<typeof DrawerContent>;
}) {
	const { isMobile } = useSmartPopoverContext();
	const Content = isMobile ? DrawerContent : PopoverContent;
	const props = isMobile ? drawerProps : popoverProps;

	return (
		<Content className={cn(!isMobile && 'p-0', className)} {...props}>
			{children}
		</Content>
	);
}

function SmartPopoverHeader(props: React.ComponentProps<'div'>) {
	const { isMobile } = useSmartPopoverContext();
	const Header = isMobile ? DrawerHeader : PopoverHeader;

	return <Header {...props} />;
}

function SmartPopoverTitle(props: React.ComponentProps<'p'>) {
	const { isMobile } = useSmartPopoverContext();
	const Title = isMobile ? DrawerTitle : PopoverTitle;
	return <Title {...props} />;
}

function SmartPopoverDescription(props: React.ComponentProps<'p'>) {
	const { isMobile } = useSmartPopoverContext();
	const Description = isMobile ? DrawerDescription : PopoverDescription;
	return <Description {...props} />;
}

function SmartPopoverFooter(props: React.ComponentProps<'div'>) {
	const { isMobile } = useSmartPopoverContext();
	const Footer = isMobile ? DrawerFooter : PopoverFooter;
	return <Footer {...props} />;
}

function SmartPopoverBody(props: React.ComponentProps<'div'>) {
	const { isMobile } = useSmartPopoverContext();
	const Body = isMobile ? DrawerBody : PopoverBody;
	return <Body {...props} />;
}

function SmartPopoverClose(props: React.ComponentProps<typeof DrawerClose>) {
	const { isMobile } = useSmartPopoverContext();
	const Close = isMobile ? DrawerClose : PopoverClose;
	return <Close {...props} />;
}

export {
	SmartPopover,
	SmartPopoverTrigger,
	SmartPopoverContent,
	SmartPopoverHeader,
	SmartPopoverBody,
	SmartPopoverTitle,
	SmartPopoverDescription,
	SmartPopoverFooter,
	SmartPopoverClose,
};

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
