import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Mixes from './pages/Mixes';
import { TableApp } from './pages/Table';
import Regular from './pages/Regular';
import Cards from './pages/Cards';
import Workers from './pages/Workers';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import Layout from './components/Layout';
import Events from './pages/Events';

// Функция для проверки аутентификации пользователя
const isAuthenticated = () => !!localStorage.getItem('token');

// Приватный маршрут: если пользователь аутентифицирован, отображаем Outlet (дочерние маршруты),
// иначе перенаправляем на страницу входа
const PrivateRoute = () => (isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />);

const App = () => {
  return (
    <Routes>
      {/* Публичный маршрут для страницы входа */}
      <Route path="/login" element={<LoginPage />} />

      {/* Приватные маршруты, доступные только аутентифицированным пользователям */}
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mixes" element={<Mixes />} />
          <Route path="/table" element={<TableApp />} />
          <Route path="/regular" element={<Regular />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/events" element={<Events />} />
        </Route>
      </Route>

      {/* Маршрут по умолчанию: перенаправление на /home, если пользователь аутентифицирован,
          и на /login, если нет */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated() ? '/home' : '/login'} replace />}
      />
    </Routes>
  );
};

export default App;