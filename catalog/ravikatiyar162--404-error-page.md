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
404-error-page.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface RetroTvErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  errorCode?: string;
  errorMessage?: string;
}

const RetroTvError = React.forwardRef<HTMLDivElement, RetroTvErrorProps>(
  (
    {
      className,
      errorCode = '404',
      errorMessage = 'NOT FOUND',
      ...props
    },
    ref
  ) => {
    // Splits the error code into individual characters
    const errorCodeDigits = errorCode.split('');

    return (
      <div
        ref={ref}
        className={cn(
          'main_wrapper flex items-center justify-center', // Using utility classes for basic layout
          className
        )}
        {...props}
      >
        <div className="main">
          <div className="antenna">
            <div className="antenna_shadow"></div>
            <div className="a1"></div>
            <div className="a1d"></div>
            <div className="a2"></div>
            <div className="a2d"></div>
            <div className="a_base"></div>
          </div>
          <div className="tv">
            <div className="cruve">
              <svg
                viewBox="0 0 189.929 189.929"
                xmlns="http://www.w3.org/2000/svg"
                className="curve_svg"
              >
                <path d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z" />
              </svg>
            </div>
            <div className="display_div">
              <div className="screen_out">
                <div className="screen_out1">
                  <div className="screen">
                    <span className="notfound_text">{errorMessage}</span>
                  </div>
                  <div className="screenM">
                    <span className="notfound_text">{errorMessage}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lines">
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </div>
            <div className="buttons_div">
              <div className="b1">
                <div></div>
              </div>
              <div className="b2"></div>
              <div className="speakers">
                <div className="g1">
                  <div className="g11"></div>
                  <div className="g12"></div>
                  <div className="g13"></div>
                </div>
                <div className="g"></div>
                <div className="g"></div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="base1"></div>
            <div className="base2"></div>
            <div className="base3"></div>
          </div>
        </div>
        <div className="text_404">
          {/* Map over the error code digits to render them */}
          {errorCodeDigits.map((digit, index) => (
            <div key={index} className={`text_404${index + 1}`}>
              {digit}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

RetroTvError.displayName = 'RetroTvError';

export { RetroTvError };

code.demo.1755078123475.tsx
import { RetroTvError } from '@/components/ui/404-error-page'; // Adjust the import path as needed

export default function RetroTvErrorDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-4">
      {/* Example 1: Default 404 Error */}
      <div style={{ transform: 'scale(0.8)' }}>
        <RetroTvError />
      </div>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/404-error-page.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface RetroTvErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  errorCode?: string;
  errorMessage?: string;
}

const RetroTvError = React.forwardRef<HTMLDivElement, RetroTvErrorProps>(
  (
    {
      className,
      errorCode = '404',
      errorMessage = 'NOT FOUND',
      ...props
    },
    ref
  ) => {
    // Splits the error code into individual characters
    const errorCodeDigits = errorCode.split('');

    return (
      <div
        ref={ref}
        className={cn(
          'main_wrapper flex items-center justify-center', // Using utility classes for basic layout
          className
        )}
        {...props}
      >
        <div className="main">
          <div className="antenna">
            <div className="antenna_shadow"></div>
            <div className="a1"></div>
            <div className="a1d"></div>
            <div className="a2"></div>
            <div className="a2d"></div>
            <div className="a_base"></div>
          </div>
          <div className="tv">
            <div className="cruve">
              <svg
                viewBox="0 0 189.929 189.929"
                xmlns="http://www.w3.org/2000/svg"
                className="curve_svg"
              >
                <path d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z" />
              </svg>
            </div>
            <div className="display_div">
              <div className="screen_out">
                <div className="screen_out1">
                  <div className="screen">
                    <span className="notfound_text">{errorMessage}</span>
                  </div>
                  <div className="screenM">
                    <span className="notfound_text">{errorMessage}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lines">
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </div>
            <div className="buttons_div">
              <div className="b1">
                <div></div>
              </div>
              <div className="b2"></div>
              <div className="speakers">
                <div className="g1">
                  <div className="g11"></div>
                  <div className="g12"></div>
                  <div className="g13"></div>
                </div>
                <div className="g"></div>
                <div className="g"></div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="base1"></div>
            <div className="base2"></div>
            <div className="base3"></div>
          </div>
        </div>
        <div className="text_404">
          {/* Map over the error code digits to render them */}
          {errorCodeDigits.map((digit, index) => (
            <div key={index} className={`text_404${index + 1}`}>
              {digit}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

RetroTvError.displayName = 'RetroTvError';

export { RetroTvError };
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
