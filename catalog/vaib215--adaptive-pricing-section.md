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
adaptive-pricing-section.tsx
import React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Info, X } from 'lucide-react'

interface PricingFeature {
  text: string
  included: boolean
  hasInfo?: boolean
}

interface PricingTier {
  name: string
  subtitle?: string
  price?: string
  period?: string
  description: string
  badge?: {
    text: string
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  }
  features: PricingFeature[]
  buttonText: string
  buttonVariant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
  highlighted?: boolean
  footerText?: string
  footerLink?: string
}

interface PricingComponentProps {
  title?: string
  subtitle?: string
  tiers: PricingTier[]
  className?: string
}

const PricingComponent: React.FC<PricingComponentProps> = ({
  title = "Simple pricing.",
  subtitle = "Pay for what matters. Enjoy everything else.",
  tiers,
  className
}) => {
  return (
    <div className={cn("w-full min-h-screen bg-background", className)}>
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-light text-foreground mb-6">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground font-light">
            {subtitle}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 max-md:gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <Card 
              key={index}
              className={cn(
                "relative flex flex-col h-full transition-all duration-300 border-border/50",
                tier.highlighted 
                  ? "bg-gradient-to-b from-card/80 to-muted/20 border-border/70 shadow-2xl dark:from-gray-900/80 dark:to-gray-800/60 dark:border-gray-700/70 md:scale-105 md:bottom-4 z-20" 
                  : "bg-card/40 border-border/40 hover:bg-card/60 dark:bg-gray-900/40 dark:border-gray-800/40 dark:hover:bg-gray-900/60"
              )}
              style={{
                backdropFilter: "blur(10px)"
              }}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-amber-600 to-orange-500 text-white dark:text-black text-xs font-bold px-4 py-1.5 rounded-full">
                    {tier.badge.text}
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-8 pt-12">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-4">
                  {tier.subtitle}
                </div>
                <CardTitle className="mb-6">
                  {tier.price ? (
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-light text-foreground">{tier.price}</span>
                      {tier.period && (
                        <span className="text-lg font-light text-muted-foreground ml-2">
                          {tier.period}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="text-5xl font-light text-foreground">{tier.name}</div>
                  )}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-base font-light leading-relaxed px-4">
                  {tier.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 px-8">
                <div className="mb-8">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-6">
                    PLAN HIGHLIGHTS
                  </h4>
                  <div className="space-y-4">
                    {tier.features.map((feature, featureIndex) => (
                      <div 
                        key={featureIndex}
                        className="flex items-start gap-3"
                      >
                        {feature.included ? <Check className="h-4 w-4 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" /> : <X className="h-4 w-4 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />}
                        <span className="text-foreground text-sm font-light flex items-center gap-2 leading-relaxed">
                          {feature.text}
                          {feature.hasInfo && (
                            <Info className="h-3 w-3 text-muted-foreground" />
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="px-8 pb-8">
                <div className="w-full">
                  {tier.highlighted ? (
                    <Button 
                      className="w-full py-4 text-sm font-medium bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-white dark:text-black border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {tier.buttonText}
                    </Button>
                  ) : (
                    <Button 
                      className={cn(
                        "w-full py-4 text-sm font-medium transition-all duration-300",
                        "bg-muted/80 hover:bg-muted text-foreground border-border/50",
                        "dark:bg-gray-700/80 dark:hover:bg-gray-600/80 dark:text-white dark:border-gray-600/50"
                      )}
                      variant="secondary"
                    >
                      {tier.buttonText}
                    </Button>
                  )}
                  {tier.footerText && (
                    <div className="text-center mt-6">
                      <p className="text-xs text-muted-foreground font-light">
                        {tier.footerText}{' '}
                        {tier.footerLink && (
                          <button className="text-primary hover:text-primary/80 underline transition-colors">
                            {tier.footerLink}
                          </button>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PricingComponent

code.demo.1756417098525.tsx
import React from 'react'
import PricingComponent from '@/components/ui/adaptive-pricing-section'

const Demo = () => {
  const pricingTiers = [
    {
      name: "Free",
      subtitle: "COMMUNITY",
      description: "Perfect for getting started with essential features.",
      features: [
        { text: "Up to 10 user messages", included: true, hasInfo: true },
        { text: "Context Engine", included: true },
        { text: "MCP & Native Tools", included: false },
        { text: "Unlimited Next Edits & Completions", included: true },
        { text: "Community support", included: true }
      ],
      buttonText: "Install now"
    },
    {
      name: "$50",
      subtitle: "DEVELOPER",
      price: "$50",
      period: "/month",
      description: "For individuals or small teams that want to ship to production, fast.",
      badge: {
        text: "7 DAY FREE TRIAL"
      },
      features: [
        { text: "Everything in community", included: true },
        { text: "Up to 600 user messages", included: true, hasInfo: true },
        { text: "Team management, up to 100 users", included: true },
        { text: "SOC 2 type II", included: true }
      ],
      buttonText: "Install now",
      highlighted: true,
      footerText: "Need more messages?",
      footerLink: "See plans below."
    },
    {
      name: "Enterprise",
      subtitle: "ENTERPRISE", 
      description: "For enterprise teams with high volume, security, or support needs.",
      features: [
        { text: "Custom user pricing", included: true },
        { text: "Bespoke user message limit", included: true, hasInfo: true },
        { text: "Slack integration", included: true },
        { text: "Volume based annual discounts", included: true },
        { text: "SSO, OIDC, & SCIM support", included: true },
        { text: "SOC 2 & Security Reports", included: true }
      ],
      buttonText: "Contact sales"
    }
  ]

  return (
    <div className="w-full">
      <PricingComponent 
        tiers={pricingTiers}
      />
    </div>
  )
}

export default Demo
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/adaptive-pricing-section.tsx
import React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Info, X } from 'lucide-react'

interface PricingFeature {
  text: string
  included: boolean
  hasInfo?: boolean
}

interface PricingTier {
  name: string
  subtitle?: string
  price?: string
  period?: string
  description: string
  badge?: {
    text: string
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  }
  features: PricingFeature[]
  buttonText: string
  buttonVariant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
  highlighted?: boolean
  footerText?: string
  footerLink?: string
}

interface PricingComponentProps {
  title?: string
  subtitle?: string
  tiers: PricingTier[]
  className?: string
}

const PricingComponent: React.FC<PricingComponentProps> = ({
  title = "Simple pricing.",
  subtitle = "Pay for what matters. Enjoy everything else.",
  tiers,
  className
}) => {
  return (
    <div className={cn("w-full min-h-screen bg-background", className)}>
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-light text-foreground mb-6">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground font-light">
            {subtitle}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 max-md:gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <Card 
              key={index}
              className={cn(
                "relative flex flex-col h-full transition-all duration-300 border-border/50",
                tier.highlighted 
                  ? "bg-gradient-to-b from-card/80 to-muted/20 border-border/70 shadow-2xl dark:from-gray-900/80 dark:to-gray-800/60 dark:border-gray-700/70 md:scale-105 md:bottom-4 z-20" 
                  : "bg-card/40 border-border/40 hover:bg-card/60 dark:bg-gray-900/40 dark:border-gray-800/40 dark:hover:bg-gray-900/60"
              )}
              style={{
                backdropFilter: "blur(10px)"
              }}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-amber-600 to-orange-500 text-white dark:text-black text-xs font-bold px-4 py-1.5 rounded-full">
                    {tier.badge.text}
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-8 pt-12">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-4">
                  {tier.subtitle}
                </div>
                <CardTitle className="mb-6">
                  {tier.price ? (
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-light text-foreground">{tier.price}</span>
                      {tier.period && (
                        <span className="text-lg font-light text-muted-foreground ml-2">
                          {tier.period}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="text-5xl font-light text-foreground">{tier.name}</div>
                  )}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-base font-light leading-relaxed px-4">
                  {tier.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 px-8">
                <div className="mb-8">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-6">
                    PLAN HIGHLIGHTS
                  </h4>
                  <div className="space-y-4">
                    {tier.features.map((feature, featureIndex) => (
                      <div 
                        key={featureIndex}
                        className="flex items-start gap-3"
                      >
                        {feature.included ? <Check className="h-4 w-4 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" /> : <X className="h-4 w-4 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />}
                        <span className="text-foreground text-sm font-light flex items-center gap-2 leading-relaxed">
                          {feature.text}
                          {feature.hasInfo && (
                            <Info className="h-3 w-3 text-muted-foreground" />
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="px-8 pb-8">
                <div className="w-full">
                  {tier.highlighted ? (
                    <Button 
                      className="w-full py-4 text-sm font-medium bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-white dark:text-black border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {tier.buttonText}
                    </Button>
                  ) : (
                    <Button 
                      className={cn(
                        "w-full py-4 text-sm font-medium transition-all duration-300",
                        "bg-muted/80 hover:bg-muted text-foreground border-border/50",
                        "dark:bg-gray-700/80 dark:hover:bg-gray-600/80 dark:text-white dark:border-gray-600/50"
                      )}
                      variant="secondary"
                    >
                      {tier.buttonText}
                    </Button>
                  )}
                  {tier.footerText && (
                    <div className="text-center mt-6">
                      <p className="text-xs text-muted-foreground font-light">
                        {tier.footerText}{' '}
                        {tier.footerLink && (
                          <button className="text-primary hover:text-primary/80 underline transition-colors">
                            {tier.footerLink}
                          </button>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PricingComponent
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
