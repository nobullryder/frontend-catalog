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
select-menu.tsx
import * as Select from "@radix-ui/react-select";
import React, { useState } from "react";

export default function SelectMenu()  {
  // You can use any api to generate list of countries
  const menuItems = [
    "United States of America",
    "Albania",
    "Algeria",
    "Andorra",
    "Argentina",
    "Armenia",
    "Austria",
    "Australia",
    "Azerbaijan",
    "Bahamas",
    "Brazil",
    "Canada",
    "Colombia",
    "China",
    "Egypt",
    "France",
    "Germany",
    "India",
    "Iraq",
  ];

  const [value, setValue] = useState("");
  const [countries, setCountries] = React.useState(menuItems);

  const handleSearch = (e) => {
    const value = e.target.value;
    const results = menuItems.filter((item) =>
      item.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    setTimeout(() => setCountries(results), 100);
  };

  return (
      <Select.Root
        onValueChange={setValue}
        onOpenChange={() => setCountries(menuItems)}
      >
        <div className="w-72 max-w-full">
          <Select.Trigger className="w-full inline-flex items-center justify-between px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2">
            <Select.Value placeholder="Select your country">
              {value}
            </Select.Value>
            <Select.Icon className="text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                />
              </svg>
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              position="popper"
              avoidCollisions={false}
              className="w-[var(--radix-select-trigger-width)] overflow-hidden mt-3 bg-white border rounded-lg shadow-sm text-sm"
            >
              <div className="shadow flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mx-3 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  className="p-2 text-gray-500 w-full rounded-md outline-none"
                  onInput={handleSearch}
                />
              </div>
              <Select.Viewport className="max-h-64 mt-2 overflow-y-auto">
                {countries.length < 1 ? (
                  <div className="px-3 py-2 text-gray-600">Nothing found.</div>
                ) : (
                  ""
                )}
                {countries.map((item, idx) => (
                  <SelectItem key={idx} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </div>
      </Select.Root>
  );
};

const SelectItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    // If you want to make this component more customizable you can use classnames and tailwind-merge library.
    return (
      <Select.Item
        className="flex items-center justify-between px-3 cursor-default py-2 duration-150 text-gray-600 data-[state=checked]:text-indigo-600 data-[state=checked]:bg-indigo-50 data-[highlighted]:text-indigo-600 data-[highlighted]:bg-indigo-50 data-[highlighted]:hover:text-indigo-600 data-[highlighted]:hover:bg-indigo-50 outline-none"
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>
          <div className="pr-4 line-clamp-1">{children}</div>
        </Select.ItemText>
        <div className="w-6">
          <Select.ItemIndicator>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-indigo-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>{" "}
          </Select.ItemIndicator>
        </div>
      </Select.Item>
    );
  }
);


code.demo.1755739399192.tsx
import * as Select from "@radix-ui/react-select";
import React from "react";

export default function SelectMenu()  {
  const [selectedItemIdx, setSelectedItemIdx] = React.useState(0);

  const menuItems = [
    {
      label: "Normal",
      statusColor: "text-blue-600",
      statusBg: "bg-blue-600",
    },
    {
      label: "Error",
      statusColor: "text-red-600",
      statusBg: "bg-red-600",
    },
    {
      label: "Pending",
      statusColor: "text-teal-600",
      statusBg: "bg-teal-600",
    },
    {
      label: "Canceled",
      statusColor: "text-gray-600",
      statusBg: "bg-gray-300",
    },
    {
      label: "Reviewing",
      statusColor: "text-fuchsia-600",
      statusBg: "bg-fuchsia-600",
    },
  ];

  return (
      <Select.Root onValueChange={setSelectedItemIdx}>
        <div className="w-72 max-w-full">
          <Select.Trigger className="w-full inline-flex items-center justify-between px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2">
            <Select.Value placeholder="Select a status">
              <div className="flex items-center gap-x-3">
                Status{" "}
                <span
                  className={`w-2 h-2 rounded-full ${menuItems[selectedItemIdx].statusBg}`}
                ></span>
                <span
                  className={`text-sm ${menuItems[selectedItemIdx].statusColor}`}
                >
                  {menuItems[selectedItemIdx].label}
                </span>
              </div>
            </Select.Value>
            <Select.Icon className="text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              position="popper"
              avoidCollisions={false}
              className="w-[var(--radix-select-trigger-width)] max-h-64 mt-3 overflow-y-auto bg-white border rounded-lg shadow-sm text-sm"
            >
              <Select.Viewport className="">
                {menuItems.map((item, idx) => (
                  <SelectItem key={idx} value={idx}>
                    <span
                      className={`w-2 h-2 rounded-full ${item.statusBg}`}
                    ></span>
                    {item.label}
                  </SelectItem>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </div>
      </Select.Root>
  );
};

const SelectItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    // If you want to make this component more customizable you can use classnames and tailwind-merge library.
    return (
      <Select.Item
        className="flex items-center justify-between px-3 cursor-default py-2 duration-150 text-gray-600 data-[state=checked]:text-indigo-600 data-[state=checked]:bg-indigo-50 data-[highlighted]:text-indigo-600 data-[highlighted]:bg-indigo-50 data-[highlighted]:hover:text-indigo-600 data-[highlighted]:hover:bg-indigo-50 outline-none"
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>
          <div className="pr-4 line-clamp-1 flex items-center gap-2">
            {children}
          </div>
        </Select.ItemText>
        <div className="w-6">
          <Select.ItemIndicator>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-indigo-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>{" "}
          </Select.ItemIndicator>
        </div>
      </Select.Item>
    );
  }
);

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/select-menu.tsx
import * as Select from "@radix-ui/react-select";
import React, { useState } from "react";

export default function SelectMenu()  {
  // You can use any api to generate list of countries
  const menuItems = [
    "United States of America",
    "Albania",
    "Algeria",
    "Andorra",
    "Argentina",
    "Armenia",
    "Austria",
    "Australia",
    "Azerbaijan",
    "Bahamas",
    "Brazil",
    "Canada",
    "Colombia",
    "China",
    "Egypt",
    "France",
    "Germany",
    "India",
    "Iraq",
  ];

  const [value, setValue] = useState("");
  const [countries, setCountries] = React.useState(menuItems);

  const handleSearch = (e) => {
    const value = e.target.value;
    const results = menuItems.filter((item) =>
      item.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    setTimeout(() => setCountries(results), 100);
  };

  return (
      <Select.Root
        onValueChange={setValue}
        onOpenChange={() => setCountries(menuItems)}
      >
        <div className="w-72 max-w-full">
          <Select.Trigger className="w-full inline-flex items-center justify-between px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2">
            <Select.Value placeholder="Select your country">
              {value}
            </Select.Value>
            <Select.Icon className="text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                />
              </svg>
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              position="popper"
              avoidCollisions={false}
              className="w-[var(--radix-select-trigger-width)] overflow-hidden mt-3 bg-white border rounded-lg shadow-sm text-sm"
            >
              <div className="shadow flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mx-3 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  className="p-2 text-gray-500 w-full rounded-md outline-none"
                  onInput={handleSearch}
                />
              </div>
              <Select.Viewport className="max-h-64 mt-2 overflow-y-auto">
                {countries.length < 1 ? (
                  <div className="px-3 py-2 text-gray-600">Nothing found.</div>
                ) : (
                  ""
                )}
                {countries.map((item, idx) => (
                  <SelectItem key={idx} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </div>
      </Select.Root>
  );
};

const SelectItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    // If you want to make this component more customizable you can use classnames and tailwind-merge library.
    return (
      <Select.Item
        className="flex items-center justify-between px-3 cursor-default py-2 duration-150 text-gray-600 data-[state=checked]:text-indigo-600 data-[state=checked]:bg-indigo-50 data-[highlighted]:text-indigo-600 data-[highlighted]:bg-indigo-50 data-[highlighted]:hover:text-indigo-600 data-[highlighted]:hover:bg-indigo-50 outline-none"
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>
          <div className="pr-4 line-clamp-1">{children}</div>
        </Select.ItemText>
        <div className="w-6">
          <Select.ItemIndicator>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-indigo-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>{" "}
          </Select.ItemIndicator>
        </div>
      </Select.Item>
    );
  }
);

```

Install NPM dependencies:
```bash
@radix-ui/react-select
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
