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
text-scrammble.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';

type TextScrambleProps = {
  /** Strings to display one after another */
  phrases: string[];
  /** Characters used for the scrambling effect */
  chars?: string;
  /** Delay between phrase completions and the next phrase (ms) */
  pauseMs?: number;
  /** Start automatically on mount */
  autoStart?: boolean;
  /** Loop through phrases forever */
  loop?: boolean;
  /** Class applied to the live text container */
  textClass?: string;
  /** Class applied to the scrambling (dud) characters */
  dudClass?: string;
  /** Called whenever a phrase finishes animating */
  onPhraseComplete?: (index: number) => void;
};

type QueueItem = {
  from: string;
  to: string;
  start: number;
  end: number;
  char?: string;
};

const TextScramble = ({
  phrases,
  chars = '!<>-_\\/[]{}—=+*^?#________',
  pauseMs = 800,
  autoStart = true,
  loop = true,
  textClass = 'text-3xl font-semibold text-white',
  dudClass = 'text-white/40',
  onPhraseComplete,
}: TextScrambleProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const queueRef = useRef<QueueItem[]>([]);
  const frameCountRef = useRef(0);
  const [index, setIndex] = useState(0);

  // core: scramble one phrase into the next
  const setText = (newText: string): Promise<void> => {
    const el = containerRef.current!;
    const oldText = el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const q: QueueItem[] = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      q.push({ from, to, start, end });
    }
    queueRef.current = q;
    frameCountRef.current = 0;

    return new Promise<void>((resolve) => {
      const step = () => {
        let output = '';
        let complete = 0;
        const queue = queueRef.current;

        for (let i = 0; i < queue.length; i++) {
          let { from, to, start, end, char } = queue[i];
          if (frameCountRef.current >= end) {
            complete++;
            output += to;
          } else if (frameCountRef.current >= start) {
            if (!char || Math.random() < 0.28) {
              char = randomChar(chars);
              queue[i].char = char;
            }
            output += `<span class="${dudClass}">${escapeHtml(char)}</span>`;
          } else {
            output += escapeHtml(from);
          }
        }

        el.innerHTML = output;

        if (complete === queue.length) {
          resolve();
        } else {
          frameCountRef.current++;
          frameRef.current = requestAnimationFrame(step);
        }
      };

      cancelAnimationFrameSafe(frameRef.current);
      frameRef.current = requestAnimationFrame(step);
    });
  };

  useEffect(() => {
    if (!autoStart || phrases.length === 0) return;

    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        await setText(phrases[index]);
        onPhraseComplete?.(index);
        if (!loop && index === phrases.length - 1) break;
        await wait(pauseMs);
        setIndex((i) => (i + 1) % phrases.length);
      }
    };

    run();

    return () => {
      cancelled = true;
      cancelAnimationFrameSafe(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart, index, loop, pauseMs, phrases.join('|')]);

  return (
    <div className="container">
      <div
        ref={containerRef}
        className={textClass}
        // reserve some height to avoid layout shift between phrases of different lengths
        style={{ minHeight: '1em', lineHeight: 1.15, willChange: 'contents' }}
      />
    </div>
  );
}

/* helpers */
function randomChar(chars: string) {
  return chars[Math.floor(Math.random() * chars.length)];
}

function cancelAnimationFrameSafe(id: number | null) {
  if (id != null) cancelAnimationFrame(id);
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function escapeHtml(str: string) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export {TextScramble};
export default TextScramble;

code.demo.1759845491228.tsx
import { TextScramble } from "@/components/ui/text-scrammble";

export default function DemoOne() {
  return(
   
        <TextScramble
          phrases={[
            'Hello,',
            'sooner or later',
            "you're going to realize",
            'just as I did',
            "that there's a difference",
            'between knowing the path',
            'and walking the path',
          ]}
          pauseMs={800}
          // dudClass="text-neutral-500/60"
          // textClass="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white"
          autoStart
          loop
        />
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/text-scrammble.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';

type TextScrambleProps = {
  /** Strings to display one after another */
  phrases: string[];
  /** Characters used for the scrambling effect */
  chars?: string;
  /** Delay between phrase completions and the next phrase (ms) */
  pauseMs?: number;
  /** Start automatically on mount */
  autoStart?: boolean;
  /** Loop through phrases forever */
  loop?: boolean;
  /** Class applied to the live text container */
  textClass?: string;
  /** Class applied to the scrambling (dud) characters */
  dudClass?: string;
  /** Called whenever a phrase finishes animating */
  onPhraseComplete?: (index: number) => void;
};

type QueueItem = {
  from: string;
  to: string;
  start: number;
  end: number;
  char?: string;
};

const TextScramble = ({
  phrases,
  chars = '!<>-_\\/[]{}—=+*^?#________',
  pauseMs = 800,
  autoStart = true,
  loop = true,
  textClass = 'text-3xl font-semibold text-white',
  dudClass = 'text-white/40',
  onPhraseComplete,
}: TextScrambleProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const queueRef = useRef<QueueItem[]>([]);
  const frameCountRef = useRef(0);
  const [index, setIndex] = useState(0);

  // core: scramble one phrase into the next
  const setText = (newText: string): Promise<void> => {
    const el = containerRef.current!;
    const oldText = el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const q: QueueItem[] = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      q.push({ from, to, start, end });
    }
    queueRef.current = q;
    frameCountRef.current = 0;

    return new Promise<void>((resolve) => {
      const step = () => {
        let output = '';
        let complete = 0;
        const queue = queueRef.current;

        for (let i = 0; i < queue.length; i++) {
          let { from, to, start, end, char } = queue[i];
          if (frameCountRef.current >= end) {
            complete++;
            output += to;
          } else if (frameCountRef.current >= start) {
            if (!char || Math.random() < 0.28) {
              char = randomChar(chars);
              queue[i].char = char;
            }
            output += `<span class="${dudClass}">${escapeHtml(char)}</span>`;
          } else {
            output += escapeHtml(from);
          }
        }

        el.innerHTML = output;

        if (complete === queue.length) {
          resolve();
        } else {
          frameCountRef.current++;
          frameRef.current = requestAnimationFrame(step);
        }
      };

      cancelAnimationFrameSafe(frameRef.current);
      frameRef.current = requestAnimationFrame(step);
    });
  };

  useEffect(() => {
    if (!autoStart || phrases.length === 0) return;

    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        await setText(phrases[index]);
        onPhraseComplete?.(index);
        if (!loop && index === phrases.length - 1) break;
        await wait(pauseMs);
        setIndex((i) => (i + 1) % phrases.length);
      }
    };

    run();

    return () => {
      cancelled = true;
      cancelAnimationFrameSafe(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart, index, loop, pauseMs, phrases.join('|')]);

  return (
    <div className="container">
      <div
        ref={containerRef}
        className={textClass}
        // reserve some height to avoid layout shift between phrases of different lengths
        style={{ minHeight: '1em', lineHeight: 1.15, willChange: 'contents' }}
      />
    </div>
  );
}

/* helpers */
function randomChar(chars: string) {
  return chars[Math.floor(Math.random() * chars.length)];
}

function cancelAnimationFrameSafe(id: number | null) {
  if (id != null) cancelAnimationFrame(id);
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function escapeHtml(str: string) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export {TextScramble};
export default TextScramble;
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
