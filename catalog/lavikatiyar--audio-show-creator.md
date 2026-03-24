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
audio-show-creator.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Headphones,
  X,
  FileText,
  ListFilter,
  Mic,
  Languages,
  Sparkles,
  Award,
} from "lucide-react";

// Types for select options to ensure type safety and reusability
type SelectOption = {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type VoiceOption = {
  value: string;
  label: string;
  color: string; // e.g., 'bg-blue-400'
};

// Props interface for the main component
interface AudioShowCreatorProps {
  className?: string;
  // Data for the dropdowns
  formatStyles: SelectOption[];
  hostVoices: VoiceOption[];
  guestVoices: VoiceOption[];
  voiceEngines: SelectOption[];
  languages: SelectOption[];
  audioQualities: SelectOption[];
  // Handlers for actions
  onGenerate: () => void;
  onClose: () => void;
}

// A reusable component for custom select items with icons or colored dots
const CustomSelectItem = React.forwardRef<
  HTMLDivElement,
  { option: VoiceOption | SelectOption }
>(({ option, ...props }, ref) => (
  <SelectItem value={option.value} {...props}>
    <div className="flex items-center gap-2">
      {"color" in option ? (
        <div
          className={cn("h-4 w-4 rounded-full", option.color)}
        />
      ) : option.icon ? (
        <option.icon className="h-4 w-4 text-muted-foreground" />
      ) : null}
      <span>{option.label}</span>
    </div>
  </SelectItem>
));
CustomSelectItem.displayName = "CustomSelectItem";

export const AudioShowCreator = ({
  className,
  formatStyles,
  hostVoices,
  guestVoices,
  voiceEngines,
  languages,
  audioQualities,
  onGenerate,
  onClose,
}: AudioShowCreatorProps) => {
  // Internal state for the component's controlled inputs
  const [selectedHost, setSelectedHost] = React.useState<string>(
    hostVoices[0]?.value
  );
  const [selectedGuest, setSelectedGuest] = React.useState<string>(
    guestVoices[0]?.value
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card
        className={cn(
          "w-full max-w-md overflow-hidden rounded-2xl border-2 shadow-xl",
          className
        )}
      >
        <CardHeader className="relative">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <Headphones className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <CardTitle>Create Your Audio Show</CardTitle>
              <CardDescription className="mt-1">
                Drop a document or paste a link — GenFM will instantly turn it
                into a fully voiced podcast you can preview, edit, and download.
              </CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 h-7 w-7 rounded-full"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
          {/* Upload Tabs */}
          <Tabs defaultValue="upload">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload">Upload File</TabsTrigger>
              <TabsTrigger value="url">Import via URL</TabsTrigger>
              <TabsTrigger value="project">Choose Project</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Uploaded File Info */}
          <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
            <FileText className="h-8 w-8 text-red-500" />
            <div className="flex-1">
              <p className="font-medium text-sm">Future Thinking Talk.pdf</p>
              <p className="text-muted-foreground text-xs">45.4 KB</p>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" aria-label="Remove file">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <Select defaultValue={formatStyles[0]?.value}>
                <SelectTrigger aria-label="Format Style">
                  <div className="flex w-full items-center justify-between">
                    <span className="text-muted-foreground">Format Style</span>
                    <SelectValue placeholder="Select style..." />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {formatStyles.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select value={selectedHost} onValueChange={setSelectedHost}>
                <SelectTrigger aria-label="Host Voice">
                  <div className="flex items-center gap-2">
                    <div className={cn("h-4 w-4 rounded-full", hostVoices.find(v => v.value === selectedHost)?.color)} />
                    <SelectValue placeholder="Host..." />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {hostVoices.map((voice) => (
                    <CustomSelectItem key={voice.value} option={voice} />
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedGuest} onValueChange={setSelectedGuest}>
                <SelectTrigger aria-label="Guest Voice">
                  <div className="flex items-center gap-2">
                    <div className={cn("h-4 w-4 rounded-full", guestVoices.find(v => v.value === selectedGuest)?.color)} />
                    <SelectValue placeholder="Guest..." />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {guestVoices.map((voice) => (
                    <CustomSelectItem key={voice.value} option={voice} />
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select defaultValue={voiceEngines[0]?.value}>
                <SelectTrigger aria-label="Voice Engine">
                  <SelectValue placeholder="Engine..." />
                </SelectTrigger>
                <SelectContent>
                  {voiceEngines.map((engine) => (
                     <CustomSelectItem key={engine.value} option={engine} />
                  ))}
                </SelectContent>
              </Select>

              <Select defaultValue={languages[0]?.value}>
                <SelectTrigger aria-label="Language">
                  <SelectValue placeholder="Language..." />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                     <CustomSelectItem key={lang.value} option={lang} />
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Select defaultValue={audioQualities[0]?.value}>
                <SelectTrigger aria-label="Audio Quality">
                    <SelectValue placeholder="Quality..." />
                </SelectTrigger>
                <SelectContent>
                    {audioQualities.map((quality) => (
                        <CustomSelectItem key={quality.value} option={quality} />
                    ))}
                </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <Button variant="outline">
              <ListFilter className="mr-2 h-4 w-4" />
              Recent
            </Button>
            <Button onClick={onGenerate}>Generate</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

code.demo.1759029939284.tsx
import * as React from "react";
import { AudioShowCreator } from "@/components/ui/audio-show-creator";
import {
  Mic,
  Languages,
  Sparkles,
  Award,
} from "lucide-react";

// Sample data for the component's props
const formatStyles = [{ value: "interview", label: "Interview Mode" }];

const hostVoices = [
  { value: "alex", label: "Alex", color: "bg-gradient-to-br from-purple-400 to-indigo-600" },
  { value: "sam", label: "Sam", color: "bg-gradient-to-br from-teal-400 to-cyan-600" },
  { value: "jordan", label: "Jordan", color: "bg-gradient-to-br from-amber-400 to-orange-600" },
];

const guestVoices = [
  { value: "morgan", label: "Morgan", color: "bg-gradient-to-br from-orange-400 to-rose-600" },
  { value: "casey", label: "Casey", color: "bg-gradient-to-br from-lime-400 to-green-600" },
  { value: "riley", label: "Riley", color: "bg-gradient-to-br from-sky-400 to-blue-600" },
];

const voiceEngines = [
    { value: 'eleven_v2', label: 'Eleven AI v2', icon: Sparkles },
    { value: 'deepgram_v1', label: 'Deepgram v1', icon: Mic },
];

const languages = [
    { value: 'auto', label: 'Auto-detect', icon: Languages },
    { value: 'en-us', label: 'English (US)' },
    { value: 'es-es', label: 'Spanish (Spain)' },
];

const audioQualities = [
    { value: 'studio', label: 'Studio', icon: Award },
    { value: 'high', label: 'High' },
    { value: 'standard', label: 'Standard' },
];

export default function AudioShowCreatorDemo() {
  const handleGenerate = () => {
    alert("Generate action triggered!");
  };

  const handleClose = () => {
    alert("Close action triggered!");
  };

  return (
    <div className="flex min-h-[600px] w-full items-center justify-center bg-background p-4 md:p-10">
      <AudioShowCreator
        formatStyles={formatStyles}
        hostVoices={hostVoices}
        guestVoices={guestVoices}
        voiceEngines={voiceEngines}
        languages={languages}
        audioQualities={audioQualities}
        onGenerate={handleGenerate}
        onClose={handleClose}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/audio-show-creator.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Headphones,
  X,
  FileText,
  ListFilter,
  Mic,
  Languages,
  Sparkles,
  Award,
} from "lucide-react";

// Types for select options to ensure type safety and reusability
type SelectOption = {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type VoiceOption = {
  value: string;
  label: string;
  color: string; // e.g., 'bg-blue-400'
};

// Props interface for the main component
interface AudioShowCreatorProps {
  className?: string;
  // Data for the dropdowns
  formatStyles: SelectOption[];
  hostVoices: VoiceOption[];
  guestVoices: VoiceOption[];
  voiceEngines: SelectOption[];
  languages: SelectOption[];
  audioQualities: SelectOption[];
  // Handlers for actions
  onGenerate: () => void;
  onClose: () => void;
}

// A reusable component for custom select items with icons or colored dots
const CustomSelectItem = React.forwardRef<
  HTMLDivElement,
  { option: VoiceOption | SelectOption }
>(({ option, ...props }, ref) => (
  <SelectItem value={option.value} {...props}>
    <div className="flex items-center gap-2">
      {"color" in option ? (
        <div
          className={cn("h-4 w-4 rounded-full", option.color)}
        />
      ) : option.icon ? (
        <option.icon className="h-4 w-4 text-muted-foreground" />
      ) : null}
      <span>{option.label}</span>
    </div>
  </SelectItem>
));
CustomSelectItem.displayName = "CustomSelectItem";

export const AudioShowCreator = ({
  className,
  formatStyles,
  hostVoices,
  guestVoices,
  voiceEngines,
  languages,
  audioQualities,
  onGenerate,
  onClose,
}: AudioShowCreatorProps) => {
  // Internal state for the component's controlled inputs
  const [selectedHost, setSelectedHost] = React.useState<string>(
    hostVoices[0]?.value
  );
  const [selectedGuest, setSelectedGuest] = React.useState<string>(
    guestVoices[0]?.value
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card
        className={cn(
          "w-full max-w-md overflow-hidden rounded-2xl border-2 shadow-xl",
          className
        )}
      >
        <CardHeader className="relative">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <Headphones className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <CardTitle>Create Your Audio Show</CardTitle>
              <CardDescription className="mt-1">
                Drop a document or paste a link — GenFM will instantly turn it
                into a fully voiced podcast you can preview, edit, and download.
              </CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 h-7 w-7 rounded-full"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
          {/* Upload Tabs */}
          <Tabs defaultValue="upload">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload">Upload File</TabsTrigger>
              <TabsTrigger value="url">Import via URL</TabsTrigger>
              <TabsTrigger value="project">Choose Project</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Uploaded File Info */}
          <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
            <FileText className="h-8 w-8 text-red-500" />
            <div className="flex-1">
              <p className="font-medium text-sm">Future Thinking Talk.pdf</p>
              <p className="text-muted-foreground text-xs">45.4 KB</p>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" aria-label="Remove file">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <Select defaultValue={formatStyles[0]?.value}>
                <SelectTrigger aria-label="Format Style">
                  <div className="flex w-full items-center justify-between">
                    <span className="text-muted-foreground">Format Style</span>
                    <SelectValue placeholder="Select style..." />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {formatStyles.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select value={selectedHost} onValueChange={setSelectedHost}>
                <SelectTrigger aria-label="Host Voice">
                  <div className="flex items-center gap-2">
                    <div className={cn("h-4 w-4 rounded-full", hostVoices.find(v => v.value === selectedHost)?.color)} />
                    <SelectValue placeholder="Host..." />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {hostVoices.map((voice) => (
                    <CustomSelectItem key={voice.value} option={voice} />
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedGuest} onValueChange={setSelectedGuest}>
                <SelectTrigger aria-label="Guest Voice">
                  <div className="flex items-center gap-2">
                    <div className={cn("h-4 w-4 rounded-full", guestVoices.find(v => v.value === selectedGuest)?.color)} />
                    <SelectValue placeholder="Guest..." />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {guestVoices.map((voice) => (
                    <CustomSelectItem key={voice.value} option={voice} />
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select defaultValue={voiceEngines[0]?.value}>
                <SelectTrigger aria-label="Voice Engine">
                  <SelectValue placeholder="Engine..." />
                </SelectTrigger>
                <SelectContent>
                  {voiceEngines.map((engine) => (
                     <CustomSelectItem key={engine.value} option={engine} />
                  ))}
                </SelectContent>
              </Select>

              <Select defaultValue={languages[0]?.value}>
                <SelectTrigger aria-label="Language">
                  <SelectValue placeholder="Language..." />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                     <CustomSelectItem key={lang.value} option={lang} />
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Select defaultValue={audioQualities[0]?.value}>
                <SelectTrigger aria-label="Audio Quality">
                    <SelectValue placeholder="Quality..." />
                </SelectTrigger>
                <SelectContent>
                    {audioQualities.map((quality) => (
                        <CustomSelectItem key={quality.value} option={quality} />
                    ))}
                </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <Button variant="outline">
              <ListFilter className="mr-2 h-4 w-4" />
              Recent
            </Button>
            <Button onClick={onGenerate}>Generate</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
```

Install NPM dependencies:
```bash
lucide-react, framer-motion
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
