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
color-picker.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { memo } from 'react'

function hslToHex(h: number, s: number, l: number) {
    l /= 100
    s /= 100
    const k = (n: number) => (n + h / 30) % 12
    const a = s * Math.min(l, 1 - l)
    const f = (n: number) => l - a * Math.max(-1, Math.min(Math.min(k(n) - 3, 9 - k(n)), 1))
    return (
        '#' +
        [f(0), f(8), f(4)]
            .map(x =>
                Math.round(x * 255)
                    .toString(16)
                    .padStart(2, '0')
            )
            .join('')
    )
}

interface ColorPickerProps {
    size?: number
    padding?: number
    bulletRadius?: number
    spreadFactor?: number
    minSpread?: number
    maxSpread?: number
    minLight?: number
    maxLight?: number
    showColorWheel?: boolean
    numPoints?: number
    onColorChange?: (colors: string[]) => void
}

const ColorPicker = ({ size = 280, padding = 20, bulletRadius = 24, spreadFactor = 0.4, minSpread = Math.PI / 1.5, maxSpread = Math.PI / 3, minLight = 15, maxLight = 90, showColorWheel = false, numPoints = 1, onColorChange }: ColorPickerProps) => {
    const RADIUS = size / 2 - padding

    const [angle, setAngle] = useState(-Math.PI / 2)
    const [radius, setRadius] = useState(RADIUS * 0.7)
    const [drag, setDrag] = useState(false)

    const ref = useRef<HTMLCanvasElement>(null)

    const hue = (angle * 180) / Math.PI
    const light = maxLight * (radius / RADIUS)
    const color = hslToHex(hue, 100, light)

    const normalizedRadius = radius / RADIUS
    const spread = (minSpread + (maxSpread - minSpread) * Math.pow(normalizedRadius, 3)) * spreadFactor

    const bx1 = size / 2 + Math.cos(angle - spread) * radius
    const by1 = size / 2 + Math.sin(angle - spread) * radius
    const bx2 = size / 2 + Math.cos(angle + spread) * radius
    const by2 = size / 2 + Math.sin(angle + spread) * radius

    const angle1 = angle - spread
    const angle2 = angle + spread
    const hue1 = (angle1 * 180) / Math.PI
    const hue2 = (angle2 * 180) / Math.PI
    const light1 = maxLight * (radius / RADIUS)
    const light2 = maxLight * (radius / RADIUS)
    const color1 = hslToHex(hue1, 100, light1)
    const color2 = hslToHex(hue2, 100, light2)

    useEffect(() => {
        const ctx = ref.current!.getContext('2d')!
        ctx.clearRect(0, 0, size, size)

        ctx.beginPath()
        ctx.arc(size / 2, size / 2, RADIUS, 0, Math.PI * 2)
        ctx.clip()

        for (let r = 0; r <= RADIUS; r++) {
            for (let a = 0; a < 360; a += 1) {
                const rad = (a * Math.PI) / 180
                const x = size / 2 + Math.cos(rad) * r
                const y = size / 2 + Math.sin(rad) * r
                const lightness = minLight + (maxLight - minLight) * (r / RADIUS)
                ctx.beginPath()
                ctx.strokeStyle = hslToHex(a, 100, lightness)
                ctx.moveTo(x, y)
                ctx.lineTo(x + 1, y + 1)
                ctx.stroke()
            }
        }
    }, [size, RADIUS, minLight, maxLight])

    useEffect(() => {
        const colors = numPoints === 1 ? [color] : numPoints === 2 ? [color2, color] : [color2, color, color1]
        onColorChange?.(colors)
    }, [color, color1, color2, numPoints, onColorChange])

    function setFromPointer(e: React.PointerEvent) {
        const rect = ref.current!.getBoundingClientRect()
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2
        let r = Math.sqrt(x * x + y * y)
        let a = Math.atan2(y, x)
        if (a < 0) a += 2 * Math.PI
        r = Math.max(0, Math.min(RADIUS, r))
        setAngle(a)
        setRadius(r)
    }

    function onPointerDown(e: React.PointerEvent) {
        setDrag(true)
        setFromPointer(e)
        ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    }
    function onPointerMove(e: React.PointerEvent) {
        if (!drag) return
        setFromPointer(e)
    }
    function onPointerUp() {
        setDrag(false)
    }

    const bx = size / 2 + Math.cos(angle) * radius
    const by = size / 2 + Math.sin(angle) * radius

    return (
        <div>
            <div
                style={{
                    width: size,
                    height: size,
                }}
                className="select-none relative"
            >
                <canvas ref={ref} width={size} height={size} className={`rounded-full ${!showColorWheel && 'opacity-0'}`} />

                {numPoints >= 2 && (
                    <div
                        className="absolute rounded-full border-2 border-white/80 shadow pointer-events-none opacity-90 z-20"
                        style={{
                            left: bx2 - bulletRadius / 1.7,
                            top: by2 - bulletRadius / 1.7,
                            width: bulletRadius * 1.2,
                            height: bulletRadius * 1.2,
                            background: color2,
                        }}
                    />
                )}

                <div
                    className="absolute rounded-full border-3 border-white/90 shadow cursor-grab touch-none z-30"
                    style={{
                        left: bx - bulletRadius,
                        top: by - bulletRadius,
                        width: bulletRadius * 2,
                        height: bulletRadius * 2,
                        background: color,
                    }}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerLeave={onPointerUp}
                />

                {numPoints >= 3 && (
                    <div
                        className="absolute rounded-full border-2 border-white/80 shadow pointer-events-none opacity-90 z-20"
                        style={{
                            left: bx1 - bulletRadius / 1.7,
                            top: by1 - bulletRadius / 1.7,
                            width: bulletRadius * 1.2,
                            height: bulletRadius * 1.2,
                            background: color1,
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default ColorPicker


code.demo.1747066368432.tsx
'use client'

import ColorPicker from '@/components/ui/color-picker'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface DotPatternProps {
    width?: number
    height?: number
    className?: string
}

const DotPattern = ({ width = 16, height = 16, className }: DotPatternProps) => {
    return (
        <svg className={cn('absolute inset-0 h-full w-full [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]', className)} aria-hidden="true">
            <defs>
                <pattern id="dotPattern" width={width} height={height} patternUnits="userSpaceOnUse">
                    <circle cx={width * 0.5} cy={height * 0.5} r="1" className="fill-gray-500/20" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
    )
}

export default function ColorPickerTestPage() {
    const [colors, setColors] = useState<string[]>([])
    const [numPoints, setNumPoints] = useState(3)

   return (
        <div className="p-20 flex flex-col">
            <div className="flex flex-col bg-slate-100 rounded-xl p-3 self-start relative">
                <DotPattern width={10} height={10} className={cn('[mask-image:radial-gradient(200px_circle_at_center,white,transparent)] z-10')} />
                <ColorPicker onColorChange={setColors} numPoints={numPoints} />

                <div className="flex gap-2 justify-center items-center py-2 relative z-20">
                    <button className="text-muted-foreground size-7 rounded text-2xl hover:bg-slate-200 transition-all cursor-pointer flex items-center justify-center" onClick={() => setNumPoints(numPoints - 1)}>
                        -
                    </button>
                    <button className="text-muted-foreground size-7 rounded text-2xl hover:bg-slate-200 transition-all cursor-pointer flex items-center justify-center" onClick={() => setNumPoints(numPoints + 1)}>
                        +
                    </button>
                </div>
            </div>

            <div className="flex gap-4 mt-4">
                <div className="px-3 py-1.5 rounded-lg bg-white shadow-sm border text-sm">{colors[0]}</div>
                {colors.length >= 2 && <div className="px-3 py-1.5 rounded-lg bg-white shadow-sm border text-sm">{colors[1]}</div>}
                {colors.length === 3 && <div className="px-3 py-1.5 rounded-lg bg-white shadow-sm border text-sm">{colors[2]}</div>}
            </div>

            <div
                className="w-full h-12 rounded mt-4"
                style={{
                    background: numPoints === 1 ? colors[0] : numPoints === 2 ? `linear-gradient(90deg, ${colors[0]} 0%, ${colors[1]} 100%)` : `linear-gradient(90deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`,
                }}
            />
        </div>
    )
}

```

Copy-paste these files for dependencies:
```tsx
/components/ui/color-picker.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { memo } from 'react'

function hslToHex(h: number, s: number, l: number) {
    l /= 100
    s /= 100
    const k = (n: number) => (n + h / 30) % 12
    const a = s * Math.min(l, 1 - l)
    const f = (n: number) => l - a * Math.max(-1, Math.min(Math.min(k(n) - 3, 9 - k(n)), 1))
    return (
        '#' +
        [f(0), f(8), f(4)]
            .map(x =>
                Math.round(x * 255)
                    .toString(16)
                    .padStart(2, '0')
            )
            .join('')
    )
}

interface ColorPickerProps {
    size?: number
    padding?: number
    bulletRadius?: number
    spreadFactor?: number
    minSpread?: number
    maxSpread?: number
    minLight?: number
    maxLight?: number
    showColorWheel?: boolean
    numPoints?: number
    onColorChange?: (colors: string[]) => void
}

const ColorPicker = ({ size = 280, padding = 20, bulletRadius = 24, spreadFactor = 0.4, minSpread = Math.PI / 1.5, maxSpread = Math.PI / 3, minLight = 15, maxLight = 90, showColorWheel = false, numPoints = 1, onColorChange }: ColorPickerProps) => {
    const RADIUS = size / 2 - padding

    const [angle, setAngle] = useState(-Math.PI / 2)
    const [radius, setRadius] = useState(RADIUS * 0.7)
    const [drag, setDrag] = useState(false)

    const ref = useRef<HTMLCanvasElement>(null)

    const hue = (angle * 180) / Math.PI
    const light = maxLight * (radius / RADIUS)
    const color = hslToHex(hue, 100, light)

    const normalizedRadius = radius / RADIUS
    const spread = (minSpread + (maxSpread - minSpread) * Math.pow(normalizedRadius, 3)) * spreadFactor

    const bx1 = size / 2 + Math.cos(angle - spread) * radius
    const by1 = size / 2 + Math.sin(angle - spread) * radius
    const bx2 = size / 2 + Math.cos(angle + spread) * radius
    const by2 = size / 2 + Math.sin(angle + spread) * radius

    const angle1 = angle - spread
    const angle2 = angle + spread
    const hue1 = (angle1 * 180) / Math.PI
    const hue2 = (angle2 * 180) / Math.PI
    const light1 = maxLight * (radius / RADIUS)
    const light2 = maxLight * (radius / RADIUS)
    const color1 = hslToHex(hue1, 100, light1)
    const color2 = hslToHex(hue2, 100, light2)

    useEffect(() => {
        const ctx = ref.current!.getContext('2d')!
        ctx.clearRect(0, 0, size, size)

        ctx.beginPath()
        ctx.arc(size / 2, size / 2, RADIUS, 0, Math.PI * 2)
        ctx.clip()

        for (let r = 0; r <= RADIUS; r++) {
            for (let a = 0; a < 360; a += 1) {
                const rad = (a * Math.PI) / 180
                const x = size / 2 + Math.cos(rad) * r
                const y = size / 2 + Math.sin(rad) * r
                const lightness = minLight + (maxLight - minLight) * (r / RADIUS)
                ctx.beginPath()
                ctx.strokeStyle = hslToHex(a, 100, lightness)
                ctx.moveTo(x, y)
                ctx.lineTo(x + 1, y + 1)
                ctx.stroke()
            }
        }
    }, [size, RADIUS, minLight, maxLight])

    useEffect(() => {
        const colors = numPoints === 1 ? [color] : numPoints === 2 ? [color2, color] : [color2, color, color1]
        onColorChange?.(colors)
    }, [color, color1, color2, numPoints, onColorChange])

    function setFromPointer(e: React.PointerEvent) {
        const rect = ref.current!.getBoundingClientRect()
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2
        let r = Math.sqrt(x * x + y * y)
        let a = Math.atan2(y, x)
        if (a < 0) a += 2 * Math.PI
        r = Math.max(0, Math.min(RADIUS, r))
        setAngle(a)
        setRadius(r)
    }

    function onPointerDown(e: React.PointerEvent) {
        setDrag(true)
        setFromPointer(e)
        ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    }
    function onPointerMove(e: React.PointerEvent) {
        if (!drag) return
        setFromPointer(e)
    }
    function onPointerUp() {
        setDrag(false)
    }

    const bx = size / 2 + Math.cos(angle) * radius
    const by = size / 2 + Math.sin(angle) * radius

    return (
        <div>
            <div
                style={{
                    width: size,
                    height: size,
                }}
                className="select-none relative"
            >
                <canvas ref={ref} width={size} height={size} className={`rounded-full ${!showColorWheel && 'opacity-0'}`} />

                {numPoints >= 2 && (
                    <div
                        className="absolute rounded-full border-2 border-white/80 shadow pointer-events-none opacity-90 z-20"
                        style={{
                            left: bx2 - bulletRadius / 1.7,
                            top: by2 - bulletRadius / 1.7,
                            width: bulletRadius * 1.2,
                            height: bulletRadius * 1.2,
                            background: color2,
                        }}
                    />
                )}

                <div
                    className="absolute rounded-full border-3 border-white/90 shadow cursor-grab touch-none z-30"
                    style={{
                        left: bx - bulletRadius,
                        top: by - bulletRadius,
                        width: bulletRadius * 2,
                        height: bulletRadius * 2,
                        background: color,
                    }}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerLeave={onPointerUp}
                />

                {numPoints >= 3 && (
                    <div
                        className="absolute rounded-full border-2 border-white/80 shadow pointer-events-none opacity-90 z-20"
                        style={{
                            left: bx1 - bulletRadius / 1.7,
                            top: by1 - bulletRadius / 1.7,
                            width: bulletRadius * 1.2,
                            height: bulletRadius * 1.2,
                            background: color1,
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default ColorPicker

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
