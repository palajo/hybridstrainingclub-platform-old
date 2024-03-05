import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, theme, Typography } from 'antd';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import WorkoutBlockModal from '@/components/Calendar/WorkoutBlockModal';

interface WorkoutBlockProps {
  block: any;
  remove: (index: number | number[]) => void;
  workoutIndex: number;
  groupIndex: number;
  blockIndex: number;
}

export const WorkoutBlockPlaceholder = ({ activeId, opacity = 1 }) => {
  const { token: { borderRadiusLG, colorBgContainer, colorPrimaryBorderHover } } = theme.useToken();

  const stylesWorkoutBlock: React.CSSProperties = {
    padding: '12px',
    borderLeft: `3px solid ${colorPrimaryBorderHover}`,
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
    opacity: opacity,
  };

  return (
    <Col xs={24} style={stylesWorkoutBlock}>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Row align="middle" justify="space-between">
            <Col>
              <Button
                size="small"
                type="text"
                style={{ touchAction: 'none', cursor: 'grab' }}
              >
                <MenuOutlined/>
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Row gutter={[16, 8]}>
            <Col xs={24}>
              <Form.Item name={[activeId, 'title']} style={{ marginBottom: 0 }}>
                <Input placeholder="Group Title"/>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};


const WorkoutBlock: React.FC<WorkoutBlockProps> = ({ block, remove, workoutIndex, groupIndex, blockIndex }) => {
  const { token: { colorBgContainer, borderRadiusLG, colorPrimaryBorderHover } } = theme.useToken();

  const {
    listeners,
    attributes,
    setNodeRef,
    setActivatorNodeRef,
    transition,
    transform,
    active,
    index,
    over,
  } = useSortable({
    id: blockIndex,
  });

  const isActive = active?.id === blockIndex;
  const insertPosition = over?.id === blockIndex ? (index > active.id ? 1 : -1) : undefined;

  const stylesWorkoutBlock: React.CSSProperties = {
    padding: '12px',
    borderLeft: `3px solid ${colorPrimaryBorderHover}`,
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isActive ? 0.35 : 1,
  };

  const form = Form.useFormInstance();
  const fields = form.getFieldsValue([['workouts', workoutIndex]]).workouts[workoutIndex].groups[groupIndex].blocks[blockIndex];

  const [updated, setUpdated] = useState(0);

  return (
    <>
      {insertPosition === -1 && (
        <WorkoutBlockPlaceholder activeId={active?.id} opacity={0.35} title={fields?.title}/>
      )}
      <Col xs={24} style={stylesWorkoutBlock} ref={setNodeRef} {...attributes}>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Row align="middle" justify="space-between">
              <Col>
                <Button
                  size="small"
                  type="text"
                  style={{ touchAction: 'none', cursor: 'grab' }}
                  ref={setActivatorNodeRef} {...listeners}
                >
                  <MenuOutlined/>
                </Button>
              </Col>
              <Row>
                <Col>
                  <WorkoutBlockModal
                    block={block}
                    workoutIndex={workoutIndex}
                    groupIndex={groupIndex}
                    blockIndex={blockIndex}
                    handleUpdate={() => setUpdated(updated + 1)}
                  />
                </Col>
                <Col>
                  <Button size="small" type="text" onClick={() => remove(blockIndex)}>
                    <CloseOutlined/>
                  </Button>
                </Col>
              </Row>
            </Row>
          </Col>
          <Col xs={24}>
            <Row gutter={[16, 8]}>
              {fields?.title && (
                <Col xs={24}>
                  <Typography.Title level={5} style={{ marginBottom: 0 }}>
                    {fields.title}
                  </Typography.Title>
                </Col>
              )}
              {fields?.exercises && (
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
              )}
            </Row>
          </Col>
        </Row>
      </Col>
      {insertPosition === 1 && (
        <WorkoutBlockPlaceholder activeId={active?.id} opacity={0.35}/>
      )}
    </>
  );
};

export default WorkoutBlock;
