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
minimal-payment-modal.tsx
"use client"

import { useId, useState } from "react"
import { CreditCardIcon, GiftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function MinimalPaymentModal() {
  const id = useId()
  const [couponCode, setCouponCode] = useState("")
  const [showCouponInput, setShowCouponInput] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Checkout</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md !rounded-2xl p-6 space-y-6">
        {/* Header */}
        <DialogHeader className="text-center">
          <DialogTitle>Secure Payment</DialogTitle>
          <DialogDescription>Enter your card details to complete the payment.</DialogDescription>
        </DialogHeader>

        {/* Payment Form */}
        <form className="space-y-4">
          <div>
            <Label htmlFor={`card-name-${id}`}>Cardholder Name</Label>
            <Input id={`card-name-${id}`} placeholder="Jane Doe" required className="rounded-lg" />
          </div>

          <div>
            <Label htmlFor={`card-number-${id}`}>Card Number</Label>
            <div className="relative">
              <Input
                id={`card-number-${id}`}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                required
                className="rounded-lg pr-10"
              />
              <CreditCardIcon
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={16}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor={`expiry-${id}`}>Expiry</Label>
              <Input id={`expiry-${id}`} placeholder="MM/YY" maxLength={5} required className="rounded-lg" />
            </div>
            <div className="flex-1">
              <Label htmlFor={`cvc-${id}`}>CVC</Label>
              <Input id={`cvc-${id}`} placeholder="123" maxLength={4} required className="rounded-lg" />
            </div>
          </div>

          {/* Coupon */}
          {!showCouponInput ? (
            <button
              type="button"
              onClick={() => setShowCouponInput(true)}
              className="text-sm underline hover:no-underline"
            >
              + Apply Coupon
            </button>
          ) : (
            <div>
              <Label htmlFor={`coupon-${id}`}>Coupon Code</Label>
              <Input
                id={`coupon-${id}`}
                placeholder="Enter your code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="rounded-lg"
              />
            </div>
          )}

          <Button type="button" className="w-full mt-2">
            Pay Now
          </Button>
        </form>

        <p className="text-muted-foreground text-center text-xs">
          Payments are secure and non-refundable. Cancel anytime.
        </p>
      </DialogContent>
    </Dialog>
  )
}


code.demo.1755716674029.tsx
import MinimalPaymentModal from "@/components/ui/minimal-payment-modal";

export default function DemoOne() {
  return <MinimalPaymentModal />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/minimal-payment-modal.tsx
"use client"

import { useId, useState } from "react"
import { CreditCardIcon, GiftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function MinimalPaymentModal() {
  const id = useId()
  const [couponCode, setCouponCode] = useState("")
  const [showCouponInput, setShowCouponInput] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Checkout</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md !rounded-2xl p-6 space-y-6">
        {/* Header */}
        <DialogHeader className="text-center">
          <DialogTitle>Secure Payment</DialogTitle>
          <DialogDescription>Enter your card details to complete the payment.</DialogDescription>
        </DialogHeader>

        {/* Payment Form */}
        <form className="space-y-4">
          <div>
            <Label htmlFor={`card-name-${id}`}>Cardholder Name</Label>
            <Input id={`card-name-${id}`} placeholder="Jane Doe" required className="rounded-lg" />
          </div>

          <div>
            <Label htmlFor={`card-number-${id}`}>Card Number</Label>
            <div className="relative">
              <Input
                id={`card-number-${id}`}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                required
                className="rounded-lg pr-10"
              />
              <CreditCardIcon
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={16}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor={`expiry-${id}`}>Expiry</Label>
              <Input id={`expiry-${id}`} placeholder="MM/YY" maxLength={5} required className="rounded-lg" />
            </div>
            <div className="flex-1">
              <Label htmlFor={`cvc-${id}`}>CVC</Label>
              <Input id={`cvc-${id}`} placeholder="123" maxLength={4} required className="rounded-lg" />
            </div>
          </div>

          {/* Coupon */}
          {!showCouponInput ? (
            <button
              type="button"
              onClick={() => setShowCouponInput(true)}
              className="text-sm underline hover:no-underline"
            >
              + Apply Coupon
            </button>
          ) : (
            <div>
              <Label htmlFor={`coupon-${id}`}>Coupon Code</Label>
              <Input
                id={`coupon-${id}`}
                placeholder="Enter your code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="rounded-lg"
              />
            </div>
          )}

          <Button type="button" className="w-full mt-2">
            Pay Now
          </Button>
        </form>

        <p className="text-muted-foreground text-center text-xs">
          Payments are secure and non-refundable. Cancel anytime.
        </p>
      </DialogContent>
    </Dialog>
  )
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
