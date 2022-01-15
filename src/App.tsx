import { Route, Routes } from 'react-router-dom';

import './App.css'

import Ativos from './pages/Ativos';
import Empresas from './pages/Empresas';
import ErrorPage from './pages/ErrorPage';
import Inicio from './pages/Inicio'
import Unidades from './pages/Unidades';
import Usuarios from './pages/Usuarios';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/ativos" element={<Ativos />} />
        <Route path="/empresas" element={<Empresas />} />
        <Route path="/unidades" element={<Unidades />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
