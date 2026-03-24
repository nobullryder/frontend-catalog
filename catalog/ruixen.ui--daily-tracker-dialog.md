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
daily-tracker-dialog.tsx
"use client"

import { useState } from "react"
import { CheckCircleIcon, PlusCircleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export default function DailyTrackerDialog() {
  const [tasks, setTasks] = useState([
    { text: "Morning meditation", done: false },
    { text: "Read 20 pages", done: false },
    { text: "Exercise", done: false },
  ])
  const [newTask, setNewTask] = useState("")

  const toggleTask = (index: number) => {
    const updated = [...tasks]
    updated[index].done = !updated[index].done
    setTasks(updated)
  }

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, done: false }])
      setNewTask("")
    }
  }

  const completedCount = tasks.filter((t) => t.done).length

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Daily Tracker</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md !rounded-xl p-6">
        <DialogHeader className="text-center mb-4">
          <DialogTitle>Daily Productivity Tracker</DialogTitle>
          <DialogDescription>
            Track your tasks and see your daily progress.
          </DialogDescription>
        </DialogHeader>

        {/* Progress */}
        <div className="mb-4 text-center">
          <p className="text-sm text-muted-foreground">
            Completed {completedCount} of {tasks.length} tasks
          </p>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.map((task, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => toggleTask(idx)}
            >
              <CheckCircleIcon
                size={20}
                className={task.done ? "text-green-500" : "text-gray-400"}
              />
              <span className={task.done ? "line-through text-gray-500" : ""}>
                {task.text}
              </span>
            </div>
          ))}
        </div>

        {/* Add Task */}
        <div className="mt-4 flex gap-2">
          <Input
            placeholder="New task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button onClick={addTask} className="px-4">
            <PlusCircleIcon size={20} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


code.demo.1755717810881.tsx
import DailyTrackerDialog from "@/components/ui/daily-tracker-dialog";

export default function DemoOne() {
  return <DailyTrackerDialog />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/daily-tracker-dialog.tsx
"use client"

import { useState } from "react"
import { CheckCircleIcon, PlusCircleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export default function DailyTrackerDialog() {
  const [tasks, setTasks] = useState([
    { text: "Morning meditation", done: false },
    { text: "Read 20 pages", done: false },
    { text: "Exercise", done: false },
  ])
  const [newTask, setNewTask] = useState("")

  const toggleTask = (index: number) => {
    const updated = [...tasks]
    updated[index].done = !updated[index].done
    setTasks(updated)
  }

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, done: false }])
      setNewTask("")
    }
  }

  const completedCount = tasks.filter((t) => t.done).length

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Daily Tracker</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md !rounded-xl p-6">
        <DialogHeader className="text-center mb-4">
          <DialogTitle>Daily Productivity Tracker</DialogTitle>
          <DialogDescription>
            Track your tasks and see your daily progress.
          </DialogDescription>
        </DialogHeader>

        {/* Progress */}
        <div className="mb-4 text-center">
          <p className="text-sm text-muted-foreground">
            Completed {completedCount} of {tasks.length} tasks
          </p>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.map((task, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => toggleTask(idx)}
            >
              <CheckCircleIcon
                size={20}
                className={task.done ? "text-green-500" : "text-gray-400"}
              />
              <span className={task.done ? "line-through text-gray-500" : ""}>
                {task.text}
              </span>
            </div>
          ))}
        </div>

        {/* Add Task */}
        <div className="mt-4 flex gap-2">
          <Input
            placeholder="New task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button onClick={addTask} className="px-4">
            <PlusCircleIcon size={20} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
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
