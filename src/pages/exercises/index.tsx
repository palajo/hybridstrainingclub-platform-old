import React, { useState } from 'react';
import { Button, Col, Row, Form, Input, InputNumber, Table, theme, Typography, Popconfirm } from 'antd';
import { CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Head from 'next/head';
import { SearchProps } from 'antd/es/input/Search';

const { Search } = Input;
const { Title } = Typography;

interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
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

const Exercises: React.FC = () => {
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

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

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

  const columns = [
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
      title: 'Actions',
      dataIndex: 'actions',
      render: (_: any, record: Item) => {
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
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleAddExercise = () => {
    const highestKey = data.reduce((maxKey, data) => {
      return data.key > maxKey ? data.key : maxKey;
    }, 0);

    const exerciseObject = {
      key: highestKey + 1,
      title: '',
      category: '',
      video: '',
    }

    setData(data => [...data, exerciseObject]);
  }

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log(info?.source, value);
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      <Head>
        <title>Exercises – HTC Platform</title>
      </Head>
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={2} style={{ marginBottom: 0 }}>
                Exercises
              </Title>
            </Col>
            <Col>
              <Row gutter={[12, 12]}>
                <Col>
                  <Search placeholder="Search.." allowClear onSearch={onSearch} style={{ width: 320 }}/>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ padding: '16px 24px', background: colorBgContainer, borderRadius: borderRadiusLG }}>
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              rowSelection={{
                type: 'checkbox',
                ...rowSelection,
              }}
              bordered
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
              }}
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
            <Row align="middle" gutter={[16, 16]}>
              <Col>
                <Popconfirm title="Sure to delete?" onConfirm={() => alert('multiple delete handler')}>
                  <Button
                    type="primary"
                    icon={<DeleteOutlined/>}
                    danger
                    disabled={!hasSelected}
                  >
                    Delete
                  </Button>
                </Popconfirm>
              </Col>
              <Col>
                <Typography style={{ marginLeft: 8 }}>
                  {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </Typography>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Exercises;