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

const { Search } = Input;

const { Title } = Typography;

interface DataType {
  key: string;
  title: string;
  category: string;
  video: string;
  sets: number;
  reps: number;
  rest: number;
}

const columns: ColumnsType<DataType> = [
  {
    key: 'sort',
  },
  {
    title: 'Exercise',
    dataIndex: 'title',
  },
  {
    title: 'Category',
    dataIndex: 'category',
  },
  {
    title: 'Video',
    dataIndex: 'video',
  },
  {
    title: 'Sets',
    dataIndex: 'sets',
  },
  {
    title: 'Reps',
    dataIndex: 'reps',
  },
  {
    title: 'Rest',
    dataIndex: 'rest',
  },
];

const exercisesColumns: ColumnsType<DataType> = [
  {
    key: 'sort',
  },
  {
    title: 'Exercise',
    dataIndex: 'title',
  },
  {
    title: 'Category',
    dataIndex: 'category',
  },
];


interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const TableRow = ({ children, ...props }: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if ((child as React.ReactElement).key === 'sort') {
          return React.cloneElement(child as React.ReactElement, {
            children: (
              <MenuOutlined
                ref={setActivatorNodeRef}
                style={{ touchAction: 'none', cursor: 'move' }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};

const Program: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG, colorBgLayout },
  } = theme.useToken();

  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      title: 'Air squats',
      category: 'Squats & Variations',
      video: 'https://vimeo.com/753766661',
      sets: '3',
      reps: '8',
      rest: '60'
    },
    {
      key: '2',
      title: 'Australian Pull ups',
      category: 'Horizontal Pull',
      video: 'https://vimeo.com/734352408',
      sets: '3',
      reps: '12',
      rest: '90'
    },
    {
      key: '3',
      title: 'BB Back squats',
      category: 'Squats & Variations',
      video: 'https://vimeo.com/743954557',
      sets: '4',
      reps: '15',
      rest: '120'
    },
  ]);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log(info?.source, value);
  };

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
          <Col span={4} style={{ borderRight: `1px solid #f0f0f0` }}>
            <Title level={5} style={{ marginBottom: 0, padding: '16px 24px' }}>
              Navigation
            </Title>
            <WorkoutMenu/>
          </Col>
          <Col span={12} style={{ padding: '24px 36px' }}>
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
                <DndContext onDragEnd={onDragEnd}>
                  <SortableContext
                    // rowKey array
                    items={dataSource.map((i) => i.key)}
                    strategy={verticalListSortingStrategy}
                  >
                    <Table
                      components={{
                        body: {
                          row: TableRow,
                        },
                      }}
                      rowKey="key"
                      columns={columns}
                      dataSource={dataSource}
                      pagination={false}
                    />
                  </SortableContext>
                </DndContext>
              </Col>
            </Row>
          </Col>
          <Col span={8} style={{ background: colorBgContainer, padding: '24px 36px', borderLeft: `1px solid #f0f0f0` }}>
            <Row gutter={[16, 24]}>
              <Col span={24}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Title level={4} style={{ marginBottom: 0 }}>
                      Exercises
                    </Title>
                  </Col>
                  <Col>
                    <Search placeholder="Search.." allowClear onSearch={onSearch} style={{ width: 220 }}/>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <DndContext onDragEnd={onDragEnd}>
                  <SortableContext
                    // rowKey array
                    items={dataSource.map((i) => i.key)}
                    strategy={verticalListSortingStrategy}
                  >
                    <Table
                      components={{
                        body: {
                          row: TableRow,
                        },
                      }}
                      rowKey="key"
                      columns={exercisesColumns}
                      dataSource={dataSource}
                      pagination={false}
                    />
                  </SortableContext>
                </DndContext>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Program;
