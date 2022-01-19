import 'antd/dist/antd.min.css';
import { Card, Typography } from 'antd';
import { AiOutlineSetting } from 'react-icons/ai'
import './style.css'
import { Link } from 'react-router-dom';

type CardDataProps = {
  altImg: string;
  srcImg: string;
  title: string;
  status: string;
  url: string;
};

export default function CardData(props: CardDataProps) {

  return (
    <Card
      className="cardStyle"
      style={{ width: 200 }}
      cover={<img className="imgCard" alt={props.altImg} src={props.srcImg} />}
      actions={
        [<Link to={props.url}>
          <AiOutlineSetting /> <span>Gerenciar</span>
        </Link>]
      }
    >
      <Card.Meta
        title={props.title}
        description={props.status === "inAlert" ?
          <Typography.Text type="warning">Em Alerta</Typography.Text>
          : props.status === "inOperation"
            ? <Typography.Text type="success">Em Operação</Typography.Text>
            : <Typography.Text type="danger">Em Parada</Typography.Text>}
      />
    </Card>
  );
}