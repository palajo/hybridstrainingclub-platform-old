import React, { useState } from 'react';
import { Button, Col, Row, Select, theme, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { ArrowLeftOutlined, ArrowRightOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import Workout from '@/components/Calendar/Workout';
import BlockModal from '@/components/Calendar/BlockModal';

export const CalendarContext = React.createContext();

const Calendar: React.FC = () => {
  const {
    token: {
      colorBgContainer,
      borderRadiusLG,
      colorBorder,
    },
  } = theme.useToken();

  // date
  const [date, setDate] = useState(dayjs());

  const goToPreviousMonth = () => setDate(date.subtract(4, 'week'));

  const goToNextMonth = () => setDate(date.add(4, 'week'));

  // program
  const [program, setProgram] = useState({
    slug: 'standard-plan',
    title: 'Standard Program',
    workouts: [
      {
        date: '2024-03-05',
        video: 'https://...',
        groups: [
          {
            title: 'Warm up',
            blocks: [
              {
                title: 'Round 1',
                notes: 'Keep it simple',
                exercises: [
                  {
                    title: 'Stretching',
                    category: 'Stretching',
                    video: 'https://...',
                    sets: 3,
                    reps: 10,
                    rest: 120,
                  },
                  {
                    title: 'Stretching',
                    category: 'Stretching',
                    video: 'https://...',
                    sets: 3,
                    reps: 10,
                    rest: 120,
                  },
                  {
                    title: 'Stretching',
                    category: 'Stretching',
                    video: 'https://...',
                    sets: 3,
                    reps: 10,
                    rest: 120,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

  const [editingBlock, setEditingBlock] = useState({
    show: false,
    block: {},
    workoutDate: '',
    groupIndex: null,
    blockIndex: null,
  });

  return (
    <Row gutter={[24, 16]}>
      <Col span={24}>
        <Row justify="space-between" align="middle">
          <Col>
            <Row align="middle" gutter={[24, 16]}>
              <Col>
                <Row gutter={[8, 8]}>
                  <Col>
                    <Col>
                      <Button onClick={goToPreviousMonth}><ArrowLeftOutlined/></Button>
                    </Col>
                  </Col>
                  <Col>
                    <Button onClick={goToNextMonth}><ArrowRightOutlined/></Button>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Typography.Title level={3} style={{ marginBottom: 0 }}>
                  {date.startOf('week').format('MMM DD')} - {date.add(3, 'week').endOf('week').format('MMM DD')}
                </Typography.Title>
              </Col>
            </Row>
            <Col>
            </Col>
          </Col>
          <Col>
            <Row gutter={[12, 12]}>
              <Col>
                <Select
                  defaultValue={program}
                  style={{ width: 240 }}
                  options={[
                    { value: 'program-1', label: 'Program #1' },
                    { value: 'program-2', label: 'Program #2' },
                    { value: 'program-3', label: 'Program #3' },
                    { value: 'program-4', label: 'Program #4', disabled: true },
                  ]}
                />
              </Col>
              <Col>
                <Button type="dashed" danger icon={<DeleteOutlined/>} onClick={() => alert('Delete program')}/>
              </Col>
              <Col>
                <Button type="primary" icon={<SaveOutlined/>}>Save</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24}
           style={{ padding: '16px 24px', background: colorBgContainer, borderRadius: borderRadiusLG }}>
        <CalendarContext.Provider
          value={{
            program,
            setProgram,
            updateWorkoutField,
            updateGroupField,
            updateBlockField,
            updateExerciseField,
            addWorkoutGroup,
            removeWorkoutGroup,
            addWorkoutGroupBlock,
            removeWorkoutGroupBlock,
            addWorkoutGroupBlockExercise,
            removeWorkoutGroupBlockExercise,
            duplicateGroup,
            moveGroup,
            moveGroupBlock,
            moveGroupBlockExercise,
            EditBlock,
          }}
        >
          <Row gutter={[0, 0]}>
            {[...Array(28)].map((_, workoutIndex) => (
              <Col
                style={{
                  width: 'calc(100% / 7)',
                  border: `1px solid ${colorBorder}`,
                }}
                key={workoutIndex}
              >
                <Workout
                  date={date.startOf('week').add(workoutIndex, 'day')}
                  workout={findWorkoutByDate(date.startOf('week').add(workoutIndex, 'day'))}
                />
              </Col>
            ))}
            {editingBlock.show && (
              <BlockModal
                show={editingBlock.show}
                onHide={() => setEditingBlock({
                  show: false,
                  block: {},
                  workoutDate: '',
                  groupIndex: null,
                  blockIndex: null,
                })}
                block={editingBlock.block}
                groupIndex={editingBlock.groupIndex}
                blockIndex={editingBlock.blockIndex}
                workoutDate={editingBlock.workoutDate}
              />
            )}
          </Row>
        </CalendarContext.Provider>
      </Col>
    </Row>
  );

  // program operations
  function findWorkoutByDate(date: Dayjs) {
    if (program.workouts.find(workout => workout.date === date.format('YYYY-MM-DD'))) {
      return program.workouts.find(workout => workout.date === date.format('YYYY-MM-DD'));
    }

    return {
      date: date.format('YYYY-MM-DD'),
    };
  };

  function addWorkoutGroup(workoutDate: string) {
    setProgram(prevProgram => {
      const updatedProgram = { ...prevProgram };
      let workoutToUpdate = updatedProgram.workouts.find(workout => workout.date === workoutDate);

      // If workout not found, create a new one
      if (workoutToUpdate) {
        workoutToUpdate.groups.push({
          title: 'New Group',
          blocks: [],
        });
      } else {
        workoutToUpdate = {
          date: workoutDate,
          // Add default values for other fields if needed
          groups: [{
            title: 'New Group',
            blocks: [],
          }],
        };

        updatedProgram.workouts.push(workoutToUpdate);
      }

      return updatedProgram;
    });
  };

  function addWorkoutGroupBlock(workoutDate: string, groupIndex: number) {
    setProgram((prevProgram) => {
      const updatedProgram = { ...prevProgram };
      const workoutToUpdate = updatedProgram.workouts.find(workout => workout.date === workoutDate);

      if (workoutToUpdate && workoutToUpdate.groups && workoutToUpdate.groups[groupIndex]) {
        workoutToUpdate.groups[groupIndex].blocks.push({
          title: 'New Block Title',
          exercises: [],
          notes: '',
        });
      }

      return updatedProgram;
    });
  };

  function addWorkoutGroupBlockExercise(workoutDate: string, groupIndex: number, blockIndex: number) {
    setProgram((prevProgram) => {
      const updatedProgram = { ...prevProgram };
      const workoutToUpdate = updatedProgram.workouts.find(workout => workout.date === workoutDate);

      if (workoutToUpdate && workoutToUpdate.groups && workoutToUpdate.groups[groupIndex] && workoutToUpdate.groups[groupIndex].blocks && workoutToUpdate.groups[groupIndex].blocks[blockIndex]) {
        workoutToUpdate.groups[groupIndex].blocks[blockIndex].exercises.push({
          title: '',
          category: '',
          video: '',
          sets: 0,
          reps: 0,
          rest: 0,
        });
      }

      return updatedProgram;
    });
  };

  function removeWorkoutGroup(workoutDate: string, groupIndex: number) {
    setProgram(prevProgram => {
      const updatedProgram = { ...prevProgram };
      const workoutToUpdate = updatedProgram.workouts.find(workout => workout.date === workoutDate);

      if (workoutToUpdate) {
        // Remove the group at the specified index
        workoutToUpdate.groups.splice(groupIndex, 1);
      }

      return updatedProgram;
    });
  };

  function removeWorkoutGroupBlock(workoutDate: string, groupIndex: number, blockIndex: number) {
    setProgram(prevProgram => {
      const updatedProgram = { ...prevProgram };
      const workoutToUpdate = updatedProgram.workouts.find(workout => workout.date === workoutDate);

      if (workoutToUpdate && workoutToUpdate.groups && workoutToUpdate.groups[groupIndex]) {
        // Remove the block at the specified index
        workoutToUpdate.groups[groupIndex].blocks.splice(blockIndex, 1);
      }

      return updatedProgram;
    });
  };

  function removeWorkoutGroupBlockExercise(workoutDate: string, groupIndex: number, blockIndex: number, exerciseIndex: number) {
    setProgram(prevProgram => {
      const updatedProgram = { ...prevProgram };
      const workoutToUpdate = updatedProgram.workouts.find(workout => workout.date === workoutDate);

      if (workoutToUpdate && workoutToUpdate.groups && workoutToUpdate.groups[groupIndex] && workoutToUpdate.groups[groupIndex].blocks && workoutToUpdate.groups[groupIndex].blocks[blockIndex]) {
        // Remove the block at the specified index
        workoutToUpdate.groups[groupIndex].blocks[blockIndex].exercises.splice(exerciseIndex, 1);
      }

      return updatedProgram;
    });
  };

  function duplicateGroup(workoutDate: string, groupIndex: number) {
    setProgram(prevProgram => {
      const updatedProgram = { ...prevProgram };
      const workoutToUpdateIndex = updatedProgram.workouts.findIndex(workout => workout.date === workoutDate);

      if (workoutToUpdateIndex !== -1) {
        const workoutToUpdate = updatedProgram.workouts[workoutToUpdateIndex];
        const groupToDuplicate = workoutToUpdate.groups[groupIndex];

        // Ensure the group to duplicate exists
        if (groupToDuplicate) {
          // Make a shallow copy of the group object
          const duplicatedGroup = { ...groupToDuplicate };
          // Insert the duplicated group after the original group
          workoutToUpdate.groups.splice(groupIndex + 1, 0, duplicatedGroup);
        }
      }

      return updatedProgram;
    });
  };

  function moveGroup(workoutDate: string, fromIndex: number, toIndex: number) {
    setProgram(prevProgram => {
      const updatedProgram = { ...prevProgram };
      const workoutToUpdateIndex = updatedProgram.workouts.findIndex(workout => workout.date === workoutDate);

      if (workoutToUpdateIndex !== -1) {
        const workoutToUpdate = updatedProgram.workouts[workoutToUpdateIndex];

        // Determine the array to manipulate based on the object type
        let arrayToUpdate = workoutToUpdate.groups;

        // Ensure the array to manipulate is defined
        if (arrayToUpdate) {
          // Remove the object from its current position
          const [objectToMove] = arrayToUpdate.splice(fromIndex, 1);
          // Insert the object into the new position
          arrayToUpdate.splice(toIndex, 0, objectToMove);
        }
      }

      return updatedProgram;
    });
  };

  function moveGroupBlock(workoutDate: string, groupIndex: number, fromIndex: number, toIndex: number) {
    setProgram(prevProgram => {
      const updatedProgram = { ...prevProgram };
      const workoutToUpdateIndex = updatedProgram.workouts.findIndex(workout => workout.date === workoutDate);

      if (workoutToUpdateIndex !== -1) {
        const workoutToUpdate = updatedProgram.workouts[workoutToUpdateIndex];

        // Determine the array to manipulate based on the object type
        let arrayToUpdate = workoutToUpdate.groups[groupIndex].blocks;

        // Ensure the array to manipulate is defined
        if (arrayToUpdate) {
          // Remove the object from its current position
          const [objectToMove] = arrayToUpdate.splice(fromIndex, 1);
          // Insert the object into the new position
          arrayToUpdate.splice(toIndex, 0, objectToMove);
        }
      }

      return updatedProgram;
    });
  };

  function moveGroupBlockExercise(workoutDate: string, groupIndex: number, blockIndex: number, fromIndex: number, toIndex: number) {
    setProgram(prevProgram => {
      const updatedProgram = { ...prevProgram };
      const workoutToUpdateIndex = updatedProgram.workouts.findIndex(workout => workout.date === workoutDate);

      if (workoutToUpdateIndex !== -1) {
        const workoutToUpdate = updatedProgram.workouts[workoutToUpdateIndex];

        // Determine the array to manipulate based on the object type
        let arrayToUpdate = workoutToUpdate.groups[groupIndex].blocks[blockIndex].exercises;

        // Ensure the array to manipulate is defined
        if (arrayToUpdate) {
          // Remove the object from its current position
          const [objectToMove] = arrayToUpdate.splice(fromIndex, 1);
          // Insert the object into the new position
          arrayToUpdate.splice(toIndex, 0, objectToMove);
        }
      }

      return updatedProgram;
    });
  };


  // fields handling
  function updateWorkoutField(field: string, newValue: any, workoutDate: string) {
    setProgram((prevProgram) => {
      const updatedProgram = { ...prevProgram };
      let workoutToUpdate = updatedProgram.workouts.find(workout => workout.date === workoutDate);

      // If workout not found, create a new one
      if (!workoutToUpdate) {
        workoutToUpdate = {
          date: workoutDate,
          // Add default values for other fields if needed
        };
        updatedProgram.workouts.push(workoutToUpdate);
      }

      // Update the field with the new value
      workoutToUpdate[field] = newValue;

      return updatedProgram;
    });
  };

  function updateGroupField(field: string, newValue: any, workoutDate: string, groupIndex: number) {
    setProgram((prevProgram) => {
      const updatedProgram = { ...prevProgram };
      const workoutToUpdate = updatedProgram.workouts.find(workout => workout.date === workoutDate);

      if (workoutToUpdate && workoutToUpdate.groups && workoutToUpdate.groups[groupIndex]) {
        workoutToUpdate.groups[groupIndex][field] = newValue;
      }

      return updatedProgram;
    });
  };

  function updateBlockField(field: string, newValue: any, workoutDate: string, groupIndex: number, blockIndex: number) {
    setProgram((prevProgram) => {
      const updatedProgram = { ...prevProgram };
      const workoutToUpdate = updatedProgram.workouts.find(workout => workout.date === workoutDate);

      if (workoutToUpdate && workoutToUpdate.groups && workoutToUpdate.groups[groupIndex] && workoutToUpdate.groups[groupIndex].blocks && workoutToUpdate.groups[groupIndex].blocks[blockIndex]) {
        workoutToUpdate.groups[groupIndex].blocks[blockIndex][field] = newValue;
      }

      return updatedProgram;
    });
  };

  function updateExerciseField(field: string, newValue: any, workoutDate: string, groupIndex: number, blockIndex: number, exerciseIndex: number) {
    setProgram((prevProgram) => {
      const updatedProgram = { ...prevProgram };
      const workoutToUpdate = updatedProgram.workouts.find(workout => workout.date === workoutDate);

      if (workoutToUpdate && workoutToUpdate.groups && workoutToUpdate.groups[groupIndex] && workoutToUpdate.groups[groupIndex].blocks && workoutToUpdate.groups[groupIndex].blocks[blockIndex] && workoutToUpdate.groups[groupIndex].blocks[blockIndex].exercises && workoutToUpdate.groups[groupIndex].blocks[blockIndex].exercises[exerciseIndex]) {
        workoutToUpdate.groups[groupIndex].blocks[blockIndex].exercises[exerciseIndex][field] = newValue;
      }

      return updatedProgram;
    });
  };

  function EditBlock(block: object, groupIndex: number, blockIndex: number, workoutDate: string,) {
    setEditingBlock({
      show: true,
      block: block,
      workoutDate: workoutDate,
      groupIndex: groupIndex,
      blockIndex: blockIndex
    });
  }
};

export default Calendar;