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
"use client";

import {
  DndContext,
  type DndContextProps,
  type DragEndEvent,
  DragOverlay,
  type DraggableSyntheticListeners,
  type DropAnimation,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  type UniqueIdentifier,
  closestCenter,
  closestCorners,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToHorizontalAxis,
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  type SortableContextProps,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Slot, type SlotProps } from "@radix-ui/react-slot";
import * as React from "react";

import { composeEventHandlers, useComposedRefs } from "@/lib/composition";
import { cn } from "@/lib/utils";
import * as ReactDOM from "react-dom";

const orientationConfig = {
  vertical: {
    modifiers: [restrictToVerticalAxis, restrictToParentElement],
    strategy: verticalListSortingStrategy,
    collisionDetection: closestCenter,
  },
  horizontal: {
    modifiers: [restrictToHorizontalAxis, restrictToParentElement],
    strategy: horizontalListSortingStrategy,
    collisionDetection: closestCenter,
  },
  mixed: {
    modifiers: [restrictToParentElement],
    strategy: undefined,
    collisionDetection: closestCorners,
  },
};

const ROOT_NAME = "Sortable";
const CONTENT_NAME = "SortableContent";
const ITEM_NAME = "SortableItem";
const ITEM_HANDLE_NAME = "SortableItemHandle";
const OVERLAY_NAME = "SortableOverlay";

const SORTABLE_ERROR = {
  [ROOT_NAME]: `${ROOT_NAME} components must be within ${ROOT_NAME}`,
  [CONTENT_NAME]: `${CONTENT_NAME} must be within ${ROOT_NAME}`,
  [ITEM_NAME]: `${ITEM_NAME} must be within ${CONTENT_NAME}`,
  [ITEM_HANDLE_NAME]: `${ITEM_HANDLE_NAME} must be within ${ITEM_NAME}`,
  [OVERLAY_NAME]: `${OVERLAY_NAME} must be within ${ROOT_NAME}`,
} as const;

type SortableNames = keyof typeof SORTABLE_ERROR;

interface SortableRootContextValue<T> {
  id: string;
  items: T[];
  modifiers: DndContextProps["modifiers"];
  strategy: SortableContextProps["strategy"];
  activeId: UniqueIdentifier | null;
  setActiveId: (id: UniqueIdentifier | null) => void;
  getItemValue: (item: T) => UniqueIdentifier;
  flatCursor: boolean;
}

const SortableRootContext =
  React.createContext<SortableRootContextValue<unknown> | null>(null);
SortableRootContext.displayName = ROOT_NAME;

function useSortableContext(name: SortableNames) {
  const context = React.useContext(SortableRootContext);
  if (!context) {
    throw new Error(SORTABLE_ERROR[name]);
  }
  return context;
}

interface GetItemValue<T> {
  /**
   * Callback that returns a unique identifier for each sortable item. Required for array of objects.
   * @example getItemValue={(item) => item.id}
   */
  getItemValue: (item: T) => UniqueIdentifier;
}

type SortableProps<T> = DndContextProps & {
  value: T[];
  onValueChange?: (items: T[]) => void;
  onMove?: (event: DragEndEvent) => void;
  strategy?: SortableContextProps["strategy"];
  orientation?: "vertical" | "horizontal" | "mixed";
  flatCursor?: boolean;
} & (T extends object ? GetItemValue<T> : Partial<GetItemValue<T>>);

