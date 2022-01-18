//react imports
import { useState } from 'react';
import { Link } from 'react-router-dom'

//antd imports
import 'antd/dist/antd.min.css';
import { Layout, Menu } from 'antd';
import {
  PieChartOutlined,
  TeamOutlined,
  UserSwitchOutlined,
  BankOutlined,
  SettingOutlined
} from '@ant-design/icons';

//styles import
import './styles.css'

type CompaniesProps = {
  id: number;
  name: string;
}

type UnitsProps = {
  companyId: number;
  id: number;
  name: string;
}

type UsersProps = {
  companyId: number;
  email: string;
  id: number;
  name: string;
  unitId: number;
}

type mainConfigProps = {
  type: string;
  id: number;
  name: string;
}

type NavBarProps = {
  Units: UnitsProps[];
  Companies: CompaniesProps[];
  Users: UsersProps[];
  handleClick: (props: mainConfigProps) => void;
};

export default function NavBar(props: NavBarProps) {
  const [Collapsed, setCollapsed] = useState(false);

  const generateLists = (data: CompaniesProps[] | UnitsProps[] | UsersProps[], type: string) => {
    return (data.map((element: UsersProps | UnitsProps | CompaniesProps | any, key: number) => {
      const filterData = {
        type: type,
        name: element.name,
        email: type === "Users" ? element.email : undefined,
        id: element.id
      }
      return (<Menu.Item onClick={() => { props.handleClick(filterData) }} key={"menuItem" + element.name + key}>{element.name}</Menu.Item>)
    })
    );
  }

  const mainConfig = {
    "type": "undefined", "id": 0, "name": "undefined"
  };

  return (
    <>
      <Layout.Sider collapsible collapsed={Collapsed} onCollapse={setCollapsed}>
        <img alt="Tractian" src="./images/Logo-Tractian.svg" className={Collapsed === false ? "logo" : "logo_minified"} />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="homeKey" icon={<PieChartOutlined />}>
            <Link onClick={() => { props.handleClick(mainConfig) }} key="home" to="/">Inicio</Link>
          </Menu.Item>
          <Menu.SubMenu key="sub1" icon={<TeamOutlined />} title="Empresas">
            {generateLists(props.Companies, "Companies")}
          </Menu.SubMenu>
          <Menu.SubMenu key="sub2" icon={<BankOutlined />} title="Unidades">
            {generateLists(props.Units, "Units")}
          </Menu.SubMenu>
          <Menu.SubMenu key="sub3" icon={<UserSwitchOutlined />} title="Usuarios">
            {generateLists(props.Users, "Users")}
          </Menu.SubMenu>
          <Menu.Item key="configKey" icon={<SettingOutlined />}>
            <Link key="config" to="/settings">Configurações</Link>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    </>
  )
}