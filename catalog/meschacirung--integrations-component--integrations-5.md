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
integrations-component.tsx
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

export default function IntegrationsSection() {
  return (
    <section>
      <div className="py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-semibold md:text-4xl">
              Integrate with your favorite tools
            </h2>
            <p className="text-muted-foreground mt-6">
              Connect seamlessly with popular platforms and services to enhance your workflow.
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <IntegrationCard
              title="GitHub"
              description="Version control and collaboration platform for developers.">
              <GitHubLogo />
            </IntegrationCard>

            <IntegrationCard
              title="Slack"
              description="Team communication and collaboration hub.">
              <SlackLogo />
            </IntegrationCard>

            <IntegrationCard
              title="Notion"
              description="All-in-one workspace for notes, tasks, and projects.">
              <NotionLogo />
            </IntegrationCard>

            <IntegrationCard
              title="Figma"
              description="Collaborative design and prototyping platform.">
              <FigmaLogo />
            </IntegrationCard>

            <IntegrationCard
              title="Discord"
              description="Voice, video, and text chat platform for communities.">
              <DiscordLogo />
            </IntegrationCard>

            <IntegrationCard
              title="VS Code"
              description="Lightweight but powerful source code editor.">
              <VSCodeLogo />
            </IntegrationCard>
          </div>
        </div>
      </div>
    </section>
  )
}

const IntegrationCard = ({
  title,
  description,
  children,
  link = 'https://github.com/meschacirung/cnblocks',
}: {
  title: string
  description: string
  children: React.ReactNode
  link?: string
}) => {
  return (
    <Card className="p-6">
      <div className="relative">
        <div className="*:size-10">{children}</div>

        <div className="space-y-2 py-6">
          <h3 className="text-base font-medium">{title}</h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">{description}</p>
        </div>

        <div className="flex gap-3 border-t border-dashed pt-6">
          <Button asChild variant="secondary" size="sm" className="gap-1 pr-2 shadow-none">
            <Link href={link}>
              Learn More
              <ChevronRight className="ml-0 !size-3.5 opacity-50" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}

// --- Logos (inline SVG) ---
const GitHubLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="text-black">
    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577 
    0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 
    1.204.085 1.838 1.237 1.838 1.237 1.07 1.835 2.807 1.304 3.492.997.108-.775.42-1.304.763-1.604-2.665-.3-5.466-1.333-5.466-5.93 
    0-1.31.47-2.38 1.236-3.22-.124-.303-.536-1.52.117-3.167 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3-.404c1.02.004 2.045.137 
    3 .404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.647.243 2.864.12 3.167.77.84 1.235 1.91 1.235 3.22 
    0 4.61-2.803 5.625-5.475 5.92.431.372.816 1.102.816 2.222 0 1.606-.015 2.9-.015 3.293 
    0 .32.19.694.8.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)

const SlackLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="text-purple-600">
    <path d="M5.2 15.7a2.6 2.6 0 1 1 0 5.2H2.6a2.6 2.6 0 1 1 0-5.2H5.2zm1.3-1.3a2.6 2.6 0 1 1 0-5.2h2.6v5.2H6.5zm6.5-6.5a2.6 2.6 0 1 1 5.2 0v2.6h-5.2V7.9zm-1.3 1.3a2.6 2.6 0 1 1 0 5.2H9.1V9.2h2.6zm8.4 0a2.6 2.6 0 1 1 0 5.2h-2.6V9.2h2.6zM15.7 5.2a2.6 2.6 0 1 1 0 5.2h-2.6V5.2h2.6zM9.2 2.6a2.6 2.6 0 1 1 0 5.2H6.6V2.6h2.6z" />
  </svg>
)

const NotionLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="text-gray-900">
    <path d="M4 3.5l16-1.5 0 19-16 1.5V3.5zm2 3.7v9.6l8 .6v-9.6l-8-.6z" />
  </svg>
)

const FigmaLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="text-pink-500">
    <path d="M12 4a4 4 0 100 8 4 4 0 000-8zM12 12a4 4 0 100 8 4 4 0 000-8zM4 4a4 4 0 100 8 4 4 0 000-8zM20 4a4 4 0 100 8 4 4 0 000-8zM12 20a4 4 0 100 8 4 4 0 000-8z" />
  </svg>
)

const DiscordLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="text-indigo-500">
    <path d="M20 0H4C1.79 0 0 1.79 0 4v16c0 2.21 1.79 4 4 4h12l-1-3h5l1 3c2.21 0 4-1.79 4-4V4c0-2.21-1.79-4-4-4z" />
  </svg>
)

const VSCodeLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
    <path d="M4 3l16 9-16 9V3zm4 5v8l6-4-6-4z" />
  </svg>
)


code.demo.1753817940760.tsx
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

// --- Начало: SVG-компоненты, заменяющие импорт ---

// Заглушка для вашего основного логотипа
const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
);

const Gemini = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12.0001 9.1716L14.8285 6.34313L17.6569 9.1716L14.8285 12.0001L12.0001 9.1716Z" />
        <path d="M9.17157 12.0001L6.34311 14.8285L9.17157 17.6569L12.0001 14.8285L9.17157 12.0001Z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" />
    </svg>
);

const Replit = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M8.28,3.027,3.16,8.147v7.706l5.12,5.12h7.706l5.12-5.12V8.147L15.987,3.027ZM9.033,9.44h5.933v2.373H9.033Zm0,3.56h5.933v2.373H9.033Z" />
    </svg>
);

const MagicUI = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 3v6M6.343 6.343l4.243 4.243M3 12h6m-1.657 5.657l4.243-4.243M12 21v-6m5.657-4.343l-4.243 4.243M21 12h-6m1.657-5.657l-4.243 4.243" />
    </svg>
);

const VSCodium = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M22.5 1.5l-13 10.375v9.625l13 1.5V1.5zm-14.5.5L1.625 8.125 8 12l-6.375 3.875L8 22l6.5-4.5V5z" />
    </svg>
);

const MediaWiki = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4.11 15.35c.42 0 .8-.14 1.09-.42l1.01-1.02a.84.84 0 00.25-.6c0-.23-.08-.44-.25-.6L4.25 10.7a1.44 1.44 0 00-1.09-.44c-.41 0-.8.15-1.1.44l-.8.8c-.3.3-.44.68-.44 1.1s.15.8.44 1.1l.8.8c.3.28.68.41 1.09.41zm15.78 0c.41 0 .8-.14 1.09-.42l.8-.8c.3-.3.44-.68-.44-1.1s-.14-.8-.44-1.1l-.8-.8a1.44 1.44 0 00-1.09-.44c-.42 0-.8.15-1.09.44l-1.96 1.97c-.17.16-.25.37-.25.6s.08.44.25.6l1.01 1.02c.28.28.67.42 1.09.42zM12 2.01c.41 0 .8.15 1.1.44l.8.8c.3.3.44.68.44 1.1s-.14.8-.44 1.1l-1.95 1.96a.84.84 0 01-.6.25c-.24 0-.45-.08-.61-.25L9.72 6.46a1.44 1.44 0 01-.44-1.1c0-.41.15-.8.44-1.1l.8-.8c.3-.3.68-.44 1.09-.44zm0 11.28c.41 0 .8.14 1.09.42l1.01 1.01c.17.17.25.38.25.61s-.08.44-.25.6L12.09 18a1.44 1.44 0 01-1.09.44c-.41 0-.8-.14-1.09-.44l-1.01-1.01a.84.84 0 01-.25-.6c0-.24.08-.45.25-.61l2-1.96c.28-.28.67-.42 1.09-.42zm-2.65 6.36c.42 0 .8-.14 1.09-.42l1.96-1.96a.84.84 0 00.25-.6c0-.24-.08-.45-.25-.61L9.4 14.1c-.3-.3-.68-.44-1.09-.44-.41 0-.8.15-1.09.44l-.8.8c-.3.3-.44.68-.44 1.1s.15.8.44 1.1l.8.8c.3.28.68.41 1.09.41zm10.6-5.26c-.17-.17-.38-.25-.6-.25-.24 0-.45.08-.61.25l-2 1.96c-.3.3-.44.68-.44 1.09s.14.8.44 1.09l1.01 1.01c.28.28.67.42 1.09.42.41 0 .8-.14 1.09-.42l.8-.8c.3-.3.44-.68-.44-1.1s-.14-.8-.44-1.1l-.8-.8a1.44 1.44 0 00-1.09-.44z"/>
    </svg>
);

