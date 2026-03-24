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
horizontal-scroll-carousel.tsx
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const Example = () => {
  return (
    <div className="bg-neutral-800">
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll down
        </span>
      </div>
      <HorizontalScrollCarousel />
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll up
        </span>
      </div>
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default Example;

const cards = [
  {
    "id": 1,
    "title": "Title 1",
    "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80&auto=format&fit=crop"
  },
  {
    "id": 2,
    "title": "Title 2",
    "url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&auto=format&fit=crop"
  },
  {
    "id": 3,
    "title": "Title 3",
    "url": "https://images.unsplash.com/photo-1602526216279-61258f121a1c?w=800&q=80&auto=format&fit=crop"
  },
  {
    "id": 4,
    "title": "Title 4",
    "url": "https://images.unsplash.com/photo-1612831195783-c994e079a3bb?w=800&q=80&auto=format&fit=crop"
  },
  {
    "id": 5,
    "title": "Title 5",
    "url": "https://images.unsplash.com/photo-1605460375648-278bcbd579a6?w=800&q=80&auto=format&fit=crop"
  },
  {
    "id": 6,
    "title": "Title 6",
    "url": "https://images.unsplash.com/photo-1616587891160-9446f49b7f10?w=800&q=80&auto=format&fit=crop"
  },
  {
    "id": 7,
    "title": "Title 7",
    "url": "https://images.unsplash.com/photo-1612831455544-e3a53c056cd7?w=800&q=80&auto=format&fit=crop"
  }
];

code.demo.1752899358995.tsx
import Example from "@/components/ui/horizontal-scroll-carousel";

export default function DemoOne() {
  return <Example />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/horizontal-scroll-carousel.tsx
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const Example = () => {
  return (
    <div className="bg-neutral-800">
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll down
        </span>
      </div>
      <HorizontalScrollCarousel />
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll up
        </span>
      </div>
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default Example;

const cards = [
  {
    "id": 1,
    "title": "Title 1",
    "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80&auto=format&fit=crop"
  },
  {
    "id": 2,
    "title": "Title 2",
    "url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&auto=format&fit=crop"
  },
  {
    "id": 3,
    "title": "Title 3",
    "url": "https://images.unsplash.com/photo-1602526216279-61258f121a1c?w=800&q=80&auto=format&fit=crop"
  },
  {
    "id": 4,
    "title": "Title 4",
    "url": "https://images.unsplash.com/photo-1612831195783-c994e079a3bb?w=800&q=80&auto=format&fit=crop"
  },
  {
    "id": 5,
    "title": "Title 5",
    "url": "https://images.unsplash.com/photo-1605460375648-278bcbd579a6?w=800&q=80&auto=format&fit=crop"
  },
  {
    "id": 6,
    "title": "Title 6",
    "url": "https://images.unsplash.com/photo-1616587891160-9446f49b7f10?w=800&q=80&auto=format&fit=crop"
  },
  {
    "id": 7,
    "title": "Title 7",
    "url": "https://images.unsplash.com/photo-1612831455544-e3a53c056cd7?w=800&q=80&auto=format&fit=crop"
  }
];
```

Install NPM dependencies:
```bash
framer-motion
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
