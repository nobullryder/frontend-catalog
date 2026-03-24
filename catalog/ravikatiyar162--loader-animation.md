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
loader-animation.tsx
import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="lava-lamp">
        <div className="bubble" />
        <div className="bubble1" />
        <div className="bubble2" />
        <div className="bubble3" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  @keyframes drop {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(80px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  .lava-lamp {
    position: relative;
    width: 50px;
    height: 100px;
    background: #000;
    border-radius: 25px;
    overflow: hidden;
  }

  .bubble {
    position: absolute;
    top: 0;
    width: 20px;
    height: 20px;
    background: linear-gradient(to bottom, #e64980, #ff8787);
    border-radius: 50%;
    left: 15px;
    animation: drop 5s ease-in-out infinite;
  }
  .bubble1 {
    position: absolute;
    top: 0;
    width: 20px;
    height: 20px;
    background: linear-gradient(to bottom, #82c91e, #3bc9db);
    border-radius: 50%;
    left: 1px;
    animation: drop 3s ease-in-out infinite;
  }
  .bubble2 {
    position: absolute;
    top: 0;
    width: 20px;
    height: 20px;
    background: linear-gradient(to bottom, #7950f2, #f783ac);
    border-radius: 50%;
    left: 30px;
    animation: drop 4s ease-in-out infinite;
  }
  .bubble3 {
    position: absolute;
    top: 0;
    width: 20px;
    height: 20px;
    background: linear-gradient(to bottom, #4481eb, #04befe);
    border-radius: 50%;
    left: 20px;
    animation: drop 6s ease-in-out infinite;
  }`;

export default Loader;


code.demo.1755171840315.tsx
import Loader from "@/components/ui/loader-animation";

export default function DemoOne() {
  return <Loader />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/loader-animation.tsx
import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="lava-lamp">
        <div className="bubble" />
        <div className="bubble1" />
        <div className="bubble2" />
        <div className="bubble3" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  @keyframes drop {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(80px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  .lava-lamp {
    position: relative;
    width: 50px;
    height: 100px;
    background: #000;
    border-radius: 25px;
    overflow: hidden;
  }

  .bubble {
    position: absolute;
    top: 0;
    width: 20px;
    height: 20px;
    background: linear-gradient(to bottom, #e64980, #ff8787);
    border-radius: 50%;
    left: 15px;
    animation: drop 5s ease-in-out infinite;
  }
  .bubble1 {
    position: absolute;
    top: 0;
    width: 20px;
    height: 20px;
    background: linear-gradient(to bottom, #82c91e, #3bc9db);
    border-radius: 50%;
    left: 1px;
    animation: drop 3s ease-in-out infinite;
  }
  .bubble2 {
    position: absolute;
    top: 0;
    width: 20px;
    height: 20px;
    background: linear-gradient(to bottom, #7950f2, #f783ac);
    border-radius: 50%;
    left: 30px;
    animation: drop 4s ease-in-out infinite;
  }
  .bubble3 {
    position: absolute;
    top: 0;
    width: 20px;
    height: 20px;
    background: linear-gradient(to bottom, #4481eb, #04befe);
    border-radius: 50%;
    left: 20px;
    animation: drop 6s ease-in-out infinite;
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
