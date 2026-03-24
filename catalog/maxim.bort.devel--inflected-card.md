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
inflected-card.tsx
"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface Tag {
  name: string;
  textColor: string;
  backgroundColor: string;
  rounding?: number;
  alignment?: 'left' | 'center' | 'right';
}

interface InflectedCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  tags: Tag[];
  parentBackgroundColor: string;
  onClick?: (hoverTarget: string, id: string) => void;
  onHover?: (hoverTarget: string, id: string) => void;
  cardRounding?: number;
  fontSizes?: {
    title?: string;
    description?: string;
    tags?: string;
    price?: string;
  };
  margins?: {
    title?: string;
    description?: string;
    tags?: string;
  };
  buttonIcon: React.ReactElement;
  buttonIconSize?: number;
  buttonIconColor?: string;
  buttonIconHoverColor?: string;
  buttonBackgroundColor?: string;
  buttonBackgroundHoverColor?: string;
  imageHoverScale?: number; // Use this prop!
  titleColor?: string;
  descriptionColor?: string;
  mirrored?: boolean;
  titleAlignment?: 'left' | 'center' | 'right';
  descriptionAlignment?: 'left' | 'center' | 'right';
  tagsAlignment?: 'left' | 'center' | 'right';
  maxWidth?: string;
  price?: string;
  priceTagTextColor?: string;
  oldPrice?: string;
  oldPriceOnTheRight?: boolean;
  oldPriceTextColor?: string;
  priceTagRounding?: string;
  priceTagBackgroundColor?: string;
}

