import React, { useContext, useState } from 'react';
import { Button, Col, Input, Row, theme, Typography } from 'antd';
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { closestCenter, DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { CloseOutlined, CopyOutlined, MenuOutlined } from '@ant-design/icons';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { CalendarContext } from '@/components/Calendar/Calendar';
import Block from '@/components/Calendar/Block';

const Group: React.FC<{ group: any; groupIndex: number; workoutDate: string }> = ({
  group,
  groupIndex,
  workoutDate,
}) => {
  const {
    token: {
      borderRadiusLG,
      colorPrimaryBorder,
      colorPrimaryBg,
    },
  } = theme.useToken();

  const { updateGroupField, addWorkoutGroupBlock, removeWorkoutGroup, moveGroupBlock, duplicateGroup } = useContext(CalendarContext);

  const {
    listeners,
    attributes,
    setNodeRef,
    setActivatorNodeRef,
    transition,
    transform,
    isDragging,
  } = useSortable({
    id: groupIndex,
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div style={stylesWorkoutGroup} ref={setNodeRef} {...attributes}>
      <Row gutter={[0, 16]}>
        <Col xs={24}>
          <Row align="middle" justify="space-between">
            <Col>
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
            <Col>
              <Row>
                <Col>
                  <Button size="small" type="text" onClick={() => duplicateGroup(workoutDate, groupIndex)}>
                    <CopyOutlined/>
                  </Button>
                </Col>
                <Col>
                  <Button size="small" type="text" onClick={() => removeWorkoutGroup(workoutDate, groupIndex)}>
                    <CloseOutlined/>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Input
            value={group.title}
            onChange={(e) => {
              updateGroupField('title', e.target.value, workoutDate, groupIndex);
            }}
            placeholder="Group Title"
          />
        </Col>
        {group.blocks && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={(event) => setActiveIndex(event.active.id)}
            onDragEnd={(event) => {
              const { active, over } = event;
              const { id } = active;
              const { id: overId } = over || { id: null };

              moveGroupBlock(workoutDate, groupIndex, id, overId)
            }}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext items={group.blocks} strategy={verticalListSortingStrategy}>
              {group.blocks?.map((block: any, index: number) => (
                <Col xs={24} key={index}>
                  <Block key={index} block={block} workoutDate={workoutDate}
                         groupIndex={groupIndex} blockIndex={index}/>
                </Col>
              ))}
            </SortableContext>
            <DragOverlay>
              {activeIndex && (
                <Typography>
                  <Block block={group.blocks[activeIndex]} groupIndex={groupIndex} blockIndex={activeIndex}
                         workoutDate={workoutDate}/>
                </Typography>
              )}
            </DragOverlay>
          </DndContext>
        )}
        <Col xs={24}>
          <Button type="dashed" onClick={() => addWorkoutGroupBlock(workoutDate, groupIndex)} block>
            +
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Group;