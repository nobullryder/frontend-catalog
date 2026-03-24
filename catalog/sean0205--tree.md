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
tree.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ItemInstance } from '@headless-tree/core';
import { ChevronDownIcon, SquareMinus, SquarePlus } from 'lucide-react';
import { Slot as SlotPrimitive } from 'radix-ui';

type ToggleIconType = 'chevron' | 'plus-minus';

interface TreeContextValue<T = any> {
  indent: number;
  currentItem?: ItemInstance<T>;
  tree?: any;
  toggleIconType?: ToggleIconType;
}

const TreeContext = React.createContext<TreeContextValue>({
  indent: 20,
  currentItem: undefined,
  tree: undefined,
  toggleIconType: 'plus-minus',
});

function useTreeContext<T = any>() {
  return React.useContext(TreeContext) as TreeContextValue<T>;
}

interface TreeProps extends React.HTMLAttributes<HTMLDivElement> {
  indent?: number;
  tree?: any;
  toggleIconType?: ToggleIconType;
}

function Tree({ indent = 20, tree, className, toggleIconType = 'chevron', ...props }: TreeProps) {
  const containerProps = tree && typeof tree.getContainerProps === 'function' ? tree.getContainerProps() : {};
  const mergedProps = { ...props, ...containerProps };

  // Extract style from mergedProps to merge with our custom styles
  const { style: propStyle, ...otherProps } = mergedProps;

  // Merge styles
  const mergedStyle = {
    ...propStyle,
    '--tree-indent': `${indent}px`,
  } as React.CSSProperties;

  return (
    <TreeContext.Provider value={{ indent, tree, toggleIconType }}>
      <div data-slot="tree" style={mergedStyle} className={cn('flex flex-col', className)} {...otherProps} />
    </TreeContext.Provider>
  );
}

interface TreeItemProps<T = any> extends React.HTMLAttributes<HTMLButtonElement> {
  item: ItemInstance<T>;
  indent?: number;
  asChild?: boolean;
}

function TreeItem<T = any>({ item, className, asChild, children, ...props }: Omit<TreeItemProps<T>, 'indent'>) {
  const parentContext = useTreeContext<T>();
  const { indent } = parentContext;

  const itemProps = typeof item.getProps === 'function' ? item.getProps() : {};
  const mergedProps = { ...props, ...itemProps };

  // Extract style from mergedProps to merge with our custom styles
  const { style: propStyle, ...otherProps } = mergedProps;

  // Merge styles
  const mergedStyle = {
    ...propStyle,
    '--tree-padding': `${item.getItemMeta().level * indent}px`,
  } as React.CSSProperties;

  const Comp = asChild ? SlotPrimitive.Slot : 'button';

  return (
    <TreeContext.Provider value={{ ...parentContext, currentItem: item }}>
      <Comp
        data-slot="tree-item"
        style={mergedStyle}
        className={cn(
          'z-10 ps-(--tree-padding) outline-hidden select-none not-last:pb-0.5 focus:z-20 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          className,
        )}
        data-focus={typeof item.isFocused === 'function' ? item.isFocused() || false : undefined}
        data-folder={typeof item.isFolder === 'function' ? item.isFolder() || false : undefined}
        data-selected={typeof item.isSelected === 'function' ? item.isSelected() || false : undefined}
        data-drag-target={typeof item.isDragTarget === 'function' ? item.isDragTarget() || false : undefined}
        data-search-match={typeof item.isMatchingSearch === 'function' ? item.isMatchingSearch() || false : undefined}
        aria-expanded={item.isExpanded()}
        {...otherProps}
      >
        {children}
      </Comp>
    </TreeContext.Provider>
  );
}

interface TreeItemLabelProps<T = any> extends React.HTMLAttributes<HTMLSpanElement> {
  item?: ItemInstance<T>;
}

