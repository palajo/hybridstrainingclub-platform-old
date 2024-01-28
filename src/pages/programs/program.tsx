import React, { useState } from 'react';
import { Button, Col, Input, Row, Table, Tag, theme, Typography } from 'antd';
import { MenuOutlined, MinusOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ColumnsType } from 'antd/es/table';
import WorkoutMenu from '@/components/Workout/Menu';
import type { SearchProps } from 'antd/es/input/Search';
import SortableTable from '@/components/Workout/drag-and-drop';

const { Search } = Input;

const { Title } = Typography;

const Program: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG, colorBgLayout },
  } = theme.useToken();

  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ marginBottom: 0 }}>
              Workout Title
            </Title>
          </Col>
          <Col>
            <Row gutter={[12, 12]}>
              <Col>
                <Button type="primary" danger icon={<MinusOutlined/>}>Delete</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24}
           style={{ background: colorBgContainer, borderRadius: borderRadiusLG, padding: '0', overflow: 'hidden' }}>
        <Row gutter={[0, 8]}>
          <Col span={4}>
            <Title level={5} style={{ marginBottom: 0, padding: '16px 24px' }}>
              Navigation
            </Title>
            <WorkoutMenu/>
          </Col>
          <Col span={20} style={{ padding: '24px 36px' }}>
            <Row gutter={[16, 24]}>
              <Col span={24}>
                <Row align="middle" gutter={[8, 12]}>
                  <Col>
                    <Tag color="green">Week #1</Tag>
                  </Col>
                  <Col>
                    <Title level={4} style={{ marginBottom: 0 }}>
                      Day #1 - Legs
                    </Title>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <SortableTable/>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Program;
