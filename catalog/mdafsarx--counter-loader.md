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
counter-loader.tsx
"use client";
import React from "react";
import styled from "styled-components";

const CounterLoading = () => {
  return (
    <StyledWrapper>
      <div id="timer">
        <div id="div1" />
        <div id="div2" />
        <div id="div3" />
        <div id="div4" />
        <div id="div5" />
        <div id="div6" />
        <div id="div7" />
        <div id="div8" />
        <div id="div9" />
        <div id="div10" />
        <div id="div11" />
        <div id="div12" />
        <div id="div13" />
        <div id="div14" />
        <div id="div15" />
      </div>
    </StyledWrapper>
  );
};


const StyledWrapper = styled.div`
  width: 100vw;
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;

  #timer {
    display: grid;
    grid-template-columns: repeat(3, 25px);
    grid-template-rows: repeat(5, 25px);
    gap: 10px;
    grid-template-areas:
      "div1 div2 div3"
      "div4 div5 div6"
      "div7 div8 div9"
      "div10 div11 div12"
      "div13 div14 div15";
  }

  #timer > div {
    background-color: skyblue;
    border-radius: 5px;
  }

  #div1 { grid-area: div1; animation: div1 10s both infinite; }
  #div2 { grid-area: div2; animation: div2 10s both infinite; }
  #div3 { grid-area: div3; }
  #div4 { grid-area: div4; animation: div4 10s both infinite; }
  #div5 { grid-area: div5; display: none; }
  #div6 { grid-area: div6; animation: div6 10s both infinite; }
  #div7 { grid-area: div7; animation: div7 10s both infinite; }
  #div8 { grid-area: div8; animation: div8 10s both infinite; }
  #div9 { grid-area: div9; }
  #div10 { grid-area: div10; animation: div10 10s both infinite; }
  #div11 { grid-area: div11; display: none; }
  #div12 { grid-area: div12; animation: div12 10s both infinite; }
  #div13 { grid-area: div13; animation: div13 10s both infinite; }
  #div14 { grid-area: div14; animation: div14 10s both infinite; }
  #div15 { grid-area: div15; }

   #div1 {
    grid-area: div1;
    animation: div1 10s both infinite;
  }

  @keyframes div1 {
    0% {
      transform: translateX(0);
    }

    10% {
      transform: translateX(70px);
    }

    20% {
      transform: translateX(0);
    }

    30% {
      transform: translateX(0);
    }

    40% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(0);
    }

    60% {
      transform: translateX(0);
    }

    70% {
      transform: translateX(0);
    }

    80% {
      transform: translateX(0);
    }

    90% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(0);
    }
  }

  #div2 {
    grid-area: div2;
    animation: div2 10s both infinite;
  }

  @keyframes div2 {
    0% {
      transform: translateX(0);
    }

    10% {
      transform: translateX(35px);
    }

    20% {
      transform: translateX(0);
    }

    30% {
      transform: translateX(0);
    }

    40% {
      transform: translateX(35px);
    }

    50% {
      transform: translateX(0);
    }

    60% {
      transform: translateX(0);
    }

    70% {
      transform: translateX(0);
    }

    80% {
      transform: translateX(0);
    }

    90% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(0);
    }
  }

  #div3 {
    grid-area: div3;
  }

  #div4 {
    grid-area: div4;
    animation: div4 10s both infinite;
  }

  @keyframes div4 {
    0% {
      transform: translateX(0);
    }

    10% {
      transform: translateX(70px);
    }

    20% {
      transform: translateX(70px);
    }

    30% {
      transform: translateX(70px);
    }

    40% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(0);
    }

    60% {
      transform: translateX(0);
    }

    70% {
      transform: translateX(70px);
    }

    80% {
      transform: translateX(0);
    }

    90% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(0);
    }
  }

  #div5 {
    grid-area: div5;
    display: none;
  }

  #div6 {
    grid-area: div6;
    animation: div6 10s both infinite;
  }

  @keyframes div6 {
    0% {
      transform: translateX(0);
    }

    10% {
      transform: translateX(0);
    }

    20% {
      transform: translateX(0);
    }

    30% {
      transform: translateX(0);
    }

    40% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(-70px);
    }

    60% {
      transform: translateX(-70px);
    }

    70% {
      transform: translateX(0);
    }

    80% {
      transform: translateX(0);
    }

    90% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(0);
    }
  }

  #div7 {
    grid-area: div7;
    animation: div7 10s both infinite;
  }

  @keyframes div7 {
    0% {
      transform: translateX(0);
    }

    10% {
      transform: translateX(70px);
    }

    20% {
      transform: translateX(0);
    }

    30% {
      transform: translateX(0);
    }

    40% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(0);
    }

    60% {
      transform: translateX(0);
    }

    70% {
      transform: translateX(70px);
    }

    80% {
      transform: translateX(0);
    }

    90% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(0);
    }
  }

  #div8 {
    grid-area: div8;
    animation: div8 10s both infinite;
  }

  @keyframes div8 {
    0% {
      transform: translateX(35px);
    }

    10% {
      transform: translateX(35px);
    }

    20% {
      transform: translateX(0);
    }

    30% {
      transform: translateX(0);
    }

    40% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(0);
    }

    60% {
      transform: translateX(0);
    }

    70% {
      transform: translateX(35px);
    }

    80% {
      transform: translateX(0);
    }

    90% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(35px);
    }
  }

  #div9 {
    grid-area: div9;
  }

  #div10 {
    grid-area: div10;
    animation: div10 10s both infinite;
  }

  @keyframes div10 {
    0% {
      transform: translateX(0);
    }

    10% {
      transform: translateX(70px);
    }

    20% {
      transform: translateX(0);
    }

    30% {
      transform: translateX(70px);
    }

    40% {
      transform: translateX(70px);
    }

    50% {
      transform: translateX(70px);
    }

    60% {
      transform: translateX(0);
    }

    70% {
      transform: translateX(70px);
    }

    80% {
      transform: translateX(0);
    }

    90% {
      transform: translateX(70px);
    }

    100% {
      transform: translateX(0);
    }
  }

  #div11 {
    grid-area: div11;
    display: none;
  }

  #div12 {
    grid-area: div12;
    animation: div12 10s both infinite;
  }

  @keyframes div12 {
    0% {
      transform: translateX(0);
    }

    10% {
      transform: translateX(0);
    }

    20% {
      transform: translateX(-70px);
    }

    30% {
      transform: translateX(0);
    }

    40% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(0);
    }

    60% {
      transform: translateX(0);
    }

    70% {
      transform: translateX(0);
    }

    80% {
      transform: translateX(0);
    }

    90% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(0);
    }
  }

  #div13 {
    grid-area: div13;
    animation: div13 10s both infinite;
  }

  @keyframes div13 {
    0% {
      transform: translateX(0);
    }

    10% {
      transform: translateX(70px);
    }

    20% {
      transform: translateX(0);
    }

    30% {
      transform: translateX(0);
    }

    40% {
      transform: translateX(70px);
    }

    50% {
      transform: translateX(0);
    }

    60% {
      transform: translateX(0);
    }

    70% {
      transform: translateX(70px);
    }

    80% {
      transform: translateX(0);
    }

    90% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(0);
    }
  }

  #div14 {
    grid-area: div14;
    animation: div14 10s both infinite;
  }

  @keyframes div14 {
    0% {
      transform: translateX(0);
    }

    10% {
      transform: translateX(35px);
    }

    20% {
      transform: translateX(0);
    }

    30% {
      transform: translateX(0);
    }

    40% {
      transform: translateX(35px);
    }

    50% {
      transform: translateX(0);
    }

    60% {
      transform: translateX(0);
    }

    70% {
      transform: translateX(35px);
    }

    80% {
      transform: translateX(0);
    }

    90% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(0);
    }
  }

  #div15 {
    grid-area: div15;
  }
`;

