import React, { useState } from 'react';
import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Form,
  FormInstance,
  Input,
  Row,
  Tag,
  theme,
  Typography,
} from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import WorkoutMenu from '@/components/Workout/WorkoutMenu';
import WorkoutGroup from '@/components/Workout/WorkoutBuilder/WorkoutGroup';

const { Title } = Typography;

const ProgramContext = React.createContext<FormInstance<any> | null>(null);

const Program: React.FC = () => {
  const [form] = Form.useForm();

  const {
    token: { colorBgContainer, colorBorder, borderRadiusLG, colorBgLayout },
  } = theme.useToken();

  // date picker
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  // disable edit
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);


  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ marginBottom: 0 }}>
              Program Title
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
          <Col span={4} style={{ padding: '16px 0', borderRight: `1px solid ${colorBorder}` }}>
            <WorkoutMenu/>
          </Col>
          <Col span={20} style={{ padding: '24px 36px' }}>
            <Row gutter={[16, 24]}>
              <Col span={24}>
                <Row align="middle" gutter={[8, 12]}>
                  <Col>
                    <Tag color="green">Week #1</Tag>
                  </Col>
                  <Col>
                    <Title level={4} style={{ marginBottom: 0 }}>
                      Day #1 - Legs
                    </Title>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Form
                  form={form}
                  layout="vertical"
                  disabled={componentDisabled}
                >
                  <Row gutter={[16, 0]}>
                    <Col span={12}>
                      <Form.Item label="Workout Date">
                        <DatePicker onChange={onChange} style={{ width: '100%' }}/>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Video"
                        name="InputNumber"
                      >
                        <Input placeholder="Vimeo link"/>
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Row gutter={[16, 32]}>
                        <WorkoutGroup/>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Program;