function Sortable<T>(props: SortableProps<T>) {
  const {
    id = React.useId(),
    value,
    onValueChange,
    collisionDetection,
    modifiers,
    strategy,
    sensors: sensorsProp,
    onMove,
    orientation = "vertical",
    flatCursor = false,
    getItemValue: getItemValueProp,
    accessibility,
    ...sortableProps
  } = props;
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const config = React.useMemo(
    () => orientationConfig[orientation],
    [orientation],
  );
  const getItemValue = React.useCallback(
    (item: T): UniqueIdentifier => {
      if (typeof item === "object" && !getItemValueProp) {
        throw new Error(
          "getItemValue is required when using array of objects.",
        );
      }
      return getItemValueProp
        ? getItemValueProp(item)
        : (item as UniqueIdentifier);
    },
    [getItemValueProp],
  );

  const onDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over?.id) {
        const activeIndex = value.findIndex(
          (item) => getItemValue(item) === active.id,
        );
        const overIndex = value.findIndex(
          (item) => getItemValue(item) === over.id,
        );

        if (onMove) {
          onMove(event);
        } else {
          onValueChange?.(arrayMove(value, activeIndex, overIndex));
        }
      }
      setActiveId(null);
    },
    [value, onValueChange, onMove, getItemValue],
  );

  const screenReaderInstructions = React.useMemo(
    () => ({
      draggable: `
        To pick up a sortable item, press space or enter.
        While dragging, use the ${orientation === "vertical" ? "up and down" : orientation === "horizontal" ? "left and right" : "arrow"} keys to move the item.
        Press space or enter again to drop the item in its new position, or press escape to cancel.
      `,
    }),
    [orientation],
  );

  const contextValue = React.useMemo(
    () => ({
      id,
      items: value,
      modifiers: modifiers ?? config.modifiers,
      strategy: strategy ?? config.strategy,
      activeId,
      setActiveId,
      getItemValue,
      flatCursor,
    }),
    [
      id,
      value,
      modifiers,
      strategy,
      config.modifiers,
      config.strategy,
      activeId,
      getItemValue,
      flatCursor,
    ],
  );

  return (
    <SortableRootContext.Provider
      value={contextValue as SortableRootContextValue<unknown>}
    >
      <DndContext
        id={id}
        modifiers={modifiers ?? config.modifiers}
        sensors={sensorsProp ?? sensors}
        collisionDetection={collisionDetection ?? config.collisionDetection}
        onDragStart={composeEventHandlers(
          sortableProps.onDragStart,
          ({ active }) => setActiveId(active.id),
        )}
        onDragEnd={composeEventHandlers(sortableProps.onDragEnd, onDragEnd)}
        onDragCancel={composeEventHandlers(sortableProps.onDragCancel, () =>
          setActiveId(null),
        )}
        accessibility={{
          announcements: {
            onDragStart({ active }) {
              const activeValue = active.id.toString();
              return `Grabbed sortable item "${activeValue}". Current position is ${active.data.current?.sortable.index + 1} of ${value.length}. Use arrow keys to move, space to drop.`;
            },
            onDragOver({ active, over }) {
              if (over) {
                const overIndex = over.data.current?.sortable.index ?? 0;
                const activeIndex = active.data.current?.sortable.index ?? 0;
                const moveDirection = overIndex > activeIndex ? "down" : "up";
                const activeValue = active.id.toString();
                return `Sortable item "${activeValue}" moved ${moveDirection} to position ${overIndex + 1} of ${value.length}.`;
              }
              return "Sortable item is no longer over a droppable area. Press escape to cancel.";
            },
            onDragEnd({ active, over }) {
              const activeValue = active.id.toString();
              if (over) {
                const overIndex = over.data.current?.sortable.index ?? 0;
                return `Sortable item "${activeValue}" dropped at position ${overIndex + 1} of ${value.length}.`;
              }
              return `Sortable item "${activeValue}" dropped. No changes were made.`;
            },
            onDragCancel({ active }) {
              const activeIndex = active.data.current?.sortable.index ?? 0;
              const activeValue = active.id.toString();
              return `Sorting cancelled. Sortable item "${activeValue}" returned to position ${activeIndex + 1} of ${value.length}.`;
            },
            onDragMove({ active, over }) {
              if (over) {
                const overIndex = over.data.current?.sortable.index ?? 0;
                const activeIndex = active.data.current?.sortable.index ?? 0;
                const moveDirection = overIndex > activeIndex ? "down" : "up";
                const activeValue = active.id.toString();
                return `Sortable item "${activeValue}" is moving ${moveDirection} to position ${overIndex + 1} of ${value.length}.`;
              }
              return "Sortable item is no longer over a droppable area. Press escape to cancel.";
            },
            ...accessibility?.announcements,
          },
          screenReaderInstructions,
          ...accessibility,
        }}
        {...sortableProps}
      />
    </SortableRootContext.Provider>
  );
}

const SortableContentContext = React.createContext<boolean>(false);
SortableContentContext.displayName = CONTENT_NAME;

interface SortableContentProps extends SlotProps {
  strategy?: SortableContextProps["strategy"];
  children: React.ReactNode;
  asChild?: boolean;
}

