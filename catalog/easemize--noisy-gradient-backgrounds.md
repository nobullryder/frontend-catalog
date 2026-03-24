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
noisy-gradient-backgrounds.tsx
import { useRef, useEffect } from 'react';

// Noise component integrated into the background
function Noise({
  patternSize = 100,
  patternScaleX = 1, // How much to scale the noise pattern tiling horizontally
  patternScaleY = 1, // How much to scale the noise pattern tiling vertically
  patternRefreshInterval = 1,
  patternAlpha = 50,
  intensity = 1,
}) {
  const grainRef = useRef(null);
  // Ref to store the CSS dimensions of the canvas to avoid repeated getBoundingClientRect in loop
  const canvasCssSizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("Failed to get 2D context for noise canvas.");
      return;
    }

    let frame = 0;
    const patternCanvas = document.createElement('canvas');
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;

    const patternCtx = patternCanvas.getContext('2d');
    if (!patternCtx) {
        console.error("Failed to get 2D context for pattern sub-canvas.");
        return;
    }
    const patternData = patternCtx.createImageData(patternSize, patternSize);
    const patternPixelDataLength = patternSize * patternSize * 4; // 4 for R, G, B, A

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      let newCssWidth = window.innerWidth; // Fallback
      let newCssHeight = window.innerHeight; // Fallback

      if (canvas.parentElement) {
        const parentRect = canvas.parentElement.getBoundingClientRect();
        newCssWidth = parentRect.width;
        newCssHeight = parentRect.height;
      }
      
      canvasCssSizeRef.current = { width: newCssWidth, height: newCssHeight };

      canvas.width = newCssWidth * dpr;
      canvas.height = newCssHeight * dpr;
      
      // Set the transformation matrix to account for DPR.
      // This allows drawing commands to use CSS pixel units.
      // Subsequent ctx.scale for pattern will be relative to this.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const updatePattern = () => {
      for (let i = 0; i < patternPixelDataLength; i += 4) {
        const value = Math.random() * 255 * intensity;
        patternData.data[i] = value;
        patternData.data[i + 1] = value;
        patternData.data[i + 2] = value;
        patternData.data[i + 3] = patternAlpha;
      }
      patternCtx.putImageData(patternData, 0, 0);
    };

    const drawGrain = () => {
      const { width: cssWidth, height: cssHeight } = canvasCssSizeRef.current;
      if (cssWidth === 0 || cssHeight === 0) return; // Don't draw if canvas has no dimensions

      // Clear using CSS pixel dimensions (context is already scaled by DPR)
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      ctx.save();
      
      // Scale the context for tiling the pattern.
      // This affects how the pattern is repeated.
      // Using Math.max to prevent division by zero if scale is 0.
      const safePatternScaleX = Math.max(0.001, patternScaleX);
      const safePatternScaleY = Math.max(0.001, patternScaleY);
      ctx.scale(safePatternScaleX, safePatternScaleY);

      const fillPattern = ctx.createPattern(patternCanvas, 'repeat');
      if (fillPattern) {
        ctx.fillStyle = fillPattern;
        // Fill a rectangle that, in the *scaled* coordinate system,
        // corresponds to the original cssWidth/cssHeight.
        ctx.fillRect(0, 0, cssWidth / safePatternScaleX, cssHeight / safePatternScaleY);
      }
      
      ctx.restore();
    };

    let animationFrameId;
    const loop = () => {
      // Only update and draw if dimensions are valid
      if (canvasCssSizeRef.current.width > 0 && canvasCssSizeRef.current.height > 0) {
        if (frame % patternRefreshInterval === 0) {
          updatePattern();
          drawGrain();
        }
      }
      frame++;
      animationFrameId = window.requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    resize(); // Initial setup: size canvas and draw first frame if needed
    if (patternRefreshInterval > 0) { // Start loop only if refresh is meaningful
        loop();
    } else { // if refresh interval is 0 or less, draw once
        updatePattern();
        drawGrain();
    }


    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha, intensity]);

  return <canvas className="absolute inset-0 w-full h-full pointer-events-none" ref={grainRef} />;
}