function TreeItemLabel<T = any>({ item: propItem, children, className, ...props }: TreeItemLabelProps<T>) {
  const { currentItem, toggleIconType } = useTreeContext<T>();
  const item = propItem || currentItem;

  if (!item) {
    console.warn('TreeItemLabel: No item provided via props or context');
    return null;
  }

  return (
    <span
      data-slot="tree-item-label"
      className={cn(
        'in-focus-visible:ring-ring/50 bg-background hover:bg-accent in-data-[selected=true]:bg-accent in-data-[selected=true]:text-accent-foreground in-data-[drag-target=true]:bg-accent flex items-center gap-1 rounded-sm px-2 py-1.5 text-sm transition-colors not-in-data-[folder=true]:ps-7 in-focus-visible:ring-[3px] in-data-[search-match=true]:bg-blue-50! [&_svg]:pointer-events-none [&_svg]:shrink-0',
        className,
      )}
      {...props}
    >
      {item.isFolder() &&
        (toggleIconType === 'plus-minus' ? (
          item.isExpanded() ? (
            <SquareMinus className="text-muted-foreground size-3.5" stroke="currentColor" strokeWidth="1" />
          ) : (
            <SquarePlus className="text-muted-foreground size-3.5" stroke="currentColor" strokeWidth="1" />
          )
        ) : (
          <ChevronDownIcon className="text-muted-foreground size-4 in-aria-[expanded=false]:-rotate-90" />
        ))}
      {children || (typeof item.getItemName === 'function' ? item.getItemName() : null)}
    </span>
  );
}

function TreeDragLine({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { tree } = useTreeContext();

  if (!tree || typeof tree.getDragLineStyle !== 'function') {
    console.warn('TreeDragLine: No tree provided via context or tree does not have getDragLineStyle method');
    return null;
  }

  const dragLine = tree.getDragLineStyle();
  return (
    <div
      style={dragLine}
      className={cn(
        'bg-primary before:bg-background before:border-primary absolute z-30 -mt-px h-0.5 w-[unset] before:absolute before:-top-[3px] before:left-0 before:size-2 before:rounded-full before:border-2',
        className,
      )}
      {...props}
    />
  );
}

export { Tree, TreeItem, TreeItemLabel, TreeDragLine };




code.demo.1752753496333.tsx
'use client';

import React from 'react';
import { Tree, TreeItem, TreeItemLabel } from '@/components/ui/tree';
import { hotkeysCoreFeature, syncDataLoaderFeature } from '@headless-tree/core';
import { useTree } from '@headless-tree/react';

interface Item {
  name: string;
  children?: string[];
}

const items: Record<string, Item> = {
  crm: {
    name: 'CRM',
    children: ['leads', 'accounts', 'activities', 'support'],
  },
  leads: {
    name: 'Leads',
    children: ['new-lead', 'contacted-lead', 'qualified-lead'],
  },
  'new-lead': { name: 'New Lead' },
  'contacted-lead': { name: 'Contacted Lead' },
  'qualified-lead': { name: 'Qualified Lead' },
  accounts: {
    name: 'Accounts',
    children: ['acme-corp', 'globex-inc'],
  },
  'acme-corp': {
    name: 'Acme Corp',
    children: ['acme-contacts', 'acme-opportunities'],
  },
  'acme-contacts': {
    name: 'Contacts',
    children: ['john-smith', 'jane-doe'],
  },
  'john-smith': { name: 'John Smith' },
  'jane-doe': { name: 'Jane Doe' },
  'acme-opportunities': {
    name: 'Opportunities',
    children: ['website-redesign', 'annual-maintenance'],
  },
  'website-redesign': { name: 'Website Redesign' },
  'annual-maintenance': { name: 'Annual Maintenance' },
  'globex-inc': {
    name: 'Globex Inc',
    children: ['globex-contacts', 'globex-opportunities'],
  },
  'globex-contacts': {
    name: 'Contacts',
    children: ['alice-johnson'],
  },
  'alice-johnson': { name: 'Alice Johnson' },
  'globex-opportunities': {
    name: 'Opportunities',
    children: ['cloud-migration'],
  },
  'cloud-migration': { name: 'Cloud Migration' },
  activities: {
    name: 'Activities',
    children: ['calls', 'meetings', 'emails'],
  },
  calls: { name: 'Calls' },
  meetings: { name: 'Meetings' },
  emails: { name: 'Emails' },
  support: {
    name: 'Support',
    children: ['open-tickets', 'closed-tickets'],
  },
  'open-tickets': { name: 'Open Tickets' },
  'closed-tickets': { name: 'Closed Tickets' },
};

const indent = 20;

export default function Component() {
  const tree = useTree<Item>({
    initialState: {
      expandedItems: ['leads', 'accounts', 'activities'],
    },
    indent,
    rootItemId: 'crm',
    getItemName: (item) => item.getItemData().name,
    isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
    dataLoader: {
      getItem: (itemId) => items[itemId],
      getChildren: (itemId) => items[itemId].children ?? [],
    },
    features: [syncDataLoaderFeature, hotkeysCoreFeature],
  });

  return (
    <div className="flex flex-col gap-5 p-10 w-full mx-auto max-w-[300px] h-screen justify-center items-center">
      <div className="self-start lg:w-[225px]">
        <Tree indent={indent} tree={tree}>
          {tree.getItems().map((item) => {
            return (
              <TreeItem key={item.getId()} item={item}>
                <TreeItemLabel />
              </TreeItem>
            );
          })}
        </Tree>
      </div>
    </div>
  );
}


```

Copy-paste these files for dependencies:
```tsx
src/components/ui/tree.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ItemInstance } from '@headless-tree/core';
import { ChevronDownIcon, SquareMinus, SquarePlus } from 'lucide-react';
import { Slot as SlotPrimitive } from 'radix-ui';

