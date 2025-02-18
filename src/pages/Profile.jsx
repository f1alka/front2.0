/*
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import './css/Home.css';
import './css/table.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [workDays, setWorkDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        const response = await fetch('http://172.20.10.2:8000/auth/profile', {
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
        setProfile(data.user);
        setWorkDays(data.work_days);

        const userId = data.user.id;
        const photoUrl = userId ? `http://172.20.10.2:8000/files/employer/${userId}/get-photo` : null;

        if (photoUrl) {
          const photoResponse = await fetch(photoUrl, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
          });

          if (photoResponse.ok) {
            const photoData = await photoResponse.json();
            if (photoData.status === 'success' && photoData.file_url) {
              setPhotoUrl(photoData.file_url.url);
            }
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
                  {profile.description && (
                    <li><strong>Описание:</strong> <span style={{ fontWeight: 'bold' }}>{profile.description}</span></li>
                  )}
                </ul>
              </div>
            </div>

            <div className="schedule-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {workDays.length === 0 ? (
                <div className="no-data">Нет данных для отображения</div>
              ) : (
                <div className="employees-list" style={{ display: 'block' }}>
                  {workDays.map((workday, index) => (
                    <div key={index} className="employee-card" style={{ marginBottom: '15px' }}>
                      <div className="card-content">
                        <h3 className="employee-name">{workday.employer_fio}</h3>
                        <p className="employee-date">{new Date(workday.work_time).toLocaleDateString()}</p>
                        <span className={`status-badge ${workday.status === 1 ? 'status-working' : 'status-absent'}`}>
                          {workday.status === 1 ? 'Работал' : 'Отсутствовал'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
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
*/
import React from 'react';
import './css/profile.css'

function App() {
  const employeeData = {
    name: 'Иван Петров',
    position: 'Старший кальянщик',
    photo: 'https://sun9-23.userapi.com/impg/pG-hMO4mKKtBsF7p71dimlhpILr4OoSgSDQ5DA/KN_bTdlS_-Y.jpg?size=2560x1706&quality=95&sign=d424de847538d01077c9e48539ecd4d9&type=album',
    description: 'Старший кальянщик, обладающий большим опытом работы в кальянном оборудовании. П',
    contacts: [
      { type: 'Email', value: 'uzbek.petrov@company.com' },
      { type: 'Телефон', value: '+7 (999) 123-45-67' },
      { type: 'Skype', value: 'ivan.petrov.dev' }
    ],
    schedule: [
      {
        date: '2024-03-18',
        time: '10:00 - 11:30'
      },
      {
        date: '2024-03-18',
        time: '13:00 - 15:00'
      },
      {
        date: '2024-03-18',
        time: '16:00 - 17:30'
      },
      {
        date: '2024-03-19',
        time: '11:00 - 12:30'
      },
      {
        date: '2024-03-19',
        time: '14:00 - 16:00'
      }
    ]
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img 
          src={employeeData.photo} 
          alt={employeeData.name} 
          className="profile-image"
        />
        <div className="profile-info">
          <h1 className="profile-name">{employeeData.name}</h1>
          <h2 className="profile-position">{employeeData.position}</h2>
          
          <div className="info-card">
            <h3 className="info-card-title">О сотруднике</h3>
            <p className="profile-description">{employeeData.description}</p>
          </div>

          <div className="info-card">
            <h3 className="info-card-title">Контактная информация</h3>
            <ul className="profile-contacts">
              {employeeData.contacts.map((contact, index) => (
                <li key={index} className="contact-item">
                  <span className="contact-label">{contact.type}:</span>
                  <span className="contact-value">{contact.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="schedule-section">
        <h2 className="schedule-title">Расписание</h2>
        <div className="schedule-cards">
          {employeeData.schedule.map((item, index) => (
            <div key={index} className="schedule-card">
              <div className="card-date">
                {new Date(item.date).toLocaleDateString('ru-RU', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="card-time">{item.time}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App