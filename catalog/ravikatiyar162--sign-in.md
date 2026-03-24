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
sign-in.tsx
import * as React from "react"
import { cn } from "@/lib/utils" // Your utility for merging class names
import { Button, type ButtonProps } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, KeyRound, Mail, Sparkles } from "lucide-react"
import {useTheme} from "next-themes"

// Simple SVG components for brand icons as placeholders
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img src= "https://svgl.app/library/google.svg" { ...props }/>
)

const MicrosoftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img src= "https://svgl.app/library/microsoft.svg" { ...props }/>
)

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const {theme} = useTheme();
  return <>
  <img src= {`https://svgl.app/library/apple${theme==='dark' ? '_dark': ''}.svg`} { ...props }/>

  </>
}

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onEmailSubmit?: (data: { email: string; password?: string }) => void
  onSocialSignIn?: (provider: 'google' | 'microsoft' | 'apple' | 'sso') => void
  onEmailLink?: () => void
}

const AuthForm = React.forwardRef<HTMLDivElement, AuthFormProps>(
  ({ className, onEmailSubmit, onSocialSignIn, onEmailLink, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      const email = formData.get("email") as string
      const password = formData.get("password") as string
      onEmailSubmit?.({ email, password })
    }

    return (
      <Card ref= { ref } className = { cn("w-full max-w-md mx-auto", className) } {...props}>
        <CardHeader className="text-left" >
          <CardTitle className="text-2xl" > Sign in with email < /CardTitle>
          <CardDescription>
            Make a new doc to bring your words, data, and teams together.For free.
          < /CardDescription>
  < /CardHeader>
  < CardContent >
  <div className="space-y-4" >
    {/* Social Sign-in */ }
    < div className = "space-y-2" >
      <Label className="text-xs text-muted-foreground" > Sign in with</Label>
      < div className = "grid grid-cols-4 gap-2" >
        <Button variant="outline" onClick = {() => onSocialSignIn?.('google')}>
          <GoogleIcon className="size-4 fill-primary" />
            </Button>
            < Button variant = "outline" onClick = {() => onSocialSignIn?.('microsoft')}>
              <MicrosoftIcon className="size-4 fill-primary" />
                </Button>
                < Button variant = "outline" onClick = {() => onSocialSignIn?.('apple')}>
                  <AppleIcon className="size-5" />
                    </Button>
                    < Button variant = "outline" onClick = {() => onSocialSignIn?.('sso')}>
                      <KeyRound className="h-5 w-5" />
                        <span className="ml-1.5" > SSO < /span>
                          < /Button>
                          < /div>
                          < /div>

{/* Divider */ }
<div className="relative" >
  <div className="absolute inset-0 flex items-center" >
    <span className="w-full border-t" />
      </div>
      < div className = "relative flex justify-center text-xs uppercase" >
        <span className="bg-background px-2 text-muted-foreground" > or < /span>
          < /div>
          < /div>

{/* Email Form */ }
<form onSubmit={ handleFormSubmit } className = "space-y-4" >
  <div className="space-y-2" >
    <Label htmlFor="email" > Email < /Label>
      < div className = "relative" >
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="email" name = "email" type = "email" placeholder = "jdoe.mobbin@gmail.com" className = "pl-9" required />
            </div>
            < /div>
            < div className = "space-y-2" >
              <div className="flex items-center justify-between" >
                <Label htmlFor="password" > Password < /Label>
                  < a href = "#" className = "text-sm font-medium text-primary hover:underline" > Forgot password ? </a>
                    < /div>
                    < div className = "relative" >
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="password" name = "password" type = { showPassword? "text": "password" } className = "pl-9 pr-10" required />
                          <Button 
                        type="button"
variant = "ghost"
size = "icon"
className = "absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
onClick = {() => setShowPassword(!showPassword)}
                    >
  { showPassword?<EyeOff className = "h-4 w-4" /> : <Eye className="h-4 w-4" />}
</Button>
  < /div>
  < /div>
  < Button type = "submit" className = "w-full" > Sign In < /Button>
    < /form>
    < /div>
    < /CardContent>
    < CardFooter className = "flex-col items-start space-y-4" >
      <Button variant="ghost" className = "w-full text-muted-foreground" onClick = {() => onEmailLink?.()}>
        <Sparkles className="mr-2 h-4 w-4" />
          Or email me a link
            < /Button>
            < p className = "text-xs text-muted-foreground text-center w-full" >
              By logging in, you agree to our{ ' ' }
<a href="#" className = "underline hover:text-primary" >
  Terms of Service
    < /a>{' '}
    & { ' '}
    < a href = "#" className = "underline hover:text-primary" >
      Privacy Policy
        < /a>
        < /p>
        < /CardFooter>
        < /Card>
    )
  }
)
AuthForm.displayName = "AuthForm"

export { AuthForm }

code.demo.1753208750003.tsx
import { AuthForm } from "@/components/ui/sign-in"

// A simple SVG for the puzzle graphic to demonstrate layout
const PuzzleGraphic = () => (
    <svg width="250" height="150" viewBox="0 0 250 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(50, 20) rotate(15 75 75)">
            <path d="M75 0 C50 0, 50 25, 25 25 S0 50, 0 75 S25 125, 50 125 S75 100, 75 100 L100 100 C100 100, 125 75, 125 75 S150 50, 150 50 S125 25, 100 25 L75 25 L75 0Z" fill="hsl(var(--card))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        </g>
        <g transform="translate(70, 40) rotate(-10 75 75)">
            <path d="M75 150 C100 150, 100 125, 125 125 S150 100, 150 75 S125 25, 100 25 S75 50, 75 50 L50 50 C50 50, 25 75, 25 75 S0 100, 0 100 S25 125, 50 125 L75 125 L75 150Z" fill="#F97316" stroke="#1E293B" strokeWidth="2"/>
        </g>
    </svg>
)

