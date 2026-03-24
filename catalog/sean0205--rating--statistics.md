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
rating.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Star } from 'lucide-react';

const ratingVariants = cva('flex items-center', {
  variants: {
    size: {
      sm: 'gap-2',
      md: 'gap-2.5',
      lg: 'gap-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const starVariants = cva('', {
  variants: {
    size: {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const valueVariants = cva('text-muted-foreground w-5', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

function Rating({
  rating,
  maxRating = 5,
  size,
  className,
  starClassName,
  showValue = false,
  editable = false,
  onRatingChange,
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof ratingVariants> & {
    /**
     * Current rating value (supports decimal values for partial stars)
     */
    rating: number;
    /**
     * Maximum rating value (number of stars to show)
     */
    maxRating?: number;
    /**
     * Whether to show the numeric rating value
     */
    showValue?: boolean;
    /**
     * Class name for the value span
     */
    starClassName?: string;
    /**
     * Whether the rating is editable (clickable)
     */
    editable?: boolean;
    /**
     * Callback function called when rating changes
     */
    onRatingChange?: (rating: number) => void;
  }) {
  const [hoveredRating, setHoveredRating] = React.useState<number | null>(null);
  const displayRating = editable && hoveredRating !== null ? hoveredRating : rating;

  const handleStarClick = (starRating: number) => {
    if (editable && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  const handleStarMouseEnter = (starRating: number) => {
    if (editable) {
      setHoveredRating(starRating);
    }
  };

  const handleStarMouseLeave = () => {
    if (editable) {
      setHoveredRating(null);
    }
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      const filled = displayRating >= i;
      const partiallyFilled = displayRating > i - 1 && displayRating < i;
      const fillPercentage = partiallyFilled ? (displayRating - (i - 1)) * 100 : 0;

      stars.push(
        <div
          key={i}
          className={cn('relative', editable && 'cursor-pointer')}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarMouseEnter(i)}
          onMouseLeave={handleStarMouseLeave}
        >
          {/* Background star (empty) */}
          <Star data-slot="rating-star-empty" className={cn(starVariants({ size }), 'text-muted-foreground/30')} />

          {/* Filled star */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              width: filled ? '100%' : `${fillPercentage}%`,
            }}
          >
            <Star
              data-slot="rating-star-filled"
              className={cn(starVariants({ size }), 'text-yellow-400 fill-yellow-400')}
            />
          </div>
        </div>,
      );
    }

    return stars;
  };

  return (
    <div data-slot="rating" className={cn(ratingVariants({ size }), className)} {...props}>
      <div className="flex items-center">{renderStars()}</div>
      {showValue && (
        <span data-slot="rating-value" className={cn(valueVariants({ size }), starClassName)}>
          {displayRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

export { Rating };



code.demo.1757402950990.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardHeading,
  CardTitle,
} from '@/components/ui/card';
import { Rating } from '@/components/ui/rating';

export default function RatingStatisticsDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="min-h-auto border-b-0 pt-6">
        <CardHeading>
          <CardTitle>Customer Reviews Summary</CardTitle>
          <CardDescription>Based on 1,247 reviews</CardDescription>
        </CardHeading>
      </CardHeader>

      <CardContent className="space-y-3">
        {[
          { stars: 5, count: 745, percentage: 59.7 },
          { stars: 4, count: 312, percentage: 25.0 },
          { stars: 3, count: 124, percentage: 9.9 },
          { stars: 2, count: 41, percentage: 3.3 },
          { stars: 1, count: 25, percentage: 2.0 },
        ].map((item) => (
          <div key={item.stars} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-medium w-2">{item.stars}</span>
              <Rating rating={item.stars} />
            </div>
            <div className="flex items-center gap-0.5 text-sm text-muted-foreground">
              <span>{item.count}</span>
              <span>({item.percentage}%)</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/rating.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Star } from 'lucide-react';

const ratingVariants = cva('flex items-center', {
  variants: {
    size: {
      sm: 'gap-2',
      md: 'gap-2.5',
      lg: 'gap-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const starVariants = cva('', {
  variants: {
    size: {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const valueVariants = cva('text-muted-foreground w-5', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

function Rating({
  rating,
  maxRating = 5,
  size,
  className,
  starClassName,
  showValue = false,
  editable = false,
  onRatingChange,
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof ratingVariants> & {
    /**
     * Current rating value (supports decimal values for partial stars)
     */
    rating: number;
    /**
     * Maximum rating value (number of stars to show)
     */
    maxRating?: number;
    /**
     * Whether to show the numeric rating value
     */
    showValue?: boolean;
    /**
     * Class name for the value span
     */
    starClassName?: string;
    /**
     * Whether the rating is editable (clickable)
     */
    editable?: boolean;
    /**
     * Callback function called when rating changes
     */
    onRatingChange?: (rating: number) => void;
  }) {
  const [hoveredRating, setHoveredRating] = React.useState<number | null>(null);
  const displayRating = editable && hoveredRating !== null ? hoveredRating : rating;

  const handleStarClick = (starRating: number) => {
    if (editable && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  const handleStarMouseEnter = (starRating: number) => {
    if (editable) {
      setHoveredRating(starRating);
    }
  };

  const handleStarMouseLeave = () => {
    if (editable) {
      setHoveredRating(null);
    }
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      const filled = displayRating >= i;
      const partiallyFilled = displayRating > i - 1 && displayRating < i;
      const fillPercentage = partiallyFilled ? (displayRating - (i - 1)) * 100 : 0;

      stars.push(
        <div
          key={i}
          className={cn('relative', editable && 'cursor-pointer')}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarMouseEnter(i)}
          onMouseLeave={handleStarMouseLeave}
        >
          {/* Background star (empty) */}
          <Star data-slot="rating-star-empty" className={cn(starVariants({ size }), 'text-muted-foreground/30')} />

          {/* Filled star */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              width: filled ? '100%' : `${fillPercentage}%`,
            }}
          >
            <Star
              data-slot="rating-star-filled"
              className={cn(starVariants({ size }), 'text-yellow-400 fill-yellow-400')}
            />
          </div>
        </div>,
      );
    }

    return stars;
  };

  return (
    <div data-slot="rating" className={cn(ratingVariants({ size }), className)} {...props}>
      <div className="flex items-center">{renderStars()}</div>
      {showValue && (
        <span data-slot="rating-value" className={cn(valueVariants({ size }), starClassName)}>
          {displayRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

export { Rating };


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
