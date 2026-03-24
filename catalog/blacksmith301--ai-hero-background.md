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
ai-hero-background.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';

export function AiHeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const container = containerRef.current;
    if (!container) return;

    // Cleanup previous canvas if any
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.OrthographicCamera();

    let composer: EffectComposer, rgbShift: ShaderPass, bloom: UnrealBloomPass;

    const renderPass = new RenderPass(scene, camera);
    bloom = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      0.35,
      0.8,
      0.15
    );
    rgbShift = new ShaderPass(RGBShiftShader);
    rgbShift.uniforms['amount'].value = 0.0015;
    rgbShift.uniforms['angle'].value = Math.PI / 4;

    composer = new EffectComposer(renderer);
    composer.addPass(renderPass);
    composer.addPass(bloom);
    composer.addPass(rgbShift);

    const GRID = {
      cols: 120,
      rows: 120,
      jitter: 0.3,
      hexOffset: 0.5,
      dotRadius: 0.03,
      spacing: 0.6
    };

    const total = GRID.cols * GRID.rows;
    const geometry = new THREE.CircleGeometry(GRID.dotRadius, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const dots = new THREE.InstancedMesh(geometry, material, total);
    dots.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(dots);

    const basePos = new Float32Array(total * 2);
    const distArr = new Float32Array(total);

    let xOffset = (GRID.cols - 1) * GRID.spacing * 0.5;
    let yOffset = (GRID.rows - 1) * GRID.spacing * 0.5;

    let idx = 0;
    const dummy = new THREE.Object3D();

    for (let r = 0; r < GRID.rows; r++) {
      for (let c = 0; c < GRID.cols; c++, idx++) {
        let x = c * GRID.spacing - xOffset;
        let y = r * GRID.spacing - yOffset;
        y += (c % 2) * GRID.hexOffset * GRID.spacing;
        x += (Math.random() - 0.5) * GRID.jitter;
        y += (Math.random() - 0.5) * GRID.jitter;
        basePos[idx * 2 + 0] = x;
        basePos[idx * 2 + 1] = y;
        const len = Math.hypot(x, y);
        const ang = Math.atan2(y, x);
        const oct = 0.5 * Math.cos(ang * 8.0);
        distArr[idx] = len + oct * 0.75;
        dummy.position.set(x, y, 0);
        dummy.updateMatrix();
        dots.setMatrixAt(idx, dummy.matrix);
      }
    }

    function roundedSquareWave(
      t: number,
      delta: number,
      a: number,
      f: number
    ) {
      return (
        ((2 * a) / Math.PI) *
        Math.atan(Math.sin(2 * Math.PI * t * f) / delta)
      );
    }

    const clock = new THREE.Clock();
    let animationFrameId: number;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const speed = 0.5;
      const amp = 0.75;
      const freq = 0.3;
      const falloff = 0.035;
      const phase = (Math.sin(2 * Math.PI * t * freq) + 1) * 0.5;
      rgbShift.uniforms['amount'].value = 0.001 + phase * 0.0025;
      const mat = new THREE.Matrix4();
      const pos = new THREE.Vector3();
      for (let i = 0; i < total; i++) {
        const x0 = basePos[i * 2 + 0];
        const y0 = basePos[i * 2 + 1];
        const dist = distArr[i];
        const localDelta = THREE.MathUtils.lerp(
          0.05,
          0.2,
          Math.min(1.0, dist / 70.0)
        );
        const tt = t * speed - dist * falloff;
        const k = 1 + roundedSquareWave(tt, localDelta, amp, freq);
        pos.set(x0 * k, y0 * k, 0);
        mat.set(
          1, 0, 0, pos.x,
          0, 1, 0, pos.y,
          0, 0, 1, 0,
          0, 0, 0, 1
        );
        dots.setMatrixAt(i, mat);
      }
      dots.instanceMatrix.needsUpdate = true;
      composer.render();
    }

    const resizeCamera = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const aspect = w / h;
      const worldHeight = 10;
      const worldWidth = worldHeight * aspect;

      camera.left = -worldWidth / 2;
      camera.right = worldWidth / 2;
      camera.top = worldHeight / 2;
      camera.bottom = -worldHeight / 2;
      camera.near = -100;
      camera.far = 100;
      camera.position.set(0, 0, 10);
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
      composer.setSize(w, h);
      if (rgbShift.uniforms['resolution']) {
        rgbShift.uniforms['resolution'].value.set(w, h);
      }
      bloom.setSize(w, h);
    };

    const observer = new ResizeObserver(() => {
      resizeCamera();
    });
    observer.observe(container);

    resizeCamera();
    animate();

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrameId);
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}

export const Component = AiHeroBackground;


code.demo.1755155323676.tsx
'use client';

import { AiHeroBackground } from '../components/ui/ai-hero-background';

