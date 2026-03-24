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
code-snippets-3.tsx
"use client"

import React, { useEffect, useRef, useState } from "react"
import { Highlight, PrismTheme } from "prism-react-renderer"
import { cn } from "@/lib/utils"

/* =========================
   Inline CopyButton (self-contained)
   ========================= */
interface InlineCopyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

const CopyButton = ({ value, className, ...props }: InlineCopyButtonProps) => {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      if (timerRef.current) window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => setCopied(false), 1200)
    } catch {
      // Fallback for very old browsers
      const textarea = document.createElement("textarea")
      textarea.value = value
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      try {
        document.execCommand("copy")
        setCopied(true)
        if (timerRef.current) window.clearTimeout(timerRef.current)
        timerRef.current = window.setTimeout(() => setCopied(false), 1200)
      } finally {
        document.body.removeChild(textarea)
      }
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      title={copied ? "Copied!" : "Copy"}
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "border-transparent/0 hover:border-transparent/0", // let parent pass colors
        className
      )}
      {...props}
    >
      <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
      {/* icons inline to avoid imports */}
      {copied ? (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  )
}

/* =========================
   Inline theme definitions
   ========================= */
const defaultTheme: PrismTheme = {
  plain: { color: "#FFFFFF", backgroundColor: "#151515" },
  styles: [
    { types: ["comment"], style: { color: "#757575", fontStyle: "italic" } },
    { types: ["keyword", "property", "property-access", "attr-name"], style: { color: "#77b7d7" } },
    { types: ["tag"], style: { color: "#dfab5c" } },
    { types: ["punctuation", "symbol", "dom"], style: { color: "#ffffff" } },
    { types: ["definition", "function"], style: { color: "#86d9ca" } },
    { types: ["string", "char", "attr-value"], style: { color: "#977cdc" } },
    { types: ["static", "number"], style: { color: "#ff6658" } },
  ],
}

const lightTheme: PrismTheme = {
  plain: { color: "#24292e", backgroundColor: "#FFFFFF" },
  styles: [
    { types: ["comment"], style: { color: "#6a737d", fontStyle: "italic" } },
    { types: ["keyword", "property", "property-access", "attr-name"], style: { color: "#d73a49" } },
    { types: ["tag"], style: { color: "#22863a" } },
    { types: ["punctuation", "symbol", "dom"], style: { color: "#24292e" } },
    { types: ["definition", "function"], style: { color: "#6f42c1" } },
    { types: ["string", "char", "attr-value"], style: { color: "#032f62" } },
    { types: ["static", "number"], style: { color: "#005cc5" } },
  ],
}

/* =========================
   CodeSnippet
   ========================= */
