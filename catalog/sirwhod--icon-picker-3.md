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
icon-picker-3.tsx
import { useState, useEffect, useRef, useCallback } from 'react'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

const ICON_INITIAL_CHARGE = 20 * 5
const ICONS_BY_CHARGE = 6 * 3
const SCROLL_THRESHOLD = 100

interface IconPickerProps {
  icons: IconName[]
  onIconSelect: (iconName: IconName) => void
  selectedIcon?: IconName
  heightClassName?: string
}

export function IconPicker({
  icons,
  onIconSelect,
  selectedIcon,
  heightClassName = 'h-[280px]',
}: IconPickerProps) {
  const [visibleCount, setVisibleCount] = useState(ICON_INITIAL_CHARGE)
  const rootScrollAreaRef = useRef<HTMLDivElement>(null)
  const viewportScrollElementRef = useRef<HTMLElement | null>(null)

  const iconesAtuais = icons.slice(0, visibleCount)

  useEffect(() => {
    setVisibleCount(ICON_INITIAL_CHARGE)
    if (viewportScrollElementRef.current) {
      viewportScrollElementRef.current.scrollTop = 0
    }
  }, [icons])

  const loadMoreIcons = useCallback(() => {
    setVisibleCount((prevCount) => {
      if (prevCount >= icons.length) {
        return prevCount
      }
      return Math.min(prevCount + ICONS_BY_CHARGE, icons.length)
    })
  }, [icons.length])

  useEffect(() => {
    const rootElement = rootScrollAreaRef.current
    if (rootElement && !viewportScrollElementRef.current) {
      const viewport = rootElement.querySelector<HTMLElement>('[data-radix-scroll-area-viewport]')
      viewportScrollElementRef.current = viewport
    }

    const currentViewport = viewportScrollElementRef.current
    if (!currentViewport) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = currentViewport
      if (scrollHeight - scrollTop - clientHeight < SCROLL_THRESHOLD) {
        if (visibleCount < icons.length) {
          loadMoreIcons()
        }
      }
    }

    currentViewport.addEventListener('scroll', handleScroll)
    return () => {
      currentViewport.removeEventListener('scroll', handleScroll)
    }
  }, [loadMoreIcons, visibleCount, icons.length])

  return (
    <ScrollArea ref={rootScrollAreaRef} className={cn('w-full', heightClassName)}>
      <div className="p-2 grid grid-cols-5 sm:grid-cols-9 gap-1">
        {iconesAtuais.map((iconName) => (
          <div
            key={iconName}
            className={cn(
              'flex flex-col items-center justify-center text-center p-2 rounded-sm hover:bg-accent cursor-pointer group',
              selectedIcon === iconName && 'bg-accent text-accent-foreground ring-2 ring-primary',
            )}
            title={iconName}
            onClick={() => onIconSelect(iconName)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onIconSelect(iconName)}}
          >
            <DynamicIcon
              name={iconName}
              className={cn(
                'group-hover:scale-110 transition-transform',
                selectedIcon === iconName ? 'text-primary' : 'text-accent-foreground',
              )}
              size={16}
            />
          </div>
        ))}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  )
}

code.demo.1747856712722.tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState, useMemo } from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandInput,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { DynamicIcon,
  iconNames as allLucideIconNames, 
  type IconName as LucideIconName, 
} from 'lucide-react/dynamic'
import { toast } from 'sonner'
import { IconPicker } from '@/components/ui/icon-picker-3'
import { ChevronsUpDown } from 'lucide-react'

const IconFormSchema = z.object({
  icon: z.custom<LucideIconName>(
    (val) => typeof val === 'string' && allLucideIconNames.includes(val as LucideIconName),
    { message: 'Por favor, selecione um ícone válido.' },
  ).refine((val) => val !== undefined && val !== null, { message: 'Por favor, selecione um ícone.' }),
})

