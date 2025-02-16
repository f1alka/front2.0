import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Pencil, X } from 'lucide-react';

const Container = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  font-size: 32px;
  color: #fff;
`;

const EventCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const EventTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 12px;
`;

const EventDescription = styled.p`
  color: #666;
  margin-bottom: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  
  &.edit {
    background-color: #f0f0f0;
    color: #333;
  }
  
  &.delete {
    background-color: #ff4444;
    color: white;
  }
`;

const AddButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #4CAF50;
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
  resize: vertical;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const ModalButton = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  
  &.cancel {
    background-color: #f0f0f0;
  }
  
  &.confirm {
    background-color: #4CAF50;
    color: white;
  }
`;

function EventsList() {
  const { location } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Джазовый вечер',
      description: 'Живая музыка и особое меню. Начало в 19:00',
      location: 'Арбат'
    }
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить событие?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      description: event.description
    });
    setModalType('edit');
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (modalType === 'add') {
      const newEvent = {
        id: Date.now(),
        ...formData,
        location
      };
      setEvents([...events, newEvent]);
    } else {
      setEvents(events.map(evt => 
        evt.id === selectedEvent.id 
          ? { ...evt, ...formData }
          : evt
      ));
    }
    
    setShowModal(false);
    setFormData({
      title: '',
      description: ''
    });
    setSelectedEvent(null);
  };

  return (
    <Container>
      <Title>События - {location}</Title>
      {events.map(event => (
        <EventCard key={event.id}>
          <EventTitle>{event.title}</EventTitle>
          <EventDescription>{event.description}</EventDescription>
          <ButtonGroup>
            <Button className="edit" onClick={() => handleEdit(event)}>
              <Pencil size={16} />
              Изменить
            </Button>
            <Button className="delete" onClick={() => handleDelete(event.id)}>
              <X size={16} />
              Удалить
            </Button>
          </ButtonGroup>
        </EventCard>
      ))}
      
      <AddButton onClick={() => {
        setModalType('add');
        setShowModal(true);
        setFormData({
          title: '',
          description: ''
        });
      }}>+</AddButton>

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <h2>{modalType === 'add' ? 'Добавить событие' : 'Редактировать событие'}</h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Название</Label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Введите название события"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Описание</Label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Введите описание события"
                  rows={4}
                  required
                />
              </FormGroup>
              <ModalButtons>
                <ModalButton type="button" className="cancel" onClick={() => setShowModal(false)}>
                  Отмена
                </ModalButton>
                <ModalButton type="submit" className="confirm">
                  {modalType === 'add' ? 'Добавить' : 'Сохранить'}
                </ModalButton>
              </ModalButtons>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}

export default EventsList;