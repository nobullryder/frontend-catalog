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
team-invite.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Users, Eye, Edit3, Crown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export type PermissionLevel = "can-view" | "can-edit" | "admin";

export interface TeamMember {
id: string;
name: string;
email: string;
avatar?: string;
role: PermissionLevel;
isOwner?: boolean;
}

export interface TeamInviteProps {
className?: string;
teamName: string;
teamLogo?: string;
totalMembers: number;
members?: TeamMember[];
onInvite?: (email: string, permission: PermissionLevel) => void;
onUpdateMemberPermission?: (
  memberId: string,
  permission: PermissionLevel
) => void;
onCancel?: () => void;
}

const permissionOptions = [
{
  value: "can-view" as const,
  label: "Can view",
  description: "View only access",
  icon: Eye,
},
{
  value: "can-edit" as const,
  label: "Can edit",
  description: "Edit and view access",
  icon: Edit3,
},
] as const;

const getPermissionIcon = (permission: PermissionLevel) => {
switch (permission) {
  case "can-view":
    return Eye;
  case "can-edit":
    return Edit3;
  case "admin":
    return Crown;
  default:
    return Eye;
}
};

const getPermissionLabel = (permission: PermissionLevel) => {
switch (permission) {
  case "can-view":
    return "Can view";
  case "can-edit":
    return "Can edit";
  case "admin":
    return "Admin";
  default:
    return "Can view";
}
};

const getPermissionColor = (permission: PermissionLevel) => {
switch (permission) {
  case "can-view":
    return "default";
  case "can-edit":
    return "secondary";
  case "admin":
    return "destructive";
  default:
    return "default";
}
};

