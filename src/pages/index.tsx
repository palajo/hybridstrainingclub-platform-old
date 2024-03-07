import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import Calendar from '@/components/Calendar/Calendar';
import { Button, Col, Row, Select, theme, Typography } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const Homepage: React.FC = () => {
  const {
    token: {
      colorBgContainer,
      borderRadiusLG,
      colorBorder,
    },
  } = theme.useToken();

  // date
  const [date, setDate] = useState(dayjs());

  const goToPreviousMonth = () => setDate(date.subtract(4, 'week'));

  const goToNextMonth = () => setDate(date.add(4, 'week'));

  // program
  const [program, setProgram] = useState({
    slug: 'standard-plan',
    title: 'Standard Program',
    workouts: [
      {
        date: '2024-03-05',
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
                    sets: 3,
                    reps: 10,
                    rest: 120,
                  },
                  {
                    title: 'Stretching',
                    category: 'Stretching',
                    video: 'https://...',
                    sets: 3,
                    reps: 10,
                    rest: 120,
                  },
                  {
                    title: 'Stretching',
                    category: 'Stretching',
                    video: 'https://...',
                    sets: 3,
                    reps: 10,
                    rest: 120,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

  return (
    <>
      <Head>
        <title>Program Builder – HTC Platform</title>
      </Head>
      <Row gutter={[24, 16]}>
        <Col span={24}>
          <Row justify="space-between" align="middle">
            <Col>
              <Row align="middle" gutter={[24, 16]}>
                <Col>
                  <Row gutter={[8, 8]}>
                    <Col>
                      <Col>
                        <Button onClick={goToPreviousMonth}><ArrowLeftOutlined/></Button>
                      </Col>
                    </Col>
                    <Col>
                      <Button onClick={goToNextMonth}><ArrowRightOutlined/></Button>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Typography.Title level={3} style={{ marginBottom: 0 }}>
                    {date.startOf('week').format('MMM DD')} - {date.add(3, 'week').endOf('week').format('MMM DD')}
                  </Typography.Title>
                </Col>
              </Row>
              <Col>
              </Col>
            </Col>
            <Col>
              <Row gutter={[12, 12]}>
                <Col>
                  <Select
                    defaultValue="program-1"
                    style={{ width: 240 }}
                    options={[
                      { value: 'program-1', label: 'Program #1' },
                      { value: 'program-2', label: 'Program #2' },
                      { value: 'program-3', label: 'Program #3' },
                      { value: 'program-4', label: 'Program #4', disabled: true },
                    ]}
                  />
                </Col>
                <Col>
                  <Button type="dashed" danger icon={<DeleteOutlined/>} onClick={() => alert('Delete program')}/>
                </Col>
                <Col>
                  <Button type="primary" icon={<SaveOutlined/>}>Save</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}
             style={{ padding: '16px 24px', background: colorBgContainer, borderRadius: borderRadiusLG }}>
          <Calendar data={program.workouts} date={date}/>
        </Col>
      </Row>
    </>
  );
};

export default Homepage;
