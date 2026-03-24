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
modal.tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-media-query';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';

const ModalContext = React.createContext<{ isMobile: boolean } | null>(null);

function useContext() {
	const context = React.useContext(ModalContext);
	if (!context) {
		throw new Error('Trigger or Content must be used within <Modal>');
	}
	return context;
}

type ModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	defaultOpen?: boolean;
	children: React.ReactNode;
	dialogProps?: React.ComponentProps<typeof Dialog>;
	drawerProps?: React.ComponentProps<typeof Drawer>;
};

const Modal = ({
	dialogProps,
	open,
	onOpenChange,
	drawerProps,
	children,
}: ModalProps) => {
	const isMobile = useIsMobile();
	const Component = isMobile ? Drawer : Dialog;
	const props = isMobile ? drawerProps : dialogProps;

	return (
		<ModalContext.Provider value={{ isMobile }}>
			<Component open={open} onOpenChange={onOpenChange} {...props}>
				{children}
			</Component>
		</ModalContext.Provider>
	);
};

type ModalTriggerProps = {
	className?: string;
	children: React.ReactNode;
	asChild?: boolean;
	drawerProps?: React.ComponentProps<typeof DrawerTrigger>;
	popoverProps?: React.ComponentProps<typeof DialogTrigger>;
};

const ModalTrigger = ({
	className,
	children,
	asChild,
	drawerProps,
	popoverProps,
}: ModalTriggerProps) => {
	const { isMobile } = useContext();
	const Component = isMobile ? DrawerTrigger : DialogTrigger;
	const props = isMobile ? drawerProps : popoverProps;

	return (
		<Component className={className} asChild={asChild} {...props}>
			{children}
		</Component>
	);
};

type ModalCloseProps = {
	className?: string;
	children?: React.ReactNode;
	asChild?: boolean;
	drawerProps?: React.ComponentProps<typeof DrawerClose>;
	popoverProps?: React.ComponentProps<typeof DialogClose>;
};

const ModalClose = ({
	className,
	children,
	asChild,
	drawerProps,
	popoverProps,
}: ModalCloseProps) => {
	const { isMobile } = useContext();
	const Component = isMobile ? DrawerClose : DialogClose;
	const props = isMobile ? drawerProps : popoverProps;

	return (
		<Component className={className} asChild={asChild} {...props}>
			{children}
		</Component>
	);
};

type ModalContentProps = {
	children: React.ReactNode;
	className?: string;
	drawerProps?: React.ComponentProps<typeof DrawerContent>;
	popoverProps?: React.ComponentProps<typeof DialogContent>;
};

const ModalContent = ({
	className,
	children,
	drawerProps,
	popoverProps,
}: ModalContentProps) => {
	const { isMobile } = useContext();
	const Component = isMobile ? DrawerContent : DialogContent;
	const props = isMobile ? drawerProps : popoverProps;

	return (
		<Component className={className} {...props}>
			{children}
		</Component>
	);
};

const ModalHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
	const { isMobile } = useContext();
	const Component = isMobile ? DrawerHeader : DialogHeader;

	return <Component className={className} {...props} />;
};

type ModalTitleProps = {
	className?: string;
	children: React.ReactNode;
	drawerProps?: React.ComponentProps<typeof DrawerTitle>;
	popoverProps?: React.ComponentProps<typeof DialogTitle>;
};

const ModalTitle = ({
	className,
	children,
	drawerProps,
	popoverProps,
}: ModalTitleProps) => {
	const { isMobile } = useContext();
	const Component = isMobile ? DrawerTitle : DialogTitle;
	const props = isMobile ? drawerProps : popoverProps;

	return (
		<Component className={className} {...props}>
			{children}
		</Component>
	);
};

type ModalDescriptionProps = {
	className?: string;
	children: React.ReactNode;
	drawerProps?: React.ComponentProps<typeof DrawerDescription>;
	popoverProps?: React.ComponentProps<typeof DialogDescription>;
};

