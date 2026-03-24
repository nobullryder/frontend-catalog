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
qr-code-generator.tsx
"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckIcon, DownloadIcon } from "lucide-react"

export interface QRCodeResult {
  data: string
  size: number
  output: string 
}

type QRCodeDisplayProps = {
  data?: QRCodeResult | null
  isLoading?: boolean
  error?: string | null
}

export function QRCodeDisplay({ data, isLoading, error }: QRCodeDisplayProps) {
  const [downloading, setDownloading] = React.useState(false)
  const [downloaded, setDownloaded] = React.useState(false)
  const [localError, setLocalError] = React.useState<string | null>(null)

  const handleDownload = async () => {
    if (!data?.output) return
    setDownloading(true)
    setLocalError(null)
    try {
      const response = await fetch(data.output)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "qrcode.png"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 1200)
    } catch (e) {
      console.error("Failed to download QR code:", e)
      setLocalError("Failed to download. Please try again.")
    } finally {
      setDownloading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>QR Code</CardTitle>
        <CardDescription>
          {data?.data
            ? data.data.length > 50
              ? `${data.data.slice(0, 50)}...`
              : data.data
            : "Generate or pass a QR code result"}
        </CardDescription>
      </CardHeader>

      {/* Loading */}
      {isLoading && (
        <CardContent className="flex flex-col items-center gap-4">
          <div className="w-full max-w-[300px] aspect-square rounded-lg bg-muted animate-pulse" />
          <div className="h-4 w-28 bg-muted rounded animate-pulse" />
          <Button disabled className="w-full">
            Download PNG
          </Button>
        </CardContent>
      )}

      {/* Error */}
      {!isLoading && (error || localError) && (
        <CardContent>
          <div className="text-sm text-red-600" role="status" aria-live="assertive">
            {error || localError}
          </div>
        </CardContent>
      )}

      {/* Empty */}
      {!isLoading && !error && !localError && !data && (
        <CardContent className="text-sm text-muted-foreground">
          No data yet. Pass a <code>QRCodeResult</code> to render the preview.
        </CardContent>
      )}

      {/* Data */}
      {!isLoading && !error && !localError && data && (
        <CardContent className="flex flex-col items-center gap-4">
          <div
            className="w-full rounded-lg bg-white p-4"
            style={{ maxWidth: `${data.size}px` }}
          >
            <img
              src={data.output}
              alt={
                data.data.length > 50
                  ? `QR code for '${data.data.slice(0, 50)}...'`
                  : `QR code for '${data.data}'`
              }
              width={data.size}
              height={data.size}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          </div>
          <div className="text-sm text-muted-foreground">Size: {data.size}px</div>
          <Button
            onClick={handleDownload}
            disabled={downloading || !data.output}
            className="w-full"
            aria-busy={downloading}
            aria-live="polite"
            aria-label={
              downloaded
                ? "QR code saved"
                : downloading
                ? "Downloading QR code"
                : "Download QR code as PNG"
            }
          >
            {downloaded ? (
              <>
                <CheckIcon className="mr-1.5" />
                Saved
              </>
            ) : (
              <>
                <DownloadIcon className="mr-1.5" />
                {downloading ? "Downloading..." : "Download PNG"}
              </>
            )}
          </Button>
        </CardContent>
      )}
    </Card>
  )
}

export default QRCodeDisplay


code.demo.1757008959225.tsx
"use client"

import * as React from "react"
import QRCodeDisplay, { type QRCodeResult } from "@/components/ui/qr-code-generator"

function makePlaceholderDataURL(size: number): string {
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")!
  ctx.fillStyle = "#fff"
  ctx.fillRect(0, 0, size, size)

  const cell = Math.max(2, Math.floor(size / 28))
  for (let y = 0; y < size; y += cell) {
    for (let x = 0; x < size; x += cell) {
      const on = ((x / cell) ^ (y / cell)) % 3 === 0
      if (on) {
        ctx.fillStyle = "#000"
        ctx.fillRect(x, y, cell, cell)
      }
    }
  }
  const marker = (ox: number, oy: number) => {
    ctx.fillStyle = "#000"
    ctx.fillRect(ox, oy, 7 * cell, 7 * cell)
    ctx.fillStyle = "#fff"
    ctx.fillRect(ox + cell, oy + cell, 5 * cell, 5 * cell)
    ctx.fillStyle = "#000"
    ctx.fillRect(ox + 2 * cell, oy + 2 * cell, 3 * cell, 3 * cell)
  }
  marker(cell, cell)
  marker(size - 8 * cell, cell)
  marker(cell, size - 8 * cell)

  return canvas.toDataURL("image/png")
}

