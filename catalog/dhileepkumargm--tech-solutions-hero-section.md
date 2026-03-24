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
tech-solutions-hero-section.tsx
import React from 'react';
import PropTypes from 'prop-types';

export default function HaosShowcase({
  bg,
  category,
  year,
  solutionLabel,
  solutionValue,
  title,
  subtitle,
  statLabel,
  statValue,
  bottomValue,
  progressPercent,
  logoText,
  onAction,
  className,
}) {
  return (
    <section
      className={`haos-container ${className}`}
      role="region"
      aria-label="Haos Tech Solutions showcase"
    >
      {/* <bg/> slot */}
      {bg && <div className="bg">{bg}</div>}

      <div className="grid-item top-left">
        <span className="label">{category}</span>
        <span className="value">{solutionValue}</span>
      </div>

      <div className="grid-item top-center">
        <span className="label">YEAR</span>
        <span className="value">{year}</span>
      </div>

      <div className="grid-item top-right">
        <span className="label">{solutionLabel}</span>
        <span className="value">{solutionValue}</span>
      </div>

      <div className="grid-item main-content">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <div className="stats-block">
          <span className="label">{statLabel}</span>
          <div className="value">{statValue}</div>
        </div>
      </div>

      <div className="grid-item center-logo">
        <div className="haos-logo">{logoText}</div>
      </div>

      <div className="grid-item bottom-left">
        <div className="stats-value">{bottomValue}</div>
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <div className="grid-item bottom-right">
        <div
          className="action-icon"
          role="button"
          tabIndex={0}
          aria-label="Perform action"
          onClick={onAction}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onAction();
            }
          }}
        />
      </div>
    </section>
  );
}

HaosShowcase.propTypes = {
  bg: PropTypes.node,
  category: PropTypes.string,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  solutionLabel: PropTypes.string,
  solutionValue: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  statLabel: PropTypes.string,
  statValue: PropTypes.string,
  bottomValue: PropTypes.string,
  progressPercent: PropTypes.number,
  logoText: PropTypes.string,
  onAction: PropTypes.func,
  className: PropTypes.string,
};

HaosShowcase.defaultProps = {
  bg: null,
  category: 'CATEGORY',
  year: 'YEAR',
  solutionLabel: 'TECH SOLUTIONS',
  solutionValue: 'AUTOMATION & ROBOTICS',
  title: 'HAOS Tech Solutions',
  subtitle: 'Brand Concept & Identity',
  statLabel: 'HIGH-QUALITY',
  statValue: 'DEVELOPMENT',
  bottomValue: '+2K',
  progressPercent: 60,
  logoText: 'hAOS',
  onAction: () => {},
  className: '',
};


code.demo.1759148358120.tsx
import React from 'react';
import HaosShowcase from '@/components/ui/tech-solutions-hero-section';
import { Component } from '@/components/ui/raycast-animated-blue-background';

export default function App() {
  const handleAction = () => console.log('Action icon clicked');

  return (
    <HaosShowcase
      bg={<Component />}
      bg1={<Component />}
      category="BRANDING"
      year="2024"
      solutionLabel="TECH SOLUTIONS"
      solutionValue="AUTOMATION & ROBOTICS"
      title="HAOS Tech Solutions"
      subtitle="Brand Concept & Identity"
      statLabel="HIGH-QUALITY"
      statValue="DEVELOPMENT"
      bottomValue="+2K"
      progressPercent={60}
      logoText="hAOS"
      onAction={handleAction}
    />
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/tech-solutions-hero-section.tsx
import React from 'react';
import PropTypes from 'prop-types';

export default function HaosShowcase({
  bg,
  category,
  year,
  solutionLabel,
  solutionValue,
  title,
  subtitle,
  statLabel,
  statValue,
  bottomValue,
  progressPercent,
  logoText,
  onAction,
  className,
}) {
  return (
    <section
      className={`haos-container ${className}`}
      role="region"
      aria-label="Haos Tech Solutions showcase"
    >
      {/* <bg/> slot */}
      {bg && <div className="bg">{bg}</div>}

      <div className="grid-item top-left">
        <span className="label">{category}</span>
        <span className="value">{solutionValue}</span>
      </div>

      <div className="grid-item top-center">
        <span className="label">YEAR</span>
        <span className="value">{year}</span>
      </div>

      <div className="grid-item top-right">
        <span className="label">{solutionLabel}</span>
        <span className="value">{solutionValue}</span>
      </div>

      <div className="grid-item main-content">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <div className="stats-block">
          <span className="label">{statLabel}</span>
          <div className="value">{statValue}</div>
        </div>
      </div>

      <div className="grid-item center-logo">
        <div className="haos-logo">{logoText}</div>
      </div>

      <div className="grid-item bottom-left">
        <div className="stats-value">{bottomValue}</div>
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <div className="grid-item bottom-right">
        <div
          className="action-icon"
          role="button"
          tabIndex={0}
          aria-label="Perform action"
          onClick={onAction}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onAction();
            }
          }}
        />
      </div>
    </section>
  );
}

HaosShowcase.propTypes = {
  bg: PropTypes.node,
  category: PropTypes.string,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  solutionLabel: PropTypes.string,
  solutionValue: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  statLabel: PropTypes.string,
  statValue: PropTypes.string,
  bottomValue: PropTypes.string,
  progressPercent: PropTypes.number,
  logoText: PropTypes.string,
  onAction: PropTypes.func,
  className: PropTypes.string,
};

HaosShowcase.defaultProps = {
  bg: null,
  category: 'CATEGORY',
  year: 'YEAR',
  solutionLabel: 'TECH SOLUTIONS',
  solutionValue: 'AUTOMATION & ROBOTICS',
  title: 'HAOS Tech Solutions',
  subtitle: 'Brand Concept & Identity',
  statLabel: 'HIGH-QUALITY',
  statValue: 'DEVELOPMENT',
  bottomValue: '+2K',
  progressPercent: 60,
  logoText: 'hAOS',
  onAction: () => {},
  className: '',
};

```

Install NPM dependencies:
```bash
prop-types
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
