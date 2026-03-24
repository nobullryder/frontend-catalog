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
modern-card-input.tsx
"use client"

import { useId, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCardIcon } from "lucide-react"
import images, { CardImages } from "react-payment-inputs/images"
import { usePaymentInputs } from "react-payment-inputs"
import { cn } from "@/lib/utils"

interface CardInputProps {
  label?: string
  showPreview?: boolean
  onChange?: (data: { number: string; expiry: string; cvc: string }) => void
}

export default function ModernCardInput({
  label = "Card Information",
  showPreview = true,
  onChange,
}: CardInputProps) {
  const id = useId()
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const {
    meta,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
  } = usePaymentInputs()

  const handleChange = () => {
    if (onChange) {
      onChange({
        number: (getCardNumberProps() as any).value || "",
        expiry: (getExpiryDateProps() as any).value || "",
        cvc: (getCVCProps() as any).value || "",
      })
    }
  }

  return (
    <div className="w-full max-w-md space-y-3">
      <Label className="text-sm font-medium">{label}</Label>

      <div
        className={cn(
          "relative rounded-xl border bg-background p-4 shadow-md flex flex-col gap-3 transition-all",
          focusedField ? "ring-2 ring-primary/50" : "ring-0"
        )}
      >
        {/* Card Number */}
        <div className="relative">
          <Input
            id={`card-number-${id}`}
            placeholder="Card Number"
            {...getCardNumberProps()}
            onFocus={() => setFocusedField("number")}
            onBlur={() => setFocusedField(null)}
            onChange={handleChange}
            className="peer rounded-xl pr-12"
          />
          <div className="absolute inset-y-0 end-0 flex items-center justify-center pr-3 pointer-events-none text-muted-foreground">
            {meta.cardType ? (
              <svg
                {...getCardImageProps({ images: images as unknown as CardImages })}
                width={24}
                className="overflow-hidden rounded-sm transition-all"
              />
            ) : (
              <CreditCardIcon size={18} />
            )}
          </div>
        </div>

        {/* Expiry and CVC */}
        <div className="flex gap-2">
          <Input
            id={`expiry-${id}`}
            placeholder="MM/YY"
            {...getExpiryDateProps()}
            onFocus={() => setFocusedField("expiry")}
            onBlur={() => setFocusedField(null)}
            onChange={handleChange}
            className="flex-1 rounded-xl"
          />
          <Input
            id={`cvc-${id}`}
            placeholder="CVC"
            {...getCVCProps()}
            onFocus={() => setFocusedField("cvc")}
            onBlur={() => setFocusedField(null)}
            onChange={handleChange}
            className="flex-1 rounded-xl"
          />
        </div>

        {/* Optional Preview */}
        {showPreview && meta.cardType && (
          <div className="absolute top-3 right-3 text-xs text-muted-foreground font-medium">
            {meta.cardType.toUpperCase()}
          </div>
        )}
      </div>
    </div>
  )
}


code.demo.1757013663130.tsx
import ModernCardInput from "@/components/ui/modern-card-input";

export default function DemoOne() {
  return <ModernCardInput />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/modern-card-input.tsx
"use client"

import { useId, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCardIcon } from "lucide-react"
import images, { CardImages } from "react-payment-inputs/images"
import { usePaymentInputs } from "react-payment-inputs"
import { cn } from "@/lib/utils"

interface CardInputProps {
  label?: string
  showPreview?: boolean
  onChange?: (data: { number: string; expiry: string; cvc: string }) => void
}

export default function ModernCardInput({
  label = "Card Information",
  showPreview = true,
  onChange,
}: CardInputProps) {
  const id = useId()
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const {
    meta,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
  } = usePaymentInputs()

  const handleChange = () => {
    if (onChange) {
      onChange({
        number: (getCardNumberProps() as any).value || "",
        expiry: (getExpiryDateProps() as any).value || "",
        cvc: (getCVCProps() as any).value || "",
      })
    }
  }

  return (
    <div className="w-full max-w-md space-y-3">
      <Label className="text-sm font-medium">{label}</Label>

      <div
        className={cn(
          "relative rounded-xl border bg-background p-4 shadow-md flex flex-col gap-3 transition-all",
          focusedField ? "ring-2 ring-primary/50" : "ring-0"
        )}
      >
        {/* Card Number */}
        <div className="relative">
          <Input
            id={`card-number-${id}`}
            placeholder="Card Number"
            {...getCardNumberProps()}
            onFocus={() => setFocusedField("number")}
            onBlur={() => setFocusedField(null)}
            onChange={handleChange}
            className="peer rounded-xl pr-12"
          />
          <div className="absolute inset-y-0 end-0 flex items-center justify-center pr-3 pointer-events-none text-muted-foreground">
            {meta.cardType ? (
              <svg
                {...getCardImageProps({ images: images as unknown as CardImages })}
                width={24}
                className="overflow-hidden rounded-sm transition-all"
              />
            ) : (
              <CreditCardIcon size={18} />
            )}
          </div>
        </div>

        {/* Expiry and CVC */}
        <div className="flex gap-2">
          <Input
            id={`expiry-${id}`}
            placeholder="MM/YY"
            {...getExpiryDateProps()}
            onFocus={() => setFocusedField("expiry")}
            onBlur={() => setFocusedField(null)}
            onChange={handleChange}
            className="flex-1 rounded-xl"
          />
          <Input
            id={`cvc-${id}`}
            placeholder="CVC"
            {...getCVCProps()}
            onFocus={() => setFocusedField("cvc")}
            onBlur={() => setFocusedField(null)}
            onChange={handleChange}
            className="flex-1 rounded-xl"
          />
        </div>

        {/* Optional Preview */}
        {showPreview && meta.cardType && (
          <div className="absolute top-3 right-3 text-xs text-muted-foreground font-medium">
            {meta.cardType.toUpperCase()}
          </div>
        )}
      </div>
    </div>
  )
}

```

Install NPM dependencies:
```bash
lucide-react, react-payment-inputs
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
