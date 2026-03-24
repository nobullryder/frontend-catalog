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
particle-animation.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Mouse {
    x: number;
    y: number;
    smoothX: number;
    smoothY: number;
    diff: number;
    vx?: number;
    vy?: number;
}

interface Viewport {
    width: number;
    height: number;
}

class Particle {
    size: number;
    x: number;
    y: number;
    seed: number;
    freq: number;
    amplitude: number;
    color: string;
    el: SVGCircleElement;

    constructor(x: number, y: number, size: number, particles: Particle[]) {
        this.size = size;
        this.x = x;
        this.y = y;
        this.seed = Math.random() * 1000;
        this.freq = (0.5 + Math.random() * 1) * 0.01;
        this.amplitude = (1 - Math.random() * 2) * 0.5;
        this.color = '#fff';

        this.el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.el.setAttribute('cx', this.x.toString());
        this.el.setAttribute('cy', this.y.toString());
        this.el.setAttribute('r', this.size.toString());
        this.el.setAttribute('fill', this.color);

        const tl = gsap.timeline();
        tl.to(this, {
            size: this.size * 2,
            ease: 'power1.inOut',
            duration: 2
        });
        tl.to(this, {
            size: 0,
            ease: 'power4.in',
            duration: 4
        }, 3);
        tl.call(() => this.kill(particles));
    }

    kill(particles: Particle[]) {
        const index = particles.indexOf(this);
        if (index > -1) {
            particles.splice(index, 1);
        }
        this.el.remove();
    }

    render() {
        this.el.setAttribute('cy', this.y.toString());
        this.el.setAttribute('cx', this.x.toString());
        this.el.setAttribute('r', this.size.toString());
    }
}

export default function ParticleAnimation() {
    const svgRef = useRef<SVGSVGElement>(null);
    const wrapperRef = useRef<SVGGElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const wordRef = useRef<HTMLDivElement>(null);

    const mouseRef = useRef<Mouse>({
        x: 0,
        y: 0,
        smoothX: 0,
        smoothY: 0,
        diff: 0,
        vx: 0,
        vy: 0
    });

    const viewportRef = useRef<Viewport>({
        width: typeof window !== 'undefined' ? window.innerWidth : 1920,
        height: typeof window !== 'undefined' ? window.innerHeight : 1080
    });

    const particlesRef = useRef<Particle[]>([]);
    const animationIdRef = useRef<number>();

    useEffect(() => {
        const mouse = mouseRef.current;
        const viewport = viewportRef.current;
        const particles = particlesRef.current;

        const onMouseMove = (e: MouseEvent) => {
            if (mouse.vx !== undefined && mouse.vy !== undefined) {
                mouse.vx += mouse.x - e.pageX;
                mouse.vy += mouse.y - e.pageY;
            }
            mouse.x = e.pageX;
            mouse.y = e.pageY;
        };

        const onResize = () => {
            viewport.width = window.innerWidth;
            viewport.height = window.innerHeight;

            if (svgRef.current) {
                svgRef.current.style.width = viewport.width + 'px';
                svgRef.current.style.height = viewport.height + 'px';
            }

            if (wordRef.current) {
                const maxScale = viewport.height / (wordRef.current.clientHeight * 0.75);
                wordRef.current.style.setProperty('--max-scale', maxScale.toString());
            }
        };

        const emitParticle = () => {
            let x = 0;
            let y = 0;
            let size = 0;

            if (mouse.diff > 0.01) {
                x = mouse.smoothX;
                y = mouse.smoothY;
                size = mouse.diff * 0.2;
            }

            const particle = new Particle(x, y, size, particles);
            particles.push(particle);

            if (wrapperRef.current) {
                wrapperRef.current.prepend(particle.el);
            }
        };

        const render = () => {
            mouse.smoothX += (mouse.x - mouse.smoothX) * 0.1;
            mouse.smoothY += (mouse.y - mouse.smoothY) * 0.1;
            mouse.diff = Math.hypot(mouse.x - mouse.smoothX, mouse.y - mouse.smoothY);

            emitParticle();

            if (cursorRef.current) {
                cursorRef.current.style.setProperty('--x', mouse.smoothX + 'px');
                cursorRef.current.style.setProperty('--y', mouse.smoothY + 'px');
            }

            particles.forEach((particle: Particle) => {
                particle.render();
            });

            animationIdRef.current = requestAnimationFrame(render);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onResize);

        onResize();
        render();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        };
    }, []);

    return (
        <>
            <div className="s-hero">
                <h1 className="s__title">
                    100 Day Challenge<br />
                    by Suz Sirunyan<br />
                    Day 88/100
                </h1>
                <div className="s__catcher">Underneath It all</div>
                <div className="s__burger">
                    <div className="s__burger__line"></div>
                    <div className="s__burger__line"></div>
                    <div className="s__burger__line"></div>
                </div>
            </div>

            <div className="s-scene">
                <div className="s__title">
                    <div className="s__title__line">We Are All</div>
                    <div className="s__title__line">A Little Bit</div>
                </div>
                <div className="s__word js-word" ref={wordRef}>
                    <div className="s__word__char">M</div>
                    <div className="s__word__char">A</div>
                    <div className="s__word__char">D</div>
                </div>
            </div>

            <div className="cursor js-cursor" ref={cursorRef}></div>

            <svg
                ref={svgRef}
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                width="100"
                height="100"
                className="s-svg js-svg"
            >
                <mask id="mask">
                    <g ref={wrapperRef} filter="url(#gooey)"></g>
                </mask>
                <filter id="gooey">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="25" />
                    <feColorMatrix
                        type="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -7"
                        result="goo"
                    />
                </filter>
            </svg>
        </>
    );
}

