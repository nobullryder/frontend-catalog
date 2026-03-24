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
number-pad.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Delete } from 'lucide-react';
import { cn } from '@/lib/utils';

export type NumberPadType = 'currency' | 'phone' | 'decimal' | 'integer' | 'percentage' | 'pin' | 'time' | 'custom';

export interface NumberPadProps {
  title: string;
  onValueChange: (value: string) => void;
  type?: NumberPadType;
  maxLength?: number;
  currency?: string;
  locale?: string;
  countryCode?: string;
  maskInput?: boolean;
  customPattern?: RegExp;
  customFormatter?: (value: string) => string;
  placeholder?: string;
  children?: React.ReactNode;
}

interface NumberPadContentProps extends Omit<NumberPadProps, 'children'> {
  onClose: () => void;
}

export const formatters = {
  currency: (value: string, currency = 'USD', locale = 'en-US') => {
    if (!value || value === '0') return '';
    const numValue = parseFloat(value) / 100;
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(numValue);
  },
  
  phone: (value: string, countryCode = 'US') => {
    const digits = value.replace(/\D/g, '');
    if (countryCode === 'US') {
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
    return digits;
  },
  
  percentage: (value: string) => {
    if (!value || value === '0') return '';
    const numValue = parseFloat(value);
    return `${numValue}%`;
  },
  
  pin: (value: string, maskInput = false) => {
    return maskInput ? '•'.repeat(value.length) : value;
  },
  
  time: (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    const hours = digits.slice(0, 2);
    const minutes = digits.slice(2, 4);
    return `${hours}:${minutes}`;
  },
  
  decimal: (value: string, locale = 'en-US') => {
    if (!value || value === '0') return '';
    const numValue = parseFloat(value);
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(numValue);
  }
};

function NumberPadContent({ 
  title, 
  onValueChange, 
  onClose, 
  type = 'decimal',
  maxLength = 10,
  currency = 'USD',
  locale = 'en-US',
  countryCode = 'US',
  maskInput = false,
  customPattern,
  customFormatter,
  placeholder = 'Enter value'
}: NumberPadContentProps) {
  const [rawValue, setRawValue] = useState('');
  const [displayValue, setDisplayValue] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  const formatValue = (value: string) => {
    if (customFormatter) {
      return customFormatter(value);
    }

    switch (type) {
      case 'currency':
        return formatters.currency(value, currency, locale);
      case 'phone':
        return formatters.phone(value, countryCode);
      case 'percentage':
        return formatters.percentage(value);
      case 'pin':
        return formatters.pin(value, maskInput);
      case 'time':
        return formatters.time(value);
      case 'decimal':
        return formatters.decimal(value, locale);
      case 'integer':
        return value;
      default:
        return value;
    }
  };

  const handleNumberPress = (num: string) => {
    if (rawValue.length >= maxLength) return;
    
    let newValue = rawValue + num;
    
    if (type === 'time' && newValue.replace(/\D/g, '').length > 4) return;
    if (type === 'phone' && newValue.replace(/\D/g, '').length > 10) return;
    if (customPattern && !customPattern.test(newValue)) return;
    
    setRawValue(newValue);
  };

  const handleDecimalPress = () => {
    if (type === 'integer' || type === 'pin' || type === 'phone' || type === 'time') return;
    if (rawValue.includes('.')) return;
    if (rawValue.length >= maxLength) return;
    
    const newValue = rawValue + (rawValue === '' ? '0.' : '.');
    setRawValue(newValue);
  };

  const handleBackspace = () => {
    const newValue = rawValue.slice(0, -1);
    setRawValue(newValue);
  };

  const handleClear = () => {
    setRawValue('');
  };

  const handleConfirm = () => {
    onValueChange(rawValue);
    onClose();
  };

  const showDecimal = !['integer', 'pin', 'phone', 'time'].includes(type);

  useEffect(() => {
    const formatted = formatValue(rawValue);
    setDisplayValue(formatted);
  }, [rawValue, type, currency, locale, countryCode, maskInput]);

  useEffect(() => {
    // Delay focus to avoid conflicts with dialog/drawer opening
    const focusTimeout = setTimeout(() => {
      contentRef.current?.focus();
    }, 100);

    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      // Only process keyboard events if the content is focused
      if (document.activeElement === contentRef.current) {
        if (/^[0-9]$/.test(key)) {
          event.preventDefault();
          handleNumberPress(key);
        } else if ((key === '.' || key === ',') && showDecimal) {
          event.preventDefault();
          handleDecimalPress();
        } else if (key === 'Backspace' || key === 'Delete') {
          event.preventDefault();
          handleBackspace();
        } else if (key === 'Enter') {
          event.preventDefault();
          if (rawValue.length > 0) {
            handleConfirm();
          }
        } else if (key === 'Escape') {
          event.preventDefault();
          if (rawValue.length > 0) {
            handleClear();
          } else {
            onClose();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(focusTimeout);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [rawValue, showDecimal, handleNumberPress, handleDecimalPress, handleBackspace, handleClear, handleConfirm, onClose]);

  return (
    <div className="w-full max-w-sm mx-auto" ref={contentRef} tabIndex={-1}>
      <div className="mb-6">
        <div className="bg-muted/50 rounded-lg p-4 min-h-[60px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-mono font-semibold mb-1">
              {displayValue || placeholder}
            </div>
            {type === 'currency' && (
              <Badge variant="outline" className="text-xs">
                {currency} • {locale}
              </Badge>
            )}
            {type === 'phone' && (
              <Badge variant="outline" className="text-xs">
                {countryCode}
              </Badge>
            )}
            {type === 'percentage' && rawValue && (
              <Badge variant="outline" className="text-xs">
                {(parseFloat(rawValue) / 100).toFixed(2)}% decimal
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Button
            key={num}
            variant="outline"
            size="lg"
            className="h-14 text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200 active:scale-95"
            onClick={() => handleNumberPress(num.toString())}
          >
            {num}
          </Button>
        ))}
        
        <Button
          variant="outline"
          size="lg"
          className="h-14 text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200 active:scale-95"
          onClick={showDecimal ? handleDecimalPress : () => handleNumberPress('0')}
          disabled={!showDecimal && type !== 'integer' && type !== 'pin'}
        >
          {showDecimal ? '.' : (type === 'time' ? ':' : '.')}
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          className="h-14 text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200 active:scale-95"
          onClick={() => handleNumberPress('0')}
        >
          0
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          className="h-14 hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 active:scale-95"
          onClick={handleBackspace}
          disabled={rawValue.length === 0}
        >
          <Delete className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={handleClear}
          disabled={rawValue.length === 0}
          className="h-12"
        >
          Clear
        </Button>
        <Button
          onClick={handleConfirm}
          className="h-12"
          disabled={rawValue.length === 0}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}

export function NumberPad(props: NumberPadProps) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const trigger = props.children || (
    <Button variant="outline" className="w-full">
      {props.title}
    </Button>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          {trigger}
        </DrawerTrigger>
        <DrawerContent className="px-4 pb-4">
          <DrawerHeader className="text-center">
            <DrawerTitle>{props.title}</DrawerTitle>
          </DrawerHeader>
          <NumberPadContent {...props} onClose={() => setOpen(false)} />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{props.title}</DialogTitle>
        </DialogHeader>
        <NumberPadContent {...props} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

code.demo.1751642013180.tsx
import { NumberPad, formatters } from "@/components/ui/number-pad";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Phone, Percent, Lock, Clock, Calculator, CreditCard, Globe } from "lucide-react";
import { useState } from "react";

const CurrencyDemo = () => {
  const [value, setValue] = useState('');
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          US Currency Input
        </CardTitle>
        <CardDescription>
          USD currency with American formatting and validation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <Badge variant="outline" className="text-lg px-4 py-2">
            {value ? formatters.currency(value, 'USD', 'en-US') : ''}
          </Badge>
        </div>
        <NumberPad
          title="Enter USD Amount"
          type="currency"
          currency="USD"
          locale="en-US"
          onValueChange={setValue}
          maxLength={12}
        />
      </CardContent>
    </Card>
  );
};

const EuroCurrencyDemo = () => {
  const [value, setValue] = useState('');
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Euro Currency Input
        </CardTitle>
        <CardDescription>
          EUR currency with European formatting (comma as decimal separator)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <Badge variant="outline" className="text-lg px-4 py-2">
            {value ? formatters.currency(value, 'EUR', 'de-DE') : ''}
          </Badge>
        </div>
        <NumberPad
          title="Enter EUR Amount"
          type="currency"
          currency="EUR"
          locale="de-DE"
          onValueChange={setValue}
          maxLength={12}
        />
      </CardContent>
    </Card>
  );
};

const PhoneDemo = () => {
  const [value, setValue] = useState('');
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Phone Number Input
        </CardTitle>
        <CardDescription>
          US phone number with automatic formatting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <Badge variant="outline" className="text-lg px-4 py-2">
            {value ? formatters.phone(value, 'US') : ''}
          </Badge>
        </div>
        <NumberPad
          title="Enter Phone Number"
          type="phone"
          countryCode="US"
          onValueChange={setValue}
          maxLength={10}
        />
      </CardContent>
    </Card>
  );
};

const PercentageDemo = () => {
  const [value, setValue] = useState('');
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Percent className="h-5 w-5" />
          Percentage Input
        </CardTitle>
        <CardDescription>
          Percentage input with decimal support and validation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <Badge variant="outline" className="text-lg px-4 py-2">
            {value ? formatters.percentage(value) : ''}
          </Badge>
        </div>
        <NumberPad
          title="Enter Percentage"
          type="percentage"
          onValueChange={setValue}
          maxLength={6}
        />
      </CardContent>
    </Card>
  );
};

const PinDemo = () => {
  const [value, setValue] = useState('');
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Secure PIN Input
        </CardTitle>
        <CardDescription>
          PIN input with masking for security
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <Badge variant="outline" className="text-lg px-4 py-2">
            {value ? formatters.pin(value, true) : ''}
          </Badge>
        </div>
        <NumberPad
          title="Enter PIN"
          type="pin"
          maskInput={true}
          onValueChange={setValue}
          maxLength={6}
        />
      </CardContent>
    </Card>
  );
};

