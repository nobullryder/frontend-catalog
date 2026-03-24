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
table.tsx
import React from "react";

export const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full overflow-auto min-w-[248px] p-6 rounded-lg relative border border-gray-alpha-400 bg-background-100">
      <table className="w-full border-collapse text-sm font-sans text-gray-900">
        {children}
      </table>
    </div>
  );
};

Table.Colgroup = ({ children }: { children: React.ReactNode }) => {
  return <colgroup>{children}</colgroup>;
};

Table.Col = ({ className }: { className?: string }) => {
  return <col className={className} />;
};

Table.Header = ({ children }: { children: React.ReactNode }) => {
  return <thead className="border-b border-gray-alpha-400">{children}</thead>;
};

Table.Body = ({ children, striped, interactive, virtualize }: {
  children: React.ReactNode,
  striped?: boolean,
  interactive?: boolean,
  virtualize?: boolean
}) => {
  return (
    <>
      <tbody className="table-row h-3" />
      <tbody className={`${striped ? "[&_tr:where(:nth-child(odd))]:bg-background-200" : ""}${interactive ? " [&_tr:hover]:bg-gray-100" : ""}`}>
        {children}
      </tbody>
    </>
  );
};

Table.Row = ({ children }: { children: React.ReactNode }) => {
  return <tr className="[&_td:first-child]:rounded-l-[4px] [&_td:last-child]:rounded-r-[4px] transition-colors">{children}</tr>;
};

Table.Head = ({ children }: { children: React.ReactNode }) => {
  return <th className="h-10 px-2 align-middle font-medium text-left last:text-right">{children}</th>;
};

Table.Cell = ({ children, className, colSpan }: { children: React.ReactNode, className?: string, colSpan?: number }) => {
  return <td className={`px-2 py-2.5 align-middle last:text-right ${className || ""}`} colSpan={colSpan}>{children}</td>;
};

Table.Footer = ({ children }: { children: React.ReactNode }) => {
  return <tfoot className="border-t border-gray-alpha-400">{children}</tfoot>;
};


code.demo.tsx
import React, { memo, useState } from "react";
import { Table } from "@/components/ui/table";
import { ShowMore } from "@/components/ui/show-more";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  maximumFractionDigits: 2,
  currency: "usd",
});

const formatCurrency = (amount: number): string => {
  return formatter.format(amount);
};

const items = [
  {
    product: "Brake Pads Set",
    usage: "100 sets",
    price: "$50 per set",
    charge: 5000,
  },
  {
    product: "Oil Filters",
    usage: "200 filters",
    price: "$10 per filter",
    charge: 2000,
  },
  {
    product: "Car Batteries",
    usage: "50 batteries",
    price: "$100 per battery",
    charge: 5000,
  },
  {
    product: "Headlight Bulbs",
    usage: "300 bulbs",
    price: "$15 per bulb",
    charge: 4500,
  },
  {
    product: "Windshield Wipers",
    usage: "250 pairs",
    price: "$20 per pair",
    charge: 5000,
  },
  {
    product: "Spark Plugs",
    usage: "500 sets",
    price: "$5 per set",
    charge: 2500,
  },
];

const Row = memo(function Row({ item }: { item: (typeof items)[number] }) {
  return (
    <Table.Row>
      <Table.Cell>{item.product}</Table.Cell>
      <Table.Cell>{item.usage}</Table.Cell>
      <Table.Cell>{item.price}</Table.Cell>
      <Table.Cell>{formatCurrency(item.charge)}</Table.Cell>
    </Table.Row>
  );
});

export const BasicTable = () => (
  <div className="w-full flex flex-col justify-center">
    <div className="font-bold text-xl dark:text-white">Basic table</div>
    <div className="w-full mt-[8px]">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>Col 1</Table.Head>
            <Table.Head>Col 2</Table.Head>
            <Table.Head>Col 3</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Value 1.1</Table.Cell>
            <Table.Cell>Value 1.2</Table.Cell>
            <Table.Cell>Value 1.3</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Value 2.1</Table.Cell>
            <Table.Cell>Value 2.2</Table.Cell>
            <Table.Cell>Value 2.3</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Value 3.1</Table.Cell>
            <Table.Cell>Value 3.2</Table.Cell>
            <Table.Cell>Value 3.3</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  </div>
);

export const StripedTable = () => (
  <div className="w-full flex flex-col justify-center">
    <div className="font-bold text-xl dark:text-white">Striped table</div>
    <div className="w-full mt-[8px]">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>Col 1</Table.Head>
            <Table.Head>Col 2</Table.Head>
            <Table.Head>Col 3</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body striped>
          <Table.Row>
            <Table.Cell>Value 1.1</Table.Cell>
            <Table.Cell>Value 1.2</Table.Cell>
            <Table.Cell>Value 1.3</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Value 2.1</Table.Cell>
            <Table.Cell>Value 2.2</Table.Cell>
            <Table.Cell>Value 2.3</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Value 3.1</Table.Cell>
            <Table.Cell>Value 3.2</Table.Cell>
            <Table.Cell>Value 3.3</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  </div>
);

export const InteractiveTable = () => (
  <div className="w-full flex flex-col justify-center">
    <div className="font-bold text-xl dark:text-white">Interactive table</div>
    <div className="w-full mt-[8px]">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>Col 1</Table.Head>
            <Table.Head>Col 2</Table.Head>
            <Table.Head>Col 3</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body interactive>
          <Table.Row>
            <Table.Cell>Value 1.1</Table.Cell>
            <Table.Cell>Value 1.2</Table.Cell>
            <Table.Cell>Value 1.3</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Value 2.1</Table.Cell>
            <Table.Cell>Value 2.2</Table.Cell>
            <Table.Cell>Value 2.3</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Value 3.1</Table.Cell>
            <Table.Cell>Value 3.2</Table.Cell>
            <Table.Cell>Value 3.3</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  </div>
);

