import React, { useContext } from 'react';
import { Button, Col, Input, InputNumber, Row, theme } from 'antd';
import { DeleteOutlined, MenuOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CalendarBlockModalContext } from '@/components/Calendar/BlockModal';

const Exercise: React.FC<{ exercise: any; exerciseIndex: number; }> = ({
  exercise,
  exerciseIndex,
}) => {
  const {
    token: {
      borderRadiusLG,
      colorPrimaryBorder,
      colorPrimaryBg,
    },
  } = theme.useToken();

  const { updateModalBlockExerciseField, removeModalBlockExercise } = useContext(CalendarBlockModalContext);

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
              updateModalBlockExerciseField('title', e.target.value, exerciseIndex);
            }}
          />
        </Col>
        <Col xs={5}>
          <Input
            size="middle"
            placeholder="Category"
            value={exercise.category}
            onChange={(e) => {
              updateModalBlockExerciseField('category', e.target.value, exerciseIndex);
            }}
          />
        </Col>
        <Col xs={5}>
          <Input
            size="middle"
            placeholder="Video"
            value={exercise.video}
            onChange={(e) => {
              updateModalBlockExerciseField('video', e.target.value, exerciseIndex);
            }}
          />
        </Col>
        <Col xs={2}>
          <InputNumber
            size="middle"
            placeholder="Sets"
            value={exercise.sets}
            onChange={(newValue) => {
              updateModalBlockExerciseField('sets', newValue, exerciseIndex);
            }}
          />
        </Col>
        <Col xs={2}>
          <InputNumber
            size="middle"
            placeholder="Reps"
            value={exercise.reps}
            onChange={(newValue) => {
              updateModalBlockExerciseField('reps', newValue, exerciseIndex);
            }}
          />
        </Col>
        <Col xs={2}>
          <InputNumber
            size="middle"
            placeholder="Rest"
            value={exercise.rest}
            onChange={(newValue) => {
              updateModalBlockExerciseField('rest', newValue, exerciseIndex);
            }}
          />
        </Col>
        <Col xs="auto">
          <Button
            size="small"
            type="text"
            onClick={() => removeModalBlockExercise(exerciseIndex)}
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