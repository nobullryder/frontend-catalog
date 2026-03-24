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
redeem.tsx
// components/ui/redeem-dialog.tsx

"use client";

import * as React from "react";
import { CreditCard, Loader2 } from "lucide-react";
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

// Added 'cardBackgroundImage' to the props interface
interface RedeemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRedeem: (code: string) => Promise<void>;
  cardBackgroundImage?: string; // Optional prop for the card background image
}

export function RedeemDialog({ 
  open, 
  onOpenChange, 
  onRedeem,
  cardBackgroundImage 
}: RedeemDialogProps) {
  const [code, setCode] = React.useState("");
  const [isRedeeming, setIsRedeeming] = React.useState(false);

  const handleRedeemClick = async () => {
    if (!code) return;
    setIsRedeeming(true);
    try {
      await onRedeem(code);
    } catch (error) {
      console.error("Redemption failed:", error);
    } finally {
      setIsRedeeming(false);
    }
  };

  React.useEffect(() => {
    if (!open) {
      setCode("");
      setIsRedeeming(false);
    }
  }, [open]);

  // Dynamic style for the card's background
  const cardStyle = cardBackgroundImage
    ? { backgroundImage: `url(${cardBackgroundImage})` }
    : {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0">
        <div className="flex items-center justify-center pt-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
              "relative h-40 w-64 rounded-xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden bg-cover bg-center",
              !cardBackgroundImage && "bg-gradient-to-br from-gray-900 to-black" // Fallback gradient
            )}
            style={cardStyle}
          >
            {/* Overlay to ensure text readability over any image */}
            <div className="absolute inset-0 bg-black/50 z-0" />
            
            <div className="relative z-10 flex justify-end">
              <CreditCard className="h-8 w-8 text-gray-300" />
            </div>
            <div className="relative z-10">
              <p className="text-sm font-medium text-gray-300">Gifted Credits</p>
              <p className="text-3xl font-bold text-white">$0.00</p>
            </div>
          </motion.div>
        </div>
        
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl">Redeem a Code</DialogTitle>
          <DialogDescription>
            Enter a valid code below to claim your free credits.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 px-6">
          <Input
            id="redeem-code"
            placeholder="canihavecredits"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={isRedeeming}
            className="h-10 text-base"
          />
        </div>

        <DialogFooter className="p-6 pt-4 bg-muted/50 rounded-b-lg">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)} 
            disabled={isRedeeming}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleRedeemClick} 
            disabled={!code || isRedeeming}
          >
            {isRedeeming && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isRedeeming ? "Verifying..." : "Redeem"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

code.demo.1758206243230.tsx
// demo.tsx

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { RedeemDialog } from "@/components/ui/redeem";

export default function RedeemDialogDemo() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  // A sample image URL for the card background
  const imageUrl = "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?q=80&w=1920&auto=format&fit=crop";

  // Mock function to simulate an API call for redeeming a code
  const handleRedeem = (code: string): Promise<void> => {
    console.log(`Verifying code: ${code}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Code verified successfully!");
        setIsDialogOpen(false); 
        resolve();
      }, 2000);
    });
  };

  return (
    <div className="flex min-h-[350px] w-full items-center justify-center">
      <Button onClick={() => setIsDialogOpen(true)}>
        Redeem Code
      </Button>

      {/* The RedeemDialog component with the new background image prop */}
      <RedeemDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onRedeem={handleRedeem}
        cardBackgroundImage={imageUrl}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/redeem.tsx
// components/ui/redeem-dialog.tsx

"use client";

import * as React from "react";
import { CreditCard, Loader2 } from "lucide-react";
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

// Added 'cardBackgroundImage' to the props interface
interface RedeemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRedeem: (code: string) => Promise<void>;
  cardBackgroundImage?: string; // Optional prop for the card background image
}

export function RedeemDialog({ 
  open, 
  onOpenChange, 
  onRedeem,
  cardBackgroundImage 
}: RedeemDialogProps) {
  const [code, setCode] = React.useState("");
  const [isRedeeming, setIsRedeeming] = React.useState(false);

  const handleRedeemClick = async () => {
    if (!code) return;
    setIsRedeeming(true);
    try {
      await onRedeem(code);
    } catch (error) {
      console.error("Redemption failed:", error);
    } finally {
      setIsRedeeming(false);
    }
  };

  React.useEffect(() => {
    if (!open) {
      setCode("");
      setIsRedeeming(false);
    }
  }, [open]);

  // Dynamic style for the card's background
  const cardStyle = cardBackgroundImage
    ? { backgroundImage: `url(${cardBackgroundImage})` }
    : {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0">
        <div className="flex items-center justify-center pt-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
              "relative h-40 w-64 rounded-xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden bg-cover bg-center",
              !cardBackgroundImage && "bg-gradient-to-br from-gray-900 to-black" // Fallback gradient
            )}
            style={cardStyle}
          >
            {/* Overlay to ensure text readability over any image */}
            <div className="absolute inset-0 bg-black/50 z-0" />
            
            <div className="relative z-10 flex justify-end">
              <CreditCard className="h-8 w-8 text-gray-300" />
            </div>
            <div className="relative z-10">
              <p className="text-sm font-medium text-gray-300">Gifted Credits</p>
              <p className="text-3xl font-bold text-white">$0.00</p>
            </div>
          </motion.div>
        </div>
        
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl">Redeem a Code</DialogTitle>
          <DialogDescription>
            Enter a valid code below to claim your free credits.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 px-6">
          <Input
            id="redeem-code"
            placeholder="canihavecredits"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={isRedeeming}
            className="h-10 text-base"
          />
        </div>

        <DialogFooter className="p-6 pt-4 bg-muted/50 rounded-b-lg">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)} 
            disabled={isRedeeming}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleRedeemClick} 
            disabled={!code || isRedeeming}
          >
            {isRedeeming && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isRedeeming ? "Verifying..." : "Redeem"}
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
