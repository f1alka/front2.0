import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/home2.css';

const restaurantsData = [
  {
    id: 1,
    name: 'НИКОЛЬСКая',
    address: 'Никольская ул., 19-21/1',
    description: 'Винтажный проект в стиле listening bar расположился на втором этаже исторического здания с огромными окнами и главной точкой притяжения – музыкальным автоматом 1959 года.',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
  },
  {
    id: 2,
    name: 'ПРОСПЕКТ МИРА',
    address: 'Просп. Мира, 36, стр. 1',
    description: 'В целом, всю концепцию можно назвать как ретро-футуризм.Авторская кухня в паназиатском стиле, коктейльная карта от special позиций до любой классики, винная карта, китайская чайная карта, вип комнаты, зона индивидуального обслуживания, музыкальные вечера и многое другоЕ.',
    imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9',
  },
  {
    id: 3,
    name: 'Азиатский сад',
    address: 'ул. Гагарина, д. 15',
    description: 'Паназиатская кухня в современной интерпретации. Суши, роллы, вок и многое другое в атмосфере восточного сада.',
    imageUrl: 'https://images.unsplash.com/photo-1552531268-3fe8c3fc8d84',
  }
];

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    // Получаем данные о последнем событии
    axios.get('http://172.20.10.2:8000/events/get_latest')
      .then(response => {
        // Преобразуем полученные данные в читаемую форму
        if (response.data) {
          setEventData(response.data); // Последнее событие
        }
      })
      .catch(error => {
        console.error("Ошибка при получении данных о событиях:", error);
      });
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('ru-RU');
  };

  return (
    <div className="container">
      {/* Новый хедер */}
      <div className="header">
        <h1>HookahPlace Futura</h1>
        {/* Кнопка перехода в личный кабинет */}
        <Link to="/profile">
          <button className="profile-button">
            Личный кабинет
          </button>
        </Link>
      </div>

      {/* Сетка карточек ресторанов */}
      <div className="restaurants-grid">
        {restaurantsData.map(restaurant => (
          <div
            key={restaurant.id}
            className="restaurant-card"
            onClick={() => setSelectedRestaurant(restaurant)}
          >
            <img
              src={restaurant.imageUrl}
              alt={restaurant.name}
              className="restaurant-image"
            />
            <div className="restaurant-info">
              <h2>{restaurant.name}</h2>
              <p>{restaurant.address}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Карточка последнего события */}
      {eventData && (
        <div className="event-card">
          <h2>Последнее событие</h2>
          <div className="event-info">
            <h3>{eventData.name}</h3>
            <p>{formatDate(eventData.date_start)}</p>
            <p>{eventData.description}</p>
          </div>
        </div>
      )}

      {/* Модальное окно с детальной информацией о ресторане */}
      {selectedRestaurant && (
        <div className="modal-overlay" onClick={() => setSelectedRestaurant(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={() => setSelectedRestaurant(null)}
            >
              ×
            </button>

            <img
              src={selectedRestaurant.imageUrl}
              alt={selectedRestaurant.name}
              className="modal-image"
            />

            <div className="modal-info">
              <h2>{selectedRestaurant.name}</h2>
              <p className="address">{selectedRestaurant.address}</p>
              <p className="description">{selectedRestaurant.description}</p>

              <div className="event-section">
                <h3>Последнее событие</h3>
                {eventData && (
                  <div className="event-card">
                    <h4>{eventData.name}</h4>
                    <p className="event-date">
                      {formatDate(eventData.date_start)}
                    </p>
                    <p className="event-description">
                      {eventData.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