export const InflectedCard: React.FC<InflectedCardProps> = ({
  id,
  image,
  title,
  description,
  tags,
  parentBackgroundColor,
  onClick,
  onHover,
  cardRounding = 20,
  fontSizes = {},
  margins = {},
  buttonIcon,
  buttonIconSize = 24,
  buttonIconColor = '#fff',
  buttonIconHoverColor = '#fff',
  buttonBackgroundColor = '#282828',
  buttonBackgroundHoverColor = '#484848',
  imageHoverScale = 1.1, // Default scale
  titleColor = '#f7f7ff',
  descriptionColor = '#c7c7cf',
  mirrored = false,
  titleAlignment = 'left',
  descriptionAlignment = 'left',
  tagsAlignment = 'left',
  maxWidth = '100%',
  price,
  priceTagTextColor = '#ffffff',
  oldPrice,
  oldPriceOnTheRight = false,
  oldPriceTextColor = '#c1c1c7',
  priceTagRounding = '5px',
  priceTagBackgroundColor = 'rgba(0,0,0,0.7)',
}) => {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick && onClick(hoveredElement || 'card', id);
  };
  const handleMouseEnter = (element: string) => {
    setHoveredElement(element);
    onHover && onHover(element, id);
  };
  const handleButtonMouseEnter = () => {
    setIsButtonHovered(true);
    handleMouseEnter('button');
  };
  const handleButtonMouseLeave = () => {
    setIsButtonHovered(false);
  };
  const isRTLCheck = (text: string): boolean => {
    return /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F]/.test(text);
  };
  const mirroredStyle: React.CSSProperties = mirrored ? { transform: 'scaleX(-1)' } : {};
  const reverseMirrorStyle: React.CSSProperties = mirrored ? { transform: 'scaleX(-1)' } : {};

  return (
    <>
      <div
        className="inflected-card"
        style={{
          '--card-rounding': `${cardRounding}px`,
          maxWidth: maxWidth,
          ...mirroredStyle,
        } as React.CSSProperties}
        onClick={handleCardClick}
      >
        <div
          className="inflected-cardInner"
          style={{ '--parent-bg': parentBackgroundColor } as React.CSSProperties}
        >
          <div className="inflected-box">
            <div
              className="inflected-imgBox"
              style={{
                ...reverseMirrorStyle,
                borderRadius: `${cardRounding}px`,
                overflow: 'hidden',
                width: '100%',
                height: '100%',
                position: 'absolute',
                inset: 0,
              } as React.CSSProperties}
              onMouseEnter={() => setIsImageHovered(true)}
              onMouseLeave={() => setIsImageHovered(false)}
            >
              <Image
                src={image}
                alt={title}
                layout="fill"
                objectFit="cover"
                draggable={false}
                style={{
                  transition: 'transform 0.3s ease',
                  willChange: 'transform',
                  transform: isImageHovered
                    ? `scale(${imageHoverScale})`
                    : 'scale(1)',
                  width: '100%',
                  height: '100%',
                  display: 'block',
                }}
              />
              {price && (
                <div
                  className="inflected-priceTag"
                  style={{
                    position: 'absolute',
                    top: '12px',
                    [mirrored ? 'right' : 'left']: '12px',
                    backgroundColor: priceTagBackgroundColor,
                    color: priceTagTextColor,
                    padding: '9px 15px',
                    borderRadius: priceTagRounding,
                    fontSize: fontSizes.price || '1rem',
                  }}
                  onMouseEnter={() => handleMouseEnter('priceTag')}
                  onClick={(event) => {
                    event.stopPropagation();
                    onClick && onClick('priceTag', id);
                  }}
                >
                  {oldPriceOnTheRight ? (
                    <>
                      <span
                        className="inflected-new-price"
                        style={{ fontWeight: 'bold' }}
                      >
                        {price}
                      </span>
                      {oldPrice && (
                        <span
                          className="inflected-old-price"
                          style={{
                            marginLeft: '8px',
                            textDecoration: 'line-through',
                            opacity: 0.7,
                            fontWeight: 'bold',
                            color: oldPriceTextColor,
                          }}
                        >
                          {oldPrice}
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      {oldPrice && (
                        <span
                          className="inflected-old-price"
                          style={{
                            textDecoration: 'line-through',
                            opacity: 0.7,
                            marginRight: '8px',
                            fontWeight: 'bold',
                            color: oldPriceTextColor,
                          }}
                        >
                          {oldPrice}
                        </span>
                      )}
                      <span
                        className="inflected-new-price"
                        style={{ fontWeight: 'bold' }}
                      >
                        {price}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
            <div
              className="inflected-icon"
              onMouseEnter={handleButtonMouseEnter}
              onMouseLeave={handleButtonMouseLeave}
            >
              <a
                className="inflected-iconBox"
                style={{
                  '--button-bg': buttonBackgroundColor,
                  '--button-hover-bg': buttonBackgroundHoverColor,
                  '--icon-color': buttonIconColor,
                  '--icon-hover-color': buttonIconHoverColor,
                  '--icon-size': `${buttonIconSize}px`,
                } as React.CSSProperties}
              >
                {React.cloneElement(buttonIcon, {
                  size: buttonIconSize,
                  color: isButtonHovered
                    ? buttonIconHoverColor
                    : buttonIconColor,
                })}
              </a>
            </div>
          </div>
        </div>
        <div className="inflected-content">
          <h3
            style={{
              fontSize: fontSizes.title,
              color: titleColor,
              margin: margins.title,
              fontWeight: 'bold',
              direction: isRTLCheck(title) ? 'rtl' : 'ltr',
              textAlign: titleAlignment,
              ...reverseMirrorStyle,
            }}
            onMouseEnter={() => handleMouseEnter('title')}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: fontSizes.description,
              color: descriptionColor,
              margin: margins.description,
              direction: isRTLCheck(description) ? 'rtl' : 'ltr',
              textAlign: descriptionAlignment,
              ...reverseMirrorStyle,
            }}
            onMouseEnter={() => handleMouseEnter('description')}
          >
            {description}
          </p>
          <ul
            style={{
              margin: margins.tags,
              display: 'flex',
              justifyContent: tagsAlignment,
              flexWrap: 'wrap',
              gap: '0.625rem',
              ...reverseMirrorStyle,
            }}
          >
            {tags.map((tag, index) => (
              <li
                key={index}
                style={{
                  '--tag-bg': tag.backgroundColor,
                  '--tag-color': tag.textColor,
                  '--tag-rounding': `${tag.rounding}px`,
                  fontSize: fontSizes.tags,
                  direction: isRTLCheck(tag.name) ? 'rtl' : 'ltr',
                  textAlign: tag.alignment || 'left',
                  display: 'inline-block',
                } as React.CSSProperties}
                onMouseEnter={() => handleMouseEnter(`tag-${tag.name}`)}
              >
                {tag.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .inflected-card {
          position: relative;
          border-radius: var(--card-rounding);
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .inflected-cardInner {
          position: relative;
          width: 100%;
          height: 18.75rem;
          background: var(--parent-bg);
          border-radius: var(--card-rounding);
          border-bottom-right-radius: 0;
          overflow: hidden;
        }
        .inflected-box {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
        }
        .inflected-imgBox {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: var(--card-rounding);
        }
        .inflected-icon {
          position: absolute;
          bottom: -0.375rem;
          right: -0.375rem;
          width: 6rem;
          height: 6rem;
          background: var(--parent-bg);
          border-top-left-radius: 50%;
          transition: all 0.3s ease;
        }
        .inflected-icon:hover .inflected-iconBox {
          transform: scale(1.1);
          cursor: pointer;
        }
        .inflected-icon::before {
          position: absolute;
          content: "";
          bottom: 0.375rem;
          left: -1.25rem;
          background: transparent;
          width: 1.25rem;
          height: 1.25rem;
          border-bottom-right-radius: 1.25rem;
          box-shadow: 0.313rem 0.313rem 0 0.313rem var(--parent-bg);
        }
        .inflected-icon::after {
          position: absolute;
          content: "";
          top: -1.25rem;
          right: 0.375rem;
          background: transparent;
          width: 1.25rem;
          height: 1.25rem;
          border-bottom-right-radius: 1.25rem;
          box-shadow: 0.313rem 0.313rem 0 0.313rem var(--parent-bg);
        }
        .inflected-iconBox {
          position: absolute;
          inset: 0.625rem;
          background: var(--button-bg);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s ease;
        }
        .inflected-iconBox:hover {
          background: var(--button-hover-bg);
        }
        .inflected-iconBox :global(span) {
          color: var(--icon-color);
          font-size: var(--icon-size);
          transition: color 0.3s ease;
        }
        .inflected-iconBox:hover :global(span) {
          color: var(--icon-hover-color);
        }
        .inflected-content {
          padding: 0.938rem 0.625rem;
        }
        .inflected-content h3 {
          transition: color 0.3s ease;
        }
        .inflected-content p {
          transition: color 0.3s ease;
        }
        .inflected-content ul {
          margin: 0;
          padding: 0;
          list-style-type: none;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.625rem;
        }
        .inflected-content ul li {
          background: var(--tag-bg);
          color: var(--tag-color);
          font-weight: 700;
          padding: 0.375rem 0.625rem;
          border-radius: var(--tag-rounding);
          transition: all 0.3s ease;
        }
        .inflected-content ul li:hover {
          opacity: 0.8;
        }
      `}</style>
    </>
  );
};

export default InflectedCard;


code.demo.1749345433420.tsx
// InflectedCardDemo.tsx
// Demo showcase for the InflectedCard component

import React from "react";
import { InflectedCard } from "@/components/ui/inflected-card";
import {
  FaApple,
  FaAndroid,
  FaArrowUp,
  FaRegSmile,
  FaMobileAlt,
  FaTags,
  FaCamera,
  FaGift
} from "react-icons/fa";


const InflectedCardDemo = () => (
  <section>

    {/* DARK THEME CARDS */}
    <div className="bg-[#0a0a0a] min-h-[300px] flex flex-wrap gap-8 items-center justify-center relative py-10 rounded-lg">
      <InflectedCard
        id="0"
        image="https://images.pexels.com/photos/18525574/pexels-photo-18525574/free-photo-of-unboxing-iphone-15-pro-max-box-in-natural-titanium-color-mention-zana_qaradaghy-on-instagram-while-use-this-photo-follow-on-instagram-zana_qaradaghy.jpeg"
        title="iPhone 15 Pro"
        description="Titanium smartphone with an advanced camera system, offering stunning photography capabilities and a sleek design."
        tags={[
          { name: "Pre-owned", textColor: "#f7f7ff", backgroundColor: "#00A6FB", rounding: 16 },
          { name: "50% off", textColor: "#242424", backgroundColor: "#f1f1f7", rounding: 16 },
        ]}
        parentBackgroundColor="#050505"
        onClick={(target, id) => console.log(`Clicked ${target} on card ${id}`)}
        onHover={(target, id) => console.log(`Hovering over ${target} on card ${id}`)}
        cardRounding={15}
        fontSizes={{ title: "1.8rem", description: "1rem", tags: "0.85rem", price: "1.12rem" }}
        margins={{ title: "0 0 7px 0", description: "0 0 18px 0", tags: "10px 0 0 0" }}
        buttonIcon={<FaMobileAlt />}
        buttonIconSize={32}
        buttonIconColor="#ffffff"
        buttonIconHoverColor="#EEEEEE"
        buttonBackgroundColor="#00A6FB"
        buttonBackgroundHoverColor="#0582CA"
        maxWidth="500px"
        price="$499"
        priceTagTextColor="#0A0A0A"
        oldPrice="$991"
        oldPriceTextColor="#565656"
        priceTagRounding="6px"
        priceTagBackgroundColor="rgba(255,255,255,0.78)"
      />
    </div>

    {/* LIGHT THEME CARDS */}
    <div className="bg-[#f8f8fa] min-h-[300px] flex flex-wrap gap-8 items-center justify-center relative p-10 rounded-lg mt-10">
      {/* Card 1: iPhone 15 Pro, uses FaApple icon, EN */}
      <InflectedCard
        id="4"
        image="https://images.pexels.com/photos/18525574/pexels-photo-18525574/free-photo-of-unboxing-iphone-15-pro-max-box-in-natural-titanium-color-mention-zana_qaradaghy-on-instagram-while-use-this-photo-follow-on-instagram-zana_qaradaghy.jpeg"
        title="iPhone 15 Pro"
        description="Titanium smartphone with an advanced camera system, offering stunning photography capabilities and a sleek design."
        tags={[
          { name: "Brand new", textColor: "#181818", backgroundColor: "#E0C3FC", rounding: 5 },
          { name: "10% off", textColor: "#181818", backgroundColor: "#b49ad7", rounding: 5 }, // 20% darker than #f5e6ff
        ]}
        parentBackgroundColor="#f8f8fa"
        onClick={(target, id) => console.log(`Clicked ${target} on card ${id}`)}
        onHover={(target, id) => console.log(`Hovering over ${target} on card ${id}`)}
        cardRounding={15}
        fontSizes={{ title: "1.8rem", description: "1rem", tags: "0.85rem", price: "0.84rem" }}
        margins={{ title: "0 0 7px 0", description: "0 0 18px 0", tags: "10px 0 0 0" }}
        buttonIcon={<FaApple />}
        buttonIconSize={32}
        buttonIconColor="#181818"
        buttonIconHoverColor="#fff"
        buttonBackgroundColor="#E0C3FC"
        buttonBackgroundHoverColor="#bca1e7"
        maxWidth="500px"
        price="$1,079"
        priceTagTextColor="#222"
        oldPriceTextColor="#555"
        oldPrice="$1,199"
        priceTagRounding="25px"
        priceTagBackgroundColor="#f5e6ff"
        titleColor="#181818"
        descriptionColor="#565656"
        titleAlignment="center"
        descriptionAlignment="center"
        tagsAlignment="center"
        imageHoverScale={1.4}
      />
      {/* Card 2: Galaxy Flip 6, uses FaAndroid icon, HEBREW RTL */}
      <InflectedCard
        id="5"
        image="https://images.unsplash.com/photo-1721864428881-dbabb9ea0017?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="סמסונג גלקסי פליפ 6"
        description="טלפון מתקפל חדשני עם עיצוב דקיק, תצוגה גדולה, ומאפשר חוויית צפייה וסביבת עבודה מרובת משימות."
        tags={[
          { name: "יד שניה", textColor: "#181818", backgroundColor: "#A2F9B8", rounding: 0 },
          { name: "50% הנחה", textColor: "#181818", backgroundColor: "#6ccf8f", rounding: 0 }, // 20% darker than #e1fbe6
        ]}
        parentBackgroundColor="#f8f8fa"
        onClick={(target, id) => console.log(`Clicked ${target} on card ${id}`)}
        onHover={(target, id) => console.log(`Hovering over ${target} on card ${id}`)}
        cardRounding={15}
        fontSizes={{ title: "1.8rem", description: "1rem", tags: "0.85rem", price: "1.12rem" }}
        margins={{ title: "0 0 7px 0", description: "0 0 18px 0", tags: "10px 0 0 0" }}
        buttonIcon={<FaAndroid />}
        buttonIconSize={32}
        buttonIconColor="#181818"
        buttonIconHoverColor="#fff"
        buttonBackgroundColor="#A2F9B8"
        buttonBackgroundHoverColor="#7ee6a2"
        maxWidth="500px"
        imageHoverZoom={1.1}
        price="₪1,499"
        priceTagTextColor="#181818"
        oldPrice="₪2,999"
        oldPriceTextColor="#565656"
        priceTagRounding="6px"
        priceTagBackgroundColor="#e1fbe6"
        titleColor="#181818"
        descriptionColor="#565656"
        mirrored={true}
        titleAlignment="right"
        descriptionAlignment="right"
        tagsAlignment="right"
      />
    </div>
  </section>
);

export { InflectedCardDemo };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/inflected-card.tsx
"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface Tag {
  name: string;
  textColor: string;
  backgroundColor: string;
  rounding?: number;
  alignment?: 'left' | 'center' | 'right';
}

interface InflectedCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  tags: Tag[];
  parentBackgroundColor: string;
  onClick?: (hoverTarget: string, id: string) => void;
  onHover?: (hoverTarget: string, id: string) => void;
  cardRounding?: number;
  fontSizes?: {
    title?: string;
    description?: string;
    tags?: string;
    price?: string;
  };
  margins?: {
    title?: string;
    description?: string;
    tags?: string;
  };
  buttonIcon: React.ReactElement;
  buttonIconSize?: number;
  buttonIconColor?: string;
  buttonIconHoverColor?: string;
  buttonBackgroundColor?: string;
  buttonBackgroundHoverColor?: string;
  imageHoverScale?: number; // Use this prop!
  titleColor?: string;
  descriptionColor?: string;
  mirrored?: boolean;
  titleAlignment?: 'left' | 'center' | 'right';
  descriptionAlignment?: 'left' | 'center' | 'right';
  tagsAlignment?: 'left' | 'center' | 'right';
  maxWidth?: string;
  price?: string;
  priceTagTextColor?: string;
  oldPrice?: string;
  oldPriceOnTheRight?: boolean;
  oldPriceTextColor?: string;
  priceTagRounding?: string;
  priceTagBackgroundColor?: string;
}

export const InflectedCard: React.FC<InflectedCardProps> = ({
  id,
  image,
  title,
  description,
  tags,
  parentBackgroundColor,
  onClick,
  onHover,
  cardRounding = 20,
  fontSizes = {},
  margins = {},
  buttonIcon,
  buttonIconSize = 24,
  buttonIconColor = '#fff',
  buttonIconHoverColor = '#fff',
  buttonBackgroundColor = '#282828',
  buttonBackgroundHoverColor = '#484848',
  imageHoverScale = 1.1, // Default scale
  titleColor = '#f7f7ff',
  descriptionColor = '#c7c7cf',
  mirrored = false,
  titleAlignment = 'left',
  descriptionAlignment = 'left',
  tagsAlignment = 'left',
  maxWidth = '100%',
  price,
  priceTagTextColor = '#ffffff',
  oldPrice,
  oldPriceOnTheRight = false,
  oldPriceTextColor = '#c1c1c7',
  priceTagRounding = '5px',
  priceTagBackgroundColor = 'rgba(0,0,0,0.7)',
}) => {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick && onClick(hoveredElement || 'card', id);
  };
  const handleMouseEnter = (element: string) => {
    setHoveredElement(element);
    onHover && onHover(element, id);
  };
  const handleButtonMouseEnter = () => {
    setIsButtonHovered(true);
    handleMouseEnter('button');
  };
  const handleButtonMouseLeave = () => {
    setIsButtonHovered(false);
  };
  const isRTLCheck = (text: string): boolean => {
    return /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F]/.test(text);
  };
  const mirroredStyle: React.CSSProperties = mirrored ? { transform: 'scaleX(-1)' } : {};
  const reverseMirrorStyle: React.CSSProperties = mirrored ? { transform: 'scaleX(-1)' } : {};

  return (
    <>
      <div
        className="inflected-card"
        style={{
          '--card-rounding': `${cardRounding}px`,
          maxWidth: maxWidth,
          ...mirroredStyle,
        } as React.CSSProperties}
        onClick={handleCardClick}
      >
        <div
          className="inflected-cardInner"
          style={{ '--parent-bg': parentBackgroundColor } as React.CSSProperties}
        >
          <div className="inflected-box">
            <div
              className="inflected-imgBox"
              style={{
                ...reverseMirrorStyle,
                borderRadius: `${cardRounding}px`,
                overflow: 'hidden',
                width: '100%',
                height: '100%',
                position: 'absolute',
                inset: 0,
              } as React.CSSProperties}
              onMouseEnter={() => setIsImageHovered(true)}
              onMouseLeave={() => setIsImageHovered(false)}
            >
              <Image
                src={image}
                alt={title}
                layout="fill"
                objectFit="cover"
                draggable={false}
                style={{
                  transition: 'transform 0.3s ease',
                  willChange: 'transform',
                  transform: isImageHovered
                    ? `scale(${imageHoverScale})`
                    : 'scale(1)',
                  width: '100%',
                  height: '100%',
                  display: 'block',
                }}
              />
              {price && (
                <div
                  className="inflected-priceTag"
                  style={{
                    position: 'absolute',
                    top: '12px',
                    [mirrored ? 'right' : 'left']: '12px',
                    backgroundColor: priceTagBackgroundColor,
                    color: priceTagTextColor,
                    padding: '9px 15px',
                    borderRadius: priceTagRounding,
                    fontSize: fontSizes.price || '1rem',
                  }}
                  onMouseEnter={() => handleMouseEnter('priceTag')}
                  onClick={(event) => {
                    event.stopPropagation();
                    onClick && onClick('priceTag', id);
                  }}
                >
                  {oldPriceOnTheRight ? (
                    <>
                      <span
                        className="inflected-new-price"
                        style={{ fontWeight: 'bold' }}
                      >
                        {price}
                      </span>
                      {oldPrice && (
                        <span
                          className="inflected-old-price"
                          style={{
                            marginLeft: '8px',
                            textDecoration: 'line-through',
                            opacity: 0.7,
                            fontWeight: 'bold',
                            color: oldPriceTextColor,
                          }}
                        >
                          {oldPrice}
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      {oldPrice && (
                        <span
                          className="inflected-old-price"
                          style={{
                            textDecoration: 'line-through',
                            opacity: 0.7,
                            marginRight: '8px',
                            fontWeight: 'bold',
                            color: oldPriceTextColor,
                          }}
                        >
                          {oldPrice}
                        </span>
                      )}
                      <span
                        className="inflected-new-price"
                        style={{ fontWeight: 'bold' }}
                      >
                        {price}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
            <div
              className="inflected-icon"
              onMouseEnter={handleButtonMouseEnter}
              onMouseLeave={handleButtonMouseLeave}
            >
              <a
                className="inflected-iconBox"
                style={{
                  '--button-bg': buttonBackgroundColor,
                  '--button-hover-bg': buttonBackgroundHoverColor,
                  '--icon-color': buttonIconColor,
                  '--icon-hover-color': buttonIconHoverColor,
                  '--icon-size': `${buttonIconSize}px`,
                } as React.CSSProperties}
              >
                {React.cloneElement(buttonIcon, {
                  size: buttonIconSize,
                  color: isButtonHovered
                    ? buttonIconHoverColor
                    : buttonIconColor,
                })}
              </a>
            </div>
          </div>
        </div>
        <div className="inflected-content">
          <h3
            style={{
              fontSize: fontSizes.title,
              color: titleColor,
              margin: margins.title,
              fontWeight: 'bold',
              direction: isRTLCheck(title) ? 'rtl' : 'ltr',
              textAlign: titleAlignment,
              ...reverseMirrorStyle,
            }}
            onMouseEnter={() => handleMouseEnter('title')}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: fontSizes.description,
              color: descriptionColor,
              margin: margins.description,
              direction: isRTLCheck(description) ? 'rtl' : 'ltr',
              textAlign: descriptionAlignment,
              ...reverseMirrorStyle,
            }}
            onMouseEnter={() => handleMouseEnter('description')}
          >
            {description}
          </p>
          <ul
            style={{
              margin: margins.tags,
              display: 'flex',
              justifyContent: tagsAlignment,
              flexWrap: 'wrap',
              gap: '0.625rem',
              ...reverseMirrorStyle,
            }}
          >
            {tags.map((tag, index) => (
              <li
                key={index}
                style={{
                  '--tag-bg': tag.backgroundColor,
                  '--tag-color': tag.textColor,
                  '--tag-rounding': `${tag.rounding}px`,
                  fontSize: fontSizes.tags,
                  direction: isRTLCheck(tag.name) ? 'rtl' : 'ltr',
                  textAlign: tag.alignment || 'left',
                  display: 'inline-block',
                } as React.CSSProperties}
                onMouseEnter={() => handleMouseEnter(`tag-${tag.name}`)}
              >
                {tag.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .inflected-card {
          position: relative;
          border-radius: var(--card-rounding);
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .inflected-cardInner {
          position: relative;
          width: 100%;
          height: 18.75rem;
          background: var(--parent-bg);
          border-radius: var(--card-rounding);
          border-bottom-right-radius: 0;
          overflow: hidden;
        }
        .inflected-box {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
        }
        .inflected-imgBox {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: var(--card-rounding);
        }
        .inflected-icon {
          position: absolute;
          bottom: -0.375rem;
          right: -0.375rem;
          width: 6rem;
          height: 6rem;
          background: var(--parent-bg);
          border-top-left-radius: 50%;
          transition: all 0.3s ease;
        }
        .inflected-icon:hover .inflected-iconBox {
          transform: scale(1.1);
          cursor: pointer;
        }
        .inflected-icon::before {
          position: absolute;
          content: "";
          bottom: 0.375rem;
          left: -1.25rem;
          background: transparent;
          width: 1.25rem;
          height: 1.25rem;
          border-bottom-right-radius: 1.25rem;
          box-shadow: 0.313rem 0.313rem 0 0.313rem var(--parent-bg);
        }
        .inflected-icon::after {
          position: absolute;
          content: "";
          top: -1.25rem;
          right: 0.375rem;
          background: transparent;
          width: 1.25rem;
          height: 1.25rem;
          border-bottom-right-radius: 1.25rem;
          box-shadow: 0.313rem 0.313rem 0 0.313rem var(--parent-bg);
        }
        .inflected-iconBox {
          position: absolute;
          inset: 0.625rem;
          background: var(--button-bg);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s ease;
        }
        .inflected-iconBox:hover {
          background: var(--button-hover-bg);
        }
        .inflected-iconBox :global(span) {
          color: var(--icon-color);
          font-size: var(--icon-size);
          transition: color 0.3s ease;
        }
        .inflected-iconBox:hover :global(span) {
          color: var(--icon-hover-color);
        }
        .inflected-content {
          padding: 0.938rem 0.625rem;
        }
        .inflected-content h3 {
          transition: color 0.3s ease;
        }
        .inflected-content p {
          transition: color 0.3s ease;
        }
        .inflected-content ul {
          margin: 0;
          padding: 0;
          list-style-type: none;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.625rem;
        }
        .inflected-content ul li {
          background: var(--tag-bg);
          color: var(--tag-color);
          font-weight: 700;
          padding: 0.375rem 0.625rem;
          border-radius: var(--tag-rounding);
          transition: all 0.3s ease;
        }
        .inflected-content ul li:hover {
          opacity: 0.8;
        }
      `}</style>
    </>
  );
};

export default InflectedCard;

```

Install NPM dependencies:
```bash
next
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
