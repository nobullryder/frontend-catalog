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
book.tsx
import React from "react";
import { useResponsive } from "@/components/ui/use-responsive";
import clsx from "clsx";

const DefaultIllustration = (
  <svg fill="none" height="56" viewBox="0 0 36 56" width="36" xmlns="http://www.w3.org/2000/svg">
    <path
      clipRule="evenodd"
      d="M3.03113 28.0005C6.26017 23.1765 11.7592 20.0005 18 20.0005C24.2409 20.0005 29.7399 23.1765 32.9689 28.0005C29.7399 32.8244 24.2409 36.0005 18 36.0005C11.7592 36.0005 6.26017 32.8244 3.03113 28.0005Z"
      fill="#0070F3"
      fillRule="evenodd"
    />
    <path
      clipRule="evenodd"
      d="M32.9691 28.0012C34.8835 25.1411 36 21.7017 36 18.0015C36 8.06034 27.9411 0.00146484 18 0.00146484C8.05887 0.00146484 0 8.06034 0 18.0015C0 21.7017 1.11648 25.1411 3.03094 28.0012C6.25996 23.1771 11.7591 20.001 18 20.001C24.2409 20.001 29.74 23.1771 32.9691 28.0012Z"
      fill="#45DEC4"
      fillRule="evenodd"
    />
    <path
      clipRule="evenodd"
      d="M32.9692 28.0005C29.7402 32.8247 24.241 36.001 18 36.001C11.759 36.001 6.25977 32.8247 3.03077 28.0005C1.11642 30.8606 0 34.2999 0 38C0 47.9411 8.05887 56 18 56C27.9411 56 36 47.9411 36 38C36 34.2999 34.8836 30.8606 32.9692 28.0005Z"
      fill="#E5484D"
      fillRule="evenodd"
    />
  </svg>
);

interface ResponsiveProp<T> {
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}

interface BookProps {
  title: string;
  variant?: "simple" | "stripe";
  width?: number | ResponsiveProp<number>;
  color?: string;
  textColor?: string;
  illustration?: React.ReactNode;
  textured?: boolean;
}

export const Book = ({
  title,
  variant = "stripe",
  width = 196,
  color,
  textColor = "var(--ds-gray-1000)",
  illustration,
  textured = false
}: BookProps) => {
  const _width = useResponsive(width);
  const _color = color ? color : variant === "simple" ? "var(--ds-background-200)" : "var(--ds-amber-600)";
  const _illustration = illustration ? illustration : DefaultIllustration;

  return (
    <div className="inline-block w-fit" style={{ perspective: 900 }}>
      <div
        className="aspect-[49/60] w-fit relative rotate-0 duration-[250ms] book-rotate"
        style={{ transformStyle: "preserve-3d", minWidth: _width, containerType: "inline-size" }}
      >
        <div
          className="flex flex-col h-full rounded-l-md rounded-r overflow-hidden bg-background-200 shadow-book translate-x-0 relative after:absolute after:border after:border-gray-alpha-400 after:w-full after:h-full after:shadow-book-border after:rounded-l-md after:rounded-r"
          style={{ width: _width }}
        >
          <div
            className={clsx(
              "w-full relative overflow-hidden",
              variant === "stripe" && "flex-1"
            )}
            style={{ background: _color }}
          >
            {variant === "stripe" && illustration && (
              <div className="absolute h-full w-full">
                {_illustration}
              </div>
            )}
            <div className="absolute h-full w-[8.2%] mix-blend-overlay" style={{ background: "var(--ds-book-bind)" }} />
          </div>
          <div
            className={clsx(
              "relative flex-1",
              (variant === "stripe" || (variant === "simple" && color === undefined)) && "bg-book-gradient"
            )}
            style={{ background: variant === "simple" && color !== undefined ? _color : undefined }}
          >
            <div className="absolute h-full w-[8.2%] opacity-20" style={{ background: "var(--ds-book-bind)" }} />
            <div
              className={clsx(
                "flex flex-col w-full p-[6.1%] pl-[14.3%]",
                variant === "simple" ? "gap-4" : "justify-between"
              )}
              style={{ containerType: "inline-size", gap: `calc((24px / 196) * ${_width})` }}
            >
              <span
                className={clsx(
                  "leading-[1.25em] tracking-[-.02em] text-balance font-semibold",
                  variant === "simple" ? "text-[12cqw]" : "text-[10.5cqw]"
                )}
                style={{ color: textColor }}
              >
                {title}
              </span>
              {variant === "stripe" ? (
                <svg className="scale-75 -ml-1 -mb-1" height="24" width="24" style={{ fill: textColor }}>
                  <path d="M21,21H3L12,3Z" />
                </svg>
              ) : _illustration}
            </div>
          </div>
          {textured && (
            <div
              className="absolute top-0 left-0 inset-0 rotate-180 rounded-l-md rounded-r mix-blend-hard-light pointer-events-none bg-cover bg-no-repeat opacity-50 brightness-110 bg-[url('https://assets.vercel.com/image/upload/v1720554484/front/design/book-texture.avif')]" />
          )}
        </div>

        <div
          className="h-[calc(100%_-_2_*_3px)] w-[calc(29cqw_-_2px)] absolute top-[3px]"
          style={{
            background: "linear-gradient(90deg, #eaeaea, transparent 70%), linear-gradient(#fff, #fafafa)",
            transform: `translateX(calc(${_width} * 1px - 29cqw / 2 - 3px)) rotateY(90deg) translateX(calc(29cqw / 2))`
          }}
        />
        <div
          className="bg-gray-200 absolute left-0 top-0 rounded-l-md rounded-r h-full"
          style={{ width: _width, transform: "translateZ(calc(-1 * 29cqw))" }}
        />
      </div>
    </div>
  );
};

