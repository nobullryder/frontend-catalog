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
course-design-cards.tsx
import React from 'react';

// Define the type for the card data
interface CardData {
  id: number;
  colorClass: string;
  date: string;
  title: string;
  description: string;
  progressPercent: string;
  progressValue: string;
  imgSrc1?: string;
  imgAlt1?: string;
  imgSrc2?: string;
  imgAlt2?: string;
  countdownText: string;
}

// Define the props for the Card component
interface CardProps {
  data: CardData;
}

// SVG components (extracted for reusability and clarity)
const EllipsisIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0" clipRule="evenodd" />
  </svg>
);

const AddIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
  </svg>
);

const Card: React.FC<CardProps> = ({ data }) => {
  const {
    colorClass,
    date,
    title,
    description,
    progressPercent,
    progressValue,
    imgSrc1,
    imgAlt1,
    imgSrc2,
    imgAlt2,
    countdownText,
  } = data;

  return (
    <div className={`card ${colorClass}`}>
      <div className="card-header">
        <div className="date">{date}</div>
        <EllipsisIcon />
      </div>
      <div className="card-body">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="progress">
          <span>Progress</span>
          <div className="progress-bar"></div>
          <span>{progressValue}</span>
        </div>
      </div>
      <div className="card-footer">
        <ul>
          {imgSrc1 && (
            <li>
              <img src={imgSrc1} alt={imgAlt1 || 'user avatar'} />
            </li>
          )}
          {imgSrc2 && (
            <li>
              <img src={imgSrc2} alt={imgAlt2 || 'user avatar'} />
            </li>
          )}
          <li>
            <a href="#" className="btn-add">
              <AddIcon />
            </a>
          </li>
        </ul>
        <a href="#" className="btn-countdown">{countdownText}</a>
      </div>
    </div>
  );
};

export default Card;

code.demo.1753891440995.tsx
import React from 'react';
import Card from '@/components/ui/course-design-cards';
import '@/index.css'; 

const DefaultDemo: React.FC = () => {
  const cardData = [
    {
      id: 1,
      colorClass: 'green',
      date: 'Feb 2, 2021',
      title: 'web designing',
      description: 'Prototyping',
      progressPercent: '90%',
      progressValue: '90%',
      imgSrc1: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      imgAlt1: 'User 1',
      imgSrc2: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      imgAlt2: 'User 2',
      countdownText: '2 days left',
    },
    {
      id: 2,
      colorClass: 'orange',
      date: 'Feb 05, 2021',
      title: 'mobile app',
      description: 'Shopping',
      progressPercent: '30%',
      progressValue: '30%',
      imgSrc1: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      imgAlt1: 'User 3',
      imgSrc2: 'https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      imgAlt2: 'User 4',
      countdownText: '3 weeks left',
    },
    {
      id: 3,
      colorClass: 'red',
      date: 'March 03, 2021',
      title: 'dashboard',
      description: 'Medical',
      progressPercent: '50%',
      progressValue: '50%',
      imgSrc1: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      imgAlt1: 'User 5',
      imgSrc2: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      imgAlt2: 'User 6',
      countdownText: '3 weeks left',
    },
    {
      id: 4,
      colorClass: 'blue',
      date: 'March 08, 2021',
      title: 'web designing',
      description: 'Wireframing',
      progressPercent: '20%',
      progressValue: '20%',
      imgSrc1: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      imgAlt1: 'Erik Longman',
      imgSrc2: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      imgAlt2: 'Jane Doe',
      countdownText: '3 weeks left',
    },
  ];

  return (
    <section>
      {cardData.map((card) => (
        <Card key={card.id} data={card} />
      ))}
    </section>
  );
};

export default DefaultDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/course-design-cards.tsx
import React from 'react';

// Define the type for the card data
interface CardData {
  id: number;
  colorClass: string;
  date: string;
  title: string;
  description: string;
  progressPercent: string;
  progressValue: string;
  imgSrc1?: string;
  imgAlt1?: string;
  imgSrc2?: string;
  imgAlt2?: string;
  countdownText: string;
}

// Define the props for the Card component
interface CardProps {
  data: CardData;
}

// SVG components (extracted for reusability and clarity)
const EllipsisIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0" clipRule="evenodd" />
  </svg>
);

const AddIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
  </svg>
);

const Card: React.FC<CardProps> = ({ data }) => {
  const {
    colorClass,
    date,
    title,
    description,
    progressPercent,
    progressValue,
    imgSrc1,
    imgAlt1,
    imgSrc2,
    imgAlt2,
    countdownText,
  } = data;

  return (
    <div className={`card ${colorClass}`}>
      <div className="card-header">
        <div className="date">{date}</div>
        <EllipsisIcon />
      </div>
      <div className="card-body">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="progress">
          <span>Progress</span>
          <div className="progress-bar"></div>
          <span>{progressValue}</span>
        </div>
      </div>
      <div className="card-footer">
        <ul>
          {imgSrc1 && (
            <li>
              <img src={imgSrc1} alt={imgAlt1 || 'user avatar'} />
            </li>
          )}
          {imgSrc2 && (
            <li>
              <img src={imgSrc2} alt={imgAlt2 || 'user avatar'} />
            </li>
          )}
          <li>
            <a href="#" className="btn-add">
              <AddIcon />
            </a>
          </li>
        </ul>
        <a href="#" className="btn-countdown">{countdownText}</a>
      </div>
    </div>
  );
};

export default Card;
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
