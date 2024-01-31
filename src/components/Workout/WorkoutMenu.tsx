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
  getItem('Week #1', 'sub1', <SettingOutlined/>, [
    getItem('Day #1 - Legs', '1'),
    getItem('Day #2 - Arms & Shoulders', '2'),
    getItem('Day #3 - Back', '3'),
    getItem('Day #4 - Chest', '4'),
  ]),
  getItem('Week #2', 'sub2', <SettingOutlined/>, [
    getItem('Day #1 - Legs', '5'),
    getItem('Day #2 - Arms & Shoulders', '6'),
    getItem('Day #3 - Back', '7'),
    getItem('Day #4 - Chest', '8'),
  ]),
  getItem('Week #3', 'sub3', <SettingOutlined/>, [
    getItem('Day #1 - Legs', '9'),
    getItem('Day #2 - Arms & Shoulders', '10'),
    getItem('Day #3 - Back', '11'),
    getItem('Day #4 - Chest', '12'),
  ]),
  getItem('Week #4', 'sub4', <SettingOutlined/>, [
    getItem('Day #1 - Legs', '13'),
    getItem('Day #2 - Arms & Shoulders', '14'),
    getItem('Day #3 - Back', '15'),
    getItem('Day #4 - Chest', '16'),
  ]),
];

const WorkoutMenu: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <Menu
      onClick={onClick}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
      style={{ borderColor: 'transparent' }}
    />
  );
};

export default WorkoutMenu;