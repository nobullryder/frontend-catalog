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
user-feedback-block.tsx
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Smile, Frown, ThumbsUp, ThumbsDown } from "lucide-react";

const FEEDBACK_TYPES = [
{ type: "star", icon: Star, label: "Star Rating" },
{ type: "emoji", icon: Smile, label: "Emoji" },
{ type: "thumbs", icon: ThumbsUp, label: "Thumbs Up/Down" },
];

const UserFeedbackBlock = () => {
const [feedbackType, setFeedbackType] = useState("star");
const [rating, setRating] = useState(0);
const [emoji, setEmoji] = useState("");
const [thumb, setThumb] = useState("");
const [comment, setComment] = useState("");
const [submitted, setSubmitted] = useState(false);

function handleSubmit() {
  setSubmitted(true);
  setTimeout(() => {
    setFeedbackType("star");
    setRating(0);
    setEmoji("");
    setThumb("");
    setComment("");
    setSubmitted(false);
  }, 2000);
}

return (
  <Card className="w-full max-w-md mx-auto p-2 md:p-4">
    <CardContent className="p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-lg">
          How was your help/support experience?
        </span>
        <div className="flex gap-2">
          {FEEDBACK_TYPES.map((ft) => (
            <Button
              key={ft.type}
              size="icon"
              variant={feedbackType === ft.type ? "secondary" : "ghost"}
              onClick={() => setFeedbackType(ft.type)}
              aria-label={ft.label}
            >
              <ft.icon className="w-5 h-5" />
            </Button>
          ))}
        </div>
      </div>
      {!submitted ? (
        <div className="flex flex-col gap-4">
          {feedbackType === "star" && (
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  className={`text-yellow-400 ${
                    n <= rating ? "" : "opacity-30"
                  }`}
                  onClick={() => setRating(n)}
                  aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
                >
                  <Star
                    className="w-6 h-6"
                    fill={n <= rating ? "#facc15" : "none"}
                  />
                </button>
              ))}
            </div>
          )}
          {feedbackType === "emoji" && (
            <div className="flex gap-2">
              {[
                { e: "😊", label: "Happy" },
                { e: "😐", label: "Neutral" },
                { e: "😞", label: "Unhappy" },
              ].map((em) => (
                <button
                  key={em.e}
                  className={`text-2xl ${
                    emoji === em.e ? "ring-2 ring-primary rounded-full" : ""
                  }`}
                  onClick={() => setEmoji(em.e)}
                  aria-label={em.label}
                >
                  {em.e}
                </button>
              ))}
            </div>
          )}
          {feedbackType === "thumbs" && (
            <div className="flex gap-2">
              <button
                className={`p-2 rounded-full border ${
                  thumb === "up"
                    ? "bg-green-100 border-green-400"
                    : "border-muted-foreground/20"
                }`}
                onClick={() => setThumb("up")}
                aria-label="Thumbs up"
              >
                <ThumbsUp className="w-5 h-5 text-green-600" />
              </button>
              <button
                className={`p-2 rounded-full border ${
                  thumb === "down"
                    ? "bg-red-100 border-red-400"
                    : "border-muted-foreground/20"
                }`}
                onClick={() => setThumb("down")}
                aria-label="Thumbs down"
              >
                <ThumbsDown className="w-5 h-5 text-red-600" />
              </button>
            </div>
          )}
          <Textarea
            placeholder="Additional comments (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={2}
          />
          <Button
            onClick={handleSubmit}
            disabled={
              (feedbackType === "star" && rating === 0) ||
              (feedbackType === "emoji" && !emoji) ||
              (feedbackType === "thumbs" && !thumb)
            }
            className="self-end"
          >
            Submit Feedback
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <span className="text-green-600 font-semibold">
            Thank you for your feedback!
          </span>
        </div>
      )}
    </CardContent>
  </Card>
);
}

export default UserFeedbackBlock;

code.demo.1755785150812.tsx
import UserFeedbackBlock from "@/components/ui/user-feedback-block";

