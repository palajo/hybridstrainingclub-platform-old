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
  title: string;
  category: string;
  video: string;
}

const Exercises: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG, colorPrimary },
  } = theme.useToken();

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log(info?.source, value);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Exercise',
      dataIndex: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text: string) => <Link href="/exercises/exercise" style={{ color: colorPrimary }}>{text}</Link>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Video',
      dataIndex: 'video',
    },
    {
      title: '',
      dataIndex: '',
      key: 'actions',
      width: 180,
      render: () => (
        <>
          <Link href="/exercises/exercise">
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
  ];


  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

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

export default Exercises;