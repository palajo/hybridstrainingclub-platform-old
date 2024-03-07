import React, { useState } from 'react';
import Head from 'next/head';
import { Button, Col, Form, Input, Row, theme, Typography } from 'antd';
import { DeleteOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import Block from '@/components/Group/Block';

const { Title } = Typography;

export const GroupContext = React.createContext();

const Group: React.FC = () => {
  const {
    token: {
      borderRadiusLG,
      colorPrimaryBorder,
      colorPrimaryBg,
    },
  } = theme.useToken();

  const [group, setGroup] = useState({
    title: 'Warm up',
    blocks: [
      {
        title: 'Round 1',
        notes: 'Keep it simple',
        exercises: [
          {
            title: 'Stretching',
            category: 'Stretching',
            video: 'https://...',
            sets: 3,
            reps: 10,
            rest: 120,
          },
          {
            title: 'Stretching',
            category: 'Stretching',
            video: 'https://...',
            sets: 3,
            reps: 10,
            rest: 120,
          },
          {
            title: 'Stretching',
            category: 'Stretching',
            video: 'https://...',
            sets: 3,
            reps: 10,
            rest: 120,
          },
        ],
      },
    ],
  });

  const stylesWorkoutGroup: React.CSSProperties = {
    padding: '24px 16px',
    borderLeft: `3px solid ${colorPrimaryBorder}`,
    background: colorPrimaryBg,
    borderRadius: borderRadiusLG,
  };

  return (
    <>
      <Head>
        <title>Warm up – #Group – HTC Platform</title>
      </Head>
      <Row gutter={[16, 24]}>
        <GroupContext.Provider
          value={{
            addGroupBlock,
            addGroupBlockExercise,
            removeGroupBlock,
            removeGroupBlockExercise,
            moveGroupBlock,
            moveGroupBlockExercise,
            updateGroupField,
            updateGroupBlockField,
            updateGroupBlockExerciseField,
          }}
        >
          <Col span={24}>
            <Row justify="space-between" align="middle">
              <Col>
                <Row align="middle" gutter={[16, 16]}>
                  <Col>
                    <Title level={2} style={{ marginBottom: 0 }}>
                      {group.title}
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
            <Row gutter={[16, 24]}>
              <Col lg={12}>
                <Input
                  placeholder="Group Title"
                  value={group.title}
                  onChange={(e) => updateGroupField('title', e.target.value)}
                />
              </Col>
              <Col lg={12}>
                <Input
                  placeholder="Category"
                  value={group.category}
                  onChange={(e) => updateGroupField('category', e.target.value)}
                />
              </Col>
              <Col xs={24}>
                <Row gutter={[16, 16]}>
                  {group.blocks.map((block: any, blockIndex) => (
                    <Col xs={24} key={blockIndex}>
                      <Block
                        key={blockIndex}
                        block={block}
                        blockIndex={blockIndex}
                      />
                    </Col>
                  ))}
                  <Col lg={24}>
                    <Button type="dashed" block onClick={() => addGroupBlock()} icon={<PlusOutlined/>}>Add Block</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </GroupContext.Provider>
      </Row>
    </>
  );

  function addGroupBlock() {
    setGroup((prevGroup) => {
      const updatedGroup = { ...prevGroup };

      updatedGroup.blocks.push({
        title: '',
        reps: '',
        exercises: [],
        notes: '',
      });

      return updatedGroup;
    });
  };

  function addGroupBlockExercise(blockIndex: number) {
    setGroup((prevGroup) => {
      const updatedGroup = { ...prevGroup };

      if (updatedGroup && updatedGroup.blocks && updatedGroup.blocks[blockIndex]) {
        updatedGroup.blocks[blockIndex].exercises.push({
          title: '',
          category: '',
          video: '',
          sets: 0,
          reps: 0,
          rest: 0,
        });
      }

      return updatedGroup;
    });
  };


  function removeGroupBlock(blockIndex: number) {
    setGroup((prevGroup) => {
      const updatedGroup = { ...prevGroup };

      updatedGroup.blocks.splice(blockIndex, 1);

      return updatedGroup;
    });
  };

  function removeGroupBlockExercise(blockIndex: number, exerciseIndex: number) {
    setGroup((prevGroup) => {
      const updatedGroup = { ...prevGroup };

      updatedGroup.blocks[blockIndex].exercises.splice(exerciseIndex, 1);

      return updatedGroup;
    });
  };

  function moveGroupBlock(fromIndex: number, toIndex: number) {
    setGroup((prevGroup) => {
      const updatedGroup = { ...prevGroup };

      // Determine the array to manipulate based on the object type
      let arrayToUpdate = updatedGroup.blocks;

      // Ensure the array to manipulate is defined
      if (arrayToUpdate) {
        // Remove the object from its current position
        const [objectToMove] = arrayToUpdate.splice(fromIndex, 1);
        // Insert the object into the new position
        arrayToUpdate.splice(toIndex, 0, objectToMove);
      }

      return updatedGroup;
    });
  };

  function moveGroupBlockExercise(blockIndex: number, fromIndex: number, toIndex: number) {
    setGroup((prevGroup) => {
      const updatedGroup = { ...prevGroup };

      // Determine the array to manipulate based on the object type
      let arrayToUpdate = updatedGroup.blocks[blockIndex].exercises;

      // Ensure the array to manipulate is defined
      if (arrayToUpdate) {
        // Remove the object from its current position
        const [objectToMove] = arrayToUpdate.splice(fromIndex, 1);
        // Insert the object into the new position
        arrayToUpdate.splice(toIndex, 0, objectToMove);
      }

      return updatedGroup;
    });
  };

  function updateGroupField(field: string, newValue: any) {
    setGroup((prevGroup) => {
      const updatedGroup = { ...prevGroup };

      updatedGroup[field] = newValue;

      return updatedGroup;
    });
  };

  function updateGroupBlockField(field: string, newValue: any, blockIndex: number) {
    setGroup((prevGroup) => {
      const updatedGroup = { ...prevGroup };

      if (updatedGroup && updatedGroup.blocks && updatedGroup.blocks[blockIndex]) {
        updatedGroup.blocks[blockIndex][field] = newValue;
      }

      return updatedGroup;
    });
  };

  function updateGroupBlockExerciseField(field: string, newValue: any, blockIndex: number, exerciseIndex: number) {
    setGroup((prevGroup) => {
      const updatedGroup = { ...prevGroup };

      if (updatedGroup && updatedGroup.blocks && updatedGroup.blocks[blockIndex] && updatedGroup.blocks[blockIndex].exercises && updatedGroup.blocks[blockIndex].exercises[exerciseIndex]) {
        updatedGroup.blocks[blockIndex].exercises[exerciseIndex][field] = newValue;
      }

      return updatedGroup;
    });
  };
};

export default Group;