const GooglePaLM = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 2a10 10 0 0 0-4.32 19.14" />
        <path d="M12 2a10 10 0 0 1 4.32 19.14" />
        <path d="M12 2v8" />
        <path d="M17.68 6.86a6 6 0 0 1-11.36 0" />
        <path d="M4 12H2" />
        <path d="M22 12h-2" />
        <path d="M12 12v10" />
    </svg>
);

// --- Конец SVG-компонентов ---


export default function IntegrationsSection() {
    return (
        <section>
            <div className="py-24 md:py-32">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="aspect-16/10 group relative mx-auto flex max-w-[22rem] items-center justify-between sm:max-w-sm">
                        <div
                            role="presentation"
                            className="bg-linear-to-b border-foreground/5 absolute inset-0 z-10 aspect-square animate-spin items-center justify-center rounded-full border-t from-lime-500/15 to-transparent to-25% opacity-0 duration-[3.5s] group-hover:opacity-100 dark:from-white/5"></div>
                        <div
                            role="presentation"
                            className="bg-linear-to-b border-foreground/5 absolute inset-16 z-10 aspect-square scale-90 animate-spin items-center justify-center rounded-full border-t from-blue-500/15 to-transparent to-25% opacity-0 duration-[3.5s] group-hover:opacity-100"></div>
                        <div className="bg-linear-to-b from-muted-foreground/15 absolute inset-0 flex aspect-square items-center justify-center rounded-full border-t to-transparent to-25%">
                            <IntegrationCard className="-translate-x-1/6 absolute left-0 top-1/4 -translate-y-1/4">
                                <Gemini />
                            </IntegrationCard>
                            <IntegrationCard className="absolute top-0 -translate-y-1/2">
                                <Replit />
                            </IntegrationCard>
                            <IntegrationCard className="translate-x-1/6 absolute right-0 top-1/4 -translate-y-1/4">
                                <MagicUI />
                            </IntegrationCard>
                        </div>
                        <div className="bg-linear-to-b from-muted-foreground/15 absolute inset-16 flex aspect-square scale-90 items-center justify-center rounded-full border-t to-transparent to-25%">
                            <IntegrationCard className="absolute top-0 -translate-y-1/2">
                                <VSCodium />
                            </IntegrationCard>
                            <IntegrationCard className="absolute left-0 top-1/4 -translate-x-1/4 -translate-y-1/4">
                                <MediaWiki />
                            </IntegrationCard>
                            <IntegrationCard className="absolute right-0 top-1/4 -translate-y-1/4 translate-x-1/4">
                                <GooglePaLM />
                            </IntegrationCard>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 mx-auto my-2 flex w-fit justify-center gap-2">
                            <div className="bg-muted relative z-20 rounded-full border p-1">
                                <IntegrationCard
                                    className="shadow-black-950/10 dark:bg-background size-16 border-black/20 shadow-xl dark:border-white/25 dark:shadow-white/15"
                                    isCenter={true}>
                                    <LogoIcon className="text-blue-500" />
                                </IntegrationCard>
                            </div>
                        </div>
                    </div>
                    <div className="bg-linear-to-t from-background relative z-20 mx-auto mt-12 max-w-lg space-y-6 from-55% text-center">
                        <h2 className="text-balance text-3xl font-semibold md:text-4xl">Integrate with your favorite tools</h2>
                        <p className="text-muted-foreground">Connect seamlessly with popular platforms and services to enhance your workflow.</p>

                        <Button
                            variant="outline"
                            size="sm"
                            asChild>
                            <Link href="#">Get Started</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

const IntegrationCard = ({ children, className, isCenter = false }: { children: React.ReactNode; className?: string; isCenter?: boolean }) => {
    return (
        <div className={cn('relative z-30 flex size-12 rounded-full border bg-white shadow-sm shadow-black/5 dark:bg-white/5 dark:backdrop-blur-md', className)}>
            <div className={cn('m-auto size-fit *:size-5', isCenter && '*:size-8')}>{children}</div>
        </div>
    )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/integrations-component.tsx
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

export default function IntegrationsSection() {
  return (
    <section>
      <div className="py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-semibold md:text-4xl">
              Integrate with your favorite tools
            </h2>
            <p className="text-muted-foreground mt-6">
              Connect seamlessly with popular platforms and services to enhance your workflow.
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <IntegrationCard
              title="GitHub"
              description="Version control and collaboration platform for developers.">
              <GitHubLogo />
            </IntegrationCard>

            <IntegrationCard
              title="Slack"
              description="Team communication and collaboration hub.">
              <SlackLogo />
            </IntegrationCard>

            <IntegrationCard
              title="Notion"
              description="All-in-one workspace for notes, tasks, and projects.">
              <NotionLogo />
            </IntegrationCard>

            <IntegrationCard
              title="Figma"
              description="Collaborative design and prototyping platform.">
              <FigmaLogo />
            </IntegrationCard>

            <IntegrationCard
              title="Discord"
              description="Voice, video, and text chat platform for communities.">
              <DiscordLogo />
            </IntegrationCard>

            <IntegrationCard
              title="VS Code"
              description="Lightweight but powerful source code editor.">
              <VSCodeLogo />
            </IntegrationCard>
          </div>
        </div>
      </div>
    </section>
  )
}

const IntegrationCard = ({
  title,
  description,
  children,
  link = 'https://github.com/meschacirung/cnblocks',
}: {
  title: string
  description: string
  children: React.ReactNode
  link?: string
}) => {
  return (
    <Card className="p-6">
      <div className="relative">
        <div className="*:size-10">{children}</div>

        <div className="space-y-2 py-6">
          <h3 className="text-base font-medium">{title}</h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">{description}</p>
        </div>

        <div className="flex gap-3 border-t border-dashed pt-6">
          <Button asChild variant="secondary" size="sm" className="gap-1 pr-2 shadow-none">
            <Link href={link}>
              Learn More
              <ChevronRight className="ml-0 !size-3.5 opacity-50" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}

// --- Logos (inline SVG) ---
const GitHubLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="text-black">
    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577 
    0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 
    1.204.085 1.838 1.237 1.838 1.237 1.07 1.835 2.807 1.304 3.492.997.108-.775.42-1.304.763-1.604-2.665-.3-5.466-1.333-5.466-5.93 
    0-1.31.47-2.38 1.236-3.22-.124-.303-.536-1.52.117-3.167 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3-.404c1.02.004 2.045.137 
    3 .404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.647.243 2.864.12 3.167.77.84 1.235 1.91 1.235 3.22 
    0 4.61-2.803 5.625-5.475 5.92.431.372.816 1.102.816 2.222 0 1.606-.015 2.9-.015 3.293 
    0 .32.19.694.8.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)

const SlackLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="text-purple-600">
    <path d="M5.2 15.7a2.6 2.6 0 1 1 0 5.2H2.6a2.6 2.6 0 1 1 0-5.2H5.2zm1.3-1.3a2.6 2.6 0 1 1 0-5.2h2.6v5.2H6.5zm6.5-6.5a2.6 2.6 0 1 1 5.2 0v2.6h-5.2V7.9zm-1.3 1.3a2.6 2.6 0 1 1 0 5.2H9.1V9.2h2.6zm8.4 0a2.6 2.6 0 1 1 0 5.2h-2.6V9.2h2.6zM15.7 5.2a2.6 2.6 0 1 1 0 5.2h-2.6V5.2h2.6zM9.2 2.6a2.6 2.6 0 1 1 0 5.2H6.6V2.6h2.6z" />
  </svg>
)

const NotionLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="text-gray-900">
    <path d="M4 3.5l16-1.5 0 19-16 1.5V3.5zm2 3.7v9.6l8 .6v-9.6l-8-.6z" />
  </svg>
)

const FigmaLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="text-pink-500">
    <path d="M12 4a4 4 0 100 8 4 4 0 000-8zM12 12a4 4 0 100 8 4 4 0 000-8zM4 4a4 4 0 100 8 4 4 0 000-8zM20 4a4 4 0 100 8 4 4 0 000-8zM12 20a4 4 0 100 8 4 4 0 000-8z" />
  </svg>
)

const DiscordLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="text-indigo-500">
    <path d="M20 0H4C1.79 0 0 1.79 0 4v16c0 2.21 1.79 4 4 4h12l-1-3h5l1 3c2.21 0 4-1.79 4-4V4c0-2.21-1.79-4-4-4z" />
  </svg>
)

const VSCodeLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
    <path d="M4 3l16 9-16 9V3zm4 5v8l6-4-6-4z" />
  </svg>
)

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
