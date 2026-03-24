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
grid-list.tsx
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  ContactRound,
  Hand,
  Server,
  UserCircle,
} from "lucide-react";

const actions = [
  {
    title: "Getting Started",
    description:
      "Everything you need to know to get started and get to work in ChatCloud.",
    href: "#",
    icon: ArrowRight,
    iconForeground: "text-green-700",
    iconBackground: "bg-green-50 dark:bg-green-950/30",
    ringColorClass: "ring-green-700/30",
  },
  {
    title: "Admin Settings",
    description:
      "Learn how to manage your current workspace or your enterprise space.",
    href: "#",
    icon: UserCircle,
    iconForeground: "text-red-700",
    iconBackground: "bg-red-50 dark:bg-red-950/30",
    ringColorClass: "ring-red-700/30",
  },
  {
    title: "Server Setup",
    description:
      "Connect, simplify, and automate. Discover the power of apps and tools.",
    href: "#",
    icon: Server,
    iconForeground: "text-blue-700",
    iconBackground: "bg-blue-50 dark:bg-blue-950/30",
    ringColorClass: "ring-blue-700/30",
  },
  {
    title: "Login and Verification",
    description:
      "Read on to learn how to sign in with your email address, or your Apple or Google.",
    href: "#",
    icon: CheckCircle,
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50 dark:bg-sky-950/30",
    ringColorClass: "ring-sky-700/30",
  },
  {
    title: "Account Setup",
    description:
      "Adjust your profile and preferences to make ChatCloud work just for you.",
    href: "#",
    icon: ContactRound,
    iconForeground: "text-pink-700",
    iconBackground: "bg-pink-50 dark:bg-pink-950/30",
    ringColorClass: "ring-pink-700/30",
  },
  {
    title: "Trust & Safety",
    description:
      "Trust on our current database and learn how we distribute your data.",
    href: "#",
    icon: Hand,
    iconForeground: "text-orange-700",
    iconBackground: "bg-orange-50 dark:bg-orange-950/30",
    ringColorClass: "ring-orange-700/30",
  },
];

export default function GridList03() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="overflow-hidden rounded-[1rem] bg-muted shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-0.5 space-y-0.5 sm:space-y-0 p-0.5">
        {actions.map((action) => (
          <Card
            key={action.title}
            className={cn(
              "group relative rounded-xl border-0 bg-card p-0 focus-within:ring-2 focus-within:ring-ring focus-within:ring-inset"
            )}
          >
            <CardContent className="p-6">
              <div>
                <span
                  className={cn(
                    action.iconBackground,
                    action.iconForeground,
                    "inline-flex rounded-lg p-3 ring-2 ring-inset",
                    action.ringColorClass
                  )}
                >
                  <action.icon aria-hidden="true" className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-base font-semibold text-foreground">
                  <a href={action.href} className="focus:outline-none">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {action.title}
                  </a>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {action.description}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-6 right-6 text-muted-foreground/50 group-hover:text-muted-foreground/60"
              >
                <ArrowUpRight className="h-6 w-6" />
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


code.demo.1753208610912.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

const bookCollections = [
  { name: "Science Fiction", initials: "SF", href: "#", books: 37 },
  { name: "Mystery Thrillers", initials: "MT", href: "#", books: 29 },
  { name: "Historical Fiction", initials: "HF", href: "#", books: 23 },
];

export default function GridList01() {
  return (
    <div className="flex items-center justify-center p-8">
      <div>
        <h2 className="text-sm font-medium text-muted-foreground">
          Favorite Book Collections
        </h2>
        <ul
          role="list"
          className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3"
        >
          {bookCollections.map((collection) => (
            <li key={collection.name} className="col-span-1">
              <Card className="flex flex-row w-full gap-0 rounded-md shadow-sm overflow-hidden py-0">
                <div className="flex w-16 shrink-0 items-center justify-center bg-primary text-sm font-medium text-primary-foreground">
                  {collection.initials}
                </div>
                <CardContent className="flex  flex-1 items-center justify-between truncate p-0 bg-card">
                  <div className="flex-1 truncate px-4 py-2 text-sm">
                    <a
                      href={collection.href}
                      className="font-medium text-foreground hover:text-muted-foreground"
                    >
                      {collection.name}
                    </a>
                    <p className="text-muted-foreground">
                      {collection.books} Books
                    </p>
                  </div>
                  <div className="shrink-0 pr-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                        >
                          <span className="sr-only">Open options</span>
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View collection</DropdownMenuItem>
                        <DropdownMenuItem>Edit collection</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Share collection</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive">
                          Delete collection
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/grid-list.tsx
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  ContactRound,
  Hand,
  Server,
  UserCircle,
} from "lucide-react";

const actions = [
  {
    title: "Getting Started",
    description:
      "Everything you need to know to get started and get to work in ChatCloud.",
    href: "#",
    icon: ArrowRight,
    iconForeground: "text-green-700",
    iconBackground: "bg-green-50 dark:bg-green-950/30",
    ringColorClass: "ring-green-700/30",
  },
  {
    title: "Admin Settings",
    description:
      "Learn how to manage your current workspace or your enterprise space.",
    href: "#",
    icon: UserCircle,
    iconForeground: "text-red-700",
    iconBackground: "bg-red-50 dark:bg-red-950/30",
    ringColorClass: "ring-red-700/30",
  },
  {
    title: "Server Setup",
    description:
      "Connect, simplify, and automate. Discover the power of apps and tools.",
    href: "#",
    icon: Server,
    iconForeground: "text-blue-700",
    iconBackground: "bg-blue-50 dark:bg-blue-950/30",
    ringColorClass: "ring-blue-700/30",
  },
  {
    title: "Login and Verification",
    description:
      "Read on to learn how to sign in with your email address, or your Apple or Google.",
    href: "#",
    icon: CheckCircle,
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50 dark:bg-sky-950/30",
    ringColorClass: "ring-sky-700/30",
  },
  {
    title: "Account Setup",
    description:
      "Adjust your profile and preferences to make ChatCloud work just for you.",
    href: "#",
    icon: ContactRound,
    iconForeground: "text-pink-700",
    iconBackground: "bg-pink-50 dark:bg-pink-950/30",
    ringColorClass: "ring-pink-700/30",
  },
  {
    title: "Trust & Safety",
    description:
      "Trust on our current database and learn how we distribute your data.",
    href: "#",
    icon: Hand,
    iconForeground: "text-orange-700",
    iconBackground: "bg-orange-50 dark:bg-orange-950/30",
    ringColorClass: "ring-orange-700/30",
  },
];

export default function GridList03() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="overflow-hidden rounded-[1rem] bg-muted shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-0.5 space-y-0.5 sm:space-y-0 p-0.5">
        {actions.map((action) => (
          <Card
            key={action.title}
            className={cn(
              "group relative rounded-xl border-0 bg-card p-0 focus-within:ring-2 focus-within:ring-ring focus-within:ring-inset"
            )}
          >
            <CardContent className="p-6">
              <div>
                <span
                  className={cn(
                    action.iconBackground,
                    action.iconForeground,
                    "inline-flex rounded-lg p-3 ring-2 ring-inset",
                    action.ringColorClass
                  )}
                >
                  <action.icon aria-hidden="true" className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-base font-semibold text-foreground">
                  <a href={action.href} className="focus:outline-none">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {action.title}
                  </a>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {action.description}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-6 right-6 text-muted-foreground/50 group-hover:text-muted-foreground/60"
              >
                <ArrowUpRight className="h-6 w-6" />
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
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
