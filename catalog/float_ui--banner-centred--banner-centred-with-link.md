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
banner-centred.tsx
import React from "react";

const Announcement = () => {
  return (
    <div className="bg-indigo-600">
      <div className="max-w-screen-xl mx-auto px-4 py-3 text-white sm:text-center md:px-8">
        <p className="font-medium">
          We just launched a new version of our library!{" "}
          <a
            href="#"
            className="font-semibold underline duration-150 hover:text-indigo-100 inline-flex items-center gap-x-1"
          >
            Learn more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Announcement;


code.demo.1755827718742.tsx
import React from "react";

const Announcement = () => {
  return (
    <div className="bg-indigo-600">
      <div className="max-w-screen-xl mx-auto px-4 py-3 items-center gap-x-4 justify-center text-white sm:flex md:px-8">
        <p className="py-2 font-medium">
          We just launched our new product! You can check out all features now.
        </p>
        <a
          href="#"
          className="flex-none inline-block w-full mt-3 py-2 px-3 text-center text-indigo-600 font-medium bg-white duration-150 hover:bg-gray-100 active:bg-gray-200 rounded-lg sm:w-auto sm:mt-0 sm:text-sm"
        >
          Learn more
        </a>
      </div>
    </div>
  );
};

export default Announcement;

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/banner-centred.tsx
import React from "react";

const Announcement = () => {
  return (
    <div className="bg-indigo-600">
      <div className="max-w-screen-xl mx-auto px-4 py-3 text-white sm:text-center md:px-8">
        <p className="font-medium">
          We just launched a new version of our library!{" "}
          <a
            href="#"
            className="font-semibold underline duration-150 hover:text-indigo-100 inline-flex items-center gap-x-1"
          >
            Learn more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Announcement;

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
