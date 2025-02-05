import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import './css/Home.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [workDays, setWorkDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        setError('Нет токена авторизации');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://192.168.1.66:8000/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Ошибка загрузки профиля: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data from profile:', data);
        setProfile(data.user);
        setWorkDays(data.work_days);

        const userId = data.user.id;
        console.log('User ID: ', userId);

        const photoUrl = userId ? `http://192.168.1.66:8000/files/employer/${userId}/get-photo` : null;

        if (photoUrl) {
          const photoResponse = await fetch(photoUrl, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
          });

          if (photoResponse.ok) {
            const photoData = await photoResponse.json();
            console.log('Photo data:', photoData);

            if (photoData.status === 'success' && photoData.file_url) {
              setPhotoUrl(photoData.file_url.url);
            } else {
              console.log('Фото не найдено');
            }
          } else {
            throw new Error('Ошибка загрузки фото');
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="container">
      <div className="main-content">
        <Header title="Личный кабинет" subtitle="Ваши данные" />

        {loading ? (
          <p>Загрузка...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : profile ? (
          <>
            <div className="profile-header">
              <div className="profile-photo">
                <img id="test-image" src={photoUrl || ''} alt="Фото пользователя" />
              </div>
              <div className="profile-info">
                <h1 className="profile-name">{profile.fio}</h1>
              </div>
            </div>

            <div className="profile-details">
              <div className="profile-job">
                <p>Должность: <span>{profile.work_type}</span></p>
              </div>
              <div className="personal-data">
                <h2>Личные данные</h2>
                <ul>
                  <li><strong>Email:</strong> {profile.email}</li>
                  <li><strong>Контакты:</strong> {profile.contacts?.join(', ') || 'Нет данных'}</li>
                </ul>
              </div>
            </div>

            {profile.description && (
              <div className="profile-description">
                <button 
                  className="toggle-description"
                  onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                >
                  {isDescriptionOpen ? 'Скрыть описание' : 'Показать описание'}
                </button>
                {isDescriptionOpen && <p className="description-text">{profile.description}</p>}
              </div>
            )}

            <div className="workdays-container">
              <h2>Последние 5 рабочих дней</h2>
              {workDays.length > 0 ? (
                <table className="workdays-table">
                  <thead>
                    <tr>
                      <th>Дата</th>
                      <th>ФИО</th>
                      <th>Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workDays.map((day, index) => (
                      <tr key={index}>
                        <td>{new Date(day.work_time).toLocaleString()}</td>
                        <td>{day.employer_fio}</td>
                        <td>{day.status === 1 ? 'Работал' : 'Отсутствовал'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Нет данных о рабочих днях</p>
              )}
            </div>
          </>
        ) : (
          <p>Нет данных</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
