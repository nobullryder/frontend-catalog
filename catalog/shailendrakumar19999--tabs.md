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
tabs.tsx
import { Tabs } from "@ark-ui/react/tabs"

const tabs = [
  { value: "react", label: "React", content: "🚀 React makes UI interactive and fast." },
  { value: "vue", label: "Vue", content: "🟢 Vue is approachable and versatile." },
  { value: "solid", label: "Solid", content: "⚡ Solid is reactive and lightweight." },
  { value: "svelte", label: "Svelte", content: "🔥 Svelte compiles away the framework." },
]

export const BasicTab = () => (
  <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md">
    <Tabs.Root defaultValue="react" className="flex flex-col">
      
      {/* Tab List */}
      <Tabs.List className="flex border-b border-gray-200 dark:border-gray-700">
        {tabs.map(({ value, label }) => (
          <Tabs.Trigger
            key={value}
            value={value}
            className="px-4 py-2 text-sm font-medium transition-colors
                       text-gray-600 dark:text-gray-400
                       data-[selected]:text-blue-600 dark:data-[selected]:text-blue-400
                       data-[selected]:border-b-2 data-[selected]:border-blue-500
                       hover:text-gray-800 dark:hover:text-gray-200"
          >
            {label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {/* Tab Content */}
      <div className="p-4 mt-4 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
        {tabs.map(({ value, content }) => (
          <Tabs.Content key={value} value={value}>
            {content}
          </Tabs.Content>
        ))}
      </div>
    </Tabs.Root>
  </div>
)


code.demo.1756483557982.tsx
import { BasicTab } from "@/components/ui/tabs";

export default function DemoOne() {
  return <BasicTab />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/tabs.tsx
import { Tabs } from "@ark-ui/react/tabs"

const tabs = [
  { value: "react", label: "React", content: "🚀 React makes UI interactive and fast." },
  { value: "vue", label: "Vue", content: "🟢 Vue is approachable and versatile." },
  { value: "solid", label: "Solid", content: "⚡ Solid is reactive and lightweight." },
  { value: "svelte", label: "Svelte", content: "🔥 Svelte compiles away the framework." },
]

export const BasicTab = () => (
  <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md">
    <Tabs.Root defaultValue="react" className="flex flex-col">
      
      {/* Tab List */}
      <Tabs.List className="flex border-b border-gray-200 dark:border-gray-700">
        {tabs.map(({ value, label }) => (
          <Tabs.Trigger
            key={value}
            value={value}
            className="px-4 py-2 text-sm font-medium transition-colors
                       text-gray-600 dark:text-gray-400
                       data-[selected]:text-blue-600 dark:data-[selected]:text-blue-400
                       data-[selected]:border-b-2 data-[selected]:border-blue-500
                       hover:text-gray-800 dark:hover:text-gray-200"
          >
            {label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {/* Tab Content */}
      <div className="p-4 mt-4 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
        {tabs.map(({ value, content }) => (
          <Tabs.Content key={value} value={value}>
            {content}
          </Tabs.Content>
        ))}
      </div>
    </Tabs.Root>
  </div>
)

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
