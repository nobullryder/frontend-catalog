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
sortable.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  defaultDropAnimation,
  defaultDropAnimationSideEffects,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
  type DraggableAttributes,
  type DraggableSyntheticListeners,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Slot } from '@radix-ui/react-slot';

interface KanbanContextProps<T> {
  columns: Record<string, T[]>;
  setColumns: (columns: Record<string, T[]>) => void;
  getItemId: (item: T) => string;
  columnIds: string[];
  activeId: UniqueIdentifier | null;
  setActiveId: (id: UniqueIdentifier | null) => void;
  findContainer: (id: UniqueIdentifier) => string | undefined;
  isColumn: (id: UniqueIdentifier) => boolean;
}

const KanbanContext = React.createContext<KanbanContextProps<any>>({
  columns: {},
  setColumns: () => {},
  getItemId: () => '',
  columnIds: [],
  activeId: null,
  setActiveId: () => {},
  findContainer: () => undefined,
  isColumn: () => false,
});

const ColumnContext = React.createContext<{
  attributes: DraggableAttributes;
  listeners: DraggableSyntheticListeners | undefined;
  isDragging?: boolean;
  disabled?: boolean;
}>({
  attributes: {} as DraggableAttributes,
  listeners: undefined,
  isDragging: false,
  disabled: false,
});

const ItemContext = React.createContext<{
  listeners: DraggableSyntheticListeners | undefined;
  isDragging?: boolean;
  disabled?: boolean;
}>({
  listeners: undefined,
  isDragging: false,
  disabled: false,
});

const dropAnimationConfig: DropAnimation = {
  ...defaultDropAnimation,
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.4',
      },
    },
  }),
};

export interface KanbanMoveEvent {
  event: DragEndEvent;
  activeContainer: string;
  activeIndex: number;
  overContainer: string;
  overIndex: number;
}

export interface KanbanRootProps<T> {
  value: Record<string, T[]>;
  onValueChange: (value: Record<string, T[]>) => void;
  getItemValue: (item: T) => string;
  children: React.ReactNode;
  className?: string;
  onMove?: (event: KanbanMoveEvent) => void;
}

function Kanban<T>({ value, onValueChange, getItemValue, children, className, onMove }: KanbanRootProps<T>) {
  const columns = value;
  const setColumns = onValueChange;
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const columnIds = React.useMemo(() => Object.keys(columns), [columns]);

  const isColumn = React.useCallback((id: UniqueIdentifier) => columnIds.includes(id as string), [columnIds]);

  const findContainer = React.useCallback(
    (id: UniqueIdentifier) => {
      if (isColumn(id)) return id as string;
      return columnIds.find((key) => columns[key].some((item) => getItemValue(item) === id));
    },
    [columns, columnIds, getItemValue, isColumn],
  );

  const handleDragStart = React.useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragOver = React.useCallback(
    (event: DragOverEvent) => {
      if (onMove) {
        return;
      }

      const { active, over } = event;
      if (!over) return;

      if (isColumn(active.id)) return;

      const activeContainer = findContainer(active.id);
      const overContainer = findContainer(over.id);

      // Only handle moving items between different columns
      if (!activeContainer || !overContainer || activeContainer === overContainer) {
        return;
      }

      const activeItems = columns[activeContainer];
      const overItems = columns[overContainer];

      const activeIndex = activeItems.findIndex((item: T) => getItemValue(item) === active.id);
      let overIndex = overItems.findIndex((item: T) => getItemValue(item) === over.id);

      // If dropping on the column itself, not an item
      if (isColumn(over.id)) {
        overIndex = overItems.length;
      }

      const newOverItems = [...overItems];
      const [movedItem] = activeItems.splice(activeIndex, 1);
      newOverItems.splice(overIndex, 0, movedItem);

      setColumns({
        ...columns,
        [activeContainer]: [...activeItems],
        [overContainer]: newOverItems,
      });
    },
    [findContainer, getItemValue, isColumn, setColumns, columns, onMove],
  );

  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);

      if (!over) return;

      // Handle item move callback
      if (onMove && !isColumn(active.id)) {
        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over.id);

        if (activeContainer && overContainer) {
          const activeIndex = columns[activeContainer].findIndex((item: T) => getItemValue(item) === active.id);
          const overIndex = isColumn(over.id)
            ? columns[overContainer].length
            : columns[overContainer].findIndex((item: T) => getItemValue(item) === over.id);

          onMove({
            event,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
          });
        }
        return;
      }

      // Handle column reordering
      if (isColumn(active.id) && isColumn(over.id)) {
        const activeIndex = columnIds.indexOf(active.id as string);
        const overIndex = columnIds.indexOf(over.id as string);
        if (activeIndex !== overIndex) {
          const newOrder = arrayMove(Object.keys(columns), activeIndex, overIndex);
          const newColumns: Record<string, T[]> = {};
          newOrder.forEach((key) => {
            newColumns[key] = columns[key];
          });
          setColumns(newColumns);
        }
        return;
      }

      const activeContainer = findContainer(active.id);
      const overContainer = findContainer(over.id);

      // Handle item reordering within the same column
      if (activeContainer && overContainer && activeContainer === overContainer) {
        const container = activeContainer;
        const activeIndex = columns[container].findIndex((item: T) => getItemValue(item) === active.id);
        const overIndex = columns[container].findIndex((item: T) => getItemValue(item) === over.id);

        if (activeIndex !== overIndex) {
          setColumns({
            ...columns,
            [container]: arrayMove(columns[container], activeIndex, overIndex),
          });
        }
      }
    },
    [columnIds, columns, findContainer, getItemValue, isColumn, setColumns, onMove],
  );

  const contextValue = React.useMemo(
    () => ({
      columns,
      setColumns,
      getItemId: getItemValue,
      columnIds,
      activeId,
      setActiveId,
      findContainer,
      isColumn,
    }),
    [columns, setColumns, getItemValue, columnIds, activeId, findContainer, isColumn],
  );

  return (
    <KanbanContext.Provider value={contextValue}>
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
        <div data-slot="kanban" data-dragging={activeId !== null} className={cn(className)}>
          {children}
        </div>
      </DndContext>
    </KanbanContext.Provider>
  );
}

