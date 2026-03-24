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
import { StarIcon, QuoteIcon } from "lucide-react";

export default function TestimonialsCarousel() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechCorp",
      content:
        "This product has completely transformed how we work. The results have been incredible.",
      rating: 5,
      avatar: "https://i.pravatar.cc/100?seed=sarah",
    },
    {
      name: "Michael Chen",
      role: "Designer, Creative Studio",
      content:
        "Outstanding quality and attention to detail. Highly recommend to anyone looking for excellence.",
      rating: 5,
      avatar: "https://i.pravatar.cc/100?seed=michael",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      content:
        "The team was professional and delivered exactly what we needed. Exceeded our expectations.",
      rating: 5,
      avatar: "https://i.pravatar.cc/100?seed=emily",
    },
  ];

  return (
    <Carousel.Root
      defaultPage={0}
      slideCount={testimonials.length}
      className="max-w-2xl mx-auto"
    >
      <Carousel.ItemGroup className="min-h-64">
        {testimonials.map((testimonial, index) => (
          <Carousel.Item
            key={index}
            index={index}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-base border border-gray-200 dark:border-gray-700 text-center"
          >
            <QuoteIcon className="w-8 h-8 text-blue-500 mx-auto mb-4" />
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 italic">
              "{testimonial.content}"
            </p>
            <div className="flex items-center justify-center gap-1 mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <StarIcon
                  key={i}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <div className="flex items-center justify-center gap-3">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      <div className="flex items-center justify-between mt-6">
        <Carousel.PrevTrigger className="p-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors">
          ←
        </Carousel.PrevTrigger>

        <Carousel.IndicatorGroup className="flex gap-2">
          {testimonials.map((_, index) => (
            <Carousel.Indicator
              key={index}
              index={index}
              className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 data-current:bg-blue-500 dark:data-current:bg-blue-400 transition-colors cursor-pointer"
            />
          ))}
        </Carousel.IndicatorGroup>

        <Carousel.NextTrigger className="p-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors">
          →
        </Carousel.NextTrigger>
      </div>
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
