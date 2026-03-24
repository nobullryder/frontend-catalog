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
ai-actions.tsx
 

import Image from "next/image"
import {
  CopyIcon,
  RefreshCcwIcon,
  ShareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react"

import { Action, Actions } from "@/components/ui/actions"
import {
  Conversation,
  ConversationContent,
} from "@/components/ui/conversation"
import { Message, MessageContent } from "@/components/ui/message"

const messages: {
  id: string
  from: "user" | "assistant"
  content: string
  avatar: string
  name: string
}[] = [
  {
    id: "1",
    from: "user",
    content: "Hello, how are you?",
    avatar: "https://github.com/evilrabbit.png",
    name: "Ali Imam",
  },
  {
    id: "2",
    from: "assistant",
    content: "I am fine, thank you!",
    avatar: "https://github.com/openai.png",
    name: "OpenAI",
  },
]
const Example = () => {
  const actions = [
    {
      icon: RefreshCcwIcon,
      label: "Retry",
    },
    {
      icon: ThumbsUpIcon,
      label: "Like",
    },
    {
      icon: ThumbsDownIcon,
      label: "Dislike",
    },
    {
      icon: CopyIcon,
      label: "Copy",
    },
    {
      icon: ShareIcon,
      label: "Share",
    },
  ]
  return (
    <div className="flex h-full w-full max-w-lg items-center justify-center">
      <Conversation className="relative w-full">
        <ConversationContent>
          {messages.map((message) => (
            <Message
              className={`flex flex-col gap-2 ${message.from === "assistant" ? "items-start" : "items-end"}`}
              from={message.from}
              key={message.id}
            >
              <Image
                src={message.avatar}
                alt={message.name}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
              />
              <MessageContent>{message.content}</MessageContent>
              {message.from === "assistant" && (
                <Actions className="mt-2">
                  {actions.map((action) => (
                    <Action key={action.label} label={action.label}>
                      <action.icon className="size-4" />
                    </Action>
                  ))}
                </Actions>
              )}
            </Message>
          ))}
        </ConversationContent>
      </Conversation>
    </div>
  )
}

export { Example }


code.demo.1756918230237.tsx
import { Example } from "@/components/ui/ai-actions";

export default function DemoOne() {
  return <Example />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/ai-actions.tsx
 

import Image from "next/image"
import {
  CopyIcon,
  RefreshCcwIcon,
  ShareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react"

import { Action, Actions } from "@/components/ui/actions"
import {
  Conversation,
  ConversationContent,
} from "@/components/ui/conversation"
import { Message, MessageContent } from "@/components/ui/message"

const messages: {
  id: string
  from: "user" | "assistant"
  content: string
  avatar: string
  name: string
}[] = [
  {
    id: "1",
    from: "user",
    content: "Hello, how are you?",
    avatar: "https://github.com/evilrabbit.png",
    name: "Ali Imam",
  },
  {
    id: "2",
    from: "assistant",
    content: "I am fine, thank you!",
    avatar: "https://github.com/openai.png",
    name: "OpenAI",
  },
]
const Example = () => {
  const actions = [
    {
      icon: RefreshCcwIcon,
      label: "Retry",
    },
    {
      icon: ThumbsUpIcon,
      label: "Like",
    },
    {
      icon: ThumbsDownIcon,
      label: "Dislike",
    },
    {
      icon: CopyIcon,
      label: "Copy",
    },
    {
      icon: ShareIcon,
      label: "Share",
    },
  ]
  return (
    <div className="flex h-full w-full max-w-lg items-center justify-center">
      <Conversation className="relative w-full">
        <ConversationContent>
          {messages.map((message) => (
            <Message
              className={`flex flex-col gap-2 ${message.from === "assistant" ? "items-start" : "items-end"}`}
              from={message.from}
              key={message.id}
            >
              <Image
                src={message.avatar}
                alt={message.name}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
              />
              <MessageContent>{message.content}</MessageContent>
              {message.from === "assistant" && (
                <Actions className="mt-2">
                  {actions.map((action) => (
                    <Action key={action.label} label={action.label}>
                      <action.icon className="size-4" />
                    </Action>
                  ))}
                </Actions>
              )}
            </Message>
          ))}
        </ConversationContent>
      </Conversation>
    </div>
  )
}

export { Example }

```

Install NPM dependencies:
```bash
next, lucide-react
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