// Main gradient background component
function GradientBackground({
  // Gradient customization
  gradientType = 'radial-gradient',
  gradientSize = '125% 125%',
  gradientOrigin = 'bottom-middle',
  colors = [
    { color: 'rgba(245,87,2,1)', stop: '10.5%' },
    { color: 'rgba(245,120,2,1)', stop: '16%' },
    { color: 'rgba(245,140,2,1)', stop: '17.5%' },
    { color: 'rgba(245,170,100,1)', stop: '25%' },
    { color: 'rgba(238,174,202,1)', stop: '40%' },
    { color: 'rgba(202,179,214,1)', stop: '65%' },
    { color: 'rgba(148,201,233,1)', stop: '100%' }
  ],
  
  // Noise customization
  enableNoise = true,
  noisePatternSize = 100,
  noisePatternScaleX = 1,
  noisePatternScaleY = 1,
  noisePatternRefreshInterval = 1,
  noisePatternAlpha = 50,
  noiseIntensity = 1,
  
  // Additional styling
  className = '',
  style = {},
  children,
  
  // Custom gradient string (overrides other gradient props if provided)
  customGradient = null
}) {
  // Generate gradient string from colors array
  const generateGradient = () => {
    if (customGradient) return customGradient;
    
    const getGradientPosition = (origin) => {
      const positions = {
        'bottom-middle': '50% 101%',
        'bottom-left': '0% 101%',
        'bottom-right': '100% 101%',
        'top-middle': '50% -1%',
        'top-left': '0% -1%',
        'top-right': '100% -1%',
        'left-middle': '-1% 50%',
        'right-middle': '101% 50%',
        'center': '50% 50%'
      };
      return positions[origin] || positions['bottom-middle'];
    };
    
    const position = getGradientPosition(gradientOrigin);
    const colorStops = colors.map(({ color, stop }) => `${color} ${stop}`).join(',');
    
    if (gradientType === 'radial-gradient') {
      return `radial-gradient(${gradientSize} at ${position},${colorStops})`;
    } else if (gradientType === 'linear-gradient') {
      const angleMap = {
        'bottom-middle': '0deg',    // to top
        'bottom-left': '45deg',   // to top-right
        'bottom-right': '315deg', // to top-left
        'top-middle': '180deg',   // to bottom
        'top-left': '135deg',    // to bottom-right
        'top-right': '225deg',   // to bottom-left
        'left-middle': '90deg',   // to right
        'right-middle': '270deg', // to left
        'center': '0deg' // Default for center, though linear usually implies direction
      };
      const angle = angleMap[gradientOrigin] || angleMap['bottom-middle'];
      return `linear-gradient(${angle},${colorStops})`;
    } else if (gradientType === 'conic-gradient') {
      // Conic gradients usually need a 'from <angle>' and 'at <position>'
      // For simplicity, we'll use the position and a default 'from' angle.
      return `conic-gradient(from 0deg at ${position},${colorStops})`;
    }
    
    // Fallback for unknown gradient types or simple color stop list
    return `${gradientType}(${colorStops})`;
  };

  const gradientStyle = {
    background: generateGradient(),
    ...style
  };

  return (
    <div 
      className={`absolute inset-0 w-full h-full ${className}`}
      style={gradientStyle}
    >
      {enableNoise && (
        <Noise
          patternSize={noisePatternSize}
          patternScaleX={noisePatternScaleX}
          patternScaleY={noisePatternScaleY}
          patternRefreshInterval={noisePatternRefreshInterval}
          patternAlpha={noisePatternAlpha}
          intensity={noiseIntensity}
        />
      )}
      {children}
    </div>
  );
}

export { GradientBackground };

code.demo.1749661178616.tsx
import { GradientBackground } from "@/components/ui/noisy-gradient-backgrounds"; // Assuming this path is correct

