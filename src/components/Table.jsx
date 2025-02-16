/*import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';

const Table = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [shiftFilter, setShiftFilter] = useState('');

  const tableData = [
    { date: '10/18/1985', name: 'Gloria Reeves', shift: 'Дневная' },
    { date: '12/07/1983', name: 'Graham Bonner', shift: 'Ночная' },
    // Добавьте остальные данные
  ];

  const filteredData = tableData.filter(row =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (dateFilter === '' || row.date === dateFilter) &&
    (shiftFilter === '' || row.shift === shiftFilter)
  );

  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <Header title="HookahPlace Futura" subtitle="Список Работников" />
        <section className="content">
          <div className="filter-container">
            <SearchBar onSearch={setSearchTerm} />
            <select id="dateFilter" onChange={(e) => setDateFilter(e.target.value)}>
              <option value="">Выберите дату</option>
              <option value="10/18/1985">10/18/1985</option>
              <option value="12/07/1983">12/07/1983</option>
              <option value="11/11/1984">11/11/1984</option>
              <option value="06/17/1987">06/17/1987</option>
            </select>
            <select id="shiftFilter" onChange={(e) => setShiftFilter(e.target.value)}>
              <option value="">Выберите смену</option>
              <option value="Ночная">Ночная смена</option>
              <option value="Дневная">Дневная смена</option>
            </select>
          </div>
          <div className="table-container">
            <div className="scrollable">
              <table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>ФИО</th>
                    <th>Смена</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.date}</td>
                      <td>{row.name}</td>
                      <td>{row.shift}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Table;


*/