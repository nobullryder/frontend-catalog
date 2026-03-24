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
about-page.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface AboutPageProps {
  achievements?: Array<{ label: string; value: string }>
}

const defaultAchievements = [
  { label: "Companies Supported", value: "300+" },
  { label: "Projects Finalized", value: "800+" },
  { label: "Happy Customers", value: "99%" },
  { label: "Recognized Awards", value: "10+" },
]

export default function AboutPage({
  achievements = defaultAchievements,
}: AboutPageProps) {
  return (
    <div className="flex flex-col">

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="py-16 md:py-28 bg-background">
        <div className="mx-auto max-w-6xl space-y-2 px-6">
          <Image
            className="rounded-xl object-cover w-full h-[240px] md:h-[460px]"
            src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_hero_gradient.jpg"
            alt="Hero section image"
            width={1200}
            height={600}
            priority
          />

          <div className="grid gap-6 md:grid-cols-2 md:gap-12">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white leading-snug">
              The Lyra <span className="text-primary">ecosystem</span>{" "}
              <span className="text-gray-500 dark:text-gray-400">
                brings together our models, products, and platforms.
              </span>
            </h1>
            <div className="space-y-6 text-muted-foreground">
              <p>
                Lyra is evolving to be more than just the models. It supports an entire ecosystem — 
                from products to the APIs and platforms helping developers and businesses innovate.
              </p>
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="gap-1 pr-1.5"
              >
                <Link href="#">
                  <span>Learn More</span>
                  <ChevronRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- ABOUT SECTION ---------------- */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl space-y-16 px-6">

          {/* Header */}
          <div className="grid gap-6 text-center md:grid-cols-2 md:gap-12 md:text-left">
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white">
              About Us
            </h1>
            <p className="text-muted-foreground">
              Shadcnblocks is a passionate team dedicated to creating innovative solutions
              that empower businesses to thrive in the digital age.
            </p>
          </div>

          {/* ---------------- LAST THREE CARDS (NEW LAYOUT) ---------------- */}
          <div className="flex flex-col md:flex-row gap-6 mt-16">
            
            {/* LEFT BIG IMAGE */}
            <div className="md:flex-1">
              <Image
                src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_chat_gradient.png"
                alt="Left big image"
                className="rounded-xl object-cover w-full h-[300px] sm:h-[360px] md:h-[100%]"
                width={800}
                height={550}
              />
            </div>

            {/* RIGHT TWO CARDS */}
            <div className="flex flex-col gap-6 md:flex-1">
              {/* FIRST CARD */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="relative overflow-hidden rounded-xl bg-black text-white shadow-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="relative h-60 sm:h-64 md:h-48 w-full overflow-hidden"
                >
                  <Image
                    src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_moon.png"
                    alt="Card Image"
                    className="h-full w-full object-cover"
                    width={600}
                    height={400}
                  />
                  <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-black via-black/70 to-transparent" />
                </motion.div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">Accelerate Growth</h3>
                  <p className="mt-2 text-sm text-gray-300">
                    Our solutions drive innovation, efficiency, and measurable impact for businesses.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 border-white text-black dark:text-white hover:bg-white hover:text-black"
                  >
                    Learn More
                  </Button>
                </div>
              </motion.div>

              {/* SECOND CARD */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="relative overflow-hidden rounded-xl bg-muted shadow-lg"
              >
                <Image
                  src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_hero_gradient.jpg"
                  alt="Secondary card"
                  className="h-full w-full object-cover min-h-[220px] sm:min-h-[240px] md:min-h-[220px]"
                  width={600}
                  height={400}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <h3 className="text-xl font-bold">Future-Ready Design</h3>
                  <p className="mt-2 text-sm text-gray-200">
                    Intuitive, scalable designs for modern businesses combining aesthetics and functionality.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}


code.demo.1759946302802.tsx
import AboutPage from "@/components/ui/about-page"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AboutPage />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/about-page.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface AboutPageProps {
  achievements?: Array<{ label: string; value: string }>
}

const defaultAchievements = [
  { label: "Companies Supported", value: "300+" },
  { label: "Projects Finalized", value: "800+" },
  { label: "Happy Customers", value: "99%" },
  { label: "Recognized Awards", value: "10+" },
]

export default function AboutPage({
  achievements = defaultAchievements,
}: AboutPageProps) {
  return (
    <div className="flex flex-col">

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="py-16 md:py-28 bg-background">
        <div className="mx-auto max-w-6xl space-y-2 px-6">
          <Image
            className="rounded-xl object-cover w-full h-[240px] md:h-[460px]"
            src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_hero_gradient.jpg"
            alt="Hero section image"
            width={1200}
            height={600}
            priority
          />

          <div className="grid gap-6 md:grid-cols-2 md:gap-12">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white leading-snug">
              The Lyra <span className="text-primary">ecosystem</span>{" "}
              <span className="text-gray-500 dark:text-gray-400">
                brings together our models, products, and platforms.
              </span>
            </h1>
            <div className="space-y-6 text-muted-foreground">
              <p>
                Lyra is evolving to be more than just the models. It supports an entire ecosystem — 
                from products to the APIs and platforms helping developers and businesses innovate.
              </p>
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="gap-1 pr-1.5"
              >
                <Link href="#">
                  <span>Learn More</span>
                  <ChevronRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- ABOUT SECTION ---------------- */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl space-y-16 px-6">

          {/* Header */}
          <div className="grid gap-6 text-center md:grid-cols-2 md:gap-12 md:text-left">
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white">
              About Us
            </h1>
            <p className="text-muted-foreground">
              Shadcnblocks is a passionate team dedicated to creating innovative solutions
              that empower businesses to thrive in the digital age.
            </p>
          </div>

          {/* ---------------- LAST THREE CARDS (NEW LAYOUT) ---------------- */}
          <div className="flex flex-col md:flex-row gap-6 mt-16">
            
            {/* LEFT BIG IMAGE */}
            <div className="md:flex-1">
              <Image
                src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_chat_gradient.png"
                alt="Left big image"
                className="rounded-xl object-cover w-full h-[300px] sm:h-[360px] md:h-[100%]"
                width={800}
                height={550}
              />
            </div>

            {/* RIGHT TWO CARDS */}
            <div className="flex flex-col gap-6 md:flex-1">
              {/* FIRST CARD */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="relative overflow-hidden rounded-xl bg-black text-white shadow-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="relative h-60 sm:h-64 md:h-48 w-full overflow-hidden"
                >
                  <Image
                    src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_moon.png"
                    alt="Card Image"
                    className="h-full w-full object-cover"
                    width={600}
                    height={400}
                  />
                  <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-black via-black/70 to-transparent" />
                </motion.div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">Accelerate Growth</h3>
                  <p className="mt-2 text-sm text-gray-300">
                    Our solutions drive innovation, efficiency, and measurable impact for businesses.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 border-white text-black dark:text-white hover:bg-white hover:text-black"
                  >
                    Learn More
                  </Button>
                </div>
              </motion.div>

              {/* SECOND CARD */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="relative overflow-hidden rounded-xl bg-muted shadow-lg"
              >
                <Image
                  src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_hero_gradient.jpg"
                  alt="Secondary card"
                  className="h-full w-full object-cover min-h-[220px] sm:min-h-[240px] md:min-h-[220px]"
                  width={600}
                  height={400}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <h3 className="text-xl font-bold">Future-Ready Design</h3>
                  <p className="mt-2 text-sm text-gray-200">
                    Intuitive, scalable designs for modern businesses combining aesthetics and functionality.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

```

Install NPM dependencies:
```bash
next, lucide-react, framer-motion
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
