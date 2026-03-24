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
blog-cards.tsx
const BlogCard = ({ title, date, description }) => {
    return (
        <div className='text-white w-full h-20 p-4 space-y-1 blog-card group hover:cursor-pointer'>
            <div className='flex justify-center gap-1 items-end relative'>
                <div className="md:text-2xl text-xl font-serif whitespace-nowrap dark:text-neutral-100 text-neutral-700 group-hover:text-[#ce624c] dark:group-hover:text-[#ce624c] transition-all duration-500 ease-out">{title}</div>
                <span className="w-full border-b-[0.5px] border-dashed dark:border-neutral-600 border-neutral-400 group-hover:border-[#ce624c] dark:group-hover:border-[#ce624c] mb-[6px]"></span>
                <div className='dark:text-neutral-400 text-neutral-500 whitespace-nowrap uppercase group-hover:text-[#ce624c] dark:group-hover:text-[#ce624c] font-mono md:text-base text-xs'>{date}</div>
            </div>
            <div className="dark:text-neutral-400 text-neutral-500 md:text-lg group-hover:text-[#ce624c] dark:group-hover:text-[#ce624c] md:max-w-full max-w-sm">{description}</div>
        </div>
    )
}

export default BlogCard

code.demo.1761244501956.tsx
import BlogCard from "@/components/ui/blog-cards";
import Link from "next/link"

const blogData = [
    { title: "The New Design", date: "May 20 2013", description: "What those new to the field should know, and how we can help." },
    { title: "Letter Club", date: "Aug 14 2025", description: "An ode to the slow web." },
    { title: "Have the Coffee", date: "Sep 19 2025", description: "Carve space out for oppurtunity." },
]

export default function DemoOne() {
  return (
        <div className='min-h-screen w-screen flex justify-center items-center dark:bg-neutral-900'>
            <Link href='https://nazhamid.com/journal/' className={`font-mono dark:text-neutral-600 text-neutral-400 uppercase fixed mx-auto bottom-[10vh] md:text-base text-sm`}>inspired from hamid's journal</Link>
            <div className='flex flex-col space-y-8 justify-start md:w-2xl w-lg'>
                {blogData.map((blog, index) => (
                    <BlogCard
                        key={index}
                        title={blog.title}
                        date={blog.date}
                        description={blog.description}
                    />
                ))}
            </div>
        </div>
    )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/blog-cards.tsx
const BlogCard = ({ title, date, description }) => {
    return (
        <div className='text-white w-full h-20 p-4 space-y-1 blog-card group hover:cursor-pointer'>
            <div className='flex justify-center gap-1 items-end relative'>
                <div className="md:text-2xl text-xl font-serif whitespace-nowrap dark:text-neutral-100 text-neutral-700 group-hover:text-[#ce624c] dark:group-hover:text-[#ce624c] transition-all duration-500 ease-out">{title}</div>
                <span className="w-full border-b-[0.5px] border-dashed dark:border-neutral-600 border-neutral-400 group-hover:border-[#ce624c] dark:group-hover:border-[#ce624c] mb-[6px]"></span>
                <div className='dark:text-neutral-400 text-neutral-500 whitespace-nowrap uppercase group-hover:text-[#ce624c] dark:group-hover:text-[#ce624c] font-mono md:text-base text-xs'>{date}</div>
            </div>
            <div className="dark:text-neutral-400 text-neutral-500 md:text-lg group-hover:text-[#ce624c] dark:group-hover:text-[#ce624c] md:max-w-full max-w-sm">{description}</div>
        </div>
    )
}

export default BlogCard
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