export function DemoFormIconPicker() {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const form = useForm<z.infer<typeof IconFormSchema>>({
    resolver: zodResolver(IconFormSchema),
    defaultValues: {
      icon: undefined,
    },
  })

  const filteredIconNames = useMemo(() => {
    if (!searchTerm.trim()) {
      return allLucideIconNames
    }
    return allLucideIconNames.filter((name) =>
      name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
    )
  }, [searchTerm])

  function onSubmit(data: z.infer<typeof IconFormSchema>) {
    toast.success(
      <div className="mt-2 flex items-center gap-2">
        {data.icon && <DynamicIcon name={data.icon} className="h-4 w-4" />}
        <pre className="text-sm rounded-md bg-slate-900 p-2 dark:bg-slate-800">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>,
    )
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xs space-y-6">
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Icon</FormLabel>
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={popoverOpen}
                        className={cn(
                          'w-16 justify-between',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          <div className="flex items-center">
                            <DynamicIcon name={field.value} className="h-4 w-4" />
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <div className="h-4 w-4 border-dashed border rounded-full" />
                          </div>
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[360px] p-2" align="start">
                    <Command shouldFilter={true}>
                      <CommandInput
                        placeholder="Search icon..."
                        value={searchTerm}
                        onValueChange={setSearchTerm}
                      />
                      <IconPicker
                        icons={filteredIconNames}
                        selectedIcon={field.value}
                        onIconSelect={(iconName) => {
                          form.setValue('icon', iconName, { shouldValidate: true })
                          setPopoverOpen(false)
                          setSearchTerm('')
                        }}
                      />
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Choose an icon to represent the category.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/icon-picker-3.tsx
import { useState, useEffect, useRef, useCallback } from 'react'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

const ICON_INITIAL_CHARGE = 20 * 5
const ICONS_BY_CHARGE = 6 * 3
const SCROLL_THRESHOLD = 100

interface IconPickerProps {
  icons: IconName[]
  onIconSelect: (iconName: IconName) => void
  selectedIcon?: IconName
  heightClassName?: string
}

export function IconPicker({
  icons,
  onIconSelect,
  selectedIcon,
  heightClassName = 'h-[280px]',
}: IconPickerProps) {
  const [visibleCount, setVisibleCount] = useState(ICON_INITIAL_CHARGE)
  const rootScrollAreaRef = useRef<HTMLDivElement>(null)
  const viewportScrollElementRef = useRef<HTMLElement | null>(null)

  const iconesAtuais = icons.slice(0, visibleCount)

  useEffect(() => {
    setVisibleCount(ICON_INITIAL_CHARGE)
    if (viewportScrollElementRef.current) {
      viewportScrollElementRef.current.scrollTop = 0
    }
  }, [icons])

  const loadMoreIcons = useCallback(() => {
    setVisibleCount((prevCount) => {
      if (prevCount >= icons.length) {
        return prevCount
      }
      return Math.min(prevCount + ICONS_BY_CHARGE, icons.length)
    })
  }, [icons.length])

  useEffect(() => {
    const rootElement = rootScrollAreaRef.current
    if (rootElement && !viewportScrollElementRef.current) {
      const viewport = rootElement.querySelector<HTMLElement>('[data-radix-scroll-area-viewport]')
      viewportScrollElementRef.current = viewport
    }

    const currentViewport = viewportScrollElementRef.current
    if (!currentViewport) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = currentViewport
      if (scrollHeight - scrollTop - clientHeight < SCROLL_THRESHOLD) {
        if (visibleCount < icons.length) {
          loadMoreIcons()
        }
      }
    }

    currentViewport.addEventListener('scroll', handleScroll)
    return () => {
      currentViewport.removeEventListener('scroll', handleScroll)
    }
  }, [loadMoreIcons, visibleCount, icons.length])

  return (
    <ScrollArea ref={rootScrollAreaRef} className={cn('w-full', heightClassName)}>
      <div className="p-2 grid grid-cols-5 sm:grid-cols-9 gap-1">
        {iconesAtuais.map((iconName) => (
          <div
            key={iconName}
            className={cn(
              'flex flex-col items-center justify-center text-center p-2 rounded-sm hover:bg-accent cursor-pointer group',
              selectedIcon === iconName && 'bg-accent text-accent-foreground ring-2 ring-primary',
            )}
            title={iconName}
            onClick={() => onIconSelect(iconName)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onIconSelect(iconName)}}
          >
            <DynamicIcon
              name={iconName}
              className={cn(
                'group-hover:scale-110 transition-transform',
                selectedIcon === iconName ? 'text-primary' : 'text-accent-foreground',
              )}
              size={16}
            />
          </div>
        ))}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  )
}
```

Install NPM dependencies:
```bash
lucide-react
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
