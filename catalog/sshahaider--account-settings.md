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
account-settings.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { AvatarUploader } from './avatar-uploader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function AccountSettings() {
	const [photo, setPhoto] = React.useState<string>(
		'https://avatar.vercel.sh/john',
	);

	const handleUpload = async (file: File) => {
		setPhoto(URL.createObjectURL(file));
		return { success: true };
	};

	return (
		<section className="relative min-h-screen w-full px-4 py-10">
			<div
				aria-hidden
				className="absolute inset-0 isolate -z-10 opacity-80 contain-strict"
			>
				<div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full" />
				<div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full" />
				<div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full" />
			</div>
			<div className="mx-auto w-full max-w-4xl space-y-8">
				<div className="flex flex-col">
					<h2 className="text-2xl font-bold">Account Settings</h2>
					<p className="text-muted-foreground text-base">
						Manage account and your personal information.
					</p>
				</div>
				<Separator />

				<div className="py-2">
					<SectionColumns
						title="Your Avatar"
						description="An avatar is optional but strongly recommended."
					>
						<AvatarUploader onUpload={handleUpload}>
							<Avatar className="relative mx-auto h-20 w-20 cursor-pointer hover:opacity-50">
								<AvatarImage src={photo} />
								<AvatarFallback className="border text-2xl font-bold">
									JD
								</AvatarFallback>
							</Avatar>
						</AvatarUploader>
					</SectionColumns>
					<Separator />
					<SectionColumns
						title="Your Name"
						description="Please enter a display name you are comfortable with."
					>
						<div className="w-full space-y-1">
							<Label className="sr-only">Name</Label>
							<div className="flex w-full items-center justify-center gap-2">
								<Input placeholder="Enter Your Name" />
								<Button
									type="submit"
									variant="outline"
									className="text-xs md:text-sm"
								>
									Save Changes
								</Button>
							</div>
							<p className="text-muted-foreground text-xs">Max 32 characters</p>
						</div>
					</SectionColumns>
					<Separator />
					<SectionColumns
						title="Your Email"
						description="Please enter a Primary Email Address."
					>
						<Label className="sr-only">Email</Label>
						<div className="flex w-full items-center justify-center gap-2">
							<Input type="email" placeholder="Enter Your Email" />
							<Button
								type="submit"
								variant="outline"
								className="text-xs md:text-sm"
							>
								Save Changes
							</Button>
						</div>
					</SectionColumns>
				</div>
			</div>
		</section>
	);
}

interface SectionColumnsType {
	title: string;
	description?: string;
	className?: string;
	children: React.ReactNode;
}

function SectionColumns({
	title,
	description,
	children,
	className,
}: SectionColumnsType) {
	return (
		<div className="animate-in fade-in grid grid-cols-1 gap-x-10 gap-y-4 py-8 duration-500 md:grid-cols-10">
			<div className="w-full space-y-1.5 md:col-span-4">
				<h2 className="font-heading text-lg leading-none font-semibold">
					{title}
				</h2>
				<p className="text-muted-foreground text-sm text-balance">
					{description}
				</p>
			</div>
			<div className={cn('md:col-span-6', className)}>{children}</div>
		</div>
	);
}


code.demo.1758358596527.tsx
import { AccountSettings } from "@/components/ui/account-settings";

export default function DemoOne() {
  return <AccountSettings />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/account-settings.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { AvatarUploader } from './avatar-uploader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function AccountSettings() {
	const [photo, setPhoto] = React.useState<string>(
		'https://avatar.vercel.sh/john',
	);

	const handleUpload = async (file: File) => {
		setPhoto(URL.createObjectURL(file));
		return { success: true };
	};

	return (
		<section className="relative min-h-screen w-full px-4 py-10">
			<div
				aria-hidden
				className="absolute inset-0 isolate -z-10 opacity-80 contain-strict"
			>
				<div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full" />
				<div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full" />
				<div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full" />
			</div>
			<div className="mx-auto w-full max-w-4xl space-y-8">
				<div className="flex flex-col">
					<h2 className="text-2xl font-bold">Account Settings</h2>
					<p className="text-muted-foreground text-base">
						Manage account and your personal information.
					</p>
				</div>
				<Separator />

				<div className="py-2">
					<SectionColumns
						title="Your Avatar"
						description="An avatar is optional but strongly recommended."
					>
						<AvatarUploader onUpload={handleUpload}>
							<Avatar className="relative mx-auto h-20 w-20 cursor-pointer hover:opacity-50">
								<AvatarImage src={photo} />
								<AvatarFallback className="border text-2xl font-bold">
									JD
								</AvatarFallback>
							</Avatar>
						</AvatarUploader>
					</SectionColumns>
					<Separator />
					<SectionColumns
						title="Your Name"
						description="Please enter a display name you are comfortable with."
					>
						<div className="w-full space-y-1">
							<Label className="sr-only">Name</Label>
							<div className="flex w-full items-center justify-center gap-2">
								<Input placeholder="Enter Your Name" />
								<Button
									type="submit"
									variant="outline"
									className="text-xs md:text-sm"
								>
									Save Changes
								</Button>
							</div>
							<p className="text-muted-foreground text-xs">Max 32 characters</p>
						</div>
					</SectionColumns>
					<Separator />
					<SectionColumns
						title="Your Email"
						description="Please enter a Primary Email Address."
					>
						<Label className="sr-only">Email</Label>
						<div className="flex w-full items-center justify-center gap-2">
							<Input type="email" placeholder="Enter Your Email" />
							<Button
								type="submit"
								variant="outline"
								className="text-xs md:text-sm"
							>
								Save Changes
							</Button>
						</div>
					</SectionColumns>
				</div>
			</div>
		</section>
	);
}

interface SectionColumnsType {
	title: string;
	description?: string;
	className?: string;
	children: React.ReactNode;
}

function SectionColumns({
	title,
	description,
	children,
	className,
}: SectionColumnsType) {
	return (
		<div className="animate-in fade-in grid grid-cols-1 gap-x-10 gap-y-4 py-8 duration-500 md:grid-cols-10">
			<div className="w-full space-y-1.5 md:col-span-4">
				<h2 className="font-heading text-lg leading-none font-semibold">
					{title}
				</h2>
				<p className="text-muted-foreground text-sm text-balance">
					{description}
				</p>
			</div>
			<div className={cn('md:col-span-6', className)}>{children}</div>
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
