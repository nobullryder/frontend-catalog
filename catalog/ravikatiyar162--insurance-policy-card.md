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
insurance-policy-card.tsx
// components/ui/insurance-policy-card.tsx

import * as React from 'react';
import { motion } from 'framer-motion';
import { Clock, Copy } from 'lucide-react';

import { cn } from '@/lib/utils'; // Make sure to have this utility from shadcn
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Prop definition for type safety and reusability
interface InsurancePolicyCardProps {
  client: {
    name: string;
    avatarUrl: string;
    dateOfBirth: string;
    cityOfResidence: string;
  };
  policy: {
    idNumber: string;
    policyNumber: string;
    insuranceType: string;
    vehicleInfo: string;
    expiryDate: string;
    expiryDuration: string;
  };
  qrCodeUrl: string;
  onUpdatePolicy: () => void;
  className?: string;
}

// A reusable sub-component for displaying data fields
const InfoField: React.FC<{ label: string; value: string; children?: React.ReactNode }> = ({
  label,
  value,
  children,
}) => (
  <div className="flex flex-col">
    <span className="text-xs text-muted-foreground">{label}</span>
    <span className="mt-1 flex items-center gap-2 text-sm font-medium text-card-foreground">
      {value}
      {children}
    </span>
  </div>
);

export const InsurancePolicyCard: React.FC<InsurancePolicyCardProps> = ({
  client,
  policy,
  qrCodeUrl,
  onUpdatePolicy,
  className,
}) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Here you could add a toast notification for feedback
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'w-full max-w-md rounded-2xl border bg-card p-6 text-card-foreground shadow-lg',
        className
      )}
    >
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-border">
            <AvatarImage src={client.avatarUrl} alt={client.name} />
            <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Expire Date</span>
            </div>
            <p className="mt-1 font-semibold text-card-foreground">{policy.expiryDate}</p>
            <p className="text-xs text-muted-foreground">({policy.expiryDuration})</p>
          </div>
        </div>
        <img src={qrCodeUrl} alt="Policy QR Code" className="h-16 w-16 rounded-md" />
      </div>

      {/* Details Grid Section */}
      <div className="my-6 grid grid-cols-2 gap-x-4 gap-y-5 border-y border-border py-6">
        <InfoField label="Client Name" value={client.name} />
        <InfoField label="Date of Birth" value={client.dateOfBirth} />
        <InfoField label="City of Residence" value={client.cityOfResidence} />
        <InfoField label="ID Number" value={policy.idNumber} />
        <InfoField label="Policy Number" value={policy.policyNumber}>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleCopy(policy.policyNumber)}
                  aria-label="Copy policy number"
                  className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </InfoField>
        <InfoField label="Type of Insurance" value={policy.insuranceType} />
        <InfoField label="Vehicle Information" value={policy.vehicleInfo} />
      </div>

      {/* Action Button */}
      <Button onClick={onUpdatePolicy} className="w-full" size="lg">
        Update a Policy
      </Button>
    </motion.div>
  );
};

code.demo.1758935248756.tsx
// demo.tsx

import React from 'react';
import { InsurancePolicyCard } from '@/components/ui/insurance-policy-card';

const InsurancePolicyCardDemo = () => {
  // Sample data to pass into the component
  const sampleClient = {
    name: 'Jeremy Allen White',
    avatarUrl: 'https://i.pravatar.cc/150',
    dateOfBirth: '09 Jan 1992',
    cityOfResidence: 'Los Angeles, CA',
  };

  const samplePolicy = {
    idNumber: '756872004',
    policyNumber: 'NPX 47208716',
    insuranceType: 'Car Insurance',
    vehicleInfo: 'Bentley Bentayga, 2019',
    expiryDate: '21 Sep 2025',
    expiryDuration: '2 years',
  };

  const handleUpdate = () => {
    // In a real app, this would trigger a modal or navigation
    alert('"Update a Policy" button clicked!');
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-4">
      <InsurancePolicyCard
        client={sampleClient}
        policy={samplePolicy}
        qrCodeUrl="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=policy-NPX47208716"
        onUpdatePolicy={handleUpdate}
      />
    </div>
  );
};

export default InsurancePolicyCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/insurance-policy-card.tsx
// components/ui/insurance-policy-card.tsx

import * as React from 'react';
import { motion } from 'framer-motion';
import { Clock, Copy } from 'lucide-react';

import { cn } from '@/lib/utils'; // Make sure to have this utility from shadcn
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Prop definition for type safety and reusability
interface InsurancePolicyCardProps {
  client: {
    name: string;
    avatarUrl: string;
    dateOfBirth: string;
    cityOfResidence: string;
  };
  policy: {
    idNumber: string;
    policyNumber: string;
    insuranceType: string;
    vehicleInfo: string;
    expiryDate: string;
    expiryDuration: string;
  };
  qrCodeUrl: string;
  onUpdatePolicy: () => void;
  className?: string;
}

// A reusable sub-component for displaying data fields
const InfoField: React.FC<{ label: string; value: string; children?: React.ReactNode }> = ({
  label,
  value,
  children,
}) => (
  <div className="flex flex-col">
    <span className="text-xs text-muted-foreground">{label}</span>
    <span className="mt-1 flex items-center gap-2 text-sm font-medium text-card-foreground">
      {value}
      {children}
    </span>
  </div>
);

export const InsurancePolicyCard: React.FC<InsurancePolicyCardProps> = ({
  client,
  policy,
  qrCodeUrl,
  onUpdatePolicy,
  className,
}) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Here you could add a toast notification for feedback
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'w-full max-w-md rounded-2xl border bg-card p-6 text-card-foreground shadow-lg',
        className
      )}
    >
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-border">
            <AvatarImage src={client.avatarUrl} alt={client.name} />
            <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Expire Date</span>
            </div>
            <p className="mt-1 font-semibold text-card-foreground">{policy.expiryDate}</p>
            <p className="text-xs text-muted-foreground">({policy.expiryDuration})</p>
          </div>
        </div>
        <img src={qrCodeUrl} alt="Policy QR Code" className="h-16 w-16 rounded-md" />
      </div>

      {/* Details Grid Section */}
      <div className="my-6 grid grid-cols-2 gap-x-4 gap-y-5 border-y border-border py-6">
        <InfoField label="Client Name" value={client.name} />
        <InfoField label="Date of Birth" value={client.dateOfBirth} />
        <InfoField label="City of Residence" value={client.cityOfResidence} />
        <InfoField label="ID Number" value={policy.idNumber} />
        <InfoField label="Policy Number" value={policy.policyNumber}>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleCopy(policy.policyNumber)}
                  aria-label="Copy policy number"
                  className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </InfoField>
        <InfoField label="Type of Insurance" value={policy.insuranceType} />
        <InfoField label="Vehicle Information" value={policy.vehicleInfo} />
      </div>

      {/* Action Button */}
      <Button onClick={onUpdatePolicy} className="w-full" size="lg">
        Update a Policy
      </Button>
    </motion.div>
  );
};
```

Install NPM dependencies:
```bash
lucide-react, framer-motion
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
