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
battery-indicator.tsx
import { cn } from '@/lib/utils'
import type { CSSProperties, SVGProps } from 'react'

export interface BatteryProps extends Omit<SVGProps<SVGSVGElement>, 'className'> {
  level: number
  size?: number | string
  isCharging?: boolean
  showPercentage?: boolean
  showBolt?: boolean
  theme?: 'default' | 'minimal' | 'neon' | 'glass'
  colorScheme?: 'auto' | 'success' | 'warning' | 'danger' | 'info' | { [key: number]: string }
  animation?: {
    duration?: number
    delay?: number
    chargingPulse?: boolean
    lowBatteryPulse?: boolean
  }
  className?: 
    | string 
    | {
        containerClassName?: string
        batteryClassName?: string
        fillClassName?: string
        terminalClassName?: string
        textClassName?: string
        boltClassName?: string
      }
}

/**
 * Renders a battery indicator with customizable themes, animations, and charging states.
 * @param level - Battery level as a percentage (0-100)
 * @param size - Width and height of the battery. Defaults to 100px
 * @param isCharging - Whether the battery is currently charging
 * @param showPercentage - Show percentage text inside battery
 * @param showBolt - Show lightning bolt when charging
 * @param theme - Visual theme for the battery
 * @param colorScheme - Color scheme based on battery level or fixed color
 * @param animation - Animation settings for transitions and effects
 * @param className - Class names for different parts of the battery
 */
