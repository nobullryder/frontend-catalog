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
password-update-block.tsx
"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import { Lock, CheckCircle, Check, X } from "lucide-react";
import Link from "next/link";

interface UpdatePasswordFormData {
password: string;
confirmPassword: string;
}

interface FormErrors {
password?: string;
confirmPassword?: string;
general?: string;
}

const UpdatePasswordBlock = ()  => {
const [formData, setFormData] = useState<UpdatePasswordFormData>({
  password: "",
  confirmPassword: "",
});
const [errors, setErrors] = useState<FormErrors>({});
const [isLoading, setIsLoading] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);

// Password strength calculation
const getPasswordStrength = (password: string) => {
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /d/.test(password),
  };

  const score = Object.values(requirements).filter(Boolean).length;

  return {
    requirements,
    score,
    strength:
      score === 0
        ? "none"
        : score <= 1
        ? "weak"
        : score <= 2
        ? "fair"
        : score <= 3
        ? "good"
        : "strong",
  };
};

const passwordStrength = getPasswordStrength(formData.password);

// Validate form data
const validateForm = (): boolean => {
  const newErrors: FormErrors = {};

  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (formData.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*d)/.test(formData.password)) {
    newErrors.password =
      "Password must contain uppercase, lowercase, and number";
  }

  if (!formData.confirmPassword) {
    newErrors.confirmPassword = "Please confirm your password";
  } else if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "Passwords don't match";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

// Handle input changes
const handleInputChange = (
  field: keyof UpdatePasswordFormData,
  value: string
) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value,
  }));

  // Clear specific field error when user starts typing
  if (errors[field]) {
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  }
};

// Handle form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsLoading(true);
  setErrors({});

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSuccess(true);
  } catch (error) {
    setErrors({
      general: "An unexpected error occurred. Please try again.",
    });
  } finally {
    setIsLoading(false);
  }
};

if (isSuccess) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <CardTitle className="text-2xl font-bold text-green-600">
          Password Updated Successfully!
        </CardTitle>
        <CardDescription>
          Your password has been updated. You can now sign in with your new
          password.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Link href="/auth/signin">
          <Button  className="w-full">
            Sign In
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

return (
  <Card className="w-full max-w-md mx-auto flex flex-col gap-6">
    <CardHeader className="text-center">
      <CardTitle className="text-2xl font-bold">Update Password</CardTitle>
      <CardDescription>Enter your new password below</CardDescription>
    </CardHeader>

    <form onSubmit={handleSubmit} className="flex flex-col flex flex-col gap-6">
      <CardContent className="flex flex-col gap-4">
        {errors.general && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {errors.general}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            
            id="password"
            type="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            error={!!errors.password}
            leftIcon={<Lock className="h-4 w-4" />}
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            
            id="confirmPassword"
            type="password"
            placeholder="Confirm your new password"
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            error={!!errors.confirmPassword}
            leftIcon={<Lock className="h-4 w-4" />}
            disabled={isLoading}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">{errors.confirmPassword}</p>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button
          
          type="submit"
          className="w-full"
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? "Updating Password..." : "Update Password"}
        </Button>
      </CardFooter>
    </form>
  </Card>
);
}

export default UpdatePasswordBlock;

code.demo.1758782057347.tsx
import UpdatePasswordBlock from "@/components/ui/password-update-block";

export default function DemoOne() {
  return <UpdatePasswordBlock />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/password-update-block.tsx
"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import { Lock, CheckCircle, Check, X } from "lucide-react";
import Link from "next/link";

interface UpdatePasswordFormData {
password: string;
confirmPassword: string;
}

interface FormErrors {
password?: string;
confirmPassword?: string;
general?: string;
}

const UpdatePasswordBlock = ()  => {
const [formData, setFormData] = useState<UpdatePasswordFormData>({
  password: "",
  confirmPassword: "",
});
const [errors, setErrors] = useState<FormErrors>({});
const [isLoading, setIsLoading] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);

// Password strength calculation
const getPasswordStrength = (password: string) => {
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /d/.test(password),
  };

  const score = Object.values(requirements).filter(Boolean).length;

  return {
    requirements,
    score,
    strength:
      score === 0
        ? "none"
        : score <= 1
        ? "weak"
        : score <= 2
        ? "fair"
        : score <= 3
        ? "good"
        : "strong",
  };
};

const passwordStrength = getPasswordStrength(formData.password);

// Validate form data
const validateForm = (): boolean => {
  const newErrors: FormErrors = {};

  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (formData.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*d)/.test(formData.password)) {
    newErrors.password =
      "Password must contain uppercase, lowercase, and number";
  }

  if (!formData.confirmPassword) {
    newErrors.confirmPassword = "Please confirm your password";
  } else if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "Passwords don't match";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

// Handle input changes
const handleInputChange = (
  field: keyof UpdatePasswordFormData,
  value: string
) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value,
  }));

  // Clear specific field error when user starts typing
  if (errors[field]) {
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  }
};

// Handle form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsLoading(true);
  setErrors({});

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSuccess(true);
  } catch (error) {
    setErrors({
      general: "An unexpected error occurred. Please try again.",
    });
  } finally {
    setIsLoading(false);
  }
};

if (isSuccess) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <CardTitle className="text-2xl font-bold text-green-600">
          Password Updated Successfully!
        </CardTitle>
        <CardDescription>
          Your password has been updated. You can now sign in with your new
          password.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Link href="/auth/signin">
          <Button  className="w-full">
            Sign In
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

return (
  <Card className="w-full max-w-md mx-auto flex flex-col gap-6">
    <CardHeader className="text-center">
      <CardTitle className="text-2xl font-bold">Update Password</CardTitle>
      <CardDescription>Enter your new password below</CardDescription>
    </CardHeader>

    <form onSubmit={handleSubmit} className="flex flex-col flex flex-col gap-6">
      <CardContent className="flex flex-col gap-4">
        {errors.general && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {errors.general}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            
            id="password"
            type="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            error={!!errors.password}
            leftIcon={<Lock className="h-4 w-4" />}
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            
            id="confirmPassword"
            type="password"
            placeholder="Confirm your new password"
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            error={!!errors.confirmPassword}
            leftIcon={<Lock className="h-4 w-4" />}
            disabled={isLoading}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">{errors.confirmPassword}</p>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button
          
          type="submit"
          className="w-full"
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? "Updating Password..." : "Update Password"}
        </Button>
      </CardFooter>
    </form>
  </Card>
);
}

export default UpdatePasswordBlock;
```

Install NPM dependencies:
```bash
lucide-react, next
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
