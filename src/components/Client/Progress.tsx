import React from 'react';
import { Carousel, Col, Row, theme } from 'antd';

const Progress: React.FC = () => {
  const {
    token: {
      colorPrimaryBg,
    },
  } = theme.useToken();

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  const contentStyle: React.CSSProperties = {
    height: '480px',
    color: '#fff',
    lineHeight: '480px',
    textAlign: 'center',
    background: colorPrimaryBg,
  };

  return (
    <Row>
      <Col lg={24}>
        <Carousel slidesPerRow={2} afterChange={onChange} autoplay autoplaySpeed={10000}>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
      </Col>
    </Row>
  );
};

export default Progress;