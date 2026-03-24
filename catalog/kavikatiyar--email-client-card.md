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
email-client-card.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming you have a utils file for `cn`

// ShadCN UI Primitives (install via CLI)
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const cardVariants = cva(
  'w-full max-w-2xl mx-auto rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col transition-colors',
  {
    variants: {
      isExpanded: {
        true: 'h-auto',
        false: 'h-auto', // Placeholder for potential collapsed styles
      },
    },
    defaultVariants: {
      isExpanded: true,
    },
  },
);

export interface EmailClientCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  avatarSrc: string;
  avatarFallback: string;
  senderName: string;
  senderEmail: string;
  timestamp: string;
  message: string;
  actions?: React.ReactNode[];
  reactions?: string[];
  onReactionClick?: (reaction: string) => void;
  onActionClick?: (index: number) => void;
}

const EmailClientCard = React.forwardRef<HTMLDivElement, EmailClientCardProps>(
  (
    {
      className,
      avatarSrc,
      avatarFallback,
      senderName,
      senderEmail,
      timestamp,
      message,
      actions = [],
      reactions = [],
      onReactionClick,
      onActionClick,
      isExpanded,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = React.useState('');

    const containerVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          staggerChildren: 0.05,
        },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ isExpanded }), className)}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        {...props}
      >
        {/* Card Header */}
        <motion.div
          className="p-4 sm:p-6 flex items-start gap-4 border-b"
          variants={itemVariants}
        >
          <Avatar className="w-10 h-10 border">
            <AvatarImage src={avatarSrc} alt={senderName} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <p className="font-semibold text-card-foreground">{senderName}</p>
            <p className="text-sm text-muted-foreground">{senderEmail}</p>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs hidden sm:inline">{timestamp}</span>
            {actions.map((action, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => onActionClick?.(index)}
                  aria-label={`Action ${index + 1}`}
                >
                  {action}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Card Body */}
        <motion.div
          className="p-4 sm:p-6 text-sm text-foreground/90 leading-relaxed"
          variants={itemVariants}
        >
          <p>{message}</p>
        </motion.div>

        {/* Card Footer with Reply */}
        <motion.div
          className="p-3 sm:p-4 mt-auto border-t bg-muted/50"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Type here..."
              className="flex-grow bg-background focus-visible:ring-1 focus-visible:ring-offset-0"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="flex items-center gap-1">
              {reactions.map((reaction, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-xl"
                    onClick={() => onReactionClick?.(reaction)}
                    aria-label={`React with ${reaction}`}
                  >
                    {reaction}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  },
);

EmailClientCard.displayName = 'EmailClientCard';

export { EmailClientCard, cardVariants };

code.demo.1760156484045.tsx
import { EmailClientCard } from '@/components/ui/email-client-card';
import { Send, Trash, Plus } from 'lucide-react';

const EmailClientCardDemo = () => {
  // Sample data to populate the component
  const emailData = {
    avatarSrc: 'https://i.pravatar.cc/150',
    avatarFallback: 'SL',
    senderName: 'Samantha Lusan',
    senderEmail: 'samantha@icloud.com',
    timestamp: 'Yesterday, 10:12 am',
    message:
      "Yes, they've introduced new APIs for smoother and more dynamic animations. The enhancements to the core animation framework will make it easier to create more engaging user experiences.",
    reactions: ['😍', '❤️', '🔥', '⚡️', '👍'],
  };

  const handleReaction = (reaction: string) => {
    console.log(`Reacted with: ${reaction}`);
    // Add logic to handle the reaction
  };

  const handleAction = (index: number) => {
    const action = ['Send', 'Delete'][index];
    console.log(`Action clicked: ${action}`);
    // Add logic for actions
  };

  return (
    <div className="flex items-center justify-center h-full w-full p-4 bg-background">
      <EmailClientCard
        avatarSrc={emailData.avatarSrc}
        avatarFallback={emailData.avatarFallback}
        senderName={emailData.senderName}
        senderEmail={emailData.senderEmail}
        timestamp={emailData.timestamp}
        message={emailData.message}
        reactions={emailData.reactions}
        onReactionClick={handleReaction}
        onActionClick={handleAction}
        actions={[
          <Send key="send" className="w-4 h-4" />,
          <Trash key="trash" className="w-4 h-4" />,
        ]}
      />
    </div>
  );
};

export default EmailClientCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/email-client-card.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming you have a utils file for `cn`

// ShadCN UI Primitives (install via CLI)
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const cardVariants = cva(
  'w-full max-w-2xl mx-auto rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col transition-colors',
  {
    variants: {
      isExpanded: {
        true: 'h-auto',
        false: 'h-auto', // Placeholder for potential collapsed styles
      },
    },
    defaultVariants: {
      isExpanded: true,
    },
  },
);

export interface EmailClientCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  avatarSrc: string;
  avatarFallback: string;
  senderName: string;
  senderEmail: string;
  timestamp: string;
  message: string;
  actions?: React.ReactNode[];
  reactions?: string[];
  onReactionClick?: (reaction: string) => void;
  onActionClick?: (index: number) => void;
}

const EmailClientCard = React.forwardRef<HTMLDivElement, EmailClientCardProps>(
  (
    {
      className,
      avatarSrc,
      avatarFallback,
      senderName,
      senderEmail,
      timestamp,
      message,
      actions = [],
      reactions = [],
      onReactionClick,
      onActionClick,
      isExpanded,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = React.useState('');

    const containerVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          staggerChildren: 0.05,
        },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ isExpanded }), className)}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        {...props}
      >
        {/* Card Header */}
        <motion.div
          className="p-4 sm:p-6 flex items-start gap-4 border-b"
          variants={itemVariants}
        >
          <Avatar className="w-10 h-10 border">
            <AvatarImage src={avatarSrc} alt={senderName} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <p className="font-semibold text-card-foreground">{senderName}</p>
            <p className="text-sm text-muted-foreground">{senderEmail}</p>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs hidden sm:inline">{timestamp}</span>
            {actions.map((action, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => onActionClick?.(index)}
                  aria-label={`Action ${index + 1}`}
                >
                  {action}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Card Body */}
        <motion.div
          className="p-4 sm:p-6 text-sm text-foreground/90 leading-relaxed"
          variants={itemVariants}
        >
          <p>{message}</p>
        </motion.div>

        {/* Card Footer with Reply */}
        <motion.div
          className="p-3 sm:p-4 mt-auto border-t bg-muted/50"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Type here..."
              className="flex-grow bg-background focus-visible:ring-1 focus-visible:ring-offset-0"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="flex items-center gap-1">
              {reactions.map((reaction, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-xl"
                    onClick={() => onReactionClick?.(reaction)}
                    aria-label={`React with ${reaction}`}
                  >
                    {reaction}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  },
);

EmailClientCard.displayName = 'EmailClientCard';

export { EmailClientCard, cardVariants };
```

Install NPM dependencies:
```bash
framer-motion, class-variance-authority
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
