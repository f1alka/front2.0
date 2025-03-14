import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css'; 
import logo from './336b74cb5c.png'; 
import cab from './People-512.webp';

const Sidebar = () => {
  return (
    <>
      <div className="topbar">
        <nav className="nav-menu">
          <Link to="/" className="tab-button">
            <img src={logo} alt="Главная" className="logo-image" />
          </Link>
          <Link to="/mixes" className="tab-button">Админ-панель</Link>
          <Link to="/table" className="tab-button">Расписание</Link>
          <Link to="/events" className="tab-button">Мероприятия</Link>
          <Link to="/regular" className="tab-button">Постоянники</Link>
          <Link to="/cards" className="tab-button">Методички</Link>
          <Link to="/workers" className="tab-button">Работники</Link>
          <Link to="/profile" className="tab-button">
            <img src={cab} alt="Личный кабинет" className="cab-image" />
          </Link>
        </nav>
        <div className="gradient-strip"></div>
      </div>
    </>
  );
};

export default Sidebar;

