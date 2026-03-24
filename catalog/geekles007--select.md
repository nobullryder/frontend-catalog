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
select.tsx
import React, { useEffect, useState } from "react"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"
import { ChevronDownIcon, X } from "lucide-react"

type TSelectData = {
  id: string
  label: string
  value: string
  description?: string
  icon?: string
  disabled?: boolean
  custom?: React.ReactNode
}

type SelectProps = {
  data?: TSelectData[]
  onChange?: (value: string) => void
  defaultValue?: string
}

const Select = ({ data, defaultValue }: SelectProps) => {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<TSelectData | undefined>(undefined)

  useEffect(() => {
    if (defaultValue) {
      const item = data?.find((i) => i.value === defaultValue)
      if (item) {
        setSelected(item)
      }
    } else {
      setSelected(data?.[0])
    }
  }, [defaultValue])

  const onSelect = (value: string) => {
    const item = data?.find((i) => i.value === value)
    setSelected(item as TSelectData)
    setOpen(false)
  }

  return (
    <MotionConfig
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        ease: "0.65, 0, 0.35, 1",
      }}
    >
      <motion.div className="flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {!open ? (
            <motion.div
              whileTap={{ scale: 0.95 }}
              animate={{
                borderRadius: 30,
              }}
              layout
              layoutId="dropdown"
              onClick={() => setOpen(true)}
              className="overflow-hidden rounded-[30px] border border-input bg-background shadow-sm"
            >
              <SelectItem item={selected} />
            </motion.div>
          ) : (
            <motion.div
              layout
              animate={{
                borderRadius: 20,
              }}
              layoutId="dropdown"
              className="overflow-hidden rounded-[20px] w-[400px] border border-input bg-background py-2 shadow-md"
              ref={ref}
            >
              <Head setOpen={setOpen} />
              <div className="w-full overflow-y-auto">
                {data?.map((item) => (
                  <SelectItem
                    order={item?.value}
                    noDescription={false}
                    key={item.id}
                    item={item}
                    onChange={onSelect}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </MotionConfig>
  )
}

export default Select

const Head = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        delay: 0.1,
      }}
      layout
      className="flex items-center justify-between p-4"
    >
      <motion.strong layout className="text-foreground">
        Choose Model
      </motion.strong>
      <button
        onClick={() => setOpen(false)}
        className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary"
      >
        <X className="text-secondary-foreground" size={12} />
      </button>
    </motion.div>
  )
}

type SelectItemProps = {
  item?: TSelectData
  noDescription?: boolean
  order?: string
  onChange?: (index: string) => void
}

const animation = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: (custom: number) => ({
      delay: custom * 0.1,
      duration: 0.5,
    }),
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: (custom: number) => ({
      delay: custom * 0.1,
    }),
  },
}

