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
solar-pulse-loader.tsx
import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <span />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    position: relative;
    width: 160px;
    height: 160px;
    border: 4px solid #282828;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.1),
      10px 10px 10px rgba(0, 0, 0, 0.4),
      inset -5px -5px 5px rgba(255, 255, 255, 0.2),
      inset 10px 10px 10px rgba(0, 0, 0, 0.4);
  }

  .loader:before {
    content: "";
    position: absolute;
    top: 25px;
    left: 25px;
    right: 25px;
    bottom: 25px;
    z-index: 10;
    background: #212121;
    border-radius: 50%;
    border: 2px solid #292929;
    box-shadow: inset -2px -2px 5px rgba(255, 255, 255, 0.2),
      inset 3px 3px 5px rgba(0, 0, 0, 0.5);
  }

  .loader span {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-image: linear-gradient(
      -225deg,
      #ff7402 0%,
      #ffe700 50%,
      #fff55e 100%
    );
    filter: blur(20px);
    z-index: -1;
    animation: animate 0.5s linear infinite;
  }

  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }`;

export default Loader;


code.demo.1755160031870.tsx
import StyledWrapper from "@/components/ui/solar-pulse-loader";

export default function DemoOne() {
  return <StyledWrapper />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/solar-pulse-loader.tsx
import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <span />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    position: relative;
    width: 160px;
    height: 160px;
    border: 4px solid #282828;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.1),
      10px 10px 10px rgba(0, 0, 0, 0.4),
      inset -5px -5px 5px rgba(255, 255, 255, 0.2),
      inset 10px 10px 10px rgba(0, 0, 0, 0.4);
  }

  .loader:before {
    content: "";
    position: absolute;
    top: 25px;
    left: 25px;
    right: 25px;
    bottom: 25px;
    z-index: 10;
    background: #212121;
    border-radius: 50%;
    border: 2px solid #292929;
    box-shadow: inset -2px -2px 5px rgba(255, 255, 255, 0.2),
      inset 3px 3px 5px rgba(0, 0, 0, 0.5);
  }

  .loader span {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-image: linear-gradient(
      -225deg,
      #ff7402 0%,
      #ffe700 50%,
      #fff55e 100%
    );
    filter: blur(20px);
    z-index: -1;
    animation: animate 0.5s linear infinite;
  }

  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }`;

export default Loader;

```

Install NPM dependencies:
```bash
styled-components
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
