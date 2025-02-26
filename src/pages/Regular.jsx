/* import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import './css/card_res.css'; // Можно добавить стили для карточек

const Regular = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10; // Убрали setLimit

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        console.log(`Fetching data: page=${page}&limit=${limit}`);
        const response = await fetch(`http://172.20.10.2:8000/residents/get_list_residents?page=${page}&limit=${limit}`);

        if (!response.ok) throw new Error(`Ошибка: ${response.statusText}`);

        const data = await response.json();
        console.log('Data received:', data);

        const residentsWithPhotos = await Promise.all(
          data.map(async (resident) => {
            const photoUrl = await fetchPhotoUrl(resident.id);
            return { ...resident, photoUrl };
          })
        );

        setTableData(residentsWithPhotos);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(`Ошибка запроса: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, [page, limit]); // Добавили limit

  const filteredData = tableData.filter(row =>
    row.fio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchPhotoUrl = async (id) => {
    try {
      const response = await fetch(`http://172.20.10.2:8000/files/residents/${id}/get-photo`);
      if (!response.ok) throw new Error(`Ошибка: ${response.statusText}`);

      const photoData = await response.json();
      return photoData.status === 'success' && photoData.file_url ? photoData.file_url.url : null;
    } catch (err) {
      console.error('Error fetching photo:', err);
      return null;
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <Header title="HookahPlace Futura" subtitle="Список постоянных клиентов" />
        <section className="content">
          <h2>Список постоянных клиентов</h2>

          <div className="search-container">
            <SearchBar onSearch={setSearchTerm} />
          </div>

          <div className="card-container">
            {filteredData.map((row, index) => (
              <div key={index} className="card">
                <div className="card-photo">
                  <img 
                    src={row.photoUrl || 'default-photo-url.jpg'} 
                    alt={`Фото ${row.fio}`} 
                    className="resident-photo" 
                  />
                </div>
                <div className="card-info">
                  <h3>{row.fio}</h3>
                  <p>Скидка: {row.discount_value}%</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page <= 1}>
              Назад
            </button>
            <button onClick={() => setPage(prev => prev + 1)}>
              Вперед
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Regular;
*/


import React, { useState } from 'react';
import './css/regular.css';
import mainImage1 from './nikolskaya.jpg';
import mainImage2 from './prospekt_mira.jpg';
import mainImage3 from './strast.jpg'

const CustomerCard = ({ customer, onClick }) => {
  return (
    <div className="customer-card" onClick={onClick}>
      <div className="customer-image">
        <img src={customer.image} alt={customer.name} />
      </div>
      <h3>{customer.name}</h3>
    </div>
  );
};

const CustomerModal = ({ customer, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="customer-modal" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <div className="modal-content">
          <img src={customer.image} alt={customer.name} />
          <h2>{customer.name}</h2>
          <p>{customer.description}</p>
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

const customers = [
  {
    id: 1,
    name: 'Иван Петров',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    description: 'Любит кофе американо и десерты. Предпочитает сидеть у окна. Часто заказывает чизкейк.',
    location: 'Арбат'
  },
  {
    id: 2,
    name: 'Мария Иванова',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    description: 'Предпочитает зеленый чай и салаты. Всегда берет десерт дня.',
    location: 'Проспект мира'
  },
  {
    id: 3,
    name: 'Алексей Смирнов',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    description: 'Любитель крепкого эспрессо. Часто приходит на бизнес-встречи.',
    location: 'Никольская'
  },
  {
    id: 4,
    name: 'Екатерина Соколова',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    description: 'Предпочитает травяные чаи и веганские блюда. Постоянный участник дегустаций.',
    location: 'Арбат'
  },
  {
    id: 5,
    name: 'Дмитрий Козлов',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    description: 'Любит сезонные напитки и фирменные десерты. Всегда заказывает двойную порцию.',
    location: 'Проспект мира'
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

const CustomerList = ({ selectedLocation, onBackClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter(customer => 
    customer.location === selectedLocation.name &&
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="customer-list">
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
        <select>
          <option value="">{selectedLocation.name}</option>
        </select>
      </div>

      <div className="customers-grid">
        {filteredCustomers.map(customer => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            onClick={() => setSelectedCustomer(customer)}
          />
        ))}
      </div>

      {selectedCustomer && (
        <CustomerModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
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
        <CustomerList 
          selectedLocation={selectedLocation} 
          onBackClick={handleBackClick}
        />
      )}
    </div>
  );
};

export default App;