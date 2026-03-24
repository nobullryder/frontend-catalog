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
voice-testimonial.tsx
'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { RiTwitterXLine } from 'react-icons/ri';
import { motion, Variants } from 'framer-motion';

type Mode = 'light' | 'dark';

interface Testimonial {
  image?: string;
  name?: string;
  jobtitle?: string;
  text?: string;
  audio?: string;
  social?: string;
}

interface ComponentProps {
  mode: Mode;
  testimonials: Testimonial[];
}

const WaveVariants = (): Variants[] => {
  const waveVariants: Variants[] = [];
  for (let i = 0; i < 30; i++) {
    waveVariants.push({
      initial: {
        scaleY: 1.5,
        transition: {
          duration: 0.5,
        },
      },
      animate: {
        scaleY: [1, Math.random() * 1.2 + 1, 1],
        transition: {
          duration: Math.random() * 0.5 + 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: Math.random() * 0.5,
        },
      },
    });
  }
  return waveVariants;
};

const waveVariants = WaveVariants();

export const Component: React.FC<ComponentProps> = ({ mode, testimonials }) => {
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null);
  const [audioElements, setAudioElements] = useState<(HTMLAudioElement | null)[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    
    const elements: (HTMLAudioElement | null)[] = [];
    testimonials.forEach((testimonial) => {
      if (testimonial.audio) {
        const audio = new Audio(`/audio/${testimonial.audio}`);
        audio.addEventListener('ended', handleAudioEnded);
        elements.push(audio);
      } else {
        elements.push(null);
      }
    });
    setAudioElements(elements);

    
    return () => {
      elements.forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.removeEventListener('ended', handleAudioEnded);
        }
      });
    };
  }, [testimonials]);

  const handlePlay = (index: number) => {
    if (currentPlayingIndex !== null && currentPlayingIndex !== index) {
      stopAudio(currentPlayingIndex);
    }

    const audio = audioElements[index];
    if (audio) {
      audio.play().catch((error) => console.error('Audio playback error:', error));
      setCurrentPlayingIndex(index);
    }
  };

  const stopAudio = (index: number) => {
    const audio = audioElements[index];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setCurrentPlayingIndex(null);
    }
  };

  const handlePause = (index: number) => {
    stopAudio(index);
  };

  const handleAudioEnded = () => {
    setCurrentPlayingIndex(null);
  };

  const handleLoadMore = () => {
    setShowAll(true);
  };

  const openInNewTab = (url: string) => {
    const win = window.open(url, '_blank');
    if (win) {
      win.focus();
    }
  };

  const shouldShowLoadMore = testimonials.length > 6;

  return (
    <div>
      <div className="flex flex-col items-center justify-center pt-5">
        <div className="flex flex-col gap-5 mb-8">
          <span className="text-center text-4xl">Read what people are saying</span>
          <span className="text-center text-slate-300">
            Dummy feedback from virtual customers <br /> using our component library.
          </span>
        </div>
      </div>
      <div className="relative">
        <div className={`flex justify-center items-center gap-5 flex-wrap shadow-black overflow-hidden ${showAll ? 'max-h-full' : 'max-h-[720px]'} relative`}>
          {shouldShowLoadMore && !showAll && <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10"></div>}
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`${
                mode === 'dark' ? 'bg-black' : 'bg-white'
              } border border-zinc-400 w-80 h-auto rounded-2xl p-5 relative ${
                !showAll && index >= 6 ? 'testimonial-partially-visible' : ''
              }`}>
              <div onClick={() => openInNewTab(testimonial.social || '')} className="absolute top-5 right-5">
                <RiTwitterXLine
                  className={`${mode === 'dark' ? 'text-white' : 'text-slate-800'} cursor-pointer`}
                  size={20}
                />
              </div>
              <div className="flex items-center">
                <Image
                  src={testimonial.image || 'https://via.placeholder.com/50'}
                  alt="profile"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="flex flex-col pl-4">
                  <span className={`${mode === 'dark' ? 'text-white' : 'text-black'}`}>{testimonial.name}</span>
                  <span className={`${mode === 'dark' ? 'text-zinc-300' : 'text-zinc-600'} text-sm`}>
                    {testimonial.jobtitle}
                  </span>
                </div>
              </div>
              <div className="mt-5 mb-1">
                <span className={`${mode === 'dark' ? 'text-slate-200' : 'text-black'}`}>{testimonial.text}</span>
              </div>
              <div className={`${mode === 'dark'? 'bg-zinc-200' : 'bg-slate-100'}  w-full h-12 mt-4 rounded-lg flex justify-between items-center p-2 relative`}>
                {currentPlayingIndex !== index ? (
                  <span onClick={() => handlePlay(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${mode === 'dark'? 'text-zinc-900' : 'text-slate-600'} size-10 `}>
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                      />
                    </svg>
                  </span>
                ) : (
                  <span onClick={() => handlePause(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${mode === 'dark'? 'text-zinc-900' : 'text-slate-600'} size-10 `}>
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM9 8.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H9Zm5.25 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-.75Z"
                      />
                    </svg>
                  </span>
                )}
                <div className="flex">
                  {waveVariants.map((variant, i) => (
                    <motion.div
                      key={i}
                      className={`${mode === 'dark'? 'bg-zinc-900' : 'bg-slate-600'}`}
                      style={{
                        width: '3px',
                        height: `${Math.random() * 20 + 5}px`,
                        margin: '0 2px',
                        borderRadius: '2px',
                      }}
                      variants={variant}
                      initial="initial"
                      animate={currentPlayingIndex === index ? 'animate' : 'initial'}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {shouldShowLoadMore && !showAll && (
          <div className="flex justify-center mt-8">
            <button
              className="px-5 py-2 bg-zinc-200 text-black rounded-md hover:bg-zinc-300 transition"
              onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

code.demo.1750533583100.tsx
// This is a demo of a preview
'use client';
import { Component } from "@/components/ui/voice-testimonial";

const DemoOne = () => {
  const testimonials = [
    {
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Ethan Smith',
      jobtitle: 'Software Engineer',
      text: 'This component library is incredibly versatile. It saved me hours of development time. The voice testimonials are a brilliant addition!',
      audio: 'ethan-smith.mp3',
      social: 'https://twitter.com/ethansmithdev',
    },
    {
      image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Olivia Chen',
      jobtitle: 'Product Manager',
      text: 'The seamless integration and intuitive design of these components are truly impressive. Our users love the new audio testimonials!',
      audio: 'olivia-chen.mp3',
      social: 'https://twitter.com/oliviachenpm',
    },
    {
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Liam Johnson',
      jobtitle: 'UX Designer',
      text: 'As a UX designer, I appreciate the attention to detail. The audio feature adds a new dimension to testimonials, making them more engaging.',
      audio: 'liam-johnson.mp3',
      social: 'https://twitter.com/liamjohnsonux',
    },
    {
      image: 'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Ava Martinez',
      jobtitle: 'Marketing Specialist',
      text: 'This library is a game-changer for our marketing efforts. The voice testimonials have significantly boosted our conversion rates!',
      audio: 'ava-martinez.mp3',
      social: 'https://twitter.com/avamarketing',
    },
    {
      image: 'https://images.unsplash.com/photo-1507003211169-0a6dd7228f2d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Noah Williams',
      jobtitle: 'Full Stack Developer',
      text: 'Developing with these components is a breeze. The documentation is clear, and the audio testimonials offer a unique user experience.',
      audio: 'noah-williams.mp3',
      social: 'https://twitter.com/noahwdev',
    },
    {
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Sophia Brown',
      jobtitle: 'Content Creator',
      text: 'The voice testimonial component is fantastic! It makes our content more dynamic and engaging. Highly recommend it to others.',
      audio: 'sophia-brown.mp3',
      social: 'https://twitter.com/sophiacreates',
    },
    {
      image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'James Davis',
      jobtitle: 'Startup Founder',
      text: 'As a startup, efficiency is key. This component library provides high-quality, ready-to-use solutions. The audio testimonials are a standout.',
      audio: 'james-davis.mp3',
      social: 'https://twitter.com/jamesdfounder',
    },
    {
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Benjamin Miller',
      jobtitle: 'Backend Engineer',
      text: 'Solid components and excellent performance. The voice testimonials integrate smoothly and provide a rich user experience.',
      audio: 'benjamin-miller.mp3',
      social: 'https://twitter.com/benmillerdev',
    },
  ];

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Component mode="dark" testimonials={testimonials} />
    </div>
  );
};

export default DemoOne;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/voice-testimonial.tsx
'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { RiTwitterXLine } from 'react-icons/ri';
import { motion, Variants } from 'framer-motion';

type Mode = 'light' | 'dark';

interface Testimonial {
  image?: string;
  name?: string;
  jobtitle?: string;
  text?: string;
  audio?: string;
  social?: string;
}

interface ComponentProps {
  mode: Mode;
  testimonials: Testimonial[];
}

const WaveVariants = (): Variants[] => {
  const waveVariants: Variants[] = [];
  for (let i = 0; i < 30; i++) {
    waveVariants.push({
      initial: {
        scaleY: 1.5,
        transition: {
          duration: 0.5,
        },
      },
      animate: {
        scaleY: [1, Math.random() * 1.2 + 1, 1],
        transition: {
          duration: Math.random() * 0.5 + 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: Math.random() * 0.5,
        },
      },
    });
  }
  return waveVariants;
};

const waveVariants = WaveVariants();

export const Component: React.FC<ComponentProps> = ({ mode, testimonials }) => {
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null);
  const [audioElements, setAudioElements] = useState<(HTMLAudioElement | null)[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    
    const elements: (HTMLAudioElement | null)[] = [];
    testimonials.forEach((testimonial) => {
      if (testimonial.audio) {
        const audio = new Audio(`/audio/${testimonial.audio}`);
        audio.addEventListener('ended', handleAudioEnded);
        elements.push(audio);
      } else {
        elements.push(null);
      }
    });
    setAudioElements(elements);

    
    return () => {
      elements.forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.removeEventListener('ended', handleAudioEnded);
        }
      });
    };
  }, [testimonials]);

  const handlePlay = (index: number) => {
    if (currentPlayingIndex !== null && currentPlayingIndex !== index) {
      stopAudio(currentPlayingIndex);
    }

    const audio = audioElements[index];
    if (audio) {
      audio.play().catch((error) => console.error('Audio playback error:', error));
      setCurrentPlayingIndex(index);
    }
  };

  const stopAudio = (index: number) => {
    const audio = audioElements[index];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setCurrentPlayingIndex(null);
    }
  };

  const handlePause = (index: number) => {
    stopAudio(index);
  };

  const handleAudioEnded = () => {
    setCurrentPlayingIndex(null);
  };

  const handleLoadMore = () => {
    setShowAll(true);
  };

  const openInNewTab = (url: string) => {
    const win = window.open(url, '_blank');
    if (win) {
      win.focus();
    }
  };

  const shouldShowLoadMore = testimonials.length > 6;

  return (
    <div>
      <div className="flex flex-col items-center justify-center pt-5">
        <div className="flex flex-col gap-5 mb-8">
          <span className="text-center text-4xl">Read what people are saying</span>
          <span className="text-center text-slate-300">
            Dummy feedback from virtual customers <br /> using our component library.
          </span>
        </div>
      </div>
      <div className="relative">
        <div className={`flex justify-center items-center gap-5 flex-wrap shadow-black overflow-hidden ${showAll ? 'max-h-full' : 'max-h-[720px]'} relative`}>
          {shouldShowLoadMore && !showAll && <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10"></div>}
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`${
                mode === 'dark' ? 'bg-black' : 'bg-white'
              } border border-zinc-400 w-80 h-auto rounded-2xl p-5 relative ${
                !showAll && index >= 6 ? 'testimonial-partially-visible' : ''
              }`}>
              <div onClick={() => openInNewTab(testimonial.social || '')} className="absolute top-5 right-5">
                <RiTwitterXLine
                  className={`${mode === 'dark' ? 'text-white' : 'text-slate-800'} cursor-pointer`}
                  size={20}
                />
              </div>
              <div className="flex items-center">
                <Image
                  src={testimonial.image || 'https://via.placeholder.com/50'}
                  alt="profile"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="flex flex-col pl-4">
                  <span className={`${mode === 'dark' ? 'text-white' : 'text-black'}`}>{testimonial.name}</span>
                  <span className={`${mode === 'dark' ? 'text-zinc-300' : 'text-zinc-600'} text-sm`}>
                    {testimonial.jobtitle}
                  </span>
                </div>
              </div>
              <div className="mt-5 mb-1">
                <span className={`${mode === 'dark' ? 'text-slate-200' : 'text-black'}`}>{testimonial.text}</span>
              </div>
              <div className={`${mode === 'dark'? 'bg-zinc-200' : 'bg-slate-100'}  w-full h-12 mt-4 rounded-lg flex justify-between items-center p-2 relative`}>
                {currentPlayingIndex !== index ? (
                  <span onClick={() => handlePlay(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${mode === 'dark'? 'text-zinc-900' : 'text-slate-600'} size-10 `}>
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                      />
                    </svg>
                  </span>
                ) : (
                  <span onClick={() => handlePause(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${mode === 'dark'? 'text-zinc-900' : 'text-slate-600'} size-10 `}>
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM9 8.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H9Zm5.25 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-.75Z"
                      />
                    </svg>
                  </span>
                )}
                <div className="flex">
                  {waveVariants.map((variant, i) => (
                    <motion.div
                      key={i}
                      className={`${mode === 'dark'? 'bg-zinc-900' : 'bg-slate-600'}`}
                      style={{
                        width: '3px',
                        height: `${Math.random() * 20 + 5}px`,
                        margin: '0 2px',
                        borderRadius: '2px',
                      }}
                      variants={variant}
                      initial="initial"
                      animate={currentPlayingIndex === index ? 'animate' : 'initial'}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {shouldShowLoadMore && !showAll && (
          <div className="flex justify-center mt-8">
            <button
              className="px-5 py-2 bg-zinc-200 text-black rounded-md hover:bg-zinc-300 transition"
              onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
```

Install NPM dependencies:
```bash
next, react-icons, framer-motion
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
