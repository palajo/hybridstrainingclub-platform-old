import React from 'react';
import { Button, Col, Form, Row, theme, Typography } from 'antd';
import { CloseOutlined, CopyOutlined, MenuOutlined } from '@ant-design/icons';
import WorkoutBlockModal from '@/components/Calendar/WorkoutBlockModal';

interface WorkoutBlockProps {
  block: any;
  remove: (index: number | number[]) => void;
}

const WorkoutBlock: React.FC<WorkoutBlockProps> = ({ block, remove }) => {
  const {
    token: {
      colorBgContainer,
      borderRadiusLG,
      colorPrimaryBorderHover,
    },
  } = theme.useToken();

  const [form] = Form.useForm();

  const stylesWorkoutBlock: React.CSSProperties = {
    padding: '12px',
    borderLeft: `3px solid ${colorPrimaryBorderHover}`,
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
  };

  return (
    <Col xs={24} style={stylesWorkoutBlock}>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Row align="middle" justify="space-between">
            <Col>
              <Button size="small" type="text" style={{ touchAction: 'none', cursor: 'move' }}>
                <MenuOutlined/>
              </Button>
            </Col>
            <Row>
              <Col>
                <Button size="small" type="text">
                  <CopyOutlined/>
                </Button>
              </Col>
              <Col>
                <Button size="small" type="text" onClick={() => remove(block.key)}>
                  <CloseOutlined/>
                </Button>
              </Col>
            </Row>
          </Row>
        </Col>
        <Col xs={24}>
          <Row gutter={[16, 8]}>
            <Col xs={24}>
              <Typography.Title level={5} style={{ marginBottom: 0 }}>
                {block.name}
              </Typography.Title>
            </Col>
            <Col xs={24}>
              <Typography>
                Push ups, 3x20, 120s
              </Typography>
              <Typography>
                Push ups, 3x20, 120s
              </Typography>
              <Typography>
                Push ups, 3x20, 120s
              </Typography>
            </Col>
            <Col>
              <Typography>
                Just do it!
              </Typography>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <WorkoutBlockModal block={block}/>
        </Col>
      </Row>
    </Col>
  );
};

export default WorkoutBlock;