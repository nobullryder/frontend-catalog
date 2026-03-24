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
rating-group.tsx
"use client";

import { RatingGroup } from "@ark-ui/react/rating-group";
import { StarIcon, StarHalfIcon } from "lucide-react";
import { useState } from "react";

export default function BasicRating() {
  const [rating, setRating] = useState(0);

  const ratingLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <div className="max-w-sm w-full bg-white dark:bg-gray-800 rounded-lg shadow-base p-6">
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Product Rating
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            How would you rate this product?
          </p>
        </div>

        <RatingGroup.Root
          count={5}
          value={rating}
          onValueChange={(details) => setRating(details.value)}
          allowHalf
        >
          <RatingGroup.Control className="inline-flex">
            <RatingGroup.Context>
              {({ items }) =>
                items.map((item) => (
                  <RatingGroup.Item
                    key={item}
                    index={item}
                    className="w-10 h-10 p-1 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 rounded-lg hover:scale-110 transition-transform"
                  >
                    <RatingGroup.ItemContext>
                      {({ half, highlighted }) => {
                        if (half) {
                          return (
                            <div className="relative w-8 h-8">
                              <StarIcon className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                              <div className="absolute inset-0 overflow-hidden w-1/2">
                                <StarIcon className="w-8 h-8 text-yellow-400 fill-current" />
                              </div>
                            </div>
                          );
                        }
                        if (highlighted) {
                          return (
                            <StarIcon className="w-8 h-8 text-yellow-400 fill-current" />
                          );
                        }
                        return (
                          <StarIcon className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                        );
                      }}
                    </RatingGroup.ItemContext>
                  </RatingGroup.Item>
                ))
              }
            </RatingGroup.Context>
            <RatingGroup.HiddenInput />
          </RatingGroup.Control>
        </RatingGroup.Root>

        {rating > 0 && (
          <div className="pt-2">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              You rated this {rating} star{rating !== 1 ? "s" : ""}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {ratingLabels[Math.floor(rating) - 1]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


code.demo.1756194579070.tsx
import BasicRating from "@/components/ui/rating-group";

export default function DemoOne() {
  return <BasicRating />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/rating-group.tsx
"use client";

import { RatingGroup } from "@ark-ui/react/rating-group";
import { StarIcon, StarHalfIcon } from "lucide-react";
import { useState } from "react";

export default function BasicRating() {
  const [rating, setRating] = useState(0);

  const ratingLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <div className="max-w-sm w-full bg-white dark:bg-gray-800 rounded-lg shadow-base p-6">
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Product Rating
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            How would you rate this product?
          </p>
        </div>

        <RatingGroup.Root
          count={5}
          value={rating}
          onValueChange={(details) => setRating(details.value)}
          allowHalf
        >
          <RatingGroup.Control className="inline-flex">
            <RatingGroup.Context>
              {({ items }) =>
                items.map((item) => (
                  <RatingGroup.Item
                    key={item}
                    index={item}
                    className="w-10 h-10 p-1 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 rounded-lg hover:scale-110 transition-transform"
                  >
                    <RatingGroup.ItemContext>
                      {({ half, highlighted }) => {
                        if (half) {
                          return (
                            <div className="relative w-8 h-8">
                              <StarIcon className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                              <div className="absolute inset-0 overflow-hidden w-1/2">
                                <StarIcon className="w-8 h-8 text-yellow-400 fill-current" />
                              </div>
                            </div>
                          );
                        }
                        if (highlighted) {
                          return (
                            <StarIcon className="w-8 h-8 text-yellow-400 fill-current" />
                          );
                        }
                        return (
                          <StarIcon className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                        );
                      }}
                    </RatingGroup.ItemContext>
                  </RatingGroup.Item>
                ))
              }
            </RatingGroup.Context>
            <RatingGroup.HiddenInput />
          </RatingGroup.Control>
        </RatingGroup.Root>

        {rating > 0 && (
          <div className="pt-2">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              You rated this {rating} star{rating !== 1 ? "s" : ""}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {ratingLabels[Math.floor(rating) - 1]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

```

Install NPM dependencies:
```bash
@ark-ui/react, lucide-react
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
