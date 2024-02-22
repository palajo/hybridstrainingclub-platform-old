import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, theme } from 'antd';
import { CloseOutlined, CopyOutlined, MenuOutlined } from '@ant-design/icons';
import { Active, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';

import WorkoutBlock from '@/components/Calendar/WorkoutBlock';

interface WorkoutGroupProps {
  group: any;
  remove: (index: number | number[]) => void;
  add: (index: number | number[]) => void;
  workoutIndex: number;
  groupIndex: number;
}

const WorkoutGroup: React.FC<WorkoutGroupProps> = ({ group, add, remove, workoutIndex, groupIndex }) => {
  const { token: { borderRadiusLG, colorPrimaryBorder, colorPrimaryBg } } = theme.useToken();

  const stylesWorkoutGroup: React.CSSProperties = {
    padding: '12px',
    borderLeft: `3px solid ${colorPrimaryBorder}`,
    background: colorPrimaryBg,
    borderRadius: borderRadiusLG,
  };

  const form = Form.useFormInstance();
  const fields = form.getFieldsValue([['workouts', workoutIndex]]).workouts[workoutIndex].groups[groupIndex];


  return (
    <Col xs={24} key={group.key} style={stylesWorkoutGroup}>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Row align="middle" justify="space-between">
            <Col>
              <Button size="small" type="text" style={{ touchAction: 'none', cursor: 'grab' }}>
                <MenuOutlined/>
              </Button>
            </Col>
            <Row>
              <Col>
                <Button size="small" type="text" onClick={() => add(fields)}>
                  <CopyOutlined/>
                </Button>
              </Col>
              <Col>
                <Button size="small" type="text" onClick={() => remove(groupIndex)}>
                  <CloseOutlined/>
                </Button>
              </Col>
            </Row>
          </Row>
        </Col>
        <Col xs={24}>
          <Form.Item name={[group.name, 'title']} style={{ marginBottom: 0 }}>
            <Input placeholder="Group Title"/>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.List name={[group.name, 'blocks']}>
            {(blocks, { add, remove }) => (
              <Row gutter={[0, 20]}>
                {blocks.map((block: any, blockIndex) => (
                  <WorkoutBlock
                    key={block.name}
                    block={block}
                    remove={remove}
                    workoutIndex={workoutIndex}
                    groupIndex={groupIndex}
                    blockIndex={blockIndex}
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

export default WorkoutGroup;
