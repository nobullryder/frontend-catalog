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
vertical-volume-slider-with-mute-toggle.tsx
import React, { useState } from 'react';

const Component = () => {
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(50);

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    
    // If volume is changed manually and was muted, unmute
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
    
    // If volume is 0, consider it muted
    if (newVolume == 0) {
      setIsMuted(true);
    }
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      // Unmute: restore previous volume
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      // Mute: save current volume and set to 0
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center gap-6">
        {/* Volume Icon */}
        <svg
          className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          onClick={handleMuteToggle}
        >
          {isMuted ? (
            // Muted icon (volume with X)
            <>
              <path d="M12 22a1 1 0 0 1-.707-.293L6.586 17H4c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h2.586l4.707-4.707A.998.998 0 0 1 13 3v18a1 1 0 0 1-1 1z" />
              <path d="M16.293 7.293a1 1 0 0 1 1.414 0L19 8.586l1.293-1.293a1 1 0 1 1 1.414 1.414L20.414 10l1.293 1.293a1 1 0 1 1-1.414 1.414L19 11.414l-1.293 1.293a1 1 0 1 1-1.414-1.414L17.586 10l-1.293-1.293a1 1 0 0 1 0-1.414z" />
            </>
          ) : (
            // Normal volume icon
            <>
              <path d="M18.36 19.36a1 1 0 0 1-.705-1.71C19.167 16.148 20 14.142 20 12s-.833-4.148-2.345-5.65a1 1 0 1 1 1.41-1.419C20.958 6.812 22 9.322 22 12s-1.042 5.188-2.935 7.069a.997.997 0 0 1-.705.291z" />
              <path d="M15.53 16.53a.999.999 0 0 1-.703-1.711C15.572 14.082 16 13.054 16 12s-.428-2.082-1.173-2.819a1 1 0 1 1 1.406-1.422A6 6 0 0 1 18 12a6 6 0 0 1-1.767 4.241.996.996 0 0 1-.703.289zM12 22a1 1 0 0 1-.707-.293L6.586 17H4c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h2.586l4.707-4.707A.998.998 0 0 1 13 3v18a1 1 0 0 1-1 1z" />
            </>
          )}
        </svg>
        
        {/* Custom Range Slider */}
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="cursor-pointer"
            style={{
              transform: 'rotate(270deg)',
              width: '100px',
              height: '50px',
              background: 'rgb(82, 82, 82)',
              borderRadius: '9px',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              appearance: 'none',
              overflow: 'hidden',
              transition: 'height 0.1s',
            }}
          />
          
          {/* Custom Styles for Range Slider */}
          <style jsx>{`
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              width: 0;
              height: 0;
              box-shadow: -200px 0 0 200px #fff;
            }
            
            input[type="range"]::-moz-range-thumb {
              width: 0;
              height: 0;
              border-radius: 0;
              border: none;
              box-shadow: -200px 0 0 200px #fff;
            }
          `}</style>
        </div>
        
        {/* Volume Level Display */}
        <div className="text-gray-700 font-medium">
          {volume}%
        </div>
      </div>
    </div>
  );
};

export default Component;

code.demo.1752649961719.tsx
import Component from "@/components/ui/vertical-volume-slider-with-mute-toggle";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/vertical-volume-slider-with-mute-toggle.tsx
import React, { useState } from 'react';

const Component = () => {
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(50);

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    
    // If volume is changed manually and was muted, unmute
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
    
    // If volume is 0, consider it muted
    if (newVolume == 0) {
      setIsMuted(true);
    }
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      // Unmute: restore previous volume
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      // Mute: save current volume and set to 0
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center gap-6">
        {/* Volume Icon */}
        <svg
          className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          onClick={handleMuteToggle}
        >
          {isMuted ? (
            // Muted icon (volume with X)
            <>
              <path d="M12 22a1 1 0 0 1-.707-.293L6.586 17H4c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h2.586l4.707-4.707A.998.998 0 0 1 13 3v18a1 1 0 0 1-1 1z" />
              <path d="M16.293 7.293a1 1 0 0 1 1.414 0L19 8.586l1.293-1.293a1 1 0 1 1 1.414 1.414L20.414 10l1.293 1.293a1 1 0 1 1-1.414 1.414L19 11.414l-1.293 1.293a1 1 0 1 1-1.414-1.414L17.586 10l-1.293-1.293a1 1 0 0 1 0-1.414z" />
            </>
          ) : (
            // Normal volume icon
            <>
              <path d="M18.36 19.36a1 1 0 0 1-.705-1.71C19.167 16.148 20 14.142 20 12s-.833-4.148-2.345-5.65a1 1 0 1 1 1.41-1.419C20.958 6.812 22 9.322 22 12s-1.042 5.188-2.935 7.069a.997.997 0 0 1-.705.291z" />
              <path d="M15.53 16.53a.999.999 0 0 1-.703-1.711C15.572 14.082 16 13.054 16 12s-.428-2.082-1.173-2.819a1 1 0 1 1 1.406-1.422A6 6 0 0 1 18 12a6 6 0 0 1-1.767 4.241.996.996 0 0 1-.703.289zM12 22a1 1 0 0 1-.707-.293L6.586 17H4c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h2.586l4.707-4.707A.998.998 0 0 1 13 3v18a1 1 0 0 1-1 1z" />
            </>
          )}
        </svg>
        
        {/* Custom Range Slider */}
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="cursor-pointer"
            style={{
              transform: 'rotate(270deg)',
              width: '100px',
              height: '50px',
              background: 'rgb(82, 82, 82)',
              borderRadius: '9px',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              appearance: 'none',
              overflow: 'hidden',
              transition: 'height 0.1s',
            }}
          />
          
          {/* Custom Styles for Range Slider */}
          <style jsx>{`
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              width: 0;
              height: 0;
              box-shadow: -200px 0 0 200px #fff;
            }
            
            input[type="range"]::-moz-range-thumb {
              width: 0;
              height: 0;
              border-radius: 0;
              border: none;
              box-shadow: -200px 0 0 200px #fff;
            }
          `}</style>
        </div>
        
        {/* Volume Level Display */}
        <div className="text-gray-700 font-medium">
          {volume}%
        </div>
      </div>
    </div>
  );
};

export default Component;
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
