import { useState, useEffect } from 'react';

import 'antd/dist/antd.min.css';
import { Layout, Breadcrumb, Col, Row, Alert } from 'antd';
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

type inicioProps = {
  filteredData: {
    type: string;
    name: string;
    email?: string;
    id: number;
  }
}

export default function Inicio(props: inicioProps) {
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
      <Row justify="space-between">
        {data.map((card, index) => {
          return (
            <Col key={index}>
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

  const filteredPlot = () => {
    return (props.filteredData.type === "undefined" ? <></>
      : <Alert
        message={props.filteredData.type === "Companies" ? "Busca realizada por empresa: "
          + props.filteredData.name : props.filteredData.type === "Units"
          ? "Busca realizada por unidades: " + props.filteredData.name
          : "Busca realizada por usuários: " + props.filteredData.name + " Email: " + props.filteredData.email
        }
        type="info" />);
  }

  useEffect(() => {
    api.get("assets").then((response) => {
      const arr = response.data.filter((value: any) => {
        if (props.filteredData.type === "Companies") {
          return value.companyId === props.filteredData.id;
        } else if (props.filteredData.type === "Units") {
          return value.unitId === props.filteredData.id;
        } else {
          return value;
        }
      })
      setData(arr);
    });
    // api.post("assets", temp).then((response) => {
    //   const arr = data;
    //   arr.push(response.data);
    //   setData(arr);
    // });
  }, [props.filteredData]);

  return (
    <>
      <Layout className="site-layout">
        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
        <Layout.Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Inicio</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {filteredPlot()}
            {generateCardGroup()}
          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>Sistema desenvolvido e fornecido por TRACTIAN</Layout.Footer>
      </Layout>

    </>)
}