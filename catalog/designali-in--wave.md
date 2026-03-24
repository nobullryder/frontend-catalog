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
wave.tsx
/*
  Single-file Wave component using @react-three/fiber and @react-three/drei.
  - Transparent background
  - Centered plane in scene
  - All inline, no external CSS
*/

"use client"

import type React from "react"
import { useRef, useState, Suspense } from "react"
import * as THREE from "three"
import { Canvas, extend, useFrame } from "@react-three/fiber"
import { shaderMaterial, OrthographicCamera } from "@react-three/drei"

// Wave shader material
const WaveMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector2(1, 1),
    pointer: new THREE.Vector2(0.0, 0.0),
    tiles: 1.5,
  },
  /* glsl */ `
    varying vec2 vUv;
    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectionPosition = projectionMatrix * viewPosition;
      gl_Position = projectionPosition;
      vUv = uv;
    }
  `,
  /* glsl */ `
    uniform float time;
    uniform vec2 resolution;
    uniform vec2 pointer;
    uniform float tiles;
    varying vec2 vUv;

    vec3 palette(float t) {
      vec3 a = vec3(0.5, 0.5, 0.5);
      vec3 b = vec3(0.5, 0.5, 0.5);
      vec3 c = vec3(1.0, 1.0, 1.0);
      vec3 d = vec3(0.263, 0.416, 0.557);
      return a + b * cos(6.28318 * (c * t + d));
    }

    void main() {
  vec2 uv = vUv * 2.0 - 1.0;  // -1..1 centered coords
  vec2 uv0 = uv;
  vec3 finalColor = vec3(0.0);

  uv = uv * tiles - pointer;

  float d = length(uv) * exp(-length(uv0));
  vec3 col = palette(length(uv0) + time * 0.4);
  d = sin(d * 8.0 + time) / 8.0;
  d = abs(d);
  d = pow(0.02 / d, 2.0);
  finalColor += col * d;

  float alpha = clamp(length(finalColor), 0.0, 1.0);
  gl_FragColor = vec4(finalColor, alpha);
}

  `,
)

extend({ WaveMaterial })

export type WaveProps = {
  width?: number
  height?: number
  speed?: number
  tiles?: number
  pointer?: { x: number; y: number }
  disablePointerTracking?: boolean
  dpr?: number | [number, number]
  onPointerMove?: (e: React.PointerEvent<HTMLDivElement>) => void
  className?: string
  style?: React.CSSProperties
}

