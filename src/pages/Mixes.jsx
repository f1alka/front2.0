/*import React, { useState, useEffect } from 'react';
import './css/admin.css';
import { 
  User, ArrowLeft, Calendar, Book, Clock, Search, 
  Plus, X, Edit, ChevronLeft, ChevronRight 
} from 'lucide-react';
import mainImage1 from './nikolskaya.jpg';
import mainImage2 from './prospekt_mira.jpg';
import mainImage3 from './strast.jpg';

// Main component
const AdminPanel = () => {
  // States
  const [step, setStep] = useState('category');
  const [category, setCategory] = useState(null);
  const [location, setLocation] = useState(null);
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentItem, setCurrentItem] = useState(null);

  // Mock data for demonstration
  const mockData = {
    employers: [
      { id: 1, email: 'anna@example.com', fio: 'Петрова Анна', work_type: 'Бармен', roles: ['staff'], contacts: ['123-456-7890'], location_name: 'Проспект мира' },
      { id: 2, email: 'dmitry@example.com', fio: 'Морозов Дмитрий', work_type: 'Официант', roles: ['staff'], contacts: ['123-456-7891'], location_name: 'Проспект мира' },
      { id: 3, email: 'maria@example.com', fio: 'Лебедева Мария', work_type: 'Повар', roles: ['staff'], contacts: ['123-456-7892'], location_name: 'Проспект мира' },
    ],
    events: [
      { id: 1, name: 'Дегустация вин', date_start: '2023-10-20T18:00:00', description: 'Дегустация итальянских вин', location_name: 'Никольская' },
      { id: 2, name: 'Джазовый вечер', date_start: '2023-11-15T19:00:00', description: 'Живая музыка и коктейли', location_name: 'Страстная' },
    ],
    residents: [
      { id: 1, fio: 'Иванов Иван', discount_value: 15, location_name: 'Никольская' },
      { id: 2, fio: 'Смирнова Елена', discount_value: 10, location_name: 'Проспект мира' },
    ],
    products: [
      { id: 1, name: 'Маргарита', description: 'Классическая пицца', type_product: 'Пицца', components: { 'тесто': '200г', 'томаты': '100г', 'сыр': '150г' }, location_name: 'Страстная' },
      { id: 2, name: 'Цезарь', description: 'Салат с курицей', type_product: 'Салат', components: { 'курица': '150г', 'салат': '100г', 'соус': '50г' }, location_name: 'Никольская' },
    ],
    workdays: [
      { id: 1, work_time: '2023-10-20T12:00:00', employer_fio: 'Петрова Анна', location_name: 'Проспект мира' },
      { id: 2, work_time: '2023-10-20T14:00:00', employer_fio: 'Морозов Дмитрий', location_name: 'Проспект мира' },
      { id: 3, work_time: '2023-10-20T07:00:00', employer_fio: 'Лебедева Мария', location_name: 'Проспект мира' },
    ]
  };

  // Fetch data based on category and location
  useEffect(() => {
    if (category && location) {
      fetchData();
    }
  }, [category, location]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real application, this would be an actual API call
      // For now, we'll use mock data
      setTimeout(() => {
        let endpoint = '';
        
        switch(category) {
          case 'employers':
            endpoint = `http://176.114.90.207:8000/employers/get_list_employers/${location}`;
            setData(mockData.employers.filter(item => item.location_name === location));
            break;
          case 'events':
            endpoint = `http://176.114.90.207:8000/events/get_list_events/${location}`;
            setData(mockData.events.filter(item => item.location_name === location));
            break;
          case 'residents':
            endpoint = `http://176.114.90.207:8000/residents/${location}/get_list_residents`;
            setData(mockData.residents.filter(item => item.location_name === location));
            break;
          case 'products':
            endpoint = `http://176.114.90.207:8000/product/${location}/get_list_products`;
            setData(mockData.products.filter(item => item.location_name === location));
            break;
          case 'workdays':
            endpoint = `http://176.114.90.207:8000/workdays/${location}/get_list_workdays`;
            setData(mockData.workdays.filter(item => item.location_name === location));
            break;
        }
        
        console.log(`Fetching data from: ${endpoint}`);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Ошибка при загрузке данных');
      setLoading(false);
    }
  };

  // Filter data based on search term
  const filteredData = data.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    
    // Different search logic based on category
    if (category === 'employers' || category === 'residents') {
      return item.fio.toLowerCase().includes(searchLower);
    } else if (category === 'events' || category === 'products') {
      return item.name.toLowerCase().includes(searchLower);
    } else if (category === 'workdays') {
      return item.employer_fio.toLowerCase().includes(searchLower);
    }
    
    return true;
  }).filter(item => {
    // Filter by date if date filter is set
    if (dateFilter && (category === 'events' || category === 'workdays')) {
      const itemDate = new Date(category === 'events' ? item.date_start : item.work_time);
      const filterDate = new Date(dateFilter);
      
      return itemDate.toDateString() === filterDate.toDateString();
    }
    
    return true;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle add/edit/delete
  const handleAdd = () => {
    setModalMode('add');
    
    // Initialize empty item based on category
    let emptyItem = {};
    
    switch(category) {
      case 'employers':
        emptyItem = { email: '', fio: '', work_type: '', roles: ['staff'], contacts: [], location_name: location };
        break;
      case 'events':
        emptyItem = { name: '', date_start: '', description: '', location_name: location };
        break;
      case 'residents':
        emptyItem = { fio: '', discount_value: 0, location_name: location };
        break;
      case 'products':
        emptyItem = { name: '', description: '', type_product: '', components: {}, location_name: location };
        break;
      case 'workdays':
        emptyItem = { work_time: '', employer_fio: '', location_name: location };
        break;
    }
    
    setCurrentItem(emptyItem);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setModalMode('edit');
    setCurrentItem(item);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    // In a real application, this would be an API call
    setData(data.filter(item => item.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (modalMode === 'add') {
      // In a real application, this would be an API call
      const newItem = { ...currentItem, id: data.length + 1 };
      setData([...data, newItem]);
    } else {
      // In a real application, this would be an API call
      setData(data.map(item => item.id === currentItem.id ? currentItem : item));
    }
    
    setShowModal(false);
  };

  // Render functions
  const renderCategorySelection = () => (
    <div className="admin-selection">
      <div className="admin-option" onClick={() => { setCategory('employers'); setStep('location'); }}>
        <User className="admin-option-icon" />
        Работники
      </div>
      <div className="admin-option" onClick={() => { setCategory('residents'); setStep('location'); }}>
        <User className="admin-option-icon" />
        Постоянники
      </div>
      <div className="admin-option" onClick={() => { setCategory('events'); setStep('location'); }}>
        <Calendar className="admin-option-icon" />
        События
      </div>
      <div className="admin-option" onClick={() => { setCategory('products'); setStep('location'); }}>
        <Book className="admin-option-icon" />
        Методички
      </div>
      <div className="admin-option" onClick={() => { setCategory('workdays'); setStep('location'); }}>
        <Clock className="admin-option-icon" />
        Расписание
      </div>
    </div>
  );

  const renderLocationSelection = () => (
    <>
      <button className="admin-back-button" onClick={() => { setStep('category'); setCategory(null); }}>
        <ArrowLeft size={16} /> Назад
      </button>
      
      <div className="admin-location-selection">
        <div className="admin-location-card" onClick={() => { setLocation('Проспект мира'); setStep('data'); }}>
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="Проспект мира" 
            className="admin-location-image" 
          />
          <div className="admin-location-name">Проспект мира</div>
        </div>
        
        <div className="admin-location-card" onClick={() => { setLocation('Страстная'); setStep('data'); }}>
          <img 
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
            alt="Страстная" 
            className="admin-location-image" 
          />
          <div className="admin-location-name">Страстная</div>
        </div>
        
        <div className="admin-location-card" onClick={() => { setLocation('Никольская'); setStep('data'); }}>
          <img 
            src="https://images.unsplash.com/photo-1525268323446-0505b6fe7778?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80" 
            alt="Никольская" 
            className="admin-location-image" 
          />
          <div className="admin-location-name">Никольская</div>
        </div>
      </div>
    </>
  );

  const renderDataView = () => {
    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;
    
    return (
      <>
        <div className="admin-back-button" onClick={() => { setStep('location'); setLocation(null); }}>
          <ArrowLeft size={16} /> Назад
        </div>
        
        <div className="admin-location-title">{location}</div>
        
        <div className="admin-data-container">
          <div className="admin-search-bar">
            <input 
              type="text" 
              placeholder={category === 'workdays' ? "Поиск по имени сотрудника..." : "Поиск..."}
              className="admin-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            {(category === 'events' || category === 'workdays') && (
              <input 
                type="date" 
                className="admin-date-input"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            )}
          </div>
          
          <button className="admin-add-button" onClick={handleAdd}>
            <Plus size={16} /> Добавить
          </button>
          
          {renderDataContent()}
          
          {totalPages > 1 && (
            <div className="admin-pagination">
              <button 
                className="admin-pagination-button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                <ChevronLeft size={16} />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button 
                  key={i}
                  className={`admin-pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              
              <button 
                className="admin-pagination-button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </>
    );
  };

  const renderDataContent = () => {
    switch(category) {
      case 'employers':
        return renderEmployersTable();
      case 'events':
        return renderEventsTable();
      case 'residents':
        return renderResidentsCards();
      case 'products':
        return renderProductsTable();
      case 'workdays':
        return renderWorkdaysTable();
      default:
        return null;
    }
  };

  const renderEmployersTable = () => (
    <div>
      {currentItems.map((employer) => (
        <div key={employer.id} className="admin-table-row">
          <div className="admin-table-cell">{employer.fio}</div>
          <div className="admin-table-cell">{employer.work_type}</div>
          <div className="admin-table-cell">{employer.email}</div>
          <div className="admin-table-cell">{employer.location_name}</div>
          <div className="admin-table-actions">
            <div className="admin-action-button admin-edit-button" onClick={() => handleEdit(employer)}>
              <Edit size={16} />
            </div>
            <div className="admin-action-button admin-delete-button" onClick={() => handleDelete(employer.id)}>
              <X size={16} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderEventsTable = () => (
    <div>
      {currentItems.map((event) => (
        <div key={event.id} className="admin-table-row">
          <div className="admin-table-cell">{event.name}</div>
          <div className="admin-table-cell">{new Date(event.date_start).toLocaleDateString()}</div>
          <div className="admin-table-cell">{new Date(event.date_start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}-{new Date(new Date(event.date_start).getTime() + 4 * 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div className="admin-table-cell">{event.location_name}</div>
          <div className="admin-table-actions">
            <div className="admin-action-button admin-edit-button" onClick={() => handleEdit(event)}>
              <Edit size={16} />
            </div>
            <div className="admin-action-button admin-delete-button" onClick={() => handleDelete(event.id)}>
              <X size={16} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderResidentsCards = () => (
    <div className="admin-cards-container">
      {currentItems.map((resident) => (
        <div key={resident.id} className="admin-card">
          <div className="admin-card-header">{resident.fio}</div>
          <div className="admin-card-body">
            <p>Скидка: {resident.discount_value}%</p>
            <p>Локация: {resident.location_name}</p>
          </div>
          <div className="admin-card-footer">
            <div className="admin-card-action admin-card-edit" onClick={() => handleEdit(resident)}>
              <Edit size={16} />
            </div>
            <div className="admin-card-action admin-card-delete" onClick={() => handleDelete(resident.id)}>
              <X size={16} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderProductsTable = () => (
    <div>
      {currentItems.map((product) => (
        <div key={product.id} className="admin-table-row">
          <div className="admin-table-cell">{product.name}</div>
          <div className="admin-table-cell">{product.type_product}</div>
          <div className="admin-table-cell">{product.description.substring(0, 50)}...</div>
          <div className="admin-table-cell">{product.location_name}</div>
          <div className="admin-table-actions">
            <div className="admin-action-button admin-edit-button" onClick={() => handleEdit(product)}>
              <Edit size={16} />
            </div>
            <div className="admin-action-button admin-delete-button" onClick={() => handleDelete(product.id)}>
              <X size={16} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderWorkdaysTable = () => (
    <div>
      {currentItems.map((workday) => (
        <div key={workday.id} className="admin-table-row">
          <div className="admin-table-cell">{workday.employer_fio}</div>
          <div className="admin-table-cell">{workday.location_name}</div>
          <div className="admin-table-cell">{new Date(workday.work_time).toLocaleDateString()}</div>
          <div className="admin-table-cell">
            {new Date(workday.work_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}-
            {new Date(new Date(workday.work_time).getTime() + 8 * 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="admin-table-actions">
            <div className="admin-action-button admin-edit-button" onClick={() => handleEdit(workday)}>
              <Edit size={16} />
            </div>
            <div className="admin-action-button admin-delete-button" onClick={() => handleDelete(workday.id)}>
              <X size={16} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderModal = () => {
    if (!showModal) return null;
    
    return (
      <div className="admin-modal">
        <div className="admin-modal-content">
          <div className="admin-modal-header">
            <h2>{modalMode === 'add' ? 'Добавить' : 'Редактировать'}</h2>
            <button className="admin-modal-close" onClick={() => setShowModal(false)}>×</button>
          </div>
          
          <form className="admin-form" onSubmit={handleSubmit}>
            {renderFormFields()}
            
            <button type="submit" className="admin-form-submit">
              {modalMode === 'add' ? 'Добавить' : 'Сохранить'}
            </button>
          </form>
        </div>
      </div>
    );
  };

  const renderFormFields = () => {
    switch(category) {
      case 'employers':
        return (
          <>
            <div className="admin-form-group">
              <label className="admin-form-label">ФИО</label>
              <input 
                type="text" 
                className="admin-form-input"
                value={currentItem?.fio || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, fio: e.target.value })}
                required
              />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Email</label>
              <input 
                type="email" 
                className="admin-form-input"
                value={currentItem?.email || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, email: e.target.value })}
                required
              />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Должность</label>
              <input 
                type="text" 
                className="admin-form-input"
                value={currentItem?.work_type || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, work_type: e.target.value })}
                required
              />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Контакты</label>
              <input 
                type="text" 
                className="admin-form-input"
                value={currentItem?.contacts?.join(', ') || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, contacts: e.target.value.split(', ') })}
              />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Описание</label>
              <textarea 
                className="admin-form-textarea"
                value={currentItem?.description || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
              />
            </div>
          </>
        );
        
      case 'events':
        return (
          <>
            <div className="admin-form-group">
              <label className="admin-form-label">Название</label>
              <input 
                type="text" 
                className="admin-form-input"
                value={currentItem?.name || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                required
              />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Дата и время начала</label>
              <input 
                type="datetime-local" 
                className="admin-form-input"
                value={currentItem?.date_start ? new Date(currentItem.date_start).toISOString().slice(0, 16) : ''}
                onChange={(e) => setCurrentItem({ ...currentItem, date_start: e.target.value })}
                required
              />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Описание</label>
              <textarea 
                className="admin-form-textarea"
                value={currentItem?.description || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                required
              />
            </div>
          </>
        );
        
      case 'residents':
        return (
          <>
            <div className="admin-form-group">
              <label className="admin-form-label">ФИО</label>
              <input 
                type="text" 
                className="admin-form-input"
                value={currentItem?.fio || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, fio: e.target.value })}
                required
              />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Скидка (%)</label>
              <input 
                type="number" 
                className="admin-form-input"
                value={currentItem?.discount_value || 0}
                onChange={(e) => setCurrentItem({ ...currentItem, discount_value: parseInt(e.target.value) })}
                required
                min="0"
                max="100"
              />
            </div>
          </>
        );
        
      case 'products':
        return (
          <>
            <div className="admin-form-group">
              <label className="admin-form-label">Название</label>
              <input 
                type="text" 
                className="admin-form-input"
                value={currentItem?.name || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                required
              />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Тип</label>
              <input 
                type="text" 
                className="admin-form-input"
                value={currentItem?.type_product || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, type_product: e.target.value })}
                required
              />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Описание</label>
              <textarea 
                className="admin-form-textarea"
                value={currentItem?.description || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                required
              />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Компоненты (JSON)</label>
              <textarea 
                className="admin-form-textarea"
                value={JSON.stringify(currentItem?.components || {}, null, 2)}
                onChange={(e) => {
                  try {
                    const components = JSON.parse(e.target.value);
                    setCurrentItem({ ...currentItem, components });
                  } catch (err) {
                    // Invalid JSON, do nothing
                  }
                }}
                required
              />
            </div>
          </>
        );
        
      case 'workdays':
        return (
          <>
            <div className="admin-form-group">
              <label className="admin-form-label">ФИО сотрудника</label>
              <input 
                type="text" 
                className="admin-form-input"
                value={currentItem?.employer_fio || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, employer_fio: e.target.value })}
                required
              />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Дата и время начала</label>
              <input 
                type="datetime-local" 
                className="admin-form-input"
                value={currentItem?.work_time ? new Date(currentItem.work_time).toISOString().slice(0, 16) : ''}
                onChange={(e) => setCurrentItem({ ...currentItem, work_time: e.target.value })}
                required
              />
            </div>
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        Административная панель
      </div>
      
      {step === 'category' && renderCategorySelection()}
      {step === 'location' && renderLocationSelection()}
      {step === 'data' && renderDataView()}
      
      {renderModal()}
    </div>
  );
};

export default AdminPanel;

*/




