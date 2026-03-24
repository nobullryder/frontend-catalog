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
card-grid.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * @interface Article
 * Defines the structure for a single article card.
 * @param {string | number} id - A unique identifier for the article.
 * @param {string} imageSrc - URL for the article's image.
 * @param {string} title - The main heading of the article.
 * @param {string} linkText - The text for the call-to-action link.
 * @param {string} linkHref - The URL the article card will link to.
 */
interface Article {
  id: string | number;
  imageSrc: string;
  title: string;
  linkText: string;
  linkHref: string;
}

/**
 * @interface ArticleCardGridProps
 * Defines the props for the ArticleCardGrid component.
 * @param {string} title - The main title displayed above the grid.
 * @param {Article[]} articles - An array of article objects to display.
 */
interface ArticleCardGridProps {
  title: string;
  articles: Article[];
}

/**
 * A responsive grid of article cards with a title.
 * Features animations on load and hover.
 */
export const ArticleCardGrid: React.FC<ArticleCardGridProps> = ({ title, articles }) => {
  // Animation variant for the grid container to stagger children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variant for each card item
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4 md:px-6 bg-background text-foreground">
      <h2 className="text-3xl font-bold tracking-tight mb-8">
        {title}
      </h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {articles.map((article) => (
          <motion.a
            key={article.id}
            href={article.linkHref}
            className="group block overflow-hidden rounded-lg bg-card border hover:border-primary/50 transition-colors duration-300"
            variants={itemVariants}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              {/* Card Image */}
              <div className="overflow-hidden">
                 <img
                    src={article.imageSrc}
                    alt={article.title}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-card-foreground mb-4 flex-grow">
                  {article.title}
                </h3>
                <div className="flex items-center text-sm font-medium text-primary mt-auto">
                  {article.linkText}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
};

code.demo.1759553147367.tsx
import React from 'react';
import { ArticleCardGrid } from '@/components/ui/card-grid'; // Adjust the import path as needed

const ArticleCardGridDemo = () => {
  // Sample data for the article cards
  const articles = [
    {
      id: 1,
      imageSrc: 'https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'How to reduce the carbon footprint of business travel',
      linkText: 'See how',
      linkHref: '#',
    },
    {
      id: 2,
      imageSrc: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'The perks and benefits your employees want now',
      linkText: 'Find out',
      linkHref: '#',
    },
    {
      id: 3,
      imageSrc: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'The road to sustainability: executives discuss their efforts toward net zero',
      linkText: 'Keep reading',
      linkHref: '#',
    },
  ];

  return (
    <div className="flex items-center justify-center w-full bg-background">
      <ArticleCardGrid title="Interested in learning more?" articles={articles} />
    </div>
  );
};

export default ArticleCardGridDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-grid.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * @interface Article
 * Defines the structure for a single article card.
 * @param {string | number} id - A unique identifier for the article.
 * @param {string} imageSrc - URL for the article's image.
 * @param {string} title - The main heading of the article.
 * @param {string} linkText - The text for the call-to-action link.
 * @param {string} linkHref - The URL the article card will link to.
 */
interface Article {
  id: string | number;
  imageSrc: string;
  title: string;
  linkText: string;
  linkHref: string;
}

/**
 * @interface ArticleCardGridProps
 * Defines the props for the ArticleCardGrid component.
 * @param {string} title - The main title displayed above the grid.
 * @param {Article[]} articles - An array of article objects to display.
 */
interface ArticleCardGridProps {
  title: string;
  articles: Article[];
}

/**
 * A responsive grid of article cards with a title.
 * Features animations on load and hover.
 */
export const ArticleCardGrid: React.FC<ArticleCardGridProps> = ({ title, articles }) => {
  // Animation variant for the grid container to stagger children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variant for each card item
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4 md:px-6 bg-background text-foreground">
      <h2 className="text-3xl font-bold tracking-tight mb-8">
        {title}
      </h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {articles.map((article) => (
          <motion.a
            key={article.id}
            href={article.linkHref}
            className="group block overflow-hidden rounded-lg bg-card border hover:border-primary/50 transition-colors duration-300"
            variants={itemVariants}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              {/* Card Image */}
              <div className="overflow-hidden">
                 <img
                    src={article.imageSrc}
                    alt={article.title}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-card-foreground mb-4 flex-grow">
                  {article.title}
                </h3>
                <div className="flex items-center text-sm font-medium text-primary mt-auto">
                  {article.linkText}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
};
```

Install NPM dependencies:
```bash
framer-motion, lucide-react
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
