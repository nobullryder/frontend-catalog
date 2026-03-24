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
multi-media-testimonial.tsx
"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, X } from "lucide-react";
import Image from "next/image";

export interface Testimonial {
  name: string;
  designation: string;
  title?: string;
  profile?: string;
  content: string;
  mediaUrl?: string;
  thumbnail?: string;
}

export function TestimonialCard({
  testimonial,
}: {
  testimonial?: Testimonial;
}) {
  const [hydrated, setHydrated] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [open, setOpen] = React.useState(false);

  // Run once on mount
  React.useEffect(() => setHydrated(true), []);

  // Control video playback
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (open) v.play().catch(() => {});
    else {
      v.pause();
      v.currentTime = 0;
    }
  }, [open]);

  // Guard missing data (no conditional hook calls!)
  if (!testimonial) {
    return (
      <Card className="border border-border shadow-sm bg-background">
        <CardContent className="p-6 text-center text-muted-foreground">
          Loading testimonial...
        </CardContent>
      </Card>
    );
  }

  const {
    name = "Anonymous",
    profile = "",
    title = "",
    designation = "Customer",
    content = "No testimonial available.",
    mediaUrl,
    thumbnail,
  } = testimonial;

  // render skeleton until hydrated
  if (!hydrated) {
    return (
      <Card className="border border-border shadow-sm bg-background">
        <CardContent className="p-6 text-center text-muted-foreground">
          Loading...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="break-inside-avoid border p-3 rounded-3xl my-4 border-border bg-background shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-0 mt-3 space-y-4">
        <ScrollArea className="max-h-[500px] rounded-md">
          <div className="space-y-4">
            {/* --- Video Section --- */}
            {mediaUrl && (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="relative w-full cursor-pointer group outline-none"
                    aria-label="Play testimonial video"
                    onClick={() => setOpen(true)}
                  >
                    <AspectRatio
                      ratio={16 / 9}
                      className="overflow-hidden rounded-xl border"
                    >
                      <Image
                        src={thumbnail || mediaUrl || "/placeholder-video.jpg"}
                        alt={name}
                        fill
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </AspectRatio>
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-black/30 p-3 backdrop-blur-sm">
                        <Play className="h-10 w-10 text-white drop-shadow" />
                      </div>
                    </div>
                  </button>
                </DialogTrigger>

                {open && (
                  <DialogContent
                    className="sm:max-w-5xl w-full p-0 overflow-hidden bg-black text-white border-0"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                  >
                    <DialogClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 z-50 rounded-full text-white hover:bg-white/10"
                        aria-label="Close video"
                        onClick={() => setOpen(false)}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </DialogClose>

                    <AspectRatio ratio={16 / 9} className="bg-black">
                      <video
                        ref={videoRef}
                        controls
                        playsInline
                        preload="metadata"
                        poster={thumbnail}
                        className="h-full w-full"
                      >
                        <source src={mediaUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </AspectRatio>
                  </DialogContent>
                )}
              </Dialog>
            )}

            {/* --- Image Section --- */}
            {!mediaUrl && thumbnail && (
              <AspectRatio
                ratio={16 / 9}
                className="overflow-hidden rounded-xl border relative"
              >
                <Image
                  src={thumbnail}
                  alt={name}
                  fill
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </AspectRatio>
            )}

            {/* --- Text Section --- */}
            {content && (
              <p className="text-muted-foreground leading-relaxed">{content}</p>
            )}
          </div>
        </ScrollArea>

        <Separator />

        {/* --- Profile Section --- */}
        <div className="flex items-center space-x-3 pt-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">{designation}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TestimonialCard;


code.demo.1762672030904.tsx
"use client";

import TestimonialCard, { Testimonial } from "@/components/ui/multi-media-testimonial";


const testimonials: Testimonial[] = [
  {
    name: "Alice Johnson",
    profile: "https://github.com/shadcn.png",
    title: "Improved Interview Workflow",
    designation: "Software Engineer",
    content:
      "Ruvy transformed the way I manage my interviews. Highly recommended for professionals looking to save time!",
  },
  {
    name: "Bob Smith",
    profile: "https://github.com/shadcn.png",
    title: "Simplicity at Its Best",
    designation: "Product Manager",
    content:
      "The simplicity of this platform is unmatched. Perfect for small teams and startups.",
    thumbnail: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/popular/three-dwall-calendar-dark.jpg",
  },
  {
    name: "Charlie Lee",
    profile: "https://github.com/shadcn.png",
    title: "Creative and Efficient Platform",
    designation: "UX Designer",
    content: "",
    mediaUrl: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/crm(1)(1)(1).mp4",
    thumbnail: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/dashboard-gradient.png",
  },
  {
    type: "text",
    name: "Diana Prince",
    profile: "https://github.com/shadcn.png",
    title: "Flawless Scheduling Experience",
    designation: "Full Stack Developer",
    content:
      "The UI is sleek, intuitive, and makes scheduling interviews a breeze. 10/10 experience!",
    rating: 5,
  },
  {
    name: "Ethan Hunt",
    profile: "https://github.com/shadcn.png",
    title: "Streamlined Pipeline Management",
    designation: "DevOps Engineer",
    content:
      "Managing my pipelines has never been easier thanks to this platform. Excellent UX!",
  },
  {
    name: "Fiona Gallagher",
    profile: "https://github.com/shadcn.png",
    title: "Smooth and Intuitive Interface",
    designation: "Frontend Developer",
    content: "",
    thumbnail: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/dashboard-gradient.png",
  },
  {
    name: "George Martin",
    profile: "https://github.com/shadcn.png",
    title: "Visually Stunning Design",
    designation: "Backend Developer",
    content: "",
    mediaUrl: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/crm(1)(1)(1).mp4",
    thumbnail: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/dashboard-gradient.png",
  },
  {
    name: "Hannah Lee",
    profile: "https://github.com/shadcn.png",
    title: "Efficient Testing Workflow",
    designation: "QA Engineer",
    content:
      "Testing has become more efficient with the tools provided here. Very intuitive and well-designed.",
  },
  {
    type: "text",
    name: "Ian Wright",
    profile: "https://github.com/shadcn.png",
    title: "Time-Saving Integration",
    designation: "Data Scientist",
    content:
      "I can now schedule interviews without leaving my workspace. Saves so much time!",
  },
  {
    name: "Jane Doe",
    profile: "https://github.com/shadcn.png",
    title: "Clean Visual Presentation",
    designation: "AI Researcher",
    content: "",
    thumbnail: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/popular/ripple-distortion-dark.png",
  },
  {
    name: "Kyle Brown",
    profile: "https://github.com/shadcn.png",
    title: "Smooth Playback Experience",
    designation: "UI Designer",
    content: "",
    mediaUrl: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/crm(1)(1)(1).mp4",
    thumbnail: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/dashboard-gradient.png",
  },
  {
    name: "Laura Kim",
    profile: "https://github.com/shadcn.png",
    title: "Simple Yet Powerful",
    designation: "Full Stack Developer",
    content:
      "The simplicity of this platform is unmatched. Perfect for small teams and startups.",
  },
  {
    name: "Michael Scott",
    profile: "https://github.com/shadcn.png",
    title: "Organized Interview Management",
    designation: "Project Manager",
    content:
      "I can track and organize interviews effortlessly. Love the clean UI and responsiveness.",
  },
  {
    name: "Nina Patel",
    profile: "https://github.com/shadcn.png",
    title: "Elegant Visual Experience",
    designation: "Mobile Developer",
    content: "",
    mediaUrl: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/crm(1)(1)(1).mp4",
    thumbnail: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/dashboard-gradient.png",
  },
  {
    name: "Oscar Wilde",
    profile: "https://github.com/shadcn.png",
    title: "Impressive User Flow",
    designation: "Content Strategist",
    content: "",
    mediaUrl: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/crm(1)(1)(1).mp4",
    thumbnail: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/dashboard-gradient.png",
  },
  {
    name: "Pam Beesly",
    profile: "https://github.com/shadcn.png",
    title: "Showcasing Client Feedback",
    designation: "Graphic Designer",
    content:
      "Love the clean testimonial cards and how easy it is to showcase our client feedback.",
  },
  {
    name: "Quentin Tarantino",
    profile: "https://github.com/shadcn.png",
    title: "Perfect for Creative Professionals",
    designation: "Video Editor",
    content: "",
    thumbnail: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/popular/tag-cloud-select-dark.jpg",
  },
  {
    name: "Rachel Green",
    profile: "https://github.com/shadcn.png",
    title: "Enhanced Collaboration",
    designation: "Marketing Specialist",
    content: "",
    mediaUrl: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/crm(1)(1)(1).mp4",
    thumbnail: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/dashboard-gradient.png",
  },
  {
    name: "Steve Rogers",
    profile: "https://github.com/shadcn.png",
    title: "Streamlined Recruitment Process",
    designation: "Team Lead",
    content:
      "This platform streamlines our recruitment process like never before. Highly efficient!",
  },
  {
    name: "Tina Fey",
    profile: "https://github.com/shadcn.png",
    title: "Beautifully Designed Platform",
    designation: "Copywriter",
    content:
      "Beautifully designed, intuitive, and extremely user-friendly. Can't recommend enough!",
  },
];


export default function TestimonialsDemoPage() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-bold mb-12 text-foreground">
          Our clients love working with us because we go beyond great design to
          deliver real results.
        </h2>

        {Array.isArray(testimonials) && testimonials.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 [column-fill:_balance]">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No testimonials yet.
          </p>
        )}
      </div>
    </section>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/multi-media-testimonial.tsx
"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, X } from "lucide-react";
import Image from "next/image";

export interface Testimonial {
  name: string;
  designation: string;
  title?: string;
  profile?: string;
  content: string;
  mediaUrl?: string;
  thumbnail?: string;
}

export function TestimonialCard({
  testimonial,
}: {
  testimonial?: Testimonial;
}) {
  const [hydrated, setHydrated] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [open, setOpen] = React.useState(false);

  // Run once on mount
  React.useEffect(() => setHydrated(true), []);

  // Control video playback
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (open) v.play().catch(() => {});
    else {
      v.pause();
      v.currentTime = 0;
    }
  }, [open]);

  // Guard missing data (no conditional hook calls!)
  if (!testimonial) {
    return (
      <Card className="border border-border shadow-sm bg-background">
        <CardContent className="p-6 text-center text-muted-foreground">
          Loading testimonial...
        </CardContent>
      </Card>
    );
  }

  const {
    name = "Anonymous",
    profile = "",
    title = "",
    designation = "Customer",
    content = "No testimonial available.",
    mediaUrl,
    thumbnail,
  } = testimonial;

  // render skeleton until hydrated
  if (!hydrated) {
    return (
      <Card className="border border-border shadow-sm bg-background">
        <CardContent className="p-6 text-center text-muted-foreground">
          Loading...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="break-inside-avoid border p-3 rounded-3xl my-4 border-border bg-background shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-0 mt-3 space-y-4">
        <ScrollArea className="max-h-[500px] rounded-md">
          <div className="space-y-4">
            {/* --- Video Section --- */}
            {mediaUrl && (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="relative w-full cursor-pointer group outline-none"
                    aria-label="Play testimonial video"
                    onClick={() => setOpen(true)}
                  >
                    <AspectRatio
                      ratio={16 / 9}
                      className="overflow-hidden rounded-xl border"
                    >
                      <Image
                        src={thumbnail || mediaUrl || "/placeholder-video.jpg"}
                        alt={name}
                        fill
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </AspectRatio>
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-black/30 p-3 backdrop-blur-sm">
                        <Play className="h-10 w-10 text-white drop-shadow" />
                      </div>
                    </div>
                  </button>
                </DialogTrigger>

                {open && (
                  <DialogContent
                    className="sm:max-w-5xl w-full p-0 overflow-hidden bg-black text-white border-0"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                  >
                    <DialogClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 z-50 rounded-full text-white hover:bg-white/10"
                        aria-label="Close video"
                        onClick={() => setOpen(false)}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </DialogClose>

                    <AspectRatio ratio={16 / 9} className="bg-black">
                      <video
                        ref={videoRef}
                        controls
                        playsInline
                        preload="metadata"
                        poster={thumbnail}
                        className="h-full w-full"
                      >
                        <source src={mediaUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </AspectRatio>
                  </DialogContent>
                )}
              </Dialog>
            )}

            {/* --- Image Section --- */}
            {!mediaUrl && thumbnail && (
              <AspectRatio
                ratio={16 / 9}
                className="overflow-hidden rounded-xl border relative"
              >
                <Image
                  src={thumbnail}
                  alt={name}
                  fill
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </AspectRatio>
            )}

            {/* --- Text Section --- */}
            {content && (
              <p className="text-muted-foreground leading-relaxed">{content}</p>
            )}
          </div>
        </ScrollArea>

        <Separator />

        {/* --- Profile Section --- */}
        <div className="flex items-center space-x-3 pt-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">{designation}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TestimonialCard;

```

Install NPM dependencies:
```bash
next, lucide-react
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
