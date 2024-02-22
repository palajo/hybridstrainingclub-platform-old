import React, { useState } from 'react';
import { Button, Col, Form, Input, Modal, Row } from 'antd';
import WorkoutTable from '@/components/Workout/WorkoutBuilder/WorkoutTable';

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
                name={[block.name, 'title']}
              >
                <Input placeholder="1 Round"/>
              </Form.Item>
            </Col>
            <Col span={24}>
              <WorkoutTable/>
            </Col>
            <Col span={24}>
              <Form.Item name={[block.name, 'notes']} label="Notes" style={{ marginBottom: 0 }}>
                <Input.TextArea size="middle"/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default WorkoutBlockModal;