import React, { useState } from 'react';
import { Button, Col, Form, Input, Modal, Row } from 'antd';

import WorkoutBlockModalTable from './WorkoutBlockModalTable';
import { EditOutlined } from '@ant-design/icons';

interface WorkoutBlockModalProps {
  block: any;
  handleUpdate: () => void;
}

const WorkoutBlockModal: React.FC<WorkoutBlockModalProps> = ({ block, handleUpdate }) => {
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
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width="960px">
        <Row>
          <Col span={24}>
            <Form.Item
              label="Title"
              name={[block.name, 'title']}
              labelCol={{ span: 24 }}
            >
              <Input placeholder="Block Title"/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.List name={[block.name, 'exercises']}>
              {(exercises, { add, remove }) => (
                <WorkoutBlockModalTable exercises={exercises} add={add} remove={remove}/>
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