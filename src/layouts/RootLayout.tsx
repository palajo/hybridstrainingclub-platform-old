import React from 'react';
import { Layout, theme } from 'antd';
import Sidebar from '@/components/layout/Sider';

const { Header, Content, Footer } = Layout;

const RootLayout = ({ children }: React.PropsWithChildren) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar/>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          HybridsTrainingClub ©{new Date().getFullYear()} Developed by Extela
        </Footer>
      </Layout>
    </Layout>
  );
};

export default RootLayout;