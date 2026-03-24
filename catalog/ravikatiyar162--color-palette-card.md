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
color-palette-card.tsx
import * as React from 'react';
import { cn } from '@/lib/utils'; // Assuming shadcn's utility function

/**
 * Props for the ColorPaletteCard component.
 */
export interface ColorPaletteCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * An array of color hex codes (without the '#') to be displayed.
   * Recommended: 5 colors for optimal display.
   */
  colors: string[];
  /**
   * The text to display in the stats section of the card.
   */
  statsText: string;
  /**
   * An optional icon to display in the stats section. Defaults to a 'more options' icon.
   */
  icon?: React.ReactNode;
}

/**
 * A card component to display a color palette with interactive hover effects.
 * It is theme-adaptive and built to be reusable.
 */
const ColorPaletteCard = React.forwardRef<HTMLDivElement, ColorPaletteCardProps>(
  ({ className, colors, statsText, icon, ...props }, ref) => {
    // Default icon if one isn't provided via props
    const defaultIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        viewBox="0 0 18 18"
        className="fill-current"
        aria-hidden="true"
      >
        <path d="M4 7.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5S5.5 9.83 5.5 9 4.83 7.5 4 7.5zm10 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-5 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S9.83 7.5 9 7.5z" />
      </svg>
    );

    return (
      <div
        ref={ref}
        className={cn(
          'h-[200px] w-[350px] rounded-xl overflow-hidden shadow-lg bg-card font-sans flex flex-col',
          className
        )}
        {...props}
      >
        {/* Color Palette Section */}
        <div className="flex h-[86%] w-full">
          {colors.map((color) => (
            <div
              key={color}
              className="group h-full flex-1 flex items-center justify-center text-white font-semibold tracking-wider transition-[flex] duration-200 ease-in-out hover:flex-[2]"
              style={{ backgroundColor: `#${color}` }}
            >
              <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {color.toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="h-[14%] w-full bg-card text-muted-foreground flex items-center justify-between px-6">
          <span className="text-sm">{statsText}</span>
          {icon || defaultIcon}
        </div>
      </div>
    );
  }
);
ColorPaletteCard.displayName = 'ColorPaletteCard';

export { ColorPaletteCard };


code.demo.1755243629924.tsx
import { ColorPaletteCard } from '@/components/ui/color-palette-card'; // Adjust this import path to match your project structure

/**
 * A demo component to showcase the ColorPaletteCard.
 */
export default function ColorPaletteCardDemo() {
  // Sample data for the color palette
  const palette = {
    colors: ['264653', '2A9D8F', 'E9C46A', 'F4A261', 'E76F51'],
    saves: 53421,
  };

  return (
    <div className="flex min-h-[350px] w-full items-center justify-center bg-background p-4">
      <ColorPaletteCard
        colors={palette.colors}
        statsText={`${palette.saves.toLocaleString()} saves`}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/color-palette-card.tsx
import * as React from 'react';
import { cn } from '@/lib/utils'; // Assuming shadcn's utility function

/**
 * Props for the ColorPaletteCard component.
 */
export interface ColorPaletteCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * An array of color hex codes (without the '#') to be displayed.
   * Recommended: 5 colors for optimal display.
   */
  colors: string[];
  /**
   * The text to display in the stats section of the card.
   */
  statsText: string;
  /**
   * An optional icon to display in the stats section. Defaults to a 'more options' icon.
   */
  icon?: React.ReactNode;
}

/**
 * A card component to display a color palette with interactive hover effects.
 * It is theme-adaptive and built to be reusable.
 */
const ColorPaletteCard = React.forwardRef<HTMLDivElement, ColorPaletteCardProps>(
  ({ className, colors, statsText, icon, ...props }, ref) => {
    // Default icon if one isn't provided via props
    const defaultIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        viewBox="0 0 18 18"
        className="fill-current"
        aria-hidden="true"
      >
        <path d="M4 7.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5S5.5 9.83 5.5 9 4.83 7.5 4 7.5zm10 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-5 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S9.83 7.5 9 7.5z" />
      </svg>
    );

    return (
      <div
        ref={ref}
        className={cn(
          'h-[200px] w-[350px] rounded-xl overflow-hidden shadow-lg bg-card font-sans flex flex-col',
          className
        )}
        {...props}
      >
        {/* Color Palette Section */}
        <div className="flex h-[86%] w-full">
          {colors.map((color) => (
            <div
              key={color}
              className="group h-full flex-1 flex items-center justify-center text-white font-semibold tracking-wider transition-[flex] duration-200 ease-in-out hover:flex-[2]"
              style={{ backgroundColor: `#${color}` }}
            >
              <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {color.toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="h-[14%] w-full bg-card text-muted-foreground flex items-center justify-between px-6">
          <span className="text-sm">{statsText}</span>
          {icon || defaultIcon}
        </div>
      </div>
    );
  }
);
ColorPaletteCard.displayName = 'ColorPaletteCard';

export { ColorPaletteCard };

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