const SortableContent = React.forwardRef<HTMLDivElement, SortableContentProps>(
  (props, forwardedRef) => {
    const { strategy: strategyProp, asChild, ...contentProps } = props;
    const context = useSortableContext(CONTENT_NAME);

    const items = React.useMemo(() => {
      return context.items.map((item) => context.getItemValue(item));
    }, [context.items, context.getItemValue]);

    const ContentSlot = asChild ? Slot : "div";

    return (
      <SortableContentContext.Provider value={true}>
        <SortableContext
          items={items}
          strategy={strategyProp ?? context.strategy}
        >
          <ContentSlot {...contentProps} ref={forwardedRef} />
        </SortableContext>
      </SortableContentContext.Provider>
    );
  },
);
SortableContent.displayName = CONTENT_NAME;

interface SortableItemContextValue {
  id: string;
  attributes: React.HTMLAttributes<HTMLElement>;
  listeners: DraggableSyntheticListeners | undefined;
  setActivatorNodeRef: (node: HTMLElement | null) => void;
  isDragging?: boolean;
  disabled?: boolean;
}

const SortableItemContext = React.createContext<SortableItemContextValue>({
  id: "",
  attributes: {},
  listeners: undefined,
  setActivatorNodeRef: () => {},
  isDragging: false,
});
SortableItemContext.displayName = ITEM_NAME;

interface SortableItemProps extends SlotProps {
  value: UniqueIdentifier;
  asHandle?: boolean;
  asChild?: boolean;
  disabled?: boolean;
}

const SortableItem = React.forwardRef<HTMLDivElement, SortableItemProps>(
  (props, forwardedRef) => {
    const {
      value,
      style,
      asHandle,
      asChild,
      disabled,
      className,
      ...itemProps
    } = props;
    const inSortableContent = React.useContext(SortableContentContext);
    const inSortableOverlay = React.useContext(SortableOverlayContext);

    if (!inSortableContent && !inSortableOverlay) {
      throw new Error(SORTABLE_ERROR[ITEM_NAME]);
    }

    if (value === "") {
      throw new Error(`${ITEM_NAME} value cannot be an empty string.`);
    }

    const context = useSortableContext(ITEM_NAME);
    const id = React.useId();
    const {
      attributes,
      listeners,
      setNodeRef,
      setActivatorNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: value, disabled });

    const composedRef = useComposedRefs(forwardedRef, (node) => {
      if (disabled) return;
      setNodeRef(node);
      if (asHandle) setActivatorNodeRef(node);
    });

    const composedStyle = React.useMemo<React.CSSProperties>(() => {
      return {
        transform: CSS.Translate.toString(transform),
        transition,
        ...style,
      };
    }, [transform, transition, style]);

    const itemContext = React.useMemo<SortableItemContextValue>(
      () => ({
        id,
        attributes,
        listeners,
        setActivatorNodeRef,
        isDragging,
        disabled,
      }),
      [id, attributes, listeners, setActivatorNodeRef, isDragging, disabled],
    );

    const ItemSlot = asChild ? Slot : "div";

    return (
      <SortableItemContext.Provider value={itemContext}>
        <ItemSlot
          id={id}
          data-dragging={isDragging ? "" : undefined}
          {...itemProps}
          {...(asHandle ? attributes : {})}
          {...(asHandle ? listeners : {})}
          tabIndex={disabled ? undefined : 0}
          ref={composedRef}
          style={composedStyle}
          className={cn(
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
            {
              "touch-none select-none": asHandle,
              "cursor-default": context.flatCursor,
              "data-[dragging]:cursor-grabbing": !context.flatCursor,
              "cursor-grab": !isDragging && asHandle && !context.flatCursor,
              "opacity-50": isDragging,
              "pointer-events-none opacity-50": disabled,
            },
            className,
          )}
        />
      </SortableItemContext.Provider>
    );
  },
);
SortableItem.displayName = ITEM_NAME;

interface SortableItemHandleProps
  extends React.ComponentPropsWithoutRef<"button"> {
  asChild?: boolean;
}

const SortableItemHandle = React.forwardRef<
  HTMLButtonElement,
  SortableItemHandleProps
