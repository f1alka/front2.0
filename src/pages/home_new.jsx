import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Phone, Mail, MapPin, X, LogIn } from 'lucide-react';

const restaurants = [
  {
    id: 1,
    name: 'Никольская',
    description: 'Уютный ресторан в самом сердце города с изысканной атмосферой и великолепным видом.',
    mainImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1554679665-f5537f187268?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ]
  },
  {
    id: 2,
    name: 'Тверская',
    description: 'Современное пространство с авторской кухней и профессиональным обслуживанием.',
    mainImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
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
  const [selectedRestaurant, setSelectedRestaurant] = useState<typeof restaurants[0] | null>(null);
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

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

  const getSlideClassName = (index: number) => {
    if (index === currentSlide) return 'restaurant-card current';
    if (index === (currentSlide + 1) % restaurants.length) return 'restaurant-card next';
    if (index === (currentSlide - 1 + restaurants.length) % restaurants.length) return 'restaurant-card prev';
    return 'restaurant-card';
  };

  const openModal = (restaurant: typeof restaurants[0]) => {
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
        <div className="logo-container">
          <img src="/logo.png" alt="HookahPlace Logo" className="logo" />
        </div>
        <h1 className="hero-title">HookahPlace Futura Employers</h1>
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
            <div className="contact-card">
              <div className="contact-icon">
                <Phone />
              </div>
              <div className="contact-info">+7 (999) 123-45-67</div>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <Mail />
              </div>
              <div className="contact-info">info@hookahplace.com</div>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <MapPin />
              </div>
              <div className="contact-info">Москва, ул. Примерная, 123</div>
            </div>
          </div>
        </div>
      </section>

      {selectedRestaurant && (
        <div className={`modal ${selectedRestaurant ? 'open' : ''}`}>
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              <X />
            </button>
            <h2>{selectedRestaurant.name}</h2>
            <p>{selectedRestaurant.description}</p>
            <div className="modal-gallery">
              <button className="carousel-button prev" onClick={prevGalleryImage}>
                <ChevronLeft />
              </button>
              <img
                src={selectedRestaurant.gallery[currentGalleryImage]}
                alt={`${selectedRestaurant.name} gallery`}
              />
              <button className="carousel-button next" onClick={nextGalleryImage}>
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;