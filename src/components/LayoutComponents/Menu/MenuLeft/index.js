import React from 'react';
import { connect } from 'react-redux';
import { Menu, Layout } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { reduce } from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';
import { default as menuData } from 'routes/menuData';
import './style.scss';
import { dispatch } from '../../../../states/store';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const Divider = Menu.Divider;

const mapStateToProps = ({ app, router }, props) => {
  const { layoutState } = app;
  return {
    pathname: router.location.pathname,
    collapsed: layoutState.menuCollapsed,
    theme: layoutState.themeLight ? 'light' : 'dark',
    settingsOpened: layoutState.settingsOpened,
  };
};

@connect(mapStateToProps)
@withRouter
class MenuLeft extends React.Component {
  state = {
    pathname: this.props.pathname,
    collapsed: this.props.collapsed,
    theme: this.props.theme,
    selectedKeys: '',
    openKeys: [''],
    settingsOpened: this.props.settingsOpened,
  };

  handleClick = (e) => {
    const {  isMobile } = this.props;
    if (isMobile) {
      // collapse menu on isMobile state
      dispatch.app.setLayoutState({ menuMobileOpened: false });
    }
    // set current selected keys
    this.setState({
      selectedKeys: e.key,
    });
  };

  onOpenChange = (openKeys) => {
    this.setState({
      openKeys,
    });
  };

  getPath(data, id, parents = []) {
    const { selectedKeys } = this.state;
    const items = data.reduce(
      (result, entry) => {
        if (result.length) {
          return result;
        } else if (entry.url === id && selectedKeys === '') {
          return [entry].concat(parents);
        } else if (entry.key === id && selectedKeys !== '') {
          return [entry].concat(parents);
        } else if (entry.children) {
          const nested = this.getPath(entry.children, id, [entry].concat(parents));
          return nested || result;
        }
        return result;
      },
      []
    );
    return items.length > 0 ? items : false;
  }

  getActiveMenuItem = (props, items) => {
    const { selectedKeys, pathname, openKeys } = this.state;
    const { collapsed } = props;
    let [activeMenuItem, ...path] = this.getPath(items, !selectedKeys ? pathname : selectedKeys);

    if (collapsed) {
      path = [''];
    }
    this.setState({
      selectedKeys: activeMenuItem ? activeMenuItem.key : '',
      openKeys: activeMenuItem ? path.map((entry) => entry.key) : openKeys,
      collapsed,
    });
  };

  generateMenuPartitions(items) {
    return items.map((menuItem) => {
      if (menuItem.children) {
        const subMenuTitle = (
          <span className="menuLeft__title-wrap" key={menuItem.key}>
            <span className="menuLeft__item-title">{menuItem.title}</span>
            {menuItem.icon && <span className={`${menuItem.icon} menuLeft__icon`} />}
          </span>
        );
        return (
          <SubMenu title={subMenuTitle} key={menuItem.key}>
            {this.generateMenuPartitions(menuItem.children)}
          </SubMenu>
        );
      }
      return this.generateMenuItem(menuItem);
    });
  }

  generateMenuItem(item) {
    const { key, title, url, icon, disabled } = item;
    return item.divider ? (
      <Divider key={Math.random()} />
    ) : item.url ? (
      <Menu.Item key={key} disabled={disabled}>
        <Link
          to={url}
          onClick={
            this.props.isMobile
              ? () => {
                  dispatch.app.setLayoutState({ menuCollapsed: false });
                }
              : undefined
          }
        >
          <span className="menuLeft__item-title">{title}</span>
          {icon && <span className={`${icon} menuLeft__icon`} />}
        </Link>
      </Menu.Item>
    ) : (
      <Menu.Item key={key} disabled={disabled}>
        <span className="menuLeft__item-title">{title}</span>
        {icon && <span className={`${icon} menuLeft__icon`} />}
      </Menu.Item>
    );
  }

  onCollapse = (value, type) => {
    const { collapsed } = this.state;
    if (type === 'responsive' && collapsed) {
      return;
    }
    dispatch.app.setLayoutState({ menuCollapsed: !collapsed });
  };

  componentDidMount() {
    this.getActiveMenuItem(this.props, menuData);
  }

  componentWillReceiveProps(newProps) {
    this.setState(
      {
        selectedKeys: '',
        pathname: newProps.pathname,
        theme: newProps.theme,
        settingsOpened: newProps.settingsOpened,
      },
      () => {
        if (!newProps.isMobile) {
          this.getActiveMenuItem(newProps, menuData);
        }
      }
    );
  }

  render() {
    const { collapsed, selectedKeys, openKeys, theme } = this.state;
    const { isMobile } = this.props;
    const menuItems = this.generateMenuPartitions(menuData);
    const paramsMobile = {
      width: 256,
      collapsible: false,
      collapsed: false,
      onCollapse: this.onCollapse,
    };
    const paramsDesktop = {
      width: 256,
      collapsible: true,
      collapsed,
      onCollapse: this.onCollapse,
      breakpoint: 'lg',
    };
    const params = isMobile ? paramsMobile : paramsDesktop;
    return (
      <Sider {...params} className="menuLeft">
        <div className="menuLeft__logo">
          {params.collapsed ? (
            <div className="menuLeft__logoContainer menuLeft__logoContainer--collapsed">
              <img src="resources/images/logo-inverse-mobile.png" alt="" />
            </div>
          ) : (
            <div className="menuLeft__logoContainer">
              <img src="resources/images/logo-inverse.png" alt="" />
            </div>
          )}
        </div>
        <Scrollbars
          autoHide
          style={{
            height: isMobile ? 'calc(100vh - 64px)' : 'calc(100vh - 112px)',
          }}
        >
          <Menu
            theme={theme}
            onClick={this.handleClick}
            selectedKeys={[selectedKeys]}
            openKeys={openKeys}
            onOpenChange={this.onOpenChange}
            mode="inline"
            className="menuLeft__navigation"
          >
            {menuItems}
          </Menu>
        </Scrollbars>
      </Sider>
    );
  }
}

export { MenuLeft, menuData };