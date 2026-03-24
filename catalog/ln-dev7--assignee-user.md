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
assignee-user.tsx
'use client';

import React, { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, CircleUserRound, Send, User } from 'lucide-react';

export interface User {
   id: string;
   name: string;
   avatarUrl: string;
   email: string;
   status: 'online' | 'offline' | 'away';
   role: 'Member' | 'Admin' | 'Guest';
   joinedDate: string;
   teamIds: string[];
}

const avatarUrl = (seed: string) => `https://api.dicebear.com/9.x/glass/svg?seed=${seed}`;

export const statusUserColors = {
   online: '#00cc66',
   offline: '#969696',
   away: '#ffcc00',
};

export const users: User[] = [
   {
      id: 'ln',
      name: 'leonel.ngoya',
      avatarUrl: avatarUrl('ln'),
      email: 'leonelngoya@gmail.com',
      status: 'online',
      role: 'Admin',
      joinedDate: '2022-01-01',
      teamIds: ['CORE', 'PERF', 'DESIGN', 'WEB'],
   },
   {
      id: 'sophia',
      name: 'sophia.reed',
      avatarUrl: avatarUrl('sophiareed'),
      email: 'sophiareed@gmail.com',
      status: 'offline',
      role: 'Admin',
      joinedDate: '2023-06-04',
      teamIds: ['CORE', 'PERF'],
   },
   {
      id: 'mason',
      name: 'mason.carter',
      avatarUrl: avatarUrl('mason'),
      email: 'masoncarter@gmail.com',
      status: 'away',
      role: 'Member',
      joinedDate: '2023-11-01',
      teamIds: ['CORE', 'DESIGN'],
   },
   {
      id: 'emma',
      name: 'emma.jones',
      avatarUrl: avatarUrl('emmajones'),
      email: 'emmajones@gmail.com',
      status: 'online',
      role: 'Member',
      joinedDate: '2023-03-20',
      teamIds: ['CORE'],
   },
];

interface AssigneeUserProps extends HTMLAttributes<HTMLDivElement> {
   value: User | null;
   onChange: (user: User | null) => void;
   userList: User[];
}

