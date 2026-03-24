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
contact-form.tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'

export default function ContactSection() {
    return (
        <section className="py-32">
            <div className="mx-auto max-w-3xl px-8 lg:px-0">
                <h1 className="text-center text-4xl font-semibold lg:text-5xl">Contact Sales</h1>
                <p className="mt-4 text-center">We'll help you find the right plan and pricing for your business.</p>

                <Card className="mx-auto mt-12 max-w-lg p-8 shadow-md sm:p-16">
                    <div>
                        <h2 className="text-xl font-semibold">Let's get you to the right place</h2>
                        <p className="mt-4 text-sm">Reach out to our sales team! We’re eager to learn more about how you plan to use our application.</p>
                    </div>

                    <form
                        action=""
                        className="**:[&>label]:block mt-12 space-y-6 *:space-y-3">
                        <div>
                            <Label htmlFor="name">Full name</Label>
                            <Input
                                type="text"
                                id="name"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="email">Work Email</Label>
                            <Input
                                type="email"
                                id="email"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="country">Country/Region</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Country/Region" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">DR Congo</SelectItem>
                                    <SelectItem value="2">United States</SelectItem>
                                    <SelectItem value="3">France</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="website">Company Website</Label>
                            <Input
                                type="url"
                                id="website"
                            />
                            <span className="text-muted-foreground inline-block text-sm">Must start with 'https'</span>
                        </div>

                        <div>
                            <Label htmlFor="job">Job function</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Job Function" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Finance</SelectItem>
                                    <SelectItem value="2">Education</SelectItem>
                                    <SelectItem value="3">Legal</SelectItem>
                                    <SelectItem value="4">More</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="msg">Message</Label>
                            <Textarea
                                id="msg"
                                rows={3}
                            />
                        </div>

                        <Button>Submit</Button>
                    </form>
                </Card>
            </div>
        </section>
    )
}

code.demo.1753874363843.tsx
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'

export default function ContactSection() {
    return (
        <section className="py-32">
            <div className="mx-auto max-w-4xl px-4 lg:px-0">
                <h1 className="mb-12 text-center text-4xl font-semibold lg:text-5xl">Help us route your inquiry</h1>

                <div className="grid divide-y border md:grid-cols-2 md:gap-4 md:divide-x md:divide-y-0">
                    <div className="flex flex-col justify-between space-y-8 p-6 sm:p-12">
                        <div>
                            <h2 className="mb-3 text-lg font-semibold">Collaborate</h2>
                            <Link
                                href="mailto:hello@tailus.io"
                                className="text-lg text-blue-600 hover:underline dark:text-blue-400">
                                hello@tailus.io
                            </Link>
                            <p className="mt-3 text-sm">+243 000 000 000</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between space-y-8 p-6 sm:p-12">
                        <div>
                            <h3 className="mb-3 text-lg font-semibold">Press</h3>
                            <Link
                                href="mailto:press@tailus.io"
                                className="text-lg text-blue-600 hover:underline dark:text-blue-400">
                                press@tailus.io
                            </Link>
                            <p className="mt-3 text-sm">+243 000 000 000</p>
                        </div>
                    </div>
                </div>

                <div className="h-3 border-x bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)]"></div>
                <form
                    action=""
                    className="border px-4 py-12 lg:px-0 lg:py-24">
                    <Card className="mx-auto max-w-lg p-8 sm:p-16">
                        <h3 className="text-xl font-semibold">Let's get you to the right place</h3>
                        <p className="mt-4 text-sm">Reach out to our sales team! We’re eager to learn more about how you plan to use our application.</p>

                        <div className="**:[&>label]:block mt-12 space-y-6 *:space-y-3">
                            <div>
                                <Label
                                    htmlFor="name"
                                    className="space-y-2">
                                    Full name
                                </Label>
                                <Input
                                    type="text"
                                    id="name"
                                    required
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="email"
                                    className="space-y-2">
                                    Work Email
                                </Label>
                                <Input
                                    type="email"
                                    id="email"
                                    required
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="country"
                                    className="space-y-2">
                                    Country/Region
                                </Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">DR Congo</SelectItem>
                                        <SelectItem value="2">United States</SelectItem>
                                        <SelectItem value="3">France</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label
                                    htmlFor="website"
                                    className="space-y-2">
                                    Company Website
                                </Label>
                                <Input
                                    type="url"
                                    id="website"
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="job"
                                    className="space-y-2">
                                    Job function
                                </Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a job function" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Finance</SelectItem>
                                        <SelectItem value="2">Education</SelectItem>
                                        <SelectItem value="3">Legal</SelectItem>
                                        <SelectItem value="4">More</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label
                                    htmlFor="msg"
                                    className="space-y-2">
                                    Message
                                </Label>
                                <Textarea
                                    id="msg"
                                    rows={3}
                                />
                            </div>
                            <Button>Submit</Button>
                        </div>
                    </Card>
                </form>
            </div>
        </section>
    )
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/contact-form.tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'

export default function ContactSection() {
    return (
        <section className="py-32">
            <div className="mx-auto max-w-3xl px-8 lg:px-0">
                <h1 className="text-center text-4xl font-semibold lg:text-5xl">Contact Sales</h1>
                <p className="mt-4 text-center">We'll help you find the right plan and pricing for your business.</p>

                <Card className="mx-auto mt-12 max-w-lg p-8 shadow-md sm:p-16">
                    <div>
                        <h2 className="text-xl font-semibold">Let's get you to the right place</h2>
                        <p className="mt-4 text-sm">Reach out to our sales team! We’re eager to learn more about how you plan to use our application.</p>
                    </div>

                    <form
                        action=""
                        className="**:[&>label]:block mt-12 space-y-6 *:space-y-3">
                        <div>
                            <Label htmlFor="name">Full name</Label>
                            <Input
                                type="text"
                                id="name"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="email">Work Email</Label>
                            <Input
                                type="email"
                                id="email"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="country">Country/Region</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Country/Region" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">DR Congo</SelectItem>
                                    <SelectItem value="2">United States</SelectItem>
                                    <SelectItem value="3">France</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="website">Company Website</Label>
                            <Input
                                type="url"
                                id="website"
                            />
                            <span className="text-muted-foreground inline-block text-sm">Must start with 'https'</span>
                        </div>

                        <div>
                            <Label htmlFor="job">Job function</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Job Function" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Finance</SelectItem>
                                    <SelectItem value="2">Education</SelectItem>
                                    <SelectItem value="3">Legal</SelectItem>
                                    <SelectItem value="4">More</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="msg">Message</Label>
                            <Textarea
                                id="msg"
                                rows={3}
                            />
                        </div>

                        <Button>Submit</Button>
                    </form>
                </Card>
            </div>
        </section>
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
