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
two-factor-authentication-block.tsx
"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
Card,
CardContent,
CardDescription,
CardHeader,
CardFooter,
CardTitle,
} from "@/components/ui/card";
import {
InputOTP,
InputOTPGroup,
InputOTPSlot,
InputOTPSeparator,
} from "@/components/ui/input-otp";

import { useState } from "react";
import { Shield, ArrowLeft, RefreshCw } from "lucide-react";

interface FormErrors {
code?: string;
general?: string;
}

const TwoFactorAuthBlock = ()  => {
const [code, setCode] = useState("");
const [errors, setErrors] = useState<FormErrors>({});
const [isLoading, setIsLoading] = useState(false);
const [isResending, setIsResending] = useState(false);
const [resendSuccess, setResendSuccess] = useState(false);

const handleCodeChange = (value: string) => {
  setCode(value);

  if (errors.code) {
    setErrors((prev) => ({ ...prev, code: undefined }));
  }
};

const handleCodeComplete = (value: string) => {
  setCode(value);
  if (value.length === 6) {
    handleSubmit();
  }
};

const validateForm = (): boolean => {
  const newErrors: FormErrors = {};

  if (code.length !== 6) {
    newErrors.code = "Please enter the complete 6-digit code";
  } else if (!/^d{6}$/.test(code)) {
    newErrors.code = "Code must contain only numbers";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e?: React.FormEvent) => {
  if (e) e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsLoading(true);
  setErrors({});

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (code === "123456") {
      console.log("Code verified successfully");
    } else {
      setErrors({ general: "Invalid verification code. Please try again." });
    }
  } catch (error) {
    setErrors({ general: "An unexpected error occurred. Please try again." });
  } finally {
    setIsLoading(false);
  }
};

const handleResendCode = async () => {
  setIsResending(true);
  setErrors({});
  setResendSuccess(false);

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setResendSuccess(true);
    setCode("");

    setTimeout(() => setResendSuccess(false), 5000);
  } catch (error) {
    setErrors({ general: "Failed to resend code. Please try again." });
  } finally {
    setIsResending(false);
  }
};

return (
  <Card className="w-full max-w-md mx-auto flex flex-col gap-6">
    <CardHeader className="text-center flex flex-col items-center justify-center">
      <div className="flex justify-center mb-4">
        <Shield className="h-12 w-12 text-primary" />
      </div>
      <CardTitle className="text-2xl font-bold">
        Two-Factor Authentication
      </CardTitle>
      <CardDescription>
        Enter the 6-digit code sent to your device
      </CardDescription>
    </CardHeader>
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <CardContent className="flex flex-col gap-3">
        {errors.general && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {errors.general}
          </div>
        )}

        {resendSuccess && (
          <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
            New verification code sent successfully!
          </div>
        )}

        <div className="flex flex-col gap-3 items-center">
          <Label className="text-center">Verification Code</Label>
          <InputOTP
            maxLength={6}
            value={code}
            onChange={handleCodeChange}
            onComplete={handleCodeComplete}
            disabled={isLoading}
            pattern="[0-9]*"
            variant={errors.code ? "destructive" : "default"}
            otpSize="default"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {errors.code && (
            <p className="text-sm text-red-600 text-center">{errors.code}</p>
          )}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isResending}
              className="text-primary hover:underline disabled:opacity-50"
            >
              {isResending ? (
                <>
                  <RefreshCw className="inline h-3 w-3 mr-1 animate-spin" />
                  Sending...
                </>
              ) : (
                "Resend Code"
              )}
            </button>
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col flex flex-col gap-4">
        <Button
          type="submit"
          
          className="w-full"
          loading={isLoading}
          disabled={isLoading || code.length < 6}
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </Button>

        <Button
          variant={"ghost"}
          
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground w-full"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Sign In
        </Button>
      </CardFooter>
    </form>
  </Card>
);
}

export default TwoFactorAuthBlock;

code.demo.1758783334374.tsx
import TwoFactorAuthBlock from "@/components/ui/two-factor-authentication-block";