>((props, forwardedRef) => {
  const { asChild, disabled, className, ...dragHandleProps } = props;
  const itemContext = React.useContext(SortableItemContext);
  if (!itemContext) {
    throw new Error(SORTABLE_ERROR[ITEM_HANDLE_NAME]);
  }
  const context = useSortableContext(ITEM_HANDLE_NAME);

  const isDisabled = disabled ?? itemContext.disabled;

  const composedRef = useComposedRefs(forwardedRef, (node) => {
    if (!isDisabled) return;
    itemContext.setActivatorNodeRef(node);
  });

  const HandleSlot = asChild ? Slot : "button";

  return (
    <HandleSlot
      aria-controls={itemContext.id}
      aria-roledescription="sortable item handle"
      data-dragging={itemContext.isDragging ? "" : undefined}
      {...dragHandleProps}
      {...itemContext.attributes}
      {...itemContext.listeners}
      ref={composedRef}
      className={cn(
        "select-none disabled:pointer-events-none disabled:opacity-50",
        context.flatCursor
          ? "cursor-default"
          : "cursor-grab data-[dragging]:cursor-grabbing",
        className,
      )}
      disabled={isDisabled}
    />
  );
});
SortableItemHandle.displayName = ITEM_HANDLE_NAME;

const SortableOverlayContext = React.createContext(false);
SortableOverlayContext.displayName = OVERLAY_NAME;

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4",
      },
    },
  }),
};

interface SortableOverlayProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DragOverlay>, "children"> {
  container?: HTMLElement | DocumentFragment | null;
  children?:
    | ((params: { value: UniqueIdentifier }) => React.ReactNode)
    | React.ReactNode;
}

function SortableOverlay(props: SortableOverlayProps) {
  const { container: containerProp, children, ...overlayProps } = props;
  const context = useSortableContext(OVERLAY_NAME);

  const [mounted, setMounted] = React.useState(false);
  React.useLayoutEffect(() => setMounted(true), []);

  const container =
    containerProp ?? (mounted ? globalThis.document?.body : null);

  if (!container) return null;

  return ReactDOM.createPortal(
    <DragOverlay
      modifiers={context.modifiers}
      dropAnimation={dropAnimation}
      className={cn(!context.flatCursor && "cursor-grabbing")}
      {...overlayProps}
    >
      <SortableOverlayContext.Provider value={true}>
        {context.activeId
          ? typeof children === "function"
            ? children({ value: context.activeId })
            : children
          : null}
      </SortableOverlayContext.Provider>
    </DragOverlay>,
    container,
  );
}

const Root = Sortable;
const Content = SortableContent;
const Item = SortableItem;
const ItemHandle = SortableItemHandle;
const Overlay = SortableOverlay;

export {
  Root,
  Content,
  Item,
  ItemHandle,
  Overlay,
  //
  Sortable,
  SortableContent,
  SortableItem,
  SortableItemHandle,
  SortableOverlay,
};


code.demo.tsx
"use client";
 
import { Skeleton } from "@/components/ui/skeleton";
import * as Sortable from "@/components/ui/sortable";
import * as React from "react";
 
function SortableDemo() {
  const [tricks, setTricks] = React.useState([
    {
      id: "1",
      title: "The 900",
      description: "The 900 is a trick where you spin 900 degrees in the air.",
    },
    {
      id: "2",
      title: "Indy Backflip",
      description:
        "The Indy Backflip is a trick where you backflip in the air.",
    },
    {
      id: "3",
      title: "Pizza Guy",
      description: "The Pizza Guy is a trick where you flip the pizza guy.",
    },
    {
      id: "4",
      title: "Rocket Air",
      description: "The Rocket Air is a trick where you rocket air.",
    },
    {
      id: "5",
      title: "Kickflip Backflip",
      description:
        "The Kickflip Backflip is a trick where you kickflip backflip.",
    },
    {
      id: "6",
      title: "FS 540",
      description: "The FS 540 is a trick where you fs 540.",
    },
  ]);
 
  return (
    <Sortable.Root
      value={tricks}
      onValueChange={setTricks}
      getItemValue={(item) => item.id}
      orientation="mixed"
    >
      <Sortable.Content className="grid auto-rows-fr grid-cols-3 gap-2.5">
        {tricks.map((trick) => (
          <Sortable.Item key={trick.id} value={trick.id} asChild asHandle>
            <div className="flex size-full flex-col gap-1 rounded-md border bg-zinc-100 p-4 text-foreground shadow dark:bg-zinc-900">
              <div className="font-medium text-sm leading-tight sm:text-base">
                {trick.title}
              </div>
              <span className="line-clamp-2 hidden text-muted-foreground text-sm sm:inline-block">
                {trick.description}
              </span>
            </div>
          </Sortable.Item>
        ))}
      </Sortable.Content>
      <Sortable.Overlay>
        <Skeleton className="size-full" />
      </Sortable.Overlay>
    </Sortable.Root>
  );
}

