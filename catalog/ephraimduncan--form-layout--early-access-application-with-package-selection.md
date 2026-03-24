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
form-layout.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Check, CircleCheck, ExternalLink } from "lucide-react";
import { useState } from "react";

const highlights = [
  {
    id: 1,
    feature: "Used by top design teams worldwide",
  },
  {
    id: 2,
    feature: "Seamless integration with design tools",
  },
  {
    id: 3,
    feature: "Real-time collaboration features",
  },
];

const plans = [
  {
    name: "Creator",
    features: [
      { feature: "Up to 3 design projects" },
      { feature: "Basic collaboration tools" },
      { feature: "5GB cloud storage" },
      { feature: "Community forum support" },
    ],
    price: "$15",
    href: "#",
    isRecommended: false,
  },
  {
    name: "Team",
    features: [
      { feature: "Unlimited design projects" },
      { feature: "Advanced collaboration suite" },
      { feature: "50GB cloud storage" },
      { feature: "Priority email support" },
    ],
    price: "$49",
    href: "#",
    isRecommended: true,
  },
  {
    name: "Agency",
    features: [
      { feature: "Unlimited projects and team members" },
      { feature: "Client portal access" },
      { feature: "250GB cloud storage" },
      { feature: "White-labeling options" },
      { feature: "Dedicated account manager" },
    ],
    price: "$99",
    href: "#",
    isRecommended: false,
  },
];

