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
file-transfer-card.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Info, Laptop, Lock, Phone, Wifi } from "lucide-react";

// Define the props interface for type-safety and reusability
export interface FileTransferCardProps {
  /** The current status of the transfer */
  status: "in-progress" | "paused" | "completed" | "connecting";
  /** The current progress percentage (0-100) */
  progress: number;
  /** Details of the source device */
  sourceDevice: {
    name: string;
    type: "phone" | "laptop";
  };
  /** Details of the destination device */
  destinationDevice: {
    name: string;
    type: "phone" | "laptop";
  };
  /** Estimated time remaining for the transfer */
  estimatedTime: string;
  /** Current transfer speed */
  transferRate: string;
  /** A summary of the file types being transferred */
  fileTypes: string;
  /** The total size of the files */
  totalFileSize: string;
  /** Callback function for the cancel action */
  onCancel: () => void;
  /** Callback function for the pause/resume action */
  onTogglePause: () => void;
}

// Helper to render the correct device icon
const DeviceIcon = ({ type, className }: { type: "phone" | "laptop"; className?: string }) => {
  const iconClasses = cn("h-10 w-10 text-muted-foreground", className);
  if (type === "laptop") {
    return <Laptop className={iconClasses} />;
  }
  return <Phone className={iconClasses} />;
};

