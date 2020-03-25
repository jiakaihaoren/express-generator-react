import React, { useState, useEffect } from 'react';
import {
  Switch, Route, Link, useLocation,
} from 'react-router-dom';
import {
  Layout, Menu, Button,
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import './App.css'
import Error from './components/error';
import Login from './components/login'
import Days from './components/days'
import SpinLoader from './components/spinLoader'
import { usersLogout } from './api/users'

const { Header, Sider, Content } = Layout;

function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('/')// 被选中的Menu Item
  const location = useLocation();
  useEffect(() => {
    setSelectedMenuItem(location.pathname)
  }, [location])
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const toggle = () => {
    setCollapsed(!collapsed)
  };
  const logout = () => {
    usersLogout()
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className="App">
      <SpinLoader />
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['/']} selectedKeys={[selectedMenuItem]}>
            <Menu.Item key="/">
              <Link to="/">
                <UserOutlined />
                <span>Home</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/days">
              <Link to="/days"><VideoCameraOutlined />
                <span>Days</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <UploadOutlined />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => { toggle() },
            })}
            <Button style={{ position: 'absolute', top: '15px', right: '30px' }} onClick={() => { logout() }}>登出</Button>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route path="/days">
                <Days />
              </Route>
              <Route path="/*">
                <Error />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
