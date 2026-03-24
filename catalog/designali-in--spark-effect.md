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
spark-effect.tsx
import { useEffect, useRef } from 'react';

export function SparkEffect({
  selector = '#sparks',
  amount = 5000,
  speed = 0.05,
  lifetime = 200,
  direction = { x: -0.5, y: 1 },
  size = [2, 2],
  maxopacity = 1,
  color = '150, 150, 150',
  randColor = true,
  acceleration = [5, 40]
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const OPT = {
      selector,
      amount,
      speed: window.innerWidth < 520 ? 0.05 : speed,
      lifetime,
      direction,
      size,
      maxopacity,
      color: window.innerWidth < 520 ? '150, 150, 150' : color,
      randColor,
      acceleration
    };

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let sparks = [];

    function setCanvasWidth() {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function Spark(x, y) {
      this.x = x;
      this.y = y;
      this.age = 0;
      this.acceleration = rand(OPT.acceleration[0], OPT.acceleration[1]);
      this.color = OPT.randColor
        ? `${rand(0, 255)},${rand(0, 255)},${rand(0, 255)}`
        : OPT.color;
      this.opacity = OPT.maxopacity - this.age / (OPT.lifetime * rand(1, 10));

      this.go = function () {
        this.x += OPT.speed * OPT.direction.x * this.acceleration / 2;
        this.y += OPT.speed * OPT.direction.y * this.acceleration / 2;
        this.opacity = OPT.maxopacity - ++this.age / OPT.lifetime;
      };
    }

    function addSpark() {
      let x = rand(-200, window.innerWidth + 200);
      let y = rand(-200, window.innerHeight + 200);
      sparks.push(new Spark(x, y));
    }

    function drawSpark(spark) {
      let x = spark.x,
        y = spark.y;
      spark.go();
      ctx.beginPath();
      ctx.fillStyle = `rgba(${spark.color}, ${spark.opacity})`;
      ctx.rect(x, y, OPT.size[0], OPT.size[1], 0, 0, Math.PI * 2);
      ctx.fill();
    }

    function draw() {
  ctx.fillStyle = 'rgba(255,255,255,0)'; // fully transparent "wipe"
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  sparks.forEach((spark, i, array) => {
    if (spark.opacity <= 0) {
      array.splice(i, 1);
    } else {
      drawSpark(spark);
    }
  });
  window.requestAnimationFrame(draw);
}


    function init() {
      setCanvasWidth();
      window.setInterval(() => {
        if (sparks.length < OPT.amount) {
          addSpark();
        }
      }, 1000 / OPT.amount);
      window.requestAnimationFrame(draw);
    }

    window.addEventListener('resize', setCanvasWidth);
    init();

    return () => {
      window.removeEventListener('resize', setCanvasWidth);
    };
  }, [selector, amount, speed, lifetime, direction, size, maxopacity, color, randColor, acceleration]);

  return (
    <>
      <canvas
  ref={canvasRef}
  id="sparks"
  style={{
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    background: 'transparent',
    pointerEvents: 'none', // optional: so it doesn’t block clicks
  }}
/>

    </>
  );
}

code.demo.1758130471328.tsx
import { SparkEffect } from "@/components/ui/spark-effect";

export default function DemoOne() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <SparkEffect/>
      <span className="pointer-events-none z-10 text-center text-7xl leading-none font-semibold tracking-tighter whitespace-pre-wrap">
        Spark Effect
      </span>
    </div>
  )
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/spark-effect.tsx
import { useEffect, useRef } from 'react';

export function SparkEffect({
  selector = '#sparks',
  amount = 5000,
  speed = 0.05,
  lifetime = 200,
  direction = { x: -0.5, y: 1 },
  size = [2, 2],
  maxopacity = 1,
  color = '150, 150, 150',
  randColor = true,
  acceleration = [5, 40]
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const OPT = {
      selector,
      amount,
      speed: window.innerWidth < 520 ? 0.05 : speed,
      lifetime,
      direction,
      size,
      maxopacity,
      color: window.innerWidth < 520 ? '150, 150, 150' : color,
      randColor,
      acceleration
    };

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let sparks = [];

    function setCanvasWidth() {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function Spark(x, y) {
      this.x = x;
      this.y = y;
      this.age = 0;
      this.acceleration = rand(OPT.acceleration[0], OPT.acceleration[1]);
      this.color = OPT.randColor
        ? `${rand(0, 255)},${rand(0, 255)},${rand(0, 255)}`
        : OPT.color;
      this.opacity = OPT.maxopacity - this.age / (OPT.lifetime * rand(1, 10));

      this.go = function () {
        this.x += OPT.speed * OPT.direction.x * this.acceleration / 2;
        this.y += OPT.speed * OPT.direction.y * this.acceleration / 2;
        this.opacity = OPT.maxopacity - ++this.age / OPT.lifetime;
      };
    }

    function addSpark() {
      let x = rand(-200, window.innerWidth + 200);
      let y = rand(-200, window.innerHeight + 200);
      sparks.push(new Spark(x, y));
    }

    function drawSpark(spark) {
      let x = spark.x,
        y = spark.y;
      spark.go();
      ctx.beginPath();
      ctx.fillStyle = `rgba(${spark.color}, ${spark.opacity})`;
      ctx.rect(x, y, OPT.size[0], OPT.size[1], 0, 0, Math.PI * 2);
      ctx.fill();
    }

    function draw() {
  ctx.fillStyle = 'rgba(255,255,255,0)'; // fully transparent "wipe"
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  sparks.forEach((spark, i, array) => {
    if (spark.opacity <= 0) {
      array.splice(i, 1);
    } else {
      drawSpark(spark);
    }
  });
  window.requestAnimationFrame(draw);
}


    function init() {
      setCanvasWidth();
      window.setInterval(() => {
        if (sparks.length < OPT.amount) {
          addSpark();
        }
      }, 1000 / OPT.amount);
      window.requestAnimationFrame(draw);
    }

    window.addEventListener('resize', setCanvasWidth);
    init();

    return () => {
      window.removeEventListener('resize', setCanvasWidth);
    };
  }, [selector, amount, speed, lifetime, direction, size, maxopacity, color, randColor, acceleration]);

  return (
    <>
      <canvas
  ref={canvasRef}
  id="sparks"
  style={{
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    background: 'transparent',
    pointerEvents: 'none', // optional: so it doesn’t block clicks
  }}
/>

    </>
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
