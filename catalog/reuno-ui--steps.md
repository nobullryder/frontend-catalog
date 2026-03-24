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
steps.tsx
'use client';
import React, { FC, useState } from 'react';

interface Step {
  title?: string;
  description?: string;
  code?: string;
  highlightLines?: number[];
}

interface StepsProps {
  steps: Step[];
}

const Steps: FC<StepsProps> = ({ steps }) => {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (code: string | undefined, index: number) => {
    if (!code) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(
        () => setCopiedStep(index),
        (err) => console.error('Failed to copy code: ', err)
      );
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      textarea.style.pointerEvents = 'none';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          setCopiedStep(index);
        } else {
          console.error('Oops, unable to copy.');
        }
      } catch (err) {
        console.error('Oops, unable to copy.', err);
      } finally {
        document.body.removeChild(textarea);
      }
    }
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const renderCodeWithHighlight = (
    code: string | undefined,
    highlightLines?: number[]
  ) => {
    if (!code) return null;
    return code.split('\n').map((line, index) => (
      <div
        key={index}
        className={`py-1 px-2 ${
          highlightLines?.includes(index)
            ? 'bg-zinc-200 dark:bg-zinc-800'
            : 'bg-transparent'
        } whitespace-pre`}
      >
        {line}
      </div>
    ));
  };

  return (
    <div className="relative max-w-xl my-10 mx-auto px-3">
      <div className="relative">
        {/* Вертикальная линия */}
        <div className="absolute top-0 left-4 w-1 bg-zinc-300 dark:bg-zinc-900 h-full z-10"></div>

        <div className="flex flex-col space-y-8 relative z-20">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col space-y-4">
              {/* Кружок с номером */}
              <div
                className="relative w-8 h-8 rounded-full flex items-center justify-center text-black dark:text-white bg-gradient-to-b from-zinc-200 to-zinc-300 dark:from-zinc-900 dark:to-zinc-800 shadow-lg"
                style={{ zIndex: 20 }}
              >
                {index + 1}
              </div>

              <div className="ml-12 flex-1">
                {step.title && (
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-200">
                    {step.title}
                  </h3>
                )}
                {step.description && (
                  <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                    {step.description}
                  </p>
                )}

                {/* Код */}
                {step.code && (
                  <div className="relative mt-3 bg-zinc-100 dark:bg-zinc-900/70 backdrop-blur-lg p-4 rounded-md shadow-lg overflow-x-auto border border-zinc-300 dark:border-zinc-700">
                    <pre className="text-black dark:text-white">
                      <code>{renderCodeWithHighlight(step.code, step.highlightLines)}</code>
                    </pre>

                    {/* Кнопка копирования */}
                    <button
                      onClick={() => copyToClipboard(step.code, index)}
                      className="absolute top-3 right-2 bg-white dark:bg-[#111113] text-black dark:text-white py-2 px-3 rounded flex items-center justify-center shadow-md transition-colors duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                      aria-label={`Copy code for ${step.title || `step ${index + 1}`}`}
                    >
                      {copiedStep === index ? (
                        // Галочка
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      ) : (
                        // Иконка копирования
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 3.75h-7.5a2.25 2.25 0 0 0-2.25 2.25v12a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-12a2.25 2.25 0 0 0-2.25-2.25z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 3.75v-.75a2.25 2.25 0 0 1 2.25-2.25h1.5A2.25 2.25 0 0 1 15 3v.75"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Steps;


code.demo.1753310965985.tsx
import Steps from '@/components/ui/steps';

const steps = [
  {
    title: "Title",
    description: "Description",
    code: "Your code",
  },
  {
    title: "Highlight Code",
    description: "Highlighting specific lines in your code",
    code: `import React from 'react';
import Component from './components/ComponentName';

function App() {
  return (
    <div>
      <Component/>
    </div>
  );
}

export default App;`,
    highlightLines: [1, 6],
  },
];

function Page() {
  return (
    <div>
      <Steps steps={steps} />
    </div>
  );
}

export default Page;

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/steps.tsx
'use client';
import React, { FC, useState } from 'react';

interface Step {
  title?: string;
  description?: string;
  code?: string;
  highlightLines?: number[];
}

interface StepsProps {
  steps: Step[];
}

const Steps: FC<StepsProps> = ({ steps }) => {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (code: string | undefined, index: number) => {
    if (!code) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(
        () => setCopiedStep(index),
        (err) => console.error('Failed to copy code: ', err)
      );
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      textarea.style.pointerEvents = 'none';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          setCopiedStep(index);
        } else {
          console.error('Oops, unable to copy.');
        }
      } catch (err) {
        console.error('Oops, unable to copy.', err);
      } finally {
        document.body.removeChild(textarea);
      }
    }
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const renderCodeWithHighlight = (
    code: string | undefined,
    highlightLines?: number[]
  ) => {
    if (!code) return null;
    return code.split('\n').map((line, index) => (
      <div
        key={index}
        className={`py-1 px-2 ${
          highlightLines?.includes(index)
            ? 'bg-zinc-200 dark:bg-zinc-800'
            : 'bg-transparent'
        } whitespace-pre`}
      >
        {line}
      </div>
    ));
  };

  return (
    <div className="relative max-w-xl my-10 mx-auto px-3">
      <div className="relative">
        {/* Вертикальная линия */}
        <div className="absolute top-0 left-4 w-1 bg-zinc-300 dark:bg-zinc-900 h-full z-10"></div>

        <div className="flex flex-col space-y-8 relative z-20">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col space-y-4">
              {/* Кружок с номером */}
              <div
                className="relative w-8 h-8 rounded-full flex items-center justify-center text-black dark:text-white bg-gradient-to-b from-zinc-200 to-zinc-300 dark:from-zinc-900 dark:to-zinc-800 shadow-lg"
                style={{ zIndex: 20 }}
              >
                {index + 1}
              </div>

              <div className="ml-12 flex-1">
                {step.title && (
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-200">
                    {step.title}
                  </h3>
                )}
                {step.description && (
                  <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                    {step.description}
                  </p>
                )}

                {/* Код */}
                {step.code && (
                  <div className="relative mt-3 bg-zinc-100 dark:bg-zinc-900/70 backdrop-blur-lg p-4 rounded-md shadow-lg overflow-x-auto border border-zinc-300 dark:border-zinc-700">
                    <pre className="text-black dark:text-white">
                      <code>{renderCodeWithHighlight(step.code, step.highlightLines)}</code>
                    </pre>

                    {/* Кнопка копирования */}
                    <button
                      onClick={() => copyToClipboard(step.code, index)}
                      className="absolute top-3 right-2 bg-white dark:bg-[#111113] text-black dark:text-white py-2 px-3 rounded flex items-center justify-center shadow-md transition-colors duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                      aria-label={`Copy code for ${step.title || `step ${index + 1}`}`}
                    >
                      {copiedStep === index ? (
                        // Галочка
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      ) : (
                        // Иконка копирования
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 3.75h-7.5a2.25 2.25 0 0 0-2.25 2.25v12a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-12a2.25 2.25 0 0 0-2.25-2.25z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 3.75v-.75a2.25 2.25 0 0 1 2.25-2.25h1.5A2.25 2.25 0 0 1 15 3v.75"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Steps;

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
