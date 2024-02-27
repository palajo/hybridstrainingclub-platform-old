import React, { useState } from 'react';
import { Button, Col, Row, Table, TableColumnsType, Tag, theme } from 'antd';
import Link from 'next/link';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';

interface DataType {
  key: React.Key;
  amount: number;
  currency: string;
  status: string;
  date: string;
}

const Billing: React.FC = () => {
  const columns: TableColumnsType<DataType> = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      // @ts-ignore
      render: (value: string, record: object) => <>{record.amount} {record.currency}</>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (value) => <Tag color={`${value === 'Paid' ? 'green' : 'red'}`}>{value}</Tag>
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      amount: 1489,
      currency: 'USD',
      status: 'Paid',
      date: 'Sep 14, 11:14 PM',
    },
    {
      key: '2',
      amount: 1599,
      currency: 'USD',
      status: 'Paid',
      date: 'Sep 14, 11:14 PM',
    },
    {
      key: '3',
      amount: 689,
      currency: 'USD',
      status: 'Pending',
      date: 'Sep 14, 11:14 PM',
    },
    {
      key: '4',
      amount: 799,
      currency: 'USD',
      status: 'Paid',
      date: 'Sep 14, 11:14 PM',
    },
  ];

  return (
    <Row>
      <Col lg={24}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ position: ['bottomCenter'] }}
        />
      </Col>
    </Row>
  );
}

export default Billing;