const DemoOne = () => {
  const demoDivClasses = "h-screen w-full relative rounded-2xl border border-white/20 overflow-hidden";
  const demoDivGapClass = "mb-2"; 

  return (
    <div className="w-full p-2"> {/* Outermost wrapper with padding */}

      {/* 1. "Sunset Glow" */}
      <div className={`${demoDivClasses} ${demoDivGapClass}`}>
        <GradientBackground
          gradientOrigin="bottom-middle"
          noiseIntensity={1.0}
          noisePatternSize={90}
          noisePatternRefreshInterval={2}
        />
      </div>

      {/* 2. "Oceanic Depth" */}
      <div className={`${demoDivClasses} ${demoDivGapClass}`}>
        <GradientBackground
          gradientOrigin="top-left"
          colors={[
            { color: "rgba(0,20,30,1)", stop: "0%" },
            { color: "rgba(0,51,78,1)", stop: "20%" },
            { color: "rgba(0,119,182,1)", stop: "50%" },
            { color: "rgba(3,169,244,1)", stop: "75%" },
            { color: "rgba(173,216,230,1)", stop: "100%" }
          ]}
          noiseIntensity={0.8}
          noisePatternSize={100}
          noisePatternRefreshInterval={1}
        />
      </div>

      {/* 3. "Forest Canopy" */}
      <div className={`${demoDivClasses} ${demoDivGapClass}`}>
        <GradientBackground
          gradientOrigin="right-middle"
          colors={[
            { color: "rgba(10,38,10,1)", stop: "0%" },
            { color: "rgba(0,77,64,1)", stop: "25%" },
            { color: "rgba(46,125,50,1)", stop: "50%" },
            { color: "rgba(129,199,132,1)", stop: "75%" },
            { color: "rgba(200,230,201,1)", stop: "100%" }
          ]}
          noiseIntensity={1.2}
          noisePatternSize={80}
          noisePatternRefreshInterval={2}
        />
      </div>

      {/* 4. "Cosmic Nebula" */}
      <div className={`${demoDivClasses} ${demoDivGapClass}`}>
        <GradientBackground
          gradientOrigin="center"
          colors={[
            { color: "rgba(26,20,50,1)", stop: "0%" },
            { color: "rgba(76,17,88,1)", stop: "25%" },
            { color: "rgba(142,68,173,1)", stop: "50%" },
            { color: "rgba(233,30,99,1)", stop: "75%" },
            { color: "rgba(255,110,199,1)", stop: "100%" }
          ]}
          gradientSize="150% 150%"
          noiseIntensity={0.7}
          noisePatternSize={110}
          noisePatternRefreshInterval={1}
        />
      </div>

      {/* 5. "Desert Dawn" */}
      <div className={`${demoDivClasses} ${demoDivGapClass}`}>
        <GradientBackground
          gradientOrigin="bottom-right"
          colors={[
            { color: "rgba(120,40,40,1)", stop: "0%" },
            { color: "rgba(188,71,73,1)", stop: "30%" },
            { color: "rgba(244,143,177,1)", stop: "60%" },
            { color: "rgba(252,207,178,1)", stop: "85%" },
            { color: "rgba(255,235,215,1)", stop: "100%" }
          ]}
          noiseIntensity={1.1}
          noisePatternSize={95}
          noisePatternRefreshInterval={2}
        />
      </div>

      {/* 6. "Fiery Embers" */}
      <div className={`${demoDivClasses} ${demoDivGapClass}`}>
        <GradientBackground
          gradientOrigin="left-middle"
          colors={[
            { color: "rgba(50,0,0,1)", stop: "0%" },
            { color: "rgba(183,28,28,1)", stop: "30%" },
            { color: "rgba(244,67,54,1)", stop: "60%" },
            { color: "rgba(255,152,0,1)", stop: "85%" },
            { color: "rgba(255,235,59,1)", stop: "100%" }
          ]}
          noiseIntensity={1.5}
          noisePatternSize={70}
          noisePatternRefreshInterval={1}
        />
      </div>

      {/* 7. "Lavender Dreams" */}
      <div className={`${demoDivClasses} ${demoDivGapClass}`}>
        <GradientBackground
          gradientOrigin="top-right"
          colors={[
            { color: "rgba(49,27,69,1)", stop: "0%" },
            { color: "rgba(94,53,177,1)", stop: "30%" },
            { color: "rgba(179,157,219,1)", stop: "60%" },
            { color: "rgba(237,231,246,1)", stop: "85%" },
            { color: "rgba(250,250,250,1)", stop: "100%" }
          ]}
          noiseIntensity={0.9}
          noisePatternSize={120}
          noisePatternRefreshInterval={2}
        />
      </div>

      {/* 8. "Arctic Haze" */}
      <div className={`${demoDivClasses} ${demoDivGapClass}`}>
        <GradientBackground
          gradientOrigin="top-middle"
          colors={[
            { color: "rgba(38,50,56,1)", stop: "0%" },
            { color: "rgba(84,110,122,1)", stop: "30%" },
            { color: "rgba(176,190,197,1)", stop: "60%" },
            { color: "rgba(236,239,241,1)", stop: "85%" },
            { color: "rgba(255,255,255,1)", stop: "100%" }
          ]}
          noiseIntensity={1.3}
          noisePatternSize={100}
          noisePatternRefreshInterval={1}
        />
      </div>

      {/* 9. "Retro Wave" - Last one, no bottom margin */}
      <div className={`${demoDivClasses}`}> {/* Note: No demoDivGapClass here */}
        <GradientBackground
          gradientOrigin="bottom-left"
          colors={[
            { color: "rgba(255,0,150,1)", stop: "0%" },
            { color: "rgba(200,0,200,1)", stop: "30%" },
            { color: "rgba(0,150,255,1)", stop: "60%" },
            { color: "rgba(0,200,200,1)", stop: "85%" },
            { color: "rgba(255,255,100,1)", stop: "100%" }
          ]}
          noiseIntensity={0.6}
          noisePatternSize={130}
          noisePatternRefreshInterval={2}
        />
      </div>
    </div>
  );
};

export { DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/noisy-gradient-backgrounds.tsx
import { useRef, useEffect } from 'react';

// Noise component integrated into the background
function Noise({
  patternSize = 100,
  patternScaleX = 1, // How much to scale the noise pattern tiling horizontally
  patternScaleY = 1, // How much to scale the noise pattern tiling vertically
  patternRefreshInterval = 1,
  patternAlpha = 50,
  intensity = 1,
}) {
  const grainRef = useRef(null);
  // Ref to store the CSS dimensions of the canvas to avoid repeated getBoundingClientRect in loop
  const canvasCssSizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("Failed to get 2D context for noise canvas.");
      return;
    }

    let frame = 0;
    const patternCanvas = document.createElement('canvas');
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;

    const patternCtx = patternCanvas.getContext('2d');
    if (!patternCtx) {
        console.error("Failed to get 2D context for pattern sub-canvas.");
        return;
    }
    const patternData = patternCtx.createImageData(patternSize, patternSize);
    const patternPixelDataLength = patternSize * patternSize * 4; // 4 for R, G, B, A

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      let newCssWidth = window.innerWidth; // Fallback
      let newCssHeight = window.innerHeight; // Fallback

      if (canvas.parentElement) {
        const parentRect = canvas.parentElement.getBoundingClientRect();
        newCssWidth = parentRect.width;
        newCssHeight = parentRect.height;
      }
      
      canvasCssSizeRef.current = { width: newCssWidth, height: newCssHeight };

      canvas.width = newCssWidth * dpr;
      canvas.height = newCssHeight * dpr;
      
      // Set the transformation matrix to account for DPR.
      // This allows drawing commands to use CSS pixel units.
      // Subsequent ctx.scale for pattern will be relative to this.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const updatePattern = () => {
      for (let i = 0; i < patternPixelDataLength; i += 4) {
        const value = Math.random() * 255 * intensity;
        patternData.data[i] = value;
        patternData.data[i + 1] = value;
        patternData.data[i + 2] = value;
        patternData.data[i + 3] = patternAlpha;
      }
      patternCtx.putImageData(patternData, 0, 0);
    };

    const drawGrain = () => {
      const { width: cssWidth, height: cssHeight } = canvasCssSizeRef.current;
      if (cssWidth === 0 || cssHeight === 0) return; // Don't draw if canvas has no dimensions

      // Clear using CSS pixel dimensions (context is already scaled by DPR)
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      ctx.save();
      
      // Scale the context for tiling the pattern.
      // This affects how the pattern is repeated.
      // Using Math.max to prevent division by zero if scale is 0.
      const safePatternScaleX = Math.max(0.001, patternScaleX);
      const safePatternScaleY = Math.max(0.001, patternScaleY);
      ctx.scale(safePatternScaleX, safePatternScaleY);

      const fillPattern = ctx.createPattern(patternCanvas, 'repeat');
      if (fillPattern) {
        ctx.fillStyle = fillPattern;
        // Fill a rectangle that, in the *scaled* coordinate system,
        // corresponds to the original cssWidth/cssHeight.
        ctx.fillRect(0, 0, cssWidth / safePatternScaleX, cssHeight / safePatternScaleY);
      }
      
      ctx.restore();
    };

    let animationFrameId;
    const loop = () => {
      // Only update and draw if dimensions are valid
      if (canvasCssSizeRef.current.width > 0 && canvasCssSizeRef.current.height > 0) {
        if (frame % patternRefreshInterval === 0) {
          updatePattern();
          drawGrain();
        }
      }
      frame++;
      animationFrameId = window.requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    resize(); // Initial setup: size canvas and draw first frame if needed
    if (patternRefreshInterval > 0) { // Start loop only if refresh is meaningful
        loop();
    } else { // if refresh interval is 0 or less, draw once
        updatePattern();
        drawGrain();
    }


    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha, intensity]);

  return <canvas className="absolute inset-0 w-full h-full pointer-events-none" ref={grainRef} />;
}

