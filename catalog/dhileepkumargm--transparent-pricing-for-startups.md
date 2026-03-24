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
transparent-pricing-for-startups.tsx
import React, { useState, useEffect, useRef } from 'react';

// --- Pricing Data ---
const pricingData = {
    dev: {
        landing: { price: "$2500", features: ["Wireframes", "Full copywriting", "Figma Design", "Unlimited 3D models", "Framer development", "Three rounds of revisions", "1 month of free support"] },
        multipage: { price: "$5000", features: ["Wireframes", "Full copywriting", "Figma Design", "Unlimited 3D models", "Framer development", "Three rounds of revisions", "1 month of free support"] }
    },
    design: {
        landing: { price: "$1500", features: ["Wireframes", "Full copywriting", "Figma Design", "Unlimited 3D models", "Three rounds of revisions"] },
        multipage: { price: "$3000", features: ["Wireframes", "Full copywriting", "Figma Design", "Unlimited 3D models", "Three rounds of revisions"] }
    }
};

// --- SVG Icon Components ---
const LandingIcon = () => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const MultipageIcon = () => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"></circle></svg>;
const BookCallIcon = () => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;

// --- PricingCard Component ---
const PricingCard = ({ type, mode }) => {
    const isLanding = type === 'landing';
    const [displayData, setDisplayData] = useState(pricingData[mode][type]);
    const [isAnimating, setIsAnimating] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => {
            setDisplayData(pricingData[mode][type]);
            setIsAnimating(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [mode, type]);
    
    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;
        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--y', `${e.clientY - rect.top}px`);
        };
        card.addEventListener('mousemove', handleMouseMove);
        return () => card.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const cardColors = isLanding 
        ? { '--color-1': '#4f46e5', '--color-2': '#3b82f6' } 
        : { '--color-1': '#16a34a', '--color-2': '#22c55e' };
    
    const title = isLanding ? 'LANDING PAGE' : 'MULTIPAGE WEBSITE';
    const priceType = isLanding ? 'FIXED PRICE' : 'PRICE MAY CHANGE';

    return (
        <section className="pricing-card-wrapper" style={{ '--angle': '0deg', ...cardColors }} aria-labelledby={`card-title-${type}`}>
            <div ref={cardRef} className="pricing-card">
                <div className="p-8 flex flex-col items-center h-full" style={{ color: 'var(--card-text-primary)' }}>
                    <h2 id={`card-title-${type}`} className="text-sm font-bold rounded-full px-4 py-2 inline-flex items-center gap-2 self-center" style={{ backgroundColor: 'var(--card-feature-bg)' }}>
                        {isLanding ? <LandingIcon /> : <MultipageIcon />}
                        {title}
                    </h2>
                    <p className="text-7xl lg:text-8xl font-black my-4" aria-label={`Price: ${displayData.price}`}>{displayData.price}</p>
                    <p className="text-sm font-medium tracking-widest" style={{ color: 'var(--card-text-secondary)' }}>{priceType}</p>
                    
                    <div className={`card-details mt-8 flex flex-col flex-grow w-full ${isAnimating ? 'details-hidden' : ''}`}>
                        <p className="text-center text-sm" style={{ color: 'var(--card-text-secondary)' }}>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                        <ul className="flex flex-wrap justify-center gap-2 my-8" aria-label="Features included in this plan">
                            {displayData.features.map(f => (
                                <li key={f} className="text-xs font-medium px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--card-feature-bg)' }}>{f}</li>
                            ))}
                        </ul>
                        <button 
                            className="mt-auto w-full font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                            style={{ backgroundColor: 'var(--card-button-bg)' }}
                            onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--card-button-bg-hover)'}
                            onMouseOut={e => e.currentTarget.style.backgroundColor = 'var(--card-button-bg)'}
                            aria-label="Book a twenty minute call"
                        >
                            <BookCallIcon />
                            Book a 20-min call
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Main PricingPage Component ---
export default function PricingPage() {
    const [mode, setMode] = useState('dev');

    const handleToggle = (e) => {
        setMode(e.target.checked ? 'design' : 'dev');
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden app-container">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <main className="relative z-10 flex flex-col items-center w-full max-w-5xl">
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        Simple Transparent Pricing for Startups
                    </h1>
                    <div role="radiogroup" aria-labelledby="pricing-toggle-label" className="mt-6 flex justify-center items-center gap-4 font-medium" style={{ color: 'var(--text-secondary)' }}>
                        <span id="pricing-toggle-label" className="sr-only">Pricing Mode</span>
                        <label htmlFor="toggle" className={mode === 'dev' ? '' : 'opacity-70'}>Design & Dev</label>
                        <div className="relative">
                            <input type="checkbox" id="toggle" className="sr-only" onChange={handleToggle} role="switch" aria-checked={mode === 'design'} />
                            <label htmlFor="toggle" className="flex items-center cursor-pointer w-14 h-8 rounded-full p-1 transition-colors duration-300">
                                <div className="w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300"></div>
                            </label>
                        </div>
                        <label htmlFor="toggle" className={mode === 'design' ? '' : 'opacity-70'}>Design Only</label>
                    </div>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl">
                    <PricingCard type="landing" mode={mode} />
                    <PricingCard type="multipage" mode={mode} />
                </div>
            </main>
        </div>
    );
};


code.demo.1756044438371.tsx
import PricingPage from "@/components/ui/transparent-pricing-for-startups";

export default function DemoOne() {
  return  <div className="App bg">
      <PricingPage />
    </div>
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/transparent-pricing-for-startups.tsx
import React, { useState, useEffect, useRef } from 'react';

// --- Pricing Data ---
const pricingData = {
    dev: {
        landing: { price: "$2500", features: ["Wireframes", "Full copywriting", "Figma Design", "Unlimited 3D models", "Framer development", "Three rounds of revisions", "1 month of free support"] },
        multipage: { price: "$5000", features: ["Wireframes", "Full copywriting", "Figma Design", "Unlimited 3D models", "Framer development", "Three rounds of revisions", "1 month of free support"] }
    },
    design: {
        landing: { price: "$1500", features: ["Wireframes", "Full copywriting", "Figma Design", "Unlimited 3D models", "Three rounds of revisions"] },
        multipage: { price: "$3000", features: ["Wireframes", "Full copywriting", "Figma Design", "Unlimited 3D models", "Three rounds of revisions"] }
    }
};

// --- SVG Icon Components ---
const LandingIcon = () => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const MultipageIcon = () => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"></circle></svg>;
const BookCallIcon = () => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;

// --- PricingCard Component ---
const PricingCard = ({ type, mode }) => {
    const isLanding = type === 'landing';
    const [displayData, setDisplayData] = useState(pricingData[mode][type]);
    const [isAnimating, setIsAnimating] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => {
            setDisplayData(pricingData[mode][type]);
            setIsAnimating(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [mode, type]);
    
    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;
        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--y', `${e.clientY - rect.top}px`);
        };
        card.addEventListener('mousemove', handleMouseMove);
        return () => card.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const cardColors = isLanding 
        ? { '--color-1': '#4f46e5', '--color-2': '#3b82f6' } 
        : { '--color-1': '#16a34a', '--color-2': '#22c55e' };
    
    const title = isLanding ? 'LANDING PAGE' : 'MULTIPAGE WEBSITE';
    const priceType = isLanding ? 'FIXED PRICE' : 'PRICE MAY CHANGE';

    return (
        <section className="pricing-card-wrapper" style={{ '--angle': '0deg', ...cardColors }} aria-labelledby={`card-title-${type}`}>
            <div ref={cardRef} className="pricing-card">
                <div className="p-8 flex flex-col items-center h-full" style={{ color: 'var(--card-text-primary)' }}>
                    <h2 id={`card-title-${type}`} className="text-sm font-bold rounded-full px-4 py-2 inline-flex items-center gap-2 self-center" style={{ backgroundColor: 'var(--card-feature-bg)' }}>
                        {isLanding ? <LandingIcon /> : <MultipageIcon />}
                        {title}
                    </h2>
                    <p className="text-7xl lg:text-8xl font-black my-4" aria-label={`Price: ${displayData.price}`}>{displayData.price}</p>
                    <p className="text-sm font-medium tracking-widest" style={{ color: 'var(--card-text-secondary)' }}>{priceType}</p>
                    
                    <div className={`card-details mt-8 flex flex-col flex-grow w-full ${isAnimating ? 'details-hidden' : ''}`}>
                        <p className="text-center text-sm" style={{ color: 'var(--card-text-secondary)' }}>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                        <ul className="flex flex-wrap justify-center gap-2 my-8" aria-label="Features included in this plan">
                            {displayData.features.map(f => (
                                <li key={f} className="text-xs font-medium px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--card-feature-bg)' }}>{f}</li>
                            ))}
                        </ul>
                        <button 
                            className="mt-auto w-full font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                            style={{ backgroundColor: 'var(--card-button-bg)' }}
                            onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--card-button-bg-hover)'}
                            onMouseOut={e => e.currentTarget.style.backgroundColor = 'var(--card-button-bg)'}
                            aria-label="Book a twenty minute call"
                        >
                            <BookCallIcon />
                            Book a 20-min call
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Main PricingPage Component ---
export default function PricingPage() {
    const [mode, setMode] = useState('dev');

    const handleToggle = (e) => {
        setMode(e.target.checked ? 'design' : 'dev');
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden app-container">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <main className="relative z-10 flex flex-col items-center w-full max-w-5xl">
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        Simple Transparent Pricing for Startups
                    </h1>
                    <div role="radiogroup" aria-labelledby="pricing-toggle-label" className="mt-6 flex justify-center items-center gap-4 font-medium" style={{ color: 'var(--text-secondary)' }}>
                        <span id="pricing-toggle-label" className="sr-only">Pricing Mode</span>
                        <label htmlFor="toggle" className={mode === 'dev' ? '' : 'opacity-70'}>Design & Dev</label>
                        <div className="relative">
                            <input type="checkbox" id="toggle" className="sr-only" onChange={handleToggle} role="switch" aria-checked={mode === 'design'} />
                            <label htmlFor="toggle" className="flex items-center cursor-pointer w-14 h-8 rounded-full p-1 transition-colors duration-300">
                                <div className="w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300"></div>
                            </label>
                        </div>
                        <label htmlFor="toggle" className={mode === 'design' ? '' : 'opacity-70'}>Design Only</label>
                    </div>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl">
                    <PricingCard type="landing" mode={mode} />
                    <PricingCard type="multipage" mode={mode} />
                </div>
            </main>
        </div>
    );
};

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
