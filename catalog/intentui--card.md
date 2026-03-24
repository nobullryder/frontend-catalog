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
card.tsx
import { twMerge } from "tailwind-merge"

const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="card"
      className={twMerge(
        "group/card flex flex-col gap-(--card-spacing) rounded-lg border bg-bg py-(--card-spacing) text-fg shadow-xs [--card-spacing:--spacing(6)] has-[table]:overflow-hidden has-[table]:not-has-data-[slot=card-footer]:pb-0 **:data-[slot=table-header]:bg-muted/50 has-[table]:**:data-[slot=card-footer]:border-t **:[table]:overflow-hidden",
        className,
      )}
      {...props}
    />
  )
}

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
}

const CardHeader = ({ className, title, description, children, ...props }: HeaderProps) => (
  <div
    data-slot="card-header"
    className={twMerge(
      "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto]",
      className,
    )}
    {...props}
  >
    {title && <CardTitle>{title}</CardTitle>}
    {description && <CardDescription>{description}</CardDescription>}
    {!title && typeof children === "string" ? <CardTitle>{children}</CardTitle> : children}
  </div>
)

const CardTitle = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-title"
      className={twMerge("font-semibold text-lg leading-none tracking-tight", className)}
      {...props}
    />
  )
}

const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      data-slot="card-description"
      className={twMerge("row-start-2 text-pretty text-muted-fg text-sm", className)}
      {...props}
    />
  )
}

const CardAction = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="card-action"
      className={twMerge(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  )
}

const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="card-content"
      className={twMerge("px-(--card-spacing) has-[table]:border-t", className)}
      {...props}
    />
  )
}

const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="card-footer"
      className={twMerge(
        "flex items-center px-(--card-spacing) group-has-[table]/card:pt-(--card-spacing) [.border-t]:pt-6",
        className,
      )}
      {...props}
    />
  )
}

Card.Content = CardContent
Card.Description = CardDescription
Card.Footer = CardFooter
Card.Header = CardHeader
Card.Title = CardTitle
Card.Action = CardAction

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardAction }


code.demo.1750536458828.tsx
"use client"

import { Button } from "@/components/ui/button-1"
import { Card } from "@/components/ui/card"

export default function Component() {
  return (
    <Card className="max-w-lg">
      <Card.Header>
        <Card.Title>Monthly Report</Card.Title>
        <Card.Description>Financial summary for June</Card.Description>
      </Card.Header>
      <Card.Content>
        The monthly financial report shows a 15% increase in revenue compared to last month.
      </Card.Content>
      <Card.Footer>
        <Button>View Details</Button>
      </Card.Footer>
    </Card>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card.tsx
import { twMerge } from "tailwind-merge"

const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="card"
      className={twMerge(
        "group/card flex flex-col gap-(--card-spacing) rounded-lg border bg-bg py-(--card-spacing) text-fg shadow-xs [--card-spacing:--spacing(6)] has-[table]:overflow-hidden has-[table]:not-has-data-[slot=card-footer]:pb-0 **:data-[slot=table-header]:bg-muted/50 has-[table]:**:data-[slot=card-footer]:border-t **:[table]:overflow-hidden",
        className,
      )}
      {...props}
    />
  )
}

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
}

const CardHeader = ({ className, title, description, children, ...props }: HeaderProps) => (
  <div
    data-slot="card-header"
    className={twMerge(
      "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto]",
      className,
    )}
    {...props}
  >
    {title && <CardTitle>{title}</CardTitle>}
    {description && <CardDescription>{description}</CardDescription>}
    {!title && typeof children === "string" ? <CardTitle>{children}</CardTitle> : children}
  </div>
)

const CardTitle = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-title"
      className={twMerge("font-semibold text-lg leading-none tracking-tight", className)}
      {...props}
    />
  )
}

const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      data-slot="card-description"
      className={twMerge("row-start-2 text-pretty text-muted-fg text-sm", className)}
      {...props}
    />
  )
}

const CardAction = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="card-action"
      className={twMerge(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  )
}

const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="card-content"
      className={twMerge("px-(--card-spacing) has-[table]:border-t", className)}
      {...props}
    />
  )
}

const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="card-footer"
      className={twMerge(
        "flex items-center px-(--card-spacing) group-has-[table]/card:pt-(--card-spacing) [.border-t]:pt-6",
        className,
      )}
      {...props}
    />
  )
}

Card.Content = CardContent
Card.Description = CardDescription
Card.Footer = CardFooter
Card.Header = CardHeader
Card.Title = CardTitle
Card.Action = CardAction

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardAction }

```

Install NPM dependencies:
```bash
tailwind-merge
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
