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
table-controls.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils"; // Assumes shadcn's utility for class merging
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, ChevronDown, Trash2, ArrowRight, Settings } from 'lucide-react';

// --- 📦 API (Props) Definition ---
export interface BulkAction {
  /** A unique key for the action. */
  key: string;
  /** The label displayed in the dropdown. */
  label: string;
  /** Optional icon for the action. */
  icon?: React.ElementType;
  /** If true, the action is destructive (e.g., delete) and gets red styling. */
  isDestructive?: boolean;
}

export interface DataTableActionsProps {
  /** The number of items currently selected in the table. */
  selectedCount: number;
  /** Callback for when the search input value changes. */
  onSearchChange: (query: string) => void;
  /** Array of available bulk actions. */
  bulkActions: BulkAction[];
  /** Callback when a bulk action is selected. */
  onBulkActionSelect: (actionKey: string) => void;
  /** Placeholder text for the search input. */
  searchPlaceholder?: string;
  /** Optional class name for the container. */
  className?: string;
}

/**
 * The control panel for a data table, providing search, filter, and bulk action capabilities.
 * Uses Framer Motion for button interactivity and subtle animation.
 */
const DataTableActions: React.FC<DataTableActionsProps> = ({
  selectedCount,
  onSearchChange,
  bulkActions,
  onBulkActionSelect,
  searchPlaceholder = "Search users...",
  className,
}) => {
  const hasSelection = selectedCount > 0;

  // Framer Motion variants for button press feedback
  const buttonVariants = {
    tap: { scale: 0.95 },
    hover: { scale: 1.02 },
  };

  return (
    <div className={cn(
      "flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4 p-4 border-b bg-card/50 rounded-t-lg",
      className
    )}>
      {/* Search Input */}
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <Input
          placeholder={searchPlaceholder}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 h-9 transition-shadow duration-150 focus:shadow-md"
          aria-label={searchPlaceholder}
        />
      </div>

      {/* Actions (Bulk Dropdown and View Options Placeholder) */}
      <div className="flex space-x-3 w-full sm:w-auto justify-end">
        {/* Bulk Actions Dropdown */}
        <DropdownMenu>
          <motion.div
            whileTap="tap"
            whileHover="hover"
            variants={buttonVariants}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant={hasSelection ? "default" : "outline"}
                size="sm"
                disabled={!hasSelection}
                className={cn(
                    "transition-colors duration-200 h-9 w-full sm:w-auto",
                    hasSelection ? "bg-primary hover:bg-primary/90" : "text-muted-foreground"
                )}
                aria-label={`Bulk actions for ${selectedCount} items`}
              >
                {hasSelection ? `${selectedCount} Selected` : "Bulk Actions"}
                <ChevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
          </motion.div>
          
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {bulkActions.map((action) => {
              const ActionIcon = action.icon || ArrowRight;
              return (
                <DropdownMenuItem
                  key={action.key}
                  onClick={() => onBulkActionSelect(action.key)}
                  className={cn(
                    "flex items-center cursor-pointer transition-colors duration-100",
                    action.isDestructive ? "text-red-600 focus:bg-red-500/10 focus:text-red-700 dark:text-red-400 dark:focus:text-red-300" : ""
                  )}
                >
                  <ActionIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                  {action.label}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* View/Export Placeholder Button */}
        <Button variant="outline" size="sm" className="h-9 transition-colors duration-150 hover:bg-accent/80">
            Export Data
        </Button>
      </div>
    </div>
  );
};



const mockBulkActions: BulkAction[] = [
  { key: 'deactivate', label: 'Deactivate Users', icon: ArrowRight },
  { key: 'reset_password', label: 'Reset Password', icon: Settings },
  { key: 'delete', label: 'Delete Selected', icon: Trash2, isDestructive: true },
];

const ExampleUsage = () => {
  const [selectedUsers, setSelectedUsers] = React.useState(3);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleBulkAction = (key: string) => {
    alert(`Performing action: ${key} on ${selectedUsers} users.`);
    // In a real app, you'd send an API request and clear selection
    setSelectedUsers(0); 
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Search Query:", query);
  };

  return (
    <div className="p-8 bg-background border rounded-lg max-w-5xl mx-auto shadow-md">
      <h3 className="text-xl font-semibold text-foreground mb-4">Table Controls Demo (Simulated Selection)</h3>
      
      <DataTableActions
        selectedCount={selectedUsers}
        onSearchChange={handleSearch}
        bulkActions={mockBulkActions}
        onBulkActionSelect={handleBulkAction}
        searchPlaceholder="Search user accounts..."
        className="mb-4"
      />
      
      <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
          <p>Current Search: <strong className="text-foreground">{searchQuery || "None"}</strong></p>
          <p>Selected Count: <strong className="text-foreground">{selectedUsers}</strong></p>
          <p className="mt-2">
            <Button size="sm" onClick={() => setSelectedUsers(5)} className="mr-2">
                Simulate 5 Selected
            </Button>
            <Button size="sm" variant="outline" onClick={() => setSelectedUsers(0)}>
                Clear Selection
            </Button>
          </p>
      </div>
    </div>
  );
};

export default ExampleUsage;

code.demo.1759321134313.tsx
import ExampleUsage from "@/components/ui/table-controls";

export default function DemoOne() {
  return <ExampleUsage />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/table-controls.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils"; // Assumes shadcn's utility for class merging
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, ChevronDown, Trash2, ArrowRight, Settings } from 'lucide-react';

// --- 📦 API (Props) Definition ---
export interface BulkAction {
  /** A unique key for the action. */
  key: string;
  /** The label displayed in the dropdown. */
  label: string;
  /** Optional icon for the action. */
  icon?: React.ElementType;
  /** If true, the action is destructive (e.g., delete) and gets red styling. */
  isDestructive?: boolean;
}

export interface DataTableActionsProps {
  /** The number of items currently selected in the table. */
  selectedCount: number;
  /** Callback for when the search input value changes. */
  onSearchChange: (query: string) => void;
  /** Array of available bulk actions. */
  bulkActions: BulkAction[];
  /** Callback when a bulk action is selected. */
  onBulkActionSelect: (actionKey: string) => void;
  /** Placeholder text for the search input. */
  searchPlaceholder?: string;
  /** Optional class name for the container. */
  className?: string;
}

/**
 * The control panel for a data table, providing search, filter, and bulk action capabilities.
 * Uses Framer Motion for button interactivity and subtle animation.
 */
const DataTableActions: React.FC<DataTableActionsProps> = ({
  selectedCount,
  onSearchChange,
  bulkActions,
  onBulkActionSelect,
  searchPlaceholder = "Search users...",
  className,
}) => {
  const hasSelection = selectedCount > 0;

  // Framer Motion variants for button press feedback
  const buttonVariants = {
    tap: { scale: 0.95 },
    hover: { scale: 1.02 },
  };

  return (
    <div className={cn(
      "flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4 p-4 border-b bg-card/50 rounded-t-lg",
      className
    )}>
      {/* Search Input */}
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <Input
          placeholder={searchPlaceholder}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 h-9 transition-shadow duration-150 focus:shadow-md"
          aria-label={searchPlaceholder}
        />
      </div>

      {/* Actions (Bulk Dropdown and View Options Placeholder) */}
      <div className="flex space-x-3 w-full sm:w-auto justify-end">
        {/* Bulk Actions Dropdown */}
        <DropdownMenu>
          <motion.div
            whileTap="tap"
            whileHover="hover"
            variants={buttonVariants}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant={hasSelection ? "default" : "outline"}
                size="sm"
                disabled={!hasSelection}
                className={cn(
                    "transition-colors duration-200 h-9 w-full sm:w-auto",
                    hasSelection ? "bg-primary hover:bg-primary/90" : "text-muted-foreground"
                )}
                aria-label={`Bulk actions for ${selectedCount} items`}
              >
                {hasSelection ? `${selectedCount} Selected` : "Bulk Actions"}
                <ChevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
          </motion.div>
          
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {bulkActions.map((action) => {
              const ActionIcon = action.icon || ArrowRight;
              return (
                <DropdownMenuItem
                  key={action.key}
                  onClick={() => onBulkActionSelect(action.key)}
                  className={cn(
                    "flex items-center cursor-pointer transition-colors duration-100",
                    action.isDestructive ? "text-red-600 focus:bg-red-500/10 focus:text-red-700 dark:text-red-400 dark:focus:text-red-300" : ""
                  )}
                >
                  <ActionIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                  {action.label}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* View/Export Placeholder Button */}
        <Button variant="outline" size="sm" className="h-9 transition-colors duration-150 hover:bg-accent/80">
            Export Data
        </Button>
      </div>
    </div>
  );
};



const mockBulkActions: BulkAction[] = [
  { key: 'deactivate', label: 'Deactivate Users', icon: ArrowRight },
  { key: 'reset_password', label: 'Reset Password', icon: Settings },
  { key: 'delete', label: 'Delete Selected', icon: Trash2, isDestructive: true },
];

const ExampleUsage = () => {
  const [selectedUsers, setSelectedUsers] = React.useState(3);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleBulkAction = (key: string) => {
    alert(`Performing action: ${key} on ${selectedUsers} users.`);
    // In a real app, you'd send an API request and clear selection
    setSelectedUsers(0); 
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Search Query:", query);
  };

  return (
    <div className="p-8 bg-background border rounded-lg max-w-5xl mx-auto shadow-md">
      <h3 className="text-xl font-semibold text-foreground mb-4">Table Controls Demo (Simulated Selection)</h3>
      
      <DataTableActions
        selectedCount={selectedUsers}
        onSearchChange={handleSearch}
        bulkActions={mockBulkActions}
        onBulkActionSelect={handleBulkAction}
        searchPlaceholder="Search user accounts..."
        className="mb-4"
      />
      
      <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
          <p>Current Search: <strong className="text-foreground">{searchQuery || "None"}</strong></p>
          <p>Selected Count: <strong className="text-foreground">{selectedUsers}</strong></p>
          <p className="mt-2">
            <Button size="sm" onClick={() => setSelectedUsers(5)} className="mr-2">
                Simulate 5 Selected
            </Button>
            <Button size="sm" variant="outline" onClick={() => setSelectedUsers(0)}>
                Clear Selection
            </Button>
          </p>
      </div>
    </div>
  );
};

export default ExampleUsage;
```

Install NPM dependencies:
```bash
framer-motion, lucide-react
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
