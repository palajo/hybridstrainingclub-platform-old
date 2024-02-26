import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, theme } from 'antd';
import { CloseOutlined, CopyOutlined, MenuOutlined } from '@ant-design/icons';
import { CSS } from '@dnd-kit/utilities';
import {
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import WorkoutBlock, { WorkoutBlockPlaceholder } from '@/components/Calendar/WorkoutBlock';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

interface WorkoutGroupProps {
  group: any;
  remove: (index: number | number[]) => void;
  add: (index: number | number[]) => void;
  workoutIndex: number;
  groupIndex: number;
}

export const WorkoutGroupPlaceholder = ({ activeId = 0, opacity = 1 }) => {
  const { token: { borderRadiusLG, colorPrimaryBorder, colorPrimaryBg } } = theme.useToken();

  const stylesWorkoutGroup: React.CSSProperties = {
    padding: '12px',
    borderLeft: `3px solid ${colorPrimaryBorder}`,
    background: colorPrimaryBg,
    borderRadius: borderRadiusLG,
    opacity: opacity,
  };

  return (
    <Col xs={24} style={stylesWorkoutGroup}>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Row align="middle" justify="space-between">
            <Col>
              <Button size="small" type="text" style={{ touchAction: 'none', cursor: 'grab' }}>
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
          <Form.Item name={[activeId, 'title']} style={{ marginBottom: 0 }}>
            <Input placeholder="Group Title"/>
          </Form.Item>
        </Col>
      </Row>
    </Col>
  );
};

const WorkoutGroup: React.FC<WorkoutGroupProps> = ({ group, add, remove, workoutIndex, groupIndex }) => {
  const { token: { borderRadiusLG, colorPrimaryBorder, colorPrimaryBg } } = theme.useToken();

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
    id: groupIndex,
  });

  const isActive = active?.id === groupIndex;
  const insertPosition = over?.id === groupIndex ? (index > active.id ? 1 : -1) : undefined;

  const stylesWorkoutGroup: React.CSSProperties = {
    padding: '12px',
    borderLeft: `3px solid ${colorPrimaryBorder}`,
    background: colorPrimaryBg,
    borderRadius: borderRadiusLG,
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isActive ? 0.35 : 1,
  };

  const form = Form.useFormInstance();
  const fields = form.getFieldsValue([['workouts', workoutIndex]]).workouts[workoutIndex].groups[groupIndex];

  const [activeId, setActiveId] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  return (
    <>
      {insertPosition === -1 && (
        <WorkoutGroupPlaceholder activeId={active?.id} opacity={0.5}/>
      )}
      <Col xs={24} key={group.key} style={stylesWorkoutGroup} ref={setNodeRef} {...attributes}>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Row align="middle" justify="space-between">
              <Col>
                <Button size="small" type="text" style={{ touchAction: 'none', cursor: 'grab' }}
                        ref={setActivatorNodeRef} {...listeners}>
                  <MenuOutlined/>
                </Button>
              </Col>
              <Row>
                <Col>
                  <Button size="small" type="text" onClick={() => add(fields)}>
                    <CopyOutlined/>
                  </Button>
                </Col>
                <Col>
                  <Button size="small" type="text" onClick={() => remove(groupIndex)}>
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
              {(blocks, { add, remove, move }) => (
                <Row gutter={[0, 20]}>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={(event) => setActiveId(event.active.id)}
                    onDragEnd={(event) => {
                      const { active, over } = event;
                      const { id } = active;
                      const { id: overId } = over || { id: null };

                      move(id, overId)
                    }}
                    modifiers={[restrictToVerticalAxis]}
                  >
                    <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
                      {blocks.map((block: any, blockIndex) => (
                        <WorkoutBlock
                          key={block.name}
                          block={block}
                          remove={remove}
                          workoutIndex={workoutIndex}
                          groupIndex={groupIndex}
                          blockIndex={blockIndex}
                        />
                      ))}
                    </SortableContext>
                    <DragOverlay>
                      {activeId && (
                        <WorkoutBlockPlaceholder activeId={activeId}/>
                      )}
                    </DragOverlay>
                  </DndContext>
                  <Col xs={24}>
                    <Button type="dashed" onClick={() => add({})} block>
                      +
                    </Button>
                  </Col>
                </Row>
              )}
            </Form.List>
          </Col>
        </Row>
      </Col>
      {insertPosition === 1 && (
        <WorkoutGroupPlaceholder activeId={active?.id} opacity={0.5}/>
      )}
    </>
  );
};

export default WorkoutGroup;
