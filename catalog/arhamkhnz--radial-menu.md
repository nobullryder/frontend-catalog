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
radial-menu.tsx
import { useState, useRef } from "react";
import { LucideIcon } from 'lucide-react';
import { motion, AnimatePresence, type Transition } from 'motion/react';
import { ContextMenu } from '@base-ui-components/react/context-menu';
import { cn } from '@/lib/utils';
import {
  Copy,
  Scissors,
  ClipboardPaste,
  Trash2,
  Star,
  Pin,
} from 'lucide-react';

const DUMMY_MENU_ITEMS = [
  { id: 1, label: 'Copy', icon: Copy },
  { id: 2, label: 'Cut', icon: Scissors },
  { id: 3, label: 'Paste', icon: ClipboardPaste },
  { id: 4, label: 'Favorite', icon: Star },
  { id: 5, label: 'Pin', icon: Pin },
  { id: 6, label: 'Delete', icon: Trash2 },
];

type RadialMenuProps = {
  children?: React.ReactNode;
  menuItems?: MenuItem[];
  size?: number;
  iconSize?: number;
  bandWidth?: number;
  innerGap?: number;
  outerGap?: number;
  outerRingWidth?: number;
  onSelect?: (item: MenuItem) => void;
};

type MenuItem = {
  id: number;
  label: string;
  icon: LucideIcon;
};

type Point = { x: number; y: number };

const menuTransition: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 32,
  mass: 1,
};

const wedgeTransition: Transition = {
  duration: 0.05,
  ease: 'easeOut',
};

const FULL_CIRCLE = 360;
const START_ANGLE = -90;

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function polarToCartesian(radius: number, angleDeg: number): Point {
  const rad = degToRad(angleDeg);
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
}

function slicePath(
  index: number,
  total: number,
  wedgeRadius: number,
  innerRadius: number,
) {
  if (total <= 0) return '';

  // single item → full donut ring
  if (total === 1) {
    return `
      M ${wedgeRadius} 0
      A ${wedgeRadius} ${wedgeRadius} 0 1 1 ${-wedgeRadius} 0
      A ${wedgeRadius} ${wedgeRadius} 0 1 1 ${wedgeRadius} 0
      M ${innerRadius} 0
      A ${innerRadius} ${innerRadius} 0 1 0 ${-innerRadius} 0
      A ${innerRadius} ${innerRadius} 0 1 0 ${innerRadius} 0
    `;
  }

  const anglePerSlice = FULL_CIRCLE / total;
  const midDeg = START_ANGLE + anglePerSlice * index;
  const halfSlice = anglePerSlice / 2;

  const startDeg = midDeg - halfSlice;
  const endDeg = midDeg + halfSlice;

  const outerStart = polarToCartesian(wedgeRadius, startDeg);
  const outerEnd = polarToCartesian(wedgeRadius, endDeg);
  const innerStart = polarToCartesian(innerRadius, startDeg);
  const innerEnd = polarToCartesian(innerRadius, endDeg);

  const largeArcFlag = anglePerSlice > 180 ? 1 : 0;

  return `
    M ${outerStart.x} ${outerStart.y}
    A ${wedgeRadius} ${wedgeRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}
    L ${innerEnd.x} ${innerEnd.y}
    A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}
    Z
  `;
}

