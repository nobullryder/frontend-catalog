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
team-showcase.tsx
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names
import { Button } from "@/components/ui/button"; // Assuming a shadcn button component

// TypeScript interface for each team member
interface TeamMember {
  name: string;
  role: string;
  imageSrc: string;
  themeColor: string; // e.g., 'bg-[#F9D4D5]'
}

// Props for the main component
interface TeamShowcaseProps {
  title?: string;
  description?: string;
  buttonText?: string;
  members: TeamMember[];
}

const TeamShowcase = React.forwardRef<HTMLDivElement, TeamShowcaseProps>(
  (
    {
      title = "THE MAGIC DEVS YOU'VE BEEN SEARCHING FOR",
      description = "Why wasting time on so many different platforms for searching, interviewing and find out that it’s not a good fit? We do all of these for you. No more back and forth. Get matched today.",
      buttonText = "FIND YOUR DEVELOPER",
      members,
      className,
      ...props
    },
    ref
  ) => {
    // Animation variants for the container to stagger children
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
        },
      },
    };

    // Animation variants for each card
    const cardVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 10,
        },
      },
    };

    return (
      <section
        ref={ref}
        className={cn("w-full bg-background text-foreground py-16 px-4 md:px-8", className)}
        {...props}
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Header Section */}
          <div className="max-w-xl mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              {title}
            </h1>
            <p className="text-muted-foreground mb-8">{description}</p>
            <Button size="lg">{buttonText}</Button>
          </div>

          {/* Members Showcase Section */}
          <motion.div
            className="w-full flex justify-center items-end -space-x-8 md:space-x-4 px-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {members.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="w-full max-w-[200px] md:max-w-[250px]"
                  variants={cardVariants}
                  whileHover={{ y: -10, scale: 1.05, zIndex: 40 }}
                  style={{ zIndex: members.length - index }}
                >
                  <div
                    className={cn(
                      "relative pt-8 pb-4 px-4 rounded-t-[50%] h-[280px] md:h-[350px] flex flex-col items-center justify-between text-center overflow-hidden",
                      member.themeColor
                    )}
                  >
                    <div className="text-black">
                      <h3 className="font-bold text-sm md:text-base">{member.name}</h3>
                      <p className="text-xs md:text-sm opacity-80">{member.role}</p>
                    </div>
                    <img
                      src={member.imageSrc}
                      alt={member.name}
                      className="absolute bottom-0 left-0 w-full h-auto object-cover object-bottom"
                      style={{ maxHeight: "85%" }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    );
  }
);

TeamShowcase.displayName = "TeamShowcase";

export { TeamShowcase };
export type { TeamMember, TeamShowcaseProps };

code.demo.1760254552979.tsx
import { TeamShowcase, TeamMember } from "@/components/ui/team-showcase";

// Sample data for the demo
const developers: TeamMember[] = [
  {
    name: "ANNA DEAN",
    role: "React engineer",
    imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-WATlBiOtoeOqYDWnDEPanriLAznjm1.png&w=320&q=75",
    themeColor: "bg-[#F9D4D5]", // Light Pink
  },
  {
    name: "CHRIS MEZY",
    role: "Data engineer",
    imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-it2XL5AezhxG7WN3p4H9RCEHeT9QmS.png&w=320&q=75",
    themeColor: "bg-[#D1E5E6]", // Light Blue
  },
  {
    name: "LESLIE SCHNIDER",
    role: "Backend developer",
    imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-LLs9Xsn1aI6Y3OrY1OM6jwrLzoHfgU.png&w=320&q=75",
    themeColor: "bg-[#EAE1DA]", // Beige
  },
  {
    name: "JIM BRICKTON",
    role: "AI specialist",
    imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-wFE3oMCekBz2QDqsYZJoHqW80K9ruu.png&w=320&q=75",
    themeColor: "bg-[#FDEACC]", // Light Yellow
  },
];

export default function TeamShowcaseDemo() {
  return <TeamShowcase members={developers} />;
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/team-showcase.tsx
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names
import { Button } from "@/components/ui/button"; // Assuming a shadcn button component

// TypeScript interface for each team member
interface TeamMember {
  name: string;
  role: string;
  imageSrc: string;
  themeColor: string; // e.g., 'bg-[#F9D4D5]'
}

// Props for the main component
interface TeamShowcaseProps {
  title?: string;
  description?: string;
  buttonText?: string;
  members: TeamMember[];
}

const TeamShowcase = React.forwardRef<HTMLDivElement, TeamShowcaseProps>(
  (
    {
      title = "THE MAGIC DEVS YOU'VE BEEN SEARCHING FOR",
      description = "Why wasting time on so many different platforms for searching, interviewing and find out that it’s not a good fit? We do all of these for you. No more back and forth. Get matched today.",
      buttonText = "FIND YOUR DEVELOPER",
      members,
      className,
      ...props
    },
    ref
  ) => {
    // Animation variants for the container to stagger children
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
        },
      },
    };

    // Animation variants for each card
    const cardVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 10,
        },
      },
    };

    return (
      <section
        ref={ref}
        className={cn("w-full bg-background text-foreground py-16 px-4 md:px-8", className)}
        {...props}
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Header Section */}
          <div className="max-w-xl mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              {title}
            </h1>
            <p className="text-muted-foreground mb-8">{description}</p>
            <Button size="lg">{buttonText}</Button>
          </div>

          {/* Members Showcase Section */}
          <motion.div
            className="w-full flex justify-center items-end -space-x-8 md:space-x-4 px-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {members.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="w-full max-w-[200px] md:max-w-[250px]"
                  variants={cardVariants}
                  whileHover={{ y: -10, scale: 1.05, zIndex: 40 }}
                  style={{ zIndex: members.length - index }}
                >
                  <div
                    className={cn(
                      "relative pt-8 pb-4 px-4 rounded-t-[50%] h-[280px] md:h-[350px] flex flex-col items-center justify-between text-center overflow-hidden",
                      member.themeColor
                    )}
                  >
                    <div className="text-black">
                      <h3 className="font-bold text-sm md:text-base">{member.name}</h3>
                      <p className="text-xs md:text-sm opacity-80">{member.role}</p>
                    </div>
                    <img
                      src={member.imageSrc}
                      alt={member.name}
                      className="absolute bottom-0 left-0 w-full h-auto object-cover object-bottom"
                      style={{ maxHeight: "85%" }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    );
  }
);

TeamShowcase.displayName = "TeamShowcase";

export { TeamShowcase };
export type { TeamMember, TeamShowcaseProps };
```

Install NPM dependencies:
```bash
framer-motion
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
