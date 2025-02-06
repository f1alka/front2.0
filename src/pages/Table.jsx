import { useState, useEffect } from 'react';
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
        const response = await fetch(`http://192.168.1.66:8000/workdays/get_list_workdays?page=${currentPage}&limit=${itemsPerPage}`);
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
