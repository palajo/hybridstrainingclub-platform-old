import React from 'react';
import { Button, Col, Row, theme, Typography } from 'antd';
import ModalBlock from '@/components/Calendar/ModalBlock';
import { generate } from '@ant-design/colors';
import { CloseOutlined, CopyOutlined, MenuOutlined } from '@ant-design/icons';

interface SortableItemProps {
  id: string;
}

function Block({ id }: SortableItemProps) {
  const {
    token: { colorPrimary, borderRadiusLG, colorBgContainer },
  } = theme.useToken();

  const style: React.CSSProperties = {
    padding: '12px',
    marginBottom: '12px',
    borderLeft: `3px solid ${generate(colorPrimary)[4]}`,
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
  };

  return (
    <Row gutter={[0, 12]} style={style}>
      <Col xs={24}>
        <Row align="middle" justify="space-between">
          <Col>
            <Button size="small" type="text" style={{ touchAction: 'none', cursor: 'move' }}>
              <MenuOutlined/>
            </Button>
          </Col>
          <Row>
            <Col>
              <Button size="small" type="text">
                <CopyOutlined/>
              </Button>
            </Col>
            <Col>
              <Button size="small" type="text">
                <CloseOutlined/>
              </Button>
            </Col>
          </Row>
        </Row>
      </Col>
      <Col xs={24}>
        <Typography.Title level={5}>
          {data.title}
        </Typography.Title>
        {data.exercises.map((exercise, exerciseIndex) => (
          <Typography key={exerciseIndex}>
            {exercise.title}, {exercise.sets} sets x {exercise.reps}, {exercise.rest}s
          </Typography>
        ))}
        <Typography>
          {data.notes}
        </Typography>
      </Col>
      <Col xs={24}>
        <ModalBlock/>
      </Col>
    </Row>
  );
}

export default Block;