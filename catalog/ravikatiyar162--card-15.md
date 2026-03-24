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
card-15.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check, Send } from 'lucide-react';

// Define the props for the NotificationCard component
interface NotificationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  avatarSrc: string;
  avatarFallback: string;
  isOnline?: boolean;
  userName: string;
  userRole: string;
  message: string;
  timestamp: string;
  readStatus?: 'Read' | 'Unread';
  onReply?: () => void;
}

const NotificationCard = React.forwardRef<HTMLDivElement, NotificationCardProps>(
  (
    {
      className,
      title = 'Notifications',
      avatarSrc,
      avatarFallback,
      isOnline = false,
      userName,
      userRole,
      message,
      timestamp,
      readStatus = 'Unread',
      onReply,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className={cn(
          'w-full max-w-md overflow-hidden rounded-2xl border-none bg-card/80 p-2 shadow-lg backdrop-blur-sm animate-in fade-in-0 slide-in-from-bottom-4 duration-500',
          className
        )}
        {...props}
      >
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg font-semibold text-card-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex items-start justify-between space-x-4">
            {/* User Info Section */}
            <div className="flex-shrink-0">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={avatarSrc} alt={`${userName}'s avatar`} />
                  <AvatarFallback>{avatarFallback}</AvatarFallback>
                </Avatar>
                {isOnline && (
                  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-card bg-green-500" />
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-2">
                <p className="text-sm font-semibold text-card-foreground">{userName}</p>
                <p className="text-xs font-medium uppercase tracking-wider text-primary">{userRole} </p>
              </div>

              {/* Message Bubble */}
              <div className="mb-3 rounded-lg rounded-tl-none bg-muted p-3 text-sm text-muted-foreground">
                <p>{message}</p>
              </div>

              {/* Footer with Timestamp and Read Status */}
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{timestamp}</span>
                <span>&middot;</span>
                {readStatus === 'Read' && (
                  <>
                    <span>Read</span>
                    <Check className="h-3.5 w-3.5" />
                  </>
                )}
                {readStatus === 'Unread' && <span>Unread</span>}
              </div>
            </div>
            
            {/* Reply Button */}
            <div className="flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full transition-colors hover:bg-primary/10"
                onClick={onReply}
                aria-label="Reply to notification"
              >
                <Send className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);
NotificationCard.displayName = 'NotificationCard';

export { NotificationCard };

code.demo.1757859241094.tsx
import { NotificationCard } from '@/components/ui/card-15';

const NotificationCardDemo = () => {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center bg-background p-4">
      <NotificationCard
        title="Notifications"
        avatarSrc="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2960&auto=format&fit=crop"
        avatarFallback="CH"
        isOnline={true}
        userName="Charlie Herwitz"
        userRole="Product Director"
        message="Would you like them formatted for a specific use case, like a project management tool?"
        timestamp="5 mins"
        readStatus="Read"
        onReply={() => alert('Reply button clicked!')}
      />
    </div>
  );
};

export default NotificationCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-15.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check, Send } from 'lucide-react';

// Define the props for the NotificationCard component
interface NotificationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  avatarSrc: string;
  avatarFallback: string;
  isOnline?: boolean;
  userName: string;
  userRole: string;
  message: string;
  timestamp: string;
  readStatus?: 'Read' | 'Unread';
  onReply?: () => void;
}

const NotificationCard = React.forwardRef<HTMLDivElement, NotificationCardProps>(
  (
    {
      className,
      title = 'Notifications',
      avatarSrc,
      avatarFallback,
      isOnline = false,
      userName,
      userRole,
      message,
      timestamp,
      readStatus = 'Unread',
      onReply,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className={cn(
          'w-full max-w-md overflow-hidden rounded-2xl border-none bg-card/80 p-2 shadow-lg backdrop-blur-sm animate-in fade-in-0 slide-in-from-bottom-4 duration-500',
          className
        )}
        {...props}
      >
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg font-semibold text-card-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex items-start justify-between space-x-4">
            {/* User Info Section */}
            <div className="flex-shrink-0">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={avatarSrc} alt={`${userName}'s avatar`} />
                  <AvatarFallback>{avatarFallback}</AvatarFallback>
                </Avatar>
                {isOnline && (
                  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-card bg-green-500" />
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-2">
                <p className="text-sm font-semibold text-card-foreground">{userName}</p>
                <p className="text-xs font-medium uppercase tracking-wider text-primary">{userRole} </p>
              </div>

              {/* Message Bubble */}
              <div className="mb-3 rounded-lg rounded-tl-none bg-muted p-3 text-sm text-muted-foreground">
                <p>{message}</p>
              </div>

              {/* Footer with Timestamp and Read Status */}
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{timestamp}</span>
                <span>&middot;</span>
                {readStatus === 'Read' && (
                  <>
                    <span>Read</span>
                    <Check className="h-3.5 w-3.5" />
                  </>
                )}
                {readStatus === 'Unread' && <span>Unread</span>}
              </div>
            </div>
            
            {/* Reply Button */}
            <div className="flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full transition-colors hover:bg-primary/10"
                onClick={onReply}
                aria-label="Reply to notification"
              >
                <Send className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);
NotificationCard.displayName = 'NotificationCard';

export { NotificationCard };
```

Install NPM dependencies:
```bash
lucide-react, class-variance-authority
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