// The main component
export const FileTransferCard = ({
  status,
  progress,
  sourceDevice,
  destinationDevice,
  estimatedTime,
  transferRate,
  fileTypes,
  totalFileSize,
  onCancel,
  onTogglePause,
}: FileTransferCardProps) => {
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <CardHeader>
        <CardTitle className="text-center text-lg font-semibold">
          Smart WiFi Transfer
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        {/* Device Info Section */}
        <div className="flex items-center justify-between gap-2 text-center text-sm mb-8">
          <div className="flex flex-col items-center gap-2">
            <DeviceIcon type={sourceDevice.type} />
            <span className="text-muted-foreground text-xs">Sending from</span>
            <p className="font-medium">{sourceDevice.name}</p>
          </div>
          <div className="flex items-center gap-1 text-primary pt-2">
            <Wifi className="h-5 w-5" />
            {/* Animated connecting dots */}
            <span className="h-1 w-1 bg-primary rounded-full animate-pulse [animation-delay:-0.3s]"></span>
            <span className="h-1 w-1 bg-primary rounded-full animate-pulse [animation-delay:-0.15s]"></span>
            <span className="h-1 w-1 bg-primary rounded-full animate-pulse"></span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <DeviceIcon type={destinationDevice.type} />
            <span className="text-muted-foreground text-xs">Sending to</span>
            <p className="font-medium">{destinationDevice.name}</p>
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="mb-6">
          <h3 className="text-center font-medium mb-2">Transfer progress</h3>
          <Progress value={progress} className="h-2 w-full" />
          <p className="text-center text-muted-foreground text-sm mt-2">
            Your file transfer is {progress}% completed
          </p>
        </div>

        {/* Transfer Details Section */}
        <Card className="bg-muted/50">
          <CardHeader className="flex-row items-center space-x-2 py-3">
            <Info className="h-4 w-4" />
            <CardTitle className="text-base font-semibold">
              Transfer Details
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3 pb-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Time Remaining</span>
              <span className="font-medium">{estimatedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transfer Rate (Speed)</span>
              <span className="font-medium">{transferRate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">File types</span>
              <span className="font-medium">{fileTypes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total File Size</span>
              <span className="font-medium">{totalFileSize}</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons Section */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button variant="outline" onClick={onCancel} disabled={status === 'completed'}>
            Cancel
          </Button>
          <Button onClick={onTogglePause} disabled={status === 'completed'}>
            {status === "paused" ? "Resume" : "Pause"}
          </Button>
        </div>

        {/* Security Footer */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs mt-6">
          <Lock className="h-3 w-3" />
          <span>Your transfer is encrypted and secure</span>
        </div>
      </CardContent>
    </Card>
  );
};

code.demo.1760168079902.tsx
import React, { useState, useEffect, useCallback } from "react";
import { FileTransferCard } from "@/components/ui/file-transfer-card";

// Main demo component to showcase the FileTransferCard
const FileTransferCardDemo = () => {
  // State management for the transfer simulation
  const [progress, setProgress] = useState(20);
  const [status, setStatus] = useState<"in-progress" | "paused" | "completed" | "connecting">("in-progress");
  const [timeLeft, setTimeLeft] = useState(12 * 60 + 54); // Initial time in seconds

  // Effect to simulate the file transfer progress
  useEffect(() => {
    if (status === "in-progress" && progress < 100) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1, 100));
        setTimeLeft((prev) => Math.max(prev - 1, 0));
      }, 500); // Update every 0.5 seconds

      return () => clearInterval(interval);
    } else if (progress >= 100) {
      setStatus("completed");
    }
  }, [status, progress]);

  // Handler for pausing and resuming the transfer
  const handleTogglePause = useCallback(() => {
    setStatus((prevStatus) => (prevStatus === "in-progress" ? "paused" : "in-progress"));
  }, []);

  // Handler for canceling the transfer
  const handleCancel = useCallback(() => {
    setStatus("paused");
    setProgress(0);
    setTimeLeft(0);
    // Here you would add logic to actually cancel the transfer
    console.log("Transfer canceled.");
  }, []);

  // Format the remaining time into a user-friendly string
  const formatTime = (seconds: number) => {
    if (status === 'completed') return "Completed";
    if (seconds <= 0) return "Calculating...";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}mins, ${secs}secs`;
  };

  return (
    <div className="w-full bg-background flex items-center justify-center p-4">
      <FileTransferCard
        status={status}
        progress={progress}
        sourceDevice={{ name: "Ravi's iPhone 17 Pro", type: "phone" }}
        destinationDevice={{ name: "Ravi's MacBook Pro", type: "laptop" }}
        estimatedTime={formatTime(timeLeft)}
        transferRate="20mb/Sec"
        fileTypes="3 Audio, 2 Video"
        totalFileSize="12GB"
        onCancel={handleCancel}
        onTogglePause={handleTogglePause}
      />
    </div>
  );
};

export default FileTransferCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/file-transfer-card.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Info, Laptop, Lock, Phone, Wifi } from "lucide-react";

// Define the props interface for type-safety and reusability
export interface FileTransferCardProps {
  /** The current status of the transfer */
  status: "in-progress" | "paused" | "completed" | "connecting";
  /** The current progress percentage (0-100) */
  progress: number;
  /** Details of the source device */
  sourceDevice: {
    name: string;
    type: "phone" | "laptop";
  };
  /** Details of the destination device */
  destinationDevice: {
    name: string;
    type: "phone" | "laptop";
  };
  /** Estimated time remaining for the transfer */
  estimatedTime: string;
  /** Current transfer speed */
  transferRate: string;
  /** A summary of the file types being transferred */
  fileTypes: string;
  /** The total size of the files */
  totalFileSize: string;
  /** Callback function for the cancel action */
  onCancel: () => void;
  /** Callback function for the pause/resume action */
  onTogglePause: () => void;
}

// Helper to render the correct device icon
const DeviceIcon = ({ type, className }: { type: "phone" | "laptop"; className?: string }) => {
  const iconClasses = cn("h-10 w-10 text-muted-foreground", className);
  if (type === "laptop") {
    return <Laptop className={iconClasses} />;
  }
  return <Phone className={iconClasses} />;
};

// The main component
export const FileTransferCard = ({
  status,
  progress,
  sourceDevice,
  destinationDevice,
  estimatedTime,
  transferRate,
  fileTypes,
  totalFileSize,
  onCancel,
  onTogglePause,
}: FileTransferCardProps) => {
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <CardHeader>
        <CardTitle className="text-center text-lg font-semibold">
          Smart WiFi Transfer
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        {/* Device Info Section */}
        <div className="flex items-center justify-between gap-2 text-center text-sm mb-8">
          <div className="flex flex-col items-center gap-2">
            <DeviceIcon type={sourceDevice.type} />
            <span className="text-muted-foreground text-xs">Sending from</span>
            <p className="font-medium">{sourceDevice.name}</p>
          </div>
          <div className="flex items-center gap-1 text-primary pt-2">
            <Wifi className="h-5 w-5" />
            {/* Animated connecting dots */}
            <span className="h-1 w-1 bg-primary rounded-full animate-pulse [animation-delay:-0.3s]"></span>
            <span className="h-1 w-1 bg-primary rounded-full animate-pulse [animation-delay:-0.15s]"></span>
            <span className="h-1 w-1 bg-primary rounded-full animate-pulse"></span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <DeviceIcon type={destinationDevice.type} />
            <span className="text-muted-foreground text-xs">Sending to</span>
            <p className="font-medium">{destinationDevice.name}</p>
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="mb-6">
          <h3 className="text-center font-medium mb-2">Transfer progress</h3>
          <Progress value={progress} className="h-2 w-full" />
          <p className="text-center text-muted-foreground text-sm mt-2">
            Your file transfer is {progress}% completed
          </p>
        </div>

        {/* Transfer Details Section */}
        <Card className="bg-muted/50">
          <CardHeader className="flex-row items-center space-x-2 py-3">
            <Info className="h-4 w-4" />
            <CardTitle className="text-base font-semibold">
              Transfer Details
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3 pb-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Time Remaining</span>
              <span className="font-medium">{estimatedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transfer Rate (Speed)</span>
              <span className="font-medium">{transferRate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">File types</span>
              <span className="font-medium">{fileTypes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total File Size</span>
              <span className="font-medium">{totalFileSize}</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons Section */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button variant="outline" onClick={onCancel} disabled={status === 'completed'}>
            Cancel
          </Button>
          <Button onClick={onTogglePause} disabled={status === 'completed'}>
            {status === "paused" ? "Resume" : "Pause"}
          </Button>
        </div>

        {/* Security Footer */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs mt-6">
          <Lock className="h-3 w-3" />
          <span>Your transfer is encrypted and secure</span>
        </div>
      </CardContent>
    </Card>
  );
};
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
