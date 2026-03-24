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
bottom-drawers.tsx
"use client";

import * as React from "react";
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
import { Textarea } from "@/components/ui/textarea";

export default function BottomDrawers() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h2 className="text-2xl font-semibold">Bottom Drawers Example</h2>
      <p className="text-gray-500 text-center max-w-md">
        Each button opens a drawer from the bottom with different content. Content is compact and centered.
      </p>

      <div className="flex flex-wrap gap-4">
        {/* Drawer 1 - Newsletter */}
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Subscribe</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="flex flex-col items-center text-center py-6 px-4">
              <DrawerHeader className="space-y-2 max-w-md">
                <DrawerTitle>Subscribe to Newsletter</DrawerTitle>
                <DrawerDescription>
                  Enter your email to receive the latest updates.
                </DrawerDescription>
              </DrawerHeader>
              <div className="w-full max-w-md mt-4">
                <Label htmlFor="email1">Email</Label>
                <Input id="email1" type="email" placeholder="you@example.com" />
              </div>
              <DrawerFooter className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-6">
                <Button className="w-full">Subscribe</Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>

        {/* Drawer 2 - Feedback */}
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Feedback</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="flex flex-col items-center text-center py-6 px-4">
              <DrawerHeader className="space-y-2 max-w-md">
                <DrawerTitle>Submit Feedback</DrawerTitle>
                <DrawerDescription>
                  Let us know your thoughts about our service.
                </DrawerDescription>
              </DrawerHeader>
              <div className="w-full max-w-md mt-4 space-y-4">
                <div className="grid gap-2 text-left">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="Your name" />
                </div>
                <div className="grid gap-2 text-left">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your feedback..." className="min-h-[80px]" />
                </div>
              </div>
              <DrawerFooter className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-6">
                <Button className="w-full">Submit</Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>

        {/* Drawer 3 - Contact Form */}
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Contact</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="flex flex-col items-center text-center py-6 px-4">
              <DrawerHeader className="space-y-2 max-w-md">
                <DrawerTitle>Contact Us</DrawerTitle>
                <DrawerDescription>
                  Fill in your details and we will get back to you.
                </DrawerDescription>
              </DrawerHeader>
              <div className="w-full max-w-md mt-4 space-y-4">
                <div className="grid gap-2 text-left">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input id="contact-name" type="text" placeholder="Your name" />
                </div>
                <div className="grid gap-2 text-left">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input id="contact-email" type="email" placeholder="you@example.com" />
                </div>
                <div className="grid gap-2 text-left">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea id="contact-message" placeholder="Your message..." className="min-h-[80px]" />
                </div>
              </div>
              <DrawerFooter className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-6">
                <Button className="w-full">Send</Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}


code.demo.1756143367948.tsx
import BottomDrawers from "@/components/ui/bottom-drawers";

export default function DemoOne() {
  return <BottomDrawers />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/bottom-drawers.tsx
"use client";

import * as React from "react";
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
import { Textarea } from "@/components/ui/textarea";

export default function BottomDrawers() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h2 className="text-2xl font-semibold">Bottom Drawers Example</h2>
      <p className="text-gray-500 text-center max-w-md">
        Each button opens a drawer from the bottom with different content. Content is compact and centered.
      </p>

      <div className="flex flex-wrap gap-4">
        {/* Drawer 1 - Newsletter */}
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Subscribe</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="flex flex-col items-center text-center py-6 px-4">
              <DrawerHeader className="space-y-2 max-w-md">
                <DrawerTitle>Subscribe to Newsletter</DrawerTitle>
                <DrawerDescription>
                  Enter your email to receive the latest updates.
                </DrawerDescription>
              </DrawerHeader>
              <div className="w-full max-w-md mt-4">
                <Label htmlFor="email1">Email</Label>
                <Input id="email1" type="email" placeholder="you@example.com" />
              </div>
              <DrawerFooter className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-6">
                <Button className="w-full">Subscribe</Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>

        {/* Drawer 2 - Feedback */}
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Feedback</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="flex flex-col items-center text-center py-6 px-4">
              <DrawerHeader className="space-y-2 max-w-md">
                <DrawerTitle>Submit Feedback</DrawerTitle>
                <DrawerDescription>
                  Let us know your thoughts about our service.
                </DrawerDescription>
              </DrawerHeader>
              <div className="w-full max-w-md mt-4 space-y-4">
                <div className="grid gap-2 text-left">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="Your name" />
                </div>
                <div className="grid gap-2 text-left">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your feedback..." className="min-h-[80px]" />
                </div>
              </div>
              <DrawerFooter className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-6">
                <Button className="w-full">Submit</Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>

        {/* Drawer 3 - Contact Form */}
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Contact</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="flex flex-col items-center text-center py-6 px-4">
              <DrawerHeader className="space-y-2 max-w-md">
                <DrawerTitle>Contact Us</DrawerTitle>
                <DrawerDescription>
                  Fill in your details and we will get back to you.
                </DrawerDescription>
              </DrawerHeader>
              <div className="w-full max-w-md mt-4 space-y-4">
                <div className="grid gap-2 text-left">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input id="contact-name" type="text" placeholder="Your name" />
                </div>
                <div className="grid gap-2 text-left">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input id="contact-email" type="email" placeholder="you@example.com" />
                </div>
                <div className="grid gap-2 text-left">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea id="contact-message" placeholder="Your message..." className="min-h-[80px]" />
                </div>
              </div>
              <DrawerFooter className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-6">
                <Button className="w-full">Send</Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
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
