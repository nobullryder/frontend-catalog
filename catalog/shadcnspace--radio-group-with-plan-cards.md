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
radio-group-with-plan-cards.tsx
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Gem, HeartHandshake, Rocket } from "lucide-react";

export const title = "RadioGroup with Cards";

const RadioGroupWithPlanCards = () => (
  <RadioGroup defaultValue="card-1" className="grid gap-2 max-w-sm">
    {[
      {
        id: "card-1",
        title: "Launch Plan",
        desc: "Essential tools to get started.",
        price: "Free",
        icon: Rocket,
        color: "text-blue-500",
        background: "bg-blue-500/10",
      },
      {
        id: "card-2",
        title: "Grow Plan",
        desc: "Advanced features for growing teams.",
        price: "$19.00",
        icon: HeartHandshake,
        color: "text-orange-400",
        background: "bg-orange-400/10",
      },
      {
        id: "card-3",
        title: "Scale Plan",
        desc: "Enterprise power and priority support.",
        price: "$49.00",
        icon: Gem,
        color: "text-red-500",
        background: "bg-red-500/10",
      },
    ].map((item) => {
      const Icon = item.icon;
      return (
        <Label
          key={item.id}
          htmlFor={item.id}
          className={cn(
            "flex cursor-pointer items-start gap-3 rounded-lg border p-4 shadow-xs transition-all",
            "hover:bg-accent",
            "has-data-checked:bg-accent",
          )}
        >
          <div className={`${item.background} p-1.5 rounded-lg`}>
            <Icon className={item.color} />
          </div>
          <div className="w-full flex gap-2 items-start justify-between">
            <div className="grid gap-1.5">
              <p className="font-medium leading-none">{item.title}</p>
              <p className="text-xs text-muted-foreground font-normal">
                {item.desc}
              </p>
            </div>
            <span className="text-muted-foreground text-xs font-normal">
              {item.price}
            </span>
          </div>
          <RadioGroupItem value={item.id} id={item.id} />
        </Label>
      );
    })}
  </RadioGroup>
);

export default RadioGroupWithPlanCards;


code.demo.1772721652949.tsx
import RadioGroupWithPlanCards from "@/components/ui/radio-group-with-plan-cards";

export default function DemoOne() {
  return <RadioGroupWithPlanCards />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/radio-group-with-plan-cards.tsx
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Gem, HeartHandshake, Rocket } from "lucide-react";

export const title = "RadioGroup with Cards";

const RadioGroupWithPlanCards = () => (
  <RadioGroup defaultValue="card-1" className="grid gap-2 max-w-sm">
    {[
      {
        id: "card-1",
        title: "Launch Plan",
        desc: "Essential tools to get started.",
        price: "Free",
        icon: Rocket,
        color: "text-blue-500",
        background: "bg-blue-500/10",
      },
      {
        id: "card-2",
        title: "Grow Plan",
        desc: "Advanced features for growing teams.",
        price: "$19.00",
        icon: HeartHandshake,
        color: "text-orange-400",
        background: "bg-orange-400/10",
      },
      {
        id: "card-3",
        title: "Scale Plan",
        desc: "Enterprise power and priority support.",
        price: "$49.00",
        icon: Gem,
        color: "text-red-500",
        background: "bg-red-500/10",
      },
    ].map((item) => {
      const Icon = item.icon;
      return (
        <Label
          key={item.id}
          htmlFor={item.id}
          className={cn(
            "flex cursor-pointer items-start gap-3 rounded-lg border p-4 shadow-xs transition-all",
            "hover:bg-accent",
            "has-data-checked:bg-accent",
          )}
        >
          <div className={`${item.background} p-1.5 rounded-lg`}>
            <Icon className={item.color} />
          </div>
          <div className="w-full flex gap-2 items-start justify-between">
            <div className="grid gap-1.5">
              <p className="font-medium leading-none">{item.title}</p>
              <p className="text-xs text-muted-foreground font-normal">
                {item.desc}
              </p>
            </div>
            <span className="text-muted-foreground text-xs font-normal">
              {item.price}
            </span>
          </div>
          <RadioGroupItem value={item.id} id={item.id} />
        </Label>
      );
    })}
  </RadioGroup>
);

export default RadioGroupWithPlanCards;

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
