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
ruixen-table-basic.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis, Heart } from "lucide-react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import Link from "next/link";

const items = [
  {
    id: "1",
    name: "Alex Thompson",
    email: "alex.t@company.com",
    location: "San Francisco, US",
    status: "Active",
    balance: "$1,250.00",
    selectOptions: ["Frontend", "React", "Design"]
  },
  {
    id: "2",
    name: "Priya Verma",
    email: "priya.v@company.com",
    location: "Bangalore, India",
    status: "Active",
    balance: "$980.00",
    selectOptions: ["Backend", "Java", "Spring Boot"]
  },
  {
    id: "3",
    name: "Daniel Ruiz",
    email: "daniel.r@company.com",
    location: "Madrid, Spain",
    status: "Inactive",
    balance: "$0.00",
    selectOptions: ["DevOps", "AWS", "Docker"]
  },
  {
    id: "4",
    name: "Sophie Nguyen",
    email: "sophie.n@company.com",
    location: "Melbourne, Australia",
    status: "Active",
    balance: "$2,130.50",
    selectOptions: ["Product", "Agile", "Scrum"]
  },
  {
    id: "5",
    name: "Ahmed Hassan",
    email: "ahmed.h@company.com",
    location: "Dubai, UAE",
    status: "Pending",
    balance: "$735.20",
    selectOptions: ["QA", "Cypress", "Manual Testing"]
  },
  {
    id: "6",
    name: "Linda Park",
    email: "linda.p@company.com",
    location: "Seoul, South Korea",
    status: "Active",
    balance: "$3,600.75",
    selectOptions: ["UX Research", "Figma", "Design Systems"]
  },
  {
    id: "7",
    name: "George Smith",
    email: "george.s@company.com",
    location: "London, UK",
    status: "Inactive",
    balance: "$125.00",
    selectOptions: ["Data Science", "Python", "Pandas"]
  },
  {
    id: "8",
    name: "Maria Lopez",
    email: "maria.l@company.com",
    location: "Mexico City, Mexico",
    status: "Active",
    balance: "$1,810.40",
    selectOptions: ["Mobile", "Flutter", "Firebase"]
  },
  {
    id: "9",
    name: "Jin Woo",
    email: "jin.w@company.com",
    location: "Tokyo, Japan",
    status: "Active",
    balance: "$2,750.90",
    selectOptions: ["Infrastructure", "Kubernetes", "Terraform"]
  },
  {
    id: "10",
    name: "Emily Carter",
    email: "emily.c@company.com",
    location: "New York, US",
    status: "Pending",
    balance: "$650.00",
    selectOptions: ["HR", "Payroll", "Compliance"]
  },
  {
    id: "11",
    name: "Nikhil Mehta",
    email: "nikhil.m@company.com",
    location: "Pune, India",
    status: "Active",
    balance: "$920.00",
    selectOptions: ["Machine Learning", "TensorFlow", "Python"]
  },
  {
    id: "12",
    name: "Chloe Dubois",
    email: "chloe.d@company.com",
    location: "Paris, France",
    status: "Inactive",
    balance: "$0.00",
    selectOptions: ["Marketing", "SEO", "Analytics"]
  },
  {
    id: "13",
    name: "Tom Becker",
    email: "tom.b@company.com",
    location: "Berlin, Germany",
    status: "Active",
    balance: "$2,400.00",
    selectOptions: ["Sales", "CRM", "Lead Generation"]
  },
  {
    id: "14",
    name: "Fatima Al-Zahrani",
    email: "fatima.z@company.com",
    location: "Riyadh, Saudi Arabia",
    status: "Active",
    balance: "$1,500.00",
    selectOptions: ["Finance", "Budgeting", "Forecasting"]
  },
  {
    id: "15",
    name: "Lucas Silva",
    email: "lucas.s@company.com",
    location: "São Paulo, Brazil",
    status: "Pending",
    balance: "$480.80",
    selectOptions: ["Support", "Live Chat", "Zendesk"]
  }
];

