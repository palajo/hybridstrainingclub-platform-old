import React, { useContext } from 'react';
import { Button, Col, Row, theme, Typography } from 'antd';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CloseOutlined, EditOutlined, MenuOutlined } from '@ant-design/icons';
import { CalendarContext } from '@/components/Calendar/Calendar';

const Block: React.FC<{ block: any; groupIndex: number; blockIndex: number; workoutDate: string }> = ({
  block,
  groupIndex,
  blockIndex,
  workoutDate,
}) => {
  const {
    token: {
      colorBgContainer,
      borderRadiusLG,
      colorPrimaryBorderHover,
    },
  } = theme.useToken();

  const { removeWorkoutGroupBlock, EditBlock } = useContext(CalendarContext);

  const {
    listeners,
    attributes,
    setNodeRef,
    setActivatorNodeRef,
    transition,
    transform,
    isDragging,
  } = useSortable({
    id: blockIndex,
  });

  const stylesWorkoutBlock: React.CSSProperties = {
    padding: '12px',
    borderLeft: `3px solid ${colorPrimaryBorderHover}`,
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.35 : 1,
  };

  return (
    <div style={stylesWorkoutBlock} ref={setNodeRef} {...attributes}>
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
                  <Button size="small" type="text" onClick={() => EditBlock(block, groupIndex, blockIndex, workoutDate)}>
                    <EditOutlined/>
                  </Button>
                </Col>
                <Col>
                  <Button size="small" type="text"
                          onClick={() => removeWorkoutGroupBlock(workoutDate, groupIndex, blockIndex)}>
                    <CloseOutlined/>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Typography.Title level={5} style={{ marginBottom: '6px' }}>
            {block.title}
          </Typography.Title>
          {block.exercises?.map((exercise: any, index: number) => (
            <Typography key={index}>
              {exercise.title}
            </Typography>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default Block;