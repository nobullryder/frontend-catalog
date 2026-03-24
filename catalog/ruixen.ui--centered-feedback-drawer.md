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
centered-feedback-drawer.tsx
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
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useState } from "react";

export default function CenteredFeedbackDrawer() {
  const [rating, setRating] = useState(0);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default">Give Feedback</Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="flex flex-col items-center justify-center text-center py-8 px-4">
          <DrawerHeader className="max-w-md space-y-2">
            <DrawerTitle className="text-xl font-bold">
              We Value Your Feedback
            </DrawerTitle>
            <DrawerDescription>
              Help us improve by sharing your thoughts.
            </DrawerDescription>
          </DrawerHeader>

          {/* Form area */}
          <div className="w-full max-w-md space-y-4 mt-4">
            {/* Name */}
            <div className="grid gap-2 text-left">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="Your name" />
            </div>

            {/* Email */}
            <div className="grid gap-2 text-left">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>

            {/* Rating */}
            <div className="grid gap-2 text-left">
              <Label>Rate your experience</Label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 cursor-pointer ${
                      rating >= star
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-400"
                    }`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="grid gap-2 text-left">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Tell us about your experience..."
                className="min-h-[100px]"
              />
            </div>
          </div>

          {/* Footer */}
          <DrawerFooter className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-6">
            <Button className="w-full">Submit Feedback</Button>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}


code.demo.1756142859672.tsx
import CenteredFeedbackDrawer from "@/components/ui/centered-feedback-drawer";

export default function DemoOne() {
  return <CenteredFeedbackDrawer />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/centered-feedback-drawer.tsx
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
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useState } from "react";

export default function CenteredFeedbackDrawer() {
  const [rating, setRating] = useState(0);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default">Give Feedback</Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="flex flex-col items-center justify-center text-center py-8 px-4">
          <DrawerHeader className="max-w-md space-y-2">
            <DrawerTitle className="text-xl font-bold">
              We Value Your Feedback
            </DrawerTitle>
            <DrawerDescription>
              Help us improve by sharing your thoughts.
            </DrawerDescription>
          </DrawerHeader>

          {/* Form area */}
          <div className="w-full max-w-md space-y-4 mt-4">
            {/* Name */}
            <div className="grid gap-2 text-left">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="Your name" />
            </div>

            {/* Email */}
            <div className="grid gap-2 text-left">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>

            {/* Rating */}
            <div className="grid gap-2 text-left">
              <Label>Rate your experience</Label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 cursor-pointer ${
                      rating >= star
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-400"
                    }`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="grid gap-2 text-left">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Tell us about your experience..."
                className="min-h-[100px]"
              />
            </div>
          </div>

          {/* Footer */}
          <DrawerFooter className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-6">
            <Button className="w-full">Submit Feedback</Button>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
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
