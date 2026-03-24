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
playful-todolist.tsx
'use client';

import * as React from 'react';
import { motion, type Transition } from 'motion/react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const checkboxItems = [
  {
    id: 1,
    label: 'Code in Assembly 💾',
    defaultChecked: false,
  },
  {
    id: 2,
    label: 'Present a bug as a feature 🪲',
    defaultChecked: false,
  },
  {
    id: 3,
    label: 'Push to prod on a Friday 🚀',
    defaultChecked: false,
  },
];

const getPathAnimate = (isChecked: boolean) => ({
  pathLength: isChecked ? 1 : 0,
  opacity: isChecked ? 1 : 0,
});

const getPathTransition = (isChecked: boolean): Transition => ({
  pathLength: { duration: 1, ease: 'easeInOut' },
  opacity: {
    duration: 0.01,
    delay: isChecked ? 0 : 1,
  },
});

export const Component = () => {
  const [checked, setChecked] = React.useState(
    checkboxItems.map((i) => !!i.defaultChecked),
  );

  return (
    <div className= "bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-6 space-y-6" >
    {
      checkboxItems.map((item, idx) => (
        <div key= { item.id } className = "space-y-6" >
        <div className="flex items-center space-x-2" >
      <Checkbox
    className="transition-colors duration-300"
              checked = { checked[idx]}
              onCheckedChange = {(val) => {
  const updated = [...checked];
  updated[idx] = val === true;
  setChecked(updated);
}}
id = {`checkbox-${item.id}`}
/>
  < div className = "relative inline-block" >
    <Label htmlFor={ `checkbox-${item.id}` } > { item.label } < /Label>
      < motion.svg
width = "340"
height = "32"
viewBox = "0 0 340 32"
className = "absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none z-20 w-full h-10"
  >
  <motion.path
                  d="M 10 16.91 s 79.8 -11.36 98.1 -11.34 c 22.2 0.02 -47.82 14.25 -33.39 22.02 c 12.61 6.77 124.18 -27.98 133.31 -17.28 c 7.52 8.38 -26.8 20.02 4.61 22.05 c 24.55 1.93 113.37 -20.36 113.37 -20.36"
vectorEffect = "non-scaling-stroke"
strokeWidth = { 2}
strokeLinecap = "round"
strokeMiterlimit = { 10}
fill = "none"
initial = { false}
animate = { getPathAnimate(!!checked[idx]) }
transition = { getPathTransition(!!checked[idx]) }
className = "stroke-neutral-900 dark:stroke-neutral-100"
  />
  </motion.svg>
  < /div>
  < /div>
{
  idx !== checkboxItems.length - 1 && (
    <div className="border-t border-neutral-300 dark:border-neutral-700" />
          )
}
</div>
      ))}
</div>
  );
}

code.demo.1758006017730.tsx
import { Component } from "@/components/ui/playful-todolist";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/playful-todolist.tsx
'use client';

import * as React from 'react';
import { motion, type Transition } from 'motion/react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const checkboxItems = [
  {
    id: 1,
    label: 'Code in Assembly 💾',
    defaultChecked: false,
  },
  {
    id: 2,
    label: 'Present a bug as a feature 🪲',
    defaultChecked: false,
  },
  {
    id: 3,
    label: 'Push to prod on a Friday 🚀',
    defaultChecked: false,
  },
];

const getPathAnimate = (isChecked: boolean) => ({
  pathLength: isChecked ? 1 : 0,
  opacity: isChecked ? 1 : 0,
});

const getPathTransition = (isChecked: boolean): Transition => ({
  pathLength: { duration: 1, ease: 'easeInOut' },
  opacity: {
    duration: 0.01,
    delay: isChecked ? 0 : 1,
  },
});

export const Component = () => {
  const [checked, setChecked] = React.useState(
    checkboxItems.map((i) => !!i.defaultChecked),
  );

  return (
    <div className= "bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-6 space-y-6" >
    {
      checkboxItems.map((item, idx) => (
        <div key= { item.id } className = "space-y-6" >
        <div className="flex items-center space-x-2" >
      <Checkbox
    className="transition-colors duration-300"
              checked = { checked[idx]}
              onCheckedChange = {(val) => {
  const updated = [...checked];
  updated[idx] = val === true;
  setChecked(updated);
}}
id = {`checkbox-${item.id}`}
/>
  < div className = "relative inline-block" >
    <Label htmlFor={ `checkbox-${item.id}` } > { item.label } < /Label>
      < motion.svg
width = "340"
height = "32"
viewBox = "0 0 340 32"
className = "absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none z-20 w-full h-10"
  >
  <motion.path
                  d="M 10 16.91 s 79.8 -11.36 98.1 -11.34 c 22.2 0.02 -47.82 14.25 -33.39 22.02 c 12.61 6.77 124.18 -27.98 133.31 -17.28 c 7.52 8.38 -26.8 20.02 4.61 22.05 c 24.55 1.93 113.37 -20.36 113.37 -20.36"
vectorEffect = "non-scaling-stroke"
strokeWidth = { 2}
strokeLinecap = "round"
strokeMiterlimit = { 10}
fill = "none"
initial = { false}
animate = { getPathAnimate(!!checked[idx]) }
transition = { getPathTransition(!!checked[idx]) }
className = "stroke-neutral-900 dark:stroke-neutral-100"
  />
  </motion.svg>
  < /div>
  < /div>
{
  idx !== checkboxItems.length - 1 && (
    <div className="border-t border-neutral-300 dark:border-neutral-700" />
          )
}
</div>
      ))}
</div>
  );
}
```

Install NPM dependencies:
```bash
motion
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