export { SortableDemo }
```

Copy-paste these files for dependencies:
```tsx
/components/ui/sortable.tsx
"use client";

import {
  DndContext,
  type DndContextProps,
  type DragEndEvent,
  DragOverlay,
  type DraggableSyntheticListeners,
  type DropAnimation,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  type UniqueIdentifier,
  closestCenter,
  closestCorners,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToHorizontalAxis,
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  type SortableContextProps,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Slot, type SlotProps } from "@radix-ui/react-slot";
import * as React from "react";

import { composeEventHandlers, useComposedRefs } from "@/lib/composition";
import { cn } from "@/lib/utils";
import * as ReactDOM from "react-dom";

const orientationConfig = {
  vertical: {
    modifiers: [restrictToVerticalAxis, restrictToParentElement],
    strategy: verticalListSortingStrategy,
    collisionDetection: closestCenter,
  },
  horizontal: {
    modifiers: [restrictToHorizontalAxis, restrictToParentElement],
    strategy: horizontalListSortingStrategy,
    collisionDetection: closestCenter,
  },
  mixed: {
    modifiers: [restrictToParentElement],
    strategy: undefined,
    collisionDetection: closestCorners,
  },
};

const ROOT_NAME = "Sortable";
const CONTENT_NAME = "SortableContent";
const ITEM_NAME = "SortableItem";
const ITEM_HANDLE_NAME = "SortableItemHandle";
const OVERLAY_NAME = "SortableOverlay";

const SORTABLE_ERROR = {
  [ROOT_NAME]: `${ROOT_NAME} components must be within ${ROOT_NAME}`,
  [CONTENT_NAME]: `${CONTENT_NAME} must be within ${ROOT_NAME}`,
  [ITEM_NAME]: `${ITEM_NAME} must be within ${CONTENT_NAME}`,
  [ITEM_HANDLE_NAME]: `${ITEM_HANDLE_NAME} must be within ${ITEM_NAME}`,
  [OVERLAY_NAME]: `${OVERLAY_NAME} must be within ${ROOT_NAME}`,
} as const;

type SortableNames = keyof typeof SORTABLE_ERROR;

interface SortableRootContextValue<T> {
  id: string;
  items: T[];
  modifiers: DndContextProps["modifiers"];
  strategy: SortableContextProps["strategy"];
  activeId: UniqueIdentifier | null;
  setActiveId: (id: UniqueIdentifier | null) => void;
  getItemValue: (item: T) => UniqueIdentifier;
  flatCursor: boolean;
}

const SortableRootContext =
  React.createContext<SortableRootContextValue<unknown> | null>(null);
SortableRootContext.displayName = ROOT_NAME;

function useSortableContext(name: SortableNames) {
  const context = React.useContext(SortableRootContext);
  if (!context) {
    throw new Error(SORTABLE_ERROR[name]);
  }
  return context;
}

interface GetItemValue<T> {
  /**
   * Callback that returns a unique identifier for each sortable item. Required for array of objects.
   * @example getItemValue={(item) => item.id}
   */
  getItemValue: (item: T) => UniqueIdentifier;
}

type SortableProps<T> = DndContextProps & {
  value: T[];
  onValueChange?: (items: T[]) => void;
  onMove?: (event: DragEndEvent) => void;
  strategy?: SortableContextProps["strategy"];
  orientation?: "vertical" | "horizontal" | "mixed";
  flatCursor?: boolean;
} & (T extends object ? GetItemValue<T> : Partial<GetItemValue<T>>);

