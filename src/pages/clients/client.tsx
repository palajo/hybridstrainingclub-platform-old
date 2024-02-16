import React from 'react';
import { Button, Col, Row, theme, Typography } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
const { Title } = Typography;

import ClientMenu from '@/components/Client/Menu';

const Client: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ marginBottom: 0 }}>
              Client Name
            </Title>
          </Col>
          <Col>
            <Row gutter={[12, 12]}>
              <Col>
                <Button type="primary" danger icon={<MinusOutlined/>}>Delete</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24}
           style={{ background: colorBgContainer, borderRadius: borderRadiusLG, padding: '0', overflow: 'hidden' }}>
        <Row gutter={[0, 8]}>
          <Col span={4}>
            <Title level={5} style={{ marginBottom: 0, padding: '16px 24px' }}>
              Navigation
            </Title>
            <ClientMenu/>
          </Col>
          <Col span={20} style={{ padding: '24px 36px' }}>
            <Typography>
              Hello, world!
            </Typography>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Client;