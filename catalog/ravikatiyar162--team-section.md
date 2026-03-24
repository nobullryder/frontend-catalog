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
team-section.tsx
import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility for classnames

// Define the type for each team member
interface TeamMember {
  name: string;
  image: string;
}

// Define the props for the component
export interface AnimatedTeamSectionProps {
  title: string;
  description: string;
  members: TeamMember[];
  className?: string;
}

// Helper function to calculate the final transform values for each card
const getCardState = (index: number, total: number) => {
  const centerIndex = (total - 1) / 2;
  const distanceFromCenter = index - centerIndex;

  // Horizontal spread to ensure cards are wide apart
  const x = distanceFromCenter * 90;
  // Vertical lift to form the curve
  const y = Math.abs(distanceFromCenter) * -30;
  // Rotation for the fanned effect
  const rotate = distanceFromCenter * 12;

  return { x, y, rotate };
};

const AnimatedTeamSection = React.forwardRef<
  HTMLDivElement,
  AnimatedTeamSectionProps
>(({ title, description, members, className, ...props }, ref) => {
  const controls = useAnimation();
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation for the container to stagger children
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // REBUILT ANIMATION LOGIC: Integrated positioning directly into framer-motion
  const itemVariants = {
    // All cards start at the center, scaled down
    hidden: { opacity: 0, scale: 0.5, x: 0, y: 0, rotate: 0 },
    // Animate to the final calculated position
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      x: getCardState(i, members.length).x,
      y: getCardState(i, members.length).y,
      rotate: getCardState(i, members.length).rotate,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    }),
  };

  return (
    <section
      ref={ref}
      className={cn("w-full py-20 lg:py-28 overflow-hidden", className)}
      {...props}
    >
      <div className="container mx-auto flex flex-col items-center text-center px-4">
        {/* Section Header */}
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
          {title}
        </h2>
        <p className="max-w-3xl text-muted-foreground md:text-xl">
          {description}
        </p>

        {/* Sized container for the absolute positioning */}
        <motion.div
          ref={inViewRef}
          className="relative mt-20 flex items-center justify-center"
          style={{ minHeight: "250px" }}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {members.map((member, index) => (
            <motion.div
              key={index}
              className="absolute w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-xl overflow-hidden shadow-lg border-2 border-background"
              custom={index} // Pass index to variants for calculation
              variants={itemVariants}
              // Set initial zIndex based on distance from center
              style={{ zIndex: members.length - Math.abs(index - (members.length - 1) / 2) }}
              whileHover={{
                scale: 1.1,
                zIndex: 99,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

AnimatedTeamSection.displayName = "AnimatedTeamSection";

export { AnimatedTeamSection };

code.demo.1758018648506.tsx
import { AnimatedTeamSection } from "@/components/ui/team-section";

// Sample data for the demo
const teamMembers = [
  {
    name: "Johnathan Doe",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Jane Smith",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Peter Jones",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Sarah Williams",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Michael Brown",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Emily Davis",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "David Garcia",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
  },
];

export default function AnimatedTeamSectionDemo() {
  return (
    <div className="w-full bg-background">
      <AnimatedTeamSection
        title="Our commitment to integrity and innovation"
        description="At TopOpti, we believe in forging strong partnerships build on integrity and honesty. Our mission is to drive innovation and ensure our clients success through dedicated service and creative solutions."
        members={teamMembers}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/team-section.tsx
import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility for classnames

// Define the type for each team member
interface TeamMember {
  name: string;
  image: string;
}

// Define the props for the component
export interface AnimatedTeamSectionProps {
  title: string;
  description: string;
  members: TeamMember[];
  className?: string;
}

// Helper function to calculate the final transform values for each card
const getCardState = (index: number, total: number) => {
  const centerIndex = (total - 1) / 2;
  const distanceFromCenter = index - centerIndex;

  // Horizontal spread to ensure cards are wide apart
  const x = distanceFromCenter * 90;
  // Vertical lift to form the curve
  const y = Math.abs(distanceFromCenter) * -30;
  // Rotation for the fanned effect
  const rotate = distanceFromCenter * 12;

  return { x, y, rotate };
};

const AnimatedTeamSection = React.forwardRef<
  HTMLDivElement,
  AnimatedTeamSectionProps
>(({ title, description, members, className, ...props }, ref) => {
  const controls = useAnimation();
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation for the container to stagger children
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // REBUILT ANIMATION LOGIC: Integrated positioning directly into framer-motion
  const itemVariants = {
    // All cards start at the center, scaled down
    hidden: { opacity: 0, scale: 0.5, x: 0, y: 0, rotate: 0 },
    // Animate to the final calculated position
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      x: getCardState(i, members.length).x,
      y: getCardState(i, members.length).y,
      rotate: getCardState(i, members.length).rotate,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    }),
  };

  return (
    <section
      ref={ref}
      className={cn("w-full py-20 lg:py-28 overflow-hidden", className)}
      {...props}
    >
      <div className="container mx-auto flex flex-col items-center text-center px-4">
        {/* Section Header */}
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
          {title}
        </h2>
        <p className="max-w-3xl text-muted-foreground md:text-xl">
          {description}
        </p>

        {/* Sized container for the absolute positioning */}
        <motion.div
          ref={inViewRef}
          className="relative mt-20 flex items-center justify-center"
          style={{ minHeight: "250px" }}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {members.map((member, index) => (
            <motion.div
              key={index}
              className="absolute w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-xl overflow-hidden shadow-lg border-2 border-background"
              custom={index} // Pass index to variants for calculation
              variants={itemVariants}
              // Set initial zIndex based on distance from center
              style={{ zIndex: members.length - Math.abs(index - (members.length - 1) / 2) }}
              whileHover={{
                scale: 1.1,
                zIndex: 99,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

AnimatedTeamSection.displayName = "AnimatedTeamSection";

export { AnimatedTeamSection };
```

Install NPM dependencies:
```bash
framer-motion, react-intersection-observer
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
