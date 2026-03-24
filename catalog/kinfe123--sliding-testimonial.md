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
sliding-testimonial.tsx
import Image from 'next/image'
const testimonials = [
    {
        name: "Alena Zhukova",
        profession: "Software Engineer",
        description: "Simple is the perfect tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results.",
        avatar: "https://assets.basehub.com/fa068a12/uXVXN7g1Fc2EjO8OWn0HG/09.png?width=64&quality=90&format=auto",
        image: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg",
    },
    {
        name: "Aiko",
        profession: "Design Engineer",
        description:
            "Simple is a great tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results.",
        avatar: "https://assets.basehub.com/fa068a12/uXVXN7g1Fc2EjO8OWn0HG/09.png?width=64&quality=90&format=auto",
        image: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg",
    },
    {
        name: "kinpe Zhukova",
        profession: "Software Engineer",
        description:
            "Simple is the perfect tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results..",
        avatar: "https://assets.basehub.com/fa068a12/uXVXN7g1Fc2EjO8OWn0HG/09.png?width=64&quality=90&format=auto",
        image: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg",
    },

    {
        name: "Lisa Kemp",
        profession: "Frontend Developer",
        description:
            "Simple is a great tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results..",
        avatar: "https://assets.basehub.com/fa068a12/uXVXN7g1Fc2EjO8OWn0HG/09.png?width=64&quality=90&format=auto",
        image: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg",
    },
    {
        name: "Saud",
        profession: "Game Developer",
        description:
            "Simple is a great tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results.",
        avatar: "https://assets.basehub.com/fa068a12/uXVXN7g1Fc2EjO8OWn0HG/09.png?width=64&quality=90&format=auto",
        image: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg",
    },
    {
        name: "Paula Smith",
        profession: "UX Designer",
        description:
            "Simple is a great tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results.",
        avatar: "https://assets.basehub.com/fa068a12/uXVXN7g1Fc2EjO8OWn0HG/09.png?width=64&quality=90&format=auto",
        image: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg",
    },
];
const duplicatedTestimonials = [...testimonials, ...testimonials];

const FUITestimonialWithSlide = () => {
    return (
        <div className='max-w-8xl mx-auto border-2 border-black w-screen'>
            <div className="w-full mx-auto px-10">
                <div className='mb-10'>

                    <p className="mt-8 max-w-2xl mx-auto  font-geist text-center text-5xl font-normal tracking-tight text-gray-800 dark:text-gray-200">
                        What clients says
                    </p>
                    <p className="mt-4 max-w-xl mx-auto  text-lg text-center tracking-tight text-zinc-600">
                        Design assets, icon teardowns, and a community of fellow icon
                        designers where you can ask questions.
                    </p>

                </div>
                <div style={{
                    maskImage:
                        'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)',
                }}  className="flex relative overflow-hidden  shrink-0   max-w-full  overflow-hidden ">
                  <div className="flex animate-x-slider gap-5 w-max">
                    {duplicatedTestimonials.map((testimonial, indx) => {
                        return (

                            <div key={indx} className="border-[1.2px]  flex flex-col bg-page-gradient border-black/20  dark:border-white/10  rounded-lg shrink-0 grow-0 w-[600px] h-full">
                                <p className="px-5 py-5 text-pretty text-xl font-extralight  text-text-primary dark:text-dark-text-primary sm:text-2xl md:text-3xl tracking-tighter">
                                    &quot;{testimonial.description}.&quot;


                                </p>
                                <div className="border-t-[1.2px]  w-full flex gap-1 overflow-hidden">
                                    <div className="w-3/4 flex gap-3 items-center px-4 py-3">
                                        <img src={testimonial.avatar} alt='avatar' />
                                        <div className='flex flex-col flex-1 gap-0 justify-start items-start'>
                                            <h5 className='text-base font-medium md:text-lg'>{testimonial.name}</h5>
                                            <p className='text-black/30 dark:text-white/50 mt-[-4px] text-sm text-text-tertiary dark:text-dark-text-tertiary md:text-base'>{testimonial.profession}</p>

                                        </div>

                                    </div>
                                    <div className='w-[1px] bg-black/20 dark:bg-white/20' />

                                    <div className='max-w-full self-center pl-2'>
                                        <img src={testimonial.image} className='h-10 w-28 px-2 flex-none brightness-0  dark:invert' alt='company_logo' />

                                    </div>

                                </div>

                            </div>
                        )
                    })}
                 </div>
                </div>
            </div>
        </div>
    )
}
export default FUITestimonialWithSlide

code.demo.1757076812503.tsx
import FUITestimonialWithSlide from "@/components/ui/sliding-testimonial";

