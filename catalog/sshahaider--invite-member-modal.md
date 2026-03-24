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
invite-member-modal.tsx
import React from 'react';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalDescription,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTrigger,
} from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Grid2x2Plus } from 'lucide-react';

export function InviteMemberModal() {
	const [open, setOpen] = React.useState<boolean>(false);
	const [role, setRole] = React.useState<string>('owner');

	return (
		<Modal open={open} onOpenChange={setOpen}>
			<ModalTrigger asChild>
				<Button size="sm">Invite Member</Button>
			</ModalTrigger>
			<ModalContent className="md:max-w-md">
				<ModalHeader className="items-center py-10">
					<Grid2x2Plus className="size-9" />
					<div className="flex flex-col items-center space-y-1">
						<ModalTitle className="text-2xl font-semibold">
							Invite a Member
						</ModalTitle>
						<ModalDescription className="text-muted-foreground text-center text-sm">
							Invite a member to your organization by email.
						</ModalDescription>
					</div>
				</ModalHeader>
				<ModalBody className="space-y-6">
					<div className="grid gap-2">
						<Label>Email</Label>
						<Input placeholder="e.g., hi@yourcompony.com" />
					</div>
					<div className="grid gap-2">
						<Label>Select Role</Label>
						<RadioGroup
							className="gap-1"
							onValueChange={setRole}
							defaultValue={role}
						>
							<div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
								<RadioGroupItem
									value="owner"
									id="owner"
									aria-describedby="owner-description"
									className="order-1 after:absolute after:inset-0"
								/>
								<div className="grid grow gap-2">
									<Label htmlFor="owner">Owner</Label>
									<p
										id="owner-description"
										className="text-muted-foreground text-xs"
									>
										Invite members, billing and delete the organization.
									</p>
								</div>
							</div>
							{/* Radio card #2 */}
							<div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
								<RadioGroupItem
									value="member"
									id="member"
									aria-describedby="member-description"
									className="order-1 after:absolute after:inset-0"
								/>
								<div className="grid grow gap-2">
									<Label htmlFor="member">Member</Label>
									<p
										id="member-description"
										className="text-muted-foreground text-xs"
									>
										Manage products add orders.
									</p>
								</div>
							</div>
						</RadioGroup>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button type="submit" className="w-full">
						Send Invite
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}


code.demo.1758730749346.tsx
import { InviteMemberModal } from "@/components/ui/invite-member-modal";
import { cn } from '@/lib/utils';

export default function DemoOne() {
 	return (
		<div className="relative flex min-h-screen w-full items-center justify-center px-4 py-10">
			<InviteMemberModal />
			<div
				aria-hidden="true"
				className={cn(
					'pointer-events-none -z-10 absolute -top-10 left-1/2 size-full -translate-x-1/2 rounded-full',
					'bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]',
					'blur-[30px]',
				)}
			/>
		</div>
	);
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/invite-member-modal.tsx
import React from 'react';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalDescription,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTrigger,
} from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Grid2x2Plus } from 'lucide-react';

export function InviteMemberModal() {
	const [open, setOpen] = React.useState<boolean>(false);
	const [role, setRole] = React.useState<string>('owner');

	return (
		<Modal open={open} onOpenChange={setOpen}>
			<ModalTrigger asChild>
				<Button size="sm">Invite Member</Button>
			</ModalTrigger>
			<ModalContent className="md:max-w-md">
				<ModalHeader className="items-center py-10">
					<Grid2x2Plus className="size-9" />
					<div className="flex flex-col items-center space-y-1">
						<ModalTitle className="text-2xl font-semibold">
							Invite a Member
						</ModalTitle>
						<ModalDescription className="text-muted-foreground text-center text-sm">
							Invite a member to your organization by email.
						</ModalDescription>
					</div>
				</ModalHeader>
				<ModalBody className="space-y-6">
					<div className="grid gap-2">
						<Label>Email</Label>
						<Input placeholder="e.g., hi@yourcompony.com" />
					</div>
					<div className="grid gap-2">
						<Label>Select Role</Label>
						<RadioGroup
							className="gap-1"
							onValueChange={setRole}
							defaultValue={role}
						>
							<div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
								<RadioGroupItem
									value="owner"
									id="owner"
									aria-describedby="owner-description"
									className="order-1 after:absolute after:inset-0"
								/>
								<div className="grid grow gap-2">
									<Label htmlFor="owner">Owner</Label>
									<p
										id="owner-description"
										className="text-muted-foreground text-xs"
									>
										Invite members, billing and delete the organization.
									</p>
								</div>
							</div>
							{/* Radio card #2 */}
							<div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
								<RadioGroupItem
									value="member"
									id="member"
									aria-describedby="member-description"
									className="order-1 after:absolute after:inset-0"
								/>
								<div className="grid grow gap-2">
									<Label htmlFor="member">Member</Label>
									<p
										id="member-description"
										className="text-muted-foreground text-xs"
									>
										Manage products add orders.
									</p>
								</div>
							</div>
						</RadioGroup>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button type="submit" className="w-full">
						Send Invite
					</Button>
				</ModalFooter>
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