function Sortable<T>(props: SortableProps<T>) {
  const {
    id = React.useId(),
    value,
    onValueChange,
    collisionDetection,
    modifiers,
    strategy,
    sensors: sensorsProp,
    onMove,
    orientation = "vertical",
    flatCursor = false,
    getItemValue: getItemValueProp,
    accessibility,
    ...sortableProps
  } = props;
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const config = React.useMemo(
    () => orientationConfig[orientation],
    [orientation],
  );
  const getItemValue = React.useCallback(
    (item: T): UniqueIdentifier => {
      if (typeof item === "object" && !getItemValueProp) {
        throw new Error(
          "getItemValue is required when using array of objects.",
        );
      }
      return getItemValueProp
        ? getItemValueProp(item)
        : (item as UniqueIdentifier);
    },
    [getItemValueProp],
  );

  const onDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over?.id) {
        const activeIndex = value.findIndex(
          (item) => getItemValue(item) === active.id,
        );
        const overIndex = value.findIndex(
          (item) => getItemValue(item) === over.id,
        );

        if (onMove) {
          onMove(event);
        } else {
          onValueChange?.(arrayMove(value, activeIndex, overIndex));
        }
      }
      setActiveId(null);
    },
    [value, onValueChange, onMove, getItemValue],
  );

  const screenReaderInstructions = React.useMemo(
    () => ({
      draggable: `
        To pick up a sortable item, press space or enter.
        While dragging, use the ${orientation === "vertical" ? "up and down" : orientation === "horizontal" ? "left and right" : "arrow"} keys to move the item.
        Press space or enter again to drop the item in its new position, or press escape to cancel.
      `,
    }),
    [orientation],
  );

  const contextValue = React.useMemo(
    () => ({
      id,
      items: value,
      modifiers: modifiers ?? config.modifiers,
      strategy: strategy ?? config.strategy,
      activeId,
      setActiveId,
      getItemValue,
      flatCursor,
    }),
    [
      id,
      value,
      modifiers,
      strategy,
      config.modifiers,
      config.strategy,
      activeId,
      getItemValue,
      flatCursor,
    ],
  );

  return (
    <SortableRootContext.Provider
      value={contextValue as SortableRootContextValue<unknown>}
    >
      <DndContext
        id={id}
        modifiers={modifiers ?? config.modifiers}
        sensors={sensorsProp ?? sensors}
        collisionDetection={collisionDetection ?? config.collisionDetection}
        onDragStart={composeEventHandlers(
          sortableProps.onDragStart,
          ({ active }) => setActiveId(active.id),
        )}
        onDragEnd={composeEventHandlers(sortableProps.onDragEnd, onDragEnd)}
        onDragCancel={composeEventHandlers(sortableProps.onDragCancel, () =>
          setActiveId(null),
        )}
        accessibility={{
          announcements: {
            onDragStart({ active }) {
              const activeValue = active.id.toString();
              return `Grabbed sortable item "${activeValue}". Current position is ${active.data.current?.sortable.index + 1} of ${value.length}. Use arrow keys to move, space to drop.`;
            },
            onDragOver({ active, over }) {
              if (over) {
                const overIndex = over.data.current?.sortable.index ?? 0;
                const activeIndex = active.data.current?.sortable.index ?? 0;
                const moveDirection = overIndex > activeIndex ? "down" : "up";
                const activeValue = active.id.toString();
                return `Sortable item "${activeValue}" moved ${moveDirection} to position ${overIndex + 1} of ${value.length}.`;
              }
              return "Sortable item is no longer over a droppable area. Press escape to cancel.";
            },
            onDragEnd({ active, over }) {
              const activeValue = active.id.toString();
              if (over) {
                const overIndex = over.data.current?.sortable.index ?? 0;
                return `Sortable item "${activeValue}" dropped at position ${overIndex + 1} of ${value.length}.`;
              }
              return `Sortable item "${activeValue}" dropped. No changes were made.`;
            },
            onDragCancel({ active }) {
              const activeIndex = active.data.current?.sortable.index ?? 0;
              const activeValue = active.id.toString();
              return `Sorting cancelled. Sortable item "${activeValue}" returned to position ${activeIndex + 1} of ${value.length}.`;
            },
            onDragMove({ active, over }) {
              if (over) {
                const overIndex = over.data.current?.sortable.index ?? 0;
                const activeIndex = active.data.current?.sortable.index ?? 0;
                const moveDirection = overIndex > activeIndex ? "down" : "up";
                const activeValue = active.id.toString();
                return `Sortable item "${activeValue}" is moving ${moveDirection} to position ${overIndex + 1} of ${value.length}.`;
              }
              return "Sortable item is no longer over a droppable area. Press escape to cancel.";
            },
            ...accessibility?.announcements,
          },
          screenReaderInstructions,
          ...accessibility,
        }}
        {...sortableProps}
      />
    </SortableRootContext.Provider>
  );
}

const SortableContentContext = React.createContext<boolean>(false);
SortableContentContext.displayName = CONTENT_NAME;

interface SortableContentProps extends SlotProps {
  strategy?: SortableContextProps["strategy"];
  children: React.ReactNode;
  asChild?: boolean;
}

