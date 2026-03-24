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
dark-theme.tsx
import React from "react"

export const DarkTheme = () => {
  return (
    <svg
      width="177"
      height="140"
      viewBox="0 0 177 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_77_16)">
        <rect width="177" height="162" rx="3" fill="#171717" />
        <g filter="url(#filter0_d_77_16)">
          <path
            d="M44 0H174C175.657 0 177 1.34315 177 3V151H44V0Z"
            fill="#262626"
          />
        </g>
        <circle cx="35" cy="8" r="4" fill="#525252" />
        <circle cx="73" cy="40" r="4" fill="#525252" />
        <rect x="5" y="5" width="22" height="6" rx="1" fill="#404040" />
        <rect x="5" y="16" width="34" height="6" rx="1" fill="#171717" />
        <rect
          x="5.5"
          y="16.5"
          width="33"
          height="5"
          rx="0.5"
          stroke="white"
          strokeOpacity="0.12"
        />
        <rect x="5" y="26" width="34" height="6" rx="1" fill="#404040" />
        <rect x="81" y="37" width="13" height="2" rx="1" fill="#A3A3A3" />
        <rect x="96" y="37" width="19" height="2" rx="1" fill="#A3A3A3" />
        <rect x="81" y="42" width="8" height="2" rx="1" fill="#525252" />
        <rect x="91" y="42" width="15" height="2" rx="1" fill="#525252" />
        <rect x="108" y="42" width="6" height="2" rx="1" fill="#525252" />
        <rect x="116" y="42" width="12" height="2" rx="1" fill="#525252" />
        <rect x="130" y="42" width="9" height="2" rx="1" fill="#525252" />
        <rect x="69" y="47" width="8" height="2" rx="1" fill="#525252" />
        <rect x="79" y="47" width="2" height="2" rx="1" fill="#525252" />
        <rect x="83" y="47" width="9" height="2" rx="1" fill="#525252" />
        <rect x="94" y="47" width="16" height="2" rx="1" fill="#525252" />
        <rect x="112" y="47" width="7" height="2" rx="1" fill="#525252" />
        <rect x="121" y="47" width="3" height="2" rx="1" fill="#525252" />
        <rect x="126" y="47" width="9" height="2" rx="1" fill="#525252" />
        <rect x="137" y="47" width="4" height="2" rx="1" fill="#525252" />
        <rect x="143" y="47" width="6" height="2" rx="1" fill="#525252" />
        <rect x="5" y="36" width="34" height="6" rx="1" fill="#262626" />
        <rect x="5" y="46" width="34" height="6" rx="1" fill="#262626" />
        <rect x="5" y="56" width="34" height="6" rx="1" fill="#262626" />
        <rect x="69" y="53" width="84" height="47" rx="4" fill="#404040" />
        <rect
          width="177"
          height="140"
          fill="url(#paint0_linear_77_16)"
          fillOpacity="0.32"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_77_16"
          x="43"
          y="0"
          width="134"
          height="151"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_77_16"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_77_16"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_77_16"
          x1="88.5"
          y1="0"
          x2="88.5"
          y2="140"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.565789" stopOpacity="0" />
          <stop offset="1" />
        </linearGradient>
        <clipPath id="clip0_77_16">
          <rect width="177" height="140" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}


code.demo.tsx
import { DarkTheme } from "@/components/ui/dark-theme-icon"

function Demo() {
  return (
    <div className="flex items-center justify-center p-8">
      <DarkTheme />
    </div>
  );
}

export { Demo };

```

Copy-paste these files for dependencies:
```tsx
/components/ui/dark-theme.tsx
import React from "react"

export const DarkTheme = () => {
  return (
    <svg
      width="177"
      height="140"
      viewBox="0 0 177 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_77_16)">
        <rect width="177" height="162" rx="3" fill="#171717" />
        <g filter="url(#filter0_d_77_16)">
          <path
            d="M44 0H174C175.657 0 177 1.34315 177 3V151H44V0Z"
            fill="#262626"
          />
        </g>
        <circle cx="35" cy="8" r="4" fill="#525252" />
        <circle cx="73" cy="40" r="4" fill="#525252" />
        <rect x="5" y="5" width="22" height="6" rx="1" fill="#404040" />
        <rect x="5" y="16" width="34" height="6" rx="1" fill="#171717" />
        <rect
          x="5.5"
          y="16.5"
          width="33"
          height="5"
          rx="0.5"
          stroke="white"
          strokeOpacity="0.12"
        />
        <rect x="5" y="26" width="34" height="6" rx="1" fill="#404040" />
        <rect x="81" y="37" width="13" height="2" rx="1" fill="#A3A3A3" />
        <rect x="96" y="37" width="19" height="2" rx="1" fill="#A3A3A3" />
        <rect x="81" y="42" width="8" height="2" rx="1" fill="#525252" />
        <rect x="91" y="42" width="15" height="2" rx="1" fill="#525252" />
        <rect x="108" y="42" width="6" height="2" rx="1" fill="#525252" />
        <rect x="116" y="42" width="12" height="2" rx="1" fill="#525252" />
        <rect x="130" y="42" width="9" height="2" rx="1" fill="#525252" />
        <rect x="69" y="47" width="8" height="2" rx="1" fill="#525252" />
        <rect x="79" y="47" width="2" height="2" rx="1" fill="#525252" />
        <rect x="83" y="47" width="9" height="2" rx="1" fill="#525252" />
        <rect x="94" y="47" width="16" height="2" rx="1" fill="#525252" />
        <rect x="112" y="47" width="7" height="2" rx="1" fill="#525252" />
        <rect x="121" y="47" width="3" height="2" rx="1" fill="#525252" />
        <rect x="126" y="47" width="9" height="2" rx="1" fill="#525252" />
        <rect x="137" y="47" width="4" height="2" rx="1" fill="#525252" />
        <rect x="143" y="47" width="6" height="2" rx="1" fill="#525252" />
        <rect x="5" y="36" width="34" height="6" rx="1" fill="#262626" />
        <rect x="5" y="46" width="34" height="6" rx="1" fill="#262626" />
        <rect x="5" y="56" width="34" height="6" rx="1" fill="#262626" />
        <rect x="69" y="53" width="84" height="47" rx="4" fill="#404040" />
        <rect
          width="177"
          height="140"
          fill="url(#paint0_linear_77_16)"
          fillOpacity="0.32"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_77_16"
          x="43"
          y="0"
          width="134"
          height="151"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_77_16"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_77_16"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_77_16"
          x1="88.5"
          y1="0"
          x2="88.5"
          y2="140"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.565789" stopOpacity="0" />
          <stop offset="1" />
        </linearGradient>
        <clipPath id="clip0_77_16">
          <rect width="177" height="140" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

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
