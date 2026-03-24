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
multi-select.tsx
import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { cn } from '@/lib/utils'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, Cross2Icon } from '@radix-ui/react-icons'

interface MultiSelectProps extends Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>, 'value' | 'onValueChange'> {
  value: string[]
  onValueChange: (value: string[]) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  separator?: string
  renderSelectedValues?: (selectedValues: string[]) => React.ReactNode
}

interface MultiSelectContextValue {
  selectedValues: string[]
  onValueChange: (value: string[]) => void
  onSelect: (value: string) => void
  onRemove: (value: string) => void
  renderSelectedValues?: (selectedValues: string[]) => React.ReactNode
}

const MultiSelectContext = React.createContext<MultiSelectContextValue | undefined>(undefined)

function useMultiSelect() {
  const context = React.useContext(MultiSelectContext)
  if (!context) {
    throw new Error('useMultiSelect must be used within a MultiSelectProvider')
  }
  return context
}

const MultiSelect = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Root>,
  MultiSelectProps
>(({ value, onValueChange, children, separator = ',', renderSelectedValues, ...props }, ref) => {
  const stringValue = value.join(separator)
  
  const handleValueChange = React.useCallback(
    (val: string) => {
      // if select empty value, return
      if (!val) return
      
      // if select already selected value, remove it
      if (value.includes(val)) {
        onValueChange(value.filter((v) => v !== val))
      } else {
        // else add to selected values
        onValueChange([...value, val])
      }
    },
    [value, onValueChange]
  )

  const contextValue = React.useMemo(
    () => ({
      selectedValues: value,
      onValueChange,
      onSelect: (val: string) => {
        if (!value.includes(val)) {
          onValueChange([...value, val])
        }
      },
      onRemove: (val: string) => {
        onValueChange(value.filter((v) => v !== val))
      },
      renderSelectedValues,
    }),
    [value, onValueChange, renderSelectedValues]
  )

  return (
    <MultiSelectContext.Provider value={contextValue}>
      <SelectPrimitive.Root
        {...props}
        value={stringValue}
        onValueChange={handleValueChange}
      >
        {children}
      </SelectPrimitive.Root>
    </MultiSelectContext.Provider>
  )
})
MultiSelect.displayName = 'MultiSelect'

const MultiSelectGroup = SelectPrimitive.Group

const MultiSelectValue = SelectPrimitive.Value

const MultiSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
        className,
      'text-text flex w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&_span]:line-clamp-1',
    )}
    {...props}>
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
MultiSelectTrigger.displayName = 'MultiSelectTrigger'

const MultiSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}>
      <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
        <ChevronUpIcon className="h-4 w-4" />
      </SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}>
        {children}
      </SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
        <ChevronDownIcon className="h-4 w-4" />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
MultiSelectContent.displayName = 'MultiSelectContent'

const MultiSelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn('px-2 py-1.5 text-sm font-semibold', className)} {...props} />
))
MultiSelectLabel.displayName = 'MultiSelectLabel'

const MultiSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & { value: string, icons?: React.ReactNode }
>(({ className, children, value, icons, ...props }, ref) => {
  const { selectedValues } = useMultiSelect()
  const isSelected = selectedValues.includes(value)

  return (
    <div ref={ref}
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50 transition-all duration-300',
        isSelected && 'bg-accent/50',
        className
      )}
      {...props}>
      <div className="flex items-center justify-center mr-2">
        {icons}
      </div>
      <div>{children}</div>
    </div>
  )
})
MultiSelectItem.displayName = 'MultiSelectItem'

const MultiSelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
))
MultiSelectSeparator.displayName = 'MultiSelectSeparator'

export {
  MultiSelect,
  MultiSelectGroup,
  MultiSelectValue,
  MultiSelectTrigger,
  MultiSelectContent,
  MultiSelectLabel,
  MultiSelectItem,
  MultiSelectSeparator,
} 

code.demo.1750393665948.tsx
import * as React from 'react'
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from '@/components/ui/multi-select'
import { Checkbox } from "@/components/ui/checkbox"

const options = [
  { value: 'apple', label: 'apple' },
  { value: 'banana', label: 'banana' },
  { value: 'orange', label: 'orange' },
  { value: 'grape', label: 'grape' },
  { value: 'watermelon', label: 'watermelon' },
  { value: 'strawberry', label: 'strawberry' },
]

// value mapping to label
const getLabel = (value: string) => {
  const option = options.find(opt => opt.value === value)
  return option ? option.label : value
}

