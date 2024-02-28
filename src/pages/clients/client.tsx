import React from 'react';
import { Button, Col, Row, theme, Typography } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import Head from 'next/head';
import General from '@/components/Client/General';
import History from '@/components/Client/History';
import Progress from '@/components/Client/Progress';
import Measurements from '@/components/Client/Measurements';
import Billing from '@/components/Client/Billing';

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
              <Row gutter={[16, 24]}>
                <Col lg={24}>
                  <div style={{
                    width: '100%',
                    background: colorBgContainer,
                    padding: '24px 36px 36px',
                    borderRadius: borderRadiusLG,
                  }}>
                    <Row gutter={[16, 16]}>
                      <Col xs={24}>
                        <Typography.Title level={3}>
                          General
                        </Typography.Title>
                      </Col>
                      <Col xs={24}>
                        <General/>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col lg={24}>
                  <div style={{
                    width: '100%',
                    background: colorBgContainer,
                    padding: '24px 36px 36px',
                    borderRadius: borderRadiusLG,
                  }}>
                    <Row gutter={[16, 16]}>
                      <Col xs={24}>
                        <Typography.Title level={3}>
                          Progress Images
                        </Typography.Title>
                      </Col>
                      <Col xs={24}>
                        <Progress/>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={12}>
              <Row gutter={[16, 24]}>
                <Col lg={24}>
                  <div style={{
                    width: '100%',
                    background: colorBgContainer,
                    padding: '24px 36px 36px',
                    borderRadius: borderRadiusLG,
                  }}>
                    <Row gutter={[16, 16]}>
                      <Col xs={24}>
                        <Typography.Title level={3}>
                          Workout History
                        </Typography.Title>
                      </Col>
                      <Col xs={24}>
                        <History/>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col lg={24}>
                  <div style={{
                    width: '100%',
                    background: colorBgContainer,
                    padding: '24px 36px 36px',
                    borderRadius: borderRadiusLG,
                  }}>
                    <Row gutter={[16, 16]}>
                      <Col xs={24}>
                        <Typography.Title level={3}>
                          Measurements
                        </Typography.Title>
                      </Col>
                      <Col xs={24}>
                        <Measurements/>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col lg={24}>
                  <div style={{
                    width: '100%',
                    background: colorBgContainer,
                    padding: '24px 36px 36px',
                    borderRadius: borderRadiusLG,
                  }}>
                    <Row gutter={[16, 16]}>
                      <Col xs={24}>
                        <Typography.Title level={3}>
                          Billing
                        </Typography.Title>
                      </Col>
                      <Col xs={24}>
                        <Billing/>
                      </Col>
                    </Row>
                  </div>
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