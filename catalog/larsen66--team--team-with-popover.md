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
team.tsx
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

const members = [
  { src: 'https://avatars.githubusercontent.com/u/47919550?v=4', name: 'Meschac Irung', role: 'Frontend Engineer' },
  { src: 'https://avatars.githubusercontent.com/u/31113941?v=4', name: 'Bernard Ngandu', role: 'Backend Developer' },
  { src: 'https://avatars.githubusercontent.com/u/68236786?v=4', name: 'Theo Balick', role: 'UI/UX Designer' },
  { src: 'https://avatars.githubusercontent.com/u/99137927?v=4', name: 'Glodie Lukose', role: 'Project Manager' },
  { src: 'https://avatars.githubusercontent.com/u/12345678?v=4', name: 'Sarah Johnson', role: 'DevOps Engineer' },
  { src: 'https://avatars.githubusercontent.com/u/23456789?v=4', name: 'Michael Chen', role: 'QA Specialist' },
  { src: 'https://avatars.githubusercontent.com/u/34567890?v=4', name: 'Aisha Patel', role: 'Data Scientist' },
  { src: 'https://avatars.githubusercontent.com/u/45678901?v=4', name: 'Carlos Rodriguez', role: 'Product Manager' },
  { src: 'https://avatars.githubusercontent.com/u/56789012?v=4', name: 'Emma Wilson', role: 'Content Strategist' },
]

