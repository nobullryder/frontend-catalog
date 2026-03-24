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
task-list.tsx
// components/ui/task-list.tsx
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

// --- TYPE DEFINITIONS ---
type TaskStatus = "Completed" | "In Progress" | "Pending";

export interface Task {
  id: number | string;
  task: string;
  category: string;
  status: TaskStatus;
  dueDate: string;
}

export interface TaskListProps {
  title?: string;
  tasks: Task[];
}

// --- STATUS BADGE SUBCOMPONENT ---
const StatusBadge = ({ status }: { status: TaskStatus }) => {
  const baseClasses = "px-2.5 py-0.5 text-xs font-semibold rounded-full";
  const statusClasses = {
    Completed:
      "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400",
    "In Progress":
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400",
    Pending: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  };
  return <span className={cn(baseClasses, statusClasses[status])}>{status}</span>;
};


// --- FRAMER MOTION VARIANTS ---
const containerVariants = {
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
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 14,
    }
  },
};

// --- MAIN COMPONENT ---
export const TaskList = ({ title = "Task List", tasks }: TaskListProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          {/* Table Header */}
          <motion.thead
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.5 }}
          >
            <tr className="border-b border-border">
              <th scope="col" className="p-4 font-medium text-muted-foreground w-12">No</th>
              <th scope="col" className="p-4 font-medium text-muted-foreground">Task</th>
              <th scope="col" className="p-4 font-medium text-muted-foreground">Category</th>
              <th scope="col" className="p-4 font-medium text-muted-foreground">Status</th>
              <th scope="col" className="p-4 font-medium text-muted-foreground text-right">Due Date</th>
            </tr>
          </motion.thead>

          {/* Table Body with Animations */}
          <motion.tbody
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {tasks.map((task, index) => (
                <motion.tr 
                  key={task.id} 
                  variants={itemVariants}
                  className="border-b border-border last:border-none hover:bg-muted/50"
                >
                  <td className="p-4 text-muted-foreground">{index + 1}</td>
                  <td className="p-4 font-medium">{task.task}</td>
                  <td className="p-4 text-muted-foreground">{task.category}</td>
                  <td className="p-4">
                    <StatusBadge status={task.status} />
                  </td>
                  <td className="p-4 text-muted-foreground text-right">{task.dueDate}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </motion.tbody>
        </table>
      </div>
    </div>
  );
};

code.demo.1758995103825.tsx
// demo.tsx
import { TaskList, Task } from "@/components/ui/task-list"; // Adjust the import path

const Demo = () => {
  // Sample data to populate the task list
  const sampleTasks: Task[] = [
    {
      id: 1,
      task: "Schedule initial client meeting",
      category: "Discovery",
      status: "Completed",
      dueDate: "June 3, 2025",
    },
    {
      id: 2,
      task: "Gather business goals and user needs",
      category: "Discovery",
      status: "Completed",
      dueDate: "June 4, 2025",
    },
    {
      id: 3,
      task: "Review current website performance",
      category: "Discovery",
      status: "In Progress",
      dueDate: "June 5, 2025",
    },
    {
      id: 4,
      task: "Create wireframes for key pages",
      category: "Design",
      status: "Pending",
      dueDate: "June 10, 2025",
    },
    {
      id: 5,
      task: "Develop high-fidelity mockups",
      category: "Design",
      status: "Pending",
      dueDate: "June 15, 2025",
    },
  ];

  return (
    <div className="flex items-center justify-center h-full w-full bg-background p-4 md:p-8">
      <TaskList tasks={sampleTasks} />
    </div>
  );
};

export default Demo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/task-list.tsx
// components/ui/task-list.tsx
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

// --- TYPE DEFINITIONS ---
type TaskStatus = "Completed" | "In Progress" | "Pending";

export interface Task {
  id: number | string;
  task: string;
  category: string;
  status: TaskStatus;
  dueDate: string;
}

export interface TaskListProps {
  title?: string;
  tasks: Task[];
}

// --- STATUS BADGE SUBCOMPONENT ---
const StatusBadge = ({ status }: { status: TaskStatus }) => {
  const baseClasses = "px-2.5 py-0.5 text-xs font-semibold rounded-full";
  const statusClasses = {
    Completed:
      "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400",
    "In Progress":
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400",
    Pending: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  };
  return <span className={cn(baseClasses, statusClasses[status])}>{status}</span>;
};


// --- FRAMER MOTION VARIANTS ---
const containerVariants = {
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
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 14,
    }
  },
};

// --- MAIN COMPONENT ---
export const TaskList = ({ title = "Task List", tasks }: TaskListProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          {/* Table Header */}
          <motion.thead
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.5 }}
          >
            <tr className="border-b border-border">
              <th scope="col" className="p-4 font-medium text-muted-foreground w-12">No</th>
              <th scope="col" className="p-4 font-medium text-muted-foreground">Task</th>
              <th scope="col" className="p-4 font-medium text-muted-foreground">Category</th>
              <th scope="col" className="p-4 font-medium text-muted-foreground">Status</th>
              <th scope="col" className="p-4 font-medium text-muted-foreground text-right">Due Date</th>
            </tr>
          </motion.thead>

          {/* Table Body with Animations */}
          <motion.tbody
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {tasks.map((task, index) => (
                <motion.tr 
                  key={task.id} 
                  variants={itemVariants}
                  className="border-b border-border last:border-none hover:bg-muted/50"
                >
                  <td className="p-4 text-muted-foreground">{index + 1}</td>
                  <td className="p-4 font-medium">{task.task}</td>
                  <td className="p-4 text-muted-foreground">{task.category}</td>
                  <td className="p-4">
                    <StatusBadge status={task.status} />
                  </td>
                  <td className="p-4 text-muted-foreground text-right">{task.dueDate}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </motion.tbody>
        </table>
      </div>
    </div>
  );
};
```

Install NPM dependencies:
```bash
framer-motion
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
