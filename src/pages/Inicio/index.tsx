import { useState, useEffect, useContext } from 'react';

import 'antd/dist/antd.min.css';
import { Layout, Breadcrumb, Col, Row, Alert, Descriptions, Divider } from 'antd';

import CardData from '../../components/CardData';
import PieChart from '../../components/PieChart';

import { DataContext } from '../../dataContext';

type dataProps = {
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
  userId?: number;
}

type inicioProps = {
  filteredData: {
    type: string;
    name: string;
    email?: string;
    id: number;
  },
  counter: {
    companiesCounter: number;
    usersCounter: number;
    unitsCounter: number;
  }
}

type pieChartData = {
  name: string;
  y: number;
  color: string;
}

export default function Inicio(props: inicioProps) {
  const mainData = useContext(DataContext);
  const [dataAux, setDataAux] = useState<dataProps[]>([{
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
  const [pieChartData, setPieChartData] = useState<pieChartData[]>([
    { name: "undefined", y: 0, color: "#0000" },
    { name: "undefined", y: 0, color: "#0000" },
    { name: "undefined", y: 0, color: "#0000" }
  ]);

  const generateCardGroup = () => {
    return (
      <Row >
        {dataAux.map((card, index) => {
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
          : "Busca realizada por usu??rios: " + props.filteredData.name + " Email: " + props.filteredData.email
        }
        type="info" />);
  }

  const chartUpdate = (props: dataProps[]) => {
    const counterInAlert = props.filter(x => x.status === "inAlert").length;
    const counterInOperation = props.filter(x => x.status === "inOperation").length;
    const counterInDowntime = props.filter(x => x.status === "inDowntime").length;

    setPieChartData([{ name: "Em Alerta", y: counterInAlert, color: "#e0a72d" },
    { name: "Em Opera????o", y: counterInOperation, color: "#34eb37" },
    { name: "Em Parada", y: counterInDowntime, color: "#e02d2d" }]);
  }

  useEffect(() => {
    const arr: dataProps[] = mainData.filter((value) => {
      if (props.filteredData.type === "Companies") {
        return value.companyId === props.filteredData.id;
      } else if (props.filteredData.type === "Units") {
        return value.unitId === props.filteredData.id;
      } else if (props.filteredData.type === "Users") {
        return value.userId === props.filteredData.id;
      } else {
        return value;
      }
    })
    setDataAux(arr);
    chartUpdate(arr)
  }, [props.filteredData, mainData]);

  useEffect(() => {
    setDataAux(mainData); chartUpdate(mainData)
  }, [mainData]);

  return (
    <>
      <Layout className="site-layout">
        <Layout.Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Inicio</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {filteredPlot()}
            <Row>
              <Col span={13}><PieChart title="Situa????o dos Ativos" dataName="Ativo" data={pieChartData} /></Col>
              <Col span={1}><Divider type="vertical" /></Col>
              <Col span={10}>
                <Descriptions
                  title="Descri????o do sistema cadastrado at?? o momento"
                  bordered
                  column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                >
                  <Descriptions.Item label="Quantidade Absoluta de Empresas">{props.counter.companiesCounter}</Descriptions.Item>
                  <Descriptions.Item label="Quantidade Absoluta de Unidades">{props.counter.unitsCounter}</Descriptions.Item>
                  <Descriptions.Item label="Quantidade Absoluta de Usu??rios">{props.counter.usersCounter}</Descriptions.Item>
                  <Descriptions.Item label="Quantidade de Em Parada">{pieChartData[0].y}</Descriptions.Item>
                  <Descriptions.Item label="Quantidade de Em Alerta">{pieChartData[1].y}</Descriptions.Item>
                  <Descriptions.Item label="Quantidade de Em Opera????o">{pieChartData[2].y}</Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
            {generateCardGroup()}
          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>Sistema desenvolvido e fornecido por TRACTIAN</Layout.Footer>
      </Layout>
    </>)
}