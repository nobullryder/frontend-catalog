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
animated-list.tsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimationPhase =
  | "idle"
  | "forming_column"
  | "scrolling_down"
  | "resetting";

type AnimatedListProps = {
  children: React.ReactNode;
  className?: string;
  stackGap?: number;
  columnGap?: number;
  scaleFactor?: number;
  scrollDownDuration?: number;
  formationDuration?: number;
};

type AnimatedListItemProps = {
  children: React.ReactNode;
  className?: string;
  index: number;
  listLength: number;
  stackGap?: number;
  columnGap?: number;
  scaleFactor?: number;
};

function InternalAnimatedListItem({
  children,
  className,
  index,
  listLength,
  animationPhase,
  onFormationComplete,
  stackGap = 10,
  columnGap = 100,
  scaleFactor = 0.1,
  formationDuration = 1,
  visibleItemsCount = 4,
  resetSpringStiffness = 120,
  resetSpringDamping = 20,
}: AnimatedListItemProps & {
  animationPhase: AnimationPhase;
  onFormationComplete?: () => void;
  formationDuration: number;
  visibleItemsCount: number;
  resetSpringStiffness: number;
  resetSpringDamping: number;
}) {
  const reverseIndex = listLength - 1 - index;
  const isVisible = reverseIndex < visibleItemsCount;
  const lastItemOffset = (listLength - 1) * columnGap;
  const isLastItem = index === listLength - 1;

  const itemVariants = {
    initial: {
      scale: 1 + index * scaleFactor,
      y: reverseIndex * stackGap,
      opacity: isVisible ? 1 : 0,
    },
    column: {
      scale: 1,
      y: index * columnGap - lastItemOffset,
      opacity: 1,
    },
  };

  const target =
    animationPhase === "idle" || animationPhase === "resetting"
      ? "initial"
      : "column";

  const getTransition = () => {
    if (animationPhase === "resetting") {
      return {
        type: "spring",
        stiffness: resetSpringStiffness,
        damping: resetSpringDamping,
      };
    } else {
      return { duration: formationDuration, ease: [0.4, 0, 0.2, 1] };
    }
  };

  const handleAnimationComplete = (definition: string) => {
    if (
      isLastItem &&
      definition === "column" &&
      animationPhase === "forming_column"
    ) {
      onFormationComplete?.();
    }
  };

  return (
    <motion.div
      key={index}
      className={cn("w-full flex justify-center absolute inset-x-0", className)}
      variants={itemVariants}
      initial="initial"
      animate={target}
      transition={getTransition()}
      onAnimationComplete={handleAnimationComplete}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedList({
  children,
  className,
  stackGap = 20,
  columnGap = 85,
  scaleFactor = 0.05,
  scrollDownDuration = 5,
  formationDuration = 1,
}: AnimatedListProps) {
  const initialDelayValue = 500;
  const loopPauseDurationValue = 100;
  const listResetSpringStiffness = 100;
  const listResetSpringDamping = 25;
  const itemResetSpringStiffness = 120;
  const itemResetSpringDamping = 20;
  const visibleItemsCountValue = 4;

  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>("idle");
  const listControls = useAnimationControls();
  const childrenArray = useMemo(
    () => React.Children.toArray(children),
    [children]
  );
  const listLength = childrenArray.length;
  const totalHeight = listLength * columnGap;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (animationPhase === "idle") {
      timer = setTimeout(
        () => {
          setAnimationPhase("forming_column");
        },
        animationPhase === "idle" ? loopPauseDurationValue : initialDelayValue
      );
    }
    return () => clearTimeout(timer);
  }, [animationPhase, loopPauseDurationValue, initialDelayValue]);

  const handleFormationComplete = () => {
    if (animationPhase === "forming_column")
      setAnimationPhase("scrolling_down");
  };
  const handleScrollDownComplete = () => {
    if (animationPhase === "scrolling_down") setAnimationPhase("resetting");
  };
  const handleScrollUpComplete = () => {
    if (animationPhase === "resetting") setAnimationPhase("idle");
  };

  useEffect(() => {
    if (animationPhase === "scrolling_down") {
      listControls.start({
        y: totalHeight,
        transition: {
          duration: scrollDownDuration,
          ease: [0.4, 0, 0.2, 1],
        },
      });
    } else if (animationPhase === "resetting") {
      listControls.start({
        y: 0,
        transition: {
          type: "spring",
          stiffness: listResetSpringStiffness,
          damping: listResetSpringDamping,
        },
      });
    } else {
      listControls.set({ y: 0 });
    }
  }, [
    animationPhase,
    listControls,
    totalHeight,
    scrollDownDuration,
    listResetSpringStiffness,
    listResetSpringDamping,
  ]);

  const handleListAnimationComplete = (definition: { y?: number }) => {
    if (definition.y === totalHeight && animationPhase === "scrolling_down") {
      handleScrollDownComplete();
    } else if (definition.y === 0 && animationPhase === "resetting") {
      handleScrollUpComplete();
    }
  };

  return (
    <motion.div
      className={cn("relative w-full h-full flex items-center", className)}
      initial={{ y: 0 }}
      animate={listControls}
      onAnimationComplete={handleListAnimationComplete}
    >
      <AnimatePresence>
        {childrenArray.map((child, index) => (
          <InternalAnimatedListItem
            key={index}
            index={index}
            listLength={listLength}
            animationPhase={animationPhase}
            onFormationComplete={
              index === listLength - 1 ? handleFormationComplete : undefined
            }
            stackGap={stackGap}
            columnGap={columnGap}
            scaleFactor={scaleFactor}
            formationDuration={formationDuration}
            visibleItemsCount={visibleItemsCountValue}
            resetSpringStiffness={itemResetSpringStiffness}
            resetSpringDamping={itemResetSpringDamping}
          >
            {child}
          </InternalAnimatedListItem>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}


code.demo.1752733579534.tsx
"use client";

import { AnimatedList } from "@/components/ui/animated-list";
import { 
  MapPin, 
  Activity, 
  Calendar, 
  CheckSquare, 
  Heart, 
  Mail, 
  Video, 
  User, 
  Coffee, 
  Film 
} from "lucide-react";

interface NotificationData {
  id: number;
  name: string;
  message: string;
  timeAgo: string;
  icon: React.ReactNode;
}

type NotificationProps = {
  notification: NotificationData;
};

export function Notification({ notification }: NotificationProps) {
  return (
    <div className="w-full max-w-[350px] bg-white dark:bg-neutral-950 shadow-xl shadow-neutral-200 dark:shadow-neutral-950/70 rounded-2xl p-3.5 flex items-center gap-4 justify-between border border-neutral-50 dark:border-neutral-900">
      <div className="w-10 h-10 flex items-center justify-center text-blue-500">
        {notification.icon}
      </div>
      <div className="flex flex-col w-full">
        <div className="flex w-full justify-between items-start">
          <span className="font-medium text-sm">{notification.name}</span>
          <span className="text-xs text-neutral-400">
            {notification.timeAgo}
          </span>
        </div>
        <span className="text-sm text-neutral-600 dark:text-neutral-400">
          {notification.message}
        </span>
      </div>
    </div>
  );
}

export default function AnimatedListDemo() {    
  const notifications: NotificationData[] = [
    {
      id: 1,
      name: "Location",
      message: "Thomas has arrived home",
      timeAgo: "2h ago",
      icon: <MapPin size={20} />,
    },
    {
      id: 2,
      name: "Fitness Tracker",
      message: "You've reached your daily step goal!",
      timeAgo: "1h ago",
      icon: <Activity size={20} />,
    },
    {
      id: 3,
      name: "Calendar",
      message: "Meeting with team in 30 minutes",
      timeAgo: "45m ago",
      icon: <Calendar size={20} />,
    },
    {
      id: 4,
      name: "Task Manager",
      message: "3 tasks due today",
      timeAgo: "1d ago",
      icon: <CheckSquare size={20} />,
    },
    {
      id: 5,
      name: "Health",
      message: "Your heart rate is elevated.",
      timeAgo: "3h ago",
      icon: <Heart size={20} />,
    },
    {
      id: 6,
      name: "Email",
      message: "New message from your manager",
      timeAgo: "5m ago",
      icon: <Mail size={20} />,
    },
    {
      id: 7,
      name: "TikTok",
      message: "Your video got 1000 likes!",
      timeAgo: "2d ago",
      icon: <Video size={20} />,
    },
    {
      id: 8,
      name: "Grandpa",
      message: "How are you doing, my dear?",
      timeAgo: "1w ago",
      icon: <User size={20} />,
    },
    {
      id: 9,
      name: "Clara",
      message: "Let's meet for coffee tomorrow!",
      timeAgo: "2d ago",
      icon: <Coffee size={20} />,
    },
    {
      id: 10,
      name: "Sarah",
      message: "Did you see the new movie?",
      timeAgo: "4h ago",
      icon: <Film size={20} />,
    },
  ];

  return (
    <div className="h-[600px] w-full flex items-center justify-center">
      <AnimatedList
        stackGap={20}
        columnGap={85}
        scaleFactor={0.05}
        scrollDownDuration={5}
        formationDuration={1}
      >
        {notifications.map((notification) => (
          <Notification key={notification.id} notification={notification} />
        ))}
      </AnimatedList>
    </div>
  );
} 
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-list.tsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimationPhase =
  | "idle"
  | "forming_column"
  | "scrolling_down"
  | "resetting";

type AnimatedListProps = {
  children: React.ReactNode;
  className?: string;
  stackGap?: number;
  columnGap?: number;
  scaleFactor?: number;
  scrollDownDuration?: number;
  formationDuration?: number;
};

type AnimatedListItemProps = {
  children: React.ReactNode;
  className?: string;
  index: number;
  listLength: number;
  stackGap?: number;
  columnGap?: number;
  scaleFactor?: number;
};

function InternalAnimatedListItem({
  children,
  className,
  index,
  listLength,
  animationPhase,
  onFormationComplete,
  stackGap = 10,
  columnGap = 100,
  scaleFactor = 0.1,
  formationDuration = 1,
  visibleItemsCount = 4,
  resetSpringStiffness = 120,
  resetSpringDamping = 20,
}: AnimatedListItemProps & {
  animationPhase: AnimationPhase;
  onFormationComplete?: () => void;
  formationDuration: number;
  visibleItemsCount: number;
  resetSpringStiffness: number;
  resetSpringDamping: number;
}) {
  const reverseIndex = listLength - 1 - index;
  const isVisible = reverseIndex < visibleItemsCount;
  const lastItemOffset = (listLength - 1) * columnGap;
  const isLastItem = index === listLength - 1;

  const itemVariants = {
    initial: {
      scale: 1 + index * scaleFactor,
      y: reverseIndex * stackGap,
      opacity: isVisible ? 1 : 0,
    },
    column: {
      scale: 1,
      y: index * columnGap - lastItemOffset,
      opacity: 1,
    },
  };

  const target =
    animationPhase === "idle" || animationPhase === "resetting"
      ? "initial"
      : "column";

  const getTransition = () => {
    if (animationPhase === "resetting") {
      return {
        type: "spring",
        stiffness: resetSpringStiffness,
        damping: resetSpringDamping,
      };
    } else {
      return { duration: formationDuration, ease: [0.4, 0, 0.2, 1] };
    }
  };

  const handleAnimationComplete = (definition: string) => {
    if (
      isLastItem &&
      definition === "column" &&
      animationPhase === "forming_column"
    ) {
      onFormationComplete?.();
    }
  };

  return (
    <motion.div
      key={index}
      className={cn("w-full flex justify-center absolute inset-x-0", className)}
      variants={itemVariants}
      initial="initial"
      animate={target}
      transition={getTransition()}
      onAnimationComplete={handleAnimationComplete}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedList({
  children,
  className,
  stackGap = 20,
  columnGap = 85,
  scaleFactor = 0.05,
  scrollDownDuration = 5,
  formationDuration = 1,
}: AnimatedListProps) {
  const initialDelayValue = 500;
  const loopPauseDurationValue = 100;
  const listResetSpringStiffness = 100;
  const listResetSpringDamping = 25;
  const itemResetSpringStiffness = 120;
  const itemResetSpringDamping = 20;
  const visibleItemsCountValue = 4;

  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>("idle");
  const listControls = useAnimationControls();
  const childrenArray = useMemo(
    () => React.Children.toArray(children),
    [children]
  );
  const listLength = childrenArray.length;
  const totalHeight = listLength * columnGap;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (animationPhase === "idle") {
      timer = setTimeout(
        () => {
          setAnimationPhase("forming_column");
        },
        animationPhase === "idle" ? loopPauseDurationValue : initialDelayValue
      );
    }
    return () => clearTimeout(timer);
  }, [animationPhase, loopPauseDurationValue, initialDelayValue]);

  const handleFormationComplete = () => {
    if (animationPhase === "forming_column")
      setAnimationPhase("scrolling_down");
  };
  const handleScrollDownComplete = () => {
    if (animationPhase === "scrolling_down") setAnimationPhase("resetting");
  };
  const handleScrollUpComplete = () => {
    if (animationPhase === "resetting") setAnimationPhase("idle");
  };

  useEffect(() => {
    if (animationPhase === "scrolling_down") {
      listControls.start({
        y: totalHeight,
        transition: {
          duration: scrollDownDuration,
          ease: [0.4, 0, 0.2, 1],
        },
      });
    } else if (animationPhase === "resetting") {
      listControls.start({
        y: 0,
        transition: {
          type: "spring",
          stiffness: listResetSpringStiffness,
          damping: listResetSpringDamping,
        },
      });
    } else {
      listControls.set({ y: 0 });
    }
  }, [
    animationPhase,
    listControls,
    totalHeight,
    scrollDownDuration,
    listResetSpringStiffness,
    listResetSpringDamping,
  ]);

  const handleListAnimationComplete = (definition: { y?: number }) => {
    if (definition.y === totalHeight && animationPhase === "scrolling_down") {
      handleScrollDownComplete();
    } else if (definition.y === 0 && animationPhase === "resetting") {
      handleScrollUpComplete();
    }
  };

  return (
    <motion.div
      className={cn("relative w-full h-full flex items-center", className)}
      initial={{ y: 0 }}
      animate={listControls}
      onAnimationComplete={handleListAnimationComplete}
    >
      <AnimatePresence>
        {childrenArray.map((child, index) => (
          <InternalAnimatedListItem
            key={index}
            index={index}
            listLength={listLength}
            animationPhase={animationPhase}
            onFormationComplete={
              index === listLength - 1 ? handleFormationComplete : undefined
            }
            stackGap={stackGap}
            columnGap={columnGap}
            scaleFactor={scaleFactor}
            formationDuration={formationDuration}
            visibleItemsCount={visibleItemsCountValue}
            resetSpringStiffness={itemResetSpringStiffness}
            resetSpringDamping={itemResetSpringDamping}
          >
            {child}
          </InternalAnimatedListItem>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

```

Install NPM dependencies:
```bash
framer-motion
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
