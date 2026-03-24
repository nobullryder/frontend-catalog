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
onboarding-checklist.tsx
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ChevronLeft, ChevronRight, CheckCircle2, Circle } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { Button } from "./button";


export type Step = {
  id: string;
  title: string;
  description?: string;
  targetSelector: string;
  completed?: boolean;
};

export interface InteractiveOnboardingChecklistProps {
  steps: Step[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?(open: boolean): void;
  onCompleteStep?(id: string): void;
  onFinish?(): void;
  accentColorVar?: string;
  placement?: "left" | "right";
}


const getElementPosition = (selector: string) => {
  const element = document.querySelector(selector) as HTMLElement;
  if (!element) return null;
  
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    width: rect.width,
    height: rect.height,
    element
  };
};


const CoachmarkOverlay = ({
  step,
  onNext,
  onPrev,
  onComplete,
  onClose,
  isFirst,
  isLast,
  stepIndex,
  totalSteps
}: {
  step: Step;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
  onClose: () => void;
  isFirst: boolean;
  isLast: boolean;
  stepIndex: number;
  totalSteps: number;
}) => {
  const [targetPosition, setTargetPosition] = useState(getElementPosition(step.targetSelector));
  const overlayRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    setTargetPosition(getElementPosition(step.targetSelector));
  }, [step.targetSelector]);

  useEffect(() => {
    updatePosition();
    
    const handleResize = () => updatePosition();
    const handleScroll = () => updatePosition();
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    
    const resizeObserver = new ResizeObserver(updatePosition);
    const targetElement = document.querySelector(step.targetSelector);
    if (targetElement) {
      resizeObserver.observe(targetElement);
    }
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, [step.targetSelector, updatePosition]);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight" && !isLast) {
        onNext();
      } else if (e.key === "ArrowLeft" && !isFirst) {
        onPrev();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onComplete();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev, onComplete, isFirst, isLast]);

  if (!targetPosition) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}

        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="coachmark-title"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}

          className="bg-card border rounded-xl p-6 max-w-md mx-4 shadow-lg"
        >
          <h3 id="coachmark-title" className="font-semibold text-lg mb-2">
            {step.title}
          </h3>
          <p className="text-muted-foreground mb-4">
            Target element not found. Please ensure the element with selector "{step.targetSelector}" exists.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button size="sm" onClick={onComplete}>
              Mark Complete
            </Button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  const { top, left, width, height } = targetPosition;
  const spotlightPadding = 8;

  return (
    <motion.div
      ref={overlayRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}

      className="fixed inset-0 z-50 pointer-events-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="coachmark-title"
      style={{
        background: `radial-gradient(circle at ${left + width/2}px ${top + height/2}px, transparent ${Math.max(width, height)/2 + spotlightPadding}px, rgba(0,0,0,0.7) ${Math.max(width, height)/2 + spotlightPadding + 1}px)`
      }}
    >

      <div
        className="absolute border-2 border-primary rounded-lg shadow-lg"
        style={{
          top: top - spotlightPadding,
          left: left - spotlightPadding,
          width: width + spotlightPadding * 2,
          height: height + spotlightPadding * 2,
          boxShadow: `0 0 0 2px hsl(var(--primary)), 0 0 20px rgba(0,0,0,0.3)`
        }}
      />


      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 10 }}
        transition={{ 
          type: "spring", 
          damping: 25, 
          stiffness: 400,
          opacity: { duration: 0.15 }
        }}

        className="absolute bg-card border rounded-xl p-4 shadow-xl max-w-sm pointer-events-auto"
        style={(() => {
          const cardWidth = 384;
          const cardHeight = 200;
          const margin = 16;
          const onboardingCardWidth = 320;
          const onboardingCardHeight = 400;
          
          const positions = [
            {
              top: top + height + margin,
              left: left + (width / 2) - (cardWidth / 2),
              priority: 1
            },
            {
              top: top - cardHeight - margin,
              left: left + (width / 2) - (cardWidth / 2),
              priority: 2
            },
            {
              top: top + (height / 2) - (cardHeight / 2),
              left: left + width + margin,
              priority: 3
            },
            {
              top: top + (height / 2) - (cardHeight / 2),
              left: left - cardWidth - margin,
              priority: 4
            }
          ];
          
          const bestPosition = positions
            .map(pos => ({
              ...pos,
              fitsHorizontally: pos.left >= margin && pos.left + cardWidth <= window.innerWidth - margin,
              fitsVertically: pos.top >= margin && pos.top + cardHeight <= window.innerHeight - margin,
              overlapsOnboarding: (
                pos.left + cardWidth > window.innerWidth - onboardingCardWidth - margin * 2 &&
                pos.top + cardHeight > window.innerHeight - onboardingCardHeight - margin * 2
              )
            }))
            .filter(pos => pos.fitsHorizontally && pos.fitsVertically && !pos.overlapsOnboarding)
            .sort((a, b) => a.priority - b.priority)[0];
          
          if (bestPosition) {
            return {
              top: bestPosition.top,
              left: bestPosition.left
            };
          }
          
          let fallbackTop = top + height + margin;
          let fallbackLeft = left + (width / 2) - (cardWidth / 2);
          
          fallbackLeft = Math.max(margin, Math.min(fallbackLeft, window.innerWidth - cardWidth - margin));
          
          const maxTop = window.innerHeight - cardHeight - margin;
          const onboardingTop = window.innerHeight - onboardingCardHeight - margin * 2;
          
          if (fallbackTop + cardHeight > onboardingTop && fallbackLeft + cardWidth > window.innerWidth - onboardingCardWidth - margin * 2) {
            fallbackTop = Math.max(margin, top - cardHeight - margin);
          } else {
            fallbackTop = Math.max(margin, Math.min(fallbackTop, maxTop));
          }
          
          return {
            top: fallbackTop,
            left: fallbackLeft
          };
        })()}
      >
        <div className="mb-3">
          <h3 id="coachmark-title" className="font-semibold text-base mb-1">
            {step.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            Step {stepIndex + 1} of {totalSteps}
          </p>
        </div>

        {step.description && (
          <p className="text-sm text-foreground mb-4">
            {step.description}
          </p>
        )}

        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrev}
            disabled={isFirst}
            aria-label="Previous step"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onNext}
            disabled={isLast}
            aria-label="Next step"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};


