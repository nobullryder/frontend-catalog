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
faq.tsx
export default function FAQs() {
    return (
        <section className="scroll-py-16 py-16 md:scroll-py-32 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-y-12 px-2 lg:[grid-template-columns:1fr_auto]">
                    <div className="text-center lg:text-left">
                        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
                            Frequently <br className="hidden lg:block" /> Asked <br className="hidden lg:block" />
                            Questions
                        </h2>
                        <p>Accusantium quisquam. Illo, omnis?</p>
                    </div>

                    <div className="divide-y divide-dashed sm:mx-auto sm:max-w-lg lg:mx-0">
                        <div className="pb-6">
                            <h3 className="font-medium">What is the refund policy?</h3>
                            <p className="text-muted-foreground mt-4">We offer a 30-day money back guarantee. If you are not satisfied with our product, you can request a refund within 30 days of your purchase.</p>

                            <ol className="list-outside list-decimal space-y-2 pl-4">
                                <li className="text-muted-foreground mt-4">To request a refund, please contact our support team with your order number and reason for the refund.</li>
                                <li className="text-muted-foreground mt-4">Refunds will be processed within 3-5 business days.</li>
                                <li className="text-muted-foreground mt-4">Please note that refunds are only available for new customers and are limited to one per customer.</li>
                            </ol>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">How do I cancel my subscription?</h3>
                            <p className="text-muted-foreground mt-4">You can cancel your subscription at any time by logging into your account and clicking on the cancel button.</p>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">Can I upgrade my plan?</h3>
                            <p className="text-muted-foreground my-4">Yes, you can upgrade your plan at any time by logging into your account and selecting the plan you want to upgrade to.</p>
                            <ul className="list-outside list-disc space-y-2 pl-4">
                                <li className="text-muted-foreground">You will be charged the difference in price between your current plan and the plan you are upgrading to.</li>
                                <li className="text-muted-foreground">Your new plan will take effect immediately and you will be billed at the new rate on your next billing cycle.</li>
                            </ul>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">Do you offer phone support?</h3>
                            <p className="text-muted-foreground mt-4">We do not offer phone support at this time. However, you can contact us via email or live chat for any questions or concerns you may have.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

code.demo.1753873924625.tsx
'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import Link from 'next/link'

type FAQItem = {
    id: string
    icon: IconName
    question: string
    answer: string
}

export default function FAQsThree() {
    const faqItems: FAQItem[] = [
        {
            id: 'item-1',
            icon: 'clock',
            question: 'What are your business hours?',
            answer: 'Our customer service team is available Monday through Friday from 9:00 AM to 8:00 PM EST, and weekends from 10:00 AM to 6:00 PM EST. During holidays, hours may vary and will be posted on our website.',
        },
        {
            id: 'item-2',
            icon: 'credit-card',
            question: 'How do subscription payments work?',
            answer: 'Subscription payments are automatically charged to your default payment method on the same day each month or year, depending on your billing cycle. You can update your payment information and view billing history in your account dashboard.',
        },
        {
            id: 'item-3',
            icon: 'truck',
            question: 'Can I expedite my shipping?',
            answer: 'Yes, we offer several expedited shipping options at checkout. Next-day and 2-day shipping are available for most U.S. addresses if orders are placed before 2:00 PM EST. International expedited shipping options vary by destination.',
        },
        {
            id: 'item-4',
            icon: 'globe',
            question: 'Do you offer localized support?',
            answer: 'We offer multilingual support in English, Spanish, French, German, and Japanese. Our support team can assist customers in these languages via email, chat, and phone during standard business hours for each respective region.',
        },
        {
            id: 'item-5',
            icon: 'package',
            question: 'How do I track my order?',
            answer: 'Once your order ships, you\'ll receive a confirmation email with a tracking number. You can use this number on our website or the carrier\'s website to track your package. You can also view order status and tracking information in your account dashboard under "Order History".',
        },
    ]

    return (
        <section className="bg-muted dark:bg-background py-20">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="flex flex-col gap-10 md:flex-row md:gap-16">
                    <div className="md:w-1/3">
                        <div className="sticky top-20">
                            <h2 className="mt-4 text-3xl font-bold">Frequently Asked Questions</h2>
                            <p className="text-muted-foreground mt-4">
                                Can't find what you're looking for? Contact our{' '}
                                <Link
                                    href="#"
                                    className="text-primary font-medium hover:underline">
                                    customer support team
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-2">
                            {faqItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className="bg-background shadow-xs rounded-lg border px-4 last:border-b">
                                    <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-6">
                                                <DynamicIcon
                                                    name={item.icon}
                                                    className="m-auto size-4"
                                                />
                                            </div>
                                            <span className="text-base">{item.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5">
                                        <div className="px-9">
                                            <p className="text-base">{item.answer}</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/faq.tsx
export default function FAQs() {
    return (
        <section className="scroll-py-16 py-16 md:scroll-py-32 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-y-12 px-2 lg:[grid-template-columns:1fr_auto]">
                    <div className="text-center lg:text-left">
                        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
                            Frequently <br className="hidden lg:block" /> Asked <br className="hidden lg:block" />
                            Questions
                        </h2>
                        <p>Accusantium quisquam. Illo, omnis?</p>
                    </div>

                    <div className="divide-y divide-dashed sm:mx-auto sm:max-w-lg lg:mx-0">
                        <div className="pb-6">
                            <h3 className="font-medium">What is the refund policy?</h3>
                            <p className="text-muted-foreground mt-4">We offer a 30-day money back guarantee. If you are not satisfied with our product, you can request a refund within 30 days of your purchase.</p>

                            <ol className="list-outside list-decimal space-y-2 pl-4">
                                <li className="text-muted-foreground mt-4">To request a refund, please contact our support team with your order number and reason for the refund.</li>
                                <li className="text-muted-foreground mt-4">Refunds will be processed within 3-5 business days.</li>
                                <li className="text-muted-foreground mt-4">Please note that refunds are only available for new customers and are limited to one per customer.</li>
                            </ol>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">How do I cancel my subscription?</h3>
                            <p className="text-muted-foreground mt-4">You can cancel your subscription at any time by logging into your account and clicking on the cancel button.</p>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">Can I upgrade my plan?</h3>
                            <p className="text-muted-foreground my-4">Yes, you can upgrade your plan at any time by logging into your account and selecting the plan you want to upgrade to.</p>
                            <ul className="list-outside list-disc space-y-2 pl-4">
                                <li className="text-muted-foreground">You will be charged the difference in price between your current plan and the plan you are upgrading to.</li>
                                <li className="text-muted-foreground">Your new plan will take effect immediately and you will be billed at the new rate on your next billing cycle.</li>
                            </ul>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">Do you offer phone support?</h3>
                            <p className="text-muted-foreground mt-4">We do not offer phone support at this time. However, you can contact us via email or live chat for any questions or concerns you may have.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
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