function WaveQuad({
  speed = 1,
  tiles = 1.5,
  width = 600,
  height = 400,
  pointerOverride,
  trackPointer = true,
}: {
  speed?: number
  tiles?: number
  width?: number
  height?: number
  pointerOverride?: { x: number; y: number }
  trackPointer?: boolean
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  useFrame((state, delta) => {
    if (!matRef.current) return
    matRef.current.uniforms.time.value += delta * speed
    matRef.current.uniforms.resolution.value.set(
      state.size.width,
      state.size.height,
    )

    if (pointerOverride) {
      matRef.current.uniforms.pointer.value.set(pointerOverride.x, pointerOverride.y)
    } else if (trackPointer) {
      matRef.current.uniforms.pointer.value.set(state.pointer.x, state.pointer.y)
    }

    matRef.current.uniforms.tiles.value = tiles
  })

  return (
    <group>
    {/* Centered camera looking straight at origin */ }
    < OrthographicCamera makeDefault position = { [0, 0, 10]} />
      <mesh position={ [0, 0, 0] }>
        {/* Fixed-size plane in center */ }
        < planeGeometry args = { [width, height]} />
          {/* @ts-expect-error - intrinsic element added via extend */ }
          < waveMaterial ref = { matRef } transparent />
            </mesh>
            < /group>
  )
}

export function Wave({
  width = 1200,
  height = 1000,
  speed = 1,
  tiles = 1.5,
  pointer: pointerOverride,
  disablePointerTracking = false,
  dpr = [1, 2],
  onPointerMove,
  className,
  style,
}: WaveProps) {
  const [localPointer, setLocalPointer] = useState<{ x: number; y: number } | null>(null)

  return (
    <div
      className= { className }
  style = {{
    width,
      height,
      display: "flex",
        justifyContent: "center",
          alignItems: "center",
            overflow: "hidden",
        ...style,
      }
}
onPointerMove = {(e) => {
  if (!disablePointerTracking && !pointerOverride) {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    setLocalPointer({ x: nx, y: ny })
  }
  onPointerMove?.(e)
}}
    >
  <Canvas
        dpr={ dpr }
frameloop = "always"
gl = {{ antialias: true, alpha: true }}
camera = {{ position: [0, 0, 10] }}
style = {{ background: "transparent" }}
      >
  <Suspense fallback={ null }>
    <WaveQuad
            speed={ speed }
tiles = { tiles }
width = { width }
height = { height }
pointerOverride = { pointerOverride ?? localPointer ?? undefined}
trackPointer = {!disablePointerTracking && !pointerOverride}
/>
  < /Suspense>
  < /Canvas>
  < /div>
  )
} 


code.demo.1756750186839.tsx
import { Wave } from "@/components/ui/wave";

export default function DemoOne() {
  return (
    <main className="flex relative justify-center items-center">
      <Wave className="absolute" speed={0.5} tiles={1} />
       <h1 className="text-center absolute mt-8 text-5xl font-semibold">
            Gradient Wave
          </h1>
    </main>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/wave.tsx
/*
  Single-file Wave component using @react-three/fiber and @react-three/drei.
  - Transparent background
  - Centered plane in scene
  - All inline, no external CSS
*/

"use client"

import type React from "react"
import { useRef, useState, Suspense } from "react"
import * as THREE from "three"
import { Canvas, extend, useFrame } from "@react-three/fiber"
import { shaderMaterial, OrthographicCamera } from "@react-three/drei"

// Wave shader material
const WaveMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector2(1, 1),
    pointer: new THREE.Vector2(0.0, 0.0),
    tiles: 1.5,
  },
  /* glsl */ `
    varying vec2 vUv;
    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectionPosition = projectionMatrix * viewPosition;
      gl_Position = projectionPosition;
      vUv = uv;
    }
  `,
  /* glsl */ `
    uniform float time;
    uniform vec2 resolution;
    uniform vec2 pointer;
    uniform float tiles;
    varying vec2 vUv;

    vec3 palette(float t) {
      vec3 a = vec3(0.5, 0.5, 0.5);
      vec3 b = vec3(0.5, 0.5, 0.5);
      vec3 c = vec3(1.0, 1.0, 1.0);
      vec3 d = vec3(0.263, 0.416, 0.557);
      return a + b * cos(6.28318 * (c * t + d));
    }

    void main() {
  vec2 uv = vUv * 2.0 - 1.0;  // -1..1 centered coords
  vec2 uv0 = uv;
  vec3 finalColor = vec3(0.0);

  uv = uv * tiles - pointer;

  float d = length(uv) * exp(-length(uv0));
  vec3 col = palette(length(uv0) + time * 0.4);
  d = sin(d * 8.0 + time) / 8.0;
  d = abs(d);
  d = pow(0.02 / d, 2.0);
  finalColor += col * d;

  float alpha = clamp(length(finalColor), 0.0, 1.0);
  gl_FragColor = vec4(finalColor, alpha);
}

  `,
)

extend({ WaveMaterial })

export type WaveProps = {
  width?: number
  height?: number
  speed?: number
  tiles?: number
  pointer?: { x: number; y: number }
  disablePointerTracking?: boolean
  dpr?: number | [number, number]
  onPointerMove?: (e: React.PointerEvent<HTMLDivElement>) => void
  className?: string
  style?: React.CSSProperties
}

function WaveQuad({
  speed = 1,
  tiles = 1.5,
  width = 600,
  height = 400,
  pointerOverride,
  trackPointer = true,
}: {
  speed?: number
  tiles?: number
  width?: number
  height?: number
  pointerOverride?: { x: number; y: number }
  trackPointer?: boolean
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  useFrame((state, delta) => {
    if (!matRef.current) return
    matRef.current.uniforms.time.value += delta * speed
    matRef.current.uniforms.resolution.value.set(
      state.size.width,
      state.size.height,
    )

    if (pointerOverride) {
      matRef.current.uniforms.pointer.value.set(pointerOverride.x, pointerOverride.y)
    } else if (trackPointer) {
      matRef.current.uniforms.pointer.value.set(state.pointer.x, state.pointer.y)
    }

    matRef.current.uniforms.tiles.value = tiles
  })

  return (
    <group>
    {/* Centered camera looking straight at origin */ }
    < OrthographicCamera makeDefault position = { [0, 0, 10]} />
      <mesh position={ [0, 0, 0] }>
        {/* Fixed-size plane in center */ }
        < planeGeometry args = { [width, height]} />
          {/* @ts-expect-error - intrinsic element added via extend */ }
          < waveMaterial ref = { matRef } transparent />
            </mesh>
            < /group>
  )
}

export function Wave({
  width = 1200,
  height = 1000,
  speed = 1,
  tiles = 1.5,
  pointer: pointerOverride,
  disablePointerTracking = false,
  dpr = [1, 2],
  onPointerMove,
  className,
  style,
}: WaveProps) {
  const [localPointer, setLocalPointer] = useState<{ x: number; y: number } | null>(null)

  return (
    <div
      className= { className }
  style = {{
    width,
      height,
      display: "flex",
        justifyContent: "center",
          alignItems: "center",
            overflow: "hidden",
        ...style,
      }
}
onPointerMove = {(e) => {
  if (!disablePointerTracking && !pointerOverride) {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    setLocalPointer({ x: nx, y: ny })
  }
  onPointerMove?.(e)
}}
    >
  <Canvas
        dpr={ dpr }
frameloop = "always"
gl = {{ antialias: true, alpha: true }}
camera = {{ position: [0, 0, 10] }}
style = {{ background: "transparent" }}
      >
  <Suspense fallback={ null }>
    <WaveQuad
            speed={ speed }
tiles = { tiles }
width = { width }
height = { height }
pointerOverride = { pointerOverride ?? localPointer ?? undefined}
trackPointer = {!disablePointerTracking && !pointerOverride}
/>
  < /Suspense>
  < /Canvas>
  < /div>
  )
} 

```

Install NPM dependencies:
```bash
three, @react-three/fiber, @react-three/drei
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
