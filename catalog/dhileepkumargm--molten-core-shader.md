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
molten-core-shader.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const MoltenCoreShader = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float theme;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.y * u.x;
      }

      float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 6; i++) {
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / iResolution.xy;
        uv.x *= iResolution.x / iResolution.y;

        float t = iTime * 0.2;
        vec2 motion = vec2(t * 0.5, t * 0.2);
        vec2 q = uv * 3.0;

        float n1 = fbm(q + motion);
        float n2 = fbm(q * 2.0 - motion);
        float combined_noise = n1 + n2 * 0.5;

        vec3 color1 = vec3(0.1, 0.0, 0.0);
        vec3 color2 = vec3(0.8, 0.2, 0.0);
        vec3 color3 = vec3(1.0, 0.5, 0.0);
        vec3 color4 = vec3(1.0, 0.9, 0.3);

        vec3 lava = mix(color1, color2, smoothstep(0.3, 0.45, combined_noise));
        lava = mix(lava, color3, smoothstep(0.5, 0.6, combined_noise));
        lava = mix(lava, color4, smoothstep(0.7, 0.75, combined_noise));

        float vignette = 1.0 - length(uv - 0.5) * 0.8;
        lava *= vignette;

        vec3 base = mix(vec3(1.0), vec3(0.0), theme); // white for light, black for dark
        vec3 finalColor = mix(base, lava, 0.8);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      theme: { value: prefersDark ? 1.0 : 0.0 }
    };

    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onResize = () => {
      const { clientWidth, clientHeight } = containerRef.current;
      renderer.setSize(clientWidth, clientHeight);
      uniforms.iResolution.value.set(clientWidth, clientHeight);
    };
    onResize();
    window.addEventListener('resize', onResize);

    const animate = () => {
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="shader-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none'
      }}
      aria-label="Molten Core animated background"
    />
  );
};

export default MoltenCoreShader;


code.demo.1756049381542.tsx
import MoltenCoreShader from "@/components/ui/molten-core-shader";

export default function DemoOne() {
  return  <div className="app-container">
      <MoltenCoreShader />
      <div className="overlay-content">
        <h1 className="title">Molten Core</h1>
        <p className="description">A Procedural Shader Animation</p>
      </div>
    </div>
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/molten-core-shader.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const MoltenCoreShader = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float theme;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.y * u.x;
      }

      float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 6; i++) {
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / iResolution.xy;
        uv.x *= iResolution.x / iResolution.y;

        float t = iTime * 0.2;
        vec2 motion = vec2(t * 0.5, t * 0.2);
        vec2 q = uv * 3.0;

        float n1 = fbm(q + motion);
        float n2 = fbm(q * 2.0 - motion);
        float combined_noise = n1 + n2 * 0.5;

        vec3 color1 = vec3(0.1, 0.0, 0.0);
        vec3 color2 = vec3(0.8, 0.2, 0.0);
        vec3 color3 = vec3(1.0, 0.5, 0.0);
        vec3 color4 = vec3(1.0, 0.9, 0.3);

        vec3 lava = mix(color1, color2, smoothstep(0.3, 0.45, combined_noise));
        lava = mix(lava, color3, smoothstep(0.5, 0.6, combined_noise));
        lava = mix(lava, color4, smoothstep(0.7, 0.75, combined_noise));

        float vignette = 1.0 - length(uv - 0.5) * 0.8;
        lava *= vignette;

        vec3 base = mix(vec3(1.0), vec3(0.0), theme); // white for light, black for dark
        vec3 finalColor = mix(base, lava, 0.8);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      theme: { value: prefersDark ? 1.0 : 0.0 }
    };

    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onResize = () => {
      const { clientWidth, clientHeight } = containerRef.current;
      renderer.setSize(clientWidth, clientHeight);
      uniforms.iResolution.value.set(clientWidth, clientHeight);
    };
    onResize();
    window.addEventListener('resize', onResize);

    const animate = () => {
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="shader-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none'
      }}
      aria-label="Molten Core animated background"
    />
  );
};

export default MoltenCoreShader;

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
