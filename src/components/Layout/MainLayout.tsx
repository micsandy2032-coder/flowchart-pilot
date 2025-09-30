import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Badge, Avatar, Dropdown, Button, Space } from 'antd';
import {
  DashboardOutlined,
  CheckSquareOutlined,
  BarChartOutlined,
  CalendarOutlined,
  TeamOutlined,
  BellOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import logo from '@/assets/cf-logo.jpg';

const { Header, Sider, Content } = Layout;

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [notifications] = useState(3);

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: '/tasks',
      icon: <CheckSquareOutlined />,
      label: <Link to="/tasks">Tasks</Link>,
    },
    {
      key: '/gantt',
      icon: <CalendarOutlined />,
      label: <Link to="/gantt">Gantt Chart</Link>,
    },
    {
      key: '/analytics',
      icon: <BarChartOutlined />,
      label: <Link to="/analytics">Analytics</Link>,
    },
    {
      key: '/team',
      icon: <TeamOutlined />,
      label: <Link to="/team">Team</Link>,
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="bg-primary shadow-lg"
        theme="dark"
      >
        <div className="flex items-center justify-center h-16 border-b border-primary-hover">
          {!collapsed ? (
            <img src={logo} alt="Compliance First" className="h-10 object-contain" />
          ) : (
            <div className="text-accent text-2xl font-bold">CF</div>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="bg-primary border-r-0"
        />
      </Sider>
      <Layout>
        <Header className="bg-white shadow-sm px-6 flex items-center justify-between">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-lg"
          />
          <Space size="large">
            <Badge count={notifications} offset={[-5, 5]}>
              <Button
                type="text"
                icon={<BellOutlined className="text-xl" />}
                className="flex items-center justify-center"
              />
            </Badge>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                <Avatar icon={<UserOutlined />} className="bg-accent" />
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-foreground">John Admin</div>
                  <div className="text-xs text-muted-foreground">Admin</div>
                </div>
              </div>
            </Dropdown>
          </Space>
        </Header>
        <Content className="m-6 p-6 bg-background rounded-lg">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