code.demo.1751642846697.tsx
import { Book } from "@/components/ui/book";

const Lines = () => (
  <svg fill="none" height="149" viewBox="0 0 197 149" width="197" xmlns="http://www.w3.org/2000/svg">
    <rect fill="#FED954" height="149" width="197"></rect>
    <path d="M147 48.4995H172C185.531 48.4995 196.5 59.4685 196.5 72.9995V148.427" stroke="#ECAF14"></path>
    <path d="M0 48.5H24.5C38.031 48.5 49 37.531 49 24V0" stroke="#ECAF14"></path>
    <path d="M147.5 48.5H172C185.531 48.5 196.5 37.531 196.5 24V0" stroke="#ECAF14"></path>
    <path d="M0 48.5H24.5C38.031 48.5 49 59.469 49 73V98" stroke="#ECAF14"></path>
    <path d="M146 48.5H73.5C59.969 48.5 49 37.531 49 24V0" stroke="#ECAF14"></path>
    <path d="M196 48.5H122.5C108.969 48.5 98 37.531 98 24V0" stroke="#ECAF14"></path>
    <path d="M97 48.5H73.5C59.969 48.5 49 59.469 49 73V99.5" stroke="#ECAF14"></path>
    <path d="M98 132.5H122.5C136.031 132.5 147 121.531 147 108V98.9512" stroke="#ECAF14"></path>
    <path d="M196 132.5H171.5C157.969 132.5 147 121.531 147 108V48.5" stroke="#ECAF14"></path>
    <path d="M147 48.5H122.5C108.969 48.5 98 59.469 98 73V132" stroke="#ECAF14"></path>
    <path d="M98 132.5H73.5C59.969 132.5 49 121.531 49 108V98.9512" stroke="#ECAF14"></path>
  </svg>
);