export const Component = ({
  children,
  menuItems = DUMMY_MENU_ITEMS,
  size = 240,
  iconSize = 18,
  bandWidth = 50,
  innerGap = 8,
  outerGap = 8,
  outerRingWidth = 12,
  onSelect,
}: RadialMenuProps) => {
  const radius = size / 2;

  const outerRingOuterRadius = radius;
  const outerRingInnerRadius = outerRingOuterRadius - outerRingWidth;

  const wedgeOuterRadius = outerRingInnerRadius - outerGap;
  const wedgeInnerRadius = wedgeOuterRadius - bandWidth;

  const iconRingRadius = (wedgeOuterRadius + wedgeInnerRadius) / 2;

  const centerRadius = Math.max(wedgeInnerRadius - innerGap, 0);

  const slice = 360 / menuItems.length;

  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const resetActive = () => setActiveIndex(null);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) resetActive();
  };

  return (
    <ContextMenu.Root open={open} onOpenChange={handleOpenChange}>
      <ContextMenu.Trigger
        render={(triggerProps) => {
          return (
            <div
              {...triggerProps}
              className={cn('select-none outline-none', triggerProps.className)}
            >
              {children ? (
                children
              ) : (
                <div className="size-80 flex justify-center items-center border-2 border-dashed rounded-lg">
                  Right-click here.
                </div>
              )}
            </div>
          );
        }}
      />

      <AnimatePresence>
        {open && (
          <ContextMenu.Portal keepMounted>
            <ContextMenu.Positioner
              align="center"
              sideOffset={({ positioner }) => -positioner.height / 2}
              className="outline-none"
            >
              <ContextMenu.Popup
                style={{ width: size, height: size }}
                className="relative rounded-full overflow-hidden shadow-xl outline-none"
                render={
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={menuTransition}
                  />
                }
              >
                <svg
                  className="absolute inset-0 size-full"
                  viewBox={`${-radius} ${-radius} ${radius * 2} ${radius * 2}`}
                >
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const midDeg = START_ANGLE + slice * index;
                    const { x: iconX, y: iconY } = polarToCartesian(
                      iconRingRadius,
                      midDeg,
                    );
                    const ICON_BOX = iconSize * 2;
                    const isActive = activeIndex === index;

                    return (
                      <g
                        key={item.id}
                        className="cursor-pointer"
                        onClick={() => itemRefs.current[index]?.click()}
                        onMouseEnter={() => {
                          setActiveIndex(index);
                          itemRefs.current[index]?.focus();
                        }}
                      >
                        <motion.path
                          d={slicePath(
                            index,
                            menuItems.length,
                            outerRingOuterRadius,
                            outerRingInnerRadius,
                          )}
                          className={cn({
                            'fill-neutral-200 dark:fill-neutral-700': isActive,
                            'fill-neutral-100 dark:fill-neutral-800': !isActive,
                          })}
                          initial={false}
                          transition={wedgeTransition}
                        />
                        <motion.path
                          d={slicePath(
                            index,
                            menuItems.length,
                            wedgeOuterRadius,
                            wedgeInnerRadius,
                          )}
                          className={cn(
                            'stroke-neutral-300 dark:stroke-neutral-600 stroke-1',
                            {
                              'fill-neutral-200 dark:fill-neutral-700':
                                isActive,
                              'fill-neutral-100 dark:fill-neutral-800':
                                !isActive,
                            },
                          )}
                          initial={false}
                          transition={wedgeTransition}
                        />

                        <foreignObject
                          x={iconX - ICON_BOX / 2}
                          y={iconY - ICON_BOX / 2}
                          width={ICON_BOX}
                          height={ICON_BOX}
                        >
                          <ContextMenu.Item
                            ref={(el) => {
                              itemRefs.current[index] =
                                el as HTMLElement | null;
                            }}
                            onFocus={() => setActiveIndex(index)}
                            onClick={() => {
                              onSelect?.(item);
                            }}
                            aria-label={item.label}
                            className={cn(
                              'size-full flex items-center justify-center rounded-full outline-none text-neutral-600 dark:text-neutral-400',
                              {
                                'text-neutral-900 dark:text-neutral-50':
                                  isActive,
                              },
                            )}
                          >
                            <Icon
                              style={{ height: iconSize, width: iconSize }}
                            />
                          </ContextMenu.Item>
                        </foreignObject>
                      </g>
                    );
                  })}

                  <circle
                    cx={0}
                    cy={0}
                    r={centerRadius}
                    className="fill-neutral-100 dark:fill-neutral-950 stroke-1 opacity-50 stroke-neutral-400 dark:stroke-neutral-600"
                  />
                  <circle
                    cx={0}
                    cy={0}
                    r={3}
                    className="fill-none stroke-neutral-400 dark:stroke-neutral-600"
                  />
                </svg>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        )}
      </AnimatePresence>
    </ContextMenu.Root>
  );
};


