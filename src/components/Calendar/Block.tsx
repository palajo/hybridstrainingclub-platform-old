import React from 'react';
import { Button, Col, Row, theme, Typography } from 'antd';
import ModalBlock from '@/components/Calendar/ModalBlock';
import { CSS } from '@dnd-kit/utilities';
import { generate } from '@ant-design/colors';
import { useSortable } from '@dnd-kit/sortable';
import { CloseOutlined, CopyOutlined, MenuOutlined } from '@ant-design/icons';

interface SortableItemProps {
  id: string;
}

function Block({ id }: SortableItemProps) {
  const {
    token: { colorPrimary, borderRadiusLG, colorBgContainer },
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
    marginBottom: '12px',
    borderLeft: `3px solid ${generate(colorPrimary)[4]}`,
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Row gutter={[0, 12]}>
        <Col xs={24}>
          <Row align="middle" justify="space-between">
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
          <Typography.Title level={5}>
            Round 1
          </Typography.Title>
          <Typography>
            Push ups, 3 sets x 10, 120s
          </Typography>
          <Typography>
            Push ups, 3 sets x 10, 120s
          </Typography>
          <Typography>
            Push ups, 3 sets x 10, 120s
          </Typography>
        </Col>
      </Row>
      <ModalBlock/>
    </div>
  );
}

export default Block;