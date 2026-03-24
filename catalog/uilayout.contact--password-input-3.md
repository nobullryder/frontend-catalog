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
password-input-3.tsx
'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Check, Eye, EyeOff, Info, X } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

const PASSWORD_REQUIREMENTS = [
  { regex: /.{8,}/, text: 'At least 8 characters' },
  { regex: /[0-9]/, text: 'At least 1 number' },
  { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
  { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
  { regex: /[!-\/:-@[-`{-~]/, text: 'At least 1 special characters' },
] as const;

type StrengthScore = 0 | 1 | 2 | 3 | 4 | 5;

const STRENGTH_CONFIG = {
  colors: {
    0: 'text-red-500',
    1: 'text-orange-500',
    2: 'text-yellow-500',
    3: 'text-green-500',
    4: 'text-amber-700',
    5: 'text-emerald-500',
  } satisfies Record<StrengthScore, string>,
  texts: {
    0: 'Enter a password',
    1: 'Weak password',
    2: 'Medium password!',
    3: 'Strong password!!',
    4: 'Very Strong password!!!',
  } satisfies Record<Exclude<StrengthScore, 5>, string>,
} as const;

type Requirement = {
  met: boolean;
  text: string;
};

type PasswordStrength = {
  score: StrengthScore;
  requirements: Requirement[];
};

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  containerClassName?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, containerClassName, value, onChange, ...props }, ref) => {
    const [password, setPassword] = useState<string>(value?.toString() || '');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      if (value !== undefined) {
        setPassword(value.toString());
      }
    }, [value]);

    const calculateStrength = useMemo((): PasswordStrength => {
      const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
        met: req.regex.test(password),
        text: req.text,
      }));

      return {
        score: requirements.filter((req) => req.met).length as StrengthScore,
        requirements,
      };
    }, [password]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      onChange?.(e);
    };

    return (
      <div className={containerClassName}>
        <form className='space-y-2'>
          <div className='flex justify-between'>
            <label htmlFor={props.id || 'password'} className='block text-sm font-medium'>
              Password
            </label>
            <HoverCard openDelay={200}>
              <HoverCardTrigger>
                <Info
                  size={20}
                  className={`cursor-pointer ${STRENGTH_CONFIG.colors[calculateStrength.score]} transition-all`}
                />
              </HoverCardTrigger>
              <HoverCardContent className='bg-background'>
                <ul className='space-y-1.5' aria-label='Password requirements'>
                  {calculateStrength.requirements.map((req, index) => (
                    <li key={index} className='flex items-center space-x-2'>
                      {req.met ? (
                        <Check size={16} className='text-emerald-500' />
                      ) : (
                        <X size={16} className='text-muted-foreground/80' />
                      )}
                      <span
                        className={`text-xs ${req.met ? 'text-emerald-600' : 'text-muted-foreground'}`}
                      >
                        {req.text}
                        <span className='sr-only'>
                          {req.met
                            ? ' - Requirement met'
                            : ' - Requirement not met'}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className='relative'>
            <input
              id={props.id || 'password'}
              type={isVisible ? 'text' : 'password'}
              value={password}
              onChange={handleChange}
              aria-invalid={calculateStrength.score < 4}
              aria-describedby='password-strength'
              className={`w-full p-2 border-2 rounded-md bg-background outline-none focus-within:border-blue-700 transition ${className || ''}`}
              ref={ref}
              {...props}
            />
            <button
              type='button'
              onClick={() => setIsVisible((prev) => !prev)}
              aria-label={isVisible ? 'Hide password' : 'Show password'}
              className='absolute inset-y-0 right-0 outline-none flex items-center justify-center w-9 text-muted-foreground/80 hover:text-foreground'
            >
              {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </form>
        <div className='flex gap-2 w-full justify-between mt-2'>
          <span
            className={`${calculateStrength.score >= 1 ? 'bg-green-200' : 'bg-border'} p-1 rounded-full w-full`}
          ></span>
          <span
            className={`${calculateStrength.score >= 2 ? 'bg-green-300' : 'bg-border'} p-1 rounded-full w-full`}
          ></span>
          <span
            className={`${calculateStrength.score >= 3 ? 'bg-green-400' : 'bg-border'} p-1 rounded-full w-full`}
          ></span>
          <span
            className={`${calculateStrength.score >= 4 ? 'bg-green-500' : 'bg-border'} p-1 rounded-full w-full`}
          ></span>
          <span
            className={`${calculateStrength.score >= 5 ? 'bg-green-600' : 'bg-border'} p-1 rounded-full w-full`}
          ></span>
        </div>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export {
  PASSWORD_REQUIREMENTS,
  STRENGTH_CONFIG,
  StrengthScore,
  Requirement,
  PasswordStrength,
  PasswordInputProps,
};
export default PasswordInput;

code.demo.1749988020275.tsx
'use client';
import React, { useState } from 'react';
import PasswordInput from '@/components/ui/password-input-3';

const PasswordInputDemo = () => {
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('MyStrongPassword!123');
  const [passwordThree, setPasswordThree] = useState('weak');

  return (
    <div className="flex flex-col gap-12 p-8 min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50">
      <h1 className="text-4xl font-bold text-center mb-8">Password Input Demos</h1>

      <div className="w-96 mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Default State</h2>
        <PasswordInput
          id="demo-password-1"
          value={passwordOne}
          onChange={(e) => setPasswordOne(e.target.value)}
          placeholder="Enter your password"
          containerClassName="py-0 mx-0 w-full"
        />
      </div>
    </div>
  );
};

export { PasswordInputDemo as DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/password-input-3.tsx
'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Check, Eye, EyeOff, Info, X } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

const PASSWORD_REQUIREMENTS = [
  { regex: /.{8,}/, text: 'At least 8 characters' },
  { regex: /[0-9]/, text: 'At least 1 number' },
  { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
  { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
  { regex: /[!-\/:-@[-`{-~]/, text: 'At least 1 special characters' },
] as const;

type StrengthScore = 0 | 1 | 2 | 3 | 4 | 5;

const STRENGTH_CONFIG = {
  colors: {
    0: 'text-red-500',
    1: 'text-orange-500',
    2: 'text-yellow-500',
    3: 'text-green-500',
    4: 'text-amber-700',
    5: 'text-emerald-500',
  } satisfies Record<StrengthScore, string>,
  texts: {
    0: 'Enter a password',
    1: 'Weak password',
    2: 'Medium password!',
    3: 'Strong password!!',
    4: 'Very Strong password!!!',
  } satisfies Record<Exclude<StrengthScore, 5>, string>,
} as const;

type Requirement = {
  met: boolean;
  text: string;
};

type PasswordStrength = {
  score: StrengthScore;
  requirements: Requirement[];
};

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  containerClassName?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, containerClassName, value, onChange, ...props }, ref) => {
    const [password, setPassword] = useState<string>(value?.toString() || '');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      if (value !== undefined) {
        setPassword(value.toString());
      }
    }, [value]);

    const calculateStrength = useMemo((): PasswordStrength => {
      const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
        met: req.regex.test(password),
        text: req.text,
      }));

      return {
        score: requirements.filter((req) => req.met).length as StrengthScore,
        requirements,
      };
    }, [password]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      onChange?.(e);
    };

    return (
      <div className={containerClassName}>
        <form className='space-y-2'>
          <div className='flex justify-between'>
            <label htmlFor={props.id || 'password'} className='block text-sm font-medium'>
              Password
            </label>
            <HoverCard openDelay={200}>
              <HoverCardTrigger>
                <Info
                  size={20}
                  className={`cursor-pointer ${STRENGTH_CONFIG.colors[calculateStrength.score]} transition-all`}
                />
              </HoverCardTrigger>
              <HoverCardContent className='bg-background'>
                <ul className='space-y-1.5' aria-label='Password requirements'>
                  {calculateStrength.requirements.map((req, index) => (
                    <li key={index} className='flex items-center space-x-2'>
                      {req.met ? (
                        <Check size={16} className='text-emerald-500' />
                      ) : (
                        <X size={16} className='text-muted-foreground/80' />
                      )}
                      <span
                        className={`text-xs ${req.met ? 'text-emerald-600' : 'text-muted-foreground'}`}
                      >
                        {req.text}
                        <span className='sr-only'>
                          {req.met
                            ? ' - Requirement met'
                            : ' - Requirement not met'}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className='relative'>
            <input
              id={props.id || 'password'}
              type={isVisible ? 'text' : 'password'}
              value={password}
              onChange={handleChange}
              aria-invalid={calculateStrength.score < 4}
              aria-describedby='password-strength'
              className={`w-full p-2 border-2 rounded-md bg-background outline-none focus-within:border-blue-700 transition ${className || ''}`}
              ref={ref}
              {...props}
            />
            <button
              type='button'
              onClick={() => setIsVisible((prev) => !prev)}
              aria-label={isVisible ? 'Hide password' : 'Show password'}
              className='absolute inset-y-0 right-0 outline-none flex items-center justify-center w-9 text-muted-foreground/80 hover:text-foreground'
            >
              {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </form>
        <div className='flex gap-2 w-full justify-between mt-2'>
          <span
            className={`${calculateStrength.score >= 1 ? 'bg-green-200' : 'bg-border'} p-1 rounded-full w-full`}
          ></span>
          <span
            className={`${calculateStrength.score >= 2 ? 'bg-green-300' : 'bg-border'} p-1 rounded-full w-full`}
          ></span>
          <span
            className={`${calculateStrength.score >= 3 ? 'bg-green-400' : 'bg-border'} p-1 rounded-full w-full`}
          ></span>
          <span
            className={`${calculateStrength.score >= 4 ? 'bg-green-500' : 'bg-border'} p-1 rounded-full w-full`}
          ></span>
          <span
            className={`${calculateStrength.score >= 5 ? 'bg-green-600' : 'bg-border'} p-1 rounded-full w-full`}
          ></span>
        </div>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export {
  PASSWORD_REQUIREMENTS,
  STRENGTH_CONFIG,
  StrengthScore,
  Requirement,
  PasswordStrength,
  PasswordInputProps,
};
export default PasswordInput;
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
