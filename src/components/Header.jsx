import React from 'react';

const Header = ({ title, subtitle, children }) => {
  return (
    <header className="header">
      <div className="header-title">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
      <div className="header-actions">
        {children} {/* Здесь рендерится кнопка Личного кабинета */}
      </div>
    </header>
  );
};

export default Header;
