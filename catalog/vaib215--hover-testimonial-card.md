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
hover-testimonial-card.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: string;
  quote: string;
  author: {
    name: string;
    title?: string;
    avatar?: string;
    initials?: string;
  };
  company?: {
    name: string;
    logo?: string;
  };
}

interface TestimonialShowcaseProps {
  testimonials: Testimonial[];
  className?: string;
  defaultTestimonialId?: string;
  autoPlayInterval?: number;
}

export const TestimonialShowcase: React.FC<TestimonialShowcaseProps> = ({
  testimonials,
  className,
  defaultTestimonialId,
  autoPlayInterval = 4000,
}) => {
  const [activeIndex, setActiveIndex] = useState(
    testimonials.findIndex(t => t.id === defaultTestimonialId) || 0
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const activeTestimonial = testimonials[activeIndex];

  // Auto-play functionality
  useEffect(() => {
    if (!isHovered) {
      autoPlayRef.current = setInterval(() => {
        switchTestimonial((activeIndex + 1) % testimonials.length);
      }, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [activeIndex, isHovered, autoPlayInterval, testimonials.length]);

  const switchTestimonial = (newIndex: number) => {
    if (newIndex === activeIndex || isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
    }, 200);
  };

  // Track mouse position for glow effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleCardClick = () => {
    switchTestimonial((activeIndex + 1) % testimonials.length);
  };

  return (
    <div className={cn('w-full select-none max-w-4xl mx-auto space-y-8', className)}>
      {/* Main Testimonial Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
        className="group relative overflow-hidden rounded-2xl border shadow-xs shadow-white/50 border-border/20 bg-background/80 backdrop-blur-sm transition-all duration-700 hover:border-yellow-400/60 cursor-pointer"
      >
        {/* Dotted texture overlay */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
        
        {/* Golden glow that follows mouse */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(251, 191, 36, 0.15), transparent 40%)`,
          }}
        />
        
        {/* Card content */}
        <div className="relative z-10 p-8 md:p-12 aspect-video transition-colors duration-300 rounded-2xl flex flex-col justify-center">
          {/* Quote with blur animation */}
            <q className={cn(
              'text-3xl md:text-5xl lg:text-6xl font-medium leading-11 md:leading-relaxed tracking-wide text-center text-foreground/95 mt-auto transition-all duration-500',
              isAnimating ? 'blur-sm opacity-0 translate-y-4' : 'blur-0 opacity-100 translate-y-0'
            )}>
              {activeTestimonial.quote}
            </q>

          {/* Author Section with blur animation */}
          <div className={cn(
            'flex items-center mt-auto justify-between transition-all duration-500',
            isAnimating ? 'blur-sm opacity-0 translate-y-4' : 'blur-0 opacity-100 translate-y-0'
          )}>
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 border-2 border-primary/20 rounded-lg shadow-xs shadow-white/50 transition-all duration-300 group-hover:border-yellow-400/40">
                <AvatarImage src={activeTestimonial.author.avatar} alt={activeTestimonial.author.name} />
                <AvatarFallback className="bg-muted text-muted-foreground font-semibold text-lg">
                  {activeTestimonial.author.initials || 
                   activeTestimonial.author.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <div className="font-semibold text-foreground text-lg">
                  {activeTestimonial.author.name}
                </div>
                {activeTestimonial.author.title && (
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    {activeTestimonial.author.title}
                  </div>
                )}
              </div>
            </div>

            {/* Company */}
            {activeTestimonial.company && (
              <div className="flex items-center gap-2 opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                {activeTestimonial.company.logo ? (
                  <img 
                    src={activeTestimonial.company.logo} 
                    alt={activeTestimonial.company.name}
                    className="h-8 w-auto"
                  />
                ) : (
                  <div className="text-lg font-bold text-foreground/70 tracking-wider">
                    {activeTestimonial.company.name}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Supporters Grid */}
      <div className="space-y-4">
        <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 gap-2 md:gap-4">
          {testimonials.map((testimonial, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={testimonial.id}
                onClick={() => switchTestimonial(index)}
                className={cn(
                  'aspect-square transition-all duration-300 hover:scale-110 hover:z-10 relative group/avatar',
                  isActive && 'scale-110 z-10'
                )}
              >
                <Avatar className={cn(
                  'h-full w-full shadow-xs shadow-white/50 border-1 rounded-none transition-all duration-300',
                  isActive 
                    ? 'border-yellow-400 shadow-lg shadow-yellow-400/25' 
                    : 'border-border/20 hover:border-yellow-400/40'
                )}>
                  <AvatarImage src={testimonial.author.avatar} alt={testimonial.author.name} />
                  <AvatarFallback className="bg-muted text-[10px] font-medium">
                    {testimonial.author.initials || 
                     testimonial.author.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                {/* Hover tooltip */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 border shadow-lg">
                  {testimonial.author.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 200%; }
          100% { background-position: -200% -200%; }
        }
      `}</style>
    </div>)
}

code.demo.1756415750335.tsx
import { TestimonialShowcase } from '@/components/ui/hover-testimonial-card';

// Generate more testimonials for a fuller grid
const generateMoreTestimonials = () => {
  const names = ['John', 'Alice', 'Bob', 'Carol', 'Dan', 'Eve', 'Frank', 'Grace', 'Henry', 'Iris', 'Jack', 'Kate', 'Liam', 'Mia', 'Noah', 'Olivia', 'Paul', 'Quinn', 'Ruby', 'Sam', 'Tina', 'Uma', 'Victor', 'Wendy', 'Xander', 'Yara', 'Zoe', 'Aaron', 'Bella', 'Chris', 'Diana', 'Ethan', 'Fiona', 'George', 'Hannah', 'Ian', 'Julia', 'Kevin', 'Luna', 'Mason', 'Vaib', 'Ravi', 'Sonu', 'Krishna', 'Aditya', 'Radhika', 'Anuradha', 'Devika'];
  const quotes = [
    'This tool has transformed how I approach coding challenges.',
    'Incredible AI that actually understands context and intent.',
    'The productivity gains are immediately noticeable.',
    'Best investment our team has made this year.',
    'Intuitive, powerful, and remarkably accurate suggestions.',
    'Makes complex refactoring tasks feel effortless.',
    'The future of software development is here.',
    'Seamless integration with our existing workflow.',
  ];
  
  const testimonials = names.map((name, index) => ({
    id: `${index}`,
    quote: quotes[index % quotes.length],
    author: {
      name: `${name}`,
      title: ['Engineer', 'Developer', 'Architect', 'Lead'][index % 4],
      initials: name.substring(0, 2),
      avatar: `https://api.dicebear.com/8.x/lorelei/svg?seed=${name}`
    },
  }));
  
  return testimonials;
};

const testimonials = generateMoreTestimonials();

export default function TestimonialDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background p-6 w-full">
      <div className="mx-auto space-y-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold text-foreground">Community Testimonials</h1>
          <p className="text-muted-foreground text-lg">
            Discover what developers are saying. Click any avatar to see their story.
          </p>
        </div>

        <TestimonialShowcase 
          testimonials={testimonials}
          defaultTestimonialId="1"
          autoPlayInterval={5000}
        />
      </div>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/hover-testimonial-card.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: string;
  quote: string;
  author: {
    name: string;
    title?: string;
    avatar?: string;
    initials?: string;
  };
  company?: {
    name: string;
    logo?: string;
  };
}

interface TestimonialShowcaseProps {
  testimonials: Testimonial[];
  className?: string;
  defaultTestimonialId?: string;
  autoPlayInterval?: number;
}

export const TestimonialShowcase: React.FC<TestimonialShowcaseProps> = ({
  testimonials,
  className,
  defaultTestimonialId,
  autoPlayInterval = 4000,
}) => {
  const [activeIndex, setActiveIndex] = useState(
    testimonials.findIndex(t => t.id === defaultTestimonialId) || 0
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const activeTestimonial = testimonials[activeIndex];

  // Auto-play functionality
  useEffect(() => {
    if (!isHovered) {
      autoPlayRef.current = setInterval(() => {
        switchTestimonial((activeIndex + 1) % testimonials.length);
      }, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [activeIndex, isHovered, autoPlayInterval, testimonials.length]);

  const switchTestimonial = (newIndex: number) => {
    if (newIndex === activeIndex || isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
    }, 200);
  };

  // Track mouse position for glow effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleCardClick = () => {
    switchTestimonial((activeIndex + 1) % testimonials.length);
  };

  return (
    <div className={cn('w-full select-none max-w-4xl mx-auto space-y-8', className)}>
      {/* Main Testimonial Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
        className="group relative overflow-hidden rounded-2xl border shadow-xs shadow-white/50 border-border/20 bg-background/80 backdrop-blur-sm transition-all duration-700 hover:border-yellow-400/60 cursor-pointer"
      >
        {/* Dotted texture overlay */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
        
        {/* Golden glow that follows mouse */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(251, 191, 36, 0.15), transparent 40%)`,
          }}
        />
        
        {/* Card content */}
        <div className="relative z-10 p-8 md:p-12 aspect-video transition-colors duration-300 rounded-2xl flex flex-col justify-center">
          {/* Quote with blur animation */}
            <q className={cn(
              'text-3xl md:text-5xl lg:text-6xl font-medium leading-11 md:leading-relaxed tracking-wide text-center text-foreground/95 mt-auto transition-all duration-500',
              isAnimating ? 'blur-sm opacity-0 translate-y-4' : 'blur-0 opacity-100 translate-y-0'
            )}>
              {activeTestimonial.quote}
            </q>

          {/* Author Section with blur animation */}
          <div className={cn(
            'flex items-center mt-auto justify-between transition-all duration-500',
            isAnimating ? 'blur-sm opacity-0 translate-y-4' : 'blur-0 opacity-100 translate-y-0'
          )}>
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 border-2 border-primary/20 rounded-lg shadow-xs shadow-white/50 transition-all duration-300 group-hover:border-yellow-400/40">
                <AvatarImage src={activeTestimonial.author.avatar} alt={activeTestimonial.author.name} />
                <AvatarFallback className="bg-muted text-muted-foreground font-semibold text-lg">
                  {activeTestimonial.author.initials || 
                   activeTestimonial.author.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <div className="font-semibold text-foreground text-lg">
                  {activeTestimonial.author.name}
                </div>
                {activeTestimonial.author.title && (
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    {activeTestimonial.author.title}
                  </div>
                )}
              </div>
            </div>

            {/* Company */}
            {activeTestimonial.company && (
              <div className="flex items-center gap-2 opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                {activeTestimonial.company.logo ? (
                  <img 
                    src={activeTestimonial.company.logo} 
                    alt={activeTestimonial.company.name}
                    className="h-8 w-auto"
                  />
                ) : (
                  <div className="text-lg font-bold text-foreground/70 tracking-wider">
                    {activeTestimonial.company.name}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Supporters Grid */}
      <div className="space-y-4">
        <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 gap-2 md:gap-4">
          {testimonials.map((testimonial, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={testimonial.id}
                onClick={() => switchTestimonial(index)}
                className={cn(
                  'aspect-square transition-all duration-300 hover:scale-110 hover:z-10 relative group/avatar',
                  isActive && 'scale-110 z-10'
                )}
              >
                <Avatar className={cn(
                  'h-full w-full shadow-xs shadow-white/50 border-1 rounded-none transition-all duration-300',
                  isActive 
                    ? 'border-yellow-400 shadow-lg shadow-yellow-400/25' 
                    : 'border-border/20 hover:border-yellow-400/40'
                )}>
                  <AvatarImage src={testimonial.author.avatar} alt={testimonial.author.name} />
                  <AvatarFallback className="bg-muted text-[10px] font-medium">
                    {testimonial.author.initials || 
                     testimonial.author.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                {/* Hover tooltip */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 border shadow-lg">
                  {testimonial.author.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 200%; }
          100% { background-position: -200% -200%; }
        }
      `}</style>
    </div>)
}
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