export default function DemoOne() {
  return <UserFeedbackBlock />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/user-feedback-block.tsx
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Smile, Frown, ThumbsUp, ThumbsDown } from "lucide-react";

const FEEDBACK_TYPES = [
{ type: "star", icon: Star, label: "Star Rating" },
{ type: "emoji", icon: Smile, label: "Emoji" },
{ type: "thumbs", icon: ThumbsUp, label: "Thumbs Up/Down" },
];

const UserFeedbackBlock = () => {
const [feedbackType, setFeedbackType] = useState("star");
const [rating, setRating] = useState(0);
const [emoji, setEmoji] = useState("");
const [thumb, setThumb] = useState("");
const [comment, setComment] = useState("");
const [submitted, setSubmitted] = useState(false);

function handleSubmit() {
  setSubmitted(true);
  setTimeout(() => {
    setFeedbackType("star");
    setRating(0);
    setEmoji("");
    setThumb("");
    setComment("");
    setSubmitted(false);
  }, 2000);
}

return (
  <Card className="w-full max-w-md mx-auto p-2 md:p-4">
    <CardContent className="p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-lg">
          How was your help/support experience?
        </span>
        <div className="flex gap-2">
          {FEEDBACK_TYPES.map((ft) => (
            <Button
              key={ft.type}
              size="icon"
              variant={feedbackType === ft.type ? "secondary" : "ghost"}
              onClick={() => setFeedbackType(ft.type)}
              aria-label={ft.label}
            >
              <ft.icon className="w-5 h-5" />
            </Button>
          ))}
        </div>
      </div>
      {!submitted ? (
        <div className="flex flex-col gap-4">
          {feedbackType === "star" && (
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  className={`text-yellow-400 ${
                    n <= rating ? "" : "opacity-30"
                  }`}
                  onClick={() => setRating(n)}
                  aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
                >
                  <Star
                    className="w-6 h-6"
                    fill={n <= rating ? "#facc15" : "none"}
                  />
                </button>
              ))}
            </div>
          )}
          {feedbackType === "emoji" && (
            <div className="flex gap-2">
              {[
                { e: "😊", label: "Happy" },
                { e: "😐", label: "Neutral" },
                { e: "😞", label: "Unhappy" },
              ].map((em) => (
                <button
                  key={em.e}
                  className={`text-2xl ${
                    emoji === em.e ? "ring-2 ring-primary rounded-full" : ""
                  }`}
                  onClick={() => setEmoji(em.e)}
                  aria-label={em.label}
                >
                  {em.e}
                </button>
              ))}
            </div>
          )}
          {feedbackType === "thumbs" && (
            <div className="flex gap-2">
              <button
                className={`p-2 rounded-full border ${
                  thumb === "up"
                    ? "bg-green-100 border-green-400"
                    : "border-muted-foreground/20"
                }`}
                onClick={() => setThumb("up")}
                aria-label="Thumbs up"
              >
                <ThumbsUp className="w-5 h-5 text-green-600" />
              </button>
              <button
                className={`p-2 rounded-full border ${
                  thumb === "down"
                    ? "bg-red-100 border-red-400"
                    : "border-muted-foreground/20"
                }`}
                onClick={() => setThumb("down")}
                aria-label="Thumbs down"
              >
                <ThumbsDown className="w-5 h-5 text-red-600" />
              </button>
            </div>
          )}
          <Textarea
            placeholder="Additional comments (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={2}
          />
          <Button
            onClick={handleSubmit}
            disabled={
              (feedbackType === "star" && rating === 0) ||
              (feedbackType === "emoji" && !emoji) ||
              (feedbackType === "thumbs" && !thumb)
            }
            className="self-end"
          >
            Submit Feedback
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <span className="text-green-600 font-semibold">
            Thank you for your feedback!
          </span>
        </div>
      )}
    </CardContent>
  </Card>
);
}

export default UserFeedbackBlock;
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
