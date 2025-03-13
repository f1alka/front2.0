// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './css/home2.css';

// const restaurantsData = [
//   {
//     id: 1,
//     name: 'НИКОЛЬСКая',
//     address: 'Никольская ул., 19-21/1',
//     description: 'Винтажный проект в стиле listening bar расположился на втором этаже исторического здания с огромными окнами и главной точкой притяжения – музыкальным автоматом 1959 года.',
//     imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
//   },
//   {
//     id: 2,
//     name: 'ПРОСПЕКТ МИРА',
//     address: 'Просп. Мира, 36, стр. 1',
//     description: 'В целом, всю концепцию можно назвать как ретро-футуризм.Авторская кухня в паназиатском стиле, коктейльная карта от special позиций до любой классики, винная карта, китайская чайная карта, вип комнаты, зона индивидуального обслуживания, музыкальные вечера и многое другоЕ.',
//     imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9',
//   },
//   {
//     id: 3,
//     name: 'Азиатский сад',
//     address: 'ул. Гагарина, д. 15',
//     description: 'Паназиатская кухня в современной интерпретации. Суши, роллы, вок и многое другое в атмосфере восточного сада.',
//     imageUrl: 'https://images.unsplash.com/photo-1552531268-3fe8c3fc8d84',
//   }
// ];

// function App() {
//   const [selectedRestaurant, setSelectedRestaurant] = useState(null);
//   const [eventData, setEventData] = useState(null);

//   useEffect(() => {
//     // Получаем данные о последнем событии
//     axios.get('http://172.20.10.2:8000/events/get_latest')
//       .then(response => {
//         // Преобразуем полученные данные в читаемую форму
//         if (response.data) {
//           setEventData(response.data); // Последнее событие
//         }
//       })
//       .catch(error => {
//         console.error("Ошибка при получении данных о событиях:", error);
//       });
//   }, []);

//   const formatDate = (dateStr) => {
//     return new Date(dateStr).toLocaleDateString('ru-RU');
//   };

//   return (
//     <div className="container">
//       {/* Новый хедер */}
//       <div className="header">
//         <h1>HookahPlace Futura</h1>
//         {/* Кнопка перехода в личный кабинет */}
//         <Link to="/profile">
//           <button className="profile-button">
//             Личный кабинет
//           </button>
//         </Link>
//       </div>

//       {/* Сетка карточек ресторанов */}
//       <div className="restaurants-grid">
//         {restaurantsData.map(restaurant => (
//           <div
//             key={restaurant.id}
//             className="restaurant-card"
//             onClick={() => setSelectedRestaurant(restaurant)}
//           >
//             <img
//               src={restaurant.imageUrl}
//               alt={restaurant.name}
//               className="restaurant-image"
//             />
//             <div className="restaurant-info">
//               <h2>{restaurant.name}</h2>
//               <p>{restaurant.address}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Карточка последнего события */}
//       {eventData && (
//         <div className="event-card">
//           <h2>Последнее событие</h2>
//           <div className="event-info">
//             <h3>{eventData.name}</h3>
//             <p>{formatDate(eventData.date_start)}</p>
//             <p>{eventData.description}</p>
//           </div>
//         </div>
//       )}

//       {/* Модальное окно с детальной информацией о ресторане */}
//       {selectedRestaurant && (
//         <div className="modal-overlay" onClick={() => setSelectedRestaurant(null)}>
//           <div className="modal-content" onClick={e => e.stopPropagation()}>
//             <button
//               className="close-button"
//               onClick={() => setSelectedRestaurant(null)}
//             >
//               ×
//             </button>

//             <img
//               src={selectedRestaurant.imageUrl}
//               alt={selectedRestaurant.name}
//               className="modal-image"
//             />

//             <div className="modal-info">
//               <h2>{selectedRestaurant.name}</h2>
//               <p className="address">{selectedRestaurant.address}</p>
//               <p className="description">{selectedRestaurant.description}</p>

//               <div className="event-section">
//                 <h3>Последнее событие</h3>
//                 {eventData && (
//                   <div className="event-card">
//                     <h4>{eventData.name}</h4>
//                     <p className="event-date">
//                       {formatDate(eventData.date_start)}
//                     </p>
//                     <p className="event-description">
//                       {eventData.description}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Phone, Mail, MapPin, X, LogIn } from 'lucide-react';
import './css/home2.css';
import logoImage from './9Asset_1_4x.png'; // Убедитесь, что путь правильный
import mainImage1 from './nikolskaya.jpg';
import mainImage2 from './prospekt_mira.jpg';
import mainImage3 from './strast.jpg';
import gallery11 from './image/galp1.jpg';
import gallery12 from './image/galp2.jpg';
import gallery13 from './image/galp3.jpg';
import gallery14 from './image/galp4.jpg';
import gallery21 from './image/galn1.jpg';
import gallery22 from './image/galn2.jpg';
import gallery23 from './image/galn3.jpg';
import gallery24 from './image/galn4.jpg';
import gallery31 from './image/gals1.JPG';
import gallery32 from './image/gals2.jpg';
import gallery33 from './image/gals3.JPG';
import gallery34 from './image/gals4.jpg';

