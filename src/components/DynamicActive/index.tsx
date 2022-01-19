import { useState, useEffect, useContext } from 'react'

import 'antd/dist/antd.min.css';
import { Layout, Breadcrumb, Typography, Image, Row, Col, Descriptions, Divider } from 'antd';

import { DataContext } from '../../dataContext'
import GaugeChart from '../GaugeChart';

type DynamicActiveProps = {
  id: number;
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
}

export default function DynamicActive(props: DynamicActiveProps) {
  const mainData = useContext(DataContext)
  const [data, setData] = useState<dataProps>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const selectedData = mainData.filter((value) => {
      return value.id === props.id;
    });
    setData(selectedData[0]);
    setLoading(false);
  }, [mainData, props]);

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
              <Descriptions.Item label="Data da Ultima coleta">{data?.metrics.lastUptimeAt}</Descriptions.Item>
            </Descriptions>

          </Col>
        </Row>
      </div>
    </Layout.Content>
    <Layout.Footer style={{ textAlign: 'center' }}>Sistema desenvolvido e fornecido por TRACTIAN</Layout.Footer>
  </Layout>

  )
}