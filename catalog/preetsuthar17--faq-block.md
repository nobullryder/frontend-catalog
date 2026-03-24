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
faq-block.tsx
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown, Sparkles, Search } from "lucide-react";

const FAQS = [
{
  question: "How do I contact support?",
  answer:
    "You can use the Contact Support form or the live chat widget to reach our team.",
},
{
  question: "Where can I find documentation?",
  answer: "Documentation is available in the Docs section of our website.",
},
{
  question: "How do I reset my password?",
  answer:
    "Go to the Sign In page and click on 'Forgot password?' to reset your password.",
},
{
  question: "Is there a free trial?",
  answer: "Yes, we offer a 14-day free trial for all new users.",
},
{
  question: "How do I change my email address?",
  answer: "Go to your profile settings and update your email address.",
},
{
  question: "Can I use dark mode?",
  answer: "Yes, you can enable dark mode in the appearance settings.",
},
];

function getPersonalizedFaqs() {
// For demo, just return 2 random FAQs
const shuffled = [...FAQS].sort(() => 0.5 - Math.random());
return shuffled.slice(0, 2);
}

const FAQBlock = () => {
const [search, setSearch] = useState("");
const [feedback, setFeedback] = useState<{
  [q: string]: "up" | "down" | undefined;
}>({});
const [showFeedbackInput, setShowFeedbackInput] = useState<{
  [q: string]: boolean;
}>({});
const [feedbackText, setFeedbackText] = useState<{ [q: string]: string }>({});
const [aiInput, setAiInput] = useState("");
const [aiResponse, setAiResponse] = useState("");
const [aiLoading, setAiLoading] = useState(false);

const filteredFaqs = FAQS.filter(
  (faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase()) ||
    faq.answer.toLowerCase().includes(search.toLowerCase())
);

const handleFeedback = (q: string, type: "up" | "down") => {
  setFeedback((fb) => ({ ...fb, [q]: type }));
  if (type === "down") setShowFeedbackInput((fb) => ({ ...fb, [q]: true }));
};

const handleAiAsk = () => {
  setAiLoading(true);
  setTimeout(() => {
    setAiResponse(
      aiInput.trim()
        ? `Sorry, I couldn't find an exact answer, but here's my best guess: "${aiInput}" is a great question! Please contact support for more details.`
        : ""
    );
    setAiLoading(false);
  }, 1200);
};

const personalizedFaqs = getPersonalizedFaqs();

return (
  <Card className="w-full max-w-2xl mx-auto">
    <CardContent className="flex flex-col gap-6">
      <Input
        size={"lg"}
        leftIcon={<Search />}
        placeholder="Search FAQs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Accordion type="single" collapsible className="w-full">
        {filteredFaqs.length === 0 ? (
          <div className="text-muted-foreground text-center flex flex-col items-center gap-8 p-3">
            <div>No FAQs found.</div>
            <div className="flex flex-col gap-2 w-full max-w-sm">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-primary" />
                Ask our AI Assistant
              </div>
              <Textarea
                placeholder="Type your question..."
                value={aiInput}
                onChange={(e) => {
                  setAiInput(e.target.value);
                  setAiResponse("");
                }}
                rows={2}
              />
              <Button
                onClick={handleAiAsk}
                disabled={aiLoading || !aiInput.trim()}
                className="self-end"
                loading={aiLoading}
                size="sm"
              >
                {aiLoading ? "" : "Ask AI"}
              </Button>
              {aiResponse && (
                <div className="bg-accent rounded-card p-3 text-sm">
                  {aiResponse}
                </div>
              )}
            </div>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => (
            <AccordionItem key={idx} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  <div className="text-sm">{faq.answer}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Was this helpful?
                    </span>
                    <Button
                      size="icon"
                      variant={
                        feedback[faq.question] === "up"
                          ? "secondary"
                          : "ghost"
                      }
                      onClick={() => handleFeedback(faq.question, "up")}
                      aria-label="Helpful"
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant={
                        feedback[faq.question] === "down"
                          ? "secondary"
                          : "ghost"
                      }
                      onClick={() => handleFeedback(faq.question, "down")}
                      aria-label="Not helpful"
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                    {feedback[faq.question] === "up" && (
                      <span className="text-green-600 text-xs">
                        Thank you for your feedback!
                      </span>
                    )}
                  </div>
                  {showFeedbackInput[faq.question] && (
                    <div className="flex flex-col gap-2">
                      <Textarea
                        placeholder="How can we improve this answer?"
                        value={feedbackText[faq.question] || ""}
                        onChange={(e) =>
                          setFeedbackText((fb) => ({
                            ...fb,
                            [faq.question]: e.target.value,
                          }))
                        }
                        rows={2}
                      />
                      <Button
                        size="sm"
                        className="self-end"
                        onClick={() =>
                          setShowFeedbackInput((fb) => ({
                            ...fb,
                            [faq.question]: false,
                          }))
                        }
                      >
                        Submit Feedback
                      </Button>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))
        )}
      </Accordion>
      {/* Personalized suggestions */}
      <div className="flex flex-col gap-1">
        <div className="font-semibold text-sm text-muted-foreground">
          You might also be interested in:
        </div>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          {personalizedFaqs.map((faq, i) => (
            <li key={i} className="text-sm text-muted-foreground">
              {faq.question}
            </li>
          ))}
        </ul>
      </div>
    </CardContent>
  </Card>
);
}

export default FAQBlock;

code.demo.1755586203769.tsx
import FAQBlock  from "@/components/ui/faq-block";

export default function DemoOne() {
  return(
    <>
      <div className="max-w-[95%] mx-auto w-full"><FAQBlock /></div>
    </>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/faq-block.tsx
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown, Sparkles, Search } from "lucide-react";

const FAQS = [
{
  question: "How do I contact support?",
  answer:
    "You can use the Contact Support form or the live chat widget to reach our team.",
},
{
  question: "Where can I find documentation?",
  answer: "Documentation is available in the Docs section of our website.",
},
{
  question: "How do I reset my password?",
  answer:
    "Go to the Sign In page and click on 'Forgot password?' to reset your password.",
},
{
  question: "Is there a free trial?",
  answer: "Yes, we offer a 14-day free trial for all new users.",
},
{
  question: "How do I change my email address?",
  answer: "Go to your profile settings and update your email address.",
},
{
  question: "Can I use dark mode?",
  answer: "Yes, you can enable dark mode in the appearance settings.",
},
];

function getPersonalizedFaqs() {
// For demo, just return 2 random FAQs
const shuffled = [...FAQS].sort(() => 0.5 - Math.random());
return shuffled.slice(0, 2);
}

const FAQBlock = () => {
const [search, setSearch] = useState("");
const [feedback, setFeedback] = useState<{
  [q: string]: "up" | "down" | undefined;
}>({});
const [showFeedbackInput, setShowFeedbackInput] = useState<{
  [q: string]: boolean;
}>({});
const [feedbackText, setFeedbackText] = useState<{ [q: string]: string }>({});
const [aiInput, setAiInput] = useState("");
const [aiResponse, setAiResponse] = useState("");
const [aiLoading, setAiLoading] = useState(false);

const filteredFaqs = FAQS.filter(
  (faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase()) ||
    faq.answer.toLowerCase().includes(search.toLowerCase())
);

const handleFeedback = (q: string, type: "up" | "down") => {
  setFeedback((fb) => ({ ...fb, [q]: type }));
  if (type === "down") setShowFeedbackInput((fb) => ({ ...fb, [q]: true }));
};

const handleAiAsk = () => {
  setAiLoading(true);
  setTimeout(() => {
    setAiResponse(
      aiInput.trim()
        ? `Sorry, I couldn't find an exact answer, but here's my best guess: "${aiInput}" is a great question! Please contact support for more details.`
        : ""
    );
    setAiLoading(false);
  }, 1200);
};

const personalizedFaqs = getPersonalizedFaqs();

return (
  <Card className="w-full max-w-2xl mx-auto">
    <CardContent className="flex flex-col gap-6">
      <Input
        size={"lg"}
        leftIcon={<Search />}
        placeholder="Search FAQs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Accordion type="single" collapsible className="w-full">
        {filteredFaqs.length === 0 ? (
          <div className="text-muted-foreground text-center flex flex-col items-center gap-8 p-3">
            <div>No FAQs found.</div>
            <div className="flex flex-col gap-2 w-full max-w-sm">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-primary" />
                Ask our AI Assistant
              </div>
              <Textarea
                placeholder="Type your question..."
                value={aiInput}
                onChange={(e) => {
                  setAiInput(e.target.value);
                  setAiResponse("");
                }}
                rows={2}
              />
              <Button
                onClick={handleAiAsk}
                disabled={aiLoading || !aiInput.trim()}
                className="self-end"
                loading={aiLoading}
                size="sm"
              >
                {aiLoading ? "" : "Ask AI"}
              </Button>
              {aiResponse && (
                <div className="bg-accent rounded-card p-3 text-sm">
                  {aiResponse}
                </div>
              )}
            </div>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => (
            <AccordionItem key={idx} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  <div className="text-sm">{faq.answer}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Was this helpful?
                    </span>
                    <Button
                      size="icon"
                      variant={
                        feedback[faq.question] === "up"
                          ? "secondary"
                          : "ghost"
                      }
                      onClick={() => handleFeedback(faq.question, "up")}
                      aria-label="Helpful"
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant={
                        feedback[faq.question] === "down"
                          ? "secondary"
                          : "ghost"
                      }
                      onClick={() => handleFeedback(faq.question, "down")}
                      aria-label="Not helpful"
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                    {feedback[faq.question] === "up" && (
                      <span className="text-green-600 text-xs">
                        Thank you for your feedback!
                      </span>
                    )}
                  </div>
                  {showFeedbackInput[faq.question] && (
                    <div className="flex flex-col gap-2">
                      <Textarea
                        placeholder="How can we improve this answer?"
                        value={feedbackText[faq.question] || ""}
                        onChange={(e) =>
                          setFeedbackText((fb) => ({
                            ...fb,
                            [faq.question]: e.target.value,
                          }))
                        }
                        rows={2}
                      />
                      <Button
                        size="sm"
                        className="self-end"
                        onClick={() =>
                          setShowFeedbackInput((fb) => ({
                            ...fb,
                            [faq.question]: false,
                          }))
                        }
                      >
                        Submit Feedback
                      </Button>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))
        )}
      </Accordion>
      {/* Personalized suggestions */}
      <div className="flex flex-col gap-1">
        <div className="font-semibold text-sm text-muted-foreground">
          You might also be interested in:
        </div>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          {personalizedFaqs.map((faq, i) => (
            <li key={i} className="text-sm text-muted-foreground">
              {faq.question}
            </li>
          ))}
        </ul>
      </div>
    </CardContent>
  </Card>
);
}

export default FAQBlock;
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