const TimeDemo = () => {
  const [value, setValue] = useState('');
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Time Input
        </CardTitle>
        <CardDescription>
          24-hour time format with HH:MM structure
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <Badge variant="outline" className="text-lg px-4 py-2">
            {value ? formatters.time(value) : ''}
          </Badge>
        </div>
        <NumberPad
          title="Enter Time"
          type="time"
          onValueChange={setValue}
          maxLength={4}
        />
      </CardContent>
    </Card>
  );
};

const DecimalDemo = () => {
  const [value, setValue] = useState('');
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Decimal Number Input
        </CardTitle>
        <CardDescription>
          Standard decimal number input with locale formatting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <Badge variant="outline" className="text-lg px-4 py-2">
            {value ? formatters.decimal(value, 'en-US') : ''}
          </Badge>
        </div>
        <NumberPad
          title="Enter Decimal"
          type="decimal"
          onValueChange={setValue}
          maxLength={10}
        />
      </CardContent>
    </Card>
  );
};

const IntegerDemo = () => {
  const [value, setValue] = useState('');
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Integer Input
        </CardTitle>
        <CardDescription>
          Whole numbers only - no decimal points allowed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <Badge variant="outline" className="text-lg px-4 py-2">
            {value || ''}
          </Badge>
        </div>
        <NumberPad
          title="Enter Integer"
          type="integer"
          onValueChange={setValue}
          maxLength={8}
        />
      </CardContent>
    </Card>
  );
};

