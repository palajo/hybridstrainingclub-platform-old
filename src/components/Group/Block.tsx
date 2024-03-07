import React, { useContext, useState } from 'react';
import { Button, Col, Input, Row, theme } from 'antd';
import { closestCenter, DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import Exercise from '@/components/Group/Exercise';
import { GroupContext } from '../../pages/groups/group';
import { ArrowDownOutlined, ArrowUpOutlined, CloseOutlined } from '@ant-design/icons';

const Block: React.FC<{ block: any; blockIndex: number; }> = ({
  block,
  blockIndex,
}) => {
  const {
    token: {
      borderRadiusLG,
      colorBgContainer,
      colorPrimaryBorderHover,
    },
  } = theme.useToken();

  const { updateGroupBlockField, moveGroupBlock, moveGroupBlockExercise, addGroupBlockExercise, removeGroupBlock } = useContext(GroupContext);

  const stylesWorkoutBlock: React.CSSProperties = {
    padding: '24px 16px',
    borderLeft: `3px solid ${colorPrimaryBorderHover}`,
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div style={stylesWorkoutBlock}>
      <Row gutter={[16, 24]}>
        <Col xs={24}>
          <Row align="middle" justify="space-between">
            <Col>
              <Row>
                <Col>
                  <Button
                    size="small"
                    type="text"
                    style={{ touchAction: 'none', cursor: 'pointer' }}
                    onClick={() => moveGroupBlock(blockIndex, blockIndex - 1)}
                  >
                    <ArrowUpOutlined/>
                  </Button>
                </Col>
                <Col>
                  <Button
                    size="small"
                    type="text"
                    style={{ touchAction: 'none', cursor: 'pointer' }}
                    onClick={() => moveGroupBlock(blockIndex, blockIndex + 1)}
                  >
                    <ArrowDownOutlined/>
                  </Button>
                </Col>
              </Row>
            </Col>
            <Row>
              <Col>
                <Button size="small" type="text" onClick={() => removeGroupBlock(blockIndex)}>
                  <CloseOutlined/>
                </Button>
              </Col>
            </Row>
          </Row>
        </Col>
        <Col span={12}>
          <Input
            size="middle"
            placeholder="Title"
            value={block.title}
            onChange={(e) => {
              updateGroupBlockField('title', e.target.value, blockIndex);
            }}
          />
        </Col>
        <Col span={12}>
          <Input
            size="middle"
            placeholder="Reps"
            value={block.reps}
            onChange={(e) => {
              updateGroupBlockField('reps', e.target.value, blockIndex);
            }}
          />
        </Col>
        <Col span={24}>
          {block.exercises && (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={(event) => setActiveIndex(event.active.id)}
              onDragEnd={(event) => {
                const { active, over } = event;
                const { id } = active;
                const { id: overId } = over || { id: null };

                moveGroupBlockExercise(blockIndex, id, overId);
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
                      <Exercise
                        exercise={exercise}
                        exerciseIndex={exerciseIndex}
                        blockIndex={blockIndex}
                      />
                    </Col>
                  ))}
                </Row>
              </SortableContext>
              <DragOverlay>
                {activeIndex && (
                  <Exercise
                    exercise={block.exercises[activeIndex]}
                    exerciseIndex={activeIndex}
                    blockIndex={blockIndex}
                  />
                )}
              </DragOverlay>
            </DndContext>
          )}
          <Button type="dashed" onClick={() => addGroupBlockExercise(blockIndex)} block style={{ marginTop: '24px' }}>
            +
          </Button>
        </Col>
        <Col span={24}>
          <Input.TextArea
            size="middle"
            placeholder="Notes"
            value={block.notes}
            onChange={(e) => {
              updateGroupBlockField('notes', e.target.value, blockIndex);
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Block;