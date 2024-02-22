import React, { useState } from 'react';
import { Form, Popconfirm, Table, theme } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

import WorkoutTableRow from '@/components/Workout/WorkoutBuilder/WorkoutTableRow';
import WorkoutTableCell from '@/components/Workout/WorkoutBuilder/WorkoutTableCell';

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

interface Item {
  key: string;
  name: string;
  category: string;
  videoLink: string;
  sets: number;
  reps: number;
  rest: number;
}

const WorkoutBlockModalTable: React.FC = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>([
    {
      key: '0',
      name: 'Air squats',
      category: 'Squats & Variations',
      videoLink: 'https://vimeo.com/753766661',
      sets: 0,
      reps: 0,
      rest: 0,
    },
    {
      key: '1',
      name: 'BB Pendlay rows',
      category: 'Horizontal Pull',
      videoLink: 'https://vimeo.com/734352641',
      sets: 0,
      reps: 0,
      rest: 0,
    },
    {
      key: '2',
      name: 'Yoga push ups',
      category: 'Vertical Push',
      videoLink: 'https://vimeo.com/743946663',
      sets: 0,
      reps: 0,
      rest: 0,
    },
  ]);

  const handleDelete = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const handleSave = (row: Item) => {
    const newData = [...data];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setData(newData);
  };

  // @ts-ignore
  // @ts-ignore
  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      key: 'sort',
      dataIndex: 'sort',
      width: 24,
    },
    {
      title: 'Exercise',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      editable: true,
    },
    {
      title: 'Vimeo',
      dataIndex: 'videoLink',
      editable: true,
    },
    {
      title: 'Sets',
      dataIndex: 'sets',
      editable: true,
      width: 100,
    },
    {
      title: 'Reps',
      dataIndex: 'reps',
      editable: true,
      width: 100,
    },
    {
      title: 'Rest',
      dataIndex: 'rest',
      editable: true,
      width: 100,
    },
    {
      title: '',
      dataIndex: 'operation',
      // @ts-ignore
      render: (_, record: { key: React.Key }) =>
        data.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <CloseOutlined/>
          </Popconfirm>
        ) : null,
    },
  ];


  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setData((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };

  return (
    <Form form={form} component={false}>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          // rowKey array
          items={data.map((i) => i.key)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            components={{
              body: {
                row: WorkoutTableRow,
                cell: WorkoutTableCell,
              },
            }}
            rowKey="key"
            dataSource={data}
            columns={columns as ColumnTypes}
            rowClassName="editable-row"
            pagination={false}
            style={{ marginBottom: '24px' }}
          />
        </SortableContext>
      </DndContext>
    </Form>
  );
};

export default WorkoutBlockModalTable;