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
features.tsx
'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

// Avatars from the original example
const MESCHAC_AVATAR = 'https://avatars.githubusercontent.com/u/47919550?v=4'
const BERNARD_AVATAR = 'https://avatars.githubusercontent.com/u/31113941?v=4'
const THEO_AVATAR = 'https://avatars.githubusercontent.com/u/68236786?v=4'
const GLODIE_AVATAR = 'https://avatars.githubusercontent.com/u/99137927?v=4'

export type Customer = {
  id: number | string
  date: string
  status: 'Paid' | 'Cancelled' | 'Ref'
  statusVariant: 'success' | 'danger' | 'warning'
  name: string
  avatar: string
  revenue: string
}

export type CustomersTableCardProps = {
  title?: string
  subtitle?: string
  className?: string
  customers?: Customer[]
}

const DEFAULT_CUSTOMERS: Customer[] = [
  {
    id: 1,
    date: '10/31/2023',
    status: 'Paid',
    statusVariant: 'success',
    name: 'Bernard Ng',
    avatar: BERNARD_AVATAR,
    revenue: '$43.99',
  },
  {
    id: 2,
    date: '10/21/2023',
    status: 'Ref',
    statusVariant: 'warning',
    name: 'Méschac Irung',
    avatar: MESCHAC_AVATAR,
    revenue: '$19.99',
  },
  {
    id: 3,
    date: '10/15/2023',
    status: 'Paid',
    statusVariant: 'success',
    name: 'Glodie Ng',
    avatar: GLODIE_AVATAR,
    revenue: '$99.99',
  },
  {
    id: 4,
    date: '10/12/2023',
    status: 'Cancelled',
    statusVariant: 'danger',
    name: 'Theo Ng',
    avatar: THEO_AVATAR,
    revenue: '$19.99',
  },
]

const Badge = ({
  children,
  variant,
}: {
  children: React.ReactNode
  variant: 'success' | 'danger' | 'warning'
}) => {
  const styles =
    variant === 'success'
      ? 'bg-lime-500/15 text-lime-800 dark:text-lime-300'
      : variant === 'danger'
      ? 'bg-red-500/15 text-red-800 dark:text-red-300'
      : 'bg-yellow-500/15 text-yellow-800 dark:text-yellow-300'

  return (
    <span className={cn('rounded-full px-2 py-1 text-xs font-medium', styles)}>
      {children}
    </span>
  )
}

/**
 * Responsive, polished table wrapped in a card container.
 * - Sticky header on wide screens
 * - Horizontal scroll on small screens
 * - Subtle borders, shadows, and hover states
 */
export default function CustomersTableCard({
  title = 'Customers',
  subtitle = 'New users by First user primary channel group (Default Channel Group)',
  customers = DEFAULT_CUSTOMERS,
  className,
}: CustomersTableCardProps) {
  return (
    <section
      className={cn(
        'bg-background shadow-foreground/5 inset-ring-1 inset-ring-background ring-foreground/5 relative w-full overflow-hidden rounded-2xl border border-border/60 shadow-md ring-1',
        className
      )}
      aria-label={title}
    >
      {/* Header */}
      <div className="space-y-1 border-b border-border/60 p-6">
        <div className="flex items-center gap-1.5">
          <span className="bg-muted size-2 rounded-full border border-black/5" />
          <span className="bg-muted size-2 rounded-full border border-black/5" />
          <span className="bg-muted size-2 rounded-full border border-black/5" />
        </div>
        <h2 className="text-lg font-semibold leading-none tracking-tight">{title}</h2>
        <p className="text-muted-foreground text-sm">{subtitle}</p>
      </div>

      {/* Table wrapper for responsive overflow */}
      <div className="overflow-x-auto">
        <table className="min-w-[640px] w-full border-collapse text-sm">
          <thead className="bg-muted/50 supports-[backdrop-filter]:backdrop-blur-sm sticky top-0 z-10">
            <tr className="text-muted-foreground *:text-left *:px-3 *:py-3 *:font-medium">
              <th className="w-12">#</th>
              <th className="min-w-[120px]">Date</th>
              <th className="min-w-[120px]">Status</th>
              <th className="min-w-[220px]">Customer</th>
              <th className="min-w-[120px] text-right pr-4">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, idx) => (
              <tr
                key={customer.id}
                className="hover:bg-muted/30 transition-colors *:px-3 *:py-2 border-b border-border/60 last:border-0"
              >
                <td className="text-muted-foreground">{idx + 1}</td>
                <td className="whitespace-nowrap">{customer.date}</td>
                <td>
                  <Badge variant={customer.statusVariant}>{customer.status}</Badge>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="size-7 overflow-hidden rounded-full ring-1 ring-border/60">
                      <img
                        src={customer.avatar}
                        alt={customer.name}
                        width={28}
                        height={28}
                        loading="lazy"
                      />
                    </div>
                    <span className="text-foreground font-medium truncate">{customer.name}</span>
                  </div>
                </td>
                <td className="text-right pr-4 font-medium tabular-nums">{customer.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer (optional) */}
      <div className="flex items-center justify-between border-t border-border/60 p-4 text-xs text-muted-foreground">
        <span>
          Showing <strong>{customers.length}</strong> {customers.length === 1 ? 'row' : 'rows'}
        </span>
        <span>Updated just now</span>
      </div>
    </section>
  )
}



