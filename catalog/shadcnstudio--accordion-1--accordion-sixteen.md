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
accordion-1.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const items = [
  {
    title: 'How do I track my order?',
    content: `You can track your order by logging into your account and visiting the "Orders" section. You'll receive tracking information via email once your order ships. For real-time updates, you can also use the tracking number provided in your shipping confirmation email.`
  },
  {
    title: 'What is your return policy?',
    content:
      'We offer a 30-day return policy for most items. Products must be unused and in their original packaging. To initiate a return, please contact our customer service team or use the return portal in your account dashboard.'
  },
  {
    title: 'How can I contact customer support?',
    content:
      'Our customer support team is available 24/7. You can reach us via live chat, email at support@example.com, or by phone at 1-800-123-4567. For faster service, please have your order number ready when contacting us.'
  }
]

const AccordionDemo = () => {
  return (
    <Accordion type='single' collapsible className='w-full' defaultValue='item-1'>
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index + 1}`}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent className='text-muted-foreground'>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default AccordionDemo


code.demo.1760374725374.tsx
import { PlusIcon } from 'lucide-react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const items = [
  {
    category: 'Shipping & Delivery',
    faqs: [
      {
        title: 'How do I track my order?',
        content: `You can track your order by logging into your account and visiting the "Orders" section. You'll receive tracking information via email once your order ships. For real-time updates, you can also use the tracking number provided in your shipping confirmation email.`,
        open: true
      },
      {
        title: 'What are your shipping options?',
        content:
          'We offer standard shipping (3-5 business days), express shipping (1-2 business days), and overnight shipping. International shipping is also available to select countries. Shipping costs vary based on the destination and selected method.'
      },
      {
        title: 'Do you ship internationally?',
        content:
          'Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days, depending on the destination. Please note that customs duties and taxes may apply and are the responsibility of the recipient.'
      }
    ]
  },
  {
    category: 'Returns & Refunds',
    faqs: [
      {
        title: 'What is your return policy?',
        content:
          'We offer a 30-day return policy for most items. Products must be unused and in their original packaging. To initiate a return, please contact our customer service team or use the return portal in your account dashboard.',
        open: true
      },
      {
        title: 'How long do refunds take to process?',
        content:
          'Once we receive your returned item, refunds are typically processed within 5-7 business days. The refund will be issued to your original payment method. Please note that it may take additional time for your bank or credit card company to reflect the refund in your account.'
      },
      {
        title: 'Do you offer exchanges?',
        content:
          'Yes, we offer exchanges for different sizes, colors, or styles. You can request an exchange through our return portal or by contacting customer service. The exchange process typically takes 7-10 business days from when we receive your return.'
      }
    ]
  },
  {
    category: 'Help & Support',
    faqs: [
      {
        title: 'How can I contact customer support?',
        content:
          'Our customer support team is available 24/7. You can reach us via live chat, email at support@example.com, or by phone at 1-800-123-4567. For faster service, please have your order number ready when contacting us.',
        open: true
      },
      {
        title: 'What are your business hours?',
        content:
          'Our customer service team is available 24/7 for online support. Our physical stores are open Monday through Saturday from 9 AM to 9 PM, and Sunday from 10 AM to 6 PM. Store hours may vary during holidays.'
      },
      {
        title: 'How do I report a problem with my order?',
        content:
          'If you encounter any issues with your order, please contact our customer service team immediately. You can report problems through our website, email, or phone. Please include your order number and a detailed description of the issue for faster resolution.'
      }
    ]
  }
]

const AccordionMultilevelIconDemo = () => {
  return (
    <Accordion type='single' collapsible className='w-full rounded-md border' defaultValue='item-1'>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index + 1}`}
          className='has-focus-visible:border-ring has-focus-visible:ring-ring/50 outline-none first:rounded-t-md last:rounded-b-md has-focus-visible:z-10 has-focus-visible:ring-[3px]'
        >
          <AccordionTrigger className='px-5 outline-none focus-visible:ring-0'>{item.category}</AccordionTrigger>
          <AccordionContent className='pb-0'>
            {item.faqs.map((faq, index) => (
              <Collapsible key={index} className='bg-muted border-t px-8' defaultOpen={faq.open}>
                <CollapsibleTrigger className='focus-visible:ring-ring/50 flex w-full items-center gap-4 rounded-sm py-4 font-medium outline-none focus-visible:z-10 focus-visible:ring-[3px] [&>svg>path:last-child]:origin-center [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0'>
                  <PlusIcon className='text-muted-foreground pointer-events-none size-4 shrink-0' />
                  {faq.title}
                </CollapsibleTrigger>
                <CollapsibleContent className='text-muted-foreground overflow-hidden pb-4'>
                  {faq.content}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default AccordionMultilevelIconDemo

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/accordion-1.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const items = [
  {
    title: 'How do I track my order?',
    content: `You can track your order by logging into your account and visiting the "Orders" section. You'll receive tracking information via email once your order ships. For real-time updates, you can also use the tracking number provided in your shipping confirmation email.`
  },
  {
    title: 'What is your return policy?',
    content:
      'We offer a 30-day return policy for most items. Products must be unused and in their original packaging. To initiate a return, please contact our customer service team or use the return portal in your account dashboard.'
  },
  {
    title: 'How can I contact customer support?',
    content:
      'Our customer support team is available 24/7. You can reach us via live chat, email at support@example.com, or by phone at 1-800-123-4567. For faster service, please have your order number ready when contacting us.'
  }
]

const AccordionDemo = () => {
  return (
    <Accordion type='single' collapsible className='w-full' defaultValue='item-1'>
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index + 1}`}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent className='text-muted-foreground'>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default AccordionDemo

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
