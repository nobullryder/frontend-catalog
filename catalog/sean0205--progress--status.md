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
progress.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Progress as ProgressPrimitive } from 'radix-ui';

function Progress({
  className,
  indicatorClassName,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  indicatorClassName?: string;
}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn('relative h-1.5 w-full overflow-hidden rounded-full bg-secondary', className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn('h-full w-full flex-1 bg-primary transition-all', indicatorClassName)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

function ProgressCircle({
  className,
  indicatorClassName,
  trackClassName,
  value = 0,
  size = 48,
  strokeWidth = 4,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  /**
   * Progress value from 0 to 100
   */
  value?: number;
  /**
   * Size of the circle in pixels
   */
  size?: number;
  /**
   * Width of the progress stroke
   */
  strokeWidth?: number;
  /**
   * Additional className for the progress stroke
   */
  indicatorClassName?: string;
  /**
   * Additional className for the progress track
   */
  trackClassName?: string;
  /**
   * Content to display in the center of the circle
   */
  children?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div
      data-slot="progress-circle"
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg className="absolute inset-0 -rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          data-slot="progress-circle-track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className={cn('text-secondary', trackClassName)}
        />
        <circle
          data-slot="progress-circle-indicator"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn('text-primary transition-all duration-300 ease-in-out', indicatorClassName)}
        />
      </svg>
      {children && (
        <div
          data-slot="progress-circle-content"
          className="relative z-10 flex items-center justify-center text-sm font-medium"
        >
          {children}
        </div>
      )}
    </div>
  );
}

function ProgressRadial({
  className,
  value = 0,
  size = 120,
  strokeWidth = 8,
  startAngle = -90,
  endAngle = 90,
  showLabel = false,
  trackClassName,
  indicatorClassName,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  /**
   * Progress value from 0 to 100
   */
  value?: number;
  /**
   * Size of the radial in pixels
   */
  size?: number;
  /**
   * Width of the progress stroke
   */
  strokeWidth?: number;
  /**
   * Start angle in degrees
   */
  startAngle?: number;
  /**
   * Additional className for the progress stroke
   */
  indicatorClassName?: string;
  /**
   * Additional className for the progress track
   */
  trackClassName?: string;
  /**
   * End angle in degrees
   */
  endAngle?: number;
  /**
   * Whether to show percentage label
   */
  showLabel?: boolean;
  /**
   * Custom content to display
   */
  children?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const angleRange = endAngle - startAngle;
  const progressAngle = (value / 100) * angleRange;

  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

  const startX = size / 2 + radius * Math.cos(toRadians(startAngle));
  const startY = size / 2 + radius * Math.sin(toRadians(startAngle));
  const endX = size / 2 + radius * Math.cos(toRadians(startAngle + progressAngle));
  const endY = size / 2 + radius * Math.sin(toRadians(startAngle + progressAngle));

  const largeArc = progressAngle > 180 ? 1 : 0;

  const pathData = ['M', startX, startY, 'A', radius, radius, 0, largeArc, 1, endX, endY].join(' ');

  return (
    <div
      data-slot="progress-radial"
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <path
          d={[
            'M',
            size / 2 + radius * Math.cos(toRadians(startAngle)),
            size / 2 + radius * Math.sin(toRadians(startAngle)),
            'A',
            radius,
            radius,
            0,
            angleRange > 180 ? 1 : 0,
            1,
            size / 2 + radius * Math.cos(toRadians(endAngle)),
            size / 2 + radius * Math.sin(toRadians(endAngle)),
          ].join(' ')}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className={cn('text-secondary', trackClassName)}
        />
        <path
          d={pathData}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className={cn('text-primary transition-all duration-300 ease-in-out', indicatorClassName)}
        />
      </svg>
      {(showLabel || children) && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children || <span className="text-lg font-bold">{value}%</span>}
        </div>
      )}
    </div>
  );
}

export { Progress, ProgressCircle, ProgressRadial };


code.demo.1751354323583.tsx
'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

