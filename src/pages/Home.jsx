import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import './css/card_res.css'; // Стили для карточек

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [restaurantData, setRestaurantData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const limit = 10;

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        console.log(`Fetching data with limit=${limit}`);
        const response = await fetch(`http://192.168.1.66:8000/locations/get_locations?limit=${limit}`);

        if (!response.ok) throw new Error(`Ошибка: ${response.statusText}`);

        const data = await response.json();
        console.log('Data received:', data);

        const restaurantsWithPhotos = await Promise.all(
          data.map(async (restaurant) => {
            const photoUrl = await fetchPhotoUrl(restaurant.id);
            return { ...restaurant, photoUrl };
          })
        );

        setRestaurantData(restaurantsWithPhotos);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(`Ошибка запроса: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [limit]);

  const fetchPhotoUrl = async (id) => {
    try {
      const response = await fetch(`http://192.168.1.66:8000/files/location/${id}/get-photo`);
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
    <div className="main-content">
      <Header title="HookahPlace Futura" />
      <section className="content">
        <h2>Список ресторанов</h2>

        <div className="search-container">
          <SearchBar onSearch={setSearchTerm} />
        </div>

        <div className="card-container">
          {restaurantData
            .filter(row => row.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((restaurant, index) => (
              <div key={index} className="card">
                <div className="card-photo">
                  <img 
                    src={restaurant.photoUrl || 'default-photo-url.jpg'} 
                    alt={`Фото ${restaurant.name}`} 
                    className="restaurant-photo" 
                  />
                </div>
                <div className="card-info">
                  <h3>{restaurant.name}</h3>
                  <p><strong>Адрес:</strong> {restaurant.address}</p>
                  <p><strong>Описание:</strong> {restaurant.description}</p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
