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
pricing-cards.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CircleCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

interface PricingFeature {
  text: string;
}
interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: PricingFeature[];
  button: {
    text: string;
    url: string;
  };
}
interface Pricing2Props {
  heading?: string;
  description?: string;
  plans?: PricingPlan[];
}

const Pricing2 = ({
  heading = "Plans & Pricing",
  description = "Choose the plan that matches your workflow and scale with ease.",
  plans = [
    {
      id: "starter",
      name: "Starter",
      description: "For individuals just getting started",
      monthlyPrice: "$12",
      yearlyPrice: "$9",
      features: [
        { text: "1 project" },
        { text: "Basic analytics" },
        { text: "Email support" },
        { text: "500MB storage" },
      ],
      button: {
        text: "Get Started",
        url: "https://21st.dev",
      },
    },
    {
      id: "growth",
      name: "Growth",
      description: "For teams building serious products",
      monthlyPrice: "$39",
      yearlyPrice: "$29",
      features: [
        { text: "Unlimited projects" },
        { text: "Team collaboration tools" },
        { text: "Priority chat support" },
        { text: "Advanced analytics" },
      ],
      button: {
        text: "Upgrade Now",
        url: "https://21st.dev",
      },
    },
  ],
}: Pricing2Props) => {
  const [isYearly, setIsYearly] = useState(false);

  // --- minimal hero particles ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const setSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect?.width ?? window.innerWidth));
      const h = Math.max(1, Math.floor(rect?.height ?? window.innerHeight));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    type P = { x: number; y: number; v: number; o: number };
    let parts: P[] = [];
    let raf = 0;

    const make = (): P => ({
      x: Math.random() * (canvas.width / (window.devicePixelRatio || 1)),
      y: Math.random() * (canvas.height / (window.devicePixelRatio || 1)),
      v: Math.random() * 0.25 + 0.05,
      o: Math.random() * 0.35 + 0.15,
    });

    const init = () => {
      parts = [];
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      const count = Math.floor((w * h) / 12000);
      for (let i = 0; i < count; i++) parts.push(make());
    };

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);
      parts.forEach((p) => {
        p.y -= p.v;
        if (p.y < 0) {
          p.x = Math.random() * w;
          p.y = h + Math.random() * 40;
          p.v = Math.random() * 0.25 + 0.05;
          p.o = Math.random() * 0.35 + 0.15;
        }
        ctx.fillStyle = `rgba(250,250,250,${p.o})`;
        ctx.fillRect(p.x, p.y, 0.7, 2.2);
      });
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      setSize();
      init();
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(canvas.parentElement || document.body);

    init();
    raf = requestAnimationFrame(draw);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      data-locked
      className="relative min-h-screen py-24 md:py-32 bg-zinc-950 text-zinc-50 overflow-hidden isolate"
    >
      <style>{`
        :where(html, body, #__next){
          margin:0; min-height:100%;
          background:#0b0b0c; color:#f6f7f8; color-scheme:dark;
          overflow-x:hidden; scrollbar-gutter:stable both-edges;
        }
        html{ background:#0b0b0c }
        section[data-locked]{ color:#f6f7f8; color-scheme:dark }
        .accent-lines{position:absolute;inset:0;pointer-events:none;opacity:.7}
        .hline,.vline{position:absolute;background:#27272a}
        .hline{left:0;right:0;height:1px;transform:scaleX(0);transform-origin:50% 50%;animation:drawX .6s ease forwards}
        .vline{top:0;bottom:0;width:1px;transform:scaleY(0);transform-origin:50% 0%;animation:drawY .7s ease forwards}
        .hline:nth-child(1){top:18%;animation-delay:.08s}
        .hline:nth-child(2){top:50%;animation-delay:.16s}
        .hline:nth-child(3){top:82%;animation-delay:.24s}
        .vline:nth-child(4){left:18%;animation-delay:.20s}
        .vline:nth-child(5){left:50%;animation-delay:.28s}
        .vline:nth-child(6){left:82%;animation-delay:.36s}
        @keyframes drawX{to{transform:scaleX(1)}}
        @keyframes drawY{to{transform:scaleY(1)}}
        .card-animate{opacity:0;transform:translateY(12px);animation:fadeUp .6s ease .25s forwards}
        @keyframes fadeUp{to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(80%_60%_at_50%_15%,rgba(255,255,255,0.06),transparent_60%)]" />

      {/* Animated accent lines */}
      <div aria-hidden className="accent-lines">
        <div className="hline" />
        <div className="hline" />
        <div className="hline" />
        <div className="vline" />
        <div className="vline" />
        <div className="vline" />
      </div>

      {/* Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
      />

      {/* Content */}
      <div className="relative container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h2 className="text-pretty text-4xl font-bold lg:text-6xl">{heading}</h2>
          <p className="text-zinc-400 lg:text-xl">{description}</p>

          <div className="flex items-center gap-3 text-lg">
            Monthly
            <Switch checked={isYearly} onCheckedChange={() => setIsYearly(!isYearly)} />
            Yearly
          </div>

          <div className="mt-2 flex flex-col items-stretch gap-6 md:flex-row">
            {plans.map((plan, i) => (
              <Card
                key={plan.id}
                className={`card-animate flex w-80 flex-col justify-between text-left border-zinc-800 bg-zinc-900/70 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/60 ${
                  i === 1 ? "md:translate-y-2" : ""
                }`}
                style={{ animationDelay: `${0.25 + i * 0.08}s` }}
              >
                <CardHeader>
                  <CardTitle>
                    <p className="text-zinc-50">{plan.name}</p>
                  </CardTitle>
                  <p className="text-sm text-zinc-400">{plan.description}</p>
                  <span className="text-4xl font-bold text-white">
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <p className="text-zinc-500">
                    Billed{" "}
                    {isYearly
                      ? `$${Number(plan.yearlyPrice.slice(1)) * 12}`
                      : `$${Number(plan.monthlyPrice.slice(1)) * 12}`}{" "}
                    annually
                  </p>
                </CardHeader>

                <CardContent>
                  <Separator className="mb-6 bg-zinc-800" />
                  {plan.id === "growth" && (
                    <p className="mb-3 font-semibold text-zinc-200">
                      Everything in Starter, and:
                    </p>
                  )}
                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-zinc-200">
                        <CircleCheck className="size-4 text-zinc-400" />
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="mt-auto">
                  <Button
                    asChild
                    className="w-full rounded-lg bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
                  >
                    <a href={plan.button.url} target="_blank" rel="noreferrer">
                      {plan.button.text}
                      <ArrowRight className="ml-2 size-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing2 };


code.demo.1757404590704.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "For your hobby",
      features: [
        "Basic design tools",
        "Limited fabric and color options",
        "Standard customer support",
        "Access to community forums",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: isAnnual ? "$1099" : "$99",
      description: "For small business",
      features: [
        "Advanced design tools",
        "Unlimited fabric and color options",
        "Priority customer support",
        "Access to exclusive design templates",
        "High resolution 2D previews",
        "Feedback and adjustment tools",
      ],
      cta: "Upgrade to Pro",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For multiple teams",
      features: [
        "All pro features",
        "Custom branding options",
        "Dedicated account manager",
        "Enterprise-level support",
        "Custom integrations",
        "Bulk design options",
      ],
      cta: "Start with Enterprise",
      highlighted: false,
    },
  ];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const setSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect?.width ?? window.innerWidth));
      canvas.height = Math.max(1, Math.floor(rect?.height ?? window.innerHeight));
    };
    setSize();

    type P = { x: number; y: number; v: number; o: number };
    let ps: P[] = [];
    let raf = 0;

    const make = (): P => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      v: Math.random() * 0.25 + 0.05,
      o: Math.random() * 0.35 + 0.15,
    });

    const init = () => {
      ps = [];
      const count = Math.floor((canvas.width * canvas.height) / 12000);
      for (let i = 0; i < count; i++) ps.push(make());
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ps.forEach((p) => {
        p.y -= p.v;
        if (p.y < 0) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + Math.random() * 40;
          p.v = Math.random() * 0.25 + 0.05;
          p.o = Math.random() * 0.35 + 0.15;
        }
        ctx.fillStyle = `rgba(240,240,242,${p.o})`;
        ctx.fillRect(p.x, p.y, 0.7, 2.2);
      });
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      setSize();
      init();
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(canvas.parentElement || document.body);

    init();
    raf = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      data-locked
      style={
        {
          ["--bg" as any]: "#0b0b0c",
          ["--text" as any]: "#f6f7f8",
          ["--muted" as any]: "#a6a7ac",
          ["--border" as any]: "#2a2a2e",
          ["--card" as any]: "#111214",
          ["--card-muted" as any]: "#0f1012",
          ["--card-pop" as any]: "#15161a",
          ["--accent-line" as any]: "#27272a",
          ["--glow" as any]: "rgba(255,255,255,0.08)",
          ["--btn-primary-bg" as any]: "#f1f1f3",
          ["--btn-primary-fg" as any]: "#0c0c0d",
          ["--btn-ghost-border" as any]: "#2a2a2e",
          ["--btn-ghost-hover" as any]: "rgba(255,255,255,0.04)",
        } as React.CSSProperties
      }
      className={`relative w-full min-h-screen overflow-hidden ${ready ? "is-ready" : ""}`}
    >
      {/* GLOBAL FIXES: kill body margins, paint full-bleed bg, stabilize scrollbar width */}
      <style>{`
        :where(html, body, #__next){
          margin:0; min-height:100%; background:var(--bg); color:var(--text);
          overflow-x:hidden; scrollbar-gutter: stable both-edges;
        }
        /* lock dark visuals regardless of OS theme */
        section[data-locked]{background:var(--bg);color:var(--text);color-scheme:dark}
        @media (prefers-color-scheme: light){section[data-locked]{background:var(--bg);color:var(--text);color-scheme:dark}}
        
        .accent-lines{position:absolute;inset:0;pointer-events:none;opacity:.7}
        .accent-lines .hline,.accent-lines .vline{position:absolute;background:var(--accent-line);animation-fill-mode:forwards}
        .accent-lines .hline{left:0;right:0;height:1px;transform:scaleX(0);transform-origin:50% 50%}
        .accent-lines .vline{top:0;bottom:0;width:1px;transform:scaleY(0);transform-origin:50% 0%}
        .is-ready .accent-lines .hline:nth-of-type(1){top:18%;animation:drawX .6s ease .08s forwards}
        .is-ready .accent-lines .hline:nth-of-type(2){top:50%;animation:drawX .6s ease .16s forwards}
        .is-ready .accent-lines .hline:nth-of-type(3){top:82%;animation:drawX .6s ease .24s forwards}
        .is-ready .accent-lines .vline:nth-of-type(1){left:18%;animation:drawY .7s ease .20s forwards}
        .is-ready .accent-lines .vline:nth-of-type(2){left:50%;animation:drawY .7s ease .28s forwards}
        .is-ready .accent-lines .vline:nth-of-type(3){left:82%;animation:drawY .7s ease .36s forwards}
        @keyframes drawX{to{transform:scaleX(1)}}
        @keyframes drawY{to{transform:scaleY(1)}}
        .kicker,.title,.subtitle{opacity:0;transform:translateY(8px)}
        .is-ready .kicker{animation:kIn .5s ease .08s forwards;letter-spacing:.22em}
        .is-ready .title{animation:tIn .6s cubic-bezier(.22,1,.36,1) .16s forwards}
        .is-ready .subtitle{animation:sIn .6s ease .26s forwards}
        @keyframes kIn{to{opacity:.9;transform:none;letter-spacing:.14em}}
        @keyframes tIn{to{opacity:1;transform:none}}
        @keyframes sIn{to{opacity:1;transform:none}}
        .card{background:var(--card);border:1px solid var(--border);border-radius:16px}
        .card-pop{background:var(--card-pop);border:1px solid var(--border);border-radius:16px;transform:scale(1.02);box-shadow:0 10px 30px rgba(0,0,0,.35);backdrop-filter:blur(6px)}
        .card-muted{background:var(--card-muted)}
        .card-animate{opacity:0;transform:translateY(12px)}
        .is-ready .card-animate{animation:fadeUp .6s ease forwards}
        @keyframes fadeUp{to{opacity:1;transform:translateY(0)}}
        .btn-primary{width:100%;border-radius:12px;padding:10px 16px;font-weight:600;font-size:14px;background:var(--btn-primary-bg);color:var(--btn-primary-fg);transition:transform .15s ease,filter .15s ease,background .2s ease}
        .btn-primary:hover{filter:brightness(.95)}
        .btn-primary:active{transform:translateY(1px)}
        .btn-ghost{width:100%;border-radius:12px;padding:10px 16px;font-weight:600;font-size:14px;color:var(--text);border:1px solid var(--btn-ghost-border);background:transparent;transition:background .2s ease,transform .15s ease}
        .btn-ghost:hover{background:var(--btn-ghost-hover)}
        .btn-ghost:active{transform:translateY(1px)}
        .chip{position:relative;border:1px solid var(--border);background:rgba(17,18,20,.6);color:#e6e7ea;border-radius:9999px;padding:6px 12px;font-size:12px;font-weight:500}
        .chip::before{content:"";position:absolute;inset:0;border-radius:9999px;background:var(--glow);filter:blur(2px)}
        .vignette{position:absolute;inset:0;pointer-events:none;background:radial-gradient(80% 60% at 50% 12%, rgba(255,255,255,.06), transparent 60%)}
      `}</style>

      <div className="vignette" />

      <div aria-hidden className="accent-lines">
        <div className="hline" />
        <div className="hline" />
        <div className="hline" />
        <div className="vline" />
        <div className="vline" />
        <div className="vline" />
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-50 pointer-events-none"
      />

      <div className="relative mt-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mx-auto mb-12 max-w-3xl">
            <div className="kicker mb-2 text-xs uppercase tracking-[0.14em]" style={{ color: "#b5b6bb" }}>
              Pricing
            </div>
            <h1 className="title mb-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight" style={{ color: "var(--text)" }}>
              Plans and Pricing
            </h1>
            <p className="subtitle mb-6 text-lg" style={{ color: "var(--muted)" }}>
              Receive unlimited credits when you pay yearly, and save on your plan
            </p>

            <div className="subtitle inline-flex items-center rounded-full p-1" style={{ background: "rgba(255,255,255,0.03)" }}>
              <button
                aria-pressed={!isAnnual}
                style={{
                  padding: "10px 20px",
                  borderRadius: 9999,
                  fontSize: 14,
                  fontWeight: 600,
                  background: !isAnnual ? "rgba(255,255,255,0.06)" : "transparent",
                  color: !isAnnual ? "var(--text)" : "#b5b6bb",
                  transition: "background .2s ease, color .2s ease",
                }}
                onClick={() => setIsAnnual(false)}
              >
                Monthly
              </button>
              <button
                aria-pressed={isAnnual}
                style={{
                  padding: "10px 20px",
                  borderRadius: 9999,
                  fontSize: 14,
                  fontWeight: 600,
                  background: isAnnual ? "rgba(255,255,255,0.06)" : "transparent",
                  color: isAnnual ? "var(--text)" : "#b5b6bb",
                  transition: "background .2s ease, color .2s ease",
                }}
                onClick={() => setIsAnnual(true)}
              >
                Annual
              </button>
            </div>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`card-animate ${plan.highlighted ? "card-pop" : "card"}`}
                style={{ padding: 24, animationDelay: `${0.32 + index * 0.08}s` }}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full" style={{ background: "rgba(255,255,255,0.10)", filter: "blur(2px)" }} />
                      <div className="relative chip px-4 py-1.5" style={{ borderRadius: 9999, background: "rgba(20,20,24,0.6)" }}>
                        <div className="relative z-10 flex items-center gap-1.5">
                          <span className="inline-block h-1 w-1 animate-pulse rounded-full" style={{ background: "rgba(255,255,255,0.7)" }} />
                          <span style={{ fontSize: 12, fontWeight: 600, color: "#e6e7ea" }}>Most Popular</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="mb-2 text-xl font-medium" style={{ color: "var(--text)" }}>{plan.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold" style={{ color: "var(--text)" }}>{plan.price}</span>
                    {plan.price !== "Custom" && (
                      <span className="text-sm" style={{ color: "var(--muted)" }}>
                        per user/{isAnnual ? "year" : "month"}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-sm" style={{ color: "var(--muted)" }}>{plan.description}</p>
                </div>

                <div className="mb-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <Check className="h-4 w-4" style={{ color: "#8e9096" }} />
                      <span className="text-sm" style={{ color: "#d4d5d9" }}>{feature}</span>
                    </div>
                  ))}
                </div>

                <button className={plan.highlighted ? "btn-primary" : "btn-ghost"}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/pricing-cards.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CircleCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

interface PricingFeature {
  text: string;
}
interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: PricingFeature[];
  button: {
    text: string;
    url: string;
  };
}
interface Pricing2Props {
  heading?: string;
  description?: string;
  plans?: PricingPlan[];
}

const Pricing2 = ({
  heading = "Plans & Pricing",
  description = "Choose the plan that matches your workflow and scale with ease.",
  plans = [
    {
      id: "starter",
      name: "Starter",
      description: "For individuals just getting started",
      monthlyPrice: "$12",
      yearlyPrice: "$9",
      features: [
        { text: "1 project" },
        { text: "Basic analytics" },
        { text: "Email support" },
        { text: "500MB storage" },
      ],
      button: {
        text: "Get Started",
        url: "https://21st.dev",
      },
    },
    {
      id: "growth",
      name: "Growth",
      description: "For teams building serious products",
      monthlyPrice: "$39",
      yearlyPrice: "$29",
      features: [
        { text: "Unlimited projects" },
        { text: "Team collaboration tools" },
        { text: "Priority chat support" },
        { text: "Advanced analytics" },
      ],
      button: {
        text: "Upgrade Now",
        url: "https://21st.dev",
      },
    },
  ],
}: Pricing2Props) => {
  const [isYearly, setIsYearly] = useState(false);

  // --- minimal hero particles ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const setSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect?.width ?? window.innerWidth));
      const h = Math.max(1, Math.floor(rect?.height ?? window.innerHeight));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    type P = { x: number; y: number; v: number; o: number };
    let parts: P[] = [];
    let raf = 0;

    const make = (): P => ({
      x: Math.random() * (canvas.width / (window.devicePixelRatio || 1)),
      y: Math.random() * (canvas.height / (window.devicePixelRatio || 1)),
      v: Math.random() * 0.25 + 0.05,
      o: Math.random() * 0.35 + 0.15,
    });

    const init = () => {
      parts = [];
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      const count = Math.floor((w * h) / 12000);
      for (let i = 0; i < count; i++) parts.push(make());
    };

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);
      parts.forEach((p) => {
        p.y -= p.v;
        if (p.y < 0) {
          p.x = Math.random() * w;
          p.y = h + Math.random() * 40;
          p.v = Math.random() * 0.25 + 0.05;
          p.o = Math.random() * 0.35 + 0.15;
        }
        ctx.fillStyle = `rgba(250,250,250,${p.o})`;
        ctx.fillRect(p.x, p.y, 0.7, 2.2);
      });
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      setSize();
      init();
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(canvas.parentElement || document.body);

    init();
    raf = requestAnimationFrame(draw);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      data-locked
      className="relative min-h-screen py-24 md:py-32 bg-zinc-950 text-zinc-50 overflow-hidden isolate"
    >
      <style>{`
        :where(html, body, #__next){
          margin:0; min-height:100%;
          background:#0b0b0c; color:#f6f7f8; color-scheme:dark;
          overflow-x:hidden; scrollbar-gutter:stable both-edges;
        }
        html{ background:#0b0b0c }
        section[data-locked]{ color:#f6f7f8; color-scheme:dark }
        .accent-lines{position:absolute;inset:0;pointer-events:none;opacity:.7}
        .hline,.vline{position:absolute;background:#27272a}
        .hline{left:0;right:0;height:1px;transform:scaleX(0);transform-origin:50% 50%;animation:drawX .6s ease forwards}
        .vline{top:0;bottom:0;width:1px;transform:scaleY(0);transform-origin:50% 0%;animation:drawY .7s ease forwards}
        .hline:nth-child(1){top:18%;animation-delay:.08s}
        .hline:nth-child(2){top:50%;animation-delay:.16s}
        .hline:nth-child(3){top:82%;animation-delay:.24s}
        .vline:nth-child(4){left:18%;animation-delay:.20s}
        .vline:nth-child(5){left:50%;animation-delay:.28s}
        .vline:nth-child(6){left:82%;animation-delay:.36s}
        @keyframes drawX{to{transform:scaleX(1)}}
        @keyframes drawY{to{transform:scaleY(1)}}
        .card-animate{opacity:0;transform:translateY(12px);animation:fadeUp .6s ease .25s forwards}
        @keyframes fadeUp{to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(80%_60%_at_50%_15%,rgba(255,255,255,0.06),transparent_60%)]" />

      {/* Animated accent lines */}
      <div aria-hidden className="accent-lines">
        <div className="hline" />
        <div className="hline" />
        <div className="hline" />
        <div className="vline" />
        <div className="vline" />
        <div className="vline" />
      </div>

      {/* Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
      />

      {/* Content */}
      <div className="relative container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h2 className="text-pretty text-4xl font-bold lg:text-6xl">{heading}</h2>
          <p className="text-zinc-400 lg:text-xl">{description}</p>

          <div className="flex items-center gap-3 text-lg">
            Monthly
            <Switch checked={isYearly} onCheckedChange={() => setIsYearly(!isYearly)} />
            Yearly
          </div>

          <div className="mt-2 flex flex-col items-stretch gap-6 md:flex-row">
            {plans.map((plan, i) => (
              <Card
                key={plan.id}
                className={`card-animate flex w-80 flex-col justify-between text-left border-zinc-800 bg-zinc-900/70 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/60 ${
                  i === 1 ? "md:translate-y-2" : ""
                }`}
                style={{ animationDelay: `${0.25 + i * 0.08}s` }}
              >
                <CardHeader>
                  <CardTitle>
                    <p className="text-zinc-50">{plan.name}</p>
                  </CardTitle>
                  <p className="text-sm text-zinc-400">{plan.description}</p>
                  <span className="text-4xl font-bold text-white">
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <p className="text-zinc-500">
                    Billed{" "}
                    {isYearly
                      ? `$${Number(plan.yearlyPrice.slice(1)) * 12}`
                      : `$${Number(plan.monthlyPrice.slice(1)) * 12}`}{" "}
                    annually
                  </p>
                </CardHeader>

                <CardContent>
                  <Separator className="mb-6 bg-zinc-800" />
                  {plan.id === "growth" && (
                    <p className="mb-3 font-semibold text-zinc-200">
                      Everything in Starter, and:
                    </p>
                  )}
                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-zinc-200">
                        <CircleCheck className="size-4 text-zinc-400" />
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="mt-auto">
                  <Button
                    asChild
                    className="w-full rounded-lg bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
                  >
                    <a href={plan.button.url} target="_blank" rel="noreferrer">
                      {plan.button.text}
                      <ArrowRight className="ml-2 size-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing2 };

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
