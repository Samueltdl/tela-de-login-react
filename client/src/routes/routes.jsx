import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Proteção das rotas
import PrivateRoutes from './privateRoutes';

//Páginas
import Login from '../pages/login';
import Home from '../pages/home';

const Routering = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<PrivateRoutes> <Home /> </PrivateRoutes>} />
        </Routes>
    </Router>
  );
}

export default Routering;