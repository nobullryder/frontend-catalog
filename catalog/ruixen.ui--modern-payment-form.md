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
modern-payment-form.tsx
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaPaypal } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function RuixenPaymentCard() {
    return (
        <div className="flex items-center justify-center p-4">
            <Card className="max-w-md w-full rounded-2xl shadow-lg">
                <CardContent className="p-6 space-y-6">
                    {/* Payment Options */}
                    <div className="grid grid-cols-3 gap-4">
                        <Button variant="outline" className="h-14 p-0 flex items-center justify-center">
                            <FaPaypal fontSize={24} />
                            <span className="text-md">PayPal</span>
                        </Button>
                        <Button variant="outline" className="h-14 p-0 flex items-center justify-center">
                            <FaApple fontSize={24} />
                            <span className="text-md">Pay</span>
                        </Button>
                        <Button variant="outline" className="h-14 p-0 flex items-center justify-center">
                            <FcGoogle fontSize={30} />
                            <span className="text-md">Pay</span>
                        </Button>
                    </div>

                    {/* Separator */}
                    <div className="flex items-center text-gray-500">
                        <hr className="flex-grow border-t border-gray-300" />
                        <span className="mx-2 text-xs font-medium">or pay using credit card</span>
                        <hr className="flex-grow border-t border-gray-300" />
                    </div>

                    {/* Credit Card Form */}
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="cardholder-name">Card holder full name</Label>
                            <Input id="cardholder-name" name="cardholderName" placeholder="Enter your full name" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input
                                id="card-number"
                                name="cardNumber"
                                placeholder="0000 0000 0000 0000"
                                inputMode="numeric"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="expiry">Expiry Date / CVV</Label>
                            <div className="flex gap-4">
                                <Input
                                    id="expiry"
                                    name="expiryDate"
                                    placeholder="01/23"
                                />
                                <Input
                                    id="cvv"
                                    name="cvv"
                                    placeholder="CVV"
                                    inputMode="numeric"
                                    type="password"
                                />
                            </div>
                        </div>
                    </div>

                    <Button className="w-full" size="lg">
                        <Link href="https://ruixen.com?utm_source=21st.dev&utm_medium=Form_02&utm_campaign=ruixen" target="_blank">
                            Checkout
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}


code.demo.1753152426285.tsx
import RuixenPaymentCard from "@/components/ui/modern-payment-form";

export default function DemoOne() {
  return <RuixenPaymentCard />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/modern-payment-form.tsx
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaPaypal } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function RuixenPaymentCard() {
    return (
        <div className="flex items-center justify-center p-4">
            <Card className="max-w-md w-full rounded-2xl shadow-lg">
                <CardContent className="p-6 space-y-6">
                    {/* Payment Options */}
                    <div className="grid grid-cols-3 gap-4">
                        <Button variant="outline" className="h-14 p-0 flex items-center justify-center">
                            <FaPaypal fontSize={24} />
                            <span className="text-md">PayPal</span>
                        </Button>
                        <Button variant="outline" className="h-14 p-0 flex items-center justify-center">
                            <FaApple fontSize={24} />
                            <span className="text-md">Pay</span>
                        </Button>
                        <Button variant="outline" className="h-14 p-0 flex items-center justify-center">
                            <FcGoogle fontSize={30} />
                            <span className="text-md">Pay</span>
                        </Button>
                    </div>

                    {/* Separator */}
                    <div className="flex items-center text-gray-500">
                        <hr className="flex-grow border-t border-gray-300" />
                        <span className="mx-2 text-xs font-medium">or pay using credit card</span>
                        <hr className="flex-grow border-t border-gray-300" />
                    </div>

                    {/* Credit Card Form */}
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="cardholder-name">Card holder full name</Label>
                            <Input id="cardholder-name" name="cardholderName" placeholder="Enter your full name" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input
                                id="card-number"
                                name="cardNumber"
                                placeholder="0000 0000 0000 0000"
                                inputMode="numeric"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="expiry">Expiry Date / CVV</Label>
                            <div className="flex gap-4">
                                <Input
                                    id="expiry"
                                    name="expiryDate"
                                    placeholder="01/23"
                                />
                                <Input
                                    id="cvv"
                                    name="cvv"
                                    placeholder="CVV"
                                    inputMode="numeric"
                                    type="password"
                                />
                            </div>
                        </div>
                    </div>

                    <Button className="w-full" size="lg">
                        <Link href="https://ruixen.com?utm_source=21st.dev&utm_medium=Form_02&utm_campaign=ruixen" target="_blank">
                            Checkout
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

```

Install NPM dependencies:
```bash
next, react-icons
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
