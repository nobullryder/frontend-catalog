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
flip-countdown.tsx
// component.tsx
import React, { useState, useEffect, useMemo } from 'react';

// A simple utility for conditional class names
const cn = (...inputs: (string | undefined | null | boolean)[]) =>
  inputs.filter(Boolean).join(' ');

// Internal component for a single digit. No changes needed here.
const FlipUnit = ({
  digit,
  cardStyle,
}: {
  digit: string;
  cardStyle: React.CSSProperties;
}) => {
  const [currentDigit, setCurrentDigit] = useState(digit);
  const [previousDigit, setPreviousDigit] = useState(digit);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (digit !== currentDigit) {
      setPreviousDigit(currentDigit);
      setCurrentDigit(digit);
      setIsFlipping(true);
    }
  }, [digit, currentDigit]);

  const handleAnimationEnd = () => {
    setIsFlipping(false);
    setPreviousDigit(digit);
  };

  return (
    <div className="flip-unit" style={cardStyle}>
      <div className="flip-card flip-card__bottom">{currentDigit}</div>
      <div className="flip-card flip-card__top">{previousDigit}</div>
      <div
        className={cn('flipper', isFlipping && 'is-flipping')}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="flip-card flipper__top">{previousDigit}</div>
        <div className="flip-card flipper__bottom">{currentDigit}</div>
      </div>
    </div>
  );
};

// Main exported component, now supporting arbitrarily large numbers
export const FlipCountdown = ({
  countFrom = 99,
  countTo = 0,
  className,
  cardBgColor,
  textColor,
}: {
  countFrom?: number | string | bigint;
  countTo?: number | string | bigint;
  className?: string;
  cardBgColor?: string;
  textColor?: string;
}) => {
  // Use BigInt internally for safe handling of large numbers
  const from = useMemo(() => BigInt(countFrom), [countFrom]);
  const to = useMemo(() => BigInt(countTo), [countTo]);

  const isCountingDown = from > to;
  const [count, setCount] = useState(from);

  useEffect(() => {
    // Stop the timer if the target is reached
    if ((isCountingDown && count <= to) || (!isCountingDown && count >= to)) {
      return;
    }

    const timer = setInterval(() => {
      // Use BigInt arithmetic (e.g., 1n)
      setCount((prevCount) => (isCountingDown ? prevCount - 1n : prevCount + 1n));
    }, 1000);

    return () => clearInterval(timer);
  }, [count, to, isCountingDown]);

  // Calculate padding based on the largest number's length
  const paddedCount = useMemo(() => {
    const maxVal = from > to ? from : to;
    const numDigits = String(maxVal).length;
    const displayCount = count < 0n ? 0n : count;
    
    return String(displayCount).padStart(numDigits, '0');
  }, [count, from, to]);

  const cardStyle: React.CSSProperties = {
    '--flip-card-bg': cardBgColor,
    '--flip-card-text': textColor,
  } as React.CSSProperties;

  return (
    <div className={cn('flip-countdown-container', className)}>
      {paddedCount.split('').map((digit, index) => (
        <FlipUnit key={index} digit={digit} cardStyle={cardStyle} />
      ))}
    </div>
  );
};

code.demo.1751900339620.tsx
import React, { useState } from 'react';
import { FlipCountdown } from "@/components/ui/flip-countdown";

export default function () {
    return(
        <FlipCountdown
        countFrom={0} 
        countTo={100} 
      />
    );
};
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/flip-countdown.tsx
// component.tsx
import React, { useState, useEffect, useMemo } from 'react';

// A simple utility for conditional class names
const cn = (...inputs: (string | undefined | null | boolean)[]) =>
  inputs.filter(Boolean).join(' ');

// Internal component for a single digit. No changes needed here.
const FlipUnit = ({
  digit,
  cardStyle,
}: {
  digit: string;
  cardStyle: React.CSSProperties;
}) => {
  const [currentDigit, setCurrentDigit] = useState(digit);
  const [previousDigit, setPreviousDigit] = useState(digit);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (digit !== currentDigit) {
      setPreviousDigit(currentDigit);
      setCurrentDigit(digit);
      setIsFlipping(true);
    }
  }, [digit, currentDigit]);

  const handleAnimationEnd = () => {
    setIsFlipping(false);
    setPreviousDigit(digit);
  };

  return (
    <div className="flip-unit" style={cardStyle}>
      <div className="flip-card flip-card__bottom">{currentDigit}</div>
      <div className="flip-card flip-card__top">{previousDigit}</div>
      <div
        className={cn('flipper', isFlipping && 'is-flipping')}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="flip-card flipper__top">{previousDigit}</div>
        <div className="flip-card flipper__bottom">{currentDigit}</div>
      </div>
    </div>
  );
};

// Main exported component, now supporting arbitrarily large numbers
export const FlipCountdown = ({
  countFrom = 99,
  countTo = 0,
  className,
  cardBgColor,
  textColor,
}: {
  countFrom?: number | string | bigint;
  countTo?: number | string | bigint;
  className?: string;
  cardBgColor?: string;
  textColor?: string;
}) => {
  // Use BigInt internally for safe handling of large numbers
  const from = useMemo(() => BigInt(countFrom), [countFrom]);
  const to = useMemo(() => BigInt(countTo), [countTo]);

  const isCountingDown = from > to;
  const [count, setCount] = useState(from);

  useEffect(() => {
    // Stop the timer if the target is reached
    if ((isCountingDown && count <= to) || (!isCountingDown && count >= to)) {
      return;
    }

    const timer = setInterval(() => {
      // Use BigInt arithmetic (e.g., 1n)
      setCount((prevCount) => (isCountingDown ? prevCount - 1n : prevCount + 1n));
    }, 1000);

    return () => clearInterval(timer);
  }, [count, to, isCountingDown]);

  // Calculate padding based on the largest number's length
  const paddedCount = useMemo(() => {
    const maxVal = from > to ? from : to;
    const numDigits = String(maxVal).length;
    const displayCount = count < 0n ? 0n : count;
    
    return String(displayCount).padStart(numDigits, '0');
  }, [count, from, to]);

  const cardStyle: React.CSSProperties = {
    '--flip-card-bg': cardBgColor,
    '--flip-card-text': textColor,
  } as React.CSSProperties;

  return (
    <div className={cn('flip-countdown-container', className)}>
      {paddedCount.split('').map((digit, index) => (
        <FlipUnit key={index} digit={digit} cardStyle={cardStyle} />
      ))}
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
