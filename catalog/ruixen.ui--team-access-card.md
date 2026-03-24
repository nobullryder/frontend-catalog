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
team-access-card.tsx
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Member {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "Admin" | "Editor" | "Viewer";
}

export interface TeamAccessCardProps {
  title: string;
  description?: string;
  members: Member[];
  onInvite: (email: string, role: Member["role"]) => void;
  onRoleChange: (memberId: string, newRole: Member["role"]) => void;
  onDelete: (memberId: string) => void;
  className?: string;
}

export const TeamAccessCard = ({
  title,
  description,
  members,
  onInvite,
  onRoleChange,
  onDelete,
  className,
}: TeamAccessCardProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inviteEmail, setInviteEmail] = React.useState("");
  const [inviteRole, setInviteRole] = React.useState<Member["role"]>("Viewer");

  const handleInvite = () => {
    if (inviteEmail) {
      onInvite(inviteEmail, inviteRole);
      setInviteEmail("");
      setIsOpen(false);
    }
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 },
    }),
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <Card className={cn("max-w-lg w-full p-5 shadow-sm", className)}>
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && (
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-4 p-0 mb-4">
        <AnimatePresence>
          {members.map((m, i) => (
            <motion.div
              key={m.id}
              custom={i}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className="flex items-center justify-between border-b pb-3"
            >
              {/* Left: Avatar + Info */}
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={m.avatar} alt={m.name} />
                  <AvatarFallback>{m.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.email}</p>
                </div>
              </div>

              {/* Right: Role Selector + Delete */}
              <div className="flex items-center gap-2">
                <Select
                  value={m.role}
                  onValueChange={(role: Member["role"]) => onRoleChange(m.id, role)}
                >
                  <SelectTrigger className="w-[110px] h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-red-500"
                  onClick={() => onDelete(m.id)}
                  aria-label={`Remove ${m.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>

      <CardFooter className="p-0">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full">
              + Invite Member
            </Button>
          </DrawerTrigger>
          <DrawerContent className="p-6">
            <DrawerHeader>
              <DrawerTitle>Invite a new member</DrawerTitle>
            </DrawerHeader>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Enter email address"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
              <Select
                value={inviteRole}
                onValueChange={(role: Member["role"]) => setInviteRole(role)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DrawerFooter className="pt-4">
              <Button onClick={handleInvite} className="w-full">
                Send Invite
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </CardFooter>
    </Card>
  );
};


code.demo.1760026920179.tsx
"use client";

import * as React from "react";
import { TeamAccessCard, Member } from "@/components/ui/team-access-card";

const initialMembers: Member[] = [
  {
    id: "1",
    name: "Tony Stark",
    email: "tony@starkindustries.com",
    avatar: "https://i.pravatar.cc/150?u=tony",
    role: "Admin",
  },
  {
    id: "2",
    name: "Peter Parker",
    email: "peter@dailybugle.com",
    avatar: "https://i.pravatar.cc/150?u=peter",
    role: "Editor",
  },
  {
    id: "3",
    name: "Natasha Romanoff",
    email: "natasha@shield.com",
    avatar: "https://i.pravatar.cc/150?u=natasha",
    role: "Viewer",
  },
];

export default function TeamAccessCardDemo() {
  const [members, setMembers] = React.useState<Member[]>(initialMembers);

  const handleRoleChange = (memberId: string, newRole: Member["role"]) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, role: newRole } : m))
    );
  };

  const handleInvite = (email: string, role: Member["role"]) => {
    const newMember: Member = {
      id: Date.now().toString(),
      name: email.split("@")[0],
      email,
      avatar: `https://i.pravatar.cc/150?u=${email}`,
      role,
    };
    setMembers((prev) => [...prev, newMember]);
  };

  const handleDelete = (memberId: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <TeamAccessCard
        title="Avengers Access"
        description="Manage your superhero squad access levels and invite new members."
        members={members}
        onInvite={handleInvite}
        onRoleChange={handleRoleChange}
        onDelete={handleDelete}
      />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/team-access-card.tsx
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Member {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "Admin" | "Editor" | "Viewer";
}

export interface TeamAccessCardProps {
  title: string;
  description?: string;
  members: Member[];
  onInvite: (email: string, role: Member["role"]) => void;
  onRoleChange: (memberId: string, newRole: Member["role"]) => void;
  onDelete: (memberId: string) => void;
  className?: string;
}

export const TeamAccessCard = ({
  title,
  description,
  members,
  onInvite,
  onRoleChange,
  onDelete,
  className,
}: TeamAccessCardProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inviteEmail, setInviteEmail] = React.useState("");
  const [inviteRole, setInviteRole] = React.useState<Member["role"]>("Viewer");

  const handleInvite = () => {
    if (inviteEmail) {
      onInvite(inviteEmail, inviteRole);
      setInviteEmail("");
      setIsOpen(false);
    }
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 },
    }),
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <Card className={cn("max-w-lg w-full p-5 shadow-sm", className)}>
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && (
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-4 p-0 mb-4">
        <AnimatePresence>
          {members.map((m, i) => (
            <motion.div
              key={m.id}
              custom={i}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className="flex items-center justify-between border-b pb-3"
            >
              {/* Left: Avatar + Info */}
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={m.avatar} alt={m.name} />
                  <AvatarFallback>{m.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.email}</p>
                </div>
              </div>

              {/* Right: Role Selector + Delete */}
              <div className="flex items-center gap-2">
                <Select
                  value={m.role}
                  onValueChange={(role: Member["role"]) => onRoleChange(m.id, role)}
                >
                  <SelectTrigger className="w-[110px] h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-red-500"
                  onClick={() => onDelete(m.id)}
                  aria-label={`Remove ${m.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>

      <CardFooter className="p-0">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full">
              + Invite Member
            </Button>
          </DrawerTrigger>
          <DrawerContent className="p-6">
            <DrawerHeader>
              <DrawerTitle>Invite a new member</DrawerTitle>
            </DrawerHeader>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Enter email address"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
              <Select
                value={inviteRole}
                onValueChange={(role: Member["role"]) => setInviteRole(role)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DrawerFooter className="pt-4">
              <Button onClick={handleInvite} className="w-full">
                Send Invite
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </CardFooter>
    </Card>
  );
};

```

Install NPM dependencies:
```bash
lucide-react, framer-motion
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