const SelectItem = ({
  item,
  noDescription = true,
  order,
  onChange,
}: SelectItemProps) => {
  return (
    <motion.div
      className={`group flex cursor-pointer items-center justify-between gap-2 p-4 py-2 hover:bg-accent hover:text-accent-foreground ${
        noDescription && "!p-2"
      }`}
      variants={animation}
      initial="hidden"
      animate="visible"
      exit="exit"
      key={"product-" + item?.id + "-order-" + order}
      custom={order}
      onClick={() => onChange?.(order as string)}
    >
      <div className="flex items-center gap-3">
        <motion.div
          layout
          layoutId={`icon-${item?.id}`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-input"
        >
          {item?.icon}
        </motion.div>
        <motion.div layout className="flex w-56 flex-col">
          <motion.strong
            layoutId={`label-${item?.id}`}
            className="text-sm font-semibold text-foreground"
          >
            {item?.label}
          </motion.strong>
          {noDescription ? null : (
            <span className="truncate text-xs text-muted-foreground">
              {item?.description}
            </span>
          )}
        </motion.div>
      </div>
      {noDescription ? (
        <motion.div
          layout
          className="flex items-center justify-center gap-2 pr-3"
        >
          <ChevronDownIcon className="text-foreground" size={20} />
        </motion.div>
      ) : null}
    </motion.div>
  )
}


code.demo.tsx
import Select from "@/components/ui/select"

const data = [
  {
    id: '1', // Unique identifier
    label: 'Enable Notifications',
    value: 'enable_notifications',
    description: 'Turn on or off app notifications',
    icon: '🔔',
    custom: (
      <label>
        <input type='radio' name={'radio'} id='enable-notifications-checkbox' />
      </label>
    ),
  },
  {
    id: '2', // Unique identifier
    label: 'Dark Mode',
    value: 'dark_mode',
    description: 'Toggle dark mode for better visibility at night',
    icon: '🌙',
    custom: (
      <label>
        <input type='radio' name={'radio'} id='dark-mode-checkbox' />
      </label>
    ),
  },
  {
    id: '3', // Unique identifier
    label: 'Location Access',
    value: 'location_access',
    description: 'Allow access to your location for personalized suggestions',
    icon: '📍',
    custom: (
      <label>
        <input type='radio' name={'radio'} id='location-access-checkbox' />
      </label>
    ),
  },
  {
    id: '4', // Unique identifier
    label: 'Upgrade Plan',
    value: 'upgrade_plan',
    description: 'Get access to premium features with an upgrade',
    icon: '⭐',
    custom: (
      <button
        id='upgrade-plan-button'
        className={'text-sm'}
        style={{
          padding: '5px 10px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Upgrade
      </button>
    ),
  },
];

export function DropdownDemo() {
    return <div className='flex h-screen w-screen items-center justify-center'>
      <Select data={data} defaultValue={'dark_mode'} />
    </div>
}
```

Copy-paste these files for dependencies:
```tsx
/components/ui/select.tsx
import React, { useEffect, useState } from "react"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"
import { ChevronDownIcon, X } from "lucide-react"

type TSelectData = {
  id: string
  label: string
  value: string
  description?: string
  icon?: string
  disabled?: boolean
  custom?: React.ReactNode
}

type SelectProps = {
  data?: TSelectData[]
  onChange?: (value: string) => void
  defaultValue?: string
}

const Select = ({ data, defaultValue }: SelectProps) => {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<TSelectData | undefined>(undefined)

  useEffect(() => {
    if (defaultValue) {
      const item = data?.find((i) => i.value === defaultValue)
      if (item) {
        setSelected(item)
      }
    } else {
      setSelected(data?.[0])
    }
  }, [defaultValue])

  const onSelect = (value: string) => {
    const item = data?.find((i) => i.value === value)
    setSelected(item as TSelectData)
    setOpen(false)
  }

  return (
    <MotionConfig
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        ease: "0.65, 0, 0.35, 1",
      }}
    >
      <motion.div className="flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {!open ? (
            <motion.div
              whileTap={{ scale: 0.95 }}
              animate={{
                borderRadius: 30,
              }}
              layout
              layoutId="dropdown"
              onClick={() => setOpen(true)}
              className="overflow-hidden rounded-[30px] border border-input bg-background shadow-sm"
            >
              <SelectItem item={selected} />
            </motion.div>
          ) : (
            <motion.div
              layout
              animate={{
                borderRadius: 20,
              }}
              layoutId="dropdown"
              className="overflow-hidden rounded-[20px] w-[400px] border border-input bg-background py-2 shadow-md"
              ref={ref}
            >
              <Head setOpen={setOpen} />
              <div className="w-full overflow-y-auto">
                {data?.map((item) => (
                  <SelectItem
                    order={item?.value}
                    noDescription={false}
                    key={item.id}
                    item={item}
                    onChange={onSelect}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </MotionConfig>
  )
}

export default Select

const Head = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        delay: 0.1,
      }}
      layout
      className="flex items-center justify-between p-4"
    >
      <motion.strong layout className="text-foreground">
        Choose Model
      </motion.strong>
      <button
        onClick={() => setOpen(false)}
        className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary"
      >
        <X className="text-secondary-foreground" size={12} />
      </button>
    </motion.div>
  )
}

type SelectItemProps = {
  item?: TSelectData
  noDescription?: boolean
  order?: string
  onChange?: (index: string) => void
}

const animation = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: (custom: number) => ({
      delay: custom * 0.1,
      duration: 0.5,
    }),
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: (custom: number) => ({
      delay: custom * 0.1,
    }),
  },
}

const SelectItem = ({
  item,
  noDescription = true,
  order,
  onChange,
}: SelectItemProps) => {
  return (
    <motion.div
      className={`group flex cursor-pointer items-center justify-between gap-2 p-4 py-2 hover:bg-accent hover:text-accent-foreground ${
        noDescription && "!p-2"
      }`}
      variants={animation}
      initial="hidden"
      animate="visible"
      exit="exit"
      key={"product-" + item?.id + "-order-" + order}
      custom={order}
      onClick={() => onChange?.(order as string)}
    >
      <div className="flex items-center gap-3">
        <motion.div
          layout
          layoutId={`icon-${item?.id}`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-input"
        >
          {item?.icon}
        </motion.div>
        <motion.div layout className="flex w-56 flex-col">
          <motion.strong
            layoutId={`label-${item?.id}`}
            className="text-sm font-semibold text-foreground"
          >
            {item?.label}
          </motion.strong>
          {noDescription ? null : (
            <span className="truncate text-xs text-muted-foreground">
              {item?.description}
            </span>
          )}
        </motion.div>
      </div>
      {noDescription ? (
        <motion.div
          layout
          className="flex items-center justify-center gap-2 pr-3"
        >
          <ChevronDownIcon className="text-foreground" size={20} />
        </motion.div>
      ) : null}
    </motion.div>
  )
}

```

Install NPM dependencies:
```bash
lucide-react, framer-motion
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
