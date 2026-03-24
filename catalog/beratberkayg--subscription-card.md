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
subscription-card.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";

export function SubscriptionCard() {
  const data = [
    { month: "Jan", value: 65 },
    { month: "Feb", value: 85 },
    { month: "Mar", value: 55 },
    { month: "Apr", value: 75 },
    { month: "May", value: 50 },
    { month: "Jun", value: 65 },
    { month: "Jul", value: 85 },
    { month: "Aug", value: 55 },
  ];

  const color = "hsl(var(--foreground))";

  return (
    <Card className= "w-full md:max-w-md" >
    <CardHeader className="pb-2" >
      <CardTitle className="text-base font-medium" > Subscriptions < /CardTitle>
        < /CardHeader>
        < CardContent className = "space-y-4" >
          <div>
          <h3 className="text-2xl font-bold" > +2350 < /h3>
            < p className = "text-sm text-muted-foreground" >
              +80.1 % from last month
                < /p>
                < /div>

                < div className = " h-32 w-full" >
                  <ResponsiveContainer width="100%" height = "100%" >
                    <BarChart data={ data }>
                      <XAxis
                dataKey="month"
  axisLine = { false}
  tickLine = { false}
  tick = {{ fontSize: 12, fill: "#666" }
}
/>

  < Bar
dataKey = "value"
fill = { color }
radius = { [2, 2, 0, 0]}
isAnimationActive = { true}
  />
  </BarChart>
  < /ResponsiveContainer>
  < /div>
  < /CardContent>
  < /Card>
  );
}

code.demo.1753298183473.tsx
import { SubscriptionCard } from "@/components/ui/subscription-card";

export default function DemoOne() {
  return <div className="w-full h-screen flex items-center justify-center mx-auto relative" > <SubscriptionCard /> <div
  className = "absolute w-full h-full -z-10"
  style = {{
    backgroundImage:
    "url('data:image/svg+xml,%3Csvg width=\\'4\\' height=\\'4\\' viewBox=\\'0 0 6 6\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Ccircle cx=\\'6\\' cy=\\'6\\' r=\\'1\\' fill=\\'%23aaa\\' fill-opacity=\\'0.25\\' /%3E%3C/svg%3E')",
      backgroundColor: "transparent",
                }
}
              > </div></div >
  ;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/subscription-card.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";

export function SubscriptionCard() {
  const data = [
    { month: "Jan", value: 65 },
    { month: "Feb", value: 85 },
    { month: "Mar", value: 55 },
    { month: "Apr", value: 75 },
    { month: "May", value: 50 },
    { month: "Jun", value: 65 },
    { month: "Jul", value: 85 },
    { month: "Aug", value: 55 },
  ];

  const color = "hsl(var(--foreground))";

  return (
    <Card className= "w-full md:max-w-md" >
    <CardHeader className="pb-2" >
      <CardTitle className="text-base font-medium" > Subscriptions < /CardTitle>
        < /CardHeader>
        < CardContent className = "space-y-4" >
          <div>
          <h3 className="text-2xl font-bold" > +2350 < /h3>
            < p className = "text-sm text-muted-foreground" >
              +80.1 % from last month
                < /p>
                < /div>

                < div className = " h-32 w-full" >
                  <ResponsiveContainer width="100%" height = "100%" >
                    <BarChart data={ data }>
                      <XAxis
                dataKey="month"
  axisLine = { false}
  tickLine = { false}
  tick = {{ fontSize: 12, fill: "#666" }
}
/>

  < Bar
dataKey = "value"
fill = { color }
radius = { [2, 2, 0, 0]}
isAnimationActive = { true}
  />
  </BarChart>
  < /ResponsiveContainer>
  < /div>
  < /CardContent>
  < /Card>
  );
}
```

Install NPM dependencies:
```bash
recharts
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
