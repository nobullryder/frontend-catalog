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
svg-text.tsx
'use client';

import * as React from 'react';
import { ElementType, ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface SvgTextProps {
  /**
   * The SVG content to display inside the text
   */
  svg: ReactNode;
  /**
   * The content to display (will have the SVG "inside" it)
   */
  children: ReactNode;
  /**
   * Additional className for the container
   */
  className?: string;
  /**
   * Font size for the text mask (in viewport width units or CSS units)
   * @default "20vw"
   */
  fontSize?: string | number;
  /**
   * Font weight for the text mask
   * @default "bold"
   */
  fontWeight?: string | number;
  /**
   * The element type to render for the container
   * @default "div"
   */
  as?: ElementType;
}

/**
 * SvgText displays content with an SVG background fill effect.
 * The SVG is masked by the content, creating a dynamic text look.
 */
export function SvgText({
  svg,
  children,
  className = '',
  fontSize = '20vw',
  fontWeight = 'bold',
  as: Component = 'div',
}: SvgTextProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [textDimensions, setTextDimensions] = useState({ width: 0, height: 0 });
  const content = React.Children.toArray(children).join('');
  const maskId = React.useId();

  useEffect(() => {
    if (!textRef.current) return;

    const updateDimensions = () => {
      const rect = textRef.current?.getBoundingClientRect();
      if (rect) {
        setTextDimensions({
          width: Math.max(rect.width, 200),
          height: Math.max(rect.height, 100),
        });
      }
    };

    // Initial measurement
    updateDimensions();

    // Use ResizeObserver for better performance
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(textRef.current);

    return () => resizeObserver.disconnect();
  }, [content, fontSize, fontWeight]);

  return (
    <Component className={cn('relative inline-block', className)}>
      {/* Hidden text for measuring */}
      <div
        ref={textRef}
        className="opacity-0 absolute pointer-events-none font-bold whitespace-nowrap"
        style={{
          fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
          fontWeight,
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {content}
      </div>

      {/* SVG with text mask */}
      <svg
        className="block"
        width={textDimensions.width}
        height={textDimensions.height}
        viewBox={`0 0 ${textDimensions.width} ${textDimensions.height}`}
        style={{
          fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
          fontWeight,
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <defs>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill="black" />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              style={{
                fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
                fontWeight,
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              {content}
            </text>
          </mask>
        </defs>

        {/* Background SVG with proper scaling */}
        <g mask={`url(#${maskId})`}>
          <foreignObject
            width="100%"
            height="100%"
            style={{
              overflow: 'visible',
            }}
          >
            <div
              style={{
                width: `${textDimensions.width}px`,
                height: `${textDimensions.height}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '400px',
                  height: '200px',
                  transform: `scale(${Math.max(textDimensions.width / 400, textDimensions.height / 200)})`,
                  transformOrigin: 'center',
                }}
              >
                {svg}
              </div>
            </div>
          </foreignObject>
        </g>
      </svg>

      {/* Screen reader text */}
      <span className="sr-only">{content}</span>
    </Component>
  );
}


code.demo.1750861587864.tsx
import { SvgText } from '@/components/ui/svg-text';

const LiquidSvg = () => (
  <svg width="400" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="50%" stopColor="#1e40af" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3b82f640" />
        <stop offset="50%" stopColor="#1e40af80" />
        <stop offset="100%" stopColor="#3b82f660" />
      </linearGradient>
      <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1e40af30" />
        <stop offset="50%" stopColor="#3b82f650" />
        <stop offset="100%" stopColor="#1e40af40" />
      </linearGradient>
    </defs>

    {/* Background liquid */}
    <rect width="100%" height="100%" fill="url(#liquidGradient)" />

    {/* Animated wave layer 1 */}
    <path fill="url(#waveGradient1)" opacity="0.6">
      <animate
        attributeName="d"
        dur="3s"
        repeatCount="indefinite"
        values="M0,100 Q100,80 200,100 T400,100 L400,200 L0,200 Z;
                M0,100 Q100,120 200,100 T400,100 L400,200 L0,200 Z;
                M0,100 Q100,80 200,100 T400,100 L400,200 L0,200 Z"
      />
    </path>

    {/* Animated wave layer 2 */}
    <path fill="url(#waveGradient2)" opacity="0.4">
      <animate
        attributeName="d"
        dur="4s"
        repeatCount="indefinite"
        values="M0,120 Q150,100 300,120 T600,120 L600,200 L0,200 Z;
                M0,120 Q150,140 300,120 T600,120 L600,200 L0,200 Z;
                M0,120 Q150,100 300,120 T600,120 L600,200 L0,200 Z"
      />
    </path>

    {/* Surface waves */}
    <path fill="url(#waveGradient1)" opacity="0.3">
      <animate
        attributeName="d"
        dur="2s"
        repeatCount="indefinite"
        values="M0,90 Q200,70 400,90 L400,110 Q200,130 0,110 Z;
                M0,90 Q200,110 400,90 L400,110 Q200,90 0,110 Z;
                M0,90 Q200,70 400,90 L400,110 Q200,130 0,110 Z"
      />
    </path>

    {/* Floating bubbles */}
    <circle r="3" fill="#ffffff40">
      <animateMotion dur="6s" repeatCount="indefinite" path="M50,150 Q200,50 350,150 Q200,100 50,150" />
    </circle>
    <circle r="2" fill="#ffffff30">
      <animateMotion dur="8s" repeatCount="indefinite" path="M100,170 Q250,70 400,170 Q250,120 100,170" />
    </circle>
    <circle r="4" fill="#ffffff20">
      <animateMotion dur="5s" repeatCount="indefinite" path="M150,160 Q300,60 450,160 Q300,110 150,160" />
    </circle>
    <circle r="1.5" fill="#ffffff50">
      <animateMotion dur="7s" repeatCount="indefinite" path="M80,140 Q220,80 360,140 Q220,90 80,140" />
    </circle>
  </svg>
);

export default function DemoOne() {
  return (
    <div className="flex items-center justify-center">
      <SvgText svg={<LiquidSvg />} fontSize="12rem" fontWeight="900">
        REUI.IO
      </SvgText>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/svg-text.tsx
'use client';

import * as React from 'react';
import { ElementType, ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface SvgTextProps {
  /**
   * The SVG content to display inside the text
   */
  svg: ReactNode;
  /**
   * The content to display (will have the SVG "inside" it)
   */
  children: ReactNode;
  /**
   * Additional className for the container
   */
  className?: string;
  /**
   * Font size for the text mask (in viewport width units or CSS units)
   * @default "20vw"
   */
  fontSize?: string | number;
  /**
   * Font weight for the text mask
   * @default "bold"
   */
  fontWeight?: string | number;
  /**
   * The element type to render for the container
   * @default "div"
   */
  as?: ElementType;
}

/**
 * SvgText displays content with an SVG background fill effect.
 * The SVG is masked by the content, creating a dynamic text look.
 */
export function SvgText({
  svg,
  children,
  className = '',
  fontSize = '20vw',
  fontWeight = 'bold',
  as: Component = 'div',
}: SvgTextProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [textDimensions, setTextDimensions] = useState({ width: 0, height: 0 });
  const content = React.Children.toArray(children).join('');
  const maskId = React.useId();

  useEffect(() => {
    if (!textRef.current) return;

    const updateDimensions = () => {
      const rect = textRef.current?.getBoundingClientRect();
      if (rect) {
        setTextDimensions({
          width: Math.max(rect.width, 200),
          height: Math.max(rect.height, 100),
        });
      }
    };

    // Initial measurement
    updateDimensions();

    // Use ResizeObserver for better performance
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(textRef.current);

    return () => resizeObserver.disconnect();
  }, [content, fontSize, fontWeight]);

  return (
    <Component className={cn('relative inline-block', className)}>
      {/* Hidden text for measuring */}
      <div
        ref={textRef}
        className="opacity-0 absolute pointer-events-none font-bold whitespace-nowrap"
        style={{
          fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
          fontWeight,
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {content}
      </div>

      {/* SVG with text mask */}
      <svg
        className="block"
        width={textDimensions.width}
        height={textDimensions.height}
        viewBox={`0 0 ${textDimensions.width} ${textDimensions.height}`}
        style={{
          fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
          fontWeight,
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <defs>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill="black" />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              style={{
                fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
                fontWeight,
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              {content}
            </text>
          </mask>
        </defs>

        {/* Background SVG with proper scaling */}
        <g mask={`url(#${maskId})`}>
          <foreignObject
            width="100%"
            height="100%"
            style={{
              overflow: 'visible',
            }}
          >
            <div
              style={{
                width: `${textDimensions.width}px`,
                height: `${textDimensions.height}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '400px',
                  height: '200px',
                  transform: `scale(${Math.max(textDimensions.width / 400, textDimensions.height / 200)})`,
                  transformOrigin: 'center',
                }}
              >
                {svg}
              </div>
            </div>
          </foreignObject>
        </g>
      </svg>

      {/* Screen reader text */}
      <span className="sr-only">{content}</span>
    </Component>
  );
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
