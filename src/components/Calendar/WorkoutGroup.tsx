import React, { CSSProperties, useMemo } from 'react';
import { Button, Col, Form, Input, Row, theme } from 'antd';
import { CloseOutlined, CopyOutlined, MenuOutlined } from '@ant-design/icons';
import WorkoutBlock from '@/components/Calendar/WorkoutBlock';
import { useSortable } from '@dnd-kit/sortable';

interface WorkoutGroupProps {
  group: any;
  remove: (index: number | number[]) => void;
  id: string;
}

const WorkoutGroup: React.FC<WorkoutGroupProps> = ({ group, remove, id }) => {
  const {
    token: {
      borderRadiusLG,
      colorPrimaryBorder,
      colorPrimaryBg,
    },
  } = theme.useToken();

  const [form] = Form.useForm();

  // styles
  const stylesWorkoutGroup: React.CSSProperties = {
    padding: '12px',
    borderLeft: `3px solid ${colorPrimaryBorder}`,
    background: colorPrimaryBg,
    borderRadius: borderRadiusLG,
  };

  return (
    <Col xs={24} key={group.key} style={stylesWorkoutGroup}>
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
                <Button size="small" type="text" onClick={() => remove(group.key)}>
                  <CloseOutlined/>
                </Button>
              </Col>
            </Row>
          </Row>
        </Col>
        <Col xs={24}>
          <Form.Item name={[group.name, 'title']} style={{ marginBottom: 0 }}>
            <Input placeholder="Group Title"/>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.List name={[group.name, 'blocks']}>
            {(blocks, { add, remove }) => (
              <Row gutter={[0, 20]}>
                {blocks.map((block: any, index: number) => (
                  // workout block
                  <WorkoutBlock
                    key={index}
                    block={block}
                    remove={remove}
                  />
                ))}
                <Col xs={24}>
                  <Button type="dashed" onClick={() => add()} block>
                    +
                  </Button>
                </Col>
              </Row>
            )}
          </Form.List>
        </Col>
      </Row>
    </Col>
  );
};

export default WorkoutGroup;