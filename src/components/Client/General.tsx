import React from 'react';
import { Avatar, Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import { SaveOutlined, UserOutlined } from '@ant-design/icons';

type FieldType = {
  name?: string;
  phone?: string;
  email?: string;
  subscription?: string;
  gender?: string;
  program?: string;
  notes?: string;
};

const General: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row gutter={[24, 24]}>
      <Col lg={24}>
        <Row gutter={[24, 16]} align="middle">
          <Col>
            <Avatar size={84} icon={<UserOutlined/>}/>
          </Col>
          <Col>
            <Typography.Title level={4} style={{ marginBottom: '4px' }}>
              Quentin Randis
            </Typography.Title>
            <Typography>
              Plan: Demo Subscription
            </Typography>
          </Col>
        </Row>
      </Col>
      <Col lg={24}>
        <Form
          name="userGeneral"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          style={{ width: '100%' }}
        >
          <Row gutter={[24, 0]}>
            <Col lg={12}>
              <Form.Item<FieldType>
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Name is required.' }]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item<FieldType>
                label="Gender"
                name="gender"
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Email is required.' }]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item<FieldType>
                label="Phone"
                name="phone"
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item<FieldType>
                label="Subscription"
                name="subscription"
                rules={[{ required: true, message: 'Subscription is required.' }]}
              >
                <Select defaultValue="demo">
                  <Select.Option value="demo">Demo Subscription</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item<FieldType>
                label="Program"
                name="program"
                rules={[{ required: true, message: 'Program is required.' }]}
              >
                <Select defaultValue="program-1">
                  <Select.Option value="program-1">Program #1</Select.Option>
                  <Select.Option value="program-2">Program #1</Select.Option>
                  <Select.Option value="program-3">Program #1</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col lg={24}>
              <Form.Item<FieldType>
                label="Notes"
                name="notes"
              >
                <Input.TextArea/>
              </Form.Item>
            </Col>
            <Col lg={24}>
              <Button type="dashed" icon={<SaveOutlined/>} block>Save</Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default General;