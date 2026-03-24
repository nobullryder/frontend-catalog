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
responsive-modal.tsx
"use client";

import { Loader } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface BaseProps {
  children: React.ReactNode;
}

interface RootProps extends BaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface ChildProps extends BaseProps {
  className?: string;
  asChild?: true;
}

interface FooterProps {
  isPending?: boolean;
  submitLabel: string;
  className?: string;
  asChild?: true;
  /** Optional target form id when the footer is rendered outside the actual <form>. */
  formId?: string;
}

// Context
const ModalContext = React.createContext<{ isDesktop: boolean }>({
  isDesktop: false,
});

const useModalContext = () => {
  const context = React.useContext(ModalContext);
  if (!context) throw new Error("Modal components must be inside <Modal.Root>");
  return context;
};

// Root
const ModalRoot = ({ children, ...props }: RootProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const Component = isDesktop ? Dialog : Drawer;

  return (
    <ModalContext.Provider value={{ isDesktop }}>
      <Component {...props} {...(!isDesktop && { autoFocus: true })}>
        {children}
      </Component>
    </ModalContext.Provider>
  );
};

// Subcomponents
const ModalTrigger = ({ className, children, ...props }: ChildProps) => {
  const { isDesktop } = useModalContext();
  const Component = isDesktop ? DialogTrigger : DrawerTrigger;
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

const ModalClose = ({ className, children, ...props }: ChildProps) => {
  const { isDesktop } = useModalContext();
  const Component = isDesktop ? DialogClose : DrawerClose;
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

const ModalContent = ({ className, children, ...props }: ChildProps) => {
  const { isDesktop } = useModalContext();
  const Component = isDesktop ? DialogContent : DrawerContent;

  return (
    <Component
      className={cn("p-0 overflow-hidden gap-0", className)}
      {...props}
    >
      {children}
    </Component>
  );
};

const ModalDescription = ({ className, children, ...props }: ChildProps) => {
  const { isDesktop } = useModalContext();
  const Component = isDesktop ? DialogDescription : DrawerDescription;
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

const ModalHeader = ({ className, children, ...props }: ChildProps) => {
  const { isDesktop } = useModalContext();
  const Component = isDesktop ? DialogHeader : DrawerHeader;
  return (
    <Component
      className={cn(
        "px-4 pt-3",
        isDesktop ? "" : "border-b shadow-xs",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

const ModalTitle = ({ className, children, ...props }: ChildProps) => {
  const { isDesktop } = useModalContext();
  const Component = isDesktop ? DialogTitle : DrawerTitle;
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

// Body (scrollable)
const ModalBody = ({
  className,
  bodyClassName,
  children,
  ...props
}: ChildProps & {
  bodyClassName?: string;
}) => {
  const { isDesktop } = useModalContext();
  return (
    <div
      className={cn(
        "flex flex-col relative overflow-hidden",
        isDesktop && "max-h-[75dvh] xl:max-h-[90dvh]",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "faded-bottom flex-1 overflow-auto px-4 pt-2 pb-8",
          bodyClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
};

const ModalFooter = ({ className, children, ...props }: ChildProps) => {
  const { isDesktop } = useModalContext();
  const Component = isDesktop ? DialogFooter : DrawerFooter;
  return (
    <Component
      className={cn("flex gap-2 bg-background px-4", className)}
      {...props}
    >
      {children}
    </Component>
  );
};

// Footer with cancel + submit loader
const ModalFormFooter = ({
  isPending,
  submitLabel,
  className,
  formId,
}: FooterProps) => {
  const { isDesktop } = useModalContext();
  const CancelWrapper = isDesktop ? DialogClose : DrawerClose;

  return (
    <div
      className={cn(
        "flex justify-between gap-2  bg-background px-4 pb-3 pt-3 md:pt-0",
        isDesktop ? "" : "border-t",
        className,
      )}
    >
      <CancelWrapper asChild>
        <Button type="button" variant="destructive">
          Cancel
        </Button>
      </CancelWrapper>

      <Button
        type="submit"
        disabled={isPending}
        className="gap-1.5 flex-1"
        {...(formId && { form: formId })}
      >
        {isPending && (
          <Loader className="size-4 animate-spin" aria-hidden="true" />
        )}
        {submitLabel}
      </Button>
    </div>
  );
};

// -----------------------------
// Export grouped
// -----------------------------
export const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Close: ModalClose,
  Content: ModalContent,
  Description: ModalDescription,
  Header: ModalHeader,
  Title: ModalTitle,
  Body: ModalBody,
  Footer: ModalFooter,
  FormFooter: ModalFormFooter, // optional ready-made footer
};


code.demo.1756353074763.tsx
"use client";

import React, { useTransition } from "react";
import { Modal } from "@/components/ui/responsive-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DemoOne() {
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = useTransition();

  // controlled select value
  const [platform, setPlatform] = React.useState<string>("");


  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 
startTransition(async()=>{
    // fake API delay
    await new Promise((res) => setTimeout(res, 3500));
    setOpen(false);
})
  };

  return (
    <>
      <div>
        <Button
          className="h-6 px-2 mt-2"
          size="sm"
          onClick={() => setOpen(true)}
        >
          Open Modal
        </Button>
      </div>

  <Modal.Root open={open} onOpenChange={setOpen}>
    
      <Modal.Content>
        <form id="demo-form" onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title>Example Modal</Modal.Title>
            <Modal.Description>
              This modal adapts between desktop (Dialog) and mobile (Drawer).
            </Modal.Description>
          </Modal.Header>

          <Modal.Body>
            <p className="text-sm text-muted-foreground">
              You can put any content here — inputs, text, or custom UI.
            </p>
          </Modal.Body>
        </form>

        {/* Ready-made footer with Cancel + Submit */}
        <Modal.FormFooter
          formId="demo-form"
          isPending={isPending}
          submitLabel="Save Changes"
        />
      </Modal.Content>
    </Modal.Root>
    </>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/responsive-modal.tsx
"use client";

import { Loader } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface BaseProps {
  children: React.ReactNode;
}

interface RootProps extends BaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface ChildProps extends BaseProps {
  className?: string;
  asChild?: true;
}

interface FooterProps {
  isPending?: boolean;
  submitLabel: string;
  className?: string;
  asChild?: true;
  /** Optional target form id when the footer is rendered outside the actual <form>. */
  formId?: string;
}

// Context
const ModalContext = React.createContext<{ isDesktop: boolean }>({
  isDesktop: false,
});

const useModalContext = () => {
  const context = React.useContext(ModalContext);
  if (!context) throw new Error("Modal components must be inside <Modal.Root>");
  return context;
};

// Root
const ModalRoot = ({ children, ...props }: RootProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const Component = isDesktop ? Dialog : Drawer;

  return (
    <ModalContext.Provider value={{ isDesktop }}>
      <Component {...props} {...(!isDesktop && { autoFocus: true })}>
        {children}
      </Component>
    </ModalContext.Provider>
  );
};

// Subcomponents
const ModalTrigger = ({ className, children, ...props }: ChildProps) => {
  const { isDesktop } = useModalContext();
  const Component = isDesktop ? DialogTrigger : DrawerTrigger;
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

const ModalClose = ({ className, children, ...props }: ChildProps) => {
  const { isDesktop } = useModalContext();
  const Component = isDesktop ? DialogClose : DrawerClose;
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

const ModalContent = ({ className, children, ...props }: ChildProps) => {
  const { isDesktop } = useModalContext();
  const Component = isDesktop ? DialogContent : DrawerContent;

  return (
    <Component
      className={cn("p-0 overflow-hidden gap-0", className)}
      {...props}
    >
      {children}
    </Component>
  );
};

const ModalDescription = ({ className, children, ...props }: ChildProps) => {
  const { isDesktop } = useModalContext();
  const Component = isDesktop ? DialogDescription : DrawerDescription;
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

const ModalHeader = ({ className, children, ...props }: ChildProps) => {
  const { isDesktop } = useModalContext();
  const Component = isDesktop ? DialogHeader : DrawerHeader;
  return (
    <Component
      className={cn(
        "px-4 pt-3",
        isDesktop ? "" : "border-b shadow-xs",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

const ModalTitle = ({ className, children, ...props }: ChildProps) => {
  const { isDesktop } = useModalContext();
  const Component = isDesktop ? DialogTitle : DrawerTitle;
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

// Body (scrollable)
const ModalBody = ({
  className,
  bodyClassName,
  children,
  ...props
}: ChildProps & {
  bodyClassName?: string;
}) => {
  const { isDesktop } = useModalContext();
  return (
    <div
      className={cn(
        "flex flex-col relative overflow-hidden",
        isDesktop && "max-h-[75dvh] xl:max-h-[90dvh]",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "faded-bottom flex-1 overflow-auto px-4 pt-2 pb-8",
          bodyClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
};

const ModalFooter = ({ className, children, ...props }: ChildProps) => {
  const { isDesktop } = useModalContext();
  const Component = isDesktop ? DialogFooter : DrawerFooter;
  return (
    <Component
      className={cn("flex gap-2 bg-background px-4", className)}
      {...props}
    >
      {children}
    </Component>
  );
};

// Footer with cancel + submit loader
const ModalFormFooter = ({
  isPending,
  submitLabel,
  className,
  formId,
}: FooterProps) => {
  const { isDesktop } = useModalContext();
  const CancelWrapper = isDesktop ? DialogClose : DrawerClose;

  return (
    <div
      className={cn(
        "flex justify-between gap-2  bg-background px-4 pb-3 pt-3 md:pt-0",
        isDesktop ? "" : "border-t",
        className,
      )}
    >
      <CancelWrapper asChild>
        <Button type="button" variant="destructive">
          Cancel
        </Button>
      </CancelWrapper>

      <Button
        type="submit"
        disabled={isPending}
        className="gap-1.5 flex-1"
        {...(formId && { form: formId })}
      >
        {isPending && (
          <Loader className="size-4 animate-spin" aria-hidden="true" />
        )}
        {submitLabel}
      </Button>
    </div>
  );
};

// -----------------------------
// Export grouped
// -----------------------------
export const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Close: ModalClose,
  Content: ModalContent,
  Description: ModalDescription,
  Header: ModalHeader,
  Title: ModalTitle,
  Body: ModalBody,
  Footer: ModalFooter,
  FormFooter: ModalFormFooter, // optional ready-made footer
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
