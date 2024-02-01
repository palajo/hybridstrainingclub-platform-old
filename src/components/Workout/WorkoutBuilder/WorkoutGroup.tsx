import React from 'react';
import { Col, Collapse, Form, Input, Space, theme } from 'antd';
import { generate } from '@ant-design/colors';

import WorkoutBlock from '@/components/Workout/WorkoutBuilder/WorkoutBlock';

const WorkoutGroup: React.FC = () => {
  const {
    token: { colorPrimary, colorPrimaryBg, borderRadiusLG, paddingLG },
  } = theme.useToken();

  return (
    <Col span={24}>
      <Collapse
        collapsible="header"
        defaultActiveKey={['1']}
      >
        <Collapse.Panel key="key-1" header="Warm up">
          <Space
            direction="vertical"
            size="middle"
            style={{
              padding: paddingLG,
              background: colorPrimaryBg,
              borderRadius: borderRadiusLG,
              borderLeft: '3px solid',
              borderColor: generate(colorPrimary)[7],
              width: '100%'
            }}
          >
            <Form.Item label="Group Title" name={['group', 'title']}><Input placeholder="Warm up"/></Form.Item>
            <WorkoutBlock/>
          </Space>
        </Collapse.Panel>
        <Collapse.Panel key="key-2" header="Warm up">
          <Space
            direction="vertical"
            size="middle"
            style={{
              padding: paddingLG,
              background: colorPrimaryBg,
              borderRadius: borderRadiusLG,
              borderLeft: '3px solid',
              borderColor: generate(colorPrimary)[7],
              width: '100%'
            }}
          >
            <Form.Item label="Group Title" name={['group', 'title']}><Input placeholder="Warm up"/></Form.Item>
            <WorkoutBlock/>
          </Space>
        </Collapse.Panel>
        <Collapse.Panel key="key-3" header="Warm up">
          <Space
            direction="vertical"
            size="middle"
            style={{
              padding: paddingLG,
              background: colorPrimaryBg,
              borderRadius: borderRadiusLG,
              borderLeft: '3px solid',
              borderColor: generate(colorPrimary)[7],
              width: '100%'
            }}
          >
            <Form.Item label="Group Title" name={['group', 'title']}><Input placeholder="Warm up"/></Form.Item>
            <WorkoutBlock/>
          </Space>
        </Collapse.Panel>
      </Collapse>
    </Col>
  );
};

export default WorkoutGroup;
