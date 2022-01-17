import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Layout } from 'antd';
import './App.css'

import ErrorPage from './pages/ErrorPage';
import Inicio from './pages/Inicio'

import NavBar from './components/NavBar';


import { api } from './services/api';
import axios from 'axios';

type CompaniesProps = [{
  id: number;
  name: string;
}]

type UnitsProps = [{
  companyId: number;
  id: number;
  name: string;
}]

type UsersProps = [{
  companyId: number;
  email: string;
  id: number;
  name: string;
  unitId: number;
}]

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

function App() {
  const [Units, setUnits] = useState<UnitsProps>([{ "companyId": 1, "id": 1, "name": "testando" }]);
  const [Companies, setCompanies] = useState<CompaniesProps>([{ "id": 1, "name": "teste" }]);
  const [Users, setUsers] = useState<UsersProps>([{ "companyId": 1, "email": "emailteste@gmail.com", "id": 1, "name": "Usuario teste", "unitId": 1 }]);
  const [DataFilter, setDataFilter] = useState<DataFilterProps>({ "type": "undefined", "id": 0, "name": "undefined" });
  const [Counter, setCounter] = useState<counterProps>({ companiesCounter: 0, usersCounter: 0, unitsCounter: 0 });

  useEffect(() => {
    const reqUnits = api.get("units");
    const reqCompanies = api.get("companies");
    const reqUsers = api.get("users");
    axios.all([reqUnits, reqCompanies, reqUsers]).then(axios.spread((...responses) => {
      setUnits(responses[0].data);
      setCompanies(responses[1].data);
      setUsers(responses[2].data);
      setCounter({
        unitsCounter: responses[0].data.length,
        companiesCounter: responses[1].data.length,
        usersCounter: responses[2].data.length
      })
    }));
  }, [])

  function handleClick(filter: DataFilterProps) {
    setDataFilter(filter);
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavBar Units={Units} Companies={Companies} Users={Users} handleClick={handleClick} />
      <Routes>
        <Route path="/" element={<Inicio counter={Counter} filteredData={DataFilter} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