const TeamInvite = React.forwardRef<HTMLDivElement, TeamInviteProps>(
(
  {
    className,
    teamName,
    teamLogo,
    totalMembers,
    members = [],
    onInvite,
    onUpdateMemberPermission,
    onCancel,
    ...props
  },
  ref
) => {
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitePermission, setInvitePermission] =
    useState<PermissionLevel>("can-view");
  const [isLoading, setIsLoading] = useState(false);

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return;

    setIsLoading(true);
    try {
      await onInvite?.(inviteEmail, invitePermission);
      setInviteEmail("");
      setInvitePermission("can-view");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePermission = (
    memberId: string,
    permission: PermissionLevel
  ) => {
    onUpdateMemberPermission?.(memberId, permission);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card ref={ref} className={cn("w-full max-w-9xl", className)} {...props}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <Avatar size="lg">
              <AvatarImage src={teamLogo} alt={teamName} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(teamName)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold truncate">
              {teamName}
            </CardTitle>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Users size={14} />
              {totalMembers} {totalMembers === 1 ? "member" : "members"}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {/* Share this folder section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Label className="font-medium">Invite Members</Label>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Add an email or name"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="h-9"
              />
            </div>
            <div>
              <Select
                value={invitePermission}
                onValueChange={(value) =>
                  setInvitePermission(value as PermissionLevel)
                }
              >
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {permissionOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <IconComponent size={14} />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 w-fit justify-end ml-auto">
            <Button
              variant="outline"
              size={"sm"}
              onClick={onCancel}
              className="flex-1 h-9"
            >
              Cancel
            </Button>
            <Button
              onClick={handleInvite}
              loading={isLoading}
              size={"sm"}
              disabled={!inviteEmail.trim()}
              className="flex-1 h-9"
            >
              Send Invite
            </Button>
          </div>
        </div>

        {/* Access section */}
        {members.length > 0 && (
          <>
            <Separator />
            <div className="flex flex-col gap-4">
              <Label className="text-base font-medium">Access</Label>

              <div className="flex flex-col gap-3">
                <AnimatePresence>
                  {members.map((member) => {
                    const PermissionIcon = getPermissionIcon(member.role);

                    return (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-3 p-2 rounded-ele hover:bg-accent transition-colors"
                      >
                        <Avatar size="sm">
                          <AvatarImage
                            src={member.avatar}
                            alt={member.name}
                          />
                          <AvatarFallback>
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium truncate">
                              {member.name}
                            </p>
                            {member.isOwner && (
                              <Badge
                                variant="outline"
                                className="text-xs px-1.5 py-0.5"
                              >
                                Owner
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {member.email}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          {member.isOwner ? (
                            <Badge variant="outline" className="text-xs">
                              <Crown size={12} className="mr-1" />
                              Owner
                            </Badge>
                          ) : (
                            <Select
                              value={member.role}
                              onValueChange={(value) =>
                                handleUpdatePermission(
                                  member.id,
                                  value as PermissionLevel
                                )
                              }
                            >
                              <SelectTrigger className="h-8  text-xs">
                                <div className="flex items-center gap-1">
                                  <PermissionIcon size={12} />
                                  <span className="truncate">
                                    {getPermissionLabel(member.role)}
                                  </span>
                                </div>
                              </SelectTrigger>
                              <SelectContent>
                                {permissionOptions.map((option) => {
                                  const IconComponent = option.icon;
                                  return (
                                    <SelectItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      <div className="flex items-center gap-2">
                                        <IconComponent size={14} />
                                        <div>
                                          <p className="font-medium">
                                            {option.label}
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            {option.description}
                                          </p>
                                        </div>
                                      </div>
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </>
        )}

        {/* Actions */}
        {onCancel && (
          <>
            <Separator />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={onCancel}>
                Cancel
              </Button>
              <Button onClick={onCancel}>Done</Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
);

TeamInvite.displayName = "TeamInvite";

export { TeamInvite };

code.demo.1755786918847.tsx
import { useState } from "react";

import { TeamInvite,
type TeamMember,
type PermissionLevel
} from "@/components/ui/team-invite";

const generateDiceBearAvatar = (seed: string) => {
return `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(
  seed
)}`;
};

const initialMembers: TeamMember[] = [
{
  id: "1",
  name: "Captain Pancakes",
  email: "syrup.lover@breakfast.club",
  avatar: generateDiceBearAvatar("pancakes"),
  role: "admin",
  isOwner: true,
},
{
  id: "2",
  name: "Disco Llama",
  email: "groovy.alpaca@dance.floor",
  avatar: generateDiceBearAvatar("llama"),
  role: "can-edit",
},
{
  id: "3",
  name: "Professor Pickles",
  email: "sour.cucumber@university.edu",
  avatar: generateDiceBearAvatar("pickles"),
  role: "can-view",
},
{
  id: "4",
  name: "Ninja Noodles",
  email: "stealth.pasta@dojo.com",
  avatar: generateDiceBearAvatar("ninja"),
  role: "can-view",
},
{
  id: "5",
  name: "Wizard Waffle",
  email: "magical.breakfast@hogwarts.com",
  avatar: generateDiceBearAvatar("wizard"),
  role: "can-view",
},
];

export default function DemoOne() {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);

const handleInvite = async (email: string, permission: PermissionLevel) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const newMember: TeamMember = {
    id: Date.now().toString(),
    name: email.split("@")[0],
    email,
    avatar: generateDiceBearAvatar(email),
    role: permission,
  };

  setMembers((prev) => [...prev, newMember]);
};
const handleUpdateMemberPermission = (
  memberId: string,
  permission: PermissionLevel
) => {
  setMembers((prev) =>
    prev.map((member) =>
      member.id === memberId ? { ...member, role: permission } : member
    )
  );
};

const handleCancel = () => {
  console.log("Cancelled team invite");
};

return (
  <div className="flex flex-col items-center justify-center max-w-lg w-full p-8">
    <TeamInvite
      teamName="HextaUI"
      teamLogo="/Logo.png"
      totalMembers={members.length}
      members={members}
      onInvite={handleInvite}
      onUpdateMemberPermission={handleUpdateMemberPermission}
      onCancel={handleCancel}
    />
  </div>
);
}


```

Copy-paste these files for dependencies:
```tsx
src/components/ui/team-invite.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Users, Eye, Edit3, Crown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export type PermissionLevel = "can-view" | "can-edit" | "admin";

export interface TeamMember {
id: string;
name: string;
email: string;
avatar?: string;
role: PermissionLevel;
isOwner?: boolean;
}

export interface TeamInviteProps {
className?: string;
teamName: string;
teamLogo?: string;
totalMembers: number;
members?: TeamMember[];
onInvite?: (email: string, permission: PermissionLevel) => void;
onUpdateMemberPermission?: (
  memberId: string,
  permission: PermissionLevel
) => void;
onCancel?: () => void;
}

const permissionOptions = [
{
  value: "can-view" as const,
  label: "Can view",
  description: "View only access",
  icon: Eye,
},
{
  value: "can-edit" as const,
  label: "Can edit",
  description: "Edit and view access",
  icon: Edit3,
},
] as const;

const getPermissionIcon = (permission: PermissionLevel) => {
switch (permission) {
  case "can-view":
    return Eye;
  case "can-edit":
    return Edit3;
  case "admin":
    return Crown;
  default:
    return Eye;
}
};

const getPermissionLabel = (permission: PermissionLevel) => {
switch (permission) {
  case "can-view":
    return "Can view";
  case "can-edit":
    return "Can edit";
  case "admin":
    return "Admin";
  default:
    return "Can view";
}
};

const getPermissionColor = (permission: PermissionLevel) => {
switch (permission) {
  case "can-view":
    return "default";
  case "can-edit":
    return "secondary";
  case "admin":
    return "destructive";
  default:
    return "default";
}
};

const TeamInvite = React.forwardRef<HTMLDivElement, TeamInviteProps>(
(
  {
    className,
    teamName,
    teamLogo,
    totalMembers,
    members = [],
    onInvite,
    onUpdateMemberPermission,
    onCancel,
    ...props
  },
  ref
) => {
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitePermission, setInvitePermission] =
    useState<PermissionLevel>("can-view");
  const [isLoading, setIsLoading] = useState(false);

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return;

    setIsLoading(true);
    try {
      await onInvite?.(inviteEmail, invitePermission);
      setInviteEmail("");
      setInvitePermission("can-view");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePermission = (
    memberId: string,
    permission: PermissionLevel
  ) => {
    onUpdateMemberPermission?.(memberId, permission);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card ref={ref} className={cn("w-full max-w-9xl", className)} {...props}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <Avatar size="lg">
              <AvatarImage src={teamLogo} alt={teamName} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(teamName)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold truncate">
              {teamName}
            </CardTitle>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Users size={14} />
              {totalMembers} {totalMembers === 1 ? "member" : "members"}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {/* Share this folder section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Label className="font-medium">Invite Members</Label>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Add an email or name"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="h-9"
              />
            </div>
            <div>
              <Select
                value={invitePermission}
                onValueChange={(value) =>
                  setInvitePermission(value as PermissionLevel)
                }
              >
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {permissionOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <IconComponent size={14} />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 w-fit justify-end ml-auto">
            <Button
              variant="outline"
              size={"sm"}
              onClick={onCancel}
              className="flex-1 h-9"
            >
              Cancel
            </Button>
            <Button
              onClick={handleInvite}
              loading={isLoading}
              size={"sm"}
              disabled={!inviteEmail.trim()}
              className="flex-1 h-9"
            >
              Send Invite
            </Button>
          </div>
        </div>

        {/* Access section */}
        {members.length > 0 && (
          <>
            <Separator />
            <div className="flex flex-col gap-4">
              <Label className="text-base font-medium">Access</Label>

              <div className="flex flex-col gap-3">
                <AnimatePresence>
                  {members.map((member) => {
                    const PermissionIcon = getPermissionIcon(member.role);

                    return (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-3 p-2 rounded-ele hover:bg-accent transition-colors"
                      >
                        <Avatar size="sm">
                          <AvatarImage
                            src={member.avatar}
                            alt={member.name}
                          />
                          <AvatarFallback>
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium truncate">
                              {member.name}
                            </p>
                            {member.isOwner && (
                              <Badge
                                variant="outline"
                                className="text-xs px-1.5 py-0.5"
                              >
                                Owner
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {member.email}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          {member.isOwner ? (
                            <Badge variant="outline" className="text-xs">
                              <Crown size={12} className="mr-1" />
                              Owner
                            </Badge>
                          ) : (
                            <Select
                              value={member.role}
                              onValueChange={(value) =>
                                handleUpdatePermission(
                                  member.id,
                                  value as PermissionLevel
                                )
                              }
                            >
                              <SelectTrigger className="h-8  text-xs">
                                <div className="flex items-center gap-1">
                                  <PermissionIcon size={12} />
                                  <span className="truncate">
                                    {getPermissionLabel(member.role)}
                                  </span>
                                </div>
                              </SelectTrigger>
                              <SelectContent>
                                {permissionOptions.map((option) => {
                                  const IconComponent = option.icon;
                                  return (
                                    <SelectItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      <div className="flex items-center gap-2">
                                        <IconComponent size={14} />
                                        <div>
                                          <p className="font-medium">
                                            {option.label}
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            {option.description}
                                          </p>
                                        </div>
                                      </div>
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </>
        )}

        {/* Actions */}
        {onCancel && (
          <>
            <Separator />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={onCancel}>
                Cancel
              </Button>
              <Button onClick={onCancel}>Done</Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
);

TeamInvite.displayName = "TeamInvite";

export { TeamInvite };
```

Install NPM dependencies:
```bash
lucide-react, motion
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
