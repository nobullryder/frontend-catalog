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
animation-presence-mode.tsx
"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

function ModeExample({
    mode,
    icon,
    state,
}: {
    mode: "sync" | "wait" | "popLayout"
    icon: React.ReactNode
    state: boolean
}) {
    const defaultEase = [0.26, 0.02, 0.23, 0.94]
    const motionProps = {
        style: {
            ...baseCircleStyle,
            backgroundColor: state ? "#f5f5f5" : "transparent",
            color: state ? "#0f1115" : "#f5f5f5",
            border: state
                ? "2px solid #1d2628"
                : "2px solid #f5f5f5",
        },
        initial: { opacity: 0, scale: 0.6 },
        animate: {
            opacity: 1,
            scale: 1,
            ease: mode === "wait" ? [0.02, 0.35, 0.25, 0.99] : defaultEase,
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            ease: mode === "wait" ? [0.46, 0.04, 0.97, 0.44] : defaultEase,
        },
        transition: { duration: 0.3 },
    }

    return (
        <div style={modeSection}>
            <div style={iconContainer}>
                <AnimatePresence mode={mode}>
                    <motion.div key={String(state)} {...motionProps}>
                        {icon}
                    </motion.div>
                </AnimatePresence>
            </div>
            <code style={modeTitle}>{mode}</code>
        </div>
    )
}

export default function AnimatePresenceModes() {
    const [state, setState] = useState(true)

    const switchItems = () => {
        setState((prev) => !prev)
    }

    return (
        <div style={container}>
            <div style={modesContainer}>
                <ModeExample mode="sync" icon={<SyncIcon />} state={state} />
                <ModeExample mode="wait" icon={<WaitIcon />} state={state} />
                <ModeExample
                    mode="popLayout"
                    icon={<PopLayoutIcon />}
                    state={state}
                />
            </div>

            <motion.button
                style={button}
                onClick={switchItems}
                whileTap={{ scale: 0.95 }}
            >
                Switch
            </motion.button>
        </div>
    )
}

function SyncIcon() {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 16h5v5" />
        </svg>
    )
}

function WaitIcon() {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 2v4" />
            <path d="m16.2 7.8 2.9-2.9" />
            <path d="M18 12h4" />
            <path d="m16.2 16.2 2.9 2.9" />
            <path d="M12 18v4" />
            <path d="m4.9 19.1 2.9-2.9" />
            <path d="M2 12h4" />
            <path d="m4.9 4.9 2.9 2.9" />
        </svg>
    )
}

function PopLayoutIcon() {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
            <path d="m21 3-9 9" />
            <path d="M15 3h6v6" />
        </svg>
    )
}

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "40px",
    color: "#f5f5f5",
    borderRadius: "12px",
}

const modesContainer: React.CSSProperties = {
    display: "flex",
    gap: "60px",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
}

const modeSection: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
}

const iconContainer: React.CSSProperties = {
    width: "80px",
    height: "80px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
}

const modeTitle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: "500",
    color: "#f5f5f5",
    opacity: "0.9",
}

const button: React.CSSProperties = {
    backgroundColor: "#f5f5f5",
    color: "#0f1115",
    border: "none",
    borderRadius: "8px",
    padding: "12px 32px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    outline: "none",
}

const baseCircleStyle: React.CSSProperties = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    willChange: "transform",
    boxSizing: "border-box",
    flexShrink: 0,
}


code.demo.1758809339474.tsx
import Component from "@/components/ui/animation-presence-mode";

export default function AnimatePresenceModes() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animation-presence-mode.tsx
"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

function ModeExample({
    mode,
    icon,
    state,
}: {
    mode: "sync" | "wait" | "popLayout"
    icon: React.ReactNode
    state: boolean
}) {
    const defaultEase = [0.26, 0.02, 0.23, 0.94]
    const motionProps = {
        style: {
            ...baseCircleStyle,
            backgroundColor: state ? "#f5f5f5" : "transparent",
            color: state ? "#0f1115" : "#f5f5f5",
            border: state
                ? "2px solid #1d2628"
                : "2px solid #f5f5f5",
        },
        initial: { opacity: 0, scale: 0.6 },
        animate: {
            opacity: 1,
            scale: 1,
            ease: mode === "wait" ? [0.02, 0.35, 0.25, 0.99] : defaultEase,
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            ease: mode === "wait" ? [0.46, 0.04, 0.97, 0.44] : defaultEase,
        },
        transition: { duration: 0.3 },
    }

    return (
        <div style={modeSection}>
            <div style={iconContainer}>
                <AnimatePresence mode={mode}>
                    <motion.div key={String(state)} {...motionProps}>
                        {icon}
                    </motion.div>
                </AnimatePresence>
            </div>
            <code style={modeTitle}>{mode}</code>
        </div>
    )
}

export default function AnimatePresenceModes() {
    const [state, setState] = useState(true)

    const switchItems = () => {
        setState((prev) => !prev)
    }

    return (
        <div style={container}>
            <div style={modesContainer}>
                <ModeExample mode="sync" icon={<SyncIcon />} state={state} />
                <ModeExample mode="wait" icon={<WaitIcon />} state={state} />
                <ModeExample
                    mode="popLayout"
                    icon={<PopLayoutIcon />}
                    state={state}
                />
            </div>

            <motion.button
                style={button}
                onClick={switchItems}
                whileTap={{ scale: 0.95 }}
            >
                Switch
            </motion.button>
        </div>
    )
}

function SyncIcon() {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 16h5v5" />
        </svg>
    )
}

function WaitIcon() {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 2v4" />
            <path d="m16.2 7.8 2.9-2.9" />
            <path d="M18 12h4" />
            <path d="m16.2 16.2 2.9 2.9" />
            <path d="M12 18v4" />
            <path d="m4.9 19.1 2.9-2.9" />
            <path d="M2 12h4" />
            <path d="m4.9 4.9 2.9 2.9" />
        </svg>
    )
}

function PopLayoutIcon() {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
            <path d="m21 3-9 9" />
            <path d="M15 3h6v6" />
        </svg>
    )
}

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "40px",
    color: "#f5f5f5",
    borderRadius: "12px",
}

const modesContainer: React.CSSProperties = {
    display: "flex",
    gap: "60px",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
}

const modeSection: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
}

const iconContainer: React.CSSProperties = {
    width: "80px",
    height: "80px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
}

const modeTitle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: "500",
    color: "#f5f5f5",
    opacity: "0.9",
}

const button: React.CSSProperties = {
    backgroundColor: "#f5f5f5",
    color: "#0f1115",
    border: "none",
    borderRadius: "8px",
    padding: "12px 32px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    outline: "none",
}

const baseCircleStyle: React.CSSProperties = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    willChange: "transform",
    boxSizing: "border-box",
    flexShrink: 0,
}

```

Install NPM dependencies:
```bash
motion
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
