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
workspaces.tsx
'use client';

import * as React from 'react';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

// Generic workspace interface - can be extended
export interface Workspace {
	id: string;
	name: string;
	[key: string]: any; // Allow additional properties
}

// Context for workspace state management
interface WorkspaceContextValue<T extends Workspace> {
	open: boolean;
	setOpen: (open: boolean) => void;
	selectedWorkspace: T | undefined;
	workspaces: T[];
	onWorkspaceSelect: (workspace: T) => void;
	getWorkspaceId: (workspace: T) => string;
	getWorkspaceName: (workspace: T) => string;
}

const WorkspaceContext = React.createContext<WorkspaceContextValue<any> | null>(
	null,
);

function useWorkspaceContext<T extends Workspace>() {
	const context = React.useContext(
		WorkspaceContext,
	) as WorkspaceContextValue<T> | null;
	if (!context) {
		throw new Error(
			'Workspace components must be used within WorkspaceProvider',
		);
	}
	return context;
}

// Main provider component
interface WorkspaceProviderProps<T extends Workspace> {
	children: React.ReactNode;
	workspaces: T[];
	selectedWorkspaceId?: string;
	onWorkspaceChange?: (workspace: T) => void;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	getWorkspaceId?: (workspace: T) => string;
	getWorkspaceName?: (workspace: T) => string;
}

function WorkspaceProvider<T extends Workspace>({
	children,
	workspaces,
	selectedWorkspaceId,
	onWorkspaceChange,
	open: controlledOpen,
	onOpenChange,
	getWorkspaceId = (workspace) => workspace.id,
	getWorkspaceName = (workspace) => workspace.name,
}: WorkspaceProviderProps<T>) {
	const [internalOpen, setInternalOpen] = React.useState(false);

	const open = controlledOpen ?? internalOpen;
	const setOpen = onOpenChange ?? setInternalOpen;

	const selectedWorkspace = React.useMemo(() => {
		if (!selectedWorkspaceId) return workspaces[0];
		return (
			workspaces.find((ws) => getWorkspaceId(ws) === selectedWorkspaceId) ||
			workspaces[0]
		);
	}, [workspaces, selectedWorkspaceId, getWorkspaceId]);

	const handleWorkspaceSelect = React.useCallback(
		(workspace: T) => {
			onWorkspaceChange?.(workspace);
			setOpen(false);
		},
		[onWorkspaceChange, setOpen],
	);

	const value: WorkspaceContextValue<T> = {
		open,
		setOpen,
		selectedWorkspace,
		workspaces,
		onWorkspaceSelect: handleWorkspaceSelect,
		getWorkspaceId,
		getWorkspaceName,
	};

	return (
		<WorkspaceContext.Provider value={value}>
			<Popover open={open} onOpenChange={setOpen}>
				{children}
			</Popover>
		</WorkspaceContext.Provider>
	);
}

// Trigger component
interface WorkspaceTriggerProps extends React.ComponentProps<'button'> {
	renderTrigger?: (workspace: Workspace, isOpen: boolean) => React.ReactNode;
}

