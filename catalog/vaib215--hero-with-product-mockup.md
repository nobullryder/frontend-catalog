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
hero-with-product-mockup.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight, Search } from 'lucide-react';

interface LandingPageProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonIcon?: React.ReactNode;
  brandColor?: string;
  accentColor?: string;
  showMockups?: boolean;
  logoComponent?: React.ReactNode;
}

export function HeroSection({
  title = "Transform your digital experience",
  description = "Streamline your daily tasks with fewer distractions and more focus.",
  primaryButtonText = "Get Started",
  primaryButtonIcon = <ArrowRight size={ 20} />,
brandColor = "blue",
  accentColor = "purple",
  showMockups = true,
  logoComponent
}: LandingPageProps) {
  return (
    <div className= "min-h-screen bg-gradient-to-br from-background to-muted/20 p-4 md:p-6 lg:p-8 flex flex-col-reverse lg:flex-row gap-20 place-items-center" >
    <div className="space-y-4 max-w-2xl" >
      {/* Brand Label */ }
      < div className = "space-y-8" >
          < h1 className = "text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tight" >
            { title }
            < /h1>
            < /div>

  {/* Description */ }
  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-normal max-w-lg" >
    { description }
    < /p>

  {/* Actions */ }
  <div className="space-y-8" >
          < Button
  size = "lg"
  className = "cursor-pointer text-lg font-semibold px-8 py-6 rounded-xl flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-200"
    >
    { primaryButtonText }
  { primaryButtonIcon }
  </Button>
    < /div>
    < /div>

  {/* Right Side - Product Mockups */ }
  {
    showMockups && (
      <div className="relative max-w-md mx-auto mt-8" >
        {/* Desktop Application Window */ }
        < div className = "max-sm:hidden relative bg-background rounded-2xl shadow-2xl border overflow-hidden transform rotate-2 hover:rotate-1 transition-transform duration-300" >
          {/* Application Header */ }
          < div className = "bg-muted/50 px-6 py-4 border-b" >
            <div className="flex items-center justify-between" >
              <div className="flex items-center space-x-4" >
                <div className="flex space-x-2" >
                  <div className="w-3 h-3 bg-red-500 rounded-full" > </div>
                    < div className = "w-3 h-3 bg-yellow-500 rounded-full" > </div>
                      < div className = "w-3 h-3 bg-green-500 rounded-full" > </div>
                        < /div>
                        < div className = "flex items-center space-x-3" >
                          <svg className="w-4 h-4 text-muted-foreground" viewBox = "0 0 24 24" fill = "none" >
                            <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke = "currentColor" strokeWidth = "2" strokeLinecap = "round" strokeLinejoin = "round" />
                              </svg>
                              < svg className = "w-4 h-4 text-muted-foreground" viewBox = "0 0 24 24" fill = "none" >
                                <path d="m14 5 7 7-7 7" stroke = "currentColor" strokeWidth = "2" strokeLinecap = "round" strokeLinejoin = "round" />
                                  </svg>
                                  < /div>
                                  < /div>
                                  < div className = "flex-1 max-w-md mx-6" >
                                    <div className="bg-background rounded-full px-4 py-2 text-sm text-muted-foreground border" >
                                      <Search size={ 14 } className = "inline" /> Search
                                        < /div>
                                        < /div>
                                        < div className = "flex items-center space-x-3" >
                                          <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center" >
                                            <span className="text-muted-foreground font-bold text-xs" >⭐</span>
                                              < /div>
                                                < /div>
                                                < /div>
                                                < /div>

    {/* Application Content */ }
    <div className="p-8 bg-background min-h-[320px]" >
      <div className="flex items-center space-x-4 mb-8" >
        { logoComponent || (
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg" >
            <span className="text-primary-foreground font-bold text-lg" >
              V
              < /span>
              < /div>
                )
  }
  <span className="font-semibold text-foreground text-lg" > Vaib < /span>
    < /div>

    < div className = "space-y-8" >
      <div className="space-y-3" >
        <h3 className="text-muted-foreground font-medium" > Quick Actions < /h3>
          < div className = "h-2 bg-muted rounded-full overflow-hidden" >
            <div className="h-full bg-primary w-3/4 rounded-full" > </div>
              < /div>
              < /div>

  {/* Feature Grid */ }
  <div className="grid grid-cols-6 gap-4" >
  {
    [
    { name: 'Dashboard', color: 'bg-blue-500', icon: '📊' },
    { name: 'Analytics', color: 'bg-green-500', icon: '📈' },
    { name: 'Settings', color: 'bg-purple-500', icon: '⚙️' },
    { name: 'Messages', color: 'bg-orange-500', icon: '💬' },
    { name: 'Calendar', color: 'bg-red-500', icon: '📅' },
    { name: 'More', color: 'bg-muted', icon: '+' }
    ].map((item, index) => (
      <div key= { index } className = "flex flex-col items-center space-y-2 group cursor-pointer" >
      <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200`} >
    <span className="text-white font-bold text-sm" > { item.icon } < /span>
      < /div>
      < span className = "text-xs text-muted-foreground text-center font-medium" > { item.name } < /span>
        < /div>
                  ))
}
</div>
  < /div>
  < /div>
  < /div>

{/* Stacked Windows Behind */ }
<div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl shadow-xl transform rotate-6 -z-10" > </div>
  < div className = "absolute -top-8 -left-8 w-full h-full bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl shadow-xl transform rotate-12 -z-20" > </div>

{/* Mobile App Mockup */ }
<div className="absolute -bottom-4 -right-24 md:-bottom-12 md:-right-12 w-56 h-[28rem] md:w-44 md:h-80 bg-slate-900 rounded-[2.5rem] p-2 shadow-2xl transform -rotate-12 hover:-rotate-6 transition-transform duration-300" >
  <div className="w-full h-full bg-background rounded-[2rem] overflow-hidden border" >
    {/* Phone Header */ }
    < div className = "bg-muted/30 px-6 py-3 flex justify-between items-center text-xs border-b" >
      <span className="font-semibold text-foreground" > 9: 41 < /span>
        < div className = "flex items-center space-x-1" >
          <div className="w-4 h-2 bg-green-500 rounded-sm" > </div>
            < span className = "text-muted-foreground font-medium" > 100 % </span>
              < /div>
              < /div>

{/* Phone Content */ }
<div className="p-4 space-y-6" >
  <div className="flex items-center space-x-3" >
    <div className="w-8 h-8 bg-primary rounded-xl shadow-md" > </div>
      < span className = "text-sm font-semibold text-foreground" >Vaib< /span>
        < /div>

        < div className = "grid grid-cols-4 gap-3" >
        {
          Array.from({ length: 16 }).map((_, i) => (
            <div key= { i } className = "aspect-square bg-muted rounded-xl hover:bg-muted/80 transition-colors cursor-pointer" > </div>
          ))
        }
          < /div>
          < /div>
          < /div>
          < /div>
          < /div>
      )}
</div>
  );
}

code.demo.1753822142411.tsx
import { HeroSection } from "@/components/ui/hero-with-product-mockup";

export default function DemoOne() {
  return <HeroSection />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/hero-with-product-mockup.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight, Search } from 'lucide-react';

interface LandingPageProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonIcon?: React.ReactNode;
  brandColor?: string;
  accentColor?: string;
  showMockups?: boolean;
  logoComponent?: React.ReactNode;
}

export function HeroSection({
  title = "Transform your digital experience",
  description = "Streamline your daily tasks with fewer distractions and more focus.",
  primaryButtonText = "Get Started",
  primaryButtonIcon = <ArrowRight size={ 20} />,
brandColor = "blue",
  accentColor = "purple",
  showMockups = true,
  logoComponent
}: LandingPageProps) {
  return (
    <div className= "min-h-screen bg-gradient-to-br from-background to-muted/20 p-4 md:p-6 lg:p-8 flex flex-col-reverse lg:flex-row gap-20 place-items-center" >
    <div className="space-y-4 max-w-2xl" >
      {/* Brand Label */ }
      < div className = "space-y-8" >
          < h1 className = "text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tight" >
            { title }
            < /h1>
            < /div>

  {/* Description */ }
  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-normal max-w-lg" >
    { description }
    < /p>

  {/* Actions */ }
  <div className="space-y-8" >
          < Button
  size = "lg"
  className = "cursor-pointer text-lg font-semibold px-8 py-6 rounded-xl flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-200"
    >
    { primaryButtonText }
  { primaryButtonIcon }
  </Button>
    < /div>
    < /div>

  {/* Right Side - Product Mockups */ }
  {
    showMockups && (
      <div className="relative max-w-md mx-auto mt-8" >
        {/* Desktop Application Window */ }
        < div className = "max-sm:hidden relative bg-background rounded-2xl shadow-2xl border overflow-hidden transform rotate-2 hover:rotate-1 transition-transform duration-300" >
          {/* Application Header */ }
          < div className = "bg-muted/50 px-6 py-4 border-b" >
            <div className="flex items-center justify-between" >
              <div className="flex items-center space-x-4" >
                <div className="flex space-x-2" >
                  <div className="w-3 h-3 bg-red-500 rounded-full" > </div>
                    < div className = "w-3 h-3 bg-yellow-500 rounded-full" > </div>
                      < div className = "w-3 h-3 bg-green-500 rounded-full" > </div>
                        < /div>
                        < div className = "flex items-center space-x-3" >
                          <svg className="w-4 h-4 text-muted-foreground" viewBox = "0 0 24 24" fill = "none" >
                            <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke = "currentColor" strokeWidth = "2" strokeLinecap = "round" strokeLinejoin = "round" />
                              </svg>
                              < svg className = "w-4 h-4 text-muted-foreground" viewBox = "0 0 24 24" fill = "none" >
                                <path d="m14 5 7 7-7 7" stroke = "currentColor" strokeWidth = "2" strokeLinecap = "round" strokeLinejoin = "round" />
                                  </svg>
                                  < /div>
                                  < /div>
                                  < div className = "flex-1 max-w-md mx-6" >
                                    <div className="bg-background rounded-full px-4 py-2 text-sm text-muted-foreground border" >
                                      <Search size={ 14 } className = "inline" /> Search
                                        < /div>
                                        < /div>
                                        < div className = "flex items-center space-x-3" >
                                          <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center" >
                                            <span className="text-muted-foreground font-bold text-xs" >⭐</span>
                                              < /div>
                                                < /div>
                                                < /div>
                                                < /div>

    {/* Application Content */ }
    <div className="p-8 bg-background min-h-[320px]" >
      <div className="flex items-center space-x-4 mb-8" >
        { logoComponent || (
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg" >
            <span className="text-primary-foreground font-bold text-lg" >
              V
              < /span>
              < /div>
                )
  }
  <span className="font-semibold text-foreground text-lg" > Vaib < /span>
    < /div>

    < div className = "space-y-8" >
      <div className="space-y-3" >
        <h3 className="text-muted-foreground font-medium" > Quick Actions < /h3>
          < div className = "h-2 bg-muted rounded-full overflow-hidden" >
            <div className="h-full bg-primary w-3/4 rounded-full" > </div>
              < /div>
              < /div>

  {/* Feature Grid */ }
  <div className="grid grid-cols-6 gap-4" >
  {
    [
    { name: 'Dashboard', color: 'bg-blue-500', icon: '📊' },
    { name: 'Analytics', color: 'bg-green-500', icon: '📈' },
    { name: 'Settings', color: 'bg-purple-500', icon: '⚙️' },
    { name: 'Messages', color: 'bg-orange-500', icon: '💬' },
    { name: 'Calendar', color: 'bg-red-500', icon: '📅' },
    { name: 'More', color: 'bg-muted', icon: '+' }
    ].map((item, index) => (
      <div key= { index } className = "flex flex-col items-center space-y-2 group cursor-pointer" >
      <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200`} >
    <span className="text-white font-bold text-sm" > { item.icon } < /span>
      < /div>
      < span className = "text-xs text-muted-foreground text-center font-medium" > { item.name } < /span>
        < /div>
                  ))
}
</div>
  < /div>
  < /div>
  < /div>

{/* Stacked Windows Behind */ }
<div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl shadow-xl transform rotate-6 -z-10" > </div>
  < div className = "absolute -top-8 -left-8 w-full h-full bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl shadow-xl transform rotate-12 -z-20" > </div>

{/* Mobile App Mockup */ }
<div className="absolute -bottom-4 -right-24 md:-bottom-12 md:-right-12 w-56 h-[28rem] md:w-44 md:h-80 bg-slate-900 rounded-[2.5rem] p-2 shadow-2xl transform -rotate-12 hover:-rotate-6 transition-transform duration-300" >
  <div className="w-full h-full bg-background rounded-[2rem] overflow-hidden border" >
    {/* Phone Header */ }
    < div className = "bg-muted/30 px-6 py-3 flex justify-between items-center text-xs border-b" >
      <span className="font-semibold text-foreground" > 9: 41 < /span>
        < div className = "flex items-center space-x-1" >
          <div className="w-4 h-2 bg-green-500 rounded-sm" > </div>
            < span className = "text-muted-foreground font-medium" > 100 % </span>
              < /div>
              < /div>

{/* Phone Content */ }
<div className="p-4 space-y-6" >
  <div className="flex items-center space-x-3" >
    <div className="w-8 h-8 bg-primary rounded-xl shadow-md" > </div>
      < span className = "text-sm font-semibold text-foreground" >Vaib< /span>
        < /div>

        < div className = "grid grid-cols-4 gap-3" >
        {
          Array.from({ length: 16 }).map((_, i) => (
            <div key= { i } className = "aspect-square bg-muted rounded-xl hover:bg-muted/80 transition-colors cursor-pointer" > </div>
          ))
        }
          < /div>
          < /div>
          < /div>
          < /div>
          < /div>
      )}
</div>
  );
}
```

Install NPM dependencies:
```bash
lucide-react
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
