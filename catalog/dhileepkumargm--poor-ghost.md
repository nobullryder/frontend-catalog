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
poor-ghost.tsx
import React, { useEffect, useRef } from 'react';

// --- Constants ---
const PALETTE = {
    dark: "#080000",
    light: "#fff",
    ghostlyGlow: "hsl(185, 100%, 86%)",
    skinShadow: "hsl(185, 100%, 70%)",
    flesh: "hsl(185, 100%, 95%)",
    tears: "hsla(195, 75%, 60%, 0.7)",
};

const SCENE_SIZE = 400;

/**
 * Creates the 3D Ghost character model using Zdog.
 * @param {object} illo - The Zdog Illustration instance.
 * @returns {object} References to animatable parts of the model.
 */
const createCharacterModel = (illo) => {
    const Zdog = window.Zdog;
    const headAnchor = new Zdog.Anchor({ addTo: illo, translate: { y: -42 } });
    
    // Ghost Head
    new Zdog.Shape({ 
        addTo: headAnchor, 
        stroke: 228, 
        color: PALETTE.skinShadow 
    });
    new Zdog.Shape({ 
        addTo: headAnchor, 
        stroke: 216, 
        color: PALETTE.ghostlyGlow, 
        translate: { z: 5 } 
    });

    // Eyes
    const eyeAnchor = new Zdog.Anchor({ addTo: headAnchor, translate: { x: -66, y: -30, z: 84 }, rotate: { y: Zdog.TAU / 11 } });
    const eyeGroup = new Zdog.Group({ addTo: eyeAnchor });
    
    new Zdog.Shape({
        addTo: eyeGroup,
        fill: true,
        stroke: 0,
        color: PALETTE.skinShadow,
        scale: 1.15,
        path: [ { x: 0, y: 0, z: 3 }, { bezier: [ { x: 24, y: 0, z: 3 }, { x: 36, y: 21, z: 0 }, { x: 36, y: 36, z: 0 } ] }, { bezier: [ { x: 36, y: 51, z: 0 }, { x: 24, y: 63, z: 3 }, { x: 0, y: 63, z: 3 } ] }, { bezier: [ { x: -24, y: 63, z: 3 }, { x: -36, y: 51, z: 0 }, { x: -36, y: 36, z: 0 } ] }, { bezier: [ { x: -36, y: 21, z: 0 }, { x: -24, y: 0, z: 3 }, { x: 0, y: 0, z: 3 } ] } ]
    });

    const eye = new Zdog.Shape({addTo: eyeGroup,fill: true,stroke: 3,color: PALETTE.dark,translate: { y: 6 },path: [{ x: 0, y: 0, z: 3 },{ bezier: [ { x: 24, y: 0, z: 3 },{ x: 36, y: 21, z: 0 },{ x: 36, y: 36, z: 0 }]},{ bezier: [ { x: 36, y: 51, z: 0 },{ x: 24, y: 63, z: 3 },{ x: 0, y: 63, z: 3 }]},{ bezier: [ { x: -24, y: 63, z: 3 },{ x: -36, y: 51, z: 0 },{ x: -36, y: 36, z: 0 }]},{ bezier: [ { x: -36, y: 21, z: 0 },{ x: -24, y: 0, z: 3 },{ x: 0, y: 0, z: 3 }]}]});
    
    eye.copy({
        addTo: eye,
        fill: true,
        color: PALETTE.light,
        scale: 0.4,
        translate: { x: -9, y: 9, z: 3 }
    });
    
    new Zdog.Shape({
        addTo: eyeAnchor,
        fill: true,
        stroke: 0,
        color: PALETTE.tears,
        translate: { y: 63 },
        path: [ { x: 0, y: 0, z: 0 }, { x: 18, y: 0, z: 0 }, { arc: [{ x: 18, y: 45, z: 0 }, { x: 18, y: 70, z: -60 }] }, { bezier: [ { x: 18, y: 80, z: -80 }, { x: 18, y: 80, z: -100 }, { x: 0, y: 80, z: -100 } ] }, { bezier: [ { x: -18, y: 80, z: -100 }, { x: -18, y: 80, z: -80 }, { x: -18, y: 70, z: -60 } ] }, { arc: [{ x: -18, y: 45, z: 0 }, { x: -18, y: 0, z: 0 }] }, { x: 0, y: 0, z: 0 } ]
    });

    const eyeLeft = eyeAnchor.copyGraph({ translate: { x: 66, y: -30, z: 84 }, rotate: { y: Zdog.TAU / -11 } });
    
    // Mouth
    const mouthAnchor = new Zdog.Anchor({ addTo: headAnchor, translate: { y: 36, z: 96 }, rotate: { x: Zdog.TAU / -45 } });
    new Zdog.Shape({ addTo: mouthAnchor, stroke: 0, fill: true, color: PALETTE.dark, path: [ { x: 0, y: 0 }, { bezier: [ { x: 18, y: 0, z: 0 }, { x: 30, y: 21, z: -6 }, { x: 30, y: 30, z: -6 } ] }, { bezier: [ { x: 30, y: 51, z: -6 }, { x: 24, y: 33, z: -3 }, { x: 0, y: 33, z: -3 } ] }, { bezier: [ { x: -24, y: 33, z: -3 }, { x: -30, y: 51, z: -6 }, { x: -30, y: 30, z: -6 } ] }, { bezier: [ { x: -30, y: 21, z: -6 }, { x: -18, y: 0, z: 0 }, { x: 0, y: 0, z: 0 } ] } ] });
    
    // Tail
    const tailAnchor = new Zdog.Anchor({ addTo: illo, translate: { y: 20 } });
    new Zdog.Shape({
        addTo: tailAnchor,
        stroke: 80,
        color: PALETTE.ghostlyGlow,
        path: [
            { y: 0 },
            { bezier: [ { y: 30, z: 40 }, {y: 50, z: -40}, {y: 100, z: 0} ] }
        ],
    });

    return { headAnchor, tailAnchor, eyeRight: eye, eyeLeft: eyeLeft.children[0] };
};

