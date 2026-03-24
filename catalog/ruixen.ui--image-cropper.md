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
image-cropper.tsx
"use client";

import * as React from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// /lib/cropImage.ts
export async function getCroppedImg(imageSrc: string, pixelCrop: any): Promise<string> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");

  ctx!.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob!);
      resolve(url);
    }, "image/png");
  });
}


export default function ImageCropper() {
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<any>(null);
  const [aspect, setAspect] = React.useState<number | undefined>(1);
  const [croppedImage, setCroppedImage] = React.useState<string | null>(null);

  const onCropComplete = React.useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setCroppedImage(null);
      };
    }
  };

  const handleCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const cropped = await getCroppedImg(imageSrc, croppedAreaPixels);
    setCroppedImage(cropped);
  };

  return (
    <Card className="p-3 w-xl mx-auto">
      <CardHeader className="p-2">
        <CardTitle>Image Cropper</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-2">
        <Input type="file" accept="image/*" onChange={handleFileChange} />

        {imageSrc && (
          <div className="relative w-full h-[400px] bg-gray-100">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        )}

        {imageSrc && (
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-2">
              <span>Zoom:</span>
              <Slider
                value={[zoom]}
                onValueChange={(v) => setZoom(v[0])}
                min={1}
                max={3}
                step={0.01}
              />
            </div>

            <div className="flex items-center gap-2">
              <span>Aspect Ratio:</span>
              <Select value={aspect?.toString()} onValueChange={(v) => setAspect(Number(v))}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1:1 (Square)</SelectItem>
                  <SelectItem value={(4 / 3).toString()}>4:3</SelectItem>
                  <SelectItem value={(16 / 9).toString()}>16:9</SelectItem>
                  <SelectItem value="undefined">Free</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="mt-2" onClick={handleCrop}>
              Crop Image
            </Button>
          </div>
        )}

        {croppedImage && (
          <div className="flex flex-col gap-2 mt-4">
            <h4 className="font-medium">Cropped Image Preview:</h4>
            <img src={croppedImage} alt="Cropped" className="max-w-full rounded-md border" />
            <Button
              as="a"
              href={croppedImage}
              download="cropped.png"
              variant="outline"
              className="mt-2"
            >
              Download
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


code.demo.1757761300922.tsx
import ImageCropper from "@/components/ui/image-cropper";

export default function DemoOne() {
  return <ImageCropper />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/image-cropper.tsx
"use client";

import * as React from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// /lib/cropImage.ts
export async function getCroppedImg(imageSrc: string, pixelCrop: any): Promise<string> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");

  ctx!.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob!);
      resolve(url);
    }, "image/png");
  });
}


export default function ImageCropper() {
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<any>(null);
  const [aspect, setAspect] = React.useState<number | undefined>(1);
  const [croppedImage, setCroppedImage] = React.useState<string | null>(null);

  const onCropComplete = React.useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setCroppedImage(null);
      };
    }
  };

  const handleCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const cropped = await getCroppedImg(imageSrc, croppedAreaPixels);
    setCroppedImage(cropped);
  };

  return (
    <Card className="p-3 w-xl mx-auto">
      <CardHeader className="p-2">
        <CardTitle>Image Cropper</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-2">
        <Input type="file" accept="image/*" onChange={handleFileChange} />

        {imageSrc && (
          <div className="relative w-full h-[400px] bg-gray-100">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        )}

        {imageSrc && (
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-2">
              <span>Zoom:</span>
              <Slider
                value={[zoom]}
                onValueChange={(v) => setZoom(v[0])}
                min={1}
                max={3}
                step={0.01}
              />
            </div>

            <div className="flex items-center gap-2">
              <span>Aspect Ratio:</span>
              <Select value={aspect?.toString()} onValueChange={(v) => setAspect(Number(v))}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1:1 (Square)</SelectItem>
                  <SelectItem value={(4 / 3).toString()}>4:3</SelectItem>
                  <SelectItem value={(16 / 9).toString()}>16:9</SelectItem>
                  <SelectItem value="undefined">Free</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="mt-2" onClick={handleCrop}>
              Crop Image
            </Button>
          </div>
        )}

        {croppedImage && (
          <div className="flex flex-col gap-2 mt-4">
            <h4 className="font-medium">Cropped Image Preview:</h4>
            <img src={croppedImage} alt="Cropped" className="max-w-full rounded-md border" />
            <Button
              as="a"
              href={croppedImage}
              download="cropped.png"
              variant="outline"
              className="mt-2"
            >
              Download
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

```

Install NPM dependencies:
```bash
react-easy-crop
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