type ToggleIconType = 'chevron' | 'plus-minus';

interface TreeContextValue<T = any> {
  indent: number;
  currentItem?: ItemInstance<T>;
  tree?: any;
  toggleIconType?: ToggleIconType;
}

const TreeContext = React.createContext<TreeContextValue>({
  indent: 20,
  currentItem: undefined,
  tree: undefined,
  toggleIconType: 'plus-minus',
});

function useTreeContext<T = any>() {
  return React.useContext(TreeContext) as TreeContextValue<T>;
}

interface TreeProps extends React.HTMLAttributes<HTMLDivElement> {
  indent?: number;
  tree?: any;
  toggleIconType?: ToggleIconType;
}

function Tree({ indent = 20, tree, className, toggleIconType = 'chevron', ...props }: TreeProps) {
  const containerProps = tree && typeof tree.getContainerProps === 'function' ? tree.getContainerProps() : {};
  const mergedProps = { ...props, ...containerProps };

  // Extract style from mergedProps to merge with our custom styles
  const { style: propStyle, ...otherProps } = mergedProps;

  // Merge styles
  const mergedStyle = {
    ...propStyle,
    '--tree-indent': `${indent}px`,
  } as React.CSSProperties;

  return (
    <TreeContext.Provider value={{ indent, tree, toggleIconType }}>
      <div data-slot="tree" style={mergedStyle} className={cn('flex flex-col', className)} {...otherProps} />
    </TreeContext.Provider>
  );
}

interface TreeItemProps<T = any> extends React.HTMLAttributes<HTMLButtonElement> {
  item: ItemInstance<T>;
  indent?: number;
  asChild?: boolean;
}

