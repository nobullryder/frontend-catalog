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
tinder-like-swipe.tsx
// File: ./SwipeableCardStack.jsx
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SwipeableCardStack({
    images = [],
    borderRadius = 16,
    showInnerShadows = true,
    greenShadowColor = "rgba(45, 150, 45, 0.75)",
    redShadowColor = "rgba(224, 83, 83, 0.75)",
    innerStrokeColor = "rgba(0, 0, 0, 0.1)",
    shadowSize = "0 8px 20px",
    shadowBlur = "rgba(0, 0, 0, 0.3)",
    rightIcon = null,
    leftIcon = null,
}) {
    const [cards, setCards] = React.useState([...images]);
    const [dragDirections, setDragDirections] = React.useState({});
    const swipeThreshold = 100;

    React.useEffect(() => {
        if (images.length > 0 && cards.length === 0) {
            const timer = setTimeout(() => {
                setCards([...images]);
                setDragDirections({});
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [cards.length, images]);

    React.useEffect(() => { setCards([...images]); }, [images]);

    const handleDrag = (event, info, index) => {
        setDragDirections((prev) => ({ ...prev, [index]: info.offset.x > 0 ? "right" : "left" }));
    };

    const handleDragEnd = (event, info, index) => {
        if (Math.abs(info.offset.x) > swipeThreshold) {
            handleSwipe(index, dragDirections[index]);
        } else {
            setDragDirections((prev) => ({ ...prev, [index]: null }));
        }
    };

    const handleSwipe = (index, direction) => {
        setDragDirections((prev) => ({ ...prev, [index]: direction }));
        setTimeout(() => {
            setCards((prevCards) => prevCards.filter((_, i) => i !== index));
        }, 300);
    };
    
    // ... (остальной код компонента без изменений)
    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <AnimatePresence>
                {cards.map((image, index) => {
                    const isTopCard = index === cards.length - 1;
                    const direction = dragDirections[index];
                    return (
                        <motion.div
                            key={image + index}
                            drag={isTopCard ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.5}
                            onDrag={(e, i) => handleDrag(e, i, index)}
                            onDragEnd={(e, i) => handleDragEnd(e, i, index)}
                            custom={{ direction }}
                            initial={{ scale: 0.95, y: 20, opacity: 0 }}
                            animate={{ scale: isTopCard ? 1 : 0.95, y: isTopCard ? 0 : -20, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }}
                            exit="exit"
                            variants={{ exit: (custom) => ({ x: (custom?.direction || "left") === "right" ? 300 : -300, rotate: (custom?.direction || "left") === "right" ? 20 : -20, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }) }}
                            style={{ position: "absolute", width: "100%", height: "100%", backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center", borderRadius, boxShadow: `inset 0 0 0 1px ${innerStrokeColor}, ${shadowSize} ${shadowBlur}`, cursor: isTopCard ? "grab" : "default" }}
                        >
                            {isTopCard && showInnerShadows && (
                                <>
                                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", borderRadius, pointerEvents: "none", boxShadow: direction === "right" ? `inset 0px -80px 60px ${greenShadowColor}` : direction === "left" ? `inset 0px -80px 60px ${redShadowColor}` : "none", transition: "box-shadow 0.2s ease-out" }}/>
                                    {direction && (rightIcon || leftIcon) && <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: 1 }}><img src={direction === "right" ? rightIcon : leftIcon} alt="" style={{ width: "80px", height: "80px", objectFit: "contain" }}/></div>}
                                </>
                            )}
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}

code.demo.1754051550341.tsx
// File: App.jsx (или ваш главный файл для предпросмотра)

import * as React from "react";
// Мы импортируем ТОЛЬКО чистый компонент. Никаких зависимостей от Framer.
import { SwipeableCardStack } from "@/components/ui/tinder-like-swipe";

// Это наш Демо-Контейнер. Его единственная задача - показать компонент в действии.
export default function TinderSwipeDemo() {
    // Данные для демонстрации, которые в Framer приходят из property controls
    const demoProps = {
        images: [
            "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
            "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=662&q=80",
        ],
        rightIcon: "https://uploads-ssl.webflow.com/6226162356726c4835057a73/6232367c3761286ddff6004c_icon-like.svg",
        leftIcon: "https://uploads-ssl.webflow.com/6226162356726c4835057a73/6232367c825de783a6697a3c_icon-dislike.svg",
        borderRadius: 20,
    };

    return (
        // 1. Контейнер для центрирования и красивого фона
        <div style={{
            display: "grid",
            placeItems: "center",
            width: "100vw",
            height: "100vh",
            background: "#e0e0e0",
        }}>
            {/* 2. Обертка, задающая размер карточке */}
            <div style={{ width: "300px", height: "400px" }}>
                {/* 3. Вызываем чистый компонент с нашими демо-пропсами */}
                <SwipeableCardStack {...demoProps} />
            </div>
        </div>
    );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/tinder-like-swipe.tsx
// File: ./SwipeableCardStack.jsx
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SwipeableCardStack({
    images = [],
    borderRadius = 16,
    showInnerShadows = true,
    greenShadowColor = "rgba(45, 150, 45, 0.75)",
    redShadowColor = "rgba(224, 83, 83, 0.75)",
    innerStrokeColor = "rgba(0, 0, 0, 0.1)",
    shadowSize = "0 8px 20px",
    shadowBlur = "rgba(0, 0, 0, 0.3)",
    rightIcon = null,
    leftIcon = null,
}) {
    const [cards, setCards] = React.useState([...images]);
    const [dragDirections, setDragDirections] = React.useState({});
    const swipeThreshold = 100;

    React.useEffect(() => {
        if (images.length > 0 && cards.length === 0) {
            const timer = setTimeout(() => {
                setCards([...images]);
                setDragDirections({});
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [cards.length, images]);

    React.useEffect(() => { setCards([...images]); }, [images]);

    const handleDrag = (event, info, index) => {
        setDragDirections((prev) => ({ ...prev, [index]: info.offset.x > 0 ? "right" : "left" }));
    };

    const handleDragEnd = (event, info, index) => {
        if (Math.abs(info.offset.x) > swipeThreshold) {
            handleSwipe(index, dragDirections[index]);
        } else {
            setDragDirections((prev) => ({ ...prev, [index]: null }));
        }
    };

    const handleSwipe = (index, direction) => {
        setDragDirections((prev) => ({ ...prev, [index]: direction }));
        setTimeout(() => {
            setCards((prevCards) => prevCards.filter((_, i) => i !== index));
        }, 300);
    };
    
    // ... (остальной код компонента без изменений)
    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <AnimatePresence>
                {cards.map((image, index) => {
                    const isTopCard = index === cards.length - 1;
                    const direction = dragDirections[index];
                    return (
                        <motion.div
                            key={image + index}
                            drag={isTopCard ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.5}
                            onDrag={(e, i) => handleDrag(e, i, index)}
                            onDragEnd={(e, i) => handleDragEnd(e, i, index)}
                            custom={{ direction }}
                            initial={{ scale: 0.95, y: 20, opacity: 0 }}
                            animate={{ scale: isTopCard ? 1 : 0.95, y: isTopCard ? 0 : -20, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }}
                            exit="exit"
                            variants={{ exit: (custom) => ({ x: (custom?.direction || "left") === "right" ? 300 : -300, rotate: (custom?.direction || "left") === "right" ? 20 : -20, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }) }}
                            style={{ position: "absolute", width: "100%", height: "100%", backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center", borderRadius, boxShadow: `inset 0 0 0 1px ${innerStrokeColor}, ${shadowSize} ${shadowBlur}`, cursor: isTopCard ? "grab" : "default" }}
                        >
                            {isTopCard && showInnerShadows && (
                                <>
                                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", borderRadius, pointerEvents: "none", boxShadow: direction === "right" ? `inset 0px -80px 60px ${greenShadowColor}` : direction === "left" ? `inset 0px -80px 60px ${redShadowColor}` : "none", transition: "box-shadow 0.2s ease-out" }}/>
                                    {direction && (rightIcon || leftIcon) && <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: 1 }}><img src={direction === "right" ? rightIcon : leftIcon} alt="" style={{ width: "80px", height: "80px", objectFit: "contain" }}/></div>}
                                </>
                            )}
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
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
