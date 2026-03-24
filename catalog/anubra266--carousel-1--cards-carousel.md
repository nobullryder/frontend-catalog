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
carousel-1.tsx

import { Carousel } from "@ark-ui/react/carousel";

export default function BasicCarousel() {
  const images = Array.from(
    { length: 5 },
    (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`
  );

  return (
    <Carousel.Root
      defaultPage={0}
      slideCount={images.length}
      className="max-w-md mx-auto"
    >
      <Carousel.Control className="flex items-center justify-between mb-4">
        <Carousel.PrevTrigger className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors">
          Previous
        </Carousel.PrevTrigger>
        <Carousel.NextTrigger className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors">
          Next
        </Carousel.NextTrigger>
      </Carousel.Control>

      <Carousel.ItemGroup className="overflow-hidden rounded-lg">
        {images.map((image, index) => (
          <Carousel.Item key={index} index={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 object-cover"
            />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      <Carousel.IndicatorGroup className="flex justify-center items-center mt-4 gap-2">
        {images.map((_, index) => (
          <Carousel.Indicator
            key={index}
            index={index}
            className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 data-current:bg-blue-500 transition-colors cursor-pointer"
          />
        ))}
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  );
}


code.demo.1756419020961.tsx
import { Carousel } from "@ark-ui/react/carousel";

export default function CardsCarousel() {
  const cards = [
    {
      id: 1,
      title: "Mountain Adventure",
      description: "Explore breathtaking mountain landscapes",
      image: "https://picsum.photos/seed/30/400/250",
    },
    {
      id: 2,
      title: "Ocean Views",
      description: "Discover pristine coastal destinations",
      image: "https://picsum.photos/seed/31/400/250",
    },
    {
      id: 3,
      title: "Forest Escape",
      description: "Immerse yourself in nature's tranquility",
      image: "https://picsum.photos/seed/32/400/250",
    },
    {
      id: 4,
      title: "Urban Explorer",
      description: "Experience vibrant city culture",
      image: "https://picsum.photos/seed/33/400/250",
    },
  ];

  return (
    <Carousel.Root
      defaultPage={0}
      slideCount={cards.length}
      className="max-w-lg mx-auto"
    >
      <Carousel.Control className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Featured Destinations
        </h2>
        <div className="flex gap-2">
          <Carousel.PrevTrigger className="p-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full shadow-md border transition-colors">
            ←
          </Carousel.PrevTrigger>
          <Carousel.NextTrigger className="p-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full shadow-md border transition-colors">
            →
          </Carousel.NextTrigger>
        </div>
      </Carousel.Control>

      <Carousel.ItemGroup className="overflow-hidden">
        {cards.map((card, index) => (
          <Carousel.Item key={index} index={index}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {card.description}
                </p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      <Carousel.IndicatorGroup className="flex justify-center items-center mt-6 gap-2">
        {cards.map((_, index) => (
          <Carousel.Indicator
            key={index}
            index={index}
            className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 data-current:bg-blue-500 dark:data-current:bg-blue-400 data-current:w-6 transition-all cursor-pointer"
          />
        ))}
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/carousel-1.tsx

import { Carousel } from "@ark-ui/react/carousel";

export default function BasicCarousel() {
  const images = Array.from(
    { length: 5 },
    (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`
  );

  return (
    <Carousel.Root
      defaultPage={0}
      slideCount={images.length}
      className="max-w-md mx-auto"
    >
      <Carousel.Control className="flex items-center justify-between mb-4">
        <Carousel.PrevTrigger className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors">
          Previous
        </Carousel.PrevTrigger>
        <Carousel.NextTrigger className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors">
          Next
        </Carousel.NextTrigger>
      </Carousel.Control>

      <Carousel.ItemGroup className="overflow-hidden rounded-lg">
        {images.map((image, index) => (
          <Carousel.Item key={index} index={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 object-cover"
            />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      <Carousel.IndicatorGroup className="flex justify-center items-center mt-4 gap-2">
        {images.map((_, index) => (
          <Carousel.Indicator
            key={index}
            index={index}
            className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 data-current:bg-blue-500 transition-colors cursor-pointer"
          />
        ))}
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  );
}

```

Install NPM dependencies:
```bash
@ark-ui/react
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
