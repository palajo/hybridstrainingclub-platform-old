import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, GetRef, Input, Popconfirm, Table, theme } from 'antd';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

type InputRef = GetRef<typeof Input>;
type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const TableRow = ({ children, ...props }: TableRowProps ) => {
  const [form] = Form.useForm();

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
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
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
      </EditableContext.Provider>
    </Form>
  );
};

interface TableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const TableCell: React.FC<TableCellProps> = ({
                                                     title,
                                                     editable,
                                                     children,
                                                     dataIndex,
                                                     record,
                                                     handleSave,
                                                     ...restProps
                                                   }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        name={dataIndex}
        rules={[
          {
            required: true,
          },
        ]}
        style={{ marginBottom: '0' }}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

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

const WorkoutTable: React.FC = () => {
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

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      key: 'sort',
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
      width: 100
    },
    {
      title: 'Reps',
      dataIndex: 'reps',
      editable: true,
      width: 100
    },
    {
      title: 'Rest',
      dataIndex: 'rest',
      editable: true,
      width: 100
    },
    {
      title: '',
      dataIndex: 'operation',
      render: (_, record: { key: React.Key }) =>
        data.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <CloseOutlined />
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
                row: TableRow,
                cell: TableCell,
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

export default WorkoutTable;