function Battery({
  level,
  size = 100,
  isCharging = false,
  showPercentage = true,
  showBolt = true,
  theme = 'default',
  colorScheme = 'auto',
  animation = {
    duration: 800,
    delay: 0,
    chargingPulse: true,
    lowBatteryPulse: true
  },
  className,
  ...props
}: BatteryProps) {
  const clampedLevel = Math.max(0, Math.min(100, level))
  const batteryWidth = 60
  const batteryHeight = 30
  const terminalWidth = 4
  const terminalHeight = 12
  const cornerRadius = 4
  const fillPadding = 2

  const getBatteryColor = () => {
    if (colorScheme === 'auto') {
      if (isCharging) return '#10b981' // Green when charging
      if (clampedLevel <= 15) return '#ef4444' // Red for low battery
      if (clampedLevel <= 30) return '#f59e0b' // Amber for medium-low
      if (clampedLevel <= 60) return '#3b82f6' // Blue for medium
      return '#10b981' // Green for high
    }
    
    if (typeof colorScheme === 'string') {
      const colors = {
        success: '#10b981',
        warning: '#f59e0b', 
        danger: '#ef4444',
        info: '#3b82f6'
      }
      return colors[colorScheme as keyof typeof colors] || colorScheme
    }
    
    if (typeof colorScheme === 'object') {
      const keys = Object.keys(colorScheme).sort((a, b) => Number(a) - Number(b))
      for (let i = 0; i < keys.length; i++) {
        const currentKey = Number(keys[i])
        const nextKey = Number(keys[i + 1])
        if (clampedLevel >= currentKey && (clampedLevel < nextKey || !nextKey)) {
          return colorScheme[currentKey]
        }
      }
    }
    
    return '#10b981'
  }

  const getStrokeColor = () => {
    if (theme === 'neon') return getBatteryColor()
    return 'currentColor' // This will adapt to light/dark mode
  }

  const getTerminalColor = () => {
    if (theme === 'neon') return getBatteryColor()
    return 'currentColor' // This will adapt to light/dark mode
  }

  const getTextColor = () => {
    if (theme === 'glass' || theme === 'neon') return '#ffffff'
    return clampedLevel > 50 ? '#ffffff' : 'currentColor'
  }

  const getFillWidth = () => {
    const maxFillWidth = batteryWidth - (fillPadding * 2)
    return (clampedLevel / 100) * maxFillWidth
  }

  const getThemeStyles = () => {
    const baseStyles = {
      transition: `all ${animation.duration}ms ease ${animation.delay}ms`
    }

    switch (theme) {
      case 'minimal':
        return {
          ...baseStyles,
          filter: 'none',
          strokeWidth: 1.5
        }
      case 'neon':
        return {
          ...baseStyles,
          filter: `drop-shadow(0 0 8px ${getBatteryColor()}40)`,
          strokeWidth: 2
        }
      case 'glass':
        return {
          ...baseStyles,
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))',
          strokeWidth: 1
        }
      default:
        return {
          ...baseStyles,
          filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.2))',
          strokeWidth: 1.5
        }
    }
  }

  const shouldPulse = () => {
    return (isCharging && animation.chargingPulse) || 
           (clampedLevel <= 15 && !isCharging && animation.lowBatteryPulse)
  }

  const getPulseKeyframes = () => {
    if (isCharging) {
      return `
        @keyframes chargePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `
    }
    return `
      @keyframes lowBatteryPulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
    `
  }

  const containerStyles: CSSProperties = {
    ...getThemeStyles(),
    ...(shouldPulse() && {
      animation: isCharging ? 'chargePulse 2s infinite' : 'lowBatteryPulse 1.5s infinite'
    })
  }

  return (
    <>
      <style>{getPulseKeyframes()}</style>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${batteryWidth + terminalWidth + 4} ${batteryHeight + 4}`}
        className={cn('', typeof className === 'string' ? className : className?.containerClassName)}
        style={containerStyles}
        {...props}
      >
        {/* Battery Body */}
        <rect
          x={2}
          y={2}
          width={batteryWidth}
          height={batteryHeight}
          rx={cornerRadius}
          ry={cornerRadius}
          fill={theme === 'glass' ? 'rgba(255,255,255,0.1)' : 'transparent'}
          stroke={getStrokeColor()}
          strokeWidth={getThemeStyles().strokeWidth}
          className={cn('text-gray-400 dark:text-gray-500', typeof className === 'object' && className?.batteryClassName)}
        />
        
        {/* Battery Terminal */}
        <rect
          x={batteryWidth + 2}
          y={(batteryHeight - terminalHeight) / 2 + 2}
          width={terminalWidth}
          height={terminalHeight}
          rx={2}
          ry={2}
          fill={getTerminalColor()}
          className={cn('text-gray-400 dark:text-gray-500', typeof className === 'object' && className?.terminalClassName)}
        />
        
        {/* Battery Fill */}
        {clampedLevel > 0 && (
          <rect
            x={2 + fillPadding}
            y={2 + fillPadding}
            width={getFillWidth()}
            height={batteryHeight - (fillPadding * 2)}
            rx={cornerRadius - 1}
            ry={cornerRadius - 1}
            fill={getBatteryColor()}
            className={cn('', typeof className === 'object' && className?.fillClassName)}
            style={{
              transition: `width ${animation.duration}ms ease ${animation.delay}ms`,
              ...(theme === 'glass' && {
                background: `linear-gradient(135deg, ${getBatteryColor()}80, ${getBatteryColor()})`
              })
            }}
          />
        )}
        
        {/* Charging Bolt */}
        {isCharging && showBolt && (
          <g className={cn('', typeof className === 'object' && className?.boltClassName)}>
            <path
              d={`M${batteryWidth/2 - 3} ${batteryHeight/2 - 6} L${batteryWidth/2 + 1} ${batteryHeight/2 - 2} L${batteryWidth/2 - 1} ${batteryHeight/2 - 2} L${batteryWidth/2 + 3} ${batteryHeight/2 + 6} L${batteryWidth/2 - 1} ${batteryHeight/2 + 2} L${batteryWidth/2 + 1} ${batteryHeight/2 + 2} Z`}
              fill={theme === 'glass' || theme === 'neon' ? '#ffffff' : 'currentColor'}
              className="text-gray-900 dark:text-white"
              style={{
                animation: 'chargePulse 1s infinite',
                transformOrigin: 'center'
              }}
            />
          </g>
        )}
        
        {/* Percentage Text */}
        {showPercentage && !isCharging && (
          <text
            x={batteryWidth / 2 + 2}
            y={batteryHeight / 2 + 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={getTextColor()}
            fontSize={theme === 'minimal' ? '8' : '10'}
            fontWeight="600"
            className={cn('text-gray-900 dark:text-white', typeof className === 'object' && className?.textClassName)}
          >
            {Math.round(clampedLevel)}
          </text>
        )}
      </svg>
    </>
  )
}

export { Battery }


code.demo.1754635651175.tsx
"use client"

import { useState } from 'react'
import { Battery } from '@/components/ui/battery-indicator'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export default function Component() {
  const [level, setLevel] = useState(65)
  const [isCharging, setIsCharging] = useState(false)
  const [showPercentage, setShowPercentage] = useState(true)
  const [showBolt, setShowBolt] = useState(true)
  const [theme, setTheme] = useState<'default' | 'minimal' | 'neon' | 'glass'>('default')

  const presetLevels = [5, 25, 50, 75, 100]

  return (
    <div className="min-h-screen flex items-center w-full p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Main Demo */}
        <Card className="bg-white dark:bg-neutral-900 border-gray-400 dark:border-neutral-700">
          <CardContent className="space-y-6 pt-6">
            {/* Large Battery Display */}
            <div className="flex justify-center p-8 bg-gray-50 dark:bg-neutral-950 rounded-lg">
              <Battery
                level={level}
                size={200}
                isCharging={isCharging}
                showPercentage={showPercentage}
                showBolt={showBolt}
                theme={theme}
                colorScheme="auto"
                className="text-gray-600 dark:text-gray-300"
              />
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Level Control */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="level-slider" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Battery Level: {level}%
                  </Label>
                  <input
                    id="level-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={level}
                    onChange={(e) => setLevel(Number(e.target.value))}
                    className="w-full h-2 mt-2 bg-neutral-200 dark:bg-neutral-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Preset Buttons */}
                <div className="flex gap-2 flex-wrap">
                  {presetLevels.map((preset) => (
  <Button
    key={preset}
    variant={level === preset ? "default" : "outline"}
    size="sm"
    onClick={() => setLevel(preset)}
    className={`dark:border-neutral-600 dark:hover:bg-neutral-800 ${
      level === preset ? 'dark:text-black dark:hover:text-neutral-300' : 'dark:text-gray-300'
    }`}
  >
    {preset}%
  </Button>
))}

                </div>
              </div>

              {/* Options */}
              <div className="space-y-4">

                <div className="flex items-center space-x-2">
                  <Switch
                    id="percentage"
                    checked={showPercentage}
                    onCheckedChange={setShowPercentage}
                  />
                  <Label htmlFor="percentage" className="text-gray-700 dark:text-gray-300">Show Percentage</Label>
                </div>

                {/* Theme Selection */}
                <div>
                  <Label className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-300">Theme</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['default', 'minimal', 'neon', 'glass'] as const).map((t) => (
  <Button
    key={t}
    variant={theme === t ? "default" : "outline"}
    size="sm"
    onClick={() => setTheme(t)}
    className={`capitalize dark:border-neutral-600 dark:hover:bg-neutral-800 ${
      theme === t ? 'dark:text-neutral-900 dark:hover:text-neutral-300' : 'dark:text-gray-300'
    }`}
  >
    {t}
  </Button>
))}

                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/battery-indicator.tsx
import { cn } from '@/lib/utils'
import type { CSSProperties, SVGProps } from 'react'

export interface BatteryProps extends Omit<SVGProps<SVGSVGElement>, 'className'> {
  level: number
  size?: number | string
  isCharging?: boolean
  showPercentage?: boolean
  showBolt?: boolean
  theme?: 'default' | 'minimal' | 'neon' | 'glass'
  colorScheme?: 'auto' | 'success' | 'warning' | 'danger' | 'info' | { [key: number]: string }
  animation?: {
    duration?: number
    delay?: number
    chargingPulse?: boolean
    lowBatteryPulse?: boolean
  }
  className?: 
    | string 
    | {
        containerClassName?: string
        batteryClassName?: string
        fillClassName?: string
        terminalClassName?: string
        textClassName?: string
        boltClassName?: string
      }
}

/**
 * Renders a battery indicator with customizable themes, animations, and charging states.
 * @param level - Battery level as a percentage (0-100)
 * @param size - Width and height of the battery. Defaults to 100px
 * @param isCharging - Whether the battery is currently charging
 * @param showPercentage - Show percentage text inside battery
 * @param showBolt - Show lightning bolt when charging
 * @param theme - Visual theme for the battery
 * @param colorScheme - Color scheme based on battery level or fixed color
 * @param animation - Animation settings for transitions and effects
 * @param className - Class names for different parts of the battery
 */
function Battery({
  level,
  size = 100,
  isCharging = false,
  showPercentage = true,
  showBolt = true,
  theme = 'default',
  colorScheme = 'auto',
  animation = {
    duration: 800,
    delay: 0,
    chargingPulse: true,
    lowBatteryPulse: true
  },
  className,
  ...props
}: BatteryProps) {
  const clampedLevel = Math.max(0, Math.min(100, level))
  const batteryWidth = 60
  const batteryHeight = 30
  const terminalWidth = 4
  const terminalHeight = 12
  const cornerRadius = 4
  const fillPadding = 2

  const getBatteryColor = () => {
    if (colorScheme === 'auto') {
      if (isCharging) return '#10b981' // Green when charging
      if (clampedLevel <= 15) return '#ef4444' // Red for low battery
      if (clampedLevel <= 30) return '#f59e0b' // Amber for medium-low
      if (clampedLevel <= 60) return '#3b82f6' // Blue for medium
      return '#10b981' // Green for high
    }
    
    if (typeof colorScheme === 'string') {
      const colors = {
        success: '#10b981',
        warning: '#f59e0b', 
        danger: '#ef4444',
        info: '#3b82f6'
      }
      return colors[colorScheme as keyof typeof colors] || colorScheme
    }
    
    if (typeof colorScheme === 'object') {
      const keys = Object.keys(colorScheme).sort((a, b) => Number(a) - Number(b))
      for (let i = 0; i < keys.length; i++) {
        const currentKey = Number(keys[i])
        const nextKey = Number(keys[i + 1])
        if (clampedLevel >= currentKey && (clampedLevel < nextKey || !nextKey)) {
          return colorScheme[currentKey]
        }
      }
    }
    
    return '#10b981'
  }

  const getStrokeColor = () => {
    if (theme === 'neon') return getBatteryColor()
    return 'currentColor' // This will adapt to light/dark mode
  }

  const getTerminalColor = () => {
    if (theme === 'neon') return getBatteryColor()
    return 'currentColor' // This will adapt to light/dark mode
  }

  const getTextColor = () => {
    if (theme === 'glass' || theme === 'neon') return '#ffffff'
    return clampedLevel > 50 ? '#ffffff' : 'currentColor'
  }

  const getFillWidth = () => {
    const maxFillWidth = batteryWidth - (fillPadding * 2)
    return (clampedLevel / 100) * maxFillWidth
  }

  const getThemeStyles = () => {
    const baseStyles = {
      transition: `all ${animation.duration}ms ease ${animation.delay}ms`
    }

    switch (theme) {
      case 'minimal':
        return {
          ...baseStyles,
          filter: 'none',
          strokeWidth: 1.5
        }
      case 'neon':
        return {
          ...baseStyles,
          filter: `drop-shadow(0 0 8px ${getBatteryColor()}40)`,
          strokeWidth: 2
        }
      case 'glass':
        return {
          ...baseStyles,
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))',
          strokeWidth: 1
        }
      default:
        return {
          ...baseStyles,
          filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.2))',
          strokeWidth: 1.5
        }
    }
  }

  const shouldPulse = () => {
    return (isCharging && animation.chargingPulse) || 
           (clampedLevel <= 15 && !isCharging && animation.lowBatteryPulse)
  }

  const getPulseKeyframes = () => {
    if (isCharging) {
      return `
        @keyframes chargePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `
    }
    return `
      @keyframes lowBatteryPulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
    `
  }

  const containerStyles: CSSProperties = {
    ...getThemeStyles(),
    ...(shouldPulse() && {
      animation: isCharging ? 'chargePulse 2s infinite' : 'lowBatteryPulse 1.5s infinite'
    })
  }

  return (
    <>
      <style>{getPulseKeyframes()}</style>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${batteryWidth + terminalWidth + 4} ${batteryHeight + 4}`}
        className={cn('', typeof className === 'string' ? className : className?.containerClassName)}
        style={containerStyles}
        {...props}
      >
        {/* Battery Body */}
        <rect
          x={2}
          y={2}
          width={batteryWidth}
          height={batteryHeight}
          rx={cornerRadius}
          ry={cornerRadius}
          fill={theme === 'glass' ? 'rgba(255,255,255,0.1)' : 'transparent'}
          stroke={getStrokeColor()}
          strokeWidth={getThemeStyles().strokeWidth}
          className={cn('text-gray-400 dark:text-gray-500', typeof className === 'object' && className?.batteryClassName)}
        />
        
        {/* Battery Terminal */}
        <rect
          x={batteryWidth + 2}
          y={(batteryHeight - terminalHeight) / 2 + 2}
          width={terminalWidth}
          height={terminalHeight}
          rx={2}
          ry={2}
          fill={getTerminalColor()}
          className={cn('text-gray-400 dark:text-gray-500', typeof className === 'object' && className?.terminalClassName)}
        />
        
        {/* Battery Fill */}
        {clampedLevel > 0 && (
          <rect
            x={2 + fillPadding}
            y={2 + fillPadding}
            width={getFillWidth()}
            height={batteryHeight - (fillPadding * 2)}
            rx={cornerRadius - 1}
            ry={cornerRadius - 1}
            fill={getBatteryColor()}
            className={cn('', typeof className === 'object' && className?.fillClassName)}
            style={{
              transition: `width ${animation.duration}ms ease ${animation.delay}ms`,
              ...(theme === 'glass' && {
                background: `linear-gradient(135deg, ${getBatteryColor()}80, ${getBatteryColor()})`
              })
            }}
          />
        )}
        
        {/* Charging Bolt */}
        {isCharging && showBolt && (
          <g className={cn('', typeof className === 'object' && className?.boltClassName)}>
            <path
              d={`M${batteryWidth/2 - 3} ${batteryHeight/2 - 6} L${batteryWidth/2 + 1} ${batteryHeight/2 - 2} L${batteryWidth/2 - 1} ${batteryHeight/2 - 2} L${batteryWidth/2 + 3} ${batteryHeight/2 + 6} L${batteryWidth/2 - 1} ${batteryHeight/2 + 2} L${batteryWidth/2 + 1} ${batteryHeight/2 + 2} Z`}
              fill={theme === 'glass' || theme === 'neon' ? '#ffffff' : 'currentColor'}
              className="text-gray-900 dark:text-white"
              style={{
                animation: 'chargePulse 1s infinite',
                transformOrigin: 'center'
              }}
            />
          </g>
        )}
        
        {/* Percentage Text */}
        {showPercentage && !isCharging && (
          <text
            x={batteryWidth / 2 + 2}
            y={batteryHeight / 2 + 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={getTextColor()}
            fontSize={theme === 'minimal' ? '8' : '10'}
            fontWeight="600"
            className={cn('text-gray-900 dark:text-white', typeof className === 'object' && className?.textClassName)}
          >
            {Math.round(clampedLevel)}
          </text>
        )}
      </svg>
    </>
  )
}

export { Battery }

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
