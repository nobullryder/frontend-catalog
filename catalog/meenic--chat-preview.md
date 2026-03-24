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
chat-preview.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Message {
  avatar?: string;
  avatarBackground?: string;
  username: string;
  content: string;
  color?: string;
  duration: number;
  timestamp?: number;
}

interface Channel {
  name: string;
  description: string;
}

type Variations = "default" | "compact" | "expanded";

interface ChatPreviewProps {
  messages?: Message[];
  channel?: Channel;
  maxMessages?: number;
  className?: string;
  gradientBackground?: boolean;
  variation?: Variations;
  removeShadow?: boolean;
  theme?: {
    background?: string;
    border?: string;
    textColor?: string;
    avatarSize?: string;
  };
}

const defaultTheme = {
  background: "bg-background/50",
  border: "border border-foreground/10",
  textColor: "text-foreground/90",
  avatarSize: "w-7 h-7 sm:w-8 sm:h-8",
};

export function ChatPreview({
  messages = defaultMessages,
  channel = defaultChannel,
  maxMessages = 3,
  className,
  gradientBackground = true,
  variation = "default",
  removeShadow = false,
  theme = defaultTheme,
}: ChatPreviewProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const addMessage = () => {
      const newMessage = {
        ...messages[currentIndexRef.current],
        timestamp: Date.now(),
      };
      currentIndexRef.current = (currentIndexRef.current + 1) % messages.length;

      setVisibleMessages((prev) => [...prev, newMessage].slice(-maxMessages));

      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(addMessage, newMessage.duration);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          currentIndexRef.current = 0;
          setVisibleMessages([]);
          addMessage();
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setVisibleMessages([]);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [messages, maxMessages]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex-1 w-full max-w-[500px]",
        variation === "compact" && "max-w-[350px]",
        variation === "expanded" && "max-w-[700px]",
        className
      )}
    >
      {gradientBackground && (
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 rounded-2xl blur-2xl opacity-75" />
      )}

      <div
        className={cn(
          "relative rounded-2xl overflow-hidden backdrop-blur-xl flex flex-col",
          !removeShadow && "shadow-2xl",
          theme.border,
          theme.background
        )}
      >
        <div className="border-b px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[13px] sm:text-sm">
              #{channel.name}
            </span>
            <span className="text-muted-foreground">|</span>
            <span className="text-muted-foreground truncate flex-1 text-[13px] sm:text-sm">
              {channel.description}
            </span>
          </div>
        </div>

        <div className="p-2.5 pt-0 sm:p-4 sm:pt-0 flex flex-col justify-end relative h-[calc(64px*3+16px)] sm:h-[calc(52px*3+24px)]">
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-background/50 to-transparent pointer-events-none" />
          <div className="flex flex-col justify-end gap-2 sm:gap-3 overflow-hidden">
            {visibleMessages.map((message) => (
              <div
                key={message.timestamp}
                className={cn(
                  "flex items-start gap-2 sm:gap-3",
                  message === visibleMessages[visibleMessages.length - 1] &&
                    "animate-message-appear"
                )}
              >
                <div
                  className={cn(
                    "rounded-full flex-shrink-0 relative overflow-hidden",
                    theme.avatarSize,
                    !message.avatar &&
                      (message.avatarBackground ?? "bg-gray-500/30")
                  )}
                >
                  {message.avatar && (
                    <Image
                      src={message.avatar}
                      alt={`${message.username}'s avatar`}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "font-medium text-[13px] sm:text-sm",
                        message.color ?? "text-foreground"
                      )}
                    >
                      {message.username}
                    </span>
                    <span className="text-muted-foreground shrink-0 text-[11px] sm:text-xs">
                      just now
                    </span>
                  </div>
                  <p className={cn(theme.textColor, "text-[13px] sm:text-sm")}>
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const defaultChannel: Channel = {
  name: "creative-writing",
  description: "Share your verses and artistic expressions.",
};

const defaultMessages: Message[] = [
  {
    avatarBackground: "bg-blue-500/30",
    username: "TechPoet",
    content: "In the realm of web, where Next.js shines bright,",
    color: "text-blue-400",
    duration: 3000,
  },
  {
    avatarBackground: "bg-red-500/30",
    username: "ReactBard",
    content: "React components dance in the night,",
    color: "text-pink-400",
    duration: 2000,
  },
  {
    avatarBackground: "bg-green-500/30",
    username: "CodeScribe",
    content: "With hooks and state, we build with care,",
    color: "text-green-400",
    duration: 3500,
  },
  {
    avatarBackground: "bg-yellow-500/30",
    username: "WebVerse",
    content: "Server-side rendering, beyond compare!",
    color: "text-yellow-400",
    duration: 2000,
  },
  {
    avatarBackground: "bg-purple-500/30",
    username: "DevRhymer",
    content: "Static pages load in a flash,",
    color: "text-purple-400",
    duration: 3500,
  },
  {
    avatarBackground: "bg-indigo-500/30",
    username: "JSPoet",
    content: "While TypeScript keeps our code from crash,",
    color: "text-indigo-400",
    duration: 2000,
  },
  {
    avatarBackground: "bg-red-500/30",
    username: "VerseWriter",
    content: "Next.js and React, a perfect pair,",
    color: "text-red-400",
    duration: 3500,
  },
  {
    avatarBackground: "bg-teal-500/30",
    username: "ByteBard",
    content: "Creating apps with modern flair!",
    color: "text-teal-400",
    duration: 2500,
  },
];


code.demo.tsx
import { ChatPreview } from "@/components/ui/chat-preview"

function DefaultChatPreview() {
  return <ChatPreview />;
}

function CompactChatPreview() {
  return (
    <ChatPreview
      variation="compact"
      channel={{
        name: "compact-chat",
        description: "A smaller version of the chat preview.",
      }}
    />
  );
}

function ExpandedChatPreview() {
  return (
    <ChatPreview
      variation="expanded"
      channel={{
        name: "expanded-chat",
        description: "A wider version with custom styling",
      }}
    />
  );
}

function CustomizedChatPreview() {
  const customMessages = [
    {
      avatarBackground: "bg-gradient-to-r from-pink-500 to-purple-500",
      username: "CustomUser",
      content: "This is a custom styled chat preview!",
      color: "text-pink-400",
      duration: 3000,
    },
    {
      avatarBackground: "bg-gradient-to-r from-blue-500 to-cyan-500",
      username: "StyleMaster",
      content: "With gradient backgrounds and custom colors",
      color: "text-blue-400",
      duration: 2500,
    },
  ];

  return (
    <ChatPreview
      messages={customMessages}
      maxMessages={2}
      gradientBackground={false}
      channel={{
        name: "custom-style",
        description: "Showcasing custom styling options",
      }}
      theme={{
        background: "bg-zinc-900/90",
        border: "border border-zinc-700",
        textColor: "text-zinc-100",
        avatarSize: "w-8 h-8",
      }}
      className="w-full"
    />
  );
}

function NotificationChatPreview() {
  const notifications = [
    {
      avatarBackground: "bg-gradient-to-r from-green-500 to-emerald-500",
      username: "System",
      content: "✅ Deploy successful: Production v2.1.0",
      color: "text-green-400",
      duration: 3000,
    },
    {
      avatarBackground: "bg-gradient-to-r from-yellow-500 to-orange-500",
      username: "Monitor",
      content: "⚠️ High CPU usage detected on server-01",
      color: "text-yellow-400",
      duration: 2500,
    },
    {
      avatarBackground: "bg-gradient-to-r from-blue-500 to-cyan-500",
      username: "Updates",
      content: "📦 New packages available for installation",
      color: "text-blue-400",
      duration: 2800,
    },
  ];

  return (
    <ChatPreview
      messages={notifications}
      variation="compact"
      gradientBackground={false}
      channel={{
        name: "system-notifications",
        description: "Real-time system updates",
      }}
      theme={{
        background: "bg-black/90",
        border: "border border-zinc-800",
        textColor: "text-zinc-100",
        avatarSize: "w-6 h-6",
      }}
    />
  );
}

export {
  DefaultChatPreview,
  CompactChatPreview,
  ExpandedChatPreview,
  CustomizedChatPreview,
  NotificationChatPreview,
};

```

Copy-paste these files for dependencies:
```tsx
/components/ui/chat-preview.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Message {
  avatar?: string;
  avatarBackground?: string;
  username: string;
  content: string;
  color?: string;
  duration: number;
  timestamp?: number;
}

interface Channel {
  name: string;
  description: string;
}

type Variations = "default" | "compact" | "expanded";

interface ChatPreviewProps {
  messages?: Message[];
  channel?: Channel;
  maxMessages?: number;
  className?: string;
  gradientBackground?: boolean;
  variation?: Variations;
  removeShadow?: boolean;
  theme?: {
    background?: string;
    border?: string;
    textColor?: string;
    avatarSize?: string;
  };
}

const defaultTheme = {
  background: "bg-background/50",
  border: "border border-foreground/10",
  textColor: "text-foreground/90",
  avatarSize: "w-7 h-7 sm:w-8 sm:h-8",
};

export function ChatPreview({
  messages = defaultMessages,
  channel = defaultChannel,
  maxMessages = 3,
  className,
  gradientBackground = true,
  variation = "default",
  removeShadow = false,
  theme = defaultTheme,
}: ChatPreviewProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const addMessage = () => {
      const newMessage = {
        ...messages[currentIndexRef.current],
        timestamp: Date.now(),
      };
      currentIndexRef.current = (currentIndexRef.current + 1) % messages.length;

      setVisibleMessages((prev) => [...prev, newMessage].slice(-maxMessages));

      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(addMessage, newMessage.duration);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          currentIndexRef.current = 0;
          setVisibleMessages([]);
          addMessage();
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setVisibleMessages([]);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [messages, maxMessages]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex-1 w-full max-w-[500px]",
        variation === "compact" && "max-w-[350px]",
        variation === "expanded" && "max-w-[700px]",
        className
      )}
    >
      {gradientBackground && (
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 rounded-2xl blur-2xl opacity-75" />
      )}

      <div
        className={cn(
          "relative rounded-2xl overflow-hidden backdrop-blur-xl flex flex-col",
          !removeShadow && "shadow-2xl",
          theme.border,
          theme.background
        )}
      >
        <div className="border-b px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[13px] sm:text-sm">
              #{channel.name}
            </span>
            <span className="text-muted-foreground">|</span>
            <span className="text-muted-foreground truncate flex-1 text-[13px] sm:text-sm">
              {channel.description}
            </span>
          </div>
        </div>

        <div className="p-2.5 pt-0 sm:p-4 sm:pt-0 flex flex-col justify-end relative h-[calc(64px*3+16px)] sm:h-[calc(52px*3+24px)]">
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-background/50 to-transparent pointer-events-none" />
          <div className="flex flex-col justify-end gap-2 sm:gap-3 overflow-hidden">
            {visibleMessages.map((message) => (
              <div
                key={message.timestamp}
                className={cn(
                  "flex items-start gap-2 sm:gap-3",
                  message === visibleMessages[visibleMessages.length - 1] &&
                    "animate-message-appear"
                )}
              >
                <div
                  className={cn(
                    "rounded-full flex-shrink-0 relative overflow-hidden",
                    theme.avatarSize,
                    !message.avatar &&
                      (message.avatarBackground ?? "bg-gray-500/30")
                  )}
                >
                  {message.avatar && (
                    <Image
                      src={message.avatar}
                      alt={`${message.username}'s avatar`}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "font-medium text-[13px] sm:text-sm",
                        message.color ?? "text-foreground"
                      )}
                    >
                      {message.username}
                    </span>
                    <span className="text-muted-foreground shrink-0 text-[11px] sm:text-xs">
                      just now
                    </span>
                  </div>
                  <p className={cn(theme.textColor, "text-[13px] sm:text-sm")}>
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const defaultChannel: Channel = {
  name: "creative-writing",
  description: "Share your verses and artistic expressions.",
};

const defaultMessages: Message[] = [
  {
    avatarBackground: "bg-blue-500/30",
    username: "TechPoet",
    content: "In the realm of web, where Next.js shines bright,",
    color: "text-blue-400",
    duration: 3000,
  },
  {
    avatarBackground: "bg-red-500/30",
    username: "ReactBard",
    content: "React components dance in the night,",
    color: "text-pink-400",
    duration: 2000,
  },
  {
    avatarBackground: "bg-green-500/30",
    username: "CodeScribe",
    content: "With hooks and state, we build with care,",
    color: "text-green-400",
    duration: 3500,
  },
  {
    avatarBackground: "bg-yellow-500/30",
    username: "WebVerse",
    content: "Server-side rendering, beyond compare!",
    color: "text-yellow-400",
    duration: 2000,
  },
  {
    avatarBackground: "bg-purple-500/30",
    username: "DevRhymer",
    content: "Static pages load in a flash,",
    color: "text-purple-400",
    duration: 3500,
  },
  {
    avatarBackground: "bg-indigo-500/30",
    username: "JSPoet",
    content: "While TypeScript keeps our code from crash,",
    color: "text-indigo-400",
    duration: 2000,
  },
  {
    avatarBackground: "bg-red-500/30",
    username: "VerseWriter",
    content: "Next.js and React, a perfect pair,",
    color: "text-red-400",
    duration: 3500,
  },
  {
    avatarBackground: "bg-teal-500/30",
    username: "ByteBard",
    content: "Creating apps with modern flair!",
    color: "text-teal-400",
    duration: 2500,
  },
];

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
