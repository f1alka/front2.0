import { useState } from 'react';
import React from 'react';


import './css/table.css'
// Generate 30 mock employees
const mockEmployees = Array.from({ length: 30 }, (_, index) => {
  const statuses = ['работает', 'не начал', 'не пришел'];
  const names = [
    'John Smith', 'Jane Doe', 'Mike Johnson', 'Sarah Williams', 'Robert Brown',
    'Emily Davis', 'Michael Wilson', 'Emma Taylor', 'James Anderson', 'Olivia Thomas',
    'William Martinez', 'Sophia Garcia', 'Alexander Robinson', 'Isabella Clark', 'Daniel Rodriguez',
    'Victoria Lee', 'David White', 'Mia Hall', 'Joseph King', 'Charlotte Wright',
    'Andrew Scott', 'Amelia Green', 'Christopher Baker', 'Ava Hill', 'Matthew Adams',
    'Sofia Nelson', 'Ryan Carter', 'Grace Morgan', 'Kevin Phillips', 'Lily Cooper'
  ];
  
  const hours = String(8 + Math.floor(index / 2)).padStart(2, '0');
  const minutes = index % 2 === 0 ? '00' : '30';
  
  return {
    id: index + 1,
    name: names[index],
    date: `2025-02-05 ${hours}:${minutes}`,
    status: statuses[Math.floor(Math.random() * statuses.length)]
  };
});

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const itemsPerPage = 10;

  const filteredEmployees = mockEmployees.filter(employee => {
    const nameMatch = employee.name.toLowerCase().includes(searchName.toLowerCase());
    const dateMatch = !selectedDate || employee.date.startsWith(selectedDate);
    return nameMatch && dateMatch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const getStatusClasses = (status) => {
    switch (status) {
      case 'работает': 
        return 'bg-green-100 text-green-800 border-green-200';
      case 'не начал': 
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'не пришел': 
        return 'bg-red-100 text-red-800 border-red-200';
      default: 
        return '';
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      if (currentPage > 3) {
        pageNumbers.push('...');
      }
      
      // Show pages around current page
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pageNumbers.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }
      
      // Always show last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Расписание сотрудников
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Управление расписанием и статусами сотрудников
          </p>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Поиск по ФИО
              </label>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Введите ФИО сотрудника"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Фильтр по дате
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentEmployees.map(employee => (
            <div 
              key={employee.id} 
              className="bg-white overflow-hidden rounded-lg shadow transition-shadow hover:shadow-lg"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {employee.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {employee.date}
                </p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusClasses(employee.status)}`}>
                  {employee.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ←
            </button>
            
            {getPageNumbers().map((pageNum, index) => (
              pageNum === '...' ? (
                <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                  ...
                </span>
              ) : (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`inline-flex items-center px-3 py-2 border rounded-md shadow-sm text-sm font-medium ${
                    currentPage === pageNum
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {pageNum}
                </button>
              )
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              →
            </button>
          </div>
        )}

        <div className="mt-4 text-center text-sm text-gray-600">
          Показано {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredEmployees.length)} из {filteredEmployees.length} сотрудников
        </div>
      </div>
    </div>
  );
}

export default App;