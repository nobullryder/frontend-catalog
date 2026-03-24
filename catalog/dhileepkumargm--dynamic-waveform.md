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
dynamic-waveform.tsx
import React, { useRef, useEffect, memo } from 'react';
import * as THREE from 'three';

// --- GLSL Shaders ---
const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform float u_complexity;
  uniform float u_amplitude;
  uniform float u_frequency;
  uniform float u_mouse_distortion;

  // 2D Random
  float random(vec2 p) {
    return fract(sin(dot(p,vec2(12.9898,78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    // --- Wave Generation ---
    float y = uv.y;
    float waveSum = 0.0;
    for (float i = 1.0; i <= 8.0; i++) {
      if (i > u_complexity) break;
      float freq = i * (u_frequency + 2.0);
      float amp  = (u_amplitude / i) * 0.2;
      float speed = u_time * (i * 0.5);

      // mouse-driven distortion
      float mEff = 1.0 + (u_mouse.y - 0.5) * u_mouse_distortion * i;
      waveSum += sin(uv.x * freq * mEff + speed) * amp;
    }
    y += waveSum;

    // --- Line + Glow ---
    float lineW  = 0.01;
    float glowW  = 0.1;
    float line   = smoothstep(lineW, 0.0, abs(uv.y - y));
    float glow   = smoothstep(glowW, 0.0, abs(uv.y - y));

    // --- Color Mix ---
    vec3 base = mix(u_color1, u_color2, smoothstep(0.3, 0.7, y));
    vec3 color = base * line + base * glow * 0.5;

    // --- Static Noise Overlay ---
    float noise = (random(uv + u_time) - 0.5) * 0.05;
    color += noise;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export interface ShaderCanvasProps {
  color1?: THREE.Color | string | number;
  color2?: THREE.Color | string | number;
  complexity?: number;
  amplitude?: number;
  frequency?: number;
  mouseDistortion?: number;
  speed?: number;
}

const ShaderCanvas: React.FC<ShaderCanvasProps> = memo(({
  color1         = '#ff4444',
  color2         = '#4444ff',
  complexity     = 8,
  amplitude      = 1,
  frequency      = 1,
  mouseDistortion= 0.5,
  speed          = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<any>({});

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene, Camera
    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // 2. Renderer (solid background)
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1);    // black bg
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // 3. Uniforms (incl. initial props)
    const uniforms = {
      u_time:             { value: 0.0 },
      u_resolution:       { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_mouse:            { value: new THREE.Vector2(0.5, 0.5) },
      u_color1:           { value: new THREE.Color(color1) },
      u_color2:           { value: new THREE.Color(color2) },
      u_complexity:       { value: complexity },
      u_amplitude:        { value: amplitude },
      u_frequency:        { value: frequency },
      u_mouse_distortion: { value: mouseDistortion },
    };

    // 4. Fullscreen quad
    const geo  = new THREE.PlaneGeometry(2, 2);
    const mat  = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // 5. Clock & speed
    const clock = new THREE.Clock();
    threeRef.current = { renderer, scene, camera, uniforms, clock, speed };

    // 6. Resize handler
    function onResize() {
      const W = window.innerWidth;
      const H = window.innerHeight;
      renderer.setSize(W, H);
      uniforms.u_resolution.value.set(W, H);
    }
    window.addEventListener('resize', onResize);
    onResize();

    // 7. Mouse handler
    function onMouse(e: MouseEvent) {
      const x = e.clientX / window.innerWidth;
      const y = 1.0 - e.clientY / window.innerHeight;
      uniforms.u_mouse.value.set(x, y);
    }
    window.addEventListener('mousemove', onMouse);

    // 8. Render loop
    let id: number;
    const loop = () => {
      const { clock, uniforms } = threeRef.current;
      const t = clock.getElapsedTime() * threeRef.current.speed;
      uniforms.u_time.value = t;
      renderer.render(scene, camera);
      id = requestAnimationFrame(loop);
    };
    loop();

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Keep uniforms in sync if props change
  useEffect(() => {
    const { uniforms } = threeRef.current;
    if (!uniforms) return;
    uniforms.u_color1.value.set(color1);
    uniforms.u_color2.value.set(color2);
    uniforms.u_complexity.value       = complexity;
    uniforms.u_amplitude.value        = amplitude;
    uniforms.u_frequency.value        = frequency;
    uniforms.u_mouse_distortion.value = mouseDistortion;
    threeRef.current.speed = speed;
  }, [color1, color2, complexity, amplitude, frequency, mouseDistortion, speed]);

  // Fill viewport with a fallback background
  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        overflow: 'hidden',
      }}
    />
  );
});

export default ShaderCanvas;


code.demo.1756396557477.tsx
import ShaderCanvas from "@/components/ui/dynamic-waveform";
import React, { useState, useCallback } from 'react';
// --- Constants ---
const DEFAULT_PROPS = {
  color1: "#fb7185", // Rose
  color2: "#67e8f9", // Cyan
  speed: 0.5,
  complexity: 4.0,
  amplitude: 1.0,
  frequency: 20.0,
  mouseDistortion: 0.5,
};

const PRESETS = [
    { name: "Signal Scan", settings: { color1: "#4ade80", color2: "#ffffff", speed: 0.3, complexity: 2.0, amplitude: 0.5, frequency: 30.0, mouseDistortion: 0.2 } },
    { name: "Deep Sea", settings: { color1: "#0369a1", color2: "#a5f3fc", speed: 0.2, complexity: 6.0, amplitude: 1.2, frequency: 10.0, mouseDistortion: 0.8 } },
    { name: "Vaporwave", settings: { color1: "#f472b6", color2: "#38bdf8", speed: 0.6, complexity: 3.0, amplitude: 0.8, frequency: 15.0, mouseDistortion: 0.4 } },
];

export default function DemoOne() {
  const [props, setProps] = useState(DEFAULT_PROPS);

  const applyPreset = useCallback((preset) => setProps(preset.settings), []);
  const handleValueChange = useCallback((propName, value) => {
    setProps(prev => ({ ...prev, [propName]: value }));
  }, []);

  return (
    <div className="relative w-screen h-screen bg-gray-900 font-sans overflow-hidden">
      <ShaderCanvas {...props} />

      <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-xl p-6 rounded-2xl text-white shadow-2xl w-96 border border-white/10">
        <h1 className="text-2xl font-bold mb-2 tracking-wide text-white/90">Dynamic Waveform Controls</h1>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
            <div><label className="block mb-2 text-sm text-white/70">Color A</label><input type="color" value={props.color1} onChange={(e) => handleValueChange('color1', e.target.value)} className="w-full h-10 p-1 bg-gray-800 border-white/20 rounded-md"/></div>
            <div><label className="block mb-2 text-sm text-white/70">Color B</label><input type="color" value={props.color2} onChange={(e) => handleValueChange('color2', e.target.value)} className="w-full h-10 p-1 bg-gray-800 border-white/20 rounded-md"/></div>
        </div>

        <div className="space-y-4">
          <div><label className="text-sm">Speed: {props.speed.toFixed(2)}</label><input type="range" min="0.0" max="2.0" step="0.01" value={props.speed} onChange={(e) => handleValueChange('speed', parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-rose-500"/></div>
          <div><label className="text-sm">Wave Complexity: {props.complexity.toFixed(1)}</label><input type="range" min="1.0" max="8.0" step="0.1" value={props.complexity} onChange={(e) => handleValueChange('complexity', parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-rose-500"/></div>
          <div><label className="text-sm">Amplitude: {props.amplitude.toFixed(2)}</label><input type="range" min="0.0" max="2.0" step="0.01" value={props.amplitude} onChange={(e) => handleValueChange('amplitude', parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-rose-500"/></div>
          <div><label className="text-sm">Frequency: {props.frequency.toFixed(1)}</label><input type="range" min="5.0" max="50.0" step="0.1" value={props.frequency} onChange={(e) => handleValueChange('frequency', parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-rose-500"/></div>
          <div><label className="text-sm">Mouse Distortion: {props.mouseDistortion.toFixed(2)}</label><input type="range" min="0.0" max="2.0" step="0.01" value={props.mouseDistortion} onChange={(e) => handleValueChange('mouseDistortion', parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-rose-500"/></div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-white/10">
            <div className="grid grid-cols-3 gap-2">
                {PRESETS.map(p => <button key={p.name} onClick={() => applyPreset(p)} className="px-3 py-2 text-xs bg-white/10 rounded-md hover:bg-white/20 transition-colors">{p.name}</button>)}
            </div>
        </div>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/dynamic-waveform.tsx
import React, { useRef, useEffect, memo } from 'react';
import * as THREE from 'three';

// --- GLSL Shaders ---
const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform float u_complexity;
  uniform float u_amplitude;
  uniform float u_frequency;
  uniform float u_mouse_distortion;

  // 2D Random
  float random(vec2 p) {
    return fract(sin(dot(p,vec2(12.9898,78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    // --- Wave Generation ---
    float y = uv.y;
    float waveSum = 0.0;
    for (float i = 1.0; i <= 8.0; i++) {
      if (i > u_complexity) break;
      float freq = i * (u_frequency + 2.0);
      float amp  = (u_amplitude / i) * 0.2;
      float speed = u_time * (i * 0.5);

      // mouse-driven distortion
      float mEff = 1.0 + (u_mouse.y - 0.5) * u_mouse_distortion * i;
      waveSum += sin(uv.x * freq * mEff + speed) * amp;
    }
    y += waveSum;

    // --- Line + Glow ---
    float lineW  = 0.01;
    float glowW  = 0.1;
    float line   = smoothstep(lineW, 0.0, abs(uv.y - y));
    float glow   = smoothstep(glowW, 0.0, abs(uv.y - y));

    // --- Color Mix ---
    vec3 base = mix(u_color1, u_color2, smoothstep(0.3, 0.7, y));
    vec3 color = base * line + base * glow * 0.5;

    // --- Static Noise Overlay ---
    float noise = (random(uv + u_time) - 0.5) * 0.05;
    color += noise;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export interface ShaderCanvasProps {
  color1?: THREE.Color | string | number;
  color2?: THREE.Color | string | number;
  complexity?: number;
  amplitude?: number;
  frequency?: number;
  mouseDistortion?: number;
  speed?: number;
}

const ShaderCanvas: React.FC<ShaderCanvasProps> = memo(({
  color1         = '#ff4444',
  color2         = '#4444ff',
  complexity     = 8,
  amplitude      = 1,
  frequency      = 1,
  mouseDistortion= 0.5,
  speed          = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<any>({});

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene, Camera
    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // 2. Renderer (solid background)
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1);    // black bg
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // 3. Uniforms (incl. initial props)
    const uniforms = {
      u_time:             { value: 0.0 },
      u_resolution:       { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_mouse:            { value: new THREE.Vector2(0.5, 0.5) },
      u_color1:           { value: new THREE.Color(color1) },
      u_color2:           { value: new THREE.Color(color2) },
      u_complexity:       { value: complexity },
      u_amplitude:        { value: amplitude },
      u_frequency:        { value: frequency },
      u_mouse_distortion: { value: mouseDistortion },
    };

    // 4. Fullscreen quad
    const geo  = new THREE.PlaneGeometry(2, 2);
    const mat  = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // 5. Clock & speed
    const clock = new THREE.Clock();
    threeRef.current = { renderer, scene, camera, uniforms, clock, speed };

    // 6. Resize handler
    function onResize() {
      const W = window.innerWidth;
      const H = window.innerHeight;
      renderer.setSize(W, H);
      uniforms.u_resolution.value.set(W, H);
    }
    window.addEventListener('resize', onResize);
    onResize();

    // 7. Mouse handler
    function onMouse(e: MouseEvent) {
      const x = e.clientX / window.innerWidth;
      const y = 1.0 - e.clientY / window.innerHeight;
      uniforms.u_mouse.value.set(x, y);
    }
    window.addEventListener('mousemove', onMouse);

    // 8. Render loop
    let id: number;
    const loop = () => {
      const { clock, uniforms } = threeRef.current;
      const t = clock.getElapsedTime() * threeRef.current.speed;
      uniforms.u_time.value = t;
      renderer.render(scene, camera);
      id = requestAnimationFrame(loop);
    };
    loop();

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Keep uniforms in sync if props change
  useEffect(() => {
    const { uniforms } = threeRef.current;
    if (!uniforms) return;
    uniforms.u_color1.value.set(color1);
    uniforms.u_color2.value.set(color2);
    uniforms.u_complexity.value       = complexity;
    uniforms.u_amplitude.value        = amplitude;
    uniforms.u_frequency.value        = frequency;
    uniforms.u_mouse_distortion.value = mouseDistortion;
    threeRef.current.speed = speed;
  }, [color1, color2, complexity, amplitude, frequency, mouseDistortion, speed]);

  // Fill viewport with a fallback background
  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        overflow: 'hidden',
      }}
    />
  );
});

export default ShaderCanvas;

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