const AssigneeUser = forwardRef<HTMLDivElement, AssigneeUserProps>(
   ({ value, onChange, userList, className, ...props }, ref) => {
      return (
         <div ref={ref} className={cn(className)} {...props}>
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="secondary" className="h-8 w-auto rounded-full px-2">
                     <div className="flex items-center gap-2">
                        {value ? (
                           <>
                              <div className="relative">
                                 <Avatar className="size-6 shrink-0">
                                    <AvatarImage src={value.avatarUrl} alt={value.name} />
                                    <AvatarFallback>{value.name[0]}</AvatarFallback>
                                 </Avatar>
                                 <span
                                    className="border-background absolute -end-0.5 -bottom-0.5 size-2.5 rounded-full border-2"
                                    style={{ backgroundColor: statusUserColors[value.status] }}
                                 />
                              </div>
                              <span className="font-medium">{value.name}</span>
                           </>
                        ) : (
                           <>
                              <CircleUserRound className="size-5 text-muted-foreground" />
                              <span className="text-muted-foreground">Assign to...</span>
                           </>
                        )}
                     </div>
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="start" className="w-[206px]">
                  <DropdownMenuLabel>Assign to...</DropdownMenuLabel>
                  <DropdownMenuItem onSelect={() => onChange(null)}>
                     <div className="flex flex-1 items-center gap-2">
                        <User className="size-5" />
                        <span>No assignee</span>
                     </div>
                     {!value && <Check className="ml-auto size-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {userList.map((user) => (
                     <DropdownMenuItem key={user.id} onSelect={() => onChange(user)}>
                        <div className="flex flex-1 items-center gap-2">
                           <Avatar className="size-5">
                              <AvatarImage src={user.avatarUrl} alt={user.name} />
                              <AvatarFallback>{user.name[0]}</AvatarFallback>
                           </Avatar>
                           <span>{user.name}</span>
                        </div>
                        {value?.id === user.id && <Check className="ml-auto size-4" />}
                     </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>New user</DropdownMenuLabel>
                  <DropdownMenuItem>
                     <div className="flex items-center gap-2">
                        <Send className="size-4" />
                        <span>Invite and assign...</span>
                     </div>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      );
   }
);

AssigneeUser.displayName = 'AssigneeUser';

export default AssigneeUser;

code.demo.1749413425517.tsx
'use client';

import { useState } from 'react';
import AssigneeUser, { users as userList, User } from '@/components/ui/assignee-user';
import { CircleUserRound } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const AssigneeUserDemo = () => {
   const [assignee, setAssignee] = useState<User | null>(userList[0]);

   const coreTeam = userList.filter((user) => user.teamIds.includes('CORE'));

   return (
      <div className="flex w-full flex-col items-center justify-center gap-10 p-4">
         <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-lg font-semibold">Assignee User</h2>
            <p className="text-sm text-muted-foreground">Select an assignee from the dropdown.</p>
         </div>

         <AssigneeUser value={assignee} onChange={setAssignee} userList={coreTeam} />

         <div className="flex w-full max-w-xs flex-col items-center gap-3 rounded-lg border bg-background p-6 shadow-sm">
            <h3 className="text-base font-medium text-muted-foreground">Current Assignee</h3>
            {assignee ? (
               <div className="flex items-center gap-3">
                  <Avatar>
                     <AvatarImage src={assignee.avatarUrl} alt={assignee.name} />
                     <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                     <span className="text-lg font-semibold">{assignee.name}</span>
                     <Badge variant={assignee.status === 'online' ? 'default' : 'secondary'}>
                        {assignee.status}
                     </Badge>
                  </div>
               </div>
            ) : (
               <div className="flex items-center gap-3 text-muted-foreground">
                  <CircleUserRound className="size-10" />
                  <span className="text-lg font-semibold">Unassigned</span>
               </div>
            )}
         </div>
      </div>
   );
};

export { AssigneeUserDemo as DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/assignee-user.tsx
'use client';

import React, { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, CircleUserRound, Send, User } from 'lucide-react';

export interface User {
   id: string;
   name: string;
   avatarUrl: string;
   email: string;
   status: 'online' | 'offline' | 'away';
   role: 'Member' | 'Admin' | 'Guest';
   joinedDate: string;
   teamIds: string[];
}

const avatarUrl = (seed: string) => `https://api.dicebear.com/9.x/glass/svg?seed=${seed}`;

export const statusUserColors = {
   online: '#00cc66',
   offline: '#969696',
   away: '#ffcc00',
};

export const users: User[] = [
   {
      id: 'ln',
      name: 'leonel.ngoya',
      avatarUrl: avatarUrl('ln'),
      email: 'leonelngoya@gmail.com',
      status: 'online',
      role: 'Admin',
      joinedDate: '2022-01-01',
      teamIds: ['CORE', 'PERF', 'DESIGN', 'WEB'],
   },
   {
      id: 'sophia',
      name: 'sophia.reed',
      avatarUrl: avatarUrl('sophiareed'),
      email: 'sophiareed@gmail.com',
      status: 'offline',
      role: 'Admin',
      joinedDate: '2023-06-04',
      teamIds: ['CORE', 'PERF'],
   },
   {
      id: 'mason',
      name: 'mason.carter',
      avatarUrl: avatarUrl('mason'),
      email: 'masoncarter@gmail.com',
      status: 'away',
      role: 'Member',
      joinedDate: '2023-11-01',
      teamIds: ['CORE', 'DESIGN'],
   },
   {
      id: 'emma',
      name: 'emma.jones',
      avatarUrl: avatarUrl('emmajones'),
      email: 'emmajones@gmail.com',
      status: 'online',
      role: 'Member',
      joinedDate: '2023-03-20',
      teamIds: ['CORE'],
   },
];

interface AssigneeUserProps extends HTMLAttributes<HTMLDivElement> {
   value: User | null;
   onChange: (user: User | null) => void;
   userList: User[];
}

const AssigneeUser = forwardRef<HTMLDivElement, AssigneeUserProps>(
   ({ value, onChange, userList, className, ...props }, ref) => {
      return (
         <div ref={ref} className={cn(className)} {...props}>
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="secondary" className="h-8 w-auto rounded-full px-2">
                     <div className="flex items-center gap-2">
                        {value ? (
                           <>
                              <div className="relative">
                                 <Avatar className="size-6 shrink-0">
                                    <AvatarImage src={value.avatarUrl} alt={value.name} />
                                    <AvatarFallback>{value.name[0]}</AvatarFallback>
                                 </Avatar>
                                 <span
                                    className="border-background absolute -end-0.5 -bottom-0.5 size-2.5 rounded-full border-2"
                                    style={{ backgroundColor: statusUserColors[value.status] }}
                                 />
                              </div>
                              <span className="font-medium">{value.name}</span>
                           </>
                        ) : (
                           <>
                              <CircleUserRound className="size-5 text-muted-foreground" />
                              <span className="text-muted-foreground">Assign to...</span>
                           </>
                        )}
                     </div>
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="start" className="w-[206px]">
                  <DropdownMenuLabel>Assign to...</DropdownMenuLabel>
                  <DropdownMenuItem onSelect={() => onChange(null)}>
                     <div className="flex flex-1 items-center gap-2">
                        <User className="size-5" />
                        <span>No assignee</span>
                     </div>
                     {!value && <Check className="ml-auto size-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {userList.map((user) => (
                     <DropdownMenuItem key={user.id} onSelect={() => onChange(user)}>
                        <div className="flex flex-1 items-center gap-2">
                           <Avatar className="size-5">
                              <AvatarImage src={user.avatarUrl} alt={user.name} />
                              <AvatarFallback>{user.name[0]}</AvatarFallback>
                           </Avatar>
                           <span>{user.name}</span>
                        </div>
                        {value?.id === user.id && <Check className="ml-auto size-4" />}
                     </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>New user</DropdownMenuLabel>
                  <DropdownMenuItem>
                     <div className="flex items-center gap-2">
                        <Send className="size-4" />
                        <span>Invite and assign...</span>
                     </div>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      );
   }
);

AssigneeUser.displayName = 'AssigneeUser';

export default AssigneeUser;
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
