import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import './css/card_res.css'; // Можно добавить стили для карточек

const Regular = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10; // Убрали setLimit

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        console.log(`Fetching data: page=${page}&limit=${limit}`);
        const response = await fetch(`http://192.168.1.66:8000/residents/get_list_residents?page=${page}&limit=${limit}`);

        if (!response.ok) throw new Error(`Ошибка: ${response.statusText}`);

        const data = await response.json();
        console.log('Data received:', data);

        const residentsWithPhotos = await Promise.all(
          data.map(async (resident) => {
            const photoUrl = await fetchPhotoUrl(resident.id);
            return { ...resident, photoUrl };
          })
        );

        setTableData(residentsWithPhotos);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(`Ошибка запроса: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, [page, limit]); // Добавили limit

  const filteredData = tableData.filter(row =>
    row.fio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchPhotoUrl = async (id) => {
    try {
      const response = await fetch(`http://192.168.1.66:8000/files/resident/${id}/get-photo`);
      if (!response.ok) throw new Error(`Ошибка: ${response.statusText}`);

      const photoData = await response.json();
      return photoData.status === 'success' && photoData.file_url ? photoData.file_url.url : null;
    } catch (err) {
      console.error('Error fetching photo:', err);
      return null;
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <Header title="HookahPlace Futura" subtitle="Список постоянных клиентов" />
        <section className="content">
          <h2>Список постоянных клиентов</h2>

          <div className="search-container">
            <SearchBar onSearch={setSearchTerm} />
          </div>

          <div className="card-container">
            {filteredData.map((row, index) => (
              <div key={index} className="card">
                <div className="card-photo">
                  <img 
                    src={row.photoUrl || 'default-photo-url.jpg'} 
                    alt={`Фото ${row.fio}`} 
                    className="resident-photo" 
                  />
                </div>
                <div className="card-info">
                  <h3>{row.fio}</h3>
                  <p>Скидка: {row.discount_value}%</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page <= 1}>
              Назад
            </button>
            <button onClick={() => setPage(prev => prev + 1)}>
              Вперед
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Regular;