// Main gradient background component
function GradientBackground({
  // Gradient customization
  gradientType = 'radial-gradient',
  gradientSize = '125% 125%',
  gradientOrigin = 'bottom-middle',
  colors = [
    { color: 'rgba(245,87,2,1)', stop: '10.5%' },
    { color: 'rgba(245,120,2,1)', stop: '16%' },
    { color: 'rgba(245,140,2,1)', stop: '17.5%' },
    { color: 'rgba(245,170,100,1)', stop: '25%' },
    { color: 'rgba(238,174,202,1)', stop: '40%' },
    { color: 'rgba(202,179,214,1)', stop: '65%' },
    { color: 'rgba(148,201,233,1)', stop: '100%' }
  ],
  
  // Noise customization
  enableNoise = true,
  noisePatternSize = 100,
  noisePatternScaleX = 1,
  noisePatternScaleY = 1,
  noisePatternRefreshInterval = 1,
  noisePatternAlpha = 50,
  noiseIntensity = 1,
  
  // Additional styling
  className = '',
  style = {},
  children,
  
  // Custom gradient string (overrides other gradient props if provided)
  customGradient = null
}) {
  // Generate gradient string from colors array
  const generateGradient = () => {
    if (customGradient) return customGradient;
    
    const getGradientPosition = (origin) => {
      const positions = {
        'bottom-middle': '50% 101%',
        'bottom-left': '0% 101%',
        'bottom-right': '100% 101%',
        'top-middle': '50% -1%',
        'top-left': '0% -1%',
        'top-right': '100% -1%',
        'left-middle': '-1% 50%',
        'right-middle': '101% 50%',
        'center': '50% 50%'
      };
      return positions[origin] || positions['bottom-middle'];
    };
    
    const position = getGradientPosition(gradientOrigin);
    const colorStops = colors.map(({ color, stop }) => `${color} ${stop}`).join(',');
    
    if (gradientType === 'radial-gradient') {
      return `radial-gradient(${gradientSize} at ${position},${colorStops})`;
    } else if (gradientType === 'linear-gradient') {
      const angleMap = {
        'bottom-middle': '0deg',    // to top
        'bottom-left': '45deg',   // to top-right
        'bottom-right': '315deg', // to top-left
        'top-middle': '180deg',   // to bottom
        'top-left': '135deg',    // to bottom-right
        'top-right': '225deg',   // to bottom-left
        'left-middle': '90deg',   // to right
        'right-middle': '270deg', // to left
        'center': '0deg' // Default for center, though linear usually implies direction
      };
      const angle = angleMap[gradientOrigin] || angleMap['bottom-middle'];
      return `linear-gradient(${angle},${colorStops})`;
    } else if (gradientType === 'conic-gradient') {
      // Conic gradients usually need a 'from <angle>' and 'at <position>'
      // For simplicity, we'll use the position and a default 'from' angle.
      return `conic-gradient(from 0deg at ${position},${colorStops})`;
    }
    
    // Fallback for unknown gradient types or simple color stop list
    return `${gradientType}(${colorStops})`;
  };

  const gradientStyle = {
    background: generateGradient(),
    ...style
  };

  return (
    <div 
      className={`absolute inset-0 w-full h-full ${className}`}
      style={gradientStyle}
    >
      {enableNoise && (
        <Noise
          patternSize={noisePatternSize}
          patternScaleX={noisePatternScaleX}
          patternScaleY={noisePatternScaleY}
          patternRefreshInterval={noisePatternRefreshInterval}
          patternAlpha={noisePatternAlpha}
          intensity={noiseIntensity}
        />
      )}
      {children}
    </div>
  );
}

export { GradientBackground };
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
