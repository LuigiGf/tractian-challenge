import { useState, useEffect } from 'react';

import 'antd/dist/antd.min.css';
import { Layout, Breadcrumb, Col, Row } from 'antd';
import './style.css'

import { api } from '../../services/api';
import CardData from '../../components/CardData';

type dataProps = [{
  id: number;
  sensors: string[];
  model: string;
  status: string;
  healthscore: number;
  name: string;
  image: string;
  specifications: {
    maxTemp: number;
  };
  metrics: {
    totalCollectsUptime: number;
    totalUptime: number;
    lastUptimeAt: string;
  };
  unitId: number;
  companyId: number;
}]

export default function Inicio() {
  const [data, setData] = useState<dataProps>([{
    "id": 1,
    "sensors": [
      "GSJ1535"
    ],
    "model": "motor",
    "status": "inAlert",
    "healthscore": 70,
    "name": "Motor H13D-1",
    "image": "https://tractian-img.s3.amazonaws.com/6d5028682016cb43d02b857d4f1384ae.jpeg",
    "specifications": {
      "maxTemp": 80
    },
    "metrics": {
      "totalCollectsUptime": 7516,
      "totalUptime": 1419.620084999977,
      "lastUptimeAt": "2021-02-16T16:17:50.180Z"
    },
    "unitId": 1,
    "companyId": 1
  }]);

  const generateCardGroup = () => {
    return (
      <Row className="site-card-wrapper" gutter={80}>
        {data.map((card, index) => {
          return (<Col span={6} key={index}>
            <CardData
              altImg={card.name}
              srcImg={card.image}
              title={card.name}
              status={card.status}
              url={"ativos/" + card.id}
            />
          </Col>)
        })}
      </Row>
    );
  }

  useEffect(() => {
    api.get("assets").then((response) => {
      setData(response.data);
    });
  }, []);
  return (
    <>
      <Layout className="site-layout">
        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
        <Layout.Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Inicio</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {generateCardGroup()}
          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Layout.Footer>
      </Layout>

    </>)
}