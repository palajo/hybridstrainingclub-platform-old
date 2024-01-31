import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('General', 'general', <SettingOutlined/>),
  getItem('Progress', 'progress', <SettingOutlined/>),
  getItem('Billing', 'logs', <SettingOutlined/>),
];

const ClientMenu: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <Menu
      onClick={onClick}
      defaultSelectedKeys={['general']}
      mode="inline"
      items={items}
      style={{ borderColor: 'transparent' }}
    />
  );
};

export default ClientMenu;