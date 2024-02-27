import React, { useState } from 'react';
import Head from 'next/head';
import { Button, Col, Form, Input, Row, theme, Typography } from 'antd';
import { DeleteOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import GroupBlock from '@/components/Group/GroupBlock';
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

const { Title } = Typography;

const Group: React.FC = () => {
  const {
    token: {
      borderRadiusLG,
      colorPrimaryBorder,
      colorPrimaryBorderHover,
      colorBgContainer,
      colorPrimaryBg,
    },
  } = theme.useToken();

  const [form] = Form.useForm();

  const [data, setData] = useState({
    title: 'Hello, world!',
    blocks: [
      {
        title: 'Good bye!',
      }, {
        title: 'Good bye!',
      }, {
        title: 'Good bye!',
      }, {
        title: 'Good bye!',
      },
    ],
  });

  const stylesWorkoutGroup: React.CSSProperties = {
    padding: '24px 16px',
    borderLeft: `3px solid ${colorPrimaryBorder}`,
    background: colorPrimaryBg,
    borderRadius: borderRadiusLG,
  };

  const [activeId, setActiveId] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  return (
    <>
      <Head>
        <title>Warm up – #Group – HTC Platform</title>
      </Head>
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <Row justify="space-between" align="middle">
            <Col>
              <Row align="middle" gutter={[16, 16]}>
                <Col>
                  <Title level={2} style={{ marginBottom: 0 }}>
                    {data.title}
                  </Title>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row gutter={[12, 12]}>
                <Col>
                  <Button type="dashed" danger icon={<DeleteOutlined/>}>Delete</Button>
                </Col>
                <Col>
                  <Button type="primary" icon={<SaveOutlined/>}>Save</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col
          span={24}
          style={stylesWorkoutGroup}
        >
          <Form
            form={form}
            name="programForm"
            autoComplete="off"
            initialValues={data}
            onValuesChange={(changedValues, allValues) => {
              setData(allValues);
            }}
          >
            <Row>
              <Col lg={24}>
                <Form.Item name="title">
                  <Input placeholder="Group Title"/>
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.List name="blocks">
                  {(blocks, { add, remove, move }) => (
                    <Row gutter={[16, 16]}>
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={(event) => setActiveId(event.active.id)}
                        onDragEnd={(event) => {
                          const { active, over } = event;
                          const { id } = active;
                          const { id: overId } = over || { id: null };

                          move(id, overId);
                        }}
                        modifiers={[restrictToVerticalAxis]}
                      >
                        <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
                          {blocks.map((block: any, blockIndex) => (
                            <GroupBlock
                              key={block.name}
                              block={block}
                              remove={remove}
                              blockIndex={blockIndex}
                            />
                          ))}
                        </SortableContext>
                      </DndContext>
                      <Col lg={24}>
                        <Button type="dashed" block onClick={() => add()} icon={<PlusOutlined/>}>Add Block</Button>
                      </Col>
                    </Row>
                  )}
                </Form.List>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Group;
