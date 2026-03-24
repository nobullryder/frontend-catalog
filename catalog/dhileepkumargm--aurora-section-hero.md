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
aurora-section-hero.tsx
import React, { useState, useEffect, CSSProperties } from 'react'

export interface BackgroundSceneProps {
  /** Number of animated light beams */
  beamCount?: number
}

const BACKGROUND_BEAM_COUNT = 60

const BackgroundScene: React.FC<BackgroundSceneProps> = ({
  beamCount = BACKGROUND_BEAM_COUNT,
}) => {
  const [beams, setBeams] = useState<
    Array<{ id: number; style: CSSProperties }>
  >([])

  useEffect(() => {
    const generated = Array.from({ length: beamCount }).map((_, i) => {
      const riseDur = Math.random() * 2 + 4    // 4–6s rise
      const fadeDur = riseDur                  // sync fade
      const dropDur = Math.random() * 3 + 3    // 3–6s drop

      return {
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          width: `${Math.floor(Math.random() * 3) + 1}px`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${riseDur}s, ${fadeDur}s, ${dropDur}s`,
        },
      }
    })
    setBeams(generated)
  }, [beamCount])

  return (
    <div className="scene" role="img" aria-label="Animated digital data background">
      <div className="floor" />
      <div className="main-column" />
      <div className="light-stream-container">
        {beams.map((beam) => (
          <div key={beam.id} className="light-beam" style={beam.style} />
        ))}
      </div>
    </div>
  )
}

export default BackgroundScene


code.demo.1759140631928.tsx
import React from 'react'
import BackgroundScene from '@/components/ui/aurora-section-hero'

const App: React.FC = () => {
  return (
    <>
      <BackgroundScene beamCount={60} />

      <div className="content-wrapper">
        <header className="main-header">
          <div className="logo">DATASCAPE</div>
          <nav>
            <a href="#">Solutions</a>
            <a href="#">Platform</a>
            <a href="#">Company</a>
            <a href="#">Contact</a>
          </nav>
        </header>

        <main className="hero-section">
          <h1>The Future of Data</h1>
          <p>
            Unlock unparalleled insights and drive innovation with our next-generation
            data intelligence platform.
          </p>
          <button className="cta-button">Request a Demo</button>
        </main>
      </div>
    </>
  )
}

export default App

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/aurora-section-hero.tsx
import React, { useState, useEffect, CSSProperties } from 'react'

export interface BackgroundSceneProps {
  /** Number of animated light beams */
  beamCount?: number
}

const BACKGROUND_BEAM_COUNT = 60

const BackgroundScene: React.FC<BackgroundSceneProps> = ({
  beamCount = BACKGROUND_BEAM_COUNT,
}) => {
  const [beams, setBeams] = useState<
    Array<{ id: number; style: CSSProperties }>
  >([])

  useEffect(() => {
    const generated = Array.from({ length: beamCount }).map((_, i) => {
      const riseDur = Math.random() * 2 + 4    // 4–6s rise
      const fadeDur = riseDur                  // sync fade
      const dropDur = Math.random() * 3 + 3    // 3–6s drop

      return {
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          width: `${Math.floor(Math.random() * 3) + 1}px`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${riseDur}s, ${fadeDur}s, ${dropDur}s`,
        },
      }
    })
    setBeams(generated)
  }, [beamCount])

  return (
    <div className="scene" role="img" aria-label="Animated digital data background">
      <div className="floor" />
      <div className="main-column" />
      <div className="light-stream-container">
        {beams.map((beam) => (
          <div key={beam.id} className="light-beam" style={beam.style} />
        ))}
      </div>
    </div>
  )
}

export default BackgroundScene

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
