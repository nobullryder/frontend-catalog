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
upload-ui.tsx
// src/components/ui/component.tsx
'use client';

import * as React from 'react';
import { X, ArrowDownCircle, CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx';

interface UploadCardProps {
  status: 'uploading' | 'success' | 'error';
  progress?: number; // Only relevant for 'uploading' status
  title: string;
  description: string;
  primaryButtonText: string;
  onPrimaryButtonClick?: () => void;
  secondaryButtonText?: string;
  onSecondaryButtonClick?: () => void;
}

export const UploadCard: React.FC<UploadCardProps> = ({
  status,
  progress,
  title,
  description,
  primaryButtonText,
  onPrimaryButtonClick,
  secondaryButtonText,
  onSecondaryButtonClick,
}) => {
  const renderIcon = () => {
    switch (status) {
      case 'uploading':
        return <ArrowDownCircle className="icon" />;
      case 'success':
        return <CheckCircle className="icon" />;
      case 'error':
        return <XCircle className="icon" />;
      default:
        return null;
    }
  };

  return (
    <div className={clsx('card', {
      'blue': status === 'uploading',
      'green': status === 'success',
      'red': status === 'error',
    })}>
      <div className="card-header">
        <X className="close" />
      </div>
      <div className="card-body">
        {renderIcon()}
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
          {status === 'uploading' && (
            <div className="progress">
              <div>
                <span>{progress}%</span>
                <div className="progress-bar" style={{ '--progress-width': `${progress}%` } as React.CSSProperties}></div>
              </div>
              <a href="#" className="btn-first" onClick={onPrimaryButtonClick}>
                {primaryButtonText}
              </a>
            </div>
          )}
        </div>
      </div>
      {(status === 'success' || status === 'error') && (
        <div className="progress">
          <a href="#" className="btn-first" onClick={onPrimaryButtonClick}>
            {primaryButtonText}
          </a>
          {secondaryButtonText && (
            <a href="#" className="btn-second" onClick={onSecondaryButtonClick}>
              {secondaryButtonText}
            </a>
          )}
        </div>
      )}
    </div>
  );
};

code.demo.1753894766929.tsx
// src/demos/default.tsx
'use client';

import { UploadCard } from '@/components/ui/upload-ui';
import React from 'react';

const DefaultDemo: React.FC = () => {
  return (
    <section>
      <UploadCard
        status="uploading"
        progress={68}
        title="Just a minute..."
        description="Your file is uploading right now. Just give us a second to finish your upload."
        primaryButtonText="Cancel"
        onPrimaryButtonClick={() => console.log('Cancel upload')}
      />
      <UploadCard
        status="success"
        title="Your file was uploaded!"
        description="Your file was succesfully uploaded. You can copy the link to your clipboard."
        primaryButtonText="Copy Link"
        onPrimaryButtonClick={() => console.log('Copy Link')}
        secondaryButtonText="Done"
        onSecondaryButtonClick={() => console.log('Done')}
      />
      <UploadCard
        status="error"
        title="We are so sorry!"
        description="There was and error and your file could not be uploaded. Would you like to try again?"
        primaryButtonText="Retry"
        onPrimaryButtonClick={() => console.log('Retry upload')}
        secondaryButtonText="Cancel"
        onSecondaryButtonClick={() => console.log('Cancel error')}
      />
    </section>
  );
};

export default DefaultDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/upload-ui.tsx
// src/components/ui/component.tsx
'use client';

import * as React from 'react';
import { X, ArrowDownCircle, CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx';

interface UploadCardProps {
  status: 'uploading' | 'success' | 'error';
  progress?: number; // Only relevant for 'uploading' status
  title: string;
  description: string;
  primaryButtonText: string;
  onPrimaryButtonClick?: () => void;
  secondaryButtonText?: string;
  onSecondaryButtonClick?: () => void;
}

export const UploadCard: React.FC<UploadCardProps> = ({
  status,
  progress,
  title,
  description,
  primaryButtonText,
  onPrimaryButtonClick,
  secondaryButtonText,
  onSecondaryButtonClick,
}) => {
  const renderIcon = () => {
    switch (status) {
      case 'uploading':
        return <ArrowDownCircle className="icon" />;
      case 'success':
        return <CheckCircle className="icon" />;
      case 'error':
        return <XCircle className="icon" />;
      default:
        return null;
    }
  };

  return (
    <div className={clsx('card', {
      'blue': status === 'uploading',
      'green': status === 'success',
      'red': status === 'error',
    })}>
      <div className="card-header">
        <X className="close" />
      </div>
      <div className="card-body">
        {renderIcon()}
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
          {status === 'uploading' && (
            <div className="progress">
              <div>
                <span>{progress}%</span>
                <div className="progress-bar" style={{ '--progress-width': `${progress}%` } as React.CSSProperties}></div>
              </div>
              <a href="#" className="btn-first" onClick={onPrimaryButtonClick}>
                {primaryButtonText}
              </a>
            </div>
          )}
        </div>
      </div>
      {(status === 'success' || status === 'error') && (
        <div className="progress">
          <a href="#" className="btn-first" onClick={onPrimaryButtonClick}>
            {primaryButtonText}
          </a>
          {secondaryButtonText && (
            <a href="#" className="btn-second" onClick={onSecondaryButtonClick}>
              {secondaryButtonText}
            </a>
          )}
        </div>
      )}
    </div>
  );
};
```

Install NPM dependencies:
```bash
lucide-react, clsx
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
