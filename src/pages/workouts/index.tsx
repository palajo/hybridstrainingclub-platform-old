import React from 'react';
import { Avatar, Button, Card, Col, Input, List, Row, theme, Typography } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { router } from 'next/client';
import { useRouter } from 'next/router';

const { Meta } = Card;
const { Search } = Input;
const { Title } = Typography;

const data = Array.from({ length: 24 }).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const Workouts: React.FC = () => {
  const router = useRouter();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log(info?.source, value);
  };

  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ marginBottom: 0 }}>
              Workouts
            </Title>
          </Col>
          <Col>
            <Row gutter={[12, 12]}>
              <Col>
                <Search placeholder="Search.." allowClear onSearch={onSearch} style={{ width: 320 }}/>
              </Col>
              <Col>
                <Button type="primary" icon={<PlusOutlined/>}>Create workout</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24} style={{ padding: '24px 24px', background: colorBgContainer, borderRadius: borderRadiusLG }}>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 4,
          }}
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            align: 'center',
            pageSize: 12,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
                actions={[
                  <Button type="text" key="edit" onClick={() => router.push('/workouts/workout')}><EditOutlined/></Button>,
                  <Button type="text" danger key="delete"><DeleteOutlined/></Button>,
                ]}
              >
                <Meta
                  avatar={<Avatar size={56} src={item.avatar}/>}
                  title={<Link href="/workouts/workout">{item.title}</Link>}
                  description={item.description}
                />
              </Card>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};

export default Workouts;