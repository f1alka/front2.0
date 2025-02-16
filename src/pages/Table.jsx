/* import { useState, useEffect } from 'react';
import './css/table.css';
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("Ошибка в компоненте:", error);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Что-то пошло не так...</h1>;
    }
    return this.props.children;
  }
}

function App() {
  const [workdays, setWorkdays] = useState([]);  // Данные о рабочих днях
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);  // Общее количество рабочих дней
  const [searchName, setSearchName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://172.20.10.2:8000/workdays/get_list_workdays?page=${currentPage}&limit=${itemsPerPage}`);
        const data = await response.json();

        // Проверка структуры данных и обновление состояний
        if (data && Array.isArray(data)) {
          setWorkdays(data);  // Данные о рабочих днях
          setTotalItems(data.length);  // Общее количество
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const filteredWorkdays = workdays.filter(workday => {
    const nameMatch = workday.employer_fio.toLowerCase().includes(searchName.toLowerCase());
    const dateMatch = !selectedDate || workday.work_time.startsWith(selectedDate);
    return nameMatch && dateMatch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWorkdays = filteredWorkdays.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getStatusText = (status) => {
    switch (status) {
      case 0: return 'работает';
      case 1: return 'не начал';
      case 2: return 'не пришел';
      default: return '';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 0: return 'status-working';
      case 1: return 'status-not-started';
      case 2: return 'status-absent';
      default: return '';
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      
      if (currentPage > 3) {
        pageNumbers.push('...');
      }
      
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pageNumbers.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }
      
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <ErrorBoundary>
      <div className="schedule-container">
        <div className="header">
          <h1>Расписание сотрудников</h1>
          <p>Управление расписанием и статусами сотрудников</p>
        </div>

        <div className="filters">
          <div className="filters-grid">
            <div className="filter-group">
              <label>Поиск по ФИО</label>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Введите ФИО сотрудника"
              />
            </div>
            
            <div className="filter-group">
              <label>Фильтр по дате</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {filteredWorkdays.length === 0 ? (
          <div className="no-data">Нет данных для отображения</div>
        ) : (
          <div className="employees-grid">
            {currentWorkdays.map(workday => (
              <div key={workday.id} className="employee-card">
                <div className="card-content">
                  <h3 className="employee-name">{workday.employer_fio}</h3>
                  <p className="employee-date">{new Date(workday.work_time).toLocaleDateString()}</p>
                  <span className={`status-badge ${getStatusClass(workday.status)}`}>
                    {getStatusText(workday.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ←
            </button>
            
            {getPageNumbers().map((pageNum, index) => (
              pageNum === '...' ? (
                <span key={`ellipsis-${index}`} className="ellipsis">
                  ...
                </span>
              ) : (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={currentPage === pageNum ? 'active' : ''}
                >
                  {pageNum}
                </button>
              )
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              →
            </button>
          </div>
        )}

        <div className="results-counter">
          Показано {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredWorkdays.length)} из {totalItems} сотрудников
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
*/


import React, { useState } from 'react';
import './css/LocationSelect.css';
import './css/Schedule.css';

// Компонент Table


// Компонент LocationSelect
export function LocationSelect({ locations, onSelect }) {
  return (
    <div className="location-select">
      <h1>Выберите локацию</h1>
      <div className="location-cards">
        {locations.map((location) => (
          <div
            key={location.id}
            className="location-card"
            onClick={() => onSelect(location)}
          >
            <img src={location.image} alt={location.name} />
            <h2>{location.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

// Компонент Schedule
export function Schedule({ location }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(location?.name || '');

  const employees = [
    {
      id: 1,
      name: 'Иванов Иван',
      position: 'Официант',
      location: 'Арбат',
      schedule: { date: '2024-03-18', time: '10:00 - 18:00' },
    },
    {
      id: 2,
      name: 'Петрова Анна',
      position: 'Бармен',
      location: 'Проспект мира',
      schedule: { date: '2024-03-19', time: '12:00 - 20:00' },
    },
    {
      id: 3,
      name: 'Сидоров Алексей',
      position: 'Администратор',
      location: 'Никольская',
      schedule: { date: '2024-03-20', time: '09:00 - 17:00' },
    },
    {
      id: 4,
      name: 'Козлова Елена',
      position: 'Повар',
      location: 'Арбат',
      schedule: { date: '2024-03-21', time: '08:00 - 16:00' },
    },
    {
      id: 5,
      name: 'Морозов Дмитрий',
      position: 'Официант',
      location: 'Проспект мира',
      schedule: { date: '2024-03-22', time: '14:00 - 22:00' },
    },
    {
      id: 6,
      name: 'Волкова Ольга',
      position: 'Бармен',
      location: 'Никольская',
      schedule: { date: '2024-03-23', time: '11:00 - 19:00' },
    },
    {
      id: 7,
      name: 'Новиков Сергей',
      position: 'Администратор',
      location: 'Арбат',
      schedule: { date: '2024-03-24', time: '10:00 - 18:00' },
    },
    {
      id: 8,
      name: 'Лебедева Мария',
      position: 'Повар',
      location: 'Проспект мира',
      schedule: { date: '2024-03-25', time: '07:00 - 15:00' },
    },
    {
      id: 9,
      name: 'Кузнецов Андрей',
      position: 'Официант',
      location: 'Никольская',
      schedule: { date: '2024-03-26', time: '13:00 - 21:00' },
    },
    {
      id: 10,
      name: 'Соколова Виктория',
      position: 'Бармен',
      location: 'Арбат',
      schedule: { date: '2024-03-27', time: '12:00 - 20:00' },
    },
  ];

  const positions = ['Официант', 'Бармен', 'Администратор', 'Повар'];
  const locations = ['Арбат', 'Проспект мира', 'Никольская'];

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPosition = !selectedPosition || employee.position === selectedPosition;
    const matchesDate = !selectedDate || employee.schedule.date === selectedDate;
    const matchesLocation = !selectedLocation || employee.location === selectedLocation;
    return matchesSearch && matchesPosition && matchesDate && matchesLocation;
  });

  return (
    <div className="schedule">
      <div className="schedule-header">
        <h1>Расписание сотрудников</h1>
        <div className="filters">
          <input
            type="text"
            placeholder="Поиск по имени"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <select
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
          >
            <option value="">Все должности</option>
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">Все локации</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="employee-cards">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="employee-card">
            <div className="employee-info">
              <h3>{employee.name}</h3>
              <p>{employee.position}</p>
              <p>{employee.location}</p>
              <p>{employee.schedule.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Главный компонент TableApp
export function TableApp() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locations = [
    { id: 1, name: 'Арбат', image: '/images/arbat.jpg' },
    { id: 2, name: 'Проспект мира', image: './prospekt_mira.jpg' },
    { id: 3, name: 'Никольская', image: './nikolskaya.jpg' },
  ];

  return (
    <div className="app">
      {!selectedLocation ? (
        <LocationSelect locations={locations} onSelect={setSelectedLocation} />
      ) : (
        <Schedule location={selectedLocation} />
      )}
    </div>
  );
}