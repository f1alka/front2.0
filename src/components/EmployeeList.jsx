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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const CardName = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
`;

const CardStatus = styled.p`
  color: #666;
  margin-bottom: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  flex: 1;
  padding: 8px;
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

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
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

const Textarea = styled.textarea`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
  resize: vertical;
`;

function EmployeeList() {
  const { location } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    status: '',
    email: '',
    phone: '',
    telegram: '',
    description: ''
  });
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Иван Иванов',
      status: 'Бармен',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      email: 'ivan@example.com',
      phone: '+7 999 123 45 67',
      telegram: '@ivan',
      description: 'Опытный бармен с 5-летним стажем'
    }
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить сотрудника?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name,
      status: employee.status,
      email: employee.email,
      phone: employee.phone,
      telegram: employee.telegram,
      description: employee.description
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
      const newEmployee = {
        id: Date.now(),
        ...formData,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
      };
      setEmployees([...employees, newEmployee]);
    } else {
      setEmployees(employees.map(emp => 
        emp.id === selectedEmployee.id 
          ? { ...emp, ...formData }
          : emp
      ));
    }
    
    setShowModal(false);
    setFormData({
      name: '',
      status: '',
      email: '',
      phone: '',
      telegram: '',
      description: ''
    });
    setSelectedEmployee(null);
  };

  return (
    <Container>
      <Title>Сотрудники - {location}</Title>
      <Grid>
        {employees.map(employee => (
          <Card key={employee.id}>
            <CardImage src={employee.image} alt={employee.name} />
            <CardContent>
              <CardName>{employee.name}</CardName>
              <CardStatus>{employee.status}</CardStatus>
              <ButtonGroup>
                <Button className="edit" onClick={() => handleEdit(employee)}>
                  <Pencil size={16} />
                  Изменить
                </Button>
                <Button className="delete" onClick={() => handleDelete(employee.id)}>
                  <X size={16} />
                  Удалить
                </Button>
              </ButtonGroup>
            </CardContent>
          </Card>
        ))}
      </Grid>
      
      <AddButton onClick={() => {
        setModalType('add');
        setShowModal(true);
      }}>+</AddButton>

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <h2>{modalType === 'add' ? 'Добавить сотрудника' : 'Редактировать сотрудника'}</h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>ФИО</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Введите ФИО"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Статус</Label>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Выберите статус</option>
                  <option value="Повар">Повар</option>
                  <option value="Бармен">Бармен</option>
                  <option value="Официант">Официант</option>
                  <option value="Хостес">Хостес</option>
                  <option value="Кальянщик">Кальянщик</option>
                  <option value="Другое">Другое</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Введите email"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Телефон</Label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Введите телефон"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Telegram</Label>
                <Input
                  type="text"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleInputChange}
                  placeholder="Введите username"
                />
              </FormGroup>
              <FormGroup>
                <Label>Описание</Label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Введите описание"
                  rows={4}
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

export default EmployeeList;