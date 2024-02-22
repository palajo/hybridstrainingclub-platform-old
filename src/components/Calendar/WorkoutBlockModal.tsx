import React, { useState } from 'react';
import { Button, Col, Form, Input, Modal, Row } from 'antd';

import WorkoutBlockModalTable from './WorkoutBlockModalTable';
import { EditOutlined } from '@ant-design/icons';

const WorkoutBlockModal: React.FC = ({ block }) => {
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
      <Button size="small" type="text" onClick={showModal}>
        <EditOutlined/>
      </Button>
      <Modal title="Round #1" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width="960px">
        <Row>
          <Col span={24}>
            <Form.Item
              label="Title"
              name={[block.name, 'title']}
            >
              <Input placeholder="Block Title"/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <WorkoutBlockModalTable/>
          </Col>
          <Col span={24}>
            <Form.Item name={[block.name, 'notes']} label="Notes" style={{ marginBottom: 0 }}>
              <Input.TextArea size="middle"/>
            </Form.Item>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default WorkoutBlockModal;