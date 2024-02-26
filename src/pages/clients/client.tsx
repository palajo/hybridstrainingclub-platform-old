import React from 'react';
import { Button, Col, Row, Space, theme, Typography } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import Head from 'next/head';

const { Title } = Typography;

const Client: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Head>
        <title>Quentin Randis – #Client – HTC Platform</title>
      </Head>
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={2} style={{ marginBottom: 0 }}>
                Quentin Randis
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
        <Col span={24}>
          <Row gutter={[24, 24]}>
            <Col lg={12}>
              <Space style={{
                width: '100%',
                background: colorBgContainer,
                padding: '24px 36px',
                borderRadius: borderRadiusLG,
              }}>
                <Typography.Title level={4}>
                  General
                </Typography.Title>
              </Space>
            </Col>
            <Col lg={12}>
              <Row gutter={[16, 24]}>
                <Col lg={24}>
                  <Space style={{
                    width: '100%',
                    background: colorBgContainer,
                    padding: '24px 36px',
                    borderRadius: borderRadiusLG,
                  }}>
                    <Typography.Title level={4}>
                      History
                    </Typography.Title>
                  </Space>
                </Col>
                <Col lg={24}>
                  <Space style={{
                    width: '100%',
                    background: colorBgContainer,
                    padding: '24px 36px',
                    borderRadius: borderRadiusLG,
                  }}>
                    <Typography.Title level={4}>
                      Images
                    </Typography.Title>
                  </Space>
                </Col>
                <Col lg={24}>
                  <Space style={{
                    width: '100%',
                    background: colorBgContainer,
                    padding: '24px 36px',
                    borderRadius: borderRadiusLG,
                  }}>
                    <Typography.Title level={4}>
                      Measurements
                    </Typography.Title>
                  </Space>
                </Col>
                <Col lg={24}>
                  <Space style={{
                    width: '100%',
                    background: colorBgContainer,
                    padding: '24px 36px',
                    borderRadius: borderRadiusLG,
                  }}>
                    <Typography.Title level={4}>
                      Billing
                    </Typography.Title>
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Client;