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
pricing-cards.tsx
import React from 'react'


export default function Example() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="w-72 bg-white text-center text-gray-800/80 border border-gray-200 p-6 pb-16 rounded-lg">
                <p className="font-semibold">Basic</p>
                <h1 className="text-3xl font-semibold">$29<span className="text-gray-500 text-sm font-normal">/month</span></h1>
                <ul className="list-none text-gray-500 text-sm mt-6 space-y-1">
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Access to all basic courses</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Community support</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>10 practice projects</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Course completion certificate</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Basic code review</p>
                    </li>
                </ul>
                <button type="button" className="bg-indigo-500 text-sm w-full py-2 rounded text-white font-medium mt-7 hover:bg-indigo-600 transition-all">
                    Get Started
                </button>
            </div>
        
            <div className="w-72 bg-indigo-500 relative text-center text-white border border-gray-500/30 p-6 pb-14 rounded-lg">
                <p className="absolute px-3 text-sm -top-3.5 left-3.5 py-1 bg-[#8789FB] rounded-full">Most Popular</p>
                <p className="font-semibold pt-2">Pro</p>
                <h1 className="text-3xl font-semibold">$79<span className="text-sm font-normal">/month</span></h1>
                <ul className="list-none text-white text-sm mt-6 space-y-1">
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                        </svg>
                        <p>Access to all Pro courses</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                        </svg>
                        <p>Priority community support</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                        </svg>
                        <p>30 practice projects</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                        </svg>
                        <p>Course completion certificate</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                        </svg>
                        <p>Advance code review</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                        </svg>
                        <p>1-on-1 mentoring sessions</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                        </svg>
                        <p>Job assistance</p>
                    </li>
                </ul>
                <button type="button" className="bg-white text-sm w-full py-2 rounded text-indigo-500 font-medium mt-7 hover:bg-gray-200 transition-all">
                    Get Started
                </button>
            </div>
        
            <div className="w-72 bg-white text-center text-gray-800/80 border border-gray-200 p-6 rounded-lg">
                <p className="font-semibold">Enterprise</p>
                <h1 className="text-3xl font-semibold">$199<span className="text-gray-500 text-sm font-normal">/month</span></h1>
                <ul className="list-none text-gray-500 text-sm mt-6 space-y-1">
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Access to all courses</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Dedicated support</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Unlimited projects</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Course completion certificate</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Premium code review</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Weekly 1-on-1 mentoring</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Job guarantee</p>
                    </li>
                </ul>
                <button type="button" className="bg-indigo-500 text-sm w-full py-2 rounded text-white font-medium mt-7 hover:bg-indigo-600 transition-all">
                    Get Started
                </button>
            </div>
        </div>
    );
};