export default function AuthFormDemo() {
  const handleSocialSignIn = (provider: string) => {
    console.log(`Signing in with ${provider}...`)
  }

  const handleEmailSubmit = (data: { email: string; password?: string }) => {
    console.log("Form submitted:", data)
  }
  
  const handleEmailLink = () => {
    console.log("Requesting email link...")
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#FBF8F3] dark:bg-muted/20">
        <AuthForm 
          onSocialSignIn={handleSocialSignIn}
          onEmailSubmit={handleEmailSubmit}
          onEmailLink={handleEmailLink}
          className="shadow-xl"
        />
    </div>
  )
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/sign-in.tsx
import * as React from "react"
import { cn } from "@/lib/utils" // Your utility for merging class names
import { Button, type ButtonProps } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, KeyRound, Mail, Sparkles } from "lucide-react"
import {useTheme} from "next-themes"

// Simple SVG components for brand icons as placeholders
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img src= "https://svgl.app/library/google.svg" { ...props }/>
)

const MicrosoftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <img src= "https://svgl.app/library/microsoft.svg" { ...props }/>
)

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const {theme} = useTheme();
  return <>
  <img src= {`https://svgl.app/library/apple${theme==='dark' ? '_dark': ''}.svg`} { ...props }/>

  </>
}

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onEmailSubmit?: (data: { email: string; password?: string }) => void
  onSocialSignIn?: (provider: 'google' | 'microsoft' | 'apple' | 'sso') => void
  onEmailLink?: () => void
}

const AuthForm = React.forwardRef<HTMLDivElement, AuthFormProps>(
  ({ className, onEmailSubmit, onSocialSignIn, onEmailLink, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      const email = formData.get("email") as string
      const password = formData.get("password") as string
      onEmailSubmit?.({ email, password })
    }

    return (
      <Card ref= { ref } className = { cn("w-full max-w-md mx-auto", className) } {...props}>
        <CardHeader className="text-left" >
          <CardTitle className="text-2xl" > Sign in with email < /CardTitle>
          <CardDescription>
            Make a new doc to bring your words, data, and teams together.For free.
          < /CardDescription>
  < /CardHeader>
  < CardContent >
  <div className="space-y-4" >
    {/* Social Sign-in */ }
    < div className = "space-y-2" >
      <Label className="text-xs text-muted-foreground" > Sign in with</Label>
      < div className = "grid grid-cols-4 gap-2" >
        <Button variant="outline" onClick = {() => onSocialSignIn?.('google')}>
          <GoogleIcon className="size-4 fill-primary" />
            </Button>
            < Button variant = "outline" onClick = {() => onSocialSignIn?.('microsoft')}>
              <MicrosoftIcon className="size-4 fill-primary" />
                </Button>
                < Button variant = "outline" onClick = {() => onSocialSignIn?.('apple')}>
                  <AppleIcon className="size-5" />
                    </Button>
                    < Button variant = "outline" onClick = {() => onSocialSignIn?.('sso')}>
                      <KeyRound className="h-5 w-5" />
                        <span className="ml-1.5" > SSO < /span>
                          < /Button>
                          < /div>
                          < /div>

{/* Divider */ }
<div className="relative" >
  <div className="absolute inset-0 flex items-center" >
    <span className="w-full border-t" />
      </div>
      < div className = "relative flex justify-center text-xs uppercase" >
        <span className="bg-background px-2 text-muted-foreground" > or < /span>
          < /div>
          < /div>

{/* Email Form */ }
<form onSubmit={ handleFormSubmit } className = "space-y-4" >
  <div className="space-y-2" >
    <Label htmlFor="email" > Email < /Label>
      < div className = "relative" >
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="email" name = "email" type = "email" placeholder = "jdoe.mobbin@gmail.com" className = "pl-9" required />
            </div>
            < /div>
            < div className = "space-y-2" >
              <div className="flex items-center justify-between" >
                <Label htmlFor="password" > Password < /Label>
                  < a href = "#" className = "text-sm font-medium text-primary hover:underline" > Forgot password ? </a>
                    < /div>
                    < div className = "relative" >
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="password" name = "password" type = { showPassword? "text": "password" } className = "pl-9 pr-10" required />
                          <Button 
                        type="button"
variant = "ghost"
size = "icon"
className = "absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
onClick = {() => setShowPassword(!showPassword)}
                    >
  { showPassword?<EyeOff className = "h-4 w-4" /> : <Eye className="h-4 w-4" />}
</Button>
  < /div>
  < /div>
  < Button type = "submit" className = "w-full" > Sign In < /Button>
    < /form>
    < /div>
    < /CardContent>
    < CardFooter className = "flex-col items-start space-y-4" >
      <Button variant="ghost" className = "w-full text-muted-foreground" onClick = {() => onEmailLink?.()}>
        <Sparkles className="mr-2 h-4 w-4" />
          Or email me a link
            < /Button>
            < p className = "text-xs text-muted-foreground text-center w-full" >
              By logging in, you agree to our{ ' ' }
<a href="#" className = "underline hover:text-primary" >
  Terms of Service
    < /a>{' '}
    & { ' '}
    < a href = "#" className = "underline hover:text-primary" >
      Privacy Policy
        < /a>
        < /p>
        < /CardFooter>
        < /Card>
    )
  }
)
AuthForm.displayName = "AuthForm"

export { AuthForm }
```

Install NPM dependencies:
```bash
lucide-react, next-themes
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
