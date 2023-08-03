import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';

import "./layout.css"

import { menus } from "./layout.config.js"

import { Route } from "dva/router"

import BannerManage from "../pages/bannerManage/bannerManage"
import ActivityManage from "../pages/activityManage/activityManage"
import RegisterUser from "../pages/registerUser/registerUser"
import AdminUser from "../pages/adminUser/adminUser"

import { MenuInfo } from "rc-menu/lib/interface"

import { useHistory } from "dva"

const { Header, Sider, Content } = Layout;


const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const history = useHistory()

  const linkPage = ({ key }: MenuInfo) => {
    history.push(key)
  }

  const logout = () => {
    history.push('/login')
  }

  return (
    <Layout id="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" > 聚梦者 </div>
        <Menu
          theme="dark"
          mode="inline"
          items={menus}
          onClick={linkPage}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className='header-box'>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Button className='header-btn' type='link' onClick={logout}>退出登录</Button>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Route path="/bannerManage">
            <BannerManage></BannerManage>
          </Route>
          <Route path="/activityManage">
            <ActivityManage></ActivityManage>
          </Route>
          <Route path="/userManage/registerUser">
            <RegisterUser></RegisterUser>
          </Route>
          <Route path="/userManage/adminUser">
            <AdminUser></AdminUser>
          </Route>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;