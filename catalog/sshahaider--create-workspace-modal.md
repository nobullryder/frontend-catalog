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
create-workspace-modal.tsx
'use client';
import React from 'react';
import {
	Modal,
	ModalTrigger,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalTitle,
} from '@/components/ui/modal';
import Link from 'next/link';
import { Button } from './button';
import { Input } from './input';
import { Grid2x2Plus, PlusIcon } from 'lucide-react';
import { Label } from './label';

export function CreateWorkspaceModal() {
	const [open, setOpen] = React.useState(false);

	return (
		<Modal open={open} onOpenChange={setOpen}>
			<ModalTrigger asChild>
				<Button>
					<PlusIcon className="mr-1 size-4" />
					Create Workspace
				</Button>
			</ModalTrigger>

			<ModalContent className="md:max-w-md">
				<ModalHeader className="items-center py-10">
					<Grid2x2Plus className="size-9" />
					<div className="flex flex-col items-center space-y-1">
						<ModalTitle className="text-2xl font-medium">
							Create a workspace
						</ModalTitle>
						<Link
							href="#"
							target="_blank"
							className="text-muted-foreground underline transition-colors"
						>
							What is a workspace?
						</Link>
					</div>
				</ModalHeader>
				<ModalBody className="space-y-4 p-4 md:p-4">
					<div className="grid gap-2">
						<Label>Workspace Name</Label>
						<Input placeholder="e.g., Acme, Inc." />
					</div>
					<div className="grid gap-2">
						<Label>Workspace Slug</Label>

						<div className="flex rounded-md shadow-xs">
							<span className="border-input bg-input/30 text-muted-foreground inline-flex items-center rounded-s-md border px-3 text-sm">
								example.com
							</span>
							<Input
								placeholder="e.g., acme"
								className="-ms-px rounded-s-none shadow-none"
							/>
						</div>
					</div>

					<Button size="lg" className="w-full">
						Create
					</Button>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}


code.demo.1757436584043.tsx
import { CreateWorkspaceModal } from "@/components/ui/create-workspace-modal";
import { cn } from '@/lib/utils';

export default function DemoOne() {
 return (
		<div className="relative flex min-h-screen w-full flex-col items-center justify-center">
			<div
				aria-hidden="true"
				className={cn(
					'pointer-events-none absolute -top-10 left-1/2 size-full -translate-x-1/2 rounded-full',
					'bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]',
					'blur-[30px]',
				)}
			/>

			<CreateWorkspaceModal />
		</div>
	);
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/create-workspace-modal.tsx
'use client';
import React from 'react';
import {
	Modal,
	ModalTrigger,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalTitle,
} from '@/components/ui/modal';
import Link from 'next/link';
import { Button } from './button';
import { Input } from './input';
import { Grid2x2Plus, PlusIcon } from 'lucide-react';
import { Label } from './label';

export function CreateWorkspaceModal() {
	const [open, setOpen] = React.useState(false);

	return (
		<Modal open={open} onOpenChange={setOpen}>
			<ModalTrigger asChild>
				<Button>
					<PlusIcon className="mr-1 size-4" />
					Create Workspace
				</Button>
			</ModalTrigger>

			<ModalContent className="md:max-w-md">
				<ModalHeader className="items-center py-10">
					<Grid2x2Plus className="size-9" />
					<div className="flex flex-col items-center space-y-1">
						<ModalTitle className="text-2xl font-medium">
							Create a workspace
						</ModalTitle>
						<Link
							href="#"
							target="_blank"
							className="text-muted-foreground underline transition-colors"
						>
							What is a workspace?
						</Link>
					</div>
				</ModalHeader>
				<ModalBody className="space-y-4 p-4 md:p-4">
					<div className="grid gap-2">
						<Label>Workspace Name</Label>
						<Input placeholder="e.g., Acme, Inc." />
					</div>
					<div className="grid gap-2">
						<Label>Workspace Slug</Label>

						<div className="flex rounded-md shadow-xs">
							<span className="border-input bg-input/30 text-muted-foreground inline-flex items-center rounded-s-md border px-3 text-sm">
								example.com
							</span>
							<Input
								placeholder="e.g., acme"
								className="-ms-px rounded-s-none shadow-none"
							/>
						</div>
					</div>

					<Button size="lg" className="w-full">
						Create
					</Button>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}

```

Install NPM dependencies:
```bash
next, lucide-react
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
