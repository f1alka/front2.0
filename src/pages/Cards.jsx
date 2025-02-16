/*import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Modal from '../components/Modal';
import SearchBar from '../components/SearchBar';

const Cards = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const cardsData = [
    { id: 'modal1', title: 'Напиток 1', description: 'Описание напитка 1' },
    { id: 'modal2', title: 'Напиток 2', description: 'Описание напитка 2' },
    // Добавьте остальные карточки
  ];

  const filteredCards = cardsData.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <Header title="HookahPlace Futura" subtitle="Карточки напитков" />
        <section className="content">
          <SearchBar onSearch={setSearchTerm} />
          <div className="cards-container">
            <div className="cards-wrapper">
              {filteredCards.map((card) => (
                <Card
                  key={card.id}
                  image="path/to/your-image.jpg"
                  title={card.title}
                  description={card.description}
                  onClick={() => handleCardClick(card)}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={selectedCard?.title}
        description={selectedCard?.description}
      />
    </div>
  );
};

export default Cards;

*/