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
import FAQs  from "@/components/ui/faq";

export default function DemoOne() {
  return <FAQs />;
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