export { 
  CurrencyDemo,
  EuroCurrencyDemo, 
  PhoneDemo, 
  PercentageDemo, 
  PinDemo, 
  TimeDemo, 
  DecimalDemo, 
  IntegerDemo 
};
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/number-pad.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Delete } from 'lucide-react';
import { cn } from '@/lib/utils';

export type NumberPadType = 'currency' | 'phone' | 'decimal' | 'integer' | 'percentage' | 'pin' | 'time' | 'custom';

export interface NumberPadProps {
  title: string;
  onValueChange: (value: string) => void;
  type?: NumberPadType;
  maxLength?: number;
  currency?: string;
  locale?: string;
  countryCode?: string;
  maskInput?: boolean;
  customPattern?: RegExp;
  customFormatter?: (value: string) => string;
  placeholder?: string;
  children?: React.ReactNode;
}

interface NumberPadContentProps extends Omit<NumberPadProps, 'children'> {
  onClose: () => void;
}

export const formatters = {
  currency: (value: string, currency = 'USD', locale = 'en-US') => {
    if (!value || value === '0') return '';
    const numValue = parseFloat(value) / 100;
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(numValue);
  },
  
  phone: (value: string, countryCode = 'US') => {
    const digits = value.replace(/\D/g, '');
    if (countryCode === 'US') {
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
    return digits;
  },
  
  percentage: (value: string) => {
    if (!value || value === '0') return '';
    const numValue = parseFloat(value);
    return `${numValue}%`;
  },
  
  pin: (value: string, maskInput = false) => {
    return maskInput ? '•'.repeat(value.length) : value;
  },
  
  time: (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    const hours = digits.slice(0, 2);
    const minutes = digits.slice(2, 4);
    return `${hours}:${minutes}`;
  },
  
  decimal: (value: string, locale = 'en-US') => {
    if (!value || value === '0') return '';
    const numValue = parseFloat(value);
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(numValue);
  }
};

function NumberPadContent({ 
  title, 
  onValueChange, 
  onClose, 
  type = 'decimal',
  maxLength = 10,
  currency = 'USD',
  locale = 'en-US',
  countryCode = 'US',
  maskInput = false,
  customPattern,
  customFormatter,
  placeholder = 'Enter value'
}: NumberPadContentProps) {
  const [rawValue, setRawValue] = useState('');
  const [displayValue, setDisplayValue] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  const formatValue = (value: string) => {
    if (customFormatter) {
      return customFormatter(value);
    }

    switch (type) {
      case 'currency':
        return formatters.currency(value, currency, locale);
      case 'phone':
        return formatters.phone(value, countryCode);
      case 'percentage':
        return formatters.percentage(value);
      case 'pin':
        return formatters.pin(value, maskInput);
      case 'time':
        return formatters.time(value);
      case 'decimal':
        return formatters.decimal(value, locale);
      case 'integer':
        return value;
      default:
        return value;
    }
  };

  const handleNumberPress = (num: string) => {
    if (rawValue.length >= maxLength) return;
    
    let newValue = rawValue + num;
    
    if (type === 'time' && newValue.replace(/\D/g, '').length > 4) return;
    if (type === 'phone' && newValue.replace(/\D/g, '').length > 10) return;
    if (customPattern && !customPattern.test(newValue)) return;
    
    setRawValue(newValue);
  };

  const handleDecimalPress = () => {
    if (type === 'integer' || type === 'pin' || type === 'phone' || type === 'time') return;
    if (rawValue.includes('.')) return;
    if (rawValue.length >= maxLength) return;
    
    const newValue = rawValue + (rawValue === '' ? '0.' : '.');
    setRawValue(newValue);
  };

  const handleBackspace = () => {
    const newValue = rawValue.slice(0, -1);
    setRawValue(newValue);
  };

  const handleClear = () => {
    setRawValue('');
  };

  const handleConfirm = () => {
    onValueChange(rawValue);
    onClose();
  };

  const showDecimal = !['integer', 'pin', 'phone', 'time'].includes(type);

  useEffect(() => {
    const formatted = formatValue(rawValue);
    setDisplayValue(formatted);
  }, [rawValue, type, currency, locale, countryCode, maskInput]);

  useEffect(() => {
    // Delay focus to avoid conflicts with dialog/drawer opening
    const focusTimeout = setTimeout(() => {
      contentRef.current?.focus();
    }, 100);

    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      // Only process keyboard events if the content is focused
      if (document.activeElement === contentRef.current) {
        if (/^[0-9]$/.test(key)) {
          event.preventDefault();
          handleNumberPress(key);
        } else if ((key === '.' || key === ',') && showDecimal) {
          event.preventDefault();
          handleDecimalPress();
        } else if (key === 'Backspace' || key === 'Delete') {
          event.preventDefault();
          handleBackspace();
        } else if (key === 'Enter') {
          event.preventDefault();
          if (rawValue.length > 0) {
            handleConfirm();
          }
        } else if (key === 'Escape') {
          event.preventDefault();
          if (rawValue.length > 0) {
            handleClear();
          } else {
            onClose();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(focusTimeout);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [rawValue, showDecimal, handleNumberPress, handleDecimalPress, handleBackspace, handleClear, handleConfirm, onClose]);

  return (
    <div className="w-full max-w-sm mx-auto" ref={contentRef} tabIndex={-1}>
      <div className="mb-6">
        <div className="bg-muted/50 rounded-lg p-4 min-h-[60px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-mono font-semibold mb-1">
              {displayValue || placeholder}
            </div>
            {type === 'currency' && (
              <Badge variant="outline" className="text-xs">
                {currency} • {locale}
              </Badge>
            )}
            {type === 'phone' && (
              <Badge variant="outline" className="text-xs">
                {countryCode}
              </Badge>
            )}
            {type === 'percentage' && rawValue && (
              <Badge variant="outline" className="text-xs">
                {(parseFloat(rawValue) / 100).toFixed(2)}% decimal
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Button
            key={num}
            variant="outline"
            size="lg"
            className="h-14 text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200 active:scale-95"
            onClick={() => handleNumberPress(num.toString())}
          >
            {num}
          </Button>
        ))}
        
        <Button
          variant="outline"
          size="lg"
          className="h-14 text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200 active:scale-95"
          onClick={showDecimal ? handleDecimalPress : () => handleNumberPress('0')}
          disabled={!showDecimal && type !== 'integer' && type !== 'pin'}
        >
          {showDecimal ? '.' : (type === 'time' ? ':' : '.')}
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          className="h-14 text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200 active:scale-95"
          onClick={() => handleNumberPress('0')}
        >
          0
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          className="h-14 hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 active:scale-95"
          onClick={handleBackspace}
          disabled={rawValue.length === 0}
        >
          <Delete className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={handleClear}
          disabled={rawValue.length === 0}
          className="h-12"
        >
          Clear
        </Button>
        <Button
          onClick={handleConfirm}
          className="h-12"
          disabled={rawValue.length === 0}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}

export function NumberPad(props: NumberPadProps) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const trigger = props.children || (
    <Button variant="outline" className="w-full">
      {props.title}
    </Button>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          {trigger}
        </DrawerTrigger>
        <DrawerContent className="px-4 pb-4">
          <DrawerHeader className="text-center">
            <DrawerTitle>{props.title}</DrawerTitle>
          </DrawerHeader>
          <NumberPadContent {...props} onClose={() => setOpen(false)} />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{props.title}</DialogTitle>
        </DialogHeader>
        <NumberPadContent {...props} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
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
