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
marquee.tsx
export default function Marquee({ items }: { items: string[] }) {
  return (
    <div className="relative flex w-full overflow-x-hidden border-b-2 border-t-2 border-border bg-bw text-text font-base">
      <div className="animate-marquee whitespace-nowrap py-12">
        {items.map((item) => {
          return (
            <span key={item} className="mx-4 text-4xl">
              {item}
            </span>
          )
        })}
      </div>

      <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-12">
        {items.map((item) => {
          return (
            <span key={item} className="mx-4 text-4xl">
              {item}
            </span>
          )
        })}
      </div>

      {/* must have both of these in order to work */}
    </div>
  )
}

code.demo.tsx
import Marquee from "@/components/ui/marquee";

export function Demo() {
  const items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
  ];

  return (
    <Marquee items={items} />
  );
}

```

Copy-paste these files for dependencies:
```tsx
/components/ui/marquee.tsx
export default function Marquee({ items }: { items: string[] }) {
  return (
    <div className="relative flex w-full overflow-x-hidden border-b-2 border-t-2 border-border bg-bw text-text font-base">
      <div className="animate-marquee whitespace-nowrap py-12">
        {items.map((item) => {
          return (
            <span key={item} className="mx-4 text-4xl">
              {item}
            </span>
          )
        })}
      </div>

      <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-12">
        {items.map((item) => {
          return (
            <span key={item} className="mx-4 text-4xl">
              {item}
            </span>
          )
        })}
      </div>

      {/* must have both of these in order to work */}
    </div>
  )
}
```

Extend existing tailwind.config.js with this code:
```js
module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "main": "var(--main)",
        "overlay": "var(--overlay)",
        "bg": "var(--bg)",
        "bw": "var(--bw)",
        "blank": "var(--blank)",
        "text": "var(--text)",
        "mtext": "var(--mtext)",
        "border": "var(--border)",
        "ring": "var(--ring)",
        "ringOffset": "var(--ring-offset)",
        "secondaryBlack": "#212121"
      },
      "borderRadius": {
        "base": "5px"
      },
      "boxShadow": {
        "shadow": "var(--shadow)"
      },
      "translate": {
        "boxShadowX": "4px",
        "boxShadowY": "4px",
        "reverseBoxShadowX": "-4px",
        "reverseBoxShadowY": "-4px"
      },
      "fontWeight": {
        "base": "500",
        "heading": "700"
      },
      "animation": {
        "marquee": "marquee 5s linear infinite",
        "marquee2": "marquee2 5s linear infinite"
      },
      "keyframes": {
        "marquee": {
          "0%": {
            "transform": "translateX(0%)"
          },
          "100%": {
            "transform": "translateX(-100%)"
          }
        },
        "marquee2": {
          "0%": {
            "transform": "translateX(100%)"
          },
          "100%": {
            "transform": "translateX(0%)"
          }
        }
      }
    }
  }
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
