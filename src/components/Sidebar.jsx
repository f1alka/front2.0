import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css'; // Подключаем стили

const Sidebar = () => {
  return (
    <div className="topbar"> {/* Меняем класс для верхнего меню */}
      <nav className="nav-menu">
        <Link to="/" className="tab-button">Главная</Link>
        <Link to="/mixes" className="tab-button">Миксы</Link>
        <Link to="/table" className="tab-button">Расписание</Link>
        <Link to="/regular" className="tab-button">Постоянники</Link>
        <Link to="/cards" className="tab-button">Методички</Link>
        <Link to="/workers" className="tab-button">Работники</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