interface CodeSnippetProps {
  title?: string
  code: string
  language?: string
  className?: string
  border?: boolean
  theme?: PrismTheme
  showLineNumbers?: boolean
  adaptiveTheme?: { light: PrismTheme; dark: PrismTheme }
  tabs?: { [key: string]: { code: string; language?: string } }
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  title,
  code,
  language = "typescript",
  className,
  border = true,
  theme,
  showLineNumbers = true,
  adaptiveTheme,
  tabs,
  activeTab,
  onTabChange,
}) => {
  const currentTab = tabs && activeTab ? activeTab : null
  const currentCode = currentTab && tabs ? tabs[currentTab].code : code
  const currentLanguage =
    currentTab && tabs ? tabs[currentTab].language || language : language

  const lines = currentCode.trim().split("\n")
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }
    checkDarkMode()
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          checkDarkMode()
        }
      })
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  const selectedTheme = adaptiveTheme
    ? isDark
      ? adaptiveTheme.dark
      : adaptiveTheme.light
    : theme || (isDark ? defaultTheme : lightTheme)

  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden pointer-events-auto",
        border && "border border-border",
        className
      )}
    >
      {title || tabs ? (
        <div
          className="flex items-center justify-between border-b"
          style={{
            backgroundColor: selectedTheme.plain?.backgroundColor || "#151515",
            borderBottomColor:
              selectedTheme.plain?.backgroundColor?.toLowerCase() === "#ffffff"
                ? "#e5e5e5"
                : "#2a2a2a",
          }}
        >
          {title ? (
            <h3
              className="text-sm font-medium pl-4 py-2"
              style={{ color: selectedTheme.plain?.color || "#FFFFFF" }}
            >
              {title}
            </h3>
          ) : null}

          {tabs && !title ? (
            <div className="flex items-center px-3 py-4">
              <div className="h-7 translate-y-[2px] gap-3 bg-transparent p-0 pl-1 flex">
                {Object.entries(tabs).map(([key]) => (
                  <button
                    key={key}
                    onClick={() => onTabChange?.(key)}
                    className={cn(
                      "rounded-none border-b-2 border-transparent bg-transparent p-0 pb-1.5 font-mono text-sm transition-colors",
                      activeTab === key
                        ? selectedTheme.plain?.backgroundColor?.toLowerCase() === "#ffffff"
                          ? "border-b-zinc-900 text-zinc-900"
                          : "border-b-zinc-50 text-zinc-50"
                        : selectedTheme.plain?.backgroundColor?.toLowerCase() === "#ffffff"
                          ? "text-zinc-600 hover:text-zinc-800"
                          : "text-zinc-400 hover:text-zinc-200"
                    )}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <CopyButton
            value={currentCode}
            className={cn(
              "mr-3",
              selectedTheme.plain?.backgroundColor?.toLowerCase() === "#ffffff"
                ? "text-zinc-600 hover:bg-zinc-200 hover:text-zinc-800"
                : "text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50"
            )}
          />
        </div>
      ) : null}

      <div
        className="relative max-h-[calc(530px-44px)] py-4"
        style={{ backgroundColor: selectedTheme.plain?.backgroundColor || "#151515" }}
      >
        {!title && !tabs && (
          <div
            className={cn(
              "absolute",
              lines.length === 1 ? "top-1/2 -translate-y-1/2 right-3" : "top-4 right-3"
            )}
          >
            <CopyButton
              value={currentCode}
              className={
                selectedTheme.plain?.backgroundColor?.toLowerCase() === "#ffffff"
                  ? "text-zinc-600 hover:bg-zinc-200 hover:text-zinc-800"
                  : "text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50"
              }
            />
          </div>
        )}

        <Highlight theme={selectedTheme} code={currentCode.trim()} language={currentLanguage}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} text-[13px] overflow-x-auto overflow-y-auto max-h-[calc(530px-88px)] font-mono font-medium`}
              style={style}
            >
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  className="flex items-center py-px px-4"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      selectedTheme.plain?.backgroundColor?.toLowerCase() === "#ffffff"
                        ? "#f5f5f5"
                        : "#202020")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  {showLineNumbers && (
                    <span
                      className="mr-4 select-none text-right text-[10px] items-center flex"
                      style={{
                        color:
                          selectedTheme.plain?.backgroundColor === "#FFFFFF" ? "#999999" : "#757575",
                        minWidth: "1.5rem",
                      }}
                    >
                      {i + 1}
                    </span>
                  )}
                  <span className={!showLineNumbers ? "ml-0" : ""}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}


code.demo.1756870824458.tsx
"use client"

import React, { useState } from "react"
import { CodeSnippet } from "@/components/ui/code-snippets-3"
import { PrismTheme } from "prism-react-renderer"

import { Button } from "@/components/ui/button"

// Custom Monokai-inspired dark theme
const monokaiTheme: PrismTheme = {
  plain: {
    color: "#f8f8f2",
    backgroundColor: "#272822",
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "#75715e",
        fontStyle: "italic",
      },
    },
    {
      types: ["keyword", "operator"],
      style: {
        color: "#f92672",
        fontWeight: "bold",
      },
    },
    {
      types: ["string", "char"],
      style: {
        color: "#e6db74",
      },
    },
    {
      types: ["number"],
      style: {
        color: "#ae81ff",
      },
    },
    {
      types: ["function", "method"],
      style: {
        color: "#a6e22e",
      },
    },
    {
      types: ["class-name", "type"],
      style: {
        color: "#66d9ef",
        fontWeight: "bold",
      },
    },
    {
      types: ["punctuation", "symbol"],
      style: {
        color: "#f8f8f2",
      },
    },
    {
      types: ["tag"],
      style: {
        color: "#f92672",
      },
    },
    {
      types: ["attr-name"],
      style: {
        color: "#a6e22e",
      },
    },
    {
      types: ["attr-value"],
      style: {
        color: "#e6db74",
      },
    },
  ],
}

// Custom GitHub-inspired light theme
const githubLightTheme: PrismTheme = {
  plain: {
    color: "#24292f",
    backgroundColor: "#ffffff",
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "#6a737d",
        fontStyle: "italic",
      },
    },
    {
      types: ["keyword", "operator"],
      style: {
        color: "#d73a49",
        fontWeight: "600",
      },
    },
    {
      types: ["string", "char"],
      style: {
        color: "#032f62",
      },
    },
    {
      types: ["number"],
      style: {
        color: "#005cc5",
      },
    },
    {
      types: ["function", "method"],
      style: {
        color: "#6f42c1",
      },
    },
    {
      types: ["class-name", "type"],
      style: {
        color: "#e36209",
        fontWeight: "600",
      },
    },
    {
      types: ["punctuation", "symbol"],
      style: {
        color: "#24292f",
      },
    },
    {
      types: ["tag"],
      style: {
        color: "#22863a",
      },
    },
    {
      types: ["attr-name"],
      style: {
        color: "#005cc5",
      },
    },
    {
      types: ["attr-value"],
      style: {
        color: "#032f62",
      },
    },
  ],
}

export default function CodeSnippetThemeDemo() {
  const [selectedTheme, setSelectedTheme] = useState<"monokai" | "github">(
    "monokai"
  )

  const jsCode = `// Advanced JavaScript patterns and concepts
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    const callbacks = this.events.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  emit(event, ...args) {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(...args);
        } catch (error) {
          console.error(\`Error in event handler for \${event}:\`, error);
        }
      });
    }
  }
}

// Usage with modern async/await patterns
const api = {
  async fetchUser(id) {
    const response = await fetch(\`/api/users/\${id}\`);
    if (!response.ok) {
      throw new Error(\`Failed to fetch user: \${response.statusText}\`);
    }
    return response.json();
  },

  async updateUser(id, data) {
    const response = await fetch(\`/api/users/\${id}\`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
};

// Functional programming with higher-order functions
const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);
const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

const addTax = (rate) => (price) => price * (1 + rate);
const applyDiscount = (discount) => (price) => price * (1 - discount);
const formatCurrency = (price) => \`$\${price.toFixed(2)}\`;

const calculatePrice = pipe(
  addTax(0.08),
  applyDiscount(0.1),
  formatCurrency
);

console.log(calculatePrice(100)); // $97.20`

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2">
        <Button
          variant={selectedTheme === "monokai" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedTheme("monokai")}
        >
          Monokai Dark
        </Button>
        <Button
          variant={selectedTheme === "github" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedTheme("github")}
        >
          GitHub Light
        </Button>
      </div>

      <CodeSnippet
        title="advanced-patterns.js"
        code={jsCode}
        language="javascript"
        theme={selectedTheme === "monokai" ? monokaiTheme : githubLightTheme}
        showLineNumbers={true}
      />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/code-snippets-3.tsx
"use client"

import React, { useEffect, useRef, useState } from "react"
import { Highlight, PrismTheme } from "prism-react-renderer"
import { cn } from "@/lib/utils"

/* =========================
   Inline CopyButton (self-contained)
   ========================= */
interface InlineCopyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

const CopyButton = ({ value, className, ...props }: InlineCopyButtonProps) => {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      if (timerRef.current) window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => setCopied(false), 1200)
    } catch {
      // Fallback for very old browsers
      const textarea = document.createElement("textarea")
      textarea.value = value
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      try {
        document.execCommand("copy")
        setCopied(true)
        if (timerRef.current) window.clearTimeout(timerRef.current)
        timerRef.current = window.setTimeout(() => setCopied(false), 1200)
      } finally {
        document.body.removeChild(textarea)
      }
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      title={copied ? "Copied!" : "Copy"}
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "border-transparent/0 hover:border-transparent/0", // let parent pass colors
        className
      )}
      {...props}
    >
      <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
      {/* icons inline to avoid imports */}
      {copied ? (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  )
}

/* =========================
   Inline theme definitions
   ========================= */
const defaultTheme: PrismTheme = {
  plain: { color: "#FFFFFF", backgroundColor: "#151515" },
  styles: [
    { types: ["comment"], style: { color: "#757575", fontStyle: "italic" } },
    { types: ["keyword", "property", "property-access", "attr-name"], style: { color: "#77b7d7" } },
    { types: ["tag"], style: { color: "#dfab5c" } },
    { types: ["punctuation", "symbol", "dom"], style: { color: "#ffffff" } },
    { types: ["definition", "function"], style: { color: "#86d9ca" } },
    { types: ["string", "char", "attr-value"], style: { color: "#977cdc" } },
    { types: ["static", "number"], style: { color: "#ff6658" } },
  ],
}

const lightTheme: PrismTheme = {
  plain: { color: "#24292e", backgroundColor: "#FFFFFF" },
  styles: [
    { types: ["comment"], style: { color: "#6a737d", fontStyle: "italic" } },
    { types: ["keyword", "property", "property-access", "attr-name"], style: { color: "#d73a49" } },
    { types: ["tag"], style: { color: "#22863a" } },
    { types: ["punctuation", "symbol", "dom"], style: { color: "#24292e" } },
    { types: ["definition", "function"], style: { color: "#6f42c1" } },
    { types: ["string", "char", "attr-value"], style: { color: "#032f62" } },
    { types: ["static", "number"], style: { color: "#005cc5" } },
  ],
}

/* =========================
   CodeSnippet
   ========================= */
interface CodeSnippetProps {
  title?: string
  code: string
  language?: string
  className?: string
  border?: boolean
  theme?: PrismTheme
  showLineNumbers?: boolean
  adaptiveTheme?: { light: PrismTheme; dark: PrismTheme }
  tabs?: { [key: string]: { code: string; language?: string } }
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  title,
  code,
  language = "typescript",
  className,
  border = true,
  theme,
  showLineNumbers = true,
  adaptiveTheme,
  tabs,
  activeTab,
  onTabChange,
}) => {
  const currentTab = tabs && activeTab ? activeTab : null
  const currentCode = currentTab && tabs ? tabs[currentTab].code : code
  const currentLanguage =
    currentTab && tabs ? tabs[currentTab].language || language : language

  const lines = currentCode.trim().split("\n")
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }
    checkDarkMode()
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          checkDarkMode()
        }
      })
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  const selectedTheme = adaptiveTheme
    ? isDark
      ? adaptiveTheme.dark
      : adaptiveTheme.light
    : theme || (isDark ? defaultTheme : lightTheme)

  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden pointer-events-auto",
        border && "border border-border",
        className
      )}
    >
      {title || tabs ? (
        <div
          className="flex items-center justify-between border-b"
          style={{
            backgroundColor: selectedTheme.plain?.backgroundColor || "#151515",
            borderBottomColor:
              selectedTheme.plain?.backgroundColor?.toLowerCase() === "#ffffff"
                ? "#e5e5e5"
                : "#2a2a2a",
          }}
        >
          {title ? (
            <h3
              className="text-sm font-medium pl-4 py-2"
              style={{ color: selectedTheme.plain?.color || "#FFFFFF" }}
            >
              {title}
            </h3>
          ) : null}

          {tabs && !title ? (
            <div className="flex items-center px-3 py-4">
              <div className="h-7 translate-y-[2px] gap-3 bg-transparent p-0 pl-1 flex">
                {Object.entries(tabs).map(([key]) => (
                  <button
                    key={key}
                    onClick={() => onTabChange?.(key)}
                    className={cn(
                      "rounded-none border-b-2 border-transparent bg-transparent p-0 pb-1.5 font-mono text-sm transition-colors",
                      activeTab === key
                        ? selectedTheme.plain?.backgroundColor?.toLowerCase() === "#ffffff"
                          ? "border-b-zinc-900 text-zinc-900"
                          : "border-b-zinc-50 text-zinc-50"
                        : selectedTheme.plain?.backgroundColor?.toLowerCase() === "#ffffff"
                          ? "text-zinc-600 hover:text-zinc-800"
                          : "text-zinc-400 hover:text-zinc-200"
                    )}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <CopyButton
            value={currentCode}
            className={cn(
              "mr-3",
              selectedTheme.plain?.backgroundColor?.toLowerCase() === "#ffffff"
                ? "text-zinc-600 hover:bg-zinc-200 hover:text-zinc-800"
                : "text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50"
            )}
          />
        </div>
      ) : null}

      <div
        className="relative max-h-[calc(530px-44px)] py-4"
        style={{ backgroundColor: selectedTheme.plain?.backgroundColor || "#151515" }}
      >
        {!title && !tabs && (
          <div
            className={cn(
              "absolute",
              lines.length === 1 ? "top-1/2 -translate-y-1/2 right-3" : "top-4 right-3"
            )}
          >
            <CopyButton
              value={currentCode}
              className={
                selectedTheme.plain?.backgroundColor?.toLowerCase() === "#ffffff"
                  ? "text-zinc-600 hover:bg-zinc-200 hover:text-zinc-800"
                  : "text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50"
              }
            />
          </div>
        )}

        <Highlight theme={selectedTheme} code={currentCode.trim()} language={currentLanguage}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} text-[13px] overflow-x-auto overflow-y-auto max-h-[calc(530px-88px)] font-mono font-medium`}
              style={style}
            >
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  className="flex items-center py-px px-4"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      selectedTheme.plain?.backgroundColor?.toLowerCase() === "#ffffff"
                        ? "#f5f5f5"
                        : "#202020")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  {showLineNumbers && (
                    <span
                      className="mr-4 select-none text-right text-[10px] items-center flex"
                      style={{
                        color:
                          selectedTheme.plain?.backgroundColor === "#FFFFFF" ? "#999999" : "#757575",
                        minWidth: "1.5rem",
                      }}
                    >
                      {i + 1}
                    </span>
                  )}
                  <span className={!showLineNumbers ? "ml-0" : ""}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}

```

Install NPM dependencies:
```bash
prism-react-renderer
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
