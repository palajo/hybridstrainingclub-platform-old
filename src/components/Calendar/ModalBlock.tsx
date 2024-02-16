import React, { useState } from 'react';
import { Button, Col, Form, Input, Modal, Row } from 'antd';
import WorkoutTable from '@/components/Workout/WorkoutBuilder/WorkoutTable';

const ModalBlock: React.FC = () => {
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
      <Button size="small" type="default" onClick={showModal} style={{ width: '100%', margin: '16px 0 0'}}>
        Edit Block
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width="960px">
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

export default ModalBlock;