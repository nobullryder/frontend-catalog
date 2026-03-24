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
credit-card-dialog.tsx
"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface CreditCardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActivate: (code: string) => Promise<void>;
  backgroundImage?: string;
}

export function CreditCardDialog({
  open,
  onOpenChange,
  onActivate,
  backgroundImage = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_gradient.jpeg",
}: CreditCardDialogProps) {
  const [code, setCode] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleActivateClick = async () => {
    if (!code) return;
    setIsProcessing(true);
    try {
      await onActivate(code);
    } finally {
      setIsProcessing(false);
    }
  };

  React.useEffect(() => {
    if (!open) {
      setCode("");
      setIsProcessing(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] p-0">
        {/* Credit Card */}
        <div className="flex items-center justify-center pt-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
              "relative h-48 w-80 rounded-2xl p-6 shadow-2xl text-white flex flex-col justify-between bg-cover bg-center"
            )}
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black/40 rounded-2xl" />

            {/* Card content */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="h-8 w-12 bg-yellow-400 rounded-sm" /> {/* chip */}
              <p className="text-sm font-medium tracking-wider">VIRTUAL CARD</p>
            </div>

            <div className="relative z-10">
              <p className="text-lg tracking-widest font-semibold">
                **** **** **** 1234
              </p>
              <div className="flex justify-between text-sm mt-2">
                <span>RUIXEN UI</span>
                <span>12/28</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dialog Header */}
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl">Activate Your Virtual Card</DialogTitle>
          <DialogDescription>
            Enter the activation code to enable your digital card for use.
          </DialogDescription>
        </DialogHeader>

        {/* Input */}
        <div className="grid gap-4 px-6">
          <Input
            id="activation-code"
            placeholder="enter activation code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={isProcessing}
            className="h-10 text-base"
          />
        </div>

        {/* Footer */}
        <DialogFooter className="p-6 pt-4 bg-muted/50 rounded-b-lg">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            onClick={handleActivateClick}
            disabled={!code || isProcessing}
          >
            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isProcessing ? "Activating..." : "Activate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


code.demo.1759040617713.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { CreditCardDialog } from "@/components/ui/credit-card-dialog";

export default function CreditDemo() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleActivate = (code: string): Promise<void> => {
    console.log(`Verifying activation code: ${code}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("✅ Card activated successfully!");
        setIsDialogOpen(false);
        resolve();
      }, 2000);
    });
  };

  return (
    <div className="flex min-h-[350px] w-full items-center justify-center">
      <Button onClick={() => setIsDialogOpen(true)}>Activate Card</Button>

      <CreditCardDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onActivate={handleActivate}
      />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/credit-card-dialog.tsx
"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface CreditCardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActivate: (code: string) => Promise<void>;
  backgroundImage?: string;
}

export function CreditCardDialog({
  open,
  onOpenChange,
  onActivate,
  backgroundImage = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_gradient.jpeg",
}: CreditCardDialogProps) {
  const [code, setCode] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleActivateClick = async () => {
    if (!code) return;
    setIsProcessing(true);
    try {
      await onActivate(code);
    } finally {
      setIsProcessing(false);
    }
  };

  React.useEffect(() => {
    if (!open) {
      setCode("");
      setIsProcessing(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] p-0">
        {/* Credit Card */}
        <div className="flex items-center justify-center pt-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
              "relative h-48 w-80 rounded-2xl p-6 shadow-2xl text-white flex flex-col justify-between bg-cover bg-center"
            )}
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black/40 rounded-2xl" />

            {/* Card content */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="h-8 w-12 bg-yellow-400 rounded-sm" /> {/* chip */}
              <p className="text-sm font-medium tracking-wider">VIRTUAL CARD</p>
            </div>

            <div className="relative z-10">
              <p className="text-lg tracking-widest font-semibold">
                **** **** **** 1234
              </p>
              <div className="flex justify-between text-sm mt-2">
                <span>RUIXEN UI</span>
                <span>12/28</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dialog Header */}
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl">Activate Your Virtual Card</DialogTitle>
          <DialogDescription>
            Enter the activation code to enable your digital card for use.
          </DialogDescription>
        </DialogHeader>

        {/* Input */}
        <div className="grid gap-4 px-6">
          <Input
            id="activation-code"
            placeholder="enter activation code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={isProcessing}
            className="h-10 text-base"
          />
        </div>

        {/* Footer */}
        <DialogFooter className="p-6 pt-4 bg-muted/50 rounded-b-lg">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            onClick={handleActivateClick}
            disabled={!code || isProcessing}
          >
            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isProcessing ? "Activating..." : "Activate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

```

Install NPM dependencies:
```bash
lucide-react, framer-motion
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
