import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 40px 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  font-size: 32px;
  color: #fff;
`;

const LocationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const LocationCard = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const LocationImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LocationName = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  font-size: 24px;
  text-align: center;
`;

const locations = [
  {
    id: 'arbat',
    name: 'Арбат',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5'
  },
  {
    id: 'prospekt-mira',
    name: 'Проспект мира',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'
  },
  {
    id: 'nikolskaya',
    name: 'Никольская',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b'
  }
];

function LocationSelect() {
  const navigate = useNavigate();
  const { type } = useParams();

  const handleLocationSelect = (locationId) => {
    navigate(`/${type}/${locationId}`);
  };

  return (
    <Container>
      <Title>Выберите локацию</Title>
      <LocationGrid>
        {locations.map((location) => (
          <LocationCard
            key={location.id}
            onClick={() => handleLocationSelect(location.id)}
          >
            <LocationImage src={location.image} alt={location.name} />
            <LocationName>{location.name}</LocationName>
          </LocationCard>
        ))}
      </LocationGrid>
    </Container>
  );
}

export default LocationSelect;