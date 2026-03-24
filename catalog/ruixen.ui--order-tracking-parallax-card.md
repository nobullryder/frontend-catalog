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
order-tracking-parallax-card.tsx
"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface OrderTrackingParallaxCardProps {
  orderId: string;
  product: string;
  status: "Processing" | "Shipped" | "Out for Delivery" | "Delivered";
  eta: string;
  imageUrl?: string;
  className?: string;
}

export const OrderTrackingParallaxCard = React.forwardRef<
  HTMLDivElement,
  OrderTrackingParallaxCardProps
>(
  (
    {
      orderId,
      product,
      status,
      eta,
      imageUrl = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_truck.png",
      className,
    },
    ref
  ) => {
    // Motion values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(ySpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const translateZImg = useTransform(ySpring, [-0.5, 0.5], [-40, 40]);
    const translateZContent = useTransform(ySpring, [-0.5, 0.5], [25, -25]);
    const translateZProgress = useTransform(ySpring, [-0.5, 0.5], [35, -35]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / rect.width - 0.5;
      const yPct = mouseY / rect.height - 0.5;
      x.set(xPct);
      y.set(yPct);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    // Progress steps
    const steps = ["Processing", "Shipped", "Out for Delivery", "Delivered"];
    const activeStep = steps.indexOf(status);

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn(
          "relative h-[420px] w-80 rounded-2xl",
          className
        )}
      >
        <div
          style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
          className="absolute inset-4 flex flex-col justify-between rounded-xl bg-card hover:shadow-xl p-5 border cursor-pointer"
        >
          {/* Truck Image */}
          <motion.div
            style={{ transform: "translateZ(60px)", translateY: translateZImg }}
            className="relative flex justify-center"
          >
            <img
              src={imageUrl}
              alt="Delivery truck"
              className="pointer-events-none h-28 object-contain"
            />
          </motion.div>

          {/* Order Info */}
          <motion.div
            style={{ transform: "translateZ(30px)", translateY: translateZContent }}
            className="mt-3 text-center"
          >
            <h2 className="text-lg font-bold text-card-foreground">
              Order #{orderId}
            </h2>
            <p className="text-sm text-muted-foreground">{product}</p>
            <span
              className={cn(
                "mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium",
                status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : status === "Out for Delivery"
                  ? "bg-blue-100 text-blue-700"
                  : status === "Shipped"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
              )}
            >
              {status}
            </span>
            <p className="mt-2 text-xs text-muted-foreground">
              ETA: {eta}
            </p>
          </motion.div>

          {/* Progress Tracker */}
          <motion.div
            style={{ transform: "translateZ(45px)", translateY: translateZProgress }}
            className="mt-4"
          >
            <div className="flex justify-between text-[10px] font-medium text-muted-foreground">
              {steps.map((step, i) => (
                <span
                  key={step}
                  className={cn(
                    "w-full text-center",
                    i === activeStep ? "text-primary font-semibold" : ""
                  )}
                >
                  {step}
                </span>
              ))}
            </div>
            <div className="mt-1 flex w-full justify-between">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 w-full mx-0.5 rounded-full",
                    i <= activeStep ? "bg-primary" : "bg-muted"
                  )}
                ></div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }
);

OrderTrackingParallaxCard.displayName = "OrderTrackingParallaxCard";


code.demo.1759046675319.tsx
"use client";

import * as React from "react";
import { OrderTrackingParallaxCard } from "@/components/ui/order-tracking-parallax-card";

export default function OrderTrackingParallaxDemo() {
  return (
      <OrderTrackingParallaxCard
        orderId="4582"
        product="Wireless Headphones"
        status="Out for Delivery"
        eta="Tomorrow, 7 PM"
      />
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/order-tracking-parallax-card.tsx
"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface OrderTrackingParallaxCardProps {
  orderId: string;
  product: string;
  status: "Processing" | "Shipped" | "Out for Delivery" | "Delivered";
  eta: string;
  imageUrl?: string;
  className?: string;
}

export const OrderTrackingParallaxCard = React.forwardRef<
  HTMLDivElement,
  OrderTrackingParallaxCardProps
>(
  (
    {
      orderId,
      product,
      status,
      eta,
      imageUrl = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_truck.png",
      className,
    },
    ref
  ) => {
    // Motion values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(ySpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const translateZImg = useTransform(ySpring, [-0.5, 0.5], [-40, 40]);
    const translateZContent = useTransform(ySpring, [-0.5, 0.5], [25, -25]);
    const translateZProgress = useTransform(ySpring, [-0.5, 0.5], [35, -35]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / rect.width - 0.5;
      const yPct = mouseY / rect.height - 0.5;
      x.set(xPct);
      y.set(yPct);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    // Progress steps
    const steps = ["Processing", "Shipped", "Out for Delivery", "Delivered"];
    const activeStep = steps.indexOf(status);

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn(
          "relative h-[420px] w-80 rounded-2xl",
          className
        )}
      >
        <div
          style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
          className="absolute inset-4 flex flex-col justify-between rounded-xl bg-card hover:shadow-xl p-5 border cursor-pointer"
        >
          {/* Truck Image */}
          <motion.div
            style={{ transform: "translateZ(60px)", translateY: translateZImg }}
            className="relative flex justify-center"
          >
            <img
              src={imageUrl}
              alt="Delivery truck"
              className="pointer-events-none h-28 object-contain"
            />
          </motion.div>

          {/* Order Info */}
          <motion.div
            style={{ transform: "translateZ(30px)", translateY: translateZContent }}
            className="mt-3 text-center"
          >
            <h2 className="text-lg font-bold text-card-foreground">
              Order #{orderId}
            </h2>
            <p className="text-sm text-muted-foreground">{product}</p>
            <span
              className={cn(
                "mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium",
                status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : status === "Out for Delivery"
                  ? "bg-blue-100 text-blue-700"
                  : status === "Shipped"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
              )}
            >
              {status}
            </span>
            <p className="mt-2 text-xs text-muted-foreground">
              ETA: {eta}
            </p>
          </motion.div>

          {/* Progress Tracker */}
          <motion.div
            style={{ transform: "translateZ(45px)", translateY: translateZProgress }}
            className="mt-4"
          >
            <div className="flex justify-between text-[10px] font-medium text-muted-foreground">
              {steps.map((step, i) => (
                <span
                  key={step}
                  className={cn(
                    "w-full text-center",
                    i === activeStep ? "text-primary font-semibold" : ""
                  )}
                >
                  {step}
                </span>
              ))}
            </div>
            <div className="mt-1 flex w-full justify-between">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 w-full mx-0.5 rounded-full",
                    i <= activeStep ? "bg-primary" : "bg-muted"
                  )}
                ></div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }
);

OrderTrackingParallaxCard.displayName = "OrderTrackingParallaxCard";

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
