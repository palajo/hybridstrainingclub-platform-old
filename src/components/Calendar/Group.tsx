import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Button, Col, Input, Row, theme } from 'antd';
import { CloseOutlined, CopyOutlined, MenuOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Block from '@/components/Calendar/Block';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

interface SortableItemProps {
  id: string;
}

interface ListItem {
  id: string;
  content: string;
}

export default function Group({ id, data }: SortableItemProps) {
  const {
    token: { borderRadiusLG, colorPrimaryBg, colorPrimaryText, colorPrimaryBorder },
  } = theme.useToken();

  const style: React.CSSProperties = {
    padding: '12px',
    marginBottom: '16px',
    borderLeft: `3px solid ${colorPrimaryBorder}`,
    background: colorPrimaryBg,
    borderRadius: borderRadiusLG,
  };

  return (
    <Row gutter={[8, 16]}>
      <Col xs={24}>
        <Row align="middle" justify="space-between" gutter={[8, 8]}>
          <Col>
            <Button size="small" type="text" style={{ touchAction: 'none', cursor: 'move' }}>
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
        <Input placeholder="Warm up" value={data?.title}/>
      </Col>
      <Col xs={24}>
        {data?.blocks.map((block, blockId) => (
          <Block key={blockId} id={blockId} data={block}/>
        ))}
        <Row justify="center">
          <Col>
            <Button size="small" type="text">
              <PlusCircleOutlined/>
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
