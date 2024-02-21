import React, { useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, theme, Typography } from 'antd';
import { CloseOutlined, CopyOutlined, MenuOutlined } from '@ant-design/icons';
import WorkoutTable from '@/components/Workout/WorkoutBuilder/WorkoutTable';
import dayjs from 'dayjs';

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
        {date.startOf('week').add(1, 'day').format('dddd')}
      </Typography.Title>
      <Typography style={{ textAlign: 'center' }}>
        {date.startOf('week').add(1, 'day').format('YYYY-MM-DD')}
      </Typography>
    </Col>
  );
};

interface WorkoutProps {
  workout: any;
  onWorkoutChange: (updatedWorkout: any) => void;
  date: string;
  key: string;
}

const Workout: React.FC<WorkoutProps> = ({ workout, date, onWorkoutChange }) => {
  const {
    token: {
      colorBorder,
    },
  } = theme.useToken();

  const [form] = Form.useForm();

  const handleWorkoutChange = (updatedWorkout: any) => {
    onWorkoutChange(updatedWorkout);
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
          <WorkoutDate date={date}/>
          <Col xs={24} style={stylesWorkoutColumn}>
            <Form.Item name={[workout.name, 'name']}>
              <Input placeholder="Video"/>
            </Form.Item>
            <Form.List name={[workout.name, 'groups']}>
              {(groups, { add, remove }) => (
                <Row gutter={[16, 16]}>
                  {groups.map((group: any, index: number) => (
                    <WorkoutGroup
                      key={index}
                      group={group}
                      onGroupChange={(updatedGroup: any) => {
                        const updatedGroups = [...workout.groups];
                        updatedGroups[index] = updatedGroup;
                      }}
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
      </Form>
    </Col>
  );
};

interface WorkoutGroupProps {
  group: any;
  onGroupChange: (updatedGroup: any) => void;
  remove: (index: number | number[]) => void;
}

const WorkoutGroup: React.FC<WorkoutGroupProps> = ({ group, onGroupChange, remove }) => {
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
                  <Button size="small" type="text" onClick={remove}>
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
                      onBlockChange={(updatedBlock: any) => {
                        const updatedBlocks = [...group.blocks];
                        updatedBlocks[index] = updatedBlock;
                        handleGroupChange({ ...group, blocks: blocks });
                      }}
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
      </Form>
    </Col>
  );
};

interface WorkoutBlockProps {
  block: any;
  onBlockChange: (updatedBlock: any) => void;
  remove: (index: number | number[]) => void;
}

const WorkoutBlock: React.FC<WorkoutBlockProps> = ({ block, onBlockChange, remove }) => {
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
                  <Button size="small" type="text" onClick={remove}>
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
                  Round #1
                </Typography.Title>
              </Col>
              <Col xs={24}>
                <Typography>
                  Push ups, 3 sets x 20, 120s
                </Typography>
                <Typography>
                  Push ups, 3 sets x 20, 120s
                </Typography>
                <Typography>
                  Push ups, 3 sets x 20, 120s
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
            <WorkoutModal/>
          </Col>
        </Row>
      </Form>
    </Col>
  );
};

const WorkoutModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="dashed" onClick={showModal} block>
        Edit Block
      </Button>
      <Modal title="Round #1" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width="960px">
        <Form
          layout="vertical"
        >
          <Row>
            <Col span={24}>
              <Form.Item
                label="Title"
                name={['block', 'title']}
              >
                <Input placeholder="1 Round"/>
              </Form.Item>
            </Col>
            <Col span={24}>
              <WorkoutTable/>
            </Col>
            <Col span={24}>
              <Form.Item name={['block', 'notes']} label="Notes" style={{ marginBottom: 0 }}>
                <Input.TextArea size="middle"/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
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
      {
        date: '18-02-2024',
        groups: [{ blocks: [{}] }],
      },
      {
        date: '19-02-2024',
        groups: [{ blocks: [{}] }],
      },
      {
        date: '20-02-2024',
        groups: [{ blocks: [{}] }],
      },
      {
        date: '21-02-2024',
        groups: [{ blocks: [{}] }],
      },
      {
        date: '22-02-2024',
        groups: [{ blocks: [{}] }],
      },
      {
        date: '23-02-2024',
        groups: [{ blocks: [{}] }],
      },
      {
        date: '24-02-2024',
        groups: [{ blocks: [{}] }],
      },
    ],
  });

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
            name="programForm"
            autoComplete="off"
            initialValues={formData}
            onValuesChange={(changedValues, allValues) => {
              setFormData(allValues);
            }}
          >
            <Row gutter={[16, 24]}>
              <Col span={24}
                   style={{ padding: '16px 24px', background: colorBgContainer, borderRadius: borderRadiusLG }}>
                <Form.List name="workouts">
                  {(workouts) => (
                    <Row justify="space-between">
                      {workouts.map((workout, index) => (
                        <Workout
                          key={index}
                          date={date}
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
              </Col>
            </Row>
          </Form>
        </Form.Provider>
      </Col>
    </Row>
  );
};

export default Homepage;
