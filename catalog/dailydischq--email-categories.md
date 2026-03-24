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
email-categories.tsx
import React, { useState, useMemo } from 'react';
import { 
  Inbox,
  SendHorizontal,
  Trash,
  MailX,
  SquarePen,
  Star,
  Archive
} from 'lucide-react';

interface CategoryFolder {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  folderType: string;
  unreadCount: number;
  color: string;
}

interface CategoriesSectionProps {
  onCategoryClick?: (folderType: string) => void;
  systemUnreadCounts?: Record<string, number>;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ 
  onCategoryClick,
  systemUnreadCounts = {}
}) => {
  const [selectedSystemFolder, setSelectedSystemFolder] = useState<string | null>(null);

  const systemFolders = useMemo(() => {
    const systemFolderConfig = [
      { name: 'Inbox', icon: Inbox, folderType: 'inbox' },
      { name: 'Sent', icon: SendHorizontal, folderType: 'sent' },
      { name: 'Drafts', icon: SquarePen, folderType: 'drafts' },
      { name: 'Trash', icon: Trash, folderType: 'trash' },
      { name: 'Spam', icon: MailX, folderType: 'spam' },
      { name: 'Starred', icon: Star, folderType: 'starred' },
      { name: 'Archive', icon: Archive, folderType: 'archive' }
    ];

    return systemFolderConfig.map(folder => {
      // Map folder names to Gmail system label IDs
      const systemLabelIdMap: Record<string, string> = {
        'Inbox': 'INBOX',
        'Sent': 'SENT', 
        'Drafts': 'DRAFT',
        'Trash': 'TRASH',
        'Spam': 'SPAM',
        'Starred': 'STARRED',
        'Archive': 'ARCHIVE'
      };
      
      const systemLabelId = systemLabelIdMap[folder.name];
      const unreadCount = systemLabelId ? (systemUnreadCounts[systemLabelId] || 0) : 0;

      return {
        ...folder,
        unreadCount,
        color: selectedSystemFolder === folder.folderType ? '#424242' : '#8f8f8fff'
      };
    });
  }, [systemUnreadCounts, selectedSystemFolder]);

  const handleSystemFolderClick = (folderType: string) => {
    setSelectedSystemFolder(folderType);
    onCategoryClick?.(folderType);
  };

  return (
    <div className="p-2">
      <div className="mb-3">
        <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Categories
        </h4>
      </div>
      <div className="space-y-1">
        {systemFolders.map((folder) => {
          const IconComponent = folder.icon;
          return (
            <button
              key={folder.name}
              onClick={() => handleSystemFolderClick(folder.folderType)}
              className="w-full flex items-center justify-between px-2 py-1.5 text-sm hover:bg-gray-100 rounded-md transition-colors group"
            >
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <IconComponent
                  size={18}
                  className="flex-shrink-0 transition-transform duration-200 group-hover:-rotate-12"
                  style={{ color: folder.color }}
                />
                <span className="text-gray-700 truncate">{folder.name}</span>
              </div>
              
              {/* Unread count badge */}
              {folder.unreadCount > 0 && (
                <div className="bg-blue-100 text-blue-700 text-xs px-1.5 py-0.5 rounded-full min-w-[18px] text-center flex-shrink-0 ml-2">
                  {folder.unreadCount > 99 ? '99+' : folder.unreadCount}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesSection;

code.demo.1756290960160.tsx
import CategoriesSection from '../components/ui/email-categories';

const App = () => {
  const handleCategoryClick = (folderType: string) => {
    console.log('Selected category:', folderType);
  };

  const mockUnreadCounts = {
    INBOX: 25,
    SENT: 0,
    DRAFT: 3,
    TRASH: 0,
    SPAM: 5,
    STARRED: 2,
    ARCHIVE: 0,
  };

  return (
    <div className="w-64 bg-white border rounded-lg">
      <CategoriesSection
        onCategoryClick={handleCategoryClick}
        systemUnreadCounts={mockUnreadCounts}
      />
    </div>
  );
};

export default App;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/email-categories.tsx
import React, { useState, useMemo } from 'react';
import { 
  Inbox,
  SendHorizontal,
  Trash,
  MailX,
  SquarePen,
  Star,
  Archive
} from 'lucide-react';

interface CategoryFolder {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  folderType: string;
  unreadCount: number;
  color: string;
}

interface CategoriesSectionProps {
  onCategoryClick?: (folderType: string) => void;
  systemUnreadCounts?: Record<string, number>;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ 
  onCategoryClick,
  systemUnreadCounts = {}
}) => {
  const [selectedSystemFolder, setSelectedSystemFolder] = useState<string | null>(null);

  const systemFolders = useMemo(() => {
    const systemFolderConfig = [
      { name: 'Inbox', icon: Inbox, folderType: 'inbox' },
      { name: 'Sent', icon: SendHorizontal, folderType: 'sent' },
      { name: 'Drafts', icon: SquarePen, folderType: 'drafts' },
      { name: 'Trash', icon: Trash, folderType: 'trash' },
      { name: 'Spam', icon: MailX, folderType: 'spam' },
      { name: 'Starred', icon: Star, folderType: 'starred' },
      { name: 'Archive', icon: Archive, folderType: 'archive' }
    ];

    return systemFolderConfig.map(folder => {
      // Map folder names to Gmail system label IDs
      const systemLabelIdMap: Record<string, string> = {
        'Inbox': 'INBOX',
        'Sent': 'SENT', 
        'Drafts': 'DRAFT',
        'Trash': 'TRASH',
        'Spam': 'SPAM',
        'Starred': 'STARRED',
        'Archive': 'ARCHIVE'
      };
      
      const systemLabelId = systemLabelIdMap[folder.name];
      const unreadCount = systemLabelId ? (systemUnreadCounts[systemLabelId] || 0) : 0;

      return {
        ...folder,
        unreadCount,
        color: selectedSystemFolder === folder.folderType ? '#424242' : '#8f8f8fff'
      };
    });
  }, [systemUnreadCounts, selectedSystemFolder]);

  const handleSystemFolderClick = (folderType: string) => {
    setSelectedSystemFolder(folderType);
    onCategoryClick?.(folderType);
  };

  return (
    <div className="p-2">
      <div className="mb-3">
        <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Categories
        </h4>
      </div>
      <div className="space-y-1">
        {systemFolders.map((folder) => {
          const IconComponent = folder.icon;
          return (
            <button
              key={folder.name}
              onClick={() => handleSystemFolderClick(folder.folderType)}
              className="w-full flex items-center justify-between px-2 py-1.5 text-sm hover:bg-gray-100 rounded-md transition-colors group"
            >
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <IconComponent
                  size={18}
                  className="flex-shrink-0 transition-transform duration-200 group-hover:-rotate-12"
                  style={{ color: folder.color }}
                />
                <span className="text-gray-700 truncate">{folder.name}</span>
              </div>
              
              {/* Unread count badge */}
              {folder.unreadCount > 0 && (
                <div className="bg-blue-100 text-blue-700 text-xs px-1.5 py-0.5 rounded-full min-w-[18px] text-center flex-shrink-0 ml-2">
                  {folder.unreadCount > 99 ? '99+' : folder.unreadCount}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesSection;
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