code.demo.1757656710832.tsx
export default function Example() {
    return (
        <div className="py-20 max-w-5xl mx-auto px-4">
            <h1 className="text-center text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">Pricing</h1>
            <p className="text-center text-gray-400 md:text-lg mt-2">Use it for free for yourself, upgrade when your team needs
                advanced control.</p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 mt-10">
                {/* Card 1 */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                    <div className="flex flex-col items-center border-b border-gray-300 pb-6">
                        <span className="mb-6 text-gray-800">Free</span>
                        <span className="mb-3 text-4xl font-medium">$0/mo</span>
                        <span className="text-gray-500">Best for 1-5 users</span>
                    </div>
                    <div className="space-y-4 py-9">
                        <div className="flex items-center gap-3">
                            <span className="grid size-5 place-content-center rounded-full bg-indigo-500 text-sm text-white">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                    strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </span>
                            <span className="text-sm text-gray-400">One workspace</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="grid size-5 place-content-center rounded-full bg-indigo-500 text-sm text-white">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                    strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </span>
                            <span className="text-sm text-gray-400">Email support</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="grid size-5 place-content-center rounded-full bg-gray-200 text-sm text-gray-600">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                    strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </span>
                            <span className="text-sm text-gray-400">Basic analytics</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="grid size-5 place-content-center rounded-full bg-gray-200 text-sm text-gray-600">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                    strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </span>
                            <span className="text-sm text-gray-400">Team collaboration</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="grid size-5 place-content-center rounded-full bg-gray-200 text-sm text-gray-600">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                    strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </span>
                            <span className="text-sm text-gray-400">Priority support</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="grid size-5 place-content-center rounded-full bg-gray-200 text-sm text-gray-600">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                    strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </span>
                            <span className="text-sm text-gray-400">Unlimited file storage	</span>
                        </div>
                    </div>
                </div>
        
                {/* Card 2 */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                    <div className="flex flex-col items-center border-b border-gray-300 pb-6">
                        <span className="mb-6 text-gray-800">Pro</span>
                        <span className="mb-3 text-4xl font-medium">$79/mo</span>
                        <span className="text-gray-500">Best for 5-50 users</span>
                    </div>
                    <div className="space-y-4 py-9">
                        <div className="flex items-center gap-3">
                            <span className="grid size-5 place-content-center rounded-full bg-indigo-500 text-sm text-white">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                    strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </span>
                            <span className="text-sm text-gray-400">One workspace</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="grid size-5 place-content-center rounded-full bg-indigo-500 text-sm text-white">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                    strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </span>
                            <span className="text-sm text-gray-400">Email support</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="grid size-5 place-content-center rounded-full bg-indigo-500 text-sm text-white">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                    strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </span>
                            <span className="text-sm text-gray-400">Basic analytics</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="grid size-5 place-content-center rounded-full bg-indigo-500 text-sm text-white">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                    strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </span>
                            <span className="text-sm text-gray-400">Team collaboration</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="grid size-5 place-content-center rounded-full bg-gray-200 text-sm text-gray-600">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                    strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </span>
                            <span className="text-sm text-gray-400">Priority support</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="grid size-5 place-content-center rounded-full bg-gray-200 text-sm text-gray-600">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                    strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </span>
                            <span className="text-sm text-gray-400">Unlimited file storage	</span>
                        </div>
                    </div>
                </div>
        
                {/* Card 3 */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                    <div className="flex flex-col items-center border-b border-gray-300 pb-6">
                        <span className="mb-6 text-gray-800">Enterprise</span>
                        <span className="mb-3 text-4xl font-medium">Contact us</span>
                        <span className="text-gray-500">Best for 50+ users</span>
                    </div>
                    <div className="space-y-4 py-9">
                        <div className="flex items-center gap-3">
                            <span className="grid size-5 place-content-center rounded-full bg-indigo-500 text-sm text-white">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                    strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </span>
                            <span className="text-sm text-gray-400">One workspace</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="grid size-5 place-content-center rounded-full bg-indigo-500 text-sm text-white">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                    strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </span>
                            <span className="text-sm text-gray-400">Email support</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="grid size-5 place-content-center rounded-full bg-indigo-500 text-sm text-white">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                    strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </span>
                            <span className="text-sm text-gray-400">Basic analytics</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="grid size-5 place-content-center rounded-full bg-indigo-500 text-sm text-white">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                    strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </span>
                            <span className="text-sm text-gray-400">Team collaboration</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="grid size-5 place-content-center rounded-full bg-indigo-500 text-sm text-white">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                    strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </span>
                            <span className="text-sm text-gray-400">Priority support</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="grid size-5 place-content-center rounded-full bg-indigo-500 text-sm text-white">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                    strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </span>
                            <span className="text-sm text-gray-400">Unlimited file storage	</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/pricing-cards.tsx
import React from 'react'


export default function Example() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="w-72 bg-white text-center text-gray-800/80 border border-gray-200 p-6 pb-16 rounded-lg">
                <p className="font-semibold">Basic</p>
                <h1 className="text-3xl font-semibold">$29<span className="text-gray-500 text-sm font-normal">/month</span></h1>
                <ul className="list-none text-gray-500 text-sm mt-6 space-y-1">
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Access to all basic courses</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Community support</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>10 practice projects</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Course completion certificate</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Basic code review</p>
                    </li>
                </ul>
                <button type="button" className="bg-indigo-500 text-sm w-full py-2 rounded text-white font-medium mt-7 hover:bg-indigo-600 transition-all">
                    Get Started
                </button>
            </div>
        
            <div className="w-72 bg-indigo-500 relative text-center text-white border border-gray-500/30 p-6 pb-14 rounded-lg">
                <p className="absolute px-3 text-sm -top-3.5 left-3.5 py-1 bg-[#8789FB] rounded-full">Most Popular</p>
                <p className="font-semibold pt-2">Pro</p>
                <h1 className="text-3xl font-semibold">$79<span className="text-sm font-normal">/month</span></h1>
                <ul className="list-none text-white text-sm mt-6 space-y-1">
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                        </svg>
                        <p>Access to all Pro courses</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                        </svg>
                        <p>Priority community support</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                        </svg>
                        <p>30 practice projects</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                        </svg>
                        <p>Course completion certificate</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                        </svg>
                        <p>Advance code review</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                        </svg>
                        <p>1-on-1 mentoring sessions</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                        </svg>
                        <p>Job assistance</p>
                    </li>
                </ul>
                <button type="button" className="bg-white text-sm w-full py-2 rounded text-indigo-500 font-medium mt-7 hover:bg-gray-200 transition-all">
                    Get Started
                </button>
            </div>
        
            <div className="w-72 bg-white text-center text-gray-800/80 border border-gray-200 p-6 rounded-lg">
                <p className="font-semibold">Enterprise</p>
                <h1 className="text-3xl font-semibold">$199<span className="text-gray-500 text-sm font-normal">/month</span></h1>
                <ul className="list-none text-gray-500 text-sm mt-6 space-y-1">
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Access to all courses</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Dedicated support</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Unlimited projects</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Course completion certificate</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Premium code review</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Weekly 1-on-1 mentoring</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Job guarantee</p>
                    </li>
                </ul>
                <button type="button" className="bg-indigo-500 text-sm w-full py-2 rounded text-white font-medium mt-7 hover:bg-indigo-600 transition-all">
                    Get Started
                </button>
            </div>
        </div>
    );
};
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
