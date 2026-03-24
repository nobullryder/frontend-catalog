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
help-button.tsx
// component.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, HelpCircle, Keyboard, Search } from 'lucide-react';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface HelpLink {
   icon: React.ComponentType<{ className?: string }>;
   name: string;
   href: string;
}

export interface WhatsNewItem {
   name: string;
   href: string;
   isNew: boolean;
}

export interface ShortcutItem {
   name: string;
   shortcut: string;
}

interface HelpButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
   socialLinks?: HelpLink[];
   supportLink?: HelpLink;
   whatsNewItems?: WhatsNewItem[];
   shortcutItems?: ShortcutItem[];
}

const HelpButton = React.forwardRef<HTMLButtonElement, HelpButtonProps>(
   (
      {
         className,
         socialLinks = [],
         supportLink,
         whatsNewItems = [],
         shortcutItems = [],
         ...props
      },
      ref
   ) => {
      return (
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button ref={ref} size="icon" variant="outline" className={className} {...props}>
                  <HelpCircle className="size-4" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
               <div className="p-2">
                  <div className="relative">
                     <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                     <Input type="search" placeholder="Search for help..." className="pl-8" />
                  </div>
               </div>
               {shortcutItems.length > 0 && <DropdownMenuSeparator />}
               {shortcutItems.length > 0 && <DropdownMenuLabel>Shortcuts</DropdownMenuLabel>}
               {shortcutItems.map((item) => (
                  <DropdownMenuItem key={item.name}>
                     <Keyboard className="mr-2 h-4 w-4" />
                     <span>{item.name}</span>
                     <span className="ml-auto text-xs text-muted-foreground">{item.shortcut}</span>
                  </DropdownMenuItem>
               ))}
               {socialLinks.length > 0 && <DropdownMenuSeparator />}
               {socialLinks.length > 0 && <DropdownMenuLabel>Follow us</DropdownMenuLabel>}
               {socialLinks.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                     <a href={item.href} target="_blank" rel="noopener noreferrer">
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.name}</span>
                        <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground" />
                     </a>
                  </DropdownMenuItem>
               ))}
               {supportLink && <DropdownMenuSeparator />}
               {supportLink && (
                  <DropdownMenuItem asChild>
                     <a href={supportLink.href} target="_blank" rel="noopener noreferrer">
                        <supportLink.icon className="mr-2 h-4 w-4" />
                        <span>{supportLink.name}</span>
                     </a>
                  </DropdownMenuItem>
               )}
               {whatsNewItems.length > 0 && <DropdownMenuSeparator />}
               {whatsNewItems.length > 0 && <DropdownMenuLabel>What's new</DropdownMenuLabel>}
               {whatsNewItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                     <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <div className="mr-2 flex h-4 w-4 items-center justify-center">
                           {item.isNew && (
                              <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                           )}
                        </div>
                        <span>{item.name}</span>
                     </a>
                  </DropdownMenuItem>
               ))}
            </DropdownMenuContent>
         </DropdownMenu>
      );
   }
);
HelpButton.displayName = 'HelpButton';

export default HelpButton;

code.demo.1749372346585.tsx
// demo.tsx
'use client';

import * as React from 'react';
import { Github, Linkedin, Twitter, Box } from 'lucide-react';
import HelpButton from '@/components/ui/help-button';
import type { HelpLink, WhatsNewItem, ShortcutItem } from '@/components/ui/help-button';

const socialLinks: HelpLink[] = [
   { icon: Twitter, name: 'Twitter / X', href: 'https://x.com/shadcn' },
   { icon: Linkedin, name: 'LinkedIn', href: 'https://linkedin.com/in/shadcn' },
   { icon: Github, name: 'GitHub', href: 'https://github.com/shadcn' },
];

const supportLink: HelpLink = {
   icon: Box,
   name: 'Support Project',
   href: '#',
};

const whatsNewItems: WhatsNewItem[] = [
   { name: 'Vercel Ship 2024', href: '#', isNew: true },
   { name: 'New Component: Carousel', href: '#', isNew: true },
   { name: 'CLI Improvements', href: '#', isNew: false },
];

const shortcutItems: ShortcutItem[] = [{ name: 'Keyboard shortcuts', shortcut: '⌘K' }];

const HelpButtonDemo = () => {
   return (
      <div className="flex h-[300px] w-full items-start justify-center p-10">
         <HelpButton
            socialLinks={socialLinks}
            supportLink={supportLink}
            whatsNewItems={whatsNewItems}
            shortcutItems={shortcutItems}
         />
      </div>
   );
};

export { HelpButtonDemo as DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/help-button.tsx
// component.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, HelpCircle, Keyboard, Search } from 'lucide-react';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface HelpLink {
   icon: React.ComponentType<{ className?: string }>;
   name: string;
   href: string;
}

export interface WhatsNewItem {
   name: string;
   href: string;
   isNew: boolean;
}

export interface ShortcutItem {
   name: string;
   shortcut: string;
}

interface HelpButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
   socialLinks?: HelpLink[];
   supportLink?: HelpLink;
   whatsNewItems?: WhatsNewItem[];
   shortcutItems?: ShortcutItem[];
}

const HelpButton = React.forwardRef<HTMLButtonElement, HelpButtonProps>(
   (
      {
         className,
         socialLinks = [],
         supportLink,
         whatsNewItems = [],
         shortcutItems = [],
         ...props
      },
      ref
   ) => {
      return (
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button ref={ref} size="icon" variant="outline" className={className} {...props}>
                  <HelpCircle className="size-4" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
               <div className="p-2">
                  <div className="relative">
                     <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                     <Input type="search" placeholder="Search for help..." className="pl-8" />
                  </div>
               </div>
               {shortcutItems.length > 0 && <DropdownMenuSeparator />}
               {shortcutItems.length > 0 && <DropdownMenuLabel>Shortcuts</DropdownMenuLabel>}
               {shortcutItems.map((item) => (
                  <DropdownMenuItem key={item.name}>
                     <Keyboard className="mr-2 h-4 w-4" />
                     <span>{item.name}</span>
                     <span className="ml-auto text-xs text-muted-foreground">{item.shortcut}</span>
                  </DropdownMenuItem>
               ))}
               {socialLinks.length > 0 && <DropdownMenuSeparator />}
               {socialLinks.length > 0 && <DropdownMenuLabel>Follow us</DropdownMenuLabel>}
               {socialLinks.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                     <a href={item.href} target="_blank" rel="noopener noreferrer">
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.name}</span>
                        <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground" />
                     </a>
                  </DropdownMenuItem>
               ))}
               {supportLink && <DropdownMenuSeparator />}
               {supportLink && (
                  <DropdownMenuItem asChild>
                     <a href={supportLink.href} target="_blank" rel="noopener noreferrer">
                        <supportLink.icon className="mr-2 h-4 w-4" />
                        <span>{supportLink.name}</span>
                     </a>
                  </DropdownMenuItem>
               )}
               {whatsNewItems.length > 0 && <DropdownMenuSeparator />}
               {whatsNewItems.length > 0 && <DropdownMenuLabel>What's new</DropdownMenuLabel>}
               {whatsNewItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                     <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <div className="mr-2 flex h-4 w-4 items-center justify-center">
                           {item.isNew && (
                              <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                           )}
                        </div>
                        <span>{item.name}</span>
                     </a>
                  </DropdownMenuItem>
               ))}
            </DropdownMenuContent>
         </DropdownMenu>
      );
   }
);
HelpButton.displayName = 'HelpButton';

export default HelpButton;
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
