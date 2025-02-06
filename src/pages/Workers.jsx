import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import './css/card_workers.css'; // Можно добавить стили для карточек
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';


const Workers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [workersData, setWorkersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await fetch('http://192.168.3.176:8000/employers/get_list_employers');
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.statusText}`);
        }
        const data = await response.json();
        setWorkersData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployers();
  }, []);

  const filteredData = workersData.filter(worker =>
    worker.fio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <Header title="HookahPlace Futura" subtitle="Список Работников" />
        <section className="content">
          <h2>Список работников</h2>
          <SearchBar onSearch={setSearchTerm} />

          {/* Отображаем отфильтрованные данные в виде карточек */}
          <div className="card-container">
            {filteredData.map((worker) => (
              <div key={worker.id} className="card">
                <div className="card-photo">
                  {worker.image ? (
                    <img src={worker.image} alt={`Фото ${worker.fio}`} className="worker-photo" />
                  ) : (
                    <div className="no-photo">Нет фото</div>
                  )}
                </div>
                <div className="card-info">
                  <h3>{worker.fio}</h3>
                  <p>Тип работы: {worker.work_type}</p>
                  <p>{worker.description || 'Нет описания'}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Workers;
