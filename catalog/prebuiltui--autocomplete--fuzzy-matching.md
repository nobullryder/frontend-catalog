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
autocomplete.tsx
import * as React from 'react';
import { Autocomplete } from '@base-ui-components/react/autocomplete';

export default function ExampleAutocomplete() {
  return (
    <Autocomplete.Root items={tags}>
      <label className="flex flex-col gap-1 text-sm leading-5 font-medium text-gray-900">
        Search tags
        <Autocomplete.Input
          placeholder="e.g. feature"
          className="bg-[canvas] h-10 w-[16rem] md:w-[20rem] font-normal rounded-md border border-gray-200 pl-3.5 text-base text-gray-900 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
        />
      </label>

      <Autocomplete.Portal>
        <Autocomplete.Positioner className="outline-none" sideOffset={4}>
          <Autocomplete.Popup className="w-[var(--anchor-width)] max-h-[min(var(--available-height),23rem)] max-w-[var(--available-width)] overflow-y-auto scroll-pt-2 scroll-pb-2 overscroll-contain rounded-md bg-[canvas] py-2 text-gray-900 shadow-lg shadow-gray-200 outline-1 outline-gray-200 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300">
            <Autocomplete.Empty className="px-4 py-2 text-[0.925rem] leading-4 text-gray-600 empty:m-0 empty:p-0">
              No tags found.
            </Autocomplete.Empty>
            <Autocomplete.List>
              {(tag: Tag) => (
                <Autocomplete.Item
                  key={tag.id}
                  className="flex cursor-default py-2 pr-8 pl-4 text-base leading-4 outline-none select-none data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-gray-50 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-2 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded data-[highlighted]:before:bg-gray-900"
                  value={tag}
                >
                  {tag.value}
                </Autocomplete.Item>
              )}
            </Autocomplete.List>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
}

interface Tag {
  id: string;
  value: string;
}

const tags: Tag[] = [
  { id: 't1', value: 'feature' },
  { id: 't2', value: 'fix' },
  { id: 't3', value: 'bug' },
  { id: 't4', value: 'docs' },
  { id: 't5', value: 'internal' },
  { id: 't6', value: 'mobile' },
  { id: 'c-accordion', value: 'component: accordion' },
  { id: 'c-alert-dialog', value: 'component: alert dialog' },
  { id: 'c-autocomplete', value: 'component: autocomplete' },
  { id: 'c-avatar', value: 'component: avatar' },
  { id: 'c-checkbox', value: 'component: checkbox' },
  { id: 'c-checkbox-group', value: 'component: checkbox group' },
  { id: 'c-collapsible', value: 'component: collapsible' },
  { id: 'c-combobox', value: 'component: combobox' },
  { id: 'c-context-menu', value: 'component: context menu' },
  { id: 'c-dialog', value: 'component: dialog' },
  { id: 'c-field', value: 'component: field' },
  { id: 'c-fieldset', value: 'component: fieldset' },
  { id: 'c-filterable-menu', value: 'component: filterable menu' },
  { id: 'c-form', value: 'component: form' },
  { id: 'c-input', value: 'component: input' },
  { id: 'c-menu', value: 'component: menu' },
  { id: 'c-menubar', value: 'component: menubar' },
  { id: 'c-meter', value: 'component: meter' },
  { id: 'c-navigation-menu', value: 'component: navigation menu' },
  { id: 'c-number-field', value: 'component: number field' },
  { id: 'c-popover', value: 'component: popover' },
  { id: 'c-preview-card', value: 'component: preview card' },
  { id: 'c-progress', value: 'component: progress' },
  { id: 'c-radio', value: 'component: radio' },
  { id: 'c-scroll-area', value: 'component: scroll area' },
  { id: 'c-select', value: 'component: select' },
  { id: 'c-separator', value: 'component: separator' },
  { id: 'c-slider', value: 'component: slider' },
  { id: 'c-switch', value: 'component: switch' },
  { id: 'c-tabs', value: 'component: tabs' },
  { id: 'c-toast', value: 'component: toast' },
  { id: 'c-toggle', value: 'component: toggle' },
  { id: 'c-toggle-group', value: 'component: toggle group' },
  { id: 'c-toolbar', value: 'component: toolbar' },
  { id: 'c-tooltip', value: 'component: tooltip' },
];


code.demo.1757050974664.tsx
import * as React from 'react';
import { Autocomplete } from '@base-ui-components/react/autocomplete';
import { matchSorter } from 'match-sorter';

export default function ExampleFuzzyMatchingAutocomplete() {
  return (
    <Autocomplete.Root
      items={fuzzyItems}
      filter={fuzzyFilter}
      itemToStringValue={(item) => item.title}
    >
      <label className="flex flex-col gap-1 text-sm leading-5 font-medium text-gray-900">
        Fuzzy search documentation
        <Autocomplete.Input
          placeholder="e.g. React"
          className="bg-[canvas] h-10 w-[16rem] md:w-[20rem] font-normal rounded-md border border-gray-200 pl-3.5 text-base text-gray-900 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
        />
      </label>

      <Autocomplete.Portal>
        <Autocomplete.Positioner className="outline-none" sideOffset={4}>
          <Autocomplete.Popup className="w-[var(--anchor-width)] max-h-[min(var(--available-height),28rem)] max-w-[var(--available-width)] overflow-y-auto scroll-pt-2 scroll-pb-2 overscroll-contain rounded-md bg-[canvas] py-2 text-gray-900 shadow-lg shadow-gray-200 outline-1 outline-gray-200 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300">
            <Autocomplete.Empty className="px-4 py-2 text-[0.925rem] leading-4 text-gray-600 empty:m-0 empty:p-0">
              No results found for "{<Autocomplete.Value />}"
            </Autocomplete.Empty>

            <Autocomplete.List className="flex flex-col">
              {(item: FuzzyItem) => (
                <Autocomplete.Item
                  key={item.title}
                  value={item}
                  className="flex cursor-default py-2 pr-8 pl-4 text-base leading-4 outline-none select-none data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-2 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded data-[highlighted]:before:bg-gray-200"
                >
                  <Autocomplete.Value>
                    {(value) => (
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 font-medium leading-5">
                            {highlightText(item.title, value)}
                          </div>
                        </div>
                        <div className="text-sm leading-5 text-gray-600">
                          {highlightText(item.description, value)}
                        </div>
                      </div>
                    )}
                  </Autocomplete.Value>
                </Autocomplete.Item>
              )}
            </Autocomplete.List>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
}

function highlightText(text: string, query: string): React.ReactNode {
  const trimmed = query.trim();
  if (!trimmed) {
    return text;
  }

  const limited = trimmed.slice(0, 100);
  const escaped = limited.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');

  return text.split(regex).map((part, idx) =>
    regex.test(part) ? (
      <mark key={idx} className="text-blue-800 bg-transparent font-bold">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

function fuzzyFilter(item: FuzzyItem, query: string): boolean {
  if (!query) {
    return true;
  }

  const results = matchSorter([item], query, {
    keys: [
      'title',
      'description',
      'category',
      { key: 'title', threshold: matchSorter.rankings.CONTAINS },
      { key: 'description', threshold: matchSorter.rankings.WORD_STARTS_WITH },
    ],
  });

  return results.length > 0;
}

interface FuzzyItem {
  title: string;
  description: string;
  category: string;
}

const fuzzyItems: FuzzyItem[] = [
  {
    title: 'React Hooks Guide',
    description: 'Learn how to use React Hooks like useState, useEffect, and custom hooks',
    category: 'React',
  },
  {
    title: 'JavaScript Array Methods',
    description: 'Master array methods like map, filter, reduce, and forEach in JavaScript',
    category: 'JavaScript',
  },
  {
    title: 'CSS Flexbox Layout',
    description: 'Complete guide to CSS Flexbox for responsive web design',
    category: 'CSS',
  },
  {
    title: 'TypeScript Interfaces',
    description: 'Understanding TypeScript interfaces and type definitions',
    category: 'TypeScript',
  },
  {
    title: 'React Performance Optimization',
    description: 'Tips and techniques for optimizing React application performance',
    category: 'React',
  },
  {
    title: 'HTML Semantic Elements',
    description: 'Using semantic HTML elements for better accessibility and SEO',
    category: 'HTML',
  },
  {
    title: 'Node.js Express Server',
    description: 'Building RESTful APIs with Node.js and Express framework',
    category: 'Node.js',
  },
  {
    title: 'Vue Composition API',
    description: 'Modern Vue.js development using the Composition API',
    category: 'Vue.js',
  },
  {
    title: 'Angular Components',
    description: 'Creating reusable Angular components with TypeScript',
    category: 'Angular',
  },
  {
    title: 'Python Django Framework',
    description: 'Web development with Python Django framework',
    category: 'Python',
  },
  {
    title: 'CSS Grid Layout',
    description: 'Advanced CSS Grid techniques for complex layouts',
    category: 'CSS',
  },
  {
    title: 'React Testing Library',
    description: 'Testing React components with React Testing Library',
    category: 'React',
  },
  {
    title: 'MongoDB Queries',
    description: 'Advanced MongoDB queries and aggregation pipelines',
    category: 'Database',
  },
  {
    title: 'Webpack Configuration',
    description: 'Optimizing Webpack configuration for production builds',
    category: 'Build Tools',
  },
  {
    title: 'SASS/SCSS Guide',
    description: 'Writing maintainable CSS with SASS and SCSS',
    category: 'CSS',
  },
];

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/autocomplete.tsx
import * as React from 'react';
import { Autocomplete } from '@base-ui-components/react/autocomplete';

export default function ExampleAutocomplete() {
  return (
    <Autocomplete.Root items={tags}>
      <label className="flex flex-col gap-1 text-sm leading-5 font-medium text-gray-900">
        Search tags
        <Autocomplete.Input
          placeholder="e.g. feature"
          className="bg-[canvas] h-10 w-[16rem] md:w-[20rem] font-normal rounded-md border border-gray-200 pl-3.5 text-base text-gray-900 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
        />
      </label>

      <Autocomplete.Portal>
        <Autocomplete.Positioner className="outline-none" sideOffset={4}>
          <Autocomplete.Popup className="w-[var(--anchor-width)] max-h-[min(var(--available-height),23rem)] max-w-[var(--available-width)] overflow-y-auto scroll-pt-2 scroll-pb-2 overscroll-contain rounded-md bg-[canvas] py-2 text-gray-900 shadow-lg shadow-gray-200 outline-1 outline-gray-200 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300">
            <Autocomplete.Empty className="px-4 py-2 text-[0.925rem] leading-4 text-gray-600 empty:m-0 empty:p-0">
              No tags found.
            </Autocomplete.Empty>
            <Autocomplete.List>
              {(tag: Tag) => (
                <Autocomplete.Item
                  key={tag.id}
                  className="flex cursor-default py-2 pr-8 pl-4 text-base leading-4 outline-none select-none data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-gray-50 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-2 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded data-[highlighted]:before:bg-gray-900"
                  value={tag}
                >
                  {tag.value}
                </Autocomplete.Item>
              )}
            </Autocomplete.List>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
}

interface Tag {
  id: string;
  value: string;
}

const tags: Tag[] = [
  { id: 't1', value: 'feature' },
  { id: 't2', value: 'fix' },
  { id: 't3', value: 'bug' },
  { id: 't4', value: 'docs' },
  { id: 't5', value: 'internal' },
  { id: 't6', value: 'mobile' },
  { id: 'c-accordion', value: 'component: accordion' },
  { id: 'c-alert-dialog', value: 'component: alert dialog' },
  { id: 'c-autocomplete', value: 'component: autocomplete' },
  { id: 'c-avatar', value: 'component: avatar' },
  { id: 'c-checkbox', value: 'component: checkbox' },
  { id: 'c-checkbox-group', value: 'component: checkbox group' },
  { id: 'c-collapsible', value: 'component: collapsible' },
  { id: 'c-combobox', value: 'component: combobox' },
  { id: 'c-context-menu', value: 'component: context menu' },
  { id: 'c-dialog', value: 'component: dialog' },
  { id: 'c-field', value: 'component: field' },
  { id: 'c-fieldset', value: 'component: fieldset' },
  { id: 'c-filterable-menu', value: 'component: filterable menu' },
  { id: 'c-form', value: 'component: form' },
  { id: 'c-input', value: 'component: input' },
  { id: 'c-menu', value: 'component: menu' },
  { id: 'c-menubar', value: 'component: menubar' },
  { id: 'c-meter', value: 'component: meter' },
  { id: 'c-navigation-menu', value: 'component: navigation menu' },
  { id: 'c-number-field', value: 'component: number field' },
  { id: 'c-popover', value: 'component: popover' },
  { id: 'c-preview-card', value: 'component: preview card' },
  { id: 'c-progress', value: 'component: progress' },
  { id: 'c-radio', value: 'component: radio' },
  { id: 'c-scroll-area', value: 'component: scroll area' },
  { id: 'c-select', value: 'component: select' },
  { id: 'c-separator', value: 'component: separator' },
  { id: 'c-slider', value: 'component: slider' },
  { id: 'c-switch', value: 'component: switch' },
  { id: 'c-tabs', value: 'component: tabs' },
  { id: 'c-toast', value: 'component: toast' },
  { id: 'c-toggle', value: 'component: toggle' },
  { id: 'c-toggle-group', value: 'component: toggle group' },
  { id: 'c-toolbar', value: 'component: toolbar' },
  { id: 'c-tooltip', value: 'component: tooltip' },
];

```

Install NPM dependencies:
```bash
@base-ui-components/react
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