export default function TeamSection() {
  return (
    <section className="bg-muted/50">
      <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-10 md:mb-12">
          <h2 className="text-foreground text-balance text-4xl font-semibold md:text-5xl">
            Meet Our Team
          </h2>
          <p className="text-muted-foreground mt-4 max-w-3xl text-pretty text-lg leading-relaxed">
            Our talented professionals bring diverse expertise and passion to every project. Together,
            we collaborate to deliver exceptional results and innovative solutions for our clients.
          </p>

          <Button asChild variant="outline" className="mt-6 h-9 rounded-full pr-2">
            <Link href="#">
              We&apos;re hiring
              <ChevronRight className="ml-1 size-4 opacity-60" />
            </Link>
          </Button>
        </div>

        {/* Grid */}
        <div
          role="list"
          aria-label="Team members"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {members.map((member, i) => (
            <div
              key={i}
              role="listitem"
              className="grid grid-cols-[auto_1fr] items-center gap-3 rounded-(--radius) border bg-background p-3 shadow-sm ring-1 ring-foreground/5"
            >
              <Avatar className="rounded-(--radius) size-12 border border-transparent shadow ring-1 ring-foreground/10">
                <AvatarImage src={member.src} alt={member.name} />
                <AvatarFallback className="rounded-(--radius) text-base">
                  {member.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <span className="text-foreground block truncate text-[15px] font-semibold">
                  {member.name}
                </span>
                <span className="text-muted-foreground block truncate text-sm">
                  {member.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


code.demo.1755259149768.tsx
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChevronRight, Twitter } from 'lucide-react'
import Link from 'next/link'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

const members = [
  { src: 'https://avatars.githubusercontent.com/u/47919550?v=4', name: 'Meschac Irung', role: 'Frontend Engineer' },
  { src: 'https://avatars.githubusercontent.com/u/31113941?v=4', name: 'Bernard Ngandu', role: 'Backend Developer' },
  { src: 'https://avatars.githubusercontent.com/u/68236786?v=4', name: 'Theo Balick', role: 'UI/UX Designer' },
  { src: 'https://avatars.githubusercontent.com/u/99137927?v=4', name: 'Glodie Lukose', role: 'Project Manager' },
  { src: 'https://avatars.githubusercontent.com/u/12345678?v=4', name: 'Sarah Johnson', role: 'DevOps Engineer' },
  { src: 'https://avatars.githubusercontent.com/u/23456789?v=4', name: 'Michael Chen', role: 'QA Specialist' },
  { src: 'https://avatars.githubusercontent.com/u/34567890?v=4', name: 'Aisha Patel', role: 'Data Scientist' },
  { src: 'https://avatars.githubusercontent.com/u/45678901?v=4', name: 'Carlos Rodriguez', role: 'Product Manager' },
  { src: 'https://avatars.githubusercontent.com/u/56789012?v=4', name: 'Emma Wilson', role: 'Content Strategist' },
]

export default function TeamSection() {
  return (
    <section className="bg-muted/50">
      <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-10 md:mb-12">
          <h2 className="text-foreground text-balance text-4xl font-semibold md:text-5xl">
            Meet Our Team
          </h2>
          <p className="text-muted-foreground mt-4 max-w-3xl text-pretty text-lg leading-relaxed">
            Our talented professionals bring diverse expertise and passion to every project. Together,
            we collaborate to deliver exceptional results and innovative solutions for our clients.
          </p>

          <Button asChild variant="outline" className="mt-6 h-9 rounded-full pr-2">
            <Link href="#">
              We&apos;re hiring
              <ChevronRight className="ml-1 size-4 opacity-60" />
            </Link>
          </Button>
        </div>

        {/* Members */}
        <div
          role="list"
          aria-label="Team members"
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6"
        >
          {members.map((member, index) => (
            <HoverCard key={index} openDelay={150}>
              {/* Chip trigger */}
              <HoverCardTrigger
                className={[
                  "grid cursor-pointer grid-cols-[auto_1fr] items-center gap-3",
                  "rounded-(--radius) border bg-background p-3 shadow-sm ring-1 ring-foreground/5",
                  "transition-colors hover:bg-background/80 focus:outline-none",
                  "data-[state=open]:ring-2 data-[state=open]:ring-foreground/20",
                ].join(" ")}
              >
                <Avatar className="rounded-(--radius) size-10 border border-transparent shadow ring-1 ring-foreground/10">
                  <AvatarImage src={member.src} alt={member.name} />
                  <AvatarFallback className="rounded-(--radius) text-sm">
                    {member.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <span className="text-foreground block truncate text-[15px] font-semibold">
                  {member.name}
                </span>
              </HoverCardTrigger>

              {/* Popover card */}
              <HoverCardContent
                data-theme="mist"
                align="start"
                sideOffset={8}
                className={[
                  "w-80 rounded-(--radius) p-4",
                  "border bg-background shadow-lg ring-1 ring-foreground/5",
                ].join(" ")}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="rounded-(--radius) size-12 border border-transparent shadow ring-1 ring-foreground/10">
                        <AvatarImage src={member.src} alt={member.name} />
                        <AvatarFallback className="rounded-(--radius)">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="text-foreground truncate text-sm font-semibold sm:text-base">
                          {member.name}
                        </div>
                        <div className="text-muted-foreground truncate text-xs sm:text-sm">
                          {member.role}
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      aria-label={`${member.name} on X (Twitter)`}
                      className="shrink-0"
                    >
                      <Link href="https://x.com/MeschacIrung">
                        <Twitter className="size-4 fill-muted-foreground stroke-muted-foreground" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>
    </section>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/team.tsx
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

const members = [
  { src: 'https://avatars.githubusercontent.com/u/47919550?v=4', name: 'Meschac Irung', role: 'Frontend Engineer' },
  { src: 'https://avatars.githubusercontent.com/u/31113941?v=4', name: 'Bernard Ngandu', role: 'Backend Developer' },
  { src: 'https://avatars.githubusercontent.com/u/68236786?v=4', name: 'Theo Balick', role: 'UI/UX Designer' },
  { src: 'https://avatars.githubusercontent.com/u/99137927?v=4', name: 'Glodie Lukose', role: 'Project Manager' },
  { src: 'https://avatars.githubusercontent.com/u/12345678?v=4', name: 'Sarah Johnson', role: 'DevOps Engineer' },
  { src: 'https://avatars.githubusercontent.com/u/23456789?v=4', name: 'Michael Chen', role: 'QA Specialist' },
  { src: 'https://avatars.githubusercontent.com/u/34567890?v=4', name: 'Aisha Patel', role: 'Data Scientist' },
  { src: 'https://avatars.githubusercontent.com/u/45678901?v=4', name: 'Carlos Rodriguez', role: 'Product Manager' },
  { src: 'https://avatars.githubusercontent.com/u/56789012?v=4', name: 'Emma Wilson', role: 'Content Strategist' },
]

export default function TeamSection() {
  return (
    <section className="bg-muted/50">
      <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-10 md:mb-12">
          <h2 className="text-foreground text-balance text-4xl font-semibold md:text-5xl">
            Meet Our Team
          </h2>
          <p className="text-muted-foreground mt-4 max-w-3xl text-pretty text-lg leading-relaxed">
            Our talented professionals bring diverse expertise and passion to every project. Together,
            we collaborate to deliver exceptional results and innovative solutions for our clients.
          </p>

          <Button asChild variant="outline" className="mt-6 h-9 rounded-full pr-2">
            <Link href="#">
              We&apos;re hiring
              <ChevronRight className="ml-1 size-4 opacity-60" />
            </Link>
          </Button>
        </div>

        {/* Grid */}
        <div
          role="list"
          aria-label="Team members"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {members.map((member, i) => (
            <div
              key={i}
              role="listitem"
              className="grid grid-cols-[auto_1fr] items-center gap-3 rounded-(--radius) border bg-background p-3 shadow-sm ring-1 ring-foreground/5"
            >
              <Avatar className="rounded-(--radius) size-12 border border-transparent shadow ring-1 ring-foreground/10">
                <AvatarImage src={member.src} alt={member.name} />
                <AvatarFallback className="rounded-(--radius) text-base">
                  {member.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <span className="text-foreground block truncate text-[15px] font-semibold">
                  {member.name}
                </span>
                <span className="text-muted-foreground block truncate text-sm">
                  {member.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

```

Install NPM dependencies:
```bash
lucide-react, next
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
