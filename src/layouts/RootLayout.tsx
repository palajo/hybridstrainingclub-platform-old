import React from 'react';
import { Layout } from 'antd';
import Sidebar from '@/components/layout/Sider';

const { Content, Footer } = Layout;

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar/>
      <Layout>
        <Content style={{ margin: '24px' }}>
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