export default function WorkspaceForm() {
  const [selected, setSelected] = useState(plans[0]);

  return (
    <div className="flex items-center justify-center p-10">
      <form className="sm:mx-auto sm:max-w-7xl">
        <h3 className="text-xl font-semibold text-foreground">
          Create new design workspace
        </h3>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="mt-6 lg:col-span-7">
            <div className="space-y-4 md:space-y-6">
              <div className="md:flex md:items-center md:space-x-4">
                <div className="md:w-1/4">
                  <Label htmlFor="organization" className="font-medium">
                    Organization
                  </Label>
                  <Select defaultValue="1">
                    <SelectTrigger
                      id="organization"
                      name="organization"
                      className="mt-2 w-full"
                    >
                      <SelectValue placeholder="Select organization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Acme, Inc.</SelectItem>
                      <SelectItem value="2">Hero Labs</SelectItem>
                      <SelectItem value="3">Rose Holding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mt-4 md:mt-0 md:w-3/4">
                  <Label htmlFor="workspace" className="font-medium">
                    Workspace name
                  </Label>
                  <Input id="workspace" name="workspace" className="mt-2" />
                </div>
              </div>
              <div>
                <Label htmlFor="region" className="font-medium">
                  Region
                </Label>
                <Select defaultValue="iad1">
                  <SelectTrigger id="region" name="region" className="mt-2">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fra1">
                      eu-central-1 (Frankfurt, Germany)
                    </SelectItem>
                    <SelectItem value="iad1">
                      us-east-1 (Washington, D.C., USA)
                    </SelectItem>
                    <SelectItem value="lhr1">
                      eu-west-2 (London, United Kingdom)
                    </SelectItem>
                    <SelectItem value="sfo1">
                      us-west-1 (San Francisco, USA)
                    </SelectItem>
                    <SelectItem value="sin1">
                      ap-southeast-1 (Singapore)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="mt-2 text-sm text-muted-foreground">
                  For best performance, choose a region closest to your
                  operations
                </p>
              </div>
            </div>
            <h4 className="mt-14 font-medium">
              Plan type<span className="text-red-500">*</span>
            </h4>
            <RadioGroup
              value={selected.name}
              onValueChange={(value) =>
                setSelected(
                  plans.find((plan) => plan.name === value) || plans[0]
                )
              }
              className="mt-4 space-y-4"
            >
              {plans.map((plan) => (
                <label
                  key={plan.name}
                  htmlFor={plan.name}
                  className={cn(
                    "relative block cursor-pointer rounded-md border bg-background transition",
                    selected.name === plan.name
                      ? "border-primary/20 ring-2 ring-primary/20"
                      : "border-border"
                  )}
                >
                  <div className="flex items-start space-x-4 px-6 py-4">
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center">
                      <RadioGroupItem value={plan.name} id={plan.name} />
                    </div>
                    <div className="w-full">
                      <p className="leading-6">
                        <span className="font-semibold text-foreground">
                          {plan.name}
                        </span>
                        {plan.isRecommended && (
                          <Badge variant="secondary" className="ml-2">
                            recommended
                          </Badge>
                        )}
                      </p>
                      <ul className="mt-2 space-y-1">
                        {plan.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Check
                              className="h-4 w-4 text-muted-foreground"
                              aria-hidden={true}
                            />
                            {feature.feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-b-md border-t border-border bg-muted px-6 py-3">
                    <a
                      href={plan.href}
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline hover:underline-offset-4"
                    >
                      Learn more
                      <ExternalLink className="h-4 w-4" aria-hidden={true} />
                    </a>
                    <div>
                      <span className="text-lg font-semibold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-sm text-muted-foreground">/mo</span>
                    </div>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </div>
          <div className="lg:col-span-5">
            <Card className="bg-muted">
              <CardContent>
                <h4 className="text-sm font-semibold text-foreground">
                  Choose the right plan for your design team
                </h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Our flexible plans are designed to scale with your team&apos;s
                  needs. All plans include core design collaboration features
                  with varying levels of storage and support.
                </p>
                <ul className="mt-4 space-y-1">
                  {highlights.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center space-x-2 py-1.5 text-foreground"
                    >
                      <CircleCheck className="h-5 w-5 text-primary" />
                      <span className="truncate text-sm">{item.feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-1 text-sm text-primary"
                >
                  Learn more
                  <ExternalLink className="h-4 w-4" aria-hidden={true} />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
        <Separator className="my-10" />
        <div className="flex items-center justify-end space-x-4">
          <Button type="button" variant="ghost">
            Cancel
          </Button>
          <Button type="submit">Update</Button>
        </div>
      </form>
    </div>
  );
}


code.demo.1753207332517.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const workspaces = [
  {
    id: 1,
    title: "Starter",
    description: "Up to 10,000 requests per day.",
    users: "Free",
  },
  {
    id: 2,
    title: "Premium",
    description: "500,000 requests per day¹",
    users: "$900/month²",
  },
  {
    id: 3,
    title: "Enterprise",
    description: "Based on your specific needs",
    users: "Custom",
  },
];

export default function Example() {
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0]);

  return (
    <div className="flex items-center justify-center p-10">
      <div className="sm:mx-auto sm:max-w-2xl">
        <h3 className="text-lg font-semibold text-foreground">
          Apply for early access
        </h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
        </p>
        <form action="#" method="post" className="mt-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="col-span-full sm:col-span-3">
              <Label htmlFor="first-name" className="font-medium">
                First name<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="first-name"
                name="first-name"
                autoComplete="given-name"
                required
                placeholder="Emma"
                className="mt-2"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <Label htmlFor="last-name" className="font-medium">
                Last name
              </Label>
              <Input
                type="text"
                id="last-name"
                name="last-name"
                autoComplete="family-name"
                placeholder="Crown"
                className="mt-2"
              />
            </div>
            <div className="col-span-full">
              <Label htmlFor="email" className="font-medium">
                Work email<span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                placeholder="emma@company.com"
                className="mt-2"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <Label htmlFor="company" className="font-medium">
                Company
              </Label>
              <Input
                type="text"
                id="company"
                name="company"
                autoComplete="organization"
                placeholder="Company, Inc."
                className="mt-2"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <Label htmlFor="size" className="font-medium">
                Company size (employees)
              </Label>
              <Select defaultValue="">
                <SelectTrigger id="size" name="size" className="mt-2">
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-9">1-9</SelectItem>
                  <SelectItem value="10-50">10-50</SelectItem>
                  <SelectItem value="50-250">50-250</SelectItem>
                  <SelectItem value="250+">250+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator className="col-span-full my-4" />
            <div className="col-span-full">
              <Label className="font-semibold text-foreground block mb-4">
                Select a workspace package
              </Label>

              <RadioGroup
                className="grid grid-cols-1 sm:grid-cols-3 gap-5"
                defaultValue={selectedWorkspace.id.toString()}
                onValueChange={(value) =>
                  setSelectedWorkspace(
                    workspaces.find(
                      (workspace) => workspace.id.toString() === value
                    ) || workspaces[0]
                  )
                }
              >
                {workspaces.map((item) => (
                  <div
                    key={item.id.toString()}
                    className="border-input has-data-[state=checked]:border-ring relative flex flex-col gap-2 rounded-md border p-4 shadow-xs outline-none"
                  >
                    <div className="flex justify-between">
                      <RadioGroupItem
                        id={item.id.toString()}
                        value={item.id.toString()}
                        className="order-1 after:absolute after:inset-0"
                      />

                      <Label
                        htmlFor={item.id.toString()}
                        className="block text-sm font-medium text-foreground"
                      >
                        {item.title}
                      </Label>
                    </div>
                    <div className="flex flex-col h-full justify-between">
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <span className="mt-4 block text-sm font-medium text-foreground">
                        {item.users}
                      </span>
                    </div>
                  </div>
                ))}
              </RadioGroup>

              <p className="mt-6 text-xs text-muted-foreground">
                <sup>1</sup> $0.5/10K requests after limit reach.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                <sup>2</sup> No credit card required for registration.
              </p>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex items-center justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              className="whitespace-nowrap"
            >
              Go back
            </Button>
            <Button type="submit" className="whitespace-nowrap">
              Apply
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/form-layout.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Check, CircleCheck, ExternalLink } from "lucide-react";
import { useState } from "react";

const highlights = [
  {
    id: 1,
    feature: "Used by top design teams worldwide",
  },
  {
    id: 2,
    feature: "Seamless integration with design tools",
  },
  {
    id: 3,
    feature: "Real-time collaboration features",
  },
];

const plans = [
  {
    name: "Creator",
    features: [
      { feature: "Up to 3 design projects" },
      { feature: "Basic collaboration tools" },
      { feature: "5GB cloud storage" },
      { feature: "Community forum support" },
    ],
    price: "$15",
    href: "#",
    isRecommended: false,
  },
  {
    name: "Team",
    features: [
      { feature: "Unlimited design projects" },
      { feature: "Advanced collaboration suite" },
      { feature: "50GB cloud storage" },
      { feature: "Priority email support" },
    ],
    price: "$49",
    href: "#",
    isRecommended: true,
  },
  {
    name: "Agency",
    features: [
      { feature: "Unlimited projects and team members" },
      { feature: "Client portal access" },
      { feature: "250GB cloud storage" },
      { feature: "White-labeling options" },
      { feature: "Dedicated account manager" },
    ],
    price: "$99",
    href: "#",
    isRecommended: false,
  },
];

export default function WorkspaceForm() {
  const [selected, setSelected] = useState(plans[0]);

  return (
    <div className="flex items-center justify-center p-10">
      <form className="sm:mx-auto sm:max-w-7xl">
        <h3 className="text-xl font-semibold text-foreground">
          Create new design workspace
        </h3>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="mt-6 lg:col-span-7">
            <div className="space-y-4 md:space-y-6">
              <div className="md:flex md:items-center md:space-x-4">
                <div className="md:w-1/4">
                  <Label htmlFor="organization" className="font-medium">
                    Organization
                  </Label>
                  <Select defaultValue="1">
                    <SelectTrigger
                      id="organization"
                      name="organization"
                      className="mt-2 w-full"
                    >
                      <SelectValue placeholder="Select organization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Acme, Inc.</SelectItem>
                      <SelectItem value="2">Hero Labs</SelectItem>
                      <SelectItem value="3">Rose Holding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mt-4 md:mt-0 md:w-3/4">
                  <Label htmlFor="workspace" className="font-medium">
                    Workspace name
                  </Label>
                  <Input id="workspace" name="workspace" className="mt-2" />
                </div>
              </div>
              <div>
                <Label htmlFor="region" className="font-medium">
                  Region
                </Label>
                <Select defaultValue="iad1">
                  <SelectTrigger id="region" name="region" className="mt-2">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fra1">
                      eu-central-1 (Frankfurt, Germany)
                    </SelectItem>
                    <SelectItem value="iad1">
                      us-east-1 (Washington, D.C., USA)
                    </SelectItem>
                    <SelectItem value="lhr1">
                      eu-west-2 (London, United Kingdom)
                    </SelectItem>
                    <SelectItem value="sfo1">
                      us-west-1 (San Francisco, USA)
                    </SelectItem>
                    <SelectItem value="sin1">
                      ap-southeast-1 (Singapore)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="mt-2 text-sm text-muted-foreground">
                  For best performance, choose a region closest to your
                  operations
                </p>
              </div>
            </div>
            <h4 className="mt-14 font-medium">
              Plan type<span className="text-red-500">*</span>
            </h4>
            <RadioGroup
              value={selected.name}
              onValueChange={(value) =>
                setSelected(
                  plans.find((plan) => plan.name === value) || plans[0]
                )
              }
              className="mt-4 space-y-4"
            >
              {plans.map((plan) => (
                <label
                  key={plan.name}
                  htmlFor={plan.name}
                  className={cn(
                    "relative block cursor-pointer rounded-md border bg-background transition",
                    selected.name === plan.name
                      ? "border-primary/20 ring-2 ring-primary/20"
                      : "border-border"
                  )}
                >
                  <div className="flex items-start space-x-4 px-6 py-4">
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center">
                      <RadioGroupItem value={plan.name} id={plan.name} />
                    </div>
                    <div className="w-full">
                      <p className="leading-6">
                        <span className="font-semibold text-foreground">
                          {plan.name}
                        </span>
                        {plan.isRecommended && (
                          <Badge variant="secondary" className="ml-2">
                            recommended
                          </Badge>
                        )}
                      </p>
                      <ul className="mt-2 space-y-1">
                        {plan.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Check
                              className="h-4 w-4 text-muted-foreground"
                              aria-hidden={true}
                            />
                            {feature.feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-b-md border-t border-border bg-muted px-6 py-3">
                    <a
                      href={plan.href}
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline hover:underline-offset-4"
                    >
                      Learn more
                      <ExternalLink className="h-4 w-4" aria-hidden={true} />
                    </a>
                    <div>
                      <span className="text-lg font-semibold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-sm text-muted-foreground">/mo</span>
                    </div>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </div>
          <div className="lg:col-span-5">
            <Card className="bg-muted">
              <CardContent>
                <h4 className="text-sm font-semibold text-foreground">
                  Choose the right plan for your design team
                </h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Our flexible plans are designed to scale with your team&apos;s
                  needs. All plans include core design collaboration features
                  with varying levels of storage and support.
                </p>
                <ul className="mt-4 space-y-1">
                  {highlights.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center space-x-2 py-1.5 text-foreground"
                    >
                      <CircleCheck className="h-5 w-5 text-primary" />
                      <span className="truncate text-sm">{item.feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-1 text-sm text-primary"
                >
                  Learn more
                  <ExternalLink className="h-4 w-4" aria-hidden={true} />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
        <Separator className="my-10" />
        <div className="flex items-center justify-end space-x-4">
          <Button type="button" variant="ghost">
            Cancel
          </Button>
          <Button type="submit">Update</Button>
        </div>
      </form>
    </div>
  );
}

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
