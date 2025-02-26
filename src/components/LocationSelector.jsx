import React from 'react'

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

export default LocationSelector