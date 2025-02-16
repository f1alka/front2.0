import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Users, User, Calendar } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 800px;
  width: 100%;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  font-size: 18px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

function Dashboard() {
  const navigate = useNavigate();

  return (
    <Container>
      <h1 style={{ marginBottom: '40px', fontSize: '32px' }}>Админ панель</h1>
      <ButtonGrid>
        <Button onClick={() => navigate('/location-select/employees')}>
          <Users size={24} />
          Работники
        </Button>
        <Button onClick={() => navigate('/location-select/regulars')}>
          <User size={24} />
          Постоянники
        </Button>
        <Button onClick={() => navigate('/location-select/events')}>
          <Calendar size={24} />
          События
        </Button>
      </ButtonGrid>
    </Container>
  );
}

export default Dashboard;