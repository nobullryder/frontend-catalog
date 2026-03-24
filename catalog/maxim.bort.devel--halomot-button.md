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
halomot-button.tsx
"use client";
    import React, { useState, useRef } from "react";
    
    interface HalomotButtonProps {
      gradient?: string; // Gradient for the button border/background
      inscription: string; // Button text
      onClick: () => void;
      fillWidth?: boolean;
      fixedWidth?: string;
      href?: string;
      backgroundColor?: string; // Solid color for the inner button (not gradient)
      icon?: React.ReactElement;
      borderWidth?: string; // Controls the padding (thickness of the gradient border)
      padding?: string; // Custom padding for the inner button, e.g., "1rem 4rem"
      outerBorderRadius?: string; // Border radius for the gradient outer border
      innerBorderRadius?: string; // Border radius for the inner button
      textColor?: string; // Text color for the button, default #fff
      hoverTextColor?: string;
    }
    
    export const HalomotButton: React.FC<HalomotButtonProps> = ({
      gradient = "linear-gradient(135deg, #4776cb, #a19fe5, #6cc606)",
      inscription,
      onClick,
      fillWidth = false,
      fixedWidth,
      href,
      backgroundColor = "#000",
      icon,
      borderWidth = "1px",
      padding,
      outerBorderRadius = "6.34px",
      innerBorderRadius = "6px",
      textColor = "#fff",
      hoverTextColor,
    }) => {
      const [isHovered, setIsHovered] = useState(false);
      const [delayedColor, setDelayedColor] = useState<string | undefined>(undefined);
      const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    
      // Container style for fixed width
      const containerStyle: React.CSSProperties = fixedWidth
        ? { width: fixedWidth, display: "inline-block" }
        : {};
    
      // Outer button style (gradient border)
      const buttonStyle: React.CSSProperties = {
        margin: fillWidth || fixedWidth ? "0" : "auto",
        padding: borderWidth,
        background: gradient,
        border: "0",
        borderRadius: outerBorderRadius,
        color: textColor,
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textDecoration: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
        whiteSpace: "nowrap",
        transition: "all .3s",
        width: fillWidth || fixedWidth ? "100%" : "fit-content",
        flexDirection: "row",
        boxSizing: "border-box",
      };
    
      // Inner span style (actual clickable area)
      const spanStyle: React.CSSProperties = {
        background: isHovered ? "none" : backgroundColor,
        padding: padding ?? (fillWidth || fixedWidth ? "1rem 0" : "1rem 4rem"),
        border: "0",
        borderRadius: innerBorderRadius,
        width: "100%",
        height: "100%",
        transition: hoverTextColor ? "color 0.3s, background 300ms" : "background 300ms",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        color: delayedColor ? delayedColor : textColor,
        whiteSpace: "nowrap",
        fontFamily: "inherit",
        fontSize: "1rem",
        gap: icon ? "0.5em" : 0,
        flexDirection: "row",
        boxSizing: "border-box",
        cursor: "pointer",
      };
    
      // Icon style
      const iconStyle: React.CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        height: "1em",
        width: "1em",
        fontSize: "1.1em",
        verticalAlign: "middle",
        flexShrink: 0,
      };
    
      // No delay, just set color immediately
      const handleMouseEnter = () => {
        setIsHovered(true);
        if (hoverTextColor) {
          setDelayedColor(hoverTextColor);
        }
      };
    
      const handleMouseLeave = () => {
        setIsHovered(false);
        setDelayedColor(undefined);
      };
    
      const handleClick = (
        e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>
      ) => {
        e.preventDefault();
        onClick();
      };
    
      const ButtonContent = (
        <span
          style={spanStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {icon && React.cloneElement(icon, { style: iconStyle })}
          {inscription}
        </span>
      );
    
      const ButtonElement = href ? (
        <a href={href} style={buttonStyle} onClick={handleClick}>
          {ButtonContent}
        </a>
      ) : (
        <button type="button" style={buttonStyle} onClick={handleClick}>
          {ButtonContent}
        </button>
      );
    
      return fixedWidth ? (
        <div style={containerStyle}>{ButtonElement}</div>
      ) : (
        ButtonElement
      );
    };


code.demo.1749343526739.tsx
// HalomotButtonDemo.jsx
// Demo showcase for the HalomotButton component

import React from "react";
import { HalomotButton } from "@/components/ui/halomot-button";
import { FaRegSmile } from "react-icons/fa"; // Example icon