export interface KanbanBoardProps {
  className?: string;
  children: React.ReactNode;
}

function KanbanBoard({ children, className }: KanbanBoardProps) {
  const { columnIds } = React.useContext(KanbanContext);

  return (
    <SortableContext items={columnIds} strategy={rectSortingStrategy}>
      <div data-slot="kanban-board" className={cn('grid auto-rows-fr sm:grid-cols-3 gap-4', className)}>
        {children}
      </div>
    </SortableContext>
  );
}

export interface KanbanColumnProps {
  value: string;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

function KanbanColumn({ value, className, children, disabled }: KanbanColumnProps) {
  const {
    setNodeRef,
    transform,
    transition,
    attributes,
    listeners,
    isDragging: isSortableDragging,
  } = useSortable({
    id: value,
    disabled,
  });

  const { activeId, isColumn } = React.useContext(KanbanContext);
  const isColumnDragging = activeId ? isColumn(activeId) : false;

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  } as React.CSSProperties;

  return (
    <ColumnContext.Provider value={{ attributes, listeners, isDragging: isColumnDragging, disabled }}>
      <div
        data-slot="kanban-column"
        data-value={value}
        data-dragging={isSortableDragging}
        data-disabled={disabled}
        ref={setNodeRef}
        style={style}
        className={cn(
          'group/kanban-column flex flex-col',
          isSortableDragging && 'opacity-50',
          disabled && 'opacity-50',
          className,
        )}
      >
        {children}
      </div>
    </ColumnContext.Provider>
  );
}

export interface KanbanColumnHandleProps {
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
  cursor?: boolean;
}

function KanbanColumnHandle({ asChild, className, children, cursor = true }: KanbanColumnHandleProps) {
  const { attributes, listeners, isDragging, disabled } = React.useContext(ColumnContext);

  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-slot="kanban-column-handle"
      data-dragging={isDragging}
      data-disabled={disabled}
      {...attributes}
      {...listeners}
      className={cn(
        'opacity-0 transition-opacity group-hover/kanban-column:opacity-100',
        cursor && (isDragging ? '!cursor-grabbing' : '!cursor-grab'),
        className,
      )}
    >
      {children}
    </Comp>
  );
}

export interface KanbanItemProps {
  value: string;
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

function KanbanItem({ value, asChild = false, className, children, disabled }: KanbanItemProps) {
  const {
    setNodeRef,
    transform,
    transition,
    attributes,
    listeners,
    isDragging: isSortableDragging,
  } = useSortable({
    id: value,
    disabled,
  });

  const { activeId, isColumn } = React.useContext(KanbanContext);
  const isItemDragging = activeId ? !isColumn(activeId) : false;

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  } as React.CSSProperties;

  const Comp = asChild ? Slot : 'div';

  return (
    <ItemContext.Provider value={{ listeners, isDragging: isItemDragging, disabled }}>
      <Comp
        data-slot="kanban-item"
        data-value={value}
        data-dragging={isSortableDragging}
        data-disabled={disabled}
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={cn(isSortableDragging && 'opacity-50', disabled && 'opacity-50', className)}
      >
        {children}
      </Comp>
    </ItemContext.Provider>
  );
}

