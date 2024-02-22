import { Col, theme, Typography } from 'antd';
import React from 'react';

const WorkoutDate = ({ date }) => {
  const {
    token: {
      colorBorder,
    },
  } = theme.useToken();

  const stylesWorkoutDate: React.CSSProperties = {
    padding: '8px 16px',
    borderBottom: `1px solid ${colorBorder}`,
  };

  return (
    <Col xs={24} style={stylesWorkoutDate}>
      <Typography.Title level={5} style={{ textAlign: 'center', marginBottom: '0' }}>
        {date.format('dddd')}
      </Typography.Title>
      <Typography style={{ textAlign: 'center' }}>
        {date.format('YYYY-MM-DD')}
      </Typography>
    </Col>
  );
};

export default WorkoutDate;