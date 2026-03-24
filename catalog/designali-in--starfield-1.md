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
starfield-1.tsx
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// Fast UUID generator, RFC4122 version 4 compliant
const generateUUID = () => {
  const lut = Array(256).fill().map((_, i) => (i < 16 ? '0' : '') + i.toString(16));
  const d0 = Math.random() * 0xffffffff | 0;
  const d1 = Math.random() * 0xffffffff | 0;
  const d2 = Math.random() * 0xffffffff | 0;
  const d3 = Math.random() * 0xffffffff | 0;
  return (
    lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
    lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
    lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
    lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff]
  );
};

const Starfield = ({
  starColor = 'rgba(255,255,255,1)',
  bgColor = 'rgba(0,0,0,1)',
  mouseAdjust = false,
  tiltAdjust = false,
  easing = 1,
  clickToWarp = false,
  hyperspace = false,
  warpFactor = 10,
  opacity = 0.1,
  speed = 1,
  quantity = 512,
}) => {
  const canvasRef = useRef(null);
  const [state, setState] = useState({
    init: true,
    canvas: true,
    start: true,
    stop: false,
    destroy: false,
    reset: false,
    uid: generateUUID(),
    running: false,
  });
  const mouse = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  const sd = useRef({
    w: 0,
    h: 0,
    ctx: null,
    cw: 0,
    ch: 0,
    x: 0,
    y: 0,
    z: 0,
    star: { colorRatio: 0, arr: [] },
    prevTime: 0,
  });

  const colors = {
    fill: hyperspace ? `rgba(0,0,0,${opacity})` : bgColor,
  };

  const compSpeed = hyperspace ? speed * warpFactor : speed;
  const ratio = quantity / 2;

  const measureViewport = () => {
    const el = canvasRef.current?.parentElement;
    if (el) {
      sd.current.w = el.clientWidth;
      sd.current.h = el.clientHeight;
      sd.current.x = Math.round(sd.current.w / 2);
      sd.current.y = Math.round(sd.current.h / 2);
      sd.current.z = (sd.current.w + sd.current.h) / 2;
      sd.current.star.colorRatio = 1 / sd.current.z;

      if (cursor.current.x === 0 || cursor.current.y === 0) {
        cursor.current.x = sd.current.x;
        cursor.current.y = sd.current.y;
      }
      if (mouse.current.x === 0 || mouse.current.y === 0) {
        mouse.current.x = cursor.current.x - sd.current.x;
        mouse.current.y = cursor.current.y - sd.current.y;
      }
    }
  };

  const setupCanvas = () => {
    measureViewport();
    const canvas = canvasRef.current;
    if (canvas) {
      sd.current.ctx = canvas.getContext('2d');
      canvas.width = sd.current.w;
      canvas.height = sd.current.h;
      sd.current.ctx.fillStyle = colors.fill;
      sd.current.ctx.strokeStyle = starColor;
    }
  };

  const bigBang = () => {
    if (sd.current.star.arr.length !== quantity) {
      sd.current.star.arr = new Array(quantity).fill().map(() => [
        Math.random() * sd.current.w * 2 - sd.current.x * 2,
        Math.random() * sd.current.h * 2 - sd.current.y * 2,
        Math.round(Math.random() * sd.current.z),
        0,
        0,
        0,
        0,
        true,
      ]);
    }
  };

  const resize = () => {
    const oldStar = { ...sd.current.star };
    measureViewport();
    sd.current.cw = sd.current.ctx?.canvas.width;
    sd.current.ch = sd.current.ctx?.canvas.height;

    if (sd.current.cw !== sd.current.w || sd.current.ch !== sd.current.h) {
      sd.current.x = Math.round(sd.current.w / 2);
      sd.current.y = Math.round(sd.current.h / 2);
      sd.current.z = (sd.current.w + sd.current.h) / 2;
      sd.current.star.colorRatio = 1 / sd.current.z;

      const rw = sd.current.w / sd.current.cw;
      const rh = sd.current.h / sd.current.ch;

      sd.current.ctx.canvas.width = sd.current.w;
      sd.current.ctx.canvas.height = sd.current.h;

      if (!sd.current.star.arr.length) {
        bigBang();
      } else {
        sd.current.star.arr = sd.current.star.arr.map((star, i) => {
          const newStar = [...star];
          newStar[0] = oldStar.arr[i][0] * rw;
          newStar[1] = oldStar.arr[i][1] * rh;
          newStar[3] = sd.current.x + (newStar[0] / newStar[2]) * ratio;
          newStar[4] = sd.current.y + (newStar[1] / newStar[2]) * ratio;
          return newStar;
        });
      }

      sd.current.ctx.fillStyle = colors.fill;
      sd.current.ctx.strokeStyle = starColor;
    }
  };

  const update = () => {
    mouse.current.x = (cursor.current.x - sd.current.x) / easing;
    mouse.current.y = (cursor.current.y - sd.current.y) / easing;

    if (sd.current.star.arr.length > 0) {
      sd.current.star.arr = sd.current.star.arr.map(star => {
        const newStar = [...star];
        newStar[7] = true;
        newStar[5] = newStar[3];
        newStar[6] = newStar[4];
        newStar[0] += mouse.current.x >> 4;

        if (newStar[0] > sd.current.x << 1) {
          newStar[0] -= sd.current.w << 1;
          newStar[7] = false;
        }
        if (newStar[0] < -sd.current.x << 1) {
          newStar[0] += sd.current.w << 1;
          newStar[7] = false;
        }

        newStar[1] += mouse.current.y >> 4;
        if (newStar[1] > sd.current.y << 1) {
          newStar[1] -= sd.current.h << 1;
          newStar[7] = false;
        }
        if (newStar[1] < -sd.current.y << 1) {
          newStar[1] += sd.current.h << 1;
          newStar[7] = false;
        }

        newStar[2] -= compSpeed;
        if (newStar[2] > sd.current.z) {
          newStar[2] -= sd.current.z;
          newStar[7] = false;
        }
        if (newStar[2] < 0) {
          newStar[2] += sd.current.z;
          newStar[7] = false;
        }

        newStar[3] = sd.current.x + (newStar[0] / newStar[2]) * ratio;
        newStar[4] = sd.current.y + (newStar[1] / newStar[2]) * ratio;
        return newStar;
      });
    }
  };

  const draw = () => {
    const ctx = sd.current.ctx;
    ctx.fillStyle = colors.fill;
    ctx.fillRect(0, 0, sd.current.w, sd.current.h);
    ctx.strokeStyle = starColor;

    sd.current.star.arr.forEach(star => {
      if (
        star[5] > 0 &&
        star[5] < sd.current.w &&
        star[6] > 0 &&
        star[6] < sd.current.h &&
        star[7]
      ) {
        ctx.lineWidth = (1 - sd.current.star.colorRatio * star[2]) * 2;
        ctx.beginPath();
        ctx.moveTo(star[5], star[6]);
        ctx.lineTo(star[3], star[4]);
        ctx.stroke();
        ctx.closePath();
      }
    });
  };

  const animate = () => {
    if (sd.current.prevTime === 0) {
      sd.current.prevTime = Date.now();
    }
    resize();
    update();
    draw();
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const init = () => {
    measureViewport();
    setupCanvas();
    bigBang();
    animate();
    setState(prev => ({ ...prev, running: true }));
  };

  const stop = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      setState(prev => ({ ...prev, running: false }));
    }
  };

  const reset = () => {
    stop();
    sd.current.star.arr = [];
    init();
  };

  const destroy = () => {
    stop();
    sd.current = {
      w: 0,
      h: 0,
      ctx: null,
      cw: 0,
      ch: 0,
      x: 0,
      y: 0,
      z: 0,
      star: { colorRatio: 0, arr: [] },
      prevTime: 0,
    };
  };

  const mouseHandler = event => {
    const el = canvasRef.current?.parentElement;
    if (el) {
      cursor.current.x = event.pageX || event.clientX + el.scrollLeft - el.clientLeft;
      cursor.current.y = event.pageY || event.clientY + el.scrollTop - el.clientTop;
    }
  };

  const tiltHandler = event => {
    if (event.beta !== null && event.gamma !== null) {
      const x = event.gamma;
      const y = event.beta;
      cursor.current.x = (sd.current.w / 2) + (x * 5);
      cursor.current.y = (sd.current.h / 2) + (y * 5);
    }
  };

  const clickHandler = event => {
    if (event.type === 'mousedown') {
      setState(prev => ({ ...prev, hyperspace: true }));
    }
    if (event.type === 'mouseup') {
      setState(prev => ({ ...prev, hyperspace: false }));
    }
  };

  useEffect(() => {
    const el = canvasRef.current?.parentElement;
    if (mouseAdjust) {
      el?.addEventListener('mousemove', mouseHandler);
    }
    if (tiltAdjust) {
      window.addEventListener('deviceorientation', tiltHandler);
    }
    if (clickToWarp) {
      el?.addEventListener('mousedown', clickHandler);
      el?.addEventListener('mouseup', clickHandler);
    }

    init();

    return () => {
      destroy();
      if (mouseAdjust) {
        el?.removeEventListener('mousemove', mouseHandler);
      }
      if (tiltAdjust) {
        window.removeEventListener('deviceorientation', tiltHandler);
      }
      if (clickToWarp) {
        el?.removeEventListener('mousedown', clickHandler);
        el?.removeEventListener('mouseup', clickHandler);
      }
    };
  }, [mouseAdjust, tiltAdjust, clickToWarp]);

  useEffect(() => {
    if (state.reset) {
      reset();
      setState(prev => ({ ...prev, reset: false }));
    }
    if (state.stop) {
      stop();
      setState(prev => ({ ...prev, stop: false }));
    }
    if (state.start) {
      init();
      setState(prev => ({ ...prev, start: false }));
    }
  }, [state.reset, state.stop, state.start]);

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