const Icon = () => (
  <div className="w-12 h-12" role="img">
    <svg viewBox="0 0 1 1">
      <path
        d="M0.3542 0.0208 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.3958 0.0208 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.4375 0.0208 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.4792 0.0208 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.5208 0.0208 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.5625 0.0208 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.6042 0.0208 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.6458 0.0208 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.2708 0.0625 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.3125 0.0625 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.3542 0.0625 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.3958 0.0625 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.4375 0.0625 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.4792 0.0625 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.5208 0.0625 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.5625 0.0625 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.6042 0.0625 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.6458 0.0625 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.6875 0.0625 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.7292 0.0625 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1875 0.1042 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.2292 0.1042 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.2708 0.1042 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.3125 0.1042 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.6875 0.1042 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.7292 0.1042 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.7708 0.1042 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.8125 0.1042 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1458 0.1458 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1875 0.1458 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.2292 0.1458 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.7708 0.1458 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.8125 0.1458 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.8542 0.1458 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1042 0.1875 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1458 0.1875 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1875 0.1875 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.8125 0.1875 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.8542 0.1875 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.8958 0.1875 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.0625 0.2292 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1042 0.2292 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1458 0.2292 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.8542 0.2292 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.8958 0.2292 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.9375 0.2292 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.0625 0.2708 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1042 0.2708 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.8958 0.2708 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.9375 0.2708 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.0208 0.3125 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.0625 0.3125 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1042 0.3125 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.8958 0.3125 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.9375 0.3125 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.9792 0.3125 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.0208 0.3542 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.0625 0.3542 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.9375 0.3542 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.9792 0.3542 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.0208 0.3958 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.0625 0.3958 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.2708 0.3958 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.3125 0.3958 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.4792 0.3958 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.5208 0.3958 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.6875 0.3958 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.7292 0.3958 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.9375 0.3958 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.9792 0.3958 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.0208 0.4375 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.0625 0.4375 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.2708 0.4375 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.3125 0.4375 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.4792 0.4375 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.5208 0.4375 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.6875 0.4375 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.7292 0.4375 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.9375 0.4375 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.9792 0.4375 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.0208 0.4792 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.0625 0.4792 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.9375 0.4792 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.9792 0.4792 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.0208 0.5208 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.0625 0.5208 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.9375 0.5208 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.9792 0.5208 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.0208 0.5625 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.0625 0.5625 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1042 0.5625 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.8958 0.5625 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.9375 0.5625 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.9792 0.5625 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.0625 0.6042 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1042 0.6042 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.8958 0.6042 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.9375 0.6042 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.0625 0.6458 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1042 0.6458 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1458 0.6458 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.8542 0.6458 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.8958 0.6458 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.9375 0.6458 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1042 0.6875 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1458 0.6875 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.8125 0.6875 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.8542 0.6875 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.8958 0.6875 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1458 0.7292 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1875 0.7292 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.7292 0.7292 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.7708 0.7292 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.8125 0.7292 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.8542 0.7292 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1458 0.7708 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1875 0.7708 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.6458 0.7708 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.6875 0.7708 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.7292 0.7708 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.7708 0.7708 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.8125 0.7708 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1458 0.8125 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1875 0.8125 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.3542 0.8125 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.3958 0.8125 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.4375 0.8125 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.4792 0.8125 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.5208 0.8125 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.5625 0.8125 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.6042 0.8125 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.6458 0.8125 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.6875 0.8125 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.7292 0.8125 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1458 0.8542 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1875 0.8542 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.3125 0.8542 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.3542 0.8542 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.3958 0.8542 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.4375 0.8542 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.4792 0.8542 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.5208 0.8542 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.5625 0.8542 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.6042 0.8542 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.6458 0.8542 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1458 0.8958 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1875 0.8958 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.2292 0.8958 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.2708 0.8958 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.3125 0.8958 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.3542 0.8958 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.3958 0.8958 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1042 0.9375 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1458 0.9375 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1875 0.9375 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.2292 0.9375 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.2708 0.9375 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.3125 0.9375 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1042 0.9792 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1458 0.9792 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 M0.1875 0.9792 m-0.0208,0 a0.0208,0.0208 0 1,0 0.0416,0 a0.0208,0.0208 0 1,0 -0.0416,0 "
        fill="var(--ds-gray-1000)" />
      <path d="" fill="var(--ds-gray-1000)" opacity="0.5" />
    </svg>
  </div>
);

