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
3d-book-testimonial.tsx
'use client'
import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { useMediaQuery } from '@react-hook/media-query';
import Image from 'next/image';

interface Testimonial {
  image?: string;
  text: string;
  name: string;
  jobtitle: string;
  rating: number;
}

interface ComponentProps {
  testimonials: Testimonial[];
}

export const Component = ({ testimonials }: ComponentProps) => {

  const book = useRef<typeof HTMLFlipBook>(null);

  const isSmallScreen = useMediaQuery('(min-width: 640px)');
  const smallerDevice = isSmallScreen ? false : true;

  const handleFlip = (pageNum: number) => {
    (book.current as any)?.pageFlip()?.flip(pageNum);
    (book.current as any)?.pageFlip()?.flipNext(false);
  }

  const SerenityLogo = 'https://imgur.com/SerenityLogoPlaceholder.png'; // Placeholder for SerenityLogo

  return (
    <div className="w-full text-black h-500px flex justify-center items-center py-10">
      <HTMLFlipBook
      ref={book}
      width={300}
      height={450}
      showCover={true}
      usePortrait={smallerDevice}
      onFlip={(e) => console.log(e.data)}
      onChangeState={(e) => console.log(e.data)}
      className={''}
      style={{}}
      startPage={0}
      size={'fixed'}
      minWidth={0}
      maxWidth={0}
      minHeight={0}
      maxHeight={0}
      drawShadow={true}
      flippingTime={1000}
      startZIndex={0}
      autoSize={false}
      maxShadowOpacity={0}
      mobileScrollSupport={true}
      clickEventForward={true}
      useMouseEvents={true}
      swipeDistance={0}
      showPageCorners={true}
      disableFlipByClick={false}>
      
      <div className="relative bg-black border rounded-lg p-8 text-white flex flex-col items-center justify-center shadow-lg shadow-gray-600 cursor-grab">
      <div className="flex justify-center items-center ">
        <Image src={SerenityLogo} alt="Serenity UI Logo" width={100} height={100} />
      </div>
      <h1 className="text-4xl mb-36 text-center relative z-10">Serenity UI</h1>
      <div className="w-full h-1 bg-white mb-6 relative z-10"></div>
      <div className='text-center'>
        <span className="text-lg text-white text-center hover:text-gray-300 transition-colors duration-300 relative z-10">
          Read what virtual people are saying about us
        </span>
      </div>
    </div>

        <div className="w-full h-full flex justify-center items-center bg-zinc-200 border border-gray-300 box-border">
          <div className="page-front text-start text-white p-3 bg-gray-400">Index</div>
          <div className="flex flex-col justify-start items-start p-8 space-y-3">
            <div>
              <ol className="grid grid-cols-2 gap-2 ">
                {testimonials.map((testimonial, index) => (
                  <React.Fragment key={index}>
                    <li onClick={() => handleFlip(index + 2)} className="flex justify-start items-center text-xs cursor-pointer">
                      <Image src={testimonial.image || ''} alt='image' width={20} height={20} className='rounded-full mr-2' />
                      {testimonial.name}
                    </li>
                    <li className="flex justify-end text-xs items-center">{index + 2}</li>
                  </React.Fragment>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-full h-full flex justify-center items-center bg-gray-200 border border-gray-300 box-border cursor-grab">
            <div className="page-front text-end text-white p-3 bg-gray-400">{index + 2}</div>
            <div className='flex justify-center items-center mt-7 '>
              <Image src={testimonial.image || ''} alt='image' width={100} height={100} className='rounded-full' />
            </div>
            <div className='flex flex-col justify-center items-center mt-3'>
              <span>{testimonial.name}</span>
              <span className='text-gray-500 text-sm'>{testimonial.jobtitle}</span>
            </div>
            <div className='p-5 font-serif font-semibold text-center mt'>{testimonial.text}</div>
            <div className='flex justify-center items-center mt-3 '>
              {[...Array(testimonial.rating)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFA800" className="size-8">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              ))}
              {[...Array(5 - testimonial.rating)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#CBD5E1" className="size-8">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-black border p-8  text-white flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4 text-center font-serif">Thank You!</h1>
          <p className="text-lg text-center">We appreciate your feedback</p>
        </div>
        
      </HTMLFlipBook>
    </div>
  );
}

code.demo.1750533934264.tsx
// This is a demo of a preview
'use client'
import { Component } from "@/components/ui/3d-book-testimonial";

const DemoOne = () => {
  const testimonials = [
    {
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      text: 'This component library is incredibly versatile. It saved me hours of development time.',
      name: 'Ethan Smith',
      jobtitle: 'Software Engineer',
      rating: 5,
    },
    {
      image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      text: 'The seamless integration and intuitive design of these components are truly impressive.',
      name: 'Olivia Chen',
      jobtitle: 'Product Manager',
      rating: 4,
    },
    {
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      text: 'As a UX designer, I appreciate the attention to detail. The components are well-crafted.',
      name: 'Liam Johnson',
      jobtitle: 'UX Designer',
      rating: 5,
    },
    {
      image: 'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      text: 'This library is a game-changer for our marketing efforts. It has significantly boosted our conversion rates!',
      name: 'Ava Martinez',
      jobtitle: 'Marketing Specialist',
      rating: 5,
    },
    {
      image: 'https://images.unsplash.com/photo-1507003211169-0a6dd7228f2d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8fHx8fA%3D%3D',
      text: 'Developing with these components is a breeze. The documentation is clear and helpful.',
      name: 'Noah Williams',
      jobtitle: 'Full Stack Developer',
      rating: 4,
    },
    {
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      text: 'The components are fantastic! They make our content more dynamic and engaging. Highly recommend it.',
      name: 'Sophia Brown',
      jobtitle: 'Content Creator',
      rating: 5,
    },
    {
      image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      text: 'As a startup, efficiency is key. This component library provides high-quality, ready-to-use solutions.',
      name: 'James Davis',
      jobtitle: 'Startup Founder',
      rating: 5,
    },
    {
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      text: 'Solid components and excellent performance. They integrate smoothly and provide a rich user experience.',
      name: 'Benjamin Miller',
      jobtitle: 'Backend Engineer',
      rating: 4,
    },
  ];

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Component testimonials={testimonials} />
    </div>
  );
};

export default DemoOne;1
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/3d-book-testimonial.tsx
'use client'
import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { useMediaQuery } from '@react-hook/media-query';
import Image from 'next/image';

interface Testimonial {
  image?: string;
  text: string;
  name: string;
  jobtitle: string;
  rating: number;
}

interface ComponentProps {
  testimonials: Testimonial[];
}

export const Component = ({ testimonials }: ComponentProps) => {

  const book = useRef<typeof HTMLFlipBook>(null);

  const isSmallScreen = useMediaQuery('(min-width: 640px)');
  const smallerDevice = isSmallScreen ? false : true;

  const handleFlip = (pageNum: number) => {
    (book.current as any)?.pageFlip()?.flip(pageNum);
    (book.current as any)?.pageFlip()?.flipNext(false);
  }

  const SerenityLogo = 'https://imgur.com/SerenityLogoPlaceholder.png'; // Placeholder for SerenityLogo

  return (
    <div className="w-full text-black h-500px flex justify-center items-center py-10">
      <HTMLFlipBook
      ref={book}
      width={300}
      height={450}
      showCover={true}
      usePortrait={smallerDevice}
      onFlip={(e) => console.log(e.data)}
      onChangeState={(e) => console.log(e.data)}
      className={''}
      style={{}}
      startPage={0}
      size={'fixed'}
      minWidth={0}
      maxWidth={0}
      minHeight={0}
      maxHeight={0}
      drawShadow={true}
      flippingTime={1000}
      startZIndex={0}
      autoSize={false}
      maxShadowOpacity={0}
      mobileScrollSupport={true}
      clickEventForward={true}
      useMouseEvents={true}
      swipeDistance={0}
      showPageCorners={true}
      disableFlipByClick={false}>
      
      <div className="relative bg-black border rounded-lg p-8 text-white flex flex-col items-center justify-center shadow-lg shadow-gray-600 cursor-grab">
      <div className="flex justify-center items-center ">
        <Image src={SerenityLogo} alt="Serenity UI Logo" width={100} height={100} />
      </div>
      <h1 className="text-4xl mb-36 text-center relative z-10">Serenity UI</h1>
      <div className="w-full h-1 bg-white mb-6 relative z-10"></div>
      <div className='text-center'>
        <span className="text-lg text-white text-center hover:text-gray-300 transition-colors duration-300 relative z-10">
          Read what virtual people are saying about us
        </span>
      </div>
    </div>

        <div className="w-full h-full flex justify-center items-center bg-zinc-200 border border-gray-300 box-border">
          <div className="page-front text-start text-white p-3 bg-gray-400">Index</div>
          <div className="flex flex-col justify-start items-start p-8 space-y-3">
            <div>
              <ol className="grid grid-cols-2 gap-2 ">
                {testimonials.map((testimonial, index) => (
                  <React.Fragment key={index}>
                    <li onClick={() => handleFlip(index + 2)} className="flex justify-start items-center text-xs cursor-pointer">
                      <Image src={testimonial.image || ''} alt='image' width={20} height={20} className='rounded-full mr-2' />
                      {testimonial.name}
                    </li>
                    <li className="flex justify-end text-xs items-center">{index + 2}</li>
                  </React.Fragment>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-full h-full flex justify-center items-center bg-gray-200 border border-gray-300 box-border cursor-grab">
            <div className="page-front text-end text-white p-3 bg-gray-400">{index + 2}</div>
            <div className='flex justify-center items-center mt-7 '>
              <Image src={testimonial.image || ''} alt='image' width={100} height={100} className='rounded-full' />
            </div>
            <div className='flex flex-col justify-center items-center mt-3'>
              <span>{testimonial.name}</span>
              <span className='text-gray-500 text-sm'>{testimonial.jobtitle}</span>
            </div>
            <div className='p-5 font-serif font-semibold text-center mt'>{testimonial.text}</div>
            <div className='flex justify-center items-center mt-3 '>
              {[...Array(testimonial.rating)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFA800" className="size-8">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              ))}
              {[...Array(5 - testimonial.rating)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#CBD5E1" className="size-8">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-black border p-8  text-white flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4 text-center font-serif">Thank You!</h1>
          <p className="text-lg text-center">We appreciate your feedback</p>
        </div>
        
      </HTMLFlipBook>
    </div>
  );
}
```

Install NPM dependencies:
```bash
next, react-pageflip, @react-hook/media-query
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
