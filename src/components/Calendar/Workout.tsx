import React, { useContext, useState } from 'react';
import { Dayjs } from 'dayjs';
import { Button, Col, Input, Row, theme, Typography } from 'antd';
import { closestCenter, DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { CalendarContext } from '@/components/Calendar/Calendar';
import Group from '@/components/Calendar/Group';

const Workout: React.FC<{ date: Dayjs, workout: any; }> = ({ date, workout }) => {
  const {
    token: {
      colorBorder,
    },
  } = theme.useToken();

  const { updateWorkoutField, addWorkoutGroup, moveGroup } = useContext(CalendarContext);

  const stylesWorkoutColumn: React.CSSProperties = {
    padding: '24px 12px',
  };

  const stylesWorkoutDate: React.CSSProperties = {
    padding: '8px 16px',
    borderBottom: `1px solid ${colorBorder}`,
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div style={stylesWorkoutDate}>
        <Typography.Title level={5} style={{ textAlign: 'center', marginBottom: '0' }}>
          {date.format('dddd')}
        </Typography.Title>
        <Typography style={{ textAlign: 'center' }}>
          {date.format('YYYY-MM-DD')}
        </Typography>
      </div>
      <div style={stylesWorkoutColumn}>
        <Row gutter={[0, 24]}>
          <Col xs={24}>
            <Input
              value={workout.video}
              onChange={(e) => {
                updateWorkoutField('video', e.target.value, date.format('YYYY-MM-DD'));
              }}
              placeholder="Video"
            />
          </Col>
          {workout.groups && (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={(event) => setActiveIndex(event.active.id)}
              onDragEnd={(event) => {
                const { active, over } = event;
                const { id } = active;
                const { id: overId } = over || { id: null };

                moveGroup(date.format('YYYY-MM-DD'), id, overId)
              }}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext items={workout.groups} strategy={verticalListSortingStrategy}>
                {workout.groups?.map((group: any, index: number) => (
                  <Col xs={24} key={index}>
                    <Group key={index} group={group} workoutDate={date.format('YYYY-MM-DD')}
                           groupIndex={index}/>
                  </Col>
                ))}
              </SortableContext>
              <DragOverlay>
                {activeIndex && (
                  <Group group={workout.groups[activeIndex]} groupIndex={activeIndex}
                         workoutDate={date.format('YYYY-MM-DD')}/>
                )}
              </DragOverlay>
            </DndContext>
          )}
          <Col xs={24}>
            <Button type="dashed" onClick={() => addWorkoutGroup(date.format('YYYY-MM-DD'))} block>
              +
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Workout;