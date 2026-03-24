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
author-form-card.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { Plus, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Required shadcn/ui components ---
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// --- Component Props Interface ---
interface AuthorFormCardProps {
  initialData?: {
    name: string;
    title: string;
    imageUrl?: string;
  };
  onSubmit: (data: { name: string; title:string; imageUrl?: string }) => void;
  onCancel: () => void;
  className?: string;
}

// --- Main Component ---
export const AuthorFormCard: React.FC<AuthorFormCardProps> = ({
  initialData,
  onSubmit,
  onCancel,
  className,
}) => {
  const [name, setName] = React.useState(initialData?.name || "");
  const [title, setTitle] = React.useState(initialData?.title || "");
  const [imageUrl, setImageUrl] = React.useState<string | undefined>(initialData?.imageUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, title, imageUrl });
  };

  // --- Animation Variants for Framer Motion ---
  const FADE_IN_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      className={cn(
        "relative w-full max-w-lg rounded-xl bg-background p-6 shadow-xl",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <motion.h3 variants={FADE_IN_VARIANTS} className="text-xl font-semibold text-foreground">
          Add a writer
        </motion.h3>
        <Button variant="ghost" size="icon" onClick={onCancel} aria-label="Close">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* --- Image Upload Section --- */}
        <motion.div variants={FADE_IN_VARIANTS} className="flex flex-col items-center gap-3 md:col-span-1">
          <div className="relative">
            <Avatar className="h-24 w-24 border-2 border-dashed border-border">
              <AvatarImage src={imageUrl} alt={name || "Author"} />
              <AvatarFallback className="bg-muted">
                <span className="text-xs text-muted-foreground">Image</span>
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border bg-background transition-colors hover:bg-muted"
              aria-label="Upload Image"
            >
              <Plus className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Upload Image</p>
            <p className="text-xs text-muted-foreground">Max file size: 1MB</p>
          </div>
          <Button type="button" variant="outline" size="sm" className="w-full">
            Add Image
          </Button>
        </motion.div>

        {/* --- Form Fields Section --- */}
        <div className="flex flex-col gap-4 md:col-span-2">
          <motion.div variants={FADE_IN_VARIANTS} className="grid w-full items-center gap-1.5">
            <Label htmlFor="author-name">
              Author name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="author-name"
              placeholder="James Brown"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </motion.div>
          <motion.div variants={FADE_IN_VARIANTS} className="grid w-full items-center gap-1.5">
            <div className="flex items-center gap-1">
              <Label htmlFor="title">Title</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 cursor-pointer text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>The author's role or position.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              type="text"
              id="title"
              placeholder="Marketing Manager"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </motion.div>
        </div>

        {/* --- Form Actions --- */}
        <motion.div variants={FADE_IN_VARIANTS} className="flex justify-end gap-3 md:col-span-3">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

code.demo.1758934910257.tsx
import { AuthorFormCard } from "@/components/ui/author-form-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toaster, toast } from "sonner";

export default function AuthorFormCardDemo() {
  const handleFormSubmit = (data: { name: string; title: string, imageUrl?: string }) => {
    console.log("Form submitted:", data);
    toast.success(`Author "${data.name}" has been saved!`);
    // Here you would typically close the dialog and refresh data
  };

  const handleCancel = () => {
    console.log("Form cancelled");
    toast.info("Action was cancelled.");
  };
  
  // An example of initial data for an "edit" scenario
  const existingAuthor = {
    name: "Jane Doe",
    title: "Lead Developer",
    imageUrl: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-odeolBZIWJQnTXTfGgQL4zl9csbXnl.png&w=320&q=75", // Replace with your image src
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add New Writer</Button>
        </DialogTrigger>
        <DialogContent className="p-0 bg-transparent border-none shadow-none w-full max-w-lg">
          {/* The `AuthorFormCard` is self-contained. 
            Pass the onSubmit and onCancel handlers as props.
          */}
          <AuthorFormCard
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
            // Uncomment the line below to see the "edit" state
            // initialData={existingAuthor} 
          />
        </DialogContent>
      </Dialog>
      <Toaster position="top-right" richColors />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/author-form-card.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { Plus, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Required shadcn/ui components ---
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// --- Component Props Interface ---
interface AuthorFormCardProps {
  initialData?: {
    name: string;
    title: string;
    imageUrl?: string;
  };
  onSubmit: (data: { name: string; title:string; imageUrl?: string }) => void;
  onCancel: () => void;
  className?: string;
}

// --- Main Component ---
export const AuthorFormCard: React.FC<AuthorFormCardProps> = ({
  initialData,
  onSubmit,
  onCancel,
  className,
}) => {
  const [name, setName] = React.useState(initialData?.name || "");
  const [title, setTitle] = React.useState(initialData?.title || "");
  const [imageUrl, setImageUrl] = React.useState<string | undefined>(initialData?.imageUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, title, imageUrl });
  };

  // --- Animation Variants for Framer Motion ---
  const FADE_IN_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      className={cn(
        "relative w-full max-w-lg rounded-xl bg-background p-6 shadow-xl",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <motion.h3 variants={FADE_IN_VARIANTS} className="text-xl font-semibold text-foreground">
          Add a writer
        </motion.h3>
        <Button variant="ghost" size="icon" onClick={onCancel} aria-label="Close">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* --- Image Upload Section --- */}
        <motion.div variants={FADE_IN_VARIANTS} className="flex flex-col items-center gap-3 md:col-span-1">
          <div className="relative">
            <Avatar className="h-24 w-24 border-2 border-dashed border-border">
              <AvatarImage src={imageUrl} alt={name || "Author"} />
              <AvatarFallback className="bg-muted">
                <span className="text-xs text-muted-foreground">Image</span>
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border bg-background transition-colors hover:bg-muted"
              aria-label="Upload Image"
            >
              <Plus className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Upload Image</p>
            <p className="text-xs text-muted-foreground">Max file size: 1MB</p>
          </div>
          <Button type="button" variant="outline" size="sm" className="w-full">
            Add Image
          </Button>
        </motion.div>

        {/* --- Form Fields Section --- */}
        <div className="flex flex-col gap-4 md:col-span-2">
          <motion.div variants={FADE_IN_VARIANTS} className="grid w-full items-center gap-1.5">
            <Label htmlFor="author-name">
              Author name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="author-name"
              placeholder="James Brown"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </motion.div>
          <motion.div variants={FADE_IN_VARIANTS} className="grid w-full items-center gap-1.5">
            <div className="flex items-center gap-1">
              <Label htmlFor="title">Title</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 cursor-pointer text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>The author's role or position.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              type="text"
              id="title"
              placeholder="Marketing Manager"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </motion.div>
        </div>

        {/* --- Form Actions --- */}
        <motion.div variants={FADE_IN_VARIANTS} className="flex justify-end gap-3 md:col-span-3">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </motion.div>
      </form>
    </motion.div>
  );
};
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
