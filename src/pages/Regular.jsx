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
import './css/regular.css'

const locations = [
  { 
    id: 1, 
    name: 'Арбат',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'
  },
  { 
    id: 2, 
    name: 'Проспект мира',
    image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800'
  },
  { 
    id: 3, 
    name: 'Никольская',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800'
  }
]

const regularCustomers = [
  {
    id: 1,
    name: 'Иван Петров',
    location: 'Арбат',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500',
    favorites: 'Любит заказывать стейк medium rare и красное вино'
  },
  {
    id: 2,
    name: 'Мария Иванова',
    location: 'Проспект мира',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500',
    favorites: 'Предпочитает пасту карбонара и белое вино'
  },
]

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegular, setSelectedRegular] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const closeModal = () => {
    setModalIsOpen(false)
    setSelectedRegular(null)
  }

  if (!selectedLocation) {
    return (
      <div className="location-select">
        <h1 className="location-title">Выберите локацию</h1>
        <div className="location-grid">
          {locations.map(location => (
            <div
              key={location.id}
              className="location-card"
              onClick={() => setSelectedLocation(location.name)}
            >
              <div 
                className="location-image" 
                style={{ backgroundImage: `url(${location.image})` }}
              />
              <h2 className="location-name">{location.name}</h2>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const filteredRegulars = regularCustomers.filter(regular =>
    regular.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedLocation === 'all' || regular.location === selectedLocation)
  )

  return (
    <div className={`regulars-page ${modalIsOpen ? 'blur-background' : ''}`}>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Поиск по имени..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="location-filter"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="all">Все локации</option>
          {locations.map(location => (
            <option key={location.id} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      <div className="regulars-grid">
        {filteredRegulars.map(regular => (
          <div
            key={regular.id}
            className="regular-card"
            onClick={() => {
              setSelectedRegular(regular)
              setModalIsOpen(true)
            }}
          >
            <img src={regular.image} alt={regular.name} className="regular-image" />
            <div className="regular-info">
              <h3 className="regular-name">{regular.name}</h3>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        {selectedRegular && (
          <>
            <div className="modal-header">
              <h2>{selectedRegular.name}</h2>
              <button
                className="close-button"
                onClick={closeModal}
              >
                ×
              </button>
            </div>
            <img
              src={selectedRegular.image}
              alt={selectedRegular.name}
              className="modal-image"
            />
            <div className="modal-details">
              <p><strong>Локация:</strong> {selectedRegular.location}</p>
              <p><strong>Предпочтения:</strong> {selectedRegular.favorites}</p>
            </div>
          </>
        )}
      </Modal>
    </div>
  )
}

export default App
