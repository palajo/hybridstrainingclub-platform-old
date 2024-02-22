import React from 'react';
import { Button, Col, Row, theme, Typography } from 'antd';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import WorkoutBlockModal from '@/components/Calendar/WorkoutBlockModal';

interface WorkoutBlockProps {
  block: any;
  remove: (index: number | number[]) => void;
}

const WorkoutBlock: React.FC<WorkoutBlockProps> = ({ block, remove }) => {
  const { token: { colorBgContainer, borderRadiusLG, colorPrimaryBorderHover } } = theme.useToken();

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.key });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '12px',
    borderLeft: `3px solid ${colorPrimaryBorderHover}`,
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Col xs={24} style={style} ref={setNodeRef} {...attributes}>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Row align="middle" justify="space-between">
            <Col>
              <Button
                size="small"
                type="text"
                ref={setActivatorNodeRef}
                style={{ touchAction: 'none', cursor: 'grab' }}
                {...listeners}
              >
                <MenuOutlined />
              </Button>
            </Col>
            <Row>
              <Col>
                <WorkoutBlockModal block={block}/>
              </Col>
              <Col>
                <Button size="small" type="text" onClick={() => remove(block.key)}>
                  <CloseOutlined />
                </Button>
              </Col>
            </Row>
          </Row>
        </Col>
        <Col xs={24}>
          <Row gutter={[16, 8]}>
            <Col xs={24}>
              <Typography.Title level={5} style={{ marginBottom: 0 }}>
                Block Title
              </Typography.Title>
            </Col>
            <Col xs={24}>
              <Typography>
                Push ups, 3x20, 120s
              </Typography>
              <Typography>
                Push ups, 3x20, 120s
              </Typography>
              <Typography>
                Push ups, 3x20, 120s
              </Typography>
            </Col>
            <Col>
              <Typography>
                Just do it!
              </Typography>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default WorkoutBlock;
