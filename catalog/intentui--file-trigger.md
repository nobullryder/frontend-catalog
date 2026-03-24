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
file-trigger.tsx
"use client"

import { IconCamera, IconFolder, IconPaperclip45 } from "@intentui/icons"
import {
  FileTrigger as FileTriggerPrimitive,
  type FileTriggerProps as FileTriggerPrimitiveProps,
} from "react-aria-components"

import { Button, type buttonStyles } from "@/components/ui/button-1"
import type { VariantProps } from "tailwind-variants"

interface FileTriggerProps extends FileTriggerPrimitiveProps, VariantProps<typeof buttonStyles> {
  withIcon?: boolean
  isDisabled?: boolean
  ref?: React.RefObject<HTMLInputElement>
  className?: string
}

const FileTrigger = ({
  intent = "outline",
  size = "medium",
  shape = "square",
  withIcon = true,
  ref,
  className,
  ...props
}: FileTriggerProps) => {
  return (
    <FileTriggerPrimitive ref={ref} {...props}>
      <Button
        className={className}
        isDisabled={props.isDisabled}
        intent={intent}
        size={size}
        shape={shape}
      >
        {withIcon &&
          (props.defaultCamera ? (
            <IconCamera />
          ) : props.acceptDirectory ? (
            <IconFolder />
          ) : (
            <IconPaperclip45 />
          ))}
        {props.children ? (
          props.children
        ) : (
          <>
            {props.allowsMultiple
              ? "Browse a files"
              : props.acceptDirectory
                ? "Browse"
                : "Browse a file"}
            ...
          </>
        )}
      </Button>
    </FileTriggerPrimitive>
  )
}

export type { FileTriggerProps }
export { FileTrigger }


code.demo.1750535979100.tsx
"use client"

import { FileTrigger } from "@/components/ui/file-trigger"

export default function Component() {
  return <FileTrigger />
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/file-trigger.tsx
"use client"

import { IconCamera, IconFolder, IconPaperclip45 } from "@intentui/icons"
import {
  FileTrigger as FileTriggerPrimitive,
  type FileTriggerProps as FileTriggerPrimitiveProps,
} from "react-aria-components"

import { Button, type buttonStyles } from "@/components/ui/button-1"
import type { VariantProps } from "tailwind-variants"

interface FileTriggerProps extends FileTriggerPrimitiveProps, VariantProps<typeof buttonStyles> {
  withIcon?: boolean
  isDisabled?: boolean
  ref?: React.RefObject<HTMLInputElement>
  className?: string
}

const FileTrigger = ({
  intent = "outline",
  size = "medium",
  shape = "square",
  withIcon = true,
  ref,
  className,
  ...props
}: FileTriggerProps) => {
  return (
    <FileTriggerPrimitive ref={ref} {...props}>
      <Button
        className={className}
        isDisabled={props.isDisabled}
        intent={intent}
        size={size}
        shape={shape}
      >
        {withIcon &&
          (props.defaultCamera ? (
            <IconCamera />
          ) : props.acceptDirectory ? (
            <IconFolder />
          ) : (
            <IconPaperclip45 />
          ))}
        {props.children ? (
          props.children
        ) : (
          <>
            {props.allowsMultiple
              ? "Browse a files"
              : props.acceptDirectory
                ? "Browse"
                : "Browse a file"}
            ...
          </>
        )}
      </Button>
    </FileTriggerPrimitive>
  )
}

export type { FileTriggerProps }
export { FileTrigger }

```

Install NPM dependencies:
```bash
@intentui/icons, react-aria-components, tailwind-variants
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
