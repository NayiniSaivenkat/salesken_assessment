import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LaunchList from './components/LaunchList';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

const App = () => {
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ year: '', status: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('isAuthenticated'));

  useEffect(() => {
    axios.get('https://api.spacexdata.com/v3/launches')
      .then(response => {
        setLaunches(response.data);
        setFilteredLaunches(response.data);
        
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    filterAndSearchLaunches();
  }, [searchTerm, filters]);

  const filterAndSearchLaunches = () => {
    let filtered = launches;
    if (filters.year) {
      filtered = filtered.filter(launch => new Date(launch.launch_date_local).getFullYear() === parseInt(filters.year));
    }
    if (filters.status) {
      filtered = filtered.filter(launch => launch.launch_success === (filters.status === 'success'));
    }
    if (searchTerm) {
      filtered = filtered.filter(launch => launch.mission_name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredLaunches(filtered);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>SpaceX Launches</h1>
          {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
        </header>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
          <Route path="/" element={isAuthenticated ? (
              <>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <Filter filters={filters} setFilters={setFilters} />
                <LaunchList launches={filteredLaunches} />
              </>
            ) : (
              <Navigate to="/login" />
            )}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;




