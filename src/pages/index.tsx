import React, { useState } from 'react';
import { Button, Col, Row, Select, Typography } from 'antd';
import dayjs from 'dayjs';

import Calendar from '@/components/Calendar/Calendar';
import Head from 'next/head';
import { ArrowLeftOutlined, ArrowRightOutlined, DeleteOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';

const Homepage: React.FC = () => {
  const [date, setDate] = useState(dayjs());

  const goToPreviousWeek = () => setDate(date.subtract(1, 'week'));

  const goToNextWeek = () => setDate(date.add(1, 'week'));

  const [program, setProgram] = useState({
    value: 'program-1',
    title: 'Program #1'
  });

  console.log(program);

  return (
    <>
      <Head>
        <title>Program Builder – HTC Platform</title>
      </Head>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row justify="space-between" align="middle">
            <Col>
              <Row align="middle" gutter={[24, 16]}>
                <Col>
                  <Row gutter={[8, 8]}>
                    <Col>
                      <Col>
                        <Button onClick={goToPreviousWeek}><ArrowLeftOutlined/></Button>
                      </Col>
                    </Col>
                    <Col>
                      <Button onClick={goToNextWeek}><ArrowRightOutlined/></Button>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Typography.Title level={3} style={{ marginBottom: 0}}>
                    {date.startOf('week').format('MMM DD')} - {date.endOf('week').format('MMM DD')}
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
                    defaultValue={program}
                    style={{ width: 240 }}
                    onChange={setProgram}
                    options={[
                      { value: 'program-1', label: 'Program #1' },
                      { value: 'program-2', label: 'Program #2' },
                      { value: 'program-3', label: 'Program #3' },
                      { value: 'program-4', label: 'Program #4', disabled: true },
                    ]}
                  />
                </Col>
                <Col>
                  <Button type="dashed" danger icon={<DeleteOutlined/>}  onClick={() => alert('Delete program')}/>
                </Col>
                <Col>
                  <Button type="primary" icon={<SaveOutlined/>}>Save</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col lg={24}>
          <Row justify="space-between" align="middle" gutter={[12, 16]}>
          </Row>
        </Col>
        <Col lg={24}>
          <Calendar date={date}/>
        </Col>
      </Row>
    </>
  );
};

export default Homepage;
