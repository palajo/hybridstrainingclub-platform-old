import React from 'react';
import { Avatar, Button, Col, Input, List, Row, Space, theme, Typography } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { PlusOutlined } from '@ant-design/icons';

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

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);


const Programs: React.FC = () => {
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
              Programs
            </Title>
          </Col>
          <Col>
            <Row gutter={[12, 12]}>
              <Col>
                <Search placeholder="Search.." allowClear onSearch={onSearch} style={{ width: 320 }}/>
              </Col>
              <Col>
                <Button type="primary" icon={<PlusOutlined/>}>Create program</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row>
          <Col span={24} style={{ padding: '16px 24px', background: colorBgContainer, borderRadius: borderRadiusLG }}>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                align: 'center',
                pageSize: 4,
              }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  actions={[<Button type="primary" key="edit">Edit</Button>,
                    <Button type="default" danger key="delete">Delete</Button>]}
                  extra={
                    <img
                      width={480}
                      alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                  }
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <List.Item.Meta
                    avatar={<Avatar size={56} src={item.avatar}/>}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                  />
                  <div style={{ maxWidth: '640px' }}>{item.content}</div>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Programs;