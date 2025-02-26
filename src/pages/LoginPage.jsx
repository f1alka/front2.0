import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/RegisterPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit вызван");

    setError(null);
    setLoading(true);

    console.log('Отправка запроса на сервер...');
    console.log('Данные для отправки:', { username, password });

    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch('http://192.168.1.65:8000/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData,
      });

      console.log("Ответ от сервера:", response);

      if (!response.ok) {
        const errorMsg = await response.text();
        console.log("Ошибка в ответе:", errorMsg);
        throw new Error(errorMsg || 'Ошибка авторизации');
      }

      const data = await response.json();
      console.log("Полученные данные:", data);

      const token = data.access_token || data.token;
      if (!token) {
        throw new Error('Сервер не вернул токен');
      }

      localStorage.setItem('token', token);
      navigate('/profile');  // Перенаправляем в профиль

    } catch (err) {
      console.error("Ошибка при запросе:", err);
      setError(err.message || 'Ошибка соединения с сервером');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Вход</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Введите логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading} className="login-button">
          {loading ? 'Загрузка...' : 'Войти'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/RegisterPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit вызван");

    setError(null);
    setLoading(true);

  
    try {
      console.log('Данные для отправки:', { username, password });

      navigate('/profile');  

    } catch (err) {
      console.error("Ошибка при обработке данных:", err);
      setError(err.message || 'Ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Вход</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Введите логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading} className="login-button">
          {loading ? 'Загрузка...' : 'Войти'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

*/