export const FullFeaturedTable = () => (
  <div className="w-full flex flex-col justify-center">
    <div className="font-bold text-xl dark:text-white">Full featured table</div>
    <div className="w-full mt-[8px]">
      <Table>
        <Table.Colgroup>
          <Table.Col className="w-[44%]" />
          <Table.Col className="w-[22%]" />
          <Table.Col className="w-[22%]" />
          <Table.Col className="w-[11%]" />
        </Table.Colgroup>
        <Table.Header>
          <Table.Row>
            <Table.Head>Product</Table.Head>
            <Table.Head>Usage</Table.Head>
            <Table.Head>Price</Table.Head>
            <Table.Head>Charge</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body interactive striped>
          {items.map((item) => (
            <Table.Row key={item.product}>
              <Table.Cell>{item.product}</Table.Cell>
              <Table.Cell>{item.usage}</Table.Cell>
              <Table.Cell>{item.price}</Table.Cell>
              <Table.Cell>{formatCurrency(item.charge)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell
              className="text-[#171717] dark:text-[#ededed] font-medium"
              colSpan={3}
            >
              Subtotal
            </Table.Cell>
            <Table.Cell className="text-[#171717] dark:text-[#ededed] font-medium">
              {formatCurrency(items.reduce((sum, val) => sum + val.charge, 0))}
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  </div>
);

export const VirtualizedTable = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="font-bold text-xl dark:text-white">Virtualized table</div>
      <div className="w-full mt-[8px] relative">
        <Table>
          <Table.Colgroup>
            <Table.Col className="w-[44%]" />
            <Table.Col className="w-[22%]" />
            <Table.Col className="w-[22%]" />
            <Table.Col className="w-[11%]" />
          </Table.Colgroup>
          <Table.Header>
            <Table.Row>
              <Table.Head>Product</Table.Head>
              <Table.Head>Usage</Table.Head>
              <Table.Head>Price</Table.Head>
              <Table.Head>Charge</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body interactive striped virtualize>
            {new Array(5_000).fill(null).map((_, index) => {
              if (!expanded && index >= 9) return null;
              const item = items[index % items.length];
              if (!item) return null;
              return <Row item={item} key={`${item.product}${index}`} />;
            })}
          </Table.Body>
        </Table>
        {expanded ? null : (
          <div className="pointer-events-none absolute bottom-0 left-0 h-[30%] w-full rounded bg-gradient-to-t from-white dark:from-[#0a0a0a] to-transparent opacity-80" />
        )}
        <div className={expanded ? "h-16" : "h-4"} />
        <div className="pointer-events-none absolute bottom-0 left-0 flex h-[calc(100%-160px)] w-full flex-col justify-end">
          <ShowMore
            className="pointer-events-auto sticky bottom-4 mb-4"
            expanded={expanded}
            noBorder
            onClick={() => setExpanded((x) => !x)}
          />
        </div>
      </div>
    </div>
  );
};

```

Copy-paste these files for dependencies:
```tsx
/components/ui/table.tsx
import React from "react";

export const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full overflow-auto min-w-[248px] p-6 rounded-lg relative border border-gray-alpha-400 bg-background-100">
      <table className="w-full border-collapse text-sm font-sans text-gray-900">
        {children}
      </table>
    </div>
  );
};

Table.Colgroup = ({ children }: { children: React.ReactNode }) => {
  return <colgroup>{children}</colgroup>;
};

Table.Col = ({ className }: { className?: string }) => {
  return <col className={className} />;
};

Table.Header = ({ children }: { children: React.ReactNode }) => {
  return <thead className="border-b border-gray-alpha-400">{children}</thead>;
};

Table.Body = ({ children, striped, interactive, virtualize }: {
  children: React.ReactNode,
  striped?: boolean,
  interactive?: boolean,
  virtualize?: boolean
}) => {
  return (
    <>
      <tbody className="table-row h-3" />
      <tbody className={`${striped ? "[&_tr:where(:nth-child(odd))]:bg-background-200" : ""}${interactive ? " [&_tr:hover]:bg-gray-100" : ""}`}>
        {children}
      </tbody>
    </>
  );
};

Table.Row = ({ children }: { children: React.ReactNode }) => {
  return <tr className="[&_td:first-child]:rounded-l-[4px] [&_td:last-child]:rounded-r-[4px] transition-colors">{children}</tr>;
};

Table.Head = ({ children }: { children: React.ReactNode }) => {
  return <th className="h-10 px-2 align-middle font-medium text-left last:text-right">{children}</th>;
};

Table.Cell = ({ children, className, colSpan }: { children: React.ReactNode, className?: string, colSpan?: number }) => {
  return <td className={`px-2 py-2.5 align-middle last:text-right ${className || ""}`} colSpan={colSpan}>{children}</td>;
};

Table.Footer = ({ children }: { children: React.ReactNode }) => {
  return <tfoot className="border-t border-gray-alpha-400">{children}</tfoot>;
};

```

Extend existing tailwind.config.js with this code:
```js
module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "gray-900": "var(--ds-gray-900)",
        "gray-alpha-400": "var(--ds-gray-alpha-400)",
        "background-100": "var(--ds-background-100)",
        "background-200": "var(--ds-background-200)"
      }
    }
  }
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