const SortableContent = React.forwardRef<HTMLDivElement, SortableContentProps>(
  (props, forwardedRef) => {
    const { strategy: strategyProp, asChild, ...contentProps } = props;
    const context = useSortableContext(CONTENT_NAME);

    const items = React.useMemo(() => {
      return context.items.map((item) => context.getItemValue(item));
    }, [context.items, context.getItemValue]);

    const ContentSlot = asChild ? Slot : "div";

    return (
      <SortableContentContext.Provider value={true}>
        <SortableContext
          items={items}
          strategy={strategyProp ?? context.strategy}
        >
          <ContentSlot {...contentProps} ref={forwardedRef} />
        </SortableContext>
      </SortableContentContext.Provider>
    );
  },
);
SortableContent.displayName = CONTENT_NAME;

interface SortableItemContextValue {
  id: string;
  attributes: React.HTMLAttributes<HTMLElement>;
  listeners: DraggableSyntheticListeners | undefined;
  setActivatorNodeRef: (node: HTMLElement | null) => void;
  isDragging?: boolean;
  disabled?: boolean;
}

const SortableItemContext = React.createContext<SortableItemContextValue>({
  id: "",
  attributes: {},
  listeners: undefined,
  setActivatorNodeRef: () => {},
  isDragging: false,
});
SortableItemContext.displayName = ITEM_NAME;

interface SortableItemProps extends SlotProps {
  value: UniqueIdentifier;
  asHandle?: boolean;
  asChild?: boolean;
  disabled?: boolean;
}

const SortableItem = React.forwardRef<HTMLDivElement, SortableItemProps>(
  (props, forwardedRef) => {
    const {
      value,
      style,
      asHandle,
      asChild,
      disabled,
      className,
      ...itemProps
    } = props;
    const inSortableContent = React.useContext(SortableContentContext);
    const inSortableOverlay = React.useContext(SortableOverlayContext);

    if (!inSortableContent && !inSortableOverlay) {
      throw new Error(SORTABLE_ERROR[ITEM_NAME]);
    }

    if (value === "") {
      throw new Error(`${ITEM_NAME} value cannot be an empty string.`);
    }

    const context = useSortableContext(ITEM_NAME);
    const id = React.useId();
    const {
      attributes,
      listeners,
      setNodeRef,
      setActivatorNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: value, disabled });

    const composedRef = useComposedRefs(forwardedRef, (node) => {
      if (disabled) return;
      setNodeRef(node);
      if (asHandle) setActivatorNodeRef(node);
    });

    const composedStyle = React.useMemo<React.CSSProperties>(() => {
      return {
        transform: CSS.Translate.toString(transform),
        transition,
        ...style,
      };
    }, [transform, transition, style]);

    const itemContext = React.useMemo<SortableItemContextValue>(
      () => ({
        id,
        attributes,
        listeners,
        setActivatorNodeRef,
        isDragging,
        disabled,
      }),
      [id, attributes, listeners, setActivatorNodeRef, isDragging, disabled],
    );

    const ItemSlot = asChild ? Slot : "div";

    return (
      <SortableItemContext.Provider value={itemContext}>
        <ItemSlot
          id={id}
          data-dragging={isDragging ? "" : undefined}
          {...itemProps}
          {...(asHandle ? attributes : {})}
          {...(asHandle ? listeners : {})}
          tabIndex={disabled ? undefined : 0}
          ref={composedRef}
          style={composedStyle}
          className={cn(
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
            {
              "touch-none select-none": asHandle,
              "cursor-default": context.flatCursor,
              "data-[dragging]:cursor-grabbing": !context.flatCursor,
              "cursor-grab": !isDragging && asHandle && !context.flatCursor,
              "opacity-50": isDragging,
              "pointer-events-none opacity-50": disabled,
            },
            className,
          )}
        />
      </SortableItemContext.Provider>
    );
  },
);
SortableItem.displayName = ITEM_NAME;

interface SortableItemHandleProps
  extends React.ComponentPropsWithoutRef<"button"> {
  asChild?: boolean;
}

const SortableItemHandle = React.forwardRef<
  HTMLButtonElement,
  SortableItemHandleProps
