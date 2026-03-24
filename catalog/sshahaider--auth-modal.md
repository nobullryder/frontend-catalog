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
auth-modal.tsx
'use client';
import React from 'react';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalTitle,
} from '@/components/ui/modal';
import Link from 'next/link';
import { Button } from './button';
import { Input } from './input';
import { AtSignIcon } from 'lucide-react';

type AuthModalProps = Omit<React.ComponentProps<typeof Modal>, 'children'>;

export function AuthModal(props: AuthModalProps) {
	return (
		<Modal {...props}>
			<ModalContent>
				<ModalHeader>
					<ModalTitle>Sign In or Join Now!</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<Button
						type="button"
						variant="outline"
						className="animate-in fade-in w-full duration-300"
					>
						<GoogleIcon className="w-4 h-4 me-2" />
						<span>Continue With Google</span>
					</Button>

					<div className="relative my-5">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background text-muted-foreground px-4 text-lg">
								OR
							</span>
						</div>
					</div>
					<p className="text-muted-foreground mb-2 text-start text-xs">
						Enter your email address to sign in or create an account
					</p>
					<div className="relative h-max">
						<Input
							placeholder="your.email@example.com"
							className="peer ps-9"
							type="email"
						/>
						<div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
							<AtSignIcon className="size-4" aria-hidden="true" />
						</div>
					</div>

					<Button
						type="button"
						variant="outline"
						className="animate-in fade-in mt-4 w-full duration-300"
					>
						<span>Continue With Email</span>
					</Button>
				</ModalBody>
				<div className="p-4">
					<p className="text-muted-foreground text-center text-xs">
						By clicking Continue, you agree to our{' '}
						<Link className="text-foreground hover:underline" href="/policy">
							Privacy Policy
						</Link>
						.
					</p>
				</div>
			</ModalContent>
		</Modal>
	);
}

const GoogleIcon = (props: React.ComponentProps<'svg'>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		{...props}
	>
		<g>
			<path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669   C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62   c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401   c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
		</g>
	</svg>
);


code.demo.1756123101951.tsx
'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { AuthModal } from "@/components/ui/auth-modal";
import { Button } from '@/components/ui/button';

export default function DefaultDemo() {
	const [open, setAuthOpen] = React.useState(false);

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

			<Button onClick={() => setAuthOpen(true)}>Open Modal</Button>

			<AuthModal open={open} onOpenChange={setAuthOpen} />
		</div>
	);
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/auth-modal.tsx
'use client';
import React from 'react';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalTitle,
} from '@/components/ui/modal';
import Link from 'next/link';
import { Button } from './button';
import { Input } from './input';
import { AtSignIcon } from 'lucide-react';

type AuthModalProps = Omit<React.ComponentProps<typeof Modal>, 'children'>;

export function AuthModal(props: AuthModalProps) {
	return (
		<Modal {...props}>
			<ModalContent>
				<ModalHeader>
					<ModalTitle>Sign In or Join Now!</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<Button
						type="button"
						variant="outline"
						className="animate-in fade-in w-full duration-300"
					>
						<GoogleIcon className="w-4 h-4 me-2" />
						<span>Continue With Google</span>
					</Button>

					<div className="relative my-5">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background text-muted-foreground px-4 text-lg">
								OR
							</span>
						</div>
					</div>
					<p className="text-muted-foreground mb-2 text-start text-xs">
						Enter your email address to sign in or create an account
					</p>
					<div className="relative h-max">
						<Input
							placeholder="your.email@example.com"
							className="peer ps-9"
							type="email"
						/>
						<div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
							<AtSignIcon className="size-4" aria-hidden="true" />
						</div>
					</div>

					<Button
						type="button"
						variant="outline"
						className="animate-in fade-in mt-4 w-full duration-300"
					>
						<span>Continue With Email</span>
					</Button>
				</ModalBody>
				<div className="p-4">
					<p className="text-muted-foreground text-center text-xs">
						By clicking Continue, you agree to our{' '}
						<Link className="text-foreground hover:underline" href="/policy">
							Privacy Policy
						</Link>
						.
					</p>
				</div>
			</ModalContent>
		</Modal>
	);
}

const GoogleIcon = (props: React.ComponentProps<'svg'>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		{...props}
	>
		<g>
			<path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669   C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62   c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401   c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
		</g>
	</svg>
);

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
