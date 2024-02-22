import React, { useState } from 'react';
import { Button, Col, Form, Row, theme, Typography } from 'antd';
import dayjs from 'dayjs';

import Calendar from '@/components/Calendar/Calendar';

const Homepage: React.FC = () => {
  const [date, setDate] = useState(dayjs());

  const goToPreviousWeek = () => setDate(date.subtract(1, 'week'));

  const goToNextWeek = () => setDate(date.add(1, 'week'));

  return (
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
    </Row>
  );
};

export default Homepage;
