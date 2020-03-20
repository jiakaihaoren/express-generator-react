import React, { useState, useCallback } from 'react';
import {
  HashRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import { Spin, Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import './App.css'
import { useMappedState, IState } from './store';
import Error from './components/error';
import Login from './components/login'
import { useAxiosLoader } from './api/users'
import Days from './components/days'

const { Header, Sider, Content } = Layout;

function App() {
  // const { show } = useMappedState(
  //   useCallback(
  //     (state: IState) => ({
  //       show: state.show,
  //     }),
  //     [],
  //   ),
  // );
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const toggle = () => {
    setCollapsed(!collapsed)
  };
  const show = useAxiosLoader()// load状态hooks

  return (
    <Router>
      <div className="App">
        <div className="spin">
          <Spin size="large" spinning={show} />
        </div>

        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/">
                  <UserOutlined />
                  <span>Home</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
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

    </Router>
  );
}

export default App;
