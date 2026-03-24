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
digital-glitch.tsx
import React, { useRef, useEffect, useState, memo } from 'react';
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
  uniform float u_glitch_intensity;
  uniform float u_rgb_shift;
  uniform float u_scanline_density;
  uniform float u_scanline_opacity;
  uniform vec3 u_base_color;

  // 2D Random function
  float random(vec2 p) {
    return fract(sin(dot(p.xy, vec2(12.9898, 78.233))) * 43758.5453);
  }
  
  // Noise function for glitch effect
  float noise(float p) {
    return random(vec2(p, p * 2.0));
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    // --- Glitch Effect ---
    float glitch_time = floor(u_time * 10.0);
    float glitch_amount = noise(glitch_time) * u_glitch_intensity * 0.1;
    
    if (fract(uv.y * 10.0 + noise(glitch_time) * 100.0) > 0.95) {
      uv.x += glitch_amount;
    }

    // --- Chromatic Aberration (RGB Shift) ---
    vec2 uv_r = uv + vec2(u_rgb_shift, 0.0);
    vec2 uv_g = uv;
    vec2 uv_b = uv - vec2(u_rgb_shift, 0.0);
    
    float pattern_r = step(0.5, fract(uv_r.x * 5.0 + u_time));
    float pattern_g = step(0.5, fract(uv_g.x * 5.0 + u_time));
    float pattern_b = step(0.5, fract(uv_b.x * 5.0 + u_time));
    
    vec3 color = vec3(pattern_r, pattern_g, pattern_b);
    color *= u_base_color;

    // --- Scanline Effect ---
    float scanline = sin(uv.y * u_scanline_density) * 0.5 + 0.5;
    color *= mix(1.0, scanline, u_scanline_opacity);

    // --- Film Grain ---
    color += (random(uv + u_time) - 0.5) * 0.05;

    gl_FragColor = vec4(color, 1.0);
  }
