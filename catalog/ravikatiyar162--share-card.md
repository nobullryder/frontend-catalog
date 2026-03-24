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
share-card.tsx
"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, User as UserIcon } from "lucide-react";

// Define the type for a user
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "Owner" | "Editor" | "Viewer";
}

// Define the props for the ShareCard component
export interface ShareCardProps {
  folderName: string;
  itemCount: number;
  users: User[];
  onInvite: (email: string, role: Omit<User["role"], "Owner">) => void;
  onRoleChange: (userId: string, newRole: Omit<User["role"], "Owner">) => void;
  className?: string;
}

export const ShareCard = ({
  folderName,
  itemCount,
  users,
  onInvite,
  onRoleChange,
  className,
}: ShareCardProps) => {
  const [inviteEmail, setInviteEmail] = React.useState("");
  const [inviteRole, setInviteRole] = React.useState<Omit<User["role"], "Owner">>("Viewer");

  const handleInviteClick = () => {
    if (inviteEmail) {
      onInvite(inviteEmail, inviteRole);
      setInviteEmail("");
    }
  };

  // Animation variants for the list container and items
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className={cn(
        "w-full max-w-lg rounded-2xl border bg-card text-card-foreground shadow-sm p-6 space-y-6",
        className
      )}
    >
      {/* Card Header */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg">
           {/* Placeholder for folder image/icon */}
           <img src="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-MiDb47ywhTDoylCD2HHmWzangEHtY8.png&w=320&q=75" alt="Folder Thumbnail" className="w-full h-full object-cover rounded-lg" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{folderName}</h2>
          <p className="text-sm text-muted-foreground">{itemCount} Items</p>
        </div>
      </div>

      {/* Share Section */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Share this folder</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            placeholder="Add an email or name"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-grow"
          />
          <div className="flex gap-2">
            <Select
              value={inviteRole}
              onValueChange={(value: Omit<User["role"], "Owner">) => setInviteRole(value)}
            >
              <SelectTrigger className="w-full sm:w-[120px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Viewer">Can view</SelectItem>
                <SelectItem value="Editor">Can edit</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleInviteClick}>Send Invite</Button>
          </div>
        </div>
      </div>

      {/* Access List Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Access</h3>
        <motion.ul
          className="space-y-4"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {users.map((user) => (
              <motion.li
                key={user.id}
                variants={itemVariants}
                className="flex items-center justify-between"
                layout
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-9 h-9">
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
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                {user.role === "Owner" ? (
                  <span className="text-sm text-muted-foreground">Owner</span>
                ) : (
                  <Select
                    value={user.role}
                    onValueChange={(newRole: Omit<User["role"], "Owner">) => onRoleChange(user.id, newRole)}
                  >
                    <SelectTrigger className="w-[120px] text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Viewer">Can view</SelectItem>
                      <SelectItem value="Editor">Can edit</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </div>
  );
};

code.demo.1759048848738.tsx
"use client";

import * as React from "react";
import { ShareCard, User } from "@/components/ui/share-card";

// Mock user data based on the provided image
const initialUsers: User[] = [
  {
    id: "1",
    name: "Heisenberg",
    email: "walterwhite@gmail.com",
    avatar: "https://i.pravatar.cc/150?u=heisenberg",
    role: "Owner",
  },
  {
    id: "2",
    name: "Jesse Pinkman",
    email: "bitch@gmail.com",
    avatar: "https://i.pravatar.cc/150?u=jesse",
    role: "Viewer",
  },
  {
    id: "3",
    name: "Gustavo Fring",
    email: "thechickenman@gmail.com",
    avatar: "https://i.pravatar.cc/150?u=gus",
    role: "Viewer",
  },
  {
    id: "4",
    name: "Saul Goodman",
    email: "bettercallsaul@gmail.com",
    avatar: "https://i.pravatar.cc/150?u=saul",
    role: "Viewer",
  },
  {
    id: "5",
    name: "Mike Ehrmantraut",
    email: "poppop@gmail.com",
    avatar: "https://i.pravatar.cc/150?u=mike",
    role: "Viewer",
  },
];

export default function ShareCardDemo() {
  const [users, setUsers] = React.useState<User[]>(initialUsers);

  // Handler for role changes
  const handleRoleChange = (userId: string, newRole: "Editor" | "Viewer") => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    console.log(`User ${userId} role changed to ${newRole}`);
  };

  // Handler for inviting new users
  const handleInvite = (email: string, role: "Editor" | "Viewer") => {
    const newUser: User = {
      id: (users.length + 1).toString(),
      name: "New Member",
      email,
      avatar: `https://i.pravatar.cc/150?u=${email}`,
      role,
    };
    setUsers((prevUsers) => [...prevUsers, newUser]);
    console.log(`Invited ${email} with role ${role}`);
  };

  return (
    <div className="flex items-center justify-center h-full p-4 bg-background">
      <ShareCard
        folderName="Meth Lab"
        itemCount={159}
        users={users}
        onRoleChange={handleRoleChange}
        onInvite={handleInvite}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/share-card.tsx
"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, User as UserIcon } from "lucide-react";

// Define the type for a user
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "Owner" | "Editor" | "Viewer";
}

// Define the props for the ShareCard component
export interface ShareCardProps {
  folderName: string;
  itemCount: number;
  users: User[];
  onInvite: (email: string, role: Omit<User["role"], "Owner">) => void;
  onRoleChange: (userId: string, newRole: Omit<User["role"], "Owner">) => void;
  className?: string;
}

export const ShareCard = ({
  folderName,
  itemCount,
  users,
  onInvite,
  onRoleChange,
  className,
}: ShareCardProps) => {
  const [inviteEmail, setInviteEmail] = React.useState("");
  const [inviteRole, setInviteRole] = React.useState<Omit<User["role"], "Owner">>("Viewer");

  const handleInviteClick = () => {
    if (inviteEmail) {
      onInvite(inviteEmail, inviteRole);
      setInviteEmail("");
    }
  };

  // Animation variants for the list container and items
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className={cn(
        "w-full max-w-lg rounded-2xl border bg-card text-card-foreground shadow-sm p-6 space-y-6",
        className
      )}
    >
      {/* Card Header */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg">
           {/* Placeholder for folder image/icon */}
           <img src="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-MiDb47ywhTDoylCD2HHmWzangEHtY8.png&w=320&q=75" alt="Folder Thumbnail" className="w-full h-full object-cover rounded-lg" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{folderName}</h2>
          <p className="text-sm text-muted-foreground">{itemCount} Items</p>
        </div>
      </div>

      {/* Share Section */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Share this folder</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            placeholder="Add an email or name"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-grow"
          />
          <div className="flex gap-2">
            <Select
              value={inviteRole}
              onValueChange={(value: Omit<User["role"], "Owner">) => setInviteRole(value)}
            >
              <SelectTrigger className="w-full sm:w-[120px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Viewer">Can view</SelectItem>
                <SelectItem value="Editor">Can edit</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleInviteClick}>Send Invite</Button>
          </div>
        </div>
      </div>

      {/* Access List Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Access</h3>
        <motion.ul
          className="space-y-4"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {users.map((user) => (
              <motion.li
                key={user.id}
                variants={itemVariants}
                className="flex items-center justify-between"
                layout
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-9 h-9">
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
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                {user.role === "Owner" ? (
                  <span className="text-sm text-muted-foreground">Owner</span>
                ) : (
                  <Select
                    value={user.role}
                    onValueChange={(newRole: Omit<User["role"], "Owner">) => onRoleChange(user.id, newRole)}
                  >
                    <SelectTrigger className="w-[120px] text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Viewer">Can view</SelectItem>
                      <SelectItem value="Editor">Can edit</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </div>
  );
};
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
