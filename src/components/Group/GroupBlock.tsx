import React from 'react';
import { Button, Col, Form, Input, Row, theme, Typography } from 'antd';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import GroupBlockExercises from '@/components/Group/GroupBlockExercises';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { WorkoutGroupPlaceholder } from '@/components/Calendar/WorkoutGroup';

interface WorkoutBlockProps {
  block: any;
  remove: (index: number | number[]) => void;
  blockIndex: number;
}

const GroupBlock: React.FC<WorkoutBlockProps> = ({ block, remove, blockIndex }) => {
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
    padding: '24px 16px',
    borderLeft: `3px solid ${colorPrimaryBorderHover}`,
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isActive ? 0.35 : 1,
  };

  return (
    <>
      {insertPosition === -1 && (
        <Typography>
          Placeholder
        </Typography>
      )}
      <Col xs={24} key={blockIndex} ref={setNodeRef} {...attributes}>
        <div style={stylesWorkoutBlock}>
          <Row gutter={[20, 20]}>
            <Col xs={24}>
              <Row align="middle" justify="space-between">
                <Col>
                  <Button
                    size="small"
                    type="text"
                    style={{ touchAction: 'none', cursor: 'grab' }}
                    ref={setActivatorNodeRef}
                    {...listeners}
                  >
                    <MenuOutlined/>
                  </Button>
                </Col>
                <Row>
                  <Col>
                    <Button size="small" type="text" onClick={() => remove(blockIndex)}>
                      <CloseOutlined/>
                    </Button>
                  </Col>
                </Row>
              </Row>
            </Col>
            <Col xs={12}>
              <Form.Item name={[block.name, 'title']} style={{ marginBottom: 0 }}>
                <Input placeholder="Block Title"/>
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item name={[block.name, 'reps']} style={{ marginBottom: 0 }}>
                <Input placeholder="Block Reps"/>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.List name="exercises">
                {(blocks, { add, remove, move }) => (
                  <GroupBlockExercises blocks={blocks} add={add} remove={remove} move={move}/>
                )}
              </Form.List>
            </Col>
            <Col xs={24}>
              <Form.Item name={[block.name, 'notes']} style={{ marginBottom: 0 }}>
                <Input.TextArea placeholder="Block Notes"/>
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Col>
      {insertPosition === 1 && (
        <Typography>
          Placeholder
        </Typography>
      )}
    </>
  );
};

export default GroupBlock;