export interface KanbanItemHandleProps {
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
  cursor?: boolean;
}

function KanbanItemHandle({ asChild, className, children, cursor = true }: KanbanItemHandleProps) {
  const { listeners, isDragging, disabled } = React.useContext(ItemContext);

  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-slot="kanban-item-handle"
      data-dragging={isDragging}
      data-disabled={disabled}
      {...listeners}
      className={cn(cursor && (isDragging ? '!cursor-grabbing' : '!cursor-grab'), className)}
    >
      {children}
    </Comp>
  );
}

export interface KanbanColumnContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

function KanbanColumnContent({ value, className, children }: KanbanColumnContentProps) {
  const { columns, getItemId } = React.useContext(KanbanContext);

  const itemIds = React.useMemo(() => columns[value].map(getItemId), [columns, getItemId, value]);

  return (
    <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
      <div data-slot="kanban-column-content" className={cn('flex flex-col gap-2', className)}>
        {children}
      </div>
    </SortableContext>
  );
}

export interface KanbanOverlayProps {
  className?: string;
  children?: React.ReactNode | ((params: { value: UniqueIdentifier; variant: 'column' | 'item' }) => React.ReactNode);
}

function KanbanOverlay({ children, className }: KanbanOverlayProps) {
  const { activeId, isColumn } = React.useContext(KanbanContext);
  const [dimensions, setDimensions] = React.useState<{ width: number; height: number } | null>(null);

  React.useEffect(() => {
    if (activeId) {
      const element = document.querySelector(
        `[data-slot="kanban-${isColumn(activeId) ? 'column' : 'item'}"][data-value="${activeId}"]`,
      );
      if (element) {
        const rect = element.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    } else {
      setDimensions(null);
    }
  }, [activeId]);

  const style = {
    width: dimensions?.width,
    height: dimensions?.height,
  } as React.CSSProperties;

  const content = React.useMemo(() => {
    if (!activeId) return null;
    if (typeof children === 'function') {
      return children({
        value: activeId,
        variant: isColumn(activeId) ? 'column' : 'item',
      });
    }
    return children;
  }, [activeId, children, isColumn]);

  return (
    <DragOverlay dropAnimation={dropAnimationConfig}>
      <div
        data-slot="kanban-overlay"
        data-dragging={true}
        style={style}
        className={cn('pointer-events-none', className, activeId ? '!cursor-grabbing' : '')}
      >
        {content}
      </div>
    </DragOverlay>
  );
}

// Sortable Item Context
const SortableItemContext = React.createContext<{
  listeners: DraggableSyntheticListeners | undefined;
  isDragging?: boolean;
  disabled?: boolean;
}>({
  listeners: undefined,
  isDragging: false,
  disabled: false,
});

// Multipurpose Sortable Component
export interface SortableRootProps<T> {
  value: T[];
  onValueChange: (value: T[]) => void;
  getItemValue: (item: T) => string;
  children: React.ReactNode;
  className?: string;
  onMove?: (event: { event: DragEndEvent; activeIndex: number; overIndex: number }) => void;
  strategy?: 'horizontal' | 'vertical' | 'grid';
  onDragStart?: (event: DragStartEvent) => void;
  onDragEnd?: (event: DragEndEvent) => void;
}

function Sortable<T>({
  value,
  onValueChange,
  getItemValue,
  children,
  className,
  onMove,
  strategy = 'vertical',
  onDragStart,
  onDragEnd,
}: SortableRootProps<T>) {
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = React.useCallback(
    (event: DragStartEvent) => {
      setActiveId(event.active.id);
      onDragStart?.(event);
    },
    [onDragStart],
  );

  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);
      onDragEnd?.(event);

      if (!over) return;

      // Handle item reordering
      const activeIndex = value.findIndex((item: T) => getItemValue(item) === active.id);
      const overIndex = value.findIndex((item: T) => getItemValue(item) === over.id);

      if (activeIndex !== overIndex) {
        if (onMove) {
          onMove({ event, activeIndex, overIndex });
        } else {
          const newValue = arrayMove(value, activeIndex, overIndex);
          onValueChange(newValue);
        }
      }
    },
    [value, getItemValue, onValueChange, onMove, onDragEnd],
  );

  const getStrategy = () => {
    switch (strategy) {
      case 'horizontal':
        return rectSortingStrategy;
      case 'grid':
        return rectSortingStrategy;
      case 'vertical':
      default:
        return verticalListSortingStrategy;
    }
  };

  const itemIds = React.useMemo(() => value.map(getItemValue), [value, getItemValue]);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SortableContext items={itemIds} strategy={getStrategy()}>
        <div data-slot="sortable" data-dragging={activeId !== null} className={cn(className)}>
          {children}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeId ? (
          <div className="z-50">
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child) && (child.props as any).value === activeId) {
                return React.cloneElement(child as React.ReactElement<any>, {
                  ...(child.props as any),
                  className: cn((child.props as any).className, 'z-50 shadow-lg'),
                });
              }
              return null;
            })}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export interface SortableItemProps {
  value: string;
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

function SortableItem({ value, asChild = false, className, children, disabled }: SortableItemProps) {
  const {
    setNodeRef,
    transform,
    transition,
    attributes,
    listeners,
    isDragging: isSortableDragging,
  } = useSortable({
    id: value,
    disabled,
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  } as React.CSSProperties;

  const Comp = asChild ? Slot : 'div';

  return (
    <SortableItemContext.Provider value={{ listeners, isDragging: isSortableDragging, disabled }}>
      <Comp
        data-slot="sortable-item"
        data-value={value}
        data-dragging={isSortableDragging}
        data-disabled={disabled}
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={cn(isSortableDragging && 'opacity-50 z-50', disabled && 'opacity-50', className)}
      >
        {children}
      </Comp>
    </SortableItemContext.Provider>
  );
}

export interface SortableItemHandleProps {
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
  cursor?: boolean;
}

function SortableItemHandle({ asChild, className, children, cursor = true }: SortableItemHandleProps) {
  const { listeners, isDragging, disabled } = React.useContext(SortableItemContext);

  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-slot="sortable-item-handle"
      data-dragging={isDragging}
      data-disabled={disabled}
      {...listeners}
      className={cn(cursor && (isDragging ? '!cursor-grabbing' : '!cursor-grab'), className)}
    >
      {children}
    </Comp>
  );
}

export {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnHandle,
  KanbanItem,
  KanbanItemHandle,
  KanbanColumnContent,
  KanbanOverlay,
  // New multipurpose sortable components
  Sortable,
  SortableItem,
  SortableItemHandle,
};



code.demo.1757489871341.tsx
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge-2';
import { Sortable, SortableItem, SortableItemHandle } from '@/components/ui/sortable';
import { FileTextIcon, GripVertical, ImageIcon, MusicIcon, StarIcon, VideoIcon } from 'lucide-react';
import { toast } from 'sonner';

interface GridItem {
  id: string;
  title: string;
  description: string;
  type: 'image' | 'document' | 'audio' | 'video' | 'featured';
  size: string;
  priority: 'high' | 'medium' | 'low';
}

const defaultGridItems: GridItem[] = [
  {
    id: '1',
    title: 'Hero Image',
    description: 'Main banner image',
    type: 'image',
    size: '2.4 MB',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Product Specs',
    description: 'Technical documentation',
    type: 'document',
    size: '1.2 MB',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Demo Video',
    description: 'Product demonstration',
    type: 'video',
    size: '15.7 MB',
    priority: 'high',
  },
  {
    id: '4',
    title: 'Audio Guide',
    description: 'Voice instructions',
    type: 'audio',
    size: '8.3 MB',
    priority: 'low',
  },
  {
    id: '5',
    title: 'Gallery Photo 1',
    description: 'Product view 1',
    type: 'image',
    size: '3.1 MB',
    priority: 'medium',
  },
  {
    id: '6',
    title: 'Gallery Photo 2',
    description: 'Product view 2',
    type: 'image',
    size: '2.8 MB',
    priority: 'medium',
  },
  {
    id: '7',
    title: 'User Manual',
    description: 'Installation guide',
    type: 'document',
    size: '4.2 MB',
    priority: 'high',
  },
  {
    id: '8',
    title: 'Background Music',
    description: 'Ambient soundtrack',
    type: 'audio',
    size: '12.1 MB',
    priority: 'low',
  },
  {
    id: '9',
    title: 'Feature Highlight',
    description: 'Key product features',
    type: 'featured',
    size: 'N/A',
    priority: 'high',
  },
];

const getTypeIcon = (type: GridItem['type']) => {
  switch (type) {
    case 'image':
      return <ImageIcon className="h-4 w-4" />;
    case 'document':
      return <FileTextIcon className="h-4 w-4" />;
    case 'audio':
      return <MusicIcon className="h-4 w-4" />;
    case 'video':
      return <VideoIcon className="h-4 w-4" />;
    case 'featured':
      return <StarIcon className="h-4 w-4" />;
  }
};

const getTypeColor = (type: GridItem['type']) => {
  switch (type) {
    case 'image':
      return 'primary';
    case 'document':
      return 'success';
    case 'audio':
      return 'destructive';
    case 'video':
      return 'info';
    case 'featured':
      return 'warning';
  }
};

const getPriorityColor = (priority: GridItem['priority']) => {
  switch (priority) {
    case 'high':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'low':
      return 'text-green-600 bg-green-50 border-green-200';
  }
};

const getItemSize = (type: GridItem['type']) => {
  switch (type) {
    case 'featured':
      return 'col-span-2 row-span-2';
    case 'image':
    case 'video':
      return 'col-span-1 row-span-1';
    case 'document':
    case 'audio':
      return 'col-span-1 row-span-1';
    default:
      return 'col-span-1 row-span-1';
  }
};

export default function SortableGrid() {
  const [items, setItems] = useState<GridItem[]>(defaultGridItems);

  const handleValueChange = (newItems: GridItem[]) => {
    console.log('🔴 GRID VALUE CHANGED:', newItems);
    setItems(newItems);

    // Show toast with new order
    toast.success('Grid items reordered successfully!', {
      description: `New order: ${newItems.map((item, index) => `${index + 1}. ${item.title}`).join(', ')}`,
      duration: 4000,
    });
  };

  const getItemValue = (item: GridItem) => item.id;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-6">
      <Sortable
        value={items}
        onValueChange={handleValueChange}
        getItemValue={getItemValue}
        strategy="grid"
        className="grid grid-cols-3 gap-3 auto-rows-fr"
      >
        {items.map((item) => (
          <SortableItem key={item.id} value={item.id}>
            <div
              className={cn(
                'group relative p-3 bg-background border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer',
                getItemSize(item.type),
                'min-h-[100px] flex flex-col',
              )}
              onClick={() => console.log('🔴 GRID ITEM CLICKED:', item.id)}
            >
              <SortableItemHandle className="absolute top-2.5 end-1.5 text-muted-foreground hover:text-foreground z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="h-3.5 w-3.5" />
              </SortableItemHandle>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{item.title}</h4>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{item.description}</p>
              </div>

              <div className="flex items-center justify-between mt-2">
                <Badge variant={getTypeColor(item.type)} appearance="outline" size="sm">
                  {item.type}
                </Badge>
                {item.type !== 'featured' && <span className="text-xs text-muted-foreground">{item.size}</span>}
              </div>
            </div>
          </SortableItem>
        ))}
      </Sortable>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/sortable.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  defaultDropAnimation,
  defaultDropAnimationSideEffects,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
  type DraggableAttributes,
  type DraggableSyntheticListeners,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Slot } from '@radix-ui/react-slot';

interface KanbanContextProps<T> {
  columns: Record<string, T[]>;
  setColumns: (columns: Record<string, T[]>) => void;
  getItemId: (item: T) => string;
  columnIds: string[];
  activeId: UniqueIdentifier | null;
  setActiveId: (id: UniqueIdentifier | null) => void;
  findContainer: (id: UniqueIdentifier) => string | undefined;
  isColumn: (id: UniqueIdentifier) => boolean;
}

const KanbanContext = React.createContext<KanbanContextProps<any>>({
  columns: {},
  setColumns: () => {},
  getItemId: () => '',
  columnIds: [],
  activeId: null,
  setActiveId: () => {},
  findContainer: () => undefined,
  isColumn: () => false,
});

const ColumnContext = React.createContext<{
  attributes: DraggableAttributes;
  listeners: DraggableSyntheticListeners | undefined;
  isDragging?: boolean;
  disabled?: boolean;
}>({
  attributes: {} as DraggableAttributes,
  listeners: undefined,
  isDragging: false,
  disabled: false,
});

const ItemContext = React.createContext<{
  listeners: DraggableSyntheticListeners | undefined;
  isDragging?: boolean;
  disabled?: boolean;
}>({
  listeners: undefined,
  isDragging: false,
  disabled: false,
});

const dropAnimationConfig: DropAnimation = {
  ...defaultDropAnimation,
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.4',
      },
    },
  }),
};

