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
checkout-form.tsx
"use client"

import { CreditCard, MapPin, Tag } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function CheckoutForm() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <Card className="w-full max-w-md shadow-xl border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold tracking-tight">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Shipping Section */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Delivery Address</span>
            </div>
            <p className="text-sm text-muted-foreground">742 Evergreen Terrace</p>
            <p className="text-sm text-muted-foreground">Springfield, USA</p>
          </div>

          <Separator />

          {/* Payment Method Section */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Billing Method</span>
            </div>
            <p className="text-sm text-muted-foreground">Mastercard</p>
            <p className="text-sm text-muted-foreground">**** **** **** 1234</p>
          </div>

          <Separator />

          {/* Promo Code Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Apply Discount Code</span>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Enter discount code" className="flex-1" />
              <Button variant="secondary">Redeem</Button>
            </div>
          </div>

          <Separator />

          {/* Payment Summary */}
          <div>
            <span className="text-sm font-medium">Order Total</span>
            <div className="grid grid-cols-2 gap-y-2 text-sm mt-2">
              <span className="text-muted-foreground">Item Total:</span>
              <span className="text-right font-medium">$180.00</span>
              <span className="text-muted-foreground">Delivery Fee:</span>
              <span className="text-right font-medium">$15.00</span>
              <span className="text-muted-foreground">Taxes:</span>
              <span className="text-right font-medium">$25.00</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer Checkout */}
      <div className="w-full max-w-md mt-4 flex items-center justify-between rounded-xl border px-4 py-3 bg-card shadow-lg">
        <span className="text-lg font-bold">$220.00</span>
        <Button className="px-6">Place Order</Button>
      </div>
    </div>
  )
}


code.demo.1757275090195.tsx
import CheckoutForm from "@/components/ui/checkout-form";

export default function DemoOne() {
  return <CheckoutForm />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/checkout-form.tsx
"use client"

import { CreditCard, MapPin, Tag } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function CheckoutForm() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <Card className="w-full max-w-md shadow-xl border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold tracking-tight">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Shipping Section */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Delivery Address</span>
            </div>
            <p className="text-sm text-muted-foreground">742 Evergreen Terrace</p>
            <p className="text-sm text-muted-foreground">Springfield, USA</p>
          </div>

          <Separator />

          {/* Payment Method Section */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Billing Method</span>
            </div>
            <p className="text-sm text-muted-foreground">Mastercard</p>
            <p className="text-sm text-muted-foreground">**** **** **** 1234</p>
          </div>

          <Separator />

          {/* Promo Code Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Apply Discount Code</span>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Enter discount code" className="flex-1" />
              <Button variant="secondary">Redeem</Button>
            </div>
          </div>

          <Separator />

          {/* Payment Summary */}
          <div>
            <span className="text-sm font-medium">Order Total</span>
            <div className="grid grid-cols-2 gap-y-2 text-sm mt-2">
              <span className="text-muted-foreground">Item Total:</span>
              <span className="text-right font-medium">$180.00</span>
              <span className="text-muted-foreground">Delivery Fee:</span>
              <span className="text-right font-medium">$15.00</span>
              <span className="text-muted-foreground">Taxes:</span>
              <span className="text-right font-medium">$25.00</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer Checkout */}
      <div className="w-full max-w-md mt-4 flex items-center justify-between rounded-xl border px-4 py-3 bg-card shadow-lg">
        <span className="text-lg font-bold">$220.00</span>
        <Button className="px-6">Place Order</Button>
      </div>
    </div>
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
