import React, { useState } from 'react';
import { Col, Collapse, Form, Input, Row, Space, theme } from 'antd';
import { generate } from '@ant-design/colors';

import WorkoutTable from '@/components/Workout/WorkoutBuilder/WorkoutTable';

const WorkoutBlock: React.FC = () => {
  const [data, setData] = useState([
    {
      key: '1',
      label: 'Round 1',
    },
    {
      key: '2',
      label: 'Round 2',
    },
    {
      key: '3',
      label: 'Round 2',
    },
  ]);

  const {
    token: { colorPrimary, colorBgContainer, borderRadiusLG, paddingLG },
  } = theme.useToken();

  return (
    <Col span={24}>
      <Collapse
        collapsible="header"
        defaultActiveKey={['1']}
      >
        {data.map((item) => (
          <Collapse.Panel key={item.key} header={item.label}>
            <Space
              direction="vertical"
              style={{
                padding: paddingLG,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                borderLeft: '3px solid',
                borderColor: generate(colorPrimary)[5],
                width: '100%',
              }}
            >
              <Row>
                <Col span={24}>
                  <Form.Item
                    label="ModalBlock Title"
                    name={['block', 'title']}
                  >
                    <Input placeholder="1 Round"/>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <WorkoutTable/>
                </Col>
                <Col span={24}>
                  <Form.Item name={['block', 'notes']} label="Notes" style={{ marginBottom: 0 }}>
                    <Input.TextArea size="large"/>
                  </Form.Item>
                </Col>
              </Row>
            </Space>
          </Collapse.Panel>
        ))}
      </Collapse>
    </Col>
  );
};

export default WorkoutBlock;