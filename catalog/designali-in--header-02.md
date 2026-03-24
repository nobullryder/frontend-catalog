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
header-02.tsx
"use client";

import * as React from "react";
import { Equal, ArrowRight, Moon, Sun } from "@aliimam/icons"; 
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import {
  ArrowUpRightIcon,
  PaletteIcon,
  FilePlus2Icon,
  LayoutTemplateIcon,
  SearchIcon,
  PenToolIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; 
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Overview", href: "#", active: true },
    { label: "Design Systems", href: "#" },
    { label: "UI Kits", href: "#" },
    { label: "Brand Assets", href: "#" },
    { label: "Templates", href: "#" },
    { label: "Workshops", href: "#" },
    { label: "Design Labs", href: "#" },
    { label: "Case Studies", href: "#" },
    { label: "Resources", href: "#" },
  ];

  const properties = [
    {
      location: "Design Hub – India",
      venues: [{ name: "Creative Studio", href: "#" }],
    },
    {
      location: "Design Hub – Global",
      venues: [
        { name: "UI/UX Studio", href: "#" },
        { name: "Branding Lab", href: "#" },
      ],
    },
  ];

  return (
    <>
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <a
              href="#"
              aria-label="home"
              className="flex gap-2 whitespace-nowrap items-center"
            >
              <img
                src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/brand/ai-logo-white.png"
                alt="Design Logo"
                height={50}
                width={50}
                className="h-10 z-10 w-full hidden dark:block object-contain"
              />
              <img
                src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/brand/ai-logo-black.png"
                alt="Design Logo"
                height={50}
                width={50}
                className="h-10 z-10 w-full dark:hidden block object-contain"
              />
              <span className="font-semibold text-xl">Ali Imam</span>
            </a>

             <Search/>
 
            <div className="flex items-center gap-2">
               <ModeToggle />
              <Button className="md:flex items-center hidden gap-2">
                <span>Start Designing</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
 
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}> 
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Equal className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-full sm:w-[400px] overflow-y-auto"
                >
                  <div className="m-6 mt-14"> 
                    <Accordion type="single" collapsible className="mb-8">
                      <AccordionItem value="navigation" className="border-none">
                        <AccordionTrigger className="bg-accent hover:bg-accent/80 px-4 rounded-lg hover:no-underline">
                          <div className="text-left">
                            <div className="font-medium">Design Hub</div>
                            <div className="text-sm text-muted-foreground">
                              / Overview
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2">
                          <div className=" border rounded-lg overflow-hidden">
                            {navItems.map((item, idx) => (
                              <a
                                key={idx}
                                href={item.href}
                                className={`block px-4 py-3 text-sm border-b last:border-b-0 hover:bg-accent transition-colors ${
                                  item.active ? "bg-accent font-medium" : ""
                                }`}
                                onClick={() => setMobileOpen(false)}
                              >
                                {item.label}
                              </a>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
 
                    <div className="space-y-6">
                      {properties.map((property, idx) => (
                        <div key={idx}>
                          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                            {property.location}
                          </p>
                          <ul className="space-y-2">
                            {property.venues.map((venue, vIdx) => (
                              <li key={vIdx} className="border-t border-black">
                                <a
                                  href={venue.href}
                                  className="block py-3 text-lg font-medium hover:text-muted-foreground transition-colors"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {venue.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Desktop Secondary Navigation */}
          <nav className="hidden lg:block border-t">
            <ul className="flex justify-center items-center -mx-2">
              {navItems.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className={`block px-4 py-3 text-sm transition-colors ${
                      item.active
                        ? "border-b-2 border-primary font-semibold"
                        : "hover:bg-primary/20"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export function Search() {
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])
  return (
    <>
      <button
        className="border-input max-w-lg hidden bg-background text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 lg:inline-flex h-9 w-full rounded-md border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
        onClick={() => setOpen(true)}
      >
        <span className="flex grow items-center">
          <SearchIcon
            className="text-muted-foreground/80 -ms-1 me-3"
            size={16}
            aria-hidden="true"
          />
          <span className="text-muted-foreground/70 font-normal">
            Search design tools...
          </span>
        </span>
        <kbd className="bg-background text-muted-foreground/70 ms-12 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
          ⌘K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search components, assets, or docs..." />
        <CommandList>
          <CommandEmpty>No matches found.</CommandEmpty>
          <CommandGroup heading="Create">
            <CommandItem>
              <FilePlus2Icon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>New project</span>
              <CommandShortcut className="justify-center">⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <LayoutTemplateIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>New template</span>
              <CommandShortcut className="justify-center">⌘T</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <PenToolIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Start design</span>
              <CommandShortcut className="justify-center">⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Navigate">
            <CommandItem>
              <ArrowUpRightIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Go to workspace</span>
            </CommandItem>
            <CommandItem>
              <ArrowUpRightIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Go to assets</span>
            </CommandItem>
            <CommandItem>
              <ArrowUpRightIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Go to documentation</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Themes">
            <CommandItem>
              <PaletteIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Switch theme</span>
              <CommandShortcut>⌘⇧T</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <div className="flex flex-col justify-center">
      <div>
        <Toggle
          className="group bg-secondary dark:bg-secondary data-[state=on]:hover:bg-muted cursor-pointer size-9 data-[state=on]:bg-transparent"
          pressed={theme === "dark"}
          onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          <Moon
            size={16}
            className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
            aria-hidden="true"
          />
          <Sun
            size={16}
            className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
            aria-hidden="true"
          />
        </Toggle>
      </div>
    </div>
  );
}
 

code.demo.1760030879210.tsx
import { Header } from "@/components/ui/header-02";

export default function DemoOne() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header /> 
      <main className="flex-1">
        <section className="h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold">Hero</h1>
        </section> 
        <section className="h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold">Section</h1>
        </section>
      </main>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/header-02.tsx
"use client";

import * as React from "react";
import { Equal, ArrowRight, Moon, Sun } from "@aliimam/icons"; 
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import {
  ArrowUpRightIcon,
  PaletteIcon,
  FilePlus2Icon,
  LayoutTemplateIcon,
  SearchIcon,
  PenToolIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; 
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Overview", href: "#", active: true },
    { label: "Design Systems", href: "#" },
    { label: "UI Kits", href: "#" },
    { label: "Brand Assets", href: "#" },
    { label: "Templates", href: "#" },
    { label: "Workshops", href: "#" },
    { label: "Design Labs", href: "#" },
    { label: "Case Studies", href: "#" },
    { label: "Resources", href: "#" },
  ];

  const properties = [
    {
      location: "Design Hub – India",
      venues: [{ name: "Creative Studio", href: "#" }],
    },
    {
      location: "Design Hub – Global",
      venues: [
        { name: "UI/UX Studio", href: "#" },
        { name: "Branding Lab", href: "#" },
      ],
    },
  ];

  return (
    <>
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <a
              href="#"
              aria-label="home"
              className="flex gap-2 whitespace-nowrap items-center"
            >
              <img
                src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/brand/ai-logo-white.png"
                alt="Design Logo"
                height={50}
                width={50}
                className="h-10 z-10 w-full hidden dark:block object-contain"
              />
              <img
                src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/brand/ai-logo-black.png"
                alt="Design Logo"
                height={50}
                width={50}
                className="h-10 z-10 w-full dark:hidden block object-contain"
              />
              <span className="font-semibold text-xl">Ali Imam</span>
            </a>

             <Search/>
 
            <div className="flex items-center gap-2">
               <ModeToggle />
              <Button className="md:flex items-center hidden gap-2">
                <span>Start Designing</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
 
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}> 
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Equal className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-full sm:w-[400px] overflow-y-auto"
                >
                  <div className="m-6 mt-14"> 
                    <Accordion type="single" collapsible className="mb-8">
                      <AccordionItem value="navigation" className="border-none">
                        <AccordionTrigger className="bg-accent hover:bg-accent/80 px-4 rounded-lg hover:no-underline">
                          <div className="text-left">
                            <div className="font-medium">Design Hub</div>
                            <div className="text-sm text-muted-foreground">
                              / Overview
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2">
                          <div className=" border rounded-lg overflow-hidden">
                            {navItems.map((item, idx) => (
                              <a
                                key={idx}
                                href={item.href}
                                className={`block px-4 py-3 text-sm border-b last:border-b-0 hover:bg-accent transition-colors ${
                                  item.active ? "bg-accent font-medium" : ""
                                }`}
                                onClick={() => setMobileOpen(false)}
                              >
                                {item.label}
                              </a>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
 
                    <div className="space-y-6">
                      {properties.map((property, idx) => (
                        <div key={idx}>
                          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                            {property.location}
                          </p>
                          <ul className="space-y-2">
                            {property.venues.map((venue, vIdx) => (
                              <li key={vIdx} className="border-t border-black">
                                <a
                                  href={venue.href}
                                  className="block py-3 text-lg font-medium hover:text-muted-foreground transition-colors"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {venue.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Desktop Secondary Navigation */}
          <nav className="hidden lg:block border-t">
            <ul className="flex justify-center items-center -mx-2">
              {navItems.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className={`block px-4 py-3 text-sm transition-colors ${
                      item.active
                        ? "border-b-2 border-primary font-semibold"
                        : "hover:bg-primary/20"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export function Search() {
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])
  return (
    <>
      <button
        className="border-input max-w-lg hidden bg-background text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 lg:inline-flex h-9 w-full rounded-md border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
        onClick={() => setOpen(true)}
      >
        <span className="flex grow items-center">
          <SearchIcon
            className="text-muted-foreground/80 -ms-1 me-3"
            size={16}
            aria-hidden="true"
          />
          <span className="text-muted-foreground/70 font-normal">
            Search design tools...
          </span>
        </span>
        <kbd className="bg-background text-muted-foreground/70 ms-12 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
          ⌘K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search components, assets, or docs..." />
        <CommandList>
          <CommandEmpty>No matches found.</CommandEmpty>
          <CommandGroup heading="Create">
            <CommandItem>
              <FilePlus2Icon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>New project</span>
              <CommandShortcut className="justify-center">⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <LayoutTemplateIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>New template</span>
              <CommandShortcut className="justify-center">⌘T</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <PenToolIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Start design</span>
              <CommandShortcut className="justify-center">⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Navigate">
            <CommandItem>
              <ArrowUpRightIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Go to workspace</span>
            </CommandItem>
            <CommandItem>
              <ArrowUpRightIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Go to assets</span>
            </CommandItem>
            <CommandItem>
              <ArrowUpRightIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Go to documentation</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Themes">
            <CommandItem>
              <PaletteIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Switch theme</span>
              <CommandShortcut>⌘⇧T</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <div className="flex flex-col justify-center">
      <div>
        <Toggle
          className="group bg-secondary dark:bg-secondary data-[state=on]:hover:bg-muted cursor-pointer size-9 data-[state=on]:bg-transparent"
          pressed={theme === "dark"}
          onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          <Moon
            size={16}
            className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
            aria-hidden="true"
          />
          <Sun
            size={16}
            className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
            aria-hidden="true"
          />
        </Toggle>
      </div>
    </div>
  );
}
 
```

Install NPM dependencies:
```bash
@aliimam/icons, next-themes, lucide-react
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
