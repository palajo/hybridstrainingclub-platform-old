import React from 'react';
import RootLayout from '@/layouts/RootLayout';
import { Col, Row, theme, Typography, Input, Avatar, Card, List, Button } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { DeleteOutlined, EditOutlined, EllipsisOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';

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
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log(info?.source, value);
  };

  return (
    <RootLayout>
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
                  <Search placeholder="Search.." allowClear onSearch={onSearch} style={{ width: 320 }} />
                </Col>
                <Col>
                  <Button type="primary" icon={<PlusOutlined />}>Create workout</Button>
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
                    <EditOutlined key="edit" />,
                    <DeleteOutlined key="delete" />,
                  ]}
                >
                  <Meta
                    avatar={<Avatar size={56} src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                  />
                </Card>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </RootLayout>
  );
};

export default Workouts;