export interface KanbanMoveEvent {
  event: DragEndEvent;
  activeContainer: string;
  activeIndex: number;
  overContainer: string;
  overIndex: number;
}

export interface KanbanRootProps<T> {
  value: Record<string, T[]>;
  onValueChange: (value: Record<string, T[]>) => void;
  getItemValue: (item: T) => string;
  children: React.ReactNode;
  className?: string;
  onMove?: (event: KanbanMoveEvent) => void;
}

function Kanban<T>({ value, onValueChange, getItemValue, children, className, onMove }: KanbanRootProps<T>) {
  const columns = value;
  const setColumns = onValueChange;
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const columnIds = React.useMemo(() => Object.keys(columns), [columns]);

  const isColumn = React.useCallback((id: UniqueIdentifier) => columnIds.includes(id as string), [columnIds]);

  const findContainer = React.useCallback(
    (id: UniqueIdentifier) => {
      if (isColumn(id)) return id as string;
      return columnIds.find((key) => columns[key].some((item) => getItemValue(item) === id));
    },
    [columns, columnIds, getItemValue, isColumn],
  );

  const handleDragStart = React.useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragOver = React.useCallback(
    (event: DragOverEvent) => {
      if (onMove) {
        return;
      }

      const { active, over } = event;
      if (!over) return;

      if (isColumn(active.id)) return;

      const activeContainer = findContainer(active.id);
      const overContainer = findContainer(over.id);

      // Only handle moving items between different columns
      if (!activeContainer || !overContainer || activeContainer === overContainer) {
        return;
      }

      const activeItems = columns[activeContainer];
      const overItems = columns[overContainer];

      const activeIndex = activeItems.findIndex((item: T) => getItemValue(item) === active.id);
      let overIndex = overItems.findIndex((item: T) => getItemValue(item) === over.id);

      // If dropping on the column itself, not an item
      if (isColumn(over.id)) {
        overIndex = overItems.length;
      }

      const newOverItems = [...overItems];
      const [movedItem] = activeItems.splice(activeIndex, 1);
      newOverItems.splice(overIndex, 0, movedItem);

      setColumns({
        ...columns,
        [activeContainer]: [...activeItems],
        [overContainer]: newOverItems,
      });
    },
    [findContainer, getItemValue, isColumn, setColumns, columns, onMove],
  );

  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);

      if (!over) return;

      // Handle item move callback
      if (onMove && !isColumn(active.id)) {
        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over.id);

        if (activeContainer && overContainer) {
          const activeIndex = columns[activeContainer].findIndex((item: T) => getItemValue(item) === active.id);
          const overIndex = isColumn(over.id)
            ? columns[overContainer].length
            : columns[overContainer].findIndex((item: T) => getItemValue(item) === over.id);

          onMove({
            event,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
          });
        }
        return;
      }

      // Handle column reordering
      if (isColumn(active.id) && isColumn(over.id)) {
        const activeIndex = columnIds.indexOf(active.id as string);
        const overIndex = columnIds.indexOf(over.id as string);
        if (activeIndex !== overIndex) {
          const newOrder = arrayMove(Object.keys(columns), activeIndex, overIndex);
          const newColumns: Record<string, T[]> = {};
          newOrder.forEach((key) => {
            newColumns[key] = columns[key];
          });
          setColumns(newColumns);
        }
        return;
      }

      const activeContainer = findContainer(active.id);
      const overContainer = findContainer(over.id);

      // Handle item reordering within the same column
      if (activeContainer && overContainer && activeContainer === overContainer) {
        const container = activeContainer;
        const activeIndex = columns[container].findIndex((item: T) => getItemValue(item) === active.id);
        const overIndex = columns[container].findIndex((item: T) => getItemValue(item) === over.id);

        if (activeIndex !== overIndex) {
          setColumns({
            ...columns,
            [container]: arrayMove(columns[container], activeIndex, overIndex),
          });
        }
      }
    },
    [columnIds, columns, findContainer, getItemValue, isColumn, setColumns, onMove],
  );

  const contextValue = React.useMemo(
    () => ({
      columns,
      setColumns,
      getItemId: getItemValue,
      columnIds,
      activeId,
      setActiveId,
      findContainer,
      isColumn,
    }),
    [columns, setColumns, getItemValue, columnIds, activeId, findContainer, isColumn],
  );

  return (
    <KanbanContext.Provider value={contextValue}>
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
        <div data-slot="kanban" data-dragging={activeId !== null} className={cn(className)}>
          {children}
        </div>
      </DndContext>
    </KanbanContext.Provider>
  );
}

