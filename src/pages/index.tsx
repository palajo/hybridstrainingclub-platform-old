import React from 'react';
import { Button, Col, Row, Select, theme, Typography } from 'antd';
import Calendar from '@/components/Calendar/Calendar';
import { CheckOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Homepage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ marginBottom: 0 }}>
              Calendar
            </Title>
          </Col>
          <Col>
            <Row gutter={[12, 0]}>
              <Col>
                <Select
                  defaultValue="program-1"
                  style={{ width: 240 }}
                  onChange={handleSelectChange}
                  options={[
                    { value: 'program-1', label: 'Program #1' },
                    { value: 'program-2', label: 'Program #2' },
                    { value: 'program-3', label: 'Program #3' },
                  ]}
                />
              </Col>
              <Col>
                <Col>
                  <Button type="primary" icon={<CheckOutlined/>}>Save</Button>
                </Col>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24} style={{ padding: '16px 24px', background: colorBgContainer, borderRadius: borderRadiusLG }}>
        <Calendar/>
      </Col>
    </Row>
  );
};

export default Homepage;