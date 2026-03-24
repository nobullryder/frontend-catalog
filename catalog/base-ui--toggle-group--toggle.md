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
toggle-group.tsx
import * as React from 'react';
import { Toggle } from '@base-ui-components/react/toggle';
import { ToggleGroup } from '@base-ui-components/react/toggle-group';

export default function ExampleToggleGroup() {
  return (
    <ToggleGroup
      defaultValue={['left']}
      className="flex gap-px rounded-md border border-gray-200 bg-gray-50 p-0.5"
    >
      <Toggle
        aria-label="Align left"
        value="left"
        className="flex size-8 items-center justify-center rounded-sm text-gray-600 select-none hover:bg-gray-100 focus-visible:bg-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-200 data-[pressed]:bg-gray-100 data-[pressed]:text-gray-900"
      >
        <AlignLeftIcon className="size-4" />
      </Toggle>
      <Toggle
        aria-label="Align center"
        value="center"
        className="flex size-8 items-center justify-center rounded-sm text-gray-600 select-none hover:bg-gray-100 focus-visible:bg-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-200 data-[pressed]:bg-gray-100 data-[pressed]:text-gray-900"
      >
        <AlignCenterIcon className="size-4" />
      </Toggle>
      <Toggle
        aria-label="Align right"
        value="right"
        className="flex size-8 items-center justify-center rounded-sm text-gray-600 select-none hover:bg-gray-100 focus-visible:bg-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-200 data-[pressed]:bg-gray-100 data-[pressed]:text-gray-900"
      >
        <AlignRightIcon className="size-4" />
      </Toggle>
    </ToggleGroup>
  );
}

function AlignLeftIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      stroke="currentcolor"
      strokeLinecap="round"
      {...props}
    >
      <path d="M2.5 3.5H13.5" />
      <path d="M2.5 9.5H13.5" />
      <path d="M2.5 6.5H10.5" />
      <path d="M2.5 12.5H10.5" />
    </svg>
  );
}

function AlignCenterIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      stroke="currentcolor"
      strokeLinecap="round"
      {...props}
    >
      <path d="M3 3.5H14" />
      <path d="M3 9.5H14" />
      <path d="M4.5 6.5H12.5" />
      <path d="M4.5 12.5H12.5" />
    </svg>
  );
}

function AlignRightIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      stroke="currentcolor"
      strokeLinecap="round"
      {...props}
    >
      <path d="M2.5 3.5H13.5" />
      <path d="M2.5 9.5H13.5" />
      <path d="M5.5 6.5H13.5" />
      <path d="M5.5 12.5H13.5" />
    </svg>
  );
}


code.demo.1753377316967.tsx
import * as React from 'react';
import { Toggle } from '@base-ui-components/react/toggle';

export default function ExampleToggle() {
  return (
    <div className="flex gap-px rounded-md border border-gray-200 bg-gray-50 p-0.5">
      <Toggle
        aria-label="Favorite"
        className="flex size-8 items-center justify-center rounded-sm text-gray-600 select-none hover:bg-gray-100 focus-visible:bg-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-200 data-[pressed]:text-gray-900"
        render={(props, state) => {
          if (state.pressed) {
            return (
              <button type="button" {...props}>
                <HeartFilledIcon className="size-5" />
              </button>
            );
          }

          return (
            <button type="button" {...props}>
              <HeartOutlineIcon className="size-5" />
            </button>
          );
        }}
      />
    </div>
  );
}

function HeartFilledIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentcolor" {...props}>
      <path d="M7.99961 13.8667C7.88761 13.8667 7.77561 13.8315 7.68121 13.7611C7.43321 13.5766 1.59961 9.1963 1.59961 5.8667C1.59961 3.80856 3.27481 2.13336 5.33294 2.13336C6.59054 2.13336 7.49934 2.81176 7.99961 3.3131C8.49988 2.81176 9.40868 2.13336 10.6663 2.13336C12.7244 2.13336 14.3996 3.80803 14.3996 5.8667C14.3996 9.1963 8.56601 13.5766 8.31801 13.7616C8.22361 13.8315 8.11161 13.8667 7.99961 13.8667Z" />
    </svg>
  );
}

function HeartOutlineIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentcolor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.99961 4.8232L7.24456 4.06654C6.84123 3.66235 6.18866 3.20003 5.33294 3.20003C3.86391 3.20003 2.66628 4.39767 2.66628 5.8667C2.66628 6.4079 2.91276 7.1023 3.41967 7.91383C3.91548 8.70759 4.59649 9.51244 5.31278 10.2503C6.38267 11.3525 7.47318 12.2465 7.99983 12.6605C8.52734 12.2456 9.61718 11.352 10.6864 10.2504C11.4027 9.51248 12.0837 8.70762 12.5796 7.91384C13.0865 7.1023 13.3329 6.4079 13.3329 5.8667C13.3329 4.39723 12.1354 3.20003 10.6663 3.20003C9.81056 3.20003 9.15799 3.66235 8.75466 4.06654L7.99961 4.8232ZM7.98574 3.29926C7.48264 2.79938 6.57901 2.13336 5.33294 2.13336C3.27481 2.13336 1.59961 3.80856 1.59961 5.8667C1.59961 9.1963 7.43321 13.5766 7.68121 13.7611C7.77561 13.8315 7.88761 13.8667 7.99961 13.8667C8.11161 13.8667 8.22361 13.8315 8.31801 13.7616C8.56601 13.5766 14.3996 9.1963 14.3996 5.8667C14.3996 3.80803 12.7244 2.13336 10.6663 2.13336C9.42013 2.13336 8.51645 2.79947 8.01337 3.29936C8.00877 3.30393 8.00421 3.30849 7.99967 3.31303C7.99965 3.31305 7.99963 3.31307 7.99961 3.3131C7.99502 3.3085 7.9904 3.30389 7.98574 3.29926Z"
      />
    </svg>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/toggle-group.tsx
import * as React from 'react';
import { Toggle } from '@base-ui-components/react/toggle';
import { ToggleGroup } from '@base-ui-components/react/toggle-group';

export default function ExampleToggleGroup() {
  return (
    <ToggleGroup
      defaultValue={['left']}
      className="flex gap-px rounded-md border border-gray-200 bg-gray-50 p-0.5"
    >
      <Toggle
        aria-label="Align left"
        value="left"
        className="flex size-8 items-center justify-center rounded-sm text-gray-600 select-none hover:bg-gray-100 focus-visible:bg-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-200 data-[pressed]:bg-gray-100 data-[pressed]:text-gray-900"
      >
        <AlignLeftIcon className="size-4" />
      </Toggle>
      <Toggle
        aria-label="Align center"
        value="center"
        className="flex size-8 items-center justify-center rounded-sm text-gray-600 select-none hover:bg-gray-100 focus-visible:bg-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-200 data-[pressed]:bg-gray-100 data-[pressed]:text-gray-900"
      >
        <AlignCenterIcon className="size-4" />
      </Toggle>
      <Toggle
        aria-label="Align right"
        value="right"
        className="flex size-8 items-center justify-center rounded-sm text-gray-600 select-none hover:bg-gray-100 focus-visible:bg-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-200 data-[pressed]:bg-gray-100 data-[pressed]:text-gray-900"
      >
        <AlignRightIcon className="size-4" />
      </Toggle>
    </ToggleGroup>
  );
}

function AlignLeftIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      stroke="currentcolor"
      strokeLinecap="round"
      {...props}
    >
      <path d="M2.5 3.5H13.5" />
      <path d="M2.5 9.5H13.5" />
      <path d="M2.5 6.5H10.5" />
      <path d="M2.5 12.5H10.5" />
    </svg>
  );
}

function AlignCenterIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      stroke="currentcolor"
      strokeLinecap="round"
      {...props}
    >
      <path d="M3 3.5H14" />
      <path d="M3 9.5H14" />
      <path d="M4.5 6.5H12.5" />
      <path d="M4.5 12.5H12.5" />
    </svg>
  );
}

function AlignRightIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      stroke="currentcolor"
      strokeLinecap="round"
      {...props}
    >
      <path d="M2.5 3.5H13.5" />
      <path d="M2.5 9.5H13.5" />
      <path d="M5.5 6.5H13.5" />
      <path d="M5.5 12.5H13.5" />
    </svg>
  );
}

```

Install NPM dependencies:
```bash
@base-ui-components/react
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