export default function Demo() {
  const [qr, setQr] = React.useState<QRCodeResult | null>(null)

  React.useEffect(() => {
    const size = 300
    const output = makePlaceholderDataURL(size)
    setQr({
      data: "https://example.com?utm=demo",
      size,
      output,
    })
  }, [])

  return <QRCodeDisplay data={qr} />
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/qr-code-generator.tsx
"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckIcon, DownloadIcon } from "lucide-react"

export interface QRCodeResult {
  data: string
  size: number
  output: string 
}

type QRCodeDisplayProps = {
  data?: QRCodeResult | null
  isLoading?: boolean
  error?: string | null
}

export function QRCodeDisplay({ data, isLoading, error }: QRCodeDisplayProps) {
  const [downloading, setDownloading] = React.useState(false)
  const [downloaded, setDownloaded] = React.useState(false)
  const [localError, setLocalError] = React.useState<string | null>(null)

  const handleDownload = async () => {
    if (!data?.output) return
    setDownloading(true)
    setLocalError(null)
    try {
      const response = await fetch(data.output)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "qrcode.png"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 1200)
    } catch (e) {
      console.error("Failed to download QR code:", e)
      setLocalError("Failed to download. Please try again.")
    } finally {
      setDownloading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>QR Code</CardTitle>
        <CardDescription>
          {data?.data
            ? data.data.length > 50
              ? `${data.data.slice(0, 50)}...`
              : data.data
            : "Generate or pass a QR code result"}
        </CardDescription>
      </CardHeader>

      {/* Loading */}
      {isLoading && (
        <CardContent className="flex flex-col items-center gap-4">
          <div className="w-full max-w-[300px] aspect-square rounded-lg bg-muted animate-pulse" />
          <div className="h-4 w-28 bg-muted rounded animate-pulse" />
          <Button disabled className="w-full">
            Download PNG
          </Button>
        </CardContent>
      )}

      {/* Error */}
      {!isLoading && (error || localError) && (
        <CardContent>
          <div className="text-sm text-red-600" role="status" aria-live="assertive">
            {error || localError}
          </div>
        </CardContent>
      )}

      {/* Empty */}
      {!isLoading && !error && !localError && !data && (
        <CardContent className="text-sm text-muted-foreground">
          No data yet. Pass a <code>QRCodeResult</code> to render the preview.
        </CardContent>
      )}

      {/* Data */}
      {!isLoading && !error && !localError && data && (
        <CardContent className="flex flex-col items-center gap-4">
          <div
            className="w-full rounded-lg bg-white p-4"
            style={{ maxWidth: `${data.size}px` }}
          >
            <img
              src={data.output}
              alt={
                data.data.length > 50
                  ? `QR code for '${data.data.slice(0, 50)}...'`
                  : `QR code for '${data.data}'`
              }
              width={data.size}
              height={data.size}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          </div>
          <div className="text-sm text-muted-foreground">Size: {data.size}px</div>
          <Button
            onClick={handleDownload}
            disabled={downloading || !data.output}
            className="w-full"
            aria-busy={downloading}
            aria-live="polite"
            aria-label={
              downloaded
                ? "QR code saved"
                : downloading
                ? "Downloading QR code"
                : "Download QR code as PNG"
            }
          >
            {downloaded ? (
              <>
                <CheckIcon className="mr-1.5" />
                Saved
              </>
            ) : (
              <>
                <DownloadIcon className="mr-1.5" />
                {downloading ? "Downloading..." : "Download PNG"}
              </>
            )}
          </Button>
        </CardContent>
      )}
    </Card>
  )
}

export default QRCodeDisplay

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
