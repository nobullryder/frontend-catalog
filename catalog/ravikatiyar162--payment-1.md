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
payment-1.tsx
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- TYPES ---
type PaymentMethod = {
  id: string | number;
  icon: React.ReactNode;
  label: string;
  description: string;
};

interface PaymentMethodSelectorProps {
  title: string;
  actionText: string;
  methods: PaymentMethod[];
  defaultSelectedId?: string | number;
  onActionClick?: () => void;
  onSelectionChange?: (id: string | number) => void;
  className?: string;
}

// --- HELPER COMPONENTS ---
const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

// --- MAIN COMPONENT ---
export function PaymentMethodSelector({
  title,
  actionText,
  methods,
  defaultSelectedId,
  onActionClick,
  onSelectionChange,
  className,
}: PaymentMethodSelectorProps) {
  const [selectedId, setSelectedId] = React.useState(
    defaultSelectedId ?? (methods.length > 0 ? methods[0].id : null)
  );

  const handleSelect = (id: string | number) => {
    setSelectedId(id);
    if (onSelectionChange) {
      onSelectionChange(id);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  const cardClasses = `w-full max-w-md rounded-xl border bg-card text-card-foreground shadow-sm p-6 ${className || ''}`;

  return (
    <div className={cardClasses}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold leading-none tracking-tight">
          {title}
        </h3>
        <button
          onClick={onActionClick}
          className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          {actionText}
        </button>
      </div>

      {/* Payment Methods List */}
      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        role="radiogroup"
      >
        {methods.map((method) => {
          const isSelected = selectedId === method.id;
          return (
            <motion.div
              key={method.id}
              variants={itemVariants}
              onClick={() => handleSelect(method.id)}
              onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && handleSelect(method.id)}
              className="flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:bg-muted/50"
              style={{
                borderColor: isSelected ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                boxShadow: isSelected ? '0 0 0 2px hsl(var(--primary))' : 'none',
              }}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
            >
              <div className="flex-shrink-0">{method.icon}</div>
              <div className="ml-4 flex-grow">
                <p className="font-medium text-card-foreground">{method.label}</p>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </div>
              <div className="ml-4 flex h-6 w-6 items-center justify-center rounded-full border-2"
                style={{
                  borderColor: isSelected ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                }}
              >
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="h-3 w-3 rounded-full bg-primary"
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

code.demo.1757849135215.tsx
import * as React from 'react';
import { PaymentMethodSelector } from "@/components/ui/payment-1"; // Adjust path as needed

export default function PaymentMethodSelectorDemo() {
  const [selectedMethod, setSelectedMethod] = React.useState<string | number>(1);

  // --- Updated paymentMethods array with image URLs ---
  const paymentMethods = [
    {
      id: 1,
      icon: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
          alt="Visa"
          className="h-8 w-12 object-contain"
        />
      ),
      label: "Visa **** 0912",
      description: "Pay with your Visa card",
    },
    {
      id: 2,
      icon: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png"
          alt="Mastercard"
          className="h-8 w-12 object-contain"
        />
      ),
      label: "Mastercard **** 0912",
      description: "Pay with your Mastercard",
    },
    {
      id: 3,
      icon: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b7/PayPal_Logo_Icon_2014.svg"
          alt="Paypal"
          className="h-8 w-12 object-contain"
        />
      ),
      label: "Pay with Paypal",
      description: "Split into 4 interest-free payments",
    },
  ];

  return (
    <div className="flex min-h-[450px] w-full items-center justify-center bg-muted/30 p-4">
      <PaymentMethodSelector
        title="Choose how to pay"
        actionText="Add new method"
        methods={paymentMethods}
        defaultSelectedId={selectedMethod}
        onActionClick={() => alert("Add new method clicked!")}
        onSelectionChange={(id) => {
          console.log("Selected payment method ID:", id);
          setSelectedMethod(id);
        }}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/payment-1.tsx
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- TYPES ---
type PaymentMethod = {
  id: string | number;
  icon: React.ReactNode;
  label: string;
  description: string;
};

interface PaymentMethodSelectorProps {
  title: string;
  actionText: string;
  methods: PaymentMethod[];
  defaultSelectedId?: string | number;
  onActionClick?: () => void;
  onSelectionChange?: (id: string | number) => void;
  className?: string;
}

// --- HELPER COMPONENTS ---
const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

// --- MAIN COMPONENT ---
export function PaymentMethodSelector({
  title,
  actionText,
  methods,
  defaultSelectedId,
  onActionClick,
  onSelectionChange,
  className,
}: PaymentMethodSelectorProps) {
  const [selectedId, setSelectedId] = React.useState(
    defaultSelectedId ?? (methods.length > 0 ? methods[0].id : null)
  );

  const handleSelect = (id: string | number) => {
    setSelectedId(id);
    if (onSelectionChange) {
      onSelectionChange(id);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  const cardClasses = `w-full max-w-md rounded-xl border bg-card text-card-foreground shadow-sm p-6 ${className || ''}`;

  return (
    <div className={cardClasses}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold leading-none tracking-tight">
          {title}
        </h3>
        <button
          onClick={onActionClick}
          className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          {actionText}
        </button>
      </div>

      {/* Payment Methods List */}
      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        role="radiogroup"
      >
        {methods.map((method) => {
          const isSelected = selectedId === method.id;
          return (
            <motion.div
              key={method.id}
              variants={itemVariants}
              onClick={() => handleSelect(method.id)}
              onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && handleSelect(method.id)}
              className="flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:bg-muted/50"
              style={{
                borderColor: isSelected ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                boxShadow: isSelected ? '0 0 0 2px hsl(var(--primary))' : 'none',
              }}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
            >
              <div className="flex-shrink-0">{method.icon}</div>
              <div className="ml-4 flex-grow">
                <p className="font-medium text-card-foreground">{method.label}</p>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </div>
              <div className="ml-4 flex h-6 w-6 items-center justify-center rounded-full border-2"
                style={{
                  borderColor: isSelected ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                }}
              >
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="h-3 w-3 rounded-full bg-primary"
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
```

Install NPM dependencies:
```bash
framer-motion
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
