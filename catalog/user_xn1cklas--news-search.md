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
news-search.tsx
"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Публичные типы для переиспользования в демо
export interface NewsItem {
  id: string
  title: string
  url?: string
  publishedAt?: string
}

export interface NewsSearchResult {
  topic: string
  items: NewsItem[]
}

type NewsListProps = {
  data?: NewsSearchResult | null
  isLoading?: boolean
  error?: string | null
}

export function NewsList({ data, isLoading, error }: NewsListProps) {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>News</CardTitle>
        <CardDescription>
          {data?.topic ? `Topic: ${data.topic}` : "Recent headlines"}
        </CardDescription>
      </CardHeader>

      {/* Loading skeleton */}
      {isLoading && (
        <CardContent>
          <ul className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="rounded-md bg-muted px-3 py-2">
                <div className="h-4 w-3/4 bg-background/50 rounded animate-pulse" />
                <div className="mt-1 h-3 w-1/3 bg-background/30 rounded animate-pulse" />
              </li>
            ))}
          </ul>
        </CardContent>
      )}

      {/* Error state */}
      {!isLoading && error && (
        <CardContent>
          <div className="text-sm text-destructive">Error: {error}</div>
        </CardContent>
      )}

      {/* Empty state (нет данных) */}
      {!isLoading && !error && !data && (
        <CardContent>
          <div className="text-sm text-muted-foreground">
            No data yet. Pass a <code>NewsSearchResult</code> to the component.
          </div>
        </CardContent>
      )}

      {/* Data state */}
      {!isLoading && !error && data && (
        <CardContent>
          {data.items.length === 0 ? (
            <div className="text-sm text-muted-foreground">No results.</div>
          ) : (
            <ul className="space-y-2">
              {data.items.map((item) => (
                <li key={item.id} className="rounded-md bg-muted px-3 py-2">
                  {item.url ? (
                    <a
                      href={item.url}
                      className="font-medium hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <span className="font-medium">{item.title}</span>
                  )}
                  {item.publishedAt && (
                    <div className="text-xs text-muted-foreground">
                      {new Date(item.publishedAt).toLocaleString()}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      )}
    </Card>
  )
}

export default NewsList


code.demo.1757008471637.tsx
"use client"

import * as React from "react"
import NewsList, { type NewsSearchResult } from "@/components/ui/news-search"

export default function Demo() {
  // Мок-данные, чтобы избежать "data is undefined"
  const mock: NewsSearchResult = {
    topic: "JavaScript",
    items: [
      {
        id: "1",
        title: "TC39 proposes new stage-3 feature",
        url: "https://example.com/tc39-stage-3",
        publishedAt: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Vite 6 released with faster HMR",
        url: "https://example.com/vite-6",
        publishedAt: new Date(Date.now() - 3600_000).toISOString(),
      },
      {
        id: "3",
        title: "Understanding React Server Components",
        url: "https://example.com/rsc-guide",
        publishedAt: new Date(Date.now() - 2 * 3600_000).toISOString(),
      },
    ],
  }

  return <NewsList data={mock} />
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/news-search.tsx
"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Публичные типы для переиспользования в демо
export interface NewsItem {
  id: string
  title: string
  url?: string
  publishedAt?: string
}

export interface NewsSearchResult {
  topic: string
  items: NewsItem[]
}

type NewsListProps = {
  data?: NewsSearchResult | null
  isLoading?: boolean
  error?: string | null
}

export function NewsList({ data, isLoading, error }: NewsListProps) {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>News</CardTitle>
        <CardDescription>
          {data?.topic ? `Topic: ${data.topic}` : "Recent headlines"}
        </CardDescription>
      </CardHeader>

      {/* Loading skeleton */}
      {isLoading && (
        <CardContent>
          <ul className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="rounded-md bg-muted px-3 py-2">
                <div className="h-4 w-3/4 bg-background/50 rounded animate-pulse" />
                <div className="mt-1 h-3 w-1/3 bg-background/30 rounded animate-pulse" />
              </li>
            ))}
          </ul>
        </CardContent>
      )}

      {/* Error state */}
      {!isLoading && error && (
        <CardContent>
          <div className="text-sm text-destructive">Error: {error}</div>
        </CardContent>
      )}

      {/* Empty state (нет данных) */}
      {!isLoading && !error && !data && (
        <CardContent>
          <div className="text-sm text-muted-foreground">
            No data yet. Pass a <code>NewsSearchResult</code> to the component.
          </div>
        </CardContent>
      )}

      {/* Data state */}
      {!isLoading && !error && data && (
        <CardContent>
          {data.items.length === 0 ? (
            <div className="text-sm text-muted-foreground">No results.</div>
          ) : (
            <ul className="space-y-2">
              {data.items.map((item) => (
                <li key={item.id} className="rounded-md bg-muted px-3 py-2">
                  {item.url ? (
                    <a
                      href={item.url}
                      className="font-medium hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <span className="font-medium">{item.title}</span>
                  )}
                  {item.publishedAt && (
                    <div className="text-xs text-muted-foreground">
                      {new Date(item.publishedAt).toLocaleString()}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      )}
    </Card>
  )
}

export default NewsList

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
