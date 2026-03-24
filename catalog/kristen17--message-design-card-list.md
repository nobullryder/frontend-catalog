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
message-design-card-list.tsx
// src/components/ui/component.tsx
'use client';

import React from 'react';
import { Search,  Star } from 'lucide-react';
import clsx from 'clsx';

export interface MessageProps {
  id: string;
  avatar: string;
  name: string;
  text: string;
  date: string;
  isFavorite?: boolean;
  isActive?: boolean;
}

interface ClientMessagesSidebarProps {
  messages: MessageProps[];
  onMessageClick?: (id: string) => void;
  onFavoriteToggle?: (id: string) => void;
}

export const ClientMessagesSidebar: React.FC<ClientMessagesSidebarProps> = ({
  messages,
  onMessageClick,
  onFavoriteToggle,
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>client messages</h2>
        <div className="tools">
          <Search className="size-6" />
        </div>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={clsx('message', { active: message.isActive })}
            onClick={() => onMessageClick?.(message.id)}
          >
            <div className="message-body">
              <div className="profile-img">
                <img src={message.avatar} alt={message.name} />
              </div>
              <div className="profile">
                <div className="profile-name">
                  <h3>{message.name}</h3>
                  <Star
                    className={clsx('size-6', { fav: message.isFavorite })}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent message click from firing
                      onFavoriteToggle?.(message.id);
                    }}
                  />
                </div>
                <div className="profile-text">
                  <p>{message.text}</p>
                </div>
              </div>
            </div>
            <div className="message-footer">
              <div className="date">{message.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

code.demo.1753895144779.tsx
// src/demos/default.tsx
'use client';

import React, { useState } from 'react';
import { ClientMessagesSidebar, MessageProps } from '@/components/ui/message-design-card-list';

const initialMessages: MessageProps[] = [
  {
    id: '1',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'peter',
    text: 'I got your first assigment. It was quite good. You can start work on next assignment.',
    date: '21 July',
    isFavorite: false,
    isActive: false,
  },
  {
    id: '2',
    avatar: 'https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'david',
    text: 'Hey tell me about progress of project? Waiting for your response',
    date: '19 July',
    isFavorite: true,
    isActive: true, // This message starts active
  },
  {
    id: '3',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'sophia',
    text: 'When you start redesign of app? Previous project was perfect!',
    date: '18 July',
    isFavorite: false,
    isActive: false,
  },
  {
    id: '4',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'andrea',
    text: 'Hey tell me about progress of project? Waiting for your response',
    date: '18 July',
    isFavorite: false,
    isActive: false,
  },
  {
    id: '5',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'john',
    text: 'I want some changes in previous work you sent me. Waiting for your reply...',
    date: '17 July',
    isFavorite: false,
    isActive: false,
  },
  {
    id: '6',
    avatar: 'https://images.pexels.com/photos/709188/pexels-photo-709188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'martin',
    text: 'I am really impressed from your work :-). Keep doing great work.',
    date: '10 July',
    isFavorite: false,
    isActive: false,
  },
];

const DefaultDemo: React.FC = () => {
  const [messages, setMessages] = useState<MessageProps[]>(initialMessages);

  const handleMessageClick = (clickedId: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => ({
        ...msg,
        isActive: msg.id === clickedId,
      }))
    );
  };

  const handleFavoriteToggle = (toggledId: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === toggledId ? { ...msg, isFavorite: !msg.isFavorite } : msg
      )
    );
  };

  return (
    <ClientMessagesSidebar
      messages={messages}
      onMessageClick={handleMessageClick}
      onFavoriteToggle={handleFavoriteToggle}
    />
  );
};

export default DefaultDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/message-design-card-list.tsx
// src/components/ui/component.tsx
'use client';

import React from 'react';
import { Search,  Star } from 'lucide-react';
import clsx from 'clsx';

export interface MessageProps {
  id: string;
  avatar: string;
  name: string;
  text: string;
  date: string;
  isFavorite?: boolean;
  isActive?: boolean;
}

interface ClientMessagesSidebarProps {
  messages: MessageProps[];
  onMessageClick?: (id: string) => void;
  onFavoriteToggle?: (id: string) => void;
}

export const ClientMessagesSidebar: React.FC<ClientMessagesSidebarProps> = ({
  messages,
  onMessageClick,
  onFavoriteToggle,
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>client messages</h2>
        <div className="tools">
          <Search className="size-6" />
        </div>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={clsx('message', { active: message.isActive })}
            onClick={() => onMessageClick?.(message.id)}
          >
            <div className="message-body">
              <div className="profile-img">
                <img src={message.avatar} alt={message.name} />
              </div>
              <div className="profile">
                <div className="profile-name">
                  <h3>{message.name}</h3>
                  <Star
                    className={clsx('size-6', { fav: message.isFavorite })}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent message click from firing
                      onFavoriteToggle?.(message.id);
                    }}
                  />
                </div>
                <div className="profile-text">
                  <p>{message.text}</p>
                </div>
              </div>
            </div>
            <div className="message-footer">
              <div className="date">{message.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

Install NPM dependencies:
```bash
clsx, lucide-react
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