code.demo.1763634251281.tsx
import { Component } from "@/components/ui/radial-menu";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/radial-menu.tsx
import { useState, useRef } from "react";
import { LucideIcon } from 'lucide-react';
import { motion, AnimatePresence, type Transition } from 'motion/react';
import { ContextMenu } from '@base-ui-components/react/context-menu';
import { cn } from '@/lib/utils';
import {
  Copy,
  Scissors,
  ClipboardPaste,
  Trash2,
  Star,
  Pin,
} from 'lucide-react';

const DUMMY_MENU_ITEMS = [
  { id: 1, label: 'Copy', icon: Copy },
  { id: 2, label: 'Cut', icon: Scissors },
  { id: 3, label: 'Paste', icon: ClipboardPaste },
  { id: 4, label: 'Favorite', icon: Star },
  { id: 5, label: 'Pin', icon: Pin },
  { id: 6, label: 'Delete', icon: Trash2 },
];

type RadialMenuProps = {
  children?: React.ReactNode;
  menuItems?: MenuItem[];
  size?: number;
  iconSize?: number;
  bandWidth?: number;
  innerGap?: number;
  outerGap?: number;
  outerRingWidth?: number;
  onSelect?: (item: MenuItem) => void;
};

type MenuItem = {
  id: number;
  label: string;
  icon: LucideIcon;
};

type Point = { x: number; y: number };

const menuTransition: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 32,
  mass: 1,
};

const wedgeTransition: Transition = {
  duration: 0.05,
  ease: 'easeOut',
};

const FULL_CIRCLE = 360;
const START_ANGLE = -90;

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function polarToCartesian(radius: number, angleDeg: number): Point {
  const rad = degToRad(angleDeg);
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
}

function slicePath(
  index: number,
  total: number,
  wedgeRadius: number,
  innerRadius: number,
) {
  if (total <= 0) return '';

  // single item → full donut ring
  if (total === 1) {
    return `
      M ${wedgeRadius} 0
      A ${wedgeRadius} ${wedgeRadius} 0 1 1 ${-wedgeRadius} 0
      A ${wedgeRadius} ${wedgeRadius} 0 1 1 ${wedgeRadius} 0
      M ${innerRadius} 0
      A ${innerRadius} ${innerRadius} 0 1 0 ${-innerRadius} 0
      A ${innerRadius} ${innerRadius} 0 1 0 ${innerRadius} 0
    `;
  }

  const anglePerSlice = FULL_CIRCLE / total;
  const midDeg = START_ANGLE + anglePerSlice * index;
  const halfSlice = anglePerSlice / 2;

  const startDeg = midDeg - halfSlice;
  const endDeg = midDeg + halfSlice;

  const outerStart = polarToCartesian(wedgeRadius, startDeg);
  const outerEnd = polarToCartesian(wedgeRadius, endDeg);
  const innerStart = polarToCartesian(innerRadius, startDeg);
  const innerEnd = polarToCartesian(innerRadius, endDeg);

  const largeArcFlag = anglePerSlice > 180 ? 1 : 0;

  return `
    M ${outerStart.x} ${outerStart.y}
    A ${wedgeRadius} ${wedgeRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}
    L ${innerEnd.x} ${innerEnd.y}
    A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}
    Z
  `;
}

