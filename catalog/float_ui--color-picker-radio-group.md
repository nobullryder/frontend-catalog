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
color-picker-radio-group.tsx
"use client";

type Color = { bg: string; ring: string };

const colors: Color[] = [
  { bg: "bg-[#2563EB]", ring: "ring-[#2563EB]" },
  { bg: "bg-[#8B5CF6]", ring: "ring-[#8B5CF6]" },
  { bg: "bg-[#DB2777]", ring: "ring-[#DB2777]" },
  { bg: "bg-[#475569]", ring: "ring-[#475569]" },
  { bg: "bg-[#EA580C]", ring: "ring-[#EA580C]" },
];

export default function ColorPicker() {
  return (
    <div className="max-w-md mx-auto px-4">
      <h2 className="text-gray-800 font-medium">Pick your favorite color</h2>

      <ul className="mt-4 flex items-center flex-wrap gap-4">
        {colors.map((item, idx) => {
          const id = `color-${idx}`;
          return (
            <li key={idx} className="flex-none">
              <label htmlFor={id} className="block relative w-8 h-8">
                <input
                  id={id}
                  type="radio"
                  name="color"
                  defaultChecked={idx === 1}
                  className="sr-only peer"
                  aria-label={`Choose ${item.bg}`}
                />

                {/* Color dot */}
                <span
                  className={`inline-flex justify-center items-center w-full h-full rounded-full peer-checked:ring ring-offset-2 cursor-pointer duration-150 ${item.bg} ${item.ring}`}
                />

                {/* Check icon (shown when selected) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-white absolute inset-0 m-auto z-0 pointer-events-none hidden peer-checked:block duration-150"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}


code.demo.1755329616442.tsx
import ColorPicker from "@/components/ui/color-picker-radio-group";

export default function DemoOne() {
  return <ColorPicker />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/color-picker-radio-group.tsx
"use client";

type Color = { bg: string; ring: string };

const colors: Color[] = [
  { bg: "bg-[#2563EB]", ring: "ring-[#2563EB]" },
  { bg: "bg-[#8B5CF6]", ring: "ring-[#8B5CF6]" },
  { bg: "bg-[#DB2777]", ring: "ring-[#DB2777]" },
  { bg: "bg-[#475569]", ring: "ring-[#475569]" },
  { bg: "bg-[#EA580C]", ring: "ring-[#EA580C]" },
];

export default function ColorPicker() {
  return (
    <div className="max-w-md mx-auto px-4">
      <h2 className="text-gray-800 font-medium">Pick your favorite color</h2>

      <ul className="mt-4 flex items-center flex-wrap gap-4">
        {colors.map((item, idx) => {
          const id = `color-${idx}`;
          return (
            <li key={idx} className="flex-none">
              <label htmlFor={id} className="block relative w-8 h-8">
                <input
                  id={id}
                  type="radio"
                  name="color"
                  defaultChecked={idx === 1}
                  className="sr-only peer"
                  aria-label={`Choose ${item.bg}`}
                />

                {/* Color dot */}
                <span
                  className={`inline-flex justify-center items-center w-full h-full rounded-full peer-checked:ring ring-offset-2 cursor-pointer duration-150 ${item.bg} ${item.ring}`}
                />

                {/* Check icon (shown when selected) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-white absolute inset-0 m-auto z-0 pointer-events-none hidden peer-checked:block duration-150"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

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
