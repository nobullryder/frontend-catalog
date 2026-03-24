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
health-stat-card.tsx
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Users, FolderIcon } from "lucide-react";

export interface Member {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "Owner" | "Editor" | "Viewer";
}

export interface AccessManagerCardProps {
  title?: string;
  description?: string;
  folderIcon?: React.ReactNode;
  folderName: string;
  itemCount?: number;
  members: Member[];
  onInvite: (email: string, role: Omit<Member["role"], "Owner">) => void;
  onRoleChange: (id: string, newRole: Omit<Member["role"], "Owner">) => void;
  invitePlaceholder?: string;
  showInviteSection?: boolean;
  showHeaderIcon?: boolean;
  className?: string;
}

export const AccessManagerCard = ({
  title = "Access Manager",
  description = "Manage who can view or edit this folder.",
  folderIcon = <FolderIcon className="h-5 w-5 text-primary" />,
  folderName,
  itemCount,
  members,
  onInvite,
  onRoleChange,
  invitePlaceholder = "Add an email to invite",
  showInviteSection = true,
  showHeaderIcon = true,
  className,
}: AccessManagerCardProps) => {
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState<Omit<Member["role"], "Owner">>("Viewer");

  const handleInvite = () => {
    if (!email) return;
    onInvite(email, role);
    setEmail("");
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <TooltipProvider>
      <div
        className={cn(
          "w-full max-w-lg rounded-2xl border bg-card p-6 shadow-sm text-card-foreground space-y-6",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showHeaderIcon && <div>{folderIcon}</div>}
            <div>
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="text-xs">{members.length} members</span>
          </div>
        </div>

        {/* Folder Info */}
        <div className="flex items-center gap-3">
          <img
            src="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-MiDb47ywhTDoylCD2HHmWzangEHtY8.png&w=320&q=75"
            alt="Folder Thumbnail"
            className="h-12 w-12 rounded-lg object-cover"
          />
          <div>
            <p className="font-medium">{folderName}</p>
            {itemCount !== undefined && (
              <p className="text-sm text-muted-foreground">{itemCount} items</p>
            )}
          </div>
        </div>

        {/* Invite Section */}
        {showInviteSection && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Invite People</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder={invitePlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow"
              />
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="sm:w-[120px] whitespace-nowrap truncate">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Viewer">Can view</SelectItem>
                  <SelectItem value="Editor">Can edit</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleInvite}>Invite</Button>
            </div>
          </div>
        )}

        {/* Members List */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Members</h3>
          <motion.ul
            className="space-y-3"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {members.map((user) => (
                <motion.li
                  key={user.id}
                  variants={itemVariants}
                  layout
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      {user.role === "Owner" ? (
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          Owner
                        </span>
                      ) : (
                        <Select
                          value={user.role}
                          onValueChange={(val: Omit<Member["role"], "Owner">) =>
                            onRoleChange(user.id, val)
                          }
                        >
                          <SelectTrigger className="w-[120px] text-xs whitespace-nowrap truncate">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              value="Viewer"
                              className="whitespace-nowrap"
                            >
                              Can view
                            </SelectItem>
                            <SelectItem
                              value="Editor"
                              className="whitespace-nowrap"
                            >
                              Can edit
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      Change or view this user’s access level
                    </TooltipContent>
                  </Tooltip>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </div>
    </TooltipProvider>
  );
};


code.demo.1760028136816.tsx
"use client";

import * as React from "react";
import { AccessManagerCard, Member } from "@/components/ui/health-stat-card";
import { ShieldCheck } from "lucide-react";

const initialMembers: Member[] = [
  {
    id: "1",
    name: "Walter White",
    email: "heisenberg@methlab.com",
    avatar: "https://i.pravatar.cc/150?u=walter",
    role: "Owner",
  },
  {
    id: "2",
    name: "Jesse Pinkman",
    email: "yo@bitch.com",
    avatar: "https://i.pravatar.cc/150?u=jesse",
    role: "Viewer",
  },
  {
    id: "3",
    name: "Saul Goodman",
    email: "legal@bettercallsaul.com",
    avatar: "https://i.pravatar.cc/150?u=saul",
    role: "Editor",
  },
];

export default function AccessManagerDemo() {
  const [members, setMembers] = React.useState<Member[]>(initialMembers);

  const handleRoleChange = (id: string, newRole: "Viewer" | "Editor") => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role: newRole } : m))
    );
    console.log(`${id} changed to ${newRole}`);
  };

  const handleInvite = (email: string, role: "Viewer" | "Editor") => {
    const newMember: Member = {
      id: (members.length + 1).toString(),
      name: email.split("@")[0],
      email,
      avatar: `https://i.pravatar.cc/150?u=${email}`,
      role,
    };
    setMembers((prev) => [...prev, newMember]);
    console.log(`Invited ${email} as ${role}`);
  };

  return (
    <div className="flex h-full min-h-screen items-center justify-center bg-background p-6">
      <AccessManagerCard
        title="Project Access"
        description="Manage team permissions easily."
        folderName="AI Research Docs"
        itemCount={48}
        members={members}
        onInvite={handleInvite}
        onRoleChange={handleRoleChange}
        folderIcon={<ShieldCheck className="h-6 w-6 text-primary" />}
      />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/health-stat-card.tsx
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Users, FolderIcon } from "lucide-react";

export interface Member {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "Owner" | "Editor" | "Viewer";
}

export interface AccessManagerCardProps {
  title?: string;
  description?: string;
  folderIcon?: React.ReactNode;
  folderName: string;
  itemCount?: number;
  members: Member[];
  onInvite: (email: string, role: Omit<Member["role"], "Owner">) => void;
  onRoleChange: (id: string, newRole: Omit<Member["role"], "Owner">) => void;
  invitePlaceholder?: string;
  showInviteSection?: boolean;
  showHeaderIcon?: boolean;
  className?: string;
}

export const AccessManagerCard = ({
  title = "Access Manager",
  description = "Manage who can view or edit this folder.",
  folderIcon = <FolderIcon className="h-5 w-5 text-primary" />,
  folderName,
  itemCount,
  members,
  onInvite,
  onRoleChange,
  invitePlaceholder = "Add an email to invite",
  showInviteSection = true,
  showHeaderIcon = true,
  className,
}: AccessManagerCardProps) => {
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState<Omit<Member["role"], "Owner">>("Viewer");

  const handleInvite = () => {
    if (!email) return;
    onInvite(email, role);
    setEmail("");
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <TooltipProvider>
      <div
        className={cn(
          "w-full max-w-lg rounded-2xl border bg-card p-6 shadow-sm text-card-foreground space-y-6",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showHeaderIcon && <div>{folderIcon}</div>}
            <div>
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="text-xs">{members.length} members</span>
          </div>
        </div>

        {/* Folder Info */}
        <div className="flex items-center gap-3">
          <img
            src="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-MiDb47ywhTDoylCD2HHmWzangEHtY8.png&w=320&q=75"
            alt="Folder Thumbnail"
            className="h-12 w-12 rounded-lg object-cover"
          />
          <div>
            <p className="font-medium">{folderName}</p>
            {itemCount !== undefined && (
              <p className="text-sm text-muted-foreground">{itemCount} items</p>
            )}
          </div>
        </div>

        {/* Invite Section */}
        {showInviteSection && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Invite People</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder={invitePlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow"
              />
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="sm:w-[120px] whitespace-nowrap truncate">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Viewer">Can view</SelectItem>
                  <SelectItem value="Editor">Can edit</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleInvite}>Invite</Button>
            </div>
          </div>
        )}

        {/* Members List */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Members</h3>
          <motion.ul
            className="space-y-3"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {members.map((user) => (
                <motion.li
                  key={user.id}
                  variants={itemVariants}
                  layout
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      {user.role === "Owner" ? (
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          Owner
                        </span>
                      ) : (
                        <Select
                          value={user.role}
                          onValueChange={(val: Omit<Member["role"], "Owner">) =>
                            onRoleChange(user.id, val)
                          }
                        >
                          <SelectTrigger className="w-[120px] text-xs whitespace-nowrap truncate">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              value="Viewer"
                              className="whitespace-nowrap"
                            >
                              Can view
                            </SelectItem>
                            <SelectItem
                              value="Editor"
                              className="whitespace-nowrap"
                            >
                              Can edit
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      Change or view this user’s access level
                    </TooltipContent>
                  </Tooltip>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </div>
    </TooltipProvider>
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
