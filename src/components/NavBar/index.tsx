//react imports
import { useState } from 'react';
import { Link } from 'react-router-dom'

//antd imports
import 'antd/dist/antd.min.css';
import { Layout, Menu } from 'antd';
import {
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

//styles import
import './styles.css'

export default function NavBar() {
  const [Collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Layout.Sider collapsible collapsed={Collapsed} onCollapse={setCollapsed}>
        <img src="./images/Logo-Tractian.svg" className={Collapsed === false ? "logo" : "logo_minified"} />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link key="home" to="/">Inicio</Link>
          </Menu.Item>
          <Menu.SubMenu key="sub1" icon={<UserOutlined />} title="Ativos">
            <Menu.Item key="3"><Link key="ativos" to="/ativos">Tom </Link></Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="sub2" icon={<TeamOutlined />} title="Empresas">
            <Menu.Item key="menuItem1">Team 1</Menu.Item>
            <Menu.Item key="menuItem2">Team 2</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="sub3" icon={<TeamOutlined />} title="Unidades">
            <Menu.Item key="menuItem3">Team 1</Menu.Item>
            <Menu.Item key="menuItem4">Team 2</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="sub4" icon={<TeamOutlined />} title="Usuarios">
            <Menu.Item key="menuItem5">Team 1</Menu.Item>
            <Menu.Item key="menuItem6">Team 2</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    </>
  )
}