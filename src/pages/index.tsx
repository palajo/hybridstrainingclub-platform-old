import React from 'react';
import { Col, Row, Select, theme, Typography } from 'antd';
import WeeklyCalendar from '@/components/Calendar/Calendar';

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
        </Row>
      </Col>
      <Col span={24} style={{ padding: '16px 24px', background: colorBgContainer, borderRadius: borderRadiusLG }}>
        <WeeklyCalendar/>
      </Col>
    </Row>
  );
};

export default Homepage;