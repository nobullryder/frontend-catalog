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
verification-card.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VerificationCardProps {
  backgroundImage?: string;
  idNumber?: string;
  name?: string;
  validThru?: string;
  label?: string;
}

export function VerificationCard({
  backgroundImage = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_moon.png",
  idNumber = "ID **** 4590",
  name = "JANE DOE",
  validThru = "11/29",
  label = "IDENTITY CARD",
}: IdentityCardProps) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "relative h-52 w-80 rounded-2xl p-6 shadow-2xl text-white flex flex-col justify-between bg-cover bg-center"
      )}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 rounded-2xl" />

      {/* Card Content */}
      <div className="relative z-10 flex justify-between items-start text-xs tracking-wide">
        <span>{label}</span>
        <span>VALID</span>
      </div>

      <div className="relative z-10">
        <p className="text-lg tracking-widest font-semibold">{idNumber}</p>
        <div className="flex justify-between text-sm mt-2">
          <span>{name}</span>
          <span>{validThru}</span>
        </div>
      </div>
    </motion.div>
  );
}


code.demo.1759041971797.tsx
"use client";

import * as React from "react";
import { VerificationCard } from "@/components/ui/verification-card";

export default function IdentityCardDemo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center bg-muted/30">
      <a
        href="https://www.ruixen.com/?utm_source=21st.dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        <VerificationCard
          backgroundImage="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_moon.png"
          idNumber="**** **** **** 7421"
          name="RUIXEN UI"
          validThru="07/31"
          label="VERIFICATION CARD"
        />
      </a>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/verification-card.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VerificationCardProps {
  backgroundImage?: string;
  idNumber?: string;
  name?: string;
  validThru?: string;
  label?: string;
}

export function VerificationCard({
  backgroundImage = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_moon.png",
  idNumber = "ID **** 4590",
  name = "JANE DOE",
  validThru = "11/29",
  label = "IDENTITY CARD",
}: IdentityCardProps) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "relative h-52 w-80 rounded-2xl p-6 shadow-2xl text-white flex flex-col justify-between bg-cover bg-center"
      )}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 rounded-2xl" />

      {/* Card Content */}
      <div className="relative z-10 flex justify-between items-start text-xs tracking-wide">
        <span>{label}</span>
        <span>VALID</span>
      </div>

      <div className="relative z-10">
        <p className="text-lg tracking-widest font-semibold">{idNumber}</p>
        <div className="flex justify-between text-sm mt-2">
          <span>{name}</span>
          <span>{validThru}</span>
        </div>
      </div>
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