export default function Demo() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <AiHeroBackground />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          color: 'white',
          fontSize: '3rem',
          fontWeight: 800,
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        Ai Hero Background
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/ai-hero-background.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';

export function AiHeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const container = containerRef.current;
    if (!container) return;

    // Cleanup previous canvas if any
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.OrthographicCamera();

    let composer: EffectComposer, rgbShift: ShaderPass, bloom: UnrealBloomPass;

    const renderPass = new RenderPass(scene, camera);
    bloom = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      0.35,
      0.8,
      0.15
    );
    rgbShift = new ShaderPass(RGBShiftShader);
    rgbShift.uniforms['amount'].value = 0.0015;
    rgbShift.uniforms['angle'].value = Math.PI / 4;

    composer = new EffectComposer(renderer);
    composer.addPass(renderPass);
    composer.addPass(bloom);
    composer.addPass(rgbShift);

    const GRID = {
      cols: 120,
      rows: 120,
      jitter: 0.3,
      hexOffset: 0.5,
      dotRadius: 0.03,
      spacing: 0.6
    };

    const total = GRID.cols * GRID.rows;
    const geometry = new THREE.CircleGeometry(GRID.dotRadius, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const dots = new THREE.InstancedMesh(geometry, material, total);
    dots.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(dots);

    const basePos = new Float32Array(total * 2);
    const distArr = new Float32Array(total);

    let xOffset = (GRID.cols - 1) * GRID.spacing * 0.5;
    let yOffset = (GRID.rows - 1) * GRID.spacing * 0.5;

    let idx = 0;
    const dummy = new THREE.Object3D();

    for (let r = 0; r < GRID.rows; r++) {
      for (let c = 0; c < GRID.cols; c++, idx++) {
        let x = c * GRID.spacing - xOffset;
        let y = r * GRID.spacing - yOffset;
        y += (c % 2) * GRID.hexOffset * GRID.spacing;
        x += (Math.random() - 0.5) * GRID.jitter;
        y += (Math.random() - 0.5) * GRID.jitter;
        basePos[idx * 2 + 0] = x;
        basePos[idx * 2 + 1] = y;
        const len = Math.hypot(x, y);
        const ang = Math.atan2(y, x);
        const oct = 0.5 * Math.cos(ang * 8.0);
        distArr[idx] = len + oct * 0.75;
        dummy.position.set(x, y, 0);
        dummy.updateMatrix();
        dots.setMatrixAt(idx, dummy.matrix);
      }
    }

    function roundedSquareWave(
      t: number,
      delta: number,
      a: number,
      f: number
    ) {
      return (
        ((2 * a) / Math.PI) *
        Math.atan(Math.sin(2 * Math.PI * t * f) / delta)
      );
    }

    const clock = new THREE.Clock();
    let animationFrameId: number;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const speed = 0.5;
      const amp = 0.75;
      const freq = 0.3;
      const falloff = 0.035;
      const phase = (Math.sin(2 * Math.PI * t * freq) + 1) * 0.5;
      rgbShift.uniforms['amount'].value = 0.001 + phase * 0.0025;
      const mat = new THREE.Matrix4();
      const pos = new THREE.Vector3();
      for (let i = 0; i < total; i++) {
        const x0 = basePos[i * 2 + 0];
        const y0 = basePos[i * 2 + 1];
        const dist = distArr[i];
        const localDelta = THREE.MathUtils.lerp(
          0.05,
          0.2,
          Math.min(1.0, dist / 70.0)
        );
        const tt = t * speed - dist * falloff;
        const k = 1 + roundedSquareWave(tt, localDelta, amp, freq);
        pos.set(x0 * k, y0 * k, 0);
        mat.set(
          1, 0, 0, pos.x,
          0, 1, 0, pos.y,
          0, 0, 1, 0,
          0, 0, 0, 1
        );
        dots.setMatrixAt(i, mat);
      }
      dots.instanceMatrix.needsUpdate = true;
      composer.render();
    }

    const resizeCamera = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const aspect = w / h;
      const worldHeight = 10;
      const worldWidth = worldHeight * aspect;

      camera.left = -worldWidth / 2;
      camera.right = worldWidth / 2;
      camera.top = worldHeight / 2;
      camera.bottom = -worldHeight / 2;
      camera.near = -100;
      camera.far = 100;
      camera.position.set(0, 0, 10);
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
      composer.setSize(w, h);
      if (rgbShift.uniforms['resolution']) {
        rgbShift.uniforms['resolution'].value.set(w, h);
      }
      bloom.setSize(w, h);
    };

    const observer = new ResizeObserver(() => {
      resizeCamera();
    });
    observer.observe(container);

    resizeCamera();
    animate();

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrameId);
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}

export const Component = AiHeroBackground;

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
