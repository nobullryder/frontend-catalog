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
spend-migrator.tsx
// component.tsx
import * as React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, ArrowRight } from "lucide-react";
import NumberFlow from "@number-flow/react";

export type SpendMigratorSite = {
  name: string;
  logo: string;
  price: number;
};

export interface SpendMigratorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  sites: SpendMigratorSite[];
}

const CreditCard = ({ progress }: { progress: number }) => {
  return (
    <motion.div className="relative h-16 w-36 overflow-hidden rounded-lg bg-black/10">
      <div className="relative z-10 flex size-full flex-col items-center justify-center gap-1 py-1 px-3">
        <div className="flex w-full items-center justify-between">
          <span className="text-[10px] font-medium text-white">05/26</span>
          <span className="text-[10px] font-medium text-white">111</span>
        </div>
        <span className="w-full text-left text-[10px] font-medium text-white">
          4242 4242 4242 4242
        </span>
      </div>
      <motion.div
        className="absolute top-0 bottom-0 left-0 w-0 bg-black"
        style={{
          width: `${progress}%`,
          transition: "width 0.3s ease-out",
        }}
      />
    </motion.div>
  );
};

const SpendMigrator = React.forwardRef<HTMLDivElement, SpendMigratorProps>(
  ({ sites, className, ...props }, ref) => {
    const [selectedSites, setSelectedSites] = useState<SpendMigratorSite[]>([]);
    const [openModal, setOpenModal] = useState(false);

    const totalSpend = sites.map((site) => site.price).reduce((a, b) => a + b, 0);

    const toggleSite = (site: SpendMigratorSite) => {
      setSelectedSites((prev) =>
        prev.includes(site)
          ? prev.filter((s) => s !== site)
          : [...prev, site]
      );
    };

    const progress = (selectedSites.length / sites.length) * 100;
    const currentSpend = selectedSites
      .map((site) => site.price)
      .reduce((a, b) => a + b, 0);

    return (
      <div
        ref={ref}
        className={`relative w-full max-w-2xl ${className}`}
        {...props}
      >
        <motion.div
          layoutId="modal"
          className="relative w-full space-y-5 overflow-hidden rounded-3xl border bg-white p-6 shadow-lg"
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col items-start">
              <h1 className="text-lg font-medium text-gray-900">
                Select sites to change your card
              </h1>
              <p className="text-gray-500">
                We found {sites.length} sites based on your browser history
              </p>
            </div>
            <button
              onClick={() =>
                setSelectedSites(selectedSites.length === 0 ? sites : [])
              }
              className="shrink-0 text-gray-500 hover:text-gray-700"
            >
              {selectedSites.length === 0 ? "Select All" : "Unselect All"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {sites.map((site) => (
              <motion.div key={site.name} layoutId={`site-${site.name}`}>
                <div
                  className={`relative cursor-pointer rounded-xl border-2 bg-white p-4 transition-all duration-300 ease-in-out ${
                    selectedSites.includes(site)
                      ? "border-gray-900"
                      : "border-gray-200"
                  }`}
                  onClick={() => toggleSite(site)}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <img
                      src={site.logo}
                      alt={`${site.name} logo`}
                      className="h-12 w-12 object-contain"
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {site.name}
                    </span>
                  </div>
                  <AnimatePresence>
                    {selectedSites.includes(site) && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black"
                      >
                        <div className="h-2 w-2 rounded-full bg-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            layout
            className="flex w-full flex-col items-center justify-between gap-2 md:flex-row"
          >
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-medium text-gray-900">
                  Estimated yearly spend
                </span>
                <HelpCircle className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-md font-bold text-gray-900 md:text-2xl">
                  <NumberFlow
                    value={currentSpend}
                    locales="en-US"
                    format={{ style: "currency", currency: "USD" }}
                  />
                </span>
                <motion.span
                  layout
                  className="text-md font-bold text-gray-400 md:text-2xl"
                >
                  / ${totalSpend}
                </motion.span>
              </div>
            </div>
            <CreditCard progress={progress} />
          </motion.div>

          <motion.button
            layout
            className={`flex w-full items-center justify-center space-x-2 rounded-full py-3 font-medium text-white ${
              selectedSites.length > 0
                ? "bg-black"
                : "cursor-not-allowed bg-gray-200"
            }`}
            disabled={selectedSites.length === 0}
            onClick={() => setOpenModal(true)}
          >
            <span>Migrate my spend</span>
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </motion.div>
        <AnimatePresence>
          {openModal && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <motion.div
                layoutId="modal"
                className="relative w-full cursor-pointer space-y-5 overflow-hidden rounded-3xl border bg-white p-6 shadow-lg"
                onClick={() => setOpenModal(false)}
              >
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {sites.map((site) => (
                    <motion.div
                      key={site.name}
                      layoutId={`site-${site.name}`}
                    >
                      <div
                        className={`relative rounded-xl border-2 bg-white p-4 transition-all duration-300 ease-in-out ${
                          selectedSites.includes(site)
                            ? "border-gray-900"
                            : "border-gray-200 opacity-10"
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <img
                            src={site.logo}
                            alt={`${site.name} logo`}
                            className="h-12 w-12 object-contain"
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {site.name}
                          </span>
                        </div>
                        {selectedSites.includes(site) && (
                          <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black">
                            <div className="h-2 w-2 rounded-full bg-white" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

SpendMigrator.displayName = "SpendMigrator";

export default SpendMigrator;

code.demo.1749421174807.tsx
// demo.tsx
import * as React from "react";
import SpendMigrator, { type SpendMigratorSite } from "@/components/ui/spend-migrator";

const SpendMigratorDemo = () => {
  const sites: SpendMigratorSite[] = [
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/240px-Microsoft_logo.svg.png",
      price: 1341.04,
    },
    {
      name: "Spotify",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/240px-Spotify_icon.svg.png",
      price: 945.23,
    },
    {
      name: "Meta",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/240px-Meta_Platforms_Inc._logo.svg.png",
      price: 789.91,
    },
    {
      name: "Netflix",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/240px-Netflix_2015_logo.svg.png",
      price: 1059.33,
    },
    {
      name: "X",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/langfr-90px-X_logo_2023.svg.png",
      price: 1904.48,
    },
    {
      name: "LinkedIn",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/240px-LinkedIn_logo_initials.png",
      price: 1200.76,
    },
    {
      name: "Dropbox",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dropbox_Icon.svg/240px-Dropbox_Icon.svg.png",
      price: 587.55,
    },
    {
      name: "Airbnb",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/240px-Airbnb_Logo_B%C3%A9lo.svg.png",
      price: 1873.49,
    },
  ];

  return (
    <div className="flex w-full items-center justify-center p-4">
      <SpendMigrator sites={sites} />
    </div>
  );
};

export { SpendMigratorDemo as DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/spend-migrator.tsx
// component.tsx
import * as React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, ArrowRight } from "lucide-react";
import NumberFlow from "@number-flow/react";

export type SpendMigratorSite = {
  name: string;
  logo: string;
  price: number;
};

export interface SpendMigratorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  sites: SpendMigratorSite[];
}

const CreditCard = ({ progress }: { progress: number }) => {
  return (
    <motion.div className="relative h-16 w-36 overflow-hidden rounded-lg bg-black/10">
      <div className="relative z-10 flex size-full flex-col items-center justify-center gap-1 py-1 px-3">
        <div className="flex w-full items-center justify-between">
          <span className="text-[10px] font-medium text-white">05/26</span>
          <span className="text-[10px] font-medium text-white">111</span>
        </div>
        <span className="w-full text-left text-[10px] font-medium text-white">
          4242 4242 4242 4242
        </span>
      </div>
      <motion.div
        className="absolute top-0 bottom-0 left-0 w-0 bg-black"
        style={{
          width: `${progress}%`,
          transition: "width 0.3s ease-out",
        }}
      />
    </motion.div>
  );
};

const SpendMigrator = React.forwardRef<HTMLDivElement, SpendMigratorProps>(
  ({ sites, className, ...props }, ref) => {
    const [selectedSites, setSelectedSites] = useState<SpendMigratorSite[]>([]);
    const [openModal, setOpenModal] = useState(false);

    const totalSpend = sites.map((site) => site.price).reduce((a, b) => a + b, 0);

    const toggleSite = (site: SpendMigratorSite) => {
      setSelectedSites((prev) =>
        prev.includes(site)
          ? prev.filter((s) => s !== site)
          : [...prev, site]
      );
    };

    const progress = (selectedSites.length / sites.length) * 100;
    const currentSpend = selectedSites
      .map((site) => site.price)
      .reduce((a, b) => a + b, 0);

    return (
      <div
        ref={ref}
        className={`relative w-full max-w-2xl ${className}`}
        {...props}
      >
        <motion.div
          layoutId="modal"
          className="relative w-full space-y-5 overflow-hidden rounded-3xl border bg-white p-6 shadow-lg"
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col items-start">
              <h1 className="text-lg font-medium text-gray-900">
                Select sites to change your card
              </h1>
              <p className="text-gray-500">
                We found {sites.length} sites based on your browser history
              </p>
            </div>
            <button
              onClick={() =>
                setSelectedSites(selectedSites.length === 0 ? sites : [])
              }
              className="shrink-0 text-gray-500 hover:text-gray-700"
            >
              {selectedSites.length === 0 ? "Select All" : "Unselect All"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {sites.map((site) => (
              <motion.div key={site.name} layoutId={`site-${site.name}`}>
                <div
                  className={`relative cursor-pointer rounded-xl border-2 bg-white p-4 transition-all duration-300 ease-in-out ${
                    selectedSites.includes(site)
                      ? "border-gray-900"
                      : "border-gray-200"
                  }`}
                  onClick={() => toggleSite(site)}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <img
                      src={site.logo}
                      alt={`${site.name} logo`}
                      className="h-12 w-12 object-contain"
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {site.name}
                    </span>
                  </div>
                  <AnimatePresence>
                    {selectedSites.includes(site) && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black"
                      >
                        <div className="h-2 w-2 rounded-full bg-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            layout
            className="flex w-full flex-col items-center justify-between gap-2 md:flex-row"
          >
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-medium text-gray-900">
                  Estimated yearly spend
                </span>
                <HelpCircle className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-md font-bold text-gray-900 md:text-2xl">
                  <NumberFlow
                    value={currentSpend}
                    locales="en-US"
                    format={{ style: "currency", currency: "USD" }}
                  />
                </span>
                <motion.span
                  layout
                  className="text-md font-bold text-gray-400 md:text-2xl"
                >
                  / ${totalSpend}
                </motion.span>
              </div>
            </div>
            <CreditCard progress={progress} />
          </motion.div>

          <motion.button
            layout
            className={`flex w-full items-center justify-center space-x-2 rounded-full py-3 font-medium text-white ${
              selectedSites.length > 0
                ? "bg-black"
                : "cursor-not-allowed bg-gray-200"
            }`}
            disabled={selectedSites.length === 0}
            onClick={() => setOpenModal(true)}
          >
            <span>Migrate my spend</span>
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </motion.div>
        <AnimatePresence>
          {openModal && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <motion.div
                layoutId="modal"
                className="relative w-full cursor-pointer space-y-5 overflow-hidden rounded-3xl border bg-white p-6 shadow-lg"
                onClick={() => setOpenModal(false)}
              >
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {sites.map((site) => (
                    <motion.div
                      key={site.name}
                      layoutId={`site-${site.name}`}
                    >
                      <div
                        className={`relative rounded-xl border-2 bg-white p-4 transition-all duration-300 ease-in-out ${
                          selectedSites.includes(site)
                            ? "border-gray-900"
                            : "border-gray-200 opacity-10"
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <img
                            src={site.logo}
                            alt={`${site.name} logo`}
                            className="h-12 w-12 object-contain"
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {site.name}
                          </span>
                        </div>
                        {selectedSites.includes(site) && (
                          <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black">
                            <div className="h-2 w-2 rounded-full bg-white" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

SpendMigrator.displayName = "SpendMigrator";

export default SpendMigrator;
```

Install NPM dependencies:
```bash
lucide-react, framer-motion, @number-flow/react
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
