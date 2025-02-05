import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/" className="tab-button">Main</Link>
      <Link to="/mixes" className="tab-button">Mixes</Link>
      <Link to="/table" className="tab-button">Table</Link>
      <Link to="/regular" className="tab-button">Regular</Link>
      <Link to="/cards" className="tab-button">Cards</Link>
      <Link to="/workers" className="tab-button">Workers</Link>
    </div>
  );
};

export default Sidebar;