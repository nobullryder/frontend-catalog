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
zoom.tsx
// components/ui/component.tsx
/* eslint react/jsx-handler-names: "off" */
import React, { useState, useMemo, useRef } from 'react';
import { interpolateRainbow } from 'd3-scale-chromatic';
import { Zoom } from '@visx/zoom';
import { localPoint } from '@visx/event'; 
import { RectClipPath } from '@visx/clip-path'; 
import {
  genPhyllotaxis, 
  GenPhyllotaxisFunction,
  PhyllotaxisPoint,
} from '@visx/mock-data';
import { scaleLinear } from '@visx/scale';

const bg = '#0a0a0a';
const points = [...new Array(1000)];

const colorScale = scaleLinear<number>({ range: [0, 1], domain: [0, 1000] });
const sizeScale = scaleLinear<number>({ domain: [0, 600], range: [0.5, 8] });

const initialTransform = {
  scaleX: 1.27,
  scaleY: 1.27,
  translateX: -211.62,
  translateY: 162.59,
  skewX: 0,
  skewY: 0,
};

export type ComponentProps = {
  width: number;
  height: number;
};

export const Component = ({ width, height }: ComponentProps) => {
  const [showMiniMap, setShowMiniMap] = useState<boolean>(true);

  const generator: GenPhyllotaxisFunction = genPhyllotaxis({ radius: 10, width, height });
  const phyllotaxis: PhyllotaxisPoint[] = points.map((d, i) => generator(i));

  return width < 10 || height < 10 ? null : (
    <>
      <Zoom<SVGSVGElement>
        width={width}
        height={height}
        scaleXMin={1 / 2}
        scaleXMax={4}
        scaleYMin={1 / 2}
        scaleYMax={4}
        initialTransformMatrix={initialTransform}
      >
        {(zoom) => (
          <div className="relative">
            <svg
              width={width}
              height={height}
              style={{ cursor: zoom.isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
              ref={zoom.containerRef}
            >
              <RectClipPath id="zoom-clip" width={width} height={height} />
              <rect width={width} height={height} rx={14} fill={bg} />
              <g transform={zoom.toString()}>
                {phyllotaxis.map(({ x, y }, i) => (
                  <React.Fragment key={`dot-${i}`}>
                    <circle
                      cx={x}
                      cy={y}
                      r={i > 500 ? sizeScale(1000 - i) : sizeScale(i)}
                      fill={interpolateRainbow(colorScale(i) ?? 0)}
                    />
                  </React.Fragment>
                ))}
              </g>
              <rect
                width={width}
                height={height}
                rx={14}
                fill="transparent"
                onTouchStart={zoom.dragStart}
                onTouchMove={zoom.dragMove}
                onTouchEnd={zoom.dragEnd}
                onMouseDown={zoom.dragStart}
                onMouseMove={zoom.dragMove}
                onMouseUp={zoom.dragEnd}
                onMouseLeave={() => {
                  if (zoom.isDragging) zoom.dragEnd();
                }}
                onDoubleClick={(event) => {
                  const point = localPoint(event) || { x: 0, y: 0 };
                  zoom.scale({ scaleX: 1.1, scaleY: 1.1, point });
                }}
              />
              {showMiniMap && (
                <g
                  clipPath="url(#zoom-clip)"
                  transform={`
                    scale(0.25)
                    translate(${width * 4 - width - 60}, ${height * 4 - height - 60})
                  `}
                >
                  <rect width={width} height={height} fill="#1a1a1a" />
                  {phyllotaxis.map(({ x, y }, i) => (
                    <React.Fragment key={`dot-sm-${i}`}>
                      <circle
                        cx={x}
                        cy={y}
                        r={i > 500 ? sizeScale(1000 - i) : sizeScale(i)}
                        fill={interpolateRainbow(colorScale(i) ?? 0)}
                      />
                    </React.Fragment>
                  ))}
                  <rect
                    width={width}
                    height={height}
                    fill="white"
                    fillOpacity={0.2}
                    stroke="white"
                    strokeWidth={4}
                    transform={zoom.toStringInvert()}
                  />
                </g>
              )}
            </svg>
            <div className="controls">
              <button
                type="button"
                className="btn btn-zoom"
                onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}
              >
                +
              </button>
              <button
                type="button"
                className="btn btn-zoom btn-bottom"
                onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}
              >
                -
              </button>
              <button type="button" className="btn btn-lg" onClick={zoom.center}>
                Center
              </button>
              <button type="button" className="btn btn-lg" onClick={zoom.reset}>
                Reset
              </button>
              <button type="button" className="btn btn-lg" onClick={zoom.clear}>
                Clear
              </button>
            </div>
            <div className="mini-map">
              <button
                type="button"
                className="btn btn-lg"
                onClick={() => setShowMiniMap(!showMiniMap)}
              >
                {showMiniMap ? 'Hide' : 'Show'} Mini Map
              </button>
            </div>
          </div>
        )}
      </Zoom>
      <div className="description">
        Based on Mike Bostock's{' '}
        <a href="https://bl.ocks.org/mbostock/4e3925cdc804db257a86fdef3a032a45" target="_blank" rel="noopener noreferrer">Pan & Zoom III</a>
      </div>
      <style jsx>{`
        .btn {
          margin: 0;
          text-align: center;
          border: none;
          background: #2f2f2f;
          color: #888;
          padding: 0 4px;
          border-top: 1px solid #0a0a0a;
        }
        .btn-lg {
          font-size: 12px;
          line-height: 1;
          padding: 4px;
        }
        .btn-zoom {
          width: 26px;
          font-size: 22px;
        }
        .btn-bottom {
          margin-bottom: 1rem;
        }
        .description {
          font-size: 12px;
          margin-right: 0.25rem;
        }
        .controls {
          position: absolute;
          top: 15px;
          right: 15px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .mini-map {
          position: absolute;
          bottom: 25px;
          right: 15px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .relative {
          position: relative;
        }
      `}</style>
    </>
  );
}

