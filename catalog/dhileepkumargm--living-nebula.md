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
living-nebula.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const LivingNebulaShader = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1) Renderer, Scene, Camera, Clock
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();

    // 2) Shaders
    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;

      float random(vec2 st) {
        return fract(
          sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123
        );
      }

      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(random(i), random(i + vec2(1.0, 0.0)), u.x),
          mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 6; i++) {
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        // Normalize to −1..1 on the shorter side
        vec2 uv    = (gl_FragCoord.xy - 0.5 * iResolution.xy)
                     / iResolution.y;
        vec2 mouse = (iMouse      - 0.5 * iResolution.xy)
                     / iResolution.y;
        float t    = iTime * 0.1;

        // Warp around mouse
        float md = length(uv - mouse);
        vec2 offset = normalize(uv - mouse) / (md * 50.0);
        uv += offset * smoothstep(0.3, 0.0, md);

        // Rotate flow
        float angle = t * 0.3;
        mat2 rot = mat2(
          cos(angle), -sin(angle),
          sin(angle),  cos(angle)
        );
        vec2 p = rot * uv;

        // Two-layered cloud patterns
        float c1 = fbm(p * 2.0 + vec2(t, -t));
        float c2 = fbm(p * 4.0 - vec2(-t, t));

        // Colors
        vec3 deepSpace  = vec3(0.0, 0.0, 0.05);
        vec3 gasColor1  = vec3(0.8, 0.2, 0.5);
        vec3 gasColor2  = vec3(0.2, 0.3, 0.9);
        vec3 color      = deepSpace;

        color = mix(color, gasColor1, smoothstep(0.4, 0.6, c1));
        color = mix(color, gasColor2, smoothstep(0.5, 0.7, c2) * 0.5);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // 3) Build Mesh
    const uniforms = {
      iTime:       { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      iMouse:      { value: new THREE.Vector2(-100, -100) }
    };
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    const mesh     = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    // 4) Resize Handler
    const onResize = () => {
      const width  = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.iResolution.value.set(width, height);
    };
    window.addEventListener('resize', onResize);
    onResize();

    // 5) Mouse Handler
    const onMouseMove = (e) => {
      const x = e.clientX;
      const y = container.clientHeight - e.clientY;
      uniforms.iMouse.value.set(x, y);
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', onMouseMove);

    // 6) Animation Loop
    renderer.setAnimationLoop(() => {
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    });

    // 7) Cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      renderer.setAnimationLoop(null);

      const canvas = renderer.domElement;
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }

      material.dispose();
      mesh.geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          width:         '100vw',
          height:        '100vh',
          zIndex:        -1,
          pointerEvents: 'none'
        }}
        aria-label="Living Nebula animated background"
      />
      <div
        className="cursor-aura"
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          width:         '20px',
          height:        '20px',
          borderRadius:  '50%',
          background:    'rgba(255,255,255,0.3)',
          transform:     `translate(${mousePos.x}px, ${mousePos.y}px)`,
          pointerEvents: 'none'
        }}
      />
    </>
  );
};

export default LivingNebulaShader;

code.demo.1756053857007.tsx
import LivingNebulaShader from "@/components/ui/living-nebula";

export default function DemoOne() {
  return <div className="app-container">
      <LivingNebulaShader />
      <div className="overlay-content">
        <h1 className="title">Living Nebula</h1>
        <p className="description">An Interactive WebGL Shader</p>
      </div>
    </div>
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/living-nebula.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const LivingNebulaShader = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1) Renderer, Scene, Camera, Clock
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();

    // 2) Shaders
    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;

      float random(vec2 st) {
        return fract(
          sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123
        );
      }

      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(random(i), random(i + vec2(1.0, 0.0)), u.x),
          mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 6; i++) {
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        // Normalize to −1..1 on the shorter side
        vec2 uv    = (gl_FragCoord.xy - 0.5 * iResolution.xy)
                     / iResolution.y;
        vec2 mouse = (iMouse      - 0.5 * iResolution.xy)
                     / iResolution.y;
        float t    = iTime * 0.1;

        // Warp around mouse
        float md = length(uv - mouse);
        vec2 offset = normalize(uv - mouse) / (md * 50.0);
        uv += offset * smoothstep(0.3, 0.0, md);

        // Rotate flow
        float angle = t * 0.3;
        mat2 rot = mat2(
          cos(angle), -sin(angle),
          sin(angle),  cos(angle)
        );
        vec2 p = rot * uv;

        // Two-layered cloud patterns
        float c1 = fbm(p * 2.0 + vec2(t, -t));
        float c2 = fbm(p * 4.0 - vec2(-t, t));

        // Colors
        vec3 deepSpace  = vec3(0.0, 0.0, 0.05);
        vec3 gasColor1  = vec3(0.8, 0.2, 0.5);
        vec3 gasColor2  = vec3(0.2, 0.3, 0.9);
        vec3 color      = deepSpace;

        color = mix(color, gasColor1, smoothstep(0.4, 0.6, c1));
        color = mix(color, gasColor2, smoothstep(0.5, 0.7, c2) * 0.5);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // 3) Build Mesh
    const uniforms = {
      iTime:       { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      iMouse:      { value: new THREE.Vector2(-100, -100) }
    };
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    const mesh     = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    // 4) Resize Handler
    const onResize = () => {
      const width  = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.iResolution.value.set(width, height);
    };
    window.addEventListener('resize', onResize);
    onResize();

    // 5) Mouse Handler
    const onMouseMove = (e) => {
      const x = e.clientX;
      const y = container.clientHeight - e.clientY;
      uniforms.iMouse.value.set(x, y);
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', onMouseMove);

    // 6) Animation Loop
    renderer.setAnimationLoop(() => {
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    });

    // 7) Cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      renderer.setAnimationLoop(null);

      const canvas = renderer.domElement;
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }

      material.dispose();
      mesh.geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          width:         '100vw',
          height:        '100vh',
          zIndex:        -1,
          pointerEvents: 'none'
        }}
        aria-label="Living Nebula animated background"
      />
      <div
        className="cursor-aura"
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          width:         '20px',
          height:        '20px',
          borderRadius:  '50%',
          background:    'rgba(255,255,255,0.3)',
          transform:     `translate(${mousePos.x}px, ${mousePos.y}px)`,
          pointerEvents: 'none'
        }}
      />
    </>
  );
};

export default LivingNebulaShader;
```

Install NPM dependencies:
```bash
three
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
