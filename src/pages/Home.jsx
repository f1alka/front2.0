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

const restaurants = [
  {
    id: 1,
    name: 'Проспект мира',
    description: 'Уютный ресторан в самом сердце города с изысканной атмосферой и великолепным видом.',
    mainImage: 'https://avatars.mds.yandex.net/get-altay/5102477/2a00000182ac8620894e2f41de3f39498711/XXXL',
    gallery: [
      'https://avatars.mds.yandex.net/get-altay/6249106/2a00000181eed318d7c1444c5fae833fcc63/XXXL',
      'https://avatars.mds.yandex.net/get-altay/5098810/2a00000181eed843d96995da92df3c61b444/XXXL',
      'https://avatars.mds.yandex.net/get-altay/4961567/2a00000181f7137dc63f2db58aadfecdb2ed/XXXL',
      'https://avatars.mds.yandex.net/get-altay/4961567/2a00000181eed5230e30243988a76f62dc2d/XXXL'
    ]
  },
  {
    id: 2,
    name: 'Никольская',
    description: 'Современное пространство с авторской кухней и профессиональным обслуживанием.',
    mainImage: 'https://avatars.mds.yandex.net/get-altay/9284964/2a0000018b6db0735e01d549943ab687da10/XXXL',
    gallery: [
      'https://avatars.mds.yandex.net/get-altay/11383855/2a0000018cb68ea6956475ef8d6390daf820/XXXL',
      'https://avatars.mds.yandex.net/get-altay/9761215/2a0000018bfb8862ff56093cd7ba73094e28/XXXL',
      'https://avatars.mds.yandex.net/get-altay/9284964/2a0000018bfb89004a77337501aa549cbd73/XXXL',
      'https://images.unsplash.com/photo-1562524690-3e0e844777e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ]
  },
  {
    id: 3,
    name: 'Арбат',
    description: 'Элегантный ресторан с богатой историей и непревзойденным сервисом.',
    mainImage: 'https://images.unsplash.com/photo-1515669097368-22e68427d265?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1544247193-88a1461b3b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ]
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
      <a href="/login" className="login-button">
        <LogIn />
        Личный кабинет
      </a>

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
        <div className="modal" onClick={closeModal}>
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