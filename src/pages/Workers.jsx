
import React, { useState } from 'react';
import './css/work.css'

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

const employeeStatuses = [
  'Официант',
  'Бармен',
  'Повар',
  'Хостес',
  'Управляющий'
]

const employees = [
  {
    id: 1,
    name: 'Алексей Смирнов',
    location: 'Арбат',
    status: 'Официант',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500',
    experience: '2 года работы',
    specialization: 'Специализируется на винной карте, отлично знает европейскую кухню'
  },
  {
    id: 2,
    name: 'Елена Козлова',
    location: 'Проспект мира',
    status: 'Бармен',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500',
    experience: '5 лет работы',
    specialization: 'Эксперт по коктейлям, победитель городского конкурса барменов 2024'
  },
  {
    id: 3,
    name: 'Дмитрий Петров',
    location: 'Никольская',
    status: 'Повар',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500',
    experience: '8 лет работы',
    specialization: 'Шеф-повар, специализация на итальянской кухне'
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

function EmployeesPage() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const closeModal = () => {
    setModalIsOpen(false)
    setSelectedEmployee(null)
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

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedLocation === 'all' || employee.location === selectedLocation) &&
    (selectedStatus === 'all' || employee.status === selectedStatus)
  )

  return (
    <>
      <div className={`main-content ${modalIsOpen ? 'blur-background' : ''}`}>
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
          <select
            className="status-filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">Все должности</option>
            {employeeStatuses.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="regulars-grid">
          {filteredEmployees.map(employee => (
            <div
              key={employee.id}
              className="regular-card"
              onClick={() => {
                setSelectedEmployee(employee)
                setModalIsOpen(true)
              }}
            >
              <img src={employee.image} alt={employee.name} className="regular-image" />
              <div className="regular-info">
                <h3 className="regular-name">{employee.name}</h3>
                <p className="employee-status">{employee.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        {selectedEmployee && (
          <>
            <div className="modal-header">
              <h2>{selectedEmployee.name}</h2>
              <button
                className="close-button"
                onClick={closeModal}
              >
                ×
              </button>
            </div>
            <img
              src={selectedEmployee.image}
              alt={selectedEmployee.name}
              className="modal-image"
            />
            <div className="modal-details">
              <p><strong>Должность:</strong> {selectedEmployee.status}</p>
              <p><strong>Локация:</strong> {selectedEmployee.location}</p>
              <p><strong>Опыт:</strong> {selectedEmployee.experience}</p>
              <p><strong>Специализация:</strong> {selectedEmployee.specialization}</p>
            </div>
          </>
        )}
      </Modal>
    </>
  )
}

export default EmployeesPage

