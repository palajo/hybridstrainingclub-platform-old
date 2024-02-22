import React from 'react';
import { Button, Col, Form, Input, Row, theme } from 'antd';
import { CloseOutlined, CopyOutlined, MenuOutlined } from '@ant-design/icons';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { closestCenter, DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import WorkoutBlock from '@/components/Calendar/WorkoutBlock';

interface WorkoutGroupProps {
  group: any;
  remove: (index: number | number[]) => void;
  workoutIndex: number;
  groupIndex: number;
}

const WorkoutGroup: React.FC<WorkoutGroupProps> = ({ group, remove }) => {
  const { token: { borderRadiusLG, colorPrimaryBorder, colorPrimaryBg } } = theme.useToken();

  const stylesWorkoutGroup: React.CSSProperties = {
    padding: '12px',
    borderLeft: `3px solid ${colorPrimaryBorder}`,
    background: colorPrimaryBg,
    borderRadius: borderRadiusLG,
  };

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      console.log('Active Block ID:', active.id);
      console.log('Over Block ID:', over.id);
    }
  };

  return (
    <Col xs={24} key={group.key} style={stylesWorkoutGroup}>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Row align="middle" justify="space-between">
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
                <Button size="small" type="text" onClick={() => remove(group.key)}>
                  <CloseOutlined/>
                </Button>
              </Col>
            </Row>
          </Row>
        </Col>
        <Col xs={24}>
          <Form.Item name={[group.name, 'title']} style={{ marginBottom: 0 }}>
            <Input placeholder="Group Title"/>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.List name={[group.name, 'blocks']}>
            {(blocks, { add, remove }) => (
              <Row gutter={[0, 20]}>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext
                    items={[...Array(blocks)].map((_, index) => {return { id: index } })}
                    strategy={verticalListSortingStrategy}
                  >
                    {blocks.map((block: any) => (
                      <WorkoutBlock key={block.key} block={block} remove={remove}/>
                    ))}
                  </SortableContext>
                </DndContext>
                <Col xs={24}>
                  <Button type="dashed" onClick={() => add()} block>
                    +
                  </Button>
                </Col>
              </Row>
            )}
          </Form.List>
        </Col>
      </Row>
    </Col>
  );
};

export default WorkoutGroup;