import React, { useState, useEffect } from 'react';
import './css/admin.css';
import axios from 'axios';
import { 
  User, ArrowLeft, Calendar, Book, Clock, 
  Plus, X, Edit, ChevronLeft, ChevronRight, Upload
} from 'lucide-react';

// Constants for locations
const LOCATIONS = {
  'Проспект мира': 1,
  'Никольская': 2,
  'Страстной бульвар': 3
};

const LOCATIONS_BY_ID = {
  1: 'Проспект мира',
  2: 'Никольская',
  3: 'Страстной бульвар'
};

const BASE_URL = 'http://176.114.90.207:8000';

// Main component
const AdminPanel = () => {
  // States
  const [step, setStep] = useState('category');
  const [category, setCategory] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationId, setLocationId] = useState(null);
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentItem, setCurrentItem] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadPhoto = async (category, id) => {
    if (!selectedPhoto) return;

    const formData = new FormData();
    formData.append('photo', selectedPhoto);

    try {
      await axios.post(`${BASE_URL}/files/${category}/${id}/upload-photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  // Fetch data based on category and location
  useEffect(() => {
    if (category && locationId) {
      fetchData();
    }
  }, [category, locationId, currentPage]);

  const fetchData = async () => {
    setLoading(true);
    
    try {
      let response;
      const params = { page: currentPage, limit: itemsPerPage };
      
      switch(category) {
        case 'employers':
          response = await axios.get(`${BASE_URL}/employers/get_list_employers/${locationId}`, { params });
          break;
        case 'events':
          response = await axios.get(`${BASE_URL}/events/get_events`, { 
            params: { ...params, location_id: locationId }
          });
          break;
        case 'residents':
          response = await axios.get(`${BASE_URL}/residents/get_list_residents`, { 
            params: { ...params, location_id: locationId }
          });
          break;
        case 'products':
          response = await axios.get(`${BASE_URL}/cards/get_list_products`, { 
            params: { ...params, location_id: locationId }
          });
          break;
        case 'workdays':
          response = await axios.get(`${BASE_URL}/workdays/get_list_workdays`, { 
            params: { ...params, location_id: locationId }
          });
          break;
      }
      
      setData(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Ошибка при загрузке данных');
      setData([]); // Reset data to empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Filter data based on search term
  const filteredData = data.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    
    if (category === 'employers' || category === 'residents') {
      return item.fio?.toLowerCase().includes(searchLower);
    } else if (category === 'events' || category === 'products') {
      return item.name?.toLowerCase().includes(searchLower);
    } else if (category === 'workdays') {
      return item.employer_fio?.toLowerCase().includes(searchLower);
    }
    
    return true;
  }).filter(item => {
    if (dateFilter && (category === 'events' || category === 'workdays')) {
      const itemDate = new Date(category === 'events' ? item.date_start : item.work_time);
      const filterDate = new Date(dateFilter);
      return itemDate.toDateString() === filterDate.toDateString();
    }
    return true;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle add/edit/delete
  const handleAdd = () => {
    setModalMode('add');
    setSelectedPhoto(null);
    setPhotoPreview(null);
    
    let emptyItem = {
      location_id: locationId
    };
    
    switch(category) {
      case 'employers':
        emptyItem = { 
          ...emptyItem,
          email: '', 
          fio: '', 
          work_type: '', 
          roles: ['employee'], 
          contacts: [], 
          description: ''
        };
        break;
      case 'events':
        emptyItem = { 
          ...emptyItem,
          name: '', 
          date_start: '', 
          description: ''
        };
        break;
      case 'residents':
        emptyItem = { 
          ...emptyItem,
          fio: '', 
          discount_value: 0, 
          description: ''
        };
        break;
      case 'products':
        emptyItem = { 
          ...emptyItem,
          name: '', 
          description: '', 
          category: ''
        };
        break;
      case 'workdays':
        emptyItem = { 
          ...emptyItem,
          work_time: '', 
          employer_id: 0
        };
        break;
    }
    
    setCurrentItem(emptyItem);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setModalMode('edit');
    setSelectedPhoto(null);
    setPhotoPreview(null);
    setCurrentItem({ ...item, location_id: locationId });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const params = { id };
      if (category === 'employers') {
        params.employer_id = id;
        delete params.id;
      }

      await axios.delete(`${BASE_URL}/${category === 'products' ? 'cards/admin/delete_product' : 
        category === 'employers' ? 'employers/delete_employer' :
        category === 'events' ? 'events/delete_event' :
        category === 'residents' ? 'residents/delete_resident' :
        'workdays/delete_workday'}`, { params });
      
      await fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Ошибка при удалении');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let endpoint = '';
      let payload = { ...currentItem };
      
      switch(category) {
        case 'employers':
          endpoint = '/auth/admin/register';
          if (modalMode === 'edit') {
            endpoint = '/employers/edit_employer';
          }
          break;
        case 'events':
          endpoint = '/events/create_event';
          break;
        case 'residents':
          endpoint = '/residents/add_resident';
          break;
        case 'products':
          endpoint = '/cards/admin/add_card';
          break;
        case 'workdays':
          endpoint = '/workdays/add_workday';
          break;
      }
      
      let response;
      if (modalMode === 'add') {
        response = await axios.post(`${BASE_URL}${endpoint}`, payload);
      } else {
        response = await axios.put(`${BASE_URL}${endpoint}`, payload);
      }
      
      if (selectedPhoto && response.data.id) {
        await uploadPhoto(category, response.data.id);
      }
      
      await fetchData();
      setShowModal(false);
      setError(null);
    } catch (error) {
      console.error('Error saving item:', error);
      setError('Ошибка при сохранении');
    }
  };

  // Render functions
  const renderCategorySelection = () => (
    <div className="admin-selection">
      <div className="admin-option" onClick={() => { setCategory('employers'); setStep('location'); }}>
        <User className="admin-option-icon" />
        Работники
      </div>
      <div className="admin-option" onClick={() => { setCategory('residents'); setStep('location'); }}>
        <User className="admin-option-icon" />
        Постоянники
      </div>
      <div className="admin-option" onClick={() => { setCategory('events'); setStep('location'); }}>
        <Calendar className="admin-option-icon" />
        События
      </div>
      <div className="admin-option" onClick={() => { setCategory('products'); setStep('location'); }}>
        <Book className="admin-option-icon" />
        Методички
      </div>
      <div className="admin-option" onClick={() => { setCategory('workdays'); setStep('location'); }}>
        <Clock className="admin-option-icon" />
        Расписание
      </div>
    </div>
  );

  const renderLocationSelection = () => (
    <>
      <button className="admin-back-button" onClick={() => { setStep('category'); setCategory(null); }}>
        <ArrowLeft size={16} /> Назад
      </button>
      
      <div className="admin-location-selection">
        <div className="admin-location-card" onClick={() => { 
          setLocation('Проспект мира'); 
          setLocationId(LOCATIONS['Проспект мира']); 
          setStep('data'); 
        }}>
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="Проспект мира" 
            className="admin-location-image" 
          />
          <div className="admin-location-name">Проспект мира</div>
        </div>
        
        <div className="admin-location-card" onClick={() => { 
          setLocation('Никольская'); 
          setLocationId(LOCATIONS['Никольская']); 
          setStep('data'); 
        }}>
          <img 
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
            alt="Никольская" 
            className="admin-location-image" 
          />
          <div className="admin-location-name">Никольская</div>
        </div>
        
        <div className="admin-location-card" onClick={() => { 
          setLocation('Страстной бульвар'); 
          setLocationId(LOCATIONS['Страстной бульвар']); 
          setStep('data'); 
        }}>
          <img 
            src="https://images.unsplash.com/photo-1525268323446-0505b6fe7778?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80" 
            alt="Страстной бульвар" 
            className="admin-location-image" 
          />
          <div className="admin-location-name">Страстной бульвар</div>
        </div>
      </div>
    </>
  );

  const renderDataView = () => {
    return (
      <>
        <div className="admin-back-button" onClick={() => { setStep('location'); setLocation(null); }}>
          <ArrowLeft size={16} /> Назад
        </div>
        
        <div className="admin-location-title">{location}</div>
        
        <div className="admin-data-container">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}
          
          <div className="admin-search-bar">
            <input 
              type="text" 
              placeholder={category === 'workdays' ? "Поиск по имени сотрудника..." : "Поиск..."}
              className="admin-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            {(category === 'events' || category === 'workdays') && (
              <input 
                type="date" 
                className="admin-date-input"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            )}
          </div>
          
          <button className="admin-add-button" onClick={handleAdd}>
            <Plus size={16} /> Добавить
          </button>
          
          {loading ? (
            <div className="text-center py-4">Загрузка...</div>
          ) : (
            renderDataContent()
          )}
          
          {totalPages > 1 && (
            <div className="admin-pagination">
              <button 
                className="admin-pagination-button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                <ChevronLeft size={16} />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button 
                  key={i}
                  className={`admin-pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              
              <button 
                className="admin-pagination-button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </>
    );
  };

  const renderDataContent = () => {
    switch(category) {
      case 'employers':
        return renderEmployersTable();
      case 'events':
        return renderEventsTable();
      case 'residents':
        return renderResidentsCards();
      case 'products':
        return renderProductsTable();
      case 'workdays':
        return renderWorkdaysTable();
      default:
        return null;
    }
  };

  const renderEmployersTable = () => (
    <div>
      {currentItems.map((employer) => (
        <div key={employer.id} className="admin-table-row">
          <div className="admin-table-cell">
            {employer.photo ? (
              <img src={`${BASE_URL}/files/employers/${employer.id}/get-photo`} alt={employer.fio} className="admin-table-cell-photo" />
            ) : (
              <User size={40} />
            )}
            {employer.fio}
          </div>
          <div className="admin-table-cell">{employer.work_type}</div>
          <div className="admin-table-cell">{employer.email}</div>
          <div className="admin-table-cell">{LOCATIONS_BY_ID[employer.location_id]}</div>
          <div className="admin-table-actions">
            <div className="admin-action-button admin-edit-button" onClick={() => handleEdit(employer)}>
              <Edit size={16} />
            </div>
            <div className="admin-action-button admin-delete-button" onClick={() => handleDelete(employer.id)}>
              <X size={16} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderEventsTable = () => (
    <div>
      {currentItems.map((event) => (
        <div key={event.id} className="admin-table-row">
          <div className="admin-table-cell">{event.name}</div>
          <div className="admin-table-cell">{new Date(event.date_start).toLocaleDateString()}</div>
          <div className="admin-table-cell">
            {new Date(event.date_start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="admin-table-cell">{LOCATIONS_BY_ID[event.location_id]}</div>
          <div className="admin-table-actions">
            <div className="admin-action-button admin-edit-button" onClick={() => handleEdit(event)}>
              <Edit size={16} />
            </div>
            <div className="admin-action-button admin-delete-button" onClick={() => handleDelete(event.id)}>
              <X size={16} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderResidentsCards = () => (
    <div className="admin-cards-container">
      {currentItems.map((resident) => (
        <div key={resident.id} className="admin-card">
          {resident.photo ? (
            <img src={`${BASE_URL}/files/residents/${resident.id}/get-photo`} alt={resident.fio} className="admin-card-photo" />
          ) : (
            <div className="admin-card-photo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#2a2a2a' }}>
              <User size={64} />
            </div>
          )}
          <div className="admin-card-header">{resident.fio}</div>
          <div className="admin-card-body">
            <p>Скидка: {resident.discount_value}%</p>
            <p>Локация: {LOCATIONS_BY_ID[resident.location_id]}</p>
            <p className="admin-card-description">{resident.description}</p>
          </div>
          <div className="admin-card-footer">
            <div className="admin-card-action admin-card-edit" onClick={() => handleEdit(resident)}>
              <Edit size={16} />
            </div>
            <div className="admin-card-action admin-card-delete" onClick={() => handleDelete(resident.id)}>
              <X size={16} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderProductsTable = () => (
    <div>
      {currentItems.map((product) => (
        <div key={product.id} className="admin-table-row">
          <div className="admin-table-cell">
            {product.photo ? (
              <img src={`${BASE_URL}/files/products/${product.id}/get-photo`} alt={product.name} className="admin-table-cell-photo" />
            ) : (
              <Book size={40} />
            )}
            {product.name}
          </div>
          <div className="admin-table-cell">{product.category}</div>
          <div className="admin-table-cell">{product.description.substring(0, 50)}...</div>
          <div className="admin-table-cell">{LOCATIONS_BY_ID[product.location_id]}</div>
          <div className="admin-table-actions">
            <div className="admin-action-button admin-edit-button" onClick={() => handleEdit(product)}>
              <Edit size={16} />
            </div>
            <div className="admin-action-button admin-delete-button" onClick={() => handleDelete(product.id)}>
              <X size={16} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderWorkdaysTable = () => (
    <div>
      {currentItems.map((workday) => (
        <div key={workday.id} className="admin-table-row">
          <div className="admin-table-cell">{workday.employer_fio}</div>
          <div className="admin-table-cell">{LOCATIONS_BY_ID[workday.location_id]}</div>
          <div className="admin-table-cell">{new Date(workday.work_time).toLocaleDateString()}</div>
          <div className="admin-table-cell">
            {new Date(workday.work_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="admin-table-actions">
            <div className="admin-action-button admin-edit-button" onClick={() => handleEdit(workday)}>
              <Edit size={16} />
            </div>
            <div className="admin-action-button admin-delete-button" onClick={() => handleDelete(workday.id)}>
              <X size={16} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPhotoUpload = () => (
    <div className="admin-photo-upload">
      <label className="admin-form-label">Фотография</label>
      {photoPreview && (
        <img src={photoPreview} alt="Preview" className="admin-photo-preview" />
      )}
      <label className="admin-photo-upload-button">
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          style={{ display: 'none' }}
        />
        <Upload size={16} style={{ marginRight: '8px' }} />
        {photoPreview ? 'Изменить фото' : 'Загрузить фото'}
      </label>
    </div>
  );

  const renderModal = () => {
    if (!showModal) return null;
    
    return (
      <div className="admin-modal">
        <div className="admin-modal-content">
          <div className="admin-modal-header">
            <h2>{modalMode === 'add' ? 'Добавить' : 'Редактировать'}</h2>
            <button className="admin-modal-close" onClick={() => setShowModal(false)}>×</button>
          </div>
          
          <form className="admin-form" onSubmit={handleSubmit}>
            {renderFormFields()}
            
            {(category === 'employers' || category === 'residents' || category === 'products') && renderPhotoUpload()}
            
            <button type="submit" className="admin-form-submit">
              {modalMode === 'add' ? 'Добавить' : 'Сохранить'}
            </button>
          </form>
        </div>
      </div>
    );
  };

  const renderFormFields = () => {
    switch(category) {
      case 'employers':
        return (
          <>
            <div className="admin-form-group">
              <label className="admin-form-label">ФИО</label>
              <input 
                type="text" 
                className="admin-form-input"
                value={currentItem?.fio || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, fio: e.target.value })}
                required
              />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Email</label>
              <input 
                type="email" 
                className="admin-form-input"
                value={currentItem?.email || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, email: e.target.value })}
                required
              />
            </div>
            
            {modalMode === 'add' && (
              <div className="admin-form-group">
                <label className="admin-form-label">Пароль</label>
                <input 
                  type="password" 
                  className="admin-form-input"
                  value={currentItem?.hashed_password || ''}
                  onChange={(e) => setCurrentItem({ ...currentItem, hashed_password: e.target.value })}
                  required
                />
              </div>
            )}
            
            <div className="admin-form-group">
              <label className="admin-form-label">Должность</label>
              <input 
                type="text" 
                className="admin-form-input"
                value={currentItem?.work_type || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, work_type: e.target.value })}
                required
              />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Контакты</label>
              <input 
                type="text" 
                className="admin-form-input"
                value={currentItem?.contacts?.join(', ') || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, contacts: e.target.value.split(', ') })}
              />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Описание</label>
              <textarea 
                className="admin-form-textarea"
                value={currentItem?.description || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
              />
            </div>
          </>
        );
        
      case 'events':
        return (
          <>
            <div className="admin-form-group">
              <label className="admin-form-label">Название</label>
              <input 
                type="text" 
                className="admin-form-input"
                value={currentItem?.name || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                required
              />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Дата и время начала</label>
              <input 
                type="datetime-local" 
                className="admin-form-input"
                value={currentItem?.date_start ? new Date(currentItem.date_start).toISOString().slice(0, 16) : ''}
                onChange={(e) => setCurrentItem({ ...currentItem, date_start: e.target.value })}
                required
              />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Описание</label>
              <textarea 
                className="admin-form-textarea"
                value={currentItem?.description || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                required
              />
            </div>
          </>
        );
        
      case 'residents':
        return (
          <>
            <div className="admin-form-group">
              <label className="admin-form-label">ФИО</label>
              <input 
                type="text" 
                className="admin-form-input"
                value={currentItem?.fio || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, fio: e.target.value })}
                required
              />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Скидка (%)</label>
              <input 
                type="number" 
                className="admin-form-input"
                value={currentItem?.discount_value || 0}
                onChange={(e) => setCurrentItem({ ...currentItem, discount_value: parseInt(e.target.value) })}
                required
                min="0"
                max="100"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Описание</label>
              <textarea 
                className="admin-form-textarea"
                value={currentItem?.description || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
              />
            </div>
          </>
        );
        
      case 'products':
        return (
          <>
            <div className="admin-form-group">
              <label className="admin-form-label">Название</label>
              <input 
                type="text" 
                className="admin-form-input"
                value={currentItem?.name || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                required
              />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Категория</label>
              <input 
                type="text" 
                className="admin-form-input"
                value={currentItem?.category || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                required
              />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Описание</label>
              <textarea 
                className="admin-form-textarea"
                value={currentItem?.description || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                required
              />
            </div>
          </>
        );
        
      case 'workdays':
        return (
          <>
            <div className="admin-form-group">
              <label className="admin-form-label">ID сотрудника</label>
              <input 
                type="number" 
                className="admin-form-input"
                value={currentItem?.employer_id || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, employer_id: parseInt(e.target.value) })}
                required
              />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Дата и время начала</label>
              <input 
                type="datetime-local" 
                className="admin-form-input"
                value={currentItem?.work_time ? new Date(currentItem.work_time).toISOString().slice(0, 16) : ''}
                onChange={(e) => setCurrentItem({ ...currentItem, work_time: e.target.value })}
                required
              />
            </div>
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        Административная панель
      </div>
      
      {step === 'category' && renderCategorySelection()}
      {step === 'location' && renderLocationSelection()}
      {step === 'data' && renderDataView()}
      
      {renderModal()}
    </div>
  );
};

export default AdminPanel;