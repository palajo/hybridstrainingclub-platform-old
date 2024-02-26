import React from 'react';
import { Button, Col, Row, theme, Typography } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import Head from 'next/head';

const { Title } = Typography;

const Exercise: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Head>
        <title>Deadlift – #Exercise – HTC Platform</title>
      </Head>
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={2} style={{ marginBottom: 0 }}>
                Exercise Title
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
        <Col span={24} style={{ padding: '16px 24px', background: colorBgContainer, borderRadius: borderRadiusLG }}>
          <Typography>
            Hello, world!
          </Typography>
        </Col>
      </Row>
    </>
  );
};

export default Exercise;