export default CounterLoading;


code.demo.1760313326280.tsx
import CounterLoading from "@/components/ui/counter-loader";

export default function DemoOne() {
  return <CounterLoading />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/counter-loader.tsx
"use client";
import React from "react";
import styled from "styled-components";

const CounterLoading = () => {
  return (
    <StyledWrapper>
      <div id="timer">
        <div id="div1" />
        <div id="div2" />
        <div id="div3" />
        <div id="div4" />
        <div id="div5" />
        <div id="div6" />
        <div id="div7" />
        <div id="div8" />
        <div id="div9" />
        <div id="div10" />
        <div id="div11" />
        <div id="div12" />
        <div id="div13" />
        <div id="div14" />
        <div id="div15" />
      </div>
    </StyledWrapper>
  );
};


const StyledWrapper = styled.div`
  width: 100vw;
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;

  #timer {
    display: grid;
    grid-template-columns: repeat(3, 25px);
    grid-template-rows: repeat(5, 25px);
    gap: 10px;
    grid-template-areas:
      "div1 div2 div3"
      "div4 div5 div6"
      "div7 div8 div9"
      "div10 div11 div12"
      "div13 div14 div15";
  }

  #timer > div {
    background-color: skyblue;
    border-radius: 5px;
  }

  #div1 { grid-area: div1; animation: div1 10s both infinite; }
  #div2 { grid-area: div2; animation: div2 10s both infinite; }
  #div3 { grid-area: div3; }
  #div4 { grid-area: div4; animation: div4 10s both infinite; }
  #div5 { grid-area: div5; display: none; }
  #div6 { grid-area: div6; animation: div6 10s both infinite; }
  #div7 { grid-area: div7; animation: div7 10s both infinite; }
  #div8 { grid-area: div8; animation: div8 10s both infinite; }
  #div9 { grid-area: div9; }
  #div10 { grid-area: div10; animation: div10 10s both infinite; }
  #div11 { grid-area: div11; display: none; }
  #div12 { grid-area: div12; animation: div12 10s both infinite; }
  #div13 { grid-area: div13; animation: div13 10s both infinite; }
  #div14 { grid-area: div14; animation: div14 10s both infinite; }
  #div15 { grid-area: div15; }

   #div1 {
    grid-area: div1;
    animation: div1 10s both infinite;
  }

  @keyframes div1 {
    0% {
      transform: translateX(0);
    }

    10% {
      transform: translateX(70px);
    }

    20% {
      transform: translateX(0);
    }

    30% {
      transform: translateX(0);
    }

    40% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(0);
    }

    60% {
      transform: translateX(0);
    }

    70% {
      transform: translateX(0);
    }

    80% {
      transform: translateX(0);
    }

    90% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(0);
    }
  }

  #div2 {
    grid-area: div2;
    animation: div2 10s both infinite;
  }

  @keyframes div2 {
    0% {
      transform: translateX(0);
    }

    10% {
      transform: translateX(35px);
    }

    20% {
      transform: translateX(0);
    }

    30% {
      transform: translateX(0);
    }

    40% {
      transform: translateX(35px);
    }

    50% {
      transform: translateX(0);
    }

    60% {
      transform: translateX(0);
    }

    70% {
      transform: translateX(0);
    }

    80% {
      transform: translateX(0);
    }

    90% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(0);
    }
  }

  #div3 {
    grid-area: div3;
  }

  #div4 {
    grid-area: div4;
    animation: div4 10s both infinite;
  }

  @keyframes div4 {
    0% {
      transform: translateX(0);
    }

    10% {
      transform: translateX(70px);
    }

    20% {
      transform: translateX(70px);
    }

    30% {
      transform: translateX(70px);
    }

    40% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(0);
    }

    60% {
      transform: translateX(0);
    }

    70% {
      transform: translateX(70px);
    }

    80% {
      transform: translateX(0);
    }

    90% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(0);
    }
  }

  #div5 {
    grid-area: div5;
    display: none;
  }

  #div6 {
    grid-area: div6;
    animation: div6 10s both infinite;
  }

  @keyframes div6 {
    0% {
      transform: translateX(0);
    }

    10% {
      transform: translateX(0);
    }

    20% {
      transform: translateX(0);
    }

    30% {
      transform: translateX(0);
    }

    40% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(-70px);
    }

    60% {
      transform: translateX(-70px);
    }

    70% {
      transform: translateX(0);
    }

    80% {
      transform: translateX(0);
    }

    90% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(0);
    }
  }

  #div7 {
    grid-area: div7;
    animation: div7 10s both infinite;
  }

  @keyframes div7 {
    0% {
      transform: translateX(0);
    }

    10% {
      transform: translateX(70px);
    }

    20% {
      transform: translateX(0);
    }

    30% {
      transform: translateX(0);
    }

    40% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(0);
    }

    60% {
      transform: translateX(0);
    }

    70% {
      transform: translateX(70px);
    }

    80% {
      transform: translateX(0);
    }

    90% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(0);
    }
  }

  #div8 {
    grid-area: div8;
    animation: div8 10s both infinite;
  }

  @keyframes div8 {
    0% {
      transform: translateX(35px);
    }

    10% {
      transform: translateX(35px);
    }

    20% {
      transform: translateX(0);
    }

    30% {
      transform: translateX(0);
    }

    40% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(0);
    }

    60% {
      transform: translateX(0);
    }

    70% {
      transform: translateX(35px);
    }

    80% {
      transform: translateX(0);
    }

    90% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(35px);
    }
  }

  #div9 {
    grid-area: div9;
  }

  #div10 {
    grid-area: div10;
    animation: div10 10s both infinite;
  }

  @keyframes div10 {
    0% {
      transform: translateX(0);
    }

    10% {
      transform: translateX(70px);
    }

    20% {
      transform: translateX(0);
    }

    30% {
      transform: translateX(70px);
    }

    40% {
      transform: translateX(70px);
    }

    50% {
      transform: translateX(70px);
    }

    60% {
      transform: translateX(0);
    }

    70% {
      transform: translateX(70px);
    }

    80% {
      transform: translateX(0);
    }

    90% {
      transform: translateX(70px);
    }

    100% {
      transform: translateX(0);
    }
  }

  #div11 {
    grid-area: div11;
    display: none;
  }

  #div12 {
    grid-area: div12;
    animation: div12 10s both infinite;
  }

  @keyframes div12 {
    0% {
      transform: translateX(0);
    }

    10% {
      transform: translateX(0);
    }

    20% {
      transform: translateX(-70px);
    }

    30% {
      transform: translateX(0);
    }

    40% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(0);
    }

    60% {
      transform: translateX(0);
    }

    70% {
      transform: translateX(0);
    }

    80% {
      transform: translateX(0);
    }

    90% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(0);
    }
  }

  #div13 {
    grid-area: div13;
    animation: div13 10s both infinite;
  }

  @keyframes div13 {
    0% {
      transform: translateX(0);
    }

    10% {
      transform: translateX(70px);
    }

    20% {
      transform: translateX(0);
    }

    30% {
      transform: translateX(0);
    }

    40% {
      transform: translateX(70px);
    }

    50% {
      transform: translateX(0);
    }

    60% {
      transform: translateX(0);
    }

    70% {
      transform: translateX(70px);
    }

    80% {
      transform: translateX(0);
    }

    90% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(0);
    }
  }

  #div14 {
    grid-area: div14;
    animation: div14 10s both infinite;
  }

  @keyframes div14 {
    0% {
      transform: translateX(0);
    }

    10% {
      transform: translateX(35px);
    }

    20% {
      transform: translateX(0);
    }

    30% {
      transform: translateX(0);
    }

    40% {
      transform: translateX(35px);
    }

    50% {
      transform: translateX(0);
    }

    60% {
      transform: translateX(0);
    }

    70% {
      transform: translateX(35px);
    }

    80% {
      transform: translateX(0);
    }

    90% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(0);
    }
  }

  #div15 {
    grid-area: div15;
  }
`;

export default CounterLoading;

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
