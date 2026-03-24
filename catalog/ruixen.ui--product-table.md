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
product-table.tsx
"use client";

import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  VisibilityState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  brand: string;
  model: string;
  weight: string;
  color: string;
  sku: string;
};

const generateDummyData = (): Product[] => {
  return Array.from({ length: 40 }, (_, i) => ({
    id: `P-${i + 1}`,
    name: `Product ${i + 1}`,
    category: ["Electronics", "Clothing", "Books", "Home"][i % 4],
    price: parseFloat((Math.random() * 500).toFixed(2)),
    stock: Math.floor(Math.random() * 100),
    brand: ["Sony", "Samsung", "Apple", "Dell"][i % 4],
    model: `Model-${1000 + i}`,
    weight: `${Math.floor(Math.random() * 5) + 1} kg`,
    color: ["Black", "White", "Gray"][i % 3],
    sku: `SKU-${Math.floor(100000 + Math.random() * 900000)}`,
  }));
};

const columns: ColumnDef<Product>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "brand", header: "Brand" },
  { accessorKey: "model", header: "Model" },
  { accessorKey: "color", header: "Color" },
  { accessorKey: "weight", header: "Weight" },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      return `$${price.toFixed(2)}`;
    },
  },
  { accessorKey: "stock", header: "Stock" },
  { accessorKey: "sku", header: "SKU" },
];

export default function ProductTable() {
  const [data, setData] = useState<Product[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  useEffect(() => {
    setData(generateDummyData());
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-black">Product Table</h2>
          <div className="flex gap-2">
            <Input
              placeholder="Search..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="border border-gray-300 bg-white text-black placeholder-gray-500"
            />
            <Button
              variant="outline"
              onClick={() => {
                const keys = table.getAllLeafColumns().map((col) => col.id);
                setColumnVisibility((prev) =>
                  keys.reduce((acc, key) => {
                    acc[key] = !prev[key];
                    return acc;
                  }, {} as VisibilityState)
                );
              }}
              className="border border-gray-500 text-gray-800"
            >
              Toggle Columns
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto border border-gray-300 rounded">
          <Table className="w-full table-fixed text-sm text-black">
            <TableHeader className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="whitespace-nowrap px-2 py-3 border-r border-gray-200">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-2 py-2 border-t border-gray-200 truncate">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-4">
                    No data found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="text-gray-800 border-gray-400"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="text-gray-800 border-gray-400"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


code.demo.1758914848185.tsx
import ProductTable from "@/components/ui/product-table";

export default function DemoOne() {
  return <ProductTable />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/product-table.tsx
"use client";

import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  VisibilityState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  brand: string;
  model: string;
  weight: string;
  color: string;
  sku: string;
};

const generateDummyData = (): Product[] => {
  return Array.from({ length: 40 }, (_, i) => ({
    id: `P-${i + 1}`,
    name: `Product ${i + 1}`,
    category: ["Electronics", "Clothing", "Books", "Home"][i % 4],
    price: parseFloat((Math.random() * 500).toFixed(2)),
    stock: Math.floor(Math.random() * 100),
    brand: ["Sony", "Samsung", "Apple", "Dell"][i % 4],
    model: `Model-${1000 + i}`,
    weight: `${Math.floor(Math.random() * 5) + 1} kg`,
    color: ["Black", "White", "Gray"][i % 3],
    sku: `SKU-${Math.floor(100000 + Math.random() * 900000)}`,
  }));
};

const columns: ColumnDef<Product>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "brand", header: "Brand" },
  { accessorKey: "model", header: "Model" },
  { accessorKey: "color", header: "Color" },
  { accessorKey: "weight", header: "Weight" },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      return `$${price.toFixed(2)}`;
    },
  },
  { accessorKey: "stock", header: "Stock" },
  { accessorKey: "sku", header: "SKU" },
];

export default function ProductTable() {
  const [data, setData] = useState<Product[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  useEffect(() => {
    setData(generateDummyData());
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-black">Product Table</h2>
          <div className="flex gap-2">
            <Input
              placeholder="Search..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="border border-gray-300 bg-white text-black placeholder-gray-500"
            />
            <Button
              variant="outline"
              onClick={() => {
                const keys = table.getAllLeafColumns().map((col) => col.id);
                setColumnVisibility((prev) =>
                  keys.reduce((acc, key) => {
                    acc[key] = !prev[key];
                    return acc;
                  }, {} as VisibilityState)
                );
              }}
              className="border border-gray-500 text-gray-800"
            >
              Toggle Columns
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto border border-gray-300 rounded">
          <Table className="w-full table-fixed text-sm text-black">
            <TableHeader className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="whitespace-nowrap px-2 py-3 border-r border-gray-200">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-2 py-2 border-t border-gray-200 truncate">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-4">
                    No data found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="text-gray-800 border-gray-400"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="text-gray-800 border-gray-400"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

```

Install NPM dependencies:
```bash
@tanstack/react-table
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
