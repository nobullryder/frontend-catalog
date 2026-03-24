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

export default function HeroCarousel() {
  const slides = [
    {
      title: "Discover Amazing Places",
      subtitle: "Explore the world's most beautiful destinations",
      image: "https://picsum.photos/seed/hero1/1200/600",
      cta: "Start Exploring",
    },
    {
      title: "Adventure Awaits",
      subtitle: "Create memories that will last a lifetime",
      image: "https://picsum.photos/seed/hero2/1200/600",
      cta: "Book Now",
    },
    {
      title: "Journey Beyond",
      subtitle: "Experience luxury travel like never before",
      image: "https://picsum.photos/seed/hero3/1200/600",
      cta: "Learn More",
    },
  ];

  return (
    <Carousel.Root
      defaultPage={0}
      slideCount={slides.length}
      autoplay
      className="w-full"
    >
      <div className="relative">
        <Carousel.ItemGroup className="overflow-hidden rounded-xl">
          {slides.map((slide, index) => (
            <Carousel.Item key={index} index={index}>
              <div className="relative h-96 lg:h-[500px]">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                  <div className="max-w-2xl px-6">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-xl lg:text-2xl mb-8 text-gray-200">
                      {slide.subtitle}
                    </p>
                    <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
                      {slide.cta}
                    </button>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>

        <Carousel.Control className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
          <Carousel.PrevTrigger className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-all pointer-events-auto text-white backdrop-blur-xs">
            ←
          </Carousel.PrevTrigger>
          <Carousel.NextTrigger className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-all pointer-events-auto text-white backdrop-blur-xs">
            →
          </Carousel.NextTrigger>
        </Carousel.Control>
      </div>

      <Carousel.IndicatorGroup className="flex justify-center items-center mt-6 gap-3">
        {slides.map((_, index) => (
          <Carousel.Indicator
            key={index}
            index={index}
            className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600 data-current:bg-blue-500 dark:data-current:bg-blue-400 data-current:w-8 transition-all cursor-pointer"
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
