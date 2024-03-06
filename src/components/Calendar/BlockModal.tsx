import React, { useContext, useState } from 'react';
import { Button, Col, Input, Modal, Row, theme } from 'antd';
import { CalendarContext } from '@/components/Calendar/Calendar';
import { closestCenter, DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import Exercise from '@/components/Calendar/Exercise';

const BlockModal: React.FC<{ show: boolean, onHide: () => void; block: any; groupIndex: number | null; blockIndex: number | null; workoutDate: string | null }> = ({
  show,
  onHide,
  block,
  groupIndex,
  blockIndex,
  workoutDate,
}) => {
  const {
    token: {
      borderRadiusLG,
      colorPrimaryBorder,
      colorBgContainer,
    },
  } = theme.useToken();

  const { updateBlockField, moveGroupBlockExercise, addWorkoutGroupBlockExercise } = useContext(CalendarContext);

  const styleExercisesList: React.CSSProperties = {
    padding: '16px',
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <Modal open={show} onCancel={onHide} onOk={onHide} width="1140px">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Input
            size="middle"
            placeholder="Title"
            value={block.title}
            onChange={(e) => {
              updateBlockField('title', e.target.value, workoutDate, groupIndex, blockIndex);
            }}
          />
        </Col>
        <Col span={12}>
          <Input
            size="middle"
            placeholder="Reps"
            value={block.reps}
            onChange={(e) => {
              updateBlockField('reps', e.target.value, workoutDate, groupIndex, blockIndex);
            }}
          />
        </Col>
        <Col span={24}>
          <div style={styleExercisesList}>
            {block.exercises && (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={(event) => setActiveIndex(event.active.id)}
                onDragEnd={(event) => {
                  const { active, over } = event;
                  const { id } = active;
                  const { id: overId } = over || { id: null };

                  moveGroupBlockExercise(workoutDate, groupIndex, blockIndex, id, overId);
                }}
                modifiers={[restrictToVerticalAxis]}
              >
                <SortableContext
                  items={block.exercises}
                  strategy={verticalListSortingStrategy}
                >
                  <Row gutter={[0, 8]}>
                    {block.exercises.map((exercise: any, exerciseIndex: number) => (
                      <Col xs={24} key={exerciseIndex}>
                        <Exercise exercise={exercise} groupIndex={groupIndex} blockIndex={blockIndex}
                                  exerciseIndex={exerciseIndex} workoutDate={workoutDate}/>
                      </Col>
                    ))}
                  </Row>
                </SortableContext>
                <DragOverlay>
                  {activeIndex && (
                    <Exercise
                      exercise={block.exercises[activeIndex]}
                      groupIndex={groupIndex}
                      blockIndex={blockIndex}
                      exerciseIndex={activeIndex}
                      workoutDate={workoutDate}
                    />
                  )}
                </DragOverlay>
              </DndContext>
            )}
            <Button type="dashed" onClick={() => addWorkoutGroupBlockExercise(workoutDate, groupIndex, blockIndex)} block style={{ marginTop: '24px' }}>
              +
            </Button>
          </div>
        </Col>
        <Col span={24}>
          <Input.TextArea
            size="middle"
            placeholder="Notes"
            value={block.notes}
            onChange={(e) => {
              updateBlockField('notes', e.target.value, workoutDate, groupIndex, blockIndex);
            }}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default BlockModal;