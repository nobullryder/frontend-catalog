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
community-hub-card.tsx
'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Book, Check, Copy } from 'lucide-react';

// Shadcn UI Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// Prop Types for the component
interface CommunityHubCardProps {
  // Main card details
  title: string;
  subtitle: string;
  memberCount: number;
  members: {
    src: string;
    alt: string;
    fallback: string;
  }[];

  // Invite section details
  inviteLink: string;

  // Current progress details
  currentBook: {
    title: string;
    progress: number;
  };

  // Upcoming books list
  upcomingBooks: {
    title: string;
    author: string;
  }[];

  className?: string;
}

/**
 * A responsive and animated card component to display community information.
 * It's built with shadcn/ui and styled with Tailwind CSS.
 * Animations are handled by framer-motion.
 */
export function CommunityHubCard({
  title,
  subtitle,
  memberCount,
  members,
  inviteLink,
  currentBook,
  upcomingBooks,
  className,
}: CommunityHubCardProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  // Function to handle copying the invite link
  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000); // Reset after 2 seconds
    });
  };

  // Animation variants for framer-motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className={cn('overflow-hidden border-2', className)}>
        <CardHeader className="text-center p-6">
          <motion.h1 variants={itemVariants} className="text-2xl font-bold tracking-tight">
            {title}
          </motion.h1>
          <motion.p variants={itemVariants} className="text-sm text-muted-foreground">
            {subtitle}
          </motion.p>
          <motion.div variants={itemVariants} className="flex justify-center -space-x-2 my-4">
            {members.map((member, index) => (
              <Avatar key={index} className="border-2 border-background">
                <AvatarImage src={member.src} alt={member.alt} />
                <AvatarFallback>{member.fallback}</AvatarFallback>
              </Avatar>
            ))}
          </motion.div>
          <motion.p variants={itemVariants} className="text-sm font-medium">
            Current Members: {memberCount.toLocaleString()}
          </motion.p>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <Separator />

          {/* Expand Your Bookshelf Section */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h2 className="font-semibold">Expand Your Bookshelf</h2>
            <p className="text-sm text-muted-foreground">
              Invite bibliophiles to join our book club and discover new worlds together!
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input value={inviteLink} readOnly className="flex-grow" aria-label="Invite Link" />
              <Button onClick={copyToClipboard} className="w-full sm:w-auto">
                {hasCopied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {hasCopied ? 'Copied!' : 'Copy Invite Link'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Get a free bestseller for every friend who joins!
            </p>
          </motion.div>

          <Separator />

          {/* Current Book Progress Section */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h2 className="font-semibold">Current Book Progress</h2>
            <div className="relative w-full">
              <Progress value={currentBook.progress} className="h-2" />
              {/* Animated progress bar indicator */}
              <motion.div
                className="absolute top-0 h-2 rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${currentBook.progress}%` }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium text-foreground">{currentBook.title}</span>
              <span className="text-muted-foreground">Club average: {currentBook.progress}% complete</span>
            </div>
          </motion.div>

          <Separator />

          {/* Upcoming Books Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="font-semibold">Upcoming Books</h2>
            <ul className="space-y-3">
              {upcomingBooks.map((book, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-3 text-sm"
                >
                  <div className="p-1.5 bg-muted rounded-md">
                    <Book className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span>
                    <span className="font-medium text-foreground">"{book.title}"</span> by {book.author}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

code.demo.1758994727734.tsx
import { CommunityHubCard } from '@/components/ui/community-hub-card';

// Mock data to populate the component
const communityData = {
  title: 'Readers Unite',
  subtitle: 'Your gateway to literary adventures',
  memberCount: 1234,
  members: [
    { src: 'https://i.pravatar.cc/150?img=1', alt: 'Member 1', fallback: 'M1' },
    { src: 'https://i.pravatar.cc/150?img=2', alt: 'Member 2', fallback: 'M2' },
    { src: 'https://i.pravatar.cc/150?img=3', alt: 'Member 3', fallback: 'M3' },
    { src: 'https://i.pravatar.cc/150?img=4', alt: 'Member 4', fallback: 'M4' },
  ],
  inviteLink: 'https://readersunite.com/invite/Bk7LA3G',
  currentBook: {
    title: 'The Great Gatsby',
    progress: 65,
  },
  upcomingBooks: [
    { title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { title: '1984', author: 'George Orwell' },
    { title: 'Pride and Prejudice', author: 'Jane Austen' },
  ],
};

/**
 * A demo page to showcase the CommunityHubCard component.
 * It passes mock data to the component to render a realistic preview.
 */
export default function CommunityHubCardDemo() {
  return (
    <div className="flex items-center justify-center bg-background p-4 md:p-8 min-h-screen">
      <CommunityHubCard
        title={communityData.title}
        subtitle={communityData.subtitle}
        memberCount={communityData.memberCount}
        members={communityData.members}
        inviteLink={communityData.inviteLink}
        currentBook={communityData.currentBook}
        upcomingBooks={communityData.upcomingBooks}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/community-hub-card.tsx
'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Book, Check, Copy } from 'lucide-react';

// Shadcn UI Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// Prop Types for the component
interface CommunityHubCardProps {
  // Main card details
  title: string;
  subtitle: string;
  memberCount: number;
  members: {
    src: string;
    alt: string;
    fallback: string;
  }[];

  // Invite section details
  inviteLink: string;

  // Current progress details
  currentBook: {
    title: string;
    progress: number;
  };

  // Upcoming books list
  upcomingBooks: {
    title: string;
    author: string;
  }[];

  className?: string;
}

/**
 * A responsive and animated card component to display community information.
 * It's built with shadcn/ui and styled with Tailwind CSS.
 * Animations are handled by framer-motion.
 */
export function CommunityHubCard({
  title,
  subtitle,
  memberCount,
  members,
  inviteLink,
  currentBook,
  upcomingBooks,
  className,
}: CommunityHubCardProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  // Function to handle copying the invite link
  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000); // Reset after 2 seconds
    });
  };

  // Animation variants for framer-motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className={cn('overflow-hidden border-2', className)}>
        <CardHeader className="text-center p-6">
          <motion.h1 variants={itemVariants} className="text-2xl font-bold tracking-tight">
            {title}
          </motion.h1>
          <motion.p variants={itemVariants} className="text-sm text-muted-foreground">
            {subtitle}
          </motion.p>
          <motion.div variants={itemVariants} className="flex justify-center -space-x-2 my-4">
            {members.map((member, index) => (
              <Avatar key={index} className="border-2 border-background">
                <AvatarImage src={member.src} alt={member.alt} />
                <AvatarFallback>{member.fallback}</AvatarFallback>
              </Avatar>
            ))}
          </motion.div>
          <motion.p variants={itemVariants} className="text-sm font-medium">
            Current Members: {memberCount.toLocaleString()}
          </motion.p>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <Separator />

          {/* Expand Your Bookshelf Section */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h2 className="font-semibold">Expand Your Bookshelf</h2>
            <p className="text-sm text-muted-foreground">
              Invite bibliophiles to join our book club and discover new worlds together!
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input value={inviteLink} readOnly className="flex-grow" aria-label="Invite Link" />
              <Button onClick={copyToClipboard} className="w-full sm:w-auto">
                {hasCopied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {hasCopied ? 'Copied!' : 'Copy Invite Link'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Get a free bestseller for every friend who joins!
            </p>
          </motion.div>

          <Separator />

          {/* Current Book Progress Section */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h2 className="font-semibold">Current Book Progress</h2>
            <div className="relative w-full">
              <Progress value={currentBook.progress} className="h-2" />
              {/* Animated progress bar indicator */}
              <motion.div
                className="absolute top-0 h-2 rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${currentBook.progress}%` }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium text-foreground">{currentBook.title}</span>
              <span className="text-muted-foreground">Club average: {currentBook.progress}% complete</span>
            </div>
          </motion.div>

          <Separator />

          {/* Upcoming Books Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="font-semibold">Upcoming Books</h2>
            <ul className="space-y-3">
              {upcomingBooks.map((book, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-3 text-sm"
                >
                  <div className="p-1.5 bg-muted rounded-md">
                    <Book className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span>
                    <span className="font-medium text-foreground">"{book.title}"</span> by {book.author}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
```

Install NPM dependencies:
```bash
lucide-react, framer-motion
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
