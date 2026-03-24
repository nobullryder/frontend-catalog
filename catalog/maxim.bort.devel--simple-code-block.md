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
simple-code-block.tsx
'use client';
import React, { useMemo } from 'react';

type SimpleCodeBlockProps = {
  code: string;
  filename: string;
  codePadding?: string;
  lineNumberXShift?: string;
  filenameColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string;
  rootBorderRadius?: string;
  rootPadding?: string;
  lineNumberColor?: string;
  codeTextColor?: string;
  fontFamily?: string;
  codeTextSize?: string;
  titleFontSize?: string;
  codeLineHeight?: string;
  hyperlinkUnderlineColor?: string;
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function processHyperlinks(text: string): string {
  const urlRegex = /(https?:\/\/[^\s"')]+)/g;
  return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer" class="codeblock-hyperlink">${url}</a>`);
}

export function SimpleCodeBlock({
  code,
  filename,
  codePadding = '16px 16px 16px 64px',
  lineNumberXShift = '0px',
  filenameColor = '#fff',
  backgroundColor = '#17161c',
  borderColor = '#312f3b',
  borderWidth = '1px',
  rootBorderRadius = '8px',
  rootPadding = '10px 8px 20px 8px',
  lineNumberColor = '#999',
  codeTextColor = '#d4d4d4',
  fontFamily = "'Roboto Mono', monospace",
  codeTextSize = '1rem',
  titleFontSize = '1.125rem',
  codeLineHeight = '1.5rem',
  hyperlinkUnderlineColor = '#4a90e2',
}: SimpleCodeBlockProps) {
  const codeLines = useMemo(() => {
    const lines = code.split('\n');
    if (lines.length > 0 && lines[lines.length - 1].trim() === '') {
      lines.pop();
    }
    return lines;
  }, [code]);

  const plainCode = useMemo(() => {
    return processHyperlinks(
      codeLines.map((line) => escapeHtml(line) || '&nbsp;').join('\n')
    );
  }, [codeLines]);

  return (
    <div
      className="codeblock-root"
      style={{
        background: backgroundColor,
        borderColor,
        borderRadius: rootBorderRadius,
        borderWidth,
        borderStyle: 'solid',
        padding: rootPadding,
        fontFamily,
      }}
    >
      {filename && (
        <div
          className="codeblock-header"
          style={{
            color: filenameColor,
            zIndex: 3,
            fontSize: titleFontSize,
          }}
        >
          <span
            className="codeblock-filename"
            style={{
              color: filenameColor,
              fontSize: titleFontSize,
            }}
          >
            {filename}
          </span>
        </div>
      )}
      <div className="codeblock-wrapper">
        <div
          className="codeblock-linenumbers-bg"
          style={{
            width: `calc(${lineNumberXShift} + 48px)`,
            background: backgroundColor,
          }}
        />
        <div
          className="codeblock-linenumbers"
          aria-hidden="true"
          style={{
            color: lineNumberColor,
            transform: `translateX(${lineNumberXShift})`,
            background: backgroundColor,
            zIndex: 2,
            fontSize: codeTextSize,
            lineHeight: codeLineHeight,
            fontFamily,
          }}
        >
          {codeLines.map((_, i) => (
            <span key={i} style={{ display: 'block' }}>
              {i + 1}
            </span>
          ))}
        </div>
        <div className="codeblock-scrollarea">
          <pre
            className="codeblock-pre"
            style={{
              background: backgroundColor,
              color: codeTextColor,
              padding: codePadding,
              marginRight: '16px',
              fontSize: codeTextSize,
              lineHeight: codeLineHeight,
              fontFamily,
            }}
          >
            <code dangerouslySetInnerHTML={{ __html: plainCode }} />
          </pre>
        </div>
      </div>
      <style jsx>{`
        .codeblock-root {
          width: 100%;
          box-sizing: border-box;
          overflow-x: auto;
          overflow-y: hidden;
          max-width: 100%;
          position: relative;
        }
        .codeblock-header {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 8px 22px;
        }
        .codeblock-filename {
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .codeblock-wrapper {
          display: flex;
          position: relative;
          width: 100%;
        }
        .codeblock-linenumbers-bg {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          z-index: 1;
          pointer-events: none;
          user-select: none;
        }
        .codeblock-linenumbers {
          user-select: none;
          pointer-events: none;
          text-align: right;
          padding: 16px 12px 16px 0;
          min-width: 48px;
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          overflow: hidden;
        }
        .codeblock-scrollarea {
          width: 100%;
          overflow-x: hidden;
          overflow-y: hidden;
        }
        .codeblock-pre {
          margin: 0;
          border-radius: 0 0 10px 10px;
          overflow-x: hidden;
          overflow-y: hidden;
          box-sizing: border-box;
          width: 100%;
          max-width: 100%;
        }
        .codeblock-pre code {
          display: block;
          white-space: pre;
          position: relative;
        }
        .codeblock-hyperlink {
          color: inherit;
          text-decoration: none;
          border-bottom: 1px solid ${hyperlinkUnderlineColor};
          cursor: pointer;
        }
        .codeblock-hyperlink:hover {
          border-bottom: 2px solid ${hyperlinkUnderlineColor};
        }
      `}</style>
    </div>
  );
}


code.demo.1750158897193.tsx
import { SimpleCodeBlock } from "@/components/ui/simple-code-block";

const DemoOne = () => {
  // Example code
  const sampleCode = `"use client"
import React from 'react';

const Links = () => {
  const links = {
    github: "https://github.com/Northstrix",
    vueVersion: "https://namer-ui-for-vue.netlify.app/",
  };

  function openLink(url: string) {
    window.open(url, "_blank");
  }

  return (
    <div style={{ padding: "24px" }}>
      <h2>Links</h2>
      <button onClick={() => openLink(links.github)}>
        GitHub
      </button>
      <br />
      <button onClick={() => openLink(links.vueVersion)}>
        Vue version of this component
      </button>
    </div>
  );
};

export default Links;`;

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      width: "100%",
      margin: "0 auto",
      maxWidth: "576px",
    }}>
      <SimpleCodeBlock
        code={sampleCode}
        filename="Links.tsx"
        codePadding="16px 16px 16px 52px"
        lineNumberXShift="-4px"
        filenameColor="var(--simple-code-block-filenamecolor)"
        backgroundColor="var(--simple-code-block-backgroundcolor)"
        borderColor="var(--simple-code-block-bordercolor)"
        borderWidth="1px"
        rootBorderRadius="8px"
        rootPadding="12px 8px 12px 8px"
        lineNumberColor="var(--simple-code-block-linenumbercolor)"
        codeTextColor="var(--simple-code-block-codetextcolor)"
        fontFamily="'Roboto Mono', monospace"
        codeTextSize="0.95rem"
        titleFontSize="1.1rem"
        codeLineHeight="1.4rem"
        hyperlinkUnderlineColor="var(--simple-code-block-hyperlinkunderlinecolor)"
      />
    </div>
  );
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/simple-code-block.tsx
'use client';
import React, { useMemo } from 'react';

type SimpleCodeBlockProps = {
  code: string;
  filename: string;
  codePadding?: string;
  lineNumberXShift?: string;
  filenameColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string;
  rootBorderRadius?: string;
  rootPadding?: string;
  lineNumberColor?: string;
  codeTextColor?: string;
  fontFamily?: string;
  codeTextSize?: string;
  titleFontSize?: string;
  codeLineHeight?: string;
  hyperlinkUnderlineColor?: string;
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function processHyperlinks(text: string): string {
  const urlRegex = /(https?:\/\/[^\s"')]+)/g;
  return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer" class="codeblock-hyperlink">${url}</a>`);
}

export function SimpleCodeBlock({
  code,
  filename,
  codePadding = '16px 16px 16px 64px',
  lineNumberXShift = '0px',
  filenameColor = '#fff',
  backgroundColor = '#17161c',
  borderColor = '#312f3b',
  borderWidth = '1px',
  rootBorderRadius = '8px',
  rootPadding = '10px 8px 20px 8px',
  lineNumberColor = '#999',
  codeTextColor = '#d4d4d4',
  fontFamily = "'Roboto Mono', monospace",
  codeTextSize = '1rem',
  titleFontSize = '1.125rem',
  codeLineHeight = '1.5rem',
  hyperlinkUnderlineColor = '#4a90e2',
}: SimpleCodeBlockProps) {
  const codeLines = useMemo(() => {
    const lines = code.split('\n');
    if (lines.length > 0 && lines[lines.length - 1].trim() === '') {
      lines.pop();
    }
    return lines;
  }, [code]);

  const plainCode = useMemo(() => {
    return processHyperlinks(
      codeLines.map((line) => escapeHtml(line) || '&nbsp;').join('\n')
    );
  }, [codeLines]);

  return (
    <div
      className="codeblock-root"
      style={{
        background: backgroundColor,
        borderColor,
        borderRadius: rootBorderRadius,
        borderWidth,
        borderStyle: 'solid',
        padding: rootPadding,
        fontFamily,
      }}
    >
      {filename && (
        <div
          className="codeblock-header"
          style={{
            color: filenameColor,
            zIndex: 3,
            fontSize: titleFontSize,
          }}
        >
          <span
            className="codeblock-filename"
            style={{
              color: filenameColor,
              fontSize: titleFontSize,
            }}
          >
            {filename}
          </span>
        </div>
      )}
      <div className="codeblock-wrapper">
        <div
          className="codeblock-linenumbers-bg"
          style={{
            width: `calc(${lineNumberXShift} + 48px)`,
            background: backgroundColor,
          }}
        />
        <div
          className="codeblock-linenumbers"
          aria-hidden="true"
          style={{
            color: lineNumberColor,
            transform: `translateX(${lineNumberXShift})`,
            background: backgroundColor,
            zIndex: 2,
            fontSize: codeTextSize,
            lineHeight: codeLineHeight,
            fontFamily,
          }}
        >
          {codeLines.map((_, i) => (
            <span key={i} style={{ display: 'block' }}>
              {i + 1}
            </span>
          ))}
        </div>
        <div className="codeblock-scrollarea">
          <pre
            className="codeblock-pre"
            style={{
              background: backgroundColor,
              color: codeTextColor,
              padding: codePadding,
              marginRight: '16px',
              fontSize: codeTextSize,
              lineHeight: codeLineHeight,
              fontFamily,
            }}
          >
            <code dangerouslySetInnerHTML={{ __html: plainCode }} />
          </pre>
        </div>
      </div>
      <style jsx>{`
        .codeblock-root {
          width: 100%;
          box-sizing: border-box;
          overflow-x: auto;
          overflow-y: hidden;
          max-width: 100%;
          position: relative;
        }
        .codeblock-header {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 8px 22px;
        }
        .codeblock-filename {
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .codeblock-wrapper {
          display: flex;
          position: relative;
          width: 100%;
        }
        .codeblock-linenumbers-bg {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          z-index: 1;
          pointer-events: none;
          user-select: none;
        }
        .codeblock-linenumbers {
          user-select: none;
          pointer-events: none;
          text-align: right;
          padding: 16px 12px 16px 0;
          min-width: 48px;
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          overflow: hidden;
        }
        .codeblock-scrollarea {
          width: 100%;
          overflow-x: hidden;
          overflow-y: hidden;
        }
        .codeblock-pre {
          margin: 0;
          border-radius: 0 0 10px 10px;
          overflow-x: hidden;
          overflow-y: hidden;
          box-sizing: border-box;
          width: 100%;
          max-width: 100%;
        }
        .codeblock-pre code {
          display: block;
          white-space: pre;
          position: relative;
        }
        .codeblock-hyperlink {
          color: inherit;
          text-decoration: none;
          border-bottom: 1px solid ${hyperlinkUnderlineColor};
          cursor: pointer;
        }
        .codeblock-hyperlink:hover {
          border-bottom: 2px solid ${hyperlinkUnderlineColor};
        }
      `}</style>
    </div>
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
