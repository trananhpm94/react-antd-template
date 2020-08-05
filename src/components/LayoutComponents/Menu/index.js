import 'rc-drawer/assets/index.css';
import React from 'react';
import DrawerMenu from 'rc-drawer';
import { MenuLeft } from './MenuLeft';
import { useSelector } from 'react-redux';
import './style.scss';
import { dispatch } from '../../../states/store';


const AppMenu = props => {
  const open = useSelector(({ app }) => app.layoutState.menuMobileOpened);
  const { isMobile } = props;

  const toggleOpen = () => {
    dispatch.app.setLayoutState({ menuMobileOpened: !open });
  };

  return isMobile ? (
    <DrawerMenu
      getContainer={null}
      level={null}
      open={open}
      onMaskClick={toggleOpen}
      onHandleClick={toggleOpen}
    >
      <MenuLeft {...props} />
    </DrawerMenu>
  ) : (
    <MenuLeft {...props} />
  );
};

export default AppMenu;
