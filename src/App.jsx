import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Mixes from './pages/Mixes';
import Table from './pages/Table';
import Regular from './pages/Regular';
import Cards from './pages/Cards';
import Workers from './pages/Workers';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import Layout from './components/Layout';
import './styles.css';

const isAuthenticated = () => !!localStorage.getItem('token');

function PrivateRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Защищенные маршруты */}
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mixes" element={<Mixes />} />
          <Route path="/table" element={<Table />} />
          <Route path="/regular" element={<Regular />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/workers" element={<Workers />} />
        </Route>
      </Route>

      {/* Перенаправление для несуществующих маршрутов */}
      <Route path="*" element={<Navigate to={isAuthenticated() ? "/home" : "/login"} replace />} />
    </Routes>
  );
}

export default App;
