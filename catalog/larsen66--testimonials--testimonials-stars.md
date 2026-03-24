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
testimonials.tsx
export default function TestimonialSection() {
    return (
        <section>
            <div className="py-24">
                <div className="mx-auto w-full max-w-5xl px-6">
                    <blockquote className="before:bg-primary relative max-w-xl pl-6 before:absolute before:inset-y-0 before:left-0 before:w-1 before:rounded-full">
                        <p className="text-foreground text-lg">Using Tailark has been like unlocking a secret design superpower. It's the perfect fusion of simplicity and versatility, enabling us to create UIs that are as stunning as they are user-friendly.</p>
                        <footer className="mt-4 flex items-center gap-2">
                            <cite>John Doe</cite>
                            <span
                                aria-hidden
                                className="bg-foreground/15 size-1 rounded-full"></span>
                            <span className="text-muted-foreground">Product Designer</span>
                        </footer>
                    </blockquote>
                </div>
            </div>
        </section>
    )
}

code.demo.1755259635699.tsx
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star } from 'lucide-react'

export default function TestimonialSection() {
  const testimonials = [
    {
      name: 'Méschac Irung',
      role: 'Creator',
      stars: 5,
      avatar: 'https://avatars.githubusercontent.com/u/47919550?v=4',
      content:
        "Using Tailark has been like unlocking a secret design superpower. It's the perfect fusion of simplicity.",
    },
    {
      name: 'Théo Balick',
      role: 'Frontend Dev',
      stars: 4,
      avatar: 'https://avatars.githubusercontent.com/u/68236786?v=4',
      content:
        'Tailark has transformed the way I develop web applications. The flexibility to customize every aspect is amazing.',
    },
    {
      name: 'Glodie Lukose',
      role: 'Frontend Dev',
      stars: 5,
      avatar: 'https://avatars.githubusercontent.com/u/99137927?v=4',
      content:
        'The extensive collection of UI components has significantly accelerated my workflow.',
    },
  ]

  return (
    <section>
      <div className="py-24">
        <div className="mx-auto w-full max-w-5xl px-6">
          {/* 1 col (xs) → 2 cols (sm ≥640px) → 3 cols (lg ≥1024px) */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, index) => (
              <div key={index} className="bg-background ring-foreground/10 rounded-2xl border border-transparent p-4 ring-1">
                <div className="flex gap-1" aria-label={`${t.stars} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'size-4',
                        i < t.stars
                          ? 'fill-primary stroke-primary'
                          : 'fill-foreground/15 stroke-transparent'
                      )}
                    />
                  ))}
                </div>

                <p className="text-foreground my-4">{t.content}</p>

                <div className="flex items-center gap-2">
                  <Avatar className="ring-foreground/10 size-8 border border-transparent shadow ring-1">
                    <AvatarImage src={t.avatar} alt={t.name} />
                    <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-foreground text-sm font-medium">{t.name}</div>
                  <span aria-hidden className="bg-foreground/25 size-1 rounded-full" />
                  <span className="text-muted-foreground text-sm">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/testimonials.tsx
export default function TestimonialSection() {
    return (
        <section>
            <div className="py-24">
                <div className="mx-auto w-full max-w-5xl px-6">
                    <blockquote className="before:bg-primary relative max-w-xl pl-6 before:absolute before:inset-y-0 before:left-0 before:w-1 before:rounded-full">
                        <p className="text-foreground text-lg">Using Tailark has been like unlocking a secret design superpower. It's the perfect fusion of simplicity and versatility, enabling us to create UIs that are as stunning as they are user-friendly.</p>
                        <footer className="mt-4 flex items-center gap-2">
                            <cite>John Doe</cite>
                            <span
                                aria-hidden
                                className="bg-foreground/15 size-1 rounded-full"></span>
                            <span className="text-muted-foreground">Product Designer</span>
                        </footer>
                    </blockquote>
                </div>
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
