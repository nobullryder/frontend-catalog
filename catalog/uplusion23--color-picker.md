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
'use client';

import type { PopoverContentProps } from '@radix-ui/react-popover';
import {
  type HexColor,
  hexToHsva,
  type HslaColor,
  hslaToHsva,
  type HsvaColor,
  hsvaToHex,
  hsvaToHsla,
  hsvaToHslString,
  hsvaToRgba,
  type RgbaColor,
  rgbaToHsva,
} from '@uiw/color-convert';
import Hue from '@uiw/react-color-hue';
import Saturation from '@uiw/react-color-saturation';
import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react';
import React from 'react';

import { Badge, type BadgeProps } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

function getColorAsHsva(color: `#${string}` | HsvaColor | HslaColor | RgbaColor): HsvaColor {
  if (typeof color === 'string') {
    return hexToHsva(color);
  } else if ('h' in color && 's' in color && 'v' in color) {
    return color;
  } else if ('r' in color) {
    return rgbaToHsva(color);
  } else {
    return hslaToHsva(color);
  }
}

type ColorPickerValue = {
  hex: string;
  hsl: HslaColor;
  rgb: RgbaColor;
};

type ColorPickerProps = {
  value?: `#${string}` | HsvaColor | HslaColor | RgbaColor;
  type?: 'hsl' | 'rgb' | 'hex';
  swatches?: HexColor[];
  hideContrastRatio?: boolean;
  hideDefaultSwatches?: boolean;
  className?: string;
  onValueChange?: (value: ColorPickerValue) => void;
} & PopoverContentProps;

