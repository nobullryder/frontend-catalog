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
social-links.tsx
// component.tsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type Social = {
  name: string;
  image: string;
};

interface AnimatedSocialLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  socials: Social[];
}

const AnimatedSocialLinks = React.forwardRef<
  HTMLDivElement,
  AnimatedSocialLinksProps
>(({ socials, className, ...props }, ref) => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [cliked, setCliked] = useState<boolean>(false);

  const animation = {
    scale: cliked ? [1, 1.3, 1] : 1,
    transition: { duration: 0.3 },
  };

  useEffect(() => {
    const handleClick = () => {
      setCliked(true);
      setTimeout(() => {
        setCliked(false);
      }, 200);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [cliked]);

  return (
    <div
      ref={ref}
      className="flex items-center justify-center gap-0"
      {...props}
    >
      {socials.map((social, index) => (
        <div
          className={`relative cursor-pointer px-5 py-2 transition-opacity duration-200 ${
            hoveredSocial && hoveredSocial !== social.name
              ? 'opacity-50'
              : 'opacity-100'
          }`}
          key={index}
          onMouseEnter={() => {
            setHoveredSocial(social.name);
            setRotation(Math.random() * 20 - 10);
          }}
          onMouseLeave={() => setHoveredSocial(null)}
          onClick={() => {
            setCliked(true);
          }}
        >
          <span className="block text-lg text-white">{social.name}</span>
          <AnimatePresence>
            {hoveredSocial === social.name && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 flex h-full w-full items-center justify-center"
                animate={animation}
              >
                <motion.img
                  key={social.name}
                  src={social.image}
                  alt={social.name}
                  className="size-16"
                  initial={{
                    y: -40,
                    rotate: rotation,
                    opacity: 0,
                    filter: 'blur(2px)',
                  }}
                  animate={{ y: -50, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -40, opacity: 0, filter: 'blur(2px)' }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
});

AnimatedSocialLinks.displayName = 'AnimatedSocialLinks';

export default AnimatedSocialLinks;

code.demo.1749421857897.tsx
// demo.tsx
import AnimatedSocialLinks, {
  type Social,
} from '@/components/ui/social-links';

const AnimatedSocialLinksDemo = () => {
  const socials: Social[] = [
    {
      name: 'Instagram',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',
    },
    {
      name: 'LinkedIn',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
    },
    {
      name: 'Spotify',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg',
    },
    {
      name: 'TikTok',
      image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg',
    },
  ];

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-black px-4 py-10">
      <AnimatedSocialLinks socials={socials} />
    </main>
  );
};

export { AnimatedSocialLinksDemo as DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/social-links.tsx
// component.tsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type Social = {
  name: string;
  image: string;
};

interface AnimatedSocialLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  socials: Social[];
}

const AnimatedSocialLinks = React.forwardRef<
  HTMLDivElement,
  AnimatedSocialLinksProps
>(({ socials, className, ...props }, ref) => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [cliked, setCliked] = useState<boolean>(false);

  const animation = {
    scale: cliked ? [1, 1.3, 1] : 1,
    transition: { duration: 0.3 },
  };

  useEffect(() => {
    const handleClick = () => {
      setCliked(true);
      setTimeout(() => {
        setCliked(false);
      }, 200);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [cliked]);

  return (
    <div
      ref={ref}
      className="flex items-center justify-center gap-0"
      {...props}
    >
      {socials.map((social, index) => (
        <div
          className={`relative cursor-pointer px-5 py-2 transition-opacity duration-200 ${
            hoveredSocial && hoveredSocial !== social.name
              ? 'opacity-50'
              : 'opacity-100'
          }`}
          key={index}
          onMouseEnter={() => {
            setHoveredSocial(social.name);
            setRotation(Math.random() * 20 - 10);
          }}
          onMouseLeave={() => setHoveredSocial(null)}
          onClick={() => {
            setCliked(true);
          }}
        >
          <span className="block text-lg text-white">{social.name}</span>
          <AnimatePresence>
            {hoveredSocial === social.name && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 flex h-full w-full items-center justify-center"
                animate={animation}
              >
                <motion.img
                  key={social.name}
                  src={social.image}
                  alt={social.name}
                  className="size-16"
                  initial={{
                    y: -40,
                    rotate: rotation,
                    opacity: 0,
                    filter: 'blur(2px)',
                  }}
                  animate={{ y: -50, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -40, opacity: 0, filter: 'blur(2px)' }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
});

AnimatedSocialLinks.displayName = 'AnimatedSocialLinks';

export default AnimatedSocialLinks;
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
