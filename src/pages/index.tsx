import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, theme, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const WorkoutDate = () => {
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
        Monday
      </Typography.Title>
      <Typography style={{ textAlign: 'center' }}>
        20-02-2024
      </Typography>
    </Col>
  );
};

interface WorkoutProps {
  workout: any;
  onWorkoutChange: (updatedWorkout: any) => void;
}

const Workout: React.FC<WorkoutProps> = ({ workout, onWorkoutChange }) => {
  const {
    token: {
      colorBorder,
    },
  } = theme.useToken();

  const [form] = Form.useForm();

  const handleWorkoutChange = (updatedWorkout: any) => {
    onWorkoutChange(updatedWorkout);

    console.log(workout);
  };

  const handleAddGroup = () => {
    const updatedWorkout = {
      ...workout,
      groups: [...workout.grups, { title: '', blocks: [] }],
    };
    onWorkoutChange(updatedWorkout);
  };

  const stylesWorkout: React.CSSProperties = {
    width: 'calc(100% / 7)',
    border: `1px solid ${colorBorder}`,
    borderRight: 0,
  };

  const stylesWorkoutColumn: React.CSSProperties = {
    padding: '24px 16px',
  };

  return (
    <Col style={stylesWorkout}>
      <Form form={form} name="workoutForm">
        <Row>
          <WorkoutDate/>
          <Col xs={24} style={stylesWorkoutColumn}>
            <Form.Item name={[workout.name, 'name']}>
              <Input placeholder="Workout"/>
            </Form.Item>
            <Form.List name={[workout.name, 'groups']}>
              {(groups, groupMeta) => (
                <Row gutter={[16, 16]}>
                  {groups.map((group: any, index: number) => (
                    <WorkoutGroup
                      key={index}
                      group={group}
                      onGroupChange={(updatedGroup: any) => {
                        const updatedGroups = [...workout.workoutGroups];
                        updatedGroups[index] = updatedGroup;
                        console.log({ ...workout, workoutGroups: updatedGroups });
                      }}
                    />
                  ))}
                  <Col xs={24}>
                    <Button type="dashed" onClick={() => groupMeta.add()} block>
                      +
                    </Button>
                  </Col>
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
          </Col>
        </Row>
      </Form>
    </Col>
  );
};

interface WorkoutGroupProps {
  group: any;
  onGroupChange: (updatedGroup: any) => void;
}

const WorkoutGroup: React.FC<WorkoutGroupProps> = ({ group, onGroupChange }) => {
  const {
    token: {
      borderRadiusLG,
      colorPrimaryBorder,
      colorPrimaryBg,
    },
  } = theme.useToken();

  const handleGroupChange = (updatedGroup: any) => {
    onGroupChange(updatedGroup);
  };

  const handleAddBlock = () => {
    const updatedGroup = {
      ...group,
      blocks: [...group.blocks, { title: '', notes: '', exercises: [] }],
    };
    handleGroupChange(updatedGroup);
  };

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
      <Form form={form} name="groupForm">
        <Row>
          <Col xs={24}>
            <Form.Item
              name={[group.name, 'title']}
            >
              <Input placeholder="Group Title"/>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.List name={[group.name, 'blocks']}>
              {(blocks, blockMeta) => (
                <Row gutter={[0, 20]}>
                  {blocks.map((block: any, index: number) => (
                    // workout block
                    <WorkoutBlock
                      key={index}
                      block={block}
                      onBlockChange={(updatedBlock: any) => {
                        const updatedBlocks = [...group.workoutBlocks];
                        updatedBlocks[index] = updatedBlock;
                        handleGroupChange({ ...group, workoutBlocks: updatedBlocks });
                      }}
                    />
                  ))}
                  <Col xs={24}>
                    <Button type="dashed" onClick={() => blockMeta.add()} block>
                      +
                    </Button>
                  </Col>
                </Row>
              )}
            </Form.List>
          </Col>
          <Col xs={24}>
            <Button type="link">
              <CloseOutlined/>
            </Button>
          </Col>
          <Form.Item noStyle shouldUpdate>
            {() => (
              <Typography>
                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
              </Typography>
            )}
          </Form.Item>
        </Row>
      </Form>
    </Col>
  );
};

interface WorkoutBlockProps {
  block: any;
  onBlockChange: (updatedBlock: any) => void;
}

const WorkoutBlock: React.FC<WorkoutBlockProps> = ({ block, onBlockChange }) => {
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
      <Form form={form} name="blockForm">
        <Row>
          <Col xs={24}>
            <Form.Item
              name={[block.name, 'title']}
            >
              <Input placeholder="Block Title"/>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name={[block.name, 'notes']} style={{ marginBottom: 0 }}>
              <Input placeholder="Block Notes"/>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Button
              type="link"
            >
              <CloseOutlined/>
            </Button>
          </Col>
          <Form.Item noStyle shouldUpdate>
            {() => (
              <Typography>
                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
              </Typography>
            )}
          </Form.Item>
        </Row>
      </Form>
    </Col>
  );
};

const Homepage: React.FC = () => {
  const {
    token: {
      colorBgContainer,
      borderRadiusLG,
    },
  } = theme.useToken();

  const [form] = Form.useForm();

  const [formData, setFormData] = useState({
    workouts: [
      { groups: [{ blocks: [{}] }] },
      { groups: [{ blocks: [{}] }] },
      { groups: [{ blocks: [{}] }] },
      { groups: [{ blocks: [{}] }] },
      { groups: [{ blocks: [{}] }] },
      { groups: [{ blocks: [{}] }] },
      { groups: [{ blocks: [{}] }] },
    ],
  });

  const onFinish = (values: any) => {
    console.log('Finish:', values);
  };

  return (
    <Form.Provider
      onFormChange={(name, { forms, changedFields }) => {
        if (name === 'workoutForm') {
          console.log(changedFields);
        }

        if (name === 'groupForm') {
          console.log('group form triggered');
        }

        if (name === 'blockForm') {
          console.log('block form triggered');
        }
      }}
    >
      <Form
        form={form}
        onFinish={onFinish}
        name="programForm"
        autoComplete="off"
        initialValues={formData}
        onValuesChange={(changedValues, allValues) => {
          setFormData(allValues);
        }}
      >
        <Row gutter={[16, 24]}>
          <Col span={24} style={{ padding: '16px 24px', background: colorBgContainer, borderRadius: borderRadiusLG }}>
            <Form.List name="workouts">
              {(workouts) => (
                <Row justify="space-between">
                  {workouts.map((workout, index) => (
                    <Workout
                      key={index}
                      workout={workout}
                      onWorkoutChange={(updatedWorkout) => {
                        const updatedWorkouts = [...workouts];
                        updatedWorkouts[index] = updatedWorkout;
                      }}
                    />
                  ))}
                </Row>
              )}
            </Form.List>
            <Form.Item noStyle shouldUpdate>
              {() => (
                <Typography style={{ marginTop: '256px' }}>
                  <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                </Typography>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Form.Provider>
  );
};

export default Homepage;
