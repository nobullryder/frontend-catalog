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
radio-group-card-vertical-demo.tsx
import { useId } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SwatchBook, WandSparkles } from "lucide-react";

const plans = [
  {
    value: "1",
    title: "Brand Strategy",
    description: "Perfect for individual creators.",
    icon: SwatchBook,
    backgroundColor: "bg-blue-500/10",
    color: "text-blue-500",
  },
  {
    value: "2",
    title: "UX/UI Design",
    description: "Built for collaboration and growing teams.",
    icon: WandSparkles,
    backgroundColor: "bg-orange-400/10",
    color: "text-orange-400",
  },
];

const RadioGroupCardVerticalDemo = () => {
  const id = useId();

  return (
    <RadioGroup
      defaultValue="1"
      className="w-full max-w-72 justify-items-center sm:grid-cols-2"
    >
      {plans.map((plan) => {
        const Icon = plan.icon;
        const radioId = `${id}-${plan.value}`;

        return (
          <Label
            key={plan.value}
            htmlFor={radioId}
            className={`border-input cursor-pointer relative flex w-full max-w-44 flex-col items-center gap-3 rounded-md border p-5 shadow-xs transition ${plan.backgroundColor}`}
          >
            <div className="w-full flex flex-col justify-items-start gap-9 text-start">
              <div className="w-full flex items-center justify-between gap-2">
                <Icon className={plan.color} />
                <div className="bg-background p-px rounded-full">
                  <RadioGroupItem
                    id={radioId}
                    value={plan.value}
                    aria-describedby={`${radioId}-description`}
                  />
                </div>
              </div>
              <span className="text-base font-medium">{plan.title}</span>
            </div>
          </Label>
        );
      })}
    </RadioGroup>
  );
};

export default RadioGroupCardVerticalDemo;


code.demo.1772722029787.tsx
import RadioGroupCardVerticalDemo from "@/components/ui/radio-group-card-vertical-demo";

export default function DemoOne() {
  return <RadioGroupCardVerticalDemo/>;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/radio-group-card-vertical-demo.tsx
import { useId } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SwatchBook, WandSparkles } from "lucide-react";

const plans = [
  {
    value: "1",
    title: "Brand Strategy",
    description: "Perfect for individual creators.",
    icon: SwatchBook,
    backgroundColor: "bg-blue-500/10",
    color: "text-blue-500",
  },
  {
    value: "2",
    title: "UX/UI Design",
    description: "Built for collaboration and growing teams.",
    icon: WandSparkles,
    backgroundColor: "bg-orange-400/10",
    color: "text-orange-400",
  },
];

const RadioGroupCardVerticalDemo = () => {
  const id = useId();

  return (
    <RadioGroup
      defaultValue="1"
      className="w-full max-w-72 justify-items-center sm:grid-cols-2"
    >
      {plans.map((plan) => {
        const Icon = plan.icon;
        const radioId = `${id}-${plan.value}`;

        return (
          <Label
            key={plan.value}
            htmlFor={radioId}
            className={`border-input cursor-pointer relative flex w-full max-w-44 flex-col items-center gap-3 rounded-md border p-5 shadow-xs transition ${plan.backgroundColor}`}
          >
            <div className="w-full flex flex-col justify-items-start gap-9 text-start">
              <div className="w-full flex items-center justify-between gap-2">
                <Icon className={plan.color} />
                <div className="bg-background p-px rounded-full">
                  <RadioGroupItem
                    id={radioId}
                    value={plan.value}
                    aria-describedby={`${radioId}-description`}
                  />
                </div>
              </div>
              <span className="text-base font-medium">{plan.title}</span>
            </div>
          </Label>
        );
      })}
    </RadioGroup>
  );
};

export default RadioGroupCardVerticalDemo;

```

Install NPM dependencies:
```bash
lucide-react
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
