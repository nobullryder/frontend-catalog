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
tag-cloud-select.tsx
"use client";

import * as React from "react";
import { X } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface TagCloudOption {
  value: string;
  label: string;
  popularity: number;        // 1–100 to indicate frequency
  color?: string;            // Optional custom color
}

interface TagCloudSelectProps {
  options: TagCloudOption[];
  placeholder?: string;
  onChange?: (selected: string[]) => void;
  defaultSelected?: string[];
  minFontSize?: number;      // e.g., 12
  maxFontSize?: number;      // e.g., 28
  showSearch?: boolean;
}

export const TagCloudSelect: React.FC<TagCloudSelectProps> = ({
  options,
  placeholder = "Select tags...",
  onChange,
  defaultSelected = [],
  minFontSize = 12,
  maxFontSize = 28,
  showSearch = true,
}) => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>(defaultSelected);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSelect = (value: string) => {
    setSelected((prev) => {
      const newSelected = prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value];
      onChange?.(newSelected);
      return newSelected;
    });
  };

  const handleRemove = (value: string) => {
    setSelected((prev) => {
      const newSelected = prev.filter((v) => v !== value);
      onChange?.(newSelected);
      return newSelected;
    });
  };

  const getFontSize = (popularity: number) => {
    const clamped = Math.max(1, Math.min(100, popularity));
    return `${minFontSize + ((maxFontSize - minFontSize) * clamped) / 100}px`;
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[300px] flex justify-between"
        >
          {selected.length > 0
            ? `${selected.length} tag(s) selected`
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-3">
        {showSearch && (
          <Input
            placeholder="Search tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-3"
          />
        )}
        <ScrollArea className="h-52">
          <div className="flex flex-wrap gap-2">
            {filteredOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={cn(
                  "transition-all rounded-full px-3 py-1 font-medium cursor-pointer border",
                  selected.includes(opt.value)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                )}
                style={{
                  fontSize: getFontSize(opt.popularity),
                  color: !selected.includes(opt.value)
                    ? opt.color || "inherit"
                    : undefined,
                }}
              >
                {opt.label}
              </button>
            ))}
            {filteredOptions.length === 0 && (
              <p className="text-sm text-gray-500">No tags found.</p>
            )}
          </div>
        </ScrollArea>

        {selected.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 border-t pt-3">
            {selected.map((val) => {
              const tag = options.find((o) => o.value === val);
              return (
                <span
                  key={val}
                  className="flex items-center gap-1 px-2 py-1 rounded-full text-sm bg-primary/10 text-primary border border-primary/20"
                >
                  {tag?.label}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleRemove(val)}
                  />
                </span>
              );
            })}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};


code.demo.1758908135431.tsx
"use client";

import * as React from "react";
import { TagCloudSelect, TagCloudOption } from "@/components/ui/tag-cloud-select";

const tagOptions: TagCloudOption[] = [
  { value: "ai", label: "AI", popularity: 95, color: "#ef4444" },
  { value: "nextjs", label: "Next.js", popularity: 85, color: "#3b82f6" },
  { value: "react", label: "React", popularity: 92, color: "#06b6d4" },
  { value: "docker", label: "Docker", popularity: 70, color: "#2563eb" },
  { value: "kubernetes", label: "Kubernetes", popularity: 50, color: "#8b5cf6" },
  { value: "aws", label: "AWS", popularity: 80, color: "#f59e0b" },
  { value: "sql", label: "SQL", popularity: 60, color: "#10b981" },
  { value: "ml", label: "Machine Learning", popularity: 88, color: "#ec4899" },
  { value: "security", label: "Security", popularity: 40, color: "#f97316" },
  { value: "linux", label: "Linux", popularity: 65, color: "#374151" },
];

export default function DemoTagCloudSelect (){
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  return (
    <div className="p-4 flex flex-col gap-4">
      <TagCloudSelect
        options={tagOptions}
        placeholder="Pick your skills..."
        onChange={setSelectedTags}
        defaultSelected={["react", "aws"]}
        minFontSize={12}
        maxFontSize={28}
      />
      {selectedTags.length > 0 && (
        <div>
          <p className="font-medium">Selected Tags:</p>
          <ul className="list-disc pl-5">
            {selectedTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/tag-cloud-select.tsx
"use client";

import * as React from "react";
import { X } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface TagCloudOption {
  value: string;
  label: string;
  popularity: number;        // 1–100 to indicate frequency
  color?: string;            // Optional custom color
}

interface TagCloudSelectProps {
  options: TagCloudOption[];
  placeholder?: string;
  onChange?: (selected: string[]) => void;
  defaultSelected?: string[];
  minFontSize?: number;      // e.g., 12
  maxFontSize?: number;      // e.g., 28
  showSearch?: boolean;
}

export const TagCloudSelect: React.FC<TagCloudSelectProps> = ({
  options,
  placeholder = "Select tags...",
  onChange,
  defaultSelected = [],
  minFontSize = 12,
  maxFontSize = 28,
  showSearch = true,
}) => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>(defaultSelected);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSelect = (value: string) => {
    setSelected((prev) => {
      const newSelected = prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value];
      onChange?.(newSelected);
      return newSelected;
    });
  };

  const handleRemove = (value: string) => {
    setSelected((prev) => {
      const newSelected = prev.filter((v) => v !== value);
      onChange?.(newSelected);
      return newSelected;
    });
  };

  const getFontSize = (popularity: number) => {
    const clamped = Math.max(1, Math.min(100, popularity));
    return `${minFontSize + ((maxFontSize - minFontSize) * clamped) / 100}px`;
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[300px] flex justify-between"
        >
          {selected.length > 0
            ? `${selected.length} tag(s) selected`
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-3">
        {showSearch && (
          <Input
            placeholder="Search tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-3"
          />
        )}
        <ScrollArea className="h-52">
          <div className="flex flex-wrap gap-2">
            {filteredOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={cn(
                  "transition-all rounded-full px-3 py-1 font-medium cursor-pointer border",
                  selected.includes(opt.value)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                )}
                style={{
                  fontSize: getFontSize(opt.popularity),
                  color: !selected.includes(opt.value)
                    ? opt.color || "inherit"
                    : undefined,
                }}
              >
                {opt.label}
              </button>
            ))}
            {filteredOptions.length === 0 && (
              <p className="text-sm text-gray-500">No tags found.</p>
            )}
          </div>
        </ScrollArea>

        {selected.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 border-t pt-3">
            {selected.map((val) => {
              const tag = options.find((o) => o.value === val);
              return (
                <span
                  key={val}
                  className="flex items-center gap-1 px-2 py-1 rounded-full text-sm bg-primary/10 text-primary border border-primary/20"
                >
                  {tag?.label}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleRemove(val)}
                  />
                </span>
              );
            })}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

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
