import React, { useState } from 'react';
import './css/work.css';
import mainImage1 from './nikolskaya.jpg';
import mainImage2 from './prospekt_mira.jpg';
import mainImage3 from './strast.jpg'

const EmployeeCard = ({ employee, onClick }) => {
  return (
    <div className="employee-card" onClick={onClick}>
      <div className="employee-image">
        <img src={employee.image} alt={employee.name} />
      </div>
      <h3>{employee.name}</h3>
      <p className="employee-position">{employee.position}</p>
    </div>
  );
};

const EmployeeModal = ({ employee, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="employee-modal" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <div className="modal-content">
          <img src={employee.image} alt={employee.name} />
          <h2>{employee.name}</h2>
          <p className="position">{employee.position}</p>
          <p className="description">{employee.description}</p>
        </div>
      </div>
    </div>
  );
};

const locations = [
  {
    id: 1,
    name: 'Страстной бульвар',
    image: mainImage3,
    description: 'Уютное кафе в центре города'
  },
  {
    id: 2,
    name: 'Проспект мира',
    image: mainImage2,
    description: 'Современное пространство с панорамными окнами'
  },
  {
    id: 3,
    name: 'Никольская',
    image: mainImage1,
    description: 'Историческое место с особой атмосферой'
  }
];

const positions = [
  'Все должности',
  'Бармен',
  'Кальянщик',
  'Официант',
  'Хостес',
  'Управляющий',
  'Повар'
];

const employees = [
  {
    id: 1,
    name: 'Иван Петров',
    position: 'Бармен',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    description: 'Профессиональный бармен с 5-летним опытом. Специализируется на авторских коктейлях.',
    location: 'Арбат'
  },
  {
    id: 2,
    name: 'Мария Иванова',
    position: 'Хостес',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    description: 'Приветливая и внимательная хостес. Владеет английским и испанским языками.',
    location: 'Проспект мира'
  },
  {
    id: 3,
    name: 'Алексей Смирнов',
    position: 'Управляющий',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    description: 'Опытный управляющий. Успешно руководит командой из 20 человек.',
    location: 'Никольская'
  },
  {
    id: 4,
    name: 'Екатерина Соколова',
    position: 'Официант',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    description: 'Внимательный и быстрый официант. Любит свою работу и всегда улыбается гостям.',
    location: 'Арбат'
  },
  {
    id: 5,
    name: 'Дмитрий Козлов',
    position: 'Повар',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    description: 'Шеф-повар с международным опытом. Специализируется на итальянской кухне.',
    location: 'Проспект мира'
  },
  {
    id: 6,
    name: 'Анна Морозова',
    position: 'Кальянщик',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    description: 'Опытный кальянщик. Создает уникальные миксы вкусов.',
    location: 'Никольская'
  }
];

const LocationModal = ({ onSelectLocation }) => {
  return (
    <div className="location-modal">
      <h1>Выберите локацию</h1>
      <div className="location-grid">
        {locations.map((location) => (
          <div
            key={location.id}
            className="location-card"
            onClick={() => onSelectLocation(location)}
          >
            <img src={location.image} alt={location.name} />
            <div className="location-info">
              <h2>{location.name}</h2>
              <p>{location.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EmployeeList = ({ selectedLocation, onBackClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('Все должности');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const filteredEmployees = employees.filter(employee => {
    const matchesLocation = employee.location === selectedLocation.name;
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = selectedPosition === 'Все должности' || employee.position === selectedPosition;
    return matchesLocation && matchesSearch && matchesPosition;
  });

  return (
    <div className="employee-list">
      <div className="header">
        <button className="back-button" onClick={onBackClick}>
          ← Назад к выбору локации
        </button>
        <h2>{selectedLocation.name}</h2>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Поиск по имени"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
        >
          {positions.map(position => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
        </select>
      </div>

      <div className="employees-grid">
        {filteredEmployees.map(employee => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onClick={() => setSelectedEmployee(employee)}
          />
        ))}
      </div>

      {selectedEmployee && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
};

const App = () => {
  const [showLocationModal, setShowLocationModal] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationModal(false);
  };

  const handleBackClick = () => {
    setShowLocationModal(true);
    setSelectedLocation(null);
  };

  return (
    <div className="app">
      {showLocationModal ? (
        <LocationModal onSelectLocation={handleLocationSelect} />
      ) : (
        <EmployeeList 
          selectedLocation={selectedLocation} 
          onBackClick={handleBackClick}
        />
      )}
    </div>
  );
};

export default App;