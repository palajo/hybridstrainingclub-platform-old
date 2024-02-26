import React, { useState } from 'react';
import { Button, Col, Row, Typography } from 'antd';
import dayjs from 'dayjs';

import Calendar from '@/components/Calendar/Calendar';
import Head from 'next/head';

const Homepage: React.FC = () => {
  const [date, setDate] = useState(dayjs());

  const goToPreviousWeek = () => setDate(date.subtract(1, 'week'));

  const goToNextWeek = () => setDate(date.add(1, 'week'));

  return (
    <>
      <Head>
        <title>Program Builder – HTC Platform</title>
      </Head>
      <Row gutter={[24, 24]}>
        <Col lg={24}>
          <Row justify="space-between" align="middle" gutter={[12, 16]}>
            <Col>
              <Button onClick={goToPreviousWeek}>Previous Week</Button>
            </Col>
            <Col>
              <Typography.Title level={3}>
                {date.startOf('week').format('MMMM D, YYYY')} - {date.endOf('week').format('MMMM D, YYYY')}
              </Typography.Title>
            </Col>
            <Col>
              <Button onClick={goToNextWeek}>Next Week</Button>
            </Col>
          </Row>
        </Col>
        <Col lg={24}>
          <Calendar date={date}/>
        </Col>
        <Col lg={24}>
          <Row justify="space-between" align="middle">
            <Col>
              <Button type="dashed" onClick={() => alert('Select program')}>
                Select program
              </Button>
            </Col>
            <Col>
              <Row justify="end" align="middle" gutter={[12, 16]}>
                <Col>
                  <Button type="dashed" danger onClick={() => alert('Delete program')}>
                    Delete
                  </Button>
                </Col>
                <Col>
                  <Button type="primary" onClick={() => alert('Save program')}>
                    Save
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Homepage;
