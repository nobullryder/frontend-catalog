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
interactive-gradient-background.tsx
'use client';

import { useEffect, useRef } from 'react';

type InteractiveGradientBackgroundProps = {
  className?: string;
  children?: React.ReactNode;
  /** 0..1.5 strength */
  intensity?: number;
  /** enable pointer interaction */
  interactive?: boolean;
  /** initial offset in px */
  initialOffset?: { x?: number; y?: number };
  /** force dark mode look */
  dark?: boolean;
};

export default function InteractiveGradientBackground({
  className = '',
  children,
  intensity = 1,
  interactive = true,
  initialOffset,
  dark = false,
}: InteractiveGradientBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<PointerEvent | Touch | null>(null);

  const schedule = () => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const host = ref.current;
      const ev = pendingRef.current;
      if (!host || !ev) return;
      const rect = host.getBoundingClientRect();
      const px = ('clientX' in ev ? ev.clientX : 0) - rect.left - rect.width / 2;
      const py = ('clientY' in ev ? ev.clientY : 0) - rect.top - rect.height / 2;

      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

      const k = prefersReduced ? 0.1 : intensity;

      host.style.setProperty('--posX', String(px * k));
      host.style.setProperty('--posY', String(py * k));
    });
  };

  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    // set initial vars
    host.style.setProperty('--posX', String(initialOffset?.x ?? 0));
    host.style.setProperty('--posY', String(initialOffset?.y ?? 0));

    if (!interactive) return;

    const onPointer = (e: PointerEvent) => {
      pendingRef.current = e;
      schedule();
    };
    const onTouch = (e: TouchEvent) => {
      if (!e.touches.length) return;
      pendingRef.current = e.touches[0];
      schedule();
    };
    const reset = () => {
      host.style.setProperty('--posX', '0');
      host.style.setProperty('--posY', '0');
    };

    host.addEventListener('pointermove', onPointer, { passive: true });
    host.addEventListener('touchmove', onTouch, { passive: true });
    host.addEventListener('pointerleave', reset);
    host.addEventListener('touchend', reset);
    host.addEventListener('touchcancel', reset);

    return () => {
      host.removeEventListener('pointermove', onPointer);
      host.removeEventListener('touchmove', onTouch);
      host.removeEventListener('pointerleave', reset);
      host.removeEventListener('touchend', reset);
      host.removeEventListener('touchcancel', reset);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [interactive, intensity, initialOffset?.x, initialOffset?.y]);

  return (
    <div
      ref={ref}
      aria-label="Interactive gradient background"
      role="img"
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        // CSS vars default
        // @ts-ignore
        '--posX': '0',
        '--posY': '0',
      }}
    >
      {/* Light layer */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: dark ? 0 : 1,
          transition: 'opacity 0.5s ease',
          background: `
            linear-gradient(115deg, rgb(211 255 215), rgb(0 0 0)),
            radial-gradient(90% 100% at calc(50% + var(--posX)*1px) calc(0% + var(--posY)*1px), rgb(200 200 200), rgb(22 0 45)),
            radial-gradient(100% 100% at calc(80% - var(--posX)*1px) calc(0% - var(--posY)*1px), rgb(250 255 0), rgb(36 0 0)),
            radial-gradient(150% 210% at calc(100% + var(--posX)*1px) calc(0% + var(--posY)*1px), rgb(20 175 125), rgb(0 10 255)),
            radial-gradient(100% 100% at calc(100% - var(--posX)*1px) calc(30% - var(--posY)*1px), rgb(255 77 0), rgb(0 200 255)),
            linear-gradient(60deg, rgb(255 0 0), rgb(120 86 255))
          `,
          backgroundBlendMode:
            'overlay, overlay, difference, difference, difference, normal',
        }}
      />
      {/* Dark layer */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: dark ? 1 : 0,
          transition: 'opacity 0.5s ease',
          background: `
            linear-gradient(115deg, rgb(15 30 20), rgb(0 0 0)),
            radial-gradient(90% 100% at calc(50% + var(--posX)*1px) calc(0% + var(--posY)*1px), rgb(80 80 100), rgb(10 0 25)),
            radial-gradient(100% 100% at calc(80% - var(--posX)*1px) calc(0% - var(--posY)*1px), rgb(100 120 0), rgb(15 0 0)),
            radial-gradient(150% 210% at calc(100% + var(--posX)*1px) calc(0% + var(--posY)*1px), rgb(10 80 60), rgb(0 5 120)),
            radial-gradient(100% 100% at calc(100% - var(--posX)*1px) calc(30% - var(--posY)*1px), rgb(120 35 0), rgb(0 100 140)),
            linear-gradient(60deg, rgb(100 0 0), rgb(60 40 150))
          `,
          backgroundBlendMode:
            'overlay, overlay, difference, difference, difference, normal',
        }}
      />

      {/* Content */}
      {children ? (
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      ) : null}
    </div>
  );
}

export { InteractiveGradientBackground };


code.demo.1760281624901.tsx
import { InteractiveGradientBackground } from "@/components/ui/interactive-gradient-background";

