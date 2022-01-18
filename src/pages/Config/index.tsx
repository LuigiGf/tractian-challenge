import 'antd/dist/antd.min.css';
import { Layout, Breadcrumb } from 'antd';

export default function Config() {

  return (
    <Layout className="site-layout">
      <Layout.Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Configurações</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        </div>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>Sistema desenvolvido e fornecido por TRACTIAN</Layout.Footer>
    </Layout>)
}