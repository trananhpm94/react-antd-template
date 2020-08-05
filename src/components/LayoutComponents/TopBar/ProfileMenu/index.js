import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';

const ProfileMenu = () => {
  const menu = (
    <Menu selectable={false}>
      <Menu.Item>
        <div className="rfq__widget__system-status__item">
          <strong>Hello, </strong>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a href="#/">
          <i className="topbar__dropdownMenuIcon icmn-user" /> Edit Profile
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a href="#/">
          <i className="topbar__dropdownMenuIcon icmn-exit" /> Logout
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="topbar__dropdown d-inline-block">
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
        <a className="ant-dropdown-link" href="/">
          <Avatar className="topbar__avatar" shape="circle" size="large" icon="user" />
        </a>
      </Dropdown>
    </div>
  );
};

export default ProfileMenu;
