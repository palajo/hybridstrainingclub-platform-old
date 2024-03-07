import React, { useEffect, useState } from 'react';
import { Col, Row, theme } from 'antd';
import { Dayjs } from 'dayjs';
import Workout from '@/components/Calendar/Workout';
import BlockModal from '@/components/Calendar/BlockModal';

interface Workout {
  date: string;
  video: string;
  groups: Group[];
}

interface Exercise {
  title: string;
  category: string;
  video: string;
  sets: number;
  reps: number;
  rest: number;
}

interface Block {
  title: string;
  notes: string;
  exercises: Exercise[];
}

interface Group {
  title: string;
  blocks: Block[];
}

interface Program {
  slug: string;
  title: string;
  workouts: Workout[];
}

interface EditingBlock {
  show: boolean;
  block: Block;
  workoutDate: string;
  groupIndex: number | null;
  blockIndex: number | null;
}

interface CalendarContextProps {
  program: Program;
  setWorkouts: React.Dispatch<React.SetStateAction<Program>>;
  updateWorkoutField: (field: string, newValue: any, workoutDate: string) => void;
  updateGroupField: (field: string, newValue: any, workoutDate: string, groupIndex: number) => void;
  updateBlockField: (field: string, newValue: any, workoutDate: string, groupIndex: number, blockIndex: number) => void;
  updateExerciseField: (field: string, newValue: any, workoutDate: string, groupIndex: number, blockIndex: number, exerciseIndex: number) => void;
  addWorkoutGroup: (workoutDate: string) => void;
  removeWorkoutGroup: (workoutDate: string, groupIndex: number) => void;
  addWorkoutGroupBlock: (workoutDate: string, groupIndex: number) => void;
  removeWorkoutGroupBlock: (workoutDate: string, groupIndex: number, blockIndex: number) => void;
  addWorkoutGroupBlockExercise: (workoutDate: string, groupIndex: number, blockIndex: number) => void;
  removeWorkoutGroupBlockExercise: (workoutDate: string, groupIndex: number, blockIndex: number, exerciseIndex: number) => void;
  duplicateGroup: (workoutDate: string, groupIndex: number) => void;
  moveGroup: (workoutDate: string, fromIndex: number, toIndex: number) => void;
  moveGroupBlock: (workoutDate: string, groupIndex: number, fromIndex: number, toIndex: number) => void;
  moveGroupBlockExercise: (workoutDate: string, groupIndex: number, blockIndex: number, fromIndex: number, toIndex: number) => void;
  EditBlock: (block: Block, groupIndex: number, blockIndex: number, workoutDate: string) => void;
  updateBlock: (block: Block, groupIndex: number, blockIndex: number, workoutDate: string) => void;
}

export const CalendarContext = React.createContext<CalendarContextProps>({
  program: {
    slug: '',
    title: '',
    workouts: [],
  },
  setWorkouts: () => {},
  updateWorkoutField: () => {},
  updateGroupField: () => {},
  updateBlockField: () => {},
  updateExerciseField: () => {},
  addWorkoutGroup: () => {},
  removeWorkoutGroup: () => {},
  addWorkoutGroupBlock: () => {},
  removeWorkoutGroupBlock: () => {},
  addWorkoutGroupBlockExercise: () => {},
  removeWorkoutGroupBlockExercise: () => {},
  duplicateGroup: () => {},
  moveGroup: () => {},
  moveGroupBlock: () => {},
  moveGroupBlockExercise: () => {},
  EditBlock: () => {},
  updateBlock: () => {},
});

