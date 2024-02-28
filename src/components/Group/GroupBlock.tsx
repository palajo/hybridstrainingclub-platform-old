import React from 'react';
import { Button, Col, Form, Input, Row, theme } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, CloseOutlined } from '@ant-design/icons';
import GroupBlockExercises from '@/components/Group/GroupBlockExercises';

interface WorkoutBlockProps {
  block: any;
  remove: (index: number | number[]) => void;
  move: (from: number, to: number) => void;
  blockIndex: number;
}

const GroupBlock: React.FC<WorkoutBlockProps> = ({ block, remove, blockIndex, move }) => {
  const { token: { colorBgContainer, borderRadiusLG, colorPrimaryBorderHover } } = theme.useToken();

  const stylesWorkoutBlock: React.CSSProperties = {
    padding: '24px 16px',
    borderLeft: `3px solid ${colorPrimaryBorderHover}`,
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
  };

  return (
    <Col xs={24} key={blockIndex}>
      <div style={stylesWorkoutBlock}>
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <Row align="middle" justify="space-between">
              <Col>
                <Row>
                  <Col>
                    <Button
                      size="small"
                      type="text"
                      style={{ touchAction: 'none', cursor: 'pointer' }}
                      onClick={() => move(blockIndex, blockIndex - 1)}
                    >
                      <ArrowUpOutlined/>
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      size="small"
                      type="text"
                      style={{ touchAction: 'none', cursor: 'pointer' }}
                      onClick={() => move(blockIndex, blockIndex + 1)}
                    >
                      <ArrowDownOutlined/>
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Row>
                <Col>
                  <Button size="small" type="text" onClick={() => remove(blockIndex)}>
                    <CloseOutlined/>
                  </Button>
                </Col>
              </Row>
            </Row>
          </Col>
          <Col xs={12}>
            <Form.Item name={[block.name, 'title']} style={{ marginBottom: 0 }}>
              <Input placeholder="Block Title"/>
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item name={[block.name, 'reps']} style={{ marginBottom: 0 }}>
              <Input placeholder="Block Reps"/>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.List name="exercises">
              {(exercises, { add, remove, move }) => (
                <GroupBlockExercises exercises={exercises} add={add} remove={remove} move={move}/>
              )}
            </Form.List>
          </Col>
          <Col xs={24}>
            <Form.Item name={[block.name, 'notes']} style={{ marginBottom: 0 }}>
              <Input.TextArea placeholder="Block Notes"/>
            </Form.Item>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default GroupBlock;