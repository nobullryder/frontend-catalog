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
payment.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";

// NOTE: This component is now self-contained and does not import any other local UI components.

// Define the types for the component props
interface PaymentSummaryProps {
  title: string;
  paymentMethod: {
    icon: React.ReactNode;
    name: string;
  };
  items: {
    label: string;
    value: React.ReactNode;
    valueClassName?: string;
  }[];
  total: {
    label: string;
    value: string;
  };
  className?: string;
}

/**
 * A self-contained, responsive, and animated card for displaying payment details.
 * It uses standard divs with Tailwind CSS classes instead of imported components.
 */
export function PaymentSummary({
  title,
  paymentMethod,
  items,
  total,
  className,
}: PaymentSummaryProps) {
  // Animation variants for the container and list items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  // Base classes for the card, combined with any additional classes from props
  const cardClasses = `w-full max-w-md rounded-lg border bg-card text-card-foreground shadow-sm ${className || ''}`;

  return (
    <div className={cardClasses}>
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          {title}
        </h3>
      </div>
      <div className="p-6 pt-0">
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Payment Method Row */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between"
          >
            <span className="text-sm text-muted-foreground">Payment Method</span>
            <div className="flex items-center gap-2">
              {paymentMethod.icon}
              <span className="font-medium">{paymentMethod.name}</span>
            </div>
          </motion.div>

          {/* Dynamic Line Items */}
          {items.map((item, index) => (
            <motion.div
              variants={itemVariants}
              key={index}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className={`font-medium ${item.valueClassName || ''}`}>
                {item.value}
              </span>
            </motion.div>
          ))}

          {/* Separator */}
          <motion.div variants={itemVariants}>
            <div className="border-t border-dashed border-border" />
          </motion.div>

          {/* Total Row */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between pt-2"
          >
            <span className="text-lg font-bold">{total.label}</span>
            <span className="text-lg font-bold">{total.value}</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

code.demo.1757844488546.tsx
import { PaymentSummary } from "@/components/ui/payment"; // Adjust this import path

// A simple SVG icon for the demo.
const PaypalIcon = () => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 fill-current text-[#00457C]"
  >
    <title>PayPal</title>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="7.056000232696533 3 37.35095977783203 45"><g xmlns="http://www.w3.org/2000/svg" clip-path="url(#paypal__a)"><path fill="#002991" d="M38.914 13.35c0 5.574-5.144 12.15-12.927 12.15H18.49l-.368 2.322L16.373 39H7.056l5.605-36h15.095c5.083 0 9.082 2.833 10.555 6.77a9.687 9.687 0 0 1 .603 3.58z"/><path fill="#60CDFF" d="M44.284 23.7A12.894 12.894 0 0 1 31.53 34.5h-5.206L24.157 48H14.89l1.483-9 1.75-11.178.367-2.322h7.497c7.773 0 12.927-6.576 12.927-12.15 3.825 1.974 6.055 5.963 5.37 10.35z"/><path fill="#008CFF" d="M38.914 13.35C37.31 12.511 35.365 12 33.248 12h-12.64L18.49 25.5h7.497c7.773 0 12.927-6.576 12.927-12.15z"/></g></svg>
  </svg>
);

export default function PaymentSummaryDemo() {
  const summaryItems = [
    { label: "Subtotal (1 items)", value: "SAR 40.00" },
    {
      label: "Shipping",
      value: "Free",
      valueClassName: "text-green-600 dark:text-green-500 font-semibold",
    },
  ];

  const totalDetails = {
    label: "Total (with VAT)",
    value: "SAR 330.00",
  };

  const paymentMethodDetails = {
    icon: <PaypalIcon />,
    name: "Paypal",
  };

  return (
    <div className="flex min-h-[450px] w-full items-center justify-center bg-background p-4">
      <PaymentSummary
        title="Payment Details"
        items={summaryItems}
        total={totalDetails}
        paymentMethod={paymentMethodDetails}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/payment.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";

// NOTE: This component is now self-contained and does not import any other local UI components.

// Define the types for the component props
interface PaymentSummaryProps {
  title: string;
  paymentMethod: {
    icon: React.ReactNode;
    name: string;
  };
  items: {
    label: string;
    value: React.ReactNode;
    valueClassName?: string;
  }[];
  total: {
    label: string;
    value: string;
  };
  className?: string;
}

/**
 * A self-contained, responsive, and animated card for displaying payment details.
 * It uses standard divs with Tailwind CSS classes instead of imported components.
 */
export function PaymentSummary({
  title,
  paymentMethod,
  items,
  total,
  className,
}: PaymentSummaryProps) {
  // Animation variants for the container and list items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  // Base classes for the card, combined with any additional classes from props
  const cardClasses = `w-full max-w-md rounded-lg border bg-card text-card-foreground shadow-sm ${className || ''}`;

  return (
    <div className={cardClasses}>
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          {title}
        </h3>
      </div>
      <div className="p-6 pt-0">
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Payment Method Row */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between"
          >
            <span className="text-sm text-muted-foreground">Payment Method</span>
            <div className="flex items-center gap-2">
              {paymentMethod.icon}
              <span className="font-medium">{paymentMethod.name}</span>
            </div>
          </motion.div>

          {/* Dynamic Line Items */}
          {items.map((item, index) => (
            <motion.div
              variants={itemVariants}
              key={index}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className={`font-medium ${item.valueClassName || ''}`}>
                {item.value}
              </span>
            </motion.div>
          ))}

          {/* Separator */}
          <motion.div variants={itemVariants}>
            <div className="border-t border-dashed border-border" />
          </motion.div>

          {/* Total Row */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between pt-2"
          >
            <span className="text-lg font-bold">{total.label}</span>
            <span className="text-lg font-bold">{total.value}</span>
          </motion.div>
        </motion.div>
      </div>
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