export default function RuixenTableBasic() {
  return (
    <div className="bg-background">
      <div className="[&>div]:max-h-96 max-w-5xl mx-auto mt-32 rounded-xl border border-gray-200 dark:border-gray-800">
        <Table className="border-separate">
          <TableHeader className="sticky top-0 z-10 bg-gray-50/50 dark:bg-black backdrop-blur-xl">
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-left font-normal">Name</TableHead>
              <TableHead className="text-left font-normal">Email</TableHead>
              <TableHead className="text-left font-normal">Location</TableHead>
              <TableHead className="text-left font-normal">Status</TableHead>
              <TableHead className="text-right font-normal">Balance</TableHead>
              <TableHead className="text-left font-normal">Notes</TableHead> {/* Input */}
              <TableHead className="text-left font-normal">Category</TableHead> {/* Select */}
              <TableHead className="text-left font-normal">Selected</TableHead> {/* Checkbox */}
              <TableHead className="text-left font-normal">Actions</TableHead> {/* Dropdown */}
            </TableRow>
          </TableHeader>
          <TableBody className="text-gray-700 dark:text-gray-400">
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-normal">{item.name}</TableCell>
                <TableCell className="font-normal">{item.email}</TableCell>
                <TableCell className="font-normal">{item.location}</TableCell>
                <TableCell className="font-normal">{item.status}</TableCell>
                <TableCell className="text-right font-normal">{item.balance}</TableCell>

                {/* Input Column */}
                <TableCell>
                  <Input placeholder="Enter note" className="w-[140px]" />
                </TableCell>

                {/* Dynamic Select Column */}
                <TableCell>
                  <Select>
                    <SelectTrigger className="w-[140px] border border-gray-200 dark:border-gray-800">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                      {item.selectOptions?.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>

                {/* Checkbox Column */}
                <TableCell>
                  <Checkbox />
                </TableCell>

                {/* Dropdown Menu Column */}
                <TableCell className="w-[120px]">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full shadow-none"
                        aria-label="Open edit menu"
                      >
                        <Ellipsis size={16} strokeWidth={2} aria-hidden="true" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Option 1</DropdownMenuItem>
                      <DropdownMenuItem>Option 2</DropdownMenuItem>
                      <DropdownMenuItem>Option 3</DropdownMenuItem>
                      <DropdownMenuItem>Option 4</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {/* Footer */}
          <TableFooter className="bg-transparent">
            <TableRow>
              <TableCell colSpan={9} className="text-center">
                <Link href="https://ruixen.com?utm_source=21st.dev&utm_medium=components&utm_campaign=ruixen" target="_blank">
                  <span className="flex items-center justify-center gap-1 text-sm font-normal">
                    Made with <Heart className="w-4 h-4 text-red-500 inline" /> by @ruixen
                  </span>
                </Link>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

      </div>
      <div className="mt-6">
        <Link href="https://ruixen.com?utm_source=21st.dev&utm_medium=components&utm_campaign=ruixen" target="_blank">
          <span className="flex items-center justify-center gap-1 text-sm font-normal">
            Made with <Heart className="w-4 h-4 text-red-500 inline" /> by @ruixen
          </span>
        </Link>
      </div>
    </div>
  );
}


code.demo.1753258300575.tsx
import RuixenTableBasic from "@/components/ui/ruixen-table-basic";

export default function DemoOne() {
  return <RuixenTableBasic />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/ruixen-table-basic.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis, Heart } from "lucide-react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import Link from "next/link";

const items = [
  {
    id: "1",
    name: "Alex Thompson",
    email: "alex.t@company.com",
    location: "San Francisco, US",
    status: "Active",
    balance: "$1,250.00",
    selectOptions: ["Frontend", "React", "Design"]
  },
  {
    id: "2",
    name: "Priya Verma",
    email: "priya.v@company.com",
    location: "Bangalore, India",
    status: "Active",
    balance: "$980.00",
    selectOptions: ["Backend", "Java", "Spring Boot"]
  },
  {
    id: "3",
    name: "Daniel Ruiz",
    email: "daniel.r@company.com",
    location: "Madrid, Spain",
    status: "Inactive",
    balance: "$0.00",
    selectOptions: ["DevOps", "AWS", "Docker"]
  },
  {
    id: "4",
    name: "Sophie Nguyen",
    email: "sophie.n@company.com",
    location: "Melbourne, Australia",
    status: "Active",
    balance: "$2,130.50",
    selectOptions: ["Product", "Agile", "Scrum"]
  },
  {
    id: "5",
    name: "Ahmed Hassan",
    email: "ahmed.h@company.com",
    location: "Dubai, UAE",
    status: "Pending",
    balance: "$735.20",
    selectOptions: ["QA", "Cypress", "Manual Testing"]
  },
  {
    id: "6",
    name: "Linda Park",
    email: "linda.p@company.com",
    location: "Seoul, South Korea",
    status: "Active",
    balance: "$3,600.75",
    selectOptions: ["UX Research", "Figma", "Design Systems"]
  },
  {
    id: "7",
    name: "George Smith",
    email: "george.s@company.com",
    location: "London, UK",
    status: "Inactive",
    balance: "$125.00",
    selectOptions: ["Data Science", "Python", "Pandas"]
  },
  {
    id: "8",
    name: "Maria Lopez",
    email: "maria.l@company.com",
    location: "Mexico City, Mexico",
    status: "Active",
    balance: "$1,810.40",
    selectOptions: ["Mobile", "Flutter", "Firebase"]
  },
  {
    id: "9",
    name: "Jin Woo",
    email: "jin.w@company.com",
    location: "Tokyo, Japan",
    status: "Active",
    balance: "$2,750.90",
    selectOptions: ["Infrastructure", "Kubernetes", "Terraform"]
  },
  {
    id: "10",
    name: "Emily Carter",
    email: "emily.c@company.com",
    location: "New York, US",
    status: "Pending",
    balance: "$650.00",
    selectOptions: ["HR", "Payroll", "Compliance"]
  },
  {
    id: "11",
    name: "Nikhil Mehta",
    email: "nikhil.m@company.com",
    location: "Pune, India",
    status: "Active",
    balance: "$920.00",
    selectOptions: ["Machine Learning", "TensorFlow", "Python"]
  },
  {
    id: "12",
    name: "Chloe Dubois",
    email: "chloe.d@company.com",
    location: "Paris, France",
    status: "Inactive",
    balance: "$0.00",
    selectOptions: ["Marketing", "SEO", "Analytics"]
  },
  {
    id: "13",
    name: "Tom Becker",
    email: "tom.b@company.com",
    location: "Berlin, Germany",
    status: "Active",
    balance: "$2,400.00",
    selectOptions: ["Sales", "CRM", "Lead Generation"]
  },
  {
    id: "14",
    name: "Fatima Al-Zahrani",
    email: "fatima.z@company.com",
    location: "Riyadh, Saudi Arabia",
    status: "Active",
    balance: "$1,500.00",
    selectOptions: ["Finance", "Budgeting", "Forecasting"]
  },
  {
    id: "15",
    name: "Lucas Silva",
    email: "lucas.s@company.com",
    location: "São Paulo, Brazil",
    status: "Pending",
    balance: "$480.80",
    selectOptions: ["Support", "Live Chat", "Zendesk"]
  }
];

export default function RuixenTableBasic() {
  return (
    <div className="bg-background">
      <div className="[&>div]:max-h-96 max-w-5xl mx-auto mt-32 rounded-xl border border-gray-200 dark:border-gray-800">
        <Table className="border-separate">
          <TableHeader className="sticky top-0 z-10 bg-gray-50/50 dark:bg-black backdrop-blur-xl">
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-left font-normal">Name</TableHead>
              <TableHead className="text-left font-normal">Email</TableHead>
              <TableHead className="text-left font-normal">Location</TableHead>
              <TableHead className="text-left font-normal">Status</TableHead>
              <TableHead className="text-right font-normal">Balance</TableHead>
              <TableHead className="text-left font-normal">Notes</TableHead> {/* Input */}
              <TableHead className="text-left font-normal">Category</TableHead> {/* Select */}
              <TableHead className="text-left font-normal">Selected</TableHead> {/* Checkbox */}
              <TableHead className="text-left font-normal">Actions</TableHead> {/* Dropdown */}
            </TableRow>
          </TableHeader>
          <TableBody className="text-gray-700 dark:text-gray-400">
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-normal">{item.name}</TableCell>
                <TableCell className="font-normal">{item.email}</TableCell>
                <TableCell className="font-normal">{item.location}</TableCell>
                <TableCell className="font-normal">{item.status}</TableCell>
                <TableCell className="text-right font-normal">{item.balance}</TableCell>

                {/* Input Column */}
                <TableCell>
                  <Input placeholder="Enter note" className="w-[140px]" />
                </TableCell>

                {/* Dynamic Select Column */}
                <TableCell>
                  <Select>
                    <SelectTrigger className="w-[140px] border border-gray-200 dark:border-gray-800">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                      {item.selectOptions?.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>

                {/* Checkbox Column */}
                <TableCell>
                  <Checkbox />
                </TableCell>

                {/* Dropdown Menu Column */}
                <TableCell className="w-[120px]">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full shadow-none"
                        aria-label="Open edit menu"
                      >
                        <Ellipsis size={16} strokeWidth={2} aria-hidden="true" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Option 1</DropdownMenuItem>
                      <DropdownMenuItem>Option 2</DropdownMenuItem>
                      <DropdownMenuItem>Option 3</DropdownMenuItem>
                      <DropdownMenuItem>Option 4</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {/* Footer */}
          <TableFooter className="bg-transparent">
            <TableRow>
              <TableCell colSpan={9} className="text-center">
                <Link href="https://ruixen.com?utm_source=21st.dev&utm_medium=components&utm_campaign=ruixen" target="_blank">
                  <span className="flex items-center justify-center gap-1 text-sm font-normal">
                    Made with <Heart className="w-4 h-4 text-red-500 inline" /> by @ruixen
                  </span>
                </Link>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

      </div>
      <div className="mt-6">
        <Link href="https://ruixen.com?utm_source=21st.dev&utm_medium=components&utm_campaign=ruixen" target="_blank">
          <span className="flex items-center justify-center gap-1 text-sm font-normal">
            Made with <Heart className="w-4 h-4 text-red-500 inline" /> by @ruixen
          </span>
        </Link>
      </div>
    </div>
  );
}

```

Install NPM dependencies:
```bash
next, lucide-react
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