const ModalDescription = ({
	className,
	children,
	drawerProps,
	popoverProps,
}: ModalDescriptionProps) => {
	const { isMobile } = useContext();
	const Component = isMobile ? DrawerDescription : DialogDescription;
	const props = isMobile ? drawerProps : popoverProps;

	return (
		<Component className={className} {...props}>
			{children}
		</Component>
	);
};

const ModalBody = ({ className, ...props }: React.ComponentProps<'div'>) => {
	return <div className={cn('px-4 py-6', className)} {...props} />;
};
const ModalFooter = ({ className, ...props }: React.ComponentProps<'div'>) => {
	const { isMobile } = useContext();
	const Component = isMobile ? DrawerFooter : DialogFooter;
	return <Component className={className} {...props} />;
};

export {
	Modal,
	ModalTrigger,
	ModalClose,
	ModalContent,
	ModalDescription,
	ModalHeader,
	ModalTitle,
	ModalBody,
	ModalFooter,
};


code.demo.1753401451125.tsx
'use client';

import React from 'react';
import {
	Modal,
	ModalBody,
	ModalClose,
	ModalContent,
	ModalDescription,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTrigger,
} from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useIsMobile } from '@/hooks/use-media-query';

function Preview() {
	const [open, setOpen] = React.useState(false);

	return (
		<Modal open={open} onOpenChange={setOpen}>
			<ModalTrigger>
				<Button variant="outline">Open Modal</Button>
			</ModalTrigger>
			<ModalContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						alert('Form submitted!');
					}}
				>
					<ModalHeader>
						<ModalTitle>Edit Profile</ModalTitle>
						<ModalDescription>Update your name and username.</ModalDescription>
					</ModalHeader>
					<ModalBody className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="name">Name</Label>
							<Input id="name" defaultValue="Pedro Duarte" />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="username">Username</Label>
							<Input id="username" defaultValue="@peduarte" />
						</div>
					</ModalBody>
					<ModalFooter>
						<ModalClose asChild>
							<Button type="button" variant="outline">
								Cancel
							</Button>
						</ModalClose>
						<Button type="submit">Save</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}

