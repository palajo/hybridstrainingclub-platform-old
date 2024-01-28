import React, { useEffect, useMemo, useRef, useState } from 'react';
import SortableTableNode from './sortableTableNode';
import {
  Announcements,
  closestCenter,
  defaultDropAnimation,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
  DropAnimation,
  MeasuringStrategy,
  Modifier,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { buildTree, flattenTree, getProjection, removeChildrenOf, removeItem, setProperty } from './utilities';
import type { FlattenedItem, SensorContext, TreeItems } from './types';
import { sortableTreeKeyboardCoordinates } from './keyboardCoordinates';
// import { SortableTreeItem } from "./components";
import { CSS } from '@dnd-kit/utilities';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const initialItems: any = [
  {
    key: 'standard-push-ups-0',
    id: 'standard-push-ups-0',
    title: 'Standard Push Ups',
    category: 'Push ups',
    video: 'https://vimeo.com/889821510',
    sets: 3,
    reps: 10,
    rest: 60,
    depth: 0,
    children: [],
  },
  {
    key: 'standard-push-ups-1',
    id: 'standard-push-ups-1',
    title: 'Standard Push Ups',
    category: 'Push ups',
    video: 'https://vimeo.com/889821510',
    sets: 3,
    reps: 10,
    rest: 60,
    depth: 0,
    children: [
      {
        key: 'standard-push-ups-2',
        id: 'standard-push-ups-2',
        title: 'Standard Push Ups',
        category: 'Push ups',
        video: 'https://vimeo.com/889821510',
        sets: 3,
        reps: 10,
        rest: 60,
        depth: 1,
        children: [],
      },
      {
        key: 'standard-push-ups-3',
        id: 'standard-push-ups-3',
        title: 'Standard Push Ups',
        category: 'Push ups',
        video: 'https://vimeo.com/889821510',
        sets: 3,
        reps: 10,
        rest: 60,
        depth: 1,
        children: [],
      },
    ],
  },
  {
    key: 'standard-push-ups-4',
    id: 'standard-push-ups-4',
    title: 'Standard Push Ups',
    category: 'Push ups',
    video: 'https://vimeo.com/889821510',
    sets: 3,
    reps: 10,
    rest: 60,
    depth: 0,
    children: [],
  },
  {
    key: 'standard-push-ups-5',
    id: 'standard-push-ups-5',
    title: 'Standard Push Ups',
    category: 'Push ups',
    video: 'https://vimeo.com/889821510',
    sets: 3,
    reps: 10,
    rest: 60,
    depth: 0,
    children: [],
  },
  {
    key: 'standard-push-ups-6',
    id: 'standard-push-ups-6',
    title: 'Standard Push Ups',
    category: 'Push ups',
    video: 'https://vimeo.com/889821510',
    sets: 3,
    reps: 10,
    rest: 60,
    depth: 0,
    children: [],
  },
];

const measuring = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

const dropAnimationConfig: DropAnimation = {
  keyframes({ transform }) {
    return [
      { opacity: 1, transform: CSS.Transform.toString(transform.initial) },
      {
        opacity: 0,
        transform: CSS.Transform.toString({
          ...transform.final,
          x: transform.final.x + 5,
          y: transform.final.y + 5,
        }),
      },
    ];
  },
  easing: 'ease-out',
  sideEffects({ active }) {
    active.node.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: defaultDropAnimation.duration,
      easing: defaultDropAnimation.easing,
    });
  },
};

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Exercise',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Category',
    dataIndex: 'category',
  },
  {
    title: 'Video',
    dataIndex: 'video',
  },
  {
    title: 'Sets',
    dataIndex: 'sets',
  },
  {
    title: 'Reps',
    dataIndex: 'reps',
  },
  {
    title: 'Rest',
    dataIndex: 'rest',
  },
];

interface Props {
  collapsible?: boolean;
  defaultItems?: TreeItems;
  indentationWidth?: number;
  indicator?: boolean;
  removable?: boolean;
}

