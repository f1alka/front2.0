import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        {/* Здесь убираем Header, он больше не рендерится */}
        <Outlet /> {/* Здесь будут рендериться дочерние страницы */}
      </div>
    </div>
  );
};

export default Layout;
