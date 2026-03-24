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
dialog.tsx
'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

function Dialog({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
	return (
		<DialogPrimitive.Overlay
			data-slot="dialog-overlay"
			className={cn(
				'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 bg-background/50 fixed inset-0 z-50 backdrop-blur',
				className,
			)}
			{...props}
		/>
	);
}

function DialogContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
	return (
		<DialogPortal data-slot="dialog-portal">
			<DialogOverlay />
			<DialogPrimitive.Content
				data-slot="dialog-content"
				className={cn(
					'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-lg border shadow-lg duration-200 sm:max-w-lg',
					className,
				)}
				{...props}
			>
				{children}
			</DialogPrimitive.Content>
		</DialogPortal>
	);
}

function DialogBody({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="dialog-body"
			className={cn('px-4 py-6', className)}
			{...props}
		/>
	);
}

function DialogHeader({
	className,
	children,
	hideCloseButton = false,
	...props
}: React.ComponentProps<'div'> & { hideCloseButton?: boolean }) {
	return (
		<div
			data-slot="dialog-header"
			className={cn(
				'bg-muted/30 flex flex-col gap-2 rounded-t-lg border-b p-4 text-center sm:text-left',
				className,
			)}
			{...props}
		>
			{children}
			{!hideCloseButton && (
				<DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-full opacity-80 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
					<XIcon />
					<span className="sr-only">Close</span>
				</DialogPrimitive.Close>
			)}
		</div>
	);
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn(
				'bg-muted/30 flex flex-col gap-2 rounded-b-lg border-t px-4 py-3 sm:flex-row sm:justify-end',
				className,
			)}
			{...props}
		/>
	);
}

function DialogTitle({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn('font-heading text-lg leading-none font-medium', className)}
			{...props}
		/>
	);
}

function DialogDescription({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	);
}

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogBody,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
};


code.demo.1753272898334.tsx
import React from 'react';
import {
    Dialog,
    DialogBody,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
	Settings,
	Bell,
	Globe,
	Shield,
} from 'lucide-react';

export default function QuickSettingsDialog() {
    const [settings, setSettings] = React.useState({
        notifications: true,
        publicProfile: false,
        twoFactor: true,
        darkMode: false,
        emailUpdates: true,
    });

    const toggleSetting = (key: string) => {
        setSettings((prev) => ({
            ...prev,
            [key]: !prev[key as keyof typeof settings],
        }));
    };

    return (
        <Dialog>
        <DialogTrigger asChild >
        <Button variant= "outline" > Quick Settings < /Button>
            < /DialogTrigger>
            < DialogContent className = "max-w-md" >
                <DialogHeader>
                <DialogTitle className="flex items-center justify-center sm:justify-start gap-2" >
                    <Settings className="h-5 w-5" />
                        Quick Settings
                            < /DialogTitle>
                            < DialogDescription > Manage your account preferences < /DialogDescription>
                                < /DialogHeader>
                                < DialogBody >
                                <div className="space-y-4" >
                                    <div className="flex items-center justify-between" >
                                        <div className="flex items-center gap-2" >
                                            <Bell className="h-4 w-4" />
                                                <span className="text-sm" > Push Notifications < /span>
                                                    < /div>
                                                    < Switch
    checked = { settings.notifications }
    onCheckedChange = {() => toggleSetting('notifications')
}
/>
    < /div>
    < div className = "flex items-center justify-between" >
        <div className="flex items-center gap-2" >
            <Globe className="h-4 w-4" />
                <span className="text-sm" > Public Profile < /span>
                    < /div>
                    < Switch
checked = { settings.publicProfile }
onCheckedChange = {() => toggleSetting('publicProfile')}
/>
    < /div>
    < div className = "flex items-center justify-between" >
        <div className="flex items-center gap-2" >
            <Shield className="h-4 w-4" />
                <span className="text-sm" > Two - Factor Authentication < /span>
                    < /div>
                    < Switch
checked = { settings.twoFactor }
onCheckedChange = {() => toggleSetting('twoFactor')}
/>
    < /div>
    < hr className = "my-4" />
        <div className="flex items-center justify-between" >
            <span className="text-sm" > Dark Mode < /span>
                < Switch
checked = { settings.darkMode }
onCheckedChange = {() => toggleSetting('darkMode')}
/>
    < /div>
    < div className = "flex items-center justify-between" >
        <span className="text-sm" > Email Updates < /span>
            < Switch
checked = { settings.emailUpdates }
onCheckedChange = {() => toggleSetting('emailUpdates')}
/>
    < /div>
    < /div>
    < /DialogBody>
    < DialogFooter >
    <DialogClose asChild >
    <Button variant="outline" > Close < /Button>
        < /DialogClose>
        < DialogClose asChild >
            <Button onClick={ () => alert('Settings saved!') }>
                Save Changes
                    < /Button>
                    < /DialogClose>
                    < /DialogFooter>
                    < /DialogContent>
                    < /Dialog>
	);
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/dialog.tsx
'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

function Dialog({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
	return (
		<DialogPrimitive.Overlay
			data-slot="dialog-overlay"
			className={cn(
				'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 bg-background/50 fixed inset-0 z-50 backdrop-blur',
				className,
			)}
			{...props}
		/>
	);
}

function DialogContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
	return (
		<DialogPortal data-slot="dialog-portal">
			<DialogOverlay />
			<DialogPrimitive.Content
				data-slot="dialog-content"
				className={cn(
					'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-lg border shadow-lg duration-200 sm:max-w-lg',
					className,
				)}
				{...props}
			>
				{children}
			</DialogPrimitive.Content>
		</DialogPortal>
	);
}

function DialogBody({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="dialog-body"
			className={cn('px-4 py-6', className)}
			{...props}
		/>
	);
}

function DialogHeader({
	className,
	children,
	hideCloseButton = false,
	...props
}: React.ComponentProps<'div'> & { hideCloseButton?: boolean }) {
	return (
		<div
			data-slot="dialog-header"
			className={cn(
				'bg-muted/30 flex flex-col gap-2 rounded-t-lg border-b p-4 text-center sm:text-left',
				className,
			)}
			{...props}
		>
			{children}
			{!hideCloseButton && (
				<DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-full opacity-80 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
					<XIcon />
					<span className="sr-only">Close</span>
				</DialogPrimitive.Close>
			)}
		</div>
	);
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn(
				'bg-muted/30 flex flex-col gap-2 rounded-b-lg border-t px-4 py-3 sm:flex-row sm:justify-end',
				className,
			)}
			{...props}
		/>
	);
}

function DialogTitle({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn('font-heading text-lg leading-none font-medium', className)}
			{...props}
		/>
	);
}

function DialogDescription({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	);
}

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogBody,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
};

```

Install NPM dependencies:
```bash
lucide-react, @radix-ui/react-dialog
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
