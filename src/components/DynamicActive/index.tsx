import { useState, useEffect, useContext } from 'react'

import 'antd/dist/antd.min.css';
import {
  Layout,
  Breadcrumb,
  Typography,
  Image,
  Row,
  Col,
  Descriptions,
  Divider,
  Input,
  Cascader,
  Button,
} from 'antd';
import {
  TagOutlined,
  HddOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import "./style.css"

import { DataContext } from '../../dataContext'
import GaugeChart from '../GaugeChart';

type DynamicActiveProps = {
  id: number;
  companyList: [];
  unitList: [];
  userList: [];
  postReq: (data: dataProps[]) => void;
}

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

type changeDataProps = {
  name?: string;
  model?: string;
  sensor?: string;
  user?: number;
  company?: number;
  unit?: number;
}


export default function DynamicActive(props: DynamicActiveProps) {
  const mainData = useContext(DataContext)
  const [data, setData] = useState<dataProps>({
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
    "companyId": 1,
    "userId": 0
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [changeData, setChangeData] = useState<changeDataProps>();

  useEffect(() => {
    const selectedData = mainData.filter((value) => {
      return value.id === props.id;
    });
    setData(selectedData[0]);
    setLoading(false);
  }, [mainData, props.id]);

  const dateConverter = () => {
    const d = new Date(data?.metrics.lastUptimeAt === undefined ? "2015-03-25T12:00:00Z" : data.metrics.lastUptimeAt);
    const date = d.getDay() + "/" + d.getMonth() + "/" + d.getFullYear() + " - " + d.getHours() + ":" + d.getMinutes();
    return <div>{date}</div>;
  }

  const OptionsConverter = (data: CompaniesProps[] | UnitsProps[] | UsersProps[]) => {
    const arr: { value: number; label: string; }[] = [];
    data.map((val) => {
      return arr.push({ value: val.id, label: val.name });
    })
    return arr;
  }

  const updateValues = () => {
    const aux: dataProps = data;

    if (changeData?.company) {
      aux.companyId = changeData.company;
    }
    if (changeData?.model) {
      aux.model = changeData.model;
    }

    if (changeData?.name) {
      aux.name = changeData.name
    }

    if (changeData?.sensor) {
      aux.sensors[0] = changeData.sensor
    }

    if (changeData?.unit) {
      aux.unitId = changeData.unit
    }
    if (changeData?.user) {
      aux.userId = changeData.user
    }
    const arr: dataProps[] = mainData.filter((val) => { return val.id !== aux.id });
    arr.push(aux);
    setData(aux);
    props.postReq(arr);
  }

  return (loading === true ? <></> : <Layout className="site-layout">
    <Layout.Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Typography.Title level={1}>{data?.name}</Typography.Title>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Row gutter={24}>
          <Col span={12}><Image src={data?.image} height="20rem" alt={data?.name} /></Col>
          <Col span={12}>
            <Descriptions
              title="Detalhes gerais da Máquina"
              bordered
              column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
            >
              <Descriptions.Item label="Modelo">{data?.model}</Descriptions.Item>
              <Descriptions.Item label="Sensores">{data?.sensors}</Descriptions.Item>
              <Descriptions.Item label="Estado atual">
                <Typography.Text
                  type={data?.status === "inAlert" ? "warning" : data?.status === "inOperation"
                    ? "success" : "danger"}>
                  {data?.status === "inAlert" ? "Em Alerta" : data?.status === "inOperation"
                    ? "Em operação" : "Em Parada"}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label="Pontuação de Saúde">{data?.healthscore}%</Descriptions.Item>
              <Descriptions.Item label="Temperatura Máxima">{data?.specifications.maxTemp} °C</Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <Divider />
        <Row gutter={24}>
          <Col span={12}>
            <GaugeChart
              title="Situação Saúde Máquina"
              seriesName="Situação"
              seriesSuffix="%"
              data={data?.healthscore}
            />
          </Col>
          <Col span={12}>
            <Descriptions
              title="Detalhes de Coleta de dados"
              bordered
              column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
            >
              <Descriptions.Item label="Total de Coletas">{data?.metrics.totalCollectsUptime}</Descriptions.Item>
              <Descriptions.Item label="Total de Horas de Coleta">{Math.round(data?.metrics.totalUptime === undefined ? 0 : data?.metrics.totalUptime)}</Descriptions.Item>
              <Descriptions.Item label="Data da Ultima coleta">{dateConverter()}</Descriptions.Item>
            </Descriptions>

          </Col>
        </Row>
        <Divider />
        <Typography.Title level={2}>Alterar Configurações</Typography.Title>
        <div className="container">
          <Input onChange={(value) => { setChangeData({ ...changeData, name: value.target.value }) }} size="large" placeholder="Atualizar Nome" prefix={<TagOutlined />} />
          <Input onChange={(value) => { setChangeData({ ...changeData, model: value.target.value }) }} className="spacing" size="large" placeholder="Alterar Modelo" prefix={<HddOutlined />} />
          <Input onChange={(value) => { setChangeData({ ...changeData, sensor: value.target.value }) }} className="spacing" size="large" placeholder="Alterar Sensor" prefix={<DashboardOutlined />} />
          <Row className="spacing" justify="space-around">
            <Col><Cascader options={OptionsConverter(props.userList)} onChange={(value: any) => { setChangeData({ ...changeData, user: value }) }} placeholder="Delegar Responsável" /></Col>
            <Col><Cascader options={OptionsConverter(props.companyList)} onChange={(value: any) => { setChangeData({ ...changeData, company: value }) }} placeholder="Alterar Empresa" /></Col>
            <Col><Cascader options={OptionsConverter(props.unitList)} onChange={(value: any) => { setChangeData({ ...changeData, unit: value }) }} placeholder="Alterar Unidade" /></Col>
          </Row>
          <Button onClick={updateValues} className="spacing" type="primary">Atualizar Configurações</Button>
        </div>
      </div>
    </Layout.Content>
    <Layout.Footer style={{ textAlign: 'center' }}>Sistema desenvolvido e fornecido por TRACTIAN</Layout.Footer>
  </Layout>

  )
}