export default function DemoOne() {
  return <TwoFactorAuthBlock />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/two-factor-authentication-block.tsx
"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
Card,
CardContent,
CardDescription,
CardHeader,
CardFooter,
CardTitle,
} from "@/components/ui/card";
import {
InputOTP,
InputOTPGroup,
InputOTPSlot,
InputOTPSeparator,
} from "@/components/ui/input-otp";

import { useState } from "react";
import { Shield, ArrowLeft, RefreshCw } from "lucide-react";

interface FormErrors {
code?: string;
general?: string;
}

const TwoFactorAuthBlock = ()  => {
const [code, setCode] = useState("");
const [errors, setErrors] = useState<FormErrors>({});
const [isLoading, setIsLoading] = useState(false);
const [isResending, setIsResending] = useState(false);
const [resendSuccess, setResendSuccess] = useState(false);

const handleCodeChange = (value: string) => {
  setCode(value);

  if (errors.code) {
    setErrors((prev) => ({ ...prev, code: undefined }));
  }
};

const handleCodeComplete = (value: string) => {
  setCode(value);
  if (value.length === 6) {
    handleSubmit();
  }
};

const validateForm = (): boolean => {
  const newErrors: FormErrors = {};

  if (code.length !== 6) {
    newErrors.code = "Please enter the complete 6-digit code";
  } else if (!/^d{6}$/.test(code)) {
    newErrors.code = "Code must contain only numbers";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e?: React.FormEvent) => {
  if (e) e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsLoading(true);
  setErrors({});

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (code === "123456") {
      console.log("Code verified successfully");
    } else {
      setErrors({ general: "Invalid verification code. Please try again." });
    }
  } catch (error) {
    setErrors({ general: "An unexpected error occurred. Please try again." });
  } finally {
    setIsLoading(false);
  }
};

const handleResendCode = async () => {
  setIsResending(true);
  setErrors({});
  setResendSuccess(false);

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setResendSuccess(true);
    setCode("");

    setTimeout(() => setResendSuccess(false), 5000);
  } catch (error) {
    setErrors({ general: "Failed to resend code. Please try again." });
  } finally {
    setIsResending(false);
  }
};

return (
  <Card className="w-full max-w-md mx-auto flex flex-col gap-6">
    <CardHeader className="text-center flex flex-col items-center justify-center">
      <div className="flex justify-center mb-4">
        <Shield className="h-12 w-12 text-primary" />
      </div>
      <CardTitle className="text-2xl font-bold">
        Two-Factor Authentication
      </CardTitle>
      <CardDescription>
        Enter the 6-digit code sent to your device
      </CardDescription>
    </CardHeader>
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <CardContent className="flex flex-col gap-3">
        {errors.general && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {errors.general}
          </div>
        )}

        {resendSuccess && (
          <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
            New verification code sent successfully!
          </div>
        )}

        <div className="flex flex-col gap-3 items-center">
          <Label className="text-center">Verification Code</Label>
          <InputOTP
            maxLength={6}
            value={code}
            onChange={handleCodeChange}
            onComplete={handleCodeComplete}
            disabled={isLoading}
            pattern="[0-9]*"
            variant={errors.code ? "destructive" : "default"}
            otpSize="default"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {errors.code && (
            <p className="text-sm text-red-600 text-center">{errors.code}</p>
          )}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isResending}
              className="text-primary hover:underline disabled:opacity-50"
            >
              {isResending ? (
                <>
                  <RefreshCw className="inline h-3 w-3 mr-1 animate-spin" />
                  Sending...
                </>
              ) : (
                "Resend Code"
              )}
            </button>
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col flex flex-col gap-4">
        <Button
          type="submit"
          
          className="w-full"
          loading={isLoading}
          disabled={isLoading || code.length < 6}
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </Button>

        <Button
          variant={"ghost"}
          
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground w-full"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Sign In
        </Button>
      </CardFooter>
    </form>
  </Card>
);
}

export default TwoFactorAuthBlock;
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