code.demo.1747927770786.tsx
// DemoOne.tsx
import React, { useState, useEffect } from "react";
import { Component } from "@/components/ui/zoom";
import { cn } from "@/lib/utils";

const DemoOne = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const chartWidth = dimensions.width;
  const chartHeight = dimensions.height;

  if (chartWidth === 0 || chartHeight === 0) {
    return (
      <div className={cn("flex w-screen h-screen justify-center items-center bg-gray-900 text-white")}>
        Загрузка...
      </div>
    );
  }

  return (
    <div className={cn("w-screen h-screen overflow-hidden bg-gray-800 flex justify-center items-center")}>
      <Component
        width={chartWidth}
        height={chartHeight}
      />
    </div>
  );
};

export { DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/zoom.tsx
// components/ui/component.tsx
/* eslint react/jsx-handler-names: "off" */
import React, { useState, useMemo, useRef } from 'react';
import { interpolateRainbow } from 'd3-scale-chromatic';
import { Zoom } from '@visx/zoom';
import { localPoint } from '@visx/event'; 
import { RectClipPath } from '@visx/clip-path'; 
import {
  genPhyllotaxis, 
  GenPhyllotaxisFunction,
  PhyllotaxisPoint,
} from '@visx/mock-data';
import { scaleLinear } from '@visx/scale';

const bg = '#0a0a0a';
const points = [...new Array(1000)];

const colorScale = scaleLinear<number>({ range: [0, 1], domain: [0, 1000] });
const sizeScale = scaleLinear<number>({ domain: [0, 600], range: [0.5, 8] });

const initialTransform = {
  scaleX: 1.27,
  scaleY: 1.27,
  translateX: -211.62,
  translateY: 162.59,
  skewX: 0,
  skewY: 0,
};

export type ComponentProps = {
  width: number;
  height: number;
};

export const Component = ({ width, height }: ComponentProps) => {
  const [showMiniMap, setShowMiniMap] = useState<boolean>(true);

  const generator: GenPhyllotaxisFunction = genPhyllotaxis({ radius: 10, width, height });
  const phyllotaxis: PhyllotaxisPoint[] = points.map((d, i) => generator(i));

  return width < 10 || height < 10 ? null : (
    <>
      <Zoom<SVGSVGElement>
        width={width}
        height={height}
        scaleXMin={1 / 2}
        scaleXMax={4}
        scaleYMin={1 / 2}
        scaleYMax={4}
        initialTransformMatrix={initialTransform}
      >
        {(zoom) => (
          <div className="relative">
            <svg
              width={width}
              height={height}
              style={{ cursor: zoom.isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
              ref={zoom.containerRef}
            >
              <RectClipPath id="zoom-clip" width={width} height={height} />
              <rect width={width} height={height} rx={14} fill={bg} />
              <g transform={zoom.toString()}>
                {phyllotaxis.map(({ x, y }, i) => (
                  <React.Fragment key={`dot-${i}`}>
                    <circle
                      cx={x}
                      cy={y}
                      r={i > 500 ? sizeScale(1000 - i) : sizeScale(i)}
                      fill={interpolateRainbow(colorScale(i) ?? 0)}
                    />
                  </React.Fragment>
                ))}
              </g>
              <rect
                width={width}
                height={height}
                rx={14}
                fill="transparent"
                onTouchStart={zoom.dragStart}
                onTouchMove={zoom.dragMove}
                onTouchEnd={zoom.dragEnd}
                onMouseDown={zoom.dragStart}
                onMouseMove={zoom.dragMove}
                onMouseUp={zoom.dragEnd}
                onMouseLeave={() => {
                  if (zoom.isDragging) zoom.dragEnd();
                }}
                onDoubleClick={(event) => {
                  const point = localPoint(event) || { x: 0, y: 0 };
                  zoom.scale({ scaleX: 1.1, scaleY: 1.1, point });
                }}
              />
              {showMiniMap && (
                <g
                  clipPath="url(#zoom-clip)"
                  transform={`
                    scale(0.25)
                    translate(${width * 4 - width - 60}, ${height * 4 - height - 60})
                  `}
                >
                  <rect width={width} height={height} fill="#1a1a1a" />
                  {phyllotaxis.map(({ x, y }, i) => (
                    <React.Fragment key={`dot-sm-${i}`}>
                      <circle
                        cx={x}
                        cy={y}
                        r={i > 500 ? sizeScale(1000 - i) : sizeScale(i)}
                        fill={interpolateRainbow(colorScale(i) ?? 0)}
                      />
                    </React.Fragment>
                  ))}
                  <rect
                    width={width}
                    height={height}
                    fill="white"
                    fillOpacity={0.2}
                    stroke="white"
                    strokeWidth={4}
                    transform={zoom.toStringInvert()}
                  />
                </g>
              )}
            </svg>
            <div className="controls">
              <button
                type="button"
                className="btn btn-zoom"
                onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}
              >
                +
              </button>
              <button
                type="button"
                className="btn btn-zoom btn-bottom"
                onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}
              >
                -
              </button>
              <button type="button" className="btn btn-lg" onClick={zoom.center}>
                Center
              </button>
              <button type="button" className="btn btn-lg" onClick={zoom.reset}>
                Reset
              </button>
              <button type="button" className="btn btn-lg" onClick={zoom.clear}>
                Clear
              </button>
            </div>
            <div className="mini-map">
              <button
                type="button"
                className="btn btn-lg"
                onClick={() => setShowMiniMap(!showMiniMap)}
              >
                {showMiniMap ? 'Hide' : 'Show'} Mini Map
              </button>
            </div>
          </div>
        )}
      </Zoom>
      <div className="description">
        Based on Mike Bostock's{' '}
        <a href="https://bl.ocks.org/mbostock/4e3925cdc804db257a86fdef3a032a45" target="_blank" rel="noopener noreferrer">Pan & Zoom III</a>
      </div>
      <style jsx>{`
        .btn {
          margin: 0;
          text-align: center;
          border: none;
          background: #2f2f2f;
          color: #888;
          padding: 0 4px;
          border-top: 1px solid #0a0a0a;
        }
        .btn-lg {
          font-size: 12px;
          line-height: 1;
          padding: 4px;
        }
        .btn-zoom {
          width: 26px;
          font-size: 22px;
        }
        .btn-bottom {
          margin-bottom: 1rem;
        }
        .description {
          font-size: 12px;
          margin-right: 0.25rem;
        }
        .controls {
          position: absolute;
          top: 15px;
          right: 15px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .mini-map {
          position: absolute;
          bottom: 25px;
          right: 15px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .relative {
          position: relative;
        }
      `}</style>
    </>
  );
}
```

Install NPM dependencies:
```bash
d3-scale-chromatic, @visx/zoom, @visx/event, @visx/clip-path, @visx/mock-data, @visx/scale
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