export default function DemoOne() {
  return <FUITestimonialWithSlide />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/sliding-testimonial.tsx
import Image from 'next/image'
const testimonials = [
    {
        name: "Alena Zhukova",
        profession: "Software Engineer",
        description: "Simple is the perfect tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results.",
        avatar: "https://assets.basehub.com/fa068a12/uXVXN7g1Fc2EjO8OWn0HG/09.png?width=64&quality=90&format=auto",
        image: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg",
    },
    {
        name: "Aiko",
        profession: "Design Engineer",
        description:
            "Simple is a great tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results.",
        avatar: "https://assets.basehub.com/fa068a12/uXVXN7g1Fc2EjO8OWn0HG/09.png?width=64&quality=90&format=auto",
        image: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg",
    },
    {
        name: "kinpe Zhukova",
        profession: "Software Engineer",
        description:
            "Simple is the perfect tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results..",
        avatar: "https://assets.basehub.com/fa068a12/uXVXN7g1Fc2EjO8OWn0HG/09.png?width=64&quality=90&format=auto",
        image: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg",
    },

    {
        name: "Lisa Kemp",
        profession: "Frontend Developer",
        description:
            "Simple is a great tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results..",
        avatar: "https://assets.basehub.com/fa068a12/uXVXN7g1Fc2EjO8OWn0HG/09.png?width=64&quality=90&format=auto",
        image: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg",
    },
    {
        name: "Saud",
        profession: "Game Developer",
        description:
            "Simple is a great tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results.",
        avatar: "https://assets.basehub.com/fa068a12/uXVXN7g1Fc2EjO8OWn0HG/09.png?width=64&quality=90&format=auto",
        image: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg",
    },
    {
        name: "Paula Smith",
        profession: "UX Designer",
        description:
            "Simple is a great tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results.",
        avatar: "https://assets.basehub.com/fa068a12/uXVXN7g1Fc2EjO8OWn0HG/09.png?width=64&quality=90&format=auto",
        image: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg",
    },
];
const duplicatedTestimonials = [...testimonials, ...testimonials];

const FUITestimonialWithSlide = () => {
    return (
        <div className='max-w-8xl mx-auto border-2 border-black w-screen'>
            <div className="w-full mx-auto px-10">
                <div className='mb-10'>

                    <p className="mt-8 max-w-2xl mx-auto  font-geist text-center text-5xl font-normal tracking-tight text-gray-800 dark:text-gray-200">
                        What clients says
                    </p>
                    <p className="mt-4 max-w-xl mx-auto  text-lg text-center tracking-tight text-zinc-600">
                        Design assets, icon teardowns, and a community of fellow icon
                        designers where you can ask questions.
                    </p>

                </div>
                <div style={{
                    maskImage:
                        'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)',
                }}  className="flex relative overflow-hidden  shrink-0   max-w-full  overflow-hidden ">
                  <div className="flex animate-x-slider gap-5 w-max">
                    {duplicatedTestimonials.map((testimonial, indx) => {
                        return (

                            <div key={indx} className="border-[1.2px]  flex flex-col bg-page-gradient border-black/20  dark:border-white/10  rounded-lg shrink-0 grow-0 w-[600px] h-full">
                                <p className="px-5 py-5 text-pretty text-xl font-extralight  text-text-primary dark:text-dark-text-primary sm:text-2xl md:text-3xl tracking-tighter">
                                    &quot;{testimonial.description}.&quot;


                                </p>
                                <div className="border-t-[1.2px]  w-full flex gap-1 overflow-hidden">
                                    <div className="w-3/4 flex gap-3 items-center px-4 py-3">
                                        <img src={testimonial.avatar} alt='avatar' />
                                        <div className='flex flex-col flex-1 gap-0 justify-start items-start'>
                                            <h5 className='text-base font-medium md:text-lg'>{testimonial.name}</h5>
                                            <p className='text-black/30 dark:text-white/50 mt-[-4px] text-sm text-text-tertiary dark:text-dark-text-tertiary md:text-base'>{testimonial.profession}</p>

                                        </div>

                                    </div>
                                    <div className='w-[1px] bg-black/20 dark:bg-white/20' />

                                    <div className='max-w-full self-center pl-2'>
                                        <img src={testimonial.image} className='h-10 w-28 px-2 flex-none brightness-0  dark:invert' alt='company_logo' />

                                    </div>

                                </div>

                            </div>
                        )
                    })}
                 </div>
                </div>
            </div>
        </div>
    )
}
export default FUITestimonialWithSlide
```

Install NPM dependencies:
```bash
next
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
