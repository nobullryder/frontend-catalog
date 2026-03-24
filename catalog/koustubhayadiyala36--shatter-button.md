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
shatter-button.tsx
"use client"

import { useState, useCallback, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"

export interface ShatterButtonProps {
  children: ReactNode
  className?: string
  shardCount?: number
  shatterColor?: string
  onClick?: () => void
}

interface Shard {
  id: number
  x: number
  y: number
  rotation: number
  velocityX: number
  velocityY: number
  size: number
}

export function Component({
  children,
  className = "",
  shardCount = 20,
  shatterColor = "#00ffff",
  onClick,
}: ShatterButtonProps) {
  const [isShattered, setIsShattered] = useState(false)
  const [shards, setShards] = useState<Shard[]>([])

  const handleClick = useCallback(() => {
    if (isShattered) return

    const newShards: Shard[] = []
    for (let i = 0; i < shardCount; i++) {
      const angle = (Math.PI * 2 * i) / shardCount + Math.random() * 0.5
      const velocity = 100 + Math.random() * 200
      newShards.push({
        id: i,
        x: 0,
        y: 0,
        rotation: Math.random() * 720 - 360,
        velocityX: Math.cos(angle) * velocity,
        velocityY: Math.sin(angle) * velocity,
        size: 4 + Math.random() * 12,
      })
    }

    setShards(newShards)
    setIsShattered(true)
    onClick?.()

    setTimeout(() => {
      setIsShattered(false)
      setShards([])
    }, 1000)
  }, [isShattered, shardCount, onClick])

  return (
    <div className="relative inline-block">
      <motion.button
        className={`relative px-8 py-4 font-semibold rounded-xl overflow-hidden ${className}`}
        onClick={handleClick}
        animate={{
          scale: isShattered ? 0 : 1,
          opacity: isShattered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: `linear-gradient(135deg, ${shatterColor}22 0%, ${shatterColor}44 100%)`,
          border: `1px solid ${shatterColor}66`,
          color: shatterColor,
          boxShadow: `0 0 20px ${shatterColor}33, inset 0 0 20px ${shatterColor}11`,
        }}
      >
        {/* Glowing background effect */}
        <motion.div
          className="absolute inset-0 opacity-0"
          whileHover={{ opacity: 1 }}
          style={{
            background: `radial-gradient(circle at center, ${shatterColor}33 0%, transparent 70%)`,
          }}
        />
        <span className="relative z-10">{children}</span>
      </motion.button>

      {/* Shards */}
      <AnimatePresence>
        {shards.map((shard) => (
          <motion.div
            key={shard.id}
            className="absolute pointer-events-none"
            initial={{
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: shard.velocityX,
              y: shard.velocityY,
              rotate: shard.rotation,
              opacity: 0,
              scale: 0.5,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{
              left: "50%",
              top: "50%",
              width: shard.size,
              height: shard.size,
              background: shatterColor,
              boxShadow: `0 0 10px ${shatterColor}, 0 0 20px ${shatterColor}`,
              clipPath: `polygon(
                ${Math.random() * 50}% 0%,
                100% ${Math.random() * 50}%,
                ${50 + Math.random() * 50}% 100%,
                0% ${50 + Math.random() * 50}%
              )`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Explosion ring */}
      <AnimatePresence>
        {isShattered && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 300, height: 300, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              border: `2px solid ${shatterColor}`,
              boxShadow: `0 0 30px ${shatterColor}`,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}


code.demo.1764412174848.tsx
import { Component } from "@/components/ui/shatter-button";

export default function DemoOne() {
  return <Component shatterColor="#00ffff"/>;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/shatter-button.tsx
"use client"

import { useState, useCallback, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"

export interface ShatterButtonProps {
  children: ReactNode
  className?: string
  shardCount?: number
  shatterColor?: string
  onClick?: () => void
}

interface Shard {
  id: number
  x: number
  y: number
  rotation: number
  velocityX: number
  velocityY: number
  size: number
}

export function Component({
  children,
  className = "",
  shardCount = 20,
  shatterColor = "#00ffff",
  onClick,
}: ShatterButtonProps) {
  const [isShattered, setIsShattered] = useState(false)
  const [shards, setShards] = useState<Shard[]>([])

  const handleClick = useCallback(() => {
    if (isShattered) return

    const newShards: Shard[] = []
    for (let i = 0; i < shardCount; i++) {
      const angle = (Math.PI * 2 * i) / shardCount + Math.random() * 0.5
      const velocity = 100 + Math.random() * 200
      newShards.push({
        id: i,
        x: 0,
        y: 0,
        rotation: Math.random() * 720 - 360,
        velocityX: Math.cos(angle) * velocity,
        velocityY: Math.sin(angle) * velocity,
        size: 4 + Math.random() * 12,
      })
    }

    setShards(newShards)
    setIsShattered(true)
    onClick?.()

    setTimeout(() => {
      setIsShattered(false)
      setShards([])
    }, 1000)
  }, [isShattered, shardCount, onClick])

  return (
    <div className="relative inline-block">
      <motion.button
        className={`relative px-8 py-4 font-semibold rounded-xl overflow-hidden ${className}`}
        onClick={handleClick}
        animate={{
          scale: isShattered ? 0 : 1,
          opacity: isShattered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: `linear-gradient(135deg, ${shatterColor}22 0%, ${shatterColor}44 100%)`,
          border: `1px solid ${shatterColor}66`,
          color: shatterColor,
          boxShadow: `0 0 20px ${shatterColor}33, inset 0 0 20px ${shatterColor}11`,
        }}
      >
        {/* Glowing background effect */}
        <motion.div
          className="absolute inset-0 opacity-0"
          whileHover={{ opacity: 1 }}
          style={{
            background: `radial-gradient(circle at center, ${shatterColor}33 0%, transparent 70%)`,
          }}
        />
        <span className="relative z-10">{children}</span>
      </motion.button>

      {/* Shards */}
      <AnimatePresence>
        {shards.map((shard) => (
          <motion.div
            key={shard.id}
            className="absolute pointer-events-none"
            initial={{
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: shard.velocityX,
              y: shard.velocityY,
              rotate: shard.rotation,
              opacity: 0,
              scale: 0.5,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{
              left: "50%",
              top: "50%",
              width: shard.size,
              height: shard.size,
              background: shatterColor,
              boxShadow: `0 0 10px ${shatterColor}, 0 0 20px ${shatterColor}`,
              clipPath: `polygon(
                ${Math.random() * 50}% 0%,
                100% ${Math.random() * 50}%,
                ${50 + Math.random() * 50}% 100%,
                0% ${50 + Math.random() * 50}%
              )`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Explosion ring */}
      <AnimatePresence>
        {isShattered && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 300, height: 300, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              border: `2px solid ${shatterColor}`,
              boxShadow: `0 0 30px ${shatterColor}`,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
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
