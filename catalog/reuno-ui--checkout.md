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
checkout.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Component = () => {
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim()) {
      setPromoApplied(true);
      // Add your promo code logic here
    }
  };

  return (
    <div className={cn("grid grid-cols-1 gap-0 max-w-md mx-auto")}>
      {/* Cart Section */}
      <div className="w-full bg-orange-50 rounded-t-[19px] shadow-[0px_187px_75px_rgba(0,0,0,0.01),0px_105px_63px_rgba(0,0,0,0.05),0px_47px_47px_rgba(0,0,0,0.09),0px_12px_26px_rgba(0,0,0,0.1)]">
        {/* Title */}
        <div className="w-full h-10 flex items-center pl-5 border-b border-teal-800/75 font-bold text-xs text-black">
          CHECKOUT
        </div>
        
        {/* Steps */}
        <div className="flex flex-col p-5">
          <div className="grid gap-2.5">
            {/* Shipping */}
            <div>
              <span className="text-xs font-semibold text-black mb-2 block">
                SHIPPING
              </span>
              <p className="text-xs font-semibold text-black">
                221B Baker Street, W1U 8ED
              </p>
              <p className="text-xs font-semibold text-black">
                London, United Kingdom
              </p>
            </div>
            
            <hr className="h-px bg-teal-800/75 border-none" />
            
            {/* Payment Method */}
            <div>
              <span className="text-xs font-semibold text-black mb-2 block">
                PAYMENT METHOD
              </span>
              <p className="text-xs font-semibold text-black">Visa</p>
              <p className="text-xs font-semibold text-black">**** **** **** 4243</p>
            </div>
            
            <hr className="h-px bg-teal-800/75 border-none" />
            
            {/* Promo Code */}
            <div>
              <span className="text-xs font-semibold text-black mb-2 block">
                HAVE A PROMO CODE?
              </span>
              <form className="grid grid-cols-[1fr_80px] gap-2.5 p-0" onSubmit={handlePromoSubmit}>
                <input
                  type="text"
                  placeholder="Enter a Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className={cn(
                    "w-auto h-9 pl-3 rounded border border-teal-800 bg-orange-100 outline-none transition-all duration-300 ease-[cubic-bezier(0.15,0.83,0.66,1)]",
                    "focus:border-transparent focus:shadow-[0px_0px_0px_2px_rgb(251,243,228)] focus:bg-stone-400",
                    promoApplied && "bg-green-100 border-green-500"
                  )}
                />
                <button 
                  type="submit"
                  disabled={!promoCode.trim()}
                  className={cn(
                    "flex justify-center items-center px-[18px] py-2.5 gap-2.5 w-full h-9 bg-teal-800/75 shadow-[0px_0.5px_0.5px_#F3D2C9,0px_1px_0.5px_rgba(239,239,239,0.5)] rounded border-0 font-semibold text-xs leading-[15px] text-black transition-all duration-300",
                    "hover:bg-teal-800/90 disabled:opacity-50 disabled:cursor-not-allowed",
                    promoApplied && "bg-green-600/75 hover:bg-green-600/90"
                  )}
                >
                  {promoApplied ? "Applied" : "Apply"}
                </button>
              </form>
              {promoApplied && (
                <p className="text-xs text-green-600 mt-1">Promo code applied successfully!</p>
              )}
            </div>
            
            <hr className="h-px bg-teal-800/75 border-none" />
            
            {/* Payment Details */}
            <div>
              <span className="text-xs font-semibold text-black mb-2 block">
                PAYMENT
              </span>
              <div className="grid grid-cols-[10fr_1fr] p-0 gap-1.5">
                <span className="text-xs font-semibold text-black">Subtotal:</span>
                <span className="text-xs font-semibold text-black ml-auto">$240.00</span>
                <span className="text-xs font-semibold text-black">Shipping:</span>
                <span className="text-xs font-semibold text-black ml-auto">$10.00</span>
                <span className="text-xs font-semibold text-black">Tax:</span>
                <span className="text-xs font-semibold text-black ml-auto">$30.40</span>
                {promoApplied && (
                  <>
                    <span className="text-xs font-semibold text-green-600">Discount:</span>
                    <span className="text-xs font-semibold text-green-600 ml-auto">-$20.00</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Checkout Footer */}
      <div className="w-full bg-orange-50 shadow-[0px_187px_75px_rgba(0,0,0,0.01),0px_105px_63px_rgba(0,0,0,0.05),0px_47px_47px_rgba(0,0,0,0.09),0px_12px_26px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between py-2.5 px-2.5 pl-5 bg-teal-800/50">
          <div className="text-[22px] text-slate-800 font-black">
            ${promoApplied ? "260.40" : "280.40"}
          </div>
          <button 
            className={cn(
              "flex justify-center items-center w-[150px] h-9 bg-teal-800/55 shadow-[0px_0.5px_0.5px_rgba(16,86,82,0.75),0px_1px_0.5px_rgba(16,86,82,0.75)] rounded-[7px] border border-teal-800 text-black text-xs font-semibold transition-all duration-300 ease-[cubic-bezier(0.15,0.83,0.66,1)]",
              "hover:bg-teal-800/70 active:scale-95"
            )}
            onClick={() => {
              // Add checkout logic here
              alert("Proceeding to checkout...");
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

code.demo.1751115205208.tsx
import { Component } from "@/components/ui/checkout";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/checkout.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Component = () => {
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim()) {
      setPromoApplied(true);
      // Add your promo code logic here
    }
  };

  return (
    <div className={cn("grid grid-cols-1 gap-0 max-w-md mx-auto")}>
      {/* Cart Section */}
      <div className="w-full bg-orange-50 rounded-t-[19px] shadow-[0px_187px_75px_rgba(0,0,0,0.01),0px_105px_63px_rgba(0,0,0,0.05),0px_47px_47px_rgba(0,0,0,0.09),0px_12px_26px_rgba(0,0,0,0.1)]">
        {/* Title */}
        <div className="w-full h-10 flex items-center pl-5 border-b border-teal-800/75 font-bold text-xs text-black">
          CHECKOUT
        </div>
        
        {/* Steps */}
        <div className="flex flex-col p-5">
          <div className="grid gap-2.5">
            {/* Shipping */}
            <div>
              <span className="text-xs font-semibold text-black mb-2 block">
                SHIPPING
              </span>
              <p className="text-xs font-semibold text-black">
                221B Baker Street, W1U 8ED
              </p>
              <p className="text-xs font-semibold text-black">
                London, United Kingdom
              </p>
            </div>
            
            <hr className="h-px bg-teal-800/75 border-none" />
            
            {/* Payment Method */}
            <div>
              <span className="text-xs font-semibold text-black mb-2 block">
                PAYMENT METHOD
              </span>
              <p className="text-xs font-semibold text-black">Visa</p>
              <p className="text-xs font-semibold text-black">**** **** **** 4243</p>
            </div>
            
            <hr className="h-px bg-teal-800/75 border-none" />
            
            {/* Promo Code */}
            <div>
              <span className="text-xs font-semibold text-black mb-2 block">
                HAVE A PROMO CODE?
              </span>
              <form className="grid grid-cols-[1fr_80px] gap-2.5 p-0" onSubmit={handlePromoSubmit}>
                <input
                  type="text"
                  placeholder="Enter a Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className={cn(
                    "w-auto h-9 pl-3 rounded border border-teal-800 bg-orange-100 outline-none transition-all duration-300 ease-[cubic-bezier(0.15,0.83,0.66,1)]",
                    "focus:border-transparent focus:shadow-[0px_0px_0px_2px_rgb(251,243,228)] focus:bg-stone-400",
                    promoApplied && "bg-green-100 border-green-500"
                  )}
                />
                <button 
                  type="submit"
                  disabled={!promoCode.trim()}
                  className={cn(
                    "flex justify-center items-center px-[18px] py-2.5 gap-2.5 w-full h-9 bg-teal-800/75 shadow-[0px_0.5px_0.5px_#F3D2C9,0px_1px_0.5px_rgba(239,239,239,0.5)] rounded border-0 font-semibold text-xs leading-[15px] text-black transition-all duration-300",
                    "hover:bg-teal-800/90 disabled:opacity-50 disabled:cursor-not-allowed",
                    promoApplied && "bg-green-600/75 hover:bg-green-600/90"
                  )}
                >
                  {promoApplied ? "Applied" : "Apply"}
                </button>
              </form>
              {promoApplied && (
                <p className="text-xs text-green-600 mt-1">Promo code applied successfully!</p>
              )}
            </div>
            
            <hr className="h-px bg-teal-800/75 border-none" />
            
            {/* Payment Details */}
            <div>
              <span className="text-xs font-semibold text-black mb-2 block">
                PAYMENT
              </span>
              <div className="grid grid-cols-[10fr_1fr] p-0 gap-1.5">
                <span className="text-xs font-semibold text-black">Subtotal:</span>
                <span className="text-xs font-semibold text-black ml-auto">$240.00</span>
                <span className="text-xs font-semibold text-black">Shipping:</span>
                <span className="text-xs font-semibold text-black ml-auto">$10.00</span>
                <span className="text-xs font-semibold text-black">Tax:</span>
                <span className="text-xs font-semibold text-black ml-auto">$30.40</span>
                {promoApplied && (
                  <>
                    <span className="text-xs font-semibold text-green-600">Discount:</span>
                    <span className="text-xs font-semibold text-green-600 ml-auto">-$20.00</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Checkout Footer */}
      <div className="w-full bg-orange-50 shadow-[0px_187px_75px_rgba(0,0,0,0.01),0px_105px_63px_rgba(0,0,0,0.05),0px_47px_47px_rgba(0,0,0,0.09),0px_12px_26px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between py-2.5 px-2.5 pl-5 bg-teal-800/50">
          <div className="text-[22px] text-slate-800 font-black">
            ${promoApplied ? "260.40" : "280.40"}
          </div>
          <button 
            className={cn(
              "flex justify-center items-center w-[150px] h-9 bg-teal-800/55 shadow-[0px_0.5px_0.5px_rgba(16,86,82,0.75),0px_1px_0.5px_rgba(16,86,82,0.75)] rounded-[7px] border border-teal-800 text-black text-xs font-semibold transition-all duration-300 ease-[cubic-bezier(0.15,0.83,0.66,1)]",
              "hover:bg-teal-800/70 active:scale-95"
            )}
            onClick={() => {
              // Add checkout logic here
              alert("Proceeding to checkout...");
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
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