code.demo.1755254698129.tsx
'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'

// Avatars from the original example
const MESCHAC_AVATAR = 'https://avatars.githubusercontent.com/u/47919550?v=4'
const BERNARD_AVATAR = 'https://avatars.githubusercontent.com/u/31113941?v=4'
const THEO_AVATAR = 'https://avatars.githubusercontent.com/u/68236786?v=4'
const GLODIE_AVATAR = 'https://avatars.githubusercontent.com/u/99137927?v=4'

export type Customer = {
  id: number | string
  date: string
  status: 'Paid' | 'Cancelled' | 'Ref'
  statusVariant: 'success' | 'danger' | 'warning'
  name: string
  avatar: string
  revenue: string
}

export type CustomersTableCardProps = {
  title?: string
  subtitle?: string
  className?: string
  customers?: Customer[]
}

const DEFAULT_CUSTOMERS: Customer[] = [
  {
    id: 1,
    date: '10/31/2023',
    status: 'Paid',
    statusVariant: 'success',
    name: 'Bernard Ng',
    avatar: BERNARD_AVATAR,
    revenue: '$43.99',
  },
  {
    id: 2,
    date: '10/21/2023',
    status: 'Ref',
    statusVariant: 'warning',
    name: 'Méschac Irung',
    avatar: MESCHAC_AVATAR,
    revenue: '$19.99',
  },
  {
    id: 3,
    date: '10/15/2023',
    status: 'Paid',
    statusVariant: 'success',
    name: 'Glodie Ng',
    avatar: GLODIE_AVATAR,
    revenue: '$99.99',
  },
  {
    id: 4,
    date: '10/12/2023',
    status: 'Cancelled',
    statusVariant: 'danger',
    name: 'Theo Ng',
    avatar: THEO_AVATAR,
    revenue: '$19.99',
  },
]

const Badge = ({
  children,
  variant,
}: {
  children: React.ReactNode
  variant: 'success' | 'danger' | 'warning'
}) => {
  const styles =
    variant === 'success'
      ? 'bg-lime-500/15 text-lime-800 dark:text-lime-300'
      : variant === 'danger'
      ? 'bg-red-500/15 text-red-800 dark:text-red-300'
      : 'bg-yellow-500/15 text-yellow-800 dark:text-yellow-300'

  return (
    <span className={cn('rounded-full px-2 py-1 text-xs font-medium', styles)}>
      {children}
    </span>
  )
}

/**
 * Responsive, polished table wrapped in a card container.
 * - Sticky header on wide screens
 * - Horizontal scroll on small screens
 * - Subtle borders, shadows, and hover states
 */
