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
pricing.tsx
// components/PricingCard.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
  highlightLabel?: string;
  buttonVariant?: "default" | "outline";
}

export function PricingCard({
  title,
  price,
  description,
  features,
  highlight = false,
  buttonVariant = "outline",
}: PricingCardProps) {
  return (
    <div
      className={`flex flex-col justify-between p-6 space-y-4 ${
        highlight ? "bg-secondary rounded-xl w-full md:w-1/2 space-y-8" : "flex-1"
      }`}
    >
      <div className={highlight ? "grid gap-6 sm:grid-cols-2" : ""}>
        <div className="space-y-4">
          <div>
            <h2 className="font-medium">{title}</h2>
            <span className="my-3 block text-2xl font-semibold">{price}</span>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>

          <Button asChild className="w-full" variant={buttonVariant}>
            <Link href="">Get Started</Link>
          </Button>
        </div>
      </div>

      {highlight && (
        <div>
          <div className="text-sm font-medium">Everything in Free, plus:</div>
        </div>
      )}

      <ul className={`${highlight ? "mt-4" : "border-t pt-4"} list-outside space-y-3 text-sm`}>
        {features.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="size-3" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}


code.demo.1749659834489.tsx
import { PricingCard } from "@/components/ui/pricing";

export default function demo() {
  return (
    <section className="py-16 md:py-32" id="pricing">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
            Plans made for every inbox
          </h2>
          <p className="text-muted-foreground lg:text-lg mb-6 md:mb-8 lg:mb-12">
            Start managing all your email accounts in one place. Upgrade anytime as your needs grow.
          </p>
        </div>

        <div className="rounded-xl flex flex-col justify-between border p-1">
          <div className="flex flex-col gap-4 md:flex-row">
            <PricingCard
              title="Free"
              price="$0 / mo"
              description="Ideal to test the unified inbox experience"
              buttonVariant="outline"
              features={[
                "Connect up to 2 email accounts",
                "Unified inbox interface",
                "Read & search emails",
                "Basic spam filtering",
                "Email support",
              ]}
            />

            <PricingCard
              title="Pro"
              price="$19 / mo"
              description="For professionals managing multiple accounts"
              buttonVariant="default"
              highlight
              features={[
                "Connect unlimited email accounts",
                "Send emails from any connected address",
                "Smart labels & filters",
                "Real-time sync with Gmail, Outlook, iCloud",
                "Advanced search & filters",
                "Mobile app access",
                "Priority email support",
                "Custom signatures per account",
                "Attachment previews",
                "Daily backup of inboxes",
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/pricing.tsx
// components/PricingCard.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
  highlightLabel?: string;
  buttonVariant?: "default" | "outline";
}

export function PricingCard({
  title,
  price,
  description,
  features,
  highlight = false,
  buttonVariant = "outline",
}: PricingCardProps) {
  return (
    <div
      className={`flex flex-col justify-between p-6 space-y-4 ${
        highlight ? "bg-secondary rounded-xl w-full md:w-1/2 space-y-8" : "flex-1"
      }`}
    >
      <div className={highlight ? "grid gap-6 sm:grid-cols-2" : ""}>
        <div className="space-y-4">
          <div>
            <h2 className="font-medium">{title}</h2>
            <span className="my-3 block text-2xl font-semibold">{price}</span>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>

          <Button asChild className="w-full" variant={buttonVariant}>
            <Link href="">Get Started</Link>
          </Button>
        </div>
      </div>

      {highlight && (
        <div>
          <div className="text-sm font-medium">Everything in Free, plus:</div>
        </div>
      )}

      <ul className={`${highlight ? "mt-4" : "border-t pt-4"} list-outside space-y-3 text-sm`}>
        {features.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="size-3" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

```

Install NPM dependencies:
```bash
next, lucide-react
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