function TreeItem<T = any>({ item, className, asChild, children, ...props }: Omit<TreeItemProps<T>, 'indent'>) {
  const parentContext = useTreeContext<T>();
  const { indent } = parentContext;

  const itemProps = typeof item.getProps === 'function' ? item.getProps() : {};
  const mergedProps = { ...props, ...itemProps };

  // Extract style from mergedProps to merge with our custom styles
  const { style: propStyle, ...otherProps } = mergedProps;

  // Merge styles
  const mergedStyle = {
    ...propStyle,
    '--tree-padding': `${item.getItemMeta().level * indent}px`,
  } as React.CSSProperties;

  const Comp = asChild ? SlotPrimitive.Slot : 'button';

  return (
    <TreeContext.Provider value={{ ...parentContext, currentItem: item }}>
      <Comp
        data-slot="tree-item"
        style={mergedStyle}
        className={cn(
          'z-10 ps-(--tree-padding) outline-hidden select-none not-last:pb-0.5 focus:z-20 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          className,
        )}
        data-focus={typeof item.isFocused === 'function' ? item.isFocused() || false : undefined}
        data-folder={typeof item.isFolder === 'function' ? item.isFolder() || false : undefined}
        data-selected={typeof item.isSelected === 'function' ? item.isSelected() || false : undefined}
        data-drag-target={typeof item.isDragTarget === 'function' ? item.isDragTarget() || false : undefined}
        data-search-match={typeof item.isMatchingSearch === 'function' ? item.isMatchingSearch() || false : undefined}
        aria-expanded={item.isExpanded()}
        {...otherProps}
      >
        {children}
      </Comp>
    </TreeContext.Provider>
  );
}

interface TreeItemLabelProps<T = any> extends React.HTMLAttributes<HTMLSpanElement> {
  item?: ItemInstance<T>;
}

function TreeItemLabel<T = any>({ item: propItem, children, className, ...props }: TreeItemLabelProps<T>) {
  const { currentItem, toggleIconType } = useTreeContext<T>();
  const item = propItem || currentItem;

  if (!item) {
    console.warn('TreeItemLabel: No item provided via props or context');
    return null;
  }

  return (
    <span
      data-slot="tree-item-label"
      className={cn(
        'in-focus-visible:ring-ring/50 bg-background hover:bg-accent in-data-[selected=true]:bg-accent in-data-[selected=true]:text-accent-foreground in-data-[drag-target=true]:bg-accent flex items-center gap-1 rounded-sm px-2 py-1.5 text-sm transition-colors not-in-data-[folder=true]:ps-7 in-focus-visible:ring-[3px] in-data-[search-match=true]:bg-blue-50! [&_svg]:pointer-events-none [&_svg]:shrink-0',
        className,
      )}
      {...props}
    >
      {item.isFolder() &&
        (toggleIconType === 'plus-minus' ? (
          item.isExpanded() ? (
            <SquareMinus className="text-muted-foreground size-3.5" stroke="currentColor" strokeWidth="1" />
          ) : (
            <SquarePlus className="text-muted-foreground size-3.5" stroke="currentColor" strokeWidth="1" />
          )
        ) : (
          <ChevronDownIcon className="text-muted-foreground size-4 in-aria-[expanded=false]:-rotate-90" />
        ))}
      {children || (typeof item.getItemName === 'function' ? item.getItemName() : null)}
    </span>
  );
}

function TreeDragLine({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { tree } = useTreeContext();

  if (!tree || typeof tree.getDragLineStyle !== 'function') {
    console.warn('TreeDragLine: No tree provided via context or tree does not have getDragLineStyle method');
    return null;
  }

  const dragLine = tree.getDragLineStyle();
  return (
    <div
      style={dragLine}
      className={cn(
        'bg-primary before:bg-background before:border-primary absolute z-30 -mt-px h-0.5 w-[unset] before:absolute before:-top-[3px] before:left-0 before:size-2 before:rounded-full before:border-2',
        className,
      )}
      {...props}
    />
  );
}

export { Tree, TreeItem, TreeItemLabel, TreeDragLine };



```

Install NPM dependencies:
```bash
@headless-tree/core, lucide-react, radix-ui
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