const restaurants = [
  {
    id: 1,
    name: 'Проспект мира',
    description: 'Уютный ресторан в самом сердце города с изысканной атмосферой и великолепным видом.',
    mainImage: mainImage2,
    gallery: [gallery11,gallery12,gallery13,gallery14]
  },
  {
    id: 2,
    name: 'Никольская',
    description: 'Современное пространство с авторской кухней и профессиональным обслуживанием.',
    mainImage: mainImage1,
    gallery: [gallery21,gallery22,gallery23,gallery24]
  },
  {
    id: 3,
    name: 'Страстной бульвар',
    description: 'Третий проект HookahPlace Futura:Альтернативное видение театральности, собранное в историческом здании. Мы отнеслись к полученному пространству с глубоким уважением, подчёркивая достоинства и сохраняя основу, как временной портрет. Функциональное наполнение несёт в себе сплетение современных иммерсивных решений с ретро-футуристичным отличием форм.Самый дорогой проект сети HookahPlace в России уже скоро.',
    mainImage: mainImage3,
    gallery: [gallery31,gallery32,gallery33,gallery34]
  }
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);
  const carouselRef = useRef(null);
  const contactRef = useRef(null);
  const [animClass, setAnimClass] = useState('animate-up');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    if (carouselRef.current) observer.observe(carouselRef.current);
    if (contactRef.current) observer.observe(contactRef.current);

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % restaurants.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + restaurants.length) % restaurants.length);
  };

  const getSlideClassName = (index) => {
    if (index === currentSlide) return 'restaurant-card current';
    if (index === (currentSlide + 1) % restaurants.length) return 'restaurant-card next';
    if (index === (currentSlide - 1 + restaurants.length) % restaurants.length) return 'restaurant-card prev';
    return 'restaurant-card';
  };

  const openModal = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentGalleryImage(0);
  };

  const closeModal = () => {
    setSelectedRestaurant(null);
  };

  const nextGalleryImage = () => {
    if (selectedRestaurant) {
      setCurrentGalleryImage((prev) => (prev + 1) % selectedRestaurant.gallery.length);
    }
  };

  const prevGalleryImage = () => {
    if (selectedRestaurant) {
      setCurrentGalleryImage((prev) => (prev - 1 + selectedRestaurant.gallery.length) % selectedRestaurant.gallery.length);
    }
  };

  return (
    <div>

      <section className="hero">
        <div className="hero-content">
          <div className="logo-container">
            <img src={logoImage} alt="HookahPlace Logo" className="logo" />
          </div>
          <h1 className="hero-title">
            <span className="hookah">Hookah</span> Place <span className="employers">Employers</span>
          </h1>
        </div>
      </section>

      <section className="carousel-section" ref={carouselRef}>
        <div className="carousel-container">
          <button className="carousel-button prev" onClick={prevSlide}>
            <ChevronLeft />
          </button>
          <div className="carousel">
            {restaurants.map((restaurant, index) => (
              <div
                key={restaurant.id}
                className={getSlideClassName(index)}
                onClick={() => openModal(restaurant)}
                style={{
                  left: '50%',
                  transform: `translateX(-50%) ${
                    index === currentSlide
                      ? 'scale(1)'
                      : index === (currentSlide + 1) % restaurants.length
                      ? 'translateX(100%) scale(0.8)'
                      : 'translateX(-100%) scale(0.8)'
                  }`,
                }}
              >
                <img
                  src={restaurant.mainImage}
                  alt={restaurant.name}
                  className="restaurant-image"
                />
                <div className="restaurant-info">
                  <h3 className="restaurant-name">{restaurant.name}</h3>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-button next" onClick={nextSlide}>
            <ChevronRight />
          </button>
        </div>
      </section>

      <section className="contact-section" ref={contactRef}>
        <div className="contact-container">
          <h2 className="contact-title">Контакты</h2>
          <div className="contact-grid">
            <div className="contact-item">
              <Phone />
              <p>+7 (495) 000-00-00</p>
            </div>
            <div className="contact-item">
              <Mail />
              <p>info@hookahplace.com</p>
            </div>
            <div className="contact-item">
              <MapPin />
              <p>Москва, улица Примерная, д. 1</p>
            </div>
          </div>
        </div>
      </section>

      {selectedRestaurant && (
  <div className={`modal ${selectedRestaurant ? 'open' : ''}`} onClick={closeModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" onClick={closeModal}>
        <X />
      </button>
      <div className="modal-gallery">
        <button className="modal-gallery-button prev" onClick={prevGalleryImage}>
          <ChevronLeft />
        </button>
        <img
          src={selectedRestaurant.gallery[currentGalleryImage]}
          alt="gallery"
          className="modal-gallery-image"
        />
        <button className="modal-gallery-button next" onClick={nextGalleryImage}>
          <ChevronRight />
        </button>
      </div>
      <div className="modal-info">
        <h3>{selectedRestaurant.name}</h3>
        <p>{selectedRestaurant.description}</p>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default App;