`;

// --- Helper Function ---
const hexToThreeColor = (hex) => new THREE.Color(hex);

// --- Shader Canvas Component ---
const ShaderCanvas = memo((props) => {
  const mountRef = useRef(null);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  const threeRef = useRef({});

  useEffect(() => {
    if (!mountRef.current) return;

    const canvas = document.createElement('canvas');
    if (!canvas.getContext('webgl') && !canvas.getContext('experimental-webgl')) {
        setIsWebGLSupported(false);
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_base_color: { value: hexToThreeColor(props.baseColor) },
      u_glitch_intensity: { value: props.glitchIntensity },
      u_rgb_shift: { value: props.rgbShift },
      u_scanline_density: { value: props.scanlineDensity },
      u_scanline_opacity: { value: props.scanlineOpacity },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    threeRef.current = { renderer, scene, camera, uniforms, clock: new THREE.Clock() };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const animate = () => {
      uniforms.u_time.value = threeRef.current.clock.getElapsedTime() * threeRef.current.speed;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const { uniforms } = threeRef.current;
    if (uniforms) {
      uniforms.u_base_color.value = hexToThreeColor(props.baseColor);
      uniforms.u_glitch_intensity.value = props.glitchIntensity;
      uniforms.u_rgb_shift.value = props.rgbShift;
      uniforms.u_scanline_density.value = props.scanlineDensity;
      uniforms.u_scanline_opacity.value = props.scanlineOpacity;
      threeRef.current.speed = props.speed;
    }
  }, [props]);

  if (!isWebGLSupported) {
    return (
        <div className="w-full h-full flex items-center justify-center bg-black text-white">
            <div className="text-center p-8 bg-gray-900/50 rounded-lg border border-red-500/50">
                <h2 className="text-2xl font-bold text-red-400">WebGL Not Supported</h2>
                <p className="text-white/70 mt-2">Sorry, your browser does not support WebGL, which is required for this animation.</p>
            </div>
        </div>
    );
  }

  return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full" />;
});

export default ShaderCanvas;


code.demo.1756392924183.tsx
import React, { useState, useCallback } from 'react';
import ShaderCanvas from "@/components/ui/digital-glitch";
// --- Constants ---
const DEFAULT_PROPS = {
  baseColor: "#ffffff",
  speed: 0.3,
  glitchIntensity: 0.5,
  rgbShift: 0.01,
  scanlineDensity: 800.0,
  scanlineOpacity: 0.2,
};

const PRESETS = [
    { name: "Subtle Interference", settings: { baseColor: "#a7f3d0", speed: 0.2, glitchIntensity: 0.2, rgbShift: 0.002, scanlineDensity: 1000.0, scanlineOpacity: 0.1 } },
    { name: "Damaged VCR", settings: { baseColor: "#fde047", speed: 0.1, glitchIntensity: 1.0, rgbShift: 0.02, scanlineDensity: 400.0, scanlineOpacity: 0.35 } },
    { name: "Cyberpunk", settings: { baseColor: "#ec4899", speed: 0.5, glitchIntensity: 0.6, rgbShift: 0.015, scanlineDensity: 600.0, scanlineOpacity: 0.15 } },
];


export default function DemoOne() {
  const [props, setProps] = useState(DEFAULT_PROPS);

  const applyPreset = useCallback((preset) => {
    setProps(preset.settings);
  }, []);

  const handleValueChange = useCallback((propName, value) => {
    setProps(prev => ({ ...prev, [propName]: value }));
  }, []);
  
  return (
    <div className="relative w-screen h-screen bg-black font-sans overflow-hidden">
      <ShaderCanvas {...props} />

      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-xl p-6 rounded-2xl text-white shadow-2xl w-96 border border-white/10">
        <h1 className="text-2xl font-bold mb-2 tracking-wide text-white/90">Digital Glitch Controls</h1>
        <p className="text-xs text-white/50 mb-4">A retro CRT-style shader</p>

        <div className="mb-4">
            <label htmlFor="baseColor" className="block mb-2 text-sm font-medium text-white/70">Base Color</label>
            <input id="baseColor" type="color" value={props.baseColor} onChange={(e) => handleValueChange('baseColor', e.target.value)} className="w-full h-10 p-1 bg-gray-800 border border-white/20 rounded-md cursor-pointer"/>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="speed" className="block mb-1 text-sm font-medium text-white/70">Speed: {props.speed.toFixed(2)}</label>
            <input id="speed" type="range" min="0.0" max="1.0" step="0.01" value={props.speed} onChange={(e) => handleValueChange('speed', parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"/>
          </div>
          <div>
            <label htmlFor="glitchIntensity" className="block mb-1 text-sm font-medium text-white/70">Glitch Intensity: {props.glitchIntensity.toFixed(2)}</label>
            <input id="glitchIntensity" type="range" min="0.0" max="1.0" step="0.01" value={props.glitchIntensity} onChange={(e) => handleValueChange('glitchIntensity', parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"/>
          </div>
          <div>
            <label htmlFor="rgbShift" className="block mb-1 text-sm font-medium text-white/70">RGB Shift: {props.rgbShift.toFixed(3)}</label>
            <input id="rgbShift" type="range" min="0.0" max="0.05" step="0.001" value={props.rgbShift} onChange={(e) => handleValueChange('rgbShift', parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"/>
          </div>
          <div>
            <label htmlFor="scanlineDensity" className="block mb-1 text-sm font-medium text-white/70">Scanline Density: {props.scanlineDensity.toFixed(0)}</label>
            <input id="scanlineDensity" type="range" min="100" max="2000" step="10" value={props.scanlineDensity} onChange={(e) => handleValueChange('scanlineDensity', parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"/>
          </div>
           <div>
            <label htmlFor="scanlineOpacity" className="block mb-1 text-sm font-medium text-white/70">Scanline Opacity: {props.scanlineOpacity.toFixed(2)}</label>
            <input id="scanlineOpacity" type="range" min="0.0" max="1.0" step="0.01" value={props.scanlineOpacity} onChange={(e) => handleValueChange('scanlineOpacity', parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"/>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-white/10">
            <label className="block mb-2 text-sm font-medium text-white/70">Presets</label>
            <div className="grid grid-cols-2 gap-2">
                {PRESETS.map(p => <button key={p.name} onClick={() => applyPreset(p)} className="px-3 py-2 text-sm bg-white/10 rounded-md hover:bg-white/20 transition-colors duration-200">{p.name}</button>)}
                <button onClick={() => setProps(DEFAULT_PROPS)} className="px-3 py-2 text-sm bg-indigo-500/20 text-indigo-300 rounded-md hover:bg-indigo-500/40 transition-colors duration-200 col-span-2">Reset to Default</button>
            </div>
        </div>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/digital-glitch.tsx
import React, { useRef, useEffect, useState, memo } from 'react';
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
  uniform float u_glitch_intensity;
  uniform float u_rgb_shift;
  uniform float u_scanline_density;
  uniform float u_scanline_opacity;
  uniform vec3 u_base_color;

  // 2D Random function
  float random(vec2 p) {
    return fract(sin(dot(p.xy, vec2(12.9898, 78.233))) * 43758.5453);
  }
  
  // Noise function for glitch effect
  float noise(float p) {
    return random(vec2(p, p * 2.0));
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    // --- Glitch Effect ---
    float glitch_time = floor(u_time * 10.0);
    float glitch_amount = noise(glitch_time) * u_glitch_intensity * 0.1;
    
    if (fract(uv.y * 10.0 + noise(glitch_time) * 100.0) > 0.95) {
      uv.x += glitch_amount;
    }

    // --- Chromatic Aberration (RGB Shift) ---
    vec2 uv_r = uv + vec2(u_rgb_shift, 0.0);
    vec2 uv_g = uv;
    vec2 uv_b = uv - vec2(u_rgb_shift, 0.0);
    
    float pattern_r = step(0.5, fract(uv_r.x * 5.0 + u_time));
    float pattern_g = step(0.5, fract(uv_g.x * 5.0 + u_time));
    float pattern_b = step(0.5, fract(uv_b.x * 5.0 + u_time));
    
    vec3 color = vec3(pattern_r, pattern_g, pattern_b);
    color *= u_base_color;

    // --- Scanline Effect ---
    float scanline = sin(uv.y * u_scanline_density) * 0.5 + 0.5;
    color *= mix(1.0, scanline, u_scanline_opacity);

    // --- Film Grain ---
    color += (random(uv + u_time) - 0.5) * 0.05;

    gl_FragColor = vec4(color, 1.0);
  }
`;

