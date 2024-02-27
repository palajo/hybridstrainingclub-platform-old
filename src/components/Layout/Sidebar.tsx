import React, { useState } from 'react';
import { Layout, Menu, type MenuProps } from 'antd';
import {
  AimOutlined,
  CalendarOutlined,
  ContainerOutlined,
  OrderedListOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import Logo from '@/images/logo.png';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
  getItem(<Link href="/" shallow={true}>Program Builder</Link>, '/', <CalendarOutlined/>),
  getItem('Components', 'workouts-submenu', <SettingOutlined/>, [
    getItem(<Link href="/groups" shallow={true}>Groups</Link>, '/groups', <ContainerOutlined/>),
    getItem(<Link href="/exercises" shallow={true}>Exercises</Link>, '/exercises', <AimOutlined/>),
  ]),
  getItem(<Link href="/clients" shallow={true}>Clients</Link>, '/clients', <UserOutlined/>),
];

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);

  const [current, setCurrent] = useState(router.pathname);

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <Link href="/" shallow={true}>
        <Image src={Logo.src} alt="HybridsTrainingClub - Logo" width={Logo.width} height={Logo.height} style={{
          width: '100%',
          height: '56px',
          objectFit: 'contain',
          objectPosition: 'center',
          margin: '16px 0',
          padding: '0 16px',
        }}/>
      </Link>
      <Menu theme="dark" mode="inline" onClick={onClick} selectedKeys={[current]} items={items}/>
    </Sider>
  );
};

export default Sidebar;