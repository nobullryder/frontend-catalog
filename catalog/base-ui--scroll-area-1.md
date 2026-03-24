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
scroll-area-1.tsx
import * as React from 'react';
import { ScrollArea } from '@base-ui-components/react/scroll-area';

export default function ExampleScrollArea() {
  return (
    <ScrollArea.Root className="h-[8.5rem] w-96 max-w-[calc(100vw-8rem)]">
      <ScrollArea.Viewport className="h-full overscroll-contain rounded-md outline outline-1 -outline-offset-1 outline-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800">
        <div className="flex flex-col gap-4 py-3 pr-6 pl-4 text-sm leading-[1.375rem] text-gray-900">
          <p>
            Vernacular architecture is building done outside any academic tradition,
            and without professional guidance. It is not a particular architectural
            movement or style, but rather a broad category, encompassing a wide range
            and variety of building types, with differing methods of construction,
            from around the world, both historical and extant and classical and
            modern. Vernacular architecture constitutes 95% of the world's built
            environment, as estimated in 1995 by Amos Rapoport, as measured against
            the small percentage of new buildings every year designed by architects
            and built by engineers.
          </p>
          <p>
            This type of architecture usually serves immediate, local needs, is
            constrained by the materials available in its particular region and
            reflects local traditions and cultural practices. The study of vernacular
            architecture does not examine formally schooled architects, but instead
            that of the design skills and tradition of local builders, who were
            rarely given any attribution for the work. More recently, vernacular
            architecture has been examined by designers and the building industry in
            an effort to be more energy conscious with contemporary design and
            construction—part of a broader interest in sustainable design.
          </p>
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="m-2 flex w-1 justify-center rounded bg-gray-200 opacity-0 transition-opacity delay-300 data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:duration-75 data-[scrolling]:opacity-100 data-[scrolling]:delay-0 data-[scrolling]:duration-75">
        <ScrollArea.Thumb className="w-full rounded bg-gray-500" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}


code.demo.1753378291855.tsx
import ExampleScrollArea from "@/components/ui/scroll-area-1";

export default function DemoOne() {
  return <ExampleScrollArea />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/scroll-area-1.tsx
import * as React from 'react';
import { ScrollArea } from '@base-ui-components/react/scroll-area';

export default function ExampleScrollArea() {
  return (
    <ScrollArea.Root className="h-[8.5rem] w-96 max-w-[calc(100vw-8rem)]">
      <ScrollArea.Viewport className="h-full overscroll-contain rounded-md outline outline-1 -outline-offset-1 outline-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800">
        <div className="flex flex-col gap-4 py-3 pr-6 pl-4 text-sm leading-[1.375rem] text-gray-900">
          <p>
            Vernacular architecture is building done outside any academic tradition,
            and without professional guidance. It is not a particular architectural
            movement or style, but rather a broad category, encompassing a wide range
            and variety of building types, with differing methods of construction,
            from around the world, both historical and extant and classical and
            modern. Vernacular architecture constitutes 95% of the world's built
            environment, as estimated in 1995 by Amos Rapoport, as measured against
            the small percentage of new buildings every year designed by architects
            and built by engineers.
          </p>
          <p>
            This type of architecture usually serves immediate, local needs, is
            constrained by the materials available in its particular region and
            reflects local traditions and cultural practices. The study of vernacular
            architecture does not examine formally schooled architects, but instead
            that of the design skills and tradition of local builders, who were
            rarely given any attribution for the work. More recently, vernacular
            architecture has been examined by designers and the building industry in
            an effort to be more energy conscious with contemporary design and
            construction—part of a broader interest in sustainable design.
          </p>
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="m-2 flex w-1 justify-center rounded bg-gray-200 opacity-0 transition-opacity delay-300 data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:duration-75 data-[scrolling]:opacity-100 data-[scrolling]:delay-0 data-[scrolling]:duration-75">
        <ScrollArea.Thumb className="w-full rounded bg-gray-500" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}

```

Install NPM dependencies:
```bash
@base-ui-components/react
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
