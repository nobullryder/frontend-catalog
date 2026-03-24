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
hover-zoom.tsx
// --- Pure UI Component ---
// Этот компонент остается неизменным. Он уже чист, переиспользуем
// и не зависит от какой-либо внешней среды.

import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { useState, startTransition } from "react";

/**
 * ZoomImageUI - это "глупый" компонент, который отображает изображение
 * и увеличивает его при наведении курсора.
 * Вся конфигурация (масштаб, цвета, изображение) передается через props.
 */
export function ZoomImageUI({
    image = { 
        src: "https://framerusercontent.com/images/70D908ZnP0cnDre3T7DlePO12M.jpeg", 
        alt: "3D Gradient Waves" 
    },
    zoomScale = 2.5,
    transition = { duration: 0.1, ease: "easeInOut" },
    backgroundColor = "#FFFFFF",
    borderRadius = 8,
    style,
}) {
    const [isHovered, setIsHovered] = useState(false);

    const zoomInStyle = { scale: zoomScale };
    const zoomOutStyle = { scale: 1 };

    const updateTransformOrigin = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const childElement = e.currentTarget.firstChild;
        if (childElement) {
            childElement.style.transformOrigin = `${x}px ${y}px`;
        }
    };
    
    const handleMouseEnter = () => startTransition(() => setIsHovered(true));
    const handleMouseLeave = () => startTransition(() => setIsHovered(false));

    return (
        <motion.div
            style={{
                ...style,
                overflow: "hidden",
                position: "relative",
                backgroundColor,
                borderRadius,
                width: "100%",
                height: "100%",
            }}
            onMouseMove={updateTransformOrigin}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                animate={isHovered ? zoomInStyle : zoomOutStyle}
                transition={transition}
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <img
                    src={image.src}
                    alt={image.alt}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </motion.div>
        </motion.div>
    );
}

code.demo.1754048155741.tsx
// --- Demo/Wrapper Component ---
// Это универсальный демонстрационный компонент. Он не зависит от Framer
// и может быть отрендерен в любом React-приложении (Vite, Storybook и т.д.).

import { jsx as _jsx } from "react/jsx-runtime";
// Предполагается, что чистый компонент лежит в соседнем файле.
// Адаптируйте путь импорта под вашу структуру проекта.
import { ZoomImageUI } from "@/components/ui/hover-zoom";

/**
 * ZoomImageDemo - это "умная" обертка, которая показывает, как
 * использовать ZoomImageUI. Она задает окружение (размеры, центрирование)
 * и передает конкретные props для демонстрации.
 */
export default function ZoomImageDemo() {
    // Враппер для демонстрации. Создаем контейнер, чтобы компонент
    // было удобно просматривать.
    const demoContainerStyles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh", // Занимает весь экран для наглядности
        background: "#f0f0f0",
    };

    // Определяем конкретные props для одного экземпляра компонента.
    // Это заменяет логику addPropertyControls.
    const componentProps = {
        zoomScale: 2,
        borderRadius: 16,
        backgroundColor: "#000",
        image: {
            src: "https://framerusercontent.com/images/70D908ZnP0cnDre3T7DlePO12M.jpeg",
            alt: "Colorful abstract background",
        },
        // Задаем фиксированные размеры для демонстрационного компонента
        style: {
            width: "300px",
            height: "300px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }
    };

    return (
        <div style={demoContainerStyles}>
            <ZoomImageUI {...componentProps} />
        </div>
    );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/hover-zoom.tsx
// --- Pure UI Component ---
// Этот компонент остается неизменным. Он уже чист, переиспользуем
// и не зависит от какой-либо внешней среды.

import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { useState, startTransition } from "react";

/**
 * ZoomImageUI - это "глупый" компонент, который отображает изображение
 * и увеличивает его при наведении курсора.
 * Вся конфигурация (масштаб, цвета, изображение) передается через props.
 */
export function ZoomImageUI({
    image = { 
        src: "https://framerusercontent.com/images/70D908ZnP0cnDre3T7DlePO12M.jpeg", 
        alt: "3D Gradient Waves" 
    },
    zoomScale = 2.5,
    transition = { duration: 0.1, ease: "easeInOut" },
    backgroundColor = "#FFFFFF",
    borderRadius = 8,
    style,
}) {
    const [isHovered, setIsHovered] = useState(false);

    const zoomInStyle = { scale: zoomScale };
    const zoomOutStyle = { scale: 1 };

    const updateTransformOrigin = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const childElement = e.currentTarget.firstChild;
        if (childElement) {
            childElement.style.transformOrigin = `${x}px ${y}px`;
        }
    };
    
    const handleMouseEnter = () => startTransition(() => setIsHovered(true));
    const handleMouseLeave = () => startTransition(() => setIsHovered(false));

    return (
        <motion.div
            style={{
                ...style,
                overflow: "hidden",
                position: "relative",
                backgroundColor,
                borderRadius,
                width: "100%",
                height: "100%",
            }}
            onMouseMove={updateTransformOrigin}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                animate={isHovered ? zoomInStyle : zoomOutStyle}
                transition={transition}
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <img
                    src={image.src}
                    alt={image.alt}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </motion.div>
        </motion.div>
    );
}
```

Install NPM dependencies:
```bash
framer-motion
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
