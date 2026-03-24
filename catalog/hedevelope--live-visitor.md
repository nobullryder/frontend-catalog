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
live-visitor.tsx
import { cn } from "@/lib/utils";

import { useState, useEffect, useRef } from 'react';
import { MotionValue, motion, useSpring, useTransform } from 'motion/react';
import '@/index.css';

const AVATARS: string[] = [
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Woman%20Technologist.png",
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Man%20Student.png",
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Man%20Mechanic.png",
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Woman%20Student.png",
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Woman%20Teacher.png",
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Woman%20Technologist.png",
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Person%20With%20Blond%20Hair.png"
];

const AVATAR_COLORS: string[] = ['#dbeafe', '#dcfce7', '#fce7f3', '#ffedd5', '#f3f4f6'];

interface AvatarConfig {
    displayLimit: number;
    showPlus: boolean;
}

interface DigitPlaceProps {
    place: number;
    value: number;
}

const LiveVisitorCounter = () => {
    const [visitorCount, setVisitorCount] = useState<number>(135);
    const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>({ displayLimit: 3, showPlus: false });

    useEffect(() => {
        const baseVisitors = 135;
        const baseAvatars = 5;
        const visitorsAboveBase = visitorCount - baseVisitors;
        const additionalAvatars = Math.floor(visitorsAboveBase / 3);
        const calculatedLimit = baseAvatars + additionalAvatars;
        const displayLimit = Math.max(1, Math.min(calculatedLimit, 5));
        const showPlus = calculatedLimit > 5;

        setAvatarConfig({ displayLimit, showPlus });
    }, [visitorCount]);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisitorCount(prev => {
                const change = Math.floor(Math.random() * 11) - 5;
                const newCount = prev + change;
                return Math.max(105, Math.min(140, newCount));
            });
        }, 1660);

        return () => clearInterval(interval);
    }, []);

    const DigitPlace: React.FC<DigitPlaceProps> = ({ place, value }) => {
        const [offset, setOffset] = useState<number>(0);
        const targetRef = useRef<number>(0);
        const currentRef = useRef<number>(0);

        useEffect(() => {
            const valueRoundedToPlace = Math.floor(value / place);
            targetRef.current = valueRoundedToPlace % 10;

            // Smooth transition using requestAnimationFrame
            let animationFrame: number;
            const animate = () => {
                const diff = targetRef.current - currentRef.current;
                if (Math.abs(diff) > 0.01) {
                    currentRef.current += diff * 0.15; // Smooth easing
                    setOffset(currentRef.current);
                    animationFrame = requestAnimationFrame(animate);
                } else {
                    currentRef.current = targetRef.current;
                    setOffset(targetRef.current);
                }
            };

            animationFrame = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(animationFrame);
        }, [value, place]);

        const shouldDisplay = value >= place;

        if (!shouldDisplay) return null;

        return (
            <div className="digit-place">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                    let digitOffset = (10 + num - offset) % 10;
                    let translateY = digitOffset * 20;

                    if (digitOffset > 5) {
                        translateY -= 10 * 20;
                    }

                    return (
                        <span
                            key={num}
                            className="digit-number"
                            style={{
                                transform: `translateY(${translateY}px)`,
                                transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                            }}
                        >
                            {num}
                        </span>
                    );
                })}
            </div>
        );
    };

    const visibleAvatars = AVATARS.slice(0, avatarConfig.displayLimit);

    return (
        <div className="visitor-card">
            <div className="header">
                <span className="label">Live Visitors</span>
                <span className="pulse-dot">
                    <span className="pulse-ring"></span>
                    <span className="pulse-core"></span>
                </span>
            </div>

            <div className="content">
                <div className="counter">
                    {[10000, 1000, 100, 10, 1].map(place => (
                        <DigitPlace key={place} place={place} value={visitorCount} />
                    ))}
                </div>

                <div className="avatar-stack">
                    {visibleAvatars.map((url, index) => (
                        <div
                            key={index}
                            className="avatar avatar-enter"
                            style={{
                                zIndex: 10 + index,
                                backgroundColor: AVATAR_COLORS[index % AVATAR_COLORS.length],
                                animationDelay: `${index * 120}ms`
                            }}
                        >
                            <img src={url} alt={`Visitor ${index}`} />
                        </div>
                    ))}
                    {avatarConfig.showPlus && (
                        <div className="avatar-plus avatar-enter" style={{ zIndex: 20 }}>
                            <span>+</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LiveVisitorCounter;

code.demo.1765002215707.tsx
import LiveVisitorCounter  from "@/components/ui/live-visitor";

export default function DemoOne() {
    return (
        <div className="demo-container">
            <LiveVisitorCounter />
        </div>
    );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/live-visitor.tsx
import { cn } from "@/lib/utils";

import { useState, useEffect, useRef } from 'react';
import { MotionValue, motion, useSpring, useTransform } from 'motion/react';
import '@/index.css';

const AVATARS: string[] = [
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Woman%20Technologist.png",
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Man%20Student.png",
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Man%20Mechanic.png",
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Woman%20Student.png",
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Woman%20Teacher.png",
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Woman%20Technologist.png",
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Person%20With%20Blond%20Hair.png"
];

const AVATAR_COLORS: string[] = ['#dbeafe', '#dcfce7', '#fce7f3', '#ffedd5', '#f3f4f6'];

interface AvatarConfig {
    displayLimit: number;
    showPlus: boolean;
}

interface DigitPlaceProps {
    place: number;
    value: number;
}

const LiveVisitorCounter = () => {
    const [visitorCount, setVisitorCount] = useState<number>(135);
    const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>({ displayLimit: 3, showPlus: false });

    useEffect(() => {
        const baseVisitors = 135;
        const baseAvatars = 5;
        const visitorsAboveBase = visitorCount - baseVisitors;
        const additionalAvatars = Math.floor(visitorsAboveBase / 3);
        const calculatedLimit = baseAvatars + additionalAvatars;
        const displayLimit = Math.max(1, Math.min(calculatedLimit, 5));
        const showPlus = calculatedLimit > 5;

        setAvatarConfig({ displayLimit, showPlus });
    }, [visitorCount]);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisitorCount(prev => {
                const change = Math.floor(Math.random() * 11) - 5;
                const newCount = prev + change;
                return Math.max(105, Math.min(140, newCount));
            });
        }, 1660);

        return () => clearInterval(interval);
    }, []);

    const DigitPlace: React.FC<DigitPlaceProps> = ({ place, value }) => {
        const [offset, setOffset] = useState<number>(0);
        const targetRef = useRef<number>(0);
        const currentRef = useRef<number>(0);

        useEffect(() => {
            const valueRoundedToPlace = Math.floor(value / place);
            targetRef.current = valueRoundedToPlace % 10;

            // Smooth transition using requestAnimationFrame
            let animationFrame: number;
            const animate = () => {
                const diff = targetRef.current - currentRef.current;
                if (Math.abs(diff) > 0.01) {
                    currentRef.current += diff * 0.15; // Smooth easing
                    setOffset(currentRef.current);
                    animationFrame = requestAnimationFrame(animate);
                } else {
                    currentRef.current = targetRef.current;
                    setOffset(targetRef.current);
                }
            };

            animationFrame = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(animationFrame);
        }, [value, place]);

        const shouldDisplay = value >= place;

        if (!shouldDisplay) return null;

        return (
            <div className="digit-place">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                    let digitOffset = (10 + num - offset) % 10;
                    let translateY = digitOffset * 20;

                    if (digitOffset > 5) {
                        translateY -= 10 * 20;
                    }

                    return (
                        <span
                            key={num}
                            className="digit-number"
                            style={{
                                transform: `translateY(${translateY}px)`,
                                transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                            }}
                        >
                            {num}
                        </span>
                    );
                })}
            </div>
        );
    };

    const visibleAvatars = AVATARS.slice(0, avatarConfig.displayLimit);

    return (
        <div className="visitor-card">
            <div className="header">
                <span className="label">Live Visitors</span>
                <span className="pulse-dot">
                    <span className="pulse-ring"></span>
                    <span className="pulse-core"></span>
                </span>
            </div>

            <div className="content">
                <div className="counter">
                    {[10000, 1000, 100, 10, 1].map(place => (
                        <DigitPlace key={place} place={place} value={visitorCount} />
                    ))}
                </div>

                <div className="avatar-stack">
                    {visibleAvatars.map((url, index) => (
                        <div
                            key={index}
                            className="avatar avatar-enter"
                            style={{
                                zIndex: 10 + index,
                                backgroundColor: AVATAR_COLORS[index % AVATAR_COLORS.length],
                                animationDelay: `${index * 120}ms`
                            }}
                        >
                            <img src={url} alt={`Visitor ${index}`} />
                        </div>
                    ))}
                    {avatarConfig.showPlus && (
                        <div className="avatar-plus avatar-enter" style={{ zIndex: 20 }}>
                            <span>+</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LiveVisitorCounter;
```

Install NPM dependencies:
```bash
motion
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
