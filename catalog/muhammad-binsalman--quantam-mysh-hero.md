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
quantam-mysh-hero.tsx
import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-black text-white w-full min-h-screen space-y-28 relative max-w-screen overflow-x-hidden font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 z-10">
        <div className="flex items-center">
          <span className="text-purple-600 text-2xl mr-1">•</span>
          <span className="text-xl font-semibold">Mysh</span><span className="text-purple-600 text-2xl ml-1">•</span>
        </div>
        <ul className="sm:flex space-x-8 text-sm bg-purple-500/10 py-1 rounded-full px-3 hidden">
          <li className="cursor-pointer hover:bg-purple-700 rounded-full p-2 px-3 font-thin">Home</li>
          <li className="cursor-pointer hover:bg-purple-700 rounded-full p-2 px-3 font-thin">About</li>
          <li className="cursor-pointer hover:bg-purple-700 rounded-full p-2 px-3 font-thin">Portfolio</li>
          <li className="cursor-pointer hover:bg-purple-700 rounded-full p-2 px-3 font-thin">Contact</li>
          <li className="cursor-pointer hover:bg-purple-700 rounded-full p-2 px-3 font-thin">FAQ</li>
        </ul>
        <button className="bg-purple-600 text-white px-5 py-2 rounded-md text-sm font-medium">Get In Touch</button>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center text-center px-10 z-10">
        <div className="flex items-center bg-purple-900/20 border border-purple-600/50 rounded-full pl-2 pr-4 py-1 text-purple-400 text-xs mb-8 tracking-wider font-light">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full mr-2 text-xs font-light">2025</span>
          Next-Gen AI Studio
        </div>
        <h1 className="text-7xl font-bold leading-tight font-light">
          AI-Driven Success.
        </h1>
        <h1 className="text-7xl font-bold leading-tight mb-6 font-light ">
          Redefining the Future.
        </h1>
        <p className="text-sm max-w-lg mb-2 font-light">Creating latest solutions that redefine innovation.</p>
        <p className="text-sm max-w-lg mb-8 font-light">Stay ahead with AI-powered technology for the future.</p>
        <div className="flex space-x-4 mb-16">
          <button className="bg-white text-black px-5 py-2 cursor-pointer hover:bg-purple-200 rounded-md text-sm ">Connect With Us</button>
          <button className="bg-white/50  text-white px-5 py-2 cursor-pointer hover:bg-purple-600 rounded-md text-sm ">What is Mysh?</button>
        </div>

        {/* Infinite Moving Fading Carousel */}
        <div className="w-full max-w-xl mx-auto overflow-hidden relative h-10 mb-20 z-10">
          <div className="flex animate-marquee whitespace-nowrap text-gray-400 text-xl">
            <span className="mx-6">IPSUM</span>
            <span className="mx-6">∞</span>
            <span className="mx-6">MOOO</span>
            {/* Duplicated for seamless loop */}
            <span className="mx-6">IPSUM</span>
            <span className="mx-6">∞</span>
            <span className="mx-6">MOOO</span>
          </div>
          {/* Fading gradients */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-purple-900/10 to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-purple-900/10 to-transparent"></div>
        </div>
      </div>

      {/* Gradient Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-purple-900/50 via-purple-600/20 to-transparent rounded-t-full opacity-80 blur-3xl"></div>

    </div>
  );
};

export default HeroSection;

code.demo.1756712951228.tsx
import HeroSection from "@/components/ui/quantam-mysh-hero";

export default function DemoOne() {
  return <HeroSection />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/quantam-mysh-hero.tsx
import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-black text-white w-full min-h-screen space-y-28 relative max-w-screen overflow-x-hidden font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 z-10">
        <div className="flex items-center">
          <span className="text-purple-600 text-2xl mr-1">•</span>
          <span className="text-xl font-semibold">Mysh</span><span className="text-purple-600 text-2xl ml-1">•</span>
        </div>
        <ul className="sm:flex space-x-8 text-sm bg-purple-500/10 py-1 rounded-full px-3 hidden">
          <li className="cursor-pointer hover:bg-purple-700 rounded-full p-2 px-3 font-thin">Home</li>
          <li className="cursor-pointer hover:bg-purple-700 rounded-full p-2 px-3 font-thin">About</li>
          <li className="cursor-pointer hover:bg-purple-700 rounded-full p-2 px-3 font-thin">Portfolio</li>
          <li className="cursor-pointer hover:bg-purple-700 rounded-full p-2 px-3 font-thin">Contact</li>
          <li className="cursor-pointer hover:bg-purple-700 rounded-full p-2 px-3 font-thin">FAQ</li>
        </ul>
        <button className="bg-purple-600 text-white px-5 py-2 rounded-md text-sm font-medium">Get In Touch</button>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center text-center px-10 z-10">
        <div className="flex items-center bg-purple-900/20 border border-purple-600/50 rounded-full pl-2 pr-4 py-1 text-purple-400 text-xs mb-8 tracking-wider font-light">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full mr-2 text-xs font-light">2025</span>
          Next-Gen AI Studio
        </div>
        <h1 className="text-7xl font-bold leading-tight font-light">
          AI-Driven Success.
        </h1>
        <h1 className="text-7xl font-bold leading-tight mb-6 font-light ">
          Redefining the Future.
        </h1>
        <p className="text-sm max-w-lg mb-2 font-light">Creating latest solutions that redefine innovation.</p>
        <p className="text-sm max-w-lg mb-8 font-light">Stay ahead with AI-powered technology for the future.</p>
        <div className="flex space-x-4 mb-16">
          <button className="bg-white text-black px-5 py-2 cursor-pointer hover:bg-purple-200 rounded-md text-sm ">Connect With Us</button>
          <button className="bg-white/50  text-white px-5 py-2 cursor-pointer hover:bg-purple-600 rounded-md text-sm ">What is Mysh?</button>
        </div>

        {/* Infinite Moving Fading Carousel */}
        <div className="w-full max-w-xl mx-auto overflow-hidden relative h-10 mb-20 z-10">
          <div className="flex animate-marquee whitespace-nowrap text-gray-400 text-xl">
            <span className="mx-6">IPSUM</span>
            <span className="mx-6">∞</span>
            <span className="mx-6">MOOO</span>
            {/* Duplicated for seamless loop */}
            <span className="mx-6">IPSUM</span>
            <span className="mx-6">∞</span>
            <span className="mx-6">MOOO</span>
          </div>
          {/* Fading gradients */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-purple-900/10 to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-purple-900/10 to-transparent"></div>
        </div>
      </div>

      {/* Gradient Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-purple-900/50 via-purple-600/20 to-transparent rounded-t-full opacity-80 blur-3xl"></div>

    </div>
  );
};

export default HeroSection;
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
