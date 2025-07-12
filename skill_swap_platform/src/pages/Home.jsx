import React, { useState, useEffect } from 'react';
import SkillCard from '../components/SkillCard';
import Pagination from '../components/Pagination';
import usersData from '../components/Users.json';
import './Home.module.css';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 2;

  // Load users data on component mount
  useEffect(() => {
    setUsers(usersData);
    setFilteredUsers(usersData);
  }, []);

  // Filter users based on search query and availability
  useEffect(() => {
    let filtered = users;

    // Filter by search query (skills)
    if (searchQuery.trim()) {
      filtered = filtered.filter(user =>
        user.skillsOffered.some(skill =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Filter by availability
    if (availabilityFilter) {
      filtered = filtered.filter(user =>
        user.availability === availabilityFilter
      );
    }

    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, availabilityFilter, users]);

  // Get current page users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Get unique availability options
  const availabilityOptions = [...new Set(users.map(user => user.availability))];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAvailabilityChange = (e) => {
    setAvailabilityFilter(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Skill Swap Platform</h1>
        <p className="home-subtitle">Connect with skilled professionals and exchange knowledge</p>
      </header>

      <div className="filters-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by skill (e.g., Photoshop, JavaScript...)"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="filter-container">
          <select
            value={availabilityFilter}
            onChange={handleAvailabilityChange}
            className="availability-filter"
          >
            <option value="">All Availability</option>
            {availabilityOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="results-info">
        <p className="results-count">
          {filteredUsers.length === 0 
            ? 'No users found' 
            : `Showing ${currentUsers.length} of ${filteredUsers.length} user${filteredUsers.length !== 1 ? 's' : ''}`
          }
        </p>
      </div>

      <div className="users-grid">
        {currentUsers.length > 0 ? (
          currentUsers.map(user => (
            <SkillCard key={user.id} user={user} />
          ))
        ) : (
          <div className="no-results">
            <p>No users match your search criteria.</p>
            <p>Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
