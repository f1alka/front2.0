import React, { useState } from 'react';
import './css/metoda.css'

function ManualModal({ manual, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{manual.title}</h2>
        <p className="modal-manual-location">Локация: {manual.location}</p>
        <p className="modal-manual-category">Категория: {manual.category}</p>
        <img src={manual.image} alt={manual.title} className="manual-image" />
        <a 
          href={manual.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="manual-link"
        >
          Открыть методичку
        </a>
        <button className="close-button" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  )
}

function ManualsList({ manuals, selectedLocation, onBackClick }) {
  const [selectedManual, setSelectedManual] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const categories = ['Кухня', 'Кальяны', 'Бар', 'Хостес']

  const filteredManuals = manuals.filter(manual => {
    const searchMatch = manual.title.toLowerCase().includes(searchQuery.toLowerCase())
    const categoryMatch = categoryFilter === 'all' || manual.category === categoryFilter
    const locationMatch = !selectedLocation || manual.location === selectedLocation.name
    return searchMatch && categoryMatch && locationMatch
  })

  return (
    <div className="manuals-list">
      <div className="filters">
        <input
          type="text"
          placeholder="Поиск по названию"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="category-filter"
        >
          <option value="all">Все категории</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <button className="back-button" onClick={onBackClick}>
          ← Назад к выбору локации
        </button>
      </div>

      <div className="manuals-grid">
        {filteredManuals.map(manual => (
          <div 
            key={manual.id} 
            className="manual-card"
            onClick={() => setSelectedManual(manual)}
          >
            <img src={manual.image} alt={manual.title} className="manual-preview" />
            <div className="manual-info">
              <h3>{manual.title}</h3>
              <p className="manual-category">{manual.category}</p>
              <p className="manual-location">{manual.location}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedManual && (
        <ManualModal 
          manual={selectedManual} 
          onClose={() => setSelectedManual(null)} 
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
    name: 'Проспект мира',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    description: 'Современное пространство с панорамными видами'
  },
  {
    id: 2,
    name: 'Никольская',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b',
    description: 'Историческое место с особой атмосферой'
  },
  {
    id: 3,
    name: 'Страстной бульвар',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de',
    description: 'Уютное место в центре города'
  }
]

const manuals = [
  {
    id: 1,
    title: 'Стандарты приготовления пасты',
    category: 'Кухня',
    location: 'Проспект мира',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601',
    link: 'https://example.com/manual1.pdf'
  },
  {
    id: 2,
    title: 'Коктейльная карта',
    category: 'Бар',
    location: 'Никольская',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b',
    link: 'https://example.com/manual2.pdf'
  },
  {
    id: 3,
    title: 'Правила сервировки',
    category: 'Хостес',
    location: 'Страстной бульвар',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
    link: 'https://example.com/manual3.pdf'
  },
  {
    id: 4,
    title: 'Меню кальянов',
    category: 'Кальяны',
    location: 'Проспект мира',
    image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35',
    link: 'https://example.com/manual4.pdf'
  }
]

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [showLocationSelector, setShowLocationSelector] = useState(true)

  const handleLocationSelect = (location) => {
    setSelectedLocation(location)
    setShowLocationSelector(false)
  }

  const handleBackToLocations = () => {
    setShowLocationSelector(true)
    setSelectedLocation(null)
  }

  return (
    <div className="app">
      {showLocationSelector ? (
        <LocationSelector 
          locations={locations} 
          onLocationSelect={handleLocationSelect} 
        />
      ) : (
        <ManualsList 
          manuals={manuals}
          selectedLocation={selectedLocation}
          onBackClick={handleBackToLocations}
        />
      )}
    </div>
  )
}

export default App