export interface KanbanBoardProps {
  className?: string;
  children: React.ReactNode;
}

function KanbanBoard({ children, className }: KanbanBoardProps) {
  const { columnIds } = React.useContext(KanbanContext);

  return (
    <SortableContext items={columnIds} strategy={rectSortingStrategy}>
      <div data-slot="kanban-board" className={cn('grid auto-rows-fr sm:grid-cols-3 gap-4', className)}>
        {children}
      </div>
    </SortableContext>
  );
}

export interface KanbanColumnProps {
  value: string;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

function KanbanColumn({ value, className, children, disabled }: KanbanColumnProps) {
  const {
    setNodeRef,
    transform,
    transition,
    attributes,
    listeners,
    isDragging: isSortableDragging,
  } = useSortable({
    id: value,
    disabled,
  });

  const { activeId, isColumn } = React.useContext(KanbanContext);
  const isColumnDragging = activeId ? isColumn(activeId) : false;

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  } as React.CSSProperties;

  return (
    <ColumnContext.Provider value={{ attributes, listeners, isDragging: isColumnDragging, disabled }}>
      <div
        data-slot="kanban-column"
        data-value={value}
        data-dragging={isSortableDragging}
        data-disabled={disabled}
        ref={setNodeRef}
        style={style}
        className={cn(
          'group/kanban-column flex flex-col',
          isSortableDragging && 'opacity-50',
          disabled && 'opacity-50',
          className,
        )}
      >
        {children}
      </div>
    </ColumnContext.Provider>
  );
}

