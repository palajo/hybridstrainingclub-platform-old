import React from 'react';
import { Button, Col, Input, Row, Table, TableColumnsType, theme, Typography } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Head from 'next/head';

const { Search } = Input;
const { Title } = Typography;

interface DataType {
  key: React.Key;
  name: string;
  plan: string;
  email: string;
  phone: string;
}

const Clients: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG, colorPrimary },
  } = theme.useToken();

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log(info?.source, value);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text: string) => <Link href="/clients/client" style={{ color: colorPrimary }}>{text}</Link>,
    },
    {
      title: 'Plan',
      dataIndex: 'plan',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: '',
      dataIndex: '',
      key: 'actions',
      width: 180,
      render: () => (
        <>
          <Link href="/clients/client">
            <Button size="small" type="dashed" style={{ marginRight: '16px' }}>
              <EditOutlined/>
            </Button>
          </Link>
          <Button size="small" type="dashed" danger><CloseOutlined/></Button>
        </>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      plan: 'Standard plan',
      email: 'john.brown@gmail.com',
      phone: '+1 (000) 00 00 000',
    },
    {
      key: '2',
      name: 'Jim Green',
      plan: 'Standard plan',
      email: 'jim.green@gmail.com',
      phone: '+1 (000) 00 00 000',
    },
    {
      key: '3',
      name: 'Joe Black',
      plan: 'Standard plan',
      email: 'joe.black@gmail.com',
      phone: '+1 (000) 00 00 000',
    },
    {
      key: '4',
      name: 'Alex Robert',
      plan: 'Standard plan',
      email: 'alex.robert@gmail.com',
      phone: '+1 (000) 00 00 000',
    },
  ];


  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  return (
    <>
      <Head>
        <title>Clients – HTC Platform</title>
      </Head>
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={2} style={{ marginBottom: 0 }}>
                Clients
              </Title>
            </Col>
            <Col>
              <Row gutter={[12, 12]}>
                <Col>
                  <Search placeholder="Search.." allowClear onSearch={onSearch} style={{ width: 320 }}/>
                </Col>
                <Col>
                  <Button type="primary" icon={<PlusOutlined/>}>Add client</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ padding: '16px 24px', background: colorBgContainer, borderRadius: borderRadiusLG }}>
          <Table
            rowSelection={{
              ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
          />
        </Col>
      </Row>
    </>
  );
};

export default Clients;