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
crystal-shader.tsx
import React, { useRef, useEffect } from 'react';

interface InteractiveShaderProps {
  cellDensity?: number;      // How many cells in the Voronoi grid
  animationSpeed?: number;   // Speed multiplier for time
  warpFactor?: number;       // How strongly the second Voronoi field warps the first
  mouseInfluence?: number;   // How much the mouse repels the pattern
}

const InteractiveShader: React.FC<InteractiveShaderProps> = ({
  cellDensity = 8.0,
  animationSpeed = 0.2,
  warpFactor = 0.6,
  mouseInfluence = 0.15,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get WebGL context
    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL is not supported in this browser.');
      return;
    }

    // Full-viewport resize helper
    function resizeCanvas() {
      // Always cover the viewport
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Account for device pixel ratio for crisp rendering
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(iResolutionLoc, canvas.width, canvas.height);
    }

    // Mouse-tracking helper
    function handleMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    }

    // Compile a shader of given type
    function compileShader(src: string, type: number) {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);

      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    }

    // Vertex shader (fullscreen quad)
    const vertexShaderSrc = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    // Fragment shader (Voronoi + warp + color)
    const fragmentShaderSrc = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;
      uniform float uCellDensity;
      uniform float uAnimationSpeed;
      uniform float uWarpFactor;
      uniform float uMouseInfluence;
      #define PI 3.14159265359

      vec2 random2(vec2 p) {
        return fract(sin(vec2(
          dot(p, vec2(127.1,311.7)),
          dot(p, vec2(269.5,183.3))
        )) * 43758.5453);
      }

      // Returns shortest and second-shortest distance in a Voronoi diagram
      vec2 voronoi(vec2 x, float time) {
        vec2 n = floor(x);
        vec2 f = fract(x);

        float m = 10.0;
        float m2 = 10.0;

        for(int j = -1; j <= 1; j++){
          for(int i = -1; i <= 1; i++){
            vec2 g = vec2(float(i), float(j));
            vec2 o = random2(n + g);
            o = 0.5 + 0.5 * sin(time + o * PI * 2.0);
            float d = length(g - f + o);
            if (d < m) {
              m2 = m;
              m = d;
            } else if (d < m2) {
              m2 = d;
            }
          }
        }
        return vec2(m, m2);
      }

      void main() {
        // Normalized pixel coords
        vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y);

        // Mouse in [-1..1]
        vec2 m = (iMouse * 2.0 - 1.0);
        m.y *= -1.0;

        // Repel effect
        float md = length(uv - m);
        vec2 disp = normalize(uv - m)
          * (1.0 - smoothstep(0.0, 0.5, md))
          * uMouseInfluence;
        uv -= disp;

        float t = iTime * uAnimationSpeed;
        vec2 b = voronoi(uv * uCellDensity, t);
        vec2 w = voronoi(uv * uCellDensity + b.yy * uWarpFactor, t);

        float pattern = w.y - w.x;
        vec3 baseColor = 0.5 + 0.5 * cos(t * 0.5 + vec3(0.0, 0.2, 0.4));
        baseColor *= 1.0 - smoothstep(0.01, 0.02, pattern);
        baseColor += pow(1.0 - b.x, 10.0) * 0.1;

        gl_FragColor = vec4(baseColor, 1.0);
      }
    `;

    // Compile & link the program
    const vShader = compileShader(vertexShaderSrc, gl.VERTEX_SHADER);
    const fShader = compileShader(fragmentShaderSrc, gl.FRAGMENT_SHADER);
    if (!vShader || !fShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Look up attribute/uniform locations
    const aPosLoc = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosLoc);

    const iResolutionLoc = gl.getUniformLocation(program, 'iResolution')!;
    const iTimeLoc       = gl.getUniformLocation(program, 'iTime')!;
    const iMouseLoc      = gl.getUniformLocation(program, 'iMouse')!;
    const uCellDensityLoc     = gl.getUniformLocation(program, 'uCellDensity')!;
    const uAnimationSpeedLoc  = gl.getUniformLocation(program, 'uAnimationSpeed')!;
    const uWarpFactorLoc      = gl.getUniformLocation(program, 'uWarpFactor')!;
    const uMouseInfluenceLoc  = gl.getUniformLocation(program, 'uMouseInfluence')!;

    // Full-screen quad
    const quad = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

    // Prepare GL state
    gl.clearColor(0, 0, 0, 1);

    // Start time
    const start = performance.now();
    let rafId: number;

    // Hook up events
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Main render loop
    function render() {
      gl.clear(gl.COLOR_BUFFER_BIT);

      const now = (performance.now() - start) / 1000;
      gl.uniform1f(iTimeLoc, now);
      gl.uniform2f(iMouseLoc, mousePos.current.x, mousePos.current.y);
      gl.uniform1f(uCellDensityLoc, cellDensity);
      gl.uniform1f(uAnimationSpeedLoc, animationSpeed);
      gl.uniform1f(uWarpFactorLoc, warpFactor);
      gl.uniform1f(uMouseInfluenceLoc, mouseInfluence);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafId = requestAnimationFrame(render);
    }
    render();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      if (!gl.isContextLost()) {
        gl.deleteShader(vShader);
        gl.deleteShader(fShader);
        gl.deleteProgram(program);
        gl.deleteBuffer(buf);
      }
    };
  }, [cellDensity, animationSpeed, warpFactor, mouseInfluence]);

  // Make canvas fill viewport
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'block',
      }}
    />
  );
};

export default InteractiveShader;


code.demo.1756393809245.tsx
import React, { useState } from 'react';
import InteractiveShader from "@/components/ui/crystal-shader";

export default function DemoOne() {
   // State variables to hold the shader parameters, controlled by sliders
  const [cellDensity, setCellDensity] = useState(8.0);
  const [animationSpeed, setAnimationSpeed] = useState(0.2);
  const [warpFactor, setWarpFactor] = useState(0.6);
  const [mouseInfluence, setMouseInfluence] = useState(0.15);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* The main shader component that renders the visual effect */}
      <InteractiveShader
        cellDensity={cellDensity}
        animationSpeed={animationSpeed}
        warpFactor={warpFactor}
        mouseInfluence={mouseInfluence}
      />

      {/* UI controls panel. 
        Note: This uses inline styles and basic HTML. 
        For a real project, you would use Tailwind or styled-components.
      */}
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        width: '100%',
        maxWidth: '32rem',
        border: '1px solid #4A5568'
      }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', letterSpacing: '0.05em', textAlign: 'center' }}>
          Crystal Synthesis
        </h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem 1.5rem' }}>
          {/* Slider for Cell Density */}
          <div>
            <label htmlFor="cellDensity" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              Cell Density: {cellDensity.toFixed(1)}
            </label>
            <input
              id="cellDensity"
              type="range"
              min="2"
              max="20"
              step="0.1"
              value={cellDensity}
              onChange={(e) => setCellDensity(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Slider for Animation Speed */}
          <div>
            <label htmlFor="animationSpeed" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              Animation Speed: {animationSpeed.toFixed(2)}
            </label>
            <input
              id="animationSpeed"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Slider for Warp Factor */}
          <div>
            <label htmlFor="warpFactor" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              Warp Factor: {warpFactor.toFixed(2)}
            </label>
            <input
              id="warpFactor"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={warpFactor}
              onChange={(e) => setWarpFactor(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Slider for Mouse Influence */}
          <div>
            <label htmlFor="mouseInfluence" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              Mouse Influence: {mouseInfluence.toFixed(2)}
            </label>
            <input
              id="mouseInfluence"
              type="range"
              min="0"
              max="0.5"
              step="0.01"
              value={mouseInfluence}
              onChange={(e) => setMouseInfluence(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/crystal-shader.tsx
import React, { useRef, useEffect } from 'react';

interface InteractiveShaderProps {
  cellDensity?: number;      // How many cells in the Voronoi grid
  animationSpeed?: number;   // Speed multiplier for time
  warpFactor?: number;       // How strongly the second Voronoi field warps the first
  mouseInfluence?: number;   // How much the mouse repels the pattern
}

const InteractiveShader: React.FC<InteractiveShaderProps> = ({
  cellDensity = 8.0,
  animationSpeed = 0.2,
  warpFactor = 0.6,
  mouseInfluence = 0.15,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get WebGL context
    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL is not supported in this browser.');
      return;
    }

    // Full-viewport resize helper
    function resizeCanvas() {
      // Always cover the viewport
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Account for device pixel ratio for crisp rendering
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(iResolutionLoc, canvas.width, canvas.height);
    }

    // Mouse-tracking helper
    function handleMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    }

    // Compile a shader of given type
    function compileShader(src: string, type: number) {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);

      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    }

    // Vertex shader (fullscreen quad)
    const vertexShaderSrc = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    // Fragment shader (Voronoi + warp + color)
    const fragmentShaderSrc = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;
      uniform float uCellDensity;
      uniform float uAnimationSpeed;
      uniform float uWarpFactor;
      uniform float uMouseInfluence;
      #define PI 3.14159265359

      vec2 random2(vec2 p) {
        return fract(sin(vec2(
          dot(p, vec2(127.1,311.7)),
          dot(p, vec2(269.5,183.3))
        )) * 43758.5453);
      }

      // Returns shortest and second-shortest distance in a Voronoi diagram
      vec2 voronoi(vec2 x, float time) {
        vec2 n = floor(x);
        vec2 f = fract(x);

        float m = 10.0;
        float m2 = 10.0;

        for(int j = -1; j <= 1; j++){
          for(int i = -1; i <= 1; i++){
            vec2 g = vec2(float(i), float(j));
            vec2 o = random2(n + g);
            o = 0.5 + 0.5 * sin(time + o * PI * 2.0);
            float d = length(g - f + o);
            if (d < m) {
              m2 = m;
              m = d;
            } else if (d < m2) {
              m2 = d;
            }
          }
        }
        return vec2(m, m2);
      }

      void main() {
        // Normalized pixel coords
        vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y);

        // Mouse in [-1..1]
        vec2 m = (iMouse * 2.0 - 1.0);
        m.y *= -1.0;

        // Repel effect
        float md = length(uv - m);
        vec2 disp = normalize(uv - m)
          * (1.0 - smoothstep(0.0, 0.5, md))
          * uMouseInfluence;
        uv -= disp;

        float t = iTime * uAnimationSpeed;
        vec2 b = voronoi(uv * uCellDensity, t);
        vec2 w = voronoi(uv * uCellDensity + b.yy * uWarpFactor, t);

        float pattern = w.y - w.x;
        vec3 baseColor = 0.5 + 0.5 * cos(t * 0.5 + vec3(0.0, 0.2, 0.4));
        baseColor *= 1.0 - smoothstep(0.01, 0.02, pattern);
        baseColor += pow(1.0 - b.x, 10.0) * 0.1;

        gl_FragColor = vec4(baseColor, 1.0);
      }
    `;

    // Compile & link the program
    const vShader = compileShader(vertexShaderSrc, gl.VERTEX_SHADER);
    const fShader = compileShader(fragmentShaderSrc, gl.FRAGMENT_SHADER);
    if (!vShader || !fShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Look up attribute/uniform locations
    const aPosLoc = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosLoc);

    const iResolutionLoc = gl.getUniformLocation(program, 'iResolution')!;
    const iTimeLoc       = gl.getUniformLocation(program, 'iTime')!;
    const iMouseLoc      = gl.getUniformLocation(program, 'iMouse')!;
    const uCellDensityLoc     = gl.getUniformLocation(program, 'uCellDensity')!;
    const uAnimationSpeedLoc  = gl.getUniformLocation(program, 'uAnimationSpeed')!;
    const uWarpFactorLoc      = gl.getUniformLocation(program, 'uWarpFactor')!;
    const uMouseInfluenceLoc  = gl.getUniformLocation(program, 'uMouseInfluence')!;

    // Full-screen quad
    const quad = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

    // Prepare GL state
    gl.clearColor(0, 0, 0, 1);

    // Start time
    const start = performance.now();
    let rafId: number;

    // Hook up events
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Main render loop
    function render() {
      gl.clear(gl.COLOR_BUFFER_BIT);

      const now = (performance.now() - start) / 1000;
      gl.uniform1f(iTimeLoc, now);
      gl.uniform2f(iMouseLoc, mousePos.current.x, mousePos.current.y);
      gl.uniform1f(uCellDensityLoc, cellDensity);
      gl.uniform1f(uAnimationSpeedLoc, animationSpeed);
      gl.uniform1f(uWarpFactorLoc, warpFactor);
      gl.uniform1f(uMouseInfluenceLoc, mouseInfluence);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafId = requestAnimationFrame(render);
    }
    render();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      if (!gl.isContextLost()) {
        gl.deleteShader(vShader);
        gl.deleteShader(fShader);
        gl.deleteProgram(program);
        gl.deleteBuffer(buf);
      }
    };
  }, [cellDensity, animationSpeed, warpFactor, mouseInfluence]);

  // Make canvas fill viewport
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'block',
      }}
    />
  );
};

export default InteractiveShader;

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
