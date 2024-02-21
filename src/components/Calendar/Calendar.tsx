import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Button, Col, Row, theme, Typography } from 'antd';

import Container from '@/components/Calendar/Container';

interface Exercise {
  title: string;
  category: string;
  video: string;
  sets: string;
  reps: string;
  rest: string;
}

interface Block {
  title: string;
  notes: string;
  exercises: Exercise[];
}

interface Group {
  title: string;
  blocks: Block[];
}

interface Item {
  date: string;
  video: string;
  groups: Group[];
}

export default function Calendar() {
  const { token: { colorBorder, paddingXS } } = theme.useToken();

  const [items, setItems] = useState<Item[]>([
    {
      date: '15-02-2024',
      video: 'https://...',
      groups: [
        {
          title: 'Warm up',
          blocks: [
            {
              title: 'Round 1',
              notes: 'Keep it simple',
              exercises: [
                {
                  title: 'Stretching',
                  category: 'Stretching',
                  video: 'https://...',
                  sets: '3',
                  reps: '10',
                  rest: '120',
                },
                {
                  title: 'Stretching',
                  category: 'Stretching',
                  video: 'https://...',
                  sets: '3',
                  reps: '10',
                  rest: '120',
                },
              ],
            },
            {
              title: 'Round 2',
              notes: 'Keep it simple',
              exercises: [
                {
                  title: 'Stretching',
                  category: 'Stretching',
                  video: 'https://...',
                  sets: '3',
                  reps: '10',
                  rest: '120',
                },
                {
                  title: 'Stretching',
                  category: 'Stretching',
                  video: 'https://...',
                  sets: '3',
                  reps: '10',
                  rest: '120',
                },
              ],
            },
          ],
        },
        {
          title: 'Warm up',
          blocks: [
            {
              title: 'Round 1',
              notes: 'Keep it simple',
              exercises: [
                {
                  title: 'Stretching',
                  category: 'Stretching',
                  video: 'https://...',
                  sets: '3',
                  reps: '10',
                  rest: '120',
                },
                {
                  title: 'Stretching',
                  category: 'Stretching',
                  video: 'https://...',
                  sets: '3',
                  reps: '10',
                  rest: '120',
                },
              ],
            },
            {
              title: 'Round 2',
              notes: 'Keep it simple',
              exercises: [
                {
                  title: 'Stretching',
                  category: 'Stretching',
                  video: 'https://...',
                  sets: '3',
                  reps: '10',
                  rest: '120',
                },
                {
                  title: 'Stretching',
                  category: 'Stretching',
                  video: 'https://...',
                  sets: '3',
                  reps: '10',
                  rest: '120',
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  const [currentDate, setCurrentDate] = useState(dayjs());

  const goToPreviousWeek = () => setCurrentDate(currentDate.subtract(1, 'week'));
  const goToNextWeek = () => setCurrentDate(currentDate.add(1, 'week'));

  return (
    <Row gutter={[24, 24]}>
      <Col lg={24}>
        <Row justify="space-between" align="middle" gutter={[12, 16]}>
          <Col>
            <Button onClick={goToPreviousWeek}>Previous Week</Button>
          </Col>
          <Col>
            <Typography.Title level={3}>
              {currentDate.startOf('week').format('MMMM D, YYYY')} - {currentDate.endOf('week').format('MMMM D, YYYY')}
            </Typography.Title>
          </Col>
          <Col>
            <Button onClick={goToNextWeek}>Next Week</Button>
          </Col>
        </Row>
      </Col>
      <Col lg={24}>
        <Row justify="space-between">
          {[...Array(7)].map((_, index) => (
            <Col
              key={currentDate.startOf('week').add(index, 'day').format('dddd')}
              style={{
                width: 'calc(100% / 7)',
                border: `1px solid ${colorBorder}`,
                borderLeft: `${index !== 0 && '0'}`,
              }}
            >
              <Row>
                <Col xs={24} style={{ borderBottom: `1px solid ${colorBorder}`, padding: paddingXS }}>
                  <Typography.Title level={5} style={{ textAlign: 'center', marginBottom: '0' }}>
                    {currentDate.startOf('week').add(index, 'day').format('dddd')}
                  </Typography.Title>
                  <Typography style={{ textAlign: 'center' }}>
                    {currentDate.startOf('week').add(index, 'day').format('YYYY-MM-DD')}
                  </Typography>
                </Col>
                <Col xs={24}>
                  {items
                    .filter((item) => item.date === currentDate.startOf('week').add(index, 'day').format('DD-MM-YYYY'))
                    .map((item) => (
                      <Container
                        id={currentDate.startOf('week').add(index, 'day').format('dddd')}
                        items={item.groups}
                      />
                    ))
                  }
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}
