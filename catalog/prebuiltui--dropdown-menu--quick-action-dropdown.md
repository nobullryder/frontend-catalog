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
dropdown-menu.tsx
import React from "react";

const App = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selected, setSelected] = React.useState("Select");

    const countries = ["Germany", "Canada", "United States", "Russia", "India"];

    const handleSelect = (country) => {
        setSelected(country);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col w-44 text-sm relative">
            <button type="button" onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left px-4 pr-2 py-2 border rounded bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none"
            >
                <span>{selected}</span>
                <svg className={`w-5 h-5 inline float-right transition-transform duration-200 ${isOpen ? "rotate-0" : "-rotate-90"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#6B7280" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <ul className="w-full bg-white border border-gray-300 rounded shadow-md mt-1 py-2">
                    {countries.map((country) => (
                        <li key={country} className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer" onClick={() => handleSelect(country)} >
                            {country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;

code.demo.1757565131836.tsx
import React from "react";


export default function Example() {
    return (
        <div className="flex flex-col w-32 text-sm">
            <button className="peer w-full text-left px-4 pr-2 py-2 border rounded bg-white text-gray-700 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none">
                <span>Open Menu</span>
            </button>
        
            <ul className="hidden overflow-hidden right-0 peer-focus:block w-40 bg-white border border-gray-300 rounded shadow-md mt-2 py-1">
                <li className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer">New file</li>
                <li className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer">Copy link</li>
                <li className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer">Edit file</li>
                <li className="px-4 py-2 hover:bg-red-500/10 text-red-500 cursor-pointer">Delete file</li>
            </ul>
        </div>
    );
};
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/dropdown-menu.tsx
import React from "react";

const App = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selected, setSelected] = React.useState("Select");

    const countries = ["Germany", "Canada", "United States", "Russia", "India"];

    const handleSelect = (country) => {
        setSelected(country);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col w-44 text-sm relative">
            <button type="button" onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left px-4 pr-2 py-2 border rounded bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none"
            >
                <span>{selected}</span>
                <svg className={`w-5 h-5 inline float-right transition-transform duration-200 ${isOpen ? "rotate-0" : "-rotate-90"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#6B7280" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <ul className="w-full bg-white border border-gray-300 rounded shadow-md mt-1 py-2">
                    {countries.map((country) => (
                        <li key={country} className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer" onClick={() => handleSelect(country)} >
                            {country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
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
