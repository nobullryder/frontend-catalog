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
call-to-action.tsx
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function StatsSection() {
    return (
        <section>
            <div className="py-12">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="space-y-6 text-center">
                        <h2 className="text-foreground text-balance text-3xl font-semibold lg:text-4xl">Build 10x Faster with Mist</h2>
                        <div className="flex justify-center gap-3">
                            <Button
                                asChild
                                size="lg">
                                <Link href="#">Get Started</Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg">
                                <Link href="#">Get a Demo</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

code.demo.1755259878803.tsx
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function StatsSection() {
    return (
        <section>
            <div className="py-12">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="flex flex-wrap items-center justify-between gap-6">
                        <div>
                            <h2 className="text-foreground text-balance text-3xl font-semibold lg:text-4xl">Build 10x Faster with Mist</h2>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button
                                asChild
                                variant="outline"
                                size="lg">
                                <Link href="#">Get a Demo</Link>
                            </Button>
                            <Button
                                asChild
                                size="lg">
                                <Link href="#">Get Started</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/call-to-action.tsx
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function StatsSection() {
    return (
        <section>
            <div className="py-12">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="space-y-6 text-center">
                        <h2 className="text-foreground text-balance text-3xl font-semibold lg:text-4xl">Build 10x Faster with Mist</h2>
                        <div className="flex justify-center gap-3">
                            <Button
                                asChild
                                size="lg">
                                <Link href="#">Get Started</Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg">
                                <Link href="#">Get a Demo</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
```

Install NPM dependencies:
```bash
next
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
