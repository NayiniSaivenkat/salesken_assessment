import React from 'react';

const Filter = ({ filters, setFilters }) => {
  const handleYearChange = (e) => {
    setFilters({ ...filters, year: e.target.value });
  };

  const handleStatusChange = (e) => {
    setFilters({ ...filters, status: e.target.value });
  };

  return (
    <div className="filters">
      <div>
        <label>Year: </label>
        <input type="number" value={filters.year} onChange={handleYearChange} />
      </div>
      <div>
        <label>Status: </label>
        <select value={filters.status} onChange={handleStatusChange}>
          <option value="">All</option>
          <option value="success">Success</option>
          <option value="failure">Failure</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
