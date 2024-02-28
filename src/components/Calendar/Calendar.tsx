import React, { useEffect, useMemo, useState } from 'react';
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
        date: '22-02-2024',
        video: 'https://...',
        groups: [{
          title: 'Hello, world!',
          blocks: [{
            title: 'Good bye!',
          }],
        }],
      },
    ],
  });

  const data = useMemo(() => {
    const weekData = [];
    const startDate = date.startOf('week');

    for (let i = 0; i < 28; i++) {
      const currentDate = startDate.add(i, 'day').format('DD-MM-YYYY');
      const workout = formData.workouts.find(item => item.date === currentDate);

      if (workout) {
        weekData.push(workout);
      } else {
        weekData.push({ date: currentDate, groups: [] });
      }
    }

    return weekData;
  }, [formData, date]);

  useEffect(() => {
    form.setFieldsValue({ workouts: data });
  }, [data, form]);

  return (
    <Form
      form={form}
      name="programForm"
      autoComplete="off"
      onValuesChange={(changedValues, allValues) => {
        form.setFieldsValue(allValues);
      }}
    >
      <Row gutter={[16, 24]}>
        <Col span={24}
             style={{ padding: '16px 24px', background: colorBgContainer, borderRadius: borderRadiusLG }}>
          <Form.List name="workouts">
            {(workouts) => (
              <Row justify="space-between">
                {workouts.map((workout, index) => {
                  return index % 7 ? (
                    <Workout
                      key={index}
                      date={date.startOf('week').add(index, 'day')}
                      workout={workout}
                      workoutIndex={index}
                    />
                  ) : (
                    <>
                      <Col lg={24} style={{ marginTop: `${index !== 0 ? '56px' : 0}`, marginBottom: '8px' }}>
                        <Typography.Title level={4}>
                          Week #{(index / 7) + 1}
                        </Typography.Title>
                      </Col>
                      <Workout
                        key={index}
                        date={date.startOf('week').add(index, 'day')}
                        workout={workout}
                        workoutIndex={index}
                      />
                    </>
                  )
                })}
              </Row>
            )}
          </Form.List>
        </Col>
      </Row>
    </Form>
  );
};

export default Calendar;
