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
comparison-table.tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

type Item = {
  id: number
  category: string
  price: number
  rating: number
  stock: number
}

const defaultData: Item[] = [
  { id: 1, category: "Laptop", price: 1200, rating: 4.5, stock: 20 },
  { id: 2, category: "Tablet", price: 600, rating: 4.1, stock: 35 },
  { id: 3, category: "Smartphone", price: 800, rating: 4.7, stock: 50 },
  { id: 4, category: "Monitor", price: 300, rating: 4.0, stock: 15 },
  { id: 5, category: "Laptop", price: 1500, rating: 4.8, stock: 10 },
  { id: 6, category: "Tablet", price: 550, rating: 4.2, stock: 28 },
]

export default function ComparisonTable() {
  const [selected, setSelected] = React.useState<number[]>([])
  const [search, setSearch] = React.useState("")
  const [category, setCategory] = React.useState<string>("all")

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 2 ? [...prev, id] : prev
    )
  }

  const resetSelection = () => setSelected([])

  const filteredData = defaultData.filter((item) => {
    const matchesSearch = item.category.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === "all" || item.category === category
    return matchesSearch && matchesCategory
  })

  const comparedItems = defaultData.filter((item) => selected.includes(item.id))

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-3">
        <h2 className="text-xl font-semibold mb-4">Comparison Table</h2>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-4">
          <Input
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Laptop">Laptop</SelectItem>
              <SelectItem value="Tablet">Tablet</SelectItem>
              <SelectItem value="Smartphone">Smartphone</SelectItem>
              <SelectItem value="Monitor">Monitor</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={resetSelection}>
            Reset
          </Button>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Price ($)</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Select</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow
                key={item.id}
                className={cn(
                  selected.includes(item.id) && "bg-muted/50"
                )}
              >
                <TableCell className="p-2">{item.category}</TableCell>
                <TableCell className="p-2">{item.price}</TableCell>
                <TableCell className="p-2">{item.rating}</TableCell>
                <TableCell className="p-2">{item.stock}</TableCell>
                <TableCell className="p-2">
                  <Button
                    variant={selected.includes(item.id) ? "destructive" : "outline"}
                    size="sm"
                    className={selected.includes(item.id) ? "text-white" : ""}
                    onClick={() => toggleSelect(item.id)}
                  >
                    {selected.includes(item.id) ? "Remove" : "Compare"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Comparison view */}
        {comparedItems.length === 2 && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-medium mb-3">Comparison Result</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="font-semibold">Attribute</div>
              <div className="font-semibold">{comparedItems[0].category}</div>
              <div className="font-semibold">{comparedItems[1].category}</div>

              <div>Price ($)</div>
              <div className={cn(comparedItems[0].price < comparedItems[1].price && "text-green-600 dark:text-green-400")}>
                {comparedItems[0].price}
              </div>
              <div className={cn(comparedItems[1].price < comparedItems[0].price && "text-green-600 dark:text-green-400")}>
                {comparedItems[1].price}
              </div>

              <div>Rating</div>
              <div className={cn(comparedItems[0].rating > comparedItems[1].rating && "text-green-600 dark:text-green-400")}>
                {comparedItems[0].rating}
              </div>
              <div className={cn(comparedItems[1].rating > comparedItems[0].rating && "text-green-600 dark:text-green-400")}>
                {comparedItems[1].rating}
              </div>

              <div>Stock</div>
              <div className={cn(comparedItems[0].stock > comparedItems[1].stock && "text-green-600 dark:text-green-400")}>
                {comparedItems[0].stock}
              </div>
              <div className={cn(comparedItems[1].stock > comparedItems[0].stock && "text-green-600 dark:text-green-400")}>
                {comparedItems[1].stock}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


code.demo.1757836218819.tsx
import ComparisonTable from "@/components/ui/comparison-table";

export default function DemoOne() {
  return <ComparisonTable />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/comparison-table.tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

type Item = {
  id: number
  category: string
  price: number
  rating: number
  stock: number
}

const defaultData: Item[] = [
  { id: 1, category: "Laptop", price: 1200, rating: 4.5, stock: 20 },
  { id: 2, category: "Tablet", price: 600, rating: 4.1, stock: 35 },
  { id: 3, category: "Smartphone", price: 800, rating: 4.7, stock: 50 },
  { id: 4, category: "Monitor", price: 300, rating: 4.0, stock: 15 },
  { id: 5, category: "Laptop", price: 1500, rating: 4.8, stock: 10 },
  { id: 6, category: "Tablet", price: 550, rating: 4.2, stock: 28 },
]

export default function ComparisonTable() {
  const [selected, setSelected] = React.useState<number[]>([])
  const [search, setSearch] = React.useState("")
  const [category, setCategory] = React.useState<string>("all")

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 2 ? [...prev, id] : prev
    )
  }

  const resetSelection = () => setSelected([])

  const filteredData = defaultData.filter((item) => {
    const matchesSearch = item.category.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === "all" || item.category === category
    return matchesSearch && matchesCategory
  })

  const comparedItems = defaultData.filter((item) => selected.includes(item.id))

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-3">
        <h2 className="text-xl font-semibold mb-4">Comparison Table</h2>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-4">
          <Input
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Laptop">Laptop</SelectItem>
              <SelectItem value="Tablet">Tablet</SelectItem>
              <SelectItem value="Smartphone">Smartphone</SelectItem>
              <SelectItem value="Monitor">Monitor</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={resetSelection}>
            Reset
          </Button>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Price ($)</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Select</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow
                key={item.id}
                className={cn(
                  selected.includes(item.id) && "bg-muted/50"
                )}
              >
                <TableCell className="p-2">{item.category}</TableCell>
                <TableCell className="p-2">{item.price}</TableCell>
                <TableCell className="p-2">{item.rating}</TableCell>
                <TableCell className="p-2">{item.stock}</TableCell>
                <TableCell className="p-2">
                  <Button
                    variant={selected.includes(item.id) ? "destructive" : "outline"}
                    size="sm"
                    className={selected.includes(item.id) ? "text-white" : ""}
                    onClick={() => toggleSelect(item.id)}
                  >
                    {selected.includes(item.id) ? "Remove" : "Compare"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Comparison view */}
        {comparedItems.length === 2 && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-medium mb-3">Comparison Result</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="font-semibold">Attribute</div>
              <div className="font-semibold">{comparedItems[0].category}</div>
              <div className="font-semibold">{comparedItems[1].category}</div>

              <div>Price ($)</div>
              <div className={cn(comparedItems[0].price < comparedItems[1].price && "text-green-600 dark:text-green-400")}>
                {comparedItems[0].price}
              </div>
              <div className={cn(comparedItems[1].price < comparedItems[0].price && "text-green-600 dark:text-green-400")}>
                {comparedItems[1].price}
              </div>

              <div>Rating</div>
              <div className={cn(comparedItems[0].rating > comparedItems[1].rating && "text-green-600 dark:text-green-400")}>
                {comparedItems[0].rating}
              </div>
              <div className={cn(comparedItems[1].rating > comparedItems[0].rating && "text-green-600 dark:text-green-400")}>
                {comparedItems[1].rating}
              </div>

              <div>Stock</div>
              <div className={cn(comparedItems[0].stock > comparedItems[1].stock && "text-green-600 dark:text-green-400")}>
                {comparedItems[0].stock}
              </div>
              <div className={cn(comparedItems[1].stock > comparedItems[0].stock && "text-green-600 dark:text-green-400")}>
                {comparedItems[1].stock}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
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