export default function DemoOne() {
  return (
    <InteractiveGradientBackground intensity={1}>
      <div style={{ padding: '6rem 2rem', color: 'white', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', margin: 0 }}>Hello</h1>
        <p>Move your mouse.</p>
      </div>
    </InteractiveGradientBackground>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/interactive-gradient-background.tsx
'use client';

import { useEffect, useRef } from 'react';

type InteractiveGradientBackgroundProps = {
  className?: string;
  children?: React.ReactNode;
  /** 0..1.5 strength */
  intensity?: number;
  /** enable pointer interaction */
  interactive?: boolean;
  /** initial offset in px */
  initialOffset?: { x?: number; y?: number };
  /** force dark mode look */
  dark?: boolean;
};

export default function InteractiveGradientBackground({
  className = '',
  children,
  intensity = 1,
  interactive = true,
  initialOffset,
  dark = false,
}: InteractiveGradientBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<PointerEvent | Touch | null>(null);

  const schedule = () => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const host = ref.current;
      const ev = pendingRef.current;
      if (!host || !ev) return;
      const rect = host.getBoundingClientRect();
      const px = ('clientX' in ev ? ev.clientX : 0) - rect.left - rect.width / 2;
      const py = ('clientY' in ev ? ev.clientY : 0) - rect.top - rect.height / 2;

      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

      const k = prefersReduced ? 0.1 : intensity;

      host.style.setProperty('--posX', String(px * k));
      host.style.setProperty('--posY', String(py * k));
    });
  };

  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    // set initial vars
    host.style.setProperty('--posX', String(initialOffset?.x ?? 0));
    host.style.setProperty('--posY', String(initialOffset?.y ?? 0));

    if (!interactive) return;

    const onPointer = (e: PointerEvent) => {
      pendingRef.current = e;
      schedule();
    };
    const onTouch = (e: TouchEvent) => {
      if (!e.touches.length) return;
      pendingRef.current = e.touches[0];
      schedule();
    };
    const reset = () => {
      host.style.setProperty('--posX', '0');
      host.style.setProperty('--posY', '0');
    };

    host.addEventListener('pointermove', onPointer, { passive: true });
    host.addEventListener('touchmove', onTouch, { passive: true });
    host.addEventListener('pointerleave', reset);
    host.addEventListener('touchend', reset);
    host.addEventListener('touchcancel', reset);

    return () => {
      host.removeEventListener('pointermove', onPointer);
      host.removeEventListener('touchmove', onTouch);
      host.removeEventListener('pointerleave', reset);
      host.removeEventListener('touchend', reset);
      host.removeEventListener('touchcancel', reset);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [interactive, intensity, initialOffset?.x, initialOffset?.y]);

  return (
    <div
      ref={ref}
      aria-label="Interactive gradient background"
      role="img"
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        // CSS vars default
        // @ts-ignore
        '--posX': '0',
        '--posY': '0',
      }}
    >
      {/* Light layer */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: dark ? 0 : 1,
          transition: 'opacity 0.5s ease',
          background: `
            linear-gradient(115deg, rgb(211 255 215), rgb(0 0 0)),
            radial-gradient(90% 100% at calc(50% + var(--posX)*1px) calc(0% + var(--posY)*1px), rgb(200 200 200), rgb(22 0 45)),
            radial-gradient(100% 100% at calc(80% - var(--posX)*1px) calc(0% - var(--posY)*1px), rgb(250 255 0), rgb(36 0 0)),
            radial-gradient(150% 210% at calc(100% + var(--posX)*1px) calc(0% + var(--posY)*1px), rgb(20 175 125), rgb(0 10 255)),
            radial-gradient(100% 100% at calc(100% - var(--posX)*1px) calc(30% - var(--posY)*1px), rgb(255 77 0), rgb(0 200 255)),
            linear-gradient(60deg, rgb(255 0 0), rgb(120 86 255))
          `,
          backgroundBlendMode:
            'overlay, overlay, difference, difference, difference, normal',
        }}
      />
      {/* Dark layer */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: dark ? 1 : 0,
          transition: 'opacity 0.5s ease',
          background: `
            linear-gradient(115deg, rgb(15 30 20), rgb(0 0 0)),
            radial-gradient(90% 100% at calc(50% + var(--posX)*1px) calc(0% + var(--posY)*1px), rgb(80 80 100), rgb(10 0 25)),
            radial-gradient(100% 100% at calc(80% - var(--posX)*1px) calc(0% - var(--posY)*1px), rgb(100 120 0), rgb(15 0 0)),
            radial-gradient(150% 210% at calc(100% + var(--posX)*1px) calc(0% + var(--posY)*1px), rgb(10 80 60), rgb(0 5 120)),
            radial-gradient(100% 100% at calc(100% - var(--posX)*1px) calc(30% - var(--posY)*1px), rgb(120 35 0), rgb(0 100 140)),
            linear-gradient(60deg, rgb(100 0 0), rgb(60 40 150))
          `,
          backgroundBlendMode:
            'overlay, overlay, difference, difference, difference, normal',
        }}
      />

      {/* Content */}
      {children ? (
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      ) : null}
    </div>
  );
}

export { InteractiveGradientBackground };

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
