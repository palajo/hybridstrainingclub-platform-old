import React from 'react';
import { Button, Col, Form, Input, Row, theme } from 'antd';
import { Dayjs } from 'dayjs';

import WorkoutGroup from './WorkoutGroup';
import WorkoutDate from './WorkoutDate';

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

  return (
    <Col style={stylesWorkout}>
      <Row>
        <WorkoutDate date={date}/>
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
                    remove={remove}
                    workoutIndex={workoutIndex}
                    groupIndex={index}
                  />
                ))}
                <Col xs={24}>
                  <Button type="dashed" onClick={() => add()} block>
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