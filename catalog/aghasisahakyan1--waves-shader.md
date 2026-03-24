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
waves-shader.tsx
// ShaderComponent.tsx

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

export const ShaderComponent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let camera: THREE.Camera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let clock: THREE.Clock;
    let uniforms: { [key: string]: THREE.IUniform };

    const init = () => {
      clock = new THREE.Clock();
      camera = new THREE.Camera();
      camera.position.z = 1;

      scene = new THREE.Scene();

      // ✅ Updated geometry
      const geometry = new THREE.PlaneGeometry(2, 2);

      uniforms = {
        u_time: { value: 1.0 },
        u_resolution: { value: new THREE.Vector2() },
      };

      const vertexShader = `
        varying vec2 vUv;
        void main() {
          gl_Position = vec4(position, 1.0);
          vUv = uv;
        }
      `;

      const fragmentShader = `
        precision highp float;

        uniform vec2 u_resolution;
        uniform float u_time;
        varying vec2 vUv;

        const float PI = 3.1415926535897932384626433832795;
        const float TAU = PI * 2.;

        void coswarp(inout vec3 trip, float warpsScale ){
          trip.xyz += warpsScale * .1 * cos(3. * trip.yzx + (u_time * .25));
          trip.xyz += warpsScale * .05 * cos(11. * trip.yzx + (u_time * .25));
          trip.xyz += warpsScale * .025 * cos(17. * trip.yzx + (u_time * .25));
        }

        void main() {
          vec2 uv = (gl_FragCoord.xy - u_resolution * .5) / u_resolution.yy + 0.5;

          float t = (u_time *.2) + length(fract((uv-.5) *10.));
          float t2 = (u_time *.1) + length(fract((uv-.5) *20.));

          vec2 uv2 = uv;
          vec3 w = vec3(uv.x, uv.y, 1.);
          coswarp(w, 3.);

          uv.x+= w.r;
          uv.y+= w.g;

          vec3 color = vec3(0., .5, uv2.x);
          color.r = sin(u_time *.2) + sin(length(uv-.5) * 10.);
          color.g = sin(u_time *.3) + sin(length(uv-.5) * 20.);

          coswarp(color, 3.);

          color = vec3(smoothstep(color.r, sin(t2), sin(t)));

          gl_FragColor = vec4(color, 1.0);
        }
      `;

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);

      containerRef.current.appendChild(renderer.domElement);

      const onWindowResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.u_resolution.value.x = renderer.domElement.width;
        uniforms.u_resolution.value.y = renderer.domElement.height;
      };

      window.addEventListener("resize", onWindowResize);
      onWindowResize();

      const animate = () => {
        uniforms.u_time.value = clock.getElapsedTime();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener("resize", onWindowResize);
        renderer.dispose();
        containerRef.current?.removeChild(renderer.domElement);
      };
    };

    const cleanup = init();
    return cleanup;
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("w-full h-screen overflow-hidden rounded-lg")}
    />
  );
};


code.demo.1756844372548.tsx
import { ShaderComponent } from "@/components/ui/waves-shader";

export default function DemoOne() {
  return <ShaderComponent />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/waves-shader.tsx
// ShaderComponent.tsx

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

export const ShaderComponent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let camera: THREE.Camera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let clock: THREE.Clock;
    let uniforms: { [key: string]: THREE.IUniform };

    const init = () => {
      clock = new THREE.Clock();
      camera = new THREE.Camera();
      camera.position.z = 1;

      scene = new THREE.Scene();

      // ✅ Updated geometry
      const geometry = new THREE.PlaneGeometry(2, 2);

      uniforms = {
        u_time: { value: 1.0 },
        u_resolution: { value: new THREE.Vector2() },
      };

      const vertexShader = `
        varying vec2 vUv;
        void main() {
          gl_Position = vec4(position, 1.0);
          vUv = uv;
        }
      `;

      const fragmentShader = `
        precision highp float;

        uniform vec2 u_resolution;
        uniform float u_time;
        varying vec2 vUv;

        const float PI = 3.1415926535897932384626433832795;
        const float TAU = PI * 2.;

        void coswarp(inout vec3 trip, float warpsScale ){
          trip.xyz += warpsScale * .1 * cos(3. * trip.yzx + (u_time * .25));
          trip.xyz += warpsScale * .05 * cos(11. * trip.yzx + (u_time * .25));
          trip.xyz += warpsScale * .025 * cos(17. * trip.yzx + (u_time * .25));
        }

        void main() {
          vec2 uv = (gl_FragCoord.xy - u_resolution * .5) / u_resolution.yy + 0.5;

          float t = (u_time *.2) + length(fract((uv-.5) *10.));
          float t2 = (u_time *.1) + length(fract((uv-.5) *20.));

          vec2 uv2 = uv;
          vec3 w = vec3(uv.x, uv.y, 1.);
          coswarp(w, 3.);

          uv.x+= w.r;
          uv.y+= w.g;

          vec3 color = vec3(0., .5, uv2.x);
          color.r = sin(u_time *.2) + sin(length(uv-.5) * 10.);
          color.g = sin(u_time *.3) + sin(length(uv-.5) * 20.);

          coswarp(color, 3.);

          color = vec3(smoothstep(color.r, sin(t2), sin(t)));

          gl_FragColor = vec4(color, 1.0);
        }
      `;

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);

      containerRef.current.appendChild(renderer.domElement);

      const onWindowResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.u_resolution.value.x = renderer.domElement.width;
        uniforms.u_resolution.value.y = renderer.domElement.height;
      };

      window.addEventListener("resize", onWindowResize);
      onWindowResize();

      const animate = () => {
        uniforms.u_time.value = clock.getElapsedTime();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener("resize", onWindowResize);
        renderer.dispose();
        containerRef.current?.removeChild(renderer.domElement);
      };
    };

    const cleanup = init();
    return cleanup;
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("w-full h-screen overflow-hidden rounded-lg")}
    />
  );
};

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
