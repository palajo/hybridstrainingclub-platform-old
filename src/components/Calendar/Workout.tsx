import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, theme } from 'antd';

import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

import WorkoutGroup from './WorkoutGroup';
import WorkoutDate from './WorkoutDate';

interface WorkoutProps {
  workout: any;
  date: any;
  key: number;
}

const Workout: React.FC<WorkoutProps> = ({ workout, date }) => {
  const {
    token: {
      colorBorder,
    },
  } = theme.useToken();

  const stylesWorkout: React.CSSProperties = {
    width: 'calc(100% / 7)',
    border: `1px solid ${colorBorder}`,
    borderRight: 0,
  };

  const stylesWorkoutColumn: React.CSSProperties = {
    padding: '24px 16px',
  };

  const [data, setData] = useState([]);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setData((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };

  return (
    <Col style={stylesWorkout}>
      <Row>
        <WorkoutDate date={date}/>
        <Col xs={24} style={stylesWorkoutColumn}>
          <Form.Item name={[workout.key, 'video']} initialValue={workout.video}>
            <Input placeholder="Video"/>
          </Form.Item>
          <Form.List name={[workout.name, 'groups']}>
            {(groups, { add, remove }) => (
              <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                <SortableContext
                  items={groups.map((i) => i.key)}
                  strategy={verticalListSortingStrategy}
                >
                  <Row gutter={[16, 16]}>
                    {groups.map((group: any, index: number) => (
                      <WorkoutGroup
                        key={index}
                        group={group}
                        remove={remove}
                      />
                    ))}
                    <Col xs={24}>
                      <Button type="dashed" onClick={() => add()} block>
                        +
                      </Button>
                    </Col>
                  </Row>
                </SortableContext>
              </DndContext>
            )}
          </Form.List>
        </Col>
      </Row>
    </Col>
  );
};
export default Workout;