Starfield.propTypes = {
  starColor: PropTypes.string,
  bgColor: PropTypes.string,
  mouseAdjust: PropTypes.bool,
  tiltAdjust: PropTypes.bool,
  easing: PropTypes.number,
  clickToWarp: PropTypes.bool,
  hyperspace: PropTypes.bool,
  warpFactor: PropTypes.number,
  opacity: PropTypes.number,
  speed: PropTypes.number,
  quantity: PropTypes.number,
};

export  {Starfield};

code.demo.1757958800562.tsx
import { Starfield } from "@/components/ui/starfield-1";

export default function DemoOne() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <Starfield/>
      <span className="pointer-events-none z-10 text-center text-7xl leading-none font-semibold tracking-tighter whitespace-pre-wrap text-white">
        Starfield
      </span>
    </div>
  )
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/starfield-1.tsx
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// Fast UUID generator, RFC4122 version 4 compliant
const generateUUID = () => {
  const lut = Array(256).fill().map((_, i) => (i < 16 ? '0' : '') + i.toString(16));
  const d0 = Math.random() * 0xffffffff | 0;
  const d1 = Math.random() * 0xffffffff | 0;
  const d2 = Math.random() * 0xffffffff | 0;
  const d3 = Math.random() * 0xffffffff | 0;
  return (
    lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
    lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
    lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
    lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff]
  );
};

