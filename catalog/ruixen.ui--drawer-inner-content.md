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
drawer-inner-content.tsx
"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function DrawerInnerContent() {
  return (
    <>
      <DrawerHeader>
        <DrawerTitle>Newsletter Signup</DrawerTitle>
        <DrawerDescription>
          Stay updated! Subscribe to our newsletter for latest updates.
        </DrawerDescription>
      </DrawerHeader>

      <div className="p-4 space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
      </div>

      <DrawerFooter>
        <Button>Subscribe</Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </>
  );
}

export default function FourSideDrawers() {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center h-screen">
      {/* Bottom Drawer */}
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerInnerContent />
        </DrawerContent>
      </Drawer>

      {/* Left Drawer */}
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button variant="outline">Left</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerInnerContent />
        </DrawerContent>
      </Drawer>

      {/* Right Drawer */}
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline">Right</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerInnerContent />
        </DrawerContent>
      </Drawer>
    </div>
  );
}


code.demo.1756142077433.tsx
import DrawerInnerContent from "@/components/ui/drawer-inner-content";

export default function DemoOne() {
  return <DrawerInnerContent />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/drawer-inner-content.tsx
"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function DrawerInnerContent() {
  return (
    <>
      <DrawerHeader>
        <DrawerTitle>Newsletter Signup</DrawerTitle>
        <DrawerDescription>
          Stay updated! Subscribe to our newsletter for latest updates.
        </DrawerDescription>
      </DrawerHeader>

      <div className="p-4 space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
      </div>

      <DrawerFooter>
        <Button>Subscribe</Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </>
  );
}

export default function FourSideDrawers() {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center h-screen">
      {/* Bottom Drawer */}
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerInnerContent />
        </DrawerContent>
      </Drawer>

      {/* Left Drawer */}
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button variant="outline">Left</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerInnerContent />
        </DrawerContent>
      </Drawer>

      {/* Right Drawer */}
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline">Right</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerInnerContent />
        </DrawerContent>
      </Drawer>
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
