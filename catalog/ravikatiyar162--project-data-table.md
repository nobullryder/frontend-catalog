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
project-data-table.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

// --- TYPE DEFINITIONS ---
interface Contributor {
  src: string;
  alt: string;
  fallback: string;
}

type StatusVariant = "active" | "inProgress" | "onHold";

export interface Project {
  id: string;
  name: string;
  repository: string;
  team: string;
  tech: string;
  createdAt: string;
  contributors: Contributor[];
  status: {
    text: string;
    variant: StatusVariant;
  };
}

// --- PROPS INTERFACE ---
interface ProjectDataTableProps {
  projects: Project[];
  visibleColumns: Set<keyof Project>;
}

// --- STATUS BADGE VARIANTS ---
const badgeVariants = cva("capitalize text-white", {
  variants: {
    variant: {
      active: "bg-green-500 hover:bg-green-600",
      inProgress: "bg-yellow-500 hover:bg-yellow-600",
      onHold: "bg-red-500 hover:bg-red-600",
    },
  },
  defaultVariants: {
    variant: "active",
  },
});

// --- MAIN COMPONENT ---
export const ProjectDataTable = ({ projects, visibleColumns }: ProjectDataTableProps) => {
  // Animation variants for table rows
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeInOut",
      },
    }),
  };
  
  const tableHeaders: { key: keyof Project; label: string }[] = [
    { key: "name", label: "Project" },
    { key: "repository", label: "Repository" },
    { key: "team", label: "Team" },
    { key: "tech", label: "Tech" },
    { key: "createdAt", label: "Created At" },
    { key: "contributors", label: "Contributors" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeaders
                .filter((header) => visibleColumns.has(header.key))
                .map((header) => (
                  <TableHead key={header.key}>{header.label}</TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <motion.tr
                  key={project.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={rowVariants}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  {visibleColumns.has("name") && <TableCell className="font-medium">{project.name}</TableCell>}
                  
                  {visibleColumns.has("repository") && (
                    <TableCell>
                      <a
                        href={project.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <span className="truncate max-w-xs">{project.repository.replace('https://', '')}</span>
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      </a>
                    </TableCell>
                  )}
                  
                  {visibleColumns.has("team") && <TableCell>{project.team}</TableCell>}
                  {visibleColumns.has("tech") && <TableCell>{project.tech}</TableCell>}
                  {visibleColumns.has("createdAt") && <TableCell>{project.createdAt}</TableCell>}
                  
                  {visibleColumns.has("contributors") && (
                    <TableCell>
                      <div className="flex -space-x-2">
                        {project.contributors.map((contributor, idx) => (
                          <Avatar key={idx} className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={contributor.src} alt={contributor.alt} />
                            <AvatarFallback>{contributor.fallback}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </TableCell>
                  )}

                  {visibleColumns.has("status") && (
                    <TableCell>
                      <Badge className={cn(badgeVariants({ variant: project.status.variant }))}>
                        {project.status.text}
                      </Badge>
                    </TableCell>
                  )}
                </motion.tr>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={visibleColumns.size} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

code.demo.1759681409078.tsx
"use client";

import React, { useState, useMemo } from "react";
import { ProjectDataTable, Project } from "@/components/ui/project-data-table"; // Adjust path as needed
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ListFilter, Columns } from "lucide-react";

// --- MOCK DATA ---
const mockProjects: Project[] = [
    { id: "proj-01", name: "ShadCN Clone", repository: "https://github.com/ruixenui/ruixen-buttons", team: "UI Guild", tech: "Next.js", createdAt: "2024-06-01", contributors: [{ src: "https://i.pravatar.cc/150?u=a042581f4e29026704d", alt: "User 1", fallback: "U1" }, { src: "https://i.pravatar.cc/150?u=a042581f4e29026705d", alt: "User 2", fallback: "U2" }], status: { text: "Active", variant: "active" } },
    { id: "proj-02", name: "RUIXEN Components", repository: "https://github.com/ruixenui/ruixen-buttons", team: "Component Devs", tech: "React", createdAt: "2024-05-22", contributors: [{ src: "https://i.pravatar.cc/150?u=a042581f4e29026706d", alt: "User 3", fallback: "U3" }, { src: "https://i.pravatar.cc/150?u=a042581f4e29026707d", alt: "User 4", fallback: "U4" }, { src: "https://i.pravatar.cc/150?u=a042581f4e29026708d", alt: "User 5", fallback: "U5" }], status: { text: "Progress", variant: "inProgress" } },
    { id: "proj-03", name: "CV Jobs Platform", repository: "https://github.com/ruixenui/ruixen-buttons", team: "CV Core", tech: "Spring Boot", createdAt: "2024-06-05", contributors: [{ src: "https://i.pravatar.cc/150?u=a042581f4e29026709d", alt: "User 6", fallback: "U6" }], status: { text: "Active", variant: "active" } },
    { id: "proj-04", name: "Ruixen UI Docs", repository: "https://github.com/ruixenui/ruixen-buttons", team: "Tech Writers", tech: "Markdown", createdAt: "2024-04-19", contributors: [{ src: "https://i.pravatar.cc/150?u=a042581f4e29026710d", alt: "User 7", fallback: "U7" }, { src: "https://i.pravatar.cc/150?u=a042581f4e29026711d", alt: "User 8", fallback: "U8" }], status: { text: "Active", variant: "active" } },
    { id: "proj-05", name: "Job Portal Analytics", repository: "https://github.com/ruixenui/ruixen-buttons", team: "Data Squad", tech: "Python", createdAt: "2024-03-30", contributors: [{ src: "https://i.pravatar.cc/150?u=a042581f4e29026712d", alt: "User 9", fallback: "U9" }], status: { text: "Active", variant: "active" } },
    { id: "proj-06", name: "Ui Ux Design", repository: "https://github.com/ruixenui/ruixen-buttons", team: "Infra", tech: "Socket.io", createdAt: "2024-06-03", contributors: [{ src: "https://i.pravatar.cc/150?u=a042581f4e29026713d", alt: "User 10", fallback: "U10" }, { src: "https://i.pravatar.cc/150?u=a042581f4e29026714d", alt: "User 11", fallback: "U11" }], status: { text: "Active", variant: "active" } },
    { id: "proj-01", name: "ShadCN Clone", repository: "https://github.com/ruixenui/ruixen-buttons", team: "UI Guild", tech: "Next.js", createdAt: "2024-06-01", contributors: [{ src: "https://i.pravatar.cc/150?u=a042581f4e29026704d", alt: "User 1", fallback: "U1" }, { src: "https://i.pravatar.cc/150?u=a042581f4e29026705d", alt: "User 2", fallback: "U2" }], status: { text: "Active", variant: "active" } },
    { id: "proj-02", name: "RUIXEN Components", repository: "https://github.com/ruixenui/ruixen-buttons", team: "Component Devs", tech: "React", createdAt: "2024-05-22", contributors: [{ src: "https://i.pravatar.cc/150?u=a042581f4e29026706d", alt: "User 3", fallback: "U3" }, { src: "https://i.pravatar.cc/150?u=a042581f4e29026707d", alt: "User 4", fallback: "U4" }, { src: "https://i.pravatar.cc/150?u=a042581f4e29026708d", alt: "User 5", fallback: "U5" }], status: { text: "Progress", variant: "inProgress" } },
    { id: "proj-03", name: "CV Jobs Platform", repository: "https://github.com/ruixenui/ruixen-buttons", team: "CV Core", tech: "Spring Boot", createdAt: "2024-06-05", contributors: [{ src: "https://i.pravatar.cc/150?u=a042581f4e29026709d", alt: "User 6", fallback: "U6" }], status: { text: "Active", variant: "active" } },
    { id: "proj-04", name: "Ruixen UI Docs", repository: "https://github.com/ruixenui/ruixen-buttons", team: "Tech Writers", tech: "Markdown", createdAt: "2024-04-19", contributors: [{ src: "https://i.pravatar.cc/150?u=a042581f4e29026710d", alt: "User 7", fallback: "U7" }, { src: "https://i.pravatar.cc/150?u=a042581f4e29026711d", alt: "User 8", fallback: "U8" }], status: { text: "Active", variant: "active" } },
];

const allColumns: (keyof Project)[] = ["name", "repository", "team", "tech", "createdAt", "contributors", "status"];

const Demo = () => {
  const [techFilter, setTechFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [visibleColumns, setVisibleColumns] = useState<Set<keyof Project>>(new Set(allColumns));

  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      const techMatch = techFilter === "" || project.tech.toLowerCase().includes(techFilter.toLowerCase());
      const statusMatch = statusFilter === "all" || project.status.variant === statusFilter;
      return techMatch && statusMatch;
    });
  }, [techFilter, statusFilter]);

  const toggleColumn = (column: keyof Project) => {
    setVisibleColumns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(column)) {
        newSet.delete(column);
      } else {
        newSet.add(column);
      }
      return newSet;
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center">
        <div className="flex flex-1 gap-4">
          <Input
            placeholder="Filter by technology..."
            value={techFilter}
            onChange={(e) => setTechFilter(e.target.value)}
            className="max-w-xs"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ListFilter className="h-4 w-4" />
                <span>Status</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={statusFilter === "all"} onCheckedChange={() => setStatusFilter("all")}>All</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={statusFilter === "active"} onCheckedChange={() => setStatusFilter("active")}>Active</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={statusFilter === "inProgress"} onCheckedChange={() => setStatusFilter("inProgress")}>In Progress</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={statusFilter === "onHold"} onCheckedChange={() => setStatusFilter("onHold")}>On Hold</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Columns className="h-4 w-4" />
              <span>Columns</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {allColumns.map((column) => (
              <DropdownMenuCheckboxItem
                key={column}
                className="capitalize"
                checked={visibleColumns.has(column)}
                onCheckedChange={() => toggleColumn(column)}
              >
                {column}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ProjectDataTable projects={filteredProjects} visibleColumns={visibleColumns} />
    </div>
  );
};

export default Demo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/project-data-table.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

// --- TYPE DEFINITIONS ---
interface Contributor {
  src: string;
  alt: string;
  fallback: string;
}

type StatusVariant = "active" | "inProgress" | "onHold";

export interface Project {
  id: string;
  name: string;
  repository: string;
  team: string;
  tech: string;
  createdAt: string;
  contributors: Contributor[];
  status: {
    text: string;
    variant: StatusVariant;
  };
}

// --- PROPS INTERFACE ---
interface ProjectDataTableProps {
  projects: Project[];
  visibleColumns: Set<keyof Project>;
}

// --- STATUS BADGE VARIANTS ---
const badgeVariants = cva("capitalize text-white", {
  variants: {
    variant: {
      active: "bg-green-500 hover:bg-green-600",
      inProgress: "bg-yellow-500 hover:bg-yellow-600",
      onHold: "bg-red-500 hover:bg-red-600",
    },
  },
  defaultVariants: {
    variant: "active",
  },
});

// --- MAIN COMPONENT ---
export const ProjectDataTable = ({ projects, visibleColumns }: ProjectDataTableProps) => {
  // Animation variants for table rows
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeInOut",
      },
    }),
  };
  
  const tableHeaders: { key: keyof Project; label: string }[] = [
    { key: "name", label: "Project" },
    { key: "repository", label: "Repository" },
    { key: "team", label: "Team" },
    { key: "tech", label: "Tech" },
    { key: "createdAt", label: "Created At" },
    { key: "contributors", label: "Contributors" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeaders
                .filter((header) => visibleColumns.has(header.key))
                .map((header) => (
                  <TableHead key={header.key}>{header.label}</TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <motion.tr
                  key={project.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={rowVariants}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  {visibleColumns.has("name") && <TableCell className="font-medium">{project.name}</TableCell>}
                  
                  {visibleColumns.has("repository") && (
                    <TableCell>
                      <a
                        href={project.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <span className="truncate max-w-xs">{project.repository.replace('https://', '')}</span>
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      </a>
                    </TableCell>
                  )}
                  
                  {visibleColumns.has("team") && <TableCell>{project.team}</TableCell>}
                  {visibleColumns.has("tech") && <TableCell>{project.tech}</TableCell>}
                  {visibleColumns.has("createdAt") && <TableCell>{project.createdAt}</TableCell>}
                  
                  {visibleColumns.has("contributors") && (
                    <TableCell>
                      <div className="flex -space-x-2">
                        {project.contributors.map((contributor, idx) => (
                          <Avatar key={idx} className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={contributor.src} alt={contributor.alt} />
                            <AvatarFallback>{contributor.fallback}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </TableCell>
                  )}

                  {visibleColumns.has("status") && (
                    <TableCell>
                      <Badge className={cn(badgeVariants({ variant: project.status.variant }))}>
                        {project.status.text}
                      </Badge>
                    </TableCell>
                  )}
                </motion.tr>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={visibleColumns.size} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
```

Install NPM dependencies:
```bash
lucide-react, framer-motion, class-variance-authority
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
