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
command-menu.tsx
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Modal } from "@/components/ui/modal";

const CommandMenuContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
  inputValue: string;
  onChangeInputValue: (value: string) => void;
} | null>(null);

interface CommandMenuRootProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}

const CommandMenuRoot = ({ open, setOpen, children }: CommandMenuRootProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <Modal.Modal active={open} onClickOutside={() => setOpen(false)}>
      <Modal.Body className="!p-0">
        <CommandMenuContext value={{
          open,
          setOpen,
          inputValue,
          onChangeInputValue: (value: string) => setInputValue(value)
        }}>
          {children}
        </CommandMenuContext>
      </Modal.Body>
    </Modal.Modal>
  );
};

interface CommandMenuInputProps {
  placeholder?: string;
}

const CommandMenuInput = ({ placeholder }: CommandMenuInputProps) => {
  const context = useContext(CommandMenuContext);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (context?.open) {
      ref.current?.focus();
    }
  }, [context?.open]);

  return (
    <div
      className="py-3 px-4 border-b border-gray-alpha-400 bg-background-100 flex items-center justify-between gap-3"
      onClick={() => ref?.current?.focus()}
    >
      <input
        ref={ref}
        placeholder={placeholder}
        value={context?.inputValue}
        onChange={(e) => context?.onChangeInputValue(e.target.value)}
        className="h-7 text-lg text-sans bg-transparent text-gray-1000 placeholder:text-gray-900 placeholder:opacity-70 border-none outline-0"
      />
      <button
        className="h-5 shadow-border rounded bg-background-100 text-xs border-none px-1 ml-auto hover:bg-gray-100 duration-200"
        onClick={() => context?.setOpen(false)}
      >
        Esc
      </button>
    </div>
  );
};

interface CommandMenuListProps {
  children: React.ReactNode;
}

const CommandMenuList = ({ children }: CommandMenuListProps) => {
  const context = useContext(CommandMenuContext);

  const filteredChildren = React.Children.toArray(children)
    .map((child) => {
      if (React.isValidElement<CommandMenuItemProps>(child) && child.type === CommandMenu.Item) {
        const text = child.props.children?.toString().toLowerCase() || "";
        return text.includes(context?.inputValue?.toLowerCase() || "") ? child : null;
      }

      if (React.isValidElement<CommandMenuGroupProps>(child) && child.type === CommandMenu.Group) {
        const groupChildren = React.Children.toArray(child.props.children);
        const filteredGroupChildren = groupChildren.filter((item) => {
          if (React.isValidElement<CommandMenuItemProps>(item) && item.type === CommandMenu.Item) {
            const text = item.props.children?.toString().toLowerCase() || "";
            return text.includes(context?.inputValue?.toLowerCase() || "");
          }
          return false;
        });

        if (filteredGroupChildren.length > 0) {
          return React.cloneElement(child, {
            children: filteredGroupChildren
          });
        }
      }

      return null;
    })
    .filter(Boolean);

  return (
    <div className="p-2 bg-background-100 overflow-y-auto duration-100">
      {filteredChildren.length > 0 ? filteredChildren : (
        <div className="py-[30px]">
          <p className="text-gray-900 text-sm text-center">
            No results found for <span className="text-gray-1000">"{context?.inputValue}"</span>.
          </p>
        </div>
      )}
    </div>
  );
};

interface CommandMenuItemProps {
  callback?: () => void;
  children: React.ReactNode;
}

const CommandMenuItem = ({ callback, children }: CommandMenuItemProps) => {
  const context = useContext(CommandMenuContext);

  const onClick = () => {
    context?.setOpen(false);
    if (callback) {
      callback();
    }
  };

  return (
    <div
      className="min-h-10 rounded-md flex items-center gap-3 px-2 text-sm font-sans cursor-pointer hover:bg-gray-alpha-100"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface CommandMenuGroupProps {
  heading: string;
  children: React.ReactNode;
}

const CommandMenuGroup = ({ heading, children }: CommandMenuGroupProps) => {
  return (
    <div>
      <div className="text-[13px] font-sans text-gray-900 h-10 flex items-center px-2">{heading}</div>
      {children}
    </div>
  );
};

export const CommandMenu = {
  Root: CommandMenuRoot,
  Input: CommandMenuInput,
  List: CommandMenuList,
  Item: CommandMenuItem,
  Group: CommandMenuGroup
};

code.demo.1752154497272.tsx
import { Button } from "@/components/ui/button-1";
import { CommandMenu } from "@/components/ui/command-menu";
import React, { useState } from "react";

export default function DefaultDemo() {
  const [open, setOpen] = useState<boolean>(false);

  function callback(): void {
    // no op
  }

  return (
    <>
        <Button onClick={() => setOpen(true)}>Open Command Menu</Button>
        <CommandMenu.Root open={open} setOpen={setOpen}>
          <CommandMenu.Input placeholder="What do you need?" />
          <CommandMenu.List>
            <CommandMenu.Item callback={callback}>Item 1</CommandMenu.Item>
            <CommandMenu.Item callback={callback}>Item 2</CommandMenu.Item>
            <CommandMenu.Item callback={callback}>Item 3</CommandMenu.Item>
            <CommandMenu.Group heading="Group 1">
              <CommandMenu.Item callback={callback}>
                Grouped Item 1
              </CommandMenu.Item>
              <CommandMenu.Item callback={callback}>
                Grouped Item 2
              </CommandMenu.Item>
            </CommandMenu.Group>
          </CommandMenu.List>
        </CommandMenu.Root>
    </>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/command-menu.tsx
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Modal } from "@/components/ui/modal";

const CommandMenuContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
  inputValue: string;
  onChangeInputValue: (value: string) => void;
} | null>(null);

interface CommandMenuRootProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}

const CommandMenuRoot = ({ open, setOpen, children }: CommandMenuRootProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <Modal.Modal active={open} onClickOutside={() => setOpen(false)}>
      <Modal.Body className="!p-0">
        <CommandMenuContext value={{
          open,
          setOpen,
          inputValue,
          onChangeInputValue: (value: string) => setInputValue(value)
        }}>
          {children}
        </CommandMenuContext>
      </Modal.Body>
    </Modal.Modal>
  );
};

