import React from 'react';
import { Button, Col, Form, Input, Row, theme, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const Homepage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG, colorPrimaryBorder, colorPrimaryBg }
  } = theme.useToken();

  const [form] = Form.useForm();

  // styles
  const stylesGroup: React.CSSProperties = {
    padding: '12px',
    borderLeft: `3px solid ${colorPrimaryBorder}`,
    background: colorPrimaryBg,
    borderRadius: borderRadiusLG,
  };

  return (
    <Row gutter={[16, 24]}>
      <Col span={24} style={{ padding: '16px 24px', background: colorBgContainer, borderRadius: borderRadiusLG }}>
        <Form
          form={form}
          name="programForm"
          autoComplete="off"
          initialValues={{
            program: [{ groups: [{ blocks: [{}] }] },{ groups: [{ blocks: [{}] }] },{ groups: [{ blocks: [{}] }] },{ groups: [{ blocks: [{}] }] },{ groups: [{ blocks: [{}] }] },{ groups: [{ blocks: [{}] }] },{ groups: [{ blocks: [{}] }] },],
          }}
        >
          <Form.List name="program">
            {(workouts) => (
              <Row gutter={[16, 16]}>
                {workouts.map((workout, workoutIndex) => (
                  <Col xs={3} key={workoutIndex}>
                    <Row gutter={[16, 16]}>
                      <Col xs={24}>
                        <Form.Item name={[workout.name, 'name']} initialValue={`Workout ${workoutIndex + 1}`}>
                          <Input placeholder="Workout" />
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.List name={[workout.name, 'groups']}>
                          {(groups, groupMeta) => (
                            <>
                              {groups.map((group, groupIndex) => (
                                <Col xs={24} key={group.key} style={stylesGroup}>
                                  <Row gutter={[12, 12]}>
                                    <Col xs={24}>
                                      <Form.Item
                                        name={[group.name, 'title']}
                                        initialValue={`Group ${groupIndex + 1}`}
                                      >
                                        <Input placeholder="Group Title" />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={24}>
                                      <Form.List name={[group.name, 'blocks']}>
                                        {(blocks, blockMeta) => (
                                          <>
                                            {blocks.map((block, blockIndex) => (
                                              <Col xs={24} key={block.key} style={stylesGroup}>
                                                <Row gutter={[12, 12]}>
                                                  <Col xs={24}>
                                                    <Form.Item
                                                      name={[block.name, 'title']}
                                                      initialValue={`Block ${blockIndex + 1}`}
                                                    >
                                                      <Input placeholder="Block Title" />
                                                    </Form.Item>
                                                  </Col>
                                                  <Col xs={24}>
                                                    <Form.Item name={[block.name, 'notes']}>
                                                      <Input placeholder="Block Notes" />
                                                    </Form.Item>
                                                  </Col>
                                                  <Col xs={24}>
                                                    {blocks.length > 1 && (
                                                      <Button
                                                        type="link"
                                                        onClick={() => blockMeta.remove(block.name)}
                                                      >
                                                        <CloseOutlined />
                                                      </Button>
                                                    )}
                                                  </Col>
                                                </Row>
                                              </Col>
                                            ))}
                                            <Col xs={24}>
                                              <Button type="dashed" onClick={() => blockMeta.add()} block>
                                                + Add Block
                                              </Button>
                                            </Col>
                                          </>
                                        )}
                                      </Form.List>
                                    </Col>
                                    <Col xs={24}>
                                      {groups.length > 1 && (
                                        <Button type="link" onClick={() => groupMeta.remove(group.name)}>
                                          <CloseOutlined />
                                        </Button>
                                      )}
                                    </Col>
                                  </Row>
                                </Col>
                              ))}
                              <Col xs={24}>
                                <Button type="dashed" onClick={() => groupMeta.add()} block>
                                  + Add Group
                                </Button>
                              </Col>
                            </>
                          )}
                        </Form.List>
                      </Col>
                    </Row>
                  </Col>
                ))}
              </Row>
            )}
          </Form.List>
          <Form.Item noStyle shouldUpdate>
            {() => (
              <Typography>
                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
              </Typography>
            )}
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Homepage;