export default function Default() {
	return (
		<div className="flex min-h-screen flex-col items-center space-y-12 py-24">
			<DeviceIndicator />
			<div className="space-y-3 text-center">
				<h1 className="text-6xl font-extrabold tracking-tight">
					Responsive Modal
				</h1>
				<p className="text-xl font-medium">
					This modal automatically adapts to your device:
				</p>
				<div className="flex justify-center gap-8 text-sm">
					<div className="flex items-center gap-2 rounded-md border p-1">
						<div className="h-3 w-3 rounded-full bg-blue-500" />
						<span className="flex items-center gap-2">
							<strong className="font-semibold">Desktop:</strong>{' '}
							<code>
								<pre>{`<Dialog />`}</pre>
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
src/components/ui/modal.tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-media-query';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';

const ModalContext = React.createContext<{ isMobile: boolean } | null>(null);

function useContext() {
	const context = React.useContext(ModalContext);
	if (!context) {
		throw new Error('Trigger or Content must be used within <Modal>');
	}
	return context;
}

type ModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	defaultOpen?: boolean;
	children: React.ReactNode;
	dialogProps?: React.ComponentProps<typeof Dialog>;
	drawerProps?: React.ComponentProps<typeof Drawer>;
};

const Modal = ({
	dialogProps,
	open,
	onOpenChange,
	drawerProps,
	children,
}: ModalProps) => {
	const isMobile = useIsMobile();
	const Component = isMobile ? Drawer : Dialog;
	const props = isMobile ? drawerProps : dialogProps;

	return (
		<ModalContext.Provider value={{ isMobile }}>
			<Component open={open} onOpenChange={onOpenChange} {...props}>
				{children}
			</Component>
		</ModalContext.Provider>
	);
};

type ModalTriggerProps = {
	className?: string;
	children: React.ReactNode;
	asChild?: boolean;
	drawerProps?: React.ComponentProps<typeof DrawerTrigger>;
	popoverProps?: React.ComponentProps<typeof DialogTrigger>;
};

const ModalTrigger = ({
	className,
	children,
	asChild,
	drawerProps,
	popoverProps,
}: ModalTriggerProps) => {
	const { isMobile } = useContext();
	const Component = isMobile ? DrawerTrigger : DialogTrigger;
	const props = isMobile ? drawerProps : popoverProps;

	return (
		<Component className={className} asChild={asChild} {...props}>
			{children}
		</Component>
	);
};

type ModalCloseProps = {
	className?: string;
	children?: React.ReactNode;
	asChild?: boolean;
	drawerProps?: React.ComponentProps<typeof DrawerClose>;
	popoverProps?: React.ComponentProps<typeof DialogClose>;
};

const ModalClose = ({
	className,
	children,
	asChild,
	drawerProps,
	popoverProps,
}: ModalCloseProps) => {
	const { isMobile } = useContext();
	const Component = isMobile ? DrawerClose : DialogClose;
	const props = isMobile ? drawerProps : popoverProps;

	return (
		<Component className={className} asChild={asChild} {...props}>
			{children}
		</Component>
	);
};

type ModalContentProps = {
	children: React.ReactNode;
	className?: string;
	drawerProps?: React.ComponentProps<typeof DrawerContent>;
	popoverProps?: React.ComponentProps<typeof DialogContent>;
};

const ModalContent = ({
	className,
	children,
	drawerProps,
	popoverProps,
}: ModalContentProps) => {
	const { isMobile } = useContext();
	const Component = isMobile ? DrawerContent : DialogContent;
	const props = isMobile ? drawerProps : popoverProps;

	return (
		<Component className={className} {...props}>
			{children}
		</Component>
	);
};

const ModalHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
	const { isMobile } = useContext();
	const Component = isMobile ? DrawerHeader : DialogHeader;

	return <Component className={className} {...props} />;
};

type ModalTitleProps = {
	className?: string;
	children: React.ReactNode;
	drawerProps?: React.ComponentProps<typeof DrawerTitle>;
	popoverProps?: React.ComponentProps<typeof DialogTitle>;
};

const ModalTitle = ({
	className,
	children,
	drawerProps,
	popoverProps,
}: ModalTitleProps) => {
	const { isMobile } = useContext();
	const Component = isMobile ? DrawerTitle : DialogTitle;
	const props = isMobile ? drawerProps : popoverProps;

	return (
		<Component className={className} {...props}>
			{children}
		</Component>
	);
};

type ModalDescriptionProps = {
	className?: string;
	children: React.ReactNode;
	drawerProps?: React.ComponentProps<typeof DrawerDescription>;
	popoverProps?: React.ComponentProps<typeof DialogDescription>;
};

const ModalDescription = ({
	className,
	children,
	drawerProps,
	popoverProps,
}: ModalDescriptionProps) => {
	const { isMobile } = useContext();
	const Component = isMobile ? DrawerDescription : DialogDescription;
	const props = isMobile ? drawerProps : popoverProps;

	return (
		<Component className={className} {...props}>
			{children}
		</Component>
	);
};

const ModalBody = ({ className, ...props }: React.ComponentProps<'div'>) => {
	return <div className={cn('px-4 py-6', className)} {...props} />;
};
const ModalFooter = ({ className, ...props }: React.ComponentProps<'div'>) => {
	const { isMobile } = useContext();
	const Component = isMobile ? DrawerFooter : DialogFooter;
	return <Component className={className} {...props} />;
};

export {
	Modal,
	ModalTrigger,
	ModalClose,
	ModalContent,
	ModalDescription,
	ModalHeader,
	ModalTitle,
	ModalBody,
	ModalFooter,
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
