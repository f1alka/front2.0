import React, { useState, useRef } from 'react';
import { FaEdit, FaTimes, FaPlus, FaUser, FaCalendar, FaArrowLeft, FaClock } from 'react-icons/fa';
import './css/admin.css';

const LOCATIONS = [
  { id: 1, name: 'Арбат', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4' },
  { id: 2, name: 'Проспект мира', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
  { id: 3, name: 'Никольская', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b' }
];

const ROLES = ['Повар', 'Кальянщик', 'Бармен', 'Официант', 'Хостес', 'Другое'];

function App() {
  const [currentView, setCurrentView] = useState('main');
  const [selectedType, setSelectedType] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  
  const [items, setItems] = useState({
    workers: [
      { id: 1, name: 'Иван Иванов', role: 'Повар', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80', location: 'Арбат', email: 'ivan@example.com', phone: '+7 999 123 45 67', telegram: '@ivan', description: 'Опытный шеф-повар', workTime: '09:00-18:00' },
      { id: 2, name: 'Петр Петров', role: 'Бармен', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e', location: 'Никольская', email: 'petr@example.com', phone: '+7 999 765 43 21', telegram: '@petr', description: 'Профессиональный бармен', workTime: '12:00-21:00' }
    ],
    regulars: [
      { id: 1, name: 'Анна Смирнова', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2', location: 'Арбат', description: 'Постоянный клиент с 2020 года' },
      { id: 2, name: 'Мария Козлова', photo: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c', location: 'Проспект мира', description: 'VIP гость' }
    ],
    events: [
      { id: 1, title: 'Джазовый вечер', description: 'Живая музыка и особое меню', location: 'Арбат', date: '2023-10-15', time: '19:00-23:00' },
      { id: 2, title: 'Дегустация вин', description: 'Презентация новой винной карты', location: 'Никольская', date: '2023-10-20', time: '18:00-22:00' }
    ]
  });

  const handleBack = () => {
    if (currentView === 'items') {
      setCurrentView('locations');
      setSelectedLocation(null);
    } else if (currentView === 'locations') {
      setCurrentView('main');
      setSelectedType(null);
    }
  };

  const handleMainButtonClick = (type) => {
    setSelectedType(type);
    setCurrentView('locations');
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setCurrentView('items');
  };

  const handleAddItem = () => {
    setModalType('add');
    setShowModal(true);
    setSelectedItem(null);
  };

  const handleEditItem = (item) => {
    setModalType('edit');
    setShowModal(true);
    setSelectedItem(item);
  };

  const handleDeleteItem = (item) => {
    setSelectedItem(item);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setItems(prev => ({
      ...prev,
      [selectedType]: prev[selectedType].filter(item => item.id !== selectedItem.id)
    }));
    setShowDeleteConfirm(false);
  };

  const handleFileChange = (e, setFormData) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModalSubmit = (formData) => {
    if (modalType === 'add') {
      setItems(prev => ({
        ...prev,
        [selectedType]: [...prev[selectedType], { id: Date.now(), ...formData, location: selectedLocation }]
      }));
    } else {
      setItems(prev => ({
        ...prev,
        [selectedType]: prev[selectedType].map(item => 
          item.id === selectedItem.id ? { ...item, ...formData } : item
        )
      }));
    }
    setShowModal(false);
  };

  const filterItems = (items) => {
    return items.filter(item => {
      const searchMatch = selectedType === 'events'
        ? item.title.toLowerCase().includes(searchTerm.toLowerCase())
        : item.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const roleMatch = selectedType === 'workers'
        ? !selectedRole || item.role === selectedRole
        : true;
      
      const dateMatch = selectedType === 'events'
        ? !selectedDate || item.date === selectedDate
        : true;

      return searchMatch && roleMatch && dateMatch;
    });
  };

  const renderMainView = () => (
    <div className="main-buttons">
      <button className="main-button" onClick={() => handleMainButtonClick('workers')}>
        <FaUser /> Работники
      </button>
      <button className="main-button" onClick={() => handleMainButtonClick('regulars')}>
        <FaUser /> Постоянники
      </button>
      <button className="main-button" onClick={() => handleMainButtonClick('events')}>
        <FaCalendar /> События
      </button>
    </div>
  );

  const renderLocationsView = () => (
    <>
      <div className="navigation">
        <button className="back-button" onClick={handleBack}>
          <FaArrowLeft />
        </button>
        <h1 className="page-title">Выберите локацию</h1>
      </div>
      <div className="locations">
        {LOCATIONS.map(location => (
          <div key={location.id} className="location-card" onClick={() => handleLocationSelect(location.name)}>
            <img src={location.image} alt={location.name} />
            <h3>{location.name}</h3>
          </div>
        ))}
      </div>
    </>
  );

  const renderItemsView = () => {
    const currentItems = filterItems(items[selectedType].filter(item => item.location === selectedLocation));
    
    return (
      <>
        <div className="navigation">
          <button className="back-button" onClick={handleBack}>
            <FaArrowLeft />
          </button>
          <h1 className="page-title">{selectedLocation}</h1>
        </div>
        <div className="filters">
          <input
            type="text"
            placeholder={selectedType === 'events' ? "Поиск по названию..." : "Поиск по имени..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-input"
          />
          {selectedType === 'workers' && (
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="filter-select"
            >
              <option value="">Все должности</option>
              {ROLES.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          )}
          {selectedType === 'events' && (
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="filter-input"
            />
          )}
        </div>
        <div className="items-list">
          {currentItems.map(item => (
            <div key={item.id} className="item-row">
              <div>{item.name || item.title}</div>
              {selectedType === 'workers' && <div>{item.role}</div>}
              }
              {selectedType === 'events' && (
                <>
                  <div>{item.date}</div>
                  <div>{item.time}</div>
                </>
              )}
              {selectedType === 'workers' && <div>{item.workTime}</div>}
              }
              <div>{item.location}</div>
              <div className="item-actions">
                <button className="action-button delete-button" onClick={() => handleDeleteItem(item)}>
                  <FaTimes />
                </button>
                <button className="action-button edit-button" onClick={() => handleEditItem(item)}>
                  <FaEdit />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="add-button" onClick={handleAddItem}>
          <FaPlus />
        </button>
      </>
    );
  };

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <ModalForm
            type={selectedType}
            initialData={selectedItem}
            onSubmit={handleModalSubmit}
            onCancel={() => setShowModal(false)}
            onFileChange={handleFileChange}
          />
        </div>
      </div>
    );
  };

  const renderDeleteConfirm = () => {
    if (!showDeleteConfirm) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Подтверждение удаления</h3>
          <p>Вы уверены, что хотите удалить этот элемент?</p>
          <div className="modal-buttons">
            <button className="modal-button cancel-button" onClick={() => setShowDeleteConfirm(false)}>Нет</button>
            <button className="modal-button confirm-button" onClick={confirmDelete}>Да</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-panel">
      {currentView === 'main' && renderMainView()}
      {currentView === 'locations' && renderLocationsView()}
      {currentView === 'items' && renderItemsView()}
      {renderModal()}
      {renderDeleteConfirm()}
    </div>
  );
}

function ModalForm({ type, initialData, onSubmit, onCancel, onFileChange }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      role: '',
      photo: '',
      title: '',
      description: '',
      email: '',
      phone: '',
      telegram: '',
      workTime: '',
      date: '',
      time: ''
    }
  );

  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <h3>{initialData ? 'Редактировать' : 'Добавить'}</h3>
      
      {type !== 'events' && (
        <>
          <div className="form-group">
            <label>ФИО:</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="form-group file-input-group">
            <label>Фото:</label>
            <button
              type="button"
              className="file-input-button"
              onClick={() => fileInputRef.current.click()}
            >
              Выбрать фото
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={e => onFileChange(e, setFormData)}
            />
            <div className="file-input-preview">
              {formData.photo && <img src={formData.photo} alt="Preview" />}
            </div>
          </div>
        </>
      )}

      {type === 'workers' && (
        <>
          <div className="form-group">
            <label>Роль:</label>
            <select
              value={formData.role}
              onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
              required
            >
              <option value="">Выберите роль</option>
              {ROLES.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Время работы:</label>
            <input
              type="text"
              value={formData.workTime}
              onChange={e => setFormData(prev => ({ ...prev, workTime: e.target.value }))}
              placeholder="09:00-18:00"
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label>Телефон:</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label>Telegram:</label>
            <input
              type="text"
              value={formData.telegram}
              onChange={e => setFormData(prev => ({ ...prev, telegram: e.target.value }))}
              required
            />
          </div>
        </>
      )}

      {type === 'events' && (
        <>
          <div className="form-group">
            <label>Название:</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label>Дата:</label>
            <input
              type="date"
              value={formData.date}
              onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label>Время:</label>
            <input
              type="text"
              value={formData.time}
              placeholder="18:00-22:00"
              onChange={e => setFormData(prev => ({ ...prev, time: e.target.value }))}
              required
            />
          </div>
        </>
      )}

      <div className="form-group">
        <label>Описание:</label>
        <textarea
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
          rows="4"
        />
      </div>

      <div className="modal-buttons">
        <button type="button" className="modal-button cancel-button" onClick={onCancel}>
          Отмена
        </button>
        <button type="submit" className="modal-button confirm-button">
          {initialData ? 'Сохранить' : 'Добавить'}
        </button>
      </div>
    </form>
  );
}

export default App;