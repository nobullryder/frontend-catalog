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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function Example() {
  return (
    <div className="flex items-center justify-center p-10">
      <form>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="font-semibold text-foreground dark:text-foreground">
              Personal information
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground dark:text-muted-foreground">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
            </p>
          </div>
          <div className="sm:max-w-3xl md:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
              <div className="col-span-full sm:col-span-3">
                <Label
                  htmlFor="first-name"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
                  First name
                </Label>
                <Input
                  type="text"
                  id="first-name"
                  name="first-name"
                  autoComplete="given-name"
                  placeholder="Emma"
                  className="mt-2"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <Label
                  htmlFor="last-name"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
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
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder="emma@company.com"
                  className="mt-2"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <Label
                  htmlFor="birthyear"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
                  Birth year
                </Label>
                <Input
                  type="number"
                  id="birthyear"
                  name="year"
                  placeholder="1990"
                  className="mt-2"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <Label
                  htmlFor="role"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
                  Role
                </Label>
                <Input
                  type="text"
                  id="role"
                  name="role"
                  placeholder="Senior Manager"
                  disabled
                  className="mt-2"
                />
                <p className="mt-2 text-xs text-muted-foreground dark:text-muted-foreground">
                  Roles can only be changed by system admin.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="font-semibold text-foreground dark:text-foreground">
              Workspace settings
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground dark:text-muted-foreground">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
            </p>
          </div>
          <div className="sm:max-w-3xl md:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
              <div className="col-span-full sm:col-span-3">
                <Label
                  htmlFor="workspace-name"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
                  Workspace name
                </Label>
                <Input
                  type="text"
                  id="workspace-name"
                  name="workspace-name"
                  placeholder="Test workspace"
                  className="mt-2"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <Label
                  htmlFor="visibility"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
                  Visibility
                </Label>
                <Select name="visibility" defaultValue="private">
                  <SelectTrigger id="visibility" className="mt-2">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-full">
                <Label
                  htmlFor="workspace-description"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
                  Workspace description
                </Label>
                <Textarea
                  id="workspace-description"
                  name="workspace-description"
                  className="mt-2"
                  rows={4}
                />
                <p className="mt-2 text-xs text-muted-foreground dark:text-muted-foreground">
                  Note: description provided will not be displayed externally.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="font-semibold text-foreground dark:text-foreground">
              Notification settings
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground dark:text-muted-foreground">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
            </p>
          </div>
          <div className="sm:max-w-3xl md:col-span-2">
            <fieldset>
              <legend className="text-sm font-medium text-foreground dark:text-foreground">
                Team
              </legend>
              <p className="mt-1 text-sm leading-6 text-muted-foreground dark:text-muted-foreground">
                Configure the types of team alerts you want to receive.
              </p>
              <div className="mt-2">
                <div className="flex items-center gap-x-3 py-1">
                  <Checkbox
                    id="team-requests"
                    name="team-requests"
                    defaultChecked
                  />
                  <Label
                    htmlFor="team-requests"
                    className="text-sm font-medium text-foreground dark:text-foreground"
                  >
                    Team join requests
                  </Label>
                </div>
                <div className="flex items-center gap-x-3 py-1">
                  <Checkbox
                    id="team-activity-digest"
                    name="team-activity-digest"
                  />
                  <Label
                    htmlFor="team-activity-digest"
                    className="text-sm font-medium text-foreground dark:text-foreground"
                  >
                    Weekly team activity digest
                  </Label>
                </div>
              </div>
            </fieldset>
            <fieldset className="mt-6">
              <legend className="text-sm font-medium text-foreground dark:text-foreground">
                Usage
              </legend>
              <p className="mt-1 text-sm leading-6 text-muted-foreground dark:text-muted-foreground">
                Configure the types of usage alerts you want to receive.
              </p>
              <div className="mt-2">
                <div className="flex items-center gap-x-3 py-1">
                  <Checkbox id="api-requests" name="api-requests" />
                  <Label
                    htmlFor="api-requests"
                    className="text-sm font-medium text-foreground dark:text-foreground"
                  >
                    API requests
                  </Label>
                </div>
                <div className="flex items-center gap-x-3 py-1">
                  <Checkbox
                    id="workspace-execution"
                    name="workspace-execution"
                  />
                  <Label
                    htmlFor="workspace-execution"
                    className="text-sm font-medium text-foreground dark:text-foreground"
                  >
                    Workspace loading times
                  </Label>
                </div>
                <div className="flex items-center gap-x-3 py-1">
                  <Checkbox
                    id="query-caching"
                    name="query-caching"
                    defaultChecked
                  />
                  <Label
                    htmlFor="query-caching"
                    className="text-sm font-medium text-foreground dark:text-foreground"
                  >
                    Query caching
                  </Label>
                </div>
                <div className="flex items-center gap-x-3 py-1">
                  <Checkbox id="storage" name="storage" defaultChecked />
                  <Label
                    htmlFor="storage"
                    className="text-sm font-medium text-foreground dark:text-foreground"
                  >
                    Storage
                  </Label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex items-center justify-end space-x-4">
          <Button type="button" variant="outline" className="whitespace-nowrap">
            Go back
          </Button>
          <Button type="submit" className="whitespace-nowrap">
            Save settings
          </Button>
        </div>
      </form>
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
