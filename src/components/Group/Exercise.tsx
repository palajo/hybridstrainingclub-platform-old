import React, { useContext } from 'react';
import { Button, Col, Input, InputNumber, Row, theme } from 'antd';
import { DeleteOutlined, MenuOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GroupContext } from '../../pages/groups/group';

const Exercise: React.FC<{ exercise: any; exerciseIndex: number; blockIndex: number }> = ({
  exercise,
  exerciseIndex,
  blockIndex,
}) => {
  const {
    token: {
      borderRadiusLG,
      colorPrimaryBorder,
      colorPrimaryBg,
    },
  } = theme.useToken();

  const { updateGroupBlockExerciseField, removeGroupBlockExercise } = useContext(GroupContext);

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
              updateGroupBlockExerciseField('title', e.target.value, blockIndex, exerciseIndex);
            }}
          />
        </Col>
        <Col xs={5}>
          <Input
            size="middle"
            placeholder="Category"
            value={exercise.category}
            onChange={(e) => {
              updateGroupBlockExerciseField('category', e.target.value, blockIndex, exerciseIndex);
            }}
          />
        </Col>
        <Col xs={5}>
          <Input
            size="middle"
            placeholder="Video"
            value={exercise.video}
            onChange={(e) => {
              updateGroupBlockExerciseField('video', e.target.value, blockIndex, exerciseIndex);
            }}
          />
        </Col>
        <Col xs={2}>
          <InputNumber
            size="middle"
            placeholder="Sets"
            value={exercise.sets}
            onChange={(newValue) => {
              updateGroupBlockExerciseField('sets', newValue, blockIndex, exerciseIndex);
            }}
          />
        </Col>
        <Col xs={2}>
          <InputNumber
            size="middle"
            placeholder="Reps"
            value={exercise.reps}
            onChange={(newValue) => {
              updateGroupBlockExerciseField('reps', newValue, blockIndex, exerciseIndex);
            }}
          />
        </Col>
        <Col xs={2}>
          <InputNumber
            size="middle"
            placeholder="Rest"
            value={exercise.rest}
            onChange={(newValue) => {
              updateGroupBlockExerciseField('rest', newValue, blockIndex, exerciseIndex);
            }}
          />
        </Col>
        <Col xs="auto">
          <Button
            size="small"
            type="text"
            onClick={() => removeGroupBlockExercise(blockIndex, exerciseIndex)}
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