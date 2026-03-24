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
shadcn-accordion.tsx
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DateAndTimePickerDemo = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [bookingStatus, setBookingStatus] = useState<
    "idle" | "loading" | "success"
  >("idle");

  const handleBooking = () => {
    setBookingStatus("loadi
    setTimeout(() => setBookingStatus("success"), 1500);
  };

  return (
    <>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="date" className="text-sm font-semibold">
            Select Date
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              onPointerDown={() => setBookingStatus("idle")}
              render={
                <Button
                  variant="outline"
                  id="date"
                  className={cn(
                    "w-full justify-start text-left font-normal h-10 transition-all hover:bg-muted/50 cursor-pointer",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                  {date ? format(date, "PPP") : <span>Select a date</span>}
                  <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              }
            />
            <PopoverContent
              className="w-auto p-0 border-muted-foreground/10 shadow-2xl"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => {
                  setDate(d);
                  setOpen(false);
                }}
                className="rounded-md border-none"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label
              htmlFor="time-from"
              className="text-sm font-semibold text-muted-foreground flex items-center gap-1.5"
            >
              <Clock className="size-3.5" /> Start Time
            </Label>
            <Input
              type="time"
              id="time-from"
              defaultValue="09:00"
              className="h-10 bg-background appearance-none transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="time-to"
              className="text-sm font-semibold text-muted-foreground flex items-center gap-1.5"
            >
              <Clock className="size-3.5" /> End Time
            </Label>
            <Input
              type="time"
              id="time-to"
              defaultValue="10:00"
              className="h-10 bg-background appearance-none transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <Button
          className="w-full h-11 font-semibold transition-all group overflow-hidden relative cursor-pointer"
          onClick={handleBooking}
          disabled={!date || bookingStatus !== "idle"}
        >
          {bookingStatus === "idle" && (
            <span className="flex items-center gap-2">Confirm Meet</span>
          )}
          {bookingStatus === "loading" && (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Processing...
            </div>
          )}
          {bookingStatus === "success" && (
            <span className="flex items-center gap-2 animate-in zoom-in-50 duration-300">
              <Check className="h-4 w-4" />
              Meet Scheduled!
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default DateAndTimePickerDemo;


code.demo.1772202660921.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { FileText, Folder, LucideIcon, Settings, Users } from "lucide-react";

const data: {
  value: string;
  title: string;
  subtitle: string;
  content: string;
  icon: LucideIcon;
  textColor: string;
  bgColor: string;
}[] = [
  {
    value: "documents",
    title: "Documents",
    subtitle: "Manage your files",
    content:
      "View, upload, and organize all your documents in one place. Keep everything structured and easy to find.",
    icon: FileText,
    textColor: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    value: "projects",
    title: "Projects",
    subtitle: "Organize your work",
    content:
      "Group related files and tasks into projects to keep your workflow clean and efficient.",
    icon: Folder,
    textColor: "text-orange-400",
    bgColor: "bg-orange-400/10",
  },
  {
    value: "settings",
    title: "Settings",
    subtitle: "Customize your experience",
    content:
      "Adjust preferences, update account details, and configure application behavior.",
    icon: Settings,
    textColor: "text-teal-400",
    bgColor: "bg-teal-400/10",
  },
  {
    value: "team",
    title: "Team Members",
    subtitle: "Manage users and roles",
    content:
      "Invite new members, assign roles, and control access permissions for your team.",
    icon: Users,
    textColor: "text-red-500",
    bgColor: "bg-red-500/10",
  },
];

const AccordionDemo = () => (
  <div className="flex items-center justify-center max-w-md w-full">
    <Accordion
      className="w-full -space-y-px"
      defaultValue={[data[0].value]}
    >
      {data.map((item) => {
        const Icon = item.icon;
        return (
          <AccordionItem
            key={item.value}
            value={item.value}
            className=" border bg-background px-4 first:rounded-t-lg last:rounded-b-lg last:border-b"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "p-2.5 rounded-xl",
                    item.bgColor,
                    item.textColor
                  )}
                >
                  <Icon size={20} className="size-5" />
                </div>
                <div className="flex flex-col items-start text-left">
                  <span>{item.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="ps-14">
              <p className="text-muted-foreground">{item.content}</p>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  </div>
);

export default AccordionDemo;

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/shadcn-accordion.tsx
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DateAndTimePickerDemo = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [bookingStatus, setBookingStatus] = useState<
    "idle" | "loading" | "success"
  >("idle");

  const handleBooking = () => {
    setBookingStatus("loadi
    setTimeout(() => setBookingStatus("success"), 1500);
  };

  return (
    <>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="date" className="text-sm font-semibold">
            Select Date
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              onPointerDown={() => setBookingStatus("idle")}
              render={
                <Button
                  variant="outline"
                  id="date"
                  className={cn(
                    "w-full justify-start text-left font-normal h-10 transition-all hover:bg-muted/50 cursor-pointer",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                  {date ? format(date, "PPP") : <span>Select a date</span>}
                  <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              }
            />
            <PopoverContent
              className="w-auto p-0 border-muted-foreground/10 shadow-2xl"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => {
                  setDate(d);
                  setOpen(false);
                }}
                className="rounded-md border-none"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label
              htmlFor="time-from"
              className="text-sm font-semibold text-muted-foreground flex items-center gap-1.5"
            >
              <Clock className="size-3.5" /> Start Time
            </Label>
            <Input
              type="time"
              id="time-from"
              defaultValue="09:00"
              className="h-10 bg-background appearance-none transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="time-to"
              className="text-sm font-semibold text-muted-foreground flex items-center gap-1.5"
            >
              <Clock className="size-3.5" /> End Time
            </Label>
            <Input
              type="time"
              id="time-to"
              defaultValue="10:00"
              className="h-10 bg-background appearance-none transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <Button
          className="w-full h-11 font-semibold transition-all group overflow-hidden relative cursor-pointer"
          onClick={handleBooking}
          disabled={!date || bookingStatus !== "idle"}
        >
          {bookingStatus === "idle" && (
            <span className="flex items-center gap-2">Confirm Meet</span>
          )}
          {bookingStatus === "loading" && (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Processing...
            </div>
          )}
          {bookingStatus === "success" && (
            <span className="flex items-center gap-2 animate-in zoom-in-50 duration-300">
              <Check className="h-4 w-4" />
              Meet Scheduled!
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default DateAndTimePickerDemo;

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
