import React, { useContext, useEffect, useState } from 'react';
import { AutoComplete, Button, Col, Form, FormListFieldData, Input, InputNumber, Modal, Popconfirm, Row, Table, theme } from 'antd';
import { CalendarContext } from '@/components/Calendar/Calendar';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';
import Link from 'next/link';
import { CloseOutlined, DeleteOutlined, EditOutlined, MenuOutlined, SaveOutlined } from '@ant-design/icons';

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
      );
    }

    if (inputType === 'number') {
      return (
        <InputNumber/>
      );
    }

    return (
      <Input/>
    );
  };

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

const BlockModal: React.FC<{ show: boolean, onHide: () => void; block: any; groupIndex: number; blockIndex: number; workoutDate: string }> = ({
  show,
  onHide,
  block,
  groupIndex,
  blockIndex,
  workoutDate,
}) => {
  const {
    token: { colorBgContainer, borderRadiusLG, colorPrimary },
  } = theme.useToken();

  const { updateBlockField } = useContext(CalendarContext);

  // data
  const [data, setData] = useState({
    title: '',
    exercises: [],
    notes: '',
  });

  useEffect(() => {
    setData(block);
  }, [block]);

  // forms
  const [form] = Form.useForm();

  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Exercise) => record.key === editingKey;

  // table
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
    <Modal open={show} onCancel={onHide} width="1140px">
      <Form form={form} component={false}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Title"
              name="title"
              labelCol={{ span: 24 }}
            >
              <Input size="middle" placeholder="Title"/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Reps"
              name="reps"
              labelCol={{ span: 24 }}
            >
              <Input size="middle" placeholder="Reps"/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
              <SortableContext
                items={data.exercises?.map((i) => i.key)}
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
                  dataSource={data.exercises}
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
          </Col>
          <Col span={24}>
            <Form.Item
              label="Notes"
              name="notes"
              labelCol={{ span: 24 }}
            >
              <Input.TextArea size="middle" placeholder="Notes"/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );

  function edit(record) {
    form.setFieldsValue({ title: '', category: '', video: '', sets: '', reps: '', ...record });
    setEditingKey(record.key);
  };

  function cancel(){
    setEditingKey('');
  };

  async function save(key) {
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

  function handleDelete(key){
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  function handleAddExercise() {
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
};

export default BlockModal;