export const Component = ({
  children,
  menuItems = DUMMY_MENU_ITEMS,
  size = 240,
  iconSize = 18,
  bandWidth = 50,
  innerGap = 8,
  outerGap = 8,
  outerRingWidth = 12,
  onSelect,
}: RadialMenuProps) => {
  const radius = size / 2;

  const outerRingOuterRadius = radius;
  const outerRingInnerRadius = outerRingOuterRadius - outerRingWidth;

  const wedgeOuterRadius = outerRingInnerRadius - outerGap;
  const wedgeInnerRadius = wedgeOuterRadius - bandWidth;

  const iconRingRadius = (wedgeOuterRadius + wedgeInnerRadius) / 2;

  const centerRadius = Math.max(wedgeInnerRadius - innerGap, 0);

  const slice = 360 / menuItems.length;

  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const resetActive = () => setActiveIndex(null);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) resetActive();
  };

  return (
    <ContextMenu.Root open={open} onOpenChange={handleOpenChange}>
      <ContextMenu.Trigger
        render={(triggerProps) => {
          return (
            <div
              {...triggerProps}
              className={cn('select-none outline-none', triggerProps.className)}
            >
              {children ? (
                children
              ) : (
                <div className="size-80 flex justify-center items-center border-2 border-dashed rounded-lg">
                  Right-click here.
                </div>
              )}
            </div>
          );
        }}
      />

      <AnimatePresence>
        {open && (
          <ContextMenu.Portal keepMounted>
            <ContextMenu.Positioner
              align="center"
              sideOffset={({ positioner }) => -positioner.height / 2}
              className="outline-none"
            >
              <ContextMenu.Popup
                style={{ width: size, height: size }}
                className="relative rounded-full overflow-hidden shadow-xl outline-none"
                render={
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={menuTransition}
                  />
                }
              >
                <svg
                  className="absolute inset-0 size-full"
                  viewBox={`${-radius} ${-radius} ${radius * 2} ${radius * 2}`}
                >
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const midDeg = START_ANGLE + slice * index;
                    const { x: iconX, y: iconY } = polarToCartesian(
                      iconRingRadius,
                      midDeg,
                    );
                    const ICON_BOX = iconSize * 2;
                    const isActive = activeIndex === index;

                    return (
                      <g
                        key={item.id}
                        className="cursor-pointer"
                        onClick={() => itemRefs.current[index]?.click()}
                        onMouseEnter={() => {
                          setActiveIndex(index);
                          itemRefs.current[index]?.focus();
                        }}
                      >
                        <motion.path
                          d={slicePath(
                            index,
                            menuItems.length,
                            outerRingOuterRadius,
                            outerRingInnerRadius,
                          )}
                          className={cn({
                            'fill-neutral-200 dark:fill-neutral-700': isActive,
                            'fill-neutral-100 dark:fill-neutral-800': !isActive,
                          })}
                          initial={false}
                          transition={wedgeTransition}
                        />
                        <motion.path
                          d={slicePath(
                            index,
                            menuItems.length,
                            wedgeOuterRadius,
                            wedgeInnerRadius,
                          )}
                          className={cn(
                            'stroke-neutral-300 dark:stroke-neutral-600 stroke-1',
                            {
                              'fill-neutral-200 dark:fill-neutral-700':
                                isActive,
                              'fill-neutral-100 dark:fill-neutral-800':
                                !isActive,
                            },
                          )}
                          initial={false}
                          transition={wedgeTransition}
                        />

                        <foreignObject
                          x={iconX - ICON_BOX / 2}
                          y={iconY - ICON_BOX / 2}
                          width={ICON_BOX}
                          height={ICON_BOX}
                        >
                          <ContextMenu.Item
                            ref={(el) => {
                              itemRefs.current[index] =
                                el as HTMLElement | null;
                            }}
                            onFocus={() => setActiveIndex(index)}
                            onClick={() => {
                              onSelect?.(item);
                            }}
                            aria-label={item.label}
                            className={cn(
                              'size-full flex items-center justify-center rounded-full outline-none text-neutral-600 dark:text-neutral-400',
                              {
                                'text-neutral-900 dark:text-neutral-50':
                                  isActive,
                              },
                            )}
                          >
                            <Icon
                              style={{ height: iconSize, width: iconSize }}
                            />
                          </ContextMenu.Item>
                        </foreignObject>
                      </g>
                    );
                  })}

                  <circle
                    cx={0}
                    cy={0}
                    r={centerRadius}
                    className="fill-neutral-100 dark:fill-neutral-950 stroke-1 opacity-50 stroke-neutral-400 dark:stroke-neutral-600"
                  />
                  <circle
                    cx={0}
                    cy={0}
                    r={3}
                    className="fill-none stroke-neutral-400 dark:stroke-neutral-600"
                  />
                </svg>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        )}
      </AnimatePresence>
    </ContextMenu.Root>
  );
};

```

Install NPM dependencies:
```bash
lucide-react, motion, @base-ui-components/react
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
