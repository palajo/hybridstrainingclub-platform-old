import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { rectSwappingStrategy, SortableContext } from '@dnd-kit/sortable';
import { Button, Col, Row, theme } from 'antd';
import SortableItem from './Group';
import { PlusCircleOutlined } from '@ant-design/icons';

interface ContainerProps {
  id: string;
  items: string[];
}

export default function Container({ id, items }: ContainerProps) {
  const {
    token: { colorPrimary, borderRadiusLG, colorBgLayout },
  } = theme.useToken();

  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={items} strategy={rectSwappingStrategy}>
      <div ref={setNodeRef} style={{ padding: '0 0 56px' }}>
        {items.map((itemId) => (
          <SortableItem key={itemId} id={itemId}/>
        ))}
        <Row justify="center">
          <Col>
            <Button size="small" type="text">
              <PlusCircleOutlined/>
            </Button>
          </Col>
        </Row>
      </div>
    </SortableContext>
  );
}