function ColorPicker({
  value,
  children,
  type = 'hsl',
  swatches = [],
  hideContrastRatio,
  hideDefaultSwatches,
  onValueChange,
  className,
  ...props
}: ColorPickerProps) {
  const [colorType, setColorType] = React.useState(type);
  const [colorHsv, setColorHsv] = React.useState<HsvaColor>(value ? getColorAsHsva(value) : { h: 0, s: 0, v: 0, a: 1 });

  const handleValueChange = (color: HsvaColor) => {
    onValueChange?.({
      hex: hsvaToHex(colorHsv),
      hsl: hsvaToHsla(colorHsv),
      rgb: hsvaToRgba(colorHsv),
    });

    setColorHsv(color);
  };

  return (
    <Popover {...props}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className={cn('w-[350px] p-0', className)}
        {...props}
        style={
          {
            '--selected-color': hsvaToHslString(colorHsv),
          } as React.CSSProperties
        }
      >
        <div className="space-y-2 p-4">
          <Saturation
            hsva={colorHsv}
            onChange={(newColor) => {
              handleValueChange(newColor);
            }}
            style={{
              width: '100%',
              height: 'auto',
              aspectRatio: '4/2',
              borderRadius: '0.3rem',
            }}
            className="border border-border"
          />
          <Hue
            hue={colorHsv.h}
            onChange={(newHue) => {
              handleValueChange({ ...colorHsv, ...newHue });
            }}
            className="[&>div:first-child]:overflow-hidden [&>div:first-child]:!rounded"
            style={
              {
                width: '100%',
                height: '0.9rem',
                borderRadius: '0.3rem',
                '--alpha-pointer-background-color': 'hsl(var(--foreground))',
              } as React.CSSProperties
            }
          />

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="shrink-0 justify-between uppercase">
                  {colorType}
                  <ChevronDownIcon className="-me-1 ms-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuCheckboxItem checked={colorType === 'hex'} onCheckedChange={() => setColorType('hex')}>
                  HEX
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={colorType === 'hsl'} onCheckedChange={() => setColorType('hsl')}>
                  HSL
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={colorType === 'rgb'} onCheckedChange={() => setColorType('rgb')}>
                  RGB
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex grow">
              {colorType === 'hsl' && (
                <ObjectColorInput
                  value={hsvaToHsla(colorHsv)}
                  label="hsl"
                  onValueChange={(value) => {
                    setColorHsv(hslaToHsva(value));
                  }}
                />
              )}
              {colorType === 'rgb' && (
                <ObjectColorInput
                  value={hsvaToRgba(colorHsv)}
                  label="rgb"
                  onValueChange={(value) => {
                    setColorHsv(rgbaToHsva(value));
                  }}
                />
              )}
              {colorType === 'hex' && (
                <Input
                  className="flex"
                  value={hsvaToHex(colorHsv)}
                  onChange={(e) => {
                    setColorHsv(hexToHsva(e.target.value));
                  }}
                />
              )}
            </div>
          </div>
          {swatches.length > 0 || (!hideDefaultSwatches && <Separator />)}
          {!hideDefaultSwatches && (
            <div className="flex flex-wrap justify-start gap-2">
              {['#F8371A', '#F97C1B', '#FAC81C', '#3FD0B6', '#2CADF6', '#6462FC', ...swatches]
                .sort((a, b) => hexToHsva(a).h - hexToHsva(b).h)
                .map((color) => (
                  <button
                    type="button"
                    key={`${color}-swatch`}
                    style={
                      {
                        '--swatch-color': color,
                      } as React.CSSProperties
                    }
                    onClick={() => setColorHsv(hexToHsva(color))}
                    onKeyUp={(e) => (e.key === 'Enter' ? setColorHsv(hexToHsva(color)) : null)}
                    aria-label={`Set color to ${color}`}
                    className="size-5 cursor-pointer rounded bg-[var(--swatch-color)] ring-2 ring-[var(--swatch-color)00] ring-offset-1 ring-offset-background transition-all duration-100 hover:ring-[var(--swatch-color)]"
                  />
                ))}
            </div>
          )}
          {!hideContrastRatio && (
            <>
              <Separator />
              <ContrastRatio color={colorHsv} />
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

type ContrastRatioProps = {
  color: HsvaColor;
};

function ContrastRatio({ color }: ContrastRatioProps) {
  const [darkModeContrastRatio, setDarkModeContrastValue] = React.useState(0);
  const [lightModeContrastValue, setLightModeContrastValue] = React.useState(0);

  React.useEffect(() => {
    const rgb = hsvaToRgba(color);

    const toSRGB = (c: number) => {
      const channel = c / 255;
      return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    };

    const r = toSRGB(rgb.r);
    const g = toSRGB(rgb.g);
    const b = toSRGB(rgb.b);

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    const darkModeRatio = (1.0 + 0.05) / (luminance + 0.05);
    const lightModeRatio = (luminance + 0.05) / 0.05;

    setDarkModeContrastValue(Number(darkModeRatio.toFixed(2)));
    setLightModeContrastValue(Number(lightModeRatio.toFixed(2)));
  }, [color]);

  const ValidationBadge = ({
    ratio,
    ratioLimit,
    className,
    children,
    ...props
  }: {
    ratio: number;
    ratioLimit: number;
  } & Omit<BadgeProps, 'variant'>) => (
    <Badge
      variant="outline"
      className={cn(
        'gap-2 rounded-full text-muted-foreground',
        ratio > ratioLimit && 'border-transparent bg-emerald-500/20 text-emerald-700 dark:text-emerald-400',
        className,
      )}
      {...props}
    >
      {ratio > 4.5 ? <CheckIcon size={16} /> : <XIcon size={16} />}
      {children}
    </Badge>
  );

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex size-10 items-center justify-center rounded bg-[var(--selected-color)]">
          <span className="font-medium text-black dark:text-white">A</span>
        </div>
        <div className="flex flex-col justify-between">
          <span className="whitespace-nowrap text-nowrap text-xs text-muted-foreground">Contrast Ratio</span>
          <span className="hidden text-sm dark:flex">{darkModeContrastRatio}</span>
          <span className="text-sm dark:hidden">{lightModeContrastValue}</span>
        </div>
      </div>
      <div className="flex items-center justify-end gap-1">
        <ValidationBadge className="dark:hidden" ratio={lightModeContrastValue} ratioLimit={4.5}>
          AA
        </ValidationBadge>
        <ValidationBadge className="dark:hidden" ratio={lightModeContrastValue} ratioLimit={7}>
          AAA
        </ValidationBadge>
        <ValidationBadge className="hidden dark:flex" ratio={darkModeContrastRatio} ratioLimit={4.5}>
          AA
        </ValidationBadge>
        <ValidationBadge className="hidden dark:flex" ratio={darkModeContrastRatio} ratioLimit={7}>
          AAA
        </ValidationBadge>
      </div>
    </div>
  );
}

type ObjectColorInputProps =
  | {
      label: 'hsl';
      value: HslaColor;
      onValueChange?: (value: HslaColor) => void;
    }
  | {
      label: 'rgb';
      value: RgbaColor;
      onValueChange?: (value: RgbaColor) => void;
    };

function ObjectColorInput({ value, label, onValueChange }: ObjectColorInputProps) {
  function handleChange(val: HslaColor | RgbaColor) {
    if (onValueChange) {
      label === 'hsl'
        ? onValueChange({
            ...value,
            ...val,
          })
        : onValueChange({
            ...value,
            ...val,
          });
    }
  }
  return (
    <div className="-mt-px flex">
      <div className="relative min-w-0 flex-1 focus-within:z-10">
        <Input
          className="peer rounded-e-none shadow-none [direction:inherit]"
          value={label === 'hsl' ? value.h.toFixed(0) : value.r}
          onChange={(e) =>
            handleChange({
              ...value,
              [label === 'hsl' ? 'h' : 'r']: e.target.value,
            })
          }
        />
      </div>
      <div className="relative -ms-px min-w-0 flex-1 focus-within:z-10">
        <Input
          className="peer rounded-none shadow-none [direction:inherit]"
          value={label === 'hsl' ? value.s.toFixed(0) : value.g}
          onChange={(e) =>
            handleChange({
              ...value,
              [label === 'hsl' ? 's' : 'g']: e.target.value,
            })
          }
        />
      </div>
      <div className="relative -ms-px min-w-0 flex-1 focus-within:z-10">
        <Input
          className="peer rounded-s-none shadow-none [direction:inherit]"
          value={label === 'hsl' ? value.l.toFixed(0) : value.b}
          onChange={(e) =>
            handleChange({
              ...value,
              [label === 'hsl' ? 'l' : 'b']: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
}

export { ColorPicker };
export type { ColorPickerProps, ColorPickerValue };


code.demo.1738189549579.tsx
import { ColorPicker } from "@/components/ui/color-picker"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "lucide-react"

function ColorPickerDemo() {
	return (
		<ColorPicker value="#5a289e">
			<Button variant="outline" className="flex items-center gap-2">Open Color Picker <ChevronDownIcon size={16} /></Button>
		</ColorPicker>
	)
}

export { ColorPickerDemo }
```

Copy-paste these files for dependencies:
```tsx
/components/ui/color-picker.tsx
'use client';

import type { PopoverContentProps } from '@radix-ui/react-popover';
import {
  type HexColor,
  hexToHsva,
  type HslaColor,
  hslaToHsva,
  type HsvaColor,
  hsvaToHex,
  hsvaToHsla,
  hsvaToHslString,
  hsvaToRgba,
  type RgbaColor,
  rgbaToHsva,
} from '@uiw/color-convert';
import Hue from '@uiw/react-color-hue';
import Saturation from '@uiw/react-color-saturation';
import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react';
import React from 'react';

import { Badge, type BadgeProps } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

function getColorAsHsva(color: `#${string}` | HsvaColor | HslaColor | RgbaColor): HsvaColor {
  if (typeof color === 'string') {
    return hexToHsva(color);
  } else if ('h' in color && 's' in color && 'v' in color) {
    return color;
  } else if ('r' in color) {
    return rgbaToHsva(color);
  } else {
    return hslaToHsva(color);
  }
}

type ColorPickerValue = {
  hex: string;
  hsl: HslaColor;
  rgb: RgbaColor;
};

type ColorPickerProps = {
  value?: `#${string}` | HsvaColor | HslaColor | RgbaColor;
  type?: 'hsl' | 'rgb' | 'hex';
  swatches?: HexColor[];
  hideContrastRatio?: boolean;
  hideDefaultSwatches?: boolean;
  className?: string;
  onValueChange?: (value: ColorPickerValue) => void;
} & PopoverContentProps;

function ColorPicker({
  value,
  children,
  type = 'hsl',
  swatches = [],
  hideContrastRatio,
  hideDefaultSwatches,
  onValueChange,
  className,
  ...props
}: ColorPickerProps) {
  const [colorType, setColorType] = React.useState(type);
  const [colorHsv, setColorHsv] = React.useState<HsvaColor>(value ? getColorAsHsva(value) : { h: 0, s: 0, v: 0, a: 1 });

  const handleValueChange = (color: HsvaColor) => {
    onValueChange?.({
      hex: hsvaToHex(colorHsv),
      hsl: hsvaToHsla(colorHsv),
      rgb: hsvaToRgba(colorHsv),
    });

    setColorHsv(color);
  };

  return (
    <Popover {...props}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className={cn('w-[350px] p-0', className)}
        {...props}
        style={
          {
            '--selected-color': hsvaToHslString(colorHsv),
          } as React.CSSProperties
        }
      >
        <div className="space-y-2 p-4">
          <Saturation
            hsva={colorHsv}
            onChange={(newColor) => {
              handleValueChange(newColor);
            }}
            style={{
              width: '100%',
              height: 'auto',
              aspectRatio: '4/2',
              borderRadius: '0.3rem',
            }}
            className="border border-border"
          />
          <Hue
            hue={colorHsv.h}
            onChange={(newHue) => {
              handleValueChange({ ...colorHsv, ...newHue });
            }}
            className="[&>div:first-child]:overflow-hidden [&>div:first-child]:!rounded"
            style={
              {
                width: '100%',
                height: '0.9rem',
                borderRadius: '0.3rem',
                '--alpha-pointer-background-color': 'hsl(var(--foreground))',
              } as React.CSSProperties
            }
          />

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="shrink-0 justify-between uppercase">
                  {colorType}
                  <ChevronDownIcon className="-me-1 ms-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuCheckboxItem checked={colorType === 'hex'} onCheckedChange={() => setColorType('hex')}>
                  HEX
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={colorType === 'hsl'} onCheckedChange={() => setColorType('hsl')}>
                  HSL
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={colorType === 'rgb'} onCheckedChange={() => setColorType('rgb')}>
                  RGB
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex grow">
              {colorType === 'hsl' && (
                <ObjectColorInput
                  value={hsvaToHsla(colorHsv)}
                  label="hsl"
                  onValueChange={(value) => {
                    setColorHsv(hslaToHsva(value));
                  }}
                />
              )}
              {colorType === 'rgb' && (
                <ObjectColorInput
                  value={hsvaToRgba(colorHsv)}
                  label="rgb"
                  onValueChange={(value) => {
                    setColorHsv(rgbaToHsva(value));
                  }}
                />
              )}
              {colorType === 'hex' && (
                <Input
                  className="flex"
                  value={hsvaToHex(colorHsv)}
                  onChange={(e) => {
                    setColorHsv(hexToHsva(e.target.value));
                  }}
                />
              )}
            </div>
          </div>
          {swatches.length > 0 || (!hideDefaultSwatches && <Separator />)}
          {!hideDefaultSwatches && (
            <div className="flex flex-wrap justify-start gap-2">
              {['#F8371A', '#F97C1B', '#FAC81C', '#3FD0B6', '#2CADF6', '#6462FC', ...swatches]
                .sort((a, b) => hexToHsva(a).h - hexToHsva(b).h)
                .map((color) => (
                  <button
                    type="button"
                    key={`${color}-swatch`}
                    style={
                      {
                        '--swatch-color': color,
                      } as React.CSSProperties
                    }
                    onClick={() => setColorHsv(hexToHsva(color))}
                    onKeyUp={(e) => (e.key === 'Enter' ? setColorHsv(hexToHsva(color)) : null)}
                    aria-label={`Set color to ${color}`}
                    className="size-5 cursor-pointer rounded bg-[var(--swatch-color)] ring-2 ring-[var(--swatch-color)00] ring-offset-1 ring-offset-background transition-all duration-100 hover:ring-[var(--swatch-color)]"
                  />
                ))}
            </div>
          )}
          {!hideContrastRatio && (
            <>
              <Separator />
              <ContrastRatio color={colorHsv} />
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

type ContrastRatioProps = {
  color: HsvaColor;
};

function ContrastRatio({ color }: ContrastRatioProps) {
  const [darkModeContrastRatio, setDarkModeContrastValue] = React.useState(0);
  const [lightModeContrastValue, setLightModeContrastValue] = React.useState(0);

  React.useEffect(() => {
    const rgb = hsvaToRgba(color);

    const toSRGB = (c: number) => {
      const channel = c / 255;
      return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    };

    const r = toSRGB(rgb.r);
    const g = toSRGB(rgb.g);
    const b = toSRGB(rgb.b);

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    const darkModeRatio = (1.0 + 0.05) / (luminance + 0.05);
    const lightModeRatio = (luminance + 0.05) / 0.05;

    setDarkModeContrastValue(Number(darkModeRatio.toFixed(2)));
    setLightModeContrastValue(Number(lightModeRatio.toFixed(2)));
  }, [color]);

  const ValidationBadge = ({
    ratio,
    ratioLimit,
    className,
    children,
    ...props
  }: {
    ratio: number;
    ratioLimit: number;
  } & Omit<BadgeProps, 'variant'>) => (
    <Badge
      variant="outline"
      className={cn(
        'gap-2 rounded-full text-muted-foreground',
        ratio > ratioLimit && 'border-transparent bg-emerald-500/20 text-emerald-700 dark:text-emerald-400',
        className,
      )}
      {...props}
    >
      {ratio > 4.5 ? <CheckIcon size={16} /> : <XIcon size={16} />}
      {children}
    </Badge>
  );

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex size-10 items-center justify-center rounded bg-[var(--selected-color)]">
          <span className="font-medium text-black dark:text-white">A</span>
        </div>
        <div className="flex flex-col justify-between">
          <span className="whitespace-nowrap text-nowrap text-xs text-muted-foreground">Contrast Ratio</span>
          <span className="hidden text-sm dark:flex">{darkModeContrastRatio}</span>
          <span className="text-sm dark:hidden">{lightModeContrastValue}</span>
        </div>
      </div>
      <div className="flex items-center justify-end gap-1">
        <ValidationBadge className="dark:hidden" ratio={lightModeContrastValue} ratioLimit={4.5}>
          AA
        </ValidationBadge>
        <ValidationBadge className="dark:hidden" ratio={lightModeContrastValue} ratioLimit={7}>
          AAA
        </ValidationBadge>
        <ValidationBadge className="hidden dark:flex" ratio={darkModeContrastRatio} ratioLimit={4.5}>
          AA
        </ValidationBadge>
        <ValidationBadge className="hidden dark:flex" ratio={darkModeContrastRatio} ratioLimit={7}>
          AAA
        </ValidationBadge>
      </div>
    </div>
  );
}

type ObjectColorInputProps =
  | {
      label: 'hsl';
      value: HslaColor;
      onValueChange?: (value: HslaColor) => void;
    }
  | {
      label: 'rgb';
      value: RgbaColor;
      onValueChange?: (value: RgbaColor) => void;
    };

function ObjectColorInput({ value, label, onValueChange }: ObjectColorInputProps) {
  function handleChange(val: HslaColor | RgbaColor) {
    if (onValueChange) {
      label === 'hsl'
        ? onValueChange({
            ...value,
            ...val,
          })
        : onValueChange({
            ...value,
            ...val,
          });
    }
  }
  return (
    <div className="-mt-px flex">
      <div className="relative min-w-0 flex-1 focus-within:z-10">
        <Input
          className="peer rounded-e-none shadow-none [direction:inherit]"
          value={label === 'hsl' ? value.h.toFixed(0) : value.r}
          onChange={(e) =>
            handleChange({
              ...value,
              [label === 'hsl' ? 'h' : 'r']: e.target.value,
            })
          }
        />
      </div>
      <div className="relative -ms-px min-w-0 flex-1 focus-within:z-10">
        <Input
          className="peer rounded-none shadow-none [direction:inherit]"
          value={label === 'hsl' ? value.s.toFixed(0) : value.g}
          onChange={(e) =>
            handleChange({
              ...value,
              [label === 'hsl' ? 's' : 'g']: e.target.value,
            })
          }
        />
      </div>
      <div className="relative -ms-px min-w-0 flex-1 focus-within:z-10">
        <Input
          className="peer rounded-s-none shadow-none [direction:inherit]"
          value={label === 'hsl' ? value.l.toFixed(0) : value.b}
          onChange={(e) =>
            handleChange({
              ...value,
              [label === 'hsl' ? 'l' : 'b']: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
}

export { ColorPicker };
export type { ColorPickerProps, ColorPickerValue };

```
```tsx
/components/ui/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

```
```tsx
/components/ui/badge.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

```
```tsx
/components/ui/dropdown-menu.tsx
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}

```
```tsx
/components/ui/input.tsx
import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

```
```tsx
/components/ui/popover.tsx
"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }

```
```tsx
/components/ui/separator.tsx
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }

```

Install NPM dependencies:
```bash
lucide-react, @uiw/color-convert, @uiw/react-color-hue, @radix-ui/react-popover, @uiw/react-color-saturation, @radix-ui/react-slot, class-variance-authority, @radix-ui/react-dropdown-menu, @radix-ui/react-separator
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
