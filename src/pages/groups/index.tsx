import React from 'react';
import { Button, Col, Input, Row, Table, TableColumnsType, theme, Typography } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Search } = Input;
const { Title } = Typography;

interface DataType {
  key: React.Key;
  title: string;
  category: string;
  blocks: string;
}

const Groups: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG, colorPrimary },
  } = theme.useToken();

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log(info?.source, value);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Group',
      dataIndex: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text: string) => <Link href="/groups/group" style={{ color: colorPrimary }}>{text}</Link>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Blocks',
      dataIndex: 'blocks',
    },
    {
      title: '',
      dataIndex: '',
      key: 'actions',
      width: 180,
      render: () => (
        <>
          <Link href="/groups/group">
            <Button size="small" type="dashed" icon={<EditOutlined/>} style={{ marginRight: '16px' }}/>
          </Link>
          <Button size="small" type="dashed" icon={<CloseOutlined/>} danger/>
        </>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      title: 'Warm up',
      category: 'Warm up',
      blocks: 'Round 1, Round 2, Round 3',
    },
    {
      key: '2',
      title: 'Warm up',
      category: 'Warm up',
      blocks: 'Round 1, Round 2, Round 3',
    },
    {
      key: '3',
      title: 'Warm up',
      category: 'Warm up',
      blocks: 'Round 1, Round 2, Round 3',
    },
    {
      key: '4',
      title: 'Warm up',
      category: 'Warm up',
      blocks: 'Round 1, Round 2, Round 3',
    },
  ];


  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ marginBottom: 0 }}>
              Groups
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
          bordered
          rowSelection={{
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />
      </Col>
    </Row>
  );
};

export default Groups;