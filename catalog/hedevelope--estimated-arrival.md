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
estimated-arrival.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface EstimatedDateBadgeProps {
    estimatedDate?: string;
    dayOfWeek?: string;
    deliveryType?: string;
}

const EstimatedDateBadge: React.FC<EstimatedDateBadgeProps> = ({
    estimatedDate = 'September 28',
    dayOfWeek = 'Friday delivery',
    deliveryType = 'Free',
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleDetails = (): void => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="slide-in">
            <div className="badge-wrapper">
                <div className="badge-container">
                    <div
                        className="badge-card"
                        onClick={toggleDetails}
                    >
                        <div className="shimmer-overlay"></div>

                        <div className="badge-content">
                            <div className="icon-container">
                                <div className="icon-wrapper">
                                    <svg className="clock-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div className="text-content">
                                <p className="label">Estimated Arrival</p>
                                <h3 className="date">{estimatedDate}</h3>
                                <p className="day">{dayOfWeek}</p>
                            </div>

                            <div className="badge-pill-container">
                                <div className="badge-pill">
                                    <p className="badge-text">{deliveryType}</p>
                                </div>
                                <svg
                                    className={`arrow-icon ${isOpen ? 'open' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <svg className="border-svg">
                        <rect
                            x="1"
                            y="1"
                            width="calc(100% - 2px)"
                            height="calc(100% - 2px)"
                            rx="16"
                            ry="16"
                            fill="none"
                            stroke="#db5d34"
                            strokeWidth="2"
                            className="sliding-line"
                            pathLength="1"
                        />
                    </svg>
                </div>

                <div className={`details-section ${isOpen ? 'open' : ''}`}>
                    <div className="details-card">
                        <div className="details-content">
                            <div className="detail-item">
                                <h4 className="detail-title">
                                    <span className="detail-number">1</span>
                                    Delivery Time
                                </h4>
                                <p className="detail-text">
                                    Orders are usually delivered within 7 working days.
                                </p>
                            </div>

                            <div className="detail-item detail-item-2">
                                <h4 className="detail-title">
                                    <span className="detail-number">2</span>
                                    Assembly
                                </h4>
                                <p className="detail-text">
                                    Products are sent unassembled. All necessary parts and assembly instructions are included in the package.
                                </p>
                            </div>

                            <div className="detail-item detail-item-3">
                                <h4 className="detail-title">
                                    <span className="detail-number">3</span>
                                    Technical Support
                                </h4>
                                <p className="detail-text">
                                    If needed, you can contact our technical team at <strong>+1 555 55 5</strong> phone number.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EstimatedDateBadge;

code.demo.1765013313353.tsx
import EstimatedDateBadge from "@/components/ui/estimated-arrival";

export default function DemoOne() {
  return <EstimatedDateBadge />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/estimated-arrival.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface EstimatedDateBadgeProps {
    estimatedDate?: string;
    dayOfWeek?: string;
    deliveryType?: string;
}

const EstimatedDateBadge: React.FC<EstimatedDateBadgeProps> = ({
    estimatedDate = 'September 28',
    dayOfWeek = 'Friday delivery',
    deliveryType = 'Free',
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleDetails = (): void => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="slide-in">
            <div className="badge-wrapper">
                <div className="badge-container">
                    <div
                        className="badge-card"
                        onClick={toggleDetails}
                    >
                        <div className="shimmer-overlay"></div>

                        <div className="badge-content">
                            <div className="icon-container">
                                <div className="icon-wrapper">
                                    <svg className="clock-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div className="text-content">
                                <p className="label">Estimated Arrival</p>
                                <h3 className="date">{estimatedDate}</h3>
                                <p className="day">{dayOfWeek}</p>
                            </div>

                            <div className="badge-pill-container">
                                <div className="badge-pill">
                                    <p className="badge-text">{deliveryType}</p>
                                </div>
                                <svg
                                    className={`arrow-icon ${isOpen ? 'open' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <svg className="border-svg">
                        <rect
                            x="1"
                            y="1"
                            width="calc(100% - 2px)"
                            height="calc(100% - 2px)"
                            rx="16"
                            ry="16"
                            fill="none"
                            stroke="#db5d34"
                            strokeWidth="2"
                            className="sliding-line"
                            pathLength="1"
                        />
                    </svg>
                </div>

                <div className={`details-section ${isOpen ? 'open' : ''}`}>
                    <div className="details-card">
                        <div className="details-content">
                            <div className="detail-item">
                                <h4 className="detail-title">
                                    <span className="detail-number">1</span>
                                    Delivery Time
                                </h4>
                                <p className="detail-text">
                                    Orders are usually delivered within 7 working days.
                                </p>
                            </div>

                            <div className="detail-item detail-item-2">
                                <h4 className="detail-title">
                                    <span className="detail-number">2</span>
                                    Assembly
                                </h4>
                                <p className="detail-text">
                                    Products are sent unassembled. All necessary parts and assembly instructions are included in the package.
                                </p>
                            </div>

                            <div className="detail-item detail-item-3">
                                <h4 className="detail-title">
                                    <span className="detail-number">3</span>
                                    Technical Support
                                </h4>
                                <p className="detail-text">
                                    If needed, you can contact our technical team at <strong>+1 555 55 5</strong> phone number.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EstimatedDateBadge;
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
