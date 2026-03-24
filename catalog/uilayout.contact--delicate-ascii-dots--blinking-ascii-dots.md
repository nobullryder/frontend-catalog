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
delicate-ascii-dots.tsx
'use client';

import { useEffect, useRef, useCallback } from 'react';

interface DelicateAsciiDotsProps {
  backgroundColor?: string;
  textColor?: string;
  gridSize?: number;
  removeWaveLine?: boolean;
  animationSpeed?: number;
}

interface Wave {
  x: number;
  y: number;
  frequency: number;
  amplitude: number;
  phase: number;
  speed: number;
}

interface GridCell {
  char: string;
  opacity: number;
}

const DelicateAsciiDots = ({
  backgroundColor = '#F0EEE6',
  textColor = '100, 100, 100',
  gridSize = 80,
  removeWaveLine = true,
  animationSpeed = 0.75,
}: DelicateAsciiDotsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });
  const wavesRef = useRef<Wave[]>([]);
  const timeRef = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);
  const clickWaves = useRef<
    Array<{ x: number; y: number; time: number; intensity: number }>
  >([]);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const CHARS =
    '⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⠁⠂⠄⠈⠐⠠⡀⢀⠃⠅⠘⠨⠊⠋⠌⠍⠎⠏⠑⠒⠓⠔⠕⠖⠗⠙⠚⠛⠜⠝⠞⠟⠡⠢⠣⠤⠥⠦⠧⠩⠪⠫⠬⠭⠮⠯⠱⠲⠳⠴⠵⠶⠷⠹⠺⠻⠼⠽⠾⠿⡁⡂⡃⡄⡅⡆⡇⡉⡊⡋⡌⡍⡎⡏⡑⡒⡓⡔⡕⡖⡗⡙⡚⡛⡜⡝⡞⡟⡡⡢⡣⡤⡥⡦⡧⡩⡪⡫⡬⡭⡮⡯⡱⡲⡳⡴⡵⡶⡷⡹⡺⡻⡼⡽⡾⡿⢁⢂⢃⢄⢅⢆⢇⢉⢊⢋⢌⢍⢎⢏⢑⢒⢓⢔⢕⢖⢗⢙⢚⢛⢜⢝⢞⢟⢡⢢⢣⢤⢥⢦⢧⢩⢪⢫⢬⢭⢮⢯⢱⢲⢳⢴⢵⢶⢷⢹⢺⢻⢼⢽⢾⢿⣀⣁⣂⣃⣄⣅⣆⣇⣉⣊⣋⣌⣍⣎⣏⣑⣒⣓⣔⣕⣖⣗⣙⣚⣛⣜⣝⣞⣟⣡⣢⣣⣤⣥⣦⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿';

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const containerRect = container.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    // Store dimensions for coordinate calculations
    dimensionsRef.current = { width, height };

    const dpr = window.devicePixelRatio || 1;

    // Set canvas size to match container
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseRef.current = {
      x: x,
      y: y,
      isDown: mouseRef.current.isDown,
    };
  }, []);

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      mouseRef.current.isDown = true;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Convert screen coordinates to grid coordinates
      const { width, height } = dimensionsRef.current;
      const cellWidth = width / gridSize;
      const cellHeight = height / gridSize;

      const gridX = x / cellWidth;
      const gridY = y / cellHeight;

      clickWaves.current.push({
        x: gridX,
        y: gridY,
        time: Date.now(),
        intensity: 2,
      });

      // Clean up old waves
      const now = Date.now();
      clickWaves.current = clickWaves.current.filter(
        (wave) => now - wave.time < 4000
      );
    },
    [gridSize]
  );

  const handleMouseUp = useCallback(() => {
    mouseRef.current.isDown = false;
  }, []);

  const getClickWaveInfluence = (
    x: number,
    y: number,
    currentTime: number
  ): number => {
    let totalInfluence = 0;

    clickWaves.current.forEach((wave) => {
      const age = currentTime - wave.time;
      const maxAge = 4000;
      if (age < maxAge) {
        const dx = x - wave.x;
        const dy = y - wave.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const waveRadius = (age / maxAge) * gridSize * 0.8;
        const waveWidth = gridSize * 0.15;

        if (Math.abs(distance - waveRadius) < waveWidth) {
          const waveStrength = (1 - age / maxAge) * wave.intensity;
          const proximityToWave =
            1 - Math.abs(distance - waveRadius) / waveWidth;
          totalInfluence +=
            waveStrength *
            proximityToWave *
            Math.sin((distance - waveRadius) * 0.5);
        }
      }
    });

    return totalInfluence;
  };

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentTime = Date.now();
    timeRef.current += animationSpeed * 0.016;

    const { width, height } = dimensionsRef.current;
    if (width === 0 || height === 0) return;

    // Clear canvas
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    const newGrid: (GridCell | null)[][] = Array(gridSize)
      .fill(0)
      .map(() => Array(gridSize).fill(null));

    // Calculate cell dimensions
    const cellWidth = width / gridSize;
    const cellHeight = height / gridSize;

    // Convert mouse position to grid coordinates
    const mouseGridX = mouseRef.current.x / cellWidth;
    const mouseGridY = mouseRef.current.y / cellHeight;

    // Create mouse wave
    const mouseWave: Wave = {
      x: mouseGridX,
      y: mouseGridY,
      frequency: 0.3,
      amplitude: 1,
      phase: timeRef.current * 2,
      speed: 1,
    };

    // Calculate wave interference
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        let totalWave = 0;

        // Sum all wave contributions
        const allWaves = wavesRef.current.concat([mouseWave]);

        allWaves.forEach((wave) => {
          const dx = x - wave.x;
          const dy = y - wave.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const falloff = 1 / (1 + dist * 0.1);
          const value =
            Math.sin(
              dist * wave.frequency - timeRef.current * wave.speed + wave.phase
            ) *
            wave.amplitude *
            falloff;

          totalWave += value;
        });

        // Add click wave influence
        const clickInfluence = getClickWaveInfluence(x, y, currentTime);
        totalWave += clickInfluence;

        // Enhanced mouse interaction
        const mouseDistance = Math.sqrt(
          (x - mouseGridX) ** 2 + (y - mouseGridY) ** 2
        );
        if (mouseDistance < gridSize * 0.3) {
          const mouseEffect = (1 - mouseDistance / (gridSize * 0.3)) * 0.8;
          totalWave += mouseEffect * Math.sin(timeRef.current * 3);
        }

        // Map interference pattern to characters and opacity
        const normalizedWave = (totalWave + 2) / 4;
        if (Math.abs(totalWave) > 0.2) {
          const charIndex = Math.min(
            CHARS.length - 1,
            Math.max(0, Math.floor(normalizedWave * (CHARS.length - 1)))
          );
          const opacity = Math.min(
            0.9,
            Math.max(0.4, 0.4 + normalizedWave * 0.5)
          );

          newGrid[y][x] = {
            char: CHARS[charIndex] || CHARS[0],
            opacity: opacity,
          };
        }
      }
    }

    // Calculate optimal font size
    const fontSize = Math.min(cellWidth, cellHeight) * 0.8;
    ctx.font = `${fontSize}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw characters
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const cell = newGrid[y][x];
        if (cell && cell.char && CHARS.includes(cell.char)) {
          ctx.fillStyle = `rgba(${textColor}, ${cell.opacity})`;
          ctx.fillText(
            cell.char,
            x * cellWidth + cellWidth / 2,
            y * cellHeight + cellHeight / 2
          );
        }
      }
    }

    // Draw click wave effects (visual ripples)
    if (!removeWaveLine) {
      clickWaves.current.forEach((wave) => {
        const age = currentTime - wave.time;
        const maxAge = 4000;
        if (age < maxAge) {
          const progress = age / maxAge;
          const radius = progress * Math.min(width, height) * 0.5;
          const alpha = (1 - progress) * 0.3 * wave.intensity;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(${textColor}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.arc(
            wave.x * cellWidth,
            wave.y * cellHeight,
            radius,
            0,
            2 * Math.PI
          );
          ctx.stroke();
        }
      });
    }

    animationFrameId.current = requestAnimationFrame(animate);
  }, [backgroundColor, textColor, gridSize, animationSpeed, removeWaveLine]);

  useEffect(() => {
    // Initialize background waves
    const waves: Wave[] = [];
    const numWaves = 4;

    for (let i = 0; i < numWaves; i++) {
      waves.push({
        x: gridSize * (0.25 + Math.random() * 0.5),
        y: gridSize * (0.25 + Math.random() * 0.5),
        frequency: 0.2 + Math.random() * 0.3,
        amplitude: 0.5 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 0.5,
      });
    }

    wavesRef.current = waves;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initial resize
    resizeCanvas();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);

    // Start animation
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      timeRef.current = 0;
      clickWaves.current = [];
      wavesRef.current = [];
    };
  }, [
    animate,
    resizeCanvas,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    gridSize,
  ]);

  return (
    <div
      ref={containerRef}
      className='w-[40rem] h-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] overflow-hidden'
      style={{ backgroundColor }}
    >
      <canvas ref={canvasRef} className='block w-full h-full' />
    </div>
  );
};

export default DelicateAsciiDots;


code.demo.1753375422762.tsx
"use client"

import { useEffect, useRef, useCallback } from "react"

interface AsciiDotsFullscreenProps {
  backgroundColor?: string
  textColor?: string
  density?: number
  animationSpeed?: number
  removeWaveLine?:boolean
}

const BlinkingAsciiDots = ({
  backgroundColor = "#F0EEE6",
  textColor = "85, 85, 85",
  density = 1, 
  animationSpeed = 0.75,
  removeWaveLine = true,
}: AsciiDotsFullscreenProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, isDown: false })
  const timeRef = useRef<number>(0)
  const animationFrameId = useRef<number | null>(null)
  const clickWaves = useRef<Array<{ x: number; y: number; time: number; intensity: number }>>([])

  // Extended Braille patterns for more visual variety
  const CHARS = "⠁⠂⠄⠈⠐⠠⡀⢀⠃⠅⠘⠨⠊⠋⠌⠍⠎⠏⠑⠒⠓⠔⠕⠖⠗⠙⠚⠛⠜⠝⠞⠟⠡⠢⠣⠤⠥⠦⠧⠩⠪⠫⠬⠭⠮⠯⠱⠲⠳⠴⠵⠶⠷⠹⠺⠻⠼⠽⠾⠿"

  // Calculate grid dimensions based on screen size and density
  const calculateGrid = useCallback(() => {
    if (!containerRef.current) return { cols: 0, rows: 0, cellSize: 0 }

    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    // Base cell size on font metrics (approximate)
    const baseCellSize = 16 // Approximate size of a monospace character
    const cellSize = baseCellSize / density

    const cols = Math.ceil(width / cellSize)
    const rows = Math.ceil(height / cellSize)

    return { cols, rows, cellSize }
  }, [density])

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !containerRef.current) return

    canvas.width = containerRef.current.clientWidth
    canvas.height = containerRef.current.clientHeight
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    mouseRef.current.x = e.clientX - rect.left
    mouseRef.current.y = e.clientY - rect.top
  }, [])

  const handleMouseDown = useCallback((e: MouseEvent) => {
    mouseRef.current.isDown = true

    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    clickWaves.current.push({
      x,
      y,
      time: Date.now(),
      intensity: 2.5,
    })

    // Clean up old waves
    const now = Date.now()
    clickWaves.current = clickWaves.current.filter((wave) => now - wave.time < 5000)
  }, [])

  const handleMouseUp = useCallback(() => {
    mouseRef.current.isDown = false
  }, [])

  const getWaveValue = useCallback((x: number, y: number, time: number) => {
    // Base wave pattern
    const wave1 = Math.sin(x * 0.05 + time * 0.5) * Math.cos(y * 0.05 - time * 0.3)
    const wave2 = Math.sin((x + y) * 0.04 + time * 0.7) * 0.5
    const wave3 = Math.cos(x * 0.06 - y * 0.06 + time * 0.4) * 0.3

    return (wave1 + wave2 + wave3) / 2 // Normalize to approximately -1 to 1
  }, [])

  const getClickWaveInfluence = useCallback((x: number, y: number, currentTime: number) => {
    let totalInfluence = 0

    clickWaves.current.forEach((wave) => {
      const age = currentTime - wave.time
      const maxAge = 5000

      if (age < maxAge) {
        const dx = x - wave.x
        const dy = y - wave.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const waveRadius = (age / maxAge) * 500
        const waveWidth = 100

        if (Math.abs(distance - waveRadius) < waveWidth) {
          const waveStrength = (1 - age / maxAge) * wave.intensity
          const proximityToWave = 1 - Math.abs(distance - waveRadius) / waveWidth
          totalInfluence += waveStrength * proximityToWave * Math.sin((distance - waveRadius) * 0.05)
        }
      }
    })

    return totalInfluence
  }, [])

  const getMouseInfluence = useCallback((x: number, y: number) => {
    const dx = x - mouseRef.current.x
    const dy = y - mouseRef.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxDistance = 200
    return Math.max(0, 1 - distance / maxDistance)
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !containerRef.current) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const currentTime = Date.now()
    timeRef.current += animationSpeed * 0.016

    // Calculate grid dimensions
    const { cols, rows, cellSize } = calculateGrid()

    // Clear with solid background to prevent fading
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Set up text rendering
    ctx.font = `${cellSize}px monospace`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Draw ASCII pattern
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const posX = x * cellSize + cellSize / 2
        const posY = y * cellSize + cellSize / 2

        // Calculate wave value at this position
        let waveValue = getWaveValue(posX, posY, timeRef.current)

        // Add mouse influence
        const mouseInfluence = getMouseInfluence(posX, posY)
        if (mouseInfluence > 0) {
          waveValue += mouseInfluence * Math.sin(timeRef.current * 3) * 0.5
        }

        // Add click wave influence
        const clickInfluence = getClickWaveInfluence(posX, posY, currentTime)
        waveValue += clickInfluence

        // Map wave value to character and opacity
        const normalizedValue = (waveValue + 1) / 2 // Map from -1,1 to 0,1

        if (Math.abs(waveValue) > 0.15) {
          // Threshold to create some empty space
          const charIndex = Math.floor(normalizedValue * CHARS.length)
          const char = CHARS[Math.min(CHARS.length - 1, Math.max(0, charIndex))]

          // Calculate opacity based on wave value
          const opacity = Math.min(0.9, Math.max(0.3, 0.4 + normalizedValue * 0.5))

          ctx.fillStyle = `rgba(${textColor}, ${opacity})`
          ctx.fillText(char, posX, posY)
        }
      }
    }

    // Draw click wave effects
    if(!removeWaveLine){
    clickWaves.current.forEach((wave) => {
      const age = currentTime - wave.time
      const maxAge = 5000

      if (age < maxAge) {
        const progress = age / maxAge
        const radius = progress * 500
        const alpha = (1 - progress) * 0.2 * wave.intensity

        ctx.beginPath()
        ctx.strokeStyle = `rgba(${textColor}, ${alpha})`
        ctx.lineWidth = 1
        ctx.arc(wave.x, wave.y, radius, 0, 2 * Math.PI)
        ctx.stroke()
      }
    })
    }
    animationFrameId.current = requestAnimationFrame(animate)
  }, [
    backgroundColor,
    textColor,
    animationSpeed,
    calculateGrid,
    getWaveValue,
    getClickWaveInfluence,
    getMouseInfluence,
    removeWaveLine
  ])

  useEffect(() => {
    if (!containerRef.current) return

    handleResize()

    window.addEventListener("resize", handleResize)
    containerRef.current.addEventListener("mousemove", handleMouseMove)
    containerRef.current.addEventListener("mousedown", handleMouseDown)
    containerRef.current.addEventListener("mouseup", handleMouseUp)

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)

      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove)
        containerRef.current.removeEventListener("mousedown", handleMouseDown)
        containerRef.current.removeEventListener("mouseup", handleMouseUp)
      }

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
        animationFrameId.current = null
      }
    }
  }, [animate, handleResize, handleMouseMove, handleMouseDown, handleMouseUp])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{ backgroundColor }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Optional instructions overlay */}
      <div className="absolute top-4 left-0 right-0 text-center text-sm text-gray-600 pointer-events-none">
        <div className="inline-block bg-white/70 backdrop-blur-sm px-3 py-1 rounded-md">
          Move mouse to influence • Click to create waves
        </div>
      </div>
    </div>
  )
}

export default BlinkingAsciiDots

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/delicate-ascii-dots.tsx
'use client';

import { useEffect, useRef, useCallback } from 'react';

interface DelicateAsciiDotsProps {
  backgroundColor?: string;
  textColor?: string;
  gridSize?: number;
  removeWaveLine?: boolean;
  animationSpeed?: number;
}

interface Wave {
  x: number;
  y: number;
  frequency: number;
  amplitude: number;
  phase: number;
  speed: number;
}

interface GridCell {
  char: string;
  opacity: number;
}

const DelicateAsciiDots = ({
  backgroundColor = '#F0EEE6',
  textColor = '100, 100, 100',
  gridSize = 80,
  removeWaveLine = true,
  animationSpeed = 0.75,
}: DelicateAsciiDotsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });
  const wavesRef = useRef<Wave[]>([]);
  const timeRef = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);
  const clickWaves = useRef<
    Array<{ x: number; y: number; time: number; intensity: number }>
  >([]);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const CHARS =
    '⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⠁⠂⠄⠈⠐⠠⡀⢀⠃⠅⠘⠨⠊⠋⠌⠍⠎⠏⠑⠒⠓⠔⠕⠖⠗⠙⠚⠛⠜⠝⠞⠟⠡⠢⠣⠤⠥⠦⠧⠩⠪⠫⠬⠭⠮⠯⠱⠲⠳⠴⠵⠶⠷⠹⠺⠻⠼⠽⠾⠿⡁⡂⡃⡄⡅⡆⡇⡉⡊⡋⡌⡍⡎⡏⡑⡒⡓⡔⡕⡖⡗⡙⡚⡛⡜⡝⡞⡟⡡⡢⡣⡤⡥⡦⡧⡩⡪⡫⡬⡭⡮⡯⡱⡲⡳⡴⡵⡶⡷⡹⡺⡻⡼⡽⡾⡿⢁⢂⢃⢄⢅⢆⢇⢉⢊⢋⢌⢍⢎⢏⢑⢒⢓⢔⢕⢖⢗⢙⢚⢛⢜⢝⢞⢟⢡⢢⢣⢤⢥⢦⢧⢩⢪⢫⢬⢭⢮⢯⢱⢲⢳⢴⢵⢶⢷⢹⢺⢻⢼⢽⢾⢿⣀⣁⣂⣃⣄⣅⣆⣇⣉⣊⣋⣌⣍⣎⣏⣑⣒⣓⣔⣕⣖⣗⣙⣚⣛⣜⣝⣞⣟⣡⣢⣣⣤⣥⣦⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿';

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const containerRect = container.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    // Store dimensions for coordinate calculations
    dimensionsRef.current = { width, height };

    const dpr = window.devicePixelRatio || 1;

    // Set canvas size to match container
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseRef.current = {
      x: x,
      y: y,
      isDown: mouseRef.current.isDown,
    };
  }, []);

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      mouseRef.current.isDown = true;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Convert screen coordinates to grid coordinates
      const { width, height } = dimensionsRef.current;
      const cellWidth = width / gridSize;
      const cellHeight = height / gridSize;

      const gridX = x / cellWidth;
      const gridY = y / cellHeight;

      clickWaves.current.push({
        x: gridX,
        y: gridY,
        time: Date.now(),
        intensity: 2,
      });

      // Clean up old waves
      const now = Date.now();
      clickWaves.current = clickWaves.current.filter(
        (wave) => now - wave.time < 4000
      );
    },
    [gridSize]
  );

  const handleMouseUp = useCallback(() => {
    mouseRef.current.isDown = false;
  }, []);

  const getClickWaveInfluence = (
    x: number,
    y: number,
    currentTime: number
  ): number => {
    let totalInfluence = 0;

    clickWaves.current.forEach((wave) => {
      const age = currentTime - wave.time;
      const maxAge = 4000;
      if (age < maxAge) {
        const dx = x - wave.x;
        const dy = y - wave.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const waveRadius = (age / maxAge) * gridSize * 0.8;
        const waveWidth = gridSize * 0.15;

        if (Math.abs(distance - waveRadius) < waveWidth) {
          const waveStrength = (1 - age / maxAge) * wave.intensity;
          const proximityToWave =
            1 - Math.abs(distance - waveRadius) / waveWidth;
          totalInfluence +=
            waveStrength *
            proximityToWave *
            Math.sin((distance - waveRadius) * 0.5);
        }
      }
    });

    return totalInfluence;
  };

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentTime = Date.now();
    timeRef.current += animationSpeed * 0.016;

    const { width, height } = dimensionsRef.current;
    if (width === 0 || height === 0) return;

    // Clear canvas
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    const newGrid: (GridCell | null)[][] = Array(gridSize)
      .fill(0)
      .map(() => Array(gridSize).fill(null));

    // Calculate cell dimensions
    const cellWidth = width / gridSize;
    const cellHeight = height / gridSize;

    // Convert mouse position to grid coordinates
    const mouseGridX = mouseRef.current.x / cellWidth;
    const mouseGridY = mouseRef.current.y / cellHeight;

    // Create mouse wave
    const mouseWave: Wave = {
      x: mouseGridX,
      y: mouseGridY,
      frequency: 0.3,
      amplitude: 1,
      phase: timeRef.current * 2,
      speed: 1,
    };

    // Calculate wave interference
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        let totalWave = 0;

        // Sum all wave contributions
        const allWaves = wavesRef.current.concat([mouseWave]);

        allWaves.forEach((wave) => {
          const dx = x - wave.x;
          const dy = y - wave.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const falloff = 1 / (1 + dist * 0.1);
          const value =
            Math.sin(
              dist * wave.frequency - timeRef.current * wave.speed + wave.phase
            ) *
            wave.amplitude *
            falloff;

          totalWave += value;
        });

        // Add click wave influence
        const clickInfluence = getClickWaveInfluence(x, y, currentTime);
        totalWave += clickInfluence;

        // Enhanced mouse interaction
        const mouseDistance = Math.sqrt(
          (x - mouseGridX) ** 2 + (y - mouseGridY) ** 2
        );
        if (mouseDistance < gridSize * 0.3) {
          const mouseEffect = (1 - mouseDistance / (gridSize * 0.3)) * 0.8;
          totalWave += mouseEffect * Math.sin(timeRef.current * 3);
        }

        // Map interference pattern to characters and opacity
        const normalizedWave = (totalWave + 2) / 4;
        if (Math.abs(totalWave) > 0.2) {
          const charIndex = Math.min(
            CHARS.length - 1,
            Math.max(0, Math.floor(normalizedWave * (CHARS.length - 1)))
          );
          const opacity = Math.min(
            0.9,
            Math.max(0.4, 0.4 + normalizedWave * 0.5)
          );

          newGrid[y][x] = {
            char: CHARS[charIndex] || CHARS[0],
            opacity: opacity,
          };
        }
      }
    }

    // Calculate optimal font size
    const fontSize = Math.min(cellWidth, cellHeight) * 0.8;
    ctx.font = `${fontSize}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw characters
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const cell = newGrid[y][x];
        if (cell && cell.char && CHARS.includes(cell.char)) {
          ctx.fillStyle = `rgba(${textColor}, ${cell.opacity})`;
          ctx.fillText(
            cell.char,
            x * cellWidth + cellWidth / 2,
            y * cellHeight + cellHeight / 2
          );
        }
      }
    }

    // Draw click wave effects (visual ripples)
    if (!removeWaveLine) {
      clickWaves.current.forEach((wave) => {
        const age = currentTime - wave.time;
        const maxAge = 4000;
        if (age < maxAge) {
          const progress = age / maxAge;
          const radius = progress * Math.min(width, height) * 0.5;
          const alpha = (1 - progress) * 0.3 * wave.intensity;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(${textColor}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.arc(
            wave.x * cellWidth,
            wave.y * cellHeight,
            radius,
            0,
            2 * Math.PI
          );
          ctx.stroke();
        }
      });
    }

    animationFrameId.current = requestAnimationFrame(animate);
  }, [backgroundColor, textColor, gridSize, animationSpeed, removeWaveLine]);

  useEffect(() => {
    // Initialize background waves
    const waves: Wave[] = [];
    const numWaves = 4;

    for (let i = 0; i < numWaves; i++) {
      waves.push({
        x: gridSize * (0.25 + Math.random() * 0.5),
        y: gridSize * (0.25 + Math.random() * 0.5),
        frequency: 0.2 + Math.random() * 0.3,
        amplitude: 0.5 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 0.5,
      });
    }

    wavesRef.current = waves;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initial resize
    resizeCanvas();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);

    // Start animation
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      timeRef.current = 0;
      clickWaves.current = [];
      wavesRef.current = [];
    };
  }, [
    animate,
    resizeCanvas,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    gridSize,
  ]);

  return (
    <div
      ref={containerRef}
      className='w-[40rem] h-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] overflow-hidden'
      style={{ backgroundColor }}
    >
      <canvas ref={canvasRef} className='block w-full h-full' />
    </div>
  );
};

export default DelicateAsciiDots;

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