export function CustomersTableCard({
  title = 'Customers',
  subtitle = 'New users by First user primary channel group (Default Channel Group)',
  customers = DEFAULT_CUSTOMERS,
  className,
}: CustomersTableCardProps) {
  return (
    <section
      className={cn(
        'bg-background shadow-foreground/5 inset-ring-1 inset-ring-background ring-foreground/5 relative w-full overflow-hidden rounded-2xl border border-border/60 shadow-md ring-1',
        className
      )}
      aria-label={title}
    >
      {/* Header */}
      <div className="space-y-1 border-b border-border/60 p-6">
        <div className="flex items-center gap-1.5">
          <span className="bg-muted size-2 rounded-full border border-black/5" />
          <span className="bg-muted size-2 rounded-full border border-black/5" />
          <span className="bg-muted size-2 rounded-full border border-black/5" />
        </div>
        <h2 className="text-lg font-semibold leading-none tracking-tight">{title}</h2>
        <p className="text-muted-foreground text-sm">{subtitle}</p>
      </div>

      {/* Table wrapper for responsive overflow */}
      <div className="overflow-x-auto">
        <table className="min-w-[640px] w-full border-collapse text-sm">
          <thead className="bg-muted/50 supports-[backdrop-filter]:backdrop-blur-sm sticky top-0 z-10">
            <tr className="text-muted-foreground *:text-left *:px-3 *:py-3 *:font-medium">
              <th className="w-12">#</th>
              <th className="min-w-[120px]">Date</th>
              <th className="min-w-[120px]">Status</th>
              <th className="min-w-[220px]">Customer</th>
              <th className="min-w-[120px] text-right pr-4">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, idx) => (
              <tr
                key={customer.id}
                className="hover:bg-muted/30 transition-colors *:px-3 *:py-2 border-b border-border/60 last:border-0"
              >
                <td className="text-muted-foreground">{idx + 1}</td>
                <td className="whitespace-nowrap">{customer.date}</td>
                <td>
                  <Badge variant={customer.statusVariant}>{customer.status}</Badge>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="size-7 overflow-hidden rounded-full ring-1 ring-border/60">
                      <img
                        src={customer.avatar}
                        alt={customer.name}
                        width={28}
                        height={28}
                        loading="lazy"
                      />
                    </div>
                    <span className="text-foreground font-medium truncate">{customer.name}</span>
                  </div>
                </td>
                <td className="text-right pr-4 font-medium tabular-nums">{customer.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer (optional) */}
      <div className="flex items-center justify-between border-t border-border/60 p-4 text-xs text-muted-foreground">
        <span>
          Showing <strong>{customers.length}</strong> {customers.length === 1 ? 'row' : 'rows'}
        </span>
        <span>Updated just now</span>
      </div>
    </section>
  )
}

