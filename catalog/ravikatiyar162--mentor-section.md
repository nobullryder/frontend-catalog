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
mentor-section.tsx
// components/ui/mentors-section.tsx
import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; // Your utility for merging class names

// --- TYPE DEFINITIONS ---
interface Mentor {
  id: number;
  name: string;
  role: string;
  category: string;
  gigs: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  description: string;
}

interface MentorsSectionProps {
  mentors: Mentor[];
  categories: string[];
}

// --- SUB-COMPONENTS ---

// A single mentor card with hover animation
const MentorCard = ({ mentor }: { mentor: Mentor }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
    className="relative flex flex-col overflow-hidden rounded-xl border bg-card p-6 text-card-foreground shadow-sm"
  >
    {/* Bookmark Icon */}
    <button className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/60 backdrop-blur-sm transition-colors hover:bg-muted">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>
    </button>
    
    <div className="mb-4 aspect-[4/3] overflow-hidden rounded-lg">
      <img src={mentor.imageUrl} alt={mentor.name} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
    </div>
    
    <h3 className="text-lg font-semibold">{mentor.name}</h3>
    <p className="text-sm text-muted-foreground">{mentor.role} &middot; {mentor.gigs} Gigs</p>
    
    <div className="my-3 flex items-center gap-2">
      <span className="font-bold text-lg">{mentor.rating.toFixed(1)}</span>
      <div className="flex text-muted-foreground">
        {/* Simple star rating representation */}
        {[...Array(5)].map((_, i) => (
          <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={i < Math.round(mentor.rating) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn(i < Math.round(mentor.rating) ? "text-primary" : "text-muted-foreground/50")}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        ))}
      </div>
      <span className="text-xs text-muted-foreground uppercase">({mentor.reviews} Reviews)</span>
    </div>

    <p className="text-sm text-muted-foreground flex-grow">{mentor.description}</p>
  </motion.div>
);

// --- MAIN COMPONENT ---
export const MentorsSection = ({ mentors, categories }: MentorsSectionProps) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredMentors = activeCategory === "All"
    ? mentors
    : mentors.filter((mentor) => mentor.category === activeCategory);

  return (
    <section className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h2 className="text-4xl font-serif text-foreground mb-4 sm:mb-0">Mentors</h2>
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {["All", ...categories].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Animated Mentor Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredMentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

code.demo.1760170282295.tsx
// demo.tsx
import { MentorsSection } from "@/components/ui/mentor-section";

const mentorData = [
  {
    id: 1,
    name: "Benyamin Rolocov",
    role: "Python Developer",
    category: "Science & Engineering",
    gigs: 8,
    rating: 5.0,
    reviews: 126,
    imageUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=2080&auto=format&fit=crop",
    description: "Learn from industry professionals offering their services.",
  },
  {
    id: 2,
    name: "Alexandra Chabon",
    role: "Graphic Designer",
    category: "Graphic Design",
    gigs: 32,
    rating: 4.9,
    reviews: 154,
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    description: "Creative guidance from seasoned design experts.",
  },
  {
    id: 3,
    name: "Rezchwag Shibana",
    role: "Strategist & Manager",
    category: "Sustainability",
    gigs: 79,
    rating: 4.8,
    reviews: 231,
    imageUrl: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=1974&auto=format&fit=crop",
    description: "Expert insights for sustainable business growth.",
  },
  {
    id: 4,
    name: "Zhang Chiano",
    role: "SEO Specialist",
    category: "Science & Engineering",
    gigs: 2,
    rating: 3.8,
    reviews: 16,
    imageUrl: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1974&auto=format&fit=crop",
    description: "Unlock your website's potential with proven SEO techniques.",
  },
   {
    id: 5,
    name: "Dr. Evelyn Reed",
    role: "AI Researcher",
    category: "Science & Engineering",
    gigs: 15,
    rating: 4.9,
    reviews: 98,
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    description: "Dive deep into machine learning with a leading researcher.",
  },
  {
    id: 6,
    name: "Marco Verratti",
    role: "UI/UX Lead",
    category: "Graphic Design",
    gigs: 41,
    rating: 4.9,
    reviews: 310,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    description: "Design user-centric interfaces that people love to use.",
  },
];

const categoryData = ["Science & Engineering", "Graphic Design", "Sustainability"];

export default function MentorPageDemo() {
  return (
    <div className="w-full bg-background">
      <MentorsSection mentors={mentorData} categories={categoryData} />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/mentor-section.tsx
// components/ui/mentors-section.tsx
import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; // Your utility for merging class names

// --- TYPE DEFINITIONS ---
interface Mentor {
  id: number;
  name: string;
  role: string;
  category: string;
  gigs: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  description: string;
}

interface MentorsSectionProps {
  mentors: Mentor[];
  categories: string[];
}

// --- SUB-COMPONENTS ---

// A single mentor card with hover animation
const MentorCard = ({ mentor }: { mentor: Mentor }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
    className="relative flex flex-col overflow-hidden rounded-xl border bg-card p-6 text-card-foreground shadow-sm"
  >
    {/* Bookmark Icon */}
    <button className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/60 backdrop-blur-sm transition-colors hover:bg-muted">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>
    </button>
    
    <div className="mb-4 aspect-[4/3] overflow-hidden rounded-lg">
      <img src={mentor.imageUrl} alt={mentor.name} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
    </div>
    
    <h3 className="text-lg font-semibold">{mentor.name}</h3>
    <p className="text-sm text-muted-foreground">{mentor.role} &middot; {mentor.gigs} Gigs</p>
    
    <div className="my-3 flex items-center gap-2">
      <span className="font-bold text-lg">{mentor.rating.toFixed(1)}</span>
      <div className="flex text-muted-foreground">
        {/* Simple star rating representation */}
        {[...Array(5)].map((_, i) => (
          <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={i < Math.round(mentor.rating) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn(i < Math.round(mentor.rating) ? "text-primary" : "text-muted-foreground/50")}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        ))}
      </div>
      <span className="text-xs text-muted-foreground uppercase">({mentor.reviews} Reviews)</span>
    </div>

    <p className="text-sm text-muted-foreground flex-grow">{mentor.description}</p>
  </motion.div>
);

// --- MAIN COMPONENT ---
export const MentorsSection = ({ mentors, categories }: MentorsSectionProps) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredMentors = activeCategory === "All"
    ? mentors
    : mentors.filter((mentor) => mentor.category === activeCategory);

  return (
    <section className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h2 className="text-4xl font-serif text-foreground mb-4 sm:mb-0">Mentors</h2>
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {["All", ...categories].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Animated Mentor Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredMentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
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