export function InteractiveOnboardingChecklist({
  steps,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  onCompleteStep,
  onFinish,
  accentColorVar = "--primary",
  placement = "right"
}: InteractiveOnboardingChecklistProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const [internalCompletedSteps, setInternalCompletedSteps] = useState<Set<string>>(new Set());
  

  const completedSteps = new Set([
    ...steps.filter(step => step.completed).map(step => step.id),
    ...internalCompletedSteps
  ]);
  const [activeCoachmark, setActiveCoachmark] = useState<string | null>(null);
  
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;


  const advanceToNextStep = useCallback((completedStepId: string) => {

    const newCompletedSteps = new Set([
      ...steps.filter(step => step.completed).map(step => step.id),
      ...internalCompletedSteps,
      completedStepId
    ]);
    

    const currentStepIndex = steps.findIndex(step => step.id === completedStepId);
    const nextIncompleteStep = steps.slice(currentStepIndex + 1).find(step => !newCompletedSteps.has(step.id));
    
    if (nextIncompleteStep) {

      setActiveCoachmark(nextIncompleteStep.id);
    } else {

      setActiveCoachmark(null);
    }
    

    const completedAllSteps = steps.filter(step => 
      newCompletedSteps.has(step.id)
    );
    
    if (completedAllSteps.length === steps.length) {
      setTimeout(() => onFinish?.(), 100);
    }
  }, [steps, internalCompletedSteps, onFinish]);


  useEffect(() => {
    if (open && !activeCoachmark) {
      const firstIncompleteStep = steps.find(step => !completedSteps.has(step.id));
      if (firstIncompleteStep) {

        const timer = setTimeout(() => {
          setActiveCoachmark(firstIncompleteStep.id);
        }, 400);
        return () => clearTimeout(timer);
      }
    }
  }, [open, activeCoachmark, steps, completedSteps]);


  useEffect(() => {
    if (activeCoachmark) {
      const activeStep = steps.find(s => s.id === activeCoachmark);
      if (activeStep && activeStep.completed) {

        setTimeout(() => {
          advanceToNextStep(activeCoachmark);
        }, 500);
      }
    }
  }, [steps, activeCoachmark, advanceToNextStep]);

  const handleOpenChange = (newOpen: boolean) => {

    if (!newOpen && activeCoachmark) {
      return;
    }
    
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
    
    if (!newOpen) {
      setActiveCoachmark(null);
    }
  };

  const handleCompleteStep = (stepId: string) => {
    setInternalCompletedSteps(prev => new Set([...prev, stepId]));
    onCompleteStep?.(stepId);
    

    setTimeout(() => {
      advanceToNextStep(stepId);
    }, 500);
  };

  const handleStepClick = (step: Step) => {
    if (completedSteps.has(step.id)) return;
    setActiveCoachmark(step.id);
  };

  const activeStep = activeCoachmark ? steps.find(s => s.id === activeCoachmark) : null;
  const activeStepIndex = activeStep ? steps.indexOf(activeStep) : -1;
  
  const completedCount = steps.filter(step => completedSteps.has(step.id)).length;
  const totalSteps = steps.length;
  const progress = (completedCount / totalSteps) * 100;

  const allStepsCompleted = completedCount === totalSteps;


  const hasPrevIncompleteStep = activeStepIndex > 0 && 
    steps.slice(0, activeStepIndex).some(step => !completedSteps.has(step.id));
  const hasNextIncompleteStep = activeStepIndex < totalSteps - 1 && 
    steps.slice(activeStepIndex + 1).some(step => !completedSteps.has(step.id));

  return (
    <>
      <Dialog.Root open={open} onOpenChange={handleOpenChange} modal={false}>
        <Dialog.Portal>
          <Dialog.Content
            className="fixed bottom-4 right-4 z-50 w-80 max-h-[calc(100vh-2rem)] bg-card border rounded-xl shadow-xl pointer-events-auto"
            onOpenAutoFocus={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
            onPointerDownOutside={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ 
                duration: 0.3,
                ease: [0.4, 0.0, 0.2, 1]
              }}
              className="flex flex-col h-full"
            >

              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title className="text-lg font-semibold">
                    Getting Started
                  </Dialog.Title>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => {
                      setActiveCoachmark(null);
                      if (!isControlled) {
                        setInternalOpen(false);
                      }
                      onOpenChange?.(false);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{completedCount}/{totalSteps}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </div>


              <div className="flex-1 overflow-y-auto p-6 min-h-0">
                <ul role="list" className="space-y-3">
                  {steps.map((step, index) => {
                    const isCompleted = completedSteps.has(step.id);
                    const isActive = activeCoachmark === step.id;
                    
                    return (
                      <li key={step.id}>
                        <button
                          onClick={() => handleStepClick(step)}
                          disabled={isCompleted}
                          className={cn(
                            "w-full text-left p-3 rounded-lg border transition-colors",
                            "hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-ring",
                            isCompleted && "bg-success/10 border-success/30 cursor-default",
                            isActive && "ring-2 ring-primary"
                          )}
                          aria-describedby={`step-${step.id}-description`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              {isCompleted ? (
                                <div className="h-5 w-5 rounded-full bg-success flex items-center justify-center">
                                  <Check className="h-3 w-3 text-success-foreground" />
                                </div>
                              ) : (
                                <Circle className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={cn(
                                  "font-medium text-sm",
                                  isCompleted ? "text-muted-foreground line-through" : "text-foreground"
                                )}>
                                  {step.title}
                                </span>
                              </div>
                              {step.description && (
                                <p
                                  id={`step-${step.id}-description`}
                                  className={cn(
                                    "text-xs",
                                    isCompleted ? "text-muted-foreground" : "text-muted-foreground"
                                  )}
                                >
                                  {step.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>


              {allStepsCompleted && (
                <div className="p-6 border-t">
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      onFinish?.();
                      handleOpenChange(false);
                    }}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Finish Setup
                  </Button>
                </div>
              )}
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>


      <AnimatePresence>
        {activeStep && (
          <CoachmarkOverlay
            step={activeStep}
            stepIndex={activeStepIndex}
            totalSteps={totalSteps}
            isFirst={!hasPrevIncompleteStep}
            isLast={!hasNextIncompleteStep}
            onNext={() => {

              for (let i = activeStepIndex + 1; i < totalSteps; i++) {
                if (!completedSteps.has(steps[i].id)) {
                  setActiveCoachmark(steps[i].id);
                  return;
                }
              }
            }}
            onPrev={() => {

              for (let i = activeStepIndex - 1; i >= 0; i--) {
                if (!completedSteps.has(steps[i].id)) {
                  setActiveCoachmark(steps[i].id);
                  return;
                }
              }
            }}
            onComplete={() => handleCompleteStep(activeStep.id)}
            onClose={() => setActiveCoachmark(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

code.demo.1755362959821.tsx
"use client";

import React, { useState } from "react";
import { InteractiveOnboardingChecklist, type Step } from "@/components/ui/onboarding-checklist";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Bell, User } from "lucide-react";

export default function InteractiveOnboardingChecklistDemo() {
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [profileSetup, setProfileSetup] = useState(false);

  const steps: Step[] = [
    {
      id: "welcome",
      title: "Welcome to the Platform",
      description: "Click the welcome button to get started with your journey.",
      targetSelector: "[data-onboard='welcome-button']",
      completed: completedSteps.has("welcome")
    },
    {
      id: "profile",
      title: "Set up your profile",
      description: "Complete your profile information to personalize your experience.",
      targetSelector: "[data-onboard='profile-card']",
      completed: completedSteps.has("profile")
    },
    {
      id: "notifications",
      title: "Enable notifications",
      description: "Turn on notifications to stay updated with important updates.",
      targetSelector: "[data-onboard='notifications-toggle']",
      completed: completedSteps.has("notifications")
    }
  ];

  const handleCompleteStep = (stepId: string) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
    

    switch (stepId) {
      case "profile":
        setProfileSetup(true);
        break;
      case "notifications":
        setNotificationsEnabled(true);
        break;
    }
  };

  const handleFinish = () => {
    console.log("Onboarding completed!");
    setOnboardingOpen(false);
  };

  const resetDemo = () => {
    setCompletedSteps(new Set());
    setNotificationsEnabled(false);
    setProfileSetup(false);
    setOnboardingOpen(true);
  };

  const completedCount = steps.filter(step => completedSteps.has(step.id)).length;
  const isOnboardingComplete = completedCount === steps.length;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <div className="flex justify-center gap-4">
            <Button onClick={resetDemo} variant="outline" className="gap-2">
              Reset Demo
            </Button>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="space-y-6">

            <Card data-onboard="welcome-button" className="border-2 border-dashed border-muted-foreground/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlayCircle className="h-5 w-5 text-primary" />
                  Welcome Center
                </CardTitle>
                <CardDescription>
                  Your starting point for getting familiar with the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  onClick={() => {
                    if (!completedSteps.has("welcome")) {
                      handleCompleteStep("welcome");
                    }
                  }}
                  variant={completedSteps.has("welcome") ? "outline" : "default"}
                >
                  {completedSteps.has("welcome") ? "✓ Welcome Complete" : "Get Started"}
                </Button>
              </CardContent>
            </Card>


            <Card 
              data-onboard="profile-card" 
              className={`transition-colors ${profileSetup ? 'border-primary bg-primary/5' : ''}`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Setup
                  {profileSetup && <Badge variant="default" className="ml-auto">Complete</Badge>}
                </CardTitle>
                <CardDescription>
                  Complete your profile to personalize your experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">First Name</label>
                    <div className="h-9 bg-muted rounded-md flex items-center px-3 text-sm text-muted-foreground">
                      {profileSetup ? "John" : "Enter name..."}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Last Name</label>
                    <div className="h-9 bg-muted rounded-md flex items-center px-3 text-sm text-muted-foreground">
                      {profileSetup ? "Doe" : "Enter name..."}
                    </div>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  variant={profileSetup ? "outline" : "default"}
                  onClick={() => {
                    if (!completedSteps.has("profile")) {
                      handleCompleteStep("profile");
                    }
                  }}
                >
                  {profileSetup ? "✓ Profile Complete" : "Complete Profile"}
                </Button>
              </CardContent>
            </Card>
          </div>


          <div className="space-y-6">

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Manage how you receive updates and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Push Notifications</div>
                    <div className="text-sm text-muted-foreground">Get notified about important updates</div>
                  </div>
                  <Switch
                    data-onboard="notifications-toggle"
                    checked={notificationsEnabled}
                    onCheckedChange={(checked) => {
                      setNotificationsEnabled(checked);
                      if (checked && !completedSteps.has("notifications")) {
                        handleCompleteStep("notifications");
                      }
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email Digest</div>
                    <div className="text-sm text-muted-foreground">Weekly summary of activity</div>
                  </div>
                  <Switch checked={false} disabled />
                </div>
              </CardContent>
            </Card>


          </div>
        </div>




      </div>


      <InteractiveOnboardingChecklist
        steps={steps}
        open={onboardingOpen}
        onOpenChange={setOnboardingOpen}
        onCompleteStep={handleCompleteStep}
        onFinish={handleFinish}
      />


      {!onboardingOpen && (
        <div className="fixed bottom-4 right-4 z-40">
          <Button
            onClick={() => setOnboardingOpen(true)}
            className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
            size="icon"
          >
            {isOnboardingComplete ? (
              <div className="flex items-center justify-center">
                <span className="text-lg">✓</span>
              </div>
            ) : completedCount > 0 ? (
              <div className="flex items-center justify-center relative">
                <PlayCircle className="h-6 w-6" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary-foreground text-primary rounded-full flex items-center justify-center text-xs font-bold">
                  {completedCount}
                </div>
              </div>
            ) : (
              <PlayCircle className="h-6 w-6" />
            )}
          </Button>
          

          <div className="absolute bottom-16 right-0 bg-popover text-popover-foreground px-3 py-2 rounded-lg shadow-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {isOnboardingComplete ? "View Checklist" : completedCount > 0 ? "Continue Onboarding" : "Start Onboarding"}
          </div>
        </div>
      )}
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/onboarding-checklist.tsx
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ChevronLeft, ChevronRight, CheckCircle2, Circle } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { Button } from "./button";


export type Step = {
  id: string;
  title: string;
  description?: string;
  targetSelector: string;
  completed?: boolean;
};

export interface InteractiveOnboardingChecklistProps {
  steps: Step[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?(open: boolean): void;
  onCompleteStep?(id: string): void;
  onFinish?(): void;
  accentColorVar?: string;
  placement?: "left" | "right";
}


const getElementPosition = (selector: string) => {
  const element = document.querySelector(selector) as HTMLElement;
  if (!element) return null;
  
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    width: rect.width,
    height: rect.height,
    element
  };
};


const CoachmarkOverlay = ({
  step,
  onNext,
  onPrev,
  onComplete,
  onClose,
  isFirst,
  isLast,
  stepIndex,
  totalSteps
}: {
  step: Step;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
  onClose: () => void;
  isFirst: boolean;
  isLast: boolean;
  stepIndex: number;
  totalSteps: number;
}) => {
  const [targetPosition, setTargetPosition] = useState(getElementPosition(step.targetSelector));
  const overlayRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    setTargetPosition(getElementPosition(step.targetSelector));
  }, [step.targetSelector]);

  useEffect(() => {
    updatePosition();
    
    const handleResize = () => updatePosition();
    const handleScroll = () => updatePosition();
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    
    const resizeObserver = new ResizeObserver(updatePosition);
    const targetElement = document.querySelector(step.targetSelector);
    if (targetElement) {
      resizeObserver.observe(targetElement);
    }
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, [step.targetSelector, updatePosition]);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight" && !isLast) {
        onNext();
      } else if (e.key === "ArrowLeft" && !isFirst) {
        onPrev();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onComplete();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev, onComplete, isFirst, isLast]);

  if (!targetPosition) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}

        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="coachmark-title"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}

          className="bg-card border rounded-xl p-6 max-w-md mx-4 shadow-lg"
        >
          <h3 id="coachmark-title" className="font-semibold text-lg mb-2">
            {step.title}
          </h3>
          <p className="text-muted-foreground mb-4">
            Target element not found. Please ensure the element with selector "{step.targetSelector}" exists.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button size="sm" onClick={onComplete}>
              Mark Complete
            </Button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  const { top, left, width, height } = targetPosition;
  const spotlightPadding = 8;

  return (
    <motion.div
      ref={overlayRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}

      className="fixed inset-0 z-50 pointer-events-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="coachmark-title"
      style={{
        background: `radial-gradient(circle at ${left + width/2}px ${top + height/2}px, transparent ${Math.max(width, height)/2 + spotlightPadding}px, rgba(0,0,0,0.7) ${Math.max(width, height)/2 + spotlightPadding + 1}px)`
      }}
    >

      <div
        className="absolute border-2 border-primary rounded-lg shadow-lg"
        style={{
          top: top - spotlightPadding,
          left: left - spotlightPadding,
          width: width + spotlightPadding * 2,
          height: height + spotlightPadding * 2,
          boxShadow: `0 0 0 2px hsl(var(--primary)), 0 0 20px rgba(0,0,0,0.3)`
        }}
      />


      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 10 }}
        transition={{ 
          type: "spring", 
          damping: 25, 
          stiffness: 400,
          opacity: { duration: 0.15 }
        }}

        className="absolute bg-card border rounded-xl p-4 shadow-xl max-w-sm pointer-events-auto"
        style={(() => {
          const cardWidth = 384;
          const cardHeight = 200;
          const margin = 16;
          const onboardingCardWidth = 320;
          const onboardingCardHeight = 400;
          
          const positions = [
            {
              top: top + height + margin,
              left: left + (width / 2) - (cardWidth / 2),
              priority: 1
            },
            {
              top: top - cardHeight - margin,
              left: left + (width / 2) - (cardWidth / 2),
              priority: 2
            },
            {
              top: top + (height / 2) - (cardHeight / 2),
              left: left + width + margin,
              priority: 3
            },
            {
              top: top + (height / 2) - (cardHeight / 2),
              left: left - cardWidth - margin,
              priority: 4
            }
          ];
          
          const bestPosition = positions
            .map(pos => ({
              ...pos,
              fitsHorizontally: pos.left >= margin && pos.left + cardWidth <= window.innerWidth - margin,
              fitsVertically: pos.top >= margin && pos.top + cardHeight <= window.innerHeight - margin,
              overlapsOnboarding: (
                pos.left + cardWidth > window.innerWidth - onboardingCardWidth - margin * 2 &&
                pos.top + cardHeight > window.innerHeight - onboardingCardHeight - margin * 2
              )
            }))
            .filter(pos => pos.fitsHorizontally && pos.fitsVertically && !pos.overlapsOnboarding)
            .sort((a, b) => a.priority - b.priority)[0];
          
          if (bestPosition) {
            return {
              top: bestPosition.top,
              left: bestPosition.left
            };
          }
          
          let fallbackTop = top + height + margin;
          let fallbackLeft = left + (width / 2) - (cardWidth / 2);
          
          fallbackLeft = Math.max(margin, Math.min(fallbackLeft, window.innerWidth - cardWidth - margin));
          
          const maxTop = window.innerHeight - cardHeight - margin;
          const onboardingTop = window.innerHeight - onboardingCardHeight - margin * 2;
          
          if (fallbackTop + cardHeight > onboardingTop && fallbackLeft + cardWidth > window.innerWidth - onboardingCardWidth - margin * 2) {
            fallbackTop = Math.max(margin, top - cardHeight - margin);
          } else {
            fallbackTop = Math.max(margin, Math.min(fallbackTop, maxTop));
          }
          
          return {
            top: fallbackTop,
            left: fallbackLeft
          };
        })()}
      >
        <div className="mb-3">
          <h3 id="coachmark-title" className="font-semibold text-base mb-1">
            {step.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            Step {stepIndex + 1} of {totalSteps}
          </p>
        </div>

        {step.description && (
          <p className="text-sm text-foreground mb-4">
            {step.description}
          </p>
        )}

        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrev}
            disabled={isFirst}
            aria-label="Previous step"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onNext}
            disabled={isLast}
            aria-label="Next step"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};


export function InteractiveOnboardingChecklist({
  steps,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  onCompleteStep,
  onFinish,
  accentColorVar = "--primary",
  placement = "right"
}: InteractiveOnboardingChecklistProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const [internalCompletedSteps, setInternalCompletedSteps] = useState<Set<string>>(new Set());
  

  const completedSteps = new Set([
    ...steps.filter(step => step.completed).map(step => step.id),
    ...internalCompletedSteps
  ]);
  const [activeCoachmark, setActiveCoachmark] = useState<string | null>(null);
  
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;


  const advanceToNextStep = useCallback((completedStepId: string) => {

    const newCompletedSteps = new Set([
      ...steps.filter(step => step.completed).map(step => step.id),
      ...internalCompletedSteps,
      completedStepId
    ]);
    

    const currentStepIndex = steps.findIndex(step => step.id === completedStepId);
    const nextIncompleteStep = steps.slice(currentStepIndex + 1).find(step => !newCompletedSteps.has(step.id));
    
    if (nextIncompleteStep) {

      setActiveCoachmark(nextIncompleteStep.id);
    } else {

      setActiveCoachmark(null);
    }
    

    const completedAllSteps = steps.filter(step => 
      newCompletedSteps.has(step.id)
    );
    
    if (completedAllSteps.length === steps.length) {
      setTimeout(() => onFinish?.(), 100);
    }
  }, [steps, internalCompletedSteps, onFinish]);


  useEffect(() => {
    if (open && !activeCoachmark) {
      const firstIncompleteStep = steps.find(step => !completedSteps.has(step.id));
      if (firstIncompleteStep) {

        const timer = setTimeout(() => {
          setActiveCoachmark(firstIncompleteStep.id);
        }, 400);
        return () => clearTimeout(timer);
      }
    }
  }, [open, activeCoachmark, steps, completedSteps]);


  useEffect(() => {
    if (activeCoachmark) {
      const activeStep = steps.find(s => s.id === activeCoachmark);
      if (activeStep && activeStep.completed) {

        setTimeout(() => {
          advanceToNextStep(activeCoachmark);
        }, 500);
      }
    }
  }, [steps, activeCoachmark, advanceToNextStep]);

  const handleOpenChange = (newOpen: boolean) => {

    if (!newOpen && activeCoachmark) {
      return;
    }
    
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
    
    if (!newOpen) {
      setActiveCoachmark(null);
    }
  };

  const handleCompleteStep = (stepId: string) => {
    setInternalCompletedSteps(prev => new Set([...prev, stepId]));
    onCompleteStep?.(stepId);
    

    setTimeout(() => {
      advanceToNextStep(stepId);
    }, 500);
  };

  const handleStepClick = (step: Step) => {
    if (completedSteps.has(step.id)) return;
    setActiveCoachmark(step.id);
  };

  const activeStep = activeCoachmark ? steps.find(s => s.id === activeCoachmark) : null;
  const activeStepIndex = activeStep ? steps.indexOf(activeStep) : -1;
  
  const completedCount = steps.filter(step => completedSteps.has(step.id)).length;
  const totalSteps = steps.length;
  const progress = (completedCount / totalSteps) * 100;

  const allStepsCompleted = completedCount === totalSteps;


  const hasPrevIncompleteStep = activeStepIndex > 0 && 
    steps.slice(0, activeStepIndex).some(step => !completedSteps.has(step.id));
  const hasNextIncompleteStep = activeStepIndex < totalSteps - 1 && 
    steps.slice(activeStepIndex + 1).some(step => !completedSteps.has(step.id));

  return (
    <>
      <Dialog.Root open={open} onOpenChange={handleOpenChange} modal={false}>
        <Dialog.Portal>
          <Dialog.Content
            className="fixed bottom-4 right-4 z-50 w-80 max-h-[calc(100vh-2rem)] bg-card border rounded-xl shadow-xl pointer-events-auto"
            onOpenAutoFocus={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
            onPointerDownOutside={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ 
                duration: 0.3,
                ease: [0.4, 0.0, 0.2, 1]
              }}
              className="flex flex-col h-full"
            >

              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title className="text-lg font-semibold">
                    Getting Started
                  </Dialog.Title>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => {
                      setActiveCoachmark(null);
                      if (!isControlled) {
                        setInternalOpen(false);
                      }
                      onOpenChange?.(false);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{completedCount}/{totalSteps}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </div>


              <div className="flex-1 overflow-y-auto p-6 min-h-0">
                <ul role="list" className="space-y-3">
                  {steps.map((step, index) => {
                    const isCompleted = completedSteps.has(step.id);
                    const isActive = activeCoachmark === step.id;
                    
                    return (
                      <li key={step.id}>
                        <button
                          onClick={() => handleStepClick(step)}
                          disabled={isCompleted}
                          className={cn(
                            "w-full text-left p-3 rounded-lg border transition-colors",
                            "hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-ring",
                            isCompleted && "bg-success/10 border-success/30 cursor-default",
                            isActive && "ring-2 ring-primary"
                          )}
                          aria-describedby={`step-${step.id}-description`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              {isCompleted ? (
                                <div className="h-5 w-5 rounded-full bg-success flex items-center justify-center">
                                  <Check className="h-3 w-3 text-success-foreground" />
                                </div>
                              ) : (
                                <Circle className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={cn(
                                  "font-medium text-sm",
                                  isCompleted ? "text-muted-foreground line-through" : "text-foreground"
                                )}>
                                  {step.title}
                                </span>
                              </div>
                              {step.description && (
                                <p
                                  id={`step-${step.id}-description`}
                                  className={cn(
                                    "text-xs",
                                    isCompleted ? "text-muted-foreground" : "text-muted-foreground"
                                  )}
                                >
                                  {step.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>


              {allStepsCompleted && (
                <div className="p-6 border-t">
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      onFinish?.();
                      handleOpenChange(false);
                    }}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Finish Setup
                  </Button>
                </div>
              )}
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>


      <AnimatePresence>
        {activeStep && (
          <CoachmarkOverlay
            step={activeStep}
            stepIndex={activeStepIndex}
            totalSteps={totalSteps}
            isFirst={!hasPrevIncompleteStep}
            isLast={!hasNextIncompleteStep}
            onNext={() => {

              for (let i = activeStepIndex + 1; i < totalSteps; i++) {
                if (!completedSteps.has(steps[i].id)) {
                  setActiveCoachmark(steps[i].id);
                  return;
                }
              }
            }}
            onPrev={() => {

              for (let i = activeStepIndex - 1; i >= 0; i--) {
                if (!completedSteps.has(steps[i].id)) {
                  setActiveCoachmark(steps[i].id);
                  return;
                }
              }
            }}
            onComplete={() => handleCompleteStep(activeStep.id)}
            onClose={() => setActiveCoachmark(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
```

Install NPM dependencies:
```bash
framer-motion, lucide-react, @radix-ui/react-dialog
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
