import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Layout } from 'antd';
import './App.css'

import ErrorPage from './pages/ErrorPage';
import Inicio from './pages/Inicio'
import Config from './pages/Config';

import NavBar from './components/NavBar';
import DynamicActive from './components/DynamicActive';

import { api } from './services/api';
import axios from 'axios';

import { DataContext } from './dataContext'

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

type DataFilterProps = {
  type: string;
  name: string;
  email?: string;
  id: number;
}

type counterProps = {
  companiesCounter: number;
  usersCounter: number;
  unitsCounter: number;
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

function App() {
  const [Units, setUnits] = useState<UnitsProps[]>([{ "companyId": 1, "id": 1, "name": "testando" }]);
  const [Companies, setCompanies] = useState<CompaniesProps[]>([{ "id": 1, "name": "teste" }]);
  const [Users, setUsers] = useState<UsersProps[]>([{ "companyId": 1, "email": "emailteste@gmail.com", "id": 1, "name": "Usuario teste", "unitId": 1 }]);
  const [DataFilter, setDataFilter] = useState<DataFilterProps>({ "type": "undefined", "id": 0, "name": "undefined" });
  const [Counter, setCounter] = useState<counterProps>({ companiesCounter: 0, usersCounter: 0, unitsCounter: 0 });
  const [data, setData] = useState<dataProps[]>([{
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
  const [isLoading, setLoading] = useState<boolean>(true);
  const [UnitRoutes, setUnitRoutes] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const reqUnits = api.get("units");
    const reqCompanies = api.get("companies");
    const reqUsers = api.get("users");
    const reqDB = api.get("assets");
    axios.all([reqUnits, reqCompanies, reqUsers, reqDB]).then(axios.spread((...responses) => {
      setUnits(responses[0].data);
      setCompanies(responses[1].data);
      setUsers(responses[2].data);
      setData(responses[3].data);
      setCounter({
        unitsCounter: responses[0].data.length,
        companiesCounter: responses[1].data.length,
        usersCounter: responses[2].data.length
      })
      const arr: JSX.Element[] = [];
      responses[3].data.map((item: dataProps) => {
        return arr.push(<Route key={"ativos/" + item.id} path={"ativos/" + item.id}
          element={<DynamicActive
            id={item.id}
          />}
        />);
      })
      setUnitRoutes(arr);
      setLoading(false);
    }));
  }, [])

  function handleClickFilter(filter: DataFilterProps) {
    setDataFilter(filter);
  }

  return (isLoading === true ? <></> :
    <DataContext.Provider value={data}>
      <Layout style={{ minHeight: '100vh' }}>
        <NavBar
          Units={Units}
          Companies={Companies}
          Users={Users}
          handleClick={handleClickFilter}
        />
        <Routes>
          <Route path="/" element={<Inicio counter={Counter} filteredData={DataFilter} />} />
          <Route path="/settings" element={<Config />} />
          <Route path="*" element={<ErrorPage />} />
          {UnitRoutes}
        </Routes>
      </Layout>
    </DataContext.Provider>)
}

export default App;
