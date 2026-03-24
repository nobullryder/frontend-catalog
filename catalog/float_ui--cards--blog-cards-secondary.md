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
const members = [
    {
        avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
        name: "John lorin",
        email: "john@example.com"
    },
    {
        avatar: "https://randomuser.me/api/portraits/men/86.jpg",
        name: "Chris bondi",
        email: "chridbondi@example.com"
    },
    {
        avatar: "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
        name: "yasmine",
        email: "yasmine@example.com"
    },
    {
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f",
        name: "Joseph",
        email: "joseph@example.com"
    },
]

export default function Cards() {
    return (
        <div className="max-w-2xl mx-auto px-4">
            <div className="items-start justify-between sm:flex">
                <div>
                    <h4 className="text-gray-800 text-xl font-semibold">Team members</h4>
                    <p className="mt-2 text-gray-600 text-base sm:text-sm">
                        Give your team members access to manage the system.
                    </p>
                </div>
                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg sm:mt-0"
                    onClick={() => alert("Add new member")}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
                        viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                        className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                    New member
                </button>
            </div>

            <ul className="mt-12 divide-y">
                {members.map((item, idx) => (
                    <li key={idx} className="py-5 flex items-start justify-between">
                        <div className="flex gap-3">
                            <img src={item.avatar} className="flex-none w-12 h-12 rounded-full" />
                            <div>
                                <span className="block text-sm text-gray-700 font-semibold">{item.name}</span>
                                <span className="block text-sm text-gray-600">{item.email}</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 bg-white hover:bg-gray-100"
                            onClick={() => alert(`Manage ${item.name}`)}
                        >
                            Manage
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}


code.demo.1755827337303.tsx
export default function Cards()  {

    const posts = [
        {
            title: "What is SaaS? Software as a Service Explained",
            desc: "Going into this journey, I had a standard therapy regimen, based on looking at the research literature. After I saw the movie, I started to ask other people what they did for their anxiety, and some",
            date: "Thursday, December 9th 2021",
            href: "javascript:void(0)"
        },
        {
            title: "A Quick Guide to WordPress Hosting",
            desc: "According to him, Ã¢â‚¬Å“I'm still surprised that this has happened. But we are surprised because we are so surprised.Ã¢â‚¬ÂMore revelations about Whittington will be featured in the film",
            date: "Thursday, December 9th 2021",
            href: "javascript:void(0)"
        },
        {
            title: "7 Promising VS Code Extensions Introduced in 2022",
            desc: "I hope I remembered all the stuff that they needed to know. They're like, 'okay,' and write it in their little reading notebooks. I realized today that I have all this stuff that",
            date: "Thursday, December 9th 2021",
            href: "javascript:void(0)"
        },
        {
            title: "How to Use Root C++ Interpreter Shell to Write C++ Programs",
            desc: "The powerful gravity waves resulting from the impact of the planets' moons Ã¢â‚¬â€ four in total Ã¢â‚¬â€ were finally resolved in 2015 when gravitational microlensing was used to observe the",
            date: "Thursday, December 9th 2021",
            href: "javascript:void(0)"
        }
    ]
    
    return (
        <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
            <div className="max-w-lg">
                <h1 className="text-3xl text-gray-800 font-semibold">
                    Blog
                </h1>
                <p className="mt-3 text-gray-500">
                    Blogs that are loved by the community. Updated every hour.
                    The powerful gravity waves resulting from the impact of the planets, were finally resolved in 2015
                </p>
            </div>
            <div className="mt-12 grid gap-4 divide-y md:grid-cols-2 md:divide-y-0 lg:grid-cols-3">
                {
                    posts.map((item, idx) => (
                        <article className="mt-5 pt-8 md:pt-0" key={idx}>
                            <a href={item.href}>
                                <span className="block text-gray-400 text-sm">
                                    {item.date}
                                </span>
                                <div className="mt-2">
                                    <h3 className="text-xl text-gray-900 font-semibold hover:underline">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 mt-1 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                                <button className="mt-2 outline-none flex items-center text-[14px] text-blue-600 decoration-blue-600 hover:underline">
                                    READ MORE
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </a>
                        </article>
                    ))
                }
            </div>
        </section>
    )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/cards.tsx
const members = [
    {
        avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
        name: "John lorin",
        email: "john@example.com"
    },
    {
        avatar: "https://randomuser.me/api/portraits/men/86.jpg",
        name: "Chris bondi",
        email: "chridbondi@example.com"
    },
    {
        avatar: "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
        name: "yasmine",
        email: "yasmine@example.com"
    },
    {
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f",
        name: "Joseph",
        email: "joseph@example.com"
    },
]

export default function Cards() {
    return (
        <div className="max-w-2xl mx-auto px-4">
            <div className="items-start justify-between sm:flex">
                <div>
                    <h4 className="text-gray-800 text-xl font-semibold">Team members</h4>
                    <p className="mt-2 text-gray-600 text-base sm:text-sm">
                        Give your team members access to manage the system.
                    </p>
                </div>
                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg sm:mt-0"
                    onClick={() => alert("Add new member")}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
                        viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                        className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                    New member
                </button>
            </div>

            <ul className="mt-12 divide-y">
                {members.map((item, idx) => (
                    <li key={idx} className="py-5 flex items-start justify-between">
                        <div className="flex gap-3">
                            <img src={item.avatar} className="flex-none w-12 h-12 rounded-full" />
                            <div>
                                <span className="block text-sm text-gray-700 font-semibold">{item.name}</span>
                                <span className="block text-sm text-gray-600">{item.email}</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 bg-white hover:bg-gray-100"
                            onClick={() => alert(`Manage ${item.name}`)}
                        >
                            Manage
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
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
