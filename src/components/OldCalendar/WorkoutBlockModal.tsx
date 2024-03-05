import React, { useState } from 'react';
import { Button, Col, Form, Input, Modal, Row } from 'antd';

import { EditOutlined } from '@ant-design/icons';
import GroupBlockExercises from '@/components/Group/GroupBlockExercises';

interface WorkoutBlockModalProps {
  block: any;
  workoutIndex: number;
  groupIndex: number;
  blockIndex: number;
  handleUpdate: () => void;
}

const WorkoutBlockModal: React.FC<WorkoutBlockModalProps> = ({
  block,
  handleUpdate,
  workoutIndex,
  groupIndex,
  blockIndex,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = Form.useFormInstance();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleUpdate();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button size="small" type="text" onClick={showModal}>
        <EditOutlined/>
      </Button>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width="1140px">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Format"
              name={[block.name, 'title']}
              labelCol={{ span: 24 }}
            >
              <Input placeholder="Block Title"/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Reps"
              name={[block.name, 'reps']}
              labelCol={{ span: 24 }}
            >
              <Input placeholder="Reps"/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.List name={[block.name, 'exercises']}>
              {(exercises, { add, remove, move }) => (
                <GroupBlockExercises exercises={exercises} add={add} move={move} remove={remove}/>
              )}
            </Form.List>
          </Col>
          <Col span={24}>
            <Form.Item
              name={[block.name, 'notes']}
              label="Notes"
              style={{ marginBottom: 0 }}
              labelCol={{ span: 24 }}
            >
              <Input.TextArea size="middle"/>
            </Form.Item>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default WorkoutBlockModal;