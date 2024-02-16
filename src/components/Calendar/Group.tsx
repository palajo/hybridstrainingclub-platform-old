import React, { useState } from 'react';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Col, Input, Row, theme } from 'antd';
import { CloseOutlined, CopyOutlined, MenuOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Block from '@/components/Calendar/Block';
import { closestCenter, DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

interface SortableItemProps {
  id: string;
}

interface ListItem {
  id: string;
  content: string;
}

export default function Group({ id }: SortableItemProps) {
  const {
    token: { colorPrimary, borderRadiusLG, colorPrimaryBg, colorPrimaryText, colorPrimaryBorder },
  } = theme.useToken();

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '12px',
    marginBottom: '16px',
    borderLeft: `3px solid ${colorPrimaryBorder}`,
    background: colorPrimaryBg,
    borderRadius: borderRadiusLG,
  };

  const initialItems: ListItem[] = [
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
  ];

  const [items, setItems] = useState(initialItems);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((oldItems) => {
        const oldIndex = oldItems.findIndex((item) => item.id === active.id);
        const newIndex = oldItems.findIndex((item) => item.id === over.id);

        return arrayMove(oldItems, oldIndex, newIndex);
      });
    }
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Row gutter={[8, 16]}>
        <Col xs={24}>
          <Row align="middle" justify="space-between" gutter={[8, 8]}>
            <Col>
              <Button size="small" type="text" ref={setActivatorNodeRef}
                      style={{ touchAction: 'none', cursor: 'move' }}{...listeners}>
                <MenuOutlined/>
              </Button>
            </Col>
            <Row>
              <Col>
                <Button size="small" type="text">
                  <CopyOutlined/>
                </Button>
              </Col>
              <Col>
                <Button size="small" type="text">
                  <CloseOutlined/>
                </Button>
              </Col>
            </Row>
          </Row>
        </Col>
        <Col xs={24}>
          <Input placeholder="Warm up"/>
        </Col>
        <Col xs={24}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              {items.map((item) => (
                <Block key={item.id} id={item.id}/>
              ))}
            </SortableContext>
          </DndContext>
          <Row justify="center">
            <Col>
              <Button size="small" type="text">
                <PlusCircleOutlined/>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}