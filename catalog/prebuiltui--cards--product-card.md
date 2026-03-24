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
cards.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Example() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      {/* Контейнер с колонкой */}
      <div className="flex flex-col items-center w-full">
        {/* Заголовок сверху */}
        <h1 className="text-3xl font-semibold">Latest Blog</h1>
        <p className="text-sm text-slate-500 mt-2 max-w-lg text-center">
          Stay ahead of the curve with fresh content on code, design, startups, and everything in between.
        </p>

        {/* Карточки */}
        <div className="mt-10 flex flex-wrap justify-center gap-8">
          <div className="max-w-72 w-full hover:-translate-y-0.5 transition duration-300">
            <img
              className="rounded-xl"
              src="https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=1200&h=800&auto=format&fit=crop&q=60"
              alt=""
            />
            <h3 className="text-base text-slate-900 font-medium mt-3">
              Color Psychology in UI: How to Choose the Right Palette
            </h3>
            <p className="text-xs text-indigo-600 font-medium mt-1">UI/UX design</p>
          </div>

          <div className="max-w-72 w-full hover:-translate-y-0.5 transition duration-300">
            <img
              className="rounded-xl"
              src="https://images.unsplash.com/photo-1714974528646-ea024a3db7a7?w=1200&h=800&auto=format&fit=crop&q=60"
              alt=""
            />
            <h3 className="text-base text-slate-900 font-medium mt-3">
              Understanding Typography: Crafting a Visual Voice for Your Brand
            </h3>
            <p className="text-xs text-indigo-600 font-medium mt-1">Branding</p>
          </div>

          <div className="max-w-72 w-full hover:-translate-y-0.5 transition duration-300">
            <img
              className="rounded-xl"
              src="https://images.unsplash.com/photo-1713947501966-34897f21162e?w=1200&h=800&auto=format&fit=crop&q=60"
              alt=""
            />
            <h3 className="text-base text-slate-900 font-medium mt-3">
              Design Thinking in Practice: How to Solve Real User Problems
            </h3>
            <p className="text-xs text-indigo-600 font-medium mt-1">Product Design</p>
          </div>
        </div>
      </div>
    </>
  );
}


code.demo.1757563124378.tsx
import React from "react";


const App = () => {
    const [count, setCount] = React.useState(0);

    const product = {
        name: "Casual Shoes",
        category: "Sports",
        price: 100,
        offerPrice: 80,
        rating: 4,
        image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImageWithoutBg.png",
    };

    return (
        <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
            <div className="group cursor-pointer flex items-center justify-center px-2">
                <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={product.image} alt={product.name} />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                        product.rating > i ? (
                            <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z" fill="#615fff" />
                            </svg>
                        ) : (
                            <svg width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z" fill="#615fff" fill-opacity="0.35" />
                            </svg>
                        )
                    ))}
                    <p>({product.rating})</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-indigo-500">
                        ${product.offerPrice} <span className="text-gray-500/60 md:text-sm text-xs line-through">${product.price}</span>
                    </p>
                    <div className="text-indigo-500">
                        {count === 0 ? (
                            <button className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium" onClick={() => setCount(1)} >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#615fff" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-indigo-500/25 rounded select-none">
                                <button onClick={() => setCount((prev) => Math.max(prev - 1, 0))} className="cursor-pointer text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-5 text-center">{count}</span>
                                <button onClick={() => setCount((prev) => prev + 1)} className="cursor-pointer text-md px-2 h-full" >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/cards.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Example() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      {/* Контейнер с колонкой */}
      <div className="flex flex-col items-center w-full">
        {/* Заголовок сверху */}
        <h1 className="text-3xl font-semibold">Latest Blog</h1>
        <p className="text-sm text-slate-500 mt-2 max-w-lg text-center">
          Stay ahead of the curve with fresh content on code, design, startups, and everything in between.
        </p>

        {/* Карточки */}
        <div className="mt-10 flex flex-wrap justify-center gap-8">
          <div className="max-w-72 w-full hover:-translate-y-0.5 transition duration-300">
            <img
              className="rounded-xl"
              src="https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=1200&h=800&auto=format&fit=crop&q=60"
              alt=""
            />
            <h3 className="text-base text-slate-900 font-medium mt-3">
              Color Psychology in UI: How to Choose the Right Palette
            </h3>
            <p className="text-xs text-indigo-600 font-medium mt-1">UI/UX design</p>
          </div>

          <div className="max-w-72 w-full hover:-translate-y-0.5 transition duration-300">
            <img
              className="rounded-xl"
              src="https://images.unsplash.com/photo-1714974528646-ea024a3db7a7?w=1200&h=800&auto=format&fit=crop&q=60"
              alt=""
            />
            <h3 className="text-base text-slate-900 font-medium mt-3">
              Understanding Typography: Crafting a Visual Voice for Your Brand
            </h3>
            <p className="text-xs text-indigo-600 font-medium mt-1">Branding</p>
          </div>

          <div className="max-w-72 w-full hover:-translate-y-0.5 transition duration-300">
            <img
              className="rounded-xl"
              src="https://images.unsplash.com/photo-1713947501966-34897f21162e?w=1200&h=800&auto=format&fit=crop&q=60"
              alt=""
            />
            <h3 className="text-base text-slate-900 font-medium mt-3">
              Design Thinking in Practice: How to Solve Real User Problems
            </h3>
            <p className="text-xs text-indigo-600 font-medium mt-1">Product Design</p>
          </div>
        </div>
      </div>
    </>
  );
}

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