export default function SortableTable({
                                        collapsible,
                                        defaultItems = initialItems,
                                        indicator = false,
                                        indentationWidth = 24,
                                        removable,
                                      }: Props) {
  const [items, setItems] = useState(() => defaultItems);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [currentPosition, setCurrentPosition] = useState<{
    parentId: UniqueIdentifier | null;
    overId: UniqueIdentifier;
  } | null>(null);

  // console.log("items", items);

  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenTree(items);
    // console.log("flattenedTree111", activeId, items, flattenedTree);

    const collapsedItems = flattenedTree.reduce<number[]>(
      (acc, { children, collapsed, id }) =>
        // @ts-ignore
        collapsed && children.length ? [...acc, id] : acc,
      [],
    );


    return removeChildrenOf(
      flattenedTree,
      // @ts-ignore
      activeId ? [activeId, ...collapsedItems] : collapsedItems,
    );
  }, [activeId, items]);
  const projected =
    activeId && overId
      ? getProjection(
        flattenedItems,
        activeId,
        overId,
        offsetLeft,
        indentationWidth,
      )
      : null;
  const sensorContext: SensorContext = useRef({
    items: flattenedItems,
    offset: offsetLeft,
  });
  const [coordinateGetter] = useState(() =>
    sortableTreeKeyboardCoordinates(sensorContext, indicator, indentationWidth),
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    // useSensor(KeyboardSensor, {
    //   coordinateGetter,
    // })
  );

  const sortedIds = useMemo(() => flattenedItems.map(({ id }) => id), [
    flattenedItems,
  ]);
  const activeItem = activeId
    ? flattenedItems.find(({ id }) => id === activeId)
    : null;

  useEffect(() => {
    sensorContext.current = {
      items: flattenedItems,
      offset: offsetLeft,
    };
  }, [flattenedItems, offsetLeft]);

  const announcements: Announcements = {
    onDragStart({ active }) {
      return `Picked up ${active.id}.`;
    },
    onDragMove({ active, over }) {
      return getMovementAnnouncement('onDragMove', active.id, over?.id);
    },
    onDragOver({ active, over }) {
      return getMovementAnnouncement('onDragOver', active.id, over?.id);
    },
    onDragEnd({ active, over }) {
      return getMovementAnnouncement('onDragEnd', active.id, over?.id);
    },
    onDragCancel({ active }) {
      return `Moving was cancelled. ${active.id} was dropped in its original position.`;
    },
  };

  interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    'data-row-key': string;
  }

  // const Row = ({ children, ...props }: RowProps) => {
  //   const {
  //     attributes,
  //     listeners,
  //     setNodeRef,
  //     setActivatorNodeRef,
  //     transform,
  //     transition,
  //     isDragging,
  //     setDraggableNodeRef,
  //     setDroppableNodeRef
  //   } = useSortable({
  //     id: props["data-row-key"]
  //   });

  //   const style: React.CSSProperties = {
  //     ...props.style,
  //     transform: CSS.Transform.toString(
  //       transform && { ...transform, scaleY: 1 }
  //     ),
  //     transition,
  //     ...(isDragging ? { position: "relative", zIndex: 9999 } : {})
  //   };

  //   return (
  //     <tr {...props} ref={setNodeRef} style={style} {...attributes}>
  //       {React.Children.map(children, (child) => {
  //         if ((child as React.ReactElement).key === "id") {
  //           const { record } = child.props;

  //           const { depth, id } = record;
  //           return React.cloneElement(child as React.ReactElement, {
  //             children: (
  //               <span style={{ paddingLeft: `${depth * 15}px` }}>
  //                 <MenuOutlined
  //                   ref={setActivatorNodeRef}
  //                   style={{ touchAction: "none", cursor: "move" }}
  //                   {...listeners}
  //                 />
  //                 <span style={{ paddingLeft: `10px`, color: "#4EB1F3" }}>
  //                   {id}
  //                 </span>
  //               </span>
  //             )
  //             // record
  //           });
  //         }
  //         return child;
  //       })}
  //     </tr>
  //   );
  // };

  return (
    <DndContext
      accessibility={{ announcements }}
      sensors={sensors}
      collisionDetection={closestCenter}
      measuring={measuring}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
        <Table
          components={{
            body: {
              row: SortableTableNode,
            },
          }}
          expandable={{
            defaultExpandAllRows: true,
          }}
          indentSize={indentationWidth}
          rowKey="key"
          // @ts-ignore
          columns={columns}
          dataSource={items}
          pagination={false}
        />
      </SortableContext>
    </DndContext>
  );

  function handleDragStart({ active: { id: activeId } }: DragStartEvent) {
    setActiveId(activeId);
    setOverId(activeId);

    const activeItem = flattenedItems.find(({ id }) => id === activeId);

    if (activeItem) {
      setCurrentPosition({
        parentId: activeItem.parentId,
        overId: activeId,
      });
    }

    document.body.style.setProperty('cursor', 'grabbing');
  }

  function handleDragMove({ delta }: DragMoveEvent) {
    setOffsetLeft(delta.x);
  }

  function handleDragOver({ over }: DragOverEvent) {
    setOverId(over?.id ?? null);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    resetState();

    if (projected && over) {
      const { depth, parentId } = projected;
      const clonedItems: FlattenedItem[] = JSON.parse(
        JSON.stringify(flattenTree(items)),
      );
      const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
      const activeIndex = clonedItems.findIndex(({ id }) => id === active.id);
      const activeTreeItem = clonedItems[activeIndex];

      clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };

      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
      const newItems = buildTree(sortedItems);

      setItems(newItems);
    }
  }

  function handleDragCancel() {
    resetState();
  }

  function resetState() {
    setOverId(null);
    setActiveId(null);
    setOffsetLeft(0);
    setCurrentPosition(null);

    document.body.style.setProperty('cursor', '');
  }

  function handleRemove(id: UniqueIdentifier) {
    setItems((items) => removeItem(items, id));
  }

  function handleCollapse(id: UniqueIdentifier) {
    setItems((items) =>
      setProperty(items, id, 'collapsed', (value) => {
        return !value;
      }),
    );
  }

  function getMovementAnnouncement(
    eventName: string,
    activeId: UniqueIdentifier,
    overId?: UniqueIdentifier,
  ) {
    if (overId && projected) {
      if (eventName !== 'onDragEnd') {
        if (
          currentPosition &&
          projected.parentId === currentPosition.parentId &&
          overId === currentPosition.overId
        ) {
          return;
        } else {
          setCurrentPosition({
            parentId: projected.parentId,
            overId,
          });
        }
      }

      const clonedItems: FlattenedItem[] = JSON.parse(
        JSON.stringify(flattenTree(items)),
      );
      const overIndex = clonedItems.findIndex(({ id }) => id === overId);
      const activeIndex = clonedItems.findIndex(({ id }) => id === activeId);
      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);

      const previousItem = sortedItems[overIndex - 1];

      let announcement;
      const movedVerb = eventName === 'onDragEnd' ? 'dropped' : 'moved';
      const nestedVerb = eventName === 'onDragEnd' ? 'dropped' : 'nested';

      if (!previousItem) {
        const nextItem = sortedItems[overIndex + 1];
        announcement = `${activeId} was ${movedVerb} before ${nextItem.id}.`;
      } else {
        if (projected.depth > previousItem.depth) {
          announcement = `${activeId} was ${nestedVerb} under ${previousItem.id}.`;
        } else {
          let previousSibling: FlattenedItem | undefined = previousItem;
          while (previousSibling && projected.depth < previousSibling.depth) {
            const parentId: UniqueIdentifier | null = previousSibling.parentId;
            previousSibling = sortedItems.find(({ id }) => id === parentId);
          }

          if (previousSibling) {
            announcement = `${activeId} was ${movedVerb} after ${previousSibling.id}.`;
          }
        }
      }

      return announcement;
    }

    return;
  }
}

const adjustTranslate: Modifier = ({ transform }) => {
  return {
    ...transform,
    y: transform.y - 24,
  };
};
