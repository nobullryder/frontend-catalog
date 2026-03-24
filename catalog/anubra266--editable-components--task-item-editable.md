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
editable-components.tsx
"use client";

import { Editable } from "@ark-ui/react/editable";

export default function Basic() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <Editable.Root
        placeholder="Enter some text..."
        defaultValue="Click to edit"
      >
        <Editable.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Basic Editable
        </Editable.Label>
        <Editable.Area className="relative">
          <Editable.Input className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors min-h-10" />
          <Editable.Preview className="w-full px-3 py-2 text-sm border border-transparent rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600 cursor-text transition-colors min-h-10" />
        </Editable.Area>
      </Editable.Root>
    </div>
  );
}


code.demo.1756369082387.tsx
"use client";

import { Editable } from "@ark-ui/react/editable";
import { Check, Circle, Trash2, Calendar } from "lucide-react";
import { useState } from "react";

export default function TaskItem() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Review Q3 marketing campaign",
      completed: false,
      priority: "high",
    },
    {
      id: 2,
      text: "Update project documentation",
      completed: true,
      priority: "medium",
    },
    {
      id: 3,
      text: "Schedule team sync meeting",
      completed: false,
      priority: "low",
    },
  ]);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateTask = (id: number, newText: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="w-full max-w-lg space-y-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Today's Tasks
          </h3>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="group flex items-center space-x-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-colors"
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  task.completed
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-gray-300 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500"
                }`}
              >
                {task.completed ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Circle className="h-3 w-3 opacity-0" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <Editable.Root
                  value={task.text}
                  onValueCommit={(details) =>
                    updateTask(task.id, details.value)
                  }
                  submitMode="blur"
                  activationMode="dblclick"
                >
                  <Editable.Area>
                    <Editable.Input className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 min-h-8" />
                    <Editable.Preview
                      className={`w-full px-2 py-1 text-sm rounded hover:bg-gray-50 dark:hover:bg-gray-800 cursor-text transition-colors min-h-8 ${
                        task.completed
                          ? "text-gray-500 dark:text-gray-400 line-through"
                          : "text-gray-900 dark:text-white"
                      }`}
                    />
                  </Editable.Area>
                </Editable.Root>
              </div>

              <span
                className={`shrink-0 px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.priority}
              </span>

              <button
                onClick={() => deleteTask(task.id)}
                className="shrink-0 opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-all"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          💡 Double-click any task to edit • Click the circle to mark as
          complete
        </div>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/editable-components.tsx
"use client";

import { Editable } from "@ark-ui/react/editable";

export default function Basic() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <Editable.Root
        placeholder="Enter some text..."
        defaultValue="Click to edit"
      >
        <Editable.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Basic Editable
        </Editable.Label>
        <Editable.Area className="relative">
          <Editable.Input className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors min-h-10" />
          <Editable.Preview className="w-full px-3 py-2 text-sm border border-transparent rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600 cursor-text transition-colors min-h-10" />
        </Editable.Area>
      </Editable.Root>
    </div>
  );
}

```

Install NPM dependencies:
```bash
@ark-ui/react
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