/**
 * Renders the interactive 3D character animation.
 */
const InteractiveCharacter = () => {
  const canvasRef = useRef(null);
  const animationState = useRef({}).current; 

  useEffect(() => {
    let scriptsLoaded = 0;

    const initializeAnimation = () => {
      if (!canvasRef.current || !window.Zdog || !window.TweenMax) {
        setTimeout(initializeAnimation, 50);
        return;
      }
      const { Zdog, TweenMax, Sine } = window;
      const illo = new Zdog.Illustration({
        element: canvasRef.current,
        resize: 'fullscreen',
        onResize: function(width, height) { this.zoom = Math.min(width, height) / SCENE_SIZE; },
        dragRotate: true,
      });
      
      const model = createCharacterModel(illo);
      
      const setupAnimations = () => {
        TweenMax.to(illo.translate, 2, { y: -20, repeat: -1, yoyo: true, ease: Sine.easeInOut });
        return { stop: () => TweenMax.killAll() };
      };

      const setupEventListeners = () => {
        const watchPlayer = (x, y) => {
            const rect = canvasRef.current.getBoundingClientRect();
            const rotX = (x - (rect.left + rect.width / 2)) / Zdog.TAU;
            const rotY = -(y - (rect.top + rect.height / 2)) / Zdog.TAU;
            TweenMax.to(model.headAnchor.rotate, 0.5, { x: rotY / 100, y: -rotX / 100, ease: Sine.easeOut });
        };
        const handleMouseMove = (e) => watchPlayer(e.clientX, e.clientY);
        document.body.addEventListener("mousemove", handleMouseMove);
        return () => document.body.removeEventListener("mousemove", handleMouseMove);
      };

      const animate = () => {
        model.tailAnchor.rotate.y += 0.03;
        illo.updateRenderGraph();
        animationState.animationFrameId = requestAnimationFrame(animate);
      };

      const animationManager = setupAnimations();
      const removeEventListeners = setupEventListeners();
      animate();

      return () => {
        if (animationState.animationFrameId) cancelAnimationFrame(animationState.animationFrameId);
        removeEventListeners();
        animationManager.stop();
      };
    };

    const scripts = ["https://unpkg.com/zdog@1/dist/zdog.dist.min.js", "https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js"];
    const onAllScriptsLoaded = () => {
        scriptsLoaded++;
        if (scriptsLoaded === scripts.length) initializeAnimation();
    };
    const loadScript = (src) => {
      if (document.querySelector(`script[src="${src}"]`)) { onAllScriptsLoaded(); return; }
      const script = document.createElement('script');
      script.src = src;
      script.onload = onAllScriptsLoaded;
      document.body.appendChild(script);
    };
    scripts.forEach(loadScript);

    return () => {
        if (window.TweenMax) {
            window.TweenMax.killAll();
        }
    };
  }, []);

  return <canvas ref={canvasRef} style={{display: 'block', width: '100vw', height: '100vh'}}></canvas>;
};

export default InteractiveCharacter;

code.demo.1756789182895.tsx
import InteractiveCharacter from "@/components/ui/poor-ghost";