export default function DemoOne() {
  const [selectedValues, setSelectedValues] = React.useState<string[]>([])

  // custom render value
  const renderSelectedValues = (values: string[]) => {
    const labels = values.map(getLabel)
    
    if (values.length === 1) {
      return labels[0]
    } else if (values.length === 2) {
      return `${labels[0]} and ${labels[1]} selected`
    } else {
      return `${labels.length} fruits selected`
    }
  }

  const handleMultiCheckboxClick = (value: string) => {
    console.log(1)
    setSelectedValues(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value)
      }
      return [...prev, value]
    })
  }

  const handleMultiSelectItemClick = (value: string) => {
    setSelectedValues([value])
  }


  return (
    <div className="space-y-8">
      <div className="w-[350px]">
        <h3 className="mb-2 font-medium">default:</h3>
        <MultiSelect value={selectedValues} onValueChange={setSelectedValues} open={true}>
          <MultiSelectTrigger className="w-full">
            <MultiSelectValue placeholder="please choose fruits...">{renderSelectedValues(selectedValues)}</MultiSelectValue>
          </MultiSelectTrigger>
          <MultiSelectContent>
            {options.map((option) => (
              <MultiSelectItem key={option.value} onClick={() => handleMultiSelectItemClick(option.value)} value={option.value} icons={
                <div onClick={(e) => {e.stopPropagation()}}>
                  <Checkbox className="w-5 h-5" checked={selectedValues.includes(option.value)} onChange={() => handleMultiCheckboxClick(option.value)} />
                </div>
              }>
                {option.label}
              </MultiSelectItem>
            ))}
          </MultiSelectContent>
        </MultiSelect>
      </div>
      
      <div className="w-[350px]">
        <h3 className="mb-2 font-medium">custom split and show content:</h3>
        <MultiSelect 
          value={selectedValues} 
          onValueChange={setSelectedValues}
          separator="|"
        >
          <MultiSelectTrigger className="w-full">
            <MultiSelectValue placeholder="please choose fruits...">    
              {renderSelectedValues(selectedValues)}</MultiSelectValue>
            </MultiSelectTrigger>
          <MultiSelectContent>
            {options.map((option) => (
              <MultiSelectItem key={option.value} value={option.value}>
                {option.label}
              </MultiSelectItem>
            ))}
          </MultiSelectContent>
        </MultiSelect>
      </div>
    </div>
  )
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/multi-select.tsx
import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { cn } from '@/lib/utils'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, Cross2Icon } from '@radix-ui/react-icons'

interface MultiSelectProps extends Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>, 'value' | 'onValueChange'> {
  value: string[]
  onValueChange: (value: string[]) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  separator?: string
  renderSelectedValues?: (selectedValues: string[]) => React.ReactNode
}

interface MultiSelectContextValue {
  selectedValues: string[]
  onValueChange: (value: string[]) => void
  onSelect: (value: string) => void
  onRemove: (value: string) => void
  renderSelectedValues?: (selectedValues: string[]) => React.ReactNode
}

const MultiSelectContext = React.createContext<MultiSelectContextValue | undefined>(undefined)

function useMultiSelect() {
  const context = React.useContext(MultiSelectContext)
  if (!context) {
    throw new Error('useMultiSelect must be used within a MultiSelectProvider')
  }
  return context
}

const MultiSelect = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Root>,
  MultiSelectProps
>(({ value, onValueChange, children, separator = ',', renderSelectedValues, ...props }, ref) => {
  const stringValue = value.join(separator)
  
  const handleValueChange = React.useCallback(
    (val: string) => {
      // if select empty value, return
      if (!val) return
      
      // if select already selected value, remove it
      if (value.includes(val)) {
        onValueChange(value.filter((v) => v !== val))
      } else {
        // else add to selected values
        onValueChange([...value, val])
      }
    },
    [value, onValueChange]
  )

  const contextValue = React.useMemo(
    () => ({
      selectedValues: value,
      onValueChange,
      onSelect: (val: string) => {
        if (!value.includes(val)) {
          onValueChange([...value, val])
        }
      },
      onRemove: (val: string) => {
        onValueChange(value.filter((v) => v !== val))
      },
      renderSelectedValues,
    }),
    [value, onValueChange, renderSelectedValues]
  )

  return (
    <MultiSelectContext.Provider value={contextValue}>
      <SelectPrimitive.Root
        {...props}
        value={stringValue}
        onValueChange={handleValueChange}
      >
        {children}
      </SelectPrimitive.Root>
    </MultiSelectContext.Provider>
  )
})
MultiSelect.displayName = 'MultiSelect'

const MultiSelectGroup = SelectPrimitive.Group

const MultiSelectValue = SelectPrimitive.Value

const MultiSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
        className,
      'text-text flex w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&_span]:line-clamp-1',
    )}
    {...props}>
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
MultiSelectTrigger.displayName = 'MultiSelectTrigger'

const MultiSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}>
      <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
        <ChevronUpIcon className="h-4 w-4" />
      </SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}>
        {children}
      </SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
        <ChevronDownIcon className="h-4 w-4" />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
MultiSelectContent.displayName = 'MultiSelectContent'

const MultiSelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn('px-2 py-1.5 text-sm font-semibold', className)} {...props} />
))
MultiSelectLabel.displayName = 'MultiSelectLabel'

const MultiSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & { value: string, icons?: React.ReactNode }
>(({ className, children, value, icons, ...props }, ref) => {
  const { selectedValues } = useMultiSelect()
  const isSelected = selectedValues.includes(value)

  return (
    <div ref={ref}
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50 transition-all duration-300',
        isSelected && 'bg-accent/50',
        className
      )}
      {...props}>
      <div className="flex items-center justify-center mr-2">
        {icons}
      </div>
      <div>{children}</div>
    </div>
  )
})
MultiSelectItem.displayName = 'MultiSelectItem'

const MultiSelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
))
MultiSelectSeparator.displayName = 'MultiSelectSeparator'

export {
  MultiSelect,
  MultiSelectGroup,
  MultiSelectValue,
  MultiSelectTrigger,
  MultiSelectContent,
  MultiSelectLabel,
  MultiSelectItem,
  MultiSelectSeparator,
} 
```

Install NPM dependencies:
```bash
@radix-ui/react-icons, @radix-ui/react-select
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
