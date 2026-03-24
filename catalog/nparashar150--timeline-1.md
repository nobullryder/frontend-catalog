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
timeline-1.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn, formatTime } from '@/lib/utils';
import {
    Shuffle,
    Grid3X3,
    Loader2,
    Pause,
    Play,
    Repeat,
    Settings,
    SkipBack,
    SkipForward,
    X,
    ZoomIn,
    ZoomOut,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

// Types
export interface TimelineTrack {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'transcript' | 'markers' | 'assets';
  height: number;
  visible: boolean;
  items: TimelineItem[];
}

export interface TimelineItem {
  id: string;
  name: string;
  start: number;
  end: number;
  duration: number;
  type: string;
  color: string;
  properties?: Record<string, unknown>;
}

export interface TimelineProps {
  tracks: TimelineTrack[];
  duration: number;
  className?: string;
  height?: number;
  onTimeUpdate?: (time: number) => void;
  onTracksChange?: (tracks: TimelineTrack[]) => void;
  onDurationChange?: (duration: number) => void;
  showLoadExample?: boolean;
  onLoadExample?: () => void;
  isLoadingExample?: boolean;
}

export function Timeline({
  tracks,
  duration,
  className,
  height = 400,
  onTimeUpdate,
  onTracksChange,
  onDurationChange,
  showLoadExample = false,
  onLoadExample,
  isLoadingExample = false,
}: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const playheadLineRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const lastUpdateTimeRef = useRef<number>(0);
  const containerRectRef = useRef<DOMRect | null>(null);

  // State
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDraggingPlayhead, setIsDraggingPlayhead] = useState(false);
  const [selection, setSelection] = useState<{ start: number; end: number } | null>(null);
  const [loop, setLoop] = useState<{ start: number; end: number } | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState(0);

  const dragTimeRef = useRef<number>(currentTime);

  // Timeline settings
  const [settings, setSettings] = useState({
    enableTimeSelection: false,
    enablePlayheadSync: true,
    enableClipAnimations: false,
    snapToGrid: true,
    playbackSpeed: 1,
    pxPerSec: 50,
  });

  // Update container width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setContainerWidth(width);
      }
    };

    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [settings.pxPerSec]);

  // Handle playhead seeking
  const handleSeek = useCallback((time: number) => {
    const clampedTime = Math.max(0, Math.min(duration, time));
    setCurrentTime(clampedTime);
    onTimeUpdate?.(clampedTime);
  }, [duration, onTimeUpdate]);

  const handlePlayheadSeek = useCallback(
    (clientX: number, updateState = false) => {
      if (!containerRectRef.current || !playheadLineRef.current) return;

      const scrollLeft = scrollContainerRef.current?.scrollLeft || 0;
      const relativeX = clientX - containerRectRef.current.left + scrollLeft;
      const time = relativeX / settings.pxPerSec;
      const clampedTime = Math.max(0, Math.min(duration, time));

      dragTimeRef.current = clampedTime;

      const newLeft = clampedTime * settings.pxPerSec;
      playheadLineRef.current.style.left = `${newLeft}px`;
      playheadLineRef.current.style.transition = 'none';

      if (updateState) {
        setCurrentTime(clampedTime);
        onTimeUpdate?.(clampedTime);
      }
    },
    [settings.pxPerSec, duration, onTimeUpdate]
  );

  const handlePlayheadMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDraggingPlayhead && containerRectRef.current && playheadLineRef.current) {
        const rect = containerRectRef.current;
        const scrollLeft = scrollContainerRef.current?.scrollLeft || 0;
        const relativeX = event.clientX - rect.left + scrollLeft;
        const time = relativeX / settings.pxPerSec;
        const clampedTime = Math.max(0, Math.min(duration, time));

        dragTimeRef.current = clampedTime;

        const newLeft = clampedTime * settings.pxPerSec;
        playheadLineRef.current.style.left = `${newLeft}px`;
      } else if (isSelecting && containerRectRef.current && settings.enableTimeSelection) {
        // Handle selection dragging
        const rect = containerRectRef.current;
        const scrollLeft = scrollContainerRef.current?.scrollLeft || 0;
        const relativeX = event.clientX - rect.left + scrollLeft;
        const time = relativeX / settings.pxPerSec;
        const clampedTime = Math.max(0, Math.min(duration, time));

        const start = Math.min(selectionStart, clampedTime);
        const end = Math.max(selectionStart, clampedTime);

        if (end - start > 0.1) { // Minimum selection of 0.1s
          setSelection({ start, end });
        }
      }
    },
    [isDraggingPlayhead, isSelecting, settings.pxPerSec, settings.enableTimeSelection, duration, selectionStart]
  );

  const handlePlayheadMouseUp = useCallback(() => {
    if (isDraggingPlayhead) {
      setIsDraggingPlayhead(false);
      containerRectRef.current = null;

      if (playheadLineRef.current) {
        playheadLineRef.current.style.transition = '';
      }

      document.body.style.pointerEvents = '';

      setCurrentTime(dragTimeRef.current);
      onTimeUpdate?.(dragTimeRef.current);
    }

    if (isSelecting) {
      setIsSelecting(false);
      containerRectRef.current = null;
      document.body.style.pointerEvents = '';
    }
  }, [isDraggingPlayhead, isSelecting, onTimeUpdate]);

  // Time progression logic
  const updateTime = useCallback(() => {
    if (!isPlaying) return;

    const now = performance.now();
    const deltaTime = (now - lastUpdateTimeRef.current) / 1000;
    lastUpdateTimeRef.current = now;

    const newTime = currentTime + deltaTime * settings.playbackSpeed;

    if (loop && newTime >= loop.end) {
      setCurrentTime(loop.start);
      onTimeUpdate?.(loop.start);
    } else if (newTime >= duration) {
      setCurrentTime(duration);
      setIsPlaying(false);
      return;
    } else {
      setCurrentTime(newTime);
      onTimeUpdate?.(newTime);
    }

    rafRef.current = requestAnimationFrame(updateTime);
  }, [isPlaying, currentTime, duration, loop, settings.playbackSpeed, onTimeUpdate]);

  // Auto-scroll to follow playhead
  useEffect(() => {
    if (settings.enablePlayheadSync && isPlaying && scrollContainerRef.current) {
      const playheadPosition = currentTime * settings.pxPerSec;
      const containerWidth = scrollContainerRef.current.clientWidth;
      const scrollLeft = scrollContainerRef.current.scrollLeft;

      if (playheadPosition < scrollLeft + 50 || playheadPosition > scrollLeft + containerWidth - 50) {
        scrollContainerRef.current.scrollTo({
          left: playheadPosition - containerWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [currentTime, settings.enablePlayheadSync, settings.pxPerSec, isPlaying]);

  // Mouse event listeners for dragging
  useEffect(() => {
    if (isDraggingPlayhead || isSelecting) {
      document.addEventListener('mousemove', handlePlayheadMouseMove);
      document.addEventListener('mouseup', handlePlayheadMouseUp);
      return () => {
        document.removeEventListener('mousemove', handlePlayheadMouseMove);
        document.removeEventListener('mouseup', handlePlayheadMouseUp);
      };
    }
  }, [isDraggingPlayhead, isSelecting, handlePlayheadMouseMove, handlePlayheadMouseUp]);

  // Keyboard event listener for Escape key to clear selection
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selection) {
        setSelection(null);
        setIsSelecting(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selection]);

  // Keep dragTimeRef in sync with currentTime when not dragging
  useEffect(() => {
    if (!isDraggingPlayhead) {
      dragTimeRef.current = currentTime;
    }
  }, [currentTime, isDraggingPlayhead]);

  // Start/stop animation loop
  useEffect(() => {
    if (isPlaying) {
      lastUpdateTimeRef.current = performance.now();
      rafRef.current = requestAnimationFrame(updateTime);
    } else {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isPlaying, updateTime]);

  // Calculate total content width
  const totalContentWidth = Math.max(
    duration * settings.pxPerSec,
    containerWidth || 800
  );

  return (
    <TooltipProvider>
      <div
        className={cn(
          'flex flex-col bg-card border rounded-lg overflow-hidden shadow-sm',
          className
        )}
        style={{ height }}
      >
        {/* Controls */}
        <div className="flex items-center gap-3 p-3 bg-muted/30 border-b">
          {showLoadExample && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onLoadExample}
                    disabled={isLoadingExample}
                  >
                    {isLoadingExample ? (
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    ) : (
                      <Shuffle className="h-4 w-4 mr-1" />
                    )}
                    {isLoadingExample ? 'Generating...' : 'Generate Random'}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Generate random timeline with multiple tracks and clips</p>
                </TooltipContent>
              </Tooltip>
              <Separator orientation="vertical" className="h-6" />
            </>
          )}

          <div className="flex items-center gap-1 h-6">
            <Button variant="ghost" size="sm" onClick={() => handleSeek(Math.max(0, currentTime - 10))}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleSeek(Math.min(duration, currentTime + 10))}>
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center gap-2 text-sm font-mono h-6">
            <span>{formatTime(currentTime, true)}</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{formatTime(duration)}</span>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center gap-2 h-6">
            <span className="text-xs text-muted-foreground">Speed:</span>
            <div className="w-20 flex items-center">
              <Slider
                value={[settings.playbackSpeed]}
                onValueChange={(values) => setSettings(prev => ({ ...prev, playbackSpeed: values[0] }))}
                min={0.25}
                max={2}
                step={0.25}
                className="flex-1"
              />
            </div>
            <span className="text-xs w-8 text-center">{settings.playbackSpeed}x</span>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={loop ? 'default' : 'ghost'}
                size="sm"
                onClick={() => {
                  if (loop) {
                    setLoop(null);
                  } else if (selection) {
                    setLoop(selection);
                  }
                }}
                disabled={!settings.enableTimeSelection}
              >
                <Repeat className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {!settings.enableTimeSelection
                  ? 'Enable Time Selection in settings to use loop'
                  : loop
                    ? 'Disable loop'
                    : 'Loop selected time range'
                }
              </p>
            </TooltipContent>
          </Tooltip>

          <Button
            variant={settings.snapToGrid ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSettings(prev => ({ ...prev, snapToGrid: !prev.snapToGrid }))}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center gap-1 h-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSettings(prev => ({ ...prev, pxPerSec: Math.max(10, prev.pxPerSec / 1.5) }))}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <div className="w-24 flex items-center">
              <Slider
                value={[settings.pxPerSec]}
                onValueChange={(values) => setSettings(prev => ({ ...prev, pxPerSec: values[0] }))}
                min={10}
                max={1000}
                step={1}
                className="flex-1"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSettings(prev => ({ ...prev, pxPerSec: Math.min(1000, prev.pxPerSec * 1.5) }))}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Settings Panel */}
          <div className="relative">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={settingsOpen ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSettingsOpen(!settingsOpen)}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Timeline Settings</p>
              </TooltipContent>
            </Tooltip>

            {settingsOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-card border rounded-lg shadow-lg p-4 z-50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">Timeline Settings</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSettingsOpen(false)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-0">
                  {[
                    {
                      id: 'timeSelection',
                      label: 'Time Selection Tool',
                      description: 'Enable Shift+click & drag to select time ranges',
                      enabled: settings.enableTimeSelection,
                      toggle: () => setSettings(prev => ({ ...prev, enableTimeSelection: !prev.enableTimeSelection })),
                    },
                    {
                      id: 'playheadSync',
                      label: 'Playhead Auto-Scroll',
                      description: 'Auto-scroll timeline to follow playhead during playback',
                      enabled: settings.enablePlayheadSync,
                      toggle: () => setSettings(prev => ({ ...prev, enablePlayheadSync: !prev.enablePlayheadSync })),
                    },
                    {
                      id: 'clipAnimations',
                      label: 'Clip Animations',
                      description: 'Enable hover and transition animations on clips',
                      enabled: settings.enableClipAnimations,
                      toggle: () => setSettings(prev => ({ ...prev, enableClipAnimations: !prev.enableClipAnimations })),
                    },
                  ].map((setting, index, array) => (
                    <div key={setting.id}>
                      <div className="grid grid-cols-[20px_1fr] gap-3 items-start py-3">
                        <div className="flex justify-center pt-0.5">
                          <Checkbox
                            id={setting.id}
                            checked={setting.enabled}
                            onCheckedChange={setting.toggle}
                          />
                        </div>
                        <div className="min-w-0">
                          <Label
                            htmlFor={setting.id}
                            className="text-sm font-medium cursor-pointer leading-none block"
                          >
                            {setting.label}
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                            {setting.description}
                          </p>
                        </div>
                      </div>
                      {index < array.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Timeline Content */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <div className="flex-1 flex overflow-hidden" ref={containerRef}>
            {/* Track Labels */}
            <div className="w-48 bg-muted/30 border-r overflow-y-auto overflow-x-hidden flex-shrink-0">
              <div>
                {tracks
                  .filter((track) => track.visible)
                  .map((track) => (
                    <div
                      key={track.id}
                      className="flex items-center px-3 border-b text-sm font-medium"
                      style={{ height: track.height }}
                    >
                      <div className="w-2 h-2 rounded-full bg-primary mr-2" />
                      {track.name}
                    </div>
                  ))}
              </div>
            </div>

            {/* Track Content */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-auto cursor-pointer relative"
              style={{
                backgroundColor: 'hsl(var(--muted) / 0.1)',
                scrollbarWidth: 'thin'
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();

                if (scrollContainerRef.current) {
                  containerRectRef.current = scrollContainerRef.current.getBoundingClientRect();
                }

                const rect = scrollContainerRef.current?.getBoundingClientRect();
                if (!rect) return;

                const scrollLeft = scrollContainerRef.current?.scrollLeft || 0;
                const relativeX = e.clientX - rect.left + scrollLeft;
                const time = relativeX / settings.pxPerSec;
                const clampedTime = Math.max(0, Math.min(duration, time));

                // Check if Shift is pressed and time selection is enabled
                if (e.shiftKey && settings.enableTimeSelection) {
                  // Start selection
                  setIsSelecting(true);
                  setSelectionStart(clampedTime);
                  setSelection({ start: clampedTime, end: clampedTime });
                } else {
                  // Normal seeking - also clears any existing selection
                  setSelection(null);
                  setIsDraggingPlayhead(true);
                  handlePlayheadSeek(e.clientX, false);
                }

                document.body.style.pointerEvents = 'none';
                e.currentTarget.style.pointerEvents = 'auto';
              }}
            >
              <div className="relative" style={{ width: totalContentWidth }}>
                {/* Playhead line */}
                <div
                  ref={playheadLineRef}
                  className={cn(
                    "absolute top-0 bottom-0 w-1 z-30 shadow-lg",
                    isDraggingPlayhead
                      ? "cursor-grabbing"
                      : "cursor-grab hover:w-1.5"
                  )}
                  style={{
                    left: `${currentTime * settings.pxPerSec}px`,
                    backgroundColor: 'hsl(217 91% 60%)',
                    display: 'block',
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (scrollContainerRef.current) {
                      containerRectRef.current = scrollContainerRef.current.getBoundingClientRect();
                    }

                    setIsDraggingPlayhead(true);
                    const rect = scrollContainerRef.current?.getBoundingClientRect();
                    if (rect) {
                      const scrollLeft = scrollContainerRef.current?.scrollLeft || 0;
                      const relativeX = e.clientX - rect.left + scrollLeft;
                      const time = relativeX / settings.pxPerSec;
                      const clampedTime = Math.max(0, Math.min(duration, time));

                      dragTimeRef.current = clampedTime;
                      if (playheadLineRef.current) {
                        const newLeft = clampedTime * settings.pxPerSec;
                        playheadLineRef.current.style.left = `${newLeft}px`;
                        playheadLineRef.current.style.transition = 'none';
                      }
                    }

                    document.body.style.pointerEvents = 'none';
                    e.currentTarget.style.pointerEvents = 'auto';
                  }}
                  title={`Playhead: ${formatTime(currentTime, true)}`}
                />
                {tracks.map((track) => (
                  <div
                    key={track.id}
                    className="border-b relative timeline-track"
                    style={{ height: track.height }}
                  >
                    {track.items.map((item) => {
                      const left = item.start * settings.pxPerSec;
                      const width = (item.end - item.start) * settings.pxPerSec;

                      return (
                        <div
                          key={item.id}
                          className={cn(
                            'absolute flex items-center justify-between rounded border',
                            'min-w-2 min-h-6 px-2 select-none cursor-pointer',
                            settings.enableClipAnimations && 'transition-all duration-150 hover:brightness-110'
                          )}
                          style={{
                            left: `${left}px`,
                            width: `${width}px`,
                            height: `${Math.min(track.height - 8, 36)}px`,
                            top: '4px',
                            backgroundColor: item.color,
                            borderColor: item.color,
                          }}
                        >
                          <span className="text-xs font-medium text-white truncate">
                            {item.name}
                          </span>
                          <div className="text-[10px] text-white/80 ml-1 font-mono">
                            {formatTime(item.duration)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}

                {/* Selection overlay */}
                {selection && (
                  <div
                    className="absolute top-0 bottom-0 border-l-2 border-r-2 pointer-events-none z-10"
                    style={{
                      left: `${selection.start * settings.pxPerSec}px`,
                      width: `${(selection.end - selection.start) * settings.pxPerSec}px`,
                      backgroundColor: 'hsl(217 91% 60% / 0.15)',
                      borderColor: 'hsl(217 91% 60%)',
                    }}
                  />
                )}

                {/* Loop overlay */}
                {loop && (
                  <div
                    className="absolute top-0 bottom-0 border-l-2 border-r-2 border-dashed pointer-events-none z-10"
                    style={{
                      left: `${loop.start * settings.pxPerSec}px`,
                      width: `${(loop.end - loop.start) * settings.pxPerSec}px`,
                      borderColor: 'hsl(217 91% 60%)',
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="h-8 px-3 bg-muted/50 border-t flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Zoom: {Math.round(settings.pxPerSec)}px/s</span>
            {selection ? (
              <div className="flex items-center gap-2">
                <span>Selection: {(selection.end - selection.start).toFixed(1)}s</span>
                <button
                  onClick={() => setSelection(null)}
                  className="px-1.5 py-0.5 rounded text-xs hover:bg-muted"
                >
                  Clear
                </button>
              </div>
            ) : (
              <span>
                {settings.enableTimeSelection ? 'Shift+drag to select' : 'Selection: None'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span>{tracks.filter(t => t.visible).length} tracks</span>
            <span>{Math.round(duration)}s</span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}


code.demo.1758901531347.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Timeline, TimelineTrack } from '@/components/ui/timeline-1';
import { createTimeline } from '@/lib/utils';
import { Github, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TimelineDemo() {
  const [tracks, setTracks] = useState<TimelineTrack[]>([
    {
      id: 'empty-video',
      name: 'Video Track',
      type: 'video',
      height: 60,
      visible: true,
      items: [],
    },
    {
      id: 'empty-audio',
      name: 'Audio Track',
      type: 'audio',
      height: 60,
      visible: true,
      items: [],
    },
  ]);
  const [duration, setDuration] = useState(30);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoadingExample, setIsLoadingExample] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleLoadExample = () => {
    setIsLoadingExample(true);

    const randomComplexity = Math.max(2, Math.floor(Math.random() * 6));
    const randomDuration = 60 + Math.random() * 240;
    const randomSeed = Math.floor(Math.random() * 1000000);

    const generatedTimeline = createTimeline({
      complexity: randomComplexity,
      duration: randomDuration,
      seed: randomSeed,
    });

    setTracks(generatedTimeline.tracks);
    setDuration(generatedTimeline.duration);
    setCurrentTime(0);
    setIsLoadingExample(false);
  };

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-background transition-colors">
      {/* Header */}
      <header className="relative z-10 flex flex-wrap items-center justify-between gap-6 px-6 pb-4 pt-6 sm:px-8">
        <div>
          <h1 className="text-3xl font-bold">Timeline Component</h1>
          <p className="mt-2 text-muted-foreground">
            Professional timeline for video editing and media management
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="gap-2">
            <a href="https://github.com/nparashar150/21st" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-1 flex-col gap-4 px-6 pb-6 sm:px-8">
        {/* Timeline Container */}
          <Timeline
            tracks={tracks}
            duration={duration}
            onTimeUpdate={setCurrentTime}
            onTracksChange={setTracks}
            onDurationChange={setDuration}
            showLoadExample
            onLoadExample={handleLoadExample}
            isLoadingExample={isLoadingExample}
            className="border-0 h-full"
          />

        {/* Info Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border bg-card p-4">
              <p className="text-sm font-medium text-muted-foreground">Current Time</p>
              <p className="mt-1 text-2xl font-bold">{currentTime.toFixed(2)}s</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="text-sm font-medium text-muted-foreground">Total Tracks</p>
              <p className="mt-1 text-2xl font-bold">{tracks.length}</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="text-sm font-medium text-muted-foreground">Duration</p>
              <p className="mt-1 text-2xl font-bold">{Math.round(duration)}s</p>
            </div>
          </div>
      </main>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/timeline-1.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn, formatTime } from '@/lib/utils';
import {
    Shuffle,
    Grid3X3,
    Loader2,
    Pause,
    Play,
    Repeat,
    Settings,
    SkipBack,
    SkipForward,
    X,
    ZoomIn,
    ZoomOut,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

// Types
export interface TimelineTrack {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'transcript' | 'markers' | 'assets';
  height: number;
  visible: boolean;
  items: TimelineItem[];
}

export interface TimelineItem {
  id: string;
  name: string;
  start: number;
  end: number;
  duration: number;
  type: string;
  color: string;
  properties?: Record<string, unknown>;
}

export interface TimelineProps {
  tracks: TimelineTrack[];
  duration: number;
  className?: string;
  height?: number;
  onTimeUpdate?: (time: number) => void;
  onTracksChange?: (tracks: TimelineTrack[]) => void;
  onDurationChange?: (duration: number) => void;
  showLoadExample?: boolean;
  onLoadExample?: () => void;
  isLoadingExample?: boolean;
}

export function Timeline({
  tracks,
  duration,
  className,
  height = 400,
  onTimeUpdate,
  onTracksChange,
  onDurationChange,
  showLoadExample = false,
  onLoadExample,
  isLoadingExample = false,
}: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const playheadLineRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const lastUpdateTimeRef = useRef<number>(0);
  const containerRectRef = useRef<DOMRect | null>(null);

  // State
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDraggingPlayhead, setIsDraggingPlayhead] = useState(false);
  const [selection, setSelection] = useState<{ start: number; end: number } | null>(null);
  const [loop, setLoop] = useState<{ start: number; end: number } | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState(0);

  const dragTimeRef = useRef<number>(currentTime);

  // Timeline settings
  const [settings, setSettings] = useState({
    enableTimeSelection: false,
    enablePlayheadSync: true,
    enableClipAnimations: false,
    snapToGrid: true,
    playbackSpeed: 1,
    pxPerSec: 50,
  });

  // Update container width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setContainerWidth(width);
      }
    };

    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [settings.pxPerSec]);

  // Handle playhead seeking
  const handleSeek = useCallback((time: number) => {
    const clampedTime = Math.max(0, Math.min(duration, time));
    setCurrentTime(clampedTime);
    onTimeUpdate?.(clampedTime);
  }, [duration, onTimeUpdate]);

  const handlePlayheadSeek = useCallback(
    (clientX: number, updateState = false) => {
      if (!containerRectRef.current || !playheadLineRef.current) return;

      const scrollLeft = scrollContainerRef.current?.scrollLeft || 0;
      const relativeX = clientX - containerRectRef.current.left + scrollLeft;
      const time = relativeX / settings.pxPerSec;
      const clampedTime = Math.max(0, Math.min(duration, time));

      dragTimeRef.current = clampedTime;

      const newLeft = clampedTime * settings.pxPerSec;
      playheadLineRef.current.style.left = `${newLeft}px`;
      playheadLineRef.current.style.transition = 'none';

      if (updateState) {
        setCurrentTime(clampedTime);
        onTimeUpdate?.(clampedTime);
      }
    },
    [settings.pxPerSec, duration, onTimeUpdate]
  );

  const handlePlayheadMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDraggingPlayhead && containerRectRef.current && playheadLineRef.current) {
        const rect = containerRectRef.current;
        const scrollLeft = scrollContainerRef.current?.scrollLeft || 0;
        const relativeX = event.clientX - rect.left + scrollLeft;
        const time = relativeX / settings.pxPerSec;
        const clampedTime = Math.max(0, Math.min(duration, time));

        dragTimeRef.current = clampedTime;

        const newLeft = clampedTime * settings.pxPerSec;
        playheadLineRef.current.style.left = `${newLeft}px`;
      } else if (isSelecting && containerRectRef.current && settings.enableTimeSelection) {
        // Handle selection dragging
        const rect = containerRectRef.current;
        const scrollLeft = scrollContainerRef.current?.scrollLeft || 0;
        const relativeX = event.clientX - rect.left + scrollLeft;
        const time = relativeX / settings.pxPerSec;
        const clampedTime = Math.max(0, Math.min(duration, time));

        const start = Math.min(selectionStart, clampedTime);
        const end = Math.max(selectionStart, clampedTime);

        if (end - start > 0.1) { // Minimum selection of 0.1s
          setSelection({ start, end });
        }
      }
    },
    [isDraggingPlayhead, isSelecting, settings.pxPerSec, settings.enableTimeSelection, duration, selectionStart]
  );

  const handlePlayheadMouseUp = useCallback(() => {
    if (isDraggingPlayhead) {
      setIsDraggingPlayhead(false);
      containerRectRef.current = null;

      if (playheadLineRef.current) {
        playheadLineRef.current.style.transition = '';
      }

      document.body.style.pointerEvents = '';

      setCurrentTime(dragTimeRef.current);
      onTimeUpdate?.(dragTimeRef.current);
    }

    if (isSelecting) {
      setIsSelecting(false);
      containerRectRef.current = null;
      document.body.style.pointerEvents = '';
    }
  }, [isDraggingPlayhead, isSelecting, onTimeUpdate]);

  // Time progression logic
  const updateTime = useCallback(() => {
    if (!isPlaying) return;

    const now = performance.now();
    const deltaTime = (now - lastUpdateTimeRef.current) / 1000;
    lastUpdateTimeRef.current = now;

    const newTime = currentTime + deltaTime * settings.playbackSpeed;

    if (loop && newTime >= loop.end) {
      setCurrentTime(loop.start);
      onTimeUpdate?.(loop.start);
    } else if (newTime >= duration) {
      setCurrentTime(duration);
      setIsPlaying(false);
      return;
    } else {
      setCurrentTime(newTime);
      onTimeUpdate?.(newTime);
    }

    rafRef.current = requestAnimationFrame(updateTime);
  }, [isPlaying, currentTime, duration, loop, settings.playbackSpeed, onTimeUpdate]);

  // Auto-scroll to follow playhead
  useEffect(() => {
    if (settings.enablePlayheadSync && isPlaying && scrollContainerRef.current) {
      const playheadPosition = currentTime * settings.pxPerSec;
      const containerWidth = scrollContainerRef.current.clientWidth;
      const scrollLeft = scrollContainerRef.current.scrollLeft;

      if (playheadPosition < scrollLeft + 50 || playheadPosition > scrollLeft + containerWidth - 50) {
        scrollContainerRef.current.scrollTo({
          left: playheadPosition - containerWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [currentTime, settings.enablePlayheadSync, settings.pxPerSec, isPlaying]);

  // Mouse event listeners for dragging
  useEffect(() => {
    if (isDraggingPlayhead || isSelecting) {
      document.addEventListener('mousemove', handlePlayheadMouseMove);
      document.addEventListener('mouseup', handlePlayheadMouseUp);
      return () => {
        document.removeEventListener('mousemove', handlePlayheadMouseMove);
        document.removeEventListener('mouseup', handlePlayheadMouseUp);
      };
    }
  }, [isDraggingPlayhead, isSelecting, handlePlayheadMouseMove, handlePlayheadMouseUp]);

  // Keyboard event listener for Escape key to clear selection
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selection) {
        setSelection(null);
        setIsSelecting(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selection]);

  // Keep dragTimeRef in sync with currentTime when not dragging
  useEffect(() => {
    if (!isDraggingPlayhead) {
      dragTimeRef.current = currentTime;
    }
  }, [currentTime, isDraggingPlayhead]);

  // Start/stop animation loop
  useEffect(() => {
    if (isPlaying) {
      lastUpdateTimeRef.current = performance.now();
      rafRef.current = requestAnimationFrame(updateTime);
    } else {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isPlaying, updateTime]);

  // Calculate total content width
  const totalContentWidth = Math.max(
    duration * settings.pxPerSec,
    containerWidth || 800
  );

  return (
    <TooltipProvider>
      <div
        className={cn(
          'flex flex-col bg-card border rounded-lg overflow-hidden shadow-sm',
          className
        )}
        style={{ height }}
      >
        {/* Controls */}
        <div className="flex items-center gap-3 p-3 bg-muted/30 border-b">
          {showLoadExample && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onLoadExample}
                    disabled={isLoadingExample}
                  >
                    {isLoadingExample ? (
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    ) : (
                      <Shuffle className="h-4 w-4 mr-1" />
                    )}
                    {isLoadingExample ? 'Generating...' : 'Generate Random'}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Generate random timeline with multiple tracks and clips</p>
                </TooltipContent>
              </Tooltip>
              <Separator orientation="vertical" className="h-6" />
            </>
          )}

          <div className="flex items-center gap-1 h-6">
            <Button variant="ghost" size="sm" onClick={() => handleSeek(Math.max(0, currentTime - 10))}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleSeek(Math.min(duration, currentTime + 10))}>
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center gap-2 text-sm font-mono h-6">
            <span>{formatTime(currentTime, true)}</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{formatTime(duration)}</span>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center gap-2 h-6">
            <span className="text-xs text-muted-foreground">Speed:</span>
            <div className="w-20 flex items-center">
              <Slider
                value={[settings.playbackSpeed]}
                onValueChange={(values) => setSettings(prev => ({ ...prev, playbackSpeed: values[0] }))}
                min={0.25}
                max={2}
                step={0.25}
                className="flex-1"
              />
            </div>
            <span className="text-xs w-8 text-center">{settings.playbackSpeed}x</span>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={loop ? 'default' : 'ghost'}
                size="sm"
                onClick={() => {
                  if (loop) {
                    setLoop(null);
                  } else if (selection) {
                    setLoop(selection);
                  }
                }}
                disabled={!settings.enableTimeSelection}
              >
                <Repeat className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {!settings.enableTimeSelection
                  ? 'Enable Time Selection in settings to use loop'
                  : loop
                    ? 'Disable loop'
                    : 'Loop selected time range'
                }
              </p>
            </TooltipContent>
          </Tooltip>

          <Button
            variant={settings.snapToGrid ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSettings(prev => ({ ...prev, snapToGrid: !prev.snapToGrid }))}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center gap-1 h-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSettings(prev => ({ ...prev, pxPerSec: Math.max(10, prev.pxPerSec / 1.5) }))}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <div className="w-24 flex items-center">
              <Slider
                value={[settings.pxPerSec]}
                onValueChange={(values) => setSettings(prev => ({ ...prev, pxPerSec: values[0] }))}
                min={10}
                max={1000}
                step={1}
                className="flex-1"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSettings(prev => ({ ...prev, pxPerSec: Math.min(1000, prev.pxPerSec * 1.5) }))}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Settings Panel */}
          <div className="relative">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={settingsOpen ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSettingsOpen(!settingsOpen)}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Timeline Settings</p>
              </TooltipContent>
            </Tooltip>

            {settingsOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-card border rounded-lg shadow-lg p-4 z-50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">Timeline Settings</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSettingsOpen(false)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-0">
                  {[
                    {
                      id: 'timeSelection',
                      label: 'Time Selection Tool',
                      description: 'Enable Shift+click & drag to select time ranges',
                      enabled: settings.enableTimeSelection,
                      toggle: () => setSettings(prev => ({ ...prev, enableTimeSelection: !prev.enableTimeSelection })),
                    },
                    {
                      id: 'playheadSync',
                      label: 'Playhead Auto-Scroll',
                      description: 'Auto-scroll timeline to follow playhead during playback',
                      enabled: settings.enablePlayheadSync,
                      toggle: () => setSettings(prev => ({ ...prev, enablePlayheadSync: !prev.enablePlayheadSync })),
                    },
                    {
                      id: 'clipAnimations',
                      label: 'Clip Animations',
                      description: 'Enable hover and transition animations on clips',
                      enabled: settings.enableClipAnimations,
                      toggle: () => setSettings(prev => ({ ...prev, enableClipAnimations: !prev.enableClipAnimations })),
                    },
                  ].map((setting, index, array) => (
                    <div key={setting.id}>
                      <div className="grid grid-cols-[20px_1fr] gap-3 items-start py-3">
                        <div className="flex justify-center pt-0.5">
                          <Checkbox
                            id={setting.id}
                            checked={setting.enabled}
                            onCheckedChange={setting.toggle}
                          />
                        </div>
                        <div className="min-w-0">
                          <Label
                            htmlFor={setting.id}
                            className="text-sm font-medium cursor-pointer leading-none block"
                          >
                            {setting.label}
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                            {setting.description}
                          </p>
                        </div>
                      </div>
                      {index < array.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Timeline Content */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <div className="flex-1 flex overflow-hidden" ref={containerRef}>
            {/* Track Labels */}
            <div className="w-48 bg-muted/30 border-r overflow-y-auto overflow-x-hidden flex-shrink-0">
              <div>
                {tracks
                  .filter((track) => track.visible)
                  .map((track) => (
                    <div
                      key={track.id}
                      className="flex items-center px-3 border-b text-sm font-medium"
                      style={{ height: track.height }}
                    >
                      <div className="w-2 h-2 rounded-full bg-primary mr-2" />
                      {track.name}
                    </div>
                  ))}
              </div>
            </div>

            {/* Track Content */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-auto cursor-pointer relative"
              style={{
                backgroundColor: 'hsl(var(--muted) / 0.1)',
                scrollbarWidth: 'thin'
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();

                if (scrollContainerRef.current) {
                  containerRectRef.current = scrollContainerRef.current.getBoundingClientRect();
                }

                const rect = scrollContainerRef.current?.getBoundingClientRect();
                if (!rect) return;

                const scrollLeft = scrollContainerRef.current?.scrollLeft || 0;
                const relativeX = e.clientX - rect.left + scrollLeft;
                const time = relativeX / settings.pxPerSec;
                const clampedTime = Math.max(0, Math.min(duration, time));

                // Check if Shift is pressed and time selection is enabled
                if (e.shiftKey && settings.enableTimeSelection) {
                  // Start selection
                  setIsSelecting(true);
                  setSelectionStart(clampedTime);
                  setSelection({ start: clampedTime, end: clampedTime });
                } else {
                  // Normal seeking - also clears any existing selection
                  setSelection(null);
                  setIsDraggingPlayhead(true);
                  handlePlayheadSeek(e.clientX, false);
                }

                document.body.style.pointerEvents = 'none';
                e.currentTarget.style.pointerEvents = 'auto';
              }}
            >
              <div className="relative" style={{ width: totalContentWidth }}>
                {/* Playhead line */}
                <div
                  ref={playheadLineRef}
                  className={cn(
                    "absolute top-0 bottom-0 w-1 z-30 shadow-lg",
                    isDraggingPlayhead
                      ? "cursor-grabbing"
                      : "cursor-grab hover:w-1.5"
                  )}
                  style={{
                    left: `${currentTime * settings.pxPerSec}px`,
                    backgroundColor: 'hsl(217 91% 60%)',
                    display: 'block',
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (scrollContainerRef.current) {
                      containerRectRef.current = scrollContainerRef.current.getBoundingClientRect();
                    }

                    setIsDraggingPlayhead(true);
                    const rect = scrollContainerRef.current?.getBoundingClientRect();
                    if (rect) {
                      const scrollLeft = scrollContainerRef.current?.scrollLeft || 0;
                      const relativeX = e.clientX - rect.left + scrollLeft;
                      const time = relativeX / settings.pxPerSec;
                      const clampedTime = Math.max(0, Math.min(duration, time));

                      dragTimeRef.current = clampedTime;
                      if (playheadLineRef.current) {
                        const newLeft = clampedTime * settings.pxPerSec;
                        playheadLineRef.current.style.left = `${newLeft}px`;
                        playheadLineRef.current.style.transition = 'none';
                      }
                    }

                    document.body.style.pointerEvents = 'none';
                    e.currentTarget.style.pointerEvents = 'auto';
                  }}
                  title={`Playhead: ${formatTime(currentTime, true)}`}
                />
                {tracks.map((track) => (
                  <div
                    key={track.id}
                    className="border-b relative timeline-track"
                    style={{ height: track.height }}
                  >
                    {track.items.map((item) => {
                      const left = item.start * settings.pxPerSec;
                      const width = (item.end - item.start) * settings.pxPerSec;

                      return (
                        <div
                          key={item.id}
                          className={cn(
                            'absolute flex items-center justify-between rounded border',
                            'min-w-2 min-h-6 px-2 select-none cursor-pointer',
                            settings.enableClipAnimations && 'transition-all duration-150 hover:brightness-110'
                          )}
                          style={{
                            left: `${left}px`,
                            width: `${width}px`,
                            height: `${Math.min(track.height - 8, 36)}px`,
                            top: '4px',
                            backgroundColor: item.color,
                            borderColor: item.color,
                          }}
                        >
                          <span className="text-xs font-medium text-white truncate">
                            {item.name}
                          </span>
                          <div className="text-[10px] text-white/80 ml-1 font-mono">
                            {formatTime(item.duration)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}

                {/* Selection overlay */}
                {selection && (
                  <div
                    className="absolute top-0 bottom-0 border-l-2 border-r-2 pointer-events-none z-10"
                    style={{
                      left: `${selection.start * settings.pxPerSec}px`,
                      width: `${(selection.end - selection.start) * settings.pxPerSec}px`,
                      backgroundColor: 'hsl(217 91% 60% / 0.15)',
                      borderColor: 'hsl(217 91% 60%)',
                    }}
                  />
                )}

                {/* Loop overlay */}
                {loop && (
                  <div
                    className="absolute top-0 bottom-0 border-l-2 border-r-2 border-dashed pointer-events-none z-10"
                    style={{
                      left: `${loop.start * settings.pxPerSec}px`,
                      width: `${(loop.end - loop.start) * settings.pxPerSec}px`,
                      borderColor: 'hsl(217 91% 60%)',
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="h-8 px-3 bg-muted/50 border-t flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Zoom: {Math.round(settings.pxPerSec)}px/s</span>
            {selection ? (
              <div className="flex items-center gap-2">
                <span>Selection: {(selection.end - selection.start).toFixed(1)}s</span>
                <button
                  onClick={() => setSelection(null)}
                  className="px-1.5 py-0.5 rounded text-xs hover:bg-muted"
                >
                  Clear
                </button>
              </div>
            ) : (
              <span>
                {settings.enableTimeSelection ? 'Shift+drag to select' : 'Selection: None'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span>{tracks.filter(t => t.visible).length} tracks</span>
            <span>{Math.round(duration)}s</span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

```

Install NPM dependencies:
```bash
lucide-react
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
