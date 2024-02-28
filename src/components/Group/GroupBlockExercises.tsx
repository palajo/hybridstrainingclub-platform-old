import React, { useState } from 'react';
import { AutoComplete, Button, Form, FormListFieldData, Input, InputNumber, Popconfirm, Table, theme } from 'antd';
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

interface GroupBlockExercisesProps {
  exercises: FormListFieldData[];
  add: (defaultValue?: any, insertIndex?: number | undefined) => void;
  remove: (index: number | number[]) => void;
  move: (from: number, to: number) => void;
}

interface Exercise {
  key: number;
  title: string;
  category: string;
  video: string;
  sets: number;
  reps: number;
  required: boolean;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  required: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text' | 'autocomplete';
  record: Exercise;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  required,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {

  const [categoryOptions, setCategoryOptions] = useState<{ value: string }[]>([
    {
      value: 'Category #1',
    },
    {
      value: 'Category #2',
    },
    {
      value: 'Category #3',
    },
  ]);

  const getInputNode = () => {
    if (inputType === 'autocomplete') {
      return (
        <AutoComplete options={categoryOptions}/>
      )
    }

    if (inputType === 'number') {
      return (
        <InputNumber/>
      )
    }

    return (
      <Input/>
    )
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: required,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {getInputNode()}
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

const GroupBlockExercises: React.FC<GroupBlockExercisesProps> = ({ exercises, add, remove, move }) => {
  const {
    token: { colorBgContainer, borderRadiusLG, colorPrimary },
  } = theme.useToken();

  const [form] = Form.useForm();

  const [data, setData] = useState([]);

  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Exercise) => record.key === editingKey;

  const edit = (record: Partial<Exercise> & { key: React.Key }) => {
    form.setFieldsValue({ title: '', category: '', video: '', sets: '', reps: '', ...record });
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
      sets: '',
      reps: '',
    };

    setData(data => [...data, exerciseObject]);
    edit({ key: exerciseObject.key });
  };

  const columns: (ColumnTypes[number] & { editable?: boolean; required?: boolean; dataIndex: string })[] = [
    {
      key: 'sort',
      dataIndex: 'sort',
      width: 24,
    },
    {
      title: 'Exercise',
      dataIndex: 'title',
      render: (text: string) => <Link href="#" style={{ color: colorPrimary }}>{text}</Link>,
      editable: true,
      required: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      editable: true,
      required: true,
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
      width: 90,
    },
    {
      title: 'Reps',
      dataIndex: 'reps',
      editable: true,
      width: 90,
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
      width: 160,
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
        inputType: col.dataIndex === 'category' ? 'autocomplete' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        required: col.required,
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