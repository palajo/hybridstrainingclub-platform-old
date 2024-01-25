import React, { useState } from 'react';
import { Layout, Menu, type MenuProps } from 'antd';
import { CalendarOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Logo from '@/images/logo.png';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Calendar', 'calendar', <CalendarOutlined/>),
  getItem('Programs', 'programs-submenu', <UnorderedListOutlined/>, [
    getItem('Programs', 'programs'),
    getItem('Workouts', 'workouts'),
    getItem('Exercises', 'exercises'),
  ]),
  getItem('Clients', 'clients', <UserOutlined/>),
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <Image src={Logo.src} alt={Logo.alt} width={Logo.width} height={Logo.height} style={{
        width: '100%',
        height: '64px',
        objectFit: 'contain',
        objectPosition: 'center',
        margin: '16px 0',
        padding: '0 12px',
      }}/>
      <Menu theme="dark" defaultSelectedKeys={['calendar']} mode="inline" items={items}/>
    </Sider>
  );
};

export default Sidebar;