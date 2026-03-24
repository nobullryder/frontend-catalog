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
simple-flip-card.tsx
import React from "react";

export default function FlippingContactCard() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 transition-colors">
      {/* Flipping Card */}
      <div className="group w-80 h-52 [perspective:1000px]">
        <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-active:[transform:rotateY(180deg)]">
          
          {/* Front Side */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl p-6 [backface-visibility:hidden]">
            <img
              src="https://cdn.pixabay.com/photo/2017/06/23/03/36/photo-2433385_1280.jpg"
              alt="Profile"
              className="w-20 h-20 rounded-full shadow-md border-2 border-gray-200"
            />
            <h2 className="mt-4 text-lg font-semibold text-gray-800">Awanish Verma</h2>
            <p className="text-sm text-gray-500">UI/UX Designer</p>
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl shadow-xl p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <p className="text-sm mt-2">📧 avanishverma4@gmail.com</p>
            <p className="text-sm">📱 +91 78922 34174</p>
            <p className="text-sm">🌐 www.portfolio.com</p>

            <div className="flex gap-4 mt-3">
              <a href="#" className="hover:scale-110 transition">🔗</a>
              <a href="#" className="hover:scale-110 transition">🐦</a>
              <a href="#" className="hover:scale-110 transition">💼</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


code.demo.1756799143782.tsx
import  Component  from "@/components/ui/simple-flip-card";

export default function FlippingContactCard() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/simple-flip-card.tsx
import React from "react";

export default function FlippingContactCard() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 transition-colors">
      {/* Flipping Card */}
      <div className="group w-80 h-52 [perspective:1000px]">
        <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-active:[transform:rotateY(180deg)]">
          
          {/* Front Side */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl p-6 [backface-visibility:hidden]">
            <img
              src="https://cdn.pixabay.com/photo/2017/06/23/03/36/photo-2433385_1280.jpg"
              alt="Profile"
              className="w-20 h-20 rounded-full shadow-md border-2 border-gray-200"
            />
            <h2 className="mt-4 text-lg font-semibold text-gray-800">Awanish Verma</h2>
            <p className="text-sm text-gray-500">UI/UX Designer</p>
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl shadow-xl p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <p className="text-sm mt-2">📧 avanishverma4@gmail.com</p>
            <p className="text-sm">📱 +91 78922 34174</p>
            <p className="text-sm">🌐 www.portfolio.com</p>

            <div className="flex gap-4 mt-3">
              <a href="#" className="hover:scale-110 transition">🔗</a>
              <a href="#" className="hover:scale-110 transition">🐦</a>
              <a href="#" className="hover:scale-110 transition">💼</a>
            </div>
          </div>
        </div>
      </div>
    </div>
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
