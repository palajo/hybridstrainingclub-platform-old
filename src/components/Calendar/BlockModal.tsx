import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Input, Modal, Row, theme } from 'antd';
import { CalendarContext } from '@/components/Calendar/Calendar';
import { closestCenter, DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import Exercise from '@/components/Calendar/Exercise';

export const CalendarBlockModalContext = React.createContext();

const BlockModal: React.FC<{ show: boolean, onHide: () => void; block: any; groupIndex: number; blockIndex: number; workoutDate: string }> = ({
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
      colorBgContainer,
    },
  } = theme.useToken();

  const { updateBlock } = useContext(CalendarContext);

  const [data, setData] = useState({
    title: '',
    reps: '',
    exercises: [],
    notes: '',
  });

  useEffect(() => {
    setData({ ...block });
  }, [block]);

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

  console.log(data);

  return (
    <Modal
      open={show}
      onCancel={onHide}
      onOk={() => {
        updateBlock(data, workoutDate, groupIndex, blockIndex);
        onHide();
      }}
      width="1140px"
    >
      <CalendarBlockModalContext.Provider
        value={{
          updateModalBlockField,
          updateModalBlockExerciseField,
          removeModalBlockExercise,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Input
              size="middle"
              placeholder="Title"
              value={data.title}
              onChange={(e) => {
                updateModalBlockField('title', e.target.value);
              }}
            />
          </Col>
          <Col span={12}>
            <Input
              size="middle"
              placeholder="Reps"
              value={data.reps}
              onChange={(e) => {
                updateModalBlockField('reps', e.target.value);
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

                    moveModalBlockExercise(id, overId);
                  }}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext
                    items={data.exercises}
                    strategy={verticalListSortingStrategy}
                  >
                    <Row gutter={[0, 8]}>
                      {data.exercises.map((exercise: any, exerciseIndex: number) => (
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
                        exercise={data.exercises[activeIndex]}
                        groupIndex={groupIndex}
                        blockIndex={blockIndex}
                        exerciseIndex={activeIndex}
                        workoutDate={workoutDate}
                      />
                    )}
                  </DragOverlay>
                </DndContext>
              )}
              <Button type="dashed" onClick={() => addModalBlockExercise()}
                      block style={{ marginTop: '24px' }}>
                +
              </Button>
            </div>
          </Col>
          <Col span={24}>
            <Input.TextArea
              size="middle"
              placeholder="Notes"
              value={data.notes}
              onChange={(e) => {
                updateModalBlockField('notes', e.target.value);
              }}
            />
          </Col>
        </Row>
      </CalendarBlockModalContext.Provider>
    </Modal>
  );

  function updateModalBlockField(field: string, newValue: any) {
    setData((prevData) => {
      const updatedData = { ...prevData };

      updatedData[field] = newValue;

      return updatedData;
    });
  };

  function updateModalBlockExerciseField(field: string, newValue: any, exerciseIndex: number) {
    setData((prevData) => {
      const updatedData = { ...prevData };

      updatedData.exercises[exerciseIndex][field] = newValue;

      return updatedData;
    });
  };

  function addModalBlockExercise() {
    setData((prevData) => {
      const updatedProgram = { ...prevData };

      updatedProgram.exercises.push({
        title: '',
        category: '',
        video: '',
        sets: 0,
        reps: 0,
        rest: 0,
      });

      return updatedProgram;
    });
  };

  function removeModalBlockExercise(exerciseIndex: number) {
    setData(prevData => {
      const updatedData = { ...prevData };

      updatedData.exercises.splice(exerciseIndex, 1);

      return updatedData;
    });
  };

  function moveModalBlockExercise(fromIndex: number, toIndex: number) {
    setData(prevData => {
      const updatedData = { ...prevData };

      // Determine the array to manipulate based on the object type
      let arrayToUpdate = updatedData.exercises;

      // Ensure the array to manipulate is defined
      if (arrayToUpdate) {
        // Remove the object from its current position
        const [objectToMove] = arrayToUpdate.splice(fromIndex, 1);
        // Insert the object into the new position
        arrayToUpdate.splice(toIndex, 0, objectToMove);
      }

      return updatedData;
    });
  };
};

export default BlockModal;