export interface KanbanColumnHandleProps {
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
  cursor?: boolean;
}

function KanbanColumnHandle({ asChild, className, children, cursor = true }: KanbanColumnHandleProps) {
  const { attributes, listeners, isDragging, disabled } = React.useContext(ColumnContext);

  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-slot="kanban-column-handle"
      data-dragging={isDragging}
      data-disabled={disabled}
      {...attributes}
      {...listeners}
      className={cn(
        'opacity-0 transition-opacity group-hover/kanban-column:opacity-100',
        cursor && (isDragging ? '!cursor-grabbing' : '!cursor-grab'),
        className,
      )}
    >
      {children}
    </Comp>
  );
}

export interface KanbanItemProps {
  value: string;
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

function KanbanItem({ value, asChild = false, className, children, disabled }: KanbanItemProps) {
  const {
    setNodeRef,
    transform,
    transition,
    attributes,
    listeners,
    isDragging: isSortableDragging,
  } = useSortable({
    id: value,
    disabled,
  });

  const { activeId, isColumn } = React.useContext(KanbanContext);
  const isItemDragging = activeId ? !isColumn(activeId) : false;

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  } as React.CSSProperties;

  const Comp = asChild ? Slot : 'div';

  return (
    <ItemContext.Provider value={{ listeners, isDragging: isItemDragging, disabled }}>
      <Comp
        data-slot="kanban-item"
        data-value={value}
        data-dragging={isSortableDragging}
        data-disabled={disabled}
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={cn(isSortableDragging && 'opacity-50', disabled && 'opacity-50', className)}
      >
        {children}
      </Comp>
    </ItemContext.Provider>
  );
}

