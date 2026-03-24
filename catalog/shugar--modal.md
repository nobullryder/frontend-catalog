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
modal.tsx
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Button, ButtonProps } from "@/components/ui/button-1";
import clsx from "clsx";
import { Drawer } from "@/components/ui/drawer";
import { Material } from "@/components/ui/material-1";
import useBreakpoints from "@/components/ui/use-breakpoints";

interface ModalProps {
  active: boolean;
  onClickOutside: () => void;
  children: React.ReactNode;
  sticky?: boolean;
  initialFocusRef?: React.RefObject<HTMLButtonElement> | React.RefObject<null>;
}

interface ModalBodyProps {
  children: React.ReactNode;
  sticky?: boolean;
  className?: string;
}

interface ModalHeaderProps {
  children: React.ReactNode;
  sticky?: boolean;
}

const ModalModal = ({ active, onClickOutside, children, sticky, initialFocusRef }: ModalProps) => {
  const focusRef = useRef<HTMLButtonElement | null>(null);
  const { isMobile, isDesktop } = useBreakpoints();

  useLayoutEffect(() => {
    if (active) {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else {
        if (focusRef.current) {
          focusRef.current.focus();
        }
      }
    }
  }, [active, initialFocusRef?.current]);

  useEffect(() => {
    if (!active) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClickOutside();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, onClickOutside]);

  const childrenArray = React.Children.toArray(children);

  const footer = childrenArray.find(
    (child) =>
      React.isValidElement(child) &&
      child.type === ModalActions
  );

  const enhancedFooter = React.isValidElement<{ children: React.ReactNode }>(footer)
    ? React.cloneElement(footer, {
      children: React.Children.map(footer.props.children, (child, index) => {
        if (index === 0 && React.isValidElement<ButtonProps>(child)) {
          return React.cloneElement(child, {
            ref: focusRef
          });
        }
        return child;
      })
    })
    : null;

  return (
    <>
      {isMobile && (
        <Drawer onDismiss={onClickOutside} show={active}>
          {React.Children.map(children, (child) =>
            (child as React.ReactElement)?.type === Modal.Body
              ? React.cloneElement(child as React.ReactElement<ModalBodyProps>, { sticky })
              : child
          )}
        </Drawer>
      )}
      {isDesktop && (
        <div
          className={clsx(
            "fixed inset-0 flex items-center justify-center z-[99999] duration-300",
            active ? "bg-background-200-alpha-800" : "bg-transparent pointer-events-none"
          )}
          onClick={onClickOutside}
        >
          <Material
            type="modal"
            className={clsx(
              "flex flex-col font-sans text-gray-1000 w-[540px] max-h-[min(800px,_80vh)] overflow-y-auto duration-300",
              active ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {React.Children.map(children, (child) =>
              (child as React.ReactElement)?.type === Modal.Body
                ? React.cloneElement(child as React.ReactElement<ModalBodyProps>, { sticky })
                : ((child as React.ReactElement)?.type === ModalActions && !initialFocusRef) ? enhancedFooter : child
            )}
          </Material>
        </div>
      )}
    </>
  );
};

const ModalBody = ({ children, sticky, className }: ModalBodyProps) => (
  <div className={clsx("overflow-y-auto text-sm", sticky ? "px-6 pb-6" : "p-6", className)}>
    {React.Children.map(children, (child) =>
      (child as React.ReactElement)?.type === Modal.Header
        ? React.cloneElement(child as React.ReactElement<ModalHeaderProps>, { sticky })
        : child
    )}
  </div>
);
const ModalHeader = ({ children, sticky }: ModalHeaderProps) => (
  <header className={clsx(
    "mb-6 rounded-t-xl", sticky && "sticky top-0 bg-background-200 border-b border-gray-alpha-400 pt-5 px-6 -mx-6"
  )}>
    {children}
  </header>
);
const ModalInset = ({ children }: { children: React.ReactNode }) => (
  <div className="-mx-6 p-6 border-b border-t border-accents-2 bg-accents-1">{children}</div>
);
const ModalTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-6 text-2xl font-semibold tracking-[-0.029375rem]">{children}</h2>
);
const ModalSubtitle = ({ children }: { children: React.ReactNode }) => (
  <p className="text-base">{children}</p>
);
const ModalActions = ({ children }: { children: React.ReactNode }) => (
  <footer className="sticky bottom-0 p-4 flex justify-between shrink-0 bg-background-200 inset-0 border-t border-gray-alpha-400 rounded-b-xl">
    {children}
  </footer>
);
const ModalAction = (props: ButtonProps) => <Button {...props}>{props.children}</Button>;

export const Modal = {
  Modal: ModalModal,
  Header: ModalHeader,
  Inset: ModalInset,
  Body: ModalBody,
  Title: ModalTitle,
  Subtitle: ModalSubtitle,
  Actions: ModalActions,
  Action: ModalAction
};


code.demo.1752056473032.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button-1";
import { Modal } from "@/components/ui/modal";

export default function DefaultDemo() {
  const [open1, setOpen1] = useState(false);
  return (
        <div>
          <Button onClick={() => setOpen1(true)} size="small">
            Open Modal
          </Button>

          <Modal.Modal active={open1} onClickOutside={() => setOpen1(false)}>
            <Modal.Body>
              <Modal.Header>
                <Modal.Title>Create Token</Modal.Title>
                <Modal.Subtitle>
                  Enter a unique name for your token to differentiate it from other
                  tokens and then select the scope.
                </Modal.Subtitle>
              </Modal.Header>

              <div className="font-sans text-sm text-[#171717] dark:text-[#ededed]">
                Some content contained within the modal.
              </div>
            </Modal.Body>

            <Modal.Actions>
              <Modal.Action onClick={() => setOpen1(false)} type="secondary">
                Cancel
              </Modal.Action>

              <Modal.Action onClick={() => setOpen1(false)}>Submit</Modal.Action>
            </Modal.Actions>
          </Modal.Modal>
        </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/modal.tsx
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Button, ButtonProps } from "@/components/ui/button-1";
import clsx from "clsx";
import { Drawer } from "@/components/ui/drawer";
import { Material } from "@/components/ui/material-1";
import useBreakpoints from "@/components/ui/use-breakpoints";

interface ModalProps {
  active: boolean;
  onClickOutside: () => void;
  children: React.ReactNode;
  sticky?: boolean;
  initialFocusRef?: React.RefObject<HTMLButtonElement> | React.RefObject<null>;
}

interface ModalBodyProps {
  children: React.ReactNode;
  sticky?: boolean;
  className?: string;
}

interface ModalHeaderProps {
  children: React.ReactNode;
  sticky?: boolean;
}

const ModalModal = ({ active, onClickOutside, children, sticky, initialFocusRef }: ModalProps) => {
  const focusRef = useRef<HTMLButtonElement | null>(null);
  const { isMobile, isDesktop } = useBreakpoints();

  useLayoutEffect(() => {
    if (active) {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else {
        if (focusRef.current) {
          focusRef.current.focus();
        }
      }
    }
  }, [active, initialFocusRef?.current]);

  useEffect(() => {
    if (!active) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClickOutside();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, onClickOutside]);

  const childrenArray = React.Children.toArray(children);

  const footer = childrenArray.find(
    (child) =>
      React.isValidElement(child) &&
      child.type === ModalActions
  );

  const enhancedFooter = React.isValidElement<{ children: React.ReactNode }>(footer)
    ? React.cloneElement(footer, {
      children: React.Children.map(footer.props.children, (child, index) => {
        if (index === 0 && React.isValidElement<ButtonProps>(child)) {
          return React.cloneElement(child, {
            ref: focusRef
          });
        }
        return child;
      })
    })
    : null;

  return (
    <>
      {isMobile && (
        <Drawer onDismiss={onClickOutside} show={active}>
          {React.Children.map(children, (child) =>
            (child as React.ReactElement)?.type === Modal.Body
              ? React.cloneElement(child as React.ReactElement<ModalBodyProps>, { sticky })
              : child
          )}
        </Drawer>
      )}
      {isDesktop && (
        <div
          className={clsx(
            "fixed inset-0 flex items-center justify-center z-[99999] duration-300",
            active ? "bg-background-200-alpha-800" : "bg-transparent pointer-events-none"
          )}
          onClick={onClickOutside}
        >
          <Material
            type="modal"
            className={clsx(
              "flex flex-col font-sans text-gray-1000 w-[540px] max-h-[min(800px,_80vh)] overflow-y-auto duration-300",
              active ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {React.Children.map(children, (child) =>
              (child as React.ReactElement)?.type === Modal.Body
                ? React.cloneElement(child as React.ReactElement<ModalBodyProps>, { sticky })
                : ((child as React.ReactElement)?.type === ModalActions && !initialFocusRef) ? enhancedFooter : child
            )}
          </Material>
        </div>
      )}
    </>
  );
};

const ModalBody = ({ children, sticky, className }: ModalBodyProps) => (
  <div className={clsx("overflow-y-auto text-sm", sticky ? "px-6 pb-6" : "p-6", className)}>
    {React.Children.map(children, (child) =>
      (child as React.ReactElement)?.type === Modal.Header
        ? React.cloneElement(child as React.ReactElement<ModalHeaderProps>, { sticky })
        : child
    )}
  </div>
);
const ModalHeader = ({ children, sticky }: ModalHeaderProps) => (
  <header className={clsx(
    "mb-6 rounded-t-xl", sticky && "sticky top-0 bg-background-200 border-b border-gray-alpha-400 pt-5 px-6 -mx-6"
  )}>
    {children}
  </header>
);
const ModalInset = ({ children }: { children: React.ReactNode }) => (
  <div className="-mx-6 p-6 border-b border-t border-accents-2 bg-accents-1">{children}</div>
);
const ModalTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-6 text-2xl font-semibold tracking-[-0.029375rem]">{children}</h2>
);
const ModalSubtitle = ({ children }: { children: React.ReactNode }) => (
  <p className="text-base">{children}</p>
);
const ModalActions = ({ children }: { children: React.ReactNode }) => (
  <footer className="sticky bottom-0 p-4 flex justify-between shrink-0 bg-background-200 inset-0 border-t border-gray-alpha-400 rounded-b-xl">
    {children}
  </footer>
);
const ModalAction = (props: ButtonProps) => <Button {...props}>{props.children}</Button>;

export const Modal = {
  Modal: ModalModal,
  Header: ModalHeader,
  Inset: ModalInset,
  Body: ModalBody,
  Title: ModalTitle,
  Subtitle: ModalSubtitle,
  Actions: ModalActions,
  Action: ModalAction
};

```

Install NPM dependencies:
```bash
clsx
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
