import React, { useState } from 'react';
import { Col, Form, Row, theme, Typography } from 'antd';
import { Dayjs } from 'dayjs';

import Workout from '@/components/Calendar/Workout';

interface CalendarProps {
  date: Dayjs;
}

const Calendar: React.FC<CalendarProps> = ({ date }) => {
  const {
    token: {
      colorBgContainer,
      borderRadiusLG,
    },
  } = theme.useToken();

  const [form] = Form.useForm();

  const [formData, setFormData] = useState({
    workouts: [
      {
        date: '18-02-2024',
        groups: [],
      },
      {
        date: '19-02-2024',
        groups: [],
      },
      {
        date: '20-02-2024',
        groups: [],
      },
      {
        date: '21-02-2024',
        groups: [],
      },
      {
        date: '22-02-2024',
        video: 'https://...',
        groups: [{
          title: 'Hello, world!',
          blocks: [{
            title: 'Good bye!',
          }],
        }],
      },
      {
        date: '23-02-2024',
        groups: [],
      },
      {
        date: '24-02-2024',
        groups: [],
      },
    ],
  });

  return (
    <Form
      form={form}
      name="programForm"
      autoComplete="off"
      initialValues={formData}
      onValuesChange={(changedValues, allValues) => {
        setFormData(allValues);
      }}
    >
      <Row gutter={[16, 24]}>
        <Col span={24}
             style={{ padding: '16px 24px', background: colorBgContainer, borderRadius: borderRadiusLG }}>
          <Form.List name="workouts">
            {(workouts) => (
              <Row justify="space-between">
                {workouts.map((workout, index) => (
                  <Workout
                    key={index}
                    date={date.startOf('week').add(index, 'day')}
                    workout={workout}
                    workoutIndex={index}
                  />
                ))}
              </Row>
            )}
          </Form.List>
          <Form.Item noStyle shouldUpdate>
            {() => (
              <Typography>
                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
              </Typography>
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default Calendar;