export interface KanbanItemHandleProps {
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
  cursor?: boolean;
}

function KanbanItemHandle({ asChild, className, children, cursor = true }: KanbanItemHandleProps) {
  const { listeners, isDragging, disabled } = React.useContext(ItemContext);

  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-slot="kanban-item-handle"
      data-dragging={isDragging}
      data-disabled={disabled}
      {...listeners}
      className={cn(cursor && (isDragging ? '!cursor-grabbing' : '!cursor-grab'), className)}
    >
      {children}
    </Comp>
  );
}

export interface KanbanColumnContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

function KanbanColumnContent({ value, className, children }: KanbanColumnContentProps) {
  const { columns, getItemId } = React.useContext(KanbanContext);

  const itemIds = React.useMemo(() => columns[value].map(getItemId), [columns, getItemId, value]);

  return (
    <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
      <div data-slot="kanban-column-content" className={cn('flex flex-col gap-2', className)}>
        {children}
      </div>
    </SortableContext>
  );
}

export interface KanbanOverlayProps {
  className?: string;
  children?: React.ReactNode | ((params: { value: UniqueIdentifier; variant: 'column' | 'item' }) => React.ReactNode);
}

function KanbanOverlay({ children, className }: KanbanOverlayProps) {
  const { activeId, isColumn } = React.useContext(KanbanContext);
  const [dimensions, setDimensions] = React.useState<{ width: number; height: number } | null>(null);

  React.useEffect(() => {
    if (activeId) {
      const element = document.querySelector(
        `[data-slot="kanban-${isColumn(activeId) ? 'column' : 'item'}"][data-value="${activeId}"]`,
      );
      if (element) {
        const rect = element.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    } else {
      setDimensions(null);
    }
  }, [activeId]);

  const style = {
    width: dimensions?.width,
    height: dimensions?.height,
  } as React.CSSProperties;

  const content = React.useMemo(() => {
    if (!activeId) return null;
    if (typeof children === 'function') {
      return children({
        value: activeId,
        variant: isColumn(activeId) ? 'column' : 'item',
      });
    }
    return children;
  }, [activeId, children, isColumn]);

  return (
    <DragOverlay dropAnimation={dropAnimationConfig}>
      <div
        data-slot="kanban-overlay"
        data-dragging={true}
        style={style}
        className={cn('pointer-events-none', className, activeId ? '!cursor-grabbing' : '')}
      >
        {content}
      </div>
    </DragOverlay>
  );
}

// Sortable Item Context
const SortableItemContext = React.createContext<{
  listeners: DraggableSyntheticListeners | undefined;
  isDragging?: boolean;
  disabled?: boolean;
}>({
  listeners: undefined,
  isDragging: false,
  disabled: false,
});

// Multipurpose Sortable Component
export interface SortableRootProps<T> {
  value: T[];
  onValueChange: (value: T[]) => void;
  getItemValue: (item: T) => string;
  children: React.ReactNode;
  className?: string;
  onMove?: (event: { event: DragEndEvent; activeIndex: number; overIndex: number }) => void;
  strategy?: 'horizontal' | 'vertical' | 'grid';
  onDragStart?: (event: DragStartEvent) => void;
  onDragEnd?: (event: DragEndEvent) => void;
}

function Sortable<T>({
  value,
  onValueChange,
  getItemValue,
  children,
  className,
  onMove,
  strategy = 'vertical',
  onDragStart,
  onDragEnd,
}: SortableRootProps<T>) {
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = React.useCallback(
    (event: DragStartEvent) => {
      setActiveId(event.active.id);
      onDragStart?.(event);
    },
    [onDragStart],
  );

  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);
      onDragEnd?.(event);

      if (!over) return;

      // Handle item reordering
      const activeIndex = value.findIndex((item: T) => getItemValue(item) === active.id);
      const overIndex = value.findIndex((item: T) => getItemValue(item) === over.id);

      if (activeIndex !== overIndex) {
        if (onMove) {
          onMove({ event, activeIndex, overIndex });
        } else {
          const newValue = arrayMove(value, activeIndex, overIndex);
          onValueChange(newValue);
        }
      }
    },
    [value, getItemValue, onValueChange, onMove, onDragEnd],
  );

  const getStrategy = () => {
    switch (strategy) {
      case 'horizontal':
        return rectSortingStrategy;
      case 'grid':
        return rectSortingStrategy;
      case 'vertical':
      default:
        return verticalListSortingStrategy;
    }
  };

  const itemIds = React.useMemo(() => value.map(getItemValue), [value, getItemValue]);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SortableContext items={itemIds} strategy={getStrategy()}>
        <div data-slot="sortable" data-dragging={activeId !== null} className={cn(className)}>
          {children}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeId ? (
          <div className="z-50">
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child) && (child.props as any).value === activeId) {
                return React.cloneElement(child as React.ReactElement<any>, {
                  ...(child.props as any),
                  className: cn((child.props as any).className, 'z-50 shadow-lg'),
                });
              }
              return null;
            })}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export interface SortableItemProps {
  value: string;
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

function SortableItem({ value, asChild = false, className, children, disabled }: SortableItemProps) {
  const {
    setNodeRef,
    transform,
    transition,
    attributes,
    listeners,
    isDragging: isSortableDragging,
  } = useSortable({
    id: value,
    disabled,
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  } as React.CSSProperties;

  const Comp = asChild ? Slot : 'div';

  return (
    <SortableItemContext.Provider value={{ listeners, isDragging: isSortableDragging, disabled }}>
      <Comp
        data-slot="sortable-item"
        data-value={value}
        data-dragging={isSortableDragging}
        data-disabled={disabled}
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={cn(isSortableDragging && 'opacity-50 z-50', disabled && 'opacity-50', className)}
      >
        {children}
      </Comp>
    </SortableItemContext.Provider>
  );
}

export interface SortableItemHandleProps {
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
  cursor?: boolean;
}

function SortableItemHandle({ asChild, className, children, cursor = true }: SortableItemHandleProps) {
  const { listeners, isDragging, disabled } = React.useContext(SortableItemContext);

  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-slot="sortable-item-handle"
      data-dragging={isDragging}
      data-disabled={disabled}
      {...listeners}
      className={cn(cursor && (isDragging ? '!cursor-grabbing' : '!cursor-grab'), className)}
    >
      {children}
    </Comp>
  );
}

export {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnHandle,
  KanbanItem,
  KanbanItemHandle,
  KanbanColumnContent,
  KanbanOverlay,
  // New multipurpose sortable components
  Sortable,
  SortableItem,
  SortableItemHandle,
};


```

Install NPM dependencies:
```bash
@dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities, @radix-ui/react-slot
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
