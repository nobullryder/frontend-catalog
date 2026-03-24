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
loader-15.tsx
import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div>
        <svg className="gegga">
          <defs>
            <filter id="gegga">
              <feGaussianBlur in="SourceGraphic" stdDeviation={7} result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10" result="inreGegga" />
              <feComposite in="SourceGraphic" in2="inreGegga" operator="atop" />
            </filter>
          </defs>
        </svg>
        <svg className="snurra" width={200} height={200} viewBox="0 0 200 200">
          <defs>
            <linearGradient id="linjärGradient">
              <stop className="stopp1" offset={0} />
              <stop className="stopp2" offset={1} />
            </linearGradient>
            <linearGradient y2={160} x2={160} y1={40} x1={40} gradientUnits="userSpaceOnUse" id="gradient" xlinkHref="#linjärGradient" />
          </defs>
          <path className="halvan" d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64" />
          <circle className="strecken" cx={100} cy={100} r={64} />
        </svg>
        <svg className="skugga" width={200} height={200} viewBox="0 0 200 200">
          <path className="halvan" d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64" />
          <circle className="strecken" cx={100} cy={100} r={64} />
        </svg>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .gegga {
    width: 0;
  }

  .snurra {
    filter: url(#gegga);
  }

  .stopp1 {
    stop-color: #f700a8;
  }

  .stopp2 {
    stop-color: #ff8000;
  }

  .halvan {
    animation: Snurra1 10s infinite linear;
    stroke-dasharray: 180 800;
    fill: none;
    stroke: url(#gradient);
    stroke-width: 23;
    stroke-linecap: round;
  }

  .strecken {
    animation: Snurra1 3s infinite linear;
    stroke-dasharray: 26 54;
    fill: none;
    stroke: url(#gradient);
    stroke-width: 23;
    stroke-linecap: round;
  }

  .skugga {
    filter: blur(5px);
    opacity: 0.3;
    position: absolute;
    transform: translate(3px, 3px);
  }

  @keyframes Snurra1 {
    0% {
      stroke-dashoffset: 0;
    }

    100% {
      stroke-dashoffset: -403px;
    }
  }`;

export default Loader;


code.demo.1757171285974.tsx
import Loader from "@/components/ui/loader-15";

export default function DemoOne() {
  return <Loader />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/loader-15.tsx
import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div>
        <svg className="gegga">
          <defs>
            <filter id="gegga">
              <feGaussianBlur in="SourceGraphic" stdDeviation={7} result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10" result="inreGegga" />
              <feComposite in="SourceGraphic" in2="inreGegga" operator="atop" />
            </filter>
          </defs>
        </svg>
        <svg className="snurra" width={200} height={200} viewBox="0 0 200 200">
          <defs>
            <linearGradient id="linjärGradient">
              <stop className="stopp1" offset={0} />
              <stop className="stopp2" offset={1} />
            </linearGradient>
            <linearGradient y2={160} x2={160} y1={40} x1={40} gradientUnits="userSpaceOnUse" id="gradient" xlinkHref="#linjärGradient" />
          </defs>
          <path className="halvan" d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64" />
          <circle className="strecken" cx={100} cy={100} r={64} />
        </svg>
        <svg className="skugga" width={200} height={200} viewBox="0 0 200 200">
          <path className="halvan" d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64" />
          <circle className="strecken" cx={100} cy={100} r={64} />
        </svg>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .gegga {
    width: 0;
  }

  .snurra {
    filter: url(#gegga);
  }

  .stopp1 {
    stop-color: #f700a8;
  }

  .stopp2 {
    stop-color: #ff8000;
  }

  .halvan {
    animation: Snurra1 10s infinite linear;
    stroke-dasharray: 180 800;
    fill: none;
    stroke: url(#gradient);
    stroke-width: 23;
    stroke-linecap: round;
  }

  .strecken {
    animation: Snurra1 3s infinite linear;
    stroke-dasharray: 26 54;
    fill: none;
    stroke: url(#gradient);
    stroke-width: 23;
    stroke-linecap: round;
  }

  .skugga {
    filter: blur(5px);
    opacity: 0.3;
    position: absolute;
    transform: translate(3px, 3px);
  }

  @keyframes Snurra1 {
    0% {
      stroke-dashoffset: 0;
    }

    100% {
      stroke-dashoffset: -403px;
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
