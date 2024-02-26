import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, theme, Typography } from 'antd';
import { Dayjs } from 'dayjs';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

import WorkoutGroup, { WorkoutGroupPlaceholder } from './WorkoutGroup';

interface WorkoutProps {
  workout: any;
  date: Dayjs;
  key: number;
  workoutIndex: number;
}

const Workout: React.FC<WorkoutProps> = ({ workout, date, workoutIndex }) => {
  const {
    token: {
      colorBorder,
    },
  } = theme.useToken();

  const stylesWorkout: React.CSSProperties = {
    width: 'calc(100% / 7)',
    border: `1px solid ${colorBorder}`,
    borderRight: `${workoutIndex !== 6 && '0'}`,
  };

  const stylesWorkoutColumn: React.CSSProperties = {
    padding: '24px 16px',
  };

  const stylesWorkoutDate: React.CSSProperties = {
    padding: '8px 16px',
    borderBottom: `1px solid ${colorBorder}`,
  };

  const [activeId, setActiveId] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  return (
    <Col style={stylesWorkout}>
      <Row>
        <Col xs={24} style={stylesWorkoutDate}>
          <Typography.Title level={5} style={{ textAlign: 'center', marginBottom: '0' }}>
            {date.format('dddd')}
          </Typography.Title>
          <Typography style={{ textAlign: 'center' }}>
            {date.format('YYYY-MM-DD')}
          </Typography>
        </Col>
        <Col xs={24} style={stylesWorkoutColumn}>
          <Form.Item name={[workout.key, 'video']} initialValue={workout.video}>
            <Input placeholder="Video"/>
          </Form.Item>
          <Form.List name={[workout.name, 'groups']}>
            {(groups, { add, remove, move }) => (
              <Row gutter={[16, 16]}>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={(event) => setActiveId(event.active.id)}
                  onDragEnd={(event) => {
                    const { active, over } = event;
                    const { id } = active;
                    const { id: overId } = over || { id: null };

                    move(id, overId);
                  }}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext items={groups} strategy={verticalListSortingStrategy}>
                    {groups.map((group: any, groupIndex: number) => (
                      <WorkoutGroup
                        key={groupIndex}
                        group={group}
                        add={add}
                        remove={remove}
                        workoutIndex={workoutIndex}
                        groupIndex={groupIndex}
                      />
                    ))}
                  </SortableContext>
                  <DragOverlay>
                    {activeId && (
                      <WorkoutGroupPlaceholder activeId={activeId}/>
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
  );
};
export default Workout;