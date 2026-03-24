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
stats.tsx
import { Card } from '@/components/ui/card'

type Stat = {
  value: string
  label: string
}

const STATS: Stat[] = [
  { value: '+1200', label: 'Stars on GitHub' },
  { value: '56%', label: 'Conversion rate' },
  { value: '+500', label: 'Powered Apps' },
]

export default function StatsSection() {
  return (
    <section className="bg-muted py-12 md:py-20">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <Card
          role="list"
          aria-label="Key product stats"
          className={[
            // Always 3 columns, never wrap
            "grid grid-cols-3",
            // Equal width and spacing
            "gap-2 sm:gap-4 md:gap-6",
            "p-3 sm:p-4 md:p-6",
            // Vertical dividers between items
            "divide-x",
          ].join(' ')}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              role="listitem"
              className="flex flex-col items-center justify-center px-3 text-center"
            >
              <div
                className={[
                  "text-foreground font-semibold tracking-tight whitespace-nowrap",
                  // Fluid font size
                  "text-[clamp(1.75rem,5vw,2.5rem)] leading-none",
                ].join(' ')}
              >
                {s.value}
              </div>
              <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                {s.label}
              </p>
            </div>
          ))}
        </Card>
      </div>
    </section>
  )
}


code.demo.1755258121203.tsx
import { ArrowRight } from 'lucide-react'

export default function StatsSection() {
    return (
        <section>
            <div className="py-24">
                <div className="mx-auto max-w-5xl px-6">
                    <div>
                        <h2 className="text-2xl font-semibold">Tailark in numbers</h2>
                        <p className="text-muted-foreground mt-4 text-balance text-lg">Our platform continues to grow with developers and businesses using our tools to create innovative solutions and enhance productivity.</p>
                    </div>
                    <ul
                        role="list"
                        className="text-muted-foreground mt-8 space-y-2">
                        {[
                            { value: '90+', label: 'Integrations' },
                            { value: '56%', label: 'Productivity Boost' },
                            { value: '24/7', label: 'Customer Support' },
                            { value: '10k+', label: 'Active Users' },
                        ].map((stat, index) => (
                            <li
                                key={index}
                                className="-ml-0.5 flex items-center gap-1.5">
                                <ArrowRight className="size-4 opacity-50" />
                                <span className="text-foreground font-medium">{stat.value}</span> {stat.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/stats.tsx
import { Card } from '@/components/ui/card'

type Stat = {
  value: string
  label: string
}

const STATS: Stat[] = [
  { value: '+1200', label: 'Stars on GitHub' },
  { value: '56%', label: 'Conversion rate' },
  { value: '+500', label: 'Powered Apps' },
]

export default function StatsSection() {
  return (
    <section className="bg-muted py-12 md:py-20">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <Card
          role="list"
          aria-label="Key product stats"
          className={[
            // Always 3 columns, never wrap
            "grid grid-cols-3",
            // Equal width and spacing
            "gap-2 sm:gap-4 md:gap-6",
            "p-3 sm:p-4 md:p-6",
            // Vertical dividers between items
            "divide-x",
          ].join(' ')}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              role="listitem"
              className="flex flex-col items-center justify-center px-3 text-center"
            >
              <div
                className={[
                  "text-foreground font-semibold tracking-tight whitespace-nowrap",
                  // Fluid font size
                  "text-[clamp(1.75rem,5vw,2.5rem)] leading-none",
                ].join(' ')}
              >
                {s.value}
              </div>
              <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                {s.label}
              </p>
            </div>
          ))}
        </Card>
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
