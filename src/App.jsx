import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Mixes from './pages/Mixes';
import { TableApp } from './pages/Table'; // Импортируем TableApp из Table.jsx
import Regular from './pages/Regular';
import Cards from './pages/Cards';
import Workers from './pages/Workers';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import Layout from './components/Layout';
import Events from './pages/Events';

const isAuthenticated = () => !!localStorage.getItem('token');

function PrivateRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}

function MainApp() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mixes" element={<Mixes />} />
          <Route path="/table" element={<TableApp />} /> {/* Используем TableApp здесь */}
          <Route path="/regular" element={<Regular />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/events" element={<Events />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to={isAuthenticated() ? "/home" : "/login"} replace />} />
    </Routes>
  );
}

export default MainApp;