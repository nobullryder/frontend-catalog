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
login-with-listed-provider.tsx
"use client";

import React from "react";

export default function LoginPage() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-8">
        {/* Logo and heading */}
        <div className="text-center">
          <img
            src="https://floatui.com/logo.svg"
            width={150}
            alt="Logo"
            className="mx-auto"
          />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
            <p>
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Sign in
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <span className="block w-full h-px bg-gray-300"></span>
          <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
            Or continue with
          </p>
        </div>

        {/* Social buttons */}
        <div className="space-y-4 text-sm font-medium">
          {/* Google */}
          <button className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
            <svg
              className="w-5 h-5"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.2H272v95h146.9c-6.3 33.9-25 62.5-53.2 81.8v68.1h85.8c50.2-46.3 82-114.6 82-194.7z"
                fill="#4285F4"
              />
              <path
                d="M272 544.3c71.6 0 131.7-23.7 175.7-64.2l-85.8-68.1c-23.8 16-54.1 25.4-89.9 25.4-69.1 0-127.6-46.6-148.4-109.3h-89.6v68.9C77.7 480.5 168.5 544.3 272 544.3z"
                fill="#34A853"
              />
              <path
                d="M123.6 328.1c-10.8-32.1-10.8-66.9 0-99l-89.6-68.9c-39.1 77.6-39.1 168.3 0 245.9l89.6-68z"
                fill="#FBBC05"
              />
              <path
                d="M272 107.7c37.4-.6 73.5 13.2 101.1 38.7l75.4-75.4C403.4 24.5 341.4 0 272 0 168.5 0 77.7 63.8 34 159.2l89.6 68.9C144.4 154.3 202.9 107.7 272 107.7z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          {/* Twitter (X) */}
          <button className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
            <svg
              className="w-5 h-5"
              viewBox="0 0 1200 1227"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M714.2 521.8 1160 0H1060.4L667.6 450.1 354.1 0H0l467.2 681.6L0 1226.5h99.6L515.3 753l330.1 473.5h354.1L714.2 521.8ZM566.3 690.2l-48.5-68.9-369-523.6h158.9l297.8 422.3 48.5 68.9 385.2 546.8H880.3L566.3 690.2Z"
                fill="currentColor"
              />
            </svg>
            Continue with Twitter
          </button>

          {/* GitHub */}
          <button className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
            <svg
              className="w-5 h-5"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.48c-2.22.48-2.69-1.07-2.69-1.07-.36-.91-.88-1.15-.88-1.15-.72-.5.05-.49.05-.49.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.1 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.09.16 1.9.08 2.1.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.74.54 1.49v2.21c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            Continue with GitHub
          </button>
        </div>

        {/* Forgot password */}
        <div className="text-center">
          <a href="#" className="text-indigo-600 hover:text-indigo-500">
            Forgot password?
          </a>
        </div>
      </div>
    </main>
  );
}


code.demo.1755357493713.tsx
"use client";

