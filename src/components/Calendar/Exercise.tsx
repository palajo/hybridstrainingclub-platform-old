import React, { useContext } from 'react';
import { Button, Col, Input, InputNumber, Row, theme } from 'antd';
import { DeleteOutlined, MenuOutlined } from '@ant-design/icons';
import { CalendarContext } from '@/components/Calendar/Calendar';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Exercise: React.FC<{ exercise: any; groupIndex: number; blockIndex: number; exerciseIndex: number; workoutDate: string }> = ({
  exercise,
  groupIndex,
  blockIndex,
  exerciseIndex,
  workoutDate,
}) => {
  const {
    token: {
      borderRadiusLG,
      colorPrimaryBorder,
      colorPrimaryBg,
    },
  } = theme.useToken();

  const { updateExerciseField, removeWorkoutGroupBlockExercise } = useContext(CalendarContext);

  const {
    listeners,
    attributes,
    setNodeRef,
    setActivatorNodeRef,
    transition,
    transform,
    isDragging,
  } = useSortable({
    id: exerciseIndex,
  });

  const stylesWorkoutGroup: React.CSSProperties = {
    padding: '12px',
    borderLeft: `3px solid ${colorPrimaryBorder}`,
    background: colorPrimaryBg,
    borderRadius: borderRadiusLG,
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.35 : 1,
  };

  return (
    <div style={stylesWorkoutGroup} ref={setNodeRef} {...attributes}>
      <Row align="middle" justify="space-between" gutter={[0, 8]}>
        <Col xs="auto">
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
        <Col xs={5}>
          <Input
            size="middle"
            placeholder="Exercise"
            value={exercise.title}
            onChange={(e) => {
              updateExerciseField('title', e.target.value, workoutDate, groupIndex, blockIndex, exerciseIndex);
            }}
          />
        </Col>
        <Col xs={5}>
          <Input
            size="middle"
            placeholder="Category"
            value={exercise.category}
            onChange={(e) => {
              updateExerciseField('category', e.target.value, workoutDate, groupIndex, blockIndex, exerciseIndex);
            }}
          />
        </Col>
        <Col xs={5}>
          <Input
            size="middle"
            placeholder="Video"
            value={exercise.video}
            onChange={(e) => {
              updateExerciseField('video', e.target.value, workoutDate, groupIndex, blockIndex, exerciseIndex);
            }}
          />
        </Col>
        <Col xs={2}>
          <InputNumber
            size="middle"
            placeholder="Sets"
            value={exercise.sets}
            onChange={(e) => {
              updateExerciseField('sets', e.target.value, workoutDate, groupIndex, blockIndex, exerciseIndex);
            }}
          />
        </Col>
        <Col xs={2}>
          <InputNumber
            size="middle"
            placeholder="Reps"
            value={exercise.reps}
            onChange={(e) => {
              updateExerciseField('reps', e.target.value, workoutDate, groupIndex, blockIndex, exerciseIndex);
            }}
          />
        </Col>
        <Col xs={2}>
          <InputNumber
            size="middle"
            placeholder="Rest"
            value={exercise.rest}
            onChange={(e) => {
              updateExerciseField('rest', e.target.value, workoutDate, groupIndex, blockIndex, exerciseIndex);
            }}
          />
        </Col>
        <Col xs="auto">
          <Button
            size="small"
            type="text"
            onClick={() => removeWorkoutGroupBlockExercise(workoutDate, groupIndex, blockIndex, exerciseIndex)}
            danger
          >
            <DeleteOutlined/>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Exercise;