const Starfield = ({
  starColor = 'rgba(255,255,255,1)',
  bgColor = 'rgba(0,0,0,1)',
  mouseAdjust = false,
  tiltAdjust = false,
  easing = 1,
  clickToWarp = false,
  hyperspace = false,
  warpFactor = 10,
  opacity = 0.1,
  speed = 1,
  quantity = 512,
}) => {
  const canvasRef = useRef(null);
  const [state, setState] = useState({
    init: true,
    canvas: true,
    start: true,
    stop: false,
    destroy: false,
    reset: false,
    uid: generateUUID(),
    running: false,
  });
  const mouse = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  const sd = useRef({
    w: 0,
    h: 0,
    ctx: null,
    cw: 0,
    ch: 0,
    x: 0,
    y: 0,
    z: 0,
    star: { colorRatio: 0, arr: [] },
    prevTime: 0,
  });

  const colors = {
    fill: hyperspace ? `rgba(0,0,0,${opacity})` : bgColor,
  };

  const compSpeed = hyperspace ? speed * warpFactor : speed;
  const ratio = quantity / 2;

  const measureViewport = () => {
    const el = canvasRef.current?.parentElement;
    if (el) {
      sd.current.w = el.clientWidth;
      sd.current.h = el.clientHeight;
      sd.current.x = Math.round(sd.current.w / 2);
      sd.current.y = Math.round(sd.current.h / 2);
      sd.current.z = (sd.current.w + sd.current.h) / 2;
      sd.current.star.colorRatio = 1 / sd.current.z;

      if (cursor.current.x === 0 || cursor.current.y === 0) {
        cursor.current.x = sd.current.x;
        cursor.current.y = sd.current.y;
      }
      if (mouse.current.x === 0 || mouse.current.y === 0) {
        mouse.current.x = cursor.current.x - sd.current.x;
        mouse.current.y = cursor.current.y - sd.current.y;
      }
    }
  };

  const setupCanvas = () => {
    measureViewport();
    const canvas = canvasRef.current;
    if (canvas) {
      sd.current.ctx = canvas.getContext('2d');
      canvas.width = sd.current.w;
      canvas.height = sd.current.h;
      sd.current.ctx.fillStyle = colors.fill;
      sd.current.ctx.strokeStyle = starColor;
    }
  };

  const bigBang = () => {
    if (sd.current.star.arr.length !== quantity) {
      sd.current.star.arr = new Array(quantity).fill().map(() => [
        Math.random() * sd.current.w * 2 - sd.current.x * 2,
        Math.random() * sd.current.h * 2 - sd.current.y * 2,
        Math.round(Math.random() * sd.current.z),
        0,
        0,
        0,
        0,
        true,
      ]);
    }
  };

  const resize = () => {
    const oldStar = { ...sd.current.star };
    measureViewport();
    sd.current.cw = sd.current.ctx?.canvas.width;
    sd.current.ch = sd.current.ctx?.canvas.height;

    if (sd.current.cw !== sd.current.w || sd.current.ch !== sd.current.h) {
      sd.current.x = Math.round(sd.current.w / 2);
      sd.current.y = Math.round(sd.current.h / 2);
      sd.current.z = (sd.current.w + sd.current.h) / 2;
      sd.current.star.colorRatio = 1 / sd.current.z;

      const rw = sd.current.w / sd.current.cw;
      const rh = sd.current.h / sd.current.ch;

      sd.current.ctx.canvas.width = sd.current.w;
      sd.current.ctx.canvas.height = sd.current.h;

      if (!sd.current.star.arr.length) {
        bigBang();
      } else {
        sd.current.star.arr = sd.current.star.arr.map((star, i) => {
          const newStar = [...star];
          newStar[0] = oldStar.arr[i][0] * rw;
          newStar[1] = oldStar.arr[i][1] * rh;
          newStar[3] = sd.current.x + (newStar[0] / newStar[2]) * ratio;
          newStar[4] = sd.current.y + (newStar[1] / newStar[2]) * ratio;
          return newStar;
        });
      }

      sd.current.ctx.fillStyle = colors.fill;
      sd.current.ctx.strokeStyle = starColor;
    }
  };

  const update = () => {
    mouse.current.x = (cursor.current.x - sd.current.x) / easing;
    mouse.current.y = (cursor.current.y - sd.current.y) / easing;

    if (sd.current.star.arr.length > 0) {
      sd.current.star.arr = sd.current.star.arr.map(star => {
        const newStar = [...star];
        newStar[7] = true;
        newStar[5] = newStar[3];
        newStar[6] = newStar[4];
        newStar[0] += mouse.current.x >> 4;

        if (newStar[0] > sd.current.x << 1) {
          newStar[0] -= sd.current.w << 1;
          newStar[7] = false;
        }
        if (newStar[0] < -sd.current.x << 1) {
          newStar[0] += sd.current.w << 1;
          newStar[7] = false;
        }

        newStar[1] += mouse.current.y >> 4;
        if (newStar[1] > sd.current.y << 1) {
          newStar[1] -= sd.current.h << 1;
          newStar[7] = false;
        }
        if (newStar[1] < -sd.current.y << 1) {
          newStar[1] += sd.current.h << 1;
          newStar[7] = false;
        }

        newStar[2] -= compSpeed;
        if (newStar[2] > sd.current.z) {
          newStar[2] -= sd.current.z;
          newStar[7] = false;
        }
        if (newStar[2] < 0) {
          newStar[2] += sd.current.z;
          newStar[7] = false;
        }

        newStar[3] = sd.current.x + (newStar[0] / newStar[2]) * ratio;
        newStar[4] = sd.current.y + (newStar[1] / newStar[2]) * ratio;
        return newStar;
      });
    }
  };

  const draw = () => {
    const ctx = sd.current.ctx;
    ctx.fillStyle = colors.fill;
    ctx.fillRect(0, 0, sd.current.w, sd.current.h);
    ctx.strokeStyle = starColor;

    sd.current.star.arr.forEach(star => {
      if (
        star[5] > 0 &&
        star[5] < sd.current.w &&
        star[6] > 0 &&
        star[6] < sd.current.h &&
        star[7]
      ) {
        ctx.lineWidth = (1 - sd.current.star.colorRatio * star[2]) * 2;
        ctx.beginPath();
        ctx.moveTo(star[5], star[6]);
        ctx.lineTo(star[3], star[4]);
        ctx.stroke();
        ctx.closePath();
      }
    });
  };

  const animate = () => {
    if (sd.current.prevTime === 0) {
      sd.current.prevTime = Date.now();
    }
    resize();
    update();
    draw();
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const init = () => {
    measureViewport();
    setupCanvas();
    bigBang();
    animate();
    setState(prev => ({ ...prev, running: true }));
  };

  const stop = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      setState(prev => ({ ...prev, running: false }));
    }
  };

  const reset = () => {
    stop();
    sd.current.star.arr = [];
    init();
  };

  const destroy = () => {
    stop();
    sd.current = {
      w: 0,
      h: 0,
      ctx: null,
      cw: 0,
      ch: 0,
      x: 0,
      y: 0,
      z: 0,
      star: { colorRatio: 0, arr: [] },
      prevTime: 0,
    };
  };

  const mouseHandler = event => {
    const el = canvasRef.current?.parentElement;
    if (el) {
      cursor.current.x = event.pageX || event.clientX + el.scrollLeft - el.clientLeft;
      cursor.current.y = event.pageY || event.clientY + el.scrollTop - el.clientTop;
    }
  };

  const tiltHandler = event => {
    if (event.beta !== null && event.gamma !== null) {
      const x = event.gamma;
      const y = event.beta;
      cursor.current.x = (sd.current.w / 2) + (x * 5);
      cursor.current.y = (sd.current.h / 2) + (y * 5);
    }
  };

  const clickHandler = event => {
    if (event.type === 'mousedown') {
      setState(prev => ({ ...prev, hyperspace: true }));
    }
    if (event.type === 'mouseup') {
      setState(prev => ({ ...prev, hyperspace: false }));
    }
  };

  useEffect(() => {
    const el = canvasRef.current?.parentElement;
    if (mouseAdjust) {
      el?.addEventListener('mousemove', mouseHandler);
    }
    if (tiltAdjust) {
      window.addEventListener('deviceorientation', tiltHandler);
    }
    if (clickToWarp) {
      el?.addEventListener('mousedown', clickHandler);
      el?.addEventListener('mouseup', clickHandler);
    }

    init();

    return () => {
      destroy();
      if (mouseAdjust) {
        el?.removeEventListener('mousemove', mouseHandler);
      }
      if (tiltAdjust) {
        window.removeEventListener('deviceorientation', tiltHandler);
      }
      if (clickToWarp) {
        el?.removeEventListener('mousedown', clickHandler);
        el?.removeEventListener('mouseup', clickHandler);
      }
    };
  }, [mouseAdjust, tiltAdjust, clickToWarp]);

  useEffect(() => {
    if (state.reset) {
      reset();
      setState(prev => ({ ...prev, reset: false }));
    }
    if (state.stop) {
      stop();
      setState(prev => ({ ...prev, stop: false }));
    }
    if (state.start) {
      init();
      setState(prev => ({ ...prev, start: false }));
    }
  }, [state.reset, state.stop, state.start]);

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

Starfield.propTypes = {
  starColor: PropTypes.string,
  bgColor: PropTypes.string,
  mouseAdjust: PropTypes.bool,
  tiltAdjust: PropTypes.bool,
  easing: PropTypes.number,
  clickToWarp: PropTypes.bool,
  hyperspace: PropTypes.bool,
  warpFactor: PropTypes.number,
  opacity: PropTypes.number,
  speed: PropTypes.number,
  quantity: PropTypes.number,
};

export  {Starfield};
```

Install NPM dependencies:
```bash
prop-types
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