code.demo.1758723593702.tsx
import React from 'react'
import ParticleAnimation from '../components/ui/particle-animation'

export default function Demo() {
  return <ParticleAnimation />
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/particle-animation.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Mouse {
    x: number;
    y: number;
    smoothX: number;
    smoothY: number;
    diff: number;
    vx?: number;
    vy?: number;
}

interface Viewport {
    width: number;
    height: number;
}

class Particle {
    size: number;
    x: number;
    y: number;
    seed: number;
    freq: number;
    amplitude: number;
    color: string;
    el: SVGCircleElement;

    constructor(x: number, y: number, size: number, particles: Particle[]) {
        this.size = size;
        this.x = x;
        this.y = y;
        this.seed = Math.random() * 1000;
        this.freq = (0.5 + Math.random() * 1) * 0.01;
        this.amplitude = (1 - Math.random() * 2) * 0.5;
        this.color = '#fff';

        this.el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.el.setAttribute('cx', this.x.toString());
        this.el.setAttribute('cy', this.y.toString());
        this.el.setAttribute('r', this.size.toString());
        this.el.setAttribute('fill', this.color);

        const tl = gsap.timeline();
        tl.to(this, {
            size: this.size * 2,
            ease: 'power1.inOut',
            duration: 2
        });
        tl.to(this, {
            size: 0,
            ease: 'power4.in',
            duration: 4
        }, 3);
        tl.call(() => this.kill(particles));
    }

    kill(particles: Particle[]) {
        const index = particles.indexOf(this);
        if (index > -1) {
            particles.splice(index, 1);
        }
        this.el.remove();
    }

    render() {
        this.el.setAttribute('cy', this.y.toString());
        this.el.setAttribute('cx', this.x.toString());
        this.el.setAttribute('r', this.size.toString());
    }
}

export default function ParticleAnimation() {
    const svgRef = useRef<SVGSVGElement>(null);
    const wrapperRef = useRef<SVGGElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const wordRef = useRef<HTMLDivElement>(null);

    const mouseRef = useRef<Mouse>({
        x: 0,
        y: 0,
        smoothX: 0,
        smoothY: 0,
        diff: 0,
        vx: 0,
        vy: 0
    });

    const viewportRef = useRef<Viewport>({
        width: typeof window !== 'undefined' ? window.innerWidth : 1920,
        height: typeof window !== 'undefined' ? window.innerHeight : 1080
    });

    const particlesRef = useRef<Particle[]>([]);
    const animationIdRef = useRef<number>();

    useEffect(() => {
        const mouse = mouseRef.current;
        const viewport = viewportRef.current;
        const particles = particlesRef.current;

        const onMouseMove = (e: MouseEvent) => {
            if (mouse.vx !== undefined && mouse.vy !== undefined) {
                mouse.vx += mouse.x - e.pageX;
                mouse.vy += mouse.y - e.pageY;
            }
            mouse.x = e.pageX;
            mouse.y = e.pageY;
        };

        const onResize = () => {
            viewport.width = window.innerWidth;
            viewport.height = window.innerHeight;

            if (svgRef.current) {
                svgRef.current.style.width = viewport.width + 'px';
                svgRef.current.style.height = viewport.height + 'px';
            }

            if (wordRef.current) {
                const maxScale = viewport.height / (wordRef.current.clientHeight * 0.75);
                wordRef.current.style.setProperty('--max-scale', maxScale.toString());
            }
        };

        const emitParticle = () => {
            let x = 0;
            let y = 0;
            let size = 0;

            if (mouse.diff > 0.01) {
                x = mouse.smoothX;
                y = mouse.smoothY;
                size = mouse.diff * 0.2;
            }

            const particle = new Particle(x, y, size, particles);
            particles.push(particle);

            if (wrapperRef.current) {
                wrapperRef.current.prepend(particle.el);
            }
        };

        const render = () => {
            mouse.smoothX += (mouse.x - mouse.smoothX) * 0.1;
            mouse.smoothY += (mouse.y - mouse.smoothY) * 0.1;
            mouse.diff = Math.hypot(mouse.x - mouse.smoothX, mouse.y - mouse.smoothY);

            emitParticle();

            if (cursorRef.current) {
                cursorRef.current.style.setProperty('--x', mouse.smoothX + 'px');
                cursorRef.current.style.setProperty('--y', mouse.smoothY + 'px');
            }

            particles.forEach((particle: Particle) => {
                particle.render();
            });

            animationIdRef.current = requestAnimationFrame(render);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onResize);

        onResize();
        render();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        };
    }, []);

    return (
        <>
            <div className="s-hero">
                <h1 className="s__title">
                    100 Day Challenge<br />
                    by Suz Sirunyan<br />
                    Day 88/100
                </h1>
                <div className="s__catcher">Underneath It all</div>
                <div className="s__burger">
                    <div className="s__burger__line"></div>
                    <div className="s__burger__line"></div>
                    <div className="s__burger__line"></div>
                </div>
            </div>

            <div className="s-scene">
                <div className="s__title">
                    <div className="s__title__line">We Are All</div>
                    <div className="s__title__line">A Little Bit</div>
                </div>
                <div className="s__word js-word" ref={wordRef}>
                    <div className="s__word__char">M</div>
                    <div className="s__word__char">A</div>
                    <div className="s__word__char">D</div>
                </div>
            </div>

            <div className="cursor js-cursor" ref={cursorRef}></div>

            <svg
                ref={svgRef}
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                width="100"
                height="100"
                className="s-svg js-svg"
            >
                <mask id="mask">
                    <g ref={wrapperRef} filter="url(#gooey)"></g>
                </mask>
                <filter id="gooey">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="25" />
                    <feColorMatrix
                        type="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -7"
                        result="goo"
                    />
                </filter>
            </svg>
        </>
    );
}
```

Install NPM dependencies:
```bash
gsap
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
