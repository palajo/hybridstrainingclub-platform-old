import React from 'react';
import { Button, Col, Form, Input, Row, theme, Typography } from 'antd';
import { Dayjs } from 'dayjs';

import WorkoutGroup from './WorkoutGroup';

interface WorkoutProps {
  workout: any;
  date: Dayjs;
  key: number;
  workoutIndex: number;
}

const Workout: React.FC<WorkoutProps> = ({ workout, date, workoutIndex }) => {
  const {
    token: {
      colorBorder,
    },
  } = theme.useToken();

  const stylesWorkout: React.CSSProperties = {
    width: 'calc(100% / 7)',
    border: `1px solid ${colorBorder}`,
    borderRight: 0,
  };

  const stylesWorkoutColumn: React.CSSProperties = {
    padding: '24px 16px',
  };

  const stylesWorkoutDate: React.CSSProperties = {
    padding: '8px 16px',
    borderBottom: `1px solid ${colorBorder}`,
  };

  return (
    <Col style={stylesWorkout}>
      <Row>
        <Col xs={24} style={stylesWorkoutDate}>
          <Typography.Title level={5} style={{ textAlign: 'center', marginBottom: '0' }}>
            {date.format('dddd')}
          </Typography.Title>
          <Typography style={{ textAlign: 'center' }}>
            {date.format('YYYY-MM-DD')}
          </Typography>
        </Col>
        <Col xs={24} style={stylesWorkoutColumn}>
          <Form.Item name={[workout.key, 'video']} initialValue={workout.video}>
            <Input placeholder="Video"/>
          </Form.Item>
          <Form.List name={[workout.name, 'groups']}>
            {(groups, { add, remove }) => (
              <Row gutter={[16, 16]}>
                {groups.map((group: any, index: number) => (
                  <WorkoutGroup
                    key={index}
                    group={group}
                    add={add}
                    remove={remove}
                    workoutIndex={workoutIndex}
                    groupIndex={index}
                  />
                ))}
                <Col xs={24}>
                  <Button type="dashed" onClick={() => add({})} block>
                    +
                  </Button>
                </Col>
              </Row>
            )}
          </Form.List>
        </Col>
      </Row>
    </Col>
  );
};
export default Workout;