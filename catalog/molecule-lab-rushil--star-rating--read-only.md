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
star-rating.tsx
import { cva } from "class-variance-authority"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

interface StarRatingProps {
  ratingScale: number
  value?: number
  readonly?: boolean
  size?: "sm" | "md" | "lg"
  onRatingChange?: (rating: number) => void
}

const starRatingVariants = cva("transition-all duration-150", {
  variants: {
    size: {
      sm: "size-3.5",
      md: "size-5",
      lg: "size-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export function StarRating({
  ratingScale,
  readonly,
  size = "md",
  onRatingChange,
  value,
  className,
  ...props
}: React.ComponentProps<"svg"> & StarRatingProps) {
  const onRatingChangeHandler = (index: number) => {
    if (readonly) {
      return
    }

    onRatingChange?.(index + 1)
  }

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: ratingScale }).map((_, index) => (
        <Star
          role="button"
          onClick={() => onRatingChangeHandler(index)}
          data-slot="star"
          type="button"
          key={index}
          className={cn(
            starRatingVariants({ size }),
            {
              "fill-current": value && index < value,
              "cursor-pointer hover:scale-110": !readonly,
            },
            className,
          )}
          {...props}
        />
      ))}
    </div>
  )
}


code.demo.1755371085991.tsx
// TODO: Add code


import { StarRating } from "@/components/ui/star-rating";

export default function DemoOne() {
  return <StarRating ratingScale={5} value={4} readonly />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/star-rating.tsx
import { cva } from "class-variance-authority"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

interface StarRatingProps {
  ratingScale: number
  value?: number
  readonly?: boolean
  size?: "sm" | "md" | "lg"
  onRatingChange?: (rating: number) => void
}

const starRatingVariants = cva("transition-all duration-150", {
  variants: {
    size: {
      sm: "size-3.5",
      md: "size-5",
      lg: "size-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export function StarRating({
  ratingScale,
  readonly,
  size = "md",
  onRatingChange,
  value,
  className,
  ...props
}: React.ComponentProps<"svg"> & StarRatingProps) {
  const onRatingChangeHandler = (index: number) => {
    if (readonly) {
      return
    }

    onRatingChange?.(index + 1)
  }

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: ratingScale }).map((_, index) => (
        <Star
          role="button"
          onClick={() => onRatingChangeHandler(index)}
          data-slot="star"
          type="button"
          key={index}
          className={cn(
            starRatingVariants({ size }),
            {
              "fill-current": value && index < value,
              "cursor-pointer hover:scale-110": !readonly,
            },
            className,
          )}
          {...props}
        />
      ))}
    </div>
  )
}

```

Install NPM dependencies:
```bash
class-variance-authority, lucide-react
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
