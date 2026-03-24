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
reaction.tsx
import { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Props = Omit<
  React.ComponentPropsWithoutRef<"button"> & {
    symbol?: string;
    scale?: number;
    y?: string;
    x?: string | number | (() => string | number);
    rotate?: string | number | (() => string | number);
  },
  "children"
>;

export const Reaction: React.FC<Props> = ({
  symbol,
  onClick: callback,
  ...props
}) => {
  const [flyingSymbols, setFlyingSymbols] = useState<
    { id: number; symbol: string }[]
  >([]);

  const onClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      callback?.(e);
      if (!symbol) return;

      const id = Date.now();
      setFlyingSymbols((flyingSymbols) => [...flyingSymbols, { id, symbol }]);
      setTimeout(() => {
        setFlyingSymbols((flyingSymbols) =>
          flyingSymbols.filter((e) => e.id !== id)
        );
      }, 1000);
    },
    [callback, symbol]
  );

  return (
    <button {...{ onClick, ...props }}>
      <AnimatePresence>
        {flyingSymbols.map(({ id, symbol }) => (
          <FlyingSymbol key={id} {...{ symbol }} />
        ))}
      </AnimatePresence>

      {symbol}
    </button>
  );
};

const FlyingSymbol: React.FC<Props> = ({
  symbol,
  rotate = () => Math.random() * 90 - 45,
  x = () => `${Math.random() * 200 - 100}%`,
  y = "-500%",
  scale = 2,
}) => {
  const animate = useMemo(
    () => ({
      rotate: typeof rotate === "function" ? rotate() : rotate,
      x: typeof x === "function" ? x() : x,
    }),
    [rotate, x]
  );

  return (
    <motion.div
      initial={{ y: 0, opacity: 1, scale: 1, rotate: 0, x: 0 }}
      animate={{ y, opacity: 0, scale, ...animate }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="absolute pointer-events-none"
    >
      {symbol}
    </motion.div>
  );
};

code.demo.tsx
import { Reaction } from "@/components/ui/reaction"

export const Demo: React.FC = () => {
  return (
    <section className="grid place-items-center absolute inset-4">
      <div className="flex p-2 bg-white/5 rounded-full w-fit ring-inset ring-1 ring-white/10">
        {["🔥", "💩"].map((symbol) => (
          <Reaction
            key={symbol} // do not use same symbol for multiple reactions
            className="grid place-items-center w-12 aspect-square rounded-full text-2xl select-none relative"
            {...{ symbol }}
          />
        ))}
      </div>
    </section>
  );
};
```

Copy-paste these files for dependencies:
```tsx
/components/ui/reaction.tsx
import { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Props = Omit<
  React.ComponentPropsWithoutRef<"button"> & {
    symbol?: string;
    scale?: number;
    y?: string;
    x?: string | number | (() => string | number);
    rotate?: string | number | (() => string | number);
  },
  "children"
>;

export const Reaction: React.FC<Props> = ({
  symbol,
  onClick: callback,
  ...props
}) => {
  const [flyingSymbols, setFlyingSymbols] = useState<
    { id: number; symbol: string }[]
  >([]);

  const onClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      callback?.(e);
      if (!symbol) return;

      const id = Date.now();
      setFlyingSymbols((flyingSymbols) => [...flyingSymbols, { id, symbol }]);
      setTimeout(() => {
        setFlyingSymbols((flyingSymbols) =>
          flyingSymbols.filter((e) => e.id !== id)
        );
      }, 1000);
    },
    [callback, symbol]
  );

  return (
    <button {...{ onClick, ...props }}>
      <AnimatePresence>
        {flyingSymbols.map(({ id, symbol }) => (
          <FlyingSymbol key={id} {...{ symbol }} />
        ))}
      </AnimatePresence>

      {symbol}
    </button>
  );
};

const FlyingSymbol: React.FC<Props> = ({
  symbol,
  rotate = () => Math.random() * 90 - 45,
  x = () => `${Math.random() * 200 - 100}%`,
  y = "-500%",
  scale = 2,
}) => {
  const animate = useMemo(
    () => ({
      rotate: typeof rotate === "function" ? rotate() : rotate,
      x: typeof x === "function" ? x() : x,
    }),
    [rotate, x]
  );

  return (
    <motion.div
      initial={{ y: 0, opacity: 1, scale: 1, rotate: 0, x: 0 }}
      animate={{ y, opacity: 0, scale, ...animate }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="absolute pointer-events-none"
    >
      {symbol}
    </motion.div>
  );
};
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
