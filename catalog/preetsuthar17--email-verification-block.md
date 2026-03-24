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
email-verification-block.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
Card,
CardContent,
CardDescription,
CardHeader,
CardFooter,
CardTitle,
} from "@/components/ui/card";

import { useState } from "react";
import { Mail, CheckCircle, ArrowLeft } from "lucide-react";

const EmailVerificationBlock = () => {
const [isResending, setIsResending] = useState(false);
const [resendSuccess, setResendSuccess] = useState(false);
const [isVerified, setIsVerified] = useState(false);

const userEmail = "user@example.com";

const handleResendEmail = async () => {
  setIsResending(true);
  setResendSuccess(false);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  setResendSuccess(true);
  setIsResending(false);
  setTimeout(() => setResendSuccess(false), 3000);
};

const handleCheckVerification = async () => {
  setIsVerified(true);
};

if (isVerified) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center flex flex-col gap-4">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <CardTitle className="text-xl font-semibold text-green-600">
          Email Verified!
        </CardTitle>
      </CardHeader>

      <CardFooter className="pt-6">
        <Button className="w-full" >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}

return (
  <Card className="w-full max-w-md  mx-auto flex flex-col gap-6">
    <CardHeader className="text-center flex flex-col gap-4">
      <div className="flex justify-center">
        <div className="p-3 bg-blue-50 rounded-full">
          <Mail className="h-8 w-8 text-blue-600" />
        </div>
      </div>
      <CardTitle className="text-xl font-semibold">
        Check Your Email
      </CardTitle>
      <CardDescription className="flex flex-col gap-2 text-sm">
        We have sent a verification email to your address.
        <br />
        <span className="font-medium text-foreground">
          {userEmail}
        </span>
      </CardDescription>
    </CardHeader>

    <CardContent className="flex flex-col gap-4">
      {resendSuccess && (
        <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg text-center">
          Email sent successfully!
        </div>
      )}

      <div className="text-center text-sm text-muted-foreground">
        <button
          onClick={handleResendEmail}
          disabled={isResending}
          className="text-primary hover:underline disabled:opacity-50 font-medium"
        >
          {isResending ? "Sending..." : "Resend email"}
        </button>
      </div>
    </CardContent>

    <CardFooter className="flex flex-col flex flex-col gap-4">
      <Button onClick={handleCheckVerification} className="w-full" >
        I've verified my email
      </Button>

      <Button
        variant={"ghost"}
        
        className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Sign In
      </Button>
    </CardFooter>
  </Card>
);
}

export default EmailVerificationBlock;

code.demo.1758782392391.tsx
import EmailVerificationBlock from "@/components/ui/email-verification-block";

export default function DemoOne() {
  return <EmailVerificationBlock />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/email-verification-block.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
Card,
CardContent,
CardDescription,
CardHeader,
CardFooter,
CardTitle,
} from "@/components/ui/card";

import { useState } from "react";
import { Mail, CheckCircle, ArrowLeft } from "lucide-react";

const EmailVerificationBlock = () => {
const [isResending, setIsResending] = useState(false);
const [resendSuccess, setResendSuccess] = useState(false);
const [isVerified, setIsVerified] = useState(false);

const userEmail = "user@example.com";

const handleResendEmail = async () => {
  setIsResending(true);
  setResendSuccess(false);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  setResendSuccess(true);
  setIsResending(false);
  setTimeout(() => setResendSuccess(false), 3000);
};

const handleCheckVerification = async () => {
  setIsVerified(true);
};

if (isVerified) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center flex flex-col gap-4">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <CardTitle className="text-xl font-semibold text-green-600">
          Email Verified!
        </CardTitle>
      </CardHeader>

      <CardFooter className="pt-6">
        <Button className="w-full" >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}

return (
  <Card className="w-full max-w-md  mx-auto flex flex-col gap-6">
    <CardHeader className="text-center flex flex-col gap-4">
      <div className="flex justify-center">
        <div className="p-3 bg-blue-50 rounded-full">
          <Mail className="h-8 w-8 text-blue-600" />
        </div>
      </div>
      <CardTitle className="text-xl font-semibold">
        Check Your Email
      </CardTitle>
      <CardDescription className="flex flex-col gap-2 text-sm">
        We have sent a verification email to your address.
        <br />
        <span className="font-medium text-foreground">
          {userEmail}
        </span>
      </CardDescription>
    </CardHeader>

    <CardContent className="flex flex-col gap-4">
      {resendSuccess && (
        <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg text-center">
          Email sent successfully!
        </div>
      )}

      <div className="text-center text-sm text-muted-foreground">
        <button
          onClick={handleResendEmail}
          disabled={isResending}
          className="text-primary hover:underline disabled:opacity-50 font-medium"
        >
          {isResending ? "Sending..." : "Resend email"}
        </button>
      </div>
    </CardContent>

    <CardFooter className="flex flex-col flex flex-col gap-4">
      <Button onClick={handleCheckVerification} className="w-full" >
        I've verified my email
      </Button>

      <Button
        variant={"ghost"}
        
        className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Sign In
      </Button>
    </CardFooter>
  </Card>
);
}

export default EmailVerificationBlock;
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
