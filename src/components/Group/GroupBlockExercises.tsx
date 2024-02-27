import React, { useState } from 'react';
import { Button, Form, GetRef, Input, InputNumber, Popconfirm, Table, theme } from 'antd';
import { CloseOutlined, DeleteOutlined, EditOutlined, MenuOutlined, SaveOutlined } from '@ant-design/icons';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Link from 'next/link';
import { CSS } from '@dnd-kit/utilities';

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

interface EditableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

interface Exercise {
  key: number;
  title: string;
  category: string;
  video: string;
  sets: number;
  reps: number;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Exercise;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
                                                     editing,
                                                     dataIndex,
                                                     title,
                                                     inputType,
                                                     record,
                                                     index,
                                                     children,
                                                     ...restProps
                                                   }) => {
  const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableRow = ({ children, ...props }: EditableRowProps) => {
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

const GroupBlockExercises: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG, colorPrimary },
  } = theme.useToken();

  const [form] = Form.useForm();

  const [data, setData] = useState([
    {
      key: '1',
      title: 'Yoga push ups',
      category: 'Vertical Push',
      video: 'https://vimeo.com/743946663',
    },
    {
      key: '2',
      title: 'Band hamstring curls',
      category: 'Deadlifts & Hip Hinges',
      video: 'https://vimeo.com/753918684',
    },
    {
      key: '3',
      title: 'Air squats',
      category: 'Squats & Variations',
      video: 'https://vimeo.com/753766661',
    },
    {
      key: '4',
      title: 'Rings reverse deadlifts',
      category: 'Core work',
      video: 'https://vimeo.com/735168704',
    },
  ]);

  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Exercise) => record.key === editingKey;

  const edit = (record: Partial<Exercise> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Exercise;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    }
    catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDelete = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };


  const handleAddExercise = () => {
    const highestKey = data.reduce((maxKey, data) => {
      return data.key > maxKey ? data.key : maxKey;
    }, 0);

    const exerciseObject = {
      key: highestKey + 1,
      title: '',
      category: '',
      video: '',
    };

    setData(data => [...data, exerciseObject]);
    setEditingKey(exerciseObject.key);
  };

  const columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      key: 'sort',
      dataIndex: 'sort',
      width: 24,
    },
    {
      title: 'Exercise',
      dataIndex: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text: string) => <Link href="#" style={{ color: colorPrimary }}>{text}</Link>,
      editable: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      sorter: (a, b) => a.category.localeCompare(b.category),
      editable: true,
    },
    {
      title: 'Video',
      dataIndex: 'video',
      editable: true,
    },
    {
      title: 'Sets',
      dataIndex: 'sets',
      editable: true,
    },
    {
      title: 'Reps',
      dataIndex: 'reps',
      editable: true,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_: any, record: Exercise) => {
        const editable = isEditing(record);
        return editable ? (
          <>
            <Button
              size="small"
              type="primary"
              icon={<SaveOutlined/>}
              style={{ marginRight: '8px' }}
              onClick={() => save(record.key)}
            >
              Save
            </Button>
            <Button
              size="small"
              type="dashed"
              icon={<CloseOutlined/>}
              onClick={() => cancel()}
            />
          </>
        ) : (
          <>
            <Button
              size="small"
              type="dashed"
              icon={<EditOutlined/>}
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
              style={{ marginRight: '8px' }}
            >
              Edit
            </Button>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <Button
                size="small"
                type="dashed"
                icon={<DeleteOutlined/>}
                disabled={editingKey !== ''}
                danger
              />
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Exercise) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
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
          items={data.map((i) => i.key)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            components={{
              body: {
                row: EditableRow,
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={false}
            footer={() =>
              <Button
                type="dashed"
                onClick={handleAddExercise}
                block
              >
                + Add Exercise
              </Button>
            }
          />
        </SortableContext>
      </DndContext>
    </Form>
  );
};

export default GroupBlockExercises;