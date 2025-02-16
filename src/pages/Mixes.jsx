/* import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Dashboard from '../components/Dashboard';
import LocationSelect from '../components/LocationSelect';
import EmployeeList from '../components/EmployeeList';
import RegularsList from '../components/RegularsList';
import EventsList from '../components/EventsList';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

// src/pages/Mixes.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Mixes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Редирект на LocationSelect
    navigate('/location-select/home'); // Пример маршрута
  }, [navigate]);

  return null; // Можно оставить пустым, так как это только редирект.
};

export default Mixes;

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/location-select/:type" element={<LocationSelect />} />
          <Route path="/employees/:location" element={<EmployeeList />} />
          <Route path="/regulars/:location" element={<RegularsList />} />
          <Route path="/events/:location" element={<EventsList />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;

*/