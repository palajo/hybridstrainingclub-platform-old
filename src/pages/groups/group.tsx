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
import WorkoutGroup from '@/components/Workout/WorkoutBuilder/WorkoutGroup';

const { Title } = Typography;

const ProgramContext = React.createContext<FormInstance<any> | null>(null);

const Group: React.FC = () => {
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
            <Row align="middle" gutter={[16, 16]}>
              <Col>
                <Title level={2} style={{ marginBottom: 0 }}>
                  Prebuilt Workout #1
                </Title>
              </Col>
              <Col>
                <Tag color="red">Strength</Tag>
              </Col>
            </Row>
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
           style={{
             background: colorBgContainer,
             borderRadius: borderRadiusLG,
             padding: '24px 36px',
             overflow: 'hidden',
           }}>
        <Row gutter={[16, 24]}>
          <Col span={24}>
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
                  <WorkoutGroup/>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Group;