export default function Compponent() {
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Get status message based on progress
  const getStatusMessage = (progress: number) => {
    if (progress < 5) return 'Initializing download...';
    if (progress < 15) return 'Setting up environment...';
    if (progress < 25) return 'Connecting to server...';
    if (progress < 35) return 'Verifying permissions...';
    if (progress < 50) return 'Downloading core files...';
    if (progress < 65) return 'Downloading assets...';
    if (progress < 80) return 'Downloading dependencies...';
    if (progress < 90) return 'Extracting files...';
    if (progress < 95) return 'Validating integrity...';
    if (progress < 100) return 'Finalizing installation...';
    return 'Download complete!';
  };

  useEffect(() => {
    // Download simulation
    const downloadTimer = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          return 0; // Reset for continuous loop
        }
        return prev + Math.random() * 3 + 1; // Random increment 1-4
      });
    }, 150);

    return () => {
      clearInterval(downloadTimer);
    };
  }, []);

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Workspace Setup</span>
          <span className="text-muted-foreground">{Math.round(downloadProgress)}%</span>
        </div>
        <Progress value={downloadProgress} className="w-full" />
        <div className="text-xs text-muted-foreground">{getStatusMessage(downloadProgress)}</div>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/progress.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Progress as ProgressPrimitive } from 'radix-ui';

function Progress({
  className,
  indicatorClassName,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  indicatorClassName?: string;
}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn('relative h-1.5 w-full overflow-hidden rounded-full bg-secondary', className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn('h-full w-full flex-1 bg-primary transition-all', indicatorClassName)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

function ProgressCircle({
  className,
  indicatorClassName,
  trackClassName,
  value = 0,
  size = 48,
  strokeWidth = 4,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  /**
   * Progress value from 0 to 100
   */
  value?: number;
  /**
   * Size of the circle in pixels
   */
  size?: number;
  /**
   * Width of the progress stroke
   */
  strokeWidth?: number;
  /**
   * Additional className for the progress stroke
   */
  indicatorClassName?: string;
  /**
   * Additional className for the progress track
   */
  trackClassName?: string;
  /**
   * Content to display in the center of the circle
   */
  children?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div
      data-slot="progress-circle"
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg className="absolute inset-0 -rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          data-slot="progress-circle-track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className={cn('text-secondary', trackClassName)}
        />
        <circle
          data-slot="progress-circle-indicator"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn('text-primary transition-all duration-300 ease-in-out', indicatorClassName)}
        />
      </svg>
      {children && (
        <div
          data-slot="progress-circle-content"
          className="relative z-10 flex items-center justify-center text-sm font-medium"
        >
          {children}
        </div>
      )}
    </div>
  );
}

function ProgressRadial({
  className,
  value = 0,
  size = 120,
  strokeWidth = 8,
  startAngle = -90,
  endAngle = 90,
  showLabel = false,
  trackClassName,
  indicatorClassName,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  /**
   * Progress value from 0 to 100
   */
  value?: number;
  /**
   * Size of the radial in pixels
   */
  size?: number;
  /**
   * Width of the progress stroke
   */
  strokeWidth?: number;
  /**
   * Start angle in degrees
   */
  startAngle?: number;
  /**
   * Additional className for the progress stroke
   */
  indicatorClassName?: string;
  /**
   * Additional className for the progress track
   */
  trackClassName?: string;
  /**
   * End angle in degrees
   */
  endAngle?: number;
  /**
   * Whether to show percentage label
   */
  showLabel?: boolean;
  /**
   * Custom content to display
   */
  children?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const angleRange = endAngle - startAngle;
  const progressAngle = (value / 100) * angleRange;

  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

  const startX = size / 2 + radius * Math.cos(toRadians(startAngle));
  const startY = size / 2 + radius * Math.sin(toRadians(startAngle));
  const endX = size / 2 + radius * Math.cos(toRadians(startAngle + progressAngle));
  const endY = size / 2 + radius * Math.sin(toRadians(startAngle + progressAngle));

  const largeArc = progressAngle > 180 ? 1 : 0;

  const pathData = ['M', startX, startY, 'A', radius, radius, 0, largeArc, 1, endX, endY].join(' ');

  return (
    <div
      data-slot="progress-radial"
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <path
          d={[
            'M',
            size / 2 + radius * Math.cos(toRadians(startAngle)),
            size / 2 + radius * Math.sin(toRadians(startAngle)),
            'A',
            radius,
            radius,
            0,
            angleRange > 180 ? 1 : 0,
            1,
            size / 2 + radius * Math.cos(toRadians(endAngle)),
            size / 2 + radius * Math.sin(toRadians(endAngle)),
          ].join(' ')}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className={cn('text-secondary', trackClassName)}
        />
        <path
          d={pathData}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className={cn('text-primary transition-all duration-300 ease-in-out', indicatorClassName)}
        />
      </svg>
      {(showLabel || children) && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children || <span className="text-lg font-bold">{value}%</span>}
        </div>
      )}
    </div>
  );
}

export { Progress, ProgressCircle, ProgressRadial };

```

Install NPM dependencies:
```bash
radix-ui
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
