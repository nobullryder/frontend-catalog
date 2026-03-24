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
footer.tsx

import Link from 'next/link'

// Import generic icons from lucide-react
import {
    Globe, // Could represent a website or general online presence
    Share2, // Could represent sharing/social media in general
    MessageCircle, // Could represent communication/social
    Link as LinkIcon, // Renamed to avoid conflict with Next.js Link
    Send, // Could represent sending a message, a bit like a paper plane for social
    Feather, // Could be an abstract representation for a 'feed' or 'post'
} from 'lucide-react'

const links = [
    {
        title: 'Features',
        href: '#',
    },
    {
        title: 'Solution',
        href: '#',
    },
    {
        title: 'Customers',
        href: '#',
    },
    {
        title: 'Pricing',
        href: '#',
    },
    {
        title: 'Help',
        href: '#',
    },
    {
        title: 'About',
        href: '#',
    },
]

export default function FooterSection() {
    return (
        <footer className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <Link
                    href="/"
                    aria-label="go home"
                    className="mx-auto block size-fit">
                </Link>

                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-muted-foreground hover:text-primary block duration-150">
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>
                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {/* Using generic icons for social links */}
                    <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Social Link 1" // Generic label
                        className="text-muted-foreground hover:text-primary block">
                        <Share2 className="size-6" /> {/* Generic "Share" icon */}
                    </Link>
                    <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Social Link 2"
                        className="text-muted-foreground hover:text-primary block">
                        <MessageCircle className="size-6" /> {/* Generic "Message" icon */}
                    </Link>
                    <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Social Link 3"
                        className="text-muted-foreground hover:text-primary block">
                        <LinkIcon className="size-6" /> {/* Generic "Link" icon */}
                    </Link>
                    <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Social Link 4"
                        className="text-muted-foreground hover:text-primary block">
                        <Globe className="size-6" /> {/* Generic "Globe" (website/world) icon */}
                    </Link>
                    <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Social Link 5"
                        className="text-muted-foreground hover:text-primary block">
                        <Send className="size-6" /> {/* Generic "Send" icon */}
                    </Link>
                    <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Social Link 6"
                        className="text-muted-foreground hover:text-primary block">
                        <Feather className="size-6" /> {/* Generic "Feather" (post/write) icon */}
                    </Link>
                </div>
                <span className="text-muted-foreground block text-center text-sm"> © {new Date().getFullYear()} Tailark, All rights reserved</span>
            </div>
        </footer>
    )
}

code.demo.1755261493986.tsx
import Link from 'next/link'

const links = [
    {
        group: 'Product',
        items: [
            {
                title: 'Features',
                href: '#',
            },
            {
                title: 'Solution',
                href: '#',
            },
        ],
    },
    {
        group: 'Company',
        items: [
            {
                title: 'About',
                href: '#',
            },
            {
                title: 'Licence',
                href: '#',
            },
            {
                title: 'Privacy',
                href: '#',
            },
            {
                title: 'Cookies',
                href: '#',
            },
        ],
    },
]

export default function FooterSection() {
    return (
        <footer className="bg-background border-b py-8 sm:py-20">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-12 md:grid-cols-5">
                    <div className="space-y-6 md:col-span-2">
                        <Link
                            href="/"
                            aria-label="go home"
                            className="block size-fit">
                            
                        </Link>

                        <div className="order-first flex flex-wrap gap-6 text-sm md:order-last">
                            <Link
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="X/Twitter"
                                className="text-muted-foreground hover:text-primary block">
                                <svg
                                    className="size-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"></path>
                                </svg>
                            </Link>
                            <Link
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="text-muted-foreground hover:text-primary block">
                                <svg
                                    className="size-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>

                    <div className="col-span-3 grid gap-6 sm:grid-cols-3">
                        {links.map((link, index) => (
                            <div
                                key={index}
                                className="space-y-4">
                                <span className="block font-medium">{link.group}</span>

                                <div className="flex flex-wrap gap-4 sm:flex-col">
                                    {link.items.map((item, index) => (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            className="text-muted-foreground hover:text-primary block duration-150">
                                            <span>{item.title}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/footer.tsx

import Link from 'next/link'

// Import generic icons from lucide-react
import {
    Globe, // Could represent a website or general online presence
    Share2, // Could represent sharing/social media in general
    MessageCircle, // Could represent communication/social
    Link as LinkIcon, // Renamed to avoid conflict with Next.js Link
    Send, // Could represent sending a message, a bit like a paper plane for social
    Feather, // Could be an abstract representation for a 'feed' or 'post'
} from 'lucide-react'

const links = [
    {
        title: 'Features',
        href: '#',
    },
    {
        title: 'Solution',
        href: '#',
    },
    {
        title: 'Customers',
        href: '#',
    },
    {
        title: 'Pricing',
        href: '#',
    },
    {
        title: 'Help',
        href: '#',
    },
    {
        title: 'About',
        href: '#',
    },
]

export default function FooterSection() {
    return (
        <footer className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <Link
                    href="/"
                    aria-label="go home"
                    className="mx-auto block size-fit">
                </Link>

                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-muted-foreground hover:text-primary block duration-150">
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>
                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {/* Using generic icons for social links */}
                    <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Social Link 1" // Generic label
                        className="text-muted-foreground hover:text-primary block">
                        <Share2 className="size-6" /> {/* Generic "Share" icon */}
                    </Link>
                    <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Social Link 2"
                        className="text-muted-foreground hover:text-primary block">
                        <MessageCircle className="size-6" /> {/* Generic "Message" icon */}
                    </Link>
                    <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Social Link 3"
                        className="text-muted-foreground hover:text-primary block">
                        <LinkIcon className="size-6" /> {/* Generic "Link" icon */}
                    </Link>
                    <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Social Link 4"
                        className="text-muted-foreground hover:text-primary block">
                        <Globe className="size-6" /> {/* Generic "Globe" (website/world) icon */}
                    </Link>
                    <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Social Link 5"
                        className="text-muted-foreground hover:text-primary block">
                        <Send className="size-6" /> {/* Generic "Send" icon */}
                    </Link>
                    <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Social Link 6"
                        className="text-muted-foreground hover:text-primary block">
                        <Feather className="size-6" /> {/* Generic "Feather" (post/write) icon */}
                    </Link>
                </div>
                <span className="text-muted-foreground block text-center text-sm"> © {new Date().getFullYear()} Tailark, All rights reserved</span>
            </div>
        </footer>
    )
}
```

Install NPM dependencies:
```bash
next, lucide-react
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
