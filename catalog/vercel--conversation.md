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
conversation.tsx
'use client';

import { Button } from '@/components/ui/button';
import { ArrowDownIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import { useCallback } from 'react';
import { StickToBottom, useStickToBottomContext } from 'use-stick-to-bottom';
import { cn } from '@/lib/utils';

export type ConversationProps = ComponentProps<typeof StickToBottom>;

export const Conversation = ({ className, ...props }: ConversationProps) => (
  <StickToBottom
    className={cn('relative flex-1 overflow-y-auto', className)}
    initial="smooth"
    resize="smooth"
    role="log"
    {...props}
  />
);

export type ConversationContentProps = ComponentProps<
  typeof StickToBottom.Content
>;

export const ConversationContent = ({
  className,
  ...props
}: ConversationContentProps) => (
  <StickToBottom.Content className={cn('p-4', className)} {...props} />
);

export type ConversationScrollButtonProps = ComponentProps<typeof Button>;

export const ConversationScrollButton = ({
  className,
  ...props
}: ConversationScrollButtonProps) => {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  const handleScrollToBottom = useCallback(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  return (
    !isAtBottom && (
      <Button
        className={cn(
          'absolute bottom-4 left-[50%] translate-x-[-50%] rounded-full',
          className,
        )}
        onClick={handleScrollToBottom}
        size="icon"
        type="button"
        variant="outline"
        {...props}
      >
        <ArrowDownIcon className="size-4" />
      </Button>
    )
  );
};


code.demo.1755158082509.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ui/conversation';
import { cn } from '@/lib/utils';

// Message component
type MessageProps = {
  from: 'user' | 'bot';
  children: React.ReactNode;
};

const Message = ({ from, children }: MessageProps) => (
  <div
    className={cn(
      'my-2 flex',
      from === 'user' ? 'justify-end' : 'justify-start'
    )}
  >
    <div
      className={cn(
        'max-w-xs rounded-lg p-2',
        from === 'user'
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-800'
      )}
    >
      {children}
    </div>
  </div>
);

const MessageContent = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

// Main chat component
export default function AutoChatExample() {
  const [messages, setMessages] = useState<
    { from: 'user' | 'bot'; text: string }[]
  >([]);

  // Predefined conversation flow
  const conversationFlow = [
    { from: 'user', text: 'Hi there!' },
    { from: 'bot', text: 'Hello! How are you doing?' },
    { from: 'user', text: 'I am doing great, thanks!' },
    { from: 'bot', text: 'Glad to hear that! What are you up to today?' },
    { from: 'user', text: 'Just working on some React projects.' },
    { from: 'bot', text: 'Awesome! React is fun to work with.' },
  ];

  useEffect(() => {
    if (messages.length < conversationFlow.length) {
      const timer = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          conversationFlow[prev.length],
        ]);
      }, 1200); // delay between messages
      return () => clearTimeout(timer);
    }
  }, [messages]);

  return (
    <div className="w-full max-w-md mx-auto mt-10 border rounded-lg overflow-hidden shadow-md">
      <Conversation className="relative w-full" style={{ height: '400px' }}>
        <ConversationContent>
          {messages.map((msg, idx) => (
            <Message key={idx} from={msg.from}>
              <MessageContent>{msg.text}</MessageContent>
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/conversation.tsx
'use client';

import { Button } from '@/components/ui/button';
import { ArrowDownIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import { useCallback } from 'react';
import { StickToBottom, useStickToBottomContext } from 'use-stick-to-bottom';
import { cn } from '@/lib/utils';

export type ConversationProps = ComponentProps<typeof StickToBottom>;

export const Conversation = ({ className, ...props }: ConversationProps) => (
  <StickToBottom
    className={cn('relative flex-1 overflow-y-auto', className)}
    initial="smooth"
    resize="smooth"
    role="log"
    {...props}
  />
);

export type ConversationContentProps = ComponentProps<
  typeof StickToBottom.Content
>;

export const ConversationContent = ({
  className,
  ...props
}: ConversationContentProps) => (
  <StickToBottom.Content className={cn('p-4', className)} {...props} />
);

export type ConversationScrollButtonProps = ComponentProps<typeof Button>;

export const ConversationScrollButton = ({
  className,
  ...props
}: ConversationScrollButtonProps) => {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  const handleScrollToBottom = useCallback(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  return (
    !isAtBottom && (
      <Button
        className={cn(
          'absolute bottom-4 left-[50%] translate-x-[-50%] rounded-full',
          className,
        )}
        onClick={handleScrollToBottom}
        size="icon"
        type="button"
        variant="outline"
        {...props}
      >
        <ArrowDownIcon className="size-4" />
      </Button>
    )
  );
};

```

Install NPM dependencies:
```bash
lucide-react, use-stick-to-bottom
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
