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
kinetic-log-stream.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info, Code } from 'lucide-react';

// A utility function for class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

// The main log stream component
const KineticLogStream = () => {
    const [logs, setLogs] = useState([]);
    const logContainerRef = useRef(null);

    const logTypes = [
        { type: 'INFO', icon: <Info className="h-4 w-4 text-blue-400" />, color: 'text-blue-400' },
        { type: 'SUCCESS', icon: <CheckCircle className="h-4 w-4 text-green-400" />, color: 'text-green-400' },
        { type: 'WARNING', icon: <AlertTriangle className="h-4 w-4 text-yellow-400" />, color: 'text-yellow-400' },
        { type: 'ERROR', icon: <AlertTriangle className="h-4 w-4 text-red-400" />, color: 'text-red-400' },
    ];

    const logMessages = [
        'Initializing system...',
        'Connection established to primary server.',
        'User authentication successful.',
        'Data packet received.',
        'Compiling assets...',
        'Deployment complete.',
        'High memory usage detected.',
        'Failed to connect to database.',
        'API endpoint returned 503.',
        'System health check OK.',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            const randomLogType = logTypes[Math.floor(Math.random() * logTypes.length)];
            const randomMessage = logMessages[Math.floor(Math.random() * logMessages.length)];
            const newLog = {
                id: Date.now() + Math.random(),
                timestamp: new Date().toLocaleTimeString(),
                ...randomLogType,
                message: randomMessage,
            };

            setLogs(prevLogs => [newLog, ...prevLogs.slice(0, 19)]);
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = 0;
        }
    }, [logs]);

    const logVariants = {
        initial: { opacity: 0, x: -50, scale: 0.8 },
        animate: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
        exit: { opacity: 0, x: 50, transition: { duration: 0.3 } }
    };

    return (
        <div className="relative w-full min-h-screen bg-[#0c0a09] flex flex-col items-center justify-center p-8 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="relative z-10 flex flex-col items-center text-center mb-8">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
                    className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 text-white"
                >
                    Live System Feed
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
                    className="text-lg text-slate-400 max-w-2xl"
                >
                    Witness our platform in action with a real-time stream of system events and metrics.
                </motion.p>
            </div>

            {/* Log Stream Container */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
                className="relative w-full max-w-4xl h-[500px] bg-black/50 backdrop-blur-md rounded-lg border border-slate-800 shadow-2xl shadow-slate-900/50"
            >
                <div className="absolute top-0 left-0 w-full h-12 bg-slate-900/80 rounded-t-lg flex items-center px-4">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <p className="mx-auto text-slate-400 text-sm">/var/log/system.log</p>
                </div>
                <div ref={logContainerRef} className="h-full pt-12 overflow-y-hidden font-mono text-sm text-slate-300 p-4">
                    <AnimatePresence initial={false}>
                        {logs.map(log => (
                            <motion.div
                                key={log.id}
                                layout
                                variants={logVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="flex items-start gap-4 mb-2"
                            >
                                <span className="text-slate-600">{log.timestamp}</span>
                                <div className={cn("flex items-center gap-2 font-bold w-24", log.color)}>
                                    {log.icon}
                                    <span>[{log.type}]</span>
                                </div>
                                <span>{log.message}</span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                 <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
            </motion.div>
        </div>
    );
};


export default KineticLogStream;

code.demo.1756183351407.tsx
import KineticLogStream from "@/components/ui/kinetic-log-stream";

export default function DemoOne() {
  return <KineticLogStream />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/kinetic-log-stream.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info, Code } from 'lucide-react';

// A utility function for class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

// The main log stream component
const KineticLogStream = () => {
    const [logs, setLogs] = useState([]);
    const logContainerRef = useRef(null);

    const logTypes = [
        { type: 'INFO', icon: <Info className="h-4 w-4 text-blue-400" />, color: 'text-blue-400' },
        { type: 'SUCCESS', icon: <CheckCircle className="h-4 w-4 text-green-400" />, color: 'text-green-400' },
        { type: 'WARNING', icon: <AlertTriangle className="h-4 w-4 text-yellow-400" />, color: 'text-yellow-400' },
        { type: 'ERROR', icon: <AlertTriangle className="h-4 w-4 text-red-400" />, color: 'text-red-400' },
    ];

    const logMessages = [
        'Initializing system...',
        'Connection established to primary server.',
        'User authentication successful.',
        'Data packet received.',
        'Compiling assets...',
        'Deployment complete.',
        'High memory usage detected.',
        'Failed to connect to database.',
        'API endpoint returned 503.',
        'System health check OK.',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            const randomLogType = logTypes[Math.floor(Math.random() * logTypes.length)];
            const randomMessage = logMessages[Math.floor(Math.random() * logMessages.length)];
            const newLog = {
                id: Date.now() + Math.random(),
                timestamp: new Date().toLocaleTimeString(),
                ...randomLogType,
                message: randomMessage,
            };

            setLogs(prevLogs => [newLog, ...prevLogs.slice(0, 19)]);
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = 0;
        }
    }, [logs]);

    const logVariants = {
        initial: { opacity: 0, x: -50, scale: 0.8 },
        animate: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
        exit: { opacity: 0, x: 50, transition: { duration: 0.3 } }
    };

    return (
        <div className="relative w-full min-h-screen bg-[#0c0a09] flex flex-col items-center justify-center p-8 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="relative z-10 flex flex-col items-center text-center mb-8">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
                    className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 text-white"
                >
                    Live System Feed
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
                    className="text-lg text-slate-400 max-w-2xl"
                >
                    Witness our platform in action with a real-time stream of system events and metrics.
                </motion.p>
            </div>

            {/* Log Stream Container */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
                className="relative w-full max-w-4xl h-[500px] bg-black/50 backdrop-blur-md rounded-lg border border-slate-800 shadow-2xl shadow-slate-900/50"
            >
                <div className="absolute top-0 left-0 w-full h-12 bg-slate-900/80 rounded-t-lg flex items-center px-4">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <p className="mx-auto text-slate-400 text-sm">/var/log/system.log</p>
                </div>
                <div ref={logContainerRef} className="h-full pt-12 overflow-y-hidden font-mono text-sm text-slate-300 p-4">
                    <AnimatePresence initial={false}>
                        {logs.map(log => (
                            <motion.div
                                key={log.id}
                                layout
                                variants={logVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="flex items-start gap-4 mb-2"
                            >
                                <span className="text-slate-600">{log.timestamp}</span>
                                <div className={cn("flex items-center gap-2 font-bold w-24", log.color)}>
                                    {log.icon}
                                    <span>[{log.type}]</span>
                                </div>
                                <span>{log.message}</span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                 <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
            </motion.div>
        </div>
    );
};


export default KineticLogStream;
```

Install NPM dependencies:
```bash
framer-motion, lucide-react
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