// --- Helper Function ---
const hexToThreeColor = (hex) => new THREE.Color(hex);

// --- Shader Canvas Component ---
const ShaderCanvas = memo((props) => {
  const mountRef = useRef(null);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  const threeRef = useRef({});

  useEffect(() => {
    if (!mountRef.current) return;

    const canvas = document.createElement('canvas');
    if (!canvas.getContext('webgl') && !canvas.getContext('experimental-webgl')) {
        setIsWebGLSupported(false);
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_base_color: { value: hexToThreeColor(props.baseColor) },
      u_glitch_intensity: { value: props.glitchIntensity },
      u_rgb_shift: { value: props.rgbShift },
      u_scanline_density: { value: props.scanlineDensity },
      u_scanline_opacity: { value: props.scanlineOpacity },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    threeRef.current = { renderer, scene, camera, uniforms, clock: new THREE.Clock() };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const animate = () => {
      uniforms.u_time.value = threeRef.current.clock.getElapsedTime() * threeRef.current.speed;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const { uniforms } = threeRef.current;
    if (uniforms) {
      uniforms.u_base_color.value = hexToThreeColor(props.baseColor);
      uniforms.u_glitch_intensity.value = props.glitchIntensity;
      uniforms.u_rgb_shift.value = props.rgbShift;
      uniforms.u_scanline_density.value = props.scanlineDensity;
      uniforms.u_scanline_opacity.value = props.scanlineOpacity;
      threeRef.current.speed = props.speed;
    }
  }, [props]);

  if (!isWebGLSupported) {
    return (
        <div className="w-full h-full flex items-center justify-center bg-black text-white">
            <div className="text-center p-8 bg-gray-900/50 rounded-lg border border-red-500/50">
                <h2 className="text-2xl font-bold text-red-400">WebGL Not Supported</h2>
                <p className="text-white/70 mt-2">Sorry, your browser does not support WebGL, which is required for this animation.</p>
            </div>
        </div>
    );
  }

  return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full" />;
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