export default function Features() {
  return (
    <section>
      <div className="bg-muted/50 py-24">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div>
            <h2 className="text-foreground text-4xl font-semibold">Effortless Task Management</h2>
            <p className="text-muted-foreground mb-12 mt-4 text-balance text-lg">
              Automate your tasks and workflows by connecting your favorite tools like Notion, Todoist, and
              more. AI-powered scheduling helps you stay on track and adapt to changing priorities.
            </p>
            <div className="bg-foreground/5 rounded-3xl p-6">
              <CustomersTableCard />
            </div>
          </div>

          <div className="border-foreground/10 relative mt-16 grid gap-12 border-b pb-12 [--radius:1rem] md:grid-cols-2">
            <div>
              <h3 className="text-foreground text-xl font-semibold">Marketing Campaigns</h3>
              <p className="text-muted-foreground my-4 text-lg">
                Effortlessly plan and execute your marketing campaigns organized.
              </p>
              <Card className="aspect-video overflow-hidden px-6">
                <Card className="h-full translate-y-6" />
              </Card>
            </div>
            <div>
              <h3 className="text-foreground text-xl font-semibold">AI Meeting Scheduler</h3>
              <p className="text-muted-foreground my-4 text-lg">
                Effortlessly book and manage your meetings. Stay on top of your schedule.
              </p>
              <Card className="aspect-video overflow-hidden">
                <Card className="translate-6 h-full" />
              </Card>
            </div>
          </div>

          <blockquote className="before:bg-primary relative mt-12 max-w-xl pl-6 before:absolute before:inset-y-0 before:left-0 before:w-1 before:rounded-full">
            <p className="text-foreground text-lg">
              Wow, auto-generated pages are the kind of thing that you don't even know you need until you see
              it. It's like an AI-native CRM.
            </p>
            <footer className="mt-4 flex items-center gap-2">
              <cite>Méschac Irung</cite>
              <span aria-hidden className="bg-foreground/15 size-1 rounded-full"></span>
              <span className="text-muted-foreground">Creator</span>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/features.tsx
'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

// Avatars from the original example
const MESCHAC_AVATAR = 'https://avatars.githubusercontent.com/u/47919550?v=4'
const BERNARD_AVATAR = 'https://avatars.githubusercontent.com/u/31113941?v=4'
const THEO_AVATAR = 'https://avatars.githubusercontent.com/u/68236786?v=4'
const GLODIE_AVATAR = 'https://avatars.githubusercontent.com/u/99137927?v=4'

export type Customer = {
  id: number | string
  date: string
  status: 'Paid' | 'Cancelled' | 'Ref'
  statusVariant: 'success' | 'danger' | 'warning'
  name: string
  avatar: string
  revenue: string
}

export type CustomersTableCardProps = {
  title?: string
  subtitle?: string
  className?: string
  customers?: Customer[]
}

const DEFAULT_CUSTOMERS: Customer[] = [
  {
    id: 1,
    date: '10/31/2023',
    status: 'Paid',
    statusVariant: 'success',
    name: 'Bernard Ng',
    avatar: BERNARD_AVATAR,
    revenue: '$43.99',
  },
  {
    id: 2,
    date: '10/21/2023',
    status: 'Ref',
    statusVariant: 'warning',
    name: 'Méschac Irung',
    avatar: MESCHAC_AVATAR,
    revenue: '$19.99',
  },
  {
    id: 3,
    date: '10/15/2023',
    status: 'Paid',
    statusVariant: 'success',
    name: 'Glodie Ng',
    avatar: GLODIE_AVATAR,
    revenue: '$99.99',
  },
  {
    id: 4,
    date: '10/12/2023',
    status: 'Cancelled',
    statusVariant: 'danger',
    name: 'Theo Ng',
    avatar: THEO_AVATAR,
    revenue: '$19.99',
  },
]

const Badge = ({
  children,
  variant,
}: {
  children: React.ReactNode
  variant: 'success' | 'danger' | 'warning'
}) => {
  const styles =
    variant === 'success'
      ? 'bg-lime-500/15 text-lime-800 dark:text-lime-300'
      : variant === 'danger'
      ? 'bg-red-500/15 text-red-800 dark:text-red-300'
      : 'bg-yellow-500/15 text-yellow-800 dark:text-yellow-300'

  return (
    <span className={cn('rounded-full px-2 py-1 text-xs font-medium', styles)}>
      {children}
    </span>
  )
}

/**
 * Responsive, polished table wrapped in a card container.
 * - Sticky header on wide screens
 * - Horizontal scroll on small screens
 * - Subtle borders, shadows, and hover states
 */
export default function CustomersTableCard({
  title = 'Customers',
  subtitle = 'New users by First user primary channel group (Default Channel Group)',
  customers = DEFAULT_CUSTOMERS,
  className,
}: CustomersTableCardProps) {
  return (
    <section
      className={cn(
        'bg-background shadow-foreground/5 inset-ring-1 inset-ring-background ring-foreground/5 relative w-full overflow-hidden rounded-2xl border border-border/60 shadow-md ring-1',
        className
      )}
      aria-label={title}
    >
      {/* Header */}
      <div className="space-y-1 border-b border-border/60 p-6">
        <div className="flex items-center gap-1.5">
          <span className="bg-muted size-2 rounded-full border border-black/5" />
          <span className="bg-muted size-2 rounded-full border border-black/5" />
          <span className="bg-muted size-2 rounded-full border border-black/5" />
        </div>
        <h2 className="text-lg font-semibold leading-none tracking-tight">{title}</h2>
        <p className="text-muted-foreground text-sm">{subtitle}</p>
      </div>

      {/* Table wrapper for responsive overflow */}
      <div className="overflow-x-auto">
        <table className="min-w-[640px] w-full border-collapse text-sm">
          <thead className="bg-muted/50 supports-[backdrop-filter]:backdrop-blur-sm sticky top-0 z-10">
            <tr className="text-muted-foreground *:text-left *:px-3 *:py-3 *:font-medium">
              <th className="w-12">#</th>
              <th className="min-w-[120px]">Date</th>
              <th className="min-w-[120px]">Status</th>
              <th className="min-w-[220px]">Customer</th>
              <th className="min-w-[120px] text-right pr-4">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, idx) => (
              <tr
                key={customer.id}
                className="hover:bg-muted/30 transition-colors *:px-3 *:py-2 border-b border-border/60 last:border-0"
              >
                <td className="text-muted-foreground">{idx + 1}</td>
                <td className="whitespace-nowrap">{customer.date}</td>
                <td>
                  <Badge variant={customer.statusVariant}>{customer.status}</Badge>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="size-7 overflow-hidden rounded-full ring-1 ring-border/60">
                      <img
                        src={customer.avatar}
                        alt={customer.name}
                        width={28}
                        height={28}
                        loading="lazy"
                      />
                    </div>
                    <span className="text-foreground font-medium truncate">{customer.name}</span>
                  </div>
                </td>
                <td className="text-right pr-4 font-medium tabular-nums">{customer.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer (optional) */}
      <div className="flex items-center justify-between border-t border-border/60 p-4 text-xs text-muted-foreground">
        <span>
          Showing <strong>{customers.length}</strong> {customers.length === 1 ? 'row' : 'rows'}
        </span>
        <span>Updated just now</span>
      </div>
    </section>
  )
}


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