interface CommandMenuInputProps {
  placeholder?: string;
}

const CommandMenuInput = ({ placeholder }: CommandMenuInputProps) => {
  const context = useContext(CommandMenuContext);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (context?.open) {
      ref.current?.focus();
    }
  }, [context?.open]);

  return (
    <div
      className="py-3 px-4 border-b border-gray-alpha-400 bg-background-100 flex items-center justify-between gap-3"
      onClick={() => ref?.current?.focus()}
    >
      <input
        ref={ref}
        placeholder={placeholder}
        value={context?.inputValue}
        onChange={(e) => context?.onChangeInputValue(e.target.value)}
        className="h-7 text-lg text-sans bg-transparent text-gray-1000 placeholder:text-gray-900 placeholder:opacity-70 border-none outline-0"
      />
      <button
        className="h-5 shadow-border rounded bg-background-100 text-xs border-none px-1 ml-auto hover:bg-gray-100 duration-200"
        onClick={() => context?.setOpen(false)}
      >
        Esc
      </button>
    </div>
  );
};

interface CommandMenuListProps {
  children: React.ReactNode;
}

const CommandMenuList = ({ children }: CommandMenuListProps) => {
  const context = useContext(CommandMenuContext);

  const filteredChildren = React.Children.toArray(children)
    .map((child) => {
      if (React.isValidElement<CommandMenuItemProps>(child) && child.type === CommandMenu.Item) {
        const text = child.props.children?.toString().toLowerCase() || "";
        return text.includes(context?.inputValue?.toLowerCase() || "") ? child : null;
      }

      if (React.isValidElement<CommandMenuGroupProps>(child) && child.type === CommandMenu.Group) {
        const groupChildren = React.Children.toArray(child.props.children);
        const filteredGroupChildren = groupChildren.filter((item) => {
          if (React.isValidElement<CommandMenuItemProps>(item) && item.type === CommandMenu.Item) {
            const text = item.props.children?.toString().toLowerCase() || "";
            return text.includes(context?.inputValue?.toLowerCase() || "");
          }
          return false;
        });

        if (filteredGroupChildren.length > 0) {
          return React.cloneElement(child, {
            children: filteredGroupChildren
          });
        }
      }

      return null;
    })
    .filter(Boolean);

  return (
    <div className="p-2 bg-background-100 overflow-y-auto duration-100">
      {filteredChildren.length > 0 ? filteredChildren : (
        <div className="py-[30px]">
          <p className="text-gray-900 text-sm text-center">
            No results found for <span className="text-gray-1000">"{context?.inputValue}"</span>.
          </p>
        </div>
      )}
    </div>
  );
};

interface CommandMenuItemProps {
  callback?: () => void;
  children: React.ReactNode;
}

const CommandMenuItem = ({ callback, children }: CommandMenuItemProps) => {
  const context = useContext(CommandMenuContext);

  const onClick = () => {
    context?.setOpen(false);
    if (callback) {
      callback();
    }
  };

  return (
    <div
      className="min-h-10 rounded-md flex items-center gap-3 px-2 text-sm font-sans cursor-pointer hover:bg-gray-alpha-100"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface CommandMenuGroupProps {
  heading: string;
  children: React.ReactNode;
}

const CommandMenuGroup = ({ heading, children }: CommandMenuGroupProps) => {
  return (
    <div>
      <div className="text-[13px] font-sans text-gray-900 h-10 flex items-center px-2">{heading}</div>
      {children}
    </div>
  );
};

export const CommandMenu = {
  Root: CommandMenuRoot,
  Input: CommandMenuInput,
  List: CommandMenuList,
  Item: CommandMenuItem,
  Group: CommandMenuGroup
};
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
