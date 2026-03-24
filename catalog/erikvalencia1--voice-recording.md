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
voice-recording.tsx
// Original component inspired by voice input concept
// Created with unique pulse animation and recording visualization

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export const PulseVoiceRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [pulseIntensity, setPulseIntensity] = useState<number[]>([]);

  useEffect(() => {
    if (!recording) return;
    
    const timer = setInterval(() => {
      setDuration(prev => prev + 1);
      // Generate random pulse patterns for visual feedback
      setPulseIntensity(Array.from({ length: 5 }, () => Math.random()));
    }, 1000);

    return () => clearInterval(timer);
  }, [recording]);

  const handleToggle = () => {
    if (recording) {
      setRecording(false);
      setDuration(0);
      setPulseIntensity([]);
    } else {
      setRecording(true);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <div className="relative">
        {/* Animated pulse rings */}
        {recording && (
          <>
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 rounded-full border-2 border-blue-400/30",
                  "animate-ping"
                )}
                style={{
                  animationDelay: `${index * 0.3}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </>
        )}
        
        {/* Main record button */}
        <button
          onClick={handleToggle}
          className={cn(
            "relative z-10 w-24 h-24 rounded-full transition-all duration-300",
            "flex items-center justify-center",
            recording
              ? "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/50"
              : "bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/50"
          )}
        >
          {recording ? (
            <div className="w-8 h-8 bg-white rounded-sm" />
          ) : (
            <div className="w-6 h-6 bg-white rounded-full" />
          )}
        </button>
      </div>

      {/* Duration display */}
      {recording && (
        <div className="text-2xl font-mono font-bold text-gray-700">
          {formatTime(duration)}
        </div>
      )}

     


    </div>
  );
};


code.demo.1759611224963.tsx
import { PulseVoiceRecorder } from "@/components/ui/voice-recording";

export default function DemoOne() {
  return <PulseVoiceRecorder />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/voice-recording.tsx
// Original component inspired by voice input concept
// Created with unique pulse animation and recording visualization

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export const PulseVoiceRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [pulseIntensity, setPulseIntensity] = useState<number[]>([]);

  useEffect(() => {
    if (!recording) return;
    
    const timer = setInterval(() => {
      setDuration(prev => prev + 1);
      // Generate random pulse patterns for visual feedback
      setPulseIntensity(Array.from({ length: 5 }, () => Math.random()));
    }, 1000);

    return () => clearInterval(timer);
  }, [recording]);

  const handleToggle = () => {
    if (recording) {
      setRecording(false);
      setDuration(0);
      setPulseIntensity([]);
    } else {
      setRecording(true);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <div className="relative">
        {/* Animated pulse rings */}
        {recording && (
          <>
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 rounded-full border-2 border-blue-400/30",
                  "animate-ping"
                )}
                style={{
                  animationDelay: `${index * 0.3}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </>
        )}
        
        {/* Main record button */}
        <button
          onClick={handleToggle}
          className={cn(
            "relative z-10 w-24 h-24 rounded-full transition-all duration-300",
            "flex items-center justify-center",
            recording
              ? "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/50"
              : "bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/50"
          )}
        >
          {recording ? (
            <div className="w-8 h-8 bg-white rounded-sm" />
          ) : (
            <div className="w-6 h-6 bg-white rounded-full" />
          )}
        </button>
      </div>

      {/* Duration display */}
      {recording && (
        <div className="text-2xl font-mono font-bold text-gray-700">
          {formatTime(duration)}
        </div>
      )}

     


    </div>
  );
};

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