const Calendar: React.FC<{ data: any, date: Dayjs }> = ({ data, date }) => {
  const {
    token: {
      colorBgContainer,
      borderRadiusLG,
      colorBorder,
    },
  } = theme.useToken();


  // program
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    setWorkouts(data);
  }, [data]);

  const [editingBlock, setEditingBlock] = useState({
    show: false,
    block: {},
    workoutDate: '',
    groupIndex: null,
    blockIndex: null,
  });
  
  return (
    <CalendarContext.Provider
      value={{
        workouts,
        setWorkouts,
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
        updateBlock,
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
  );

  // program operations
  function findWorkoutByDate(date: Dayjs) {
    if (workouts.find(workout => workout.date === date.format('YYYY-MM-DD'))) {
      return workouts.find(workout => workout.date === date.format('YYYY-MM-DD'));
    }

    return {
      date: date.format('YYYY-MM-DD'),
    };
  };

  function addWorkoutGroup(workoutDate: string) {
    setWorkouts(prevWorkouts => {
      const updatedWorkouts = [...prevWorkouts];
      let workoutToUpdate = updatedWorkouts.find(workout => workout.date === workoutDate);

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

        updatedWorkouts.push(workoutToUpdate);
      }

      return updatedWorkouts;
    });
  };

  function addWorkoutGroupBlock(workoutDate: string, groupIndex: number) {
    setWorkouts((prevWorkouts) => {
      const updatedWorkouts = [...prevWorkouts];
      const workoutToUpdate = updatedWorkouts.find(workout => workout.date === workoutDate);

      if (workoutToUpdate && workoutToUpdate.groups && workoutToUpdate.groups[groupIndex]) {
        workoutToUpdate.groups[groupIndex].blocks.push({
          title: 'New Block Title',
          exercises: [],
          notes: '',
        });
      }

      return updatedWorkouts;
    });
  };

  function addWorkoutGroupBlockExercise(workoutDate: string, groupIndex: number, blockIndex: number) {
    setWorkouts((prevWorkouts) => {
      const updatedWorkouts = [...prevWorkouts];
      const workoutToUpdate = updatedWorkouts.find(workout => workout.date === workoutDate);

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

      return updatedWorkouts;
    });
  };

  function removeWorkoutGroup(workoutDate: string, groupIndex: number) {
    setWorkouts(prevWorkouts => {
      const updatedWorkouts = [...prevWorkouts];
      const workoutToUpdate = updatedWorkouts.find(workout => workout.date === workoutDate);

      if (workoutToUpdate) {
        // Remove the group at the specified index
        workoutToUpdate.groups.splice(groupIndex, 1);
      }

      return updatedWorkouts;
    });
  };

  function removeWorkoutGroupBlock(workoutDate: string, groupIndex: number, blockIndex: number) {
    setWorkouts(prevWorkouts => {
      const updatedWorkouts = [...prevWorkouts];
      const workoutToUpdate = updatedWorkouts.find(workout => workout.date === workoutDate);

      if (workoutToUpdate && workoutToUpdate.groups && workoutToUpdate.groups[groupIndex]) {
        // Remove the block at the specified index
        workoutToUpdate.groups[groupIndex].blocks.splice(blockIndex, 1);
      }

      return updatedWorkouts;
    });
  };

  function removeWorkoutGroupBlockExercise(workoutDate: string, groupIndex: number, blockIndex: number, exerciseIndex: number) {
    setWorkouts(prevWorkouts => {
      const updatedWorkouts = [...prevWorkouts];
      const workoutToUpdate = updatedWorkouts.find(workout => workout.date === workoutDate);

      if (workoutToUpdate && workoutToUpdate.groups && workoutToUpdate.groups[groupIndex] && workoutToUpdate.groups[groupIndex].blocks && workoutToUpdate.groups[groupIndex].blocks[blockIndex]) {
        // Remove the block at the specified index
        workoutToUpdate.groups[groupIndex].blocks[blockIndex].exercises.splice(exerciseIndex, 1);
      }

      return updatedWorkouts;
    });
  };

  function duplicateGroup(workoutDate: string, groupIndex: number) {
    setWorkouts(prevWorkouts => {
      const updatedWorkouts = [...prevWorkouts];
      const workoutToUpdateIndex = updatedWorkouts.findIndex(workout => workout.date === workoutDate);

      if (workoutToUpdateIndex !== -1) {
        const workoutToUpdate = updatedWorkouts[workoutToUpdateIndex];
        const groupToDuplicate = workoutToUpdate.groups[groupIndex];

        // Ensure the group to duplicate exists
        if (groupToDuplicate) {
          // Make a shallow copy of the group object
          const duplicatedGroup = { ...groupToDuplicate };
          // Insert the duplicated group after the original group
          workoutToUpdate.groups.splice(groupIndex + 1, 0, duplicatedGroup);
        }
      }

      return updatedWorkouts;
    });
  };

  function moveGroup(workoutDate: string, fromIndex: number, toIndex: number) {
    setWorkouts(prevWorkouts => {
      const updatedWorkouts = [...prevWorkouts];
      const workoutToUpdateIndex = updatedWorkouts.findIndex(workout => workout.date === workoutDate);

      if (workoutToUpdateIndex !== -1) {
        const workoutToUpdate = updatedWorkouts[workoutToUpdateIndex];

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

      return updatedWorkouts;
    });
  };

  function moveGroupBlock(workoutDate: string, groupIndex: number, fromIndex: number, toIndex: number) {
    setWorkouts(prevWorkouts => {
      const updatedWorkouts = [...prevWorkouts];
      const workoutToUpdateIndex = updatedWorkouts.findIndex(workout => workout.date === workoutDate);

      if (workoutToUpdateIndex !== -1) {
        const workoutToUpdate = updatedWorkouts[workoutToUpdateIndex];

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

      return updatedWorkouts;
    });
  };

  function moveGroupBlockExercise(workoutDate: string, groupIndex: number, blockIndex: number, fromIndex: number, toIndex: number) {
    setWorkouts(prevWorkouts => {
      const updatedWorkouts = [...prevWorkouts];
      const workoutToUpdateIndex = updatedWorkouts.findIndex(workout => workout.date === workoutDate);

      if (workoutToUpdateIndex !== -1) {
        const workoutToUpdate = updatedWorkouts[workoutToUpdateIndex];

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

      return updatedWorkouts;
    });
  };


  // fields handling
  function updateWorkoutField(field: string, newValue: any, workoutDate: string) {
    setWorkouts((prevWorkouts) => {
      const updatedWorkouts = [...prevWorkouts];
      let workoutToUpdate = updatedWorkouts.find(workout => workout.date === workoutDate);

      // If workout not found, create a new one
      if (!workoutToUpdate) {
        workoutToUpdate = {
          date: workoutDate,
          // Add default values for other fields if needed
        };
        updatedWorkouts.push(workoutToUpdate);
      }

      // Update the field with the new value
      workoutToUpdate[field] = newValue;

      return updatedWorkouts;
    });
  };

  function updateGroupField(field: string, newValue: any, workoutDate: string, groupIndex: number) {
    setWorkouts((prevWorkouts) => {
      const updatedWorkouts = [...prevWorkouts];
      const workoutToUpdate = updatedWorkouts.find(workout => workout.date === workoutDate);

      if (workoutToUpdate && workoutToUpdate.groups && workoutToUpdate.groups[groupIndex]) {
        workoutToUpdate.groups[groupIndex][field] = newValue;
      }

      return updatedWorkouts;
    });
  };

  function updateBlock(newValue: any, workoutDate: string, groupIndex: number, blockIndex: number) {
    setWorkouts((prevWorkouts) => {
      const updatedWorkouts = [...prevWorkouts];
      const workoutToUpdate = updatedWorkouts.find(workout => workout.date === workoutDate);

      if (workoutToUpdate && workoutToUpdate.groups && workoutToUpdate.groups[groupIndex] && workoutToUpdate.groups[groupIndex].blocks && workoutToUpdate.groups[groupIndex].blocks[blockIndex]) {
        workoutToUpdate.groups[groupIndex].blocks[blockIndex] = newValue;
      }

      return updatedWorkouts;
    });
  };

  function updateBlockField(field: string, newValue: any, workoutDate: string, groupIndex: number, blockIndex: number) {
    setWorkouts((prevWorkouts) => {
      const updatedWorkouts = [...prevWorkouts];
      const workoutToUpdate = updatedWorkouts.find(workout => workout.date === workoutDate);

      if (workoutToUpdate && workoutToUpdate.groups && workoutToUpdate.groups[groupIndex] && workoutToUpdate.groups[groupIndex].blocks && workoutToUpdate.groups[groupIndex].blocks[blockIndex]) {
        workoutToUpdate.groups[groupIndex].blocks[blockIndex][field] = newValue;
      }

      return updatedWorkouts;
    });
  };

  function updateExerciseField(field: string, newValue: any, workoutDate: string, groupIndex: number, blockIndex: number, exerciseIndex: number) {
    setWorkouts((prevWorkouts) => {
      const updatedWorkouts = [...prevWorkouts];
      const workoutToUpdate = updatedWorkouts.find(workout => workout.date === workoutDate);

      if (workoutToUpdate && workoutToUpdate.groups && workoutToUpdate.groups[groupIndex] && workoutToUpdate.groups[groupIndex].blocks && workoutToUpdate.groups[groupIndex].blocks[blockIndex] && workoutToUpdate.groups[groupIndex].blocks[blockIndex].exercises && workoutToUpdate.groups[groupIndex].blocks[blockIndex].exercises[exerciseIndex]) {
        workoutToUpdate.groups[groupIndex].blocks[blockIndex].exercises[exerciseIndex][field] = newValue;
      }

      return updatedWorkouts;
    });
  };

  function EditBlock(block: object, groupIndex: number, blockIndex: number, workoutDate: string) {
    setEditingBlock({
      show: true,
      block: block,
      workoutDate: workoutDate,
      groupIndex: groupIndex,
      blockIndex: blockIndex,
    });
  }
};

export default Calendar;