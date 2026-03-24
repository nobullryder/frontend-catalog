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
'use client'; // This component requires client-side state for the slider

import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assumes shadcn's 'cn' utility
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

// Define the props for the component for strong typing and reusability
export interface InteractivePricingCardProps {
  planName: string;
  planDescription: string;
  pricePerUnit: number;
  unitName: string;
  minUnits: number;
  maxUnits: number;
  initialUnits: number;
  features: string[];
  ctaText: string;
  currency?: string;
  className?: string;
  highlighted?: boolean; // To make one plan stand out
}

export function InteractivePricingCard({
  planName,
  planDescription,
  pricePerUnit,
  unitName,
  minUnits,
  maxUnits,
  initialUnits,
  features,
  ctaText,
  currency = '$',
  className,
  highlighted = false,
}: InteractivePricingCardProps) {
  // State to manage the number of units selected by the user
  const [units, setUnits] = React.useState(initialUnits);

  // Calculate the total price based on the current number of units
  const totalPrice = (units * pricePerUnit).toFixed(2);

  return (
    <Card
      className={cn(
        'flex w-full max-w-sm flex-col',
        highlighted ? 'border-primary shadow-lg' : '',
        className
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">{planName}</CardTitle>
          {highlighted && <Badge variant="default">Popular</Badge>}
        </div>
        <CardDescription>{planDescription}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="mb-6 text-center">
          <span className="text-5xl font-bold">
            {currency}
            {totalPrice}
          </span>
          <span className="text-muted-foreground">/month</span>
        </div>

        <div className="space-y-4">
          {/* Interactive Slider */}
          <div className="space-y-2">
            <div className="flex justify-between font-medium">
              <span>{`${units} ${unitName}${units > 1 ? 's' : ''}`}</span>
              <span>
                {currency}
                {pricePerUnit}/{unitName}
              </span>
            </div>
            <Slider
              value={[units]}
              onValueChange={(value) => setUnits(value[0])}
              min={minUnits}
              max={maxUnits}
              step={1}
              aria-label={`Select number of ${unitName}s`}
            />
          </div>

          {/* Features List */}
          <ul className="space-y-3 text-sm">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full" size="lg" variant={highlighted ? 'default' : 'outline'}>
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
}

code.demo.1758082169204.tsx
import { InteractivePricingCard } from '@/components/ui/pricing'; // Adjust path as needed

export default function InteractivePricingCardDemo() {
  const proPlanFeatures = [
    'Unlimited Projects',
    'Team Collaboration',
    'Priority Support',
    'Advanced Analytics',
    '10GB Storage',
  ];

  const basicPlanFeatures = [
    '5 Projects',
    'Basic Collaboration',
    'Email Support',
    'Basic Analytics',
    '2GB Storage',
  ];

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-background p-4 md:flex-row">
      {/* Standard Plan */}
      <InteractivePricingCard
        planName="Basic"
        planDescription="For individuals and small teams starting out."
        pricePerUnit={10}
        unitName="user"
        minUnits={1}
        maxUnits={10}
        initialUnits={3}
        features={basicPlanFeatures}
        ctaText="Get Started with Basic"
      />

      {/* Highlighted Plan */}
      <InteractivePricingCard
        planName="Pro"
        planDescription="For growing teams that need collaboration and power."
        pricePerUnit={15}
        unitName="user"
        minUnits={5}
        maxUnits={25}
        initialUnits={10}
        features={proPlanFeatures}
        ctaText="Subscribe to Pro"
        highlighted={true} // This prop makes the card stand out
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/pricing.tsx
'use client'; // This component requires client-side state for the slider

import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assumes shadcn's 'cn' utility
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

// Define the props for the component for strong typing and reusability
export interface InteractivePricingCardProps {
  planName: string;
  planDescription: string;
  pricePerUnit: number;
  unitName: string;
  minUnits: number;
  maxUnits: number;
  initialUnits: number;
  features: string[];
  ctaText: string;
  currency?: string;
  className?: string;
  highlighted?: boolean; // To make one plan stand out
}

export function InteractivePricingCard({
  planName,
  planDescription,
  pricePerUnit,
  unitName,
  minUnits,
  maxUnits,
  initialUnits,
  features,
  ctaText,
  currency = '$',
  className,
  highlighted = false,
}: InteractivePricingCardProps) {
  // State to manage the number of units selected by the user
  const [units, setUnits] = React.useState(initialUnits);

  // Calculate the total price based on the current number of units
  const totalPrice = (units * pricePerUnit).toFixed(2);

  return (
    <Card
      className={cn(
        'flex w-full max-w-sm flex-col',
        highlighted ? 'border-primary shadow-lg' : '',
        className
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">{planName}</CardTitle>
          {highlighted && <Badge variant="default">Popular</Badge>}
        </div>
        <CardDescription>{planDescription}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="mb-6 text-center">
          <span className="text-5xl font-bold">
            {currency}
            {totalPrice}
          </span>
          <span className="text-muted-foreground">/month</span>
        </div>

        <div className="space-y-4">
          {/* Interactive Slider */}
          <div className="space-y-2">
            <div className="flex justify-between font-medium">
              <span>{`${units} ${unitName}${units > 1 ? 's' : ''}`}</span>
              <span>
                {currency}
                {pricePerUnit}/{unitName}
              </span>
            </div>
            <Slider
              value={[units]}
              onValueChange={(value) => setUnits(value[0])}
              min={minUnits}
              max={maxUnits}
              step={1}
              aria-label={`Select number of ${unitName}s`}
            />
          </div>

          {/* Features List */}
          <ul className="space-y-3 text-sm">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full" size="lg" variant={highlighted ? 'default' : 'outline'}>
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
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
