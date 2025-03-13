/*
import React, { useState } from 'react';
import './css/events.css'
import mainImage1 from './nikolskaya.jpg';
import mainImage2 from './prospekt_mira.jpg';
import mainImage3 from './strast.jpg'

function EventModal({ event, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{event.title}</h2>
        <p className="modal-event-location">Локация: {event.location}</p>
        <p className="modal-event-date">Дата: {event.date}</p>
        <p className="event-description">{event.description}</p>
        <button className="close-button" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  )
}

function EventsList({ events, selectedLocation, selectedDate, onDateChange, onBackClick }) {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredEvents = events.filter(event => {
    const dateMatch = !selectedDate || event.date === selectedDate
    const searchMatch = event.title.toLowerCase().includes(searchQuery.toLowerCase())
    return dateMatch && searchMatch
  })

  return (
    <div className="events-list">
      <div className="filters">
        <input
          type="text"
          placeholder="Поиск по названию"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="date-filter"
        />
        <button className="back-button" onClick={onBackClick}>
          ← Назад к выбору локации
        </button>
      </div>

      <div className="events-grid">
        {filteredEvents.map(event => (
          <div 
            key={event.id} 
            className="event-card"
            onClick={() => setSelectedEvent(event)}
          >
            <div className="event-date">{event.date}</div>
            <h3>{event.title}</h3>
            <div className="event-location">{event.location}</div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </div>
  )
}

function LocationSelector({ locations, onLocationSelect }) {
  return (
    <div className="location-selector">
      <h1>Выберите локацию</h1>
      <div className="locations-grid">
        {locations.map(location => (
          <div 
            key={location.id} 
            className="location-card"
            onClick={() => onLocationSelect(location)}
          >
            <img src={location.image} alt={location.name} />
            <h2>{location.name}</h2>
            <p>{location.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

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

const events = [
  {
    id: 1,
    title: 'Джазовый вечер',
    location: 'Проспект мира',
    date: '2024-03-20',
    description: 'Живая джазовая музыка в исполнении лучших музыкантов города. Специальное меню от шеф-повара.'
  },
  {
    id: 2,
    title: 'Дегустация вин',
    location: 'Никольская',
    date: '2024-03-21',
    description: 'Эксклюзивная дегустация итальянских вин с сомелье. Подача авторских закусок.'
  },
  {
    id: 3,
    title: 'Мастер-класс по кулинарии',
    location: 'Страстной бульвар',
    date: '2024-03-22',
    description: 'Научитесь готовить фирменные блюда ресторана под руководством шеф-повара.'
  },
  {
    id: 4,
    title: 'Праздничный фуршет',
    location: 'Общее мероприятие',
    date: '2024-03-25',
    description: 'Большой праздничный фуршет во всех ресторанах сети. Специальное меню и развлекательная программа.'
  }
]

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [showLocationSelector, setShowLocationSelector] = useState(true)

  const handleLocationSelect = (location) => {
    setSelectedLocation(location)
    setShowLocationSelector(false)
  }

  const handleBackToLocations = () => {
    setShowLocationSelector(true)
    setSelectedLocation(null)
  }

  const filteredEvents = events.filter(event => {
    return event.location === 'Общее мероприятие' || 
           (!selectedLocation || event.location === selectedLocation.name)
  })

  return (
    <div className="app">
      {showLocationSelector ? (
        <LocationSelector 
          locations={locations} 
          onLocationSelect={handleLocationSelect} 
        />
      ) : (
        <EventsList 
          events={filteredEvents}
          selectedLocation={selectedLocation}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          onBackClick={handleBackToLocations}
        />
      )}
    </div>
  )
}

export default App

*/

import React, { useState, useEffect } from 'react';
import './css/events.css'
import mainImage1 from './nikolskaya.jpg';
import mainImage2 from './prospekt_mira.jpg';
import mainImage3 from './strast.jpg';

function EventModal({ event, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{event.name}</h2>
        <p className="modal-event-location">Локация: {event.location_name}</p>
        <p className="modal-event-date">Дата: {new Date(event.date_start).toLocaleDateString('ru-RU')}</p>
        <p className="event-description">{event.description}</p>
        <button className="close-button" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  )
}

function EventsList({ events, selectedLocation, selectedDate, onDateChange, onBackClick, onPageChange, currentPage, totalPages }) {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredEvents = events.filter(event => {
    const dateMatch = !selectedDate || new Date(event.date_start).toLocaleDateString('ru-RU') === selectedDate
    const searchMatch = event.name.toLowerCase().includes(searchQuery.toLowerCase())
    return dateMatch && searchMatch
  })

  return (
    <div className="events-list">
      <div className="filters">
        <input
          type="text"
          placeholder="Поиск по названию"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="date-filter"
        />
        <button className="back-button" onClick={onBackClick}>
          ← Назад к выбору локации
        </button>
      </div>

      <div className="events-grid">
        {filteredEvents.map(event => (
          <div 
            key={event.id} 
            className="event-card"
            onClick={() => setSelectedEvent(event)}
          >
            <div className="event-date">{new Date(event.date_start).toLocaleDateString('ru-RU')}</div>
            <h3>{event.name}</h3>
            <div className="event-location">{event.location_name}</div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Назад
        </button>
        <span>Страница {currentPage} из {totalPages}</span>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Вперед
        </button>
      </div>
    </div>
  )
}

function LocationSelector({ locations, onLocationSelect }) {
  return (
    <div className="event-location-selector">
      <h1>Выберите локацию</h1>
      <div className="event-locations-grid">
        {locations.map(location => (
          <div 
            key={location.id} 
            className="event-location-card"
            onClick={() => onLocationSelect(location)}
          >
            <img src={location.image} alt={location.name} />
            <div className="event-location-info">
              <h2>{location.name}</h2>
              <p>{location.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

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

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [events, setEvents] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [showLocationSelector, setShowLocationSelector] = useState(true)
  const limit = 5  // Лимит на количество мероприятий на странице

  const handleLocationSelect = (location) => {
    setSelectedLocation(location)
    setShowLocationSelector(false)
    setCurrentPage(1)  // сбрасываем страницу на первую при смене локации
  }

  const handleBackToLocations = () => {
    setShowLocationSelector(true)
    setSelectedLocation(null)
  }

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }

  useEffect(() => {
    if (selectedLocation) {
      const fetchEvents = async () => {
        try {
          const response = await fetch('http://176.114.90.207:8000/events/get_events/${selectedLocation.name}?page=${currentPage}&limit=${limit}');
          const data = await response.json();
          setEvents(data.events);
          setTotalPages(data.total_pages);  // Предполагаем, что сервер возвращает общее количество страниц
        } catch (error) {
          console.error("Ошибка при загрузке мероприятий:", error);
        }
      };

      fetchEvents();
    }
  }, [selectedLocation, currentPage]);

  const filteredEvents = events.filter(event => {
    return event.location_name === selectedLocation?.name || event.location_name === 'Общее мероприятие'
  });

  return (
    <div className="app">
      {showLocationSelector ? (
        <LocationSelector 
          locations={locations} 
          onLocationSelect={handleLocationSelect} 
        />
      ) : (
        <EventsList 
          events={filteredEvents}
          selectedLocation={selectedLocation}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          onBackClick={handleBackToLocations}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  )
}

export default App