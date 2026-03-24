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
contributors-overview-table.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const contributors = [
  {
    id: "1",
    name: "Aarav Mehta",
    email: "aarav@ruixen.dev",
    location: "Bangalore, India",
    status: "Active",
    balance: "₹45,000",
  },
  {
    id: "2",
    name: "Elena Torres",
    email: "elena.t@ruixen.dev",
    location: "Barcelona, Spain",
    status: "Active",
    balance: "₹22,000",
  },
  {
    id: "3",
    name: "Kenji Nakamura",
    email: "kenji.n@ruixen.dev",
    location: "Tokyo, Japan",
    status: "Inactive",
    balance: "₹0",
  },
  {
    id: "4",
    name: "Leila Ahmed",
    email: "leila.a@ruixen.dev",
    location: "Cairo, Egypt",
    status: "Pending",
    balance: "₹10,000",
  },
  {
    id: "5",
    name: "Ryan Smith",
    email: "ryan.s@ruixen.dev",
    location: "Toronto, Canada",
    status: "Active",
    balance: "₹31,500",
  },
];

function ContributorsOverviewTable() {
  return (
    <div className="max-w-3xl mx-auto rounded-xl border border-border bg-background p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-foreground">Team Contributors</h2>
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Payout</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contributors.map((person) => (
            <TableRow key={person.id} className="hover:bg-muted/40 transition-colors">
              <TableCell className="font-medium">{person.name}</TableCell>
              <TableCell>{person.email}</TableCell>
              <TableCell>{person.location}</TableCell>
              <TableCell>
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                    person.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : person.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {person.status}
                </span>
              </TableCell>
              <TableCell className="text-right">{person.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="text-right font-semibold">
              Total
            </TableCell>
            <TableCell className="text-right font-bold text-foreground">₹1,08,500</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <p className="mt-4 text-center text-sm text-muted-foreground">contributors payout summary</p>
    </div>
  );
}

export default ContributorsOverviewTable;


code.demo.1749430453221.tsx
import ContributorsOverviewTable from "@/components/ui/contributors-overview-table";

const DemoOne = () => {
  return <ContributorsOverviewTable />;
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/contributors-overview-table.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const contributors = [
  {
    id: "1",
    name: "Aarav Mehta",
    email: "aarav@ruixen.dev",
    location: "Bangalore, India",
    status: "Active",
    balance: "₹45,000",
  },
  {
    id: "2",
    name: "Elena Torres",
    email: "elena.t@ruixen.dev",
    location: "Barcelona, Spain",
    status: "Active",
    balance: "₹22,000",
  },
  {
    id: "3",
    name: "Kenji Nakamura",
    email: "kenji.n@ruixen.dev",
    location: "Tokyo, Japan",
    status: "Inactive",
    balance: "₹0",
  },
  {
    id: "4",
    name: "Leila Ahmed",
    email: "leila.a@ruixen.dev",
    location: "Cairo, Egypt",
    status: "Pending",
    balance: "₹10,000",
  },
  {
    id: "5",
    name: "Ryan Smith",
    email: "ryan.s@ruixen.dev",
    location: "Toronto, Canada",
    status: "Active",
    balance: "₹31,500",
  },
];

function ContributorsOverviewTable() {
  return (
    <div className="max-w-3xl mx-auto rounded-xl border border-border bg-background p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-foreground">Team Contributors</h2>
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Payout</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contributors.map((person) => (
            <TableRow key={person.id} className="hover:bg-muted/40 transition-colors">
              <TableCell className="font-medium">{person.name}</TableCell>
              <TableCell>{person.email}</TableCell>
              <TableCell>{person.location}</TableCell>
              <TableCell>
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                    person.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : person.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {person.status}
                </span>
              </TableCell>
              <TableCell className="text-right">{person.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="text-right font-semibold">
              Total
            </TableCell>
            <TableCell className="text-right font-bold text-foreground">₹1,08,500</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <p className="mt-4 text-center text-sm text-muted-foreground">contributors payout summary</p>
    </div>
  );
}

export default ContributorsOverviewTable;

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