>((props, forwardedRef) => {
  const { asChild, disabled, className, ...dragHandleProps } = props;
  const itemContext = React.useContext(SortableItemContext);
  if (!itemContext) {
    throw new Error(SORTABLE_ERROR[ITEM_HANDLE_NAME]);
  }
  const context = useSortableContext(ITEM_HANDLE_NAME);

  const isDisabled = disabled ?? itemContext.disabled;

  const composedRef = useComposedRefs(forwardedRef, (node) => {
    if (!isDisabled) return;
    itemContext.setActivatorNodeRef(node);
  });

  const HandleSlot = asChild ? Slot : "button";

  return (
    <HandleSlot
      aria-controls={itemContext.id}
      aria-roledescription="sortable item handle"
      data-dragging={itemContext.isDragging ? "" : undefined}
      {...dragHandleProps}
      {...itemContext.attributes}
      {...itemContext.listeners}
      ref={composedRef}
      className={cn(
        "select-none disabled:pointer-events-none disabled:opacity-50",
        context.flatCursor
          ? "cursor-default"
          : "cursor-grab data-[dragging]:cursor-grabbing",
        className,
      )}
      disabled={isDisabled}
    />
  );
});
SortableItemHandle.displayName = ITEM_HANDLE_NAME;

const SortableOverlayContext = React.createContext(false);
SortableOverlayContext.displayName = OVERLAY_NAME;

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4",
      },
    },
  }),
};

interface SortableOverlayProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DragOverlay>, "children"> {
  container?: HTMLElement | DocumentFragment | null;
  children?:
    | ((params: { value: UniqueIdentifier }) => React.ReactNode)
    | React.ReactNode;
}

function SortableOverlay(props: SortableOverlayProps) {
  const { container: containerProp, children, ...overlayProps } = props;
  const context = useSortableContext(OVERLAY_NAME);

  const [mounted, setMounted] = React.useState(false);
  React.useLayoutEffect(() => setMounted(true), []);

  const container =
    containerProp ?? (mounted ? globalThis.document?.body : null);

  if (!container) return null;

  return ReactDOM.createPortal(
    <DragOverlay
      modifiers={context.modifiers}
      dropAnimation={dropAnimation}
      className={cn(!context.flatCursor && "cursor-grabbing")}
      {...overlayProps}
    >
      <SortableOverlayContext.Provider value={true}>
        {context.activeId
          ? typeof children === "function"
            ? children({ value: context.activeId })
            : children
          : null}
      </SortableOverlayContext.Provider>
    </DragOverlay>,
    container,
  );
}

const Root = Sortable;
const Content = SortableContent;
const Item = SortableItem;
const ItemHandle = SortableItemHandle;
const Overlay = SortableOverlay;

export {
  Root,
  Content,
  Item,
  ItemHandle,
  Overlay,
  //
  Sortable,
  SortableContent,
  SortableItem,
  SortableItemHandle,
  SortableOverlay,
};

```
```tsx
/lib/composition.tsx
import * as React from "react";
 
/**
 * @see https://github.com/radix-ui/primitives/blob/main/packages/core/primitive/src/primitive.tsx
 */
 
/**
 * A utility to compose multiple event handlers into a single event handler.
 * Executes originalEventHandler first, then ourEventHandler unless prevented.
 */
function composeEventHandlers<E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {},
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);
 
    if (
      checkForDefaultPrevented === false ||
      !(event as unknown as Event).defaultPrevented
    ) {
      return ourEventHandler?.(event);
    }
  };
}
 
/**
 * @see https://github.com/radix-ui/primitives/blob/main/packages/react/compose-refs/src/composeRefs.tsx
 */
 
type PossibleRef<T> = React.Ref<T> | undefined;
 
/**
 * Set a given ref to a given value.
 * This utility takes care of different types of refs: callback refs and RefObject(s).
 */
function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as React.MutableRefObject<T>).current = value;
  }
}
 
/**
 * A utility to compose multiple refs together.
 * Accepts callback refs and RefObject(s).
 */
function composeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T) => {
    for (const ref of refs) {
      setRef(ref, node);
    }
  };
}
 
/**
 * A custom hook that composes multiple refs.
 * Accepts callback refs and RefObject(s).
 */
function useComposedRefs<T>(...refs: PossibleRef<T>[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(composeRefs(...refs), refs);
}
 
export { composeEventHandlers, composeRefs, useComposedRefs };
```

Install NPM dependencies:
```bash
@dnd-kit/core, @dnd-kit/sortable, @dnd-kit/modifiers, @dnd-kit/utilities, @radix-ui/react-slot
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