const HalomotButtonDemo = () => (
  <section>
    {/* Demo area: showcase several button variants */}
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '36px',
        justifyContent: 'center',
        alignItems: 'center', // <--- This centers all buttons vertically
        borderRadius: '8px',
        minHeight: '300px'
      }}
    >
      {/* Default button */}
      <HalomotButton 
        inscription="חלומות"
        backgroundColor="var(--halomot-button-background)"
        textColor="var(--halomot-button-foreground)"
        hoverTextColor="#fff"
        onClick={() => console.log("The 1st Halomot button has been clicked!")}
      />
      {/* Button with custom gradient, border radius, and icon */}
      <HalomotButton 
        inscription="עוד אחד"
        backgroundColor="var(--halomot-button-background)"
        textColor="var(--halomot-button-foreground)"
        borderWidth="3px"
        gradient="linear-gradient(135deg, #a123f4, #603dec)"
        outerBorderRadius="33px"
        innerBorderRadius="32px"
        hoverTextColor="#fff"
        onClick={() => console.log("The 2nd Halomot button has been clicked!")}
      />
      {/* Button with custom padding, fillWidth, and fixedWidth */}
      <HalomotButton 
        inscription="Custom padding"
        backgroundColor="var(--halomot-button-background)"
        textColor="var(--halomot-button-foreground)"
        padding="46px 24px"
        hoverTextColor="#fff"
        fillWidth={false}
        fixedWidth="200px"
        onClick={() => console.log("The 3rd Halomot button has been clicked!")}
      />
      {/* Always light-style button: white background, dark text, bright gradient, all props */}
      <HalomotButton
        inscription="That one has an icon and an href"
        backgroundColor="var(--halomot-button-background)"
        textColor="var(--halomot-button-foreground)"
        gradient="linear-gradient(90deg, #facc15 0%, #f472b6 100%)" // yellow to pink
        borderWidth="4px"
        outerBorderRadius="8px"
        innerBorderRadius="30px"
        padding="1.25rem 2.5rem"
        hoverTextColor="#fff"
        icon={<FaRegSmile />}
        fillWidth={false}
        href="https://www.github.com/Northstrix"
        onClick={() => console.log("The 4th Halomot button has been clicked!")}
      />
    </div>
  </section>
);

export { HalomotButtonDemo };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/halomot-button.tsx
"use client";
    import React, { useState, useRef } from "react";
    
    interface HalomotButtonProps {
      gradient?: string; // Gradient for the button border/background
      inscription: string; // Button text
      onClick: () => void;
      fillWidth?: boolean;
      fixedWidth?: string;
      href?: string;
      backgroundColor?: string; // Solid color for the inner button (not gradient)
      icon?: React.ReactElement;
      borderWidth?: string; // Controls the padding (thickness of the gradient border)
      padding?: string; // Custom padding for the inner button, e.g., "1rem 4rem"
      outerBorderRadius?: string; // Border radius for the gradient outer border
      innerBorderRadius?: string; // Border radius for the inner button
      textColor?: string; // Text color for the button, default #fff
      hoverTextColor?: string;
    }
    
    export const HalomotButton: React.FC<HalomotButtonProps> = ({
      gradient = "linear-gradient(135deg, #4776cb, #a19fe5, #6cc606)",
      inscription,
      onClick,
      fillWidth = false,
      fixedWidth,
      href,
      backgroundColor = "#000",
      icon,
      borderWidth = "1px",
      padding,
      outerBorderRadius = "6.34px",
      innerBorderRadius = "6px",
      textColor = "#fff",
      hoverTextColor,
    }) => {
      const [isHovered, setIsHovered] = useState(false);
      const [delayedColor, setDelayedColor] = useState<string | undefined>(undefined);
      const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    
      // Container style for fixed width
      const containerStyle: React.CSSProperties = fixedWidth
        ? { width: fixedWidth, display: "inline-block" }
        : {};
    
      // Outer button style (gradient border)
      const buttonStyle: React.CSSProperties = {
        margin: fillWidth || fixedWidth ? "0" : "auto",
        padding: borderWidth,
        background: gradient,
        border: "0",
        borderRadius: outerBorderRadius,
        color: textColor,
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textDecoration: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
        whiteSpace: "nowrap",
        transition: "all .3s",
        width: fillWidth || fixedWidth ? "100%" : "fit-content",
        flexDirection: "row",
        boxSizing: "border-box",
      };
    
      // Inner span style (actual clickable area)
      const spanStyle: React.CSSProperties = {
        background: isHovered ? "none" : backgroundColor,
        padding: padding ?? (fillWidth || fixedWidth ? "1rem 0" : "1rem 4rem"),
        border: "0",
        borderRadius: innerBorderRadius,
        width: "100%",
        height: "100%",
        transition: hoverTextColor ? "color 0.3s, background 300ms" : "background 300ms",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        color: delayedColor ? delayedColor : textColor,
        whiteSpace: "nowrap",
        fontFamily: "inherit",
        fontSize: "1rem",
        gap: icon ? "0.5em" : 0,
        flexDirection: "row",
        boxSizing: "border-box",
        cursor: "pointer",
      };
    
      // Icon style
      const iconStyle: React.CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        height: "1em",
        width: "1em",
        fontSize: "1.1em",
        verticalAlign: "middle",
        flexShrink: 0,
      };
    
      // No delay, just set color immediately
      const handleMouseEnter = () => {
        setIsHovered(true);
        if (hoverTextColor) {
          setDelayedColor(hoverTextColor);
        }
      };
    
      const handleMouseLeave = () => {
        setIsHovered(false);
        setDelayedColor(undefined);
      };
    
      const handleClick = (
        e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>
      ) => {
        e.preventDefault();
        onClick();
      };
    
      const ButtonContent = (
        <span
          style={spanStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {icon && React.cloneElement(icon, { style: iconStyle })}
          {inscription}
        </span>
      );
    
      const ButtonElement = href ? (
        <a href={href} style={buttonStyle} onClick={handleClick}>
          {ButtonContent}
        </a>
      ) : (
        <button type="button" style={buttonStyle} onClick={handleClick}>
          {ButtonContent}
        </button>
      );
    
      return fixedWidth ? (
        <div style={containerStyle}>{ButtonElement}</div>
      ) : (
        ButtonElement
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
