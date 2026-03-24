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
pricing-blocks.tsx
"use client"

import { motion } from "motion/react"

export default function PricingSimple() {
  return (
    <section className="relative flex flex-col items-center py-12">
      <div className="flex w-full flex-col items-center justify-center gap-8 md:flex-row">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-background text-foreground flex w-80 flex-col items-center rounded-lg border px-8 py-6 text-center shadow-sm transition-transform hover:scale-105"
        >
          <div className="mb-2 text-4xl font-extrabold text-primary">$19/mo</div>
          <div className="text-muted-foreground mb-4 text-sm">
            Perfect for individuals
          </div>
          <ul className="text-muted-foreground mb-6 space-y-1 text-left text-xs">
            <li>✔️ Unlimited Projects</li>
            <li>✔️ Email Support</li>
            <li>✔️ All Features</li>
          </ul>
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded px-4 py-2 font-semibold transition">
            Get Started
          </button>
        </motion.div>
      </div>
    </section>
  )
}


code.demo.1756780152946.tsx
"use client"

import { motion } from "motion/react"

export default function PricingModern() {
  return (
    <section className="relative flex flex-col items-center py-24">
      <div className="flex w-full flex-col items-center justify-center gap-8 md:flex-row">
        {/* Basic */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative z-10 w-72 rounded-xl border border-pink-400/30 bg-black/40 p-8 text-foreground shadow-[0_0_0_1px_rgba(255,105,180,.08)_inset] backdrop-blur-md transition-transform hover:scale-105"
        >
          <div className="mb-2 text-center text-lg font-semibold text-pink-400">
            Basic
          </div>
          <div className="mb-4 text-center text-4xl font-extrabold text-white">
            $12/mo
          </div>
          <ul className="mb-6 space-y-2 text-sm text-white/70">
            <li><span className="mr-2 text-emerald-400">✔</span>1 Project</li>
            <li><span className="mr-2 text-emerald-400">✔</span>Email Support</li>
            <li><span className="mr-2 text-emerald-400">✔</span>All Core Features</li>
          </ul>
          <button className="w-full rounded-md bg-pink-500 py-2 font-semibold text-[#111] hover:bg-pink-400 transition">
            Choose Basic
          </button>
        </motion.div>

        {/* Pro (Featured) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="relative z-20 w-80 scale-110 rounded-xl border-4 border-pink-400/50 bg-gradient-to-b from-[#ff6fb1] to-[#ff3a95] p-10 text-[#1a1a1a] shadow-xl transition-transform hover:scale-[1.12]"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full border border-black/20 bg-[#ff6fb1] px-4 py-1 text-xs font-bold text-[#1a1a1a] shadow">
            Most Popular
          </div>
          <div className="mb-2 text-center text-lg font-semibold">Pro</div>
          <div className="mb-4 text-center text-5xl font-extrabold">$29/mo</div>
          <ul className="mb-6 space-y-2 text-sm">
            <li><span className="mr-2 text-emerald-600">✔</span>Unlimited Projects</li>
            <li><span className="mr-2 text-emerald-600">✔</span>Priority Support</li>
            <li><span className="mr-2 text-emerald-600">✔</span>Team Collaboration</li>
            <li><span className="mr-2 text-emerald-600">✔</span>Advanced Analytics</li>
          </ul>
          <button className="w-full rounded-md bg-neutral-900 py-2 font-semibold text-white hover:bg-neutral-800 transition">
            Choose Pro
          </button>
        </motion.div>

        {/* Enterprise */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.7 }}
          className="relative z-10 w-72 rounded-xl border border-pink-400/30 bg-black/40 p-8 text-foreground shadow-[0_0_0_1px_rgba(255,105,180,.08)_inset] backdrop-blur-md transition-transform hover:scale-105"
        >
          <div className="mb-2 text-center text-lg font-semibold text-pink-400">
            Enterprise
          </div>
          <div className="mb-4 text-center text-4xl font-extrabold text-white">
            Custom
          </div>
          <ul className="mb-6 space-y-2 text-sm text-white/70">
            <li><span className="mr-2 text-emerald-400">✔</span>Dedicated Manager</li>
            <li><span className="mr-2 text-emerald-400">✔</span>Custom Integrations</li>
            <li><span className="mr-2 text-emerald-400">✔</span>SLA &amp; Support</li>
          </ul>
          <button className="w-full rounded-md bg-pink-500 py-2 font-semibold text-[#111] hover:bg-pink-400 transition">
            Contact Sales
          </button>
        </motion.div>
      </div>
    </section>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/pricing-blocks.tsx
"use client"

import { motion } from "motion/react"

export default function PricingSimple() {
  return (
    <section className="relative flex flex-col items-center py-12">
      <div className="flex w-full flex-col items-center justify-center gap-8 md:flex-row">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-background text-foreground flex w-80 flex-col items-center rounded-lg border px-8 py-6 text-center shadow-sm transition-transform hover:scale-105"
        >
          <div className="mb-2 text-4xl font-extrabold text-primary">$19/mo</div>
          <div className="text-muted-foreground mb-4 text-sm">
            Perfect for individuals
          </div>
          <ul className="text-muted-foreground mb-6 space-y-1 text-left text-xs">
            <li>✔️ Unlimited Projects</li>
            <li>✔️ Email Support</li>
            <li>✔️ All Features</li>
          </ul>
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded px-4 py-2 font-semibold transition">
            Get Started
          </button>
        </motion.div>
      </div>
    </section>
  )
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