export default function DemoOne() {
  return  (
          <div className="hero-container">
            <div className="aurora-background">
                <div className="aurora-blob"></div>
                <div className="aurora-blob"></div>
                <div className="aurora-blob"></div>
            </div>
            <div className="character-container">
                <InteractiveCharacter />
            </div>
        </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/poor-ghost.tsx
import React, { useEffect, useRef } from 'react';

// --- Constants ---
const PALETTE = {
    dark: "#080000",
    light: "#fff",
    ghostlyGlow: "hsl(185, 100%, 86%)",
    skinShadow: "hsl(185, 100%, 70%)",
    flesh: "hsl(185, 100%, 95%)",
    tears: "hsla(195, 75%, 60%, 0.7)",
};

const SCENE_SIZE = 400;

/**
 * Creates the 3D Ghost character model using Zdog.
 * @param {object} illo - The Zdog Illustration instance.
 * @returns {object} References to animatable parts of the model.
 */
const createCharacterModel = (illo) => {
    const Zdog = window.Zdog;
    const headAnchor = new Zdog.Anchor({ addTo: illo, translate: { y: -42 } });
    
    // Ghost Head
    new Zdog.Shape({ 
        addTo: headAnchor, 
        stroke: 228, 
        color: PALETTE.skinShadow 
    });
    new Zdog.Shape({ 
        addTo: headAnchor, 
        stroke: 216, 
        color: PALETTE.ghostlyGlow, 
        translate: { z: 5 } 
    });

    // Eyes
    const eyeAnchor = new Zdog.Anchor({ addTo: headAnchor, translate: { x: -66, y: -30, z: 84 }, rotate: { y: Zdog.TAU / 11 } });
    const eyeGroup = new Zdog.Group({ addTo: eyeAnchor });
    
    new Zdog.Shape({
        addTo: eyeGroup,
        fill: true,
        stroke: 0,
        color: PALETTE.skinShadow,
        scale: 1.15,
        path: [ { x: 0, y: 0, z: 3 }, { bezier: [ { x: 24, y: 0, z: 3 }, { x: 36, y: 21, z: 0 }, { x: 36, y: 36, z: 0 } ] }, { bezier: [ { x: 36, y: 51, z: 0 }, { x: 24, y: 63, z: 3 }, { x: 0, y: 63, z: 3 } ] }, { bezier: [ { x: -24, y: 63, z: 3 }, { x: -36, y: 51, z: 0 }, { x: -36, y: 36, z: 0 } ] }, { bezier: [ { x: -36, y: 21, z: 0 }, { x: -24, y: 0, z: 3 }, { x: 0, y: 0, z: 3 } ] } ]
    });

    const eye = new Zdog.Shape({addTo: eyeGroup,fill: true,stroke: 3,color: PALETTE.dark,translate: { y: 6 },path: [{ x: 0, y: 0, z: 3 },{ bezier: [ { x: 24, y: 0, z: 3 },{ x: 36, y: 21, z: 0 },{ x: 36, y: 36, z: 0 }]},{ bezier: [ { x: 36, y: 51, z: 0 },{ x: 24, y: 63, z: 3 },{ x: 0, y: 63, z: 3 }]},{ bezier: [ { x: -24, y: 63, z: 3 },{ x: -36, y: 51, z: 0 },{ x: -36, y: 36, z: 0 }]},{ bezier: [ { x: -36, y: 21, z: 0 },{ x: -24, y: 0, z: 3 },{ x: 0, y: 0, z: 3 }]}]});
    
    eye.copy({
        addTo: eye,
        fill: true,
        color: PALETTE.light,
        scale: 0.4,
        translate: { x: -9, y: 9, z: 3 }
    });
    
    new Zdog.Shape({
        addTo: eyeAnchor,
        fill: true,
        stroke: 0,
        color: PALETTE.tears,
        translate: { y: 63 },
        path: [ { x: 0, y: 0, z: 0 }, { x: 18, y: 0, z: 0 }, { arc: [{ x: 18, y: 45, z: 0 }, { x: 18, y: 70, z: -60 }] }, { bezier: [ { x: 18, y: 80, z: -80 }, { x: 18, y: 80, z: -100 }, { x: 0, y: 80, z: -100 } ] }, { bezier: [ { x: -18, y: 80, z: -100 }, { x: -18, y: 80, z: -80 }, { x: -18, y: 70, z: -60 } ] }, { arc: [{ x: -18, y: 45, z: 0 }, { x: -18, y: 0, z: 0 }] }, { x: 0, y: 0, z: 0 } ]
    });

    const eyeLeft = eyeAnchor.copyGraph({ translate: { x: 66, y: -30, z: 84 }, rotate: { y: Zdog.TAU / -11 } });
    
    // Mouth
    const mouthAnchor = new Zdog.Anchor({ addTo: headAnchor, translate: { y: 36, z: 96 }, rotate: { x: Zdog.TAU / -45 } });
    new Zdog.Shape({ addTo: mouthAnchor, stroke: 0, fill: true, color: PALETTE.dark, path: [ { x: 0, y: 0 }, { bezier: [ { x: 18, y: 0, z: 0 }, { x: 30, y: 21, z: -6 }, { x: 30, y: 30, z: -6 } ] }, { bezier: [ { x: 30, y: 51, z: -6 }, { x: 24, y: 33, z: -3 }, { x: 0, y: 33, z: -3 } ] }, { bezier: [ { x: -24, y: 33, z: -3 }, { x: -30, y: 51, z: -6 }, { x: -30, y: 30, z: -6 } ] }, { bezier: [ { x: -30, y: 21, z: -6 }, { x: -18, y: 0, z: 0 }, { x: 0, y: 0, z: 0 } ] } ] });
    
    // Tail
    const tailAnchor = new Zdog.Anchor({ addTo: illo, translate: { y: 20 } });
    new Zdog.Shape({
        addTo: tailAnchor,
        stroke: 80,
        color: PALETTE.ghostlyGlow,
        path: [
            { y: 0 },
            { bezier: [ { y: 30, z: 40 }, {y: 50, z: -40}, {y: 100, z: 0} ] }
        ],
    });

    return { headAnchor, tailAnchor, eyeRight: eye, eyeLeft: eyeLeft.children[0] };
};

/**
 * Renders the interactive 3D character animation.
 */
const InteractiveCharacter = () => {
  const canvasRef = useRef(null);
  const animationState = useRef({}).current; 

  useEffect(() => {
    let scriptsLoaded = 0;

    const initializeAnimation = () => {
      if (!canvasRef.current || !window.Zdog || !window.TweenMax) {
        setTimeout(initializeAnimation, 50);
        return;
      }
      const { Zdog, TweenMax, Sine } = window;
      const illo = new Zdog.Illustration({
        element: canvasRef.current,
        resize: 'fullscreen',
        onResize: function(width, height) { this.zoom = Math.min(width, height) / SCENE_SIZE; },
        dragRotate: true,
      });
      
      const model = createCharacterModel(illo);
      
      const setupAnimations = () => {
        TweenMax.to(illo.translate, 2, { y: -20, repeat: -1, yoyo: true, ease: Sine.easeInOut });
        return { stop: () => TweenMax.killAll() };
      };

      const setupEventListeners = () => {
        const watchPlayer = (x, y) => {
            const rect = canvasRef.current.getBoundingClientRect();
            const rotX = (x - (rect.left + rect.width / 2)) / Zdog.TAU;
            const rotY = -(y - (rect.top + rect.height / 2)) / Zdog.TAU;
            TweenMax.to(model.headAnchor.rotate, 0.5, { x: rotY / 100, y: -rotX / 100, ease: Sine.easeOut });
        };
        const handleMouseMove = (e) => watchPlayer(e.clientX, e.clientY);
        document.body.addEventListener("mousemove", handleMouseMove);
        return () => document.body.removeEventListener("mousemove", handleMouseMove);
      };

      const animate = () => {
        model.tailAnchor.rotate.y += 0.03;
        illo.updateRenderGraph();
        animationState.animationFrameId = requestAnimationFrame(animate);
      };

      const animationManager = setupAnimations();
      const removeEventListeners = setupEventListeners();
      animate();

      return () => {
        if (animationState.animationFrameId) cancelAnimationFrame(animationState.animationFrameId);
        removeEventListeners();
        animationManager.stop();
      };
    };

    const scripts = ["https://unpkg.com/zdog@1/dist/zdog.dist.min.js", "https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js"];
    const onAllScriptsLoaded = () => {
        scriptsLoaded++;
        if (scriptsLoaded === scripts.length) initializeAnimation();
    };
    const loadScript = (src) => {
      if (document.querySelector(`script[src="${src}"]`)) { onAllScriptsLoaded(); return; }
      const script = document.createElement('script');
      script.src = src;
      script.onload = onAllScriptsLoaded;
      document.body.appendChild(script);
    };
    scripts.forEach(loadScript);

    return () => {
        if (window.TweenMax) {
            window.TweenMax.killAll();
        }
    };
  }, []);

  return <canvas ref={canvasRef} style={{display: 'block', width: '100vw', height: '100vh'}}></canvas>;
};

export default InteractiveCharacter;
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
