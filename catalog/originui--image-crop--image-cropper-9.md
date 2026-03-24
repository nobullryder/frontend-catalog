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
image-crop.tsx
"use client"

import { Cropper as CropperPrimitive } from "@origin-space/image-cropper"

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function Cropper({
  className,
  ...props
}: React.ComponentProps<typeof CropperPrimitive.Root>) {
  return (
    <CropperPrimitive.Root
      data-slot="cropper"
      className={cn(
        "relative flex w-full cursor-move touch-none items-center justify-center overflow-hidden focus:outline-none",
        className
      )}
      {...props}
    />
  )
}

function CropperDescription({
  className,
  ...props
}: React.ComponentProps<typeof CropperPrimitive.Description>) {
  return (
    <CropperPrimitive.Description
      data-slot="cropper-description"
      className={cn("sr-only", className)}
      {...props}
    />
  )
}

function CropperImage({
  className,
  ...props
}: React.ComponentProps<typeof CropperPrimitive.Image>) {
  return (
    <CropperPrimitive.Image
      data-slot="cropper-image"
      className={cn(
        "pointer-events-none h-full w-full object-cover",
        className
      )}
      {...props}
    />
  )
}

function CropperCropArea({
  className,
  ...props
}: React.ComponentProps<typeof CropperPrimitive.CropArea>) {
  return (
    <CropperPrimitive.CropArea
      data-slot="cropper-crop-area"
      className={cn(
        "pointer-events-none absolute border-3 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.3)] in-[[data-slot=cropper]:focus-visible]:ring-[3px] in-[[data-slot=cropper]:focus-visible]:ring-white/50",
        className
      )}
      {...props}
    />
  )
}

export { Cropper, CropperDescription, CropperImage, CropperCropArea }


code.demo.1751068913067.tsx
"use client"

import { useCallback, useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Cropper,
  CropperCropArea,
  CropperDescription,
  CropperImage,
} from "@/components/ui/image-crop"

// Define type for pixel crop area
type Area = { x: number; y: number; width: number; height: number }

// --- Start: Copied Helper Functions ---
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener("load", () => resolve(image))
    image.addEventListener("error", (error) => reject(error))
    image.setAttribute("crossOrigin", "anonymous") // Needed for canvas Tainted check
    image.src = url
  })

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  outputWidth: number = pixelCrop.width, // Optional: specify output size
  outputHeight: number = pixelCrop.height
): Promise<Blob | null> {
  try {
    const image = await createImage(imageSrc)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      return null
    }

    // Set canvas size to desired output size
    canvas.width = outputWidth
    canvas.height = outputHeight

    // Draw the cropped image onto the canvas
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      outputWidth, // Draw onto the output size
      outputHeight
    )

    // Convert canvas to blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob)
      }, "image/jpeg") // Specify format and quality if needed
    })
  } catch (error) {
    console.error("Error in getCroppedImg:", error)
    return null
  }
}
// --- End: Copied Helper Functions ---

const ORIGINAL_IMAGE_URL =
  "https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/cropper-10_k24zxk.jpg"

export default function Component() {
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null)

  // Callback to update crop area state
  const handleCropChange = useCallback((pixels: Area | null) => {
    setCroppedAreaPixels(pixels)
  }, [])

  // Function to handle the crop button click
  const handleCrop = async () => {
    if (!croppedAreaPixels) {
      console.error("No crop area selected.")
      return
    }

    try {
      const croppedBlob = await getCroppedImg(
        ORIGINAL_IMAGE_URL,
        croppedAreaPixels
      )
      if (!croppedBlob) {
        throw new Error("Failed to generate cropped image blob.")
      }

      // Create a new object URL
      const newCroppedUrl = URL.createObjectURL(croppedBlob)

      // Revoke the old URL if it exists
      if (croppedImageUrl) {
        URL.revokeObjectURL(croppedImageUrl)
      }

      // Set the new URL
      setCroppedImageUrl(newCroppedUrl)
    } catch (error) {
      console.error("Error during cropping:", error)
      // Optionally: Clear the old image URL on error
      if (croppedImageUrl) {
        URL.revokeObjectURL(croppedImageUrl)
      }
      setCroppedImageUrl(null)
    }
  }

  // Effect for cleaning up the object URL
  useEffect(() => {
    // This is the cleanup function that runs when the component unmounts
    // or when croppedImageUrl changes before the next effect runs.
    const currentUrl = croppedImageUrl
    return () => {
      if (currentUrl && currentUrl.startsWith("blob:")) {
        URL.revokeObjectURL(currentUrl)
        console.log("Revoked URL:", currentUrl) // Optional: for debugging
      }
    }
  }, [croppedImageUrl]) // Dependency array ensures cleanup runs when URL changes

  return (
   <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-background p-8">
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <Cropper
          className="h-64 md:flex-1"
          image={ORIGINAL_IMAGE_URL}
          onCropChange={handleCropChange}
        >
          <CropperDescription />
          <CropperImage />
          <CropperCropArea />
        </Cropper>
        <div className="flex w-26 flex-col gap-4">
          <Button onClick={handleCrop} disabled={!croppedAreaPixels}>
            Crop preview
          </Button>
          {/* Display Area */}
          <div className="aspect-square w-full shrink-0 overflow-hidden rounded-lg border">
            {croppedImageUrl ? (
              <img
                src={croppedImageUrl}
                alt="Cropped result"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="bg-muted text-muted-foreground/80 flex h-full w-full items-center justify-center p-2 text-center text-xs">
                Image preview
              </div>
            )}
          </div>
        </div>
      </div>

      <p
        aria-live="polite"
        role="region"
        className="text-muted-foreground mt-2 text-xs"
      >
        Cropper with image preview ∙{" "}
        <a
          href="https://github.com/origin-space/image-cropper"
          className="hover:text-foreground underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          API
        </a>
      </p>
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/image-crop.tsx
"use client"

import { Cropper as CropperPrimitive } from "@origin-space/image-cropper"

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function Cropper({
  className,
  ...props
}: React.ComponentProps<typeof CropperPrimitive.Root>) {
  return (
    <CropperPrimitive.Root
      data-slot="cropper"
      className={cn(
        "relative flex w-full cursor-move touch-none items-center justify-center overflow-hidden focus:outline-none",
        className
      )}
      {...props}
    />
  )
}

function CropperDescription({
  className,
  ...props
}: React.ComponentProps<typeof CropperPrimitive.Description>) {
  return (
    <CropperPrimitive.Description
      data-slot="cropper-description"
      className={cn("sr-only", className)}
      {...props}
    />
  )
}

function CropperImage({
  className,
  ...props
}: React.ComponentProps<typeof CropperPrimitive.Image>) {
  return (
    <CropperPrimitive.Image
      data-slot="cropper-image"
      className={cn(
        "pointer-events-none h-full w-full object-cover",
        className
      )}
      {...props}
    />
  )
}

function CropperCropArea({
  className,
  ...props
}: React.ComponentProps<typeof CropperPrimitive.CropArea>) {
  return (
    <CropperPrimitive.CropArea
      data-slot="cropper-crop-area"
      className={cn(
        "pointer-events-none absolute border-3 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.3)] in-[[data-slot=cropper]:focus-visible]:ring-[3px] in-[[data-slot=cropper]:focus-visible]:ring-white/50",
        className
      )}
      {...props}
    />
  )
}

export { Cropper, CropperDescription, CropperImage, CropperCropArea }

```

Install NPM dependencies:
```bash
@origin-space/image-cropper, clsx, tailwind-merge
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