export default function LoginPage() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
          <img
            src="https://floatui.com/logo.svg"
            width={150}
            className="mx-auto"
            alt="Logo"
          />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
            <p>
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>

        <div className="bg-white shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">
          {/* Social buttons */}
          <div className="grid grid-cols-3 gap-x-3">
            {/* Google */}
            <button className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#4285F4"
                  d="M47.532 24.553c0-1.632-.132-3.272-.414-4.877H24.48v9.242h12.963c-.538 2.981-2.266 5.618-4.797 7.294v5.997h7.734c4.542-4.18 7.152-10.353 7.152-17.655Z"
                />
                <path
                  fill="#34A853"
                  d="M24.48 48c6.473 0 11.932-2.125 15.909-5.793l-7.734-5.997c-2.152 1.464-4.93 2.293-8.166 2.293-6.261 0-11.57-4.224-13.475-10.403H3.033v6.182C7.107 42.887 15.406 48 24.48 48Z"
                />
                <path
                  fill="#FBBC05"
                  d="M11.005 28.6a14.37 14.37 0 0 1 0-9.189V13.23H3.033a23.92 23.92 0 0 0 0 21.553l7.972-6.182Z"
                />
                <path
                  fill="#EA4335"
                  d="M24.48 9.499c3.422-.053 6.729 1.235 9.207 3.598l6.852-6.852C36.2 2.171 30.441-.069 24.48.002 15.406.002 7.107 5.117 3.033 13.23l7.972 6.182c1.896-5.688 7.214-9.912 13.475-9.912Z"
                />
              </svg>
            </button>

            {/* Twitter (X) */}
            <button className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 1227"
              >
                <path
                  fill="#000000"
                  d="M714.163 519.284 1160.9 0H1052.56L669.701 450.887 363.044 0H0l463.055 678.764L0 1226.37h108.342l406.5-479.102 325.636 479.102H1200M148.756 79.845h165.69l737.178 1067.68h-165.68"
                />
              </svg>
            </button>

            {/* GitHub */}
            <button className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#181717"
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 
                  3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 
                  0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61 
                  -.546-1.385-1.333-1.754-1.333-1.754-1.09-.745.083-.729.083-.729 
                  1.205.084 1.84 1.237 1.84 1.237 
                  1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605 
                  -2.665-.3-5.466-1.334-5.466-5.93 
                  0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 
                  0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404 
                  c1.02.005 2.045.138 3.003.404 
                  2.28-1.552 3.285-1.23 3.285-1.23 
                  .645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 
                  0 4.61-2.805 5.625-5.475 5.92.435.375.81 1.096.81 2.22 
                  0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <span className="block w-full h-px bg-gray-300"></span>
            <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
              Or continue with
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-5"
          >
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
              Sign in
            </button>
          </form>
        </div>

        <div className="text-center">
          <a href="#" className="hover:text-indigo-600">
            Forgot password?
          </a>
        </div>
      </div>
    </main>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/login-with-listed-provider.tsx
"use client";

import React from "react";

export default function LoginPage() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-8">
        {/* Logo and heading */}
        <div className="text-center">
          <img
            src="https://floatui.com/logo.svg"
            width={150}
            alt="Logo"
            className="mx-auto"
          />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
            <p>
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Sign in
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <span className="block w-full h-px bg-gray-300"></span>
          <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
            Or continue with
          </p>
        </div>

        {/* Social buttons */}
        <div className="space-y-4 text-sm font-medium">
          {/* Google */}
          <button className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
            <svg
              className="w-5 h-5"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.2H272v95h146.9c-6.3 33.9-25 62.5-53.2 81.8v68.1h85.8c50.2-46.3 82-114.6 82-194.7z"
                fill="#4285F4"
              />
              <path
                d="M272 544.3c71.6 0 131.7-23.7 175.7-64.2l-85.8-68.1c-23.8 16-54.1 25.4-89.9 25.4-69.1 0-127.6-46.6-148.4-109.3h-89.6v68.9C77.7 480.5 168.5 544.3 272 544.3z"
                fill="#34A853"
              />
              <path
                d="M123.6 328.1c-10.8-32.1-10.8-66.9 0-99l-89.6-68.9c-39.1 77.6-39.1 168.3 0 245.9l89.6-68z"
                fill="#FBBC05"
              />
              <path
                d="M272 107.7c37.4-.6 73.5 13.2 101.1 38.7l75.4-75.4C403.4 24.5 341.4 0 272 0 168.5 0 77.7 63.8 34 159.2l89.6 68.9C144.4 154.3 202.9 107.7 272 107.7z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          {/* Twitter (X) */}
          <button className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
            <svg
              className="w-5 h-5"
              viewBox="0 0 1200 1227"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M714.2 521.8 1160 0H1060.4L667.6 450.1 354.1 0H0l467.2 681.6L0 1226.5h99.6L515.3 753l330.1 473.5h354.1L714.2 521.8ZM566.3 690.2l-48.5-68.9-369-523.6h158.9l297.8 422.3 48.5 68.9 385.2 546.8H880.3L566.3 690.2Z"
                fill="currentColor"
              />
            </svg>
            Continue with Twitter
          </button>

          {/* GitHub */}
          <button className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
            <svg
              className="w-5 h-5"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.48c-2.22.48-2.69-1.07-2.69-1.07-.36-.91-.88-1.15-.88-1.15-.72-.5.05-.49.05-.49.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.1 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.09.16 1.9.08 2.1.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.74.54 1.49v2.21c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            Continue with GitHub
          </button>
        </div>

        {/* Forgot password */}
        <div className="text-center">
          <a href="#" className="text-indigo-600 hover:text-indigo-500">
            Forgot password?
          </a>
        </div>
      </div>
    </main>
  );
}

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
