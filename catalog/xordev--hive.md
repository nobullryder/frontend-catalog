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
hive.tsx
// ShaderDemo.tsx
"use client"

import { useEffect, useRef } from "react"

const vertSrc = `#version 300 es
layout(location=0) in vec2 a_pos;
void main(){ gl_Position = vec4(a_pos,0.0,1.0); }`

const fragSrc = `#version 300 es
precision highp float;
out vec4 fragColor;

uniform vec2  u_res;
uniform float u_time;

#define PI2 6.28318530718

void main(){
  // Map your symbols:
  // FC -> vec3(gl_FragCoord.xy, 0.0)
  // r  -> vec3(u_res, max(u_res.x, u_res.y))
  // t  -> u_time
  vec3 FC = vec3(gl_FragCoord.xy, 0.0);
  vec3 r  = vec3(u_res, max(u_res.x, u_res.y));
  float t = u_time;

  vec4 o = vec4(0.0);

  // ---- Your one-liner with *only* safe initializations added ----
  vec3 p = vec3(0.0);               // was uninitialized
  float i = 0.0, z = 1.0, d = 0.0;  // init so first iter is defined

  for ( ; i++ < 2e1;
        o += (cos(2e1*p.y/z + vec4(6.0,1.0,2.0,0.0)) + 1.0) * d / z / 4.0 )
  {
    p = z * normalize(FC.rgb * 2.0 - r.xyy);
    p.x -= t;
    p.xy *= 0.4;
    z += (d = max(p.z + 6.0, dot(cos(p.xy), sin(p.yx / 0.4))));
  }

  o = tanh(o * o);
  fragColor = o;
}`

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!; gl.shaderSource(sh, src); gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) || "compile error")
  return sh
}
function link(gl: WebGL2RenderingContext, vs: string, fs: string) {
  const p = gl.createProgram()!; gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, vs)); gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, fs))
  gl.linkProgram(p); if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) || "link error")
  return p
}
function fsQuad(gl: WebGL2RenderingContext) {
  const buf = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1,  -1,1, 1,-1, 1,1]), gl.STATIC_DRAW)
  gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
}

export default function ShaderDemo(){
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const gl = canvas.getContext("webgl2", { premultipliedAlpha:false })
    if (!gl) return

    const prog = link(gl, vertSrc, fragSrc)
    gl.useProgram(prog)
    fsQuad(gl)

    const uRes  = gl.getUniformLocation(prog, "u_res")
    const uTime = gl.getUniformLocation(prog, "u_time")

    const resize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
      const w = Math.floor((canvas.clientWidth || window.innerWidth) * dpr)
      const h = Math.floor((canvas.clientHeight || window.innerHeight) * dpr)
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h }
      gl.viewport(0, 0, w, h)
      gl.uniform2f(uRes, w, h)
    }
    const onResize = () => { resize(); }
    window.addEventListener("resize", onResize, { passive:true })
    resize()

    let raf = 0
    const t0 = performance.now()
    const draw = () => {
      const t = (performance.now() - t0) / 1000
      gl.uniform1f(uTime, t)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize) }
  }, [])

  return <canvas ref={ref} style={{ width:"100%", height:"100vh", display:"block", background:"#000" }} />
}


code.demo.1756885056425.tsx
// demo.tsx
"use client"

import ShaderDemo from "@/components/ui/hive"

export default function Demo() {
  return (
    <div className="w-full h-screen">
      <ShaderDemo />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/hive.tsx
// ShaderDemo.tsx
"use client"

import { useEffect, useRef } from "react"

const vertSrc = `#version 300 es
layout(location=0) in vec2 a_pos;
void main(){ gl_Position = vec4(a_pos,0.0,1.0); }`

const fragSrc = `#version 300 es
precision highp float;
out vec4 fragColor;

uniform vec2  u_res;
uniform float u_time;

#define PI2 6.28318530718

void main(){
  // Map your symbols:
  // FC -> vec3(gl_FragCoord.xy, 0.0)
  // r  -> vec3(u_res, max(u_res.x, u_res.y))
  // t  -> u_time
  vec3 FC = vec3(gl_FragCoord.xy, 0.0);
  vec3 r  = vec3(u_res, max(u_res.x, u_res.y));
  float t = u_time;

  vec4 o = vec4(0.0);

  // ---- Your one-liner with *only* safe initializations added ----
  vec3 p = vec3(0.0);               // was uninitialized
  float i = 0.0, z = 1.0, d = 0.0;  // init so first iter is defined

  for ( ; i++ < 2e1;
        o += (cos(2e1*p.y/z + vec4(6.0,1.0,2.0,0.0)) + 1.0) * d / z / 4.0 )
  {
    p = z * normalize(FC.rgb * 2.0 - r.xyy);
    p.x -= t;
    p.xy *= 0.4;
    z += (d = max(p.z + 6.0, dot(cos(p.xy), sin(p.yx / 0.4))));
  }

  o = tanh(o * o);
  fragColor = o;
}`

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!; gl.shaderSource(sh, src); gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) || "compile error")
  return sh
}
function link(gl: WebGL2RenderingContext, vs: string, fs: string) {
  const p = gl.createProgram()!; gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, vs)); gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, fs))
  gl.linkProgram(p); if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) || "link error")
  return p
}
function fsQuad(gl: WebGL2RenderingContext) {
  const buf = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1,  -1,1, 1,-1, 1,1]), gl.STATIC_DRAW)
  gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
}

export default function ShaderDemo(){
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const gl = canvas.getContext("webgl2", { premultipliedAlpha:false })
    if (!gl) return

    const prog = link(gl, vertSrc, fragSrc)
    gl.useProgram(prog)
    fsQuad(gl)

    const uRes  = gl.getUniformLocation(prog, "u_res")
    const uTime = gl.getUniformLocation(prog, "u_time")

    const resize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
      const w = Math.floor((canvas.clientWidth || window.innerWidth) * dpr)
      const h = Math.floor((canvas.clientHeight || window.innerHeight) * dpr)
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h }
      gl.viewport(0, 0, w, h)
      gl.uniform2f(uRes, w, h)
    }
    const onResize = () => { resize(); }
    window.addEventListener("resize", onResize, { passive:true })
    resize()

    let raf = 0
    const t0 = performance.now()
    const draw = () => {
      const t = (performance.now() - t0) / 1000
      gl.uniform1f(uTime, t)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize) }
  }, [])

  return <canvas ref={ref} style={{ width:"100%", height:"100vh", display:"block", background:"#000" }} />
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
