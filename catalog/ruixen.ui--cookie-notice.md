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
cookie-notice.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function CookieNotice() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/4 -translate-x-1/2 z-50">
      <Card className="w-[350px] shadow-lg rounded-2xl border bg-background text-foreground">
        <CardContent className="p-5">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🍪</span>
              <h2 className="font-semibold">Cookie Notice</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              We use cookies to ensure that we give you the best experience on
              our website.{" "}
              <a
                href="#"
                className="underline text-primary hover:text-primary/80"
              >
                Read cookies policies.
              </a>
            </p>
            <div className="flex justify-between items-center pt-2">
              <a
                href="#"
                className="text-sm underline hover:text-primary transition"
              >
                Manage your preferences
              </a>
              <Button
                size="sm"
                onClick={() => setVisible(false)}
                className={cn(
                  "rounded-lg px-4 py-1 text-white",
                  "bg-primary hover:bg-primary/90"
                )}
              >
                Accept
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


code.demo.1757382668962.tsx
import CookieNotice from "@/components/ui/cookie-notice";

export default function DemoOne() {
  return <CookieNotice />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/cookie-notice.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function CookieNotice() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/4 -translate-x-1/2 z-50">
      <Card className="w-[350px] shadow-lg rounded-2xl border bg-background text-foreground">
        <CardContent className="p-5">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🍪</span>
              <h2 className="font-semibold">Cookie Notice</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              We use cookies to ensure that we give you the best experience on
              our website.{" "}
              <a
                href="#"
                className="underline text-primary hover:text-primary/80"
              >
                Read cookies policies.
              </a>
            </p>
            <div className="flex justify-between items-center pt-2">
              <a
                href="#"
                className="text-sm underline hover:text-primary transition"
              >
                Manage your preferences
              </a>
              <Button
                size="sm"
                onClick={() => setVisible(false)}
                className={cn(
                  "rounded-lg px-4 py-1 text-white",
                  "bg-primary hover:bg-primary/90"
                )}
              >
                Accept
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
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