function WorkspaceTrigger({
	className,
	renderTrigger,
	...props
}: WorkspaceTriggerProps) {
	const { open, selectedWorkspace, getWorkspaceName } = useWorkspaceContext();

	if (!selectedWorkspace) return null;

	if (renderTrigger) {
		return (
			<PopoverTrigger asChild>
				<button className={className} {...props}>
					{renderTrigger(selectedWorkspace, open)}
				</button>
			</PopoverTrigger>
		);
	}

	return (
		<PopoverTrigger asChild>
			<button
				data-state={open ? 'open' : 'closed'}
				className={cn(
					'border-input bg-background ring-offset-background flex h-12 w-full max-w-72 items-center justify-between rounded-md border px-3 py-2 text-sm',
					'placeholder:text-muted-foreground focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-none',
					'disabled:cursor-not-allowed disabled:opacity-50',
					'hover:bg-accent hover:text-accent-foreground',
					className,
				)}
				{...props}
			>
				<div className="flex min-w-0 flex-1 items-center gap-2">
					<Avatar className="h-6 w-6">
						<AvatarImage
							src={(selectedWorkspace as any).logo}
							alt={getWorkspaceName(selectedWorkspace)}
						/>
						<AvatarFallback className="text-xs">
							{getWorkspaceName(selectedWorkspace).charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<span className="truncate">
						{getWorkspaceName(selectedWorkspace)}
					</span>
				</div>
				<ChevronsUpDownIcon className="h-4 w-4 shrink-0 opacity-50" />
			</button>
		</PopoverTrigger>
	);
}

// Content component
interface WorkspaceContentProps
	extends React.ComponentProps<typeof PopoverContent> {
	renderWorkspace?: (
		workspace: Workspace,
		isSelected: boolean,
	) => React.ReactNode;
	title?: string;
	searchable?: boolean;
	onSearch?: (query: string) => void;
}

function WorkspaceContent({
	className,
	children,
	renderWorkspace,
	title = 'Workspaces',
	searchable = false,
	onSearch,
	...props
}: WorkspaceContentProps) {
	const {
		workspaces,
		selectedWorkspace,
		onWorkspaceSelect,
		getWorkspaceId,
		getWorkspaceName,
	} = useWorkspaceContext();

	const [searchQuery, setSearchQuery] = React.useState('');

	const filteredWorkspaces = React.useMemo(() => {
		if (!searchQuery) return workspaces;
		return workspaces.filter((ws) =>
			getWorkspaceName(ws).toLowerCase().includes(searchQuery.toLowerCase()),
		);
	}, [workspaces, searchQuery, getWorkspaceName]);

	React.useEffect(() => {
		onSearch?.(searchQuery);
	}, [searchQuery, onSearch]);

	const defaultRenderWorkspace = (
		workspace: Workspace,
		isSelected: boolean,
	) => (
		<div className="flex min-w-0 flex-1 items-center gap-2">
			<Avatar className="h-6 w-6">
				<AvatarImage
					src={(workspace as any).logo}
					alt={getWorkspaceName(workspace)}
				/>
				<AvatarFallback className="text-xs">
					{getWorkspaceName(workspace).charAt(0).toUpperCase()}
				</AvatarFallback>
			</Avatar>
			<div className="flex min-w-0 flex-1 flex-col items-start">
				<span className="truncate text-sm">{getWorkspaceName(workspace)}</span>
				{(workspace as any).plan && (
					<span className="text-muted-foreground text-xs">
						{(workspace as any).plan}
					</span>
				)}
			</div>
			{isSelected && <CheckIcon className="ml-auto h-4 w-4" />}
		</div>
	);

	return (
		<PopoverContent
			className={cn('p-0', className)}
			align={props.align || 'start'}
			{...props}
		>
			<div className="border-b px-3 py-2">
				<p className="text-muted-foreground text-sm font-medium">{title}</p>
			</div>

			{searchable && (
				<div className="border-b px-3 py-2">
					<input
						type="text"
						placeholder="Search workspaces..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="placeholder:text-muted-foreground w-full border-none bg-transparent text-sm outline-none"
					/>
				</div>
			)}

			<div className="max-h-[300px] overflow-y-auto">
				{filteredWorkspaces.length === 0 ? (
					<div className="text-muted-foreground px-3 py-2 text-center text-sm">
						No workspaces found
					</div>
				) : (
					<div className="p-1">
						{filteredWorkspaces.map((workspace) => {
							const isSelected =
								selectedWorkspace &&
								getWorkspaceId(selectedWorkspace) === getWorkspaceId(workspace);

							return (
								<button
									key={getWorkspaceId(workspace)}
									onClick={() => onWorkspaceSelect(workspace)}
									className={cn(
										'flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left text-sm',
										'hover:bg-accent hover:text-accent-foreground',
										'focus:outline-none',
										isSelected && 'bg-accent text-accent-foreground',
									)}
								>
									{renderWorkspace
										? renderWorkspace(workspace, !!isSelected)
										: defaultRenderWorkspace(workspace, !!isSelected)}
								</button>
							);
						})}
					</div>
				)}
			</div>

			{children && (
				<>
					<div className="border-t" />
					<div className="p-1">{children}</div>
				</>
			)}
		</PopoverContent>
	);
}

export { WorkspaceProvider as Workspaces, WorkspaceTrigger, WorkspaceContent };


code.demo.1753391499752.tsx
'use client';

import * as React from 'react';
import {
	Workspaces,
	WorkspaceTrigger,
	WorkspaceContent,
	type Workspace,
} from '@/components/ui/workspaces';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { StarIcon } from 'lucide-react';
import { SettingsIcon } from 'lucide-react';
// Extended workspace interface for this specific use case
interface MyWorkspace extends Workspace {
	logo: string;
	plan: string;
	slug: string;
	isFavorite?: boolean;

}

const workspaces: MyWorkspace[] = [
	{
		id: '1',
		name: 'Asme Inc.',
		logo: 'https://avatar.vercel.sh/asme',
		plan: 'Free',
		slug: 'asme',
		isFavorite: true,
	},
	{
		id: '2',
		name: 'Bilux Labs',
		logo: 'https://avatar.vercel.sh/bilux',
		plan: 'Pro',
		slug: 'bilux',
	},
	{
		id: '3',
		name: 'Zentra Ltd.',
		logo: 'https://avatar.vercel.sh/zentra',
		plan: 'Team',
		slug: 'zentra',
		isFavorite: true,
	},
	{
		id: '4',
		name: 'Nuvex Group',
		logo: 'https://avatar.vercel.sh/nuvex',
		plan: 'Free',
		slug: 'nuvex',
	},
	{
		id: '5',
		name: 'Cortexia',
		logo: 'https://avatar.vercel.sh/cortexia',
		plan: 'Pro',
		slug: 'cortexia',
	},
];

export default function CustomRendering() {
	const [activeWorkspaceId, setActiveWorkspaceId] = React.useState('1');
	const [open, setOpen] = React.useState(false);

	const handleWorkspaceChange = (workspace: MyWorkspace) => {
		setActiveWorkspaceId(workspace.id);
		console.log('Selected workspace:', workspace);
	};

	// Custom workspace renderer with additional info
	const renderWorkspace = (workspace: Workspace, isSelected: boolean) => {
		const ws = workspace as MyWorkspace;
		return (
			<div className="flex min-w-0 flex-1 items-center gap-3">
				<div className="relative">
					<img src={ws.logo} alt={ws.name} className="h-8 w-8 rounded-full" />
					{ws.isFavorite && (
						<StarIcon className="absolute -top-1 -right-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
					)}
				</div>
				<div className="flex min-w-0 flex-1 flex-col items-start">
					<span className="truncate text-sm font-medium">{ws.name}</span>
					<span className="text-muted-foreground text-xs">{ws.plan} Plan</span>
				</div>
				{isSelected && (
					<div className="flex items-center gap-1">
						<span className="text-xs font-medium text-green-600">Active</span>
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="flex min-h-screen items-start justify-center gap-8 px-4 py-18">
				<Workspaces
			workspaces={workspaces}
			selectedWorkspaceId={activeWorkspaceId}
			onWorkspaceChange={handleWorkspaceChange}
			open={open}
			onOpenChange={setOpen}
		>
			<WorkspaceTrigger className="min-w-72 border-2 border-dashed" />
			<WorkspaceContent
				title="Choose Workspace"
				searchable
				renderWorkspace={renderWorkspace}
			>
				<Button
					variant="ghost"
					size="sm"
					className="text-muted-foreground w-full justify-start"
				>
					<PlusIcon className="mr-2 h-4 w-4" />
					Create new workspace
				</Button>
				<Button
					variant="ghost"
					size="sm"
					className="text-muted-foreground w-full justify-start"
				>
					<SettingsIcon className="mr-2 h-4 w-4" />
					Manage workspaces
				</Button>
			</WorkspaceContent>
		</Workspaces>
		</div>
	);
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/workspaces.tsx
'use client';

import * as React from 'react';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

// Generic workspace interface - can be extended
export interface Workspace {
	id: string;
	name: string;
	[key: string]: any; // Allow additional properties
}

// Context for workspace state management
interface WorkspaceContextValue<T extends Workspace> {
	open: boolean;
	setOpen: (open: boolean) => void;
	selectedWorkspace: T | undefined;
	workspaces: T[];
	onWorkspaceSelect: (workspace: T) => void;
	getWorkspaceId: (workspace: T) => string;
	getWorkspaceName: (workspace: T) => string;
}

const WorkspaceContext = React.createContext<WorkspaceContextValue<any> | null>(
	null,
);

function useWorkspaceContext<T extends Workspace>() {
	const context = React.useContext(
		WorkspaceContext,
	) as WorkspaceContextValue<T> | null;
	if (!context) {
		throw new Error(
			'Workspace components must be used within WorkspaceProvider',
		);
	}
	return context;
}

// Main provider component
interface WorkspaceProviderProps<T extends Workspace> {
	children: React.ReactNode;
	workspaces: T[];
	selectedWorkspaceId?: string;
	onWorkspaceChange?: (workspace: T) => void;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	getWorkspaceId?: (workspace: T) => string;
	getWorkspaceName?: (workspace: T) => string;
}

function WorkspaceProvider<T extends Workspace>({
	children,
	workspaces,
	selectedWorkspaceId,
	onWorkspaceChange,
	open: controlledOpen,
	onOpenChange,
	getWorkspaceId = (workspace) => workspace.id,
	getWorkspaceName = (workspace) => workspace.name,
}: WorkspaceProviderProps<T>) {
	const [internalOpen, setInternalOpen] = React.useState(false);

	const open = controlledOpen ?? internalOpen;
	const setOpen = onOpenChange ?? setInternalOpen;

	const selectedWorkspace = React.useMemo(() => {
		if (!selectedWorkspaceId) return workspaces[0];
		return (
			workspaces.find((ws) => getWorkspaceId(ws) === selectedWorkspaceId) ||
			workspaces[0]
		);
	}, [workspaces, selectedWorkspaceId, getWorkspaceId]);

	const handleWorkspaceSelect = React.useCallback(
		(workspace: T) => {
			onWorkspaceChange?.(workspace);
			setOpen(false);
		},
		[onWorkspaceChange, setOpen],
	);

	const value: WorkspaceContextValue<T> = {
		open,
		setOpen,
		selectedWorkspace,
		workspaces,
		onWorkspaceSelect: handleWorkspaceSelect,
		getWorkspaceId,
		getWorkspaceName,
	};

	return (
		<WorkspaceContext.Provider value={value}>
			<Popover open={open} onOpenChange={setOpen}>
				{children}
			</Popover>
		</WorkspaceContext.Provider>
	);
}

// Trigger component
interface WorkspaceTriggerProps extends React.ComponentProps<'button'> {
	renderTrigger?: (workspace: Workspace, isOpen: boolean) => React.ReactNode;
}

function WorkspaceTrigger({
	className,
	renderTrigger,
	...props
}: WorkspaceTriggerProps) {
	const { open, selectedWorkspace, getWorkspaceName } = useWorkspaceContext();

	if (!selectedWorkspace) return null;

	if (renderTrigger) {
		return (
			<PopoverTrigger asChild>
				<button className={className} {...props}>
					{renderTrigger(selectedWorkspace, open)}
				</button>
			</PopoverTrigger>
		);
	}

	return (
		<PopoverTrigger asChild>
			<button
				data-state={open ? 'open' : 'closed'}
				className={cn(
					'border-input bg-background ring-offset-background flex h-12 w-full max-w-72 items-center justify-between rounded-md border px-3 py-2 text-sm',
					'placeholder:text-muted-foreground focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-none',
					'disabled:cursor-not-allowed disabled:opacity-50',
					'hover:bg-accent hover:text-accent-foreground',
					className,
				)}
				{...props}
			>
				<div className="flex min-w-0 flex-1 items-center gap-2">
					<Avatar className="h-6 w-6">
						<AvatarImage
							src={(selectedWorkspace as any).logo}
							alt={getWorkspaceName(selectedWorkspace)}
						/>
						<AvatarFallback className="text-xs">
							{getWorkspaceName(selectedWorkspace).charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<span className="truncate">
						{getWorkspaceName(selectedWorkspace)}
					</span>
				</div>
				<ChevronsUpDownIcon className="h-4 w-4 shrink-0 opacity-50" />
			</button>
		</PopoverTrigger>
	);
}

// Content component
interface WorkspaceContentProps
	extends React.ComponentProps<typeof PopoverContent> {
	renderWorkspace?: (
		workspace: Workspace,
		isSelected: boolean,
	) => React.ReactNode;
	title?: string;
	searchable?: boolean;
	onSearch?: (query: string) => void;
}

function WorkspaceContent({
	className,
	children,
	renderWorkspace,
	title = 'Workspaces',
	searchable = false,
	onSearch,
	...props
}: WorkspaceContentProps) {
	const {
		workspaces,
		selectedWorkspace,
		onWorkspaceSelect,
		getWorkspaceId,
		getWorkspaceName,
	} = useWorkspaceContext();

	const [searchQuery, setSearchQuery] = React.useState('');

	const filteredWorkspaces = React.useMemo(() => {
		if (!searchQuery) return workspaces;
		return workspaces.filter((ws) =>
			getWorkspaceName(ws).toLowerCase().includes(searchQuery.toLowerCase()),
		);
	}, [workspaces, searchQuery, getWorkspaceName]);

	React.useEffect(() => {
		onSearch?.(searchQuery);
	}, [searchQuery, onSearch]);

	const defaultRenderWorkspace = (
		workspace: Workspace,
		isSelected: boolean,
	) => (
		<div className="flex min-w-0 flex-1 items-center gap-2">
			<Avatar className="h-6 w-6">
				<AvatarImage
					src={(workspace as any).logo}
					alt={getWorkspaceName(workspace)}
				/>
				<AvatarFallback className="text-xs">
					{getWorkspaceName(workspace).charAt(0).toUpperCase()}
				</AvatarFallback>
			</Avatar>
			<div className="flex min-w-0 flex-1 flex-col items-start">
				<span className="truncate text-sm">{getWorkspaceName(workspace)}</span>
				{(workspace as any).plan && (
					<span className="text-muted-foreground text-xs">
						{(workspace as any).plan}
					</span>
				)}
			</div>
			{isSelected && <CheckIcon className="ml-auto h-4 w-4" />}
		</div>
	);

	return (
		<PopoverContent
			className={cn('p-0', className)}
			align={props.align || 'start'}
			{...props}
		>
			<div className="border-b px-3 py-2">
				<p className="text-muted-foreground text-sm font-medium">{title}</p>
			</div>

			{searchable && (
				<div className="border-b px-3 py-2">
					<input
						type="text"
						placeholder="Search workspaces..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="placeholder:text-muted-foreground w-full border-none bg-transparent text-sm outline-none"
					/>
				</div>
			)}

			<div className="max-h-[300px] overflow-y-auto">
				{filteredWorkspaces.length === 0 ? (
					<div className="text-muted-foreground px-3 py-2 text-center text-sm">
						No workspaces found
					</div>
				) : (
					<div className="p-1">
						{filteredWorkspaces.map((workspace) => {
							const isSelected =
								selectedWorkspace &&
								getWorkspaceId(selectedWorkspace) === getWorkspaceId(workspace);

							return (
								<button
									key={getWorkspaceId(workspace)}
									onClick={() => onWorkspaceSelect(workspace)}
									className={cn(
										'flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left text-sm',
										'hover:bg-accent hover:text-accent-foreground',
										'focus:outline-none',
										isSelected && 'bg-accent text-accent-foreground',
									)}
								>
									{renderWorkspace
										? renderWorkspace(workspace, !!isSelected)
										: defaultRenderWorkspace(workspace, !!isSelected)}
								</button>
							);
						})}
					</div>
				)}
			</div>

			{children && (
				<>
					<div className="border-t" />
					<div className="p-1">{children}</div>
				</>
			)}
		</PopoverContent>
	);
}

export { WorkspaceProvider as Workspaces, WorkspaceTrigger, WorkspaceContent };

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
