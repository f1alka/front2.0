/*import React, { useState, useEffect } from 'react';
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


import React, { useState, useEffect } from 'react';
import './css/regular.css';
import mainImage1 from './nikolskaya.jpg';
import mainImage2 from './prospekt_mira.jpg';
import mainImage3 from './strast.jpg';

const UniqueCustomerCard = ({ customer, onClick }) => {
  return (
    <div className="unique-customer-card" onClick={onClick}>
      <div className="unique-customer-image">
        <img
          src={`http://176.114.90.207:8000/files/photos/${customer.id}/upload-photo`}
          alt={customer.fio}
        />
      </div>
      <h3>{customer.fio}</h3>
    </div>
  );
};

const UniqueCustomerModal = ({ customer, onClose }) => {
  return (
    <div className="unique-modal-overlay" onClick={onClose}>
      <div className="unique-customer-modal" onClick={(e) => e.stopPropagation()}>
        <button className="unique-close-button" onClick={onClose}>×</button>
        <div className="unique-modal-content">
          <img src={`/files/photos/${customer.id}/upload-photo`} alt={customer.fio} />
          <h2>{customer.fio}</h2>
          <p>Скидка: {customer.discount_value}%</p>
          <p>Локация: {customer.location_name}</p>
        </div>
      </div>
    </div>
  );
};

const locations = [
  { id: 1, name: 'Страстной бульвар', image: mainImage3, description: 'Уютное кафе в центре города' },
  { id: 2, name: 'Проспект мира', image: mainImage2, description: 'Современное пространство с панорамными окнами' },
  { id: 3, name: 'Никольская', image: mainImage1, description: 'Историческое место с особой атмосферой' }
];

const UniqueLocationModal = ({ onSelectLocation }) => {
  return (
    <div className="unique-location-modal">
      <h1>Выберите локацию</h1>
      <div className="unique-location-grid">
        {locations.map((location) => (
          <div
            key={location.id}
            className="unique-location-card"
            onClick={() => onSelectLocation(location)}
          >
            <img src={location.image} alt={location.name} />
            <div className="unique-location-info">
              <h2>{location.name}</h2>
              <p>{location.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UniqueCustomerList = ({ selectedLocation, onBackClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          `http://176.114.90.207:8000/residents/${selectedLocation.name}/get_list_residents?page=${page}/`
        );
        const data = await response.json();
        setCustomers((prev) => [...prev, ...data.results]);
        setHasMore(data.has_more);
      } catch (error) {
        console.error('Ошибка загрузки резидентов:', error);
      }
    };

    fetchCustomers();
  }, [selectedLocation.name, page]);

  const handleLoadMore = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.fio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="unique-customer-list">
      <div className="unique-header">
        <button className="unique-back-button" onClick={onBackClick}>
          ← Назад к выбору локации
        </button>
        <h2>{selectedLocation.name}</h2>
      </div>

      <div className="unique-search-bar">
        <input
          type="text"
          placeholder="Поиск по имени"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="unique-customers-grid">
        {filteredCustomers.map((customer) => (
          <UniqueCustomerCard
            key={customer.id}
            customer={customer}
            onClick={() => setSelectedCustomer(customer)}
          />
        ))}
      </div>

      {hasMore && (
        <button className="unique-load-more" onClick={handleLoadMore}>
          Загрузить ещё
        </button>
      )}

      {selectedCustomer && (
        <UniqueCustomerModal
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
    <div className="unique-app">
      {showLocationModal ? (
        <UniqueLocationModal onSelectLocation={handleLocationSelect} />
      ) : (
        <UniqueCustomerList 
          selectedLocation={selectedLocation} 
          onBackClick={handleBackClick}
        />
      )}
    </div>
  );
};

export default App;