export default function CustomIllustrationDemo() {
  return (
        <div className="flex gap-8">
          <Book
            illustration={<Lines />}
            title="The user experience of the Frontend Cloud"
          />
          <Book
            illustration={<Icon />}
            title="The user experience of the Frontend Cloud"
            variant="simple"
          />
        </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/book.tsx
import React from "react";
import { useResponsive } from "@/components/ui/use-responsive";
import clsx from "clsx";

const DefaultIllustration = (
  <svg fill="none" height="56" viewBox="0 0 36 56" width="36" xmlns="http://www.w3.org/2000/svg">
    <path
      clipRule="evenodd"
      d="M3.03113 28.0005C6.26017 23.1765 11.7592 20.0005 18 20.0005C24.2409 20.0005 29.7399 23.1765 32.9689 28.0005C29.7399 32.8244 24.2409 36.0005 18 36.0005C11.7592 36.0005 6.26017 32.8244 3.03113 28.0005Z"
      fill="#0070F3"
      fillRule="evenodd"
    />
    <path
      clipRule="evenodd"
      d="M32.9691 28.0012C34.8835 25.1411 36 21.7017 36 18.0015C36 8.06034 27.9411 0.00146484 18 0.00146484C8.05887 0.00146484 0 8.06034 0 18.0015C0 21.7017 1.11648 25.1411 3.03094 28.0012C6.25996 23.1771 11.7591 20.001 18 20.001C24.2409 20.001 29.74 23.1771 32.9691 28.0012Z"
      fill="#45DEC4"
      fillRule="evenodd"
    />
    <path
      clipRule="evenodd"
      d="M32.9692 28.0005C29.7402 32.8247 24.241 36.001 18 36.001C11.759 36.001 6.25977 32.8247 3.03077 28.0005C1.11642 30.8606 0 34.2999 0 38C0 47.9411 8.05887 56 18 56C27.9411 56 36 47.9411 36 38C36 34.2999 34.8836 30.8606 32.9692 28.0005Z"
      fill="#E5484D"
      fillRule="evenodd"
    />
  </svg>
);

interface ResponsiveProp<T> {
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}

interface BookProps {
  title: string;
  variant?: "simple" | "stripe";
  width?: number | ResponsiveProp<number>;
  color?: string;
  textColor?: string;
  illustration?: React.ReactNode;
  textured?: boolean;
}

export const Book = ({
  title,
  variant = "stripe",
  width = 196,
  color,
  textColor = "var(--ds-gray-1000)",
  illustration,
  textured = false
}: BookProps) => {
  const _width = useResponsive(width);
  const _color = color ? color : variant === "simple" ? "var(--ds-background-200)" : "var(--ds-amber-600)";
  const _illustration = illustration ? illustration : DefaultIllustration;

  return (
    <div className="inline-block w-fit" style={{ perspective: 900 }}>
      <div
        className="aspect-[49/60] w-fit relative rotate-0 duration-[250ms] book-rotate"
        style={{ transformStyle: "preserve-3d", minWidth: _width, containerType: "inline-size" }}
      >
        <div
          className="flex flex-col h-full rounded-l-md rounded-r overflow-hidden bg-background-200 shadow-book translate-x-0 relative after:absolute after:border after:border-gray-alpha-400 after:w-full after:h-full after:shadow-book-border after:rounded-l-md after:rounded-r"
          style={{ width: _width }}
        >
          <div
            className={clsx(
              "w-full relative overflow-hidden",
              variant === "stripe" && "flex-1"
            )}
            style={{ background: _color }}
          >
            {variant === "stripe" && illustration && (
              <div className="absolute h-full w-full">
                {_illustration}
              </div>
            )}
            <div className="absolute h-full w-[8.2%] mix-blend-overlay" style={{ background: "var(--ds-book-bind)" }} />
          </div>
          <div
            className={clsx(
              "relative flex-1",
              (variant === "stripe" || (variant === "simple" && color === undefined)) && "bg-book-gradient"
            )}
            style={{ background: variant === "simple" && color !== undefined ? _color : undefined }}
          >
            <div className="absolute h-full w-[8.2%] opacity-20" style={{ background: "var(--ds-book-bind)" }} />
            <div
              className={clsx(
                "flex flex-col w-full p-[6.1%] pl-[14.3%]",
                variant === "simple" ? "gap-4" : "justify-between"
              )}
              style={{ containerType: "inline-size", gap: `calc((24px / 196) * ${_width})` }}
            >
              <span
                className={clsx(
                  "leading-[1.25em] tracking-[-.02em] text-balance font-semibold",
                  variant === "simple" ? "text-[12cqw]" : "text-[10.5cqw]"
                )}
                style={{ color: textColor }}
              >
                {title}
              </span>
              {variant === "stripe" ? (
                <svg className="scale-75 -ml-1 -mb-1" height="24" width="24" style={{ fill: textColor }}>
                  <path d="M21,21H3L12,3Z" />
                </svg>
              ) : _illustration}
            </div>
          </div>
          {textured && (
            <div
              className="absolute top-0 left-0 inset-0 rotate-180 rounded-l-md rounded-r mix-blend-hard-light pointer-events-none bg-cover bg-no-repeat opacity-50 brightness-110 bg-[url('https://assets.vercel.com/image/upload/v1720554484/front/design/book-texture.avif')]" />
          )}
        </div>

        <div
          className="h-[calc(100%_-_2_*_3px)] w-[calc(29cqw_-_2px)] absolute top-[3px]"
          style={{
            background: "linear-gradient(90deg, #eaeaea, transparent 70%), linear-gradient(#fff, #fafafa)",
            transform: `translateX(calc(${_width} * 1px - 29cqw / 2 - 3px)) rotateY(90deg) translateX(calc(29cqw / 2))`
          }}
        />
        <div
          className="bg-gray-200 absolute left-0 top-0 rounded-l-md rounded-r h-full"
          style={{ width: _width, transform: "translateZ(calc(-1 * 29cqw))" }}
        />
      </div>
    </div>
  );
};
```

Install NPM dependencies:
```bash
clsx
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
