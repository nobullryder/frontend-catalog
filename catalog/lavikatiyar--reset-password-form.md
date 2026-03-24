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
reset-password-form.tsx
"use client";

import * as React from "react";
import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import { Input, InputProps } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Props definition for the main component
interface ResetPasswordFormProps {
  email: string;
  onVerifyCode: (code: string) => Promise<boolean>;
  onSubmit: (password: string) => Promise<void>;
  onCancel?: () => void;
}

// Sub-component for individual password requirements
const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => {
  const Icon = met ? CheckCircle2 : XCircle;
  return (
    <motion.div
      className={cn(
        "flex items-center text-sm",
        met ? "text-green-500" : "text-muted-foreground"
      )}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Icon className="mr-2 h-4 w-4" />
      {text}
    </motion.div>
  );
};

export const ResetPasswordForm = ({
  email,
  onVerifyCode,
  onSubmit,
  onCancel,
}: ResetPasswordFormProps) => {
  // State management
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Refs for OTP input focusing
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Password validation logic
  const requirements = useMemo(() => {
    return [
      { text: "At least one lowercase letter", met: /[a-z]/.test(password) },
      { text: "Minimum 8 characters", met: password.length >= 8 },
      { text: "At least one uppercase letter", met: /[A-Z]/.test(password) },
      { text: "At least one number", met: /[0-9]/.test(password) },
    ];
  }, [password]);

  const allRequirementsMet = requirements.every((req) => req.met);

  // --- CUSTOM OTP LOGIC START ---
  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return; // Only allow numbers

    const newOtp = otp.split('');
    newOtp[index] = value;
    const newOtpString = newOtp.join('');
    setOtp(newOtpString);

    // Focus next input if a digit is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Trigger verification if all digits are filled
    if (newOtpString.length === 6) {
        handleVerifyCode(newOtpString);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasteData = e.clipboardData.getData('text').slice(0, 6);
      if (/^\d{6}$/.test(pasteData)) {
          setOtp(pasteData);
          inputRefs.current[5]?.focus();
          handleVerifyCode(pasteData);
      }
  };
  // --- CUSTOM OTP LOGIC END ---

  const handleVerifyCode = async (code: string) => {
    setIsVerifying(true);
    setError(null);
    const success = await onVerifyCode(code);
    if (success) {
      setIsCodeVerified(true);
    } else {
      setError("Invalid code. Please try again.");
      setOtp(""); // Clear OTP on failure
      inputRefs.current[0]?.focus();
    }
    setIsVerifying(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allRequirementsMet) return;
    setIsSubmitting(true);
    await onSubmit(password);
    setIsSubmitting(false);
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
      <h1 className="mb-2 text-2xl font-semibold">Reset Password</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Enter the code sent to <span className="font-medium text-foreground">{email}</span> to reset your password.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* CUSTOM OTP Input Section */}
          <div className="space-y-2">
            <div className="flex justify-center space-x-2" onPaste={handlePaste}>
              {Array.from({ length: 6 }).map((_, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={otp[index] || ''}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={isCodeVerified || isVerifying}
                  className="h-12 w-12 text-center text-lg font-semibold"
                  aria-label={`OTP digit ${index + 1}`}
                />
              ))}
            </div>
            {isVerifying && <p className="text-center text-sm text-muted-foreground">Verifying...</p>}
            {error && <p className="text-center text-sm text-destructive">{error}</p>}
            {isCodeVerified && (
              <motion.div
                className="flex items-center justify-center text-sm text-green-500"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Code verified
              </motion.div>
            )}
          </div>

          <hr className="border-border" />

          {/* New Password Section with Animation */}
          <AnimatePresence>
            {isCodeVerified && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="space-y-4">
                  <h2 className="font-medium text-foreground">New password</h2>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {/* Password Requirements Checklist */}
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {requirements.map((req) => (
                      <PasswordRequirement key={req.text} met={req.met} text={req.text} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-end space-x-4">
          {onCancel && (
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={!allRequirementsMet || isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset password"}
          </Button>
        </div>
      </form>
    </div>
  );
};

code.demo.1760113447539.tsx
import { ResetPasswordForm } from "@/components/ui/reset-password-form";

// Main demo component
const ResetPasswordFormDemo = () => {
  // Mock function to simulate verifying a code
  const handleVerifyCode = (code: string): Promise<boolean> => {
    console.log("Verifying code:", code);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate success only if the code is "123456"
        resolve(code === "123456");
      }, 1000);
    });
  };

  // Mock function to simulate form submission
  const handleSubmitPassword = (password: string): Promise<void> => {
    console.log("New password submitted:", password);
    return new Promise((resolve) => {
      setTimeout(() => {
        alert("Password has been successfully reset!");
        resolve();
      }, 1500);
    });
  };

  // Mock function for cancel action
  const handleCancel = () => {
    console.log("Reset password cancelled.");
    alert("Operation cancelled.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <ResetPasswordForm
        email="ravikatiyar@gmail.com"
        onVerifyCode={handleVerifyCode}
        onSubmit={handleSubmitPassword}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default ResetPasswordFormDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/reset-password-form.tsx
"use client";

import * as React from "react";
import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import { Input, InputProps } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Props definition for the main component
interface ResetPasswordFormProps {
  email: string;
  onVerifyCode: (code: string) => Promise<boolean>;
  onSubmit: (password: string) => Promise<void>;
  onCancel?: () => void;
}

// Sub-component for individual password requirements
const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => {
  const Icon = met ? CheckCircle2 : XCircle;
  return (
    <motion.div
      className={cn(
        "flex items-center text-sm",
        met ? "text-green-500" : "text-muted-foreground"
      )}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Icon className="mr-2 h-4 w-4" />
      {text}
    </motion.div>
  );
};

export const ResetPasswordForm = ({
  email,
  onVerifyCode,
  onSubmit,
  onCancel,
}: ResetPasswordFormProps) => {
  // State management
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Refs for OTP input focusing
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Password validation logic
  const requirements = useMemo(() => {
    return [
      { text: "At least one lowercase letter", met: /[a-z]/.test(password) },
      { text: "Minimum 8 characters", met: password.length >= 8 },
      { text: "At least one uppercase letter", met: /[A-Z]/.test(password) },
      { text: "At least one number", met: /[0-9]/.test(password) },
    ];
  }, [password]);

  const allRequirementsMet = requirements.every((req) => req.met);

  // --- CUSTOM OTP LOGIC START ---
  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return; // Only allow numbers

    const newOtp = otp.split('');
    newOtp[index] = value;
    const newOtpString = newOtp.join('');
    setOtp(newOtpString);

    // Focus next input if a digit is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Trigger verification if all digits are filled
    if (newOtpString.length === 6) {
        handleVerifyCode(newOtpString);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasteData = e.clipboardData.getData('text').slice(0, 6);
      if (/^\d{6}$/.test(pasteData)) {
          setOtp(pasteData);
          inputRefs.current[5]?.focus();
          handleVerifyCode(pasteData);
      }
  };
  // --- CUSTOM OTP LOGIC END ---

  const handleVerifyCode = async (code: string) => {
    setIsVerifying(true);
    setError(null);
    const success = await onVerifyCode(code);
    if (success) {
      setIsCodeVerified(true);
    } else {
      setError("Invalid code. Please try again.");
      setOtp(""); // Clear OTP on failure
      inputRefs.current[0]?.focus();
    }
    setIsVerifying(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allRequirementsMet) return;
    setIsSubmitting(true);
    await onSubmit(password);
    setIsSubmitting(false);
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
      <h1 className="mb-2 text-2xl font-semibold">Reset Password</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Enter the code sent to <span className="font-medium text-foreground">{email}</span> to reset your password.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* CUSTOM OTP Input Section */}
          <div className="space-y-2">
            <div className="flex justify-center space-x-2" onPaste={handlePaste}>
              {Array.from({ length: 6 }).map((_, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={otp[index] || ''}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={isCodeVerified || isVerifying}
                  className="h-12 w-12 text-center text-lg font-semibold"
                  aria-label={`OTP digit ${index + 1}`}
                />
              ))}
            </div>
            {isVerifying && <p className="text-center text-sm text-muted-foreground">Verifying...</p>}
            {error && <p className="text-center text-sm text-destructive">{error}</p>}
            {isCodeVerified && (
              <motion.div
                className="flex items-center justify-center text-sm text-green-500"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Code verified
              </motion.div>
            )}
          </div>

          <hr className="border-border" />

          {/* New Password Section with Animation */}
          <AnimatePresence>
            {isCodeVerified && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="space-y-4">
                  <h2 className="font-medium text-foreground">New password</h2>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {/* Password Requirements Checklist */}
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {requirements.map((req) => (
                      <PasswordRequirement key={req.text} met={req.met} text={req.text} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-end space-x-4">
          {onCancel && (
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={!allRequirementsMet || isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset password"}
          </Button>
        </div>
      </form>
    </div>
  );
};
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
