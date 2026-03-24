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
moving-circles-shader.tsx
import { cn } from "@/lib/utils";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

function FullscreenShader() {
  const shaderRef = useRef<THREE.ShaderMaterial>(null!);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector3(size.width, size.height, 1) },
    }),
    [size.width, size.height]
  );

  useFrame(({ clock }) => {
    if (!shaderRef.current) return;
    shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
    shaderRef.current.uniforms.uResolution.value.set(size.width, size.height, 1);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={shaderRef}
        depthWrite={false}
        depthTest={false}
        transparent={false}
        uniforms={uniforms}
        vertexShader={/* glsl */ `
          varying vec2 vTexCoord;
          void main() {
            vTexCoord = uv;
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={/* glsl */ `
          precision highp float;

          uniform vec3 uResolution;   // viewport resolution (pixels)
          uniform float uTime;        // elapsed time (seconds)

          // Isometric space warping effect
          void renderScene(out vec4 fragColor, vec2 fragCoord) {
              float TAU = 6.283; // 2 * PI
              float time = uTime;
              vec3 res = uResolution;

              // Ray origin in isometric projection
              vec3 pos = (vec3(fragCoord + fragCoord, 1.0) - res) * mat3(
                  707.0, -408.0, 577.0,
                  0.0,   816.0, 577.0,
                 -707.0, -408.0, 577.0
              ) / 300.0 / res.y;

              // Sphere repetition logic
              fragColor = res.yyyy * 0.1 * (
                length(
                  fract(
                    pos + 0.5
                    + (time - sin(time * TAU) / TAU)
                      * (mod(vec3(2.0, 0.0, 1.0) - ceil(time), 3.0) - 1.0)
                      * cos(round(pos[int(mod(time, 3.0))]) * TAU * 0.5)
                  ) - 0.5
                ) - 0.5
              );
          }

          void main() {
            vec4 outCol;
            renderScene(outCol, gl_FragCoord.xy);
            gl_FragColor = outCol;
          }
        `}
      />
    </mesh>
  );
}

export const Component = () => {
  return (
    <div className={cn("flex flex-col items-center gap-4 p-0 rounded-lg w-full h-[100vh]")}>
      <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }} dpr={[1, 2]}>
        <color attach="background" args={["#000000"]} />
        <FullscreenShader />
      </Canvas>
    </div>
  );
};


code.demo.1756789221856.tsx
import { Component } from "@/components/ui/moving-circles-shader";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/moving-circles-shader.tsx
import { cn } from "@/lib/utils";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

function FullscreenShader() {
  const shaderRef = useRef<THREE.ShaderMaterial>(null!);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector3(size.width, size.height, 1) },
    }),
    [size.width, size.height]
  );

  useFrame(({ clock }) => {
    if (!shaderRef.current) return;
    shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
    shaderRef.current.uniforms.uResolution.value.set(size.width, size.height, 1);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={shaderRef}
        depthWrite={false}
        depthTest={false}
        transparent={false}
        uniforms={uniforms}
        vertexShader={/* glsl */ `
          varying vec2 vTexCoord;
          void main() {
            vTexCoord = uv;
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={/* glsl */ `
          precision highp float;

          uniform vec3 uResolution;   // viewport resolution (pixels)
          uniform float uTime;        // elapsed time (seconds)

          // Isometric space warping effect
          void renderScene(out vec4 fragColor, vec2 fragCoord) {
              float TAU = 6.283; // 2 * PI
              float time = uTime;
              vec3 res = uResolution;

              // Ray origin in isometric projection
              vec3 pos = (vec3(fragCoord + fragCoord, 1.0) - res) * mat3(
                  707.0, -408.0, 577.0,
                  0.0,   816.0, 577.0,
                 -707.0, -408.0, 577.0
              ) / 300.0 / res.y;

              // Sphere repetition logic
              fragColor = res.yyyy * 0.1 * (
                length(
                  fract(
                    pos + 0.5
                    + (time - sin(time * TAU) / TAU)
                      * (mod(vec3(2.0, 0.0, 1.0) - ceil(time), 3.0) - 1.0)
                      * cos(round(pos[int(mod(time, 3.0))]) * TAU * 0.5)
                  ) - 0.5
                ) - 0.5
              );
          }

          void main() {
            vec4 outCol;
            renderScene(outCol, gl_FragCoord.xy);
            gl_FragColor = outCol;
          }
        `}
      />
    </mesh>
  );
}

export const Component = () => {
  return (
    <div className={cn("flex flex-col items-center gap-4 p-0 rounded-lg w-full h-[100vh]")}>
      <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }} dpr={[1, 2]}>
        <color attach="background" args={["#000000"]} />
        <FullscreenShader />
      </Canvas>
    </div>
  );
};

```

Install NPM dependencies:
```bash
@react-three/fiber, three
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
