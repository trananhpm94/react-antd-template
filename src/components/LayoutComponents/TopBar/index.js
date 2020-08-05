import React from 'react';
import ProfileMenu from './ProfileMenu';
import './style.scss';

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="topbar__right">
        <ProfileMenu />
      </div>
    </div>
  );
};

export default TopBar;
