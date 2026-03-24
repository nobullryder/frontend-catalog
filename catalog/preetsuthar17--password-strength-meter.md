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
password-strength-meter.tsx
"use client" 

import * as React from "react"
import { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

export interface PasswordStrengthMeterProps {
  password: string;
  minLength?: number;
  className?: string;
  barClassName?: string;
  criteriaClassName?: string;
  colors?: string[];
  levels?: number;
  customRequirements?: {
    label: string;
    test: (pass: string) => boolean;
  }[];
}

export function PasswordStrengthMeter({
  password,
  minLength = 8,
  className,
  barClassName,
  criteriaClassName,
  colors = ["#dc2626", "#ea580c", "#16a34a", "#15803d"],
  levels = 4,
  customRequirements,
}: PasswordStrengthMeterProps) {
  const [strength, setStrength] = useState(0);
  const [requirementsMet, setRequirementsMet] = useState<boolean[]>([]);

  const defaultRequirements = useMemo(
    () => [
      {
        label: `At least ${minLength} characters`,
        test: (pass: string) => pass.length >= minLength,
      },
      {
        label: "Contains uppercase letter",
        test: (pass: string) => /[A-Z]/.test(pass),
      },
      {
        label: "Contains number",
        test: (pass: string) => /[0-9]/.test(pass),
      },
      {
        label: "Contains special character",
        test: (pass: string) => /[^A-Za-z0-9]/.test(pass),
      },
    ],
    [minLength]
  );

  const requirements = customRequirements ?? defaultRequirements;

  useEffect(() => {
    const met = requirements.map((req) => req.test(password));
    setRequirementsMet(met);

    const metCount = met.filter(Boolean).length;
    const level = Math.min(
      Math.floor((metCount / requirements.length) * levels),
      levels
    );
    setStrength(level);
  }, [password, requirements, levels]);

  return (
    <div
      className={cn("space-y-3", className)}
      role="region"
      aria-label="Password strength meter"
    >
      {/* Strength Bar */}
      <div className={cn("flex gap-1", barClassName)}>
        {Array.from({ length: levels }).map((_, i) => (
          <div
            key={i}
            className="h-2 flex-1 rounded-full bg-muted transition-all"
            style={{
              backgroundColor:
                i < strength ? colors[strength - 1] : "#00000010",
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Criteria List */}
      <div
        className={cn("text-sm text-muted-foreground pt-2", criteriaClassName)}
      >
        {requirements.map((req, i) => (
          <div
            key={req.label}
            className={cn(
              "flex items-center gap-2",
              requirementsMet[i] && "text-green-600"
            )}
          >
            <span className="text-xs">•</span>
            {req.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export const PasswordStrengthMeterExample: React.FC = () => {
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col gap-4 max-w-xl w-full bg-background border border-primary/10 p-4 rounded-3xl shadow-2xl/10">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border rounded-xl focus:outline-fd-foreground/30"
        placeholder="Enter your password"
      />
      <PasswordStrengthMeter password={password} />
    </div>
  );
};


code.demo.tsx
import { PasswordStrengthMeter } from "@/components/ui/password-strength-meter"
import {useState} from 'react';

export const Demo = () => {
  const [password, setPassword] = useState("");
 
  return (
    <div className="flex flex-col gap-4">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border rounded-md focus-visible:ring-0 focus-within:ring-0 focus:outline-white/10"
        placeholder="Enter password"
      />
      <PasswordStrengthMeter password={password} />
    </div>
  );
};
```

Copy-paste these files for dependencies:
```tsx
/components/ui/password-strength-meter.tsx
"use client" 

import * as React from "react"
import { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

export interface PasswordStrengthMeterProps {
  password: string;
  minLength?: number;
  className?: string;
  barClassName?: string;
  criteriaClassName?: string;
  colors?: string[];
  levels?: number;
  customRequirements?: {
    label: string;
    test: (pass: string) => boolean;
  }[];
}

export function PasswordStrengthMeter({
  password,
  minLength = 8,
  className,
  barClassName,
  criteriaClassName,
  colors = ["#dc2626", "#ea580c", "#16a34a", "#15803d"],
  levels = 4,
  customRequirements,
}: PasswordStrengthMeterProps) {
  const [strength, setStrength] = useState(0);
  const [requirementsMet, setRequirementsMet] = useState<boolean[]>([]);

  const defaultRequirements = useMemo(
    () => [
      {
        label: `At least ${minLength} characters`,
        test: (pass: string) => pass.length >= minLength,
      },
      {
        label: "Contains uppercase letter",
        test: (pass: string) => /[A-Z]/.test(pass),
      },
      {
        label: "Contains number",
        test: (pass: string) => /[0-9]/.test(pass),
      },
      {
        label: "Contains special character",
        test: (pass: string) => /[^A-Za-z0-9]/.test(pass),
      },
    ],
    [minLength]
  );

  const requirements = customRequirements ?? defaultRequirements;

  useEffect(() => {
    const met = requirements.map((req) => req.test(password));
    setRequirementsMet(met);

    const metCount = met.filter(Boolean).length;
    const level = Math.min(
      Math.floor((metCount / requirements.length) * levels),
      levels
    );
    setStrength(level);
  }, [password, requirements, levels]);

  return (
    <div
      className={cn("space-y-3", className)}
      role="region"
      aria-label="Password strength meter"
    >
      {/* Strength Bar */}
      <div className={cn("flex gap-1", barClassName)}>
        {Array.from({ length: levels }).map((_, i) => (
          <div
            key={i}
            className="h-2 flex-1 rounded-full bg-muted transition-all"
            style={{
              backgroundColor:
                i < strength ? colors[strength - 1] : "#00000010",
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Criteria List */}
      <div
        className={cn("text-sm text-muted-foreground pt-2", criteriaClassName)}
      >
        {requirements.map((req, i) => (
          <div
            key={req.label}
            className={cn(
              "flex items-center gap-2",
              requirementsMet[i] && "text-green-600"
            )}
          >
            <span className="text-xs">•</span>
            {req.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export const PasswordStrengthMeterExample: React.FC = () => {
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col gap-4 max-w-xl w-full bg-background border border-primary/10 p-4 rounded-3xl shadow-2xl/10">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border rounded-xl focus:outline-fd-foreground/30"
        placeholder="Enter your password"
      />
      <PasswordStrengthMeter password={password